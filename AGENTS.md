# Project Instructions

## Scope

These instructions apply to the entire repository.

## Working Style

- Keep changes focused on the requested task.
- Prefer existing project patterns once a stack is introduced.
- Do not commit changes unless explicitly asked.
- Update documentation when setup or workflow steps change.
- Read project text files with UTF-8 encoding by default, especially Markdown and JSON files containing Chinese text.
- Save JSON files as UTF-8 without BOM. Do not introduce BOM when editing or generating JSON.
- Treat files under `docs/` as planning and design documents. When those files are edited, do not update implementation code unless explicitly asked to build or synchronize the program.
- Keep test, scratch, and experiment outputs under `tmp/`. Scripts that write there must create the directory when it is missing, and the main program must not depend on files under `tmp/`.
- Before adding runtime behavior, inspect the current architecture and prefer an existing generic path such as data tables, event pages, command handlers, effects, save-state normalization, or shared render flows. Do not hard-code one-off behavior when an existing generic mechanism can express it.
- If a requested feature appears to require special-case runtime logic, pause before implementing that special case. Explain why the current generic architecture cannot cover it, identify which generic layer could be extended instead, and wait for the user to decide how the reusable architecture should grow.
- When modifying program UI, read `docs/interface-design.md` first and keep the implementation consistent with it. If the requested UI change alters behavior or layout rules, update `docs/interface-design.md` in the same task and keep the interface plan version and program version aligned.
- Player-facing game descriptions should default to the protagonist's viewpoint and prioritize immersion. Avoid visible wording that explains internal systems directly, such as reset times, generation rules, unlock logic, hidden data behavior, or implementation details, unless the user explicitly asks for system-facing text.

## Verification

- Run relevant checks before handing work back when the project has tests or tooling.
- During planning-only or data-design work, do not start the app server, open browser checks, or run browser-based testing unless the user explicitly asks for it. Keep this rule unless the user explicitly asks to remove it.
- If a check cannot be run, explain what blocked it.

## Project Context

- Before substantial work, read `PROJECT_CONTEXT.md` if it exists to understand prior work, decisions, verification, and follow-ups.
- When asked to summarize a conversation, update `PROJECT_CONTEXT.md` rather than storing work history directly in `AGENTS.md`.
