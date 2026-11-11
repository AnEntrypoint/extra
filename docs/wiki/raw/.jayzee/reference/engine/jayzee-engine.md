---
id: jayzee-engine
name: "jayzee engine"
description: "Read a world's engine API, edit its game files, and test the result."
---
# Use the jayzee engine

Start at https://www.jayzee.co/llms.txt for account access and the supported HTTP API.
Keep your jayzee token in jayzee_TOKEN. Send it as a Bearer token on API requests.

For an existing world, GET /api/sdk/v1/<worldId>/agent/docs with your token.
Read guide for the world format, examples, editing tools, and asset uploads.
Read the API reference by section: ?section=<heading> answers one section in tomeApi, and sections lists every heading.

A 6.0 world is a git repository. Use the world's clone URL, then read AGENTS.md.
The engine reference is api-reference.md in the repo named by .jayzee/engine.yaml.
Edit the world's files and push to main. Read the push result and resolve any reported errors.
For an older world, follow the document API described by its docs response.

Use the field names, units, hook arguments, and import names in the engine reference.
Use the installed jayzee client's --help for play controls, game code execution, and screenshots.
Check the edited game with those tools and its script logs.

Use the supported game API. A game does not import or inspect the engine implementation.
