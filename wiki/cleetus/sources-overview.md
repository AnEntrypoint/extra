# Sources overview

## How it works

The source cache for the cleetus project lives at /workspace/savi/sources/ (old name: savi). It holds one index file and one text file per fetched resource. The index is /workspace/savi/sources/index.jsonl (old name: savi).

Index structure:

- The index has 95 lines. Each line is one JSON object with exactly three fields: `url` (the fetched URL, verbatim), `id` (a 12 hex character identifier), and `at` (an ISO 8601 UTC timestamp, millisecond precision, of when the fetch was recorded).
- The first index line is dated 2026-11-06T06:05:14.288Z and the last is dated 2026-11-07T07:28:08.289Z.
- The id is the first 12 hex characters of the SHA-256 of the saved file's bytes. This was checked for every distinct id: `sha256(sources/<id>.txt)[:12]` equals `<id>` in all 68 cases. The id is therefore a content hash, not a hash of the URL. Two URLs that return identical bodies share one id and one file (for example `e45906ce02e7`, a 127 byte "Not Found" body, is used for four different URLs).
- The file for an entry is `sources/<id>.txt`. Files are plain text (JSON, YAML, Markdown, HTML, or plain text). No binary files are present.

Counts:

- Total index lines: 95.
- Distinct ids: 68.
- Distinct URLs: 64.
- Files in sources/ (excluding index.jsonl): 68. Every distinct id has exactly one file.

Duplicate handling:

- The same URL fetched again is recorded as a new index line with a new `at` value. Whenever the body is unchanged, the id is reused and the file is not rewritten, so the index holds several lines pointing to one file. Example: the `using-custom-workflows-with-github-pages` markdown appears at 06:05:18, 06:07:15 and 06:12:30 with id `687dee028171`.
- A URL can map to more than one id when its body changed between fetches. Nine URLs have two or three ids, for example `https://github.com/morluto/rea/pull/9234` maps to `802b75d84eac`, `9347171ea072` and `a3a1e5bdd971`, and `https://anentrypoint.github.io/savi/manifest.json` maps to `fceaba92d03b` and `fbbed6f962f1`.
- Different URLs can share an id when the body is identical. `e45906ce02e7` covers four URLs; `dd69929fd135` covers the upload-pages-artifact README at `main` and `v5`; `64c44539fba5`, `55f1486ae390` and `73795d78b337` each cover two refs.

URLs fetched repeatedly (three or more index lines):

- `https://raw.githubusercontent.com/github/docs/main/content/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site.md` (4 lines, id `f4fe3aa29aa7`)
- `https://raw.githubusercontent.com/actions/starter-workflows/main/pages/static.yml` (3 lines, id `0033d94599fd`)
- `https://raw.githubusercontent.com/github/docs/main/content/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages.md` (3 lines, id `687dee028171`)
- `https://anentrypoint.github.io/savi/manifest.json` (3 lines, ids `fceaba92d03b` and `fbbed6f962f1`)
- `https://github.com/morluto/rea/pull/9234` (3 lines, ids `802b75d84eac`, `9347171ea072`, `a3a1e5bdd971`)
- `https://github.com/morluto/rea/pull/9230` (3 lines, ids `216754aefb1d`, `84ec9d7eba6a`, `51f818644a71`)
- `https://api.github.com/repos/morluto/rea/pulls/9234/files` (3 lines, id `fc967dd54ab2`)
- `https://api.github.com/repos/morluto/rea/git/trees/99db80a13?recursive=1` (3 lines, id `417b9207ab2c`)
- `https://api.github.com/repos/morluto/rea/git/trees/32df15f1a2621a3fbb513c98833159981684d1fc?recursive=1` (3 lines, id `bc3b75479c42`)

Two-line URLs are not listed.

Index entries (one row per line of index.jsonl, in file order). The file column is relative to /workspace/savi/sources/ (old name: savi). Bytes are the on-disk size. "exists" was checked with the filesystem for every row:

| # | id | url | at | file | bytes | exists |
|---|---|---|---|---|---|---|
| 1 | 0033d94599fd | https://raw.githubusercontent.com/actions/starter-workflows/main/pages/static.yml | 2026-11-06T06:05:14.288Z | sources/0033d94599fd.txt | 1259 | yes |
| 2 | f4fe3aa29aa7 | https://raw.githubusercontent.com/github/docs/main/content/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site.md | 2026-11-06T06:05:15.635Z | sources/f4fe3aa29aa7.txt | 7413 | yes |
| 3 | 687dee028171 | https://raw.githubusercontent.com/github/docs/main/content/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages.md | 2026-11-06T06:05:18.107Z | sources/687dee028171.txt | 6464 | yes |
| 4 | 47aee1135898 | https://api.github.com/repos/actions/deploy-pages/releases/latest | 2026-11-06T06:05:20.015Z | sources/47aee1135898.txt | 2439 | yes |
| 5 | 4f50e254a719 | https://api.github.com/repos/AnEntrypoint/savi | 2026-11-06T06:05:25.166Z | sources/4f50e254a719.txt | 118 | yes |
| 6 | 563d97060c24 | https://api.github.com/repos/AnEntrypoint/savi/pages | 2026-11-06T06:05:28.236Z | sources/563d97060c24.txt | 126 | yes |
| 7 | e45906ce02e7 | https://api.github.com/repos/AnEntrypoint/savi/contents/.github/workflows | 2026-11-06T06:05:31.487Z | sources/e45906ce02e7.txt | 127 | yes |
| 8 | 687dee028171 | https://raw.githubusercontent.com/github/docs/main/content/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages.md | 2026-11-06T06:07:15.265Z | sources/687dee028171.txt | 6464 | yes |
| 9 | f4fe3aa29aa7 | https://raw.githubusercontent.com/github/docs/main/content/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site.md | 2026-11-06T06:07:16.608Z | sources/f4fe3aa29aa7.txt | 7413 | yes |
| 10 | e8ce828a4f2a | https://raw.githubusercontent.com/actions/upload-pages-artifact/main/action.yml | 2026-11-06T06:07:18.326Z | sources/e8ce828a4f2a.txt | 2895 | yes |
| 11 | dd69929fd135 | https://raw.githubusercontent.com/actions/upload-pages-artifact/main/README.md | 2026-11-06T06:07:26.560Z | sources/dd69929fd135.txt | 4583 | yes |
| 12 | 64c44539fba5 | https://raw.githubusercontent.com/actions/deploy-pages/main/action.yml | 2026-11-06T06:07:29.638Z | sources/64c44539fba5.txt | 1244 | yes |
| 13 | 55f1486ae390 | https://raw.githubusercontent.com/actions/configure-pages/main/action.yml | 2026-11-06T06:07:33.028Z | sources/55f1486ae390.txt | 1529 | yes |
| 14 | d73c30f0c3c8 | https://api.github.com/repos/actions/upload-pages-artifact/releases/latest | 2026-11-06T06:07:35.029Z | sources/d73c30f0c3c8.txt | 2319 | yes |
| 15 | 47aee1135898 | https://api.github.com/repos/actions/deploy-pages/releases/latest | 2026-11-06T06:07:40.532Z | sources/47aee1135898.txt | 2439 | yes |
| 16 | bc11a4ed7384 | https://api.github.com/repos/actions/configure-pages/releases/latest | 2026-11-06T06:07:43.046Z | sources/bc11a4ed7384.txt | 2933 | yes |
| 17 | 8c81e64dda90 | https://api.github.com/repos/actions/checkout/releases/latest | 2026-11-06T06:07:45.349Z | sources/8c81e64dda90.txt | 2372 | yes |
| 18 | 4f50e254a719 | https://api.github.com/repos/AnEntrypoint/savi | 2026-11-06T06:07:46.300Z | sources/4f50e254a719.txt | 118 | yes |
| 19 | 563d97060c24 | https://api.github.com/repos/AnEntrypoint/savi/pages | 2026-11-06T06:07:48.584Z | sources/563d97060c24.txt | 126 | yes |
| 20 | 73795d78b337 | https://raw.githubusercontent.com/actions/configure-pages/main/README.md | 2026-11-06T06:07:51.258Z | sources/73795d78b337.txt | 1609 | yes |
| 21 | e45906ce02e7 | https://api.github.com/repos/AnEntrypoint/savi/contents/.github/workflows | 2026-11-06T06:07:51.838Z | sources/e45906ce02e7.txt | 127 | yes |
| 22 | dd69929fd135 | https://raw.githubusercontent.com/actions/upload-pages-artifact/main/README.md | 2026-11-06T06:07:53.520Z | sources/dd69929fd135.txt | 4583 | yes |
| 23 | 668cd3703863 | https://api.github.com/repos/AnEntrypoint/savi/actions/workflows | 2026-11-06T06:07:54.117Z | sources/668cd3703863.txt | 133 | yes |
| 24 | 400cea61c103 | https://raw.githubusercontent.com/actions/deploy-pages/main/README.md | 2026-11-06T06:07:56.055Z | sources/400cea61c103.txt | 9386 | yes |
| 25 | f4fe3aa29aa7 | https://raw.githubusercontent.com/github/docs/main/content/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site.md | 2026-11-06T06:07:59.680Z | sources/f4fe3aa29aa7.txt | 7413 | yes |
| 26 | 0033d94599fd | https://raw.githubusercontent.com/actions/starter-workflows/main/pages/static.yml | 2026-11-06T06:10:25.848Z | sources/0033d94599fd.txt | 1259 | yes |
| 27 | a99f56a7991e | https://docs.github.com/en/rest/pages/pages?apiVersion=2022-11-28 | 2026-11-06T06:10:36.010Z | sources/a99f56a7991e.txt | 455841 | yes |
| 28 | 530e1c4bf86a | https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site | 2026-11-06T06:12:13.591Z | sources/530e1c4bf86a.txt | 154034 | yes |
| 29 | 2f18ca8da7c1 | https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages | 2026-11-06T06:12:26.912Z | sources/2f18ca8da7c1.txt | 141716 | yes |
| 30 | 0033d94599fd | https://raw.githubusercontent.com/actions/starter-workflows/main/pages/static.yml | 2026-11-06T06:12:29.419Z | sources/0033d94599fd.txt | 1259 | yes |
| 31 | 687dee028171 | https://raw.githubusercontent.com/github/docs/main/content/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages.md | 2026-11-06T06:12:30.778Z | sources/687dee028171.txt | 6464 | yes |
| 32 | f4fe3aa29aa7 | https://raw.githubusercontent.com/github/docs/main/content/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site.md | 2026-11-06T06:12:32.492Z | sources/f4fe3aa29aa7.txt | 7413 | yes |
| 33 | d59219cb7959 | https://raw.githubusercontent.com/actions/checkout/v7/action.yml | 2026-11-06T06:12:34.634Z | sources/d59219cb7959.txt | 5144 | yes |
| 34 | 55f1486ae390 | https://raw.githubusercontent.com/actions/configure-pages/v6/action.yml | 2026-11-06T06:12:37.083Z | sources/55f1486ae390.txt | 1529 | yes |
| 35 | f84e759011e0 | https://raw.githubusercontent.com/actions/upload-pages-artifact/v5/action.yml | 2026-11-06T06:12:39.205Z | sources/f84e759011e0.txt | 2895 | yes |
| 36 | 64c44539fba5 | https://raw.githubusercontent.com/actions/deploy-pages/v5/action.yml | 2026-11-06T06:12:40.903Z | sources/64c44539fba5.txt | 1244 | yes |
| 37 | dd69929fd135 | https://raw.githubusercontent.com/actions/upload-pages-artifact/v5/README.md | 2026-11-06T06:12:47.423Z | sources/dd69929fd135.txt | 4583 | yes |
| 38 | 73795d78b337 | https://raw.githubusercontent.com/actions/configure-pages/v6/README.md | 2026-11-06T06:12:50.112Z | sources/73795d78b337.txt | 1609 | yes |
| 39 | fceaba92d03b | https://anentrypoint.github.io/savi/manifest.json | 2026-11-06T06:46:25.535Z | sources/fceaba92d03b.txt | 246711 | yes |
| 40 | fbbed6f962f1 | https://anentrypoint.github.io/savi/manifest.json | 2026-11-06T06:47:45.008Z | sources/fbbed6f962f1.txt | 247177 | yes |
| 41 | fbbed6f962f1 | https://anentrypoint.github.io/savi/manifest.json | 2026-11-06T06:51:46.436Z | sources/fbbed6f962f1.txt | 247177 | yes |
| 42 | b3e6e4cd0453 | https://anentrypoint.github.io/savi/index.html | 2026-11-06T06:51:48.343Z | sources/b3e6e4cd0453.txt | 231044 | yes |
| 43 | 709fe94d0451 | https://github.com/morluto/rea | 2026-11-07T07:02:51.315Z | sources/709fe94d0451.txt | 456367 | yes |
| 44 | a3a1e5bdd971 | https://github.com/morluto/rea/pull/9234 | 2026-11-07T07:02:55.001Z | sources/a3a1e5bdd971.txt | 313625 | yes |
| 45 | 51f818644a71 | https://github.com/morluto/rea/pull/9230 | 2026-11-07T07:02:58.738Z | sources/51f818644a71.txt | 269457 | yes |
| 46 | b1b830355255 | https://github.com/morluto/rea/compare/86dfb903...32df15f | 2026-11-07T07:03:01.925Z | sources/b1b830355255.txt | 186781 | yes |
| 47 | fa8b44178cc5 | https://github.com/morluto/rea/actions/runs/42340853942 | 2026-11-07T07:03:04.889Z | sources/fa8b44178cc5.txt | 482546 | yes |
| 48 | 59c79208b7cd | https://api.github.com/repos/morluto/rea | 2026-11-07T07:03:06.090Z | sources/59c79208b7cd.txt | 5136 | yes |
| 49 | fc967dd54ab2 | https://api.github.com/repos/morluto/rea/pulls/9234/files | 2026-11-07T07:03:07.234Z | sources/fc967dd54ab2.txt | 7268 | yes |
| 50 | 028b6dcad812 | https://github.com/morluto/rea | 2026-11-07T07:09:25.108Z | sources/028b6dcad812.txt | 456367 | yes |
| 51 | 9347171ea072 | https://github.com/morluto/rea/pull/9234 | 2026-11-07T07:09:28.709Z | sources/9347171ea072.txt | 313624 | yes |
| 52 | 84ec9d7eba6a | https://github.com/morluto/rea/pull/9230 | 2026-11-07T07:09:34.235Z | sources/84ec9d7eba6a.txt | 269457 | yes |
| 53 | 9b6d34147cf2 | https://github.com/morluto/rea/compare/86dfb903...32df15f | 2026-11-07T07:09:38.927Z | sources/9b6d34147cf2.txt | 186781 | yes |
| 54 | 5291daad2102 | https://github.com/morluto/rea/actions/runs/42340853942 | 2026-11-07T07:09:42.314Z | sources/5291daad2102.txt | 482547 | yes |
| 55 | bd5e2352d70d | https://github.com/morluto/rea/actions/runs/42340853942/job/128308633744 | 2026-11-07T07:09:44.671Z | sources/bd5e2352d70d.txt | 166899 | yes |
| 56 | e436cb957af7 | https://github.com/morluto/rea/actions/runs/42340853942/job/128308845027 | 2026-11-07T07:09:46.624Z | sources/e436cb957af7.txt | 168139 | yes |
| 57 | 39e3ca03dbc0 | https://github.com/morluto/rea/commit/99db80a13 | 2026-11-07T07:09:52.707Z | sources/39e3ca03dbc0.txt | 1100738 | yes |
| 58 | 06589ba37548 | https://github.com/morluto/rea/commit/86dfb90365d248dbb286117c9e675b50a8897011 | 2026-11-07T07:09:56.204Z | sources/06589ba37548.txt | 406727 | yes |
| 59 | b2f707039fa8 | https://github.com/morluto/rea/commit/1874f8729 | 2026-11-07T07:09:59.048Z | sources/b2f707039fa8.txt | 226954 | yes |
| 60 | 3a0a1aff8e9b | https://github.com/morluto/rea/commit/32df15f1a2621a3fbb513c98833159981684d1fc | 2026-11-07T07:10:01.805Z | sources/3a0a1aff8e9b.txt | 288646 | yes |
| 61 | a738f7ab890b | https://github.com/morluto/rea/commit/4d0ef65b638bf9b02225c5cb5e214360728874ec | 2026-11-07T07:10:04.230Z | sources/a738f7ab890b.txt | 257191 | yes |
| 62 | 0cf1206d4f11 | https://api.github.com/repos/morluto/rea | 2026-11-07T07:10:05.652Z | sources/0cf1206d4f11.txt | 5136 | yes |
| 63 | fc967dd54ab2 | https://api.github.com/repos/morluto/rea/pulls/9234/files | 2026-11-07T07:10:06.807Z | sources/fc967dd54ab2.txt | 7268 | yes |
| 64 | 3d9436e8e8b4 | https://api.github.com/repos/morluto/rea/compare/86dfb903...32df15f | 2026-11-07T07:10:08.140Z | sources/3d9436e8e8b4.txt | 20141 | yes |
| 65 | 8d1c93cb8354 | https://api.github.com/repos/morluto/rea/actions/runs/42340853942 | 2026-11-07T07:10:09.271Z | sources/8d1c93cb8354.txt | 15253 | yes |
| 66 | b0c4f2b3593d | https://api.github.com/repos/morluto/rea/actions/jobs/128308633744 | 2026-11-07T07:10:10.397Z | sources/b0c4f2b3593d.txt | 2884 | yes |
| 67 | c2ed336ce99b | https://api.github.com/repos/morluto/rea/actions/jobs/128308845027 | 2026-11-07T07:10:12.102Z | sources/c2ed336ce99b.txt | 3282 | yes |
| 68 | fc967dd54ab2 | https://api.github.com/repos/morluto/rea/pulls/9234/files | 2026-11-07T07:24:27.834Z | sources/fc967dd54ab2.txt | 7268 | yes |
| 69 | 3d9436e8e8b4 | https://api.github.com/repos/morluto/rea/compare/86dfb903...32df15f | 2026-11-07T07:24:30.904Z | sources/3d9436e8e8b4.txt | 20141 | yes |
| 70 | 557879892107 | https://api.github.com/repos/morluto/rea/pulls/9234 | 2026-11-07T07:24:32.823Z | sources/557879892107.txt | 21079 | yes |
| 71 | fc542fab3835 | https://api.github.com/repos/morluto/rea/pulls/9230 | 2026-11-07T07:24:34.537Z | sources/fc542fab3835.txt | 22402 | yes |
| 72 | 600879c2190e | https://api.github.com/repos/morluto/rea/issues/9230/timeline?per_page=100 | 2026-11-07T07:24:35.884Z | sources/600879c2190e.txt | 11498 | yes |
| 73 | 3861a9a54d63 | https://api.github.com/repos/morluto/rea/commits/4d0ef65b638bf9b02225c5cb5e214360728874ec/check-runs?per_page=100 | 2026-11-07T07:24:37.681Z | sources/3861a9a54d63.txt | 139233 | yes |
| 74 | cf41e559ae85 | https://github.com/morluto/rea/actions/runs/42343646562 | 2026-11-07T07:24:41.273Z | sources/cf41e559ae85.txt | 471314 | yes |
| 75 | 24036dfc2cdd | https://github.com/morluto/rea/actions/runs/42343646499 | 2026-11-07T07:24:43.508Z | sources/24036dfc2cdd.txt | 152275 | yes |
| 76 | 7a2db58d6fbf | https://github.com/morluto/rea/actions/runs/42343643703 | 2026-11-07T07:24:47.039Z | sources/7a2db58d6fbf.txt | 154802 | yes |
| 77 | 13678a0f1e60 | https://github.com/morluto/rea/actions/runs/42343646532 | 2026-11-07T07:24:48.769Z | sources/13678a0f1e60.txt | 151465 | yes |
| 78 | 53dccbef307b | https://github.com/morluto/rea/commit/86dfb903 | 2026-11-07T07:24:53.228Z | sources/53dccbef307b.txt | 406376 | yes |
| 79 | a2f34c341aa2 | https://github.com/morluto/rea/commit/32df15f | 2026-11-07T07:24:58.644Z | sources/a2f34c341aa2.txt | 288283 | yes |
| 80 | 81fb9aa88dd7 | https://github.com/morluto/rea/commit/32df15f1a | 2026-11-07T07:25:00.724Z | sources/81fb9aa88dd7.txt | 288305 | yes |
| 81 | 97e3e4ac1d9e | https://github.com/morluto/rea/commit/4d0ef65b | 2026-11-07T07:25:02.815Z | sources/97e3e4ac1d9e.txt | 256838 | yes |
| 82 | fdfbffc969c0 | https://nodejs.org/dist/v24.22.1/SHASUMS256.txt | 2026-11-07T07:25:03.893Z | sources/fdfbffc969c0.txt | 3171 | yes |
| 83 | e45906ce02e7 | https://api.github.com/repos/morluto/rea/contents/tests/support/cli/cliFixture.js?ref=99db80a13 | 2026-11-07T07:25:05.795Z | sources/e45906ce02e7.txt | 127 | yes |
| 84 | e45906ce02e7 | https://api.github.com/repos/morluto/rea/contents/tests/support/cli/cliFixture.js?ref=32df15f | 2026-11-07T07:25:06.567Z | sources/e45906ce02e7.txt | 127 | yes |
| 85 | e45906ce02e7 | https://api.github.com/repos/morluto/rea/contents/tests/support/cli/cliFixture.js?ref=86dfb903 | 2026-11-07T07:25:07.919Z | sources/e45906ce02e7.txt | 127 | yes |
| 86 | 802b75d84eac | https://github.com/morluto/rea/pull/9234 | 2026-11-07T07:25:11.629Z | sources/802b75d84eac.txt | 313625 | yes |
| 87 | 216754aefb1d | https://github.com/morluto/rea/pull/9230 | 2026-11-07T07:25:14.065Z | sources/216754aefb1d.txt | 269456 | yes |
| 88 | d02051a675d4 | https://github.com/morluto/rea/commit/32df15f1a2621a3fbb513c98833159981684d1fc | 2026-11-07T07:25:16.542Z | sources/d02051a675d4.txt | 288646 | yes |
| 89 | 4672d29bc2bf | https://github.com/morluto/rea/commit/1874f8729 | 2026-11-07T07:25:20.095Z | sources/4672d29bc2bf.txt | 226953 | yes |
| 90 | 417b9207ab2c | https://api.github.com/repos/morluto/rea/git/trees/99db80a13?recursive=1 | 2026-11-07T07:26:25.702Z | sources/417b9207ab2c.txt | 1978614 | yes |
| 91 | bc3b75479c42 | https://api.github.com/repos/morluto/rea/git/trees/32df15f1a2621a3fbb513c98833159981684d1fc?recursive=1 | 2026-11-07T07:26:36.520Z | sources/bc3b75479c42.txt | 1978614 | yes |
| 92 | 417b9207ab2c | https://api.github.com/repos/morluto/rea/git/trees/99db80a13?recursive=1 | 2026-11-07T07:27:29.897Z | sources/417b9207ab2c.txt | 1978614 | yes |
| 93 | bc3b75479c42 | https://api.github.com/repos/morluto/rea/git/trees/32df15f1a2621a3fbb513c98833159981684d1fc?recursive=1 | 2026-11-07T07:27:38.630Z | sources/bc3b75479c42.txt | 1978614 | yes |
| 94 | 417b9207ab2c | https://api.github.com/repos/morluto/rea/git/trees/99db80a13?recursive=1 | 2026-11-07T07:28:00.495Z | sources/417b9207ab2c.txt | 1978614 | yes |
| 95 | bc3b75479c42 | https://api.github.com/repos/morluto/rea/git/trees/32df15f1a2621a3fbb513c98833159981684d1fc?recursive=1 | 2026-11-07T07:28:08.289Z | sources/bc3b75479c42.txt | 1978614 | yes |

Content of each distinct file (from the first bytes of each file; sorted by id). Bytes are the on-disk size:

| id | bytes | kind and first line or title |
|---|---|---|
| 0033d94599fd | 1259 | GitHub Actions workflow, "# Simple workflow for deploying static content to GitHub Pages" |
| 028b6dcad812 | 456367 | HTML page, GitHub repository page for morluto/rea |
| 06589ba37548 | 406727 | HTML page, commit page in morluto/rea |
| 0cf1206d4f11 | 5136 | JSON, GitHub API repository object for morluto/rea |
| 13678a0f1e60 | 151465 | HTML page, Actions run page in morluto/rea |
| 216754aefb1d | 269456 | HTML page, pull request #9230 in morluto/rea |
| 24036dfc2cdd | 152275 | HTML page, Actions run page in morluto/rea |
| 2f18ca8da7c1 | 141716 | HTML page, GitHub Docs "Using custom workflows with GitHub Pages" |
| 3861a9a54d63 | 139233 | JSON, GitHub API check-runs list for commit 4d0ef65 |
| 39e3ca03dbc0 | 1100738 | HTML page, commit 99db80a in morluto/rea |
| 3a0a1aff8e9b | 288646 | HTML page, commit 32df15f in morluto/rea |
| 3d9436e8e8b4 | 20141 | JSON, GitHub API compare 86dfb903...32df15f |
| 400cea61c103 | 9386 | Markdown, README of actions/deploy-pages ("# deploy-pages") |
| 417b9207ab2c | 1978614 | JSON, GitHub API git tree for commit 99db80a13, recursive |
| 47aee1135898 | 2439 | JSON, GitHub API latest release of actions/deploy-pages |
| 4f50e254a719 | 118 | JSON, GitHub API 404 body for AnEntrypoint/savi |
| 51f818644a71 | 269457 | HTML page, pull request #9230 in morluto/rea |
| 5291daad2102 | 482547 | HTML page, Actions run 42340853942 in morluto/rea |
| 530e1c4bf86a | 154034 | HTML page, GitHub Docs "Configuring a publishing source for your GitHub Pages site" |
| 53dccbef307b | 406376 | HTML page, commit 86dfb903 in morluto/rea |
| 557879892107 | 21079 | JSON, GitHub API pull request #9234 object |
| 55f1486ae390 | 1529 | YAML action metadata, "Configure GitHub Pages" |
| 563d97060c24 | 126 | JSON, GitHub API 404 body for the Pages endpoint |
| 59c79208b7cd | 5136 | JSON, GitHub API repository object for morluto/rea |
| 600879c2190e | 11498 | JSON, GitHub API timeline for issue 9230 |
| 64c44539fba5 | 1244 | YAML action metadata, "Deploy GitHub Pages site" |
| 668cd3703863 | 133 | JSON, GitHub API 404 body for the workflows list |
| 687dee028171 | 6464 | Markdown (GitHub Docs front matter), "Using custom workflows with GitHub Pages" |
| 709fe94d0451 | 456367 | HTML page, GitHub repository page for morluto/rea |
| 73795d78b337 | 1609 | Markdown, README of actions/configure-pages ("# configure-pages") |
| 7a2db58d6fbf | 154802 | HTML page, Actions run page in morluto/rea |
| 802b75d84eac | 313625 | HTML page, pull request #9234 in morluto/rea |
| 81fb9aa88dd7 | 288305 | HTML page, commit 32df15f1a in morluto/rea |
| 84ec9d7eba6a | 269457 | HTML page, pull request #9230 in morluto/rea |
| 8c81e64dda90 | 2372 | JSON, GitHub API latest release of actions/checkout |
| 8d1c93cb8354 | 15253 | JSON, GitHub API workflow run object (CI) |
| 9347171ea072 | 313624 | HTML page, pull request #9234 in morluto/rea |
| 97e3e4ac1d9e | 256838 | HTML page, commit 4d0ef65b in morluto/rea |
| 9b6d34147cf2 | 186781 | HTML page, compare 86dfb903...32df15f in morluto/rea |
| a2f34c341aa2 | 288283 | HTML page, commit 32df15f in morluto/rea |
| a3a1e5bdd971 | 313625 | HTML page, pull request #9234 in morluto/rea |
| a738f7ab890b | 257191 | HTML page, commit 4d0ef65 in morluto/rea |
| a99f56a7991e | 455841 | HTML page, docs.github.com REST "Pages" reference |
| b0c4f2b3593d | 2884 | JSON, GitHub API job object (job 128308633744) |
| b1b830355255 | 186781 | HTML page, compare 86dfb903...32df15f in morluto/rea |
| b2f707039fa8 | 226954 | HTML page, commit 1874f87 in morluto/rea |
| b3e6e4cd0453 | 231044 | HTML page, index page of the project's manual site |
| bc11a4ed7384 | 2933 | JSON, GitHub API latest release of actions/configure-pages |
| bc3b75479c42 | 1978614 | JSON, GitHub API git tree for commit 32df15f, recursive |
| bd5e2352d70d | 166899 | HTML page, Actions job 128308633744 in morluto/rea |
| c2ed336ce99b | 3282 | JSON, GitHub API job object (job 128308845027) |
| cf41e559ae85 | 471314 | HTML page, Actions run 42343646562 in morluto/rea |
| d02051a675d4 | 288646 | HTML page, commit 32df15f1a in morluto/rea |
| d59219cb7959 | 5144 | YAML action metadata, "Checkout" |
| d73c30f0c3c8 | 2319 | JSON, GitHub API latest release of actions/upload-pages-artifact |
| dd69929fd135 | 4583 | Markdown, README of actions/upload-pages-artifact |
| e436cb957af7 | 168139 | HTML page, Actions job 128308845027 in morluto/rea |
| e45906ce02e7 | 127 | JSON, GitHub API 404 body for repository contents |
| e8ce828a4f2a | 2895 | YAML action metadata, "Upload GitHub Pages artifact" |
| f4fe3aa29aa7 | 7413 | Markdown (GitHub Docs front matter), "Configuring a publishing source for your GitHub Pages site" |
| f84e759011e0 | 2895 | YAML action metadata, "Upload GitHub Pages artifact" (same bytes as e8ce828a4f2a) |
| fa8b44178cc5 | 482546 | HTML page, Actions run 42340853942 in morluto/rea |
| fbbed6f962f1 | 247177 | JSON site manifest for the project's manual site (sourceCount 610, commit eb0aad26...) |
| fc542fab3835 | 22402 | JSON, GitHub API pull request #9230 object |
| fc967dd54ab2 | 7268 | JSON, GitHub API file list for pull request #9234 |
| fceaba92d03b | 246711 | JSON site manifest for the project's manual site (sourceCount 609, commit 12bfdb91...) |
| fdfbffc969c0 | 3171 | Plain text, SHA-256 checksum list for node v24.22.1 |

Binary files: none. Every file is text.

Files in sources/ not referenced by the index: none. The directory holds 68 content files plus index.jsonl, and all 68 are referenced.

Index entries whose file is missing: none. All 95 entries resolve to an existing file.

## Decisions

- The sources/ directory is ignored by git. /workspace/savi/.gitignore line 8 is `sources/`. `git check-ignore -v sources/index.jsonl` reports `.gitignore:8:sources/	sources/index.jsonl`, and `git ls-files sources` returns nothing, so no file in the directory is tracked. The cache is local and is not committed.
- The file for each entry is stored by content hash (id = first 12 hex of SHA-256 of the body). The index records the fetch time per URL, so the same body fetched again overwrites nothing and only adds an index line.
- The files are kept as raw response bodies, including 404 JSON bodies, rather than cleaned extracts.
- The overview lists all 95 index lines rather than collapsing repeats, so the fetch history stays visible.

## Open gaps

- The sources do not record what triggered each fetch or which tool wrote index.jsonl. None recorded in the sources.
- The sources do not state the purpose of the GitHub Pages and rea repository fetches. None recorded in the sources.
- The two manifest ids (fceaba92d03b, fbbed6f962f1) have different commits and sourceCount values, but no record explains why both were kept. None recorded in the sources.
- Files are overwritten by identical-content fetches only; the index does not say whether earlier bodies with the same URL were replaced. None recorded in the sources.

## Sources

- /workspace/savi/sources/index.jsonl (old name: savi)
- /workspace/savi/sources/ (old name: savi), 68 content files named <id>.txt
- /workspace/savi/.gitignore (old name: savi), line 8 `sources/`
