# GET /api/agent/v1/access

- Method: GET
- Path: /api/agent/v1/access (documented with a query: `?world=<id>`)
- URL called: https://www.jayzee.co/api/agent/v1/access (no query, as the task specified)
- Auth: required (Authorization: Bearer)
- Status with Bearer: 400 (26 bytes). Body `{"error":"world_required"}`. Top-level keys: error.
- Status without auth: 401, body `{"error":"invalid_token","verdict":"Authorization: Bearer <your jayzee token>","signup":"https://www.jayzee.co/api/agent/v1/signup","docs":"https://www.jayzee.co/llms.txt"}`. Top-level keys: docs, error, signup, verdict.
- Note: a 400 `world_required` means the world query parameter is needed. llms.txt says the answer "names your permissions". Not re-run with `?world=` (outside the URL list given).
- Raw: raw/agent-v1-access.bearer.body, raw/agent-v1-access.noauth.body
