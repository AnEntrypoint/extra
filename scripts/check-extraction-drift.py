#!/usr/bin/env python3
import concurrent.futures, datetime, hashlib, json, os, pathlib, re, struct, subprocess, sys, tempfile, urllib.parse

ROOT = pathlib.Path('/workspace/extra')
W = ROOT / 'game-16'
L = ROOT / '.local'
OUT = L / 'drift'
OUT.mkdir(exist_ok=True)
HEADER = OUT / '.auth-header'
TOKEN_FILE = pathlib.Path(os.environ.get('JAYZEE_TOKEN_FILE') or os.path.expanduser('~/.jayzee/token'))
TOKEN = ''
BASE = 'https://www.jayzee.co'
WID = '02e941af-9db1-4d86-b1fa-f7bca802c4b1'
AID = '1e04de61-4225-4d57-8a79-b8e9bcef1c6e'

def now(): return datetime.datetime.now(datetime.timezone.utc).replace(microsecond=0).isoformat()
def sha(obj): return hashlib.sha256(json.dumps(obj, sort_keys=True, separators=(',', ':')).encode()).hexdigest()
def load(p):
    try: return json.load(open(p))
    except Exception: return None
def save(p, obj): pathlib.Path(p).write_text(json.dumps(obj, indent=2))
def curl(name, url, method='GET', body=None, timeout=25, accept=None):
    dest = OUT / (name + '.body')
    cmd = ['curl', '-sS', '--max-time', str(timeout), '-H', '@' + str(HEADER),
           '-o', str(dest), '-D', str(OUT / (name + '.headers')),
           '-w', '%{http_code}\n%{content_type}\n%{size_download}\n%{url_effective}', '-X', method]
    if accept: cmd += ['-H', 'Accept: ' + accept]
    if body is not None:
        cmd += ['-H', 'Content-Type: application/json', '--data-binary', json.dumps(body)]
    cmd.append(url)
    try:
        r = subprocess.run(cmd, capture_output=True, text=True, timeout=timeout + 5)
        lines = r.stdout.splitlines()
        raw = dest.read_bytes() if dest.exists() else b''
        if TOKEN and TOKEN.encode() in raw:
            raw = raw.replace(TOKEN.encode(), b'[REDACTED]')
            dest.write_bytes(raw)
        headers = (OUT / (name + '.headers')).read_text(errors='replace') if (OUT / (name + '.headers')).exists() else ''
        return {'name': name, 'url': url, 'method': method, 'exit': r.returncode,
                'status': lines[0] if lines else '000', 'contentType': lines[1] if len(lines) > 1 else '',
                'bodySize': int(lines[2]) if len(lines) > 2 and lines[2].isdigit() else len(raw),
                'effectiveUrl': lines[3] if len(lines) > 3 else url, 'bodySha256': hashlib.sha256(raw).hexdigest(),
                'etag': re.search(r'(?im)^etag:\s*(.+)$', headers).group(1).strip() if re.search(r'(?im)^etag:', headers) else None,
                'error': r.stderr.strip()[:300]}
    except subprocess.TimeoutExpired as e:
        return {'name': name, 'url': url, 'method': method, 'exit': 124, 'status': '000',
                'contentType': '', 'bodySize': 0, 'error': 'bounded-timeout', 'timeout': timeout}
    except Exception as e:
        return {'name': name, 'url': url, 'method': method, 'exit': 1, 'status': '000',
                'contentType': '', 'bodySize': 0, 'error': type(e).__name__ + ': ' + str(e)[:200]}

findings = []
errors = []
def finding(cls, state, detail, path=None, **extra):
    row = {'class': cls, 'state': state, 'detail': detail, 'path': str(path) if path else None}
    row.update(extra)
    findings.append(row)
    if state == 'drift': errors.append(f'{cls}: {detail}')
    return row

def redact_text(s):
    return re.sub(r'sak_[A-Za-z0-9._-]+', '[REDACTED]', s)

try:
    if not TOKEN_FILE.exists(): raise RuntimeError('missing token file')
    TOKEN = TOKEN_FILE.read_text().strip()
    fd = os.open(HEADER, os.O_WRONLY | os.O_CREAT | os.O_TRUNC, 0o600)
    with os.fdopen(fd, 'w') as f: f.write('Authorization: Bearer ' + TOKEN + '\n')
    os.chmod(HEADER, 0o600)
    generatedAt = now()

    try:
        gr = subprocess.run(['git', '-C', str(W), 'ls-remote', 'origin'], capture_output=True, text=True, timeout=45)
        if gr.returncode != 0: raise RuntimeError(redact_text(gr.stderr.strip()[:300]) or f'exit {gr.returncode}')
        live = {}
        for line in gr.stdout.splitlines():
            parts = line.split('\t')
            if len(parts) == 2: live[parts[1]] = parts[0]
        saved = {}
        for line in (L / 'git/refs-remote.txt').read_text().splitlines():
            parts = line.split('\t')
            if len(parts) == 2: saved[parts[1]] = parts[0]
        new = {k: v for k, v in live.items() if k not in saved}
        changed = {k: {'saved': saved[k], 'live': v} for k, v in live.items() if k in saved and saved[k] != v}
        missing = sorted(set(saved) - set(live))
        save(OUT / 'git-ls-remote.json', {'generatedAt': generatedAt, 'live': live, 'saved': saved, 'newRefs': new, 'changedRefs': changed, 'missingRefs': missing})
        state = 'drift' if (new or changed or missing) else 'no-drift'
        finding('gitRefs', state, {'newRefs': new, 'changedRefs': changed, 'missingRefs': missing}, '.local/git/refs-remote.txt')
        new_commits = []
        for ref, obj in live.items():
            if ref in ('HEAD',) or not ref.startswith(('refs/heads/', 'refs/notes/')): continue
            have = subprocess.run(['git', '-C', str(W), 'cat-file', '-e', obj + '^{commit}'], capture_output=True)
            if have.returncode != 0: new_commits.append({'ref': ref, 'object': obj, 'reason': 'object not in local git database'})
        save(OUT / 'git-new-commits.json', {'generatedAt': generatedAt, 'newCommits': new_commits})
        finding('gitNewCommitsNotes', 'drift' if new_commits else 'no-drift', new_commits, '.local/git/commits.tsv')
    except Exception as e:
        finding('gitRefs', 'unavailable', str(e), '.local/git/refs-remote.txt')
        finding('gitNewCommitsNotes', 'unavailable', str(e), '.local/git/commits.tsv')

    doors = [
        ('me', BASE + '/api/agent/v1/me'),
        ('docs-opening', f'{BASE}/api/sdk/v1/{WID}/agent/docs'),
        ('rooms', f'{BASE}/api/sdk/v1/{WID}/agent/rooms'),
        ('logs', f'{BASE}/api/sdk/v1/{WID}/agent/logs'),
        ('chat-inbox', BASE + '/api/agent/v1/chat/inbox'),
        ('health', f'{BASE}/api/sdk/v1/{WID}/agent/health'),
        ('notifications-all', BASE + '/api/notifications'),
        ('feed', BASE + '/api/feed'),
    ]
    with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
        live_api = {r['name']: r for r in pool.map(lambda d: curl(d[0], d[1]), doors)}
    live_api['exec-readonly'] = curl('exec-readonly', f'{BASE}/api/sdk/v1/{WID}/agent/exec', method='POST',
                                     body={'script': 'return {objects: api.query({}).length, world: ctx.world.id || null}'})
    save(OUT / 'api-live.json', {'generatedAt': generatedAt, 'doors': live_api})
    capture = load(L / 'api/capture-index.json') or {}
    saved_by_name = {}
    for r in capture.get('results', []):
        saved_by_name.setdefault(r['name'], []).append(r)
    api_rows = []
    volatile = {'logs', 'feed', 'notifications-all', 'rooms', 'health', 'exec-readonly'}
    for name, live in live_api.items():
        saved = (saved_by_name.get(name) or [{}])[0]
        saved_file = L / 'api' / (saved.get('file') or (name + '.json'))
        saved_sha = hashlib.sha256(saved_file.read_bytes()).hexdigest() if saved_file.exists() else None
        saved_meta = load(L / 'api' / (name + '.meta.json')) or {}
        comparable = name not in volatile
        row = {'name': name, 'live': live, 'savedFile': str(saved_file.relative_to(ROOT)) if saved_file.exists() else None,
               'savedBodySha256': saved_sha, 'liveBodySha256': live['bodySha256'], 'savedStatus': str(saved_meta.get('curl', '')).split(' ')[0] or None,
               'volatile': name in volatile, 'comparable': comparable}
        if live['status'] == '000':
            state = 'unavailable'
        elif comparable and saved_sha and saved_sha != live['bodySha256']:
            state = 'drift'
        elif comparable and saved.get('curl') and not saved['curl'].startswith(live['status']):
            state = 'drift'
        else:
            state = 'no-drift'
        row['state'] = state
        api_rows.append(row)
        finding('apiDoor:' + name, state, row, saved_file)
    save(OUT / 'api-comparison.json', {'generatedAt': generatedAt, 'rows': api_rows, 'captureCount': capture.get('captured')})

    try:
        body = (OUT / 'docs-opening.body').read_text()
        opening = json.loads(body)
        live_sections = opening.get('sections', [])
        saved_sections = load(L / 'docs/sections.json') or []
        state = 'drift' if len(live_sections) != len(saved_sections) or sha(live_sections) != sha(saved_sections) else 'no-drift'
        save(OUT / 'docs-live.json', {'generatedAt': generatedAt, 'liveSectionCount': len(live_sections), 'savedSectionCount': len(saved_sections), 'sectionsSha256': sha(live_sections)})
        finding('docsSections', state, {'live': len(live_sections), 'saved': len(saved_sections), 'sha256': sha(live_sections)}, '.local/docs/sections.json')
    except Exception as e:
        finding('docsSections', 'unavailable', str(e), '.local/docs/sections.json')

    try:
        me = json.loads((OUT / 'me.body').read_text())
        w = next(x for x in me.get('worlds', []) if x.get('name') == 'game-16')
        live_fp = {'doorGroups': len(me.get('doors', {})), 'worldId': w.get('worldId'), 'appId': w.get('appId'), 'standing': w.get('standing')}
        manifest = load(L / 'extraction-manifest.json') or {}
        saved_fp = {'doorGroups': manifest['summary']['apiDoorGroups'], 'worldId': manifest['worldId'], 'appId': manifest['appId'], 'standing': 'editor'}
        state = 'drift' if live_fp != saved_fp else 'no-drift'
        finding('meWorldMetadata', state, {'live': live_fp, 'saved': saved_fp}, '.local/api/me.json')
    except Exception as e:
        finding('meWorldMetadata', 'unavailable', str(e), '.local/api/me.json')

    active = load(L / 'cdn/manifest.json') or {}
    def validate(b, ext):
        n = len(b)
        if not n: return False, 'empty'
        if ext == '.glb': return b[:4] == b'glTF' and struct.unpack('<II', b[4:12]) == (2, n), 'glb'
        if ext == '.png': return b.startswith(b'\x89PNG\r\n\x1a\n') and b.endswith(b'IEND\xaeB`\x82'), 'png'
        if ext in ('.jpg', '.jpeg'): return b.startswith(b'\xff\xd8') and b.endswith(b'\xff\xd9'), 'jpeg'
        if ext == '.mp3': return b[:3] == b'ID3' or b[:2] in (b'\xff\xfb', b'\xff\xf3', b'\xff\xf2'), 'mp3'
        if ext == '.mp4': return b[4:8] == b'ftyp', 'mp4'
        if ext == '.json':
            try: json.loads(b); return True, 'json'
            except Exception: return False, 'bad-json'
        return True, 'other'
    cdn_rows = []
    for a in active.get('assets', []):
        p = ROOT / a['file'] if a.get('file') else None
        b = p.read_bytes() if p and p.exists() else b''
        ok, why = validate(b, pathlib.Path(a['name']).suffix.lower())
        actual = {'size': len(b), 'sha256': hashlib.sha256(b).hexdigest(), 'validation': why}
        expected = {'size': a.get('bytes'), 'sha256': a.get('sha256'), 'validation': a.get('validation')}
        state = 'no-drift' if ok and actual == expected else 'drift'
        cdn_rows.append({'name': a['name'], 'state': state, 'path': str(p) if p else None, 'actual': actual, 'expected': expected})
        finding('cdnActive:' + a['name'], state, {'actual': actual, 'expected': expected}, p)
    save(OUT / 'cdn-active-validation.json', {'generatedAt': generatedAt, 'count': len(cdn_rows), 'valid': sum(r['state'] == 'no-drift' for r in cdn_rows), 'rows': cdn_rows})

    allcdn = load(L / 'cdn/manifest-all.json') or {}
    timed_out = [a['name'] for a in allcdn.get('assets', []) if a.get('externalTimeoutEvidence')]
    probes = []
    for name in timed_out:
        slug = re.sub(r'[^a-z0-9]+', '-', name.lower()).strip('-')
        attempts = []
        final = None
        for i in range(1, 4):
            r = curl(f'generated-{slug}-head-{i}', BASE + '/' + urllib.parse.quote(name.lstrip('/'), safe='/'), method='HEAD', timeout=8)
            g = curl(f'generated-{slug}-get-{i}', BASE + '/' + urllib.parse.quote(name.lstrip('/'), safe='/'), method='GET', timeout=8)
            attempts.append({'attempt': i, 'head': r, 'get': g})
            if r['status'] != '000' or g['status'] != '000': final = {'head': r, 'get': g}; break
        evidence = {'name': name, 'attempts': attempts, 'final': final,
                    'classifiedUnavailable': final is None,
                    'exactEvidence': 'HEAD/GET status, content-type, body-size, effective URL, body SHA-256, bounded timeout'}
        save(OUT / f'generated-{slug}.json', evidence)
        probes.append(evidence)
        state = 'unavailable' if final is None else 'no-drift'
        finding('generatedCDN:' + name, state, evidence, OUT / f'generated-{slug}.json')
    save(OUT / 'generated-probes.json', {'generatedAt': generatedAt, 'names': timed_out, 'probes': probes})

    report = {'generatedAt': generatedAt, 'world': '@lanmower/game-16', 'worldId': WID, 'appId': AID,
              'readOnly': True, 'states': {'drift': sum(f['state'] == 'drift' for f in findings),
                                          'noDrift': sum(f['state'] == 'no-drift' for f in findings),
                                          'unavailable': sum(f['state'] == 'unavailable' for f in findings)},
              'ok': not errors, 'findings': findings, 'errors': errors,
              'artifacts': {'git': '.local/drift/git-ls-remote.json', 'api': '.local/drift/api-live.json',
                            'apiComparison': '.local/drift/api-comparison.json', 'docs': '.local/drift/docs-live.json',
                            'cdn': '.local/drift/cdn-active-validation.json', 'generated': '.local/drift/generated-probes.json'}}
    save(L / 'drift-report.json', report)
    print(json.dumps({'ok': not errors, 'states': report['states'], 'errors': errors[:20],
                      'generatedProbes': [p['name'] for p in probes]}, indent=2))
    sys.exit(0 if not errors else 1)
finally:
    HEADER.unlink(missing_ok=True)
