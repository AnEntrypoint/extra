#!/usr/bin/env python3
import json,os,pathlib,re,struct,subprocess,sys,time,urllib.request
ROOT=pathlib.Path('/workspace/extra');L=ROOT/'.local';W=ROOT/'game-16'
M=json.load(open(L/'extraction-manifest.json'))
checks=[];errors=[]
def check(name,ok,detail=''):
    checks.append({'name':name,'ok':bool(ok),'detail':str(detail)[:500]})
    if not ok:errors.append(f'{name}: {detail}')
def load(p):return json.load(open(p))
def count_lines(p):return len([x for x in pathlib.Path(p).read_text(errors='replace').splitlines() if x.strip()])
s=M['summary']
check('manifest classes complete',s['complete']==s['classes'] and s['partial']==0 and s['blocked']==0,s)
check('every class destination exists',all((ROOT/p).exists() for c in M['classes'] for p in c['destination']),[c['id'] for c in M['classes'] if not all((ROOT/p).exists() for p in c['destination'])])
tracked=subprocess.check_output(['git','-C',str(W),'ls-files'],text=True).splitlines()
check('42 tracked files',len(tracked)==s['trackedFiles']==42,len(tracked))
check('worktree has no tracked modifications',not subprocess.check_output(['git','-C',str(W),'status','--porcelain','--untracked-files=no'],text=True).strip(),'tracked dirty')
check('main checked out',subprocess.check_output(['git','-C',str(W),'branch','--show-current'],text=True).strip()=='main','not main')
check('all advertised refs local',count_lines(L/'git/refs-remote.txt')==3 and 'refs/notes/jayzee' in (L/'git/refs-remote.txt').read_text(),count_lines(L/'git/refs-remote.txt'))
check('git commits exported',count_lines(L/'git/commits.tsv')==84,count_lines(L/'git/commits.tsv'))
note_files=list((L/'git/notes/by-commit').glob('*.txt'))
check('all 42 note blobs exported',len(note_files)==42 and count_lines(L/'git/notes/commits.tsv')==42,len(note_files))
check('notes history exported','Notes added' in (L/'git/notes/commits.tsv').read_text(),'missing')
sections=load(L/'docs/sections.json');rendered=[p for p in (L/'docs').glob('[0-9][0-9]-*.md') if p.name!='00-opening.md']
check('68/68 docs sections',len(sections)==68 and len(rendered)==68 and all(p.stat().st_size>20 for p in rendered),f'{len(sections)}/{len(rendered)}')
check('docs opening guide skills index',all((L/'docs'/x).exists() for x in ['opening.json','guide.md','skills.json','pull-index.json']),'missing')
check('23 Tome skills',len(load(L/'docs/skills.json'))==23,len(load(L/'docs/skills.json')))
ef=[p for p in (L/'engine/tree').rglob('*') if p.is_file()]
check('engine repo present',len(ef)==27 and (L/'engine/tree/api-reference.md').exists(),len(ef))
check('23 engine skills',len(list((L/'engine/tree/skills').glob('*.md')))==23,len(list((L/'engine/tree/skills').glob('*.md'))))
api=load(L/'api/capture-index.json');me=load(L/'api/me.json')
check('all /me door groups known',len(me.get('doors',{}))==42,len(me.get('doors',{})))
check('37 API captures saved',api.get('captured',0)==37 and len(list((L/'api').glob('*.json')))>=37,api.get('captured'))
for n in ['me','api','worlds','openapi','llms','docs-opening','rooms','logs','health','notifications-all','chat-inbox','comments','exec-readonly','folio','feed']:
    check('API '+n,(L/'api'/(n+'.json')).exists(),'missing')
check('worldId used for SDK doors',M['worldId']=='02e941af-9db1-4d86-b1fa-f7bca802c4b1' and M['appId']=='1e04de61-4225-4d57-8a79-b8e9bcef1c6e','wrong IDs')
active=load(L/'cdn/manifest.json');allcdn=load(L/'cdn/manifest-all.json')
def validate(b,ext):
    n=len(b)
    if not n:return False,'empty'
    if ext=='.glb':return b[:4]==b'glTF' and struct.unpack('<II',b[4:12])==(2,n),'glb'
    if ext=='.png':return b.startswith(b'\x89PNG\r\n\x1a\n') and b.endswith(b'IEND\xaeB`\x82'),'png'
    if ext in ('.jpg','.jpeg'):return b.startswith(b'\xff\xd8') and b.endswith(b'\xff\xd9'),'jpeg'
    if ext=='.mp3':return b[:3]==b'ID3' or b[:2] in (b'\xff\xfb',b'\xff\xf3',b'\xff\xf2'),'mp3'
    if ext=='.mp4':return b[4:8]==b'ftyp','mp4'
    if ext=='.json':
        try:json.loads(b);return True,'json'
        except:return False,'json'
    return True,'other'
bad=[]
for a in active['assets']:
    p=ROOT/a['file'] if a.get('file') else None
    if not p or not p.exists() or not validate(p.read_bytes(),pathlib.Path(a['name']).suffix.lower())[0]:bad.append(a['name'])
check('all 35 active CDN assets validate',active['count']==35 and active['ok']==35 and not active['bad'] and not bad,f'{active["ok"]}/{active["count"]} bad={bad}')
check('78 CDN rows classified',allcdn['count']==78 and allcdn['bad']==0 and all(a.get('class') and a.get('requests') and a.get('validation') for a in allcdn['assets']),allcdn['classes'])
check('every CDN row has HTTP evidence',len(list((L/'cdn/http').glob('*.json')))==78,len(list((L/'cdn/http').glob('*.json'))))
check('external timeout evidence exact',sum(1 for a in allcdn['assets'] if a.get('externalTimeoutEvidence'))==3,sum(1 for a in allcdn['assets'] if a.get('externalTimeoutEvidence')))
token=pathlib.Path(os.path.expanduser('~/.jayzee/token')).read_text().strip();leaks=[]
for base in [L,ROOT/'scripts']:
    for p in base.rglob('*'):
        if not p.is_file() or '.git/' in str(p) or p.suffix in ('.glb','.png','.jpg','.jpeg','.mp3','.mp4','.bin'):continue
        try:t=p.read_text(errors='ignore')
        except:continue
        if token in t or re.search(r'Bearer\s+sak_[A-Za-z0-9._-]+',t) or re.search(r'login-link/[A-Za-z0-9]{32,}',t):leaks.append(str(p.relative_to(ROOT)))
check('hidden token scan 0',not leaks,leaks[:10])
port=8917;log=L/'check-server.log'
srv=subprocess.Popen(['node',str(L/'serve.mjs')],cwd=str(ROOT),env={**os.environ,'PORT':str(port)},stdout=open(log,'w'),stderr=subprocess.STDOUT)
routes=['/','/verify','/health.json','/world.config.yaml','/places/hall/cells/x0z0.scene','/scripts/ui.js','/templates/player.js','/AGENTS.md','/manifest.json','/manifest-all.json','/extraction-manifest.json','/archive','/api/manifest.json','/api/me.json','/api/exec-readonly.json','/docs/sections.json','/docs/01-jayzee-game-api.md','/docs/guide.md','/engine/api-reference.md','/engine/skills/game-ui.md','/git/refs.txt','/git/history.txt','/git/notes-list.txt']
try:
    for _ in range(40):
        try:urllib.request.urlopen(f'http://127.0.0.1:{port}/health.json',timeout=1);break
        except Exception:time.sleep(.15)
    for r in routes:
        try:
            with urllib.request.urlopen(f'http://127.0.0.1:{port}{r}',timeout=5) as x:code,size=x.status,len(x.read())
            check('HTTP 200 '+r,code==200 and size>0,f'{code} {size}')
        except Exception as e:check('HTTP 200 '+r,False,e)
    a=active['assets'][0]['name']
    with urllib.request.urlopen(f'http://127.0.0.1:{port}{a}',timeout=10) as x:check('HTTP 200 active CDN byte',x.status==200 and len(x.read())>0,x.status)
    dump=L/'chromium-dom.html'
    cmd=['/data/cache/bin/chromium','--headless','--no-sandbox','--disable-gpu','--disable-dev-shm-usage','--virtual-time-budget=5000','--dump-dom',f'http://127.0.0.1:{port}/verify']
    r=subprocess.run(cmd,capture_output=True,text=True,timeout=90);dump.write_text(r.stdout);dom=r.stdout
    check('Chromium DOM shown','data-local-world="shown"' in dom and 'ready:' in dom,len(dom))
    for key in ['objects','assets','docs','counts','history','api','engine']:
        m=re.search(r'id="'+key+r'"[^>]*>([^<]+)',dom)
        check('Chromium non-zero '+key,bool(m) and m.group(1).strip() not in ('','—','loading…','0'),m.group(1) if m else 'missing')
    check('ROLL/R present','ROLL EPISODE (R)' in dom and 'keydown' in dom,'interaction missing')
finally:
    srv.terminate()
    try:srv.wait(timeout=5)
    except:srv.kill()
report={'ok':not errors,'checks':len(checks),'passed':sum(c['ok'] for c in checks),'failed':len(errors),'errors':errors,'summary':M['summary'],'checksDetail':checks}
(L/'check-report.json').write_text(json.dumps(report,indent=2))
print(json.dumps({'ok':not errors,'checks':len(checks),'passed':sum(c['ok'] for c in checks),'failed':len(errors),'errors':errors[:20],'summary':M['summary']},indent=2))
sys.exit(0 if not errors else 1)
