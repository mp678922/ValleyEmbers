# ValleyEmbers

Text choice adventure game prototype for ValleyEmbers.

## Static Playable Build

The runnable game is self-contained in `site/`.

Upload only this folder to a static host:

```text
site/
├── index.html
├── app.js
├── styles.css
├── assets/
└── data/
```

The `site/` folder does not require Node.js, npm, the editor, project scripts, or local AI tools at runtime. It loads game data from its own `./data/` folder and stores player progress in the browser.

Recommended static hosts:

- Render Static Site
- GitHub Pages
- Cloudflare Pages
- Netlify

Do not upload `editor/`, `scripts/`, `tools/`, `tmp/`, `server.js`, or `package.json` as part of the playable static build.

## Local Preview

Node.js is optional for local preview only. Run:

```powershell
node server.js
```

Then open:

```text
http://localhost:3000
```

The current local preview server serves `site/`. It does not represent a runtime dependency for the deployed game. If npm is available, the same preview server can also be started with:

```powershell
npm start
```

On Windows, you can also double-click `start-game.bat`. If the preview server is already running, it opens `http://localhost:3000` directly; otherwise it starts the Node.js preview server first and then opens the page.

## Source Data

Planning and source data are maintained under `docs/`. The deployed static build reads from `site/data/`, which is a publish-ready copy of the needed JSON data.

Edit workflow:

```text
docs/data/   # planning and editor-maintained source data
site/data/   # static playable runtime data
```

When source data changes, sync the relevant JSON files into `site/data/` before publishing.

## Temporary Files

Test, scratch, and experiment outputs belong under `tmp/`. The folder is ignored by Git and can be deleted at any time; scripts that use it recreate their own output folders when needed. The game server and editor do not require any files from `tmp/`.

## Editor

The data editor is a separate Node.js program. Current scope covers item editing for `docs/data/items/items.json` and facility editing for `docs/data/facilities/facilities.json`.

Run:

```powershell
node editor/server/index.mjs
```

Or:

```powershell
npm run start:editor
```

Then open:

```text
http://localhost:3100
```

Editor rule:

- The editor is a local development tool only and is not part of `site/`.
- The editor schema is manually maintained and must not be auto-updated when data properties or categories change.
- Unknown properties must be preserved when the editor saves data.
- Missing known properties may be shown by the editor, but are not written back unless the user edits them.

For the editor on Windows, you can also double-click `start-editor.bat`. If the editor server is already running, it opens `http://localhost:3100` directly; otherwise it starts the editor server first and then opens the page.

## Save Data

- The browser automatically stores the game record as `save@v1` JSON in a Cookie.
- Facility states, small-storage contents, player inventory, villager affection, quest progress, and daily reset fields are part of the saved JSON shape.
- Use `匯出記錄檔` in the web UI to download the current save as a `.json` file.
- Use `匯入記錄檔` in the web UI to load an exported save file back into the browser and Cookie.

## Interface Spec

The main program UI should follow `docs/interface-design.md`. That file defines the data-driven screen layout, generated location/facility/dialogue interactions, save-data display rules, and implementation checklist for the playable browser interface.

Runtime event authoring should follow `docs/data/README.md`. In particular, NPC affection/trust events should not interrupt the immediate `chat` or `gift` response; one-time trust events use `villagerInteractionLeave` so they trigger when the player presses `返回` to leave the character interaction page.

## Structure

```text
.
├── README.md
├── server.js
├── package.json
├── site/            # self-contained static playable build
│   ├── index.html
│   ├── styles.css
│   ├── app.js
│   ├── assets/
│   └── data/
├── docs/
│   ├── game-design.md
│   └── data/
│       ├── scenes/
│       ├── items/
│       └── villagers/
├── editor/           # local data editor; not part of site/
├── scripts/          # local maintenance scripts; not part of site/
├── tools/            # local asset/AI tooling; not part of site/
├── tmp/              # ignored local test and experiment outputs
├── .editorconfig
└── .gitignore
```
