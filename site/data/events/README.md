# Events

- `events.json`: multi-page event definitions, trigger rules, per-page effects, and branch targets.
- Each event is a sequence of `pages`. A page can be pure text, text plus `effects`, or a branch page with `choices`.
- Use `rewardItems` when an event page gives physical items. These rewards must pass the same carry-weight check as quest rewards; overweight items go to `遺落的道具`.
- Use `rewardRecipeIds` when an event page teaches recipes. Learned recipes are stored in `save.player.knownRecipeIds`.
- Branch choices do not jump to an arbitrary page in the same event. They start another event through `targetEventId`.
- Current first-pass trigger types are `sceneEnter`, `villagerInteract`, `villagerInteractionLeave`, `facilityInteract`, `moveToLocation`, and `knowledgeOpen`.
- Use `facilityInteract` for events triggered by opening or using a facility. The first current use is `notice_board`, which randomly picks one unseen daily message event and then writes a daily lock flag.
- Use `knowledgeOpen` for events triggered by opening an NPC knowledge interface. The event should return to the original `knowledge:<villagerId>:<returnSceneId>` scene after it ends.
- `rewardItemsByFacilityLevel` can give an item count based on a facility level, such as one lettuce per field level.
- `effects.explorationDefeat` is a special event effect for exploration defeat recovery. It applies exploration item-loss penalties, clears the current exploration run, advances to the next reset morning, and lets the event finish back to its configured return scene.
- `effects.explorationDefeat.randomCaregiver.candidates[].eventId` points to the caregiver follow-up event. After `exploration_defeat_return` finishes, runtime starts the selected caregiver event before normal scene-enter events at the dormitory.
- Event conditions support `timeBlocks`, `requiredFlags`, `blockedFlags`, `requiredDailyFlags`, `blockedDailyFlags`, `villagerAffectionMins`, `facilityLevelMins`, `playerLifeAtLeast`, `playerLifeAtMost`, `playerStaminaAtLeast`, `playerStaminaAtMost`, `activeQuestIds`, and `completedQuestIds`.
