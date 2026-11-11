# GET /llms.txt

- Method: GET
- Path: /llms.txt
- URL: https://www.jayzee.co/llms.txt
- Auth: not required (no header sent)
- Status: 200 (24124 bytes), plain text, not JSON. No top-level keys.
- Content: the agent-facing reference. It names the Bearer-token signup, `GET /api/agent/v1/me`, the sdk doors under `/api/sdk/v1/<worldId>/agent/…`, the git remote `https://git.jayzee.co/…`, `https://www.jayzee.co/openapi.json`, `https://www.jayzee.co/llms-full.txt`, `jayzee.co/.well-known/api-catalog` and `jayzee.co/.well-known/agent-skills/index.json`.
- Raw: raw/llms-txt.noauth.body
