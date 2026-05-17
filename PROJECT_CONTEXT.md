# Project Context

This file stores concise conversation summaries for future Codex sessions. Keep entries factual and focused on completed work, decisions, changed files, verification, and follow-ups.

## 2026-05-04 - Conversation Summary

### Completed
- Created the `summarize-work-context` Codex skill in `C:\Users\yun\.codex\skills\summarize-work-context`.
- Added a `Project Context` section to `AGENTS.md` instructing future agents to read and update `PROJECT_CONTEXT.md`.
- Created this `PROJECT_CONTEXT.md` file as the repository-local store for concise conversation summaries.

### Decisions
- Keep stable agent instructions in `AGENTS.md`.
- Store conversation history and durable project context in `PROJECT_CONTEXT.md` instead of appending long work logs to `AGENTS.md`.

### Changed Files
- `AGENTS.md`
- `PROJECT_CONTEXT.md`

- `C:\Users\yun\.codex\skills\summarize-work-context\SKILL.md`
- `C:\Users\yun\.codex\skills\summarize-work-context\agents\openai.yaml`

### Verification
- Skill validation was attempted with `quick_validate.py`, but the local Python environments were missing the `yaml` package required by the validator.

## 2026-05-04 - Conversation Summary: 設計文字冒險遊戲

### Completed
- Created the initial game design documentation for a text choice adventure game centered on village life, resource management, villager trust, outside exploration, and ancient ruins.
- Defined the premise: a male outsider is rescued by a small border village mostly composed of young women after being drawn toward nearby ruins, attacked, and brought back for treatment.
- Established the main loop: village slow-life actions alternate with risky outside exploration to gather resources, uncover ruin mysteries, improve facilities, and build trust.
- Defined first-version systems for life, stamina, 24-hour time progression, time blocks, action time costs, village resources, facilities, villager trust, action types, scene flow, state data, and scene data.
- Added structured data files for initial villagers and items.

### Decisions
- Store design rules and system explanations in `docs/game-design.md`.
- Store item data in `docs/data/items/items.json` and villager data in `docs/data/villagers/villagers.json`; the design document should describe formats and rules without duplicating full data.
- First MVP scope includes one male player character, six young female core villagers, at least ten scenes, time-costed choices, life and stamina, village resources, upgradeable facilities, villager quests, and multiple endings.
- Initial core villagers are 艾妲, 米菈, 洛卡, 賽拉, 托莉, and 伊蓮.
- Initial item categories are `consumable`, `material`, `resource`, `key_material`, `quest_item`, and `clue`.

### Changed Files
- `docs/game-design.md`
- `docs/data/items/items.json`
- `docs/data/villagers/villagers.json`

### Verification
- Reviewed the design document and JSON data files with UTF-8 decoding.

### Follow-ups
- Decide whether daily time progression needs an end-of-day settlement phase.
- Decide whether villagers need full schedules or only time-block locations for the first version.
- Resolve remaining design questions around combat, the missing previous generation, the cursed beast attack, trust effects, village development structure, and ending types.

## 2026-05-04 - Conversation Summary: 企劃擴充與資料結構優化

### Completed
- Expanded the text adventure design with village sub-scenes, free movement, basic scene commands, character schedules, dynamic dialogue, and a quest data model.
- Renamed villager `洛卡 / locka` to `諾絲 / nuosi` across planning and data files.
- Changed 伊蓮 from a blind storyteller to a共同宿舍管理者 while preserving her role in old records, ruin lore, and dormitory/night-event management.
- Replaced the earlier trust wording with affection (`好感 / affection`) in the design data.
- Reduced village free-move locations to five core places: 村莊廣場, 共同宿舍, 藥草棚, 工坊倉庫, and 村口.
- Added compact data tables for commands, locations, relationships, quests, dynamic dialogue fragments, scenes, villagers, and items.
- Optimized data structure for lower token usage by moving shared commands, reusable locations, and relationship summaries into separate files.
- Added `docs/data/README.md` documenting data-layer responsibilities and token-saving rules.

### Decisions
- Treat files under `docs/` as planning/data artifacts only; do not synchronize frontend implementation unless explicitly requested.
- Generate standard location commands (`search`, `useItem`, `wait`) from `docs/data/commands/commands.json` instead of duplicating them in every scene.
- Generate fixed village locations and exits from `docs/data/locations/locations.json`; keep `docs/data/scenes/scenes.json` for story, exploration, and dialogue scenes.
- Generate visible character interaction options from schedules and `allowPresentVillagers` rather than hard-coding them into each location.
- Store character relationships as pair records in `docs/data/relationships/relationships.json` instead of embedding a full relationship matrix in each villager.
- Dynamic dialogue should select at most a small number of relevant fragments from `docs/data/dialogues/dialogues.json` based on time, location, affection, recent actions, quest state, flags, and items.

### Changed Files
- `docs/game-design.md`
- `docs/data/README.md`
- `docs/data/commands/commands.json`
- `docs/data/locations/locations.json`
- `docs/data/relationships/relationships.json`
- `docs/data/villagers/villagers.json`
- `docs/data/scenes/scenes.json`
- `docs/data/quests/quests.json`
- `docs/data/dialogues/dialogues.json`
- `docs/data/items/items.json`

### Verification
- Parsed all JSON data files with Node.js after the restructuring.
- Checked scene and location references, including `nextSceneId` and location exits.
- Checked villager, relationship, quest, item, and dialogue cross-references.
- Checked that the previous corrupted `?` characters were removed from affected JSON files.
- Confirmed no remaining references to old `洛卡`, `locka`, `失明`, or removed village-only locations such as 村長屋, 獵人小屋, 故事師小屋, 旅人廣場, 農田, and 牧場.

### Follow-ups
- The browser prototype in `public/` still uses the older runtime assumptions and was intentionally not updated.
- If implementation work begins, update the data loader to read `commands`, `locations`, `relationships`, and generated present-villager interactions.
- Consider further shrinking `game-design.md` by moving long examples into data docs if token usage becomes a problem.

## 2026-05-05 - Conversation Summary: 森林探索與簡化戰鬥企劃

### Completed
- Added a forest exploration and encounter system section to `docs/game-design.md`.
- Replaced the earlier unresolved combat direction with a simplified encounter-choice model.
- Added planning rules for carry weight, exploration skill, combat skill, and archery skill.
- Defined the first exploration area as the forest, with outer forest, middle forest, and deep forest layers.
- Documented forest actions: explore deeper, search for resources, rest, use item, shout to attract enemies, and return to village.
- Updated MVP scope and pending design questions to include forest exploration, monster solution tables, carry weight, and skill training.
- Removed conflicting planning text that treated life reaching zero as an immediate game over in normal forest exploration.

### Decisions
- First version should not implement traditional turn-based attack and defense combat.
- Combat is an encounter event where player choices directly decide the result.
- Available combat options depend on carried items, current stamina, combat skill, archery skill, and known monster information.
- Monsters should have memorable handling rules with best, normal, and worst solutions.
- Correct tools such as sword, bow, trap, or torch can guarantee or strongly favor success against appropriate monsters, but may consume stamina or items.
- Player strength should come from preparation, carried tools, monster knowledge, and a small set of skills rather than attack and defense stats.
- Carry weight is a core exploration constraint; players cannot bring every countermeasure and all supplies while still carrying back resources.
- Each forest layer has exploration progress up to 100%, but reaching 100% does not permanently skip the layer. Each outing still requires passing through earlier layers.
- Exploration skill and route familiarity improve travel efficiency through known layers by reducing time, stamina cost, or event risk.
- In normal forest exploration, life reaching zero does not cause death. A mysterious benevolent forest beast secretly rescues the protagonist.
- When life reaches zero in forest exploration, the run ends, all resources gained during that outing are lost, the date advances by one day, and the protagonist wakes at an appropriate time, defaulting to 06:00.
- On waking after rescue, one of the six core girls is randomly present and caring for the protagonist.
- Death endings are reserved for later main-story, ruins, curse, or special high-risk events.

### Changed Files
- `docs/game-design.md`
- `PROJECT_CONTEXT.md`

### Verification
- Searched `docs/game-design.md` for the new forest, carry weight, simplified combat, and life-zero rescue rules.
- Confirmed old phrases for immediate game over in normal forest exploration were removed from the key rules.

### Follow-ups
- Design the first batch of outer forest exploration events.
- Define initial monster solution tables and penalties for best, normal, and worst outcomes.
- Decide exact carry weights for sword, bow, traps, torch, food, medicine, rope, and forest resources.
- Decide how exploration skill, combat skill, and archery skill are trained or improved.
- Decide whether forest exploration data, monster encounters, and monster solution tables should be split into new data files or prototyped first in `docs/data/scenes/scenes.json`.

## 2026-05-05 - Conversation Summary: 山谷村世界觀與禁忌之書主線

### Completed
- Revised the world setting so the village is named 山谷村 and is isolated from the outside world.
- Renamed the forest setting to 山谷森林 across planning text and relevant data strings.
- Changed the protagonist premise: he is a person from outside the valley who accidentally enters because of the ruins' power, then is attacked near 山谷森林 and rescued by 山谷村.
- Added 山谷之神 as the ancient being sleeping in the depths of the valley ruins.
- Added the core curse backstory: 山谷村 once paid a great price to receive abundance from 山谷之神, later failed to perform the required live-sacrifice ritual, and was cursed.
- Added a main-story structure around searching for four 禁忌之書.
- Added a placeholder main quest for the four forbidden books in `docs/data/quests/quests.json`.
- Updated 伊蓮's character background so she preserves lore about 山谷之神, 活祭儀式, ruins legends, and forbidden songs.

### Decisions
- The world and main structure should support an open-world sandbox direction.
- Forbidden-book quest routes, triggers, and discovery paths can be non-fixed.
- The actual acquired/revealed forbidden books must always follow this order:
  1. The first book reveals that 山谷之神 brought abundance to 山谷村.
  2. The second book reveals that 山谷之神 requires live sacrifice.
  3. The third book reveals that 山谷之神's curse makes things dangerous and mad, beyond only birth abnormalities.
  4. The fourth book reveals the method to defeat 山谷之神.
- The four forbidden books are recorded as high-level truth-reveal nodes only; acquisition locations, guardians, reading costs, character ties, and detailed task flow remain undecided.
- Continue treating `docs/` changes as planning/data only; no implementation synchronization was requested.

### Changed Files
- `docs/game-design.md`
- `docs/data/scenes/scenes.json`
- `docs/data/locations/locations.json`
- `docs/data/quests/quests.json`
- `docs/data/items/items.json`
- `docs/data/villagers/villagers.json`
- `PROJECT_CONTEXT.md`

### Verification
- Parsed updated JSON files with Node.js after edits, including `docs/data/quests/quests.json`, `docs/data/villagers/villagers.json`, and earlier affected scene/location/item data.
- Searched planning and data files for 山谷村, 山谷森林, 山谷之神, 活祭, 禁忌之書, and open-world sandbox wording to confirm the new setting was recorded.

### Follow-ups
- Plan the specific acquisition routes, locations, guardians, reading costs, and related characters for the four forbidden books.
- Decide how the open-world sandbox structure gates fixed forbidden-book revelation order without forcing a fixed quest route.
- Define how the third book's "dangerous and mad" curse effects appear in forest, village, ruins, and creature behavior.
- Decide whether the fourth book leads to a direct defeat route, multiple methods, or a moral tradeoff ending.

## 2026-05-05 - Conversation Summary: 森林戰鬥、敵人、話嘮的貓與深層神話設定

### Completed
- Refined the combat system from broad encounter outcomes into five named combat result tiers: `大勝利`, `勝利`, `小失敗`, `失敗`, and `大失敗`.
- Defined combat resolution rules for melee, ranged weakening before melee, consumable combat tools, and the separate `逃跑` command.
- Clarified that `大失敗` does not create a separate death branch in normal forest exploration; it collapses into the same retreat-and-rescue outcome as life reaching zero.
- Replaced earlier generic weapon naming with concrete gear such as `老舊的劍`, `士兵長槍`, `獵弓`, `投石索`, `箭矢`, `石頭`, and `補網`.
- Added combat-related item categories and tagging rules, including which items count as `戰鬥工具` and which ones are consumable versus ammunition only.
- Added common forest-enemy loot rules by difficulty (`碎骨`, `獸骨`, `硬獸骨`) plus name-based special-drop rules for `羽毛`, `獸牙`, `月露草`, and `獸角`.
- Created `docs/data/enemies/enemies.json` with fifteen forest enemies across outer, middle, and deep forest, with five enemies per region and at least one `飛獸`, `四足獸`, and `雙足獸` in each region.
- Adjusted several enemy names to avoid human-like or high-fantasy apex-creature naming, including replacing `灰翼幼龍` and `瘋獵人`.
- Added the forest-only special NPC `話嘮的貓`, who provides forest information and comic-but-mysterious dialogue.
- Recorded that `話嘮的貓` is secretly the giant black panther that rescues the protagonist and was responsible for getting the protagonist to a discoverable location near the village at the beginning.
- Added the deeper myth note that the valley god is actually one of a pair of twins, and the cat-form figure is the twin who was betrayed, sealed, cursed, and transformed.

### Decisions
- In normal forest exploration, there is only one failure-resolution path for life-zero-style collapse: retreat from exploration and secret rescue back to the village.
- `大勝利` is reserved for choosing the correct consumable combat tool and directly defeating the enemy.
- `逃跑` is not one of the five combat result tiers; it is a separate command with fixed cost: stamina `-1` and life randomly `0` to `-1`.
- `飛獸` always nullifies ammunition-based ranged weakening; `四足獸` should remain weak to `槍` and `箭矢`; `雙足獸` should remain weak to `劍` and `石頭`.
- Keep `長槍` removed as an item; for current itemization, `槍`-type melee effectiveness maps to `士兵長槍`.
- Forest-enemy loot should stay simple and rule-based rather than per-enemy bespoke drop tables.
- `話嘮的貓` should remain a forest-only special NPC, not a village resident.
- The cat's deeper relation to the twin valley gods and the main plot is now established as canon, but the detailed main-story consequences remain intentionally unspecified.

### Changed Files
- `docs/game-design.md`
- `docs/data/items/items.json`
- `docs/data/enemies/enemies.json`
- `docs/data/villagers/villagers.json`
- `docs/data/README.md`
- `PROJECT_CONTEXT.md`

### Verification
- Parsed updated JSON files with Node.js after each wave of edits, including `docs/data/items/items.json`, `docs/data/enemies/enemies.json`, and `docs/data/villagers/villagers.json`.
- Verified that the enemy roster still contains fifteen enemies total, five per region, with all three category types represented in every forest layer.
- Verified that the removed `長槍` item no longer exists, while `士兵長槍` remains the active spear-type combat item.
- Verified combat-tool tagging rules, ammunition exclusions, renamed enemy records, and the inserted `話嘮的貓` character record.

### Follow-ups
- Decide the exact numeric life and stamina effects for `大勝利`, `勝利`, `小失敗`, `失敗`, and `大失敗`.
- Decide whether enemy drops should depend only on the enemy identity, or also vary by combat result tier.
- Design when and how `話嘮的貓` first appears in exploration scenes, how often it can recur, and whether it can be missed.
- Decide how the twin-god betrayal, sealing, and curse relate to the active valley god, the live-sacrifice contract, and the four forbidden books.

## 2026-05-06 - Conversation Summary: 村莊設施、道具重量與獨立編輯器

### Completed
- Expanded planning/data for village facilities, item rules, and location interactions without synchronizing gameplay implementation.
- Added village-currency item `螢石`, set it as a common liked gift for the six village girls, and recorded its exchange purpose.
- Reworked `村口` into `開墾區` across planning and data files, including location references, villager schedules, scenes, dialogues, quest text, and relationship notes.
- Added a new `facilities` data layer with `docs/data/facilities/facilities.json`.
- Added and refined facilities including `主角的床`, `蘋果樹`, `看板`, `田地`, `莓果叢`, `雜草叢`, `倉庫箱`, and `製藥台`.
- Added related item data for `蘋果`, `梅果`, and `花朵`.
- Removed the old dormitory short-rest action and kept only the protagonist-bed six-hour full recovery action.
- Assigned explicit carry weights to all items in `docs/data/items/items.json`, allowing decimal values and eliminating missing weights.
- Built a separate dependency-free Node.js data editor under `editor/` for `docs/data/items/items.json`.
- Added editor backend services for fixed schema handling, tolerant normalization, merge-save behavior, backup creation, and diff generation.
- Added editor frontend with item overview, filtering, sorting, modal editing, unknown-property display, missing-field warnings, and save feedback.
- Added `start-editor.bat` to launch the editor server similarly to `start-game.bat`.
- Fixed an editor UI bug where the modal was visible on initial load because CSS overrode the `hidden` attribute.
- Changed the item editor UX from list-first editing to an overview table so all items, especially weights, can be reviewed and sorted together.

### Decisions
- Treat new facility and item additions as planning/data work only; do not update the browser prototype unless explicitly requested.
- `螢石` is the village currency and a generally liked gift, but editor/item schema changes remain manually maintained.
- Facility data is now a separate table; location-level interactable objects belong in `facilities.json` unless they need independent movement/exits.
- New edible items default to stamina `+1` unless a different effect is explicitly designed.
- `田地` is upgradeable by 托莉, does not directly produce actions or output, and instead governs future farming-related functions.
- `倉庫箱` starts at carry capacity `20`, gains `+10` per level, caps at level `5`, and is upgraded by 諾絲 with materials still undecided.
- The editor schema is fixed and manual: when data files gain/remove properties or categories, do not update the editor unless the user explicitly asks to update the editor.
- The editor must tolerate old-editor/new-data and new-editor/old-data combinations by preserving unknown properties and tolerating missing known fields.
- Editor saves must merge edited known fields into the original object instead of rebuilding objects from schema-only form state.
- The main item editor workflow should prioritize overview and comparison first, with single-item editing via a popup modal.

### Changed Files
- `PROJECT_CONTEXT.md`
- `docs/game-design.md`
- `docs/data/README.md`
- `docs/data/facilities/facilities.json`
- `docs/data/items/items.json`
- `docs/data/locations/locations.json`
- `docs/data/villagers/villagers.json`
- `docs/data/dialogues/dialogues.json`
- `docs/data/relationships/relationships.json`
- `docs/data/quests/quests.json`
- `docs/data/scenes/scenes.json`
- `README.md`
- `package.json`
- `.gitignore`
- `start-editor.bat`
- `editor/README.md`
- `editor/server/index.mjs`
- `editor/server/routes/items.mjs`
- `editor/server/services/schema-registry.mjs`
- `editor/server/services/data-store.mjs`
- `editor/server/services/backup.mjs`
- `editor/server/services/diff.mjs`
- `editor/server/services/normalizer.mjs`
- `editor/server/services/serializer.mjs`
- `editor/public/index.html`
- `editor/public/app.js`
- `editor/public/styles.css`

### Verification
- Parsed all `docs/data` JSON files with Node.js repeatedly after planning/data edits.
- Verified no remaining `村口` / `village_gate` references remained in current planning/data files after the location rename to `開墾區`.
- Verified all items now have a `weight` field and that the item count remained `29`.
- Verified editor server syntax for backend and frontend files with `node --check`.
- Verified editor API end-to-end with `GET /api/items` and a no-op `POST /api/items/save`, including backup creation and zero-diff save behavior.
- Verified the revised overview-based editor still serves `http://localhost:3100/` and returns `items@v1` with `29` records from `/api/items`.
- Verified the modal visibility bug fix by restoring CSS respect for the `hidden` attribute.

### Follow-ups
- Decide concrete crafting recipes for the `製藥台`.
- Decide upgrade materials for `倉庫箱` and `田地`.
- Decide whether `花朵` should remain edible or become gift-only once more specific item rules exist.
- If future editing is needed for facilities, villagers, quests, or locations, add separate manual schemas instead of auto-expanding the item editor.
- If the user wants richer bulk editing, extend the item overview table with inline editing for selected columns such as `weight`.

## 2026-05-06 - Conversation Summary: tmp 暫存輸出規則

### Completed
- Added a repository rule that test, scratch, and experiment outputs must stay under `tmp/`.
- Added `tmp/` to `.gitignore` so it can be deleted regularly without affecting tracked project files.
- Updated the game server and editor server to create the repository-level `tmp/` directory on startup if it is missing.
- Moved experiment/test script outputs from `public/assets/...` to `tmp/...` for pixel scaling, generated character cutouts, character pixel assets, and the perfect-pixel Sela sample.
- Updated script manifest paths for temporary generated assets to point at `tmp/...`.
- Updated `README.md` to document that `tmp/` is ignored, disposable, recreated by scripts, and not required by the game server or editor.

### Decisions
- The main game and editor may create `tmp/` for environment consistency, but must not read or depend on files inside it.
- Temporary image experiments should not write into runtime asset folders such as `public/assets` unless the user explicitly asks to promote them into real application assets.
- Scripts that write under `tmp/` must create their output subdirectories when missing.

### Changed Files
- `.gitignore`
- `AGENTS.md`
- `README.md`
- `server.js`
- `editor/server/index.mjs`
- `scripts/test-pixel-scale.ps1`
- `scripts/process-generated-character-cutouts.ps1`
- `scripts/build-character-pixel-assets.ps1`
- `scripts/draw-perfect-pixel-sela.mjs`
- `PROJECT_CONTEXT.md`

### Verification
- Ran `node --check server.js`.
- Ran `node --check editor/server/index.mjs`.
- Ran `node --check scripts/draw-perfect-pixel-sela.mjs`.
- Parsed PowerShell scripts with `System.Management.Automation.Language.Parser` for `scripts/test-pixel-scale.ps1`, `scripts/process-generated-character-cutouts.ps1`, and `scripts/build-character-pixel-assets.ps1`.
- Ran `node scripts/draw-perfect-pixel-sela.mjs` and confirmed it wrote to `tmp/characters-perfect-pixel-128/sela.png`.
- Searched relevant files to confirm temporary asset output references now target `tmp/...`, while the main game/editor code only creates `tmp/` and does not load files from it.

### Follow-ups
- If future scripts produce test, scratch, log, or experiment files outside `tmp/`, move those outputs under `tmp/` unless they are intended to become real runtime assets or durable documentation.

## 2026-05-06 - Conversation Summary: NPC 互動、設施升級與角色交易資料

### Completed
- Added dynamic NPC interaction generation to the browser prototype so free-move locations can show present villagers from schedules and open a generated dialogue menu.
- Removed `打聽` and `請求協助準備` from the active dialogue menu.
- Made the `任務` command conditional: it only appears when the current NPC has an incomplete quest whose prerequisites are currently met.
- Removed the `工坊倉庫修繕` quest and cleared the stale `nextQuestIds` reference from `山谷森林的第一批木材`.
- Added facility-upgrade interaction choices generated from `docs/data/facilities/facilities.json` via `upgrade.upgrader`.
- Added data-driven upgrade commands for linked villagers: 諾絲 gets `升級倉庫箱`; 托莉 gets `升級田地`.
- Added `交易` to the dialogue menu and designed Fluorite-based character trading rules.
- Added `carriedItems` to every villager, with three carried trade items each, affection unlock thresholds, Fluorite prices, daily stock caps, and daily restock values.
- Updated planning docs to describe trade, affection-gated carried items, purchase stock reduction, and daily restock semantics.

### Decisions
- NPC interaction menus should be generated from data rather than hard-coded dialogue scenes when possible.
- `任務` should not be shown as a dead command when a character has no currently available quest.
- Facility upgrade options should come from `facilities[].upgrade.upgrader`; future upgradeable facilities should automatically attach to the relevant character through data.
- Character trading uses `fluorite` as currency. Trade stock is owned by the character, decreases when bought, and refreshes daily up to the configured max.
- This pass updated both planning data and the existing browser prototype for menu simulation, but did not implement a full purchase UI, per-character trade inventory state, or end-of-day restock logic.

### Changed Files
- `PROJECT_CONTEXT.md`
- `docs/game-design.md`
- `docs/data/README.md`
- `docs/data/commands/commands.json`
- `docs/data/quests/quests.json`
- `docs/data/villagers/villagers.json`
- `public/app.js`

### Verification
- Ran `node --check public/app.js`.
- Parsed updated JSON files with Node.js, including commands, quests, facilities, villagers, and items data.
- Verified `工坊倉庫修繕` / `nuosi_workshop_storage_repair` no longer appears in `docs/`.
- Simulated dialogue menus for NPCs, confirming `交易` appears, `任務` is conditional, and upgrade options appear for 諾絲 and 托莉.
- Verified every villager has exactly three `carriedItems`, all referenced `itemId` values exist in `items.json`, and all prices use `fluorite`.
- Confirmed local HTTP requests returned `200` for updated app/data files while the local prototype server was running.

### Follow-ups
- Implement the actual trade UI: list unlocked `carriedItems`, show price and remaining stock, check player Fluorite, and buy items.
- Add per-character trade stock to save data and daily restock logic that refills stock by `dailyRestock` up to `stock.max`.
- Decide whether special NPCs such as `話嘮的貓` should use normal `送禮` and `交易` flows or a restricted custom interaction set.
- Decide concrete material requirements and costs for facility upgrades such as `倉庫箱` and `田地`.

## 2026-05-06 - Conversation Summary: 宿舍勿擾、企劃驗證限制與等待指令企劃

### Completed
- Implemented NPC dormitory do-not-disturb behavior in the browser prototype: villagers whose current time-block location is `共同宿舍` during `夜晚` or `深夜` are not listed as interactable, and stale dialogue states only allow returning with a do-not-disturb message.
- Added a durable repository rule to `AGENTS.md`: during planning-only or data-design work, do not start the app server, open browser checks, or run browser-based testing unless explicitly requested; keep this rule unless the user explicitly asks to remove it.
- Updated the planning for the `wait` command so choosing wait only opens a duration selector and does not immediately advance time.
- Updated `docs/data/commands/commands.json` so `wait` has `defaultTimeCostSeconds: 0` plus a `timeInput` slider spec: minimum `60` seconds, maximum `3600` seconds, step `60` seconds, and confirmation required.
- Reverted an accidental implementation attempt for the wait slider in `public/app.js` and `public/styles.css`; the final wait-slider change from this conversation is planning/data only.

### Decisions
- In planning/data phases, interpret requests as documentation/data updates only unless the user explicitly asks to implement, build, synchronize to code, or test.
- Browser/server verification is considered unnecessary and token-wasteful during planning-only work unless the user asks for it.
- Wait duration selection should use a slider bar from `1` to `60` minutes in `1` minute steps, and time advances only after confirmation.
- Dormitory rest do-not-disturb applies specifically to `夜晚` and `深夜` when the NPC's scheduled location is `共同宿舍`; NPCs elsewhere at night remain interactable.

### Changed Files
- `PROJECT_CONTEXT.md`
- `AGENTS.md`
- `docs/game-design.md`
- `docs/data/commands/commands.json`
- `public/app.js`

### Verification
- Ran `node --check public/app.js` after the dormitory do-not-disturb implementation.
- Simulated dormitory/night schedule filtering and confirmed no NPC is interactable in `共同宿舍` during `夜晚` or `深夜`, while a night NPC outside the dormitory remains interactable.
- Confirmed the accidental wait implementation markers were removed from `public/app.js` and `public/styles.css`.
- Did not start the app server or run browser-based testing after the planning-only verification rule was added.

### Follow-ups
- If the user explicitly asks to implement the wait selector later, build it from the `timeInput` spec in `docs/data/commands/commands.json`.
- Future planning/data changes should avoid touching `public/`, `server.js`, editor code, or runtime assets unless the user explicitly asks for implementation synchronization.

## 2026-05-06 - Conversation Summary: 企劃模式保護 Skill

### Completed
- Created the local Codex skill `planning-only` at `C:\Users\yun\.codex\skills\planning-only`.
- Defined `企劃` as the trigger for planning-document mode.
- The skill instructs future agents to keep the conversation limited to planning/design/document files, especially `docs/`, and to avoid implementation code, editor/runtime files, servers, browser checks, and regular tests.
- Added a warning boundary: if the user asks during planning mode to touch the program system, editor, scripts, tests, runtime, browser checks, or other implementation surfaces, the agent must warn first and ask for confirmation before acting.

### Verification
- Confirmed `SKILL.md` and `agents/openai.yaml` exist and can be read with UTF-8.
- Confirmed the skill frontmatter includes `name: planning-only`, a description mentioning `企劃`, and the warning text.
- Installed `PyYAML 6.0.3` into the Codex bundled Python runtime at `C:\Users\yun\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe`.
- Re-ran `quick_validate.py` with `PYTHONUTF8=1` so Windows would read the Chinese `SKILL.md` content as UTF-8.
- Confirmed `C:\Users\yun\.codex\skills\planning-only` passes validation with `Skill is valid!`.

## 2026-05-06 - Conversation Summary: 企劃助手、規則收斂與指令資料重整

### Completed
- Created the local Codex skill `planning-assistant` at `C:\Users\yun\.codex\skills\planning-assistant`.
- Added `planning-assistant` report output support via `scripts/write_report.py`, which writes dated Markdown reports to `docs/planning-assistant-reports/`.
- Ran the first planning-assistant review and generated `docs/planning-assistant-reports/2026-05-06-0840.md`.
- Updated `planning-assistant` so future reports use five planning suggestions instead of three.
- Recorded that `docs/data/*.json` is the authority for executable values and complete records, while Markdown planning text explains intent and may lag behind JSON.
- Removed the separate village resource mechanism from planning/data; wood, herbs, ore, food, and similar materials now use item, quest state, or container data.
- Added `canDisappearOnExplorationFailure` to every item and defined the normal forest failure penalty as a 33% loss chance per eligible item.
- Added `price` to every item, with `fluorite` as currency and `sellable` marking sellable vs non-sellable items.
- Added the special NPC `lizard_merchant`, the `lizard_well` facility, and the `lizard_merchant_dry_ration_request` quest.
- Reworked command data so village locations and exploration areas use different command sets with `usableIn` scope markers.
- Removed `search`, `ask`, `prepare`, `explorationRest`, and `interact` as active commands.
- Merged rest into `wait`; `wait` now works in village locations and exploration, with exploration-specific stamina recovery/risk semantics.
- Removed hard-coded forest wood-gathering choices from `forest_edge`; it now uses `baseCommandSet: "exploration"`.
- Changed location interaction planning so entering a scene directly shows a generated interaction list containing facilities and present characters, without a separate "與在場角色互動" command.
- Updated dialogue data so old `ask` dialogue fragments are treated as `chat` fragments.

### Decisions
- `docs/data` JSON is the source of truth for concrete values such as item weights, prices, time costs, stock counts, and actual data counts.
- Markdown and reports should treat stale Markdown-vs-JSON mismatches as stale summaries when JSON is clearly the authority, not always as true rule contradictions.
- `quests.json` is a read-only quest template table, not save data; actual player quest progress belongs in exported/imported save JSON.
- The special NPC `話嘮的貓` does not use core-villager affection, gift, trade, schedule, or quest logic even if temporarily stored in `villagers.json`.
- The special NPC `蜥蜴商人` does not use core-villager social logic; he appears in `開墾區` at night, hides in the well during the day, buys sellable player/storage items for fluorite, and sells combat tools except ammo and equipment.
- The lizard merchant day-access quest has no prerequisites; submitting 3 `dry_ration` grants `lizard_merchant_day_access`.
- Daily reset occurs at `06:00:00` and covers trade restock, daily gatherables, board messages, and daily flags without mutating planning JSON files.
- Scene interaction lists should be generated from `facilities.json` plus present characters from schedules and `allowPresentVillagers`.
- Village command set is now `useItem`, `wait`, `observe`; exploration command set is now `exploreDeeper`, `forage`, `wait`, `useItem`, `shoutAttractEnemy`, `returnToVillage`; dialogue command set is now `chat`, `gift`, `trade`, `quest`, `leave`.

### Changed Files
- `PROJECT_CONTEXT.md`
- `docs/game-design.md`
- `docs/data/README.md`
- `docs/data/commands/commands.json`
- `docs/data/dialogues/dialogues.json`
- `docs/data/facilities/facilities.json`
- `docs/data/items/items.json`
- `docs/data/quests/quests.json`
- `docs/data/scenes/scenes.json`
- `docs/data/villagers/villagers.json`
- `docs/planning-assistant-reports/2026-05-06-0840.md`
- `C:\Users\yun\.codex\skills\planning-assistant\SKILL.md`
- `C:\Users\yun\.codex\skills\planning-assistant\agents\openai.yaml`
- `C:\Users\yun\.codex\skills\planning-assistant\scripts\write_report.py`

### Verification
- Validated `planning-assistant` with `quick_validate.py` using `PYTHONUTF8=1`.
- Parsed all relevant `docs/data` JSON files with Node.js after each data-design update.
- Verified all items have `price` and `canDisappearOnExplorationFailure`.
- Verified lizard merchant sells only `trap`, `torch`, and `capture_net`, with no ammo or equipment in his sell list.
- Verified `lizard_well` and `lizard_merchant_dry_ration_request` exist and connect through `lizard_merchant_day_access`.
- Verified command base sets do not reference missing commands and scene choices do not use missing `actionType` values.
- Verified `forest_edge` no longer has hard-coded wood-gathering choices.
- Did not start the app server or run browser-based tests during these planning/data updates.

### Follow-ups
- If implementation synchronization is requested later, update runtime command generation to respect `usableIn`, generated facility/character interaction lists, the removed commands, and merged wait/rest behavior.
- If implementation synchronization is requested later, update trading to support lizard merchant buy-from-inventory/storage and item `price.sellable`.
- If implementation synchronization is requested later, update save-state handling for daily reset, per-item exploration failure loss, quest template vs save data, and lizard merchant day access.

## 2026-05-08 - Conversation Summary: Browser Prototype UI, Trading, Gifts, and Dialogue Pool

### Completed
- Synchronized the browser prototype with the recent planning direction and made it runnable at `http://localhost:3000/`.
- Reworked the command UI into scene-entry groups: executable commands, visible NPCs, visible objects/facilities, and exits to other scenes.
- Added direct travel from the village square to the forest entrance and kept forest exploration available from the reclamation area.
- Removed player-facing view/check commands from the runtime command surface.
- Moved backpack display above save operations and removed villager affection and facility status from the sidebar.
- Set initial player stamina to `10`, initial inventory to `sword x1` and `fluorite x10`, and corrected `梅果` to `莓果` / `berry`.
- Added the `補給箱` facility in the village square as a small storage that randomly supplies one consumable combat tool per day until total contained item count reaches three.
- Standardized item-producing facilities as small storages that the player can withdraw from but cannot deposit into; facility menus show contained items directly.
- Implemented nested menus for facility interactions, NPC interactions, item use, and wait.
- Added a wait slider from `1` to `180` minutes with return/confirm controls; confirming wait consumes the selected time.
- Added a short busy state for time-consuming actions: the interface temporarily hides interactive options and displays a 0.3 second fake progress bar.
- Implemented NPC interaction menus with affection display and renamed the NPC exit action to `返回`.
- Implemented trade as a draft/cart interface using increase/decrease quantities, total price, remaining fluorite preview, and a final settlement that consumes five minutes; locked affection-gated goods are not shown.
- Added a sell-draft flow that can be revised before settlement.
- Added gift UI and `canGift` item metadata; only safe gifts such as `fluorite`, `berry`, `apple`, and `flower` are giftable, while ammo, equipment, quest items, key/progression items, clues, and combat tools are excluded.
- Added a data-driven dialogue pool for all characters, with conditional reads based on time blocks, location IDs, affection, and flags.
- Ensured each current character has three `line_pool` `chat` records fitting their role and context.
- Updated dialogue selection so, when another candidate exists at the same priority, it does not repeat the line shown immediately before.

### Decisions
- Runtime interface should expose scene-relevant options directly, using nested menus only after the player chooses an NPC, facility, item use, or wait.
- Buttons should be compact and modern; actions that only enter a submenu or return should not show time cost.
- Trade should not reveal affection-locked goods; unavailable merchandise is hidden instead of shown with an insufficient-affection message.
- Trading time cost belongs to final settlement, not every quantity adjustment.
- Facilities that generate obtainable items are small storage surfaces: take-only for the player, no deposit UI.
- Dialogue pool data should remain in `docs/data/dialogues/dialogues.json`, while runtime remembers recent dialogue IDs in save data through `dialogueHistory`.

### Changed Files
- `PROJECT_CONTEXT.md`
- `docs/game-design.md`
- `docs/interface-design.md`
- `docs/data/commands/commands.json`
- `docs/data/dialogues/dialogues.json`
- `docs/data/facilities/facilities.json`
- `docs/data/items/items.json`
- `docs/data/locations/locations.json`
- `docs/data/save/save-template.json`
- `docs/data/scenes/scenes.json`
- `docs/data/villagers/villagers.json`
- `public/app.js`
- `public/styles.css`
- `public/index.html`
- `server.js`

### Verification
- Ran `node --check` on runtime JavaScript after implementation changes, including `public/app.js` and server files where relevant.
- Parsed updated JSON data files with Node.js after data edits.
- Verified item giftability metadata exists for all items and that excluded flow-sensitive item types are not giftable.
- Verified each current character has exactly three `line_pool` `chat` records after the final dialogue update.
- Verified dialogue references point to existing villagers and valid locations/scenes.
- Verified local HTTP responses from the running app, including `http://localhost:3000/` and `docs/data/dialogues/dialogues.json`, returned `200`.

### Follow-ups
- If more characters are added, add at least three contextual `line_pool` `chat` records for each and keep immediate-repeat suppression active.
- Expand special merchant selling from player inventory/storage if the lizard merchant's full buyback loop becomes a priority.
- Add broader browser interaction checks if the UI grows beyond the current prototype scope.

## 2026-05-08 - Conversation Summary: 企劃助手優化、資料規則收斂與程式同步

### Completed
- Optimized the local `planning-assistant` skill so it supports quick triage, full reports, follow-up checks, data consistency checks, and guided planning.
- Added guided-planning output that asks only blocking questions, drafts executable planning rules, and includes five brainstorming suggestions.
- Ran a planning-assistant review and generated `docs/planning-assistant-reports/2026-05-08-0229.md`.
- Accepted several report follow-ups while deferring the forbidden-book main-story entrance problem until later.
- Removed `sleep_in_protagonist_bed` from `dormitory.localActions`; the protagonist bed now uses the facility interaction path only.
- Removed `ask_for_treatment` from `herb_shed.localActions`; Mira treatment now lives on `mira.interactionActions` as `mira_treatment`.
- Added `docs/data/flags/flag-sources.json` as a small flag-source table recording which scene, quest, or interaction creates a flag and what it unlocks.
- Added `docs/data/npc-interactions/npc-interaction-rules.json` as the minimal NPC interaction matrix for core villagers, `talkative_cat`, and `lizard_merchant`.
- Updated planning docs so special NPC dialogue ignores `affectionMin` instead of checking normal affection state.
- Treated `docs/data/commands/commands.json` as the command authority and removed stale `observe` planning references as a formal command.
- Updated the browser runtime to load `npc-interaction-rules.json`, insert `villagers[].interactionActions` into NPC menus, and ignore affection conditions for special NPC dialogue when configured.
- Confirmed `http://localhost:3000/` was already running and reachable after the implementation sync.

### Decisions
- Main-story forbidden-book entrance flags are intentionally deferred; current priority is making the playable systems coherent before building more main-story flow.
- `commands.json` is the authority for active command sets. `standardLocation` currently means `useItem` and `wait`; movement is generated from `locations[].exits`, not listed as a standard location command.
- `observe` is removed as an active command unless it is explicitly re-added to `commands.json` later.
- Beds and other visible objects should generally be operated through `facilities.json`, not duplicated as location `localActions`.
- Mira treatment requires Mira to be present and appears from her NPC interaction menu, not from the herb shed location menu.
- Special NPCs do not use ordinary affection state. `talkative_cat` can chat and provide special forest information; `lizard_merchant` can chat, trade, and provide special commissions; both ignore dialogue `affectionMin`.

### Changed Files
- `PROJECT_CONTEXT.md`
- `docs/game-design.md`
- `docs/interface-design.md`
- `docs/data/README.md`
- `docs/data/flags/flag-sources.json`
- `docs/data/npc-interactions/npc-interaction-rules.json`
- `docs/data/locations/locations.json`
- `docs/data/villagers/villagers.json`
- `docs/planning-assistant-reports/2026-05-08-0229.md`
- `public/app.js`
- `C:\Users\yun\.codex\skills\planning-assistant\SKILL.md`
- `C:\Users\yun\.codex\skills\planning-assistant\agents\openai.yaml`

### Verification
- Validated `planning-assistant` with `quick_validate.py` using the Codex bundled Python runtime.
- Parsed all JSON files under `docs/data` with Node.js after data changes.
- Ran targeted Node checks confirming the bed and Mira treatment location actions were removed, `mira_treatment` exists, NPC interaction rules reference existing villagers, and special NPC dialogue can ignore affection.
- Ran `node --check public/app.js`.
- Ran `node --check server.js`.
- Started a temporary server on `localhost:3101` and confirmed `/`, `/app.js`, and `/docs/data/npc-interactions/npc-interaction-rules.json` returned `200`.

### Follow-ups
- Decide later whether a replacement player-facing "查看/觀察" feature is needed; if yes, add it back through `commands.json` first.
- If more flags are added, update `docs/data/flags/flag-sources.json` at the same time as the scene, quest, or interaction that creates them.
- If new special NPC types are added, update `docs/data/npc-interactions/npc-interaction-rules.json` before wiring their UI behavior.
- Continue focusing on playable system completeness before expanding the forbidden-book main-story flow.

## 2026-05-09 - Conversation Summary: UI Consistency, Carry Weight, Gathering, Storage, and Facility Rules

### Completed
- Updated `AGENTS.md` so future UI implementation changes must first check `docs/interface-design.md`, update the interface plan when behavior/layout changes, and keep interface/program versions aligned.
- Added disabled-command hover reasons in the browser UI; unavailable buttons now remain visible and show a reason on hover/focus.
- Corrected recovery rules in data, docs, and runtime: waiting restores stamina by full hours only, sleep restores stamina but not life, and life recovery belongs to treatment or healing items.
- Improved scene text readability with paragraph-preserving rendering and removed duplicated dialogue display.
- Expanded `docs/data/dialogues/dialogues.json` from 33 to 66 dialogue records and kept immediate-repeat suppression.
- Removed the fixed opening event from the playable start; new games now start at `village_square_hub`.
- Added collapsible backpack UI and item-description modal; item modal hides internal fields such as giftability, exploration-loss, and source.
- Added last-action result display, then moved it from the sidebar back to the main scene between scene text and choices; it now hides on menu navigation, returns, trade-draft changes, and other no-state-change transitions.
- Added version constants and save metadata for interface and program versions; current version is `interface-ui@2026-05-09.12` / `browser-prototype@2026-05-09.12`.
- Removed the redundant `storage_box` from `reclamation_area`; the warehouse box is now only in `workshop_storage`.
- Reworked item-producing facilities so natural objects use player-facing actions like picking or searching, while `small_storage` remains an internal runtime model.
- Implemented player carry weight display in the backpack, capped visible numeric precision to two decimals, and enforced carry limits on item gains, storage withdrawal, facility collection, and trade settlement.
- Added `soil` as a resource item with weight `1`, and added `soil_pile` in `reclamation_area` as an `infinite_source` facility that gives `soil x1` in 30 minutes with carry-weight checks.
- Reworked `weed_patch` into a once-per-reset unknown search: it shows `可尋找：???`, uses `尋找物品`, decides the result only after searching, can leave overweight found items on the facility as `已發現`, and clears unclaimed found items at daily reset.
- Reworked `storage_box` UI into a single-layer storage organizer similar to trade: the same screen shows `倉庫內容`, `背包可放入`, and `返回`; each click moves one item and stays on the same screen.

### Decisions
- `docs/interface-design.md` is the UI contract for program UI changes; when runtime UI changes, update the document and bump both interface and program versions.
- Natural gathering objects must not be described as boxes or stores in player-facing text, even if the runtime stores generated items in facility state.
- `small_storage` means generated-but-unclaimed product state; `infinite_source` means repeatable direct generation with no daily stock; `randomGatherAction` means the result is unknown until the player takes the action.
- Carry-weight failure text is standardized as `你已經無法負荷這個重量。`
- Last-action results should be transient UI feedback, not a persistent sidebar log. Stored `lastActionResult` can remain in save data, but the visible box clears on navigation unless a new state change or failure occurs.
- The storage box should use one management layer instead of separate receive/deposit submenus.

### Changed Files
- `AGENTS.md`
- `PROJECT_CONTEXT.md`
- `docs/game-design.md`
- `docs/interface-design.md`
- `docs/data/commands/commands.json`
- `docs/data/dialogues/dialogues.json`
- `docs/data/facilities/facilities.json`
- `docs/data/flags/flag-sources.json`
- `docs/data/items/items.json`
- `docs/data/quests/quests.json`
- `docs/data/save/save-template.json`
- `docs/data/scenes/scenes.json`
- `docs/data/README.md`
- `public/app.js`
- `public/index.html`
- `public/styles.css`

### Verification
- Ran `node --check public/app.js` after implementation changes.
- Parsed JSON under `docs/data` after data edits.
- Ran targeted Node checks for dialogue counts, storage locations, carry-weight formatting, weed-patch behavior, soil/soil-pile data, storage route changes, and UI placement.
- Used temporary local servers on ports such as `3106` through `3111` to verify `/`, `/app.js`, `/styles.css`, and relevant `docs/data/...` files returned HTTP `200`.
- Did not run Playwright browser interaction tests because Playwright is not installed in this project.

### Follow-ups
- Consider broader manual/browser interaction checks for storage, weed-patch search, overweight states, and transient action-result behavior.
- If more gatherable facilities are added, choose explicitly between `small_storage`, `randomGatherAction`, and `infinite_source` rather than reusing one model for all objects.
- If storage UI grows more complex, consider a draft-style batch flow; current implementation moves one item per click.

## 2026-05-09 - Conversation Summary: 探索、戰鬥、遭遇規則收斂

### Completed
- Ran a scoped `planning-assistant` review focused on exploration and combat, then refined the rules through guided planning rather than implementation changes.
- Saved planning-assistant reports under `docs/planning-assistant-reports/`, including scoped summaries for exploration/combat review, encounter-risk drafting, and smoke-bomb rules.
- Clarified the forest exploration loop around per-layer progress, retreat flow, encounter interruption, danger-rate behavior, ranged weakening, and escape risk control.

### Decisions
- Forest layer progress remains `0%` to `100%`; reaching `100%` is required to advance to the next layer.
- `向深處探索` increases progress by `5%` to `12%`, plus an exploration-skill bonus of `0%` to `3%` per level.
- Melee does not disable wrong choices: empty-hand combat is allowed, wrong weapons are still selectable, and current combat power is determined by weapon bonus plus melee-skill bonus; if both are absent, combat power is `0`.
- When stamina is too low, melee is not locked; instead, that encounter resolves using a random value from `0` to the player's current combat power.
- Ranged weakening uses a decaying success model: the first attempt always hits, later attempts start from the previous success rate multiplied by `70%`, and once one ranged attempt fails, no more ranged weakening can be used in that encounter.
- Encounter danger is now a first-class exploration state. Each time exploration progress updates, including a `0%` progress change, the system rerolls a default danger rate in the range `20%` to `60%`.
- In exploration, every action except `useItem` is currently dangerous. If a dangerous action triggers an encounter, the original action result is interrupted and does not resolve first.
- If the player remains at the same progress state and continues taking actions, danger increases by `1%` per minute.
- `大叫` is a dangerous action; if it does not trigger combat, it further increases danger.
- After a battle ends, danger resets to `0`.
- Added a new item concept `煙霧彈`; using it in exploration lowers the current danger rate by `30%` without going below `0`, and it does not cancel an encounter that has already started.
- Escape now halves the current danger rate after resolving, distinguishing it from smoke-bomb risk reduction.
- Removed the old exploration-area return command in planning. Exploration flow should use `前進 / 後撤` instead.
- `後撤` reduces current-layer progress; only when progress reaches `0%` can the player return to the previous layer, and only at outer-layer `0%` can the player safely return to the village.
- Retreat progress reduction is `1.5x` the forward progress rule, and retreat danger rerolls at `0.5x` the forward danger level.

### Changed Files
- `PROJECT_CONTEXT.md`
- `docs/planning-assistant-reports/2026-05-09-0552.md`
- `docs/planning-assistant-reports/2026-05-09-0621.md`
- `docs/planning-assistant-reports/2026-05-09-0625.md`

### Verification
- Read `docs/game-design.md` and relevant planning JSON files with UTF-8 while reviewing the exploration/combat slice.
- Confirmed the planning decisions were saved as dated reports in `docs/planning-assistant-reports/`.

### Follow-ups
- Decide the remaining boundary rules for retreat interruption and exact post-escape flow if an encounter is not cleanly exited.
- If these planning rules are accepted as final, sync them into `docs/game-design.md` and relevant `docs/data/*.json` planning tables before any runtime synchronization.

## 2026-05-09 - Conversation Summary: 製作系統、材料命名與探索資源點擴充

### Completed
- Added a recipe planning layer in `docs/data/recipes/recipes.json` and defined the recipe core fields as result item, required materials, workstation, craft time, and learned state.
- Moved learned-recipe ownership to `save.player.knownRecipeIds` in `docs/data/save/save-template.json`.
- Added the `workbench` crafting facility and separated crafting stations into `workbench` for tools/ammo and `alchemy_table` for medicine and smoke bombs.
- Renamed `wood_bundle / 木材束` to `wood / 木材` across planning data.
- Added new material and crafting-related items including `resin / 樹脂`, `cloth_strip / 布條`, `dry_moss / 乾苔`, `sharp_stone / 銳利碎石`, `smoke_bomb / 煙霧彈`, and `empty_potion_bottle / 空藥水瓶`.
- Added or revised crafting recipes for trap, torch, capture net, arrow, smoke bomb, sharp stone conversion, small healing potion, and strong bandage.
- Defined potion-container return behavior so `small_healing_potion` leaves an `empty_potion_bottle` after use.
- Added an exploration forage loot table in `docs/data/exploration/forage-loot.json` and a once-per-position forage lock tracked in `save.exploration.forageState`.
- Added exploration temporary resource-node spawning in `docs/data/exploration/resource-node-spawns.json`, with reroll-on-move and clear-on-leave behavior.
- Added and refined fixed resource facilities in `docs/data/facilities/facilities.json`, including `stone_chip_pile / 碎石堆` and `moondew_herb_patch / 月露草叢`.
- Added `moondew_herb_patch` as both a fixed herb-shed facility and an exploration temporary resource-node candidate, using the same daily fixed three-item structure as `berry_bush`.

### Decisions
- Planning data under `docs/data/*.json` remains the authority for concrete values; this round stayed planning-only and did not synchronize runtime code.
- Combat-tool recipes were finalized as:
  - `trap`: 木材 1 + 繩索 1
  - `torch`: 木材 1 + 樹脂 1
  - `capture_net`: 繩索 1 + 布條 1
  - `arrow`: 木材 1 + 羽毛 1 + 銳利碎石 1
  - `smoke_bomb`: 乾苔 1 + 布條 1
- `small_healing_potion` recipe was reduced to `月露草 1 + 空藥水瓶 1`.
- `smoke_bomb` is a concealment and danger-reduction tool, not a poison or explosive.
- `forage` item-count weights are `0 items: 20%`, `1 item: 50%`, `2 items: 30%`, and the current forage candidate set includes `樹脂`, `布條`, `乾苔`, `木材`, `月露草`, `石頭`, and `銳利碎石`.
- `forage` can only be used once at each exploration position; after use, the command remains visible but locked with `附近已經沒有物品。`
- Exploration temporary resource nodes currently include `莓果叢`, `月露草叢`, `雜草叢`, and `碎石堆`.
- On exploration movement, temporary resource nodes reroll independently every time; forward movement uses `0/1/2 nodes = 50/30/20`, backward movement halves total appearance rate to `75/15/10`, duplicates are allowed, and leaving exploration clears the temporary nodes.
- Only village fixed facilities keep persistent state; exploration copies of the same resource node never share village save state.
- `stone_chip_pile` is a random-search facility available in both `village_square_hub` and `reclamation_area`, with outcomes drawn from `stone_ammo`, `fluorite x1~3`, and `sharp_stone`.
- `moondew_herb_patch` is placed at `herb_shed` and produces `moondew_herb x3` per daily restock like `berry_bush`.

### Changed Files
- `PROJECT_CONTEXT.md`
- `docs/game-design.md`
- `docs/interface-design.md`
- `docs/data/README.md`
- `docs/data/commands/commands.json`
- `docs/data/exploration/forage-loot.json`
- `docs/data/exploration/resource-node-spawns.json`
- `docs/data/facilities/facilities.json`
- `docs/data/items/items.json`
- `docs/data/quests/quests.json`
- `docs/data/recipes/recipes.json`
- `docs/data/save/save-template.json`
- `docs/data/villagers/villagers.json`

### Verification
- Parsed the updated planning JSON files with Node.js after each batch of data edits, including recipes, facilities, exploration spawn tables, forage loot, and save-template changes.
- Confirmed the old `wood_bundle` / `木材束` naming was removed from active planning data in favor of `wood` / `木材`.
- Confirmed `moondew_herb_patch` is referenced consistently in facilities, save-template state, game-design rules, interface-design rules, and exploration temporary node templates.
- Did not start the app server or run browser-based tests during these planning/data updates.

### Follow-ups
- Decide the final acquisition methods for the newly introduced materials such as `樹脂`, `布條`, `乾苔`, and `空藥水瓶` beyond the currently stated planning sources.
- Decide whether `碎骨` should keep any crafting purpose now that arrows use `銳利碎石` instead.
- If runtime synchronization is requested later, update the live crafting UI, facility behavior, forage lock state, temporary exploration resource nodes, and bottle-return item flow to match the planning data.

## 2026-05-11 - Conversation Summary

### Completed
- Continued synchronizing the browser prototype with the current planning rules instead of leaving the work docs-only.
- Refined forest exploration flow so `後撤` and `返回村莊` are distinct, outer-layer `0%` shows `返回村莊`, and non-zero retreat stays inside the exploration loop.
- Removed obsolete or misleading command paths and links, including the direct `開墾區 -> 山谷森林入口` exit and the old workshop-level storage-management command.
- Opened all recipe availability by default in runtime, loaded recipes into the crafting UI, and aligned save data with the known-recipe list.
- Added and then expanded a dedicated debug tool as a modal under the `系統` section, covering inventory add/remove with carry checks, life/stamina editing, flag deletion, and recipe-item injection.
- Reworked multiple facility flows: random-search feedback now reports no-result outcomes, multi-location `small_storage` state is isolated per location, natural resource stacks are collected one item per click, empty facilities auto-return to the parent scene, and the herb shed now has a daily `醫藥補給箱`.
- Reworked discard flow so `道具` always stays available, `丟棄道具` uses a draft/confirm UI similar to storage, dropped items create a temporary `被丟棄的道具` facility, empty dropped-item facilities self-delete, repeated dumping merges into the same facility, and the merged facility expires one in-game hour after the latest dump.
- Reworked saving from auto-save to manual `localStorage` save, added a dedicated save button, moved reset into the system section with confirmation, and documented that facility state, warehouse contents, exploration state, quests, and trade state are part of the saved game.
- Added hidden `restValue` accumulation from waiting; every minute adds one rest point and every 30 points restore one stamina, with the value stored in save data but not shown in UI.
- Extended exploration/combat runtime: action-result messages now report location changes, battle end goes through a confirmation-based battle report scene, combat result tiers are displayed explicitly, and the exploration/action stamina costs were synchronized with the current accepted rules.
- Adjusted encounter actions so combat options no longer require stamina to select, only escape keeps a stamina requirement, and its cost is shown like other actions.
- Added `工坊的搬運練習` as a Nuosi quest that requires submitting `木材 x2` and rewards `carrySkill +1`, then reworked the quest flow so NPC quest pages separate `可接任務`, `已接任務`, and `可提交任務` with dialogue/confirmation substeps.
- Added sidebar quest and skill panels: active quests show giver, objective, and progress but never rewards; the skill panel is clickable like item details and hides itself entirely when all skills are zero.
- Made the sidebar sections collapsible, with only `狀態` expanded by default, and kept the collapsed backpack showing current carry status.
- Reworked trade UX twice: earlier trade and storage-like draft flows were kept, then the latest pass replaced scattered per-item trade buttons with one-row-per-item controls and inline `- / +` buttons that disable when unusable.

### Decisions
- `docs/interface-design.md` remains the required UI contract for runtime changes; runtime UI work must update the document and keep interface/program versions aligned.
- Save storage now uses `localStorage` only; old cookie storage is no longer meaningful for the current payload size.
- `負重` refers to the player's carried-total state, while item-specific numbers use `重量`; UI wording should keep that distinction.
- `道具` is always a visible command. Individual consumables may be disabled inside the item menu when they would produce no state change.
- Temporary dropped-item facilities are a scene-local cleanup mechanism, not permanent storage; they should merge on repeated dumps and vanish immediately when emptied or one hour after the latest drop.
- The NPC quest UX should not pre-award or auto-complete from the list view; accepting and submitting quests must pass through dialogue/confirmation beats and return to the NPC interaction screen afterward.
- Side panels should favor low-clutter defaults: hide empty quest/skill sections, collapse non-critical sections by default, and avoid duplicate status text when a single summary line is enough.
- Trade rows should use one row per item with inline `- / +` controls rather than generating separate add/remove buttons as independent actions.

### Changed Files
- `PROJECT_CONTEXT.md`
- `docs/game-design.md`
- `docs/interface-design.md`
- `docs/data/commands/commands.json`
- `docs/data/facilities/facilities.json`
- `docs/data/items/items.json`
- `docs/data/locations/locations.json`
- `docs/data/quests/quests.json`
- `docs/data/recipes/recipes.json`
- `docs/data/save/save-template.json`
- `docs/data/villagers/villagers.json`
- `public/app.js`
- `public/index.html`
- `public/styles.css`

### Verification
- Repeatedly ran `node --check public/app.js` after runtime changes.
- Parsed the touched JSON files after data edits, including commands, facilities, locations, quests, recipes, villagers, items, and save-template data.
- Performed targeted static checks for command removal, save-version alignment, multi-location facility state separation, quest data presence, trade-row rendering hooks, and carry/storage rule references.
- Confirmed the latest saved UI/runtime version markers are `interface-ui@2026-05-10.04` and `browser-prototype@2026-05-10.04`.

### Follow-ups
- Run real browser interaction checks for the current trade rows, discard flow, quest flow, and collapsible sidebar behavior; recent verification stayed at syntax/data level.
- Decide whether more NPCs should get first-pass quests now that the quest UX and carry-skill reward pipeline are in place.
- If more debug-only tooling is added, keep it inside the system modal rather than leaking controls into the main sidebar.

## 2026-05-11 - Conversation Summary: Runtime UI polish, portable crafting, supply box, and encounter rules

### Completed
- Renamed the player-facing command group from `可執行指令` to `行動` across runtime UI and `docs/interface-design.md`.
- Renamed the `forest_edge` scene display from `山谷森林入口` to `森林外圍`, including the village exit label and related planning text.
- Added `道具 > 製作道具` as a portable crafting menu that reuses the existing recipe/crafting logic while only showing recipes marked `portableCrafting: true`.
- Marked `sharp_stone_recipe` and `arrow_recipe` as portable recipes; workbench crafting still shows the full workbench recipe set.
- Added a backpack `查看配方` button and a read-only recipe modal showing known recipes, result item, materials, owned/required counts, time cost, crafting place, and whether the recipe is currently craftable.
- Reworked collapsible sidebar toggles to use `[展開]` / `[收合]` text instead of arrow glyphs.
- Moved backpack carry status onto the same line as the backpack title and changed the format to `（負重：目前 / 上限）`.
- Updated `supply_box` so it randomly restocks two consumable combat tools per daily reset and can hold up to six items; runtime restock now clamps additions so the box cannot exceed its max total.
- Changed `大喊` to cost `60` seconds while keeping the `+20%` danger increase and post-increase encounter check.
- Changed encounter report UI to `戰鬥結果`, including the title and breadcrumb.
- Added five separate narrative result texts for `大勝利`, `勝利`, `險勝`, `失敗`, and `大失敗`; battle-result pages no longer reuse prior ranged/tool action messages.
- Fixed ranged-hit feedback so encounter info keeps showing and immediately recalculates `勝算` after ranged actions.
- Changed absolute ammo evasion behavior: immune enemies no longer disable the first ranged shot; the first shot is allowed, consumes ammo, always fails to reduce difficulty, and then closes ranged opportunities for that encounter.
- Kept interface/program version markers aligned through `interface-ui@2026-05-11.60` and `browser-prototype@2026-05-11.60`.

### Decisions
- Backpack recipe viewing is informational only; actual crafting remains under `道具 > 製作道具` or the appropriate workstation.
- Portable crafting is controlled by explicit `recipes[].portableCrafting`, not by hard-coded recipe ids.
- Encounter action feedback can appear under encounter info, but `威脅` and `勝算` must remain visible when the player is still in the encounter.
- Battle-result copy should be based on final result tier, not on the previous action that happened to end the fight.
- Absolute ranged immunity is learnable through wasted ammo rather than being fully exposed by disabling the first shot.

### Changed Files
- `PROJECT_CONTEXT.md`
- `docs/game-design.md`
- `docs/interface-design.md`
- `docs/data/README.md`
- `docs/data/commands/commands.json`
- `docs/data/facilities/facilities.json`
- `docs/data/recipes/recipes.json`
- `docs/data/save/save-template.json`
- `public/app.js`
- `public/index.html`
- `public/styles.css`

### Verification
- Repeatedly ran `node --check public/app.js` after runtime changes.
- Parsed touched JSON files with Node.js, including `commands.json`, `facilities.json`, `recipes.json`, and `save-template.json`.
- Used targeted `rg` checks to confirm visible label changes, version alignment, arrow removal, forest-name changes, supply-box rule updates, and encounter-result wording changes.

### Follow-ups
- Run manual browser checks for portable crafting, recipe modal display, backpack title layout, supply-box restock across daily reset, ranged immunity behavior, and battle-result report text.
- Decide whether the first wasted shot against ammo-immune enemies should use a more enemy-specific description later.

## 2026-05-12 - Conversation Summary: NPC roles, dialogue variety, old chests, timing UI, quests, and carry rules

### Completed
- Synchronized multiple runtime and data rules for combat, ranged attacks, escape, ammo recovery, battle-result copy, NPC labels, special NPC visibility, dialogue variety, one-time chests, dropped items, lost-and-found behavior, waiting/sleeping UI, quest rewards, save normalization, and item balance.
- Changed combat escape to a 50% success check; failed escape keeps the player in battle and costs 1 life. Smoke bombs used in battle now guarantee escape.
- Reworked battle results so ranged kills become `大勝利`, final reports use situation-level narrative text, non-great results describe combat disparity, and old duplicate result-label text was removed.
- Added ranged-hit count wording such as `獵弓命中了根角兔1次` with later hits accumulating, and added per-shot arrow/stone recovery chance of `10% + 遠程作戰等級 * 3%`.
- Renamed player-facing combat groups to `近身作戰`, `遠程作戰`, and `戰術物品`.
- Updated the arrow recipe to craft 3 arrows per batch.
- Added villager role subtitles to location person buttons and adjusted roles/names, including `艾妲` as `領袖`, `托莉` as `開墾管理人`, `諾絲` as `工匠`, `伊蓮` as `兼職舍監的學者`, `賽拉` as `獵戶巡守`, and `蜥蜴羅索` as the lizard merchant display name.
- Kept Aida's cooking as profile/personality content rather than showing `做飯` as a role label.
- Reworked dialogue selection into a priority/weight pool with one-hour per-line cooldown; if all eligible lines are blocked, the eligible pool is released and can be reused. Dialogue generation remains schedule-aware.
- Moved NPC interaction response text out of the status-change box and into the scene/person description flow.
- Ensured the well lizard and night lizard are the same `蜥蜴羅索`, avoiding simultaneous appearances and contradictory dialogue.
- Added `舊箱子` as a reusable one-time chest pattern, with the dormitory instance containing `投石索 x1` and `石頭 x2`. Empty claimed one-time chests are hidden.
- Changed old chest pickup to a single `取出` action that iterates contents, adds carryable items to inventory, and sends overweight leftovers to `遺落的道具` with a warning message.
- Added `失物箱` in the dormitory. Expired `遺落的道具` moves equipment and quest items there; other expired items vanish. Exploration-area dropped items also clear when the protagonist changes exploration scene.
- Added flag-source descriptions, hid raw flags from normal result UI, and allowed explicitly player-visible flags to show player-facing descriptions.
- Reworked bed and wait time controls: bed keeps compact jump-to-time-block buttons sorted by nearest time, excludes the current time block, marks cross-day targets with `隔天`, and keeps these buttons above the slider; wait now only uses the slider.
- Changed item use so successful use stays in the item menu rather than returning to the parent scene.
- Fixed save import normalization so stored stamina is preserved instead of being raised to the initial stamina value; life and stamina now clamp to valid ranges.
- Replaced Sela's prior quest with `賽拉的獵弓測試`, requiring `銳利碎石 x2` and rewarding `獵弓 x1` plus `箭矢 x4`.
- Confirmed Mira currently has one quest, `濕地的月露草`, now visible at initial affection 0, requiring moondew herbs and rewarding `空藥水瓶 x1`.
- Changed quest item rewards to check carry weight item by item; overweight reward items are placed in `遺落的道具` at the quest turn-in location while the quest still completes.
- Changed `trap`, `torch`, and `capture_net` weights to `1.5` and prices to `4`.

### Decisions
- `舊箱子` is a reusable one-time chest mechanism, not a dormitory-specific hard-coded object.
- Raw flag ids should not appear in normal player-facing action results; visible flags must show Chinese descriptions.
- Bed jump-to-period actions and wait controls are intentionally different: bed can jump to named time blocks, wait only uses the duration slider.
- NPC dialogue should be varied by conditions and cooldowns, not fixed repeat lines.
- Quest reward overflow should preserve rewards as nearby dropped items rather than blocking completion or silently deleting items.
- `docs/interface-design.md` and runtime version constants must stay aligned for UI behavior changes.

### Changed Files
- `PROJECT_CONTEXT.md`
- `docs/game-design.md`
- `docs/interface-design.md`
- `docs/data/dialogues/dialogues.json`
- `docs/data/facilities/facilities.json`
- `docs/data/flags/flag-sources.json`
- `docs/data/items/items.json`
- `docs/data/quests/quests.json`
- `docs/data/recipes/recipes.json`
- `docs/data/save/save-template.json`
- `docs/data/villagers/villagers.json`
- `public/app.js`

### Verification
- Repeatedly ran `node --check public/app.js` after runtime changes.
- Parsed `docs/data` JSON files after data edits, usually all 16 JSON files.
- Ran targeted Node checks for quest replacement, flag sources, item ids, Mira quest visibility at initial affection 0, item weights/prices, save-template validity, version alignment, and stale quest-id removal.
- Used `rg` and PowerShell inspections to confirm stale references, changed labels, and target data rows.
- Did not run browser interaction tests; verification stayed at syntax/data/static-behavior level.

### Follow-ups
- Run manual browser checks for old chest overflow, lost-and-found expiry, quest reward overflow, Mira and Sela quest visibility/turn-in, smoke-bomb battle escape, ranged hit counting, ammo recovery, and bed cross-day labels.
- Consider adding a more explicit player-facing warning for overweight quest rewards if current result-message placement is not visible enough during NPC turn-in.

## 2026-05-12 - Conversation Summary: Events, daily NPC rewards, carry overflow, combat cleanup, and training quests

### Completed
- Added a multi-page event system driven by `docs/data/events/events.json`, including scene-enter and villager-interact triggers, event pages with effects/rewards/options, and event reward overflow handling through `遺落的道具`.
- Added first-interaction events for 艾妲, 諾絲, and 托莉. 艾妲 explains the village situation and gives `士兵長槍`; 諾絲 teaches the `arrow_recipe` and `sharp_stone_recipe`; 托莉 explains lettuce support.
- Made arrow and sharp-stone recipes require learning through `player.knownRecipeIds` before crafting or display as known recipes.
- Added 托莉's daily lettuce event: after her first interaction, the first interaction from morning through noon can give lettuce once per day, with amount equal to field level. Added `生菜` as edible stamina `+2`.
- Set default `field` and `storage_box` levels to `1`.
- Cleaned low-value recipe and craft UI details: recipe view no longer shows material status/count clutter, crafting buttons show result quantities, and inventory delta messages show current carried count after changes.
- Changed crafting carry checks to compare the net result after consuming recipe materials and adding crafted output, rather than checking only the output against current weight.
- Ensured found-but-overweight exploration items, event rewards, quest rewards, chest contents, crafted outputs, and battle loot are preserved through `遺落的道具` or `失物箱` rules instead of silently disappearing.
- Added `開墾區 -> 墓地` location travel and made clicking the field show its current level.
- Restored `莓果叢` as a fixed `開墾區` facility and removed the misleading `parentFacilities: ["field"]` relationship; it is not tied to field level.
- Moved `土堆` out of fixed `開墾區` placement and kept it as an exploration temporary resource-node candidate; added `土堆` to forest-entry random facilities.
- Changed weapon weights so all weapons except `投石索` weigh `2`.
- Fixed rest-value overbanking so ordinary time passage no longer restores excessive stamina; only wait and bed flows add hidden rest value, and old imported `restValue` is normalized.
- Changed post-battle danger handling from resetting to zero to reducing current danger by `30%`.
- Added DEBUG-mode combat behavior where combat tools and ammo are not consumed.
- Changed ranged combat so three successful ranged hits in the same encounter force enemy defeat.
- Converted exploration defeat recovery into an event, with black-panther foreshadowing text, forced return to the village, next-morning wakeup, and item-loss penalty handled by the event effect.
- Rewrote the first carry skill label/copy to `負重訓練` so the player can understand it as training that increases carrying capacity.
- Added villager training quests: 托莉 accepts `berry x3` for `meleeWeaponSkill +1`; 賽拉 accepts `cracked_bone x3` for `meleeWeaponSkill +1` and requires `meleeWeaponSkill >= 1`.
- Added generic quest prerequisite support for `prerequisites.player`, currently used by 賽拉's cracked-bone melee training.
- Updated role-action buttons to display required items or conditions directly in the button cost/requirement text.
- Kept interface/program/save version markers aligned through `interface-ui@2026-05-12.107` and `browser-prototype@2026-05-12.107`.

### Decisions
- Player-facing event and reward copy should avoid raw internal mechanics when possible, but status-change rows must still clearly indicate when overweight items enter `遺落的道具`.
- `生菜` production is tied to 托莉's daily event and field level, while the fixed `莓果叢` is independent of field level.
- Recipe availability has two layers: recipe data may exist in the project, but crafting/use requires the recipe id to be present in `save.player.knownRecipeIds`.
- Exploration failure should be modeled as a narrative event rather than a direct silent teleport/recovery routine.
- Battle loot and found items should be item-preserving by default: overweight gains are dropped nearby, not deleted.
- DEBUG mode should not consume combat tools or ammo, so combat testing does not require repeated resource setup.
- Quest prerequisites can now compare player numeric fields through `prerequisites.player`, keeping skill-gated quests data-driven.

### Changed Files
- `PROJECT_CONTEXT.md`
- `docs/game-design.md`
- `docs/interface-design.md`
- `docs/data/events/events.json`
- `docs/data/exploration/resource-node-spawns.json`
- `docs/data/facilities/facilities.json`
- `docs/data/items/items.json`
- `docs/data/locations/locations.json`
- `docs/data/quests/quests.json`
- `docs/data/recipes/recipes.json`
- `docs/data/save/save-template.json`
- `public/app.js`

### Verification
- Repeatedly ran `node --check public/app.js` after runtime changes.
- Parsed all `docs/data` JSON files after data edits, ending with `17` valid JSON files.
- Ran targeted Node checks for Tori lettuce events, recipe learned-state rules, facility defaults, craft net-weight behavior, battle loot overflow, forage overweight drops, DEBUG ammo/tool preservation, three-hit ranged defeat, quest data, Sela skill prerequisite, and restored fixed `berry_bush` placement.
- Used static `Select-String` and Node assertions to confirm version alignment and expected data fields.
- Did not run manual browser interaction testing in this pass.

### Follow-ups
- Run browser checks for event trigger order, event reward overflow messages, Tori daily lettuce reset behavior, exploration defeat event flow, battle loot overflow, and fixed `莓果叢` visibility in `開墾區`.
- Decide whether exploration temporary `berry_bush` should remain alongside the fixed `開墾區` berry bush, or whether it should be replaced by a different forest-only resource node later.

## 2026-05-13 - Conversation Summary: Item-source cleanup, Elaine knowledge action, and immersion rules

### Completed
- Added Elaine's `尋求知識` role action and a new `docs/data/knowledge/elaine-knowledge.json` data file for immersive help topics.
- Built runtime knowledge scenes in `public/app.js`: category pages, item-source pages, topic pages, multi-page `§` dialogue support, and breadcrumbs for knowledge routes.
- Added `player.obtainedItemIds` to track items the player has ever obtained; item-source lists now prioritize active quest requirements, then obtained items, then other eligible items.
- Limited Elaine's item-source list to materials, resources, edible consumables, and consumable combat tools; ammo, equipment, clue items, currency, and quest-only items are excluded.
- Reworked Elaine's knowledge categories to player-facing labels: `想尋找物品`, `詢問該注意的事`, and `關於山谷的故事`.
- Added initial knowledge topics for healing, the night merchant, and three valley-lore drafts; labels and copy avoid direct system terms like `背景故事`.
- Replaced cold source bullet lists with Elaine-voiced prose. Common item types and many concrete items now have custom source/use copy instead of one-size-fits-all templates.
- Cleaned stale item-source data that caused false Elaine hints: `soil` no longer points to the removed `開墾區土堆`, `wood` no longer mentions `修繕委託`, `dry_ration` no longer mentions `村莊配給`, and `moondew_herb` no longer mentions `米菈委託`.
- Added a guard in item-source aggregation so sources containing `委託` are ignored; task requirements are not treated as item acquisition routes.
- Updated `docs/interface-design.md` and `docs/game-design.md` to document Elaine knowledge behavior, source filtering, obtained-item sorting, and the rule against exposing development/data-correction traces in player-facing copy.
- Kept UI/program/save version markers aligned at `interface-ui@2026-05-13.06` and `browser-prototype@2026-05-13.06`.

### Decisions
- Elaine's knowledge UI should remain immersive: no raw categories like `道具獲取途徑`, no obvious template phrasing, and no developer-history wording such as "removed", "nonexistent", or "previously".
- Item source data must describe actual acquisition routes. A quest that asks the player to submit an item is not a source for that item.
- When data-driven source fragments are too mechanical, prefer item-specific Elaine copy over generic generated prose.
- `docs/data/items/items.json` source fields should be treated as user-facing/planning-facing truth and cleaned when they drift from actual facilities, trade, events, quests, or recipes.

### Changed Files
- `PROJECT_CONTEXT.md`
- `docs/game-design.md`
- `docs/interface-design.md`
- `docs/data/items/items.json`
- `docs/data/knowledge/elaine-knowledge.json`
- `docs/data/save/save-template.json`
- `docs/data/villagers/villagers.json`
- `public/app.js`
- `public/index.html`

### Verification
- Ran `node --check public/app.js` after runtime edits.
- Parsed touched JSON files, and in several passes parsed all `docs/data` JSON files.
- Ran targeted Node/PowerShell checks for Elaine action wiring, knowledge category labels, page separators, eligible item filtering, version alignment, BOM absence, stale source text removal, and item-source rules.
- Did not run manual browser interaction testing in this pass.

### Follow-ups
- Manually browser-test Elaine's `尋求知識` flow, especially return navigation, item ordering, multi-page topic progression, and whether item prose feels sufficiently character-specific.
- Continue auditing `items.source` as new items are noticed; stale source text can surface immediately through Elaine's knowledge UI.

## 2026-05-14 - Conversation Summary: Interface Section Rules and Dynamic Impression Info

### Completed
- Formalized the main UI terminology in `docs/interface-design.md`: `導覽`, `標題`, `主文字區塊`, `狀態變化區塊`, and `指令區塊`, matching the DOM nodes marked in `public/index.html`.
- Documented the responsibilities of `主文字區塊`: protagonist-view visual/context/dialogue information, immersive interaction feedback, and no direct system/stat/probability/internal-rule exposition by default.
- Documented the responsibilities of `狀態變化區塊`: only concrete changes caused by the latest operation, such as player status, items, scene object state, scene character state, time, position, currency, affection, facility state, and stock changes.
- Changed `renderInfoPanel()` so static `scene.infoRows` no longer automatically appear in the status-change block; the block now shows only visible `lastActionResult` rows.
- Added dynamic NPC impression info support in `public/app.js`: NPC interaction pages now show a first-entry `impressionInfos` line in the main text area, selected by time, location, flags, daily flags, and affection conditions, then replaced by later dialogue/gift/quest/action responses.
- Added dynamic scene impression info support in `public/app.js`: normal locations and exploration scenes can select main-text impressions from `locations[].impressionInfos`, `scenes[].impressionInfos`, or exploration `sceneryDescriptions`, with exploration retaining the existing per-position reroll rhythm.
- Added authored `impressionInfos` records for 8 NPCs and 7 scene/location entries, including time/flag-sensitive variants for village locations and forest-edge exploration.
- Updated `docs/data/README.md` to define `impressionInfos` as the data-driven pool for NPC and scene main-text impressions.
- Kept interface, program, save-template, and cache-busting versions aligned at `interface-ui@2026-05-14.44` and `browser-prototype@2026-05-14.44`.

### Decisions
- Use `主文字區塊` for immersive story-facing feedback and first-entry impressions; do not put impression text or narrative-only feedback in `狀態變化區塊`.
- Treat `impressionInfos` as a reusable authoring pattern for both people and places. Entries should describe what the protagonist notices in the current moment, not biography, raw systems, reset rules, probabilities, or implementation detail.
- Keep later interaction feedback replacing the initial impression instead of appending to it, so stale arrival or first-look text does not remain after player actions.
- For exploration scene text, preserve the current behavior where one environmental impression is saved for the current exploration position and only rerolled after movement or re-entry.

### Changed Files
- `PROJECT_CONTEXT.md`
- `docs/interface-design.md`
- `docs/data/README.md`
- `docs/data/locations/locations.json`
- `docs/data/scenes/scenes.json`
- `docs/data/villagers/villagers.json`
- `docs/data/save/save-template.json`
- `public/app.js`
- `public/index.html`

### Verification
- Ran `node --check public\app.js` after runtime edits.
- Parsed all `docs\data\*.json` files with PowerShell `ConvertFrom-Json`.
- Ran targeted Node checks confirming NPC impression info count, scene impression info count, and missing `id` / `text` validation.
- Used `rg` / `Select-String` to confirm version marker alignment and presence of the new impression-info code paths.

### Follow-ups
- Run manual browser checks for normal location impressions, exploration scenery reroll behavior, NPC interaction first-entry impressions, and whether interaction responses reliably replace impressions.
- Relocate or redesign information that was previously hidden by disabling automatic `infoRows` rendering, such as encounter threat/chance, trade currency, storage warnings, facility levels, and container status.
- Continue expanding authored `impressionInfos`; current implementation supports conditions, but only the first authored batch has been added.

## 2026-05-16 - Conversation Summary: Night Dormitory Work and Villager Schedule Refinement

### Completed
- Added a night-only dormitory local action `參與紡織工作`, visible only during `夜晚`, with a `30` minute cost and command progress text.
- Implemented weaving-work runtime handling in `public/app.js`: completion advances time, randomly grants `繩索 x1` or `布條 x1`, writes the result to `lastActionResult`, and returns to the dormitory scene.
- Added six weaving-work main-text templates where present girls speak or interact one-sidedly with the protagonist; the protagonist has no spoken lines and only responds through gestures, eye contact, or action.
- Added `save.events.lastWeavingWorkTemplateId` and runtime normalization so weaving templates do not repeat twice in a row.
- Updated interface/program/save/cache-busting versions to `interface-ui@2026-05-16.05` and `browser-prototype@2026-05-16.05`.
- Changed 艾妲's daily schedule into a village-leader patrol route: morning square, forenoon reclamation area, noon herb shed, afternoon workshop storage, evening square, then dormitory at night.
- Added Aida impression text for reclamation area, herb shed, and workshop storage, showing her checking food, medicine, supplies, and village weak points.
- Changed 賽拉's afternoon schedule to `graveyard` and added a graveyard patrol impression, keeping the visit in daylight rather than night.
- Documented the weaving action, Aida patrol rationale, and Sela daylight graveyard patrol in `docs/game-design.md` and `docs/interface-design.md` where relevant.

### Decisions
- Night dormitory work should use `主文字區塊` for immersive dialogue/action feedback and `狀態變化區塊` only for actual time and item changes.
- Weaving work is a completed action, not a draft interface: cost and reward apply immediately when selected.
- Aida's role as `領袖` should be expressed through schedule coverage across village areas, not by keeping her mostly in the square or dormitory.
- Sela can visit the graveyard as part of patrol logic, but this should happen while the sky is bright to avoid implying a horror-event schedule unless explicitly designed later.

### Changed Files
- `docs/game-design.md`
- `docs/interface-design.md`
- `docs/data/locations/locations.json`
- `docs/data/save/save-template.json`
- `docs/data/villagers/villagers.json`
- `public/app.js`
- `public/index.html`
- `PROJECT_CONTEXT.md`

### Verification
- Ran `node --check public/app.js`.
- Parsed all JSON files under `docs/data` with UTF-8.
- Ran targeted Node checks for the dormitory weaving action, six template records, non-repeat save state, Aida's patrol schedule, Sela's afternoon graveyard schedule, and referenced location ids.
- Checked touched JSON and Markdown/runtime files for absence of UTF-8 BOM.
- Confirmed no stale `2026-05-16.04` version strings remained after the weaving update.

### Follow-ups
- Manual browser testing is still needed for the new night dormitory weaving action, including visibility only during `夜晚`, result text variety, non-repetition, reward display, and time advancement.
- Manual browser testing is still needed to confirm Aida and Sela appear at their updated scheduled locations in the UI and that the new impression text appears naturally.

## 2026-05-16 - Conversation Summary: Runtime Architecture Rule for Generic Paths

### Completed
- Added an `AGENTS.md` working-style rule requiring agents to inspect existing runtime architecture before adding behavior.
- Recorded that runtime changes should prefer existing generic mechanisms such as data tables, event pages, command handlers, effects, save-state normalization, and shared render flows.
- Added a rule that proposed special-case runtime logic should be discussed before implementation, including why the existing architecture cannot cover it and which generic layer could be extended.

### Decisions
- Do not default to hard-coded one-off behavior for new runtime features when existing event/data/effect systems can express the feature.
- If a feature appears to need a special case, the user wants to review the architectural gap and decide how to expand the reusable system.

### Changed Files
- `AGENTS.md`
- `PROJECT_CONTEXT.md`

## 2026-05-16 - Conversation Summary: Dormitory Weaving Events and Generic Runtime Rule

### Completed
- Reworked the night-only dormitory action `參與紡織工作` after user feedback that the previous implementation was too hard-coded.
- Moved all six dormitory weaving performance texts from `public/app.js` into `docs/data/events/events.json` as repeatable two-page events:
  - `dormitory_weaving_aida_counts_threads`
  - `dormitory_weaving_tori_competes_with_knot`
  - `dormitory_weaving_mira_quiet_band`
  - `dormitory_weaving_nuosi_tough_rope`
  - `dormitory_weaving_elaine_story_thread`
  - `dormitory_weaving_shared_late_table`
- Kept the action available only in the dormitory during `夜晚`.
- Changed runtime handling so `public/app.js` only selects and starts one of the weaving events instead of storing the event prose directly.
- Added `randomRewardItems` support to event pages so the first page of each weaving event can randomly grant either `rope x1` or `cloth_strip x1`.
- Kept the weaving rotation as a six-event round: one round does not repeat events, the pool resets after all six have played, and the first event of a new round avoids matching the previous round's last event.
- Added save-state fields `events.lastWeavingWorkEventId` and `events.remainingWeavingWorkEventIds`, with migration compatibility from the earlier template-based fields.
- Updated `docs/game-design.md` and `docs/interface-design.md` to state that dormitory weaving is implemented through events, not hard-coded runtime prose.
- Added a stable `AGENTS.md` rule requiring future runtime work to inspect existing architecture first and prefer generic mechanisms before adding special cases.
- Recorded that if a requested feature seems to require special-case runtime logic, the agent should pause and discuss the architectural gap and possible generic-layer extension with the user before implementing.

### Decisions
- Dormitory weaving performances should be event data, because existing event pages already support two-page narration, return flow, time cost, result messages, and rewards.
- Runtime code may own selection policy and state normalization, but authored story text should live in data/event files when the existing event system can represent it.
- Future runtime features should first consider existing generic paths such as data tables, event pages, command handlers, effects, save-state normalization, and shared render flows.
- Special-case behavior is allowed only after discussion when the current generic architecture cannot express the feature cleanly.

### Changed Files
- `AGENTS.md`
- `PROJECT_CONTEXT.md`
- `docs/game-design.md`
- `docs/interface-design.md`
- `docs/data/events/events.json`
- `docs/data/save/save-template.json`
- `public/app.js`

### Verification
- Ran `node --check public/app.js`.
- Parsed `docs/data/events/events.json` and `docs/data/save/save-template.json`.
- Parsed all JSON files under `docs/data`; result was `19 json files ok`.
- Ran a targeted Node check confirming all six weaving events exist, are `repeatable`, have exactly two pages, spend `1800` seconds on the first page, and grant random rewards that point to valid item ids.
- Searched for old hard-coded weaving prose in `public/app.js`; the prose now only appears in `docs/data/events/events.json`.

### Follow-ups
- Manual browser testing is still needed for the dormitory weaving action: night-only visibility, event launch, two-page progression, reward display, time advancement, return to dormitory, and six-event rotation behavior.
- If more local actions need multi-page narrative results, consider formalizing a reusable "local action starts event pool" data pattern instead of adding more runtime selection lists.

## 2026-05-16 - Conversation Summary: Valley Mythology, Priesthood Truth, and Elaine Repair Theme

### Completed
- Refined the main-story mythology in `docs/game-design.md` and related planning data.
- Named the twin valley goddesses:
  - 納薇菈，承穢與豐饒之神
  - 瑟菈彌，契約與循環之神
- Established that the title itself should not expose their sister relationship; the sister relationship remains background truth.
- Defined 黑貓 as 納薇菈's sealed present form, while current villagers no longer know 黑貓 was once the 豐饒之神.
- Reframed the so-called curse as a miasma problem: 山谷自古存在瘴氣, which can be handled under proper order but becomes destructive when the order collapses.
- Established that 納薇菈's seal caused the valley to lose its承穢 / 豐饒 balancing role, while 瑟菈彌 gradually became eroded by uncontrolled miasma and lost her original reason.
- Reworked "活祭" into a false tradition: the temple actually required one new priest every ten years to sustain the priesthood and help調和瘴氣, and that priest had to sever contact with the outside world.
- Added the historical breaking point that when 納薇菈 was sealed, the temple priesthood was killed in full, destroying both technical inheritance and daily miasma-balancing order.
- Updated the second and third forbidden-book concepts:
  - 第二本 reveals that 活祭 is a lie and the temple needed a new priest every ten years.
  - 第三本 reveals that the curse is really uncontrolled miasma eroding the valley.
- Added Elaine's role as inheritor of歷代學者的智慧與懺悔. Her understanding of "repair" means returning misplaced things to their rightful positions, not repaying sin through suffering.
- Added an Elaine knowledge topic `valley_repair` explaining the repair theme in player-facing prose.

### Decisions
- The story should avoid a simple good-god / evil-god structure. The tragedy comes from misunderstanding, the sealing of 納薇菈, the death of the priesthood, and 瑟菈彌's miasma-driven collapse.
- "活祭" remains a village-facing term and taboo, but the internal truth is priesthood succession and severed contact, not human sacrifice.
- The valley's restoration theme should be "讓失去的一切回復原位", not "償還罪孽".
- Black shadows are miasma manifestations, not direct divine punishment.
- Planning and data changes remain docs/data only; no runtime synchronization was requested.

### Changed Files
- `PROJECT_CONTEXT.md`
- `docs/game-design.md`
- `docs/data/knowledge/elaine-knowledge.json`
- `docs/data/quests/quests.json`
- `docs/data/villagers/villagers.json`

### Verification
- Parsed all JSON files under `docs/data` after the changes; all parsed successfully.
- Searched the touched planning/data files for stale phrasing around `山谷之神需要活祭`, `生命代價`, direct divine curse wording, and the new `瘴氣`, `祭司團`, `每十年`, `全數殺害`, and `回復原位` concepts.

### Follow-ups
- Decide the exact reason temple priests must sever contact with the outside world.
- Decide what happened to the previous generation inside the ruins: survivors, trapped people, dead members, or people maintaining temple rules.
- Rework the four forbidden books into concrete acquisition routes, including which book reveals 納薇菈, which reveals the murdered priesthood, and which reveals how to restore the misplaced order.
- Decide how external taboo and the valley's disconnection from the outside world should be expressed in quests, maps, rumors, and opening lore.

## 2026-05-16 - Conversation Summary: Village Traces, Tombstones, Black Cat Relic, and Temple Runtime Sync

### Completed
- Cleaned the obsolete AI-generated planning remnants around `灰白石粉` and `古物碎片` so they no longer pollute the active project lore/data.
- Established that 山谷村 still needs traces of the previous generation: the last adult died or disappeared one year ago, leaving the current girls in a dying village with only limited inherited knowledge.
- Designed four deceased previous-generation characters and their ties to the girls:
  - 羅恩: 艾妲的父親; died protecting 賽拉 from a black shadow; `士兵長槍` is his relic.
  - 瑪蓮: died of illness.
  - 葛倫: died of old age.
  - 艾芙拉: vanished after being injured while gathering herbs.
- Added four graveyard tombstone facilities: `老舊的墓碑`, `風化的墓碑`, `生苔的墓碑`, and `嶄新的墓碑`. The newest tombstone marks the final death, and the mossy tombstone can provide one `乾苔` per day.
- Set the village girls' emotional baseline: the future is already close to despair, but they still try to laugh, leave traces, and decorate the lonely valley in their final time.
- Clarified 黑貓 / 納薇菈's current manifestation: her original goddess statue was completely destroyed, causing the loss of divine power. Only a black cat doll once offered by an innocent temple-priestess girl lets her appear in cat form, and even then she can barely do anything.
- Established that 賽拉 knows 黑貓 exists, understands she is not a threat, and has previously been helped by her. The other girls have differing attitudes and curiosity toward 黑貓.
- Established 蜥蜴羅索 as a long-lived traveling merchant who rests in the valley because the humidity and temperature suit him. He is detached from valley affairs and trades only because business is business.
- Refined the six village girls as co-heroines with stronger contrast and adventure duties rather than simple functional NPCs.
- Added runtime support for reaching `神殿遺跡`: after the player pushes through all three forest layers and reaches 100% progress in the deep forest, a `神殿遺跡` movement option appears.
- Added a `神殿遺跡` scene describing the miasma-filled ruined temple entrance. The current runtime only lets the player confirm the danger and retreat, preserving deeper ruin exploration for later design.

### Decisions
- The previous generation should be present through traces, relics, tombstones, and hidden relationships, not through heavy upfront exposition.
- Ron's spear connection should stay subtle; it does not need detailed direct explanation in the immediate player-facing text.
- The tombstones are valid gameplay facilities, not just lore notes: at least one provides a repeatable daily resource.
- The temple ruins should appear only after three forest layers, and the ruins are currently blocked by heavy miasma.
- The recent suggestion to structure future background content as "fewer scenes, more facilities, layered clues" was not accepted yet. Do not treat it as an approved project rule unless the user confirms it later.

### Changed Files
- `docs/game-design.md`
- `docs/story-misunderstandings-truths.md`
- `docs/data/facilities/facilities.json`
- `docs/data/items/items.json`
- `docs/data/scenes/scenes.json`
- `docs/data/villagers/villagers.json`
- `public/app.js`
- `PROJECT_CONTEXT.md`

### Verification
- Ran `node --check public/app.js`.
- Parsed all JSON files under `docs/data`; result: `19` JSON files parsed successfully.
- Started the local server and confirmed HTTP `200` responses for `/`, `/app.js`, and `/docs/data/scenes/scenes.json`.

### Follow-ups
- Decide how the black cat doll, destroyed goddess statue, and temple-priestess girl are revealed through actual scene interactions.
- Decide whether the temple ruins' miasma is only a story gate at first, or whether it later becomes a mechanical danger, required preparation check, or party-role challenge.
- Continue designing the six girls' concrete adventure responsibilities as co-heroines.
- If the user later accepts the "場景少、設施多、線索分層" approach, record it explicitly as a planning rule before applying it broadly.

## 2026-05-16 - Conversation Summary: Narrative Guidelines and Concrete Copy Review

### Completed
- Reviewed player-facing text after feedback that some lines were too indirect, too abstract, or felt like AI-generated unclear prose.
- Added and then consolidated narrative-writing rules into `docs/narrative-guidelines.md`.
- Expanded the rule from "girls' dialogue should be direct" into a global player-facing copy rule covering scene descriptions, objects, item descriptions, dialogue, event text, knowledge answers, combat information, enemy descriptions, operation feedback, tombstones, notes, and other main-text content.
- Established that main text must prioritize immersion while still making the core meaning clear: what the protagonist sees, what danger exists, what an object does, what a character wants, why trust changed, or what the village concretely improved.
- Recorded that player-facing narrative must avoid data-card or list-style wording such as `墓碑資訊`, `銘文`, `撰文者`, `用途`, `狀態`, `來源`, `管理者`, `效果`, `取得方式`, `角色定位`, and `好感需求`, except in true UI/status/debug/list surfaces.
- Recorded that 山谷村 currently has only six girls as its total visible population; village scenes must not imply crowds, generic villagers, traffic, markets, or a busy population.
- Recorded that character dialogue should preserve personality performance, not just direct explanation. Appropriate interjections, pauses, and sound-like reactions such as `嗯`, `嘖`, `喂`, `欸`, `那個`, and `……` may be used sparingly when they fit the character and situation.
- Recorded that affection events triggered by `villagerInteractionLeave` and without fixed time/location conditions must be written as time- and location-neutral.
- Revised representative high-risk text in `docs/data/events/events.json`, `docs/data/dialogues/dialogues.json`, `docs/data/knowledge/elaine-knowledge.json`, `docs/data/knowledge/sela-knowledge.json`, `docs/data/locations/locations.json`, `docs/data/scenes/scenes.json`, `docs/data/facilities/facilities.json`, `docs/data/items/items.json`, `docs/data/enemies/enemies.json`, and `docs/data/villagers/villagers.json`.
- Wrote temporary review reports:
  - `tmp/2026-05-16-direct-dialogue-copy-review.md`
  - `tmp/2026-05-16-global-copy-concretization-followup.md`

### Decisions
- Future player-facing text should be checked against `docs/narrative-guidelines.md` before broad copy edits.
- The writing priority is immersion first, then clear core meaning, then character or scene individuality, then poetic aftertaste.
- Poetic phrasing, subtext, and ambiguity are allowed only after the practical meaning is understandable; they must not carry the only important information.
- Concrete wording is preferred over abstract nouns such as `缺口`, `方向`, `位置`, `故事`, `沉默`, `明天`, `答案`, `代價`, and `真相` when those words are being used to fake depth.
- Character dialogue should remain distinct by role and personality: Aida is duty and arrangement focused; Mira is restrained and injury-aware; Nuosi is brusque and material/tool focused; Sela is patrol and danger focused; Tori is quick, young, and eager; Elaine is soft, record-aware, and dormitory/lore oriented.
- Event text that can trigger anywhere should avoid fixed props, fixed times, or fixed places unless conditions explicitly lock them.

### Changed Files
- `PROJECT_CONTEXT.md`
- `docs/narrative-guidelines.md`
- `docs/game-design.md`
- `docs/interface-design.md`
- `docs/data/events/events.json`
- `docs/data/dialogues/dialogues.json`
- `docs/data/knowledge/elaine-knowledge.json`
- `docs/data/knowledge/sela-knowledge.json`
- `docs/data/locations/locations.json`
- `docs/data/scenes/scenes.json`
- `docs/data/facilities/facilities.json`
- `docs/data/items/items.json`
- `docs/data/enemies/enemies.json`
- `docs/data/villagers/villagers.json`
- `tmp/2026-05-16-direct-dialogue-copy-review.md`
- `tmp/2026-05-16-global-copy-concretization-followup.md`

### Verification
- Parsed all JSON files under `docs/data` with PowerShell `ConvertFrom-Json`; all parsed successfully.
- Rechecked `docs/data/events/events.json` and `docs/data/dialogues/dialogues.json` after adding character-specific interjections; both parsed successfully.
- Used `rg` to confirm the new centralized guideline file exists and that `docs/game-design.md` and `docs/interface-design.md` reference it.
- Used targeted searches to confirm several high-risk old phrases were removed from active `docs/data` text.

### Follow-ups
- Future copywriting and content reviews should start from `docs/narrative-guidelines.md`.
- Continue applying the concrete/immersive rewrite standard opportunistically to older remaining player-facing text when those areas are touched.
- If large copy rewrites are requested later, separate broad copy review from runtime synchronization unless the user explicitly asks to update program behavior.

## 2026-05-17 - Conversation Summary: Facility Status UI and Pre-Build Simulation Skill

### Completed
- Designed and implemented a new `設施狀態區塊` for the browser game UI.
- Added the `facilityStatus` DOM node between the main text block and the action result block.
- Added runtime rendering for `facilityStatusRows`, limited to single-facility pages.
- Kept general location pages from showing facility status summaries; facility status appears only after the player enters one facility.
- Updated generic facility, crafting facility, storage facility, dropped-items storage, and sleep views to use facility status rows where appropriate.
- Changed facility status text to show only minimum current state, such as `狀態：可摘取`, `狀態：蘋果已被摘取`, `狀態：已翻找`, `等級：1 / 5`, or container capacity/content.
- Removed old mechanism-heavy status text such as `可尋找：???（今日剩餘 N 次）` from the visible status generator.
- Revised the apple tree description so it no longer repeats whether a ripe apple is currently visible after that information moved to the facility status block.
- Updated `docs/interface-design.md` with the new facility status block contract and bumped interface/program/save version markers to `interface-ui@2026-05-17.01` / `browser-prototype@2026-05-17.01`.
- Created the local Codex skill `concept-simulation-before-build` under `C:\Users\yun\.codex\skills\concept-simulation-before-build`.
- Added `agents/openai.yaml` metadata for that skill with the display name `先模擬，再實作`.
- Installed `PyYAML 6.0.3` into both system Python `C:\Program Files\Python310\python.exe` and bundled Codex Python `C:\Users\yun\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe`, fixing the repeated `ModuleNotFoundError: No module named 'yaml'` blocker for skill tools.

### Decisions
- The facility status block is informational only. All interactions stay in the command block.
- Facility status must not appear on ordinary location pages and must not show all facilities in the scene.
- Facility status should reflect only existing facility/save data; do not invent mood, inferred stage text, or extra mechanics just to fill the block.
- Facility status must not expose hidden mechanics such as refresh time, daily generation amount, random pools, internal ids, flags, or data-source names.
- If information is moved from the main text block into the facility status block, the old main text must be revised so the same status is not repeated.
- The newly created `concept-simulation-before-build` skill captures the preferred collaboration pattern: user proposes a concept, Codex simulates concrete UI/data/behavior first, user corrects it, and implementation begins only after explicit approval.

### Changed Files
- `PROJECT_CONTEXT.md`
- `docs/interface-design.md`
- `docs/data/facilities/facilities.json`
- `docs/data/save/save-template.json`
- `public/index.html`
- `public/app.js`
- `public/styles.css`
- `C:\Users\yun\.codex\skills\concept-simulation-before-build\SKILL.md`
- `C:\Users\yun\.codex\skills\concept-simulation-before-build\agents\openai.yaml`

### Verification
- Ran `node --check public\app.js`; syntax check passed.
- Parsed touched JSON files with UTF-8; `docs/data/facilities/facilities.json` and `docs/data/save/save-template.json` parsed successfully.
- Checked touched project files for UTF-8 BOM; no BOM was detected.
- Started the local server at `http://localhost:3000/` and verified HTTP `200`.
- Used the in-app browser to verify that the village square does not show facility status, entering the apple tree shows `狀態：可摘取`, and after picking/re-entering the apple tree shows `狀態：蘋果已被摘取`.
- Verified the updated apple tree main text no longer says the branches contain a ripe apple while the status block says it has been picked.
- Verified both system Python and bundled Codex Python can import `yaml` and report `PyYAML 6.0.3`.
- Ran `quick_validate.py` for `concept-simulation-before-build`; result: `Skill is valid!`.
- Ran `generate_openai_yaml.py` successfully after fixing `PyYAML` and metadata short-description length.

### Follow-ups
- Future UI feature discussions should use `$concept-simulation-before-build` when the user wants to review simulated output before implementation.
- If more existing facility descriptions include current-state facts that can conflict with `facilityStatus`, revise those descriptions when the relevant facility is touched.

## 2026-05-17 - Conversation Summary: Notice Board Message Review

### Completed
- Added browser-runtime support for reviewing already-seen notice-board messages.
- Added a read-only event review mode so reviewed events replay their pages without reapplying effects, daily flags, rewards, time costs, or result messages.
- Added an `已看過的留言` choice group on the notice-board facility page, listing completed events from its `dailyMessages.eventPool`.
- Documented the review rule in `docs/data/facilities/facilities.json` and `docs/interface-design.md`.
- Bumped interface/program markers to `interface-ui@2026-05-17.02` / `browser-prototype@2026-05-17.02`.

### Decisions
- The first interaction with the notice board still follows the existing daily random-message rule.
- Review entries are generated only from completed notice-board events, so unseen messages are not exposed early.
- Event review is a generic read-only mode rather than a notice-board-only hard-coded replay path.

### Changed Files
- `PROJECT_CONTEXT.md`
- `docs/interface-design.md`
- `docs/data/facilities/facilities.json`
- `docs/data/save/save-template.json`
- `public/app.js`

### Verification
- Ran `node --check public\app.js`.
- Parsed `docs/data/facilities/facilities.json` and `docs/data/save/save-template.json`.
- Started the local server at `http://localhost:3000/` and verified HTTP `200`.
- Used the in-app browser to start a new game, reach the village square, read a notice-board message, confirm the `已看過的留言` group appears, replay the seen message, and confirm review returns to the board without showing a new result message.

## 2026-05-17 - Conversation Summary: Elaine First Knowledge Myth Event

### Completed
- Added a generic `knowledgeOpen` event trigger type in `public/app.js`.
- Updated 伊蓮的 `尋求知識` entry so first-time knowledge access can trigger an event before opening the normal knowledge page.
- Added the five-page event `elaine_first_knowledge_myth` in `docs/data/events/events.json`.
- The event has 伊蓮 explain the inherited but likely incorrect valley-god myth, the village's current crisis, her doubts about the active myth, and her pessimism about whether knowledge can still save the valley.
- Added the completion flag `elaine_first_knowledge_myth_seen` to `docs/data/flags/flag-sources.json`.
- Updated `docs/data/events/README.md` to document `knowledgeOpen`.

### Decisions
- The event triggers from the knowledge entry point, not from general interaction with 伊蓮.
- The event returns to `knowledge:elaine:<returnSceneId>` after completion, so players continue into the normal knowledge interface.
- The event presents the wrong/inherited myth as 伊蓮's reported tradition, while preserving her suspicion that the story is incomplete and possibly distorted.

### Changed Files
- `PROJECT_CONTEXT.md`
- `docs/data/events/README.md`
- `docs/data/events/events.json`
- `docs/data/flags/flag-sources.json`
- `public/app.js`

### Verification
- Ran `node --check public\app.js`.
- Parsed all JSON files under `docs/data`.
- Checked touched files for UTF-8 BOM; none were detected.
- Used the in-app browser to start from a new game, reach 伊蓮 in the dormitory, finish her first interaction event, click `尋求知識`, confirm the new myth event starts, finish it, confirm it returns to the 伊蓮 knowledge page, and confirm clicking `尋求知識` again does not replay the event.

## 2026-05-17 - Conversation Summary: Static Site Runtime Split

### Completed
- Reorganized the playable browser runtime into a self-contained `site/` folder for static hosting.
- Moved the former runtime files from `public/` into `site/`.
- Copied the required JSON data from `docs/data/` into `site/data/` so the deployed game no longer needs the repository-level `docs/` path at runtime.
- Changed the game data loader in `site/app.js` from absolute `/docs/data/...` URLs to relative `./data/...` URLs.
- Updated the local preview server in `server.js` so it serves `site/` instead of `public/`.
- Updated `README.md` to document the new deployment boundary: upload only `site/` for the playable static build; keep `editor/`, `scripts/`, `tools/`, `tmp/`, `server.js`, and `package.json` out of the static deployment package.

### Decisions
- `site/` is now the only folder intended for static-site upload.
- The deployed playable build must not depend on Node.js, npm, the local editor, scripts, tools, or temporary AI outputs.
- `docs/data/` remains the planning/editor-maintained source data area; `site/data/` is the publish-ready runtime copy.
- Node.js remains optional for local preview and local editor work only.

### Changed Files
- `PROJECT_CONTEXT.md`
- `README.md`
- `server.js`
- `site/app.js`
- `site/index.html`
- `site/styles.css`
- `site/assets/`
- `site/data/`

### Verification
- Ran `node --check site\app.js`.
- Parsed all JSON files under `site/data`.
- Checked `README.md`, `server.js`, `site/app.js`, and all `site/data` JSON files for UTF-8 BOM; none were detected.
- Started the local preview server at `http://localhost:3000/` and verified HTTP `200` responses for `/`, `/app.js`, `/styles.css`, `/data/scenes/scenes.json`, and `/assets/characters/manifest.json`.

## 2026-05-17 - Conversation Summary: ValleyEmbers Project Naming

### Completed
- Accepted `ValleyEmbers` as the project name.
- Updated visible project/editor strings in runtime, editor, docs, launcher titles, and README.
- Changed `package.json` name to `valleyembers` to keep the package identifier lowercase.
- Changed the browser save storage key from `codexpj_save` to `valleyembers_save`.
- Added a one-time localStorage migration so old `codexpj_save` saves are moved to `valleyembers_save` when first loaded.
- Changed exported save filenames from `codexpj-save-day-*.json` to `valleyembers-save-day-*.json`.
- Changed `site/index.html` asset references from absolute `/styles.css` and `/app.js` to relative `./styles.css` and `./app.js`, preserving portability for static hosts that serve the project from a subpath.

### Decisions
- The top-level folder has not been renamed inside the active Codex session; the user will rename it later.
- Use `ValleyEmbers` for user-facing project strings.
- Use `valleyembers` where lowercase technical identifiers are required.

### Changed Files
- `PROJECT_CONTEXT.md`
- `README.md`
- `package.json`
- `server.js`
- `start-game.bat`
- `start-editor.bat`
- `site/index.html`
- `site/app.js`
- `editor/README.md`
- `editor/public/index.html`
- `editor/server/index.mjs`
- `docs/interface-design.md`
- `docs/character-art-style.md`

### Verification
- Ran `node --check site\app.js`.
- Parsed all JSON files under `site/data`.
- Checked touched files and `site/data` JSON files for UTF-8 BOM; none were detected.
- Confirmed no remaining `CodeXPJ` or `codexpj` strings in the searched project files.

## 2026-05-17 - Conversation Summary: GitHub Repository Upload and Pages Deployment

### Completed
- Added `D:/Project/ValleyEmbers` to Git safe.directory after Git blocked the repository for dubious ownership.
- Configured `origin` as `https://github.com/mp678922/ValleyEmbers.git`.
- Renamed the local branch from `master` to `main`.
- Created the initial repository commit `9b9a604 Initial ValleyEmbers project` and pushed it to `origin/main`.
- Excluded local ImageMagick tool downloads and portable executables from Git by updating `.gitignore`; the files remain on disk under `tools/` but are not tracked.
- Added `.github/workflows/deploy-pages.yml` to publish the static playable build from `site/` through GitHub Pages.
- Updated `README.md` with GitHub Pages setup instructions and the expected public URL.
- Created and pushed commit `8230ccb Add GitHub Pages deployment`.
- Helped the user complete GitHub CLI login for account `mp678922`.
- Enabled or confirmed GitHub Pages for the repository and manually triggered the Pages workflow.

### Decisions
- Use GitHub Pages with GitHub Actions as the deployment path.
- Publish only the `site/` folder, not the full repository root.
- Keep local development/editor/tooling files out of the deployed playable build.
- The public game URL is expected to be `https://mp678922.github.io/ValleyEmbers/`.

### Changed Files
- `.gitignore`
- `.github/workflows/deploy-pages.yml`
- `README.md`
- `PROJECT_CONTEXT.md`

### Verification
- Confirmed `origin` points to `https://github.com/mp678922/ValleyEmbers.git`.
- Confirmed local branch `main` tracks `origin/main`.
- Confirmed latest GitHub Pages workflow run `25981018629` completed with `success`.
- Confirmed the earlier workflow run `25980452262` failed because Pages was not yet enabled or configured for GitHub Actions.
- Could not verify the served page content from the Codex shell because local PowerShell/curl HTTPS requests to GitHub Pages failed with Windows TLS/credential errors, but GitHub Actions reported a successful Pages deployment.

### Follow-ups
- If future deployments show Node.js action deprecation warnings, update GitHub Actions versions or workflow environment settings after GitHub's Node 24 transition.
- If browser access to `https://mp678922.github.io/ValleyEmbers/` fails, check the repository `Settings -> Pages` page and the latest `Deploy GitHub Pages` workflow run first.
