# ValleyEmbers Editor

## Scope

This editor is a separate Node.js program for editing repository data files.

Current scope:

- Edit `docs/data/items/items.json`
- Edit `docs/data/facilities/facilities.json`

## Hard Rules

- The editor schema is manually maintained.
- If data files gain or lose properties, or if new categories appear, do not update the editor unless the user explicitly asks to update the editor.
- Unknown properties must be preserved on save.
- Missing known properties may be shown in the UI, but must not be written back unless the user edits them.
- Saving must merge edited known fields into the original object instead of rebuilding the object from the editor schema.
- The facility editor understands the current small-storage planning fields such as `locationIds`, `baseActions`, and `smallStorage`, but still preserves any extra facility properties it does not know.

## Run

```powershell
node editor/server/index.mjs
```

Default URL:

```text
http://localhost:3100
```
