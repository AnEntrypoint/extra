# jayzee CLI reference

Captured from /workspace/game-6 with /config/.bun/bin/jayzee. Each file is the raw output of the command named. The api type shapes resolve against the clone engine in /workspace/cleetus/.jayzee/engine.yaml (semver 6.0.0).

## Top level

- `jayzee --help` -> help.txt
  - no flags; verbs: client, events, api, numbers, mod, git clone, preview, bring
- `jayzee login --help` -> login.txt (exit 2, prints "unknown word --help", then the usage text)
  - --invite <sbk_…> --username <name>
  - --invite <sbk_…>
  - --reconnect <sbk_…>
  - --origin <site> (jayzee_ORIGIN)
- `jayzee events --help` -> events.txt
  - --kind a,b (follow, build_request, build_invite, creator_comment, comment_reply, like, player_played, world_live, trending, staff_pick, agent_joined, chat_mention, ...)
  - --world <@user/name|appId>
  - --from <username>
  - --unread
  - --since <cursor>
  - --exec <cmd>
  - --once
  - --origin <site>
- `jayzee api --help` -> api.txt
  - --engine <semver>
  - --origin <site>
- `jayzee api` (no args, lists 305 types) -> api-list.txt
- `jayzee numbers --help` -> numbers.txt
  - --world <@user/name|appId>
  - --json
  - --origin <site>
- `jayzee mod --help` -> mod.txt (install, update, list and status each print this same text)
  - install <name>[@<version>] -> mod-install.txt
  - update [<name>] --version <x.y.z> --changelog <text> -> mod-update.txt
  - list -> mod-list.txt
  - status [<name>] -> mod-status.txt
  - --world <@user/name|worldId> (all verbs)
  - --origin <site> (all verbs)
- `jayzee preview --help` -> preview.txt
  - [<dir>]
  - --room <name>
  - --render none|cpu|gpu
  - --base <commit>
  - --ttl <s> (default six hours)
  - --origin <site>
- `jayzee bring --help` -> bring.txt
  - <folder> (no flags)
- `jayzee client --help` -> client.txt (holds every client verb's section)
- `jayzee client exec --help` -> client-exec.txt

## jayzee client verbs

Each `jayzee client <verb> --help` prints the whole client.txt, not a per-verb page. Each verb file below is that same text. client-exec.txt is the only verb-specific page.

- join [<@user/world>] -> client-join.txt
  - --as <name>
  - --body <model-url | /cdn/ref>
  - --outfit-json <path-or-inline> (requires --body)
  - --ttl <s>
  - --ready-timeout <ms>
  - --name <session>
  - --room <name>
  - --tester <n>
  - --latency <ms> (with --tester)
  - --render cpu|gpu|none
  - --width <pixels>
  - --height <pixels>
  - --actor <agentActorId>
  - --origin <site>
  - --door <play host>
  - --engine <32hex>
- where [--name <session>] -> client-where.txt
  - --name <session>
- players [--name <session>] -> client-players.txt
  - --name <session>
- logs [--level log|warn|error] [--object <id>] [--limit <n>] [--name <session>] -> client-logs.txt
  - --level log|warn|error
  - --object <id>
  - --limit <n>
  - --name <session>
- exec <file> | -e "<source>" -> client-exec.txt
  - --realm game|browser
  - --input <json-file>
  - --out <file>
  - --module
  - --place <id>
  - --persist | --read-only
  - --name <session>
- crossing [--name <session>] -> client-crossing.txt
  - --name <session>
- prefetch --world <id> --manifest <hash> --hex <32hex> [--name <session>] -> client-prefetch.txt
  - --world <id> (required)
  - --manifest <hash> (required)
  - --hex <32hex> (required)
  - --name <session>
- install-browser -> client-install-browser.txt
  - no flags
- hear [--scope <name>] [--wait <s>] [--name <session>] -> client-hear.txt
  - --scope <name>
  - --wait <s>
  - --name <session>
- say "<words>" [--scope <name>] [--reply <line>] [--name <session>] -> client-say.txt
  - --scope <name>
  - --reply <line>
  - --name <session>
- leave [--name <session>] -> client-leave.txt
  - --name <session>
  - --tester <n> (named in the help text, not in the usage line)
- status -> client-status.txt
  - no flags

## api type shapes

Each file is `jayzee api <Type>` output at engine 6.0.0.

- ObjectSpec -> api-ObjectSpec.txt (ObjectProperties & id, tags, place, audience, simulatedBy, visibility, lifetime, scope, retention, state, behavior, children, parent, template, overrides)
- PrimitiveSpec -> api-PrimitiveSpec.txt (32 kinds)
- ObjectPropertiesSpec -> api-ObjectPropertiesSpec.txt (identical to ObjectProperties; the name resolves as an alias)
- ObjectProperties -> api-ObjectProperties.txt
- InputsDef -> api-InputsDef.txt
- AtmosphereDef -> api-AtmosphereDef.txt
- GameSpec -> api-GameSpec.txt
- ObjectDef -> api-ObjectDef.txt
- PlaceDef -> api-PlaceDef.txt
- RoomSpec -> api-RoomSpec.txt
- UIDef -> api-UIDef.txt
- PlayerDef -> api-PlayerDef.txt

## Gaps

- The client verb help text is one shared page (client.txt). No per-verb help is printed.
- The mod verbs print one shared page (mod.txt).
- `jayzee login --help` exits 2 with "unknown word --help" and then prints usage.
- The api listing marks no type as core. The five named types and seven extras were fetched.
- The api listing has 305 types. Only the 12 above were fetched.
- ObjectPropertiesSpec resolves to ObjectProperties, not to a separate type.
- No `jayzee api <Type> <kind>` or `jayzee api <Type>.<key>` forms were run.
