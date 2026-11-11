# GET /api/sdk/v1/{worldId}/agent/rooms

- Method: GET
- Path: /api/sdk/v1/{worldId}/agent/rooms
- URL: https://www.jayzee.co/api/sdk/v1/26f64424-cc19-43af-a9c3-666e4559bb05/agent/rooms
- Auth: required (Authorization: Bearer)
- Status with Bearer: 200 (799 bytes)
- Status without auth: 401, body `{"error":"Missing authorization header","signup":"https://www.jayzee.co/api/agent/v1/signup","docs":"https://www.jayzee.co/llms.txt"}`
- Top-level keys (200): defaultRoom, note, rooms
- Source: llms.txt says it answers "the live rooms and player counts". Standing on the world is needed for read doors.
- Raw: raw/sdk-agent-rooms.bearer.body, raw/sdk-agent-rooms.noauth.body
