const SAVE_STORAGE_KEY = 'valleyembers_save';
const LEGACY_SAVE_STORAGE_KEYS = ['codexpj_save'];
const DORMITORY_LOCATION_ID = 'dormitory';
const VILLAGE_SQUARE_LOCATION_ID = 'village_square_hub';
const RESET_SECOND = 21600;
const FALLBACK_SCENE_ID = 'village_square_hub';
const INTERFACE_PLAN_VERSION = 'interface-ui@2026-05-18.03';
const PROGRAM_VERSION = 'browser-prototype@2026-05-18.03';
const EXPLORATION_SCENE_ID = 'forest_edge';
const TEMPLE_RUINS_SCENE_ID = 'temple_ruins';
const NAME_PROTAGONIST_SCENE_ID = 'nameProtagonist';
const DEFAULT_PROTAGONIST_NAME = '旅人';
const ABANDONED_CABIN_SCENE_ID = 'forest_abandoned_cabin';
const HIDDEN_CAVE_SCENE_ID = 'forest_hidden_cave';
const ENCOUNTER_REPORT_SCENE_ID = 'encounter_report';
const HIDDEN_CAVE_REVEALED_FLAG = 'forest_hidden_cave_revealed';
const BLACK_SHADOW_ENEMY_ID = 'night_forest_black_shadow';
const BLACK_CAT_NPC_ID = 'talkative_cat';
const BLACK_CAT_APPEARANCE_RATE = 0.25;
const BLACK_CAT_STORAGE_MODE = 'blackCatCarry';
const BLACK_CAT_FIRST_ENCOUNTER_EVENT_ID = 'black_cat_first_encounter';
const BLACK_CAT_FIRST_ENCOUNTER_FLAG = 'black_cat_first_encounter_seen';
const BLACK_CAT_FIRST_DELIVERY_PENDING_FLAG = 'black_cat_first_delivery_pending';
const BLACK_CAT_FIRST_DELIVERY_NOTICE_FLAG = 'black_cat_first_delivery_notice_seen';
const BLACK_SHADOW_REPLACEMENT_RATE = 0.33;
const BLACK_SHADOW_TIME_BLOCKS = ['夜晚', '深夜'];
const TIME_BLOCKS = [
  { id: '深夜', startSecond: 0 },
  { id: '清晨', startSecond: 18000 },
  { id: '上午', startSecond: 28800 },
  { id: '中午', startSecond: 43200 },
  { id: '下午', startSecond: 50400 },
  { id: '傍晚', startSecond: 64800 },
  { id: '夜晚', startSecond: 72000 }
];
const EXPLORATION_LAYER_ORDER = [
  { id: 'outer', label: '山谷森林外圍' },
  { id: 'middle', label: '山谷森林中層' },
  { id: 'deep', label: '山谷森林深處' }
];
const DANGER_MIN = 20;
const DANGER_MAX = 60;
const EXPLORATION_FAILURE_ITEM_LOSS_RATE = 0.33;
const DIALOGUE_LINE_COOLDOWN_SECONDS = 3600;
const SLEEP_MIN_SECONDS = 3600;
const SLEEP_MAX_SECONDS = 21600;
const SLEEP_STEP_SECONDS = 3600;
const SCENE_TRANSITION_THRESHOLD_SECONDS = 3600;
const SCENE_TRANSITION_FADE_MS = 640;
const SCENE_TRANSITION_HOLD_MS = 440;
const PROGRESS_EPSILON = 1e-9;
const WEAVING_WORK_EVENT_IDS = [
  'dormitory_weaving_aida_counts_threads',
  'dormitory_weaving_tori_competes_with_knot',
  'dormitory_weaving_mira_quiet_band',
  'dormitory_weaving_nuosi_tough_rope',
  'dormitory_weaving_elaine_story_thread',
  'dormitory_weaving_shared_late_table'
];
const FIELD_WORK_EVENT_IDS = [
  'field_work_tori_first_rows',
  'field_work_aida_water_line',
  'field_work_mira_seedling_rest',
  'field_work_nuosi_tool_angle',
  'field_work_sela_boundary_watch',
  'field_work_elaine_old_marker'
];
const NOON_REST_EVENT_IDS = [
  'village_square_noon_rest_tori_stolen_seat',
  'village_square_noon_rest_mira_water_cup',
  'village_square_noon_rest_nuosi_tool_shadow',
  'village_square_noon_rest_sela_watch_post',
  'village_square_noon_rest_elaine_bad_record',
  'village_square_noon_rest_shared_quiet'
];
const DINNER_ACTIVITY_ID = 'aida_evening_dinner';
const DINNER_SELECTED_MEAL_EVENT_TARGET = '__dinner_selected_meal__';
const NOON_REST_DAILY_FLAG = 'village_square_noon_rest_done';
const AIDA_SKILL_TRAINING_MAX_LEVEL = 2;
const AIDA_SKILL_TRAINING_TIME_COST_SECONDS = 14400;
const AIDA_SKILL_TRAINING_OPTIONS = [
  {
    skillKey: 'carrySkill',
    label: '負重訓練',
    eventIds: {
      1: 'aida_training_carry_level_1',
      2: 'aida_training_carry_level_2'
    }
  },
  {
    skillKey: 'meleeWeaponSkill',
    label: '近戰訓練',
    eventIds: {
      1: 'aida_training_melee_level_1',
      2: 'aida_training_melee_level_2'
    }
  },
  {
    skillKey: 'rangedWeaponSkill',
    label: '遠程訓練',
    eventIds: {
      1: 'aida_training_ranged_level_1',
      2: 'aida_training_ranged_level_2'
    }
  }
];
const LEGACY_WEAVING_WORK_EVENT_ID_MAP = {
  aida_counts_threads: 'dormitory_weaving_aida_counts_threads',
  tori_competes_with_knot: 'dormitory_weaving_tori_competes_with_knot',
  mira_quiet_band: 'dormitory_weaving_mira_quiet_band',
  nuosi_tough_rope: 'dormitory_weaving_nuosi_tough_rope',
  elaine_story_thread: 'dormitory_weaving_elaine_story_thread',
  shared_late_table: 'dormitory_weaving_shared_late_table'
};
const DEBUG_LOCATION_IDS = [
  FALLBACK_SCENE_ID,
  'dormitory',
  'herb_shed',
  'workshop_storage',
  'reclamation_area',
  EXPLORATION_SCENE_ID
];
let scenes = [];
let villagers = [];
let items = [];
let enemies = [];
let recipes = [];
let commands = null;
let locations = [];
let dialogues = [];
let quests = [];
let events = [];
let facilities = [];
let flagSources = [];
let npcInteractionRules = [];
let elaineKnowledge = null;
let selaKnowledge = null;
let saveTemplate = null;
let forageLootConfig = null;
let resourceNodeSpawnConfig = null;
let villageDinnerActivity = null;
let gameState = null;
let tradeDraft = null;
let droppedItemsDraft = null;
let containerDraft = null;
let dinnerDraft = null;
let debugSelectedFlagId = '';
let debugBypassNextTriggeredEvent = false;
let forageLootDraft = null;
let pendingActionFlow = null;
let waitDraftSeconds = 1800;
let sleepDraftSeconds = SLEEP_MIN_SECONDS;
let statusCollapsed = false;
let questCollapsed = true;
let skillCollapsed = true;
let inventoryCollapsed = true;
let systemCollapsed = true;
let actionResultVisible = false;
let hasUnsavedChanges = false;

const SKILL_DEFINITIONS = [
  {
    key: 'carrySkill',
    name: '負重訓練',
    description: '你接受過搬運與打包訓練，知道怎麼分配力氣、固定行囊，讓自己能安全帶上更重的東西。',
    detailRows: [
      ['訓練效果', '每級最大負重 +5'],
      ['體感', '背包更穩，長時間搬運時比較不容易被重量拖垮']
    ]
  },
  {
    key: 'gatheringSkill',
    name: '採集',
    description: '你越熟悉翻找、採集和辨認材料，就越不容易在野外白忙一場。',
    detailRows: [
      ['體感', '找東西時更容易抓到訣竅'],
      ['熟練後', '面對野外材料時更不容易手忙腳亂']
    ]
  },
  {
    key: 'explorationSkill',
    name: '探索',
    description: '你越習慣林中的路與危險，往更深處前進時就越不容易浪費力氣。',
    detailRows: [
      ['體感', '在陌生地帶更容易抓到方向'],
      ['熟練後', '深入時的節奏會更順']
    ]
  },
  {
    key: 'meleeWeaponSkill',
    name: '近戰',
    description: '你越懂得怎麼在近距離出手，面對撲上來的東西時就越不容易亂了陣腳。',
    detailRows: [
      ['體感', '揮砍、格擋和逼退對手會更穩'],
      ['熟練後', '近身硬碰硬時更有把握']
    ]
  },
  {
    key: 'rangedWeaponSkill',
    name: '遠程',
    description: '你越能穩住手眼，越能在敵人靠近之前先把局勢壓住。',
    detailRows: [
      ['體感', '出手時更容易抓準時機與距離'],
      ['熟練後', '遠遠先壓住對手的機會更高']
    ]
  }
];

const elements = {
  scenePanel: document.querySelector('.scene-panel'),
  sceneLocation: document.querySelector('#scene-location'),
  sceneTitle: document.querySelector('#scene-title'),
  sceneSubtitle: document.querySelector('#scene-subtitle'),
  sceneTimebar: document.querySelector('#scene-timebar'),
  sceneMain: document.querySelector('#scene-main'),
  sceneDescription: document.querySelector('#scene-description'),
  facilityStatus: document.querySelector('#facility-status'),
  actionResult: document.querySelector('#action-result'),
  adventureStatus: document.querySelector('#adventure-status'),
  choiceList: document.querySelector('#choice-list'),
  actionProgress: document.querySelector('#action-progress'),
  actionProgressLabel: document.querySelector('#action-progress-label'),
  sceneTransition: document.querySelector('#scene-transition'),
  sceneTransitionText: document.querySelector('#scene-transition-text'),
  timeDay: document.querySelector('#time-day'),
  timeDisplay: document.querySelector('#time-display'),
  lifeDisplay: document.querySelector('#life-display'),
  lifeGauge: document.querySelector('#life-gauge'),
  lifeGaugeFill: document.querySelector('#life-gauge-fill'),
  staminaDisplay: document.querySelector('#stamina-display'),
  staminaGauge: document.querySelector('#stamina-gauge'),
  staminaGaugeFill: document.querySelector('#stamina-gauge-fill'),
  contributionDisplay: document.querySelector('#contribution-display'),
  statusToggle: document.querySelector('#status-toggle'),
  statusBody: document.querySelector('#status-body'),
  questPanel: document.querySelector('.quest-panel'),
  questToggle: document.querySelector('#quest-toggle'),
  questBody: document.querySelector('#quest-body'),
  questList: document.querySelector('#quest-list'),
  skillPanel: document.querySelector('.skill-panel'),
  skillToggle: document.querySelector('#skill-toggle'),
  skillBody: document.querySelector('#skill-body'),
  skillList: document.querySelector('#skill-list'),
  inventoryToggle: document.querySelector('#inventory-toggle'),
  inventoryBody: document.querySelector('#inventory-body'),
  inventoryWeight: document.querySelector('#inventory-weight'),
  inventoryList: document.querySelector('#inventory-list'),
  openRecipeBookButton: document.querySelector('#open-recipe-book-button'),
  systemToggle: document.querySelector('#system-toggle'),
  systemBody: document.querySelector('#system-body'),
  systemVersionList: document.querySelector('#system-version-list'),
  itemModal: document.querySelector('#item-modal'),
  itemModalKicker: document.querySelector('#item-modal-kicker'),
  itemModalTitle: document.querySelector('#item-modal-title'),
  itemModalDescription: document.querySelector('#item-modal-description'),
  itemModalStats: document.querySelector('#item-modal-stats'),
  itemModalClose: document.querySelector('#item-modal-close'),
  recipeModal: document.querySelector('#recipe-modal'),
  recipeModalDescription: document.querySelector('#recipe-modal-description'),
  recipeList: document.querySelector('#recipe-list'),
  recipeModalClose: document.querySelector('#recipe-modal-close'),
  saveNote: document.querySelector('#save-note'),
  saveGameButton: document.querySelector('#save-game-button'),
  exportSaveButton: document.querySelector('#export-save-button'),
  importSaveInput: document.querySelector('#import-save-input'),
  newGameButton: document.querySelector('#new-game-button'),
  openDebugButton: document.querySelector('#open-debug-button'),
  debugModal: document.querySelector('#debug-modal'),
  debugModalClose: document.querySelector('#debug-modal-close'),
  debugCarryStatus: document.querySelector('#debug-carry-status'),
  debugModeToggle: document.querySelector('#debug-mode-toggle'),
  debugModeSummary: document.querySelector('#debug-mode-summary'),
  debugItemSelect: document.querySelector('#debug-item-select'),
  debugItemCount: document.querySelector('#debug-item-count'),
  debugAddItemButton: document.querySelector('#debug-add-item-button'),
  debugItemSummary: document.querySelector('#debug-item-summary'),
  debugRecipeSelect: document.querySelector('#debug-recipe-select'),
  debugRecipeSummary: document.querySelector('#debug-recipe-summary'),
  debugRecipeList: document.querySelector('#debug-recipe-list'),
  debugOwnedList: document.querySelector('#debug-owned-list'),
  debugLifeInput: document.querySelector('#debug-life-input'),
  debugApplyLifeButton: document.querySelector('#debug-apply-life-button'),
  debugStaminaInput: document.querySelector('#debug-stamina-input'),
  debugApplyStaminaButton: document.querySelector('#debug-apply-stamina-button'),
  debugContributionInput: document.querySelector('#debug-contribution-input'),
  debugApplyContributionButton: document.querySelector('#debug-apply-contribution-button'),
  debugLocationSelect: document.querySelector('#debug-location-select'),
  debugJumpLocationButton: document.querySelector('#debug-jump-location-button'),
  debugVillagerSelect: document.querySelector('#debug-villager-select'),
  debugOpenVillagerButton: document.querySelector('#debug-open-villager-button'),
  debugOpenVillagerMenuButton: document.querySelector('#debug-open-villager-menu-button'),
  debugTimeblockSelect: document.querySelector('#debug-timeblock-select'),
  debugSetTimeblockButton: document.querySelector('#debug-set-timeblock-button'),
  debugPresetAidaDinnerButton: document.querySelector('#debug-preset-aida-dinner-button'),
  debugFieldLevelInput: document.querySelector('#debug-field-level-input'),
  debugFieldProgressInput: document.querySelector('#debug-field-progress-input'),
  debugApplyFieldButton: document.querySelector('#debug-apply-field-button'),
  debugStorageLevelInput: document.querySelector('#debug-storage-level-input'),
  debugApplyStorageButton: document.querySelector('#debug-apply-storage-button'),
  debugFlagFilterInput: document.querySelector('#debug-flag-filter-input'),
  debugAcquiredFlagList: document.querySelector('#debug-acquired-flag-list'),
  debugAvailableFlagList: document.querySelector('#debug-available-flag-list'),
  debugFlagDetail: document.querySelector('#debug-flag-detail')
};

function createInitialState() {
  const state = structuredClone(saveTemplate);
  state.savedAt = new Date().toISOString();
  state.currentSceneId = isKnownRuntimeSceneId(state.currentSceneId)
    ? state.currentSceneId
    : FALLBACK_SCENE_ID;
  state.player = {
    ...(state.player || {}),
    name: normalizeProtagonistName(state.player?.name) || DEFAULT_PROTAGONIST_NAME
  };
  state.villagers = createVillagerState(state.villagers || {});
  state.player.inventory = normalizeInventory(state.player.inventory || []);
  state.exploration = normalizeExplorationState(state.exploration || {});
  state.facilities = createFacilityState(state.facilities || {}, state.player.flags || []);
  state.quests = normalizeQuestState(state.quests || {});
  state.events = normalizeEventState(state.events || {});
  state.gameState = 'playing';
  state.player.obtainedItemIds = normalizeObtainedItemIds(state.player.obtainedItemIds, state.player.inventory);
  state.player.encounteredEnemyIds = normalizeEncounteredEnemyIds(state.player.encounteredEnemyIds);
  state.player.knownEnemyWeaknessIds = normalizeKnownEnemyWeaknessIds(state.player.knownEnemyWeaknessIds);
  state.lastInteraction = null;
  state.lastActionResult = null;
  state.pendingEncounterReport = null;
  state.debug = {
    enabled: Boolean(state.debug?.enabled)
  };
  state.versions = {
    ...(state.versions || {}),
    interfacePlan: INTERFACE_PLAN_VERSION,
    program: PROGRAM_VERSION
  };
  restockSmallStorages(state, true);
  return state;
}

function createVillagerState(existing) {
  const coreVillagers = villagers.filter(isCoreVillager);
  return Object.fromEntries(coreVillagers.map((villager) => [
    villager.id,
    {
      affection: existing[villager.id]?.affection ?? villager.initialAffection ?? villager.initialTrust ?? 0
    }
  ]));
}

function getOneTimeSmallStorageFlag(facility) {
  return facility?.smallStorage?.oneTimeClaimFlag || '';
}

function isOneTimeSmallStorageClaimed(facility, playerFlags = gameState?.player?.flags || []) {
  const flag = getOneTimeSmallStorageFlag(facility);
  return Boolean(flag && playerFlags.includes(flag));
}

function createSmallStorageItems(facility, currentItems, claimed) {
  if (claimed) {
    return [];
  }

  const normalized = normalizeInventory(currentItems || []);
  if (normalized.length) {
    return normalized;
  }

  return normalizeInventory(facility?.smallStorage?.initialItems || []);
}

function markOneTimeSmallStorageClaimed(facility) {
  const flag = getOneTimeSmallStorageFlag(facility);
  if (!flag || gameState.player.flags.includes(flag)) {
    return;
  }

  gameState.player.flags.push(flag);
}

function shouldWithdrawSmallStorageAllAtOnce(facility) {
  return Boolean(facility?.smallStorage?.withdrawAllAtOnce);
}

function shouldOverflowSmallStorageItemsToDroppedItems(facility) {
  return Boolean(facility?.smallStorage?.overflowToDroppedItems);
}

function shouldHideEmptyClaimedSmallStorage(facility, locationId = gameState.currentSceneId) {
  if (!getOneTimeSmallStorageFlag(facility) || !isOneTimeSmallStorageClaimed(facility)) {
    return false;
  }

  const state = resolveFacilityContext(facility.id, locationId).state;
  return countInventoryItems(state?.items || []) <= 0;
}

function createFacilityState(existing, playerFlags = []) {
  const next = {};

  for (const facility of facilities) {
    const current = existing[facility.id] || {};
    if (facility.facilityType === 'small_storage') {
      const claimed = isOneTimeSmallStorageClaimed(facility, playerFlags);
      const baseState = {
        lastRestockDay: Number(current.lastRestockDay || 0),
        lastGatherDay: Number(current.lastGatherDay || 0),
        gatherCountDay: Number(current.gatherCountDay || 0),
        gatherCount: Number(current.gatherCount || 0),
        items: createSmallStorageItems(facility, current.items || [], claimed)
      };
      if (supportsPerLocationFacilityState(facility)) {
        const perLocationStates = {};
        for (const locationId of facility.locationIds || []) {
          const locationState = current.perLocationStates?.[locationId] || {};
          perLocationStates[locationId] = {
            lastRestockDay: Number(locationState.lastRestockDay || 0),
            lastGatherDay: Number(locationState.lastGatherDay || 0),
            gatherCountDay: Number(locationState.gatherCountDay || 0),
            gatherCount: Number(locationState.gatherCount || 0),
            items: createSmallStorageItems(facility, locationState.items || [], claimed)
          };
        }
        next[facility.id] = {
          ...baseState,
          perLocationStates
        };
      } else {
        next[facility.id] = baseState;
      }
      continue;
    }

    if (facility.facilityType === 'container') {
      if (usesPerLocationContainerState(facility)) {
        const perLocationStates = {};
        for (const [locationId, locationState] of Object.entries(current.perLocationStates || {})) {
          perLocationStates[locationId] = {
            items: normalizeInventory(locationState.items || []),
            expiresAtTotalSeconds: Number(locationState.expiresAtTotalSeconds || 0)
          };
        }
        next[facility.id] = { perLocationStates };
        continue;
      }
      const level = getFacilityInitialLevel(facility, current.level);
      next[facility.id] = {
        level,
        capacityWeight: getFacilityContainerCapacity(facility, { ...current, level }),
        items: normalizeInventory(current.items || [])
      };
      continue;
    }

    if (facility.facilityType === 'upgradeable') {
      next[facility.id] = createUpgradeableFacilityState(facility, current);
      continue;
    }

    next[facility.id] = { ...current };
    if (facility.id === 'lizard_well') {
      next[facility.id].unlocked = Boolean(current.unlocked);
    }
  }

  return next;
}

function getFacilityInitialLevel(facility, currentLevelValue) {
  const minLevel = Number(facility?.upgrade?.minLevel ?? facility?.upgrade?.initialLevel ?? 0);
  const currentLevel = currentLevelValue === undefined || currentLevelValue === null
    ? minLevel
    : Number(currentLevelValue || 0);
  return Math.max(minLevel, currentLevel);
}

function createUpgradeableFacilityState(facility, current = {}) {
  const state = { level: getFacilityInitialLevel(facility, current.level) };
  if (facility?.progress) {
    state.progress = clampNumber(
      Number(current.progress ?? facility.progress.initial ?? 0),
      0,
      Number(facility.progress.max ?? 100)
    );
  }
  return state;
}

function getFacilityContainerCapacity(facility, state = {}) {
  const initial = Number(facility?.storage?.initialCapacityWeight || 0);
  const increase = Number(facility?.storage?.capacityIncreasePerLevel || 0);
  if (increase) {
    const initialLevel = Number(facility?.upgrade?.initialLevel ?? facility?.upgrade?.minLevel ?? 0);
    const level = getFacilityInitialLevel(facility, state.level);
    return initial + Math.max(0, level - initialLevel) * increase;
  }
  return Number(state.capacityWeight || initial);
}

function readPersistentSave() {
  try {
    const currentSave = window.localStorage.getItem(SAVE_STORAGE_KEY);
    if (currentSave) {
      return currentSave;
    }
    for (const legacyKey of LEGACY_SAVE_STORAGE_KEYS) {
      const legacySave = window.localStorage.getItem(legacyKey);
      if (legacySave) {
        window.localStorage.setItem(SAVE_STORAGE_KEY, legacySave);
        window.localStorage.removeItem(legacyKey);
        return legacySave;
      }
    }
    return null;
  } catch {
    return null;
  }
}

function writePersistentSave(value) {
  try {
    window.localStorage.setItem(SAVE_STORAGE_KEY, value);
  } catch {
    throw new Error('本機存檔寫入失敗，請確認瀏覽器允許 localStorage。');
  }
}

function clearPersistentSave() {
  try {
    window.localStorage.removeItem(SAVE_STORAGE_KEY);
    for (const legacyKey of LEGACY_SAVE_STORAGE_KEYS) {
      window.localStorage.removeItem(legacyKey);
    }
  } catch {
    // Ignore localStorage cleanup failure.
  }
}

function clearLegacyCookieSave() {
  for (const storageKey of [SAVE_STORAGE_KEY, ...LEGACY_SAVE_STORAGE_KEYS]) {
    document.cookie = `${encodeURIComponent(storageKey)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`;
  }
}

function syncGameVersions() {
  gameState.versions = {
    ...(gameState.versions || {}),
    interfacePlan: INTERFACE_PLAN_VERSION,
    program: PROGRAM_VERSION
  };
}

function saveGame(note = '目前有未存檔變更。', persist = false) {
  syncGameVersions();
  if (!persist) {
    hasUnsavedChanges = true;
    elements.saveNote.textContent = note === '目前有未存檔變更。'
      ? note
      : `${note} 尚未存檔。`;
    renderSidebar();
    return;
  }

  gameState.savedAt = new Date().toISOString();
  writePersistentSave(JSON.stringify(gameState));
  hasUnsavedChanges = false;
  elements.saveNote.textContent = note;
  renderSidebar();
}

function isDebugModeEnabled() {
  return Boolean(gameState?.debug?.enabled);
}

function createDebugInfoBlock(lines = []) {
  const visibleLines = lines.filter(Boolean);
  if (!visibleLines.length || !isDebugModeEnabled()) {
    return '';
  }
  return ['[Debug]', ...visibleLines].join('\n');
}

function loadPersistentSave() {
  const rawSave = readPersistentSave();
  if (!rawSave) {
    return null;
  }

  try {
    return normalizeImportedState(JSON.parse(rawSave));
  } catch {
    clearPersistentSave();
    return null;
  }
}

function normalizeImportedState(candidate) {
  if (!candidate || typeof candidate !== 'object') {
    throw new Error('存檔格式不正確。');
  }

  const initial = createInitialState();
  const legacyInventory = Array.isArray(candidate.player?.inventory)
    ? candidate.player.inventory
    : inventoryMapToArray(candidate.player?.inventory || {});

  const merged = {
    ...initial,
    ...candidate,
    schemaVersion: 'save@v1',
    time: {
      ...initial.time,
      ...(candidate.time || {}),
      dailyResetSecond: candidate.time?.dailyResetSecond ?? RESET_SECOND
    },
    player: {
      ...initial.player,
      ...(candidate.player || {}),
      name: normalizeProtagonistName(candidate.player?.name) || DEFAULT_PROTAGONIST_NAME,
      inventory: normalizeInventory(legacyInventory),
      obtainedItemIds: normalizeObtainedItemIds(candidate.player?.obtainedItemIds, legacyInventory),
      encounteredEnemyIds: normalizeEncounteredEnemyIds(candidate.player?.encounteredEnemyIds),
      knownEnemyWeaknessIds: normalizeKnownEnemyWeaknessIds(candidate.player?.knownEnemyWeaknessIds),
      flags: Array.isArray(candidate.player?.flags) ? candidate.player.flags : [],
      dailyFlags: Array.isArray(candidate.player?.dailyFlags) ? candidate.player.dailyFlags : [],
      recentActions: Array.isArray(candidate.player?.recentActions) ? candidate.player.recentActions : []
    },
    facilities: createFacilityState(
      candidate.facilities || candidate.village?.facilities || {},
      Array.isArray(candidate.player?.flags) ? candidate.player.flags : []
    ),
    exploration: normalizeExplorationState(candidate.exploration || initial.exploration || {}),
    villagers: {
      ...initial.villagers,
      ...createVillagerState(candidate.villagers || {})
    },
    quests: normalizeQuestState(candidate.quests || initial.quests || {}),
    events: normalizeEventState(candidate.events || initial.events || {}),
    gameState: candidate.gameState || 'playing',
    lastInteraction: candidate.lastInteraction || null,
    dialogueHistory: normalizeDialogueHistory(candidate.dialogueHistory || initial.dialogueHistory),
    debug: {
      enabled: Boolean(candidate.debug?.enabled)
    },
    lastActionResult: candidate.lastActionResult || null,
    pendingEncounterReport: candidate.pendingEncounterReport || null,
    versions: {
      ...(candidate.versions || {}),
      interfacePlan: INTERFACE_PLAN_VERSION,
      program: PROGRAM_VERSION
    }
  };

  if (!isKnownRuntimeSceneId(merged.currentSceneId)) {
    merged.currentSceneId = initial.currentSceneId;
  }

  merged.player.maxLife = Math.max(initial.player.maxLife, Number(merged.player.maxLife || 0));
  merged.player.life = Math.max(0, Math.min(merged.player.maxLife, Number(merged.player.life || 0)));
  merged.player.maxStamina = Math.max(initial.player.maxStamina, Number(merged.player.maxStamina || 0));
  merged.player.stamina = Math.max(0, Math.min(merged.player.maxStamina, Number(merged.player.stamina || 0)));
  merged.player.maxCarryWeight = Math.max(initial.player.maxCarryWeight || 0, Number(merged.player.maxCarryWeight || 0));
  merged.player.contribution = Math.max(0, Number(merged.player.contribution || 0));
  merged.player.restValue = normalizeRestValueRemainder(merged.player.restValue);
  normalizeRecipeUnlockMigration(merged);
  restockSmallStorages(merged, false);
  return merged;
}

function normalizeRecipeUnlockMigration(state) {
  const gatedRecipeIds = ['sharp_stone_recipe', 'arrow_recipe'];
  const hasNuosiUnlock = state.player.flags?.includes('nuosi_first_workshop_meeting_seen')
    || state.events?.completedEventIds?.includes('nuosi_first_workshop_meeting');
  if (hasNuosiUnlock) {
    return;
  }

  state.player.knownRecipeIds = (state.player.knownRecipeIds || [])
    .filter((recipeId) => !gatedRecipeIds.includes(recipeId));
}

function normalizeDialogueHistory(history) {
  const recentLineIds = Array.isArray(history?.recentLineIds)
    ? history.recentLineIds.filter((id) => typeof id === 'string').slice(0, 10)
    : [];
  const shownCounts = {};
  const seenByContext = {};
  const lastShownAtTotalSeconds = {};

  for (const [id, count] of Object.entries(history?.shownCounts || {})) {
    if (typeof id === 'string') {
      shownCounts[id] = Math.max(0, Number(count) || 0);
    }
  }

  for (const [key, ids] of Object.entries(history?.seenByContext || {})) {
    if (typeof key === 'string' && Array.isArray(ids)) {
      seenByContext[key] = [...new Set(ids.filter((id) => typeof id === 'string' && id))];
    }
  }

  for (const [id, totalSeconds] of Object.entries(history?.lastShownAtTotalSeconds || {})) {
    if (typeof id === 'string') {
      lastShownAtTotalSeconds[id] = Math.max(0, Number(totalSeconds) || 0);
    }
  }

  return { recentLineIds, shownCounts, seenByContext, lastShownAtTotalSeconds };
}

function normalizeQuestState(source) {
  const normalizeIds = (value) => Array.isArray(value)
    ? [...new Set(value.filter((entry) => typeof entry === 'string' && entry))]
    : [];

  return {
    active: normalizeIds(source?.active),
    completed: normalizeIds(source?.completed),
    failed: normalizeIds(source?.failed)
  };
}

function normalizeEventState(source) {
  const completedEventIds = Array.isArray(source?.completedEventIds)
    ? [...new Set(source.completedEventIds.filter((entry) => typeof entry === 'string' && entry))]
    : [];
  const active = source?.active && typeof source.active === 'object'
    ? {
      eventId: typeof source.active.eventId === 'string' ? source.active.eventId : '',
      pageId: typeof source.active.pageId === 'string' ? source.active.pageId : '',
      returnSceneId: typeof source.active.returnSceneId === 'string' ? source.active.returnSceneId : FALLBACK_SCENE_ID,
      triggerType: typeof source.active.triggerType === 'string' ? source.active.triggerType : '',
      triggerSourceId: typeof source.active.triggerSourceId === 'string' ? source.active.triggerSourceId : '',
      triggerContextKey: typeof source.active.triggerContextKey === 'string' ? source.active.triggerContextKey : '',
      reviewMode: Boolean(source.active.reviewMode),
      dinnerContext: normalizeDinnerContext(source.active.dinnerContext),
      appliedPageIds: Array.isArray(source.active.appliedPageIds)
        ? [...new Set(source.active.appliedPageIds.filter((entry) => typeof entry === 'string' && entry))]
        : []
    }
    : null;

  return {
    completedEventIds,
    active: active?.eventId && active?.pageId ? active : null,
    lastExplorationDefeatCaregiverId: typeof source?.lastExplorationDefeatCaregiverId === 'string'
      ? source.lastExplorationDefeatCaregiverId
      : null,
    explorationDefeatCaregiverHistory: Array.isArray(source?.explorationDefeatCaregiverHistory)
      ? [...new Set(source.explorationDefeatCaregiverHistory.filter((entry) => typeof entry === 'string' && entry))]
      : [],
    lastWeavingWorkEventId: normalizeWeavingEventId(
      typeof source?.lastWeavingWorkEventId === 'string'
        ? source.lastWeavingWorkEventId
        : typeof source?.lastWeavingWorkTemplateId === 'string'
          ? source.lastWeavingWorkTemplateId
          : ''
    ),
    remainingWeavingWorkEventIds: normalizeWeavingEventIdList(
      source?.remainingWeavingWorkEventIds || source?.remainingWeavingWorkTemplateIds
    ),
    lastFieldWorkEventId: normalizeFieldWorkEventId(source?.lastFieldWorkEventId),
    remainingFieldWorkEventIds: normalizeFieldWorkEventIdList(source?.remainingFieldWorkEventIds),
    lastNoonRestEventId: normalizeNoonRestEventId(source?.lastNoonRestEventId),
    remainingNoonRestEventIds: normalizeNoonRestEventIdList(source?.remainingNoonRestEventIds),
    lastDinnerPreparationEventId: normalizeDinnerPreparationEventId(source?.lastDinnerPreparationEventId),
    remainingDinnerPreparationEventIds: normalizeDinnerPreparationEventIdList(source?.remainingDinnerPreparationEventIds),
    lastDinnerMealEventIds: normalizeDinnerMealEventIdMap(source?.lastDinnerMealEventIds),
    remainingDinnerMealEventIds: normalizeDinnerMealEventIdListMap(source?.remainingDinnerMealEventIds)
  };
}

function isEventSceneId(sceneId) {
  return typeof sceneId === 'string' && sceneId.startsWith('event:');
}

function isKnownRuntimeSceneId(sceneId) {
  return isEventSceneId(sceneId)
    || sceneId === NAME_PROTAGONIST_SCENE_ID
    || scenes.some((scene) => scene.id === sceneId)
    || locations.some((location) => location.id === sceneId)
    || sceneId === ENCOUNTER_REPORT_SCENE_ID
    || sceneId === ABANDONED_CABIN_SCENE_ID
    || sceneId === HIDDEN_CAVE_SCENE_ID
    || (typeof sceneId === 'string' && (
      sceneId.startsWith('encounter:')
      || sceneId.startsWith('dialogue:')
      || sceneId.startsWith('aidaTraining:')
      || sceneId.startsWith('locationInquiry:')
      || sceneId.startsWith('dinner:')
      || sceneId.startsWith('quest:')
      || sceneId.startsWith('questOffer:')
      || sceneId.startsWith('questSubmit:')
      || sceneId.startsWith('knowledge:')
      || sceneId.startsWith('knowledgeCategory:')
      || sceneId.startsWith('knowledgeItem:')
      || sceneId.startsWith('knowledgeTopic:')
      || sceneId.startsWith('knowledgeEnemy:')
      || sceneId.startsWith('facility:')
      || sceneId.startsWith('trade:')
      || sceneId.startsWith('storage:')
      || sceneId.startsWith('forageLoot:')
      || sceneId.startsWith('battleLoot:')
      || sceneId.startsWith('discard:')
      || sceneId.startsWith('wait:')
      || sceneId.startsWith('sleepMenu:')
      || sceneId.startsWith('sleep:')
      || sceneId.startsWith('useItem:')
      || sceneId.startsWith('craftItem:')
      || sceneId.startsWith('gift:')
    ));
}

function normalizeWeavingEventIdList(list) {
  return (Array.isArray(list) ? list : [])
    .map((entry) => normalizeWeavingEventId(entry))
    .filter((entry) => typeof entry === 'string' && WEAVING_WORK_EVENT_IDS.includes(entry))
    .filter((entry, index, array) => array.indexOf(entry) === index);
}

function normalizeWeavingEventId(eventId) {
  if (typeof eventId !== 'string') {
    return '';
  }
  return LEGACY_WEAVING_WORK_EVENT_ID_MAP[eventId] || eventId;
}

function normalizeFieldWorkEventIdList(list) {
  return normalizeEventIdListForPool(list, FIELD_WORK_EVENT_IDS);
}

function normalizeFieldWorkEventId(eventId) {
  return typeof eventId === 'string' && FIELD_WORK_EVENT_IDS.includes(eventId) ? eventId : '';
}

function normalizeNoonRestEventIdList(list) {
  return normalizeEventIdListForPool(list, NOON_REST_EVENT_IDS);
}

function normalizeNoonRestEventId(eventId) {
  return typeof eventId === 'string' && NOON_REST_EVENT_IDS.includes(eventId) ? eventId : '';
}

function normalizeDinnerPreparationEventIdList(list) {
  return normalizeEventIdListForPool(list, getDinnerPreparationEventIds());
}

function normalizeDinnerPreparationEventId(eventId) {
  const pool = getDinnerPreparationEventIds();
  return typeof eventId === 'string' && pool.includes(eventId) ? eventId : '';
}

function normalizeDinnerMealEventIdListMap(source = {}) {
  const next = {};
  for (const tierId of getDinnerResultTierIds()) {
    next[tierId] = normalizeEventIdListForPool(source?.[tierId], getDinnerMealEventIds(tierId));
  }
  return next;
}

function normalizeDinnerMealEventIdMap(source = {}) {
  const next = {};
  for (const tierId of getDinnerResultTierIds()) {
    const eventId = source?.[tierId];
    const pool = getDinnerMealEventIds(tierId);
    next[tierId] = typeof eventId === 'string' && pool.includes(eventId) ? eventId : '';
  }
  return next;
}

function normalizeEventIdListForPool(list, pool) {
  return (Array.isArray(list) ? list : [])
    .filter((entry) => typeof entry === 'string' && pool.includes(entry))
    .filter((entry, index, array) => array.indexOf(entry) === index);
}

function normalizeDinnerContext(context = null) {
  if (!context || typeof context !== 'object') {
    return null;
  }
  const tierIds = getDinnerResultTierIds();
  const tierId = tierIds.includes(context.tierId) ? context.tierId : '';
  const selectedFoods = normalizeInventory(context.selectedFoods || [])
    .filter((entry) => getDinnerFoodConfig(entry.itemId));
  const tokenFoodIds = {};
  for (const [key, value] of Object.entries(context.tokenFoodIds || {})) {
    if (typeof value === 'string' && getDinnerFoodConfig(value)) {
      tokenFoodIds[key] = value;
    }
  }
  const mealFoodPairIds = Array.isArray(context.mealFoodPairIds)
    ? context.mealFoodPairIds.filter((itemId) => typeof itemId === 'string' && getDinnerFoodConfig(itemId)).slice(0, 2)
    : [];
  return {
    activityId: context.activityId === DINNER_ACTIVITY_ID ? DINNER_ACTIVITY_ID : '',
    score: Math.max(0, Number(context.score || 0)),
    tierId,
    selectedFoods,
    tokenFoodIds,
    mealFoodPairIds,
    mealEventId: typeof context.mealEventId === 'string' ? context.mealEventId : ''
  };
}

function normalizeExplorationState(source) {
  const currentLayer = EXPLORATION_LAYER_ORDER.some((layer) => layer.id === source?.currentLayer)
    ? source.currentLayer
    : null;
  return {
    active: Boolean(source?.active),
    regionId: typeof source?.regionId === 'string' ? source.regionId : null,
    currentLayer,
    progress: Math.max(0, Number(source?.progress ?? source?.layerProgress ?? 0) || 0),
    forageState: {
      positionKey: typeof source?.forageState?.positionKey === 'string' ? source.forageState.positionKey : null,
      usedAtCurrentPosition: Boolean(source?.forageState?.usedAtCurrentPosition)
    },
    temporaryResourceNodes: normalizeExplorationNodes(source?.temporaryResourceNodes || []),
    temporaryLoot: normalizeInventory(source?.temporaryLoot || []),
    encounterState: source?.encounterState || null,
    dangerRate: clampNumber(Number(source?.dangerRate || 0), 0, 100),
    lastDangerPositionKey: typeof source?.lastDangerPositionKey === 'string' ? source.lastDangerPositionKey : null,
    sceneryText: typeof source?.sceneryText === 'string' ? source.sceneryText : '',
    sceneryPositionKey: typeof source?.sceneryPositionKey === 'string' ? source.sceneryPositionKey : null,
    blackCatPositionKey: typeof source?.blackCatPositionKey === 'string' ? source.blackCatPositionKey : null,
    blackCatPresent: Boolean(source?.blackCatPresent),
    lastBlackCatPresenceRollWasPresent: typeof source?.lastBlackCatPresenceRollWasPresent === 'boolean'
      ? source.lastBlackCatPresenceRollWasPresent
      : Boolean(source?.blackCatPresent),
    openFacilityInstanceId: typeof source?.openFacilityInstanceId === 'string' ? source.openFacilityInstanceId : null
  };
}

function normalizeExplorationNodes(nodes) {
  return (Array.isArray(nodes) ? nodes : [])
    .map((node, index) => ({
      instanceId: typeof node?.instanceId === 'string' ? node.instanceId : `tempnode_${index}_${node?.facilityId || 'unknown'}`,
      facilityId: typeof node?.facilityId === 'string' ? node.facilityId : '',
      items: normalizeInventory(node?.items || []),
      gathered: Boolean(node?.gathered)
    }))
    .filter((node) => node.facilityId);
}

function inventoryMapToArray(map) {
  return Object.entries(map || {})
    .filter(([, count]) => Number(count) > 0)
    .map(([itemId, count]) => ({ itemId, count: Number(count) }));
}

function normalizeInventory(entries) {
  const totals = new Map();
  for (const entry of entries || []) {
    const itemId = entry?.itemId || entry?.id;
    const count = Number(entry?.count || 0);
    if (!itemId || count <= 0) {
      continue;
    }
    totals.set(itemId, (totals.get(itemId) || 0) + count);
  }
  return [...totals.entries()].map(([itemId, count]) => ({ itemId, count }));
}

function normalizeObtainedItemIds(source, inventory = []) {
  const ids = new Set(Array.isArray(source) ? source.filter((entry) => typeof entry === 'string' && entry) : []);
  for (const entry of normalizeInventory(inventory || [])) {
    ids.add(entry.itemId);
  }
  return [...ids];
}

function normalizeEncounteredEnemyIds(source) {
  return [...new Set(Array.isArray(source) ? source.filter((entry) => typeof entry === 'string' && entry) : [])];
}

function normalizeKnownEnemyWeaknessIds(source) {
  return [...new Set(Array.isArray(source) ? source.filter((entry) => typeof entry === 'string' && entry) : [])];
}

function rememberObtainedItem(itemId) {
  if (!gameState?.player || !itemId) {
    return;
  }
  if (!Array.isArray(gameState.player.obtainedItemIds)) {
    gameState.player.obtainedItemIds = normalizeObtainedItemIds([], gameState.player.inventory || []);
  }
  if (!gameState.player.obtainedItemIds.includes(itemId)) {
    gameState.player.obtainedItemIds.push(itemId);
  }
}

function rememberEncounteredEnemy(enemyId) {
  if (!gameState?.player || !enemyId) {
    return;
  }
  if (!Array.isArray(gameState.player.encounteredEnemyIds)) {
    gameState.player.encounteredEnemyIds = normalizeEncounteredEnemyIds(gameState.player.encounteredEnemyIds);
  }
  if (!gameState.player.encounteredEnemyIds.includes(enemyId)) {
    gameState.player.encounteredEnemyIds.push(enemyId);
  }
}

function rememberKnownEnemyWeakness(enemyId) {
  if (!gameState?.player || !enemyId) {
    return false;
  }
  if (!Array.isArray(gameState.player.knownEnemyWeaknessIds)) {
    gameState.player.knownEnemyWeaknessIds = normalizeKnownEnemyWeaknessIds(gameState.player.knownEnemyWeaknessIds);
  }
  if (!gameState.player.knownEnemyWeaknessIds.includes(enemyId)) {
    gameState.player.knownEnemyWeaknessIds.push(enemyId);
    return true;
  }
  return false;
}

function getInventoryCount(inventory, itemId) {
  return inventory.find((entry) => entry.itemId === itemId)?.count || 0;
}

function addInventoryItems(inventory, itemCounts) {
  const merged = normalizeInventory(inventory);
  for (const [itemId, count] of Object.entries(itemCounts || {})) {
    changeInventoryItem(merged, itemId, Number(count));
    if (Number(count) > 0 && inventory === gameState?.player?.inventory) {
      rememberObtainedItem(itemId);
    }
  }
  return normalizeInventory(merged);
}

function changeInventoryItem(inventory, itemId, delta) {
  if (!itemId || !Number.isFinite(delta) || delta === 0) {
    return;
  }

  const entry = inventory.find((candidate) => candidate.itemId === itemId);
  if (delta > 0 && inventory === gameState?.player?.inventory) {
    rememberObtainedItem(itemId);
  }
  if (!entry && delta > 0) {
    inventory.push({ itemId, count: delta });
    return;
  }

  if (entry) {
    entry.count += delta;
    if (entry.count <= 0) {
      inventory.splice(inventory.indexOf(entry), 1);
    }
  }
}

function getCurrentScene() {
  if (isEventSceneId(gameState.currentSceneId)) {
    return createEventScene(gameState.currentSceneId);
  }

  if (debugBypassNextTriggeredEvent) {
    debugBypassNextTriggeredEvent = false;
  } else if (tryStartTriggeredEventForCurrentScene()) {
    return createEventScene(gameState.currentSceneId);
  }

  if (gameState.currentSceneId === ENCOUNTER_REPORT_SCENE_ID) {
    return createEncounterReportScene();
  }

  if (gameState.currentSceneId === ABANDONED_CABIN_SCENE_ID) {
    return createAbandonedCabinScene();
  }

  if (gameState.currentSceneId === HIDDEN_CAVE_SCENE_ID) {
    return createHiddenCaveScene();
  }

  if (gameState.currentSceneId === NAME_PROTAGONIST_SCENE_ID) {
    return createNameProtagonistScene();
  }

  if (gameState.currentSceneId.startsWith('encounter:')) {
    return createEncounterScene(gameState.currentSceneId);
  }

  if (gameState.currentSceneId.startsWith('dialogue:')) {
    return createDialogueScene(gameState.currentSceneId);
  }

  if (gameState.currentSceneId.startsWith('aidaTraining:')) {
    return createAidaSkillTrainingScene(gameState.currentSceneId);
  }

  if (gameState.currentSceneId.startsWith('locationInquiry:')) {
    return createLocationInquiryScene(gameState.currentSceneId);
  }

  if (gameState.currentSceneId.startsWith('dinner:')) {
    return createDinnerIngredientScene(gameState.currentSceneId);
  }

  if (gameState.currentSceneId.startsWith('quest:')) {
    return createLegacyQuestReturnScene(gameState.currentSceneId);
  }

  if (gameState.currentSceneId.startsWith('questOffer:')) {
    return createLegacyQuestReturnScene(gameState.currentSceneId);
  }

  if (gameState.currentSceneId.startsWith('questSubmit:')) {
    return createLegacyQuestReturnScene(gameState.currentSceneId);
  }

  if (gameState.currentSceneId.startsWith('knowledge:')) {
    return createKnowledgeScene(gameState.currentSceneId);
  }

  if (gameState.currentSceneId.startsWith('knowledgeCategory:')) {
    return createKnowledgeCategoryScene(gameState.currentSceneId);
  }

  if (gameState.currentSceneId.startsWith('knowledgeItem:')) {
    return createKnowledgeItemScene(gameState.currentSceneId);
  }

  if (gameState.currentSceneId.startsWith('knowledgeTopic:')) {
    return createKnowledgeTopicScene(gameState.currentSceneId);
  }

  if (gameState.currentSceneId.startsWith('knowledgeEnemy:')) {
    return createKnowledgeEnemyScene(gameState.currentSceneId);
  }

  if (gameState.currentSceneId.startsWith('facility:')) {
    return createFacilityScene(gameState.currentSceneId);
  }

  if (gameState.currentSceneId.startsWith('trade:')) {
    return createTradeScene(gameState.currentSceneId);
  }

  if (gameState.currentSceneId.startsWith('storage:')) {
    return createStorageScene(gameState.currentSceneId);
  }

  if (gameState.currentSceneId.startsWith('forageLoot:')) {
    return createForageLootScene(gameState.currentSceneId);
  }

  if (gameState.currentSceneId.startsWith('battleLoot:')) {
    return createBattleLootScene(gameState.currentSceneId);
  }

  if (gameState.currentSceneId.startsWith('discard:')) {
    const returnSceneId = gameState.currentSceneId.split(':')[1] || FALLBACK_SCENE_ID;
    return createStorageScene(`storage:discarded_items:${returnSceneId}`);
  }

  if (gameState.currentSceneId.startsWith('wait:')) {
    return createWaitScene(gameState.currentSceneId);
  }

  if (gameState.currentSceneId.startsWith('sleepMenu:') || gameState.currentSceneId.startsWith('sleep:')) {
    return createSleepScene(gameState.currentSceneId);
  }

  if (gameState.currentSceneId.startsWith('useItem:')) {
    return createUseItemScene(gameState.currentSceneId);
  }

  if (gameState.currentSceneId.startsWith('craftItem:')) {
    return createPortableCraftScene(gameState.currentSceneId);
  }

  if (gameState.currentSceneId.startsWith('gift:')) {
    return createGiftScene(gameState.currentSceneId);
  }

  const fixedScene = scenes.find((scene) => scene.id === gameState.currentSceneId);
  if (fixedScene) {
    return createFixedScene(fixedScene);
  }

  const location = locations.find((candidate) => candidate.id === gameState.currentSceneId);
  return location ? createLocationScene(location) : createLocationScene(locations[0]);
}

function createFixedScene(scene) {
  if (scene.sceneType === 'exploration') {
    return createExplorationScene(scene);
  }

  if (!scene.baseCommandSet) {
    return {
      ...scene,
      choiceGroups: scene.choiceGroups || groupChoicesByLabel(scene.choices || [])
    };
  }

  const commandChoices = getCommandSet(scene.baseCommandSet).map((commandId) => {
    const command = commands.commands[commandId];
    const base = {
      id: `${scene.id}_${commandId}`,
      label: command.label,
      actionType: command.actionType,
      timeCostSeconds: command.defaultTimeCostSeconds || 0,
      nextSceneId: scene.id
    };

    if (commandId === 'useItem') {
      return { ...base, hideCost: true, dynamicAction: 'useItemMenu', returnSceneId: scene.id };
    }
    if (commandId === 'wait') {
      return { ...base, label: '等待', timeCostSeconds: 0, hideCost: true, dynamicAction: 'openWaitMenu', returnSceneId: scene.id };
    }
    if (commandId === 'retreat') {
      return createExplorationRetreatChoice(base, scene.id);
    }
    if (commandId === 'forage') {
      return {
        ...base,
        dynamicAction: 'explorationForage',
        returnSceneId: scene.id,
        disabledReason: getExplorationForageDisabledReason()
      };
    }
    if (commandId === 'exploreDeeper') {
      return { ...base, dynamicAction: 'explorationAdvance', returnSceneId: scene.id };
    }
    if (commandId === 'shoutAttractEnemy') {
      return { ...base, dynamicAction: 'explorationShout', returnSceneId: scene.id };
    }

    return base;
  });

  return {
    ...scene,
    description: createActionSceneDescription(createSceneImpressionDescription(scene, scene.id)),
    choiceGroups: [{
      title: '行動',
      choices: commandChoices
    }]
  };
}

function createExplorationScene(scene) {
  ensureExplorationSession(scene.id);
  const exploration = gameState.exploration;
  const layer = getCurrentExplorationLayer();
  const presentVillagers = getPresentVillagers(scene.id);
  const facilitiesHere = getTemporaryExplorationFacilities();
  const description = createActionSceneDescription(exploration.sceneryText || createSceneImpressionDescription(scene, scene.id, { includeScenery: true }));
  const nightWarningDescription = createExplorationNightWarningDescription();
  const blackCatLeaveDescription = shouldShowBlackCatLeaveDescription() ? createBlackCatLeaveDescription() : '';
  const blackCatDescription = isBlackCatPresentAt(scene.id) ? createBlackCatPresenceDescription() : '';
  const descriptionSections = [
    {
      type: 'text',
      text: description
    },
    nightWarningDescription ? {
      type: 'confidence',
      tone: 'danger',
      text: nightWarningDescription
    } : null,
    blackCatLeaveDescription ? {
      type: 'confidence',
      tone: 'danger',
      text: blackCatLeaveDescription
    } : null,
    blackCatDescription ? {
      type: 'confidence',
      tone: 'safe',
      text: blackCatDescription
    } : null
  ].filter(Boolean);

  return {
    id: scene.id,
    title: scene.title,
    location: scene.location,
    ...(descriptionSections.length > 1 ? { descriptionSections } : { description }),
    adventureStatus: createAdventureStatusData(exploration, layer),
    choiceGroups: [
      ...createExplorationCommandGroups(scene),
      {
        title: '移動到',
        choices: createExplorationMoveChoices()
      },
      {
        title: '看見的人物',
        choices: presentVillagers.map((villager) => createPresentVillagerChoice(villager, scene.id))
      },
      {
        title: '看見的物件',
        choices: createExplorationFacilityEntryChoices(scene.id, facilitiesHere)
      }
    ]
  };
}

function createExplorationNightWarningDescription() {
  return BLACK_SHADOW_TIME_BLOCKS.includes(getTimeBlock(gameState.time.secondsOfDay))
    ? '夜色壓在林間，枝葉深處像有什麼正慢慢靠近。'
    : '';
}

function createBlackCatPresenceDescription() {
  return '你在樹影邊緣看見那隻黑貓。牠安靜地坐著，尾巴慢慢掃過落葉，像是早就知道你會走到這裡。';
}

function shouldShowBlackCatLeaveDescription() {
  return actionResultVisible && Boolean(gameState.lastActionResult?.blackCatLeft);
}

function createBlackCatLeaveDescription() {
  return '你再看向樹影時，黑貓已經離開了。只剩落葉被牠踏過的痕跡，慢慢被森林的陰影吞沒。';
}

function markBlackCatLeftSceneDescription(text = '') {
  if (!gameState.lastActionResult) {
    return;
  }
  gameState.lastActionResult.blackCatLeft = true;
  if (text) {
    gameState.lastActionResult.sceneDescription = text;
  }
}

function createExplorationCommandGroups(scene) {
  const choices = getCommandSet(scene.baseCommandSet)
    .map((commandId) => createExplorationCommandChoice(scene.id, commandId))
    .filter(Boolean);
  const moveChoices = choices.filter((choice) => choice.group === 'movement');
  const actionChoices = choices.filter((choice) => choice.group !== 'movement');
  return [
    { title: '移動', choices: moveChoices },
    { title: '行動', choices: actionChoices }
  ].filter((group) => group.choices.length);
}

function createExplorationMoveChoices() {
  const choices = [];
  if (canEnterTempleRuins()) {
    choices.push({
      id: 'move_to_temple_ruins',
      label: '神殿遺跡',
      actionType: 'move',
      timeCostSeconds: 600,
      nextSceneId: TEMPLE_RUINS_SCENE_ID,
      progressLabel: '正在穿過瘴氣邊界...'
    });
  }
  if (canEnterHiddenCave()) {
    choices.push({
      id: 'move_to_hidden_cave',
      label: '隱藏的洞穴',
      actionType: 'move',
      timeCostSeconds: 0,
      hideCost: true,
      dynamicAction: 'enterHiddenCave'
    });
  }
  if (canEnterAbandonedCabin()) {
    choices.push({
      id: 'move_to_abandoned_cabin',
      label: '廢棄小屋',
      actionType: 'move',
      timeCostSeconds: 0,
      hideCost: true,
      dynamicAction: 'enterAbandonedCabin'
    });
  }
  return choices;
}

function createAbandonedCabinScene() {
  const description = '破舊木牆擋住了林間的風，屋頂雖然漏著幾道縫，四周卻比外頭安靜許多。你能聽見遠處森林還在低低作響，但那些聲音暫時進不到這裡。';
  return {
    id: ABANDONED_CABIN_SCENE_ID,
    title: '廢棄小屋',
    location: '山谷森林外圍',
    description: createActionSceneDescription(description),
    infoRows: [
      { label: '氣氛', value: '這裡勉強能讓你避開外頭的視線與腳步聲。' }
    ],
    choiceGroups: [
      {
        title: '行動',
        choices: [
          {
            id: 'abandoned_cabin_use_item',
            label: '道具',
            actionType: 'useItem',
            timeCostSeconds: 0,
            hideCost: true,
            dynamicAction: 'useItemMenu',
            returnSceneId: ABANDONED_CABIN_SCENE_ID
          },
          {
            id: 'abandoned_cabin_wait',
            label: '等待',
            actionType: 'wait',
            timeCostSeconds: 0,
            hideCost: true,
            dynamicAction: 'openWaitMenu',
            returnSceneId: ABANDONED_CABIN_SCENE_ID
          }
        ]
      },
      {
        title: '移動到',
        choices: [{
          id: 'leave_abandoned_cabin',
          label: '森林外圍',
          actionType: 'move',
          timeCostSeconds: 0,
          hideCost: true,
          dynamicAction: 'leaveAbandonedCabin'
        }]
      }
    ]
  };
}

function createHiddenCaveScene() {
  const facilitiesHere = getFacilitiesAtLocation(HIDDEN_CAVE_SCENE_ID);
  const description = '藤蔓後方藏著一個低矮洞口。裡頭的空氣比林間更冷，潮濕石壁把外面的風聲壓得很遠，只剩水滴聲在黑暗裡慢慢回響。';
  return {
    id: HIDDEN_CAVE_SCENE_ID,
    title: '隱藏的洞穴',
    location: '山谷森林外圍',
    description: createActionSceneDescription(description),
    infoRows: [
      { label: '氣氛', value: '這裡暫時沒有野獸逼近的跡象。' }
    ],
    choiceGroups: [
      {
        title: '行動',
        choices: [
          {
            id: 'hidden_cave_use_item',
            label: '道具',
            actionType: 'useItem',
            timeCostSeconds: 0,
            hideCost: true,
            dynamicAction: 'useItemMenu',
            returnSceneId: HIDDEN_CAVE_SCENE_ID
          },
          {
            id: 'hidden_cave_wait',
            label: '等待',
            actionType: 'wait',
            timeCostSeconds: 0,
            hideCost: true,
            dynamicAction: 'openWaitMenu',
            returnSceneId: HIDDEN_CAVE_SCENE_ID
          }
        ]
      },
      {
        title: '看見的物件',
        choices: createFacilityEntryChoices({ id: HIDDEN_CAVE_SCENE_ID }, facilitiesHere)
      },
      {
        title: '移動到',
        choices: [{
          id: 'leave_hidden_cave',
          label: '森林外圍',
          actionType: 'move',
          timeCostSeconds: 0,
          hideCost: true,
          dynamicAction: 'leaveHiddenCave'
        }]
      }
    ]
  };
}

function createAdventureStatusData(exploration, layer = getCurrentExplorationLayer()) {
  return {
    region: layer?.label || getCurrentRegionLabel(),
    progress: clampNumber(Number(exploration?.progress || 0), 0, 100),
    dangerRate: clampNumber(Number(exploration?.dangerRate || 0), 0, 100)
  };
}

function formatTime(secondsOfDay) {
  const hours = Math.floor(secondsOfDay / 3600).toString().padStart(2, '0');
  const minutes = Math.floor((secondsOfDay % 3600) / 60).toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

function getTimeBlock(secondsOfDay) {
  const normalized = ((Number(secondsOfDay || 0) % 86400) + 86400) % 86400;
  const current = [...TIME_BLOCKS]
    .reverse()
    .find((block) => normalized >= block.startSecond);
  return current?.id || '深夜';
}

function getTimeBlockTargetInfo(targetTimeBlock) {
  const target = TIME_BLOCKS.find((block) => block.id === targetTimeBlock);
  if (!target) {
    return { seconds: 0, isNextDay: false, label: targetTimeBlock || '指定時段' };
  }

  const current = ((Number(gameState.time.secondsOfDay || 0) % 86400) + 86400) % 86400;
  const sameDayDelta = target.startSecond - current;
  const isNextDay = sameDayDelta <= 0;
  return {
    seconds: isNextDay ? sameDayDelta + 86400 : sameDayDelta,
    isNextDay,
    label: `${isNextDay ? '隔天' : ''}${target.id}`
  };
}

function formatDuration(totalSeconds = 0) {
  if (!totalSeconds) {
    return '不耗時';
  }

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  if (hours && minutes) return `${hours} 小時 ${minutes} 分`;
  if (hours) return `${hours} 小時`;
  return `${minutes || 1} 分鐘`;
}

function startPendingActionFlow(flow = {}) {
  pendingActionFlow = {
    id: flow.id || '',
    type: flow.type || 'draft',
    sourceSceneId: flow.sourceSceneId || gameState.currentSceneId || FALLBACK_SCENE_ID,
    interfaceSceneId: flow.interfaceSceneId || '',
    returnSceneId: flow.returnSceneId || FALLBACK_SCENE_ID,
    cancelSceneId: flow.cancelSceneId || flow.sourceSceneId || gameState.currentSceneId || FALLBACK_SCENE_ID,
    confirmAction: { ...(flow.confirmAction || {}) },
    cancelAction: { ...(flow.cancelAction || {}) },
    draftKey: flow.draftKey || ''
  };
  return pendingActionFlow;
}

function getPendingActionFlow(flowId = '') {
  if (!pendingActionFlow) {
    return null;
  }
  if (flowId && pendingActionFlow.id !== flowId) {
    return null;
  }
  return pendingActionFlow;
}

function clearPendingActionFlow(flowId = '') {
  const flow = getPendingActionFlow(flowId);
  if (!flow) {
    return null;
  }
  pendingActionFlow = null;
  return flow;
}

function getPendingActionConfirmSettings(flowId = '', fallback = {}) {
  const flow = getPendingActionFlow(flowId);
  const confirmAction = flow?.confirmAction || fallback;
  return {
    timeCostSeconds: Number(confirmAction.timeCostSeconds ?? fallback.timeCostSeconds ?? 0),
    progressOnly: Boolean(confirmAction.progressOnly ?? fallback.progressOnly),
    progressScope: confirmAction.progressScope ?? fallback.progressScope ?? '',
    progressLabel: confirmAction.progressLabel ?? fallback.progressLabel ?? '',
    hideCost: Boolean(confirmAction.hideCost ?? fallback.hideCost)
  };
}

function canChoose(choice) {
  return !getChoiceDisabledReason(choice);
}

function getChoiceDisabledReason(choice) {
  if (!choice) return '指令資料不存在。';
  if (!isChoiceVisible(choice)) return '目前沒有這個選項。';
  if (choice.disabledReason) return choice.disabledReason;
  if (choice.disabledStatic) return typeof choice.disabledStatic === 'string' ? choice.disabledStatic : '目前無法使用這個指令。';
  if (choice.disabledByStock) return '庫存不足或已售完。';
  if (choice.dynamicAction === 'useItem') return getItemUseDisabledReason(getItem(choice.itemId), choice.returnSceneId);
  if (choice.dynamicAction === 'runInteractionAction') return getInteractionActionDisabledReason(choice);

  const carryReason = getChoiceCarryDisabledReason(choice);
  if (carryReason) return carryReason;

  const staminaReason = getChoiceStaminaDisabledReason(choice);
  if (staminaReason) return staminaReason;

  return getChoiceRequirementDisabledReason(choice);
}

function getChoiceRequirementDisabledReason(choice) {
  const requirements = choice?.requirements || {};
  if (requirements.stamina && gameState.player.stamina < requirements.stamina) {
    return `需要體力至少 ${requirements.stamina}，目前 ${gameState.player.stamina}。`;
  }
  if (requirements.life && gameState.player.life < requirements.life) {
    return `需要生命至少 ${requirements.life}，目前 ${gameState.player.life}。`;
  }
  if (requirements.item) {
    const owned = getInventoryCount(gameState.player.inventory, requirements.item.id);
    if (owned < requirements.item.count) {
      const itemName = getItem(requirements.item.id)?.name || requirements.item.id;
      return `需要 ${itemName} x${requirements.item.count}，目前 x${owned}。`;
    }
  }
  return '';
}

function isChoiceVisible(choice) {
  const visibility = choice?.visibility || choice?.visibleWhen;
  if (!visibility) {
    return true;
  }
  const flags = gameState.player.flags || [];
  const requiredFlags = [
    ...(visibility.requiredFlags || []),
    ...(visibility.requiredFlag ? [visibility.requiredFlag] : [])
  ];
  if (requiredFlags.some((flag) => !flags.includes(flag))) {
    return false;
  }
  const blockedFlags = [
    ...(visibility.blockedFlags || []),
    ...(visibility.blockedFlag ? [visibility.blockedFlag] : [])
  ];
  if (blockedFlags.some((flag) => flags.includes(flag))) {
    return false;
  }
  const dailyFlags = gameState.player.dailyFlags || [];
  const requiredDailyFlags = [
    ...(visibility.requiredDailyFlags || []),
    ...(visibility.requiredDailyFlag ? [visibility.requiredDailyFlag] : [])
  ];
  if (requiredDailyFlags.some((flag) => !dailyFlags.includes(flag))) {
    return false;
  }
  const blockedDailyFlags = [
    ...(visibility.blockedDailyFlags || []),
    ...(visibility.blockedDailyFlag ? [visibility.blockedDailyFlag] : [])
  ];
  if (blockedDailyFlags.some((flag) => dailyFlags.includes(flag))) {
    return false;
  }
  if (Array.isArray(visibility.timeBlocks) && !visibility.timeBlocks.includes(getTimeBlock(gameState.time.secondsOfDay))) {
    return false;
  }
  return true;
}

function getInteractionActionDisabledReason(choice) {
  if (!choice) {
    return '互動資料不存在。';
  }
  const requirementReason = getChoiceRequirementDisabledReason(choice);
  if (requirementReason) {
    return requirementReason;
  }
  if (!doesInteractionActionChangeState(choice)) {
    if (choice.actionType === 'recover' && gameState.player.life >= gameState.player.maxLife) {
      return '目前生命已滿，不需要治療。';
    }
    return '現在進行這個互動不會產生任何變化。';
  }
  return '';
}

function getChoiceStaminaDisabledReason(choice) {
  const staminaCost = Number(choice?.staminaCost || 0);
  if (staminaCost <= 0 || choice?.allowWhenLowStamina) {
    return '';
  }
  if (gameState.player.stamina < staminaCost) {
    return `需要體力至少 ${staminaCost}，目前 ${gameState.player.stamina}。`;
  }
  return '';
}

async function applyChoice(choice) {
  if (!canChoose(choice)) {
    recordFailedAction(choice, getChoiceDisabledReason(choice) || '目前條件不足，無法選擇這個行動。');
    return;
  }

  const useSceneTransition = shouldUseSceneTransition(choice);
  if (shouldShowProgress(choice)) {
    await showActionProgress(choice, { keepVisible: useSceneTransition });
  }

  if (choice.dynamicAction) {
    applyDynamicChoice(choice);
    if (useSceneTransition) {
      await finishSceneTransition();
    }
    return;
  }

  runTrackedAction(choice, () => {
    applyEffects(choice.effects || {});
    advanceTime(choice.timeCostSeconds || 0);

    if (gameState.player.life <= 0) {
      gameState.player.life = 0;
      gameState.gameState = 'game_over';
    }

    if (choice.nextSceneId && gameState.gameState === 'playing') {
      if (isExplorationSceneId(choice.nextSceneId)) {
        ensureExplorationSession(choice.nextSceneId);
      }
      gameState.currentSceneId = choice.nextSceneId;
    }
  });
  saveGame();
  render();
  if (useSceneTransition) {
    await finishSceneTransition();
  }
}

function shouldShowProgress(choice) {
  return Boolean(choice.progressOnly) || (choice.timeCostSeconds || 0) > 0 || isChoiceTransitionEnabled(choice);
}

function shouldUseSceneTransition(choice) {
  const seconds = Number(choice.timeCostSeconds || choice.seconds || 0);
  return isChoiceTransitionEnabled(choice)
    || seconds >= SCENE_TRANSITION_THRESHOLD_SECONDS
    || choice.dynamicAction === 'sleep'
    || choice.dynamicAction === 'sleepUntilTimeBlock';
}

function isChoiceTransitionEnabled(choice = {}) {
  if (choice.transition === true || choice.transition === 'fade') {
    return true;
  }
  if (choice.transition && typeof choice.transition === 'object') {
    return choice.transition.type === 'fade' || choice.transition.effect === 'fade';
  }
  return false;
}

function showActionProgress(choice, options = {}) {
  if (options.keepVisible) {
    return showSceneTransition(choice);
  }

  const choiceOnly = choice.progressScope === 'choices';
  const label = choice.progressLabel || `正在${choice.label.replace(/^與/, '和')}...`;
  elements.actionProgressLabel.textContent = label;
  elements.actionProgress.hidden = false;
  elements.actionProgress.classList.remove('is-running');
  if (choiceOnly) {
    elements.actionProgress.classList.add('action-progress-choice');
    elements.choiceList.prepend(elements.actionProgress);
  } else {
    elements.actionProgress.classList.remove('action-progress-choice');
    elements.scenePanel.classList.add('is-busy');
    elements.sceneMain.classList.add('is-busy');
  }
  elements.choiceList.classList.add('is-busy');
  void elements.actionProgress.offsetWidth;
  elements.actionProgress.classList.add('is-running');

  return new Promise((resolve) => {
    window.setTimeout(() => {
      elements.actionProgress.classList.remove('is-running');
      elements.actionProgress.hidden = true;
      if (choiceOnly) {
        elements.actionProgress.classList.remove('action-progress-choice');
        elements.sceneMain.insertBefore(elements.actionProgress, elements.actionResult);
      } else {
        elements.scenePanel.classList.remove('is-busy');
        elements.sceneMain.classList.remove('is-busy');
      }
      elements.choiceList.classList.remove('is-busy');
      resolve();
    }, 500);
  });
}

function showSceneTransition(choice) {
  elements.sceneTransitionText.textContent = '';
  elements.sceneTransition.hidden = false;
  elements.sceneTransition.classList.remove('is-visible', 'is-leaving');
  elements.scenePanel.classList.add('is-busy');
  elements.sceneMain.classList.add('is-busy');
  elements.choiceList.classList.add('is-busy');
  void elements.sceneTransition.offsetWidth;
  elements.sceneTransition.classList.add('is-visible');

  return delay(SCENE_TRANSITION_FADE_MS + SCENE_TRANSITION_HOLD_MS);
}

function finishSceneTransition() {
  elements.sceneTransition.classList.add('is-leaving');
  elements.sceneTransition.classList.remove('is-visible');
  elements.scenePanel.classList.remove('is-busy');
  elements.sceneMain.classList.remove('is-busy');
  elements.choiceList.classList.remove('is-busy');
  return delay(SCENE_TRANSITION_FADE_MS).then(() => {
    elements.sceneTransition.classList.remove('is-leaving');
    elements.sceneTransition.hidden = true;
    elements.sceneTransitionText.textContent = '';
  });
}

function delay(ms) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function applyDynamicChoice(choice) {
  if (!canChoose(choice)) {
    recordFailedAction(choice, getChoiceDisabledReason(choice) || '目前條件不足，無法選擇這個行動。');
    return;
  }

  const actions = {
    openDialogue: () => openDialogue(choice),
    moveToLocation: () => moveToLocation(choice),
    openFacility: () => openFacility(choice),
    openTrade: () => openTrade(choice),
    openKnowledge: () => openKnowledge(choice),
    openKnowledgePage: () => openKnowledgePage(choice),
    openSelaIntel: () => openSelaIntelModal(choice.enemyId),
    startQuestEvent: () => startQuestEvent(choice),
    startEventReview: () => startEventReview(choice),
    advanceEventPage: () => advanceEventPage(choice),
    chooseEventBranch: () => chooseEventBranch(choice),
    finishEvent: () => finishEvent(choice),
    confirmProtagonistName: () => confirmProtagonistName(choice),
    adjustTradeItem: () => adjustTradeItem(choice),
    finalizeTrade: () => finalizeTrade(choice),
    runDialogueCommand: () => runDialogueCommand(choice),
    runInteractionAction: () => runInteractionAction(choice),
    openDinnerActivity: () => openDinnerActivity(choice),
    adjustDinnerIngredient: () => adjustDinnerIngredient(choice),
    confirmDinnerIngredients: () => confirmDinnerIngredients(choice),
    cancelDinnerIngredients: () => cancelDinnerIngredients(choice),
    openAidaSkillTrainingMenu: () => openAidaSkillTrainingMenu(choice),
    openLocationInquiry: () => openLocationInquiry(choice),
    askVillagerLocation: () => askVillagerLocation(choice),
    blackCatDistract: () => blackCatDistract(choice),
    blackCatFindShelter: () => blackCatFindShelter(choice),
    blackCatCarryItems: () => blackCatCarryItems(choice),
    participateWeavingWork: () => participateWeavingWork(choice),
    participateFieldWork: () => participateFieldWork(choice),
    participateNoonRest: () => participateNoonRest(choice),
    startAidaSkillTraining: () => startAidaSkillTraining(choice),
    returnToScene: () => returnToScene(choice),
    withdrawFacility: () => withdrawFacility(choice.facilityId),
    withdrawFacilityItem: () => withdrawFacilityItem(choice.facilityId, choice.itemId, choice.returnSceneId),
    gatherRandomFacility: () => gatherRandomFacility(choice.facilityId, choice.returnSceneId),
    collectInfiniteSource: () => collectInfiniteSource(choice.facilityId, choice.returnSceneId),
    craftRecipe: () => craftRecipe(choice.facilityId, choice.recipeId, choice.returnSceneId),
    openPortableCraftMenu: () => openPortableCraftMenu(choice.returnSceneId),
    openStorage: () => openStorage(choice.facilityId, choice.returnSceneId),
    adjustContainerDraft: () => adjustContainerDraft(choice),
    confirmContainerDraft: () => confirmContainerDraft(choice),
    cancelContainerDraft: () => cancelContainerDraft(choice.facilityId, choice.returnSceneId, choice.storageMode),
    adjustDroppedItemsDraft: () => adjustDroppedItemsDraft(choice),
    confirmDroppedItemsDraft: () => confirmDroppedItemsDraft(choice),
    cancelDroppedItemsDraft: () => cancelDroppedItemsDraft(choice.returnSceneId),
    adjustForageLootDraft: () => adjustForageLootDraft(choice),
    confirmForageLootDraft: () => confirmForageLootDraft(choice),
    cancelForageLootDraft: () => cancelForageLootDraft(choice),
    useItemMenu: () => openUseItemMenu(choice.returnSceneId),
    useItem: () => useItem(choice.itemId, choice.returnSceneId),
    openDiscardMenu: () => openDiscardMenu(choice.returnSceneId),
    openGiftMenu: () => openGiftMenu(choice.villagerId, choice.returnSceneId),
    giveGift: () => giveGift(choice.villagerId, choice.itemId, choice.returnSceneId),
    openWaitMenu: () => openWaitMenu(choice.returnSceneId),
    wait: () => wait(choice.seconds || 1800, choice.returnSceneId),
    openSleepMenu: () => openSleepMenu(choice.returnSceneId, choice.facilityId || 'protagonist_bed'),
    sleep: () => sleep(choice.seconds || 0, choice.returnSceneId, choice.facilityId || 'protagonist_bed'),
    sleepUntilTimeBlock: () => sleepUntilTimeBlock(choice.timeBlock, choice.returnSceneId, choice.facilityId || 'protagonist_bed'),
    lizardWell: () => useLizardWell(choice.facilityId),
    explorationAdvance: () => advanceExploration(choice.returnSceneId),
    explorationAdvanceSlow: () => advanceExplorationSlow(choice.returnSceneId),
    explorationRetreat: () => retreatExploration(choice.returnSceneId),
    explorationRetreatSlow: () => retreatExplorationSlow(choice.returnSceneId),
    explorationReturnToVillage: () => returnToVillageFromExploration(),
    explorationForage: () => forageExploration(choice.returnSceneId),
    explorationShout: () => shoutAttractEnemy(choice.returnSceneId),
    enterAbandonedCabin: () => enterAbandonedCabin(),
    leaveAbandonedCabin: () => leaveAbandonedCabin(),
    enterHiddenCave: () => enterHiddenCave(),
    leaveHiddenCave: () => leaveHiddenCave(),
    encounterTool: () => resolveEncounterWithTool(choice.enemyId, choice.itemId, choice.returnSceneId),
    encounterMelee: () => resolveEncounterMelee(choice.enemyId, choice.weaponId, choice.returnSceneId),
    encounterRanged: () => resolveEncounterRanged(choice.enemyId, choice.weaponId, choice.ammoItemId, choice.returnSceneId),
    encounterBareHands: () => resolveEncounterMelee(choice.enemyId, null, choice.returnSceneId),
    encounterEscape: () => escapeEncounter(choice.enemyId, choice.returnSceneId),
    confirmEncounterReport: () => confirmEncounterReport()
  };

  const handler = actions[choice.dynamicAction];
  if (handler) {
    handler();
  }
}

function openDialogue(choice) {
  if (!canInteractWithVillager(choice.villagerId)) {
    elements.saveNote.textContent = '宿舍裡的人多半已經歇下，現在不方便去打擾。';
    render();
    return;
  }

  gameState.lastInteraction = null;
  clearActionResultDisplay();
  gameState.currentSceneId = `dialogue:${choice.villagerId}:${choice.returnSceneId}`;
  saveGame();
  render();
}

function moveToLocation(choice) {
  clearActionResultDisplay();
  const targetSceneId = choice.nextSceneId || choice.targetSceneId;
  if (!targetSceneId) {
    recordFailedAction(choice, '找不到要前往的地點。');
    return;
  }

  if (choice.eventBeforeMove && tryStartMoveEvent(choice)) {
    saveGame();
    render();
    return;
  }

  runTrackedAction(choice, () => {
    advanceTime(choice.timeCostSeconds || 0);
    moveToScene(targetSceneId);
  });
  tryStartMoveArrivalEvent(choice, targetSceneId);
  saveGame();
  render();
}

function tryStartMoveEvent(choice) {
  const eventId = typeof choice.eventBeforeMove === 'string'
    ? choice.eventBeforeMove
    : choice.eventBeforeMove?.eventId;
  const event = getEventById(eventId);
  if (!event || shouldSkipCompletedEvent(event) || !doesEventMeetConditions(event.conditions || {})) {
    return false;
  }

  const context = {
    type: 'moveToLocation',
    from: choice.fromSceneId || gameState.currentSceneId || FALLBACK_SCENE_ID,
    to: choice.nextSceneId || choice.targetSceneId || '',
    returnSceneId: choice.fromSceneId || gameState.currentSceneId || FALLBACK_SCENE_ID,
    triggerSourceId: choice.id || `${choice.fromSceneId}_${choice.nextSceneId}`,
    triggerContextKey: `moveToLocation:${choice.fromSceneId || gameState.currentSceneId}:${choice.nextSceneId || choice.targetSceneId || ''}`
  };

  if ((event.triggers || []).length
    && !(event.triggers || []).some((trigger) => doesTriggerMatchContext(trigger, context))) {
    return false;
  }

  return startEvent(event.id, {
    returnSceneId: context.returnSceneId,
    triggerType: context.type,
    triggerSourceId: context.triggerSourceId,
    triggerContextKey: context.triggerContextKey
  });
}

function tryStartMoveArrivalEvent(choice, targetSceneId) {
  if (!targetSceneId || gameState.events?.active || isEventSceneId(gameState.currentSceneId)) {
    return false;
  }

  return tryStartTriggeredEvent({
    type: 'moveArriveLocation',
    from: choice.fromSceneId || '',
    to: targetSceneId,
    sceneId: targetSceneId,
    returnSceneId: targetSceneId,
    triggerSourceId: choice.id || `${choice.fromSceneId || ''}_${targetSceneId}`,
    triggerContextKey: `moveArriveLocation:${choice.fromSceneId || ''}:${targetSceneId}`
  });
}

function moveToScene(sceneId) {
  if (isExplorationSceneId(sceneId)) {
    ensureExplorationSession(sceneId);
  }
  gameState.currentSceneId = sceneId;
}

function getEventById(eventId) {
  return events.find((entry) => entry.id === eventId) || getGeneratedQuestEventById(eventId);
}

function getGeneratedQuestEventById(eventId) {
  const questEventTypes = [
    { prefix: 'quest_offer_', type: 'offer' },
    { prefix: 'quest_accept_', type: 'accept' },
    { prefix: 'quest_decline_', type: 'decline' },
    { prefix: 'quest_complete_', type: 'complete' }
  ];
  const matchedType = questEventTypes.find((entry) => eventId?.startsWith(entry.prefix));
  if (!matchedType) {
    return null;
  }

  const questId = eventId.slice(matchedType.prefix.length);
  const quest = quests.find((entry) => entry.id === questId);
  if (!quest) {
    return null;
  }

  return createGeneratedQuestEvent(matchedType.type, quest);
}

function createGeneratedQuestEvent(type, quest) {
  const villager = villagers.find((entry) => entry.id === quest.giver);
  const villagerName = villager?.name || '對方';
  const title = quest.title || '委託';
  const base = {
    id: `quest_${type}_${quest.id}`,
    title,
    repeatable: true,
    generated: true
  };

  if (type === 'offer') {
    return {
      ...base,
      pages: [
        {
          id: 'offer',
          text: createQuestOfferDialogue(villager, quest),
          choices: [
            { id: 'accept', label: '答應', targetEventId: `quest_accept_${quest.id}` },
            { id: 'decline', label: '拒絕', targetEventId: `quest_decline_${quest.id}` }
          ]
        }
      ]
    };
  }

  if (type === 'accept') {
    return {
      ...base,
      pages: createQuestEventPages(quest, 'accept', [
        `${villagerName}把你的回應聽完，沒有急著把事情推到你手上。`,
        `${villagerName}確認你真的願意接下後，才把接下來該做的事說清楚。`
      ], {
        questAccept: { questId: quest.id, villagerId: quest.giver }
      }, `已接取委託：${title}。`)
    };
  }

  if (type === 'decline') {
    return {
      ...base,
      pages: [
        {
          id: 'decline',
          text: `${villagerName}沒有多說什麼，只讓你準備好了再來。`
        }
      ]
    };
  }

  return {
    ...base,
    pages: createQuestEventPages(quest, 'complete', [
      createQuestSubmitDialogue(villager, quest),
      `${villagerName}把事情收尾後，才把該給你的東西交到你手上。`
    ], {
      questComplete: { questId: quest.id, villagerId: quest.giver }
    })
  };
}

function createQuestEventPages(quest, type, fallbackTexts = [], effects = {}, resultMessage = '') {
  const configuredTexts = Array.isArray(quest?.[`${type}Pages`])
    ? quest[`${type}Pages`].map((entry) => String(entry || '').trim()).filter(Boolean)
    : [];
  const texts = configuredTexts.length >= 2 ? configuredTexts : fallbackTexts.filter(Boolean);
  const pageTexts = texts.length >= 2 ? texts : [...texts, ...fallbackTexts].filter(Boolean).slice(0, 2);
  const finalTexts = pageTexts.length >= 2 ? pageTexts : ['對方把事情重新說清楚。', '你確認自己已經聽明白了。'];
  const lastIndex = finalTexts.length - 1;
  return finalTexts.map((text, index) => ({
    id: `${type}_${index + 1}`,
    text,
    ...(index === lastIndex ? { effects, ...(resultMessage ? { resultMessage } : {}) } : {})
  }));
}

function getEventPage(eventId, pageId) {
  const event = getEventById(eventId);
  return event?.pages?.find((page) => page.id === pageId) || null;
}

function getEventStartPageId(event) {
  return event?.pages?.[0]?.id || '';
}

function getNextEventPageId(event, pageId) {
  const pages = event?.pages || [];
  const index = pages.findIndex((page) => page.id === pageId);
  if (index < 0) {
    return '';
  }
  return pages[index + 1]?.id || '';
}

function shouldSkipCompletedEvent(event) {
  return !event?.repeatable && gameState.events.completedEventIds.includes(event.id);
}

function doesEventMeetConditions(conditions = {}) {
  const flags = gameState.player.flags || [];
  const dailyFlags = gameState.player.dailyFlags || [];
  const timeBlock = getTimeBlock(gameState.time.secondsOfDay);
  if (Array.isArray(conditions.timeBlocks) && !conditions.timeBlocks.includes(timeBlock)) {
    return false;
  }
  if ((conditions.requiredFlags || []).some((flag) => !flags.includes(flag))) {
    return false;
  }
  if ((conditions.blockedFlags || []).some((flag) => flags.includes(flag))) {
    return false;
  }
  if ((conditions.requiredDailyFlags || []).some((flag) => !dailyFlags.includes(flag))) {
    return false;
  }
  if ((conditions.blockedDailyFlags || []).some((flag) => dailyFlags.includes(flag))) {
    return false;
  }

  if (typeof conditions.playerLifeAtLeast === 'number' && gameState.player.life < conditions.playerLifeAtLeast) {
    return false;
  }
  if (typeof conditions.playerLifeAtMost === 'number' && gameState.player.life > conditions.playerLifeAtMost) {
    return false;
  }
  if (typeof conditions.playerStaminaAtLeast === 'number' && gameState.player.stamina < conditions.playerStaminaAtLeast) {
    return false;
  }
  if (typeof conditions.playerStaminaAtMost === 'number' && gameState.player.stamina > conditions.playerStaminaAtMost) {
    return false;
  }
  if (typeof conditions.playerStaminaRatioBelow === 'number') {
    const maxStamina = Math.max(1, Number(gameState.player.maxStamina || 0));
    if ((Number(gameState.player.stamina || 0) / maxStamina) >= conditions.playerStaminaRatioBelow) {
      return false;
    }
  }
  if ((conditions.presentVillagerIds || []).some((villagerId) => !isVillagerPresentAtCurrentScene(villagerId))) {
    return false;
  }

  for (const [villagerId, minAffection] of Object.entries(conditions.villagerAffectionMins || {})) {
    if (Number(gameState.villagers?.[villagerId]?.affection || 0) < Number(minAffection || 0)) {
      return false;
    }
  }

  for (const [facilityId, minLevel] of Object.entries(conditions.facilityLevelMins || {})) {
    if (Number(gameState.facilities?.[facilityId]?.level || 0) < Number(minLevel || 0)) {
      return false;
    }
  }

  if ((conditions.activeQuestIds || []).some((questId) => !isQuestActive(questId))) {
    return false;
  }
  if ((conditions.completedQuestIds || []).some((questId) => !isQuestCompleted(questId))) {
    return false;
  }

  return true;
}

function getCurrentEventTriggerContext() {
  const sceneId = gameState.currentSceneId;
  if (locations.some((location) => location.id === sceneId) || scenes.some((scene) => scene.id === sceneId)) {
    return {
      type: 'sceneEnter',
      sceneId,
      returnSceneId: sceneId,
      triggerSourceId: sceneId,
      triggerContextKey: `sceneEnter:${sceneId}`
    };
  }

  if (sceneId.startsWith('dialogue:')) {
    const [, villagerId, returnSceneId] = sceneId.split(':');
    return createVillagerEventTriggerContext('villagerInteract', villagerId, returnSceneId || FALLBACK_SCENE_ID);
  }

  return null;
}

function createVillagerEventTriggerContext(type, villagerId, returnSceneId = FALLBACK_SCENE_ID, eventReturnSceneId = null) {
  const sceneId = returnSceneId || FALLBACK_SCENE_ID;
  return {
    type,
    villagerId,
    sceneId,
    returnSceneId: eventReturnSceneId || `dialogue:${villagerId}:${sceneId}`,
    triggerSourceId: villagerId,
    triggerContextKey: `${type}:${villagerId}:${sceneId}`
  };
}

function doesTriggerMatchContext(trigger, context) {
  if (!trigger || !context || trigger.type !== context.type) {
    return false;
  }

  if (trigger.type === 'sceneEnter') {
    return trigger.sceneId === context.sceneId;
  }

  if (['villagerInteract', 'villagerInteractionLeave', 'knowledgeOpen'].includes(trigger.type)) {
    if (trigger.villagerId !== context.villagerId) {
      return false;
    }
    if (trigger.sceneId && trigger.sceneId !== context.sceneId) {
      return false;
    }
    return true;
  }

  if (trigger.type === 'facilityInteract') {
    if (trigger.facilityId !== context.facilityId) {
      return false;
    }
    if (trigger.sceneId && trigger.sceneId !== context.sceneId) {
      return false;
    }
    return true;
  }

  if (trigger.type === 'moveToLocation') {
    if (trigger.from && trigger.from !== context.from) {
      return false;
    }
    if (trigger.to && trigger.to !== context.to) {
      return false;
    }
    return true;
  }

  if (trigger.type === 'moveArriveLocation') {
    if (trigger.from && trigger.from !== context.from) {
      return false;
    }
    if (trigger.to && trigger.to !== context.to) {
      return false;
    }
    if (trigger.sceneId && trigger.sceneId !== context.sceneId) {
      return false;
    }
    return true;
  }

  return false;
}

function getFacilityInteractEventCandidates(facility, returnSceneId = FALLBACK_SCENE_ID) {
  const eventPool = facility?.dailyMessages?.eventPool;
  if (!Array.isArray(eventPool) || !eventPool.length) {
    return [];
  }

  const context = {
    type: 'facilityInteract',
    facilityId: facility.id,
    sceneId: returnSceneId || FALLBACK_SCENE_ID,
    returnSceneId: getFacilityEntrySceneId(facility, facility.id, returnSceneId),
    triggerSourceId: facility.id,
    triggerContextKey: `facilityInteract:${facility.id}:${returnSceneId || FALLBACK_SCENE_ID}`
  };

  return eventPool
    .map((eventId) => getEventById(eventId))
    .filter((event) =>
      event
      && !shouldSkipCompletedEvent(event)
      && doesEventMeetConditions(event.conditions || {})
      && (event.triggers || []).some((trigger) => doesTriggerMatchContext(trigger, context))
    )
    .map((event) => ({ event, context }));
}

function tryStartFacilityInteractEvent(facility, returnSceneId = FALLBACK_SCENE_ID) {
  const candidates = getFacilityInteractEventCandidates(facility, returnSceneId);
  if (!candidates.length) {
    return false;
  }

  const selected = pickRandom(candidates);
  if (!selected?.event) {
    return false;
  }

  startEvent(selected.event.id, {
    returnSceneId: selected.context.returnSceneId,
    triggerType: selected.context.type,
    triggerSourceId: selected.context.triggerSourceId,
    triggerContextKey: selected.context.triggerContextKey
  });
  return true;
}

function startEventReview(choice) {
  if (!choice.eventId) {
    return;
  }
  const returnSceneId = choice.returnSceneId || FALLBACK_SCENE_ID;
  clearActionResultDisplay();
  startEvent(choice.eventId, {
    returnSceneId: `facility:${choice.facilityId}:${returnSceneId}`,
    triggerType: 'eventReview',
    triggerSourceId: choice.facilityId || '',
    triggerContextKey: `eventReview:${choice.eventId}`,
    reviewMode: true
  });
  saveGame();
  render();
}

function tryStartTriggeredEventForCurrentScene() {
  if (gameState.events?.active || isEventSceneId(gameState.currentSceneId)) {
    return false;
  }

  const context = getCurrentEventTriggerContext();
  if (!context) {
    return false;
  }

  return tryStartTriggeredEvent(context, { save: true });
}

function tryStartTriggeredEvent(context, options = {}) {
  if (!context || gameState.events?.active || isEventSceneId(gameState.currentSceneId)) {
    return false;
  }

  if (tryStartBlackCatFirstEncounterEvent(context)) {
    if (options.save) saveGame();
    return true;
  }

  const candidates = events.filter((candidate) =>
    !shouldSkipCompletedEvent(candidate)
    && doesEventMeetConditions(candidate.conditions || {})
    && (candidate.triggers || []).some((trigger) => doesTriggerMatchContext(trigger, context))
  );

  const event = selectTriggeredEvent(candidates);
  if (!event) {
    return false;
  }

  startEvent(event.id, {
    returnSceneId: context.returnSceneId,
    triggerType: context.type,
    triggerSourceId: context.triggerSourceId,
    triggerContextKey: context.triggerContextKey
  });
  if (options.save) saveGame();
  return true;
}

function selectTriggeredEvent(candidates = []) {
  if (!candidates.length) {
    return null;
  }

  const first = candidates[0];
  const randomGroup = first.randomTriggerGroup || first.triggerGroup || '';
  if (!randomGroup) {
    return first;
  }

  const grouped = candidates.filter((event) =>
    (event.randomTriggerGroup || event.triggerGroup || '') === randomGroup
  );
  return pickRandom(grouped.length ? grouped : candidates);
}

function tryStartBlackCatFirstEncounterEvent(context) {
  if (context.type !== 'sceneEnter' || !isExplorationSceneId(context.sceneId)) {
    return false;
  }
  if ((gameState.player.flags || []).includes(BLACK_CAT_FIRST_ENCOUNTER_FLAG)) {
    return false;
  }
  if (!isBlackCatPresentAt(context.sceneId)) {
    return false;
  }
  if (!getEventById(BLACK_CAT_FIRST_ENCOUNTER_EVENT_ID)) {
    return false;
  }
  startEvent(BLACK_CAT_FIRST_ENCOUNTER_EVENT_ID, {
    returnSceneId: context.returnSceneId,
    triggerType: 'blackCatAppears',
    triggerSourceId: BLACK_CAT_NPC_ID,
    triggerContextKey: `blackCatAppears:${getExplorationPositionKey(gameState.exploration)}`
  });
  return true;
}

function hasEventPagePayload(page = {}) {
  return Boolean(
    (page.timeCostSeconds || 0) > 0
    || Object.keys(page.effects || {}).length
    || Object.keys(page.rewardItems || {}).length
    || (page.randomRewardItems || []).length
    || (page.rewardItemsByFacilityLevel || []).length
    || (page.rewardRecipeIds || []).length
    || page.resultMessage
  );
}

function applyEventPageEntry(event, page, activeState) {
  if (!event || !page || !activeState || activeState.appliedPageIds.includes(page.id)) {
    return;
  }

  activeState.appliedPageIds.push(page.id);
  if (activeState.reviewMode) {
    clearActionResultDisplay();
    return;
  }

  if (!hasEventPagePayload(page)) {
    clearActionResultDisplay();
    return;
  }

  const syntheticChoice = {
    id: `event_page_${event.id}_${page.id}`,
    label: event.title || '事件',
    timeCostSeconds: Number(page.timeCostSeconds || 0),
    effects: createResolvedEventPageEffects(page, activeState)
  };
  const rewardSceneId = activeState.returnSceneId || FALLBACK_SCENE_ID;
  let effectResult = null;
  let droppedItems = [];
  runTrackedAction(syntheticChoice, () => {
    effectResult = applyEffects(syntheticChoice.effects || {});
    droppedItems = applyCarryAwareItemRewards(createEventRewardItems(page), rewardSceneId);
    learnRecipes(page.rewardRecipeIds || []);
    advanceTime(page.timeCostSeconds || 0);
  }, {
    message: [page.resultMessage || '', createDroppedItemsNotice(droppedItems)].filter(Boolean).join(' '),
    messageLabel: droppedItems.length ? '狀態' : '',
    showMessageWhenPresent: droppedItems.length || Boolean(page.resultMessage)
  });
  const effectMessage = createEffectResultMessage(effectResult);
  if (effectMessage && gameState.lastActionResult) {
    gameState.lastActionResult.message = [effectMessage, gameState.lastActionResult.message || ''].filter(Boolean).join(' ');
    gameState.lastActionResult.showMessageWhenPresent = true;
  }
}

function createResolvedEventPageEffects(page = {}, activeState = null) {
  const effects = structuredClone(page.effects || {});
  const contributionPerDinnerScore = Number(effects.contributionPerDinnerScore || 0);
  if (contributionPerDinnerScore) {
    const score = Number(activeState?.dinnerContext?.score || 0);
    effects.player = {
      ...(effects.player || {}),
      contribution: Number(effects.player?.contribution || 0) + Math.max(0, score) * contributionPerDinnerScore
    };
    delete effects.contributionPerDinnerScore;
  }
  return effects;
}

function createEventRewardItems(page = {}) {
  const rewards = { ...(page.rewardItems || {}) };
  const randomReward = pickRandom(page.randomRewardItems || []);
  if (randomReward?.itemId) {
    rewards[randomReward.itemId] = Number(rewards[randomReward.itemId] || 0) + Number(randomReward.count || 1);
  }
  for (const entry of page.rewardItemsByFacilityLevel || []) {
    const facilityId = entry?.facilityId;
    const itemId = entry?.itemId;
    if (!facilityId || !itemId) {
      continue;
    }
    const level = Number(gameState.facilities?.[facilityId]?.level || 0);
    const multiplier = Number(entry.multiplier ?? 1);
    const count = Math.max(0, Math.floor(level * multiplier));
    if (count > 0) {
      rewards[itemId] = Number(rewards[itemId] || 0) + count;
    }
  }
  return rewards;
}

function startEvent(eventId, options = {}) {
  const event = getEventById(eventId);
  const pageId = getEventStartPageId(event);
  if (!event || !pageId) {
    return false;
  }

  gameState.events = normalizeEventState(gameState.events || {});
  gameState.events.active = {
    eventId,
    pageId,
    returnSceneId: options.returnSceneId || FALLBACK_SCENE_ID,
    triggerType: options.triggerType || '',
    triggerSourceId: options.triggerSourceId || '',
    triggerContextKey: options.triggerContextKey || '',
    reviewMode: Boolean(options.reviewMode),
    dinnerContext: normalizeDinnerContext(options.dinnerContext),
    appliedPageIds: []
  };
  gameState.currentSceneId = `event:${eventId}:${pageId}`;
  applyEventPageEntry(event, getEventPage(eventId, pageId), gameState.events.active);
  return true;
}

function markEventCompleted(eventId) {
  const event = getEventById(eventId);
  if (!event || event.repeatable) {
    return;
  }
  if (!gameState.events.completedEventIds.includes(eventId)) {
    gameState.events.completedEventIds.push(eventId);
  }
}

function openEventPage(eventId, pageId) {
  const event = getEventById(eventId);
  const page = getEventPage(eventId, pageId);
  if (!event || !page || !gameState.events.active) {
    return false;
  }

  gameState.events.active.eventId = eventId;
  gameState.events.active.pageId = pageId;
  gameState.currentSceneId = `event:${eventId}:${pageId}`;
  applyEventPageEntry(event, page, gameState.events.active);
  return true;
}

function finishActiveEvent(returnSceneId = '') {
  const active = gameState.events?.active;
  if (!active) {
    gameState.currentSceneId = returnSceneId || FALLBACK_SCENE_ID;
    return;
  }

  markEventCompleted(active.eventId);
  const nextSceneId = returnSceneId || active.returnSceneId || FALLBACK_SCENE_ID;
  gameState.events.active = null;
  if (active.eventId === 'exploration_defeat_return') {
    const caregiverEventId = getExplorationDefeatCaregiverEventId();
    if (caregiverEventId && startEvent(caregiverEventId, {
      returnSceneId: nextSceneId,
      triggerType: 'explorationDefeatCare',
      triggerSourceId: gameState.events.lastExplorationDefeatCaregiverId || '',
      triggerContextKey: `explorationDefeatCare:${gameState.events.lastExplorationDefeatCaregiverId || 'unknown'}`
    })) {
      return;
    }
  }
  gameState.currentSceneId = nextSceneId;
}

function getExplorationDefeatCaregiverEventId() {
  const caregiverId = gameState.events?.lastExplorationDefeatCaregiverId;
  const returnEvent = getEventById('exploration_defeat_return');
  const candidates = returnEvent?.pages
    ?.flatMap((page) => page?.effects?.explorationDefeat?.randomCaregiver?.candidates || []) || [];
  return candidates.find((entry) => entry.villagerId === caregiverId)?.eventId || '';
}

function advanceEventPage(choice) {
  const event = getEventById(choice.eventId);
  const targetPageId = choice.targetPageId || getNextEventPageId(event, choice.pageId);
  if (!event || !targetPageId) {
    finishActiveEvent(choice.returnSceneId);
    saveGame();
    render();
    return;
  }

  openEventPage(choice.eventId, targetPageId);
  saveGame();
  render();
}

function chooseEventBranch(choice) {
  const previousReturnSceneId = choice.returnSceneId || gameState.events?.active?.returnSceneId || FALLBACK_SCENE_ID;
  const previousTriggerContextKey = gameState.events?.active?.triggerContextKey || '';
  const previousDinnerContext = normalizeDinnerContext(gameState.events?.active?.dinnerContext);
  if (choice.eventId) {
    markEventCompleted(choice.eventId);
  }
  gameState.events.active = null;
  if (choice.targetSceneId) {
    runTrackedAction(choice, () => {
      applyEffects(choice.effects || {});
      advanceTime(choice.timeCostSeconds || 0);
      moveToScene(choice.targetSceneId);
    }, {
      message: choice.resultMessage || '',
      showMessageWhenPresent: Boolean(choice.resultMessage)
    });
    saveGame();
    render();
    return;
  }
  const targetEventId = resolveEventBranchTargetEventId(choice.targetEventId, previousDinnerContext);
  if (!startEvent(targetEventId, {
    returnSceneId: previousReturnSceneId,
    triggerContextKey: previousTriggerContextKey,
    dinnerContext: previousDinnerContext
  })) {
    if (Object.keys(choice.effects || {}).length || (choice.timeCostSeconds || 0) > 0 || choice.resultMessage) {
      runTrackedAction(choice, () => {
        applyEffects(choice.effects || {});
        advanceTime(choice.timeCostSeconds || 0);
      }, {
        message: choice.resultMessage || '',
        showMessageWhenPresent: Boolean(choice.resultMessage)
      });
    }
    gameState.currentSceneId = previousReturnSceneId;
    if (!choice.resultMessage) {
      clearActionResultDisplay();
    }
  }
  saveGame();
  render();
}

function resolveEventBranchTargetEventId(targetEventId, dinnerContext = null) {
  if (targetEventId === DINNER_SELECTED_MEAL_EVENT_TARGET) {
    return dinnerContext?.mealEventId || '';
  }
  return targetEventId || '';
}

function finishEvent(choice) {
  finishActiveEvent(choice.returnSceneId);
  saveGame();
  render();
}

function openFacility(choice) {
  gameState.lastInteraction = null;
  clearActionResultDisplay();
  const context = resolveFacilityContext(choice.facilityId, choice.returnSceneId);
  const facility = context.baseFacility;
  if (isExplorationSceneId(choice.returnSceneId) && gameState.exploration) {
    gameState.exploration.openFacilityInstanceId = choice.facilityId;
  }
  if (facility?.dailyMessages?.triggerType === 'facilityInteract'
    && tryStartFacilityInteractEvent(facility, choice.returnSceneId || FALLBACK_SCENE_ID)) {
    saveGame();
    render();
    return;
  }
  if (facility) {
    gameState.currentSceneId = getFacilityEntrySceneId(facility, choice.facilityId, choice.returnSceneId);
  } else {
    gameState.currentSceneId = `facility:${choice.facilityId}:${choice.returnSceneId}`;
  }
  saveGame();
  render();
}

function openTrade(choice) {
  gameState.lastInteraction = null;
  clearActionResultDisplay();
  gameState.currentSceneId = `trade:${choice.villagerId}:${choice.returnSceneId}`;
  ensureTradeDraft(choice.villagerId, choice.returnSceneId, true);
  saveGame();
  render();
}

function startQuestEvent(choice) {
  const quest = quests.find((entry) => entry.id === choice.questId);
  const villagerId = choice.villagerId || quest?.giver || '';
  const returnSceneId = choice.returnSceneId || FALLBACK_SCENE_ID;
  if (!quest || !villagerId) {
    recordFailedAction({ id: choice.id || 'quest_event', label: choice.label || '委託' }, '委託資料不存在。');
    return;
  }

  clearActionResultDisplay();
  if (!startEvent(choice.eventId, {
    returnSceneId: `dialogue:${villagerId}:${returnSceneId}`,
    triggerType: choice.questEventType || 'quest',
    triggerSourceId: quest.id,
    triggerContextKey: `quest:${choice.questEventType || 'event'}:${quest.id}:${returnSceneId}`
  })) {
    recordFailedAction({ id: choice.id || 'quest_event', label: choice.label || '委託' }, '委託事件不存在。');
    return;
  }
  saveGame();
  render();
}

function runDialogueCommand(choice) {
  let interactionResult = null;
  runTrackedAction(choice, () => {
    applyEffects(choice.effects || {});
    advanceTime(choice.timeCostSeconds || 0);
    interactionResult = createInteractionResult(choice.villagerId, choice.commandId);
    gameState.lastInteraction = interactionResult;
  }, { message: '' });
  saveGame();
  render();
}

function runInteractionAction(choice) {
  runTrackedAction(choice, () => {
    applyEffects(choice.effects || {});
    advanceTime(choice.timeCostSeconds || 0);
    gameState.lastInteraction = {
      villagerId: choice.villagerId,
      commandId: choice.commandId,
      text: choice.resultText || `${choice.label}完成。`
    };
  }, { message: '' });
  saveGame();
  render();
}

function openLocationInquiry(choice) {
  clearActionResultDisplay();
  const returnSceneId = choice.returnSceneId || getVillagerLocationId(villagers.find((entry) => entry.id === choice.villagerId)) || FALLBACK_SCENE_ID;
  gameState.currentSceneId = `locationInquiry:${choice.villagerId}:${returnSceneId}`;
  saveGame();
  render();
}

function askVillagerLocation(choice) {
  const asker = villagers.find((entry) => entry.id === choice.villagerId);
  const target = villagers.find((entry) => entry.id === choice.targetVillagerId);
  if (!asker || !target || !isCoreVillager(asker) || !isCoreVillager(target)) {
    recordFailedAction(choice, '找不到能詢問的位置。');
    return;
  }
  const returnSceneId = choice.returnSceneId || getVillagerLocationId(asker) || FALLBACK_SCENE_ID;
  if (getLocationInquiryTargets(asker, returnSceneId).every((entry) => entry.id !== target.id)) {
    recordFailedAction(choice, '這個人就在附近，沒有必要特地詢問。');
    return;
  }

  clearActionResultDisplay();
  gameState.lastInteraction = {
    villagerId: asker.id,
    commandId: 'ask_other_location',
    text: createLocationInquiryResponse(asker, target)
  };
  gameState.currentSceneId = `dialogue:${asker.id}:${returnSceneId}`;
  saveGame();
  render();
}

function isBlackCatActionAvailable(choice) {
  return choice?.villagerId === BLACK_CAT_NPC_ID
    && isBlackCatPresentAt(choice.returnSceneId || EXPLORATION_SCENE_ID);
}

function blackCatDistract(choice) {
  if (!isBlackCatActionAvailable(choice)) {
    recordFailedAction(choice, '黑貓已經不在附近。');
    return;
  }
  const sceneDescription = '黑貓沒有叫，只是輕輕鑽進灌木。遠處有枝葉被撥動，原本貼近背脊的視線像被牠帶偏了。\n\n你能感覺到原本逼近的危機降低了一些。';
  runTrackedAction(choice, () => {
    advanceTime(choice.timeCostSeconds || 60);
    gameState.exploration.dangerRate = clampNumber(Number(gameState.exploration.dangerRate || 0) - 30, 0, 100);
    gameState.lastInteraction = {
      villagerId: BLACK_CAT_NPC_ID,
      commandId: choice.commandId,
      text: sceneDescription
    };
    dismissBlackCatFromCurrentPosition();
    gameState.currentSceneId = choice.returnSceneId || EXPLORATION_SCENE_ID;
  }, {
    message: '黑貓引開了附近的注意，你感知到的危機降低了一些。',
    messageLabel: '狀態',
    showMessageWhenPresent: true
  });
  markBlackCatLeftSceneDescription(sceneDescription);
  saveGame('黑貓引開了附近的注意。');
  render();
}

function blackCatFindShelter(choice) {
  if (!isBlackCatActionAvailable(choice)) {
    recordFailedAction(choice, '黑貓已經不在附近。');
    return;
  }
  const sceneDescription = '黑貓回頭看了你一眼，帶你鑽進一處被藤根遮住的淺凹。你在那裡屏息待了許久，身體稍微恢復過來，林子的壓迫感卻沒有因此退開。';
  runTrackedAction(choice, () => {
    advanceTime(choice.timeCostSeconds || 1800);
    gameState.player.stamina = Math.min(gameState.player.maxStamina, Number(gameState.player.stamina || 0) + 2);
    gameState.lastInteraction = {
      villagerId: BLACK_CAT_NPC_ID,
      commandId: choice.commandId,
      text: sceneDescription
    };
    dismissBlackCatFromCurrentPosition();
    gameState.currentSceneId = choice.returnSceneId || EXPLORATION_SCENE_ID;
  }, {
    message: '黑貓替你找到臨時藏身處，你稍微恢復了一點。',
    messageLabel: '狀態',
    showMessageWhenPresent: true
  });
  markBlackCatLeftSceneDescription(sceneDescription);
  saveGame('黑貓帶你找到臨時藏身處。');
  render();
}

function blackCatCarryItems(choice) {
  if (!isBlackCatActionAvailable(choice)) {
    recordFailedAction(choice, '黑貓已經不在附近。');
    return;
  }
  clearActionResultDisplay();
  ensureLostAndFoundBoxState();
  const returnSceneId = choice.returnSceneId || EXPLORATION_SCENE_ID;
  const interfaceSceneId = `storage:${BLACK_CAT_STORAGE_MODE}:lost_and_found_box:${returnSceneId}`;
  const sourceSceneId = `dialogue:${BLACK_CAT_NPC_ID}:${returnSceneId}`;
  ensureContainerDraft('lost_and_found_box', returnSceneId, true, BLACK_CAT_STORAGE_MODE);
  startPendingActionFlow({
    id: 'blackCatCarryItems',
    type: 'draft',
    sourceSceneId,
    interfaceSceneId,
    returnSceneId,
    cancelSceneId: sourceSceneId,
    confirmAction: {
      timeCostSeconds: Number(choice.timeCostSeconds || 60) || 60,
      progressOnly: true,
      progressScope: 'choices',
      progressLabel: '黑貓正叼起東西...',
      hideCost: false
    },
    cancelAction: {
      targetSceneId: sourceSceneId
    },
    draftKey: containerDraft?.key || ''
  });
  gameState.lastInteraction = {
    villagerId: BLACK_CAT_NPC_ID,
    commandId: choice.commandId,
    text: '你還沒說完，黑貓就低頭碰了碰背包旁的東西。牠沒有答應，也沒有拒絕；但你忽然覺得，若有什麼被牠帶走，回到宿舍時也許該去那只收著失物的箱子看一眼。'
  };
  gameState.currentSceneId = interfaceSceneId;
  saveGame('黑貓等你整理需要牠帶走的東西。');
  render();
}

function dismissBlackCatFromCurrentPosition() {
  if (!gameState.exploration?.active) {
    return;
  }
  gameState.exploration.blackCatPositionKey = getExplorationPositionKey(gameState.exploration);
  gameState.exploration.blackCatPresent = false;
}

function ensureLostAndFoundBoxState() {
  if (!gameState.facilities.lost_and_found_box) {
    gameState.facilities.lost_and_found_box = {
      level: 0,
      capacityWeight: getContainerCapacity(getFacility('lost_and_found_box')),
      items: []
    };
  }
}

function returnToScene(choiceOrReturnSceneId) {
  const choice = typeof choiceOrReturnSceneId === 'string'
    ? { returnSceneId: choiceOrReturnSceneId }
    : choiceOrReturnSceneId || {};
  const returnSceneId = choice.returnSceneId || FALLBACK_SCENE_ID;
  const shouldCheckVillagerLeaveEvent = choice.villagerId
    && gameState.currentSceneId.startsWith(`dialogue:${choice.villagerId}:`);

  gameState.lastInteraction = null;
  clearActionResultDisplay();
  gameState.currentSceneId = returnSceneId;
  if (shouldCheckVillagerLeaveEvent
    && tryStartTriggeredEvent(
      createVillagerEventTriggerContext('villagerInteractionLeave', choice.villagerId, returnSceneId, returnSceneId),
      { save: true }
    )) {
    render();
    return;
  }
  saveGame();
  render();
}

function openUseItemMenu(returnSceneId) {
  clearActionResultDisplay();
  gameState.currentSceneId = `useItem:${returnSceneId || FALLBACK_SCENE_ID}`;
  saveGame();
  render();
}

function openDiscardMenu(returnSceneId) {
  clearActionResultDisplay();
  ensureDroppedItemsDraft(returnSceneId, true);
  gameState.currentSceneId = `storage:discarded_items:${returnSceneId || FALLBACK_SCENE_ID}`;
  saveGame();
  render();
}

function openPortableCraftMenu(returnSceneId) {
  clearActionResultDisplay();
  gameState.currentSceneId = `craftItem:${returnSceneId || FALLBACK_SCENE_ID}`;
  saveGame();
  render();
}

function openGiftMenu(villagerId, returnSceneId) {
  clearActionResultDisplay();
  gameState.currentSceneId = `gift:${villagerId}:${returnSceneId || FALLBACK_SCENE_ID}`;
  saveGame();
  render();
}

function openStorage(facilityId, returnSceneId) {
  clearActionResultDisplay();
  if (facilityId === 'discarded_items') {
    ensureDroppedItemsDraft(returnSceneId, true);
  } else {
    ensureContainerDraft(facilityId, returnSceneId, true);
  }
  gameState.currentSceneId = `storage:${facilityId}:${returnSceneId || FALLBACK_SCENE_ID}`;
  saveGame();
  render();
}

function openWaitMenu(returnSceneId) {
  waitDraftSeconds = 1800;
  clearActionResultDisplay();
  gameState.currentSceneId = `wait:${returnSceneId || FALLBACK_SCENE_ID}`;
  saveGame();
  render();
}

function openSleepMenu(returnSceneId, facilityId = 'protagonist_bed') {
  sleepDraftSeconds = SLEEP_MIN_SECONDS;
  clearActionResultDisplay();
  gameState.currentSceneId = `sleepMenu:${returnSceneId || FALLBACK_SCENE_ID}:${facilityId}`;
  saveGame();
  render();
}

function ensureExplorationSession(sceneId = EXPLORATION_SCENE_ID) {
  ensureExplorationSessionState(gameState, sceneId);
}

function useItem(itemId, returnSceneId) {
  const item = getItem(itemId);
  if (!item || getInventoryCount(gameState.player.inventory, itemId) <= 0) {
    recordFailedAction({ id: `use_${itemId}`, label: `使用${item?.name || itemId}` }, '背包裡沒有這個道具。');
    return;
  }
  const disabledReason = getItemUseDisabledReason(item, returnSceneId);
  if (disabledReason) {
    recordFailedAction({ id: `use_${itemId}`, label: `使用${item.name}` }, disabledReason);
    return;
  }

  runTrackedAction({
    id: `use_${item.id}`,
    label: `使用${item.name}`,
    timeCostSeconds: item.timeCostSeconds || 0
  }, () => {
    changeInventoryItem(gameState.player.inventory, itemId, -1);
    applyItemUseEffects(gameState, item, returnSceneId);
    advanceTime(item.timeCostSeconds || 0);
    gameState.currentSceneId = `useItem:${returnSceneId || FALLBACK_SCENE_ID}`;
  }, { message: `已使用${item.name}。` });
  saveGame(`已使用${item.name}。`);
  render();
}

function wait(seconds, returnSceneId = FALLBACK_SCENE_ID) {
  if (isExplorationSceneId(returnSceneId)) {
    if (tryStartExplorationEncounter(returnSceneId, false)) {
      return;
    }
  }

  runTrackedAction({
    id: 'wait',
    label: '等待',
    timeCostSeconds: seconds
  }, () => {
    applyWaitRestValue(seconds);
    advanceTime(seconds);
    if (isExplorationSceneId(returnSceneId)) {
      increaseExplorationDangerByTime(seconds);
    }
    gameState.currentSceneId = returnSceneId;
  }, { message: '時間往前推進。' });
  const gained = gameState.lastActionResult?.changes?.stamina?.delta || 0;
  if (gameState.lastActionResult) {
    gameState.lastActionResult.sceneDescription = createWaitSceneDescription(returnSceneId, seconds, gained);
  }
  saveGame(gained > 0 ? `稍作休息，體力恢復 ${gained}。` : '時間往前推進。');
  render();
}

function createActionSceneDescription(fallbackDescription) {
  const actionDescription = String(gameState.lastActionResult?.sceneDescription || '').trim();
  return actionResultVisible && actionDescription ? actionDescription : fallbackDescription;
}

function participateWeavingWork(choice) {
  const returnSceneId = choice.returnSceneId || DORMITORY_LOCATION_ID;
  const timeBlock = getTimeBlock(gameState.time.secondsOfDay);
  if (returnSceneId !== DORMITORY_LOCATION_ID || timeBlock !== '夜晚') {
    recordFailedAction(choice, '現在沒有紡織工作可以參與。');
    return;
  }

  const eventId = pickWeavingWorkEventId();
  gameState.events = normalizeEventState(gameState.events || {});
  applyWeavingEventRotation(eventId);
  if (!startEvent(eventId, {
    returnSceneId,
    triggerType: 'localAction',
    triggerSourceId: choice.id || 'dormitory_evening_weaving',
    triggerContextKey: `localAction:${returnSceneId}:dormitory_evening_weaving`
  })) {
    recordFailedAction(choice, '找不到可播放的紡織演出。');
    return;
  }
  saveGame('開始參與紡織工作。');
  render();
}

function pickWeavingWorkEventId() {
  gameState.events = normalizeEventState(gameState.events || {});
  const remainingIds = getRemainingWeavingEventIds();
  const availableIds = remainingIds.filter((eventId) => getEventById(eventId));
  return pickRandom(availableIds.length ? availableIds : remainingIds);
}

function getRemainingWeavingEventIds() {
  gameState.events = normalizeEventState(gameState.events || {});
  return getRotatingEventPoolState({
    storedRemaining: gameState.events.remainingWeavingWorkEventIds,
    fullPool: WEAVING_WORK_EVENT_IDS,
    lastEventId: gameState.events.lastWeavingWorkEventId || ''
  }).candidates;
}

function applyWeavingEventRotation(selectedEventId) {
  const basePool = getRotatingEventPoolState({
    storedRemaining: gameState.events.remainingWeavingWorkEventIds,
    fullPool: WEAVING_WORK_EVENT_IDS,
    lastEventId: gameState.events.lastWeavingWorkEventId || ''
  }).activePool;
  gameState.events.lastWeavingWorkEventId = selectedEventId;
  gameState.events.remainingWeavingWorkEventIds = basePool.filter((id) => id !== selectedEventId);
}

function participateFieldWork(choice) {
  const timeBlock = getTimeBlock(gameState.time.secondsOfDay);
  if (!['清晨', '上午'].includes(timeBlock)) {
    recordFailedAction(choice, '中午以後不適合再重新開一輪田地工作。');
    return;
  }
  if (getFacilityLevel('field') >= getFacilityMaxLevel('field')) {
    recordFailedAction(choice, '田地已經整理到目前能承受的極限。');
    return;
  }

  const eventId = pickFieldWorkEventId();
  gameState.events = normalizeEventState(gameState.events || {});
  applyFieldWorkEventRotation(eventId);
  const baseReturnSceneId = choice.returnSceneId || getVillagerLocationId(villagers.find((entry) => entry.id === 'tori')) || 'village_square_hub';
  if (!startEvent(eventId, {
    returnSceneId: `dialogue:tori:${baseReturnSceneId}`,
    triggerType: 'villagerAction',
    triggerSourceId: choice.id || 'tori_field_work',
    triggerContextKey: `villagerAction:tori:field_work:${gameState.time.day}:${gameState.time.secondsOfDay}`
  })) {
    recordFailedAction(choice, '找不到可播放的開墾演出。');
    return;
  }
  saveGame('開始協助托莉開墾田地。');
  render();
}

function pickFieldWorkEventId() {
  gameState.events = normalizeEventState(gameState.events || {});
  const remainingIds = getRemainingFieldWorkEventIds();
  const availableIds = remainingIds.filter((eventId) => getEventById(eventId));
  return pickRandom(availableIds.length ? availableIds : remainingIds);
}

function getRemainingFieldWorkEventIds() {
  gameState.events = normalizeEventState(gameState.events || {});
  return getRotatingEventPoolState({
    storedRemaining: gameState.events.remainingFieldWorkEventIds,
    fullPool: FIELD_WORK_EVENT_IDS,
    lastEventId: gameState.events.lastFieldWorkEventId || ''
  }).candidates;
}

function applyFieldWorkEventRotation(selectedEventId) {
  const basePool = getRotatingEventPoolState({
    storedRemaining: gameState.events.remainingFieldWorkEventIds,
    fullPool: FIELD_WORK_EVENT_IDS,
    lastEventId: gameState.events.lastFieldWorkEventId || ''
  }).activePool;
  gameState.events.lastFieldWorkEventId = selectedEventId;
  gameState.events.remainingFieldWorkEventIds = basePool.filter((id) => id !== selectedEventId);
}

function participateNoonRest(choice) {
  const returnSceneId = choice.returnSceneId || VILLAGE_SQUARE_LOCATION_ID;
  const timeBlock = getTimeBlock(gameState.time.secondsOfDay);
  if (returnSceneId !== VILLAGE_SQUARE_LOCATION_ID || timeBlock !== '中午') {
    recordFailedAction(choice, '現在還不是能在廣場一起歇下來的時候。');
    return;
  }
  if (hasPlayerDailyFlag(NOON_REST_DAILY_FLAG)) {
    recordFailedAction(choice, '今天已經和大家一起休息過了。');
    return;
  }

  const eventId = pickNoonRestEventId();
  gameState.events = normalizeEventState(gameState.events || {});
  applyNoonRestEventRotation(eventId);
  if (!startEvent(eventId, {
    returnSceneId,
    triggerType: 'localAction',
    triggerSourceId: choice.id || 'village_square_noon_rest',
    triggerContextKey: `localAction:${returnSceneId}:village_square_noon_rest:${gameState.time.day}`
  })) {
    recordFailedAction(choice, '找不到可播放的午間休息演出。');
    return;
  }
  saveGame('開始午間休息。');
  render();
}

function pickNoonRestEventId() {
  gameState.events = normalizeEventState(gameState.events || {});
  const remainingIds = getRemainingNoonRestEventIds();
  const availableIds = remainingIds.filter((eventId) => getEventById(eventId));
  return pickRandom(availableIds.length ? availableIds : remainingIds);
}

function getRemainingNoonRestEventIds() {
  gameState.events = normalizeEventState(gameState.events || {});
  return getRotatingEventPoolState({
    storedRemaining: gameState.events.remainingNoonRestEventIds,
    fullPool: NOON_REST_EVENT_IDS,
    lastEventId: gameState.events.lastNoonRestEventId || ''
  }).candidates;
}

function applyNoonRestEventRotation(selectedEventId) {
  const basePool = getRotatingEventPoolState({
    storedRemaining: gameState.events.remainingNoonRestEventIds,
    fullPool: NOON_REST_EVENT_IDS,
    lastEventId: gameState.events.lastNoonRestEventId || ''
  }).activePool;
  gameState.events.lastNoonRestEventId = selectedEventId;
  gameState.events.remainingNoonRestEventIds = basePool.filter((id) => id !== selectedEventId);
}

function createDinnerActivityChoices(villager, returnSceneId) {
  const activity = getDinnerActivity();
  if (!activity || villager?.id !== activity.hostVillagerId) {
    return [];
  }
  if (!getDinnerEntryTimeBlocks(activity).includes(getTimeBlock(gameState.time.secondsOfDay))) {
    return [];
  }
  const dailyFlag = activity.entry?.dailyLimitFlag || '';
  const doneToday = dailyFlag && hasPlayerDailyFlag(dailyFlag);
  return [{
    id: `${villager.id}_${activity.id}`,
    label: activity.entry?.label || activity.name || '協助準備晚餐',
    actionType: 'villageActivity',
    timeCostSeconds: 0,
    hideCost: true,
    dynamicAction: 'openDinnerActivity',
    villagerId: villager.id,
    activityId: activity.id,
    returnSceneId,
    disabledReason: doneToday ? '今天已經一起準備過晚餐了。' : ''
  }];
}

function getDinnerActivity() {
  return villageDinnerActivity?.id === DINNER_ACTIVITY_ID ? villageDinnerActivity : null;
}

function getDinnerActivityName(activityId = DINNER_ACTIVITY_ID) {
  const activity = activityId === DINNER_ACTIVITY_ID ? getDinnerActivity() : null;
  return activity?.name || '黃昏晚餐';
}

function getDinnerEntryTimeBlocks(activity = getDinnerActivity()) {
  return (activity?.entry?.timeBlocks || [])
    .map((timeBlock) => timeBlock === '黃昏' ? '傍晚' : timeBlock)
    .filter(Boolean);
}

function openDinnerActivity(choice) {
  const activity = getDinnerActivity();
  if (!activity || choice.activityId !== activity.id) {
    recordFailedAction(choice, '找不到晚餐活動資料。');
    return;
  }
  const timeBlock = getTimeBlock(gameState.time.secondsOfDay);
  if (!getDinnerEntryTimeBlocks(activity).includes(timeBlock)) {
    recordFailedAction(choice, '現在還不是準備晚餐的時間。');
    return;
  }
  const dailyFlag = activity.entry?.dailyLimitFlag || '';
  if (dailyFlag && hasPlayerDailyFlag(dailyFlag)) {
    recordFailedAction(choice, '今天已經一起準備過晚餐了。');
    return;
  }
  clearActionResultDisplay();
  ensureDinnerDraft(choice.returnSceneId, true);
  gameState.currentSceneId = `dinner:${activity.id}:${choice.returnSceneId || FALLBACK_SCENE_ID}`;
  saveGame();
  render();
}

function ensureDinnerDraft(returnSceneId, reset = false) {
  const key = `dinner:${DINNER_ACTIVITY_ID}:${returnSceneId || FALLBACK_SCENE_ID}`;
  if (reset || !dinnerDraft || dinnerDraft.key !== key) {
    dinnerDraft = {
      key,
      activityId: DINNER_ACTIVITY_ID,
      returnSceneId: returnSceneId || FALLBACK_SCENE_ID,
      inventory: {},
      storage: {}
    };
  }
  return dinnerDraft;
}

function createDinnerIngredientScene(sceneId) {
  const [, activityId, returnSceneId = FALLBACK_SCENE_ID] = sceneId.split(':');
  const activity = getDinnerActivity();
  if (!activity || activityId !== activity.id) {
    return createLocationScene(locations.find((location) => location.id === returnSceneId) || locations[0]);
  }
  ensureDinnerDraft(returnSceneId);
  const draftState = getDinnerDraftState(returnSceneId);
  const score = getDinnerDraftScore();
  const tier = getDinnerResultTier(score);
  const summaryLines = createDinnerDraftSummaryLines(score, tier);
  return {
    id: sceneId,
    title: activity.name || '黃昏晚餐',
    location: getSceneLocationLabel(returnSceneId),
    description: '艾妲把桌面清出一塊位置，讓你把能拿來分食的東西先放到一旁。她沒有催你多拿，只提醒你，晚餐至少得真的能煮成一鍋。',
    choiceGroups: [
      {
        title: `背包食材（整理後負重：${formatNumber(getInventoryWeight(draftState.inventoryAfter))} / ${formatNumber(getPlayerCarryCapacity())}）`,
        type: 'tradeRows',
        rows: createDinnerIngredientRows('inventory', draftState.inventoryFoods),
        emptyLabel: '背包裡沒有能拿來煮的食材。'
      },
      {
        title: '倉庫食材',
        type: 'tradeRows',
        rows: createDinnerIngredientRows('storage', draftState.storageFoods),
        emptyLabel: '倉庫箱裡沒有能拿來煮的食材。'
      },
      {
        title: '本次晚餐',
        type: 'tradeSummary',
        lines: summaryLines
      },
      {
        title: '確認',
        choices: [
          {
            id: `${activity.id}_confirm`,
            label: activity.flow?.ingredientSelection?.confirmLabel || '開始準備晚餐',
            actionType: 'villageActivity',
            timeCostSeconds: 0,
            hideCost: true,
            transition: 'fade',
            dynamicAction: 'confirmDinnerIngredients',
            activityId: activity.id,
            returnSceneId,
            disabledReason: score <= 0 ? '至少要放入一樣能煮的食材。' : ''
          },
          {
            id: `${activity.id}_cancel`,
            label: '返回',
            actionType: 'cancelVillageActivity',
            timeCostSeconds: 0,
            hideCost: true,
            dynamicAction: 'cancelDinnerIngredients',
            activityId: activity.id,
            returnSceneId
          }
        ]
      }
    ]
  };
}

function getDinnerDraftState(returnSceneId) {
  const storageInventory = cloneInventory(gameState.facilities?.storage_box?.items || []);
  const playerInventory = cloneInventory(gameState.player.inventory || []);
  for (const [itemId, count] of Object.entries(dinnerDraft?.inventory || {})) {
    changeInventoryItem(playerInventory, itemId, -Number(count || 0));
  }
  for (const [itemId, count] of Object.entries(dinnerDraft?.storage || {})) {
    changeInventoryItem(storageInventory, itemId, -Number(count || 0));
  }
  return {
    inventoryAfter: normalizeInventory(playerInventory),
    storageAfter: normalizeInventory(storageInventory),
    inventoryFoods: normalizeInventory(gameState.player.inventory || []).filter((entry) => getDinnerFoodConfig(entry.itemId)),
    storageFoods: normalizeInventory(gameState.facilities?.storage_box?.items || []).filter((entry) => getDinnerFoodConfig(entry.itemId))
  };
}

function createDinnerIngredientRows(source, entries) {
  return entries.map((entry) => {
    const item = getItem(entry.itemId);
    const selected = Number(dinnerDraft?.[source]?.[entry.itemId] || 0);
    const food = getDinnerFoodConfig(entry.itemId);
    const sourceLabel = source === 'storage' ? '倉庫' : '背包';
    return {
      id: `dinner_${source}_${entry.itemId}`,
      itemId: entry.itemId,
      count: entry.count,
      name: item?.name || food?.dinnerLabel || entry.itemId,
      meta: `${sourceLabel} ${entry.count}　分數 ${food?.score || 0}`,
      selectedLabel: `放入 ${selected}`,
      minusChoice: {
        id: `dinner_${source}_${entry.itemId}_minus`,
        label: `${item?.name || entry.itemId}　減少放入`,
        actionType: 'adjustDinnerIngredient',
        timeCostSeconds: 0,
        hideCost: true,
        dynamicAction: 'adjustDinnerIngredient',
        source,
        itemId: entry.itemId,
        delta: -1,
        disabledReason: selected <= 0 ? '目前沒有放入這個食材。' : ''
      },
      plusChoice: {
        id: `dinner_${source}_${entry.itemId}_plus`,
        label: `${item?.name || entry.itemId}　增加放入`,
        actionType: 'adjustDinnerIngredient',
        timeCostSeconds: 0,
        hideCost: true,
        dynamicAction: 'adjustDinnerIngredient',
        source,
        itemId: entry.itemId,
        delta: 1,
        disabledReason: selected >= entry.count ? '已達目前可放入數量。' : ''
      }
    };
  });
}

function adjustDinnerIngredient(choice) {
  if (!dinnerDraft || !['inventory', 'storage'].includes(choice.source)) {
    recordFailedAction(choice, '目前沒有正在整理的晚餐食材。');
    return;
  }
  if (!getDinnerFoodConfig(choice.itemId)) {
    recordFailedAction(choice, '這個道具不能拿來準備晚餐。');
    return;
  }
  const bucket = dinnerDraft[choice.source];
  const available = choice.source === 'storage'
    ? getInventoryCount(gameState.facilities?.storage_box?.items || [], choice.itemId)
    : getInventoryCount(gameState.player.inventory || [], choice.itemId);
  const next = clampNumber(Number(bucket[choice.itemId] || 0) + Number(choice.delta || 0), 0, available);
  if (next <= 0) {
    delete bucket[choice.itemId];
  } else {
    bucket[choice.itemId] = next;
  }
  clearActionResultDisplay();
  render();
}

function confirmDinnerIngredients(choice) {
  const activity = getDinnerActivity();
  if (!activity || !dinnerDraft) {
    recordFailedAction(choice, '目前沒有正在整理的晚餐食材。');
    return;
  }
  const score = getDinnerDraftScore();
  const tier = getDinnerResultTier(score);
  if (!tier) {
    recordFailedAction(choice, '至少要放入一樣能煮的食材。');
    return;
  }
  const selectedFoods = getDinnerDraftSelectedFoods();
  consumeDinnerDraftIngredients();
  const preparationEventId = pickDinnerPreparationEventId();
  const mealEventId = pickDinnerMealEventId(tier.id);
  applyDinnerPreparationEventRotation(preparationEventId);
  applyDinnerMealEventRotation(tier.id, mealEventId);
  const dinnerContext = createDinnerContext({
    score,
    tierId: tier.id,
    selectedFoods,
    mealEventId
  });
  dinnerDraft = null;
  const returnSceneId = `dialogue:${activity.hostVillagerId}:${choice.returnSceneId || FALLBACK_SCENE_ID}`;
  if (!startEvent(preparationEventId, {
    returnSceneId,
    triggerType: 'villageActivity',
    triggerSourceId: activity.id,
    triggerContextKey: `villageActivity:${activity.id}:${gameState.time.day}`,
    dinnerContext
  })) {
    recordFailedAction(choice, '找不到可播放的晚餐準備演出。');
    return;
  }
  saveGame('開始協助準備晚餐。');
  render();
}

function cancelDinnerIngredients(choice) {
  dinnerDraft = null;
  clearActionResultDisplay();
  gameState.currentSceneId = `dialogue:aida:${choice.returnSceneId || FALLBACK_SCENE_ID}`;
  saveGame();
  render();
}

function getDinnerDraftSelectedFoods() {
  const totals = {};
  for (const [source, bucket] of Object.entries({ inventory: dinnerDraft?.inventory || {}, storage: dinnerDraft?.storage || {} })) {
    for (const [itemId, count] of Object.entries(bucket || {})) {
      if (getDinnerFoodConfig(itemId)) {
        totals[itemId] = Number(totals[itemId] || 0) + Number(count || 0);
      }
    }
  }
  return normalizeInventory(inventoryMapToArray(totals));
}

function getDinnerDraftScore() {
  return getDinnerDraftSelectedFoods().reduce((sum, entry) => {
    const food = getDinnerFoodConfig(entry.itemId);
    return sum + Number(food?.score || 0) * Number(entry.count || 0);
  }, 0);
}

function createDinnerDraftSummaryLines(score, tier) {
  const selectedFoods = getDinnerDraftSelectedFoods();
  if (!selectedFoods.length) {
    return ['尚未放入食材。'];
  }
  const foodText = selectedFoods
    .map((entry) => `${getItem(entry.itemId)?.name || entry.itemId} x${entry.count}`)
    .join('、');
  return [
    `放入：${foodText}`,
    `目前分數：${score}`,
    `晚餐結果：${tier?.label || '尚不足以開始'}`
  ];
}

function consumeDinnerDraftIngredients() {
  for (const [itemId, count] of Object.entries(dinnerDraft?.inventory || {})) {
    changeInventoryItem(gameState.player.inventory, itemId, -Number(count || 0));
  }
  if (!gameState.facilities.storage_box) {
    gameState.facilities.storage_box = { items: [] };
  }
  for (const [itemId, count] of Object.entries(dinnerDraft?.storage || {})) {
    changeInventoryItem(gameState.facilities.storage_box.items, itemId, -Number(count || 0));
  }
  gameState.player.inventory = normalizeInventory(gameState.player.inventory || []);
  gameState.facilities.storage_box.items = normalizeInventory(gameState.facilities.storage_box.items || []);
}

function getDinnerFoodConfig(itemId) {
  return (getDinnerActivity()?.scoring?.eligibleFoods || []).find((entry) => entry.itemId === itemId) || null;
}

function getDinnerResultTier(score) {
  return (getDinnerActivity()?.scoring?.resultTiers || []).find((tier) => {
    const min = Number(tier.scoreMin || 0);
    const max = tier.scoreMax === null || tier.scoreMax === undefined ? Infinity : Number(tier.scoreMax);
    return score >= min && score <= max;
  }) || null;
}

function getDinnerResultTierIds() {
  return (getDinnerActivity()?.scoring?.resultTiers || []).map((tier) => tier.id).filter(Boolean);
}

function getDinnerPreparationEventIds() {
  return (getDinnerActivity()?.preparationEvents || []).map((event) => event.id).filter(Boolean);
}

function getDinnerMealEventIds(tierId) {
  return (getDinnerActivity()?.mealEvents?.[tierId] || []).map((event) => event.id).filter(Boolean);
}

function pickDinnerPreparationEventId() {
  const pool = getDinnerPreparationEventIds();
  const remaining = getRotatingEventPoolState({
    storedRemaining: gameState.events?.remainingDinnerPreparationEventIds,
    fullPool: pool,
    lastEventId: gameState.events?.lastDinnerPreparationEventId || ''
  }).candidates;
  const available = remaining.filter((eventId) => getEventById(eventId));
  return pickRandom(available.length ? available : remaining);
}

function applyDinnerPreparationEventRotation(selectedEventId) {
  const pool = getDinnerPreparationEventIds();
  const remaining = getRotatingEventPoolState({
    storedRemaining: gameState.events?.remainingDinnerPreparationEventIds,
    fullPool: pool,
    lastEventId: gameState.events?.lastDinnerPreparationEventId || ''
  }).activePool;
  gameState.events.lastDinnerPreparationEventId = selectedEventId;
  gameState.events.remainingDinnerPreparationEventIds = remaining.filter((id) => id !== selectedEventId);
}

function pickDinnerMealEventId(tierId) {
  const pool = getDinnerMealEventIds(tierId);
  const remaining = getRotatingEventPoolState({
    storedRemaining: gameState.events?.remainingDinnerMealEventIds?.[tierId],
    fullPool: pool,
    lastEventId: gameState.events?.lastDinnerMealEventIds?.[tierId] || ''
  }).candidates;
  const available = remaining.filter((eventId) => getEventById(eventId));
  return pickRandom(available.length ? available : remaining);
}

function applyDinnerMealEventRotation(tierId, selectedEventId) {
  const pool = getDinnerMealEventIds(tierId);
  const remaining = getRotatingEventPoolState({
    storedRemaining: gameState.events?.remainingDinnerMealEventIds?.[tierId],
    fullPool: pool,
    lastEventId: gameState.events?.lastDinnerMealEventIds?.[tierId] || ''
  }).activePool;
  gameState.events.lastDinnerMealEventIds = gameState.events.lastDinnerMealEventIds || {};
  gameState.events.remainingDinnerMealEventIds = gameState.events.remainingDinnerMealEventIds || {};
  gameState.events.lastDinnerMealEventIds[tierId] = selectedEventId;
  gameState.events.remainingDinnerMealEventIds[tierId] = remaining.filter((id) => id !== selectedEventId);
}

function getRotatingEventPoolState({ storedRemaining, fullPool, lastEventId }) {
  const normalizedFullPool = normalizeEventIdListForPool(fullPool, fullPool);
  const stored = normalizeEventIdListForPool(storedRemaining, normalizedFullPool);
  const activePool = stored.length ? stored : [...normalizedFullPool];
  const candidates = stored.length
    ? activePool
    : activePool.filter((id) => id !== lastEventId);
  return {
    activePool,
    candidates: candidates.length ? candidates : activePool
  };
}

function createDinnerContext({ score, tierId, selectedFoods, mealEventId }) {
  const uniqueFoodIds = selectedFoods.map((entry) => entry.itemId).filter((itemId, index, array) => array.indexOf(itemId) === index);
  const pickFoodId = () => pickRandom(uniqueFoodIds) || uniqueFoodIds[0] || '';
  const pairIds = [...uniqueFoodIds].sort(() => Math.random() - 0.5).slice(0, 2);
  return {
    activityId: DINNER_ACTIVITY_ID,
    score,
    tierId,
    selectedFoods,
    mealEventId,
    tokenFoodIds: {
      mealFood: pickFoodId(),
      mealFoodPhrase: pickFoodId(),
      mealFoodComment: pickFoodId()
    },
    mealFoodPairIds: pairIds
  };
}

function createWaitSceneDescription(returnSceneId, seconds, staminaGain = 0) {
  const locationName = getSceneLocationLabel(returnSceneId);
  const restedText = staminaGain > 0 ? '身上的疲憊也跟著鬆開了一些。' : '身體還沒有真正恢復過來。';

  if (returnSceneId === ABANDONED_CABIN_SCENE_ID) {
    return `你靠著破舊木牆坐了一會兒，聽著外頭的林聲從縫隙間掠過。\n等你重新站起來時，屋內的陰影挪了位置，${restedText}`;
  }

  if (returnSceneId === HIDDEN_CAVE_SCENE_ID) {
    return `你留在洞穴裡等了一陣，水滴聲一下一下敲在石面上，把外頭的動靜隔得更遠。\n重新整理好行囊時，${restedText}`;
  }

  if (isExplorationSceneId(returnSceneId)) {
    return `你在原地壓低呼吸，讓腳步和背包都暫時停下。\n森林沒有因此安靜，只是風聲和枝葉的方向慢慢變了；重新抬頭時，${restedText}`;
  }

  if (returnSceneId === 'dormitory') {
    return `你在宿舍裡停下來等了一會兒，周圍的人聲與腳步聲漸漸換成另一種節奏。\n再看向四周時，${restedText}`;
  }

  if (locationName && locationName !== returnSceneId) {
    return `你在${locationName}停下手邊的事，讓時間慢慢流過。\n光線、聲音與人的動向都和剛才有些不同；重新把注意力拉回眼前時，${restedText}`;
  }

  return `你停下手邊的事，讓時間慢慢流過。\n等你重新把注意力拉回眼前時，${restedText}`;
}

function applyWaitRestValue(seconds) {
  const restGain = Math.max(0, Math.floor(Number(seconds || 0) / 60));
  if (restGain <= 0) {
    return;
  }

  gameState.player.restValue = normalizeRestValueRemainder(gameState.player.restValue) + restGain;
  const staminaGain = Math.floor(gameState.player.restValue / 30);
  if (staminaGain <= 0) {
    return;
  }

  const nextStamina = Math.min(gameState.player.maxStamina, gameState.player.stamina + staminaGain);
  gameState.player.stamina = nextStamina;
  gameState.player.restValue = Math.max(0, gameState.player.restValue - staminaGain * 30);
}

function normalizeRestValueRemainder(value) {
  const numericValue = Math.max(0, Math.floor(Number(value || 0)));
  return numericValue % 30;
}

function sleep(seconds, returnSceneId = FALLBACK_SCENE_ID, facilityId = 'protagonist_bed') {
  const clampedSeconds = Math.min(
    SLEEP_MAX_SECONDS,
    Math.max(SLEEP_MIN_SECONDS, Number(seconds || SLEEP_MIN_SECONDS))
  );
  runTrackedAction({
    id: 'sleep_protagonist_bed',
    label: '睡覺',
    timeCostSeconds: clampedSeconds
  }, () => {
    applyWaitRestValue(clampedSeconds);
    advanceTime(clampedSeconds);
    gameState.currentSceneId = returnSceneId;
  }, { message: '睡了一會兒。' });
  const gained = gameState.lastActionResult?.changes?.stamina?.delta || 0;
  const durationText = formatDuration(clampedSeconds);
  saveGame(gained > 0 ? `睡了${durationText}，體力恢復 ${gained}。` : `睡了${durationText}。`);
  render();
}

function sleepUntilTimeBlock(timeBlock, returnSceneId = FALLBACK_SCENE_ID, facilityId = 'protagonist_bed') {
  const target = getTimeBlockTargetInfo(timeBlock);
  const seconds = target.seconds;
  if (!seconds) {
    recordFailedAction({ id: `sleep_until_${timeBlock}`, label: `睡到${timeBlock || '指定時段'}` }, '找不到指定時段。');
    return;
  }
  runTrackedAction({
    id: `sleep_until_${timeBlock}`,
    label: `睡到${target.label}`,
    timeCostSeconds: seconds
  }, () => {
    applyWaitRestValue(seconds);
    advanceTime(seconds);
    gameState.currentSceneId = returnSceneId;
  }, { message: `睡到${target.label}。` });
  const gained = gameState.lastActionResult?.changes?.stamina?.delta || 0;
  saveGame(gained > 0 ? `睡到${target.label}，體力恢復 ${gained}。` : `睡到${target.label}。`);
  render();
}

function enterAbandonedCabin() {
  if (!canEnterAbandonedCabin()) {
    recordFailedAction({ id: 'move_to_abandoned_cabin', label: '廢棄小屋' }, '你沒有在附近找到能靠近的小屋。');
    return;
  }
  clearActionResultDisplay();
  gameState.currentSceneId = ABANDONED_CABIN_SCENE_ID;
  saveGame('你走進了廢棄小屋。');
  render();
}

function enterHiddenCave() {
  if (!canEnterHiddenCave()) {
    recordFailedAction({ id: 'move_to_hidden_cave', label: '隱藏的洞穴' }, '你沒有在附近找到能進入的洞穴。');
    return;
  }
  clearActionResultDisplay();
  gameState.currentSceneId = HIDDEN_CAVE_SCENE_ID;
  saveGame('你走進了隱藏的洞穴。');
  render();
}

function leaveHiddenCave() {
  ensureExplorationSession(EXPLORATION_SCENE_ID);
  runTrackedAction({
    id: 'leave_hidden_cave',
    label: '離開隱藏的洞穴',
    timeCostSeconds: 0
  }, () => {
    gameState.currentSceneId = EXPLORATION_SCENE_ID;
  }, { message: '你撥開洞口的藤蔓，重新回到森林外圍。' });
  saveGame('你離開隱藏的洞穴，回到森林外圍。');
  render();
}

function leaveAbandonedCabin() {
  ensureExplorationSession(EXPLORATION_SCENE_ID);
  const exploration = gameState.exploration;
  runTrackedAction({
    id: 'leave_abandoned_cabin',
    label: '離開廢棄小屋',
    timeCostSeconds: 0
  }, () => {
    exploration.currentLayer = EXPLORATION_LAYER_ORDER[0].id;
    exploration.progress = 50;
    resetExplorationPositionState(exploration, 'forward');
    gameState.currentSceneId = EXPLORATION_SCENE_ID;
  }, { message: '你離開小屋，重新回到森林外圍的樹影之間。' });
  saveGame('你離開廢棄小屋，回到森林外圍。');
  render();
}

function advanceExploration(returnSceneId = EXPLORATION_SCENE_ID) {
  ensureExplorationSession(returnSceneId);
  if (tryStartExplorationEncounter(returnSceneId, false)) {
    return;
  }

  const exploration = gameState.exploration;
  const progressGain = rollExplorationProgressGain();
  const staminaCost = getExplorationAdvanceStaminaCost();
  const willReachTempleRuins = willReachDeepestExplorationEnd(exploration, progressGain);

  runTrackedAction({
    id: 'explore_deeper',
    label: '向深處移動',
    timeCostSeconds: getCommandCost('exploreDeeper'),
    staminaCost
  }, () => {
    applyExplorationStaminaCost(staminaCost);
    advanceTime(getCommandCost('exploreDeeper'));

    exploration.progress = Math.min(100, exploration.progress + progressGain);
    if (exploration.progress >= 100) {
      const nextLayer = getNextExplorationLayer(exploration.currentLayer);
      if (nextLayer) {
        exploration.currentLayer = nextLayer.id;
        exploration.progress = 0;
      }
    }

    resetExplorationPositionState(exploration, 'forward');
    gameState.currentSceneId = returnSceneId;
  }, {
    message: willReachTempleRuins
      ? '你穿過三層森林，終於看見神殿遺跡的輪廓。那裡的空氣沉得不自然，瘴氣像濕布一樣貼在石階上。'
      : '你沿著林間記號與獸徑繼續向深處前進。'
  });
  saveGame('你繼續往森林深處前進。');
  render();
}

function advanceExplorationSlow(returnSceneId = EXPLORATION_SCENE_ID) {
  ensureExplorationSession(returnSceneId);
  if (tryStartExplorationEncounter(returnSceneId, false)) {
    return;
  }

  const exploration = gameState.exploration;
  const willReachTempleRuins = willReachDeepestExplorationEnd(exploration, 1);
  runTrackedAction({
    id: 'explore_deeper_slow',
    label: '向深處緩慢移動',
    timeCostSeconds: getCommandCost('exploreDeeperSlow')
  }, () => {
    advanceTime(getCommandCost('exploreDeeperSlow'));
    exploration.progress = Math.min(100, exploration.progress + 1);
    if (exploration.progress >= 100) {
      const nextLayer = getNextExplorationLayer(exploration.currentLayer);
      if (nextLayer) {
        exploration.currentLayer = nextLayer.id;
        exploration.progress = 0;
      }
    }
    resetExplorationPositionState(exploration, 'forward');
    gameState.currentSceneId = returnSceneId;
  }, {
    message: willReachTempleRuins
      ? '你放慢腳步穿過最後一段林影，神殿遺跡在瘴氣裡露出破碎輪廓。'
      : '你放慢腳步，沿著能辨認的痕跡往更深處移動。'
  });
  saveGame('你緩慢地往森林深處移動。');
  render();
}

function forageExploration(returnSceneId = EXPLORATION_SCENE_ID) {
  ensureExplorationSession(returnSceneId);
  const disabledReason = getExplorationForageDisabledReason();
  if (disabledReason) {
    recordFailedAction({ id: 'forage', label: '搜尋' }, disabledReason);
    return;
  }
  if (canRevealHiddenCave()) {
    revealHiddenCave(returnSceneId);
    return;
  }
  if (tryStartExplorationEncounter(returnSceneId, false)) {
    return;
  }

  const foundItems = rollExplorationForageItems();
  runTrackedAction({
    id: 'forage',
    label: '搜尋',
    timeCostSeconds: getCommandCost('forage')
  }, () => {
    advanceTime(getCommandCost('forage'));
    markExplorationForageUsed();
    increaseExplorationDangerByTime(getCommandCost('forage'));
    gameState.exploration.temporaryLoot = normalizeInventory(foundItems);
    ensureForageLootDraft(returnSceneId, true);
    gameState.currentSceneId = foundItems.length ? `forageLoot:${returnSceneId || EXPLORATION_SCENE_ID}` : returnSceneId;
  }, {
    message: createExplorationForageMessage(foundItems),
    showMessageWhenPresent: true
  });
  saveGame(gameState.lastActionResult?.message || '你在附近搜尋可用物資。');
  render();
}

function revealHiddenCave(returnSceneId = EXPLORATION_SCENE_ID) {
  runTrackedAction({
    id: 'reveal_hidden_cave',
    label: '搜尋',
    timeCostSeconds: getCommandCost('forage')
  }, () => {
    advanceTime(getCommandCost('forage'));
    markExplorationForageUsed();
    increaseExplorationDangerByTime(getCommandCost('forage'));
    if (!gameState.player.flags.includes(HIDDEN_CAVE_REVEALED_FLAG)) {
      gameState.player.flags.push(HIDDEN_CAVE_REVEALED_FLAG);
    }
    gameState.currentSceneId = returnSceneId || EXPLORATION_SCENE_ID;
  }, {
    message: '你撥開一片垂落的藤蔓，發現後方藏著一個低矮洞口。',
    showMessageWhenPresent: true
  });
  saveGame('你發現了隱藏的洞穴。');
  render();
}

function shoutAttractEnemy(returnSceneId = EXPLORATION_SCENE_ID) {
  ensureExplorationSession(returnSceneId);
  runTrackedAction({
    id: 'shout_attract_enemy',
    label: '大喊',
    timeCostSeconds: getCommandCost('shoutAttractEnemy')
  }, () => {
    advanceTime(getCommandCost('shoutAttractEnemy'));
    gameState.exploration.dangerRate = clampNumber(Number(gameState.exploration.dangerRate || 0) + 20, 0, 100);
    gameState.currentSceneId = returnSceneId;
  }, {
    message: '你的聲音撞進林子深處，枝葉間的動靜明顯變多了。',
    showMessageWhenPresent: true
  });

  if (Math.random() < (gameState.exploration.dangerRate || 0) / 100) {
    startEncounter(selectExplorationEncounterEnemy(), returnSceneId, '你的喊聲很快引來了林中的動靜。');
    saveGame('你主動引來了敵人。');
    render();
    return;
  }

  saveGame(gameState.lastActionResult?.message || '你朝森林深處大喊。');
  render();
}

function retreatExploration(returnSceneId = EXPLORATION_SCENE_ID) {
  ensureExplorationSession(returnSceneId);
  if (tryStartExplorationEncounter(returnSceneId, false)) {
    return;
  }

  const exploration = gameState.exploration;
  const retreatAmount = getExplorationRetreatAmount();
  const currentIndex = EXPLORATION_LAYER_ORDER.findIndex((layer) => layer.id === exploration.currentLayer);

  runTrackedAction({
    id: 'retreat',
    label: '向村莊移動',
    timeCostSeconds: getCommandCost('retreat'),
    staminaCost: 1
  }, () => {
    gameState.player.stamina = Math.max(0, gameState.player.stamina - 1);
    advanceTime(getCommandCost('retreat'));

    if (exploration.progress > 0) {
      exploration.progress = Math.max(0, exploration.progress - retreatAmount);
      resetExplorationPositionState(exploration, 'backward');
      exploration.dangerRate = Math.floor(exploration.dangerRate * 0.5);
      gameState.currentSceneId = returnSceneId;
      return;
    }

    if (currentIndex > 0) {
      exploration.currentLayer = EXPLORATION_LAYER_ORDER[currentIndex - 1].id;
      exploration.progress = 0;
      resetExplorationPositionState(exploration, 'backward');
      exploration.dangerRate = Math.floor(exploration.dangerRate * 0.5);
      gameState.currentSceneId = returnSceneId;
      return;
    }

    clearExplorationState();
    gameState.currentSceneId = 'village_square_hub';
  }, {
    message: createExplorationRetreatMessage(currentIndex, exploration.progress, retreatAmount)
  });
  saveGame(gameState.lastActionResult?.message || '你選擇先往回退。');
  render();
}

function retreatExplorationSlow(returnSceneId = EXPLORATION_SCENE_ID) {
  ensureExplorationSession(returnSceneId);
  if (tryStartExplorationEncounter(returnSceneId, false)) {
    return;
  }

  const exploration = gameState.exploration;
  const currentIndex = EXPLORATION_LAYER_ORDER.findIndex((layer) => layer.id === exploration.currentLayer);

  runTrackedAction({
    id: 'retreat_slow',
    label: '向村莊緩慢移動',
    timeCostSeconds: getCommandCost('retreatSlow')
  }, () => {
    advanceTime(getCommandCost('retreatSlow'));

    if (exploration.progress > 0) {
      exploration.progress = Math.max(0, exploration.progress - 1);
      resetExplorationPositionState(exploration, 'backward');
      exploration.dangerRate = Math.floor(exploration.dangerRate * 0.5);
      gameState.currentSceneId = returnSceneId;
      return;
    }

    if (currentIndex > 0) {
      exploration.currentLayer = EXPLORATION_LAYER_ORDER[currentIndex - 1].id;
      exploration.progress = 0;
      resetExplorationPositionState(exploration, 'backward');
      exploration.dangerRate = Math.floor(exploration.dangerRate * 0.5);
      gameState.currentSceneId = returnSceneId;
      return;
    }

    clearExplorationState();
    gameState.currentSceneId = 'village_square_hub';
  }, {
    message: createExplorationSlowRetreatMessage(currentIndex, exploration.progress)
  });
  saveGame(gameState.lastActionResult?.message || '你緩慢地往村莊方向移動。');
  render();
}

function returnToVillageFromExploration() {
  ensureExplorationSession(EXPLORATION_SCENE_ID);
  runTrackedAction({
    id: 'return_to_village',
    label: '返回村莊',
    timeCostSeconds: getCommandCost('retreat')
  }, () => {
    advanceTime(getCommandCost('retreat'));
    clearExplorationState();
    gameState.currentSceneId = 'village_square_hub';
  }, { message: '你已退回森林外圍，順利返回村莊。' });
  saveGame('你從森林返回了村莊。');
  render();
}

function tryStartExplorationEncounter(returnSceneId, force) {
  ensureExplorationSession(returnSceneId);
  if (force || Math.random() < (gameState.exploration.dangerRate || 0) / 100) {
    startEncounter(selectExplorationEncounterEnemy(), returnSceneId);
    saveGame('你在森林裡遭遇了敵人。');
    render();
    return true;
  }
  return false;
}

function startEncounter(enemy, returnSceneId, message = '附近忽然傳來逼近的動靜。') {
  if (!enemy) {
    recordFailedAction({ id: 'encounter', label: '遭遇' }, '目前沒有可用的敵人資料。');
    return;
  }
  ensureExplorationSession(returnSceneId);
  rememberEncounteredEnemy(enemy.id);
  gameState.exploration.encounterState = {
    enemyId: enemy.id,
    returnSceneId,
    currentDifficulty: Number(enemy.difficulty || 0),
    rangedFailed: false,
    rangedHitCount: 0,
    rangedAmmoFired: []
  };
  clearActionResultDisplay();
  gameState.currentSceneId = `encounter:${enemy.id}:${returnSceneId}`;
}

function useLizardWell(facilityId) {
  const facility = facilities.find((candidate) => candidate.id === facilityId);
  const requiredFlag = facility?.access?.requiredFlag;
  if (requiredFlag && !gameState.player.flags.includes(requiredFlag)) {
    clearActionResultDisplay();
    render();
    return;
  }
  const timeBlocks = facility?.access?.timeBlocks || [];
  if (timeBlocks.length && !timeBlocks.includes(getTimeBlock(gameState.time.secondsOfDay))) {
    recordFailedAction({ id: `${facilityId}_enter`, label: facility?.access?.label || '進入井底入口' }, '這個時候井底沒有人。');
    return;
  }

  const npcId = facility?.access?.npcId;
  if (npcId) {
    clearActionResultDisplay();
    gameState.currentSceneId = `dialogue:${npcId}:reclamation_area`;
    saveGame();
    render();
  }
}

function withdrawFacility(facilityId) {
  const facility = facilities.find((candidate) => candidate.id === facilityId);
  const state = gameState.facilities[facilityId];
  const stock = normalizeInventory(state?.items || []);
  const obtainAction = getFacilityObtainAction(facility);
  if (!stock.length) {
    recordFailedAction({ id: `${facilityId}_withdraw`, label: obtainAction.label }, obtainAction.emptyMessage);
    return;
  }

  runTrackedAction({
    id: `${facilityId}_withdraw`,
    label: obtainAction.label,
    timeCostSeconds: 60
  }, () => {
    for (const entry of stock) {
      changeInventoryItem(gameState.player.inventory, entry.itemId, entry.count);
    }
    state.items = [];
    markOneTimeSmallStorageClaimed(facility);
    advanceTime(60);
  }, { message: `${obtainAction.successMessage}取得：${formatInventory(stock)}。` });
  saveGame(`${obtainAction.successMessage}取得：${formatInventory(stock)}。`);
  render();
}

function withdrawFacilityItem(facilityId, itemId, returnSceneId) {
  const context = resolveFacilityContext(facilityId, returnSceneId);
  const facility = context.baseFacility;
  if (shouldWithdrawSmallStorageAllAtOnce(facility)) {
    withdrawFacilityItemsByCarryCapacity(context, returnSceneId);
    return;
  }

  const state = context.state;
  const facilityRootState = facility ? (gameState.facilities[facility.id] || {}) : null;
  const item = getItem(itemId);
  const obtainAction = getFacilityObtainAction(facility);
  if (getInventoryCount(state?.items || [], itemId) <= 0) {
    recordFailedAction({ id: `${facilityId}_obtain_${itemId}`, label: obtainAction.label }, obtainAction.emptyMessage);
    return;
  }

  const carryReason = getPlayerCarryDisabledReason(itemId, 1);
  if (carryReason) {
    recordFailedAction({ id: `${facilityId}_obtain_${itemId}`, label: `${obtainAction.label}${item ? `：${item.name}` : ''}` }, carryReason);
    return;
  }

  runTrackedAction({
    id: `${facilityId}_obtain_${itemId}`,
    label: `${obtainAction.label}${item ? `：${item.name}` : ''}`,
    timeCostSeconds: 60
  }, () => {
    state.items = normalizeInventory(state.items || []);
    changeInventoryItem(state.items, itemId, -1);
    changeInventoryItem(gameState.player.inventory, itemId, 1);
    if (!context.isTemporary && supportsPerLocationFacilityState(facility)) {
      facilityRootState.perLocationStates = {
        ...(facilityRootState.perLocationStates || {}),
        [returnSceneId]: state
      };
      gameState.facilities[facility.id] = facilityRootState;
    }
    if (!countInventoryItems(state.items || [])) {
      markOneTimeSmallStorageClaimed(facility);
    }
    advanceTime(60);
    gameState.currentSceneId = countInventoryItems(state.items || []) > 0
      ? `facility:${facilityId}:${returnSceneId || FALLBACK_SCENE_ID}`
      : (returnSceneId || FALLBACK_SCENE_ID);
  }, { message: `${obtainAction.successMessage}取得：${item?.name || itemId}。` });
  saveGame(`${obtainAction.successMessage}取得：${item?.name || itemId}。`);
  render();
}

function withdrawFacilityItemsByCarryCapacity(context, returnSceneId) {
  const facility = context.baseFacility;
  const state = context.state;
  const obtainAction = getFacilityObtainAction(facility);
  const stock = normalizeInventory(state?.items || []);
  if (!stock.length) {
    recordFailedAction({ id: `${context.instanceId}_obtain_all`, label: obtainAction.label }, obtainAction.emptyMessage);
    return;
  }

  let picked = [];
  let dropped = [];
  runTrackedAction({
    id: `${context.instanceId}_obtain_all`,
    label: obtainAction.label,
    timeCostSeconds: 60
  }, () => {
    picked = [];
    dropped = [];
    for (const entry of stock) {
      for (let index = 0; index < Number(entry.count || 0); index += 1) {
        if (canPlayerCarryItem(entry.itemId, 1)) {
          changeInventoryItem(gameState.player.inventory, entry.itemId, 1);
          changeInventoryItem(picked, entry.itemId, 1);
        } else {
          changeInventoryItem(dropped, entry.itemId, 1);
        }
      }
    }

    if (dropped.length && shouldOverflowSmallStorageItemsToDroppedItems(facility)) {
      addDroppedItemsAtLocation(returnSceneId || FALLBACK_SCENE_ID, dropped);
    }
    state.items = [];
    markOneTimeSmallStorageClaimed(facility);
    advanceTime(60);
    gameState.currentSceneId = returnSceneId || FALLBACK_SCENE_ID;
  }, { message: createCarryLimitedFacilityWithdrawMessage(obtainAction, picked, dropped) });
  saveGame(gameState.lastActionResult?.message || obtainAction.successMessage);
  render();
}

function createCarryLimitedFacilityWithdrawMessage(obtainAction, picked, dropped) {
  const parts = [];
  if (picked.length) {
    parts.push(`${obtainAction.successMessage}取得：${formatInventory(picked)}。`);
  } else {
    parts.push('你試著把東西取出來，但身上的重量已經撐不住了。');
  }
  if (dropped.length) {
    parts.push(`你無法全部拾取，剩下的${formatInventory(dropped)}被留在地上。`);
  }
  return parts.join('');
}

function gatherRandomFacility(facilityId, returnSceneId) {
  const context = resolveFacilityContext(facilityId, returnSceneId);
  const facility = context.baseFacility;
  const state = context.state || { items: [] };
  const facilityRootState = facility ? (gameState.facilities[facility.id] || {}) : null;
  const action = facility?.randomGatherAction;
  const label = action?.label || '尋找物品';
  const result = pickRandom(action?.results || []);
  const itemId = result?.itemId || null;
  const count = Number(result?.count || 0);
  const item = getItem(itemId);

  if (!facility || !action) {
    recordFailedAction({ id: `${facilityId}_gather`, label }, '這個設施目前不能尋找物品。');
    return;
  }

  if (isRandomGatherActionUsedUp(context, state, action)) {
    recordFailedAction({ id: `${facilityId}_gather`, label }, action.alreadyUsedMessage || '今天已經找過了。');
    return;
  }

  const willCarry = itemId && count > 0 && canPlayerCarryItem(itemId, count);
  runTrackedAction({
    id: `${facilityId}_gather`,
    label,
    timeCostSeconds: action.timeCostSeconds || 0
  }, () => {
    state.items = normalizeInventory(state.items || []);
    if (context.isTemporary) {
      state.gathered = true;
    } else {
      recordRandomGatherActionUse(state);
    }

    if (itemId && count > 0) {
      if (willCarry) {
        changeInventoryItem(gameState.player.inventory, itemId, count);
      } else {
        changeInventoryItem(state.items, itemId, count);
      }
    }

    if (!context.isTemporary) {
      if (supportsPerLocationFacilityState(facility)) {
        facilityRootState.perLocationStates = {
          ...(facilityRootState.perLocationStates || {}),
          [returnSceneId]: state
        };
        gameState.facilities[facility.id] = facilityRootState;
      } else {
        gameState.facilities[facility.id] = state;
      }
    }
    advanceTime(action.timeCostSeconds || 0);
    gameState.currentSceneId = `facility:${facilityId}:${returnSceneId || FALLBACK_SCENE_ID}`;
  }, {
    message: itemId && count > 0
      ? willCarry
        ? `找到並取得${item?.name || itemId}。`
        : `找到${item?.name || itemId}，但你已經無法負荷這個重量，先留在${facility.name}。`
      : action.emptyResultMessage || '沒有找到可用的東西。',
    showMessageWhenPresent: !itemId || count <= 0
  });
  saveGame(itemId && count > 0 ? `找到${item?.name || itemId}。` : '沒有找到可用的東西。');
  render();
}

function getRandomGatherMaxDailyUses(action = {}) {
  return Math.max(1, Number(action.maxDailyUses || action.dailyUses || 1));
}

function getRandomGatherUseCount(state = {}, day = gameState.time.day) {
  if (Number(state.gatherCountDay || 0) === day) {
    return Math.max(0, Number(state.gatherCount || 0));
  }
  return Number(state.lastGatherDay || 0) >= day ? 1 : 0;
}

function isRandomGatherActionUsedUp(context, state = {}, action = {}) {
  if (context?.isTemporary) {
    return Boolean(state.gathered);
  }
  return getRandomGatherUseCount(state) >= getRandomGatherMaxDailyUses(action);
}

function recordRandomGatherActionUse(state = {}) {
  const day = gameState.time.day;
  if (Number(state.gatherCountDay || 0) !== day) {
    state.gatherCountDay = day;
    state.gatherCount = 0;
  }
  state.gatherCount = getRandomGatherUseCount(state, day) + 1;
  state.lastGatherDay = day;
}

function collectInfiniteSource(facilityId, returnSceneId) {
  const context = resolveFacilityContext(facilityId, returnSceneId);
  const facility = context.baseFacility;
  const source = facility?.infiniteSource;
  const itemId = source?.itemId;
  const count = Number(source?.count || 1);
  const staminaCost = Number(source?.staminaCost || 0);
  const item = getItem(itemId);
  const label = source?.label || `取得${item?.name || itemId || '道具'}`;

  if (!facility || facility.facilityType !== 'infinite_source' || !itemId) {
    recordFailedAction({ id: `${facilityId}_collect`, label }, '這個設施目前沒有可取得的道具。');
    return;
  }

  const carryReason = getPlayerCarryDisabledReason(itemId, count);
  if (carryReason) {
    recordFailedAction({ id: `${facilityId}_collect`, label }, carryReason);
    return;
  }

  runTrackedAction({
    id: `${facilityId}_collect`,
    label,
    timeCostSeconds: source.timeCostSeconds || 0,
    staminaCost
  }, () => {
    if (staminaCost > 0) {
      gameState.player.stamina = Math.max(0, gameState.player.stamina - staminaCost);
    }
    changeInventoryItem(gameState.player.inventory, itemId, count);
    advanceTime(source.timeCostSeconds || 0);
    gameState.currentSceneId = `facility:${facilityId}:${returnSceneId || FALLBACK_SCENE_ID}`;
  }, { message: `${source.successMessage || `取得${item?.name || itemId}`}。` });
  saveGame(source.successMessage || `取得${item?.name || itemId}。`);
  render();
}

function craftRecipe(facilityId, recipeId, returnSceneId) {
  const isPortableCrafting = facilityId === 'portable_crafting';
  const context = isPortableCrafting ? null : resolveFacilityContext(facilityId, returnSceneId);
  const facility = context?.baseFacility;
  const recipe = recipes.find((entry) => entry.id === recipeId);
  const resultItem = getItem(recipe?.result?.itemId);

  if (!recipe || (!isPortableCrafting && (!facility || facility.facilityType !== 'crafting'))) {
    recordFailedAction({ id: `craft_${facilityId}_${recipeId}`, label: '製作' }, '找不到可用的配方。');
    return;
  }

  if (!isRecipeKnown(recipe)) {
    recordFailedAction({ id: `craft_${facilityId}_${recipeId}`, label: `製作${resultItem?.name || recipe.result?.itemId}` }, '你還沒有學會這個配方。');
    return;
  }

  if (isPortableCrafting && !recipe.portableCrafting) {
    recordFailedAction({ id: `craft_${facilityId}_${recipeId}`, label: `製作${resultItem?.name || recipe.result?.itemId}` }, '這個東西需要工作台。');
    return;
  }

  const disabledReason = getRecipeDisabledReason(recipe);
  if (disabledReason) {
    recordFailedAction({ id: `craft_${facilityId}_${recipeId}`, label: `製作${resultItem?.name || recipe.result?.itemId}` }, disabledReason);
    return;
  }

  runTrackedAction({
    id: `craft_${facilityId}_${recipeId}`,
    label: `製作${resultItem?.name || recipe.result?.itemId}`,
    timeCostSeconds: Number(recipe.timeCostSeconds || 0)
  }, () => {
    for (const material of recipe.materials || []) {
      changeInventoryItem(gameState.player.inventory, material.itemId, -Number(material.count || 0));
    }
    changeInventoryItem(gameState.player.inventory, recipe.result.itemId, Number(recipe.result.count || 1));
    advanceTime(Number(recipe.timeCostSeconds || 0));
    gameState.currentSceneId = isPortableCrafting
      ? `craftItem:${returnSceneId || FALLBACK_SCENE_ID}`
      : `facility:${facilityId}:${returnSceneId || FALLBACK_SCENE_ID}`;
  }, { message: isPortableCrafting ? `你做出${resultItem?.name || recipe.result?.itemId}。` : `已在${facility.name}製作${resultItem?.name || recipe.result?.itemId}。` });
  saveGame(`已製作${resultItem?.name || recipe.result?.itemId}。`);
  render();
}

function runTrackedAction(choice, action, options = {}) {
  const before = createStateSnapshot();
  action();
  const after = createStateSnapshot();
  gameState.lastActionResult = createActionResult(choice, before, after, {
    status: options.status || 'success',
    message: options.message || '',
    messageLabel: options.messageLabel || '',
    showMessageWhenPresent: Boolean(options.showMessageWhenPresent)
  });
  actionResultVisible = true;
}

function recordFailedAction(choice, reason) {
  gameState.lastActionResult = {
    actionId: choice?.id || choice?.actionType || 'unknown_action',
    label: choice?.label || '行動',
    status: 'failed',
    timeDeltaSeconds: 0,
    changes: {
      location: null,
      life: null,
      stamina: null,
      items: [],
      affection: [],
      flags: [],
      facilities: [],
      tradeStocks: []
    },
    message: reason
  };
  actionResultVisible = true;
  elements.saveNote.textContent = reason;
  saveGame(reason);
  render();
}

function recordInformationalAction(choice, message, messageLabel = '狀態變化') {
  gameState.lastActionResult = {
    actionId: choice?.id || choice?.actionType || 'info_action',
    label: choice?.label || '資訊',
    status: 'success',
    timeDeltaSeconds: 0,
    changes: {
      location: null,
      life: null,
      stamina: null,
      skills: [],
      recipes: [],
      items: [],
      affection: [],
      flags: [],
      facilities: [],
      tradeStocks: []
    },
    message,
    messageLabel,
    showMessageWhenPresent: true
  };
  actionResultVisible = true;
}

function clearActionResultDisplay() {
  actionResultVisible = false;
}

function createStateSnapshot() {
  return {
    time: {
      day: Number(gameState.time.day || 1),
      secondsOfDay: Number(gameState.time.secondsOfDay || 0)
    },
    position: getResolvedPlayerPosition(gameState.currentSceneId),
    player: {
      life: Number(gameState.player.life || 0),
      stamina: Number(gameState.player.stamina || 0),
      contribution: Number(gameState.player.contribution || 0),
      inventory: normalizeInventory(gameState.player.inventory || []),
      carrySkill: Number(gameState.player.carrySkill || 0),
      gatheringSkill: Number(gameState.player.gatheringSkill || 0),
      explorationSkill: Number(gameState.player.explorationSkill || 0),
      meleeWeaponSkill: Number(gameState.player.meleeWeaponSkill || 0),
      rangedWeaponSkill: Number(gameState.player.rangedWeaponSkill || 0),
      knownRecipeIds: Array.isArray(gameState.player.knownRecipeIds) ? [...gameState.player.knownRecipeIds] : []
    },
    villagers: structuredClone(gameState.villagers || {}),
    facilities: structuredClone(gameState.facilities || {}),
    tradeStocks: structuredClone(gameState.tradeStocks || {}),
    flags: [...(gameState.player.flags || [])]
  };
}

function createActionResult(choice, before, after, options = {}) {
  return {
    actionId: choice?.id || choice?.actionType || 'unknown_action',
    label: choice?.label || '行動',
    status: options.status || 'success',
    timeDeltaSeconds: getTimeDeltaSeconds(before.time, after.time),
    changes: {
      location: createLocationChange(before.position, after.position),
      life: createNumberChange(before.player.life, after.player.life),
      stamina: createNumberChange(before.player.stamina, after.player.stamina),
      contribution: createNumberChange(before.player.contribution, after.player.contribution),
      skills: createPlayerSkillChanges(before.player, after.player),
      recipes: createRecipeChanges(before.player.knownRecipeIds, after.player.knownRecipeIds),
      items: createInventoryChanges(before.player.inventory, after.player.inventory),
      affection: createAffectionChanges(before.villagers, after.villagers),
      flags: createFlagChanges(before.flags, after.flags),
      facilities: createFacilityChanges(before.facilities, after.facilities),
      tradeStocks: createTradeStockChanges(before.tradeStocks, after.tradeStocks)
    },
    message: options.message || '',
    messageLabel: options.messageLabel || '',
    showMessageWhenPresent: Boolean(options.showMessageWhenPresent)
  };
}

function createNumberChange(before, after) {
  const delta = after - before;
  return delta ? { before, after, delta } : null;
}

function createLocationChange(before, after) {
  if (!before?.id || !after?.id || before.id === after.id) {
    return null;
  }
  return {
    beforeId: before.id,
    afterId: after.id,
    beforeName: before.name,
    afterName: after.name
  };
}

function createInventoryChanges(beforeInventory, afterInventory) {
  const before = inventoryToCountMap(beforeInventory);
  const after = inventoryToCountMap(afterInventory);
  const itemIds = new Set([...before.keys(), ...after.keys()]);
  return [...itemIds]
    .map((itemId) => ({
      itemId,
      name: getItem(itemId)?.name || itemId,
      before: before.get(itemId) || 0,
      after: after.get(itemId) || 0,
      delta: (after.get(itemId) || 0) - (before.get(itemId) || 0)
    }))
    .filter((change) => change.delta);
}

function inventoryToCountMap(inventory) {
  return new Map(normalizeInventory(inventory).map((entry) => [entry.itemId, entry.count]));
}

function createAffectionChanges(beforeVillagers, afterVillagers) {
  const villagerIds = new Set([...Object.keys(beforeVillagers || {}), ...Object.keys(afterVillagers || {})]);
  return [...villagerIds]
    .map((villagerId) => {
      const before = Number(beforeVillagers?.[villagerId]?.affection || 0);
      const after = Number(afterVillagers?.[villagerId]?.affection || 0);
      return {
        villagerId,
        name: villagers.find((villager) => villager.id === villagerId)?.name || villagerId,
        before,
        after,
        delta: after - before
      };
    })
    .filter((change) => change.delta);
}

function createFlagChanges(beforeFlags, afterFlags) {
  const before = new Set(beforeFlags || []);
  return (afterFlags || [])
    .filter((flag) => !before.has(flag))
    .map((flag) => {
      const source = getFlagSource(flag);
      return {
        flagId: flag,
        name: flag,
        delta: 1,
        visible: Boolean(source?.playerVisible),
        description: source?.playerDescription || source?.description || ''
      };
    });
}

function getFlagSource(flagId) {
  return flagSources.find((entry) => entry.flagId === flagId) || null;
}

function createFacilityChanges(beforeFacilities, afterFacilities) {
  const facilityIds = new Set([...Object.keys(beforeFacilities || {}), ...Object.keys(afterFacilities || {})]);
  return [...facilityIds]
    .flatMap((facilityId) => {
      const before = beforeFacilities?.[facilityId] || {};
      const after = afterFacilities?.[facilityId] || {};
      const facilityName = facilities.find((facility) => facility.id === facilityId)?.name || facilityId;
      const changes = [];
      for (const key of ['level', 'progress', 'capacityWeight', 'unlocked']) {
        if (JSON.stringify(before[key]) !== JSON.stringify(after[key])) {
          changes.push({
            facilityId,
            name: facilityName,
            key,
            before: before[key],
            after: after[key]
          });
        }
      }
      return changes;
    });
}

function createTradeStockChanges(beforeStocks, afterStocks) {
  const villagerIds = new Set([...Object.keys(beforeStocks || {}), ...Object.keys(afterStocks || {})]);
  return [...villagerIds]
    .flatMap((villagerId) => {
      const before = beforeStocks?.[villagerId] || {};
      const after = afterStocks?.[villagerId] || {};
      const itemIds = new Set([...Object.keys(before), ...Object.keys(after)]);
      return [...itemIds].map((itemId) => ({
        villagerId,
        itemId,
        name: getItem(itemId)?.name || itemId,
        before: Number(before[itemId] || 0),
        after: Number(after[itemId] || 0),
        delta: Number(after[itemId] || 0) - Number(before[itemId] || 0)
      }));
    })
    .filter((change) => change.delta);
}

function createPlayerSkillChanges(beforePlayer, afterPlayer) {
  const labels = {
    carrySkill: '負重訓練',
    gatheringSkill: '採集技能',
    explorationSkill: '探索技能',
    meleeWeaponSkill: '近戰技能',
    rangedWeaponSkill: '遠程技能'
  };

  return Object.entries(labels)
    .map(([key, name]) => ({
      key,
      name,
      before: Number(beforePlayer?.[key] || 0),
      after: Number(afterPlayer?.[key] || 0)
    }))
    .map((change) => ({ ...change, delta: change.after - change.before }))
    .filter((change) => change.delta);
}

function createRecipeChanges(beforeRecipeIds = [], afterRecipeIds = []) {
  const before = new Set(Array.isArray(beforeRecipeIds) ? beforeRecipeIds : []);
  return (Array.isArray(afterRecipeIds) ? afterRecipeIds : [])
    .filter((recipeId) => recipeId && !before.has(recipeId))
    .map((recipeId) => ({
      recipeId,
      name: recipes.find((recipe) => recipe.id === recipeId)?.name || recipeId
    }));
}

function getTimeDeltaSeconds(before, after) {
  const beforeTotal = ((before.day || 1) - 1) * 86400 + (before.secondsOfDay || 0);
  const afterTotal = ((after.day || 1) - 1) * 86400 + (after.secondsOfDay || 0);
  return Math.max(0, afterTotal - beforeTotal);
}

function applyEffects(effects) {
  return applyEffectsToState(gameState, effects);
}

function applyNumberEffect(target, key, amount, min, max) {
  if (amount === 'full') {
    target[key] = max;
    return;
  }

  if (typeof amount === 'number') {
    target[key] = Math.min(max, Math.max(min, target[key] + amount));
  }
}

function applyPercentOfMaxEffect(target, key, ratio, min, max) {
  if (typeof ratio !== 'number' || !Number.isFinite(ratio) || ratio <= 0) {
    return;
  }

  const amount = Math.ceil(max * ratio);
  if (amount <= 0) {
    return;
  }

  target[key] = Math.min(max, Math.max(min, target[key] + amount));
}

function applyEffectsToState(state, effects = {}) {
  const result = { messages: [] };
  applyNumberEffect(state.player, 'life', effects.life, 0, state.player.maxLife);
  applyNumberEffect(state.player, 'stamina', effects.stamina, 0, state.player.maxStamina);
  applyPercentOfMaxEffect(state.player, 'life', effects.lifePercentOfMax, 0, state.player.maxLife);
  applyPercentOfMaxEffect(state.player, 'stamina', effects.staminaPercentOfMax, 0, state.player.maxStamina);
  applyExplorationDefeatEffect(state, effects.explorationDefeat);

  for (const [key, amount] of Object.entries(effects.player || {})) {
    if (typeof amount === 'number' && Number.isFinite(amount) && typeof state.player[key] === 'number') {
      state.player[key] += amount;
    }
  }

  if (effects.items && typeof effects.items === 'object') {
    state.player.inventory = addInventoryItems(state.player.inventory, effects.items);
  }

  for (const [id, affectionChange] of Object.entries(effects.villagerTrust || effects.villagerAffection || {})) {
    if (!state.villagers[id]) {
      state.villagers[id] = { affection: 0 };
    }
    state.villagers[id].affection = Math.max(0, (state.villagers[id].affection || 0) + affectionChange);
  }

  applyFacilityEffectsToState(state, effects.facilities || {});

  for (const flag of effects.flags || []) {
    if (!state.player.flags.includes(flag)) {
      state.player.flags.push(flag);
    }
  }

  if (!Array.isArray(state.player.dailyFlags)) {
    state.player.dailyFlags = [];
  }
  for (const flag of effects.dailyFlags || []) {
    if (!state.player.dailyFlags.includes(flag)) {
      state.player.dailyFlags.push(flag);
    }
  }

  if (state === gameState) {
    const questAcceptMessage = applyQuestAcceptEffect(effects.questAccept);
    const questCompleteMessage = applyQuestCompleteEffect(effects.questComplete);
    result.messages.push(...[questAcceptMessage, questCompleteMessage].filter(Boolean));
  }

  return result;
}

function applyFacilityEffectsToState(state, facilityEffects = {}) {
  for (const [facilityId, effect] of Object.entries(facilityEffects || {})) {
    applySingleFacilityEffectToState(state, facilityId, effect);
  }
}

function applySingleFacilityEffectToState(state, facilityId, effect) {
  const facility = getFacility(facilityId);
  const current = state.facilities[facilityId] || {};
  const nextState = { ...current };
  const minLevel = Number(facility?.upgrade?.minLevel ?? 0);
  const maxLevel = getFacilityMaxLevel(facilityId);
  const currentLevel = getFacilityInitialLevel(facility, nextState.level);
  const effectObject = typeof effect === 'number' ? { levelDelta: effect } : (effect || {});
  const explicitLevel = Number.isFinite(Number(effectObject.level)) ? Number(effectObject.level) : null;
  const levelDelta = Number(effectObject.levelDelta || 0);
  nextState.level = clampNumber(explicitLevel === null ? currentLevel + levelDelta : explicitLevel, minLevel, maxLevel);

  if (
    facility?.progress
    || Number.isFinite(Number(effectObject.progressDelta))
    || Number.isFinite(Number(effectObject.progressStepDelta))
    || Number.isFinite(Number(effectObject.progress))
  ) {
    applyFacilityProgressEffect(nextState, facility, effectObject);
  }
  if (facility?.facilityType === 'container') {
    nextState.capacityWeight = getFacilityContainerCapacity(facility, nextState);
  }
  state.facilities[facilityId] = nextState;
}

function applyFacilityProgressEffect(nextState, facility, effectObject = {}) {
  const maxProgress = Number(facility?.progress?.max ?? 100);
  const threshold = Number(facility?.progress?.upgradeThreshold ?? maxProgress);
  const resetOnLevelUp = facility?.progress?.resetOnLevelUp !== false;
  const explicitProgress = Number.isFinite(Number(effectObject.progress)) ? Number(effectObject.progress) : null;
  const progressDelta = getFacilityProgressDelta(nextState, facility, effectObject, threshold);
  let progress = explicitProgress === null
    ? Number(nextState.progress ?? facility?.progress?.initial ?? 0) + progressDelta
    : explicitProgress;
  const maxLevel = getFacilityMaxLevel(facility.id);
  let leveledUpByProgress = false;
  if (progress + PROGRESS_EPSILON >= threshold && Number(nextState.level || 0) < maxLevel) {
    nextState.level = Math.min(maxLevel, Number(nextState.level || 0) + Number(effectObject.levelDeltaOnProgressComplete ?? 1));
    leveledUpByProgress = true;
    progress = resetOnLevelUp ? Math.max(0, progress - threshold) : threshold;
  }
  if (Number(nextState.level || 0) >= maxLevel && (progress + PROGRESS_EPSILON >= threshold || leveledUpByProgress)) {
    progress = maxProgress;
  }
  nextState.progress = clampNumber(progress, 0, maxProgress);
}

function getFacilityProgressDelta(nextState, facility, effectObject = {}, threshold = 100) {
  const directDelta = Number(effectObject.progressDelta || 0);
  const stepDelta = Number(effectObject.progressStepDelta || 0);
  if (!stepDelta) {
    return directDelta;
  }

  const currentLevel = Number(nextState.level || facility?.upgrade?.initialLevel || 0);
  const stepCount = getFacilityProgressStepCount(facility, currentLevel);
  if (stepCount <= 0) {
    return directDelta;
  }
  return directDelta + (threshold / stepCount) * stepDelta;
}

function getFacilityProgressStepCount(facility, level) {
  const stepCounts = facility?.progress?.stepCountsByLevel || {};
  const exact = Number(stepCounts[String(level)]);
  if (Number.isFinite(exact) && exact > 0) {
    return exact;
  }
  const fallback = Number(facility?.progress?.stepCount);
  return Number.isFinite(fallback) && fallback > 0 ? fallback : 0;
}

function createEffectResultMessage(result = null) {
  return (result?.messages || []).filter(Boolean).join(' ');
}

function applyExplorationDefeatEffect(state, effect = null) {
  if (!effect || state !== gameState) {
    return;
  }

  const itemLossRate = Number.isFinite(Number(effect.itemLossRate))
    ? clampNumber(Number(effect.itemLossRate), 0, 1)
    : EXPLORATION_FAILURE_ITEM_LOSS_RATE;
  for (const entry of [...normalizeInventory(state.player.inventory || [])]) {
    const item = getItem(entry.itemId);
    if (!item?.canDisappearOnExplorationFailure) {
      continue;
    }
    for (let index = 0; index < entry.count; index += 1) {
      if (Math.random() < itemLossRate) {
        changeInventoryItem(state.player.inventory, entry.itemId, -1);
        if (item.explorationFailureLossTarget === 'lost_and_found_box') {
          moveExpiredDroppedItemToLostAndFound(entry.itemId, 1);
        }
      }
    }
  }

  recoverEncounterRangedAmmo();
  clearExplorationState();
  if (effect.advanceToNextDayReset !== false) {
    state.time.day += 1;
    state.time.secondsOfDay = RESET_SECOND;
    processDailyReset();
  }
  applyDefeatReturnRecovery(state, effect);
  applyExplorationDefeatCaregiver(state, effect.randomCaregiver);
}

function applyDefeatReturnRecovery(state, effect) {
  if (typeof effect.lifeAfterReturn === 'number') {
    state.player.life = clampNumber(effect.lifeAfterReturn, 1, state.player.maxLife);
  } else {
    state.player.life = Math.max(1, state.player.life);
  }

  if (effect.staminaAfterReturn === 'max') {
    state.player.stamina = state.player.maxStamina;
  } else if (typeof effect.staminaAfterReturn === 'number') {
    state.player.stamina = clampNumber(effect.staminaAfterReturn, 0, state.player.maxStamina);
  }
}

function applyExplorationDefeatCaregiver(state, randomCaregiver = null) {
  const candidates = Array.isArray(randomCaregiver?.candidates) ? randomCaregiver.candidates : [];
  const validCandidates = candidates.filter((entry) => entry?.villagerId && entry?.eventId);
  const selected = pickNonRepeatingExplorationDefeatCaregiver(state, validCandidates);
  if (!selected) {
    return;
  }

  state.events = normalizeEventState(state.events || {});
  if (randomCaregiver.saveTo === 'events.lastExplorationDefeatCaregiverId' || !randomCaregiver.saveTo) {
    state.events.lastExplorationDefeatCaregiverId = selected.villagerId;
  }
  recordExplorationDefeatCaregiverHistory(state, selected.villagerId, validCandidates);
}

function pickNonRepeatingExplorationDefeatCaregiver(state, candidates) {
  if (!candidates.length) {
    return null;
  }

  state.events = normalizeEventState(state.events || {});
  const candidateIds = candidates.map((entry) => entry.villagerId);
  const history = (state.events.explorationDefeatCaregiverHistory || [])
    .filter((id) => candidateIds.includes(id));
  const available = candidates.filter((entry) => !history.includes(entry.villagerId));
  return pickRandom(available.length ? available : candidates);
}

function recordExplorationDefeatCaregiverHistory(state, villagerId, candidates) {
  const candidateIds = candidates.map((entry) => entry.villagerId);
  const previous = (state.events.explorationDefeatCaregiverHistory || [])
    .filter((id) => candidateIds.includes(id));
  let next = previous.includes(villagerId) ? [villagerId] : [...previous, villagerId];
  if (next.length >= candidateIds.length) {
    next = [];
  }
  state.events.explorationDefeatCaregiverHistory = next;
}

function learnRecipes(recipeIds = [], state = gameState) {
  if (!Array.isArray(state.player.knownRecipeIds)) {
    state.player.knownRecipeIds = [];
  }
  for (const recipeId of recipeIds || []) {
    if (typeof recipeId === 'string' && recipeId && !state.player.knownRecipeIds.includes(recipeId)) {
      state.player.knownRecipeIds.push(recipeId);
    }
  }
}

function applyItemUseEffects(state, item, returnSceneId) {
  applyEffectsToState(state, item.effects || {});

  if (Array.isArray(item.useReturnsItems) && item.useReturnsItems.length) {
    const returnedItems = Object.fromEntries(
      item.useReturnsItems
        .filter((entry) => entry?.itemId && Number(entry.count || 0) > 0)
        .map((entry) => [entry.itemId, Number(entry.count)])
    );
    state.player.inventory = addInventoryItems(state.player.inventory, returnedItems);
  }

  if (item.id === 'smoke_bomb' && isExplorationSceneId(returnSceneId)) {
    ensureExplorationSessionState(state, returnSceneId);
    state.exploration.dangerRate = Math.max(0, state.exploration.dangerRate - 30);
  }
}

function ensureExplorationSessionState(state, sceneId = EXPLORATION_SCENE_ID) {
  const exploration = state.exploration || normalizeExplorationState({});
  if (!exploration.active || exploration.regionId !== sceneId) {
    exploration.active = true;
    exploration.regionId = sceneId;
    exploration.currentLayer = EXPLORATION_LAYER_ORDER[0].id;
    exploration.progress = 0;
    exploration.temporaryResourceNodes = [];
    exploration.temporaryLoot = [];
    exploration.encounterState = null;
    exploration.openFacilityInstanceId = null;
    resetExplorationForageForCurrentPosition(exploration);
    rerollExplorationDanger(exploration);
    rerollExplorationScenery(exploration, sceneId);
    rerollBlackCatPresence(exploration);
  }
  if (!exploration.sceneryText || exploration.sceneryPositionKey !== getExplorationPositionKey(exploration)) {
    rerollExplorationScenery(exploration, sceneId);
  }
  ensureBlackCatPresenceForCurrentPosition(exploration);
  state.exploration = exploration;
  return exploration;
}

function getConsumableInventoryEntries(returnSceneId = FALLBACK_SCENE_ID) {
  return gameState.player.inventory
    .map((entry) => ({ ...entry, item: getItem(entry.itemId) }))
    .filter(({ item, count }) =>
      item
      && item.category === 'consumable'
      && count > 0
      && shouldShowItemInUseMenu(item, returnSceneId)
    );
}

function shouldShowItemInUseMenu(item, returnSceneId = FALLBACK_SCENE_ID) {
  if (!item || item.category !== 'consumable') {
    return false;
  }
  if (item.id === 'smoke_bomb') {
    return isExplorationSceneId(returnSceneId);
  }
  return hasDirectItemUseEffect(item);
}

function hasDirectItemUseEffect(item) {
  const effects = item?.effects || {};
  return Boolean(
    Object.keys(effects).length
    || (Array.isArray(item?.useReturnsItems) && item.useReturnsItems.length)
  );
}

function getItemUseDisabledReason(item, returnSceneId = FALLBACK_SCENE_ID) {
  if (!item) {
    return '道具資料不存在。';
  }
  if (getInventoryCount(gameState.player.inventory, item.id) <= 0) {
    return '背包裡沒有這個道具。';
  }
  if (!shouldShowItemInUseMenu(item, returnSceneId)) {
    return item.id === 'smoke_bomb'
      ? '煙霧彈只能在探索區用來降低危機。'
      : '這個道具不能在一般道具選單中直接使用。';
  }
  if (item.id === 'smoke_bomb' && Number(gameState.exploration?.dangerRate || 0) <= 0) {
    return '目前沒有危機感知，不需要使用煙霧彈。';
  }
  if (!doesItemUseChangeState(item, returnSceneId)) {
    return '現在使用這個道具不會產生任何變化。';
  }
  return '';
}

function doesItemUseChangeState(item, returnSceneId = FALLBACK_SCENE_ID) {
  const before = JSON.stringify(createItemUseEffectSnapshot(gameState));
  const simulatedState = structuredClone(gameState);
  applyItemUseEffects(simulatedState, item, returnSceneId);
  const after = JSON.stringify(createItemUseEffectSnapshot(simulatedState));
  return before !== after;
}

function doesInteractionActionChangeState(choice) {
  const before = JSON.stringify(createItemUseEffectSnapshot(gameState));
  const simulatedState = structuredClone(gameState);
  applyEffectsToState(simulatedState, choice.effects || {});
  const after = JSON.stringify(createItemUseEffectSnapshot(simulatedState));
  return before !== after;
}

function createItemUseEffectSnapshot(state) {
  return {
    player: {
      life: state.player.life,
      stamina: state.player.stamina,
      inventory: normalizeInventory(state.player.inventory || []),
      flags: [...(state.player.flags || [])]
    },
    villagers: structuredClone(state.villagers || {}),
    facilities: structuredClone(state.facilities || {}),
    exploration: structuredClone(state.exploration || {})
  };
}

function advanceTime(seconds) {
  if (!seconds) {
    return;
  }

  const beforeDay = gameState.time.day;
  const beforeSeconds = gameState.time.secondsOfDay;
  gameState.time.secondsOfDay += seconds;

  while (gameState.time.secondsOfDay >= 86400) {
    gameState.time.secondsOfDay -= 86400;
    gameState.time.day += 1;
  }

  const crossedResetToday = beforeDay === gameState.time.day
    && beforeSeconds < RESET_SECOND
    && gameState.time.secondsOfDay >= RESET_SECOND;
  const crossedNewDayReset = gameState.time.day > beforeDay
    && (gameState.time.secondsOfDay >= RESET_SECOND || beforeSeconds < RESET_SECOND);

  if (crossedResetToday || crossedNewDayReset) {
    processDailyReset();
  }

  cleanupExpiredDroppedItems();
}

function processDailyReset() {
  gameState.time.lastDailyResetDay = gameState.time.day;
  gameState.dailyReset = {
    ...(gameState.dailyReset || {}),
    lastProcessedDay: gameState.time.day,
    lastProcessedAt: {
      day: gameState.time.day,
      secondsOfDay: gameState.time.secondsOfDay
    },
    pending: false
  };
  gameState.player.dailyFlags = [];
  restockSmallStorages(gameState, false);
}

function getCurrentTotalSeconds() {
  return ((Number(gameState.time.day || 1) - 1) * 86400) + Number(gameState.time.secondsOfDay || 0);
}

function cleanupExpiredDroppedItems() {
  const root = gameState.facilities?.discarded_items;
  if (!root?.perLocationStates) {
    return;
  }

  const now = getCurrentTotalSeconds();
  for (const [sceneId, state] of Object.entries(root.perLocationStates)) {
    const expiresAt = Number(state?.expiresAtTotalSeconds || 0);
    if (!expiresAt || expiresAt > now) {
      continue;
    }
    clearDroppedItemsAtLocation(sceneId);
  }
}

function clearDroppedItemsAtLocation(sceneId) {
  const root = gameState.facilities?.discarded_items;
  const state = root?.perLocationStates?.[sceneId];
  if (!state) {
    return;
  }

  moveRecoverableDroppedItemsToLostAndFound(state.items || []);
  delete root.perLocationStates[sceneId];
}

function clearExplorationDroppedItemsOnSceneChange() {
  clearDroppedItemsAtLocation(EXPLORATION_SCENE_ID);
}

function moveRecoverableDroppedItemsToLostAndFound(entries) {
  const recoverable = normalizeInventory(entries)
    .filter((entry) => isRecoverableDroppedItem(entry.itemId));
  if (!recoverable.length) {
    return;
  }

  if (!gameState.facilities.lost_and_found_box) {
    gameState.facilities.lost_and_found_box = {
      level: 0,
      capacityWeight: getContainerCapacity(getFacility('lost_and_found_box')),
      items: []
    };
  }

  const target = gameState.facilities.lost_and_found_box;
  target.items = normalizeInventory(target.items || []);
  for (const entry of recoverable) {
    changeInventoryItem(target.items, entry.itemId, entry.count);
  }
}

function isRecoverableDroppedItem(itemId) {
  const category = getItem(itemId)?.category;
  return category === 'equipment' || category === 'quest_item';
}

function restockSmallStorages(state, force) {
  for (const facility of facilities.filter((candidate) => candidate.facilityType === 'small_storage')) {
    const rule = facility.smallStorage?.restockRule;
    if (!rule) {
      continue;
    }
    const storage = state.facilities[facility.id] || { lastRestockDay: 0, items: [] };

    if (supportsPerLocationFacilityState(facility)) {
      const perLocationStates = { ...(storage.perLocationStates || {}) };
      for (const locationId of facility.locationIds || []) {
        const locationStorage = perLocationStates[locationId] || { lastRestockDay: 0, lastGatherDay: 0, items: [] };
        restockSingleSmallStorage(locationStorage, facility, rule, state.time.day, force);
        perLocationStates[locationId] = locationStorage;
      }
      state.facilities[facility.id] = {
        ...storage,
        perLocationStates
      };
      continue;
    }

    restockSingleSmallStorage(storage, facility, rule, state.time.day, force);
    state.facilities[facility.id] = storage;
  }
}

function restockSingleSmallStorage(storage, facility, rule, currentDay, force) {
  if (!force && storage.lastRestockDay >= currentDay) {
    return;
  }

  if (facility.randomGatherAction?.clearTemporaryItemsOnReset) {
    storage.items = [];
    storage.lastRestockDay = currentDay;
    return;
  }

  storage.items = normalizeInventory(storage.items || []);
  const total = countInventoryItems(storage.items || []);
  const threshold = rule.onlyRestockWhenTotalBelow ?? facility.smallStorage?.maxTotalItemCount ?? Infinity;
  if (total < threshold) {
    const maxTotal = facility.smallStorage?.maxTotalItemCount ?? threshold;
    let remainingCapacity = Number.isFinite(maxTotal) ? Math.max(0, maxTotal - total) : Infinity;
    const restock = createRestockItems(rule);
    for (const entry of restock) {
      if (remainingCapacity <= 0) {
        break;
      }
      const count = Math.min(Number(entry.count || 0), remainingCapacity);
      if (count > 0) {
        changeInventoryItem(storage.items, entry.itemId, count);
        remainingCapacity -= count;
      }
    }
  }
  storage.lastRestockDay = currentDay;
}

function createRestockItems(rule) {
  if (rule.type === 'dailyFixed') {
    return Object.entries(rule.items || {}).map(([itemId, count]) => ({ itemId, count }));
  }

  if (rule.type === 'dailyRandom') {
    if (Array.isArray(rule.results)) {
      const result = pickRandom(rule.results);
      return result?.itemId ? [{ itemId: result.itemId, count: result.count || 1 }] : [];
    }

    const candidates = [...(rule.candidateItemIds || [])];
    const drawCount = Math.max(1, Number(rule.drawCount || 1));
    const restock = [];
    for (let index = 0; index < drawCount && candidates.length; index += 1) {
      const itemId = pickRandom(candidates);
      removeFromArray(candidates, itemId);
      if (itemId) {
        restock.push({ itemId, count: rule.count || 1 });
      }
    }
    return restock;
  }

  return [];
}

function isExplorationSceneId(sceneId) {
  return scenes.some((scene) => scene.id === sceneId && scene.sceneType === 'exploration');
}

function getCurrentExplorationLayer() {
  const currentLayerId = gameState.exploration?.currentLayer || EXPLORATION_LAYER_ORDER[0].id;
  return EXPLORATION_LAYER_ORDER.find((layer) => layer.id === currentLayerId) || EXPLORATION_LAYER_ORDER[0];
}

function canReturnVillageFromExploration() {
  return gameState.exploration?.active
    && gameState.exploration.currentLayer === EXPLORATION_LAYER_ORDER[0].id
    && Number(gameState.exploration.progress || 0) <= 0;
}

function isExplorationVillageReturnPoint(exploration = gameState.exploration) {
  return Boolean(exploration?.active)
    && exploration.currentLayer === EXPLORATION_LAYER_ORDER[0].id
    && Number(exploration.progress || 0) <= 0;
}

function getNextExplorationLayer(currentLayerId) {
  const index = EXPLORATION_LAYER_ORDER.findIndex((layer) => layer.id === currentLayerId);
  return index >= 0 ? EXPLORATION_LAYER_ORDER[index + 1] || null : null;
}

function getExplorationPositionKey(exploration = gameState.exploration) {
  return `${exploration.currentLayer || 'outer'}:${Math.floor(Number(exploration.progress || 0))}`;
}

function resetExplorationForageForCurrentPosition(exploration) {
  exploration.forageState = {
    positionKey: getExplorationPositionKey(exploration),
    usedAtCurrentPosition: false
  };
}

function markExplorationForageUsed() {
  ensureExplorationSession(EXPLORATION_SCENE_ID);
  gameState.exploration.forageState.positionKey = getExplorationPositionKey(gameState.exploration);
  gameState.exploration.forageState.usedAtCurrentPosition = true;
}

function getExplorationForageDisabledReason() {
  if (!gameState.exploration?.active) {
    return '';
  }
  const currentPositionKey = getExplorationPositionKey(gameState.exploration);
  if (gameState.exploration.forageState?.positionKey === currentPositionKey && gameState.exploration.forageState?.usedAtCurrentPosition) {
    return commands.commands.forage?.availability?.depletedMessage || '附近已經沒有物品。';
  }
  return '';
}

function isHiddenCaveRevealed() {
  return Boolean(gameState.player.flags?.includes(HIDDEN_CAVE_REVEALED_FLAG));
}

function isAtHiddenCaveDiscoveryPosition() {
  const exploration = gameState.exploration;
  return Boolean(exploration?.active)
    && exploration.currentLayer === EXPLORATION_LAYER_ORDER[0].id
    && Math.floor(Number(exploration.progress || 0)) === 10;
}

function canRevealHiddenCave() {
  return isAtHiddenCaveDiscoveryPosition() && !isHiddenCaveRevealed();
}

function canEnterHiddenCave() {
  return isAtHiddenCaveDiscoveryPosition() && isHiddenCaveRevealed();
}

function canEnterTempleRuins() {
  const exploration = gameState.exploration;
  return Boolean(exploration?.active)
    && exploration.currentLayer === EXPLORATION_LAYER_ORDER[EXPLORATION_LAYER_ORDER.length - 1]?.id
    && Number(exploration.progress || 0) >= 100;
}

function willReachDeepestExplorationEnd(exploration, progressGain = 0) {
  const deepestLayerId = EXPLORATION_LAYER_ORDER[EXPLORATION_LAYER_ORDER.length - 1]?.id;
  return Boolean(exploration?.active)
    && exploration.currentLayer === deepestLayerId
    && Number(exploration.progress || 0) + Number(progressGain || 0) >= 100;
}

function canEnterAbandonedCabin() {
  const exploration = gameState.exploration;
  return Boolean(exploration?.active)
    && exploration.currentLayer === EXPLORATION_LAYER_ORDER[0].id
    && Number(exploration.progress || 0) >= 45
    && Number(exploration.progress || 0) <= 55;
}

function rerollExplorationDanger(exploration = gameState.exploration) {
  exploration.dangerRate = randomInt(DANGER_MIN, DANGER_MAX);
  exploration.lastDangerPositionKey = getExplorationPositionKey(exploration);
}

function rerollBlackCatPresence(exploration = gameState.exploration) {
  if (!exploration) {
    return;
  }
  exploration.blackCatPositionKey = getExplorationPositionKey(exploration);
  if (isExplorationVillageReturnPoint(exploration)) {
    exploration.blackCatPresent = false;
    exploration.lastBlackCatPresenceRollWasPresent = false;
    return;
  }
  if (exploration.lastBlackCatPresenceRollWasPresent) {
    exploration.blackCatPresent = false;
    exploration.lastBlackCatPresenceRollWasPresent = false;
    return;
  }
  exploration.blackCatPresent = Math.random() < BLACK_CAT_APPEARANCE_RATE;
  exploration.lastBlackCatPresenceRollWasPresent = exploration.blackCatPresent;
}

function ensureBlackCatPresenceForCurrentPosition(exploration = gameState.exploration) {
  if (!exploration?.active) {
    return;
  }
  if (exploration.blackCatPositionKey !== getExplorationPositionKey(exploration)) {
    rerollBlackCatPresence(exploration);
  }
}

function isBlackCatPresentAt(locationId) {
  if (locationId !== EXPLORATION_SCENE_ID || !gameState.exploration?.active) {
    return false;
  }
  if (isExplorationVillageReturnPoint(gameState.exploration)) {
    gameState.exploration.blackCatPresent = false;
    return false;
  }
  ensureBlackCatPresenceForCurrentPosition(gameState.exploration);
  return Boolean(gameState.exploration.blackCatPresent);
}

function increaseExplorationDangerByTime(seconds) {
  if (!gameState.exploration?.active) {
    return;
  }
  const minutes = Math.floor(seconds / 60);
  if (minutes <= 0) {
    return;
  }
  gameState.exploration.dangerRate = clampNumber((gameState.exploration.dangerRate || 0) + minutes, 0, 100);
}

function resetExplorationPositionState(exploration, moveType) {
  clearExplorationDroppedItemsOnSceneChange();
  resetExplorationForageForCurrentPosition(exploration);
  exploration.temporaryLoot = [];
  forageLootDraft = null;
  exploration.openFacilityInstanceId = null;
  spawnExplorationTemporaryNodes(exploration, moveType);
  rerollExplorationDanger(exploration);
  rerollExplorationScenery(exploration, exploration.regionId || EXPLORATION_SCENE_ID);
  rerollBlackCatPresence(exploration);
}

function rerollExplorationScenery(exploration, sceneId = EXPLORATION_SCENE_ID) {
  const scene = scenes.find((candidate) => candidate.id === sceneId && candidate.sceneType === 'exploration');
  exploration.sceneryText = createSceneImpressionDescription(scene, sceneId, { includeScenery: true });
  exploration.sceneryPositionKey = getExplorationPositionKey(exploration);
}

function spawnExplorationTemporaryNodes(exploration, moveType) {
  const config = resourceNodeSpawnConfig || {};
  const rules = config.spawnRules || {};
  const weightSet = rules[moveType]?.nodeCountWeights || [];
  const count = weightedPick(weightSet)?.count ?? 0;
  const templates = config.resourceNodeTemplates || [];
  exploration.temporaryResourceNodes = Array.from({ length: count }, (_, index) => {
    const facilityId = pickRandom(templates);
    return createTemporaryExplorationNode(facilityId, index);
  }).filter(Boolean);
}

function createTemporaryExplorationNode(facilityId, index) {
  const facility = facilities.find((candidate) => candidate.id === facilityId);
  if (!facility) {
    return null;
  }
  return {
    instanceId: `tempnode_${Date.now()}_${index}_${facility.id}`,
    facilityId: facility.id,
    items: createTemporaryNodeItems(facility),
    gathered: false
  };
}

function createTemporaryNodeItems(facility) {
  if (facility.randomGatherAction) {
    return [];
  }
  return createRestockItems(facility.smallStorage?.restockRule || {});
}

function rollExplorationProgressGain() {
  return randomInt(5, 12) + clampNumber(Number(gameState.player.explorationSkill || 0) * 3, 0, 30);
}

function getExplorationAdvanceStaminaCost() {
  return 1;
}

function getExplorationRetreatAmount() {
  return Math.ceil(rollExplorationProgressGain() * 1.5);
}

function applyExplorationStaminaCost(amount) {
  gameState.player.stamina = Math.max(0, gameState.player.stamina - Math.max(0, Number(amount || 0)));
}

function getCurrentRegionLabel() {
  return getCurrentExplorationLayer().label;
}

function rollExplorationForageItems() {
  const config = forageLootConfig || {};
  const rules = config.forageRules || {};
  const foundCount = weightedPick(rules.itemCountWeights || [])?.count ?? 0;
  const pool = (config.regionLootPools || []).find((entry) => entry.region === getCurrentRegionLabel())?.candidateItems || [];
  const candidates = [...pool];
  const results = [];

  for (let index = 0; index < foundCount && candidates.length; index += 1) {
    const picked = weightedPick(candidates);
    if (!picked?.itemId) {
      break;
    }
    results.push({ itemId: picked.itemId, count: 1 });
    removeFromArray(candidates, picked);
  }

  return results;
}

function createExplorationForageMessage(foundItems) {
  return foundItems.length
    ? `你找到了${formatInventory(foundItems)}，先整理要帶走的東西。`
    : '附近沒有找到值得帶走的物資。';
}

function createExplorationRetreatMessage(currentIndex, currentProgress, retreatAmount) {
  if (currentProgress > 0) {
    return `你沿著記號往回退，深入程度減少 ${formatNumber(Math.min(currentProgress, retreatAmount))}%。`;
  }
  if (currentIndex > 0) {
    return '你退回了上一層森林區段。';
  }
  return '你已退回森林外圍，順利返回村莊。';
}

function createExplorationSlowRetreatMessage(currentIndex, currentProgress) {
  if (currentProgress > 0) {
    return '你放慢腳步往村莊方向退去，深入程度減少 1%。';
  }
  if (currentIndex > 0) {
    return '你小心退回了上一層森林區段。';
  }
  return '你已退回森林外圍，順利返回村莊。';
}

function selectRandomEnemyForCurrentLayer() {
  const pool = enemies.filter((enemy) => enemy.region === getCurrentRegionLabel());
  return pickRandom(pool);
}

function selectExplorationEncounterEnemy() {
  const enemy = selectRandomEnemyForCurrentLayer();
  if (!enemy || !shouldReplaceEncounterWithBlackShadow()) {
    return enemy;
  }
  return enemies.find((candidate) => candidate.id === BLACK_SHADOW_ENEMY_ID) || enemy;
}

function shouldReplaceEncounterWithBlackShadow() {
  const timeBlock = getTimeBlock(gameState.time.secondsOfDay);
  return BLACK_SHADOW_TIME_BLOCKS.includes(timeBlock)
    && Math.random() < BLACK_SHADOW_REPLACEMENT_RATE;
}

function clearExplorationState() {
  clearExplorationDroppedItemsOnSceneChange();
  gameState.exploration = normalizeExplorationState({});
}

function createEncounterScene(sceneId) {
  const [, enemyId, returnSceneId] = sceneId.split(':');
  const enemy = enemies.find((candidate) => candidate.id === enemyId);
  if (!enemy) {
    return createFixedScene(scenes.find((scene) => scene.id === returnSceneId) || scenes[0]);
  }
  const canWinMelee = hasWinningEncounterOption(enemy);
  const confidenceText = canWinMelee
    ? '你似乎有把握在近身戰勝對方。'
    : '你目前毫無把握戰勝。';
  const actionFeedbackSections = getCurrentEncounterActionFeedbackSections();
  const actionFeedback = getCurrentEncounterActionFeedback();
  const hasActionFeedback = actionFeedbackSections.length || actionFeedback;

  return {
    id: sceneId,
    title: '遭遇戰鬥',
    location: getSceneLocationLabel(returnSceneId),
    descriptionSections: [
      {
        type: 'heading',
        text: enemy.name
      },
      !hasActionFeedback ? {
        type: 'text',
        preserveText: true,
        text: createEncounterDescription(enemy)
      } : null,
      ...actionFeedbackSections,
      !actionFeedbackSections.length && actionFeedback ? {
        type: 'text',
        preserveText: true,
        text: actionFeedback
      } : null,
      {
        type: 'confidence',
        tone: canWinMelee ? 'safe' : 'danger',
        text: confidenceText
      },
      createEncounterDebugRows(enemy).length ? {
        type: 'infoRows',
        rows: createEncounterDebugRows(enemy)
      } : null
    ].filter(Boolean),
    choiceGroups: createEncounterChoiceGroups(enemy, returnSceneId)
  };
}

function getCurrentEncounterActionFeedback() {
  return String(gameState.exploration?.encounterState?.choiceFeedback || '').trim();
}

function getCurrentEncounterActionFeedbackSections() {
  const sections = gameState.exploration?.encounterState?.choiceFeedbackSections;
  return Array.isArray(sections) ? sections : [];
}

function createRangedActionFeedbackSections(feedbackMessage, hit) {
  const lines = String(feedbackMessage || '').split('\n');
  const markerIndex = lines.findIndex((line) => line === '命中。' || line === '沒有命中。');
  if (markerIndex < 0) {
    return [{
      type: 'text',
      preserveText: true,
      text: feedbackMessage
    }];
  }

  return [
    lines.slice(0, markerIndex).join('\n') ? {
      type: 'text',
      preserveText: true,
      text: lines.slice(0, markerIndex).join('\n')
    } : null,
    {
      type: 'confidence',
      tone: hit ? 'safe' : 'danger',
      text: lines[markerIndex]
    },
    lines.slice(markerIndex + 1).join('\n') ? {
      type: 'text',
      preserveText: true,
      text: lines.slice(markerIndex + 1).join('\n')
    } : null
  ].filter(Boolean);
}


function createEncounterDescription(enemy) {
  const detail = enemy.appearanceDescription || `牠從${enemy.region || '林子'}裡逼近，身影擋住了你的退路。`;
  const threat = enemy.threatDescription || `${enemy.name}盯著你，逼得你不敢分神。`;
  const opener = `你才剛察覺周圍的氣息有異，${enemy.name}就已經逼到眼前。`;
  const closer = `你只能收住腳步，盯著牠的一舉一動，連呼吸都不敢放得太重。`;
  return `${opener}\n${detail}\n${threat}\n${closer}`;
}

function createEncounterChoiceGroups(enemy, returnSceneId) {
  return [
    { title: '近身作戰', className: 'encounter-choice-group', choices: createEncounterWeaponChoices(enemy, returnSceneId), emptyLabel: '目前沒有可用的近身作戰選項。' },
    { title: '遠程作戰', className: 'encounter-choice-group', choices: createEncounterRangedChoices(enemy, returnSceneId), emptyLabel: '目前沒有可用的遠程作戰選項。' },
    { title: '戰術物品', className: 'encounter-choice-group', choices: createEncounterToolChoices(enemy, returnSceneId), emptyLabel: '目前沒有可用的戰術物品。' },
    { title: '其他', className: 'encounter-choice-group', choices: createEncounterOtherChoices(enemy, returnSceneId), emptyLabel: '目前沒有其他選擇。' }
  ];
}

function createEncounterToolChoices(enemy, returnSceneId) {
  const toolChoices = getOwnedCombatToolItems()
    .map((item) => ({
      id: `encounter_tool_${enemy.id}_${item.id}`,
      label: item.name || item.id,
      actionType: 'encounter',
      timeCostSeconds: 0,
      hideCost: true,
      progressOnly: true,
      progressScope: 'choices',
      progressLabel: getCombatToolProgressLabel(item.id),
      dynamicAction: 'encounterTool',
      enemyId: enemy.id,
      itemId: item.id,
      returnSceneId
    }));
  return toolChoices;
}

function getCombatToolProgressLabel(itemId) {
  if (itemId === 'trap') {
    return '佈置陷阱...';
  }
  if (itemId === 'torch') {
    return '點燃火把...';
  }
  if (itemId === 'capture_net') {
    return '張開補網...';
  }
  if (itemId === 'smoke_bomb') {
    return '拋出煙霧彈...';
  }
  return '準備戰術物品...';
}

function createEncounterWeaponChoices(enemy, returnSceneId) {
  const meleeChoices = getOwnedMeleeWeaponItems()
    .map((item) => ({
      id: `encounter_melee_${enemy.id}_${item.id}`,
      label: item.name || item.id,
      actionType: 'encounter',
      timeCostSeconds: 0,
      hideCost: true,
      progressOnly: true,
      progressScope: 'choices',
      progressLabel: getMeleeProgressLabel(item.id),
      dynamicAction: 'encounterMelee',
      enemyId: enemy.id,
      weaponId: item.id,
      returnSceneId
    }));

  return [
    ...meleeChoices,
    {
      id: `encounter_bare_${enemy.id}`,
      label: '徒手',
      actionType: 'encounter',
      timeCostSeconds: 0,
      hideCost: true,
      progressOnly: true,
      progressScope: 'choices',
      progressLabel: getMeleeProgressLabel(null),
      dynamicAction: 'encounterBareHands',
      enemyId: enemy.id,
      returnSceneId
    }
  ];
}

function getMeleeProgressLabel(weaponId) {
  if (weaponId === 'sword') {
    return '無畏揮砍...';
  }
  if (weaponId === 'soldier_spear') {
    return '衝鋒突刺...';
  }
  return '奮力搏鬥...';
}

function createEncounterRangedChoices(enemy, returnSceneId) {
  return getOwnedRangedWeaponItems()
    .map((item) => {
      const ammoItemId = getRangedWeaponAmmoItemId(item.id);
      const ammo = getItem(ammoItemId);
      const ammoCount = getInventoryCount(gameState.player.inventory, ammoItemId);
      const disabledReason = getEncounterRangedDisabledReason(enemy, item.id, ammoItemId);
      return {
        id: `encounter_ranged_${enemy.id}_${item.id}`,
        label: `${item.name || item.id}（${ammo?.name || ammoItemId} ${ammoCount}）`,
        actionType: 'encounter',
        timeCostSeconds: 0,
        hideCost: true,
        progressOnly: true,
        progressScope: 'choices',
        progressLabel: getRangedProgressLabel(item.id),
        dynamicAction: 'encounterRanged',
        enemyId: enemy.id,
        weaponId: item.id,
        ammoItemId,
        returnSceneId,
        disabledReason
      };
    });
}

function getRangedProgressLabel(weaponId) {
  if (weaponId === 'bow') {
    return '拉弓瞄準...';
  }
  if (weaponId === 'sling') {
    return '投擲投擲...';
  }
  return '準備遠程攻擊...';
}

function createEncounterOtherChoices(enemy, returnSceneId) {
  const choices = [];
  if (isEnemyWeaknessKnown(enemy?.id)) {
    choices.push({
      id: `encounter_sela_intel_${enemy.id}`,
      label: '賽拉的情報',
      actionType: 'knowledge',
      timeCostSeconds: 0,
      hideCost: true,
      dynamicAction: 'openSelaIntel',
      enemyId: enemy.id
    });
  }
  choices.push({
    id: `encounter_escape_${enemy.id}`,
    label: '逃跑',
    actionType: 'encounter',
    timeCostSeconds: 0,
    progressOnly: true,
    progressScope: 'choices',
    progressLabel: '尋找退路...',
    staminaCost: 1,
    dynamicAction: 'encounterEscape',
    enemyId: enemy.id,
    returnSceneId
  });
  return choices;
}

function getOwnedCombatToolItems() {
  return items
    .filter((item) => item.tags?.includes('戰鬥工具'))
    .filter((item) => item.category !== 'equipment')
    .filter((item) => getInventoryCount(gameState.player.inventory, item.id) > 0);
}

function getOwnedMeleeWeaponItems() {
  return items
    .filter((item) => item.tags?.includes('武器') && item.tags?.includes('近戰'))
    .filter((item) => getInventoryCount(gameState.player.inventory, item.id) > 0);
}

function getOwnedRangedWeaponItems() {
  return items
    .filter((item) => item.tags?.includes('武器') && item.tags?.includes('遠程'))
    .filter((item) => getInventoryCount(gameState.player.inventory, item.id) > 0);
}

function getRangedWeaponAmmoItemId(weaponId) {
  if (weaponId === 'bow') {
    return 'arrow';
  }
  if (weaponId === 'sling') {
    return 'stone_ammo';
  }
  return '';
}

function getRangedWeaponAmmoType(weaponId) {
  if (weaponId === 'bow') {
    return '箭矢';
  }
  if (weaponId === 'sling') {
    return '石頭';
  }
  return '無';
}

function getEncounterStateDifficulty(enemy) {
  return clampNumber(Number(gameState.exploration?.encounterState?.currentDifficulty ?? enemy?.difficulty ?? 0), 0, 999);
}

function getEncounterRangedDisabledReason(enemy, weaponId, ammoItemId) {
  if (gameState.exploration?.encounterState?.rangedFailed) {
    return '這次已經找不到遠程牽制的空隙。';
  }
  if (!ammoItemId || getInventoryCount(gameState.player.inventory, ammoItemId) <= 0) {
    return '缺少彈藥。';
  }
  return '';
}

function getRangedHitPower(enemy, weaponId) {
  const ammoType = getRangedWeaponAmmoType(weaponId);
  const skill = Number(gameState.player.rangedWeaponSkill || 0);
  const ammoBonus = enemy.effectiveAmmo === ammoType || enemy.effectiveAmmo === '兩者' ? 2 : 0;
  return skill + ammoBonus;
}

function doesRangedAttackHit(enemy, weaponId) {
  if (enemy.absoluteAmmoEvasion) {
    return false;
  }
  if (getRangedHitPower(enemy, weaponId) >= Number(enemy.rangedDodge || 0)) {
    return true;
  }
  return Math.random() < 0.33;
}

function hasWinningEncounterOption(enemy) {
  const meleeOptions = [
    ...getOwnedMeleeWeaponItems().map((item) => item.id),
    null
  ];
  return meleeOptions.some((weaponId) => isSafeEncounterResult(getMeleeEncounterResult(enemy, weaponId)));
}

function isSafeEncounterResult(result) {
  return ['great_victory', 'victory', 'minor_fail'].includes(result);
}

function createEncounterDebugRows(enemy) {
  if (!isDebugModeEnabled()) {
    return [];
  }

  const combatTools = getOwnedCombatToolItems();
  const meleeWeapons = getOwnedMeleeWeaponItems();
  const fearedToolNames = getEnemyFearedCombatTools(enemy)
    .map((itemId) => getItem(itemId)?.name || itemId)
    .join('、') || '無';
  const fearedWeaponNames = getEnemyFearedWeaponNames(enemy);
  const toolValues = combatTools.length
    ? combatTools.map((item) => {
      const result = getEnemyFearedCombatTools(enemy).includes(item.id) ? '大勝利' : getEncounterResultLabel(getMeleeEncounterResult(enemy, null));
      return `${item.name || item.id}:${result}`;
    }).join('；')
    : '無';
  const rangedWeapons = getOwnedRangedWeaponItems();
  const rangedValues = rangedWeapons.length
    ? rangedWeapons.map((item) => {
      const ammoType = getRangedWeaponAmmoType(item.id);
      const ammoItemId = getRangedWeaponAmmoItemId(item.id);
      const ammo = getItem(ammoItemId);
      const disabledReason = getEncounterRangedDisabledReason(enemy, item.id, ammoItemId);
      return `${item.name || item.id}:${ammoType} ${getInventoryCount(gameState.player.inventory, ammoItemId)}；命中 ${getRangedHitPower(enemy, item.id)}/${Number(enemy.rangedDodge || 0)}；未達標時33%${disabledReason ? `（${disabledReason}）` : ''}`;
    }).join('；')
    : '無';
  const meleeValues = [
    ...meleeWeapons.map((item) => `${item.name || item.id}:${getMeleeCombatPower(enemy, item.id)}(${getEncounterResultLabel(getMeleeEncounterResult(enemy, item.id))})`),
    `徒手:${getMeleeCombatPower(enemy, null)}(${getEncounterResultLabel(getMeleeEncounterResult(enemy, null))})`
  ].join('；');

  return [
    { label: 'Debug / 敵方戰力', value: `目前 ${getEncounterStateDifficulty(enemy)}；原始 ${Number(enemy.difficulty || 0)}；分類 ${enemy.category || '未知'}；遠程閃避 ${Number(enemy.rangedDodge || 0)}` },
    { label: 'Debug / 我方', value: `生命 ${gameState.player.life}/${gameState.player.maxLife}；體力 ${gameState.player.stamina}/${gameState.player.maxStamina}；近戰技能 ${Number(gameState.player.meleeWeaponSkill || 0)}；遠程技能 ${Number(gameState.player.rangedWeaponSkill || 0)}` },
    { label: 'Debug / 懼怕道具', value: fearedToolNames },
    { label: 'Debug / 懼怕武器', value: fearedWeaponNames },
    { label: 'Debug / 懼怕彈藥', value: enemy.effectiveAmmo || '無' },
    { label: 'Debug / 工具', value: toolValues },
    { label: 'Debug / 遠程', value: rangedValues },
    { label: 'Debug / 近戰', value: meleeValues }
  ];
}

function getEnemyFearedWeaponNames(enemy) {
  const effectiveType = enemy.effectiveMeleeWeapon || '無';
  if (effectiveType === '兩者') {
    return '老舊的劍、士兵長槍';
  }
  if (effectiveType === '劍') {
    return '老舊的劍';
  }
  if (effectiveType === '槍') {
    return '士兵長槍';
  }
  return '無';
}

function getEnemyFearedCombatTools(enemy) {
  const categoryDefaults = {
    '飛獸': ['capture_net'],
    '四足獸': ['trap'],
    '雙足獸': ['torch']
  };
  const defaults = categoryDefaults[enemy?.category] || [];
  return [...new Set([...defaults, ...(enemy?.fearedCombatTools || [])])];
}

function createEncounterReportScene() {
  const report = gameState.pendingEncounterReport || {};
  const enemy = enemies.find((candidate) => candidate.id === report.enemyId);
  const summary = report.summary || getEncounterReportText(enemy, report.resultCode) || '遭遇已結束。';
  const pendingLoot = normalizeInventory(report.pendingLoot || []);
  const descriptionSections = [
    {
      type: 'heading',
      text: getSimpleEncounterResultHeading(report.resultCode)
    },
    report.choiceFeedback ? {
      type: 'confidence',
      tone: report.choiceFeedbackTone === 'success' ? 'safe' : 'danger',
      text: report.choiceFeedback
    } : null,
    {
      type: 'text',
      text: summary
    }
  ].filter(Boolean);

  return {
    id: ENCOUNTER_REPORT_SCENE_ID,
    title: '戰鬥結果',
    location: getSceneLocationLabel(report.returnSceneId || EXPLORATION_SCENE_ID),
    descriptionSections,
    choices: [{
      id: 'confirm_encounter_report',
      label: pendingLoot.length ? '蒐集戰利品' : '確認',
      actionType: 'confirm',
      timeCostSeconds: 0,
      hideCost: true,
      dynamicAction: 'confirmEncounterReport'
    }]
  };
}

function getSimpleEncounterResultHeading(resultCode) {
  if (resultCode === 'minor_fail') {
    return '險勝';
  }
  if (resultCode === 'fail' || resultCode === 'major_fail') {
    return '失敗';
  }
  if (resultCode === 'escape') {
    return '逃脫';
  }
  return '勝利';
}

function resolveEncounterWithTool(enemyId, itemId, returnSceneId) {
  const enemy = enemies.find((candidate) => candidate.id === enemyId);
  const item = getItem(itemId);
  if (!enemy || !item || getInventoryCount(gameState.player.inventory, itemId) <= 0) {
    recordFailedAction({ id: `encounter_tool_${enemyId}_${itemId}`, label: '使用戰鬥工具' }, '你手上已經沒有這個道具了。');
    return;
  }
  if (itemId === 'smoke_bomb') {
    runTrackedAction({
      id: `encounter_tool_${enemyId}_${itemId}`,
      label: `使用${item.name}`,
      timeCostSeconds: 0
    }, () => {
      consumeEncounterItem(itemId);
      finishEncounter(returnSceneId, Math.floor((gameState.exploration?.dangerRate || 0) / 2), 'escape');
    }, { message: `你扔出${item.name}，趁著視線混亂從${enemy.name}面前脫身。` });
    saveGame(`你用${item.name}從${enemy.name}面前脫身。`);
    render();
    return;
  }
  if (!getEnemyFearedCombatTools(enemy).includes(itemId)) {
    const result = getMeleeEncounterResult(enemy, null);
    let pendingLoot = [];
    runTrackedAction({
      id: `encounter_tool_${enemyId}_${itemId}`,
      label: `${item.name}`,
      timeCostSeconds: 0
    }, () => {
      consumeEncounterItem(itemId);
      setEncounterChoiceFeedback(createIneffectiveToolFeedback(enemy, item), 'failed');
      pendingLoot = applyEncounterResult(enemy, result, returnSceneId);
    }, {
      status: 'failed'
    });
    attachPendingLootToLastAction(pendingLoot);
    saveGame(gameState.lastActionResult?.message || `你處理了${enemy.name}。`);
    render();
    return;
  }

  let pendingLoot = [];
  runTrackedAction({
    id: `encounter_tool_${enemyId}_${itemId}`,
    label: `使用${item.name}`,
    timeCostSeconds: 0
  }, () => {
    consumeEncounterItem(itemId);
    pendingLoot = grantEnemyLoot(enemy, true, true);
    setEncounterChoiceFeedback(createEffectiveToolFeedback(enemy, item), 'success');
    finishEncounter(returnSceneId, getPostCombatDangerRate(), 'great_victory', pendingLoot);
  }, {
    status: 'success'
  });
  attachPendingLootToLastAction(pendingLoot);
  saveGame(`你擊敗了${enemy.name}。`);
  render();
}

function resolveEncounterRanged(enemyId, weaponId, ammoItemId, returnSceneId) {
  const enemy = enemies.find((candidate) => candidate.id === enemyId);
  const weapon = getItem(weaponId);
  const ammo = getItem(ammoItemId);
  if (!enemy || !weapon) {
    recordFailedAction({ id: `encounter_ranged_${enemyId}_${weaponId}`, label: '遠程牽制' }, '敵人或武器資料不存在。');
    return;
  }
  const disabledReason = getEncounterRangedDisabledReason(enemy, weaponId, ammoItemId);
  if (disabledReason) {
    recordFailedAction({ id: `encounter_ranged_${enemyId}_${weaponId}`, label: weapon.name || '遠程牽制' }, disabledReason);
    return;
  }

  const hit = doesRangedAttackHit(enemy, weaponId);
  const nextRangedHitCount = Number(gameState.exploration?.encounterState?.rangedHitCount || 0) + 1;
  let feedbackMessage = '';
  let statusMessage = '';
  let pendingLoot = [];
  runTrackedAction({
    id: `encounter_ranged_${enemyId}_${weaponId}`,
    label: weapon.name || '遠程牽制',
    timeCostSeconds: 0
  }, () => {
    consumeEncounterItem(ammoItemId);
    if (!isDebugModeEnabled() && (ammoItemId === 'arrow' || ammoItemId === 'stone_ammo')) {
      changeInventoryItem(gameState.exploration.encounterState.rangedAmmoFired, ammoItemId, 1);
    }
    if (Math.random() < 0.25) {
      gameState.player.stamina = Math.max(0, gameState.player.stamina - 1);
    }
    if (!hit) {
      gameState.exploration.encounterState.rangedFailed = true;
      feedbackMessage = createRangedMissFeedback(enemy, weapon);
      statusMessage = `${enemy.name}沒有受到削弱。`;
      setEncounterActionFeedbackSections(createRangedActionFeedbackSections(feedbackMessage, hit));
      return;
    }
    const nextDifficulty = Math.max(0, getEncounterStateDifficulty(enemy) - 1);
    gameState.exploration.encounterState.currentDifficulty = nextDifficulty;
    gameState.exploration.encounterState.rangedHitCount = nextRangedHitCount;
    feedbackMessage = createRangedHitFeedback(enemy, weapon, nextRangedHitCount);
    statusMessage = `${enemy.name}受傷了，動作被削弱。`;
    setEncounterActionFeedbackSections(createRangedActionFeedbackSections(feedbackMessage, hit));
    if (nextDifficulty <= 0 || nextRangedHitCount >= 3) {
      pendingLoot = grantEnemyLoot(enemy, true, true);
      statusMessage = `${enemy.name}被遠程攻擊擊倒。`;
      setEncounterChoiceFeedback(createRangedVictoryFeedback(weapon), 'success');
      finishEncounter(returnSceneId, getPostCombatDangerRate(), 'great_victory', pendingLoot);
    }
  }, {
    status: createRangedFeedbackStatus(enemy, weapon, hit)
  });
  if (statusMessage && gameState.lastActionResult) {
    gameState.lastActionResult.message = statusMessage;
    gameState.lastActionResult.messageLabel = '敵人';
    gameState.lastActionResult.showMessageWhenPresent = true;
  }
  attachPendingLootToLastAction(pendingLoot);
  saveGame(gameState.lastActionResult?.message || '你嘗試遠程牽制。');
  render();
}

function consumeEncounterItem(itemId) {
  if (isDebugModeEnabled()) {
    return;
  }
  changeInventoryItem(gameState.player.inventory, itemId, -1);
}

function resolveEncounterMelee(enemyId, weaponId, returnSceneId) {
  const enemy = enemies.find((candidate) => candidate.id === enemyId);
  if (!enemy) {
    recordFailedAction({ id: `encounter_melee_${enemyId}`, label: '近戰處理' }, '敵人資料不存在。');
    return;
  }

  const result = getMeleeEncounterResult(enemy, weaponId);
  let pendingLoot = [];

  runTrackedAction({
    id: `encounter_melee_${enemyId}_${weaponId || 'bare'}`,
    label: weaponId ? `${getItem(weaponId)?.name || '近戰武器'}` : '徒手',
    timeCostSeconds: 0
  }, () => {
    setEncounterChoiceFeedback(createMeleeChoiceFeedback(enemy, weaponId), createMeleeChoiceFeedbackStatus(enemy, weaponId));
    pendingLoot = applyEncounterResult(enemy, result, returnSceneId);
  }, {
    status: createMeleeChoiceFeedbackStatus(enemy, weaponId)
  });
  attachPendingLootToLastAction(pendingLoot);
  saveGame(gameState.lastActionResult?.message || `你處理了${enemy.name}。`);
  render();
}

function getMeleeEncounterResult(enemy, weaponId) {
  return getMeleeEncounterResultForDifficulty(enemy, weaponId, getEncounterStateDifficulty(enemy));
}

function getMeleeEncounterResultForDifficulty(enemy, weaponId, difficulty) {
  const power = getMeleeCombatPower(enemy, weaponId);
  const delta = power - Number(difficulty || 0);
  return delta > 0
    ? 'victory'
    : delta === 0
      ? 'minor_fail'
      : delta >= -2
        ? 'fail'
        : 'major_fail';
}

function escapeEncounter(enemyId, returnSceneId) {
  const enemy = enemies.find((candidate) => candidate.id === enemyId);
  runTrackedAction({
    id: `encounter_escape_${enemyId}`,
    label: '逃跑',
    timeCostSeconds: 0
  }, () => {
    gameState.player.stamina = Math.max(0, gameState.player.stamina - 1);
    const escaped = isGiantEnemy(enemy) || randomInt(1, 100) <= 50;
    if (escaped) {
      setEncounterChoiceFeedback('逃脫成功。', 'success');
      finishEncounter(returnSceneId, Math.floor((gameState.exploration?.dangerRate || 0) / 2), 'escape');
      return;
    }
    gameState.player.life = Math.max(0, gameState.player.life - 1);
    if (gameState.player.life <= 0) {
      applyExplorationFailure('major_fail');
      return;
    }
    const escapeFailCount = Number(gameState.exploration?.encounterState?.escapeFailCount || 0) + 1;
    gameState.exploration.encounterState.escapeFailCount = escapeFailCount;
    setEncounterActionFeedbackSections([
      {
        type: 'confidence',
        tone: 'danger',
        text: '逃脫失敗。'
      },
      {
        type: 'text',
        preserveText: true,
        text: createEscapeFailureFeedback(enemy, escapeFailCount)
      }
    ]);
  }, { message: enemy ? `你試圖從${enemy.name}面前逃跑。` : '你試圖從敵人面前逃跑。' });
  saveGame(enemy ? `你嘗試從${enemy.name}面前逃跑。` : '你嘗試從敵人面前逃跑。');
  render();
}

function isGiantEnemy(enemy) {
  return enemy?.category === '巨獸';
}

function createEscapeFailureFeedback(enemy, failCount = 1) {
  const enemyName = enemy?.name || '敵人';
  if (failCount === 2) {
    return `你再次試著從${enemyName}面前脫身，卻被牠追著壓回原位。\n你踩過一片鬆軟濕泥，腳步一滑，肩側被牠逼近時擦出疼痛。\n距離沒有拉開，反而讓你的呼吸變得更急。`;
  }
  if (failCount >= 3) {
    return `你咬牙再退，想從${enemyName}的追擊裡擠出一條路。\n牠沒有給你那個空隙，沉重的逼近感一次次把你趕回危險裡。\n你身上又添了一道傷，連站穩都變得更吃力。`;
  }
  return `你試著從${enemyName}面前脫身，卻沒能順利拉開距離。\n牠立刻追了上來，逼得你在濕滑的落葉間踉蹌退避。\n你被牠追擊時擦傷，呼吸也被迫亂了節奏。`;
}

function confirmEncounterReport() {
  const report = gameState.pendingEncounterReport || {};
  const pendingLoot = normalizeInventory(report.pendingLoot || []);
  const returnSceneId = report.returnSceneId || EXPLORATION_SCENE_ID;
  if (pendingLoot.length) {
    if (!gameState.exploration) {
      gameState.exploration = normalizeExplorationState({});
    }
    gameState.exploration.temporaryLoot = cloneInventory(pendingLoot);
    ensureForageLootDraft(returnSceneId, true);
    gameState.pendingEncounterReport = null;
    gameState.currentSceneId = `battleLoot:${returnSceneId}`;
    clearActionResultDisplay();
    saveGame();
    render();
    return;
  }

  gameState.pendingEncounterReport = null;
  gameState.currentSceneId = returnSceneId;
  clearActionResultDisplay();
  saveGame();
  render();
}

function applyEncounterResult(enemy, result, returnSceneId) {
  if (result === 'victory') {
    gameState.player.stamina = Math.max(0, gameState.player.stamina - 1);
    const pendingLoot = grantEnemyLoot(enemy, false, true);
    finishEncounter(returnSceneId, getPostCombatDangerRate(), result, pendingLoot);
    return pendingLoot;
  }

  if (result === 'minor_fail') {
    gameState.player.life = Math.max(0, gameState.player.life - 1);
    gameState.player.stamina = Math.max(0, gameState.player.stamina - 1);
    const pendingLoot = grantEnemyLoot(enemy, false, false);
    if (gameState.player.life <= 0) {
      applyExplorationFailure(result);
      return pendingLoot;
    }
    finishEncounter(returnSceneId, getPostCombatDangerRate(), result, pendingLoot);
    return pendingLoot;
  }

  if (result === 'fail') {
    gameState.player.life = Math.max(0, gameState.player.life - 2);
    gameState.player.stamina = Math.max(0, gameState.player.stamina - 1);
    if (gameState.player.life <= 0) {
      applyExplorationFailure(result);
      return;
    }
    finishEncounter(returnSceneId, getPostCombatDangerRate(), result);
    return [];
  }

  gameState.player.life = 0;
  gameState.player.stamina = 0;
  applyExplorationFailure(result);
  return [];
}

function finishEncounter(returnSceneId, nextDangerRate = 0, resultCode = '', pendingLoot = []) {
  const enemyId = gameState.exploration?.encounterState?.enemyId || null;
  const shouldKeepChoiceFeedback = resultCode !== 'escape' || gameState.exploration?.encounterState?.choiceFeedback === '逃脫成功。';
  const choiceFeedback = shouldKeepChoiceFeedback ? gameState.exploration?.encounterState?.choiceFeedback || '' : '';
  const choiceFeedbackTone = shouldKeepChoiceFeedback ? gameState.exploration?.encounterState?.choiceFeedbackTone || '' : '';
  rememberEncounteredEnemy(enemyId);
  recoverEncounterRangedAmmo();
  if (gameState.exploration) {
    gameState.exploration.encounterState = null;
    gameState.exploration.dangerRate = clampNumber(nextDangerRate, 0, 100);
  }
  gameState.pendingEncounterReport = {
    enemyId,
    returnSceneId: returnSceneId || EXPLORATION_SCENE_ID,
    summary: getEncounterReportText(enemies.find((candidate) => candidate.id === enemyId), resultCode),
    resultCode,
    choiceFeedback,
    choiceFeedbackTone,
    pendingLoot: normalizeInventory(pendingLoot || [])
  };
  gameState.currentSceneId = ENCOUNTER_REPORT_SCENE_ID;
}

function setEncounterChoiceFeedback(message, tone = '') {
  if (!gameState.exploration?.encounterState) {
    return;
  }
  gameState.exploration.encounterState.choiceFeedback = message || '';
  gameState.exploration.encounterState.choiceFeedbackTone = tone || '';
  gameState.exploration.encounterState.choiceFeedbackSections = [];
}

function setEncounterActionFeedbackSections(sections = []) {
  if (!gameState.exploration?.encounterState) {
    return;
  }
  gameState.exploration.encounterState.choiceFeedback = '';
  gameState.exploration.encounterState.choiceFeedbackTone = '';
  gameState.exploration.encounterState.choiceFeedbackSections = sections.filter(Boolean);
}

function getPostCombatDangerRate() {
  return clampNumber(Number(gameState.exploration?.dangerRate || 0) - 30, 0, 100);
}

function recoverEncounterRangedAmmo() {
  const firedAmmo = normalizeInventory(gameState.exploration?.encounterState?.rangedAmmoFired || []);
  if (!firedAmmo.length) {
    return {};
  }
  const rangedSkill = Number(gameState.player.rangedWeaponSkill || 0);
  const recoveryRate = clampNumber((10 + rangedSkill * 3) / 100, 0, 1);
  const recoveredItems = {};
  for (const entry of firedAmmo) {
    for (let index = 0; index < Number(entry.count || 0); index += 1) {
      if (Math.random() < recoveryRate) {
        recoveredItems[entry.itemId] = (recoveredItems[entry.itemId] || 0) + 1;
      }
    }
  }
  for (const [itemId, count] of Object.entries(recoveredItems)) {
    changeInventoryItem(gameState.player.inventory, itemId, count);
  }
  return recoveredItems;
}

function grantEnemyLoot(enemy, includeAllSpecial, allowSpecialRoll = true) {
  const pendingLoot = [];
  if (enemy.loot?.common) {
    changeInventoryItem(pendingLoot, enemy.loot.common, 1);
  }
  for (const itemId of enemy.loot?.special || []) {
    if (includeAllSpecial || (allowSpecialRoll && Math.random() < 0.5)) {
      changeInventoryItem(pendingLoot, itemId, 1);
    }
  }
  return normalizeInventory(pendingLoot);
}

function attachPendingLootToLastAction(pendingLoot = []) {
  const loot = normalizeInventory(pendingLoot || []);
  if (!loot.length || !gameState.lastActionResult) {
    return;
  }
  gameState.lastActionResult.pendingLoot = loot;
}

function getMeleeCombatPower(enemy, weaponId) {
  const skillBonus = Number(gameState.player.meleeWeaponSkill || 0) > 0 ? 1 : 0;
  if (!weaponId) {
    return skillBonus;
  }

  const effectiveType = enemy.effectiveMeleeWeapon || '無';
  const weaponType = weaponId === 'soldier_spear' ? '槍' : weaponId === 'sword' ? '劍' : '無';
  const weaponBonus = effectiveType === '兩者' || effectiveType === weaponType ? 2 : 0;
  return weaponBonus + skillBonus;
}

function createEffectiveToolFeedback(enemy, item) {
  return `使用${item.name}應對${enemy.name}發揮了極大的功效。`;
}

function createIneffectiveToolFeedback(enemy, item) {
  return `使用${item.name}應對${enemy.name}絲毫沒有作用。`;
}

function createRangedHitFeedback(enemy, weapon, hitCount) {
  const { action, actionSuffix, ammoName } = getRangedAttackWording(weapon);
  const projectileName = ammoName || '攻擊';
  if (hitCount === 1) {
    const reaction = isEffectiveRangedChoice(enemy, weapon?.id)
      ? `${enemy.name}的動作被打亂，逼近的節奏慢了一些。`
      : `${enemy.name}被迫偏開身體，動作受到一點牽制。`;
    return `你${action}${enemy.name}${actionSuffix}。\n命中。\n${projectileName}擊中了牠。\n這是你這次遭遇中第 1 次命中。\n${reaction}`;
  }
  if (hitCount === 2) {
    const reaction = isEffectiveRangedChoice(enemy, weapon?.id)
      ? `${enemy.name}原本要重新壓近，卻在受擊後失去節奏，腳步明顯亂了一拍。`
      : `${enemy.name}吃痛退偏，牠的攻勢還沒停下，但你已經看見牠動作裡的破口。`;
    return `你沒有放過牠重新撲上的空隙，再次${action}${enemy.name}${actionSuffix}。\n命中。\n${projectileName}第二次擊中了牠。\n這已經是你這次遭遇中第 2 次命中。\n${reaction}`;
  }
  return `你抓住牠動作變慢的瞬間，第三次${action}${enemy.name}${actionSuffix}。\n命中。\n${projectileName}再次擊中了牠。\n連續的遠程攻擊終於讓${enemy.name}支撐不住。`;
}

function createRangedMissFeedback(enemy, weapon) {
  const { action, actionSuffix, ammoName } = getRangedAttackWording(weapon);
  if (enemy.absoluteAmmoEvasion) {
    return `你${action}${enemy.name}${actionSuffix}。\n沒有命中。\n${ammoName || '攻擊'}掠過牠身側。\n牠像早就讀出你的動作，幾乎沒有被迫停下，反而更快把距離壓回來。`;
  }
  return `你${action}${enemy.name}${actionSuffix}。\n沒有命中。\n${ammoName || '攻擊'}擦過牠附近。\n牠的動作沒有被你拖慢。`;
}

function createRangedVictoryFeedback(weapon) {
  return `你用${weapon?.name || '遠程武器'}完美地壓制對手。`;
}

function getRangedAttackWording(weapon) {
  const ammoItemId = getRangedWeaponAmmoItemId(weapon?.id);
  const ammoName = getItem(ammoItemId)?.name || '';
  if (weapon?.id === 'bow') {
    return { action: `舉起${weapon.name || '獵弓'}，朝`, actionSuffix: '射擊', ammoName };
  }
  if (weapon?.id === 'sling') {
    return { action: `甩動${weapon.name || '投石索'}，朝`, actionSuffix: '投擲', ammoName };
  }
  return { action: `用${weapon?.name || '遠程武器'}朝`, actionSuffix: '攻擊', ammoName };
}

function createRangedFeedbackStatus(enemy, weapon, hit) {
  return hit && isEffectiveRangedChoice(enemy, weapon?.id) ? 'success' : 'failed';
}

function createMeleeChoiceFeedback(enemy, weaponId) {
  const methodName = weaponId ? getItem(weaponId)?.name || '近戰武器' : '徒手';
  return isEffectiveMeleeChoice(enemy, weaponId)
    ? `使用${methodName}作戰時發揮些許優勢。`
    : `使用${methodName}作戰並不順遂。`;
}

function createMeleeChoiceFeedbackStatus(enemy, weaponId) {
  return isEffectiveMeleeChoice(enemy, weaponId) ? 'success' : 'failed';
}

function isEffectiveMeleeChoice(enemy, weaponId) {
  if (!weaponId) {
    return false;
  }
  const effectiveType = enemy?.effectiveMeleeWeapon || '無';
  const weaponType = weaponId === 'soldier_spear' ? '槍' : weaponId === 'sword' ? '劍' : '無';
  return effectiveType === '兩者' || effectiveType === weaponType;
}

function isEffectiveRangedChoice(enemy, weaponId) {
  const ammoType = getRangedWeaponAmmoType(weaponId);
  return Boolean(ammoType && (enemy?.effectiveAmmo === ammoType || enemy?.effectiveAmmo === '兩者'));
}

function getEncounterReportText(enemy, result) {
  if (!enemy) {
    return '';
  }
  if (enemy.id === BLACK_SHADOW_ENEMY_ID) {
    const shadowMessages = {
      great_victory: `火把的光往前一壓，${enemy.name}像被撕開的夜色一樣扭曲、散去。周圍沒有屍體，也沒有能帶走的東西，只剩焦熱火光和你還沒平穩下來的呼吸。`,
      victory: `你勉強撐過了${enemy.name}逼近的那段時間。牠退去時沒有留下任何痕跡，像剛才纏住你的只是一塊活著的黑暗。`,
      minor_fail: `你從${enemy.name}的壓迫中撐了過來，身上卻留下清楚的疼痛。牠消失得太乾淨，地上沒有血，也沒有任何能證明你剛才真的傷到牠的東西。`,
      fail: `${enemy.name}逼得你連連後退，你最後只能從那片黑暗前脫身。等你重新站穩時，牠已經融回林間，什麼也沒有留下。`,
      major_fail: `${enemy.name}壓下來時，四周的聲音像被夜色吞掉。你很快失去方向，意識也在冰冷與疼痛中斷開。`,
      escape: `你沒有再和${enemy.name}硬撐，而是抓住空隙撤開。直到火光或月色重新落進眼裡，你才確認自己真的離開了那片黑暗。`
    };
    return shadowMessages[result] || '';
  }
  const messages = {
    great_victory: `你幾乎是在掌握節奏的情況下壓制了${enemy.name}。牠倒下後，你還留有明顯餘裕，得以穩住呼吸、整理現場，順手把能帶走的素材收進包裡。`,
    victory: `你和${enemy.name}正面周旋了一陣，牠的力道確實逼得你不敢鬆懈，但你的準備與判斷仍然略勝一籌。最後你成功把牠壓了下去，雖然消耗不小，還是來得及收拾可用的戰利品再離開。`,
    minor_fail: `你和${enemy.name}幾乎勢均力敵，牠每一次撲擊都差點突破你的防線。你最後勉強抓到空隙把牠逼退，但身上也留下明顯傷勢，只能忍著痛把眼前來得及拿的東西收一收。`,
    fail: `${enemy.name}的衝勢明顯壓過你，你的武器、體力或判斷都不足以真正控制局面。你只能在一陣狼狽拉扯後逼牠退開，已經沒有餘力慢慢處理現場，只能帶著疼痛倉促脫身。`,
    major_fail: `${enemy.name}和你之間的戰力差距太大，你的防線很快就被牠徹底擊潰。你被撞倒在地，連掙扎都來不及，意識就在混亂與劇痛中斷掉，之後發生的事只剩下一片空白。`,
    escape: `你沒有再硬撐下去，而是抓住那一瞬間的空檔從${enemy.name}面前脫身。等距離終於拉開時，你才敢重新調整呼吸，帶著還沒散去的緊張感繼續撤離。`
  };
  return messages[result] || '';
}

function getEncounterResultLabel(result) {
  const labels = {
    great_victory: '大勝利',
    victory: '勝利',
    minor_fail: '險勝',
    fail: '失敗',
    major_fail: '大失敗',
    escape: '逃脫'
  };
  return labels[result] || '';
}

function applyExplorationFailure(resultCode = 'major_fail') {
  const enemyId = gameState.exploration?.encounterState?.enemyId || null;
  showSceneTransition({ transition: 'fade' }).then(() => finishSceneTransition());
  if (!startEvent('exploration_defeat_return', {
    returnSceneId: 'dormitory',
    triggerType: 'explorationDefeat',
    triggerSourceId: enemyId || resultCode,
    triggerContextKey: `explorationDefeat:${enemyId || 'unknown'}:${resultCode}`
  })) {
    recoverEncounterRangedAmmo();
    clearExplorationState();
    gameState.time.day += 1;
    gameState.time.secondsOfDay = RESET_SECOND;
    processDailyReset();
    gameState.player.life = Math.max(1, gameState.player.life);
    gameState.currentSceneId = 'dormitory';
  }
}

function render() {
  if (gameState.gameState === 'game_over') {
    renderGameOver();
    renderSidebar();
    return;
  }

  const scene = getCurrentScene();
  elements.sceneLocation.textContent = formatSceneBreadcrumb(scene);
  renderSceneKicker(scene);
  elements.sceneTitle.textContent = scene.title;
  elements.sceneTitle.hidden = Boolean(scene.adventureStatus);
  renderSceneSubtitle(scene.subtitle);
  renderSceneTimebar(scene);
  renderMainDescription(scene);
  renderFacilityStatusPanel(scene);
  renderInfoPanel(scene);
  renderAdventureStatus(scene);
  elements.choiceList.replaceChildren(...createChoiceGroups(scene));
  renderSidebar();
}

function renderGameOver() {
  elements.sceneLocation.textContent = '遊戲結束';
  renderSceneKicker({});
  elements.sceneTitle.textContent = '你倒下了';
  elements.sceneTitle.hidden = false;
  renderSceneSubtitle('');
  renderSceneTimebar({});
  renderMainDescription({
    description: '你的意識終於撐不住了，只剩下一片發黑的沉重寂靜。若還想再走下去，只能從頭來過，或喚回先前留下的記錄。'
  });
  renderFacilityStatusPanel({});
  renderInfoPanel({});
  renderAdventureStatus({});
  elements.choiceList.replaceChildren();
}

function renderMainDescription(scene = {}) {
  const sections = Array.isArray(scene.descriptionSections) ? scene.descriptionSections : [];
  if (!sections.length) {
    elements.sceneDescription.className = '';
    elements.sceneDescription.textContent = formatMainDescriptionText(applyTextTemplate(scene.description || ''));
    return;
  }

  elements.sceneDescription.className = 'scene-description-structured';
  elements.sceneDescription.replaceChildren(...sections
    .map((section) => createMainDescriptionSection(section))
    .filter(Boolean));
}

function createMainDescriptionSection(section = {}) {
  if (section.type === 'heading') {
    const heading = document.createElement('h2');
    heading.className = 'scene-description-heading';
    const label = String(section.label || '').trim();
    if (label) {
      const labelElement = document.createElement('span');
      labelElement.className = 'scene-description-heading-label';
      labelElement.textContent = label;
      heading.append(labelElement);
    }
    heading.append(document.createTextNode(applyTextTemplate(section.text || '')));
    return heading;
  }

  if (section.type === 'infoRows') {
    const rows = Array.isArray(section.rows) ? section.rows : [];
    if (!rows.length) {
      return null;
    }
    const wrapper = document.createElement('div');
    wrapper.className = 'scene-description-info';
    wrapper.replaceChildren(...rows.map((row) => createMainDescriptionInfoRow(row)));
    return wrapper;
  }

  if (section.type === 'confidence') {
    const text = applyTextTemplate(section.text || '');
    if (!String(text).trim()) {
      return null;
    }
    const paragraph = document.createElement('p');
    paragraph.className = `scene-description-confidence scene-description-confidence-${section.tone || 'neutral'}`;
    paragraph.textContent = section.preserveText ? text : formatMainDescriptionText(text);
    return paragraph;
  }

  const text = applyTextTemplate(section.text || '');
  if (!String(text).trim()) {
    return null;
  }
  const paragraph = document.createElement('p');
  paragraph.className = ['scene-description-text', section.className || ''].filter(Boolean).join(' ');
  paragraph.textContent = section.preserveText ? text : formatMainDescriptionText(text);
  return paragraph;
}

function createMainDescriptionInfoRow(row = {}) {
  const item = document.createElement('div');
  item.className = 'scene-description-info-row';
  const label = document.createElement('span');
  label.className = 'scene-description-info-label';
  label.textContent = row.label || '';
  const value = document.createElement('strong');
  value.className = 'scene-description-info-value';
  value.textContent = applyTextTemplate(row.value || '');
  item.append(label, value);
  return item;
}

function renderFacilityStatusPanel(scene = {}) {
  const rows = (scene.facilityStatusRows || [])
    .filter((row) => row && String(row.value || '').trim());
  if (!rows.length) {
    elements.facilityStatus.hidden = true;
    elements.facilityStatus.replaceChildren();
    return;
  }

  elements.facilityStatus.hidden = false;
  elements.facilityStatus.replaceChildren(...rows.map(createFacilityStatusRow));
}

function createFacilityStatusRow(row = {}) {
  const item = document.createElement('div');
  item.className = 'facility-status-row';
  const label = document.createElement('span');
  label.className = 'facility-status-label';
  label.textContent = row.label || '狀態';
  const value = document.createElement('strong');
  value.className = 'facility-status-value';
  value.textContent = applyTextTemplate(row.value || '');
  item.append(label, value);
  return item;
}

function renderSceneSubtitle(subtitle) {
  const text = String(subtitle || '').trim();
  elements.sceneSubtitle.textContent = text;
  elements.sceneSubtitle.hidden = !text;
}

function renderSceneTimebar(scene = {}) {
  elements.sceneTimebar.hidden = isEventSceneId(scene.id) || scene.id === NAME_PROTAGONIST_SCENE_ID;
}

function renderSceneKicker(scene = {}) {
  elements.sceneLocation.hidden = isEventSceneId(scene.id) || scene.id === NAME_PROTAGONIST_SCENE_ID;
}

function formatMainDescriptionText(text) {
  return String(text || '')
    .replace(/\r\n/g, '\n')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function normalizeProtagonistName(value) {
  return String(value || '').trim().slice(0, 12);
}

function getProtagonistName() {
  return normalizeProtagonistName(gameState?.player?.name) || DEFAULT_PROTAGONIST_NAME;
}

function applyTextTemplate(text) {
  return String(text || '')
    .replaceAll('{playerName}', getProtagonistName())
    .replaceAll('{protagonistName}', getProtagonistName());
}

function renderInfoPanel(scene = {}) {
  const result = gameState.lastActionResult;
  const rows = result ? createActionResultRows(result) : [];
  if (actionResultVisible && result && rows.length) {
    elements.actionResult.hidden = false;
    elements.actionResult.className = `action-result action-result-${result.status || 'success'}`;
    elements.actionResult.replaceChildren(...rows);
    return;
  }

    elements.actionResult.hidden = true;
    elements.actionResult.replaceChildren();
    elements.actionResult.className = 'action-result';
}

function renderAdventureStatus(scene = {}) {
  const status = scene.adventureStatus;
  if (!status) {
    elements.adventureStatus.hidden = true;
    elements.adventureStatus.replaceChildren();
    return;
  }

  const progress = clampNumber(Number(status.progress || 0), 0, 100);
  const dangerRate = clampNumber(Number(status.dangerRate || 0), 0, 100);
  const statusItems = [
    createAdventureStatusItem('探索區域', status.region || getCurrentRegionLabel()),
    createAdventureStatusMeter('深入程度', progress, `${formatNumber(progress)}%`),
    createAdventureStatusMeter('當前危機感知', dangerRate, `${formatNumber(dangerRate)}%`, 'danger')
  ];
  elements.adventureStatus.hidden = false;
  elements.adventureStatus.replaceChildren(...statusItems);
}

function createAdventureStatusItem(label, value) {
  const item = document.createElement('div');
  item.className = 'adventure-status-item';
  const labelElement = document.createElement('span');
  labelElement.className = 'adventure-status-label';
  labelElement.textContent = label;
  const valueElement = document.createElement('strong');
  valueElement.className = 'adventure-status-value';
  valueElement.textContent = value;
  item.append(labelElement, valueElement);
  return item;
}

function createAdventureStatusMeter(label, value, text, tone = '') {
  const item = createAdventureStatusItem(label, text);
  if (tone) {
    item.classList.add(`adventure-status-${tone}`);
  }
  const track = document.createElement('span');
  track.className = 'adventure-status-track';
  const bar = document.createElement('span');
  bar.className = 'adventure-status-bar';
  bar.style.width = `${clampNumber(value, 0, 100)}%`;
  track.append(bar);
  item.append(track);
  return item;
}

function createActionResultRows(result) {
  const rows = [];

  if (result.timeDeltaSeconds) {
    rows.push(createActionResultLine('時間', `經過${formatDuration(result.timeDeltaSeconds)}${formatCurrentTimeSuffix(result.timeDeltaSeconds)}`));
  }
  if (result.changes?.location) {
    rows.push(createActionResultLine('位置', `移動到${result.changes.location.afterName}`));
  }
  if (result.changes?.life) {
    rows.push(createActionResultLine('生命', formatNumberChange(result.changes.life)));
  }
  if (result.changes?.stamina) {
    rows.push(createActionResultLine('體力', formatNumberChange(result.changes.stamina)));
  }
  if (result.changes?.contribution) {
    rows.push(createActionResultLine('貢獻', formatNumberChange(result.changes.contribution)));
  }
  if (result.changes?.skills?.length) {
    rows.push(...result.changes.skills.map((change) => createActionResultLine(change.name, formatNumberChange(change))));
  }
  if (result.changes?.recipes?.length) {
    rows.push(createActionResultLine('學會配方', result.changes.recipes.map((change) => change.name).join('、')));
  }
  if (result.changes?.items?.length) {
    rows.push(createActionResultLine('物品', result.changes.items.map(formatInventoryChange).join('、')));
  }
  if (result.pendingLoot?.length) {
    rows.push(createActionResultLine('戰利品', formatInventory(result.pendingLoot)));
  }
  if (result.changes?.affection?.length) {
    rows.push(...result.changes.affection.map((change) => createActionResultLine(`${change.name}好感`, formatNumberChange(change))));
  }
  const visibleFlagDescriptions = getVisibleFlagChangeDescriptions(result.changes?.flags || []);
  if (visibleFlagDescriptions.length) {
    rows.push(createActionResultLine('狀態', visibleFlagDescriptions.join('、')));
  }
  if (result.changes?.facilities?.length) {
    rows.push(createActionResultLine('設施', result.changes.facilities.map(formatFacilityChange).join('、')));
  }
  if (result.changes?.tradeStocks?.length) {
    rows.push(createActionResultLine('商店庫存', result.changes.tradeStocks.map(formatDeltaChange).join('、')));
  }
  if (result.message && (result.showMessageWhenPresent || !rows.length)) {
    rows.push(createActionResultLine(result.messageLabel || '結果', result.message));
  } else if (result.status === 'failed' && !rows.length) {
    rows.push(createActionResultLine('結果', '行動失敗。'));
  }

  return rows;
}

function getVisibleFlagChangeDescriptions(flagChanges) {
  return (flagChanges || [])
    .filter((flag) => flag.visible && flag.description)
    .map((flag) => flag.description);
}

function createActionResultLine(labelText, valueText) {
  const row = document.createElement('div');
  const label = document.createElement('span');
  const value = document.createElement('strong');
  label.textContent = labelText;
  value.textContent = valueText;
  row.append(label, value);
  return row;
}

function formatNumberChange(change) {
  return `${change.before} → ${change.after}（${formatSignedNumber(change.delta)}）`;
}

function formatDeltaChange(change) {
  return `${change.name} ${formatSignedNumber(change.delta)}`;
}

function formatInventoryChange(change) {
  return `${change.name} ${formatSignedNumber(change.delta)}（目前 ${formatNumber(change.after || 0)}）`;
}

function formatFacilityChange(change) {
  const keyLabel = {
    level: '等級',
    progress: '進度',
    capacityWeight: '容量',
    unlocked: '解鎖'
  }[change.key] || change.key;
  if (change.key === 'progress') {
    return `${change.name}${keyLabel}：${formatProgressPercent(change.before)}% → ${formatProgressPercent(change.after)}%`;
  }
  return `${change.name}${keyLabel}：${formatValue(change.before)} → ${formatValue(change.after)}`;
}

function formatValue(value) {
  if (typeof value === 'boolean') {
    return value ? '是' : '否';
  }
  if (value === undefined || value === null) {
    return '無';
  }
  return String(value);
}

function formatCurrentTimeSuffix(deltaSeconds) {
  return deltaSeconds >= 86400 || gameState.lastActionResult?.timeDeltaSeconds >= 3600
    ? `，現在第 ${gameState.time.day} 天 ${formatTime(gameState.time.secondsOfDay)}`
    : '';
}

function createChoiceGroups(scene) {
  const choices = scene.choices || [];
  const groups = scene.choiceGroups || groupChoicesByLabel(choices);
  const visibleGroups = groups
    .map((group) => {
      if (group.type === 'tradeRows') {
        return {
          ...group,
          rows: (group.rows || []).filter(Boolean)
        };
      }
      return {
        ...group,
        choices: (group.choices || []).filter((choice) => choice && isChoiceVisible(choice))
      };
    })
    .filter((group) => {
      if (group.type === 'nameInput') {
        return true;
      }
      if (group.type === 'tradeRows') {
        return group.rows.length || group.emptyLabel;
      }
      if (group.type === 'storageRows') {
        return group.rows.length || group.emptyLabel;
      }
      if (group.type === 'tradeSummary') {
        return (group.lines || []).length;
      }
      return group.choices.length || group.emptyLabel;
    });
  const hideSingleCategoryLabel = visibleGroups.length === 1 && !visibleGroups[0].type;
  return visibleGroups
    .map((group) => {
      if (group.type === 'waitSlider') return createWaitSliderGroup(group);
      if (group.type === 'sleepSlider') return createSleepSliderGroup(group);
      if (group.type === 'tradeRows') return createTradeRowGroup(group);
      if (group.type === 'storageRows') return createStorageRowGroup(group);
      if (group.type === 'tradeSummary') return createTradeSummaryGroup(group);
      if (group.type === 'nameInput') return createNameInputGroup(group);
      return createChoiceGroup({
        ...group,
        hideCategoryLabel: hideSingleCategoryLabel
      });
    });
}

function createNameInputGroup(group) {
  const section = document.createElement('section');
  section.className = 'choice-group name-input-group';

  const title = document.createElement('h2');
  title.className = 'choice-group-title';
  title.textContent = group.title || '名字';

  const form = document.createElement('form');
  form.className = 'name-input-form';

  const input = document.createElement('input');
  input.className = 'name-input';
  input.type = 'text';
  input.name = 'protagonistName';
  input.maxLength = 12;
  input.autocomplete = 'off';
  input.placeholder = group.placeholder || '輸入主角的名字';
  input.value = normalizeProtagonistName(gameState.player?.name);
  input.setAttribute('aria-label', '主角名字');

  const submit = document.createElement('button');
  submit.className = 'choice-button name-submit-button';
  submit.type = 'submit';
  submit.textContent = group.submitLabel || '確認名字';

  const note = document.createElement('p');
  note.className = 'name-input-note';
  note.textContent = group.note || '最多 12 個字。';

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    confirmProtagonistName({ value: input.value });
  });

  form.append(input, submit);
  section.append(title, form, note);
  requestAnimationFrame(() => input.focus());
  return section;
}

function createWaitSliderGroup(group) {
  const section = document.createElement('section');
  section.className = 'choice-group wait-control';

  const title = document.createElement('h2');
  title.className = 'choice-group-title';
  title.textContent = group.title;

  const value = document.createElement('div');
  value.className = 'wait-value';
  value.textContent = formatDuration(waitDraftSeconds);

  const slider = document.createElement('input');
  const timeInput = commands.commands.wait?.timeInput || {};
  slider.className = 'wait-slider';
  slider.type = 'range';
  slider.min = String(timeInput.minSeconds || 60);
  slider.max = String(timeInput.maxSeconds || 3600);
  slider.step = String(timeInput.stepSeconds || 60);
  slider.value = String(waitDraftSeconds);

  const actions = document.createElement('div');
  actions.className = 'wait-main-actions';

  const confirmChoice = {
    id: 'confirm_wait',
    label: '確認等待',
    actionType: 'wait',
    timeCostSeconds: waitDraftSeconds,
    dynamicAction: 'wait',
    seconds: waitDraftSeconds,
    returnSceneId: group.returnSceneId,
    progressLabel: '正在等待...'
  };
  const confirm = createChoiceButton(confirmChoice);
  const back = createChoiceButton(createReturnChoice(group.returnSceneId));

  slider.addEventListener('input', () => {
    waitDraftSeconds = Number(slider.value);
    value.textContent = formatDuration(waitDraftSeconds);
    confirmChoice.seconds = waitDraftSeconds;
    confirmChoice.timeCostSeconds = waitDraftSeconds;
    const cost = confirm.querySelector('.choice-cost');
    if (cost) {
      cost.textContent = formatChoiceCost(confirmChoice);
    }
  });

  actions.append(confirm, back);

  const body = document.createElement('div');
  body.className = 'choice-group-body';
  body.append(value, slider, actions);

  section.append(title, body);
  return section;
}

function createSleepSliderGroup(group) {
  const section = document.createElement('section');
  section.className = 'choice-group wait-control';

  const title = document.createElement('h2');
  title.className = 'choice-group-title';
  title.textContent = group.title;

  const value = document.createElement('div');
  value.className = 'wait-value';
  value.textContent = formatDuration(sleepDraftSeconds);

  const slider = document.createElement('input');
  slider.className = 'wait-slider';
  slider.type = 'range';
  slider.min = String(SLEEP_MIN_SECONDS);
  slider.max = String(SLEEP_MAX_SECONDS);
  slider.step = String(SLEEP_STEP_SECONDS);
  slider.value = String(sleepDraftSeconds);

  const jumpActions = document.createElement('div');
  jumpActions.className = 'time-block-jump-actions';

  const actions = document.createElement('div');
  actions.className = 'wait-main-actions';

  const confirmChoice = {
    id: 'confirm_sleep',
    label: '確認睡覺',
    actionType: 'recover',
    timeCostSeconds: sleepDraftSeconds,
    dynamicAction: 'sleep',
    seconds: sleepDraftSeconds,
    facilityId: group.facilityId,
    returnSceneId: group.returnSceneId,
    progressLabel: '正在睡覺...'
  };
  const confirm = createChoiceButton(confirmChoice);
  const back = createChoiceButton(createReturnChoice(group.returnSceneId));

  slider.addEventListener('input', () => {
    sleepDraftSeconds = Number(slider.value);
    value.textContent = formatDuration(sleepDraftSeconds);
    confirmChoice.seconds = sleepDraftSeconds;
    confirmChoice.timeCostSeconds = sleepDraftSeconds;
    const cost = confirm.querySelector('.choice-cost');
    if (cost) {
      cost.textContent = formatChoiceCost(confirmChoice);
    }
  });

  jumpActions.append(...createTimeBlockJumpChoices(group.returnSceneId, 'sleep', group.facilityId).map(createChoiceButton));
  actions.append(confirm, back);

  const body = document.createElement('div');
  body.className = 'choice-group-body';
  body.append(jumpActions, value, slider, actions);

  section.append(title, body);
  return section;
}

function createTimeBlockJumpChoices(returnSceneId, mode = 'sleep', facilityId = '') {
  const currentTimeBlock = getTimeBlock(gameState.time.secondsOfDay);
  return TIME_BLOCKS
    .filter((block) => block.id !== currentTimeBlock)
    .map((block) => ({
      block,
      target: getTimeBlockTargetInfo(block.id)
    }))
    .sort((a, b) => a.target.seconds - b.target.seconds)
    .map(({ block, target }) => {
      return {
        id: `${mode}_until_${block.id}`,
        label: `睡到${target.label}`,
        compact: true,
        actionType: 'recover',
        timeCostSeconds: target.seconds,
        dynamicAction: 'sleepUntilTimeBlock',
        timeBlock: block.id,
        facilityId,
        returnSceneId,
        progressLabel: '正在睡覺...'
      };
    });
}

function groupChoicesByLabel(choices) {
  return [{
    title: '行動',
    choices
  }];
}

function formatChoiceCost(choice) {
  const parts = [];
  if ((choice.timeCostSeconds || 0) > 0) {
    parts.push(formatDuration(choice.timeCostSeconds));
  }
  if ((choice.staminaCost || 0) > 0) {
    parts.push(`需體力 ${choice.staminaCost}`);
  }
  parts.push(...formatChoiceRequirementParts(choice));
  return parts.join(' / ');
}

function formatChoiceRequirementParts(choice) {
  const requirements = choice?.requirements || {};
  const parts = [];
  if (requirements.stamina) {
    parts.push(`需體力 ${requirements.stamina}`);
  }
  if (requirements.life) {
    parts.push(`需生命至少 ${requirements.life}`);
  }
  if (requirements.item?.id && Number(requirements.item.count || 0) > 0) {
    const itemName = getItem(requirements.item.id)?.name || requirements.item.id;
    parts.push(`需${itemName} x${requirements.item.count}`);
  }
  return parts;
}

function createChoiceGroup(group) {
  const section = document.createElement('section');
  section.className = 'choice-group';
  if (group.className) {
    section.classList.add(...String(group.className).split(/\s+/).filter(Boolean));
  }

  const title = document.createElement('h2');
  title.className = 'choice-group-title';
  title.textContent = group.title;

  const items = document.createElement('div');
  items.className = 'choice-group-items';
  if (group.choices.length) {
    items.replaceChildren(...group.choices.map(createChoiceButton));
  } else {
    const empty = document.createElement('div');
    empty.className = 'choice-empty-note';
    empty.textContent = group.emptyLabel || '目前沒有可用選項。';
    items.append(empty);
  }

  const body = document.createElement('div');
  body.className = 'choice-group-body';
  body.append(items);

  if (group.hideCategoryLabel) {
    section.append(body);
  } else {
    section.append(title, body);
  }
  return section;
}

function createTradeRowGroup(group) {
  const section = document.createElement('section');
  section.className = 'choice-group trade-row-group';

  const title = document.createElement('h2');
  title.className = 'choice-group-title';
  title.textContent = group.title;
  section.append(title);

  const body = document.createElement('div');
  body.className = 'choice-group-body';

  if (!group.rows?.length) {
    const empty = document.createElement('div');
    empty.className = 'trade-empty-note';
    empty.textContent = group.emptyLabel || '目前沒有可交易的項目。';
    body.append(empty);
    section.append(body);
    return section;
  }

  const list = document.createElement('div');
  list.className = 'trade-row-list';
  list.replaceChildren(...group.rows.map(createTradeRow));
  body.append(list);
  section.append(body);
  return section;
}

function createTradeSummaryGroup(group) {
  const section = document.createElement('section');
  section.className = 'choice-group trade-summary-group';

  const title = document.createElement('h2');
  title.className = 'choice-group-title';
  title.textContent = group.title;
  section.append(title);

  const body = document.createElement('div');
  body.className = 'choice-group-body';

  const summary = document.createElement('div');
  summary.className = 'trade-summary-text';
  summary.replaceChildren(...(group.lines || []).map((line) => {
    const paragraph = document.createElement('p');
    paragraph.textContent = line;
    return paragraph;
  }));

  body.append(summary);
  section.append(body);
  return section;
}

function createTradeRow(row) {
  const article = document.createElement('article');
  article.className = 'trade-row';

  const info = document.createElement('div');
  info.className = 'trade-row-info';

  const name = createInlineItemInfoButton(row.itemId, row.name, row.count);
  name.classList.add('trade-row-name');

  const meta = document.createElement('div');
  meta.className = 'trade-row-meta';
  meta.textContent = row.meta;

  info.append(name, meta);

  const controls = document.createElement('div');
  controls.className = 'trade-row-controls';

  const selected = document.createElement('div');
  selected.className = 'trade-row-selected';
  selected.textContent = row.selectedLabel;

  const minus = createTradeStepButton(row.minusChoice, '−');
  const plus = createTradeStepButton(row.plusChoice, '+');

  controls.append(selected, minus, plus);
  article.append(info, controls);
  return article;
}

function createStorageRowGroup(group) {
  const section = document.createElement('section');
  section.className = 'choice-group trade-row-group storage-row-group';

  const title = document.createElement('h2');
  title.className = 'choice-group-title';
  title.textContent = group.title;
  section.append(title);

  const body = document.createElement('div');
  body.className = 'choice-group-body';

  if (!group.rows?.length) {
    const empty = document.createElement('div');
    empty.className = 'trade-empty-note';
    empty.textContent = group.emptyLabel || '目前沒有可整理的道具。';
    body.append(empty);
    section.append(body);
    return section;
  }

  const list = document.createElement('div');
  list.className = 'trade-row-list storage-row-list';
  list.replaceChildren(...group.rows.map(createStorageRow));
  body.append(list);
  section.append(body);
  return section;
}

function createStorageRow(row) {
  const article = document.createElement('article');
  article.className = 'trade-row storage-row';

  const info = document.createElement('div');
  info.className = 'trade-row-info';

  const name = createInlineItemInfoButton(row.itemId, row.name, row.count);
  name.classList.add('trade-row-name');

  const meta = document.createElement('div');
  meta.className = 'trade-row-meta';
  meta.textContent = row.meta;

  info.append(name, meta);

  const controls = document.createElement('div');
  controls.className = 'trade-row-controls storage-row-controls';

  const action = createStorageActionButton(row.actionChoice);

  controls.append(action);
  article.append(info, controls);
  return article;
}

function createInlineItemInfoButton(itemId, label, count = null) {
  const item = getItem(itemId);
  if (!item) {
    const fallback = document.createElement('div');
    fallback.className = 'trade-row-item-name';
    fallback.textContent = label || itemId || '';
    return fallback;
  }

  const button = document.createElement('button');
  button.className = 'trade-row-item-button';
  button.type = 'button';
  button.title = '查看道具說明';
  button.textContent = label || item.name || item.id;
  button.addEventListener('click', () => {
    openItemModal(item, {
      itemId: item.id,
      count: count ?? getInventoryCount(gameState.player.inventory || [], item.id)
    });
  });
  return button;
}

function createStorageActionButton(choice) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'storage-row-action';
  button.textContent = choice.label;

  const disabledReason = getChoiceDisabledReason(choice);
  button.disabled = Boolean(disabledReason);
  if (disabledReason) {
    button.title = disabledReason;
    button.setAttribute('aria-label', `${choice.label}，無法使用：${disabledReason}`);
    button.dataset.disabledReason = disabledReason;
  } else {
    button.setAttribute('aria-label', choice.label);
  }

  button.addEventListener('click', () => applyChoice(choice));
  return button;
}

function createTradeStepButton(choice, symbol) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'trade-step-button';
  button.textContent = symbol;

  const disabledReason = getChoiceDisabledReason(choice);
  button.disabled = Boolean(disabledReason);
  if (disabledReason) {
    button.title = disabledReason;
    button.setAttribute('aria-label', `${choice.label}，無法使用：${disabledReason}`);
    button.dataset.disabledReason = disabledReason;
  } else {
    button.setAttribute('aria-label', choice.label);
  }

  button.addEventListener('click', () => applyChoice(choice));
  return button;
}

function createChoiceButton(choice) {
  const button = document.createElement('button');
  button.className = 'choice-button';
  if (choice.compact) {
    button.classList.add('choice-button-compact');
  }
  button.type = 'button';
  const disabledReason = getChoiceDisabledReason(choice);
  button.disabled = Boolean(disabledReason);
  if (disabledReason) {
    button.title = disabledReason;
    button.setAttribute('aria-label', `${choice.label}，無法使用：${disabledReason}`);
    button.dataset.disabledReason = disabledReason;
  } else if (choice.hoverText) {
    button.title = choice.hoverText;
  }
  button.addEventListener('click', () => applyChoice(choice));

  const number = document.createElement('span');
  number.className = 'choice-number';
  number.textContent = choice.icon || '›';

  const label = document.createElement('span');
  label.className = 'choice-label';
  const labelText = document.createElement('span');
  labelText.className = 'choice-label-main';
  labelText.textContent = choice.label;
  label.append(labelText);
  if (choice.subtitle) {
    const subtitle = document.createElement('span');
    subtitle.className = 'choice-label-subtitle';
    subtitle.textContent = choice.subtitle;
    label.append(subtitle);
  }

  const cost = document.createElement('span');
  cost.className = 'choice-cost';
  cost.textContent = choice.hideCost ? '' : formatChoiceCost(choice);

  button.append(number, label, cost);
  return button;
}

function createExplorationCommandChoice(sceneId, commandId) {
  const command = commands.commands[commandId];
  const base = {
    id: `${sceneId}_${commandId}`,
    label: command.label,
    actionType: command.actionType,
    timeCostSeconds: command.defaultTimeCostSeconds || 0,
    nextSceneId: sceneId
  };

  if (commandId === 'useItem') {
    return { ...base, hideCost: true, dynamicAction: 'useItemMenu', returnSceneId: sceneId };
  }
  if (commandId === 'wait') {
    return { ...base, label: '等待', timeCostSeconds: 0, hideCost: true, dynamicAction: 'openWaitMenu', returnSceneId: sceneId };
  }
  if (commandId === 'exploreDeeper') {
    return {
      ...base,
      group: 'movement',
      dynamicAction: 'explorationAdvance',
      returnSceneId: sceneId,
      staminaCost: getExplorationAdvanceStaminaCost()
    };
  }
  if (commandId === 'exploreDeeperSlow') {
    return {
      ...base,
      group: 'movement',
      dynamicAction: 'explorationAdvanceSlow',
      returnSceneId: sceneId
    };
  }
  if (commandId === 'forage') {
    return {
      ...base,
      dynamicAction: 'explorationForage',
      returnSceneId: sceneId,
      disabledReason: getExplorationForageDisabledReason()
    };
  }
  if (commandId === 'shoutAttractEnemy') {
    return { ...base, dynamicAction: 'explorationShout', returnSceneId: sceneId };
  }
  if (commandId === 'retreat') {
    return createExplorationRetreatChoice(base, sceneId);
  }
  if (commandId === 'retreatSlow') {
    return createExplorationRetreatSlowChoice(base, sceneId);
  }

  return base;
}

function createExplorationRetreatChoice(base, sceneId) {
    if (canReturnVillageFromExploration()) {
      return {
        ...base,
        group: 'movement',
        label: '返回村莊',
        dynamicAction: 'explorationReturnToVillage',
        returnSceneId: sceneId
      };
    }

  return {
    ...base,
    group: 'movement',
    dynamicAction: 'explorationRetreat',
    returnSceneId: sceneId,
    staminaCost: 1
  };
}

function createExplorationRetreatSlowChoice(base, sceneId) {
  if (canReturnVillageFromExploration()) {
    return null;
  }

  return {
    ...base,
    group: 'movement',
    dynamicAction: 'explorationRetreatSlow',
    returnSceneId: sceneId
  };
}

function createLocationScene(location) {
  const presentVillagers = location.allowPresentVillagers ? getPresentVillagers(location.id) : [];
  const facilitiesHere = getFacilitiesAtLocation(location.id);
  const debugText = createDebugInfoBlock([
    `locationId: ${location.id}`,
    `timeBlock: ${getTimeBlock(gameState.time.secondsOfDay)}`,
    `presentVillagers: ${presentVillagers.map((villager) => villager.id).join(', ') || 'none'}`,
    `facilities: ${facilitiesHere.map((facility) => facility.id).join(', ') || 'none'}`
  ]);

  return {
    id: location.id,
    title: location.name,
    location: '山谷村',
    description: [createActionSceneDescription(createSceneImpressionDescription(location, location.id)), debugText].filter(Boolean).join('\n\n'),
    infoRows: [],
    choiceGroups: [
      {
        title: '行動',
        choices: [
          ...createBaseLocationChoices(location),
          ...(location.localActions || []).map((action) => ({
        ...action,
        nextSceneId: location.id
          }))
        ]
      },
      {
        title: '看見的人物',
        choices: presentVillagers.map((villager) => createPresentVillagerChoice(villager, location.id))
      },
      {
        title: '看見的物件',
        choices: createFacilityEntryChoices(location, facilitiesHere)
      },
      {
        title: '移動到',
        choices: (location.exits || []).map((exit) => createLocationExitChoice(location, exit))
      }
    ]
  };
}

function createLocationExitChoice(location, exit) {
  const choice = {
    id: `move_${location.id}_${exit.to}`,
    label: exit.label.replace(/^前往/, '').replace(/^離開村莊，前往/, '').replace(/^返回/, '返回'),
    actionType: 'move',
    timeCostSeconds: exit.timeCostSeconds ?? getCommandCost('move'),
    dynamicAction: 'moveToLocation',
    fromSceneId: location.id,
    nextSceneId: exit.to,
    progressLabel: `正在${exit.label}...`
  };

  if (exit.eventBeforeMove) {
    return {
      ...choice,
      dynamicAction: 'moveToLocation',
      fromSceneId: location.id,
      eventBeforeMove: exit.eventBeforeMove
    };
  }

  return choice;
}

function createPresentVillagerChoice(villager, returnSceneId) {
  return {
    id: `interact_${villager.id}`,
    label: villager.name,
    subtitle: villager.role || '',
    actionType: 'dialogue',
    timeCostSeconds: 0,
    hideCost: true,
    dynamicAction: 'openDialogue',
    villagerId: villager.id,
    returnSceneId
  };
}

function createBaseLocationChoices(location) {
  return getCommandSet(location.baseCommandSet).map((commandId) => {
    const command = commands.commands[commandId];
    const base = {
      id: `${location.id}_${commandId}`,
      label: command.label,
      actionType: command.actionType,
      timeCostSeconds: command.defaultTimeCostSeconds || 0,
      nextSceneId: location.id
    };

    if (commandId === 'useItem') {
      return { ...base, hideCost: true, dynamicAction: 'useItemMenu', returnSceneId: location.id };
    }

    if (commandId === 'wait') {
      return { ...base, label: '等待', timeCostSeconds: 0, hideCost: true, dynamicAction: 'openWaitMenu', returnSceneId: location.id };
    }

    return base;
  });
}

function createFacilityEntryChoices(location, facilitiesHere) {
  return facilitiesHere.map((facility) => createFacilityEntryChoice(location.id, facility.id, facility.name));
}

function createFacilityEntryChoice(returnSceneId, facilityId, label) {
  return {
    id: `${returnSceneId}_${facilityId}_open`,
    label,
    actionType: 'openFacility',
    timeCostSeconds: 0,
    hideCost: true,
    dynamicAction: 'openFacility',
    facilityId,
    returnSceneId
  };
}

function createExplorationFacilityEntryChoices(returnSceneId, facilityNodes) {
  return facilityNodes.map((node) => createFacilityEntryChoice(returnSceneId, node.instanceId, node.name));
}

function createFacilityChoices(returnSceneId, facility, facilityContext = null) {
  const choices = [];
  const context = facilityContext || resolveFacilityContext(facility.id, returnSceneId);
  const facilityId = context.instanceId;

  if (facility.facilityType === 'small_storage' && facility.smallStorage?.canWithdraw) {
    if (facility.randomGatherAction) {
      choices.push(...createRandomGatherChoices(returnSceneId, facility, context));
    } else {
      choices.push(...createFacilityObtainChoices(returnSceneId, facility, context));
    }
  }

  if (facility.facilityType === 'infinite_source' && facility.infiniteSource?.itemId) {
    const source = facility.infiniteSource;
    const item = getItem(source.itemId);
    const count = Number(source.count || 1);
    choices.push({
      id: `${returnSceneId}_${facilityId}_collect`,
      label: source.label || `取得${item?.name || source.itemId}`,
      actionType: 'collectInfiniteSource',
      timeCostSeconds: source.timeCostSeconds || 0,
      staminaCost: Number(source.staminaCost || 0),
      dynamicAction: 'collectInfiniteSource',
      facilityId,
      returnSceneId,
      disabledReason: getPlayerCarryDisabledReason(source.itemId, count)
    });
  }

  if (facility.facilityType === 'special_access' && facility.access) {
    choices.push(...createSpecialAccessChoices(returnSceneId, facility, context));
  }

  return choices;
}

function createSpecialAccessChoices(returnSceneId, facility, facilityContext) {
  const access = facility.access || {};
  const facilityId = facilityContext?.instanceId || facility.id;
  const requiredFlags = [
    ...(access.requiredFlags || []),
    ...(access.requiredFlag ? [access.requiredFlag] : [])
  ];
  return [{
    id: `${returnSceneId}_${facilityId}_enter`,
    label: access.label || '進入井底入口',
    actionType: access.actionType || 'specialAccess',
    timeCostSeconds: access.timeCostSeconds ?? 60,
    dynamicAction: access.dynamicAction || 'lizardWell',
    facilityId,
    returnSceneId,
    visibility: {
      requiredFlags,
      timeBlocks: access.timeBlocks || []
    }
  }];
}

function createFacilityObtainChoices(returnSceneId, facility, facilityContext) {
  const obtainAction = getFacilityObtainAction(facility);
  const stock = normalizeInventory((facilityContext?.state || {}).items || []);
  if (!stock.length) {
    return [];
  }

  if (shouldWithdrawSmallStorageAllAtOnce(facility)) {
    return [{
      id: `${returnSceneId}_${facilityContext.instanceId}_obtain_all`,
      label: obtainAction.label,
      actionType: 'withdrawFacilityItem',
      timeCostSeconds: 60,
      dynamicAction: 'withdrawFacilityItem',
      facilityId: facilityContext.instanceId,
      itemId: stock[0]?.itemId || '',
      returnSceneId
    }];
  }

  return stock.map((entry) => {
    const item = getItem(entry.itemId);
    const itemLabel = item?.name || entry.itemId;
    const carryReason = getPlayerCarryDisabledReason(entry.itemId, 1);
    return {
      id: `${returnSceneId}_${facilityContext.instanceId}_obtain_${entry.itemId}`,
      label: `${obtainAction.label}：${itemLabel}（剩餘 ${entry.count}）`,
      actionType: 'withdrawFacilityItem',
      timeCostSeconds: 60,
      dynamicAction: 'withdrawFacilityItem',
      facilityId: facilityContext.instanceId,
      itemId: entry.itemId,
      returnSceneId,
      disabledReason: carryReason
    };
  });
}

function createRandomGatherChoices(returnSceneId, facility, facilityContext) {
  const action = facility.randomGatherAction;
  const state = facilityContext?.state || {};
  const alreadyUsed = isRandomGatherActionUsedUp(facilityContext, state, action);
  const choices = [{
    id: `${returnSceneId}_${facilityContext.instanceId}_gather`,
    label: action?.label || '尋找物品',
    actionType: 'gatherRandomFacility',
    timeCostSeconds: action?.timeCostSeconds || 0,
    dynamicAction: 'gatherRandomFacility',
    facilityId: facilityContext.instanceId,
    returnSceneId,
    disabledStatic: alreadyUsed,
    disabledReason: alreadyUsed ? (action?.alreadyUsedMessage || '今天已經找過了。') : ''
  }];

  const stock = normalizeInventory(state.items || []);
  for (const entry of stock) {
    const item = getItem(entry.itemId);
    choices.push({
      id: `${returnSceneId}_${facilityContext.instanceId}_obtain_temp_${entry.itemId}`,
      label: `取回${item?.name || entry.itemId}（剩餘 ${entry.count}）`,
      actionType: 'withdrawFacilityItem',
      timeCostSeconds: 60,
      dynamicAction: 'withdrawFacilityItem',
      facilityId: facilityContext.instanceId,
      itemId: entry.itemId,
      returnSceneId,
      disabledReason: getPlayerCarryDisabledReason(entry.itemId, 1)
    });
  }

  return choices;
}

function createCraftingChoices(returnSceneId, facility, facilityContext) {
  const availableRecipes = getFacilityRecipes(facility);
  if (!availableRecipes.length) {
    return [];
  }

  return availableRecipes.map((recipe) => {
    return {
      id: `${returnSceneId}_${facilityContext.instanceId}_craft_${recipe.id}`,
      label: `製作${formatRecipeResult(recipe)}：${formatRecipeMaterials(recipe)}`,
      actionType: 'craft',
      timeCostSeconds: Number(recipe.timeCostSeconds || 0),
      dynamicAction: 'craftRecipe',
      facilityId: facilityContext.instanceId,
      recipeId: recipe.id,
      returnSceneId,
      disabledReason: getRecipeDisabledReason(recipe)
    };
  });
}

function getFacilityInteractionMode(facility) {
  if (!facility) {
    return 'menuView';
  }
  if (facility.interactionMode) {
    return normalizeFacilityInteractionMode(facility.interactionMode);
  }
  if (facility.id === 'protagonist_bed') {
    return 'timeSelectView';
  }
  if (facility.facilityType === 'container') {
    return 'storageView';
  }
  if (facility.facilityType === 'crafting') {
    return 'craftView';
  }
  return 'menuView';
}

function normalizeFacilityInteractionMode(mode) {
  const supportedModes = new Set(['menuView', 'storageView', 'craftView', 'timeSelectView']);
  return supportedModes.has(mode) ? mode : 'menuView';
}

function getFacilityEntrySceneId(facility, facilityId, returnSceneId) {
  const mode = getFacilityInteractionMode(facility);
  const targetFacilityId = facilityId || facility.id;
  const targetReturnSceneId = returnSceneId || FALLBACK_SCENE_ID;
  if (mode === 'timeSelectView') {
    return `sleepMenu:${targetReturnSceneId}:${facility.id}`;
  }
  if (mode === 'storageView') {
    return `storage:${targetFacilityId}:${targetReturnSceneId}`;
  }
  if (mode === 'craftView') {
    return `facility:${targetFacilityId}:${targetReturnSceneId}`;
  }
  return `facility:${targetFacilityId}:${targetReturnSceneId}`;
}

function getFacilityRecipes(facility) {
  const matchField = facility.crafting?.matchField || 'workstationFacilityId';
  return recipes.filter((recipe) => recipe?.[matchField] === facility.id && isRecipeKnown(recipe));
}

function getPortableRecipes() {
  return recipes.filter((recipe) => recipe?.portableCrafting && isRecipeKnown(recipe));
}

function getKnownRecipes() {
  return recipes.filter((recipe) => isRecipeKnown(recipe));
}

function isRecipeKnown(recipe) {
  const knownIds = new Set(gameState.player?.knownRecipeIds || []);
  return Boolean(recipe?.learnedByDefault || knownIds.has(recipe?.id));
}

function formatRecipeMaterials(recipe) {
  return (recipe.materials || [])
    .map((material) => `${getItem(material.itemId)?.name || material.itemId} x${material.count}`)
    .join('、');
}

function formatRecipeResult(recipe) {
  const resultItem = getItem(recipe.result?.itemId);
  const resultName = resultItem?.name || recipe.result?.itemId || recipe.name || '成品';
  return `${resultName} x${recipe.result?.count || 1}`;
}

function getRecipeDisabledReason(recipe) {
  for (const material of recipe.materials || []) {
    const owned = getInventoryCount(gameState.player.inventory || [], material.itemId);
    if (owned < Number(material.count || 0)) {
      const itemName = getItem(material.itemId)?.name || material.itemId;
      return `${itemName} 不足，需要 ${material.count}，目前 ${owned}。`;
    }
  }

  if (getCraftedInventoryWeight(recipe) > getPlayerCarryCapacity()) {
    return getCarryOverLimitMessage();
  }

  return '';
}

function getCraftedInventoryWeight(recipe) {
  const nextInventory = cloneInventory(gameState.player.inventory || []);
  for (const material of recipe.materials || []) {
    changeInventoryItem(nextInventory, material.itemId, -Number(material.count || 0));
  }
  if (recipe.result?.itemId) {
    changeInventoryItem(nextInventory, recipe.result.itemId, Number(recipe.result.count || 1));
  }
  return getInventoryWeight(nextInventory);
}

function createFacilityScene(sceneId) {
  const [, facilityId, returnSceneId] = sceneId.split(':');
  const context = resolveFacilityContext(facilityId, returnSceneId);
  const facility = context.baseFacility;
  if (!facility || !context.state) {
    const explorationScene = scenes.find((scene) => scene.id === returnSceneId && scene.sceneType === 'exploration');
    if (explorationScene) {
      return createExplorationScene(explorationScene);
    }
    return createLocationScene(locations.find((location) => location.id === returnSceneId) || locations[0]);
  }
  const interactionMode = getFacilityInteractionMode(facility);
  if (interactionMode === 'timeSelectView') {
    return createSleepScene(`sleepMenu:${returnSceneId}:${facility.id}`);
  }
  if (interactionMode === 'storageView') {
    return createStorageScene(`storage:${facilityId}:${returnSceneId}`);
  }
  if (interactionMode === 'craftView') {
    return createCraftingFacilityScene(sceneId, facility, context, returnSceneId);
  }
  return createGenericFacilityScene(sceneId, facility, context, returnSceneId);
}

function createGenericFacilityScene(sceneId, facility, context, returnSceneId) {
  const debugText = createDebugInfoBlock([
    `facilityId: ${facility.id}`,
    `instanceId: ${context.instanceId}`,
    `type: ${facility.facilityType || 'unknown'}`,
    `mode: ${getFacilityInteractionMode(facility)}`,
    `state: ${summarizeDebugFacilityState(context.state)}`
  ]);

  return {
    id: sceneId,
    title: facility.name,
    location: getSceneLocationLabel(returnSceneId),
    description: [facility.description, debugText].filter(Boolean).join('\n\n'),
    facilityStatusRows: createFacilityStatusRows(facility, context),
    choiceGroups: createGenericFacilityChoiceGroups(returnSceneId, facility, context)
  };
}

function createGenericFacilityChoiceGroups(returnSceneId, facility, context) {
  const groups = [{
    title: '可互動',
    choices: createFacilityChoices(returnSceneId, facility, context),
    emptyLabel: getFacilityEmptyInteractionLabel(facility)
  }, {
    title: '其他',
    choices: [createReturnChoice(returnSceneId)]
  }];
  const reviewChoices = createFacilityEventReviewChoices(returnSceneId, facility, context);
  if (reviewChoices.length) {
    groups.splice(0, 0, {
      title: '已看過的留言',
      choices: reviewChoices
    });
  }
  return groups;
}

function getFacilityEmptyInteractionLabel(facility) {
  if (facility?.facilityType === 'small_storage') {
    return getFacilityObtainAction(facility).emptyMessage || `${facility.name || '這裡'}目前沒有可取得的東西。`;
  }
  if (facility?.facilityType === 'crafting') {
    return '目前沒有可製作的配方。';
  }
  return '目前沒有可互動的內容。';
}

function createFacilityEventReviewChoices(returnSceneId, facility, context) {
  const eventPool = facility?.dailyMessages?.eventPool;
  if (!Array.isArray(eventPool) || !eventPool.length) {
    return [];
  }
  return eventPool
    .filter((eventId) => gameState.events?.completedEventIds?.includes(eventId))
    .map((eventId) => getEventById(eventId))
    .filter(Boolean)
    .map((event) => ({
      id: `${context.instanceId}_${event.id}_review`,
      label: event.title || '看過的留言',
      actionType: 'eventReview',
      timeCostSeconds: 0,
      hideCost: true,
      dynamicAction: 'startEventReview',
      eventId: event.id,
      facilityId: context.instanceId,
      returnSceneId
    }));
}

function createFacilityStatusRows(facility, context) {
  const rows = [];
  if (facility.facilityType === 'upgradeable') {
    const level = Number(context.state?.level ?? facility.upgrade?.initialLevel ?? 0);
    const maxLevel = Number(facility.upgrade?.maxLevel || 0);
    rows.push({
      label: '等級',
      value: maxLevel > 0 ? `${level} / ${maxLevel}` : String(level)
    });
    if (facility.progress) {
      rows.push({
        label: '開墾進度',
        value: `${formatProgressPercent(context.state?.progress, facility.progress.max)}%`
      });
    }
  }

  const storageText = getFacilityStorageText(facility, context);
  if (storageText) {
    rows.push({ label: '狀態', value: storageText });
  }
  return rows;
}

function createCraftingFacilityScene(sceneId, facility, context, returnSceneId) {
  const debugText = createDebugInfoBlock([
    `facilityId: ${facility.id}`,
    `instanceId: ${context.instanceId}`,
    `type: ${facility.facilityType || 'unknown'}`,
    `mode: ${getFacilityInteractionMode(facility)}`
  ]);

  return {
    id: sceneId,
    title: facility.name,
    location: getSceneLocationLabel(returnSceneId),
    description: [facility.description, debugText].filter(Boolean).join('\n\n'),
    facilityStatusRows: createFacilityStatusRows(facility, context),
    choiceGroups: [
      {
        title: '可製作',
        choices: createCraftingChoices(returnSceneId, facility, context)
      },
      {
        title: '返回',
        choices: [createReturnChoice(returnSceneId)]
      }
    ]
  };
}

function createStorageScene(sceneId) {
  const parts = sceneId.split(':');
  const legacyMode = parts.length > 3 ? parts[1] : null;
  const storageMode = legacyMode || '';
  const facilityId = legacyMode ? parts[2] : parts[1];
  const returnSceneId = legacyMode ? parts[3] : parts[2];
  const facility = facilities.find((candidate) => candidate.id === facilityId);
  const context = resolveFacilityContext(facilityId, returnSceneId);
  if (!facility || facility.facilityType !== 'container') {
    return createLocationScene(locations.find((location) => location.id === returnSceneId) || locations[0]);
  }

  if (facility.id === 'discarded_items') {
    return createDroppedItemsStorageScene(sceneId, facility, context, returnSceneId);
  }

  ensureContainerDraft(facility.id, returnSceneId, false, storageMode);
  const draftState = getContainerDraftState(facility, returnSceneId, storageMode);
  const summaryLines = createContainerDraftSummaryLines();
  return {
    id: sceneId,
    title: getStorageSceneTitle(facility, storageMode),
    location: getSceneLocationLabel(returnSceneId),
    description: '',
    facilityStatusRows: createStorageFacilityStatusRows(facility, context, storageMode),
    choiceGroups: [
      {
        title: getContainerWithdrawGroupTitle(facility, storageMode),
        type: 'storageRows',
        rows: createContainerDraftStorageRows(facility, returnSceneId, draftState, storageMode),
        emptyLabel: getEmptyContainerMessage(facility, storageMode)
      },
      ...(canContainerReceiveManualDeposits(facility, storageMode) ? [{
        title: `背包（整理後負重：${formatNumber(getInventoryWeight(draftState.inventory))} / ${formatNumber(getPlayerCarryCapacity())}）`,
        type: 'storageRows',
        rows: createContainerDraftInventoryRows(facility, returnSceneId, draftState, storageMode),
        emptyLabel: getContainerDepositEmptyMessage(facility)
      }] : []),
      {
        title: '本次整理',
        type: 'tradeSummary',
        lines: summaryLines
      },
      {
        title: '確認',
        choices: createContainerDraftFinalizeChoices(facility.id, returnSceneId, storageMode)
      }
    ]
  };
}

function createDroppedItemsStorageScene(sceneId, facility, context, returnSceneId) {
  ensureDroppedItemsDraft(returnSceneId);
  const draftState = getDroppedItemsDraftState(returnSceneId);
  const summaryLines = createDroppedItemsDraftSummaryLines();
  return {
    id: sceneId,
    title: facility.name,
    location: getSceneLocationLabel(returnSceneId),
    description: '',
    facilityStatusRows: createStorageFacilityStatusRows(facility, context),
    choiceGroups: [
      {
        title: '地上的道具',
        type: 'storageRows',
        rows: createDroppedItemsGroundRows(returnSceneId, draftState),
        emptyLabel: getEmptyContainerMessage(facility)
      },
      {
        title: `背包（整理後負重：${formatNumber(getInventoryWeight(draftState.inventory))} / ${formatNumber(getPlayerCarryCapacity())}）`,
        type: 'storageRows',
        rows: createDroppedItemsInventoryRows(returnSceneId, draftState),
        emptyLabel: getContainerDepositEmptyMessage(facility)
      },
      {
        title: '本次整理',
        type: 'tradeSummary',
        lines: summaryLines
      },
      {
        title: '確認',
        choices: createDroppedItemsFinalizeChoices(returnSceneId)
      }
    ]
  };
}

function createForageLootScene(sceneId) {
  const returnSceneId = sceneId.split(':')[1] || EXPLORATION_SCENE_ID;
  ensureForageLootDraft(returnSceneId);
  const draftState = getForageLootDraftState();
  const summaryLines = createForageLootDraftSummaryLines(draftState);
  return {
    id: sceneId,
    title: '搜尋到的物資',
    location: getSceneLocationLabel(returnSceneId),
    description: '你先在原地蹲下，把剛翻出的東西和背包攤開。現在決定要帶走什麼；沒撿起來的，就只能暫時留在這裡。',
    infoRows: [
      { label: '警告', value: '沒帶走的東西會被放進遺落的道具，時間一久或離開探索位置後，可能永久消失。' }
    ],
    choiceGroups: [
      {
        title: '新找到的道具',
        type: 'storageRows',
        rows: createForageLootRows(returnSceneId, draftState),
        emptyLabel: '剛找到的東西已經沒有留在地上。'
      },
      {
        title: `背包（整理後負重：${formatNumber(getInventoryWeight(draftState.inventory))} / ${formatNumber(getPlayerCarryCapacity())}）`,
        type: 'storageRows',
        rows: createForageLootInventoryRows(returnSceneId, draftState),
        emptyLabel: '背包裡沒有可暫時放下的道具。'
      },
      {
        title: '本次整理',
        type: 'tradeSummary',
        lines: summaryLines
      },
      {
        title: '確認',
        choices: createForageLootFinalizeChoices(returnSceneId)
      }
    ]
  };
}

function createBattleLootScene(sceneId) {
  const returnSceneId = sceneId.split(':')[1] || EXPLORATION_SCENE_ID;
  ensureForageLootDraft(returnSceneId);
  const draftState = getForageLootDraftState();
  const summaryLines = createForageLootDraftSummaryLines(draftState);
  return {
    id: sceneId,
    title: '蒐集戰利品',
    location: getSceneLocationLabel(returnSceneId),
    description: '你在戰鬥結束後停下腳步，整理眼前還能帶走的戰利品。要帶走什麼，現在先決定清楚。',
    infoRows: [
      { label: '警告', value: '沒帶走的東西會被放進遺落的道具，時間一久或離開探索位置後，可能永久消失。' }
    ],
    choiceGroups: [
      {
        title: '戰利品',
        type: 'storageRows',
        rows: createForageLootRows(returnSceneId, draftState, '戰利品'),
        emptyLabel: '眼前已經沒有戰利品。'
      },
      {
        title: `背包（整理後負重：${formatNumber(getInventoryWeight(draftState.inventory))} / ${formatNumber(getPlayerCarryCapacity())}）`,
        type: 'storageRows',
        rows: createForageLootInventoryRows(returnSceneId, draftState),
        emptyLabel: '背包裡沒有可暫時放下的道具。'
      },
      {
        title: '本次整理',
        type: 'tradeSummary',
        lines: summaryLines
      },
      {
        title: '確認',
        choices: createForageLootFinalizeChoices(returnSceneId, 'battle')
      }
    ]
  };
}

function getStorageSceneTitle(facility, storageMode = '') {
  if (isBlackCatCarryStorageMode(storageMode)) {
    return '請黑貓帶回村子';
  }
  return facility.name;
}

function createStorageInfoRows(facility, context, storageMode = '') {
  const rows = [{ label: '狀態', value: getFacilityStorageText(facility, context) }];
  if (facility?.id === 'discarded_items') {
    rows.push({ label: '警告', value: '放在這裡的東西只是暫時留在原地，時間一久或離開探索位置後，可能永久消失。' });
  }
  if (isBlackCatCarryStorageMode(storageMode)) {
    rows.push({ label: '感覺', value: '黑貓安靜地等在旁邊。你隱約覺得，交給牠帶走的東西，回到宿舍後也許能在失物箱裡找到。' });
  }
  return rows;
}

function createStorageFacilityStatusRows(facility, context, storageMode = '') {
  return createStorageInfoRows(facility, context, storageMode)
    .filter((row) => row.label === '狀態');
}

function isBlackCatCarryStorageMode(storageMode = '') {
  return storageMode === BLACK_CAT_STORAGE_MODE;
}

function canContainerReceiveManualDeposits(facility, storageMode = '') {
  return facility?.facilityType === 'container'
    && (facility.storage?.canDeposit !== false || (facility.id === 'lost_and_found_box' && isBlackCatCarryStorageMode(storageMode)));
}

function getContainerWithdrawGroupTitle(facility, storageMode = '') {
  if (isBlackCatCarryStorageMode(storageMode)) {
    return '黑貓準備帶走的道具';
  }
  if (facility.id === 'discarded_items') {
    return '掉在這裡的道具';
  }
  if (facility.id === 'lost_and_found_box') {
    return '失物箱內容';
  }
  return '倉庫內容';
}

function getContainerItemSourceLabel(facility, storageMode = '') {
  if (isBlackCatCarryStorageMode(storageMode)) {
    return '待帶走';
  }
  if (facility.id === 'discarded_items') {
    return '地上';
  }
  if (facility.id === 'lost_and_found_box') {
    return '失物箱';
  }
  return '倉庫';
}

function getEmptyContainerMessage(facility, storageMode = '') {
  if (isBlackCatCarryStorageMode(storageMode)) {
    return '還沒有交給黑貓帶走的東西。';
  }
  if (facility.id === 'discarded_items') {
    return '這裡目前沒有被丟下的道具。';
  }
  if (facility.id === 'lost_and_found_box') {
    return '失物箱目前是空的。';
  }
  return '倉庫箱目前是空的。';
}

function getContainerDepositEmptyMessage(facility) {
  if (facility.id === 'discarded_items') {
    return '背包裡沒有可放到這裡的道具。';
  }
  if (facility.id === 'lost_and_found_box') {
    return '背包裡沒有需要交給黑貓帶走的道具。';
  }
  return '背包裡沒有可放入倉庫箱的道具。';
}

function ensureContainerDraft(facilityId, returnSceneId, reset = false, storageMode = '') {
  const key = `container:${storageMode || 'default'}:${facilityId}:${returnSceneId || FALLBACK_SCENE_ID}`;
  if (reset || !containerDraft || containerDraft.key !== key) {
    containerDraft = {
      key,
      facilityId,
      returnSceneId: returnSceneId || FALLBACK_SCENE_ID,
      storageMode: storageMode || '',
      withdraw: {},
      deposit: {}
    };
  }
  return containerDraft;
}

function getContainerDraftState(facility, returnSceneId, storageMode = '') {
  const draft = ensureContainerDraft(facility.id, returnSceneId, false, storageMode);
  const storage = cloneInventory(resolveFacilityContext(facility.id, returnSceneId).state?.items || []);
  const inventory = cloneInventory(gameState.player.inventory || []);

  for (const [itemId, count] of Object.entries(draft.withdraw || {})) {
    const amount = Number(count || 0);
    if (amount <= 0) continue;
    changeInventoryItem(storage, itemId, -amount);
    changeInventoryItem(inventory, itemId, amount);
  }
  for (const [itemId, count] of Object.entries(draft.deposit || {})) {
    const amount = Number(count || 0);
    if (amount <= 0) continue;
    changeInventoryItem(inventory, itemId, -amount);
    changeInventoryItem(storage, itemId, amount);
  }

  return {
    storage: normalizeInventory(storage),
    inventory: normalizeInventory(inventory)
  };
}

function createContainerDraftStorageRows(facility, returnSceneId, draftState, storageMode = '') {
  const entries = isBlackCatCarryStorageMode(storageMode)
    ? draftState.storage.filter((entry) => Number(containerDraft?.deposit?.[entry.itemId] || 0) > 0)
    : draftState.storage;
  return entries.map((entry) => {
    const item = getItem(entry.itemId);
    const itemName = item?.name || entry.itemId;
    const displayCount = isBlackCatCarryStorageMode(storageMode)
      ? Number(containerDraft?.deposit?.[entry.itemId] || 0)
      : entry.count;
    return {
      id: `${facility.id}_draft_withdraw_${entry.itemId}`,
      itemId: entry.itemId,
      count: displayCount,
      name: itemName,
      meta: `${getContainerItemSourceLabel(facility, storageMode)} ${displayCount}　總重量 ${formatNumber(getItemWeight(entry.itemId) * displayCount)}`,
      actionChoice: createContainerDraftChoice({
        facilityId: facility.id,
        returnSceneId,
        itemId: entry.itemId,
        mode: 'withdraw',
        label: '取回到背包',
        disabledReason: getContainerDraftWithdrawDisabledReason(facility, entry.itemId, draftState),
        storageMode
      })
    };
  });
}

function createContainerDraftInventoryRows(facility, returnSceneId, draftState, storageMode = '') {
  return draftState.inventory
    .filter((entry) => canDepositItem(facility, entry.itemId, storageMode))
    .map((entry) => {
      const item = getItem(entry.itemId);
      const itemName = item?.name || entry.itemId;
      const label = isBlackCatCarryStorageMode(storageMode) ? '請黑貓帶走' : '放入倉庫';
      return {
        id: `${facility.id}_draft_deposit_${entry.itemId}`,
        itemId: entry.itemId,
        count: entry.count,
        name: itemName,
        meta: `背包 ${entry.count}　總重量 ${formatNumber(getItemWeight(entry.itemId) * entry.count)}`,
        actionChoice: createContainerDraftChoice({
          facilityId: facility.id,
          returnSceneId,
          itemId: entry.itemId,
          mode: 'deposit',
          label,
          disabledReason: getContainerDraftDepositDisabledReason(facility, entry.itemId, draftState, storageMode),
          storageMode
        })
      };
    });
}

function createContainerDraftChoice({ facilityId, returnSceneId, itemId, mode, label, disabledReason = '', storageMode = '' }) {
  return {
    id: `${facilityId}_${mode}_${itemId}`,
    label,
    actionType: 'adjustContainerDraft',
    timeCostSeconds: 0,
    hideCost: true,
    dynamicAction: 'adjustContainerDraft',
    facilityId,
    returnSceneId,
    itemId,
    mode,
    storageMode,
    delta: 1,
    disabledReason
  };
}

function getContainerDraftWithdrawDisabledReason(facility, itemId, draftState) {
  if (getInventoryCount(draftState.storage, itemId) <= 0) {
    return '這裡已經沒有這個道具。';
  }
  const nextInventory = cloneInventory(draftState.inventory);
  changeInventoryItem(nextInventory, itemId, 1);
  return getInventoryWeight(nextInventory) > getPlayerCarryCapacity() ? getCarryOverLimitMessage() : '';
}

function getContainerDraftDepositDisabledReason(facility, itemId, draftState, storageMode = '') {
  if (getInventoryCount(draftState.inventory, itemId) <= 0) {
    return '背包裡沒有這個道具。';
  }
  if (!canDepositItem(facility, itemId, storageMode)) {
    return getContainerDepositDisabledMessage(facility);
  }
  const nextStorage = cloneInventory(draftState.storage);
  changeInventoryItem(nextStorage, itemId, 1);
  return getInventoryWeight(nextStorage) > getContainerCapacity(facility)
    ? getContainerCapacityDisabledMessage(facility)
    : '';
}

function createContainerDraftSummaryLines() {
  const withdrawText = formatTradeDraftLine({
    prefix: '取回',
    entries: Object.entries(containerDraft?.withdraw || {}),
    getItemName: (itemId) => getItem(itemId)?.name || itemId
  });
  const depositText = formatTradeDraftLine({
    prefix: '放入',
    entries: Object.entries(containerDraft?.deposit || {}),
    getItemName: (itemId) => getItem(itemId)?.name || itemId
  });
  return [withdrawText, depositText].filter(Boolean);
}

function createContainerDraftFinalizeChoices(facilityId, returnSceneId, storageMode = '') {
  const hasAnyChange = Object.values(containerDraft?.withdraw || {}).some((count) => Number(count || 0) > 0)
    || Object.values(containerDraft?.deposit || {}).some((count) => Number(count || 0) > 0);
  const isBlackCatCarry = isBlackCatCarryStorageMode(storageMode);
  const confirmSettings = isBlackCatCarry
    ? getPendingActionConfirmSettings('blackCatCarryItems', {
      timeCostSeconds: 60,
      progressOnly: true,
      progressScope: 'choices',
      progressLabel: '黑貓正叼起東西...',
      hideCost: false
    })
    : { timeCostSeconds: 0, progressOnly: false, progressScope: '', progressLabel: '', hideCost: true };
  return [
    {
      id: `${facilityId}_confirm_container_draft`,
      label: '確認整理',
      actionType: 'confirmContainerDraft',
      timeCostSeconds: confirmSettings.timeCostSeconds,
      hideCost: confirmSettings.hideCost,
      progressOnly: confirmSettings.progressOnly,
      progressScope: confirmSettings.progressScope,
      progressLabel: confirmSettings.progressLabel,
      dynamicAction: 'confirmContainerDraft',
      facilityId,
      returnSceneId,
      storageMode,
      disabledStatic: !hasAnyChange,
      disabledReason: hasAnyChange ? '' : '尚未調整任何道具。'
    },
    {
      id: `${facilityId}_cancel_container_draft`,
      label: '返回',
      actionType: 'cancelContainerDraft',
      timeCostSeconds: 0,
      hideCost: true,
      dynamicAction: 'cancelContainerDraft',
      facilityId,
      returnSceneId,
      storageMode
    }
  ];
}

function ensureDroppedItemsDraft(returnSceneId, reset = false) {
  const key = `dropped:${returnSceneId || FALLBACK_SCENE_ID}`;
  if (reset || !droppedItemsDraft || droppedItemsDraft.key !== key) {
    droppedItemsDraft = {
      key,
      returnSceneId: returnSceneId || FALLBACK_SCENE_ID,
      take: {},
      place: {}
    };
  }
  return droppedItemsDraft;
}

function getDroppedItemsDraftState(returnSceneId) {
  const draft = ensureDroppedItemsDraft(returnSceneId);
  const ground = cloneInventory(getDroppedItemsState(returnSceneId, true).items || []);
  const inventory = cloneInventory(gameState.player.inventory || []);

  for (const [itemId, count] of Object.entries(draft.take || {})) {
    const amount = Number(count || 0);
    if (amount <= 0) continue;
    changeInventoryItem(ground, itemId, -amount);
    changeInventoryItem(inventory, itemId, amount);
  }

  for (const [itemId, count] of Object.entries(draft.place || {})) {
    const amount = Number(count || 0);
    if (amount <= 0) continue;
    changeInventoryItem(inventory, itemId, -amount);
    changeInventoryItem(ground, itemId, amount);
  }

  return {
    ground: normalizeInventory(ground),
    inventory: normalizeInventory(inventory)
  };
}

function createDroppedItemsGroundRows(returnSceneId, draftState) {
  return draftState.ground.map((entry) => {
    const item = getItem(entry.itemId);
    const itemName = item?.name || entry.itemId;
    return {
      id: `dropped_take_row_${entry.itemId}`,
      itemId: entry.itemId,
      count: entry.count,
      name: itemName,
      meta: `地上 ${entry.count}　總重量 ${formatNumber(getItemWeight(entry.itemId) * entry.count)}`,
      actionChoice: createDroppedItemsDraftChoice({
        returnSceneId,
        itemId: entry.itemId,
        mode: 'take',
        delta: 1,
        label: '取回到背包',
        disabledReason: getDroppedItemsTakeDisabledReason(entry.itemId, draftState)
      })
    };
  });
}

function createDroppedItemsInventoryRows(returnSceneId, draftState) {
  const facility = facilities.find((candidate) => candidate.id === 'discarded_items');
  return draftState.inventory
    .filter((entry) => canDepositItem(facility, entry.itemId))
    .map((entry) => {
      const item = getItem(entry.itemId);
      const itemName = item?.name || entry.itemId;
      return {
        id: `dropped_place_row_${entry.itemId}`,
        itemId: entry.itemId,
        count: entry.count,
        name: itemName,
        meta: `背包 ${entry.count}　總重量 ${formatNumber(getItemWeight(entry.itemId) * entry.count)}`,
        actionChoice: createDroppedItemsDraftChoice({
          returnSceneId,
          itemId: entry.itemId,
          mode: 'place',
          delta: 1,
          label: '放到遺落道具',
          disabledReason: getDroppedItemsPlaceDisabledReason(entry.itemId, draftState)
        })
      };
    });
}

function createDroppedItemsDraftChoice({ returnSceneId, itemId, mode, delta, label, disabledReason = '' }) {
  return {
    id: `dropped_${mode}_${itemId}`,
    label,
    actionType: 'adjustDroppedItemsDraft',
    timeCostSeconds: 0,
    hideCost: true,
    dynamicAction: 'adjustDroppedItemsDraft',
    returnSceneId,
    itemId,
    mode,
    delta,
    disabledReason
  };
}

function getDroppedItemsTakeDisabledReason(itemId, draftState) {
  if (getInventoryCount(draftState.ground, itemId) <= 0) {
    return '這裡已經沒有這個道具。';
  }
  const nextInventory = cloneInventory(draftState.inventory);
  changeInventoryItem(nextInventory, itemId, 1);
  return getInventoryWeight(nextInventory) > getPlayerCarryCapacity() ? getCarryOverLimitMessage() : '';
}

function getDroppedItemsPlaceDisabledReason(itemId, draftState) {
  const facility = facilities.find((candidate) => candidate.id === 'discarded_items');
  if (getInventoryCount(draftState.inventory, itemId) <= 0) {
    return '背包裡沒有這個道具。';
  }
  if (!canDepositItem(facility, itemId)) {
    return getContainerDepositDisabledMessage(facility);
  }
  const nextGround = cloneInventory(draftState.ground);
  changeInventoryItem(nextGround, itemId, 1);
  return getInventoryWeight(nextGround) > getContainerCapacity(facility)
    ? getContainerCapacityDisabledMessage(facility)
    : '';
}

function createDroppedItemsDraftSummaryLines() {
  const takeText = formatTradeDraftLine({
    prefix: '取回',
    entries: Object.entries(droppedItemsDraft?.take || {}),
    getItemName: (itemId) => getItem(itemId)?.name || itemId
  });
  const placeText = formatTradeDraftLine({
    prefix: '放下',
    entries: Object.entries(droppedItemsDraft?.place || {}),
    getItemName: (itemId) => getItem(itemId)?.name || itemId
  });
  return [takeText, placeText].filter(Boolean);
}

function createDroppedItemsFinalizeChoices(returnSceneId) {
  const hasAnyChange = hasDroppedItemsDraftChanges();
  return [
    {
      id: 'confirm_dropped_items_draft',
      label: '確認整理',
      actionType: 'confirmDroppedItemsDraft',
      timeCostSeconds: 0,
      hideCost: true,
      dynamicAction: 'confirmDroppedItemsDraft',
      returnSceneId,
      disabledStatic: !hasAnyChange,
      disabledReason: hasAnyChange ? '' : '尚未調整任何道具。'
    },
    {
      id: 'cancel_dropped_items_draft',
      label: '返回',
      actionType: 'cancelDroppedItemsDraft',
      timeCostSeconds: 0,
      hideCost: true,
      dynamicAction: 'cancelDroppedItemsDraft',
      returnSceneId
    }
  ];
}

function hasDroppedItemsDraftChanges() {
  return Object.values(droppedItemsDraft?.take || {}).some((count) => Number(count || 0) > 0)
    || Object.values(droppedItemsDraft?.place || {}).some((count) => Number(count || 0) > 0);
}

function ensureForageLootDraft(returnSceneId, reset = false) {
  const key = `forageLoot:${returnSceneId || EXPLORATION_SCENE_ID}`;
  if (reset || !forageLootDraft || forageLootDraft.key !== key) {
    forageLootDraft = {
      key,
      returnSceneId: returnSceneId || EXPLORATION_SCENE_ID,
      take: {},
      place: {}
    };
  }
  return forageLootDraft;
}

function getForageLootDraftState() {
  const draft = ensureForageLootDraft(forageLootDraft?.returnSceneId || EXPLORATION_SCENE_ID);
  const loot = cloneInventory(gameState.exploration?.temporaryLoot || []);
  const inventory = cloneInventory(gameState.player.inventory || []);

  for (const [itemId, count] of Object.entries(draft.take || {})) {
    const amount = Number(count || 0);
    if (amount <= 0) continue;
    changeInventoryItem(loot, itemId, -amount);
    changeInventoryItem(inventory, itemId, amount);
  }

  for (const [itemId, count] of Object.entries(draft.place || {})) {
    const amount = Number(count || 0);
    if (amount <= 0) continue;
    changeInventoryItem(inventory, itemId, -amount);
    changeInventoryItem(loot, itemId, amount);
  }

  return {
    loot: normalizeInventory(loot),
    inventory: normalizeInventory(inventory)
  };
}

function createForageLootRows(returnSceneId, draftState, sourceLabel = '找到') {
  return draftState.loot.map((entry) => {
    const item = getItem(entry.itemId);
    const itemName = item?.name || entry.itemId;
    return {
      id: `forage_loot_take_row_${entry.itemId}`,
      itemId: entry.itemId,
      count: entry.count,
      name: itemName,
      meta: `${sourceLabel} ${entry.count}　總重量 ${formatNumber(getItemWeight(entry.itemId) * entry.count)}`,
      actionChoice: createForageLootDraftChoice({
        returnSceneId,
        itemId: entry.itemId,
        mode: 'take',
        label: '放入背包',
        disabledReason: getForageLootTakeDisabledReason(entry.itemId, draftState)
      })
    };
  });
}

function createForageLootInventoryRows(returnSceneId, draftState) {
  const facility = facilities.find((candidate) => candidate.id === 'discarded_items');
  return draftState.inventory
    .filter((entry) => canDepositItem(facility, entry.itemId))
    .map((entry) => {
      const item = getItem(entry.itemId);
      const itemName = item?.name || entry.itemId;
      return {
        id: `forage_loot_place_row_${entry.itemId}`,
        itemId: entry.itemId,
        count: entry.count,
        name: itemName,
        meta: `背包 ${entry.count}　總重量 ${formatNumber(getItemWeight(entry.itemId) * entry.count)}`,
        actionChoice: createForageLootDraftChoice({
          returnSceneId,
          itemId: entry.itemId,
          mode: 'place',
          label: '放到遺落道具',
          disabledReason: getForageLootPlaceDisabledReason(entry.itemId, draftState)
        })
      };
    });
}

function createForageLootDraftChoice({ returnSceneId, itemId, mode, label, disabledReason = '' }) {
  return {
    id: `forage_loot_${mode}_${itemId}`,
    label,
    actionType: 'adjustForageLootDraft',
    timeCostSeconds: 0,
    hideCost: true,
    dynamicAction: 'adjustForageLootDraft',
    returnSceneId,
    itemId,
    mode,
    delta: 1,
    disabledReason
  };
}

function getForageLootTakeDisabledReason(itemId, draftState) {
  if (getInventoryCount(draftState.loot, itemId) <= 0) {
    return '這裡已經沒有這個道具。';
  }
  const nextInventory = cloneInventory(draftState.inventory);
  changeInventoryItem(nextInventory, itemId, 1);
  return getInventoryWeight(nextInventory) > getPlayerCarryCapacity() ? getCarryOverLimitMessage() : '';
}

function getForageLootPlaceDisabledReason(itemId, draftState) {
  const facility = facilities.find((candidate) => candidate.id === 'discarded_items');
  if (getInventoryCount(draftState.inventory, itemId) <= 0) {
    return '背包裡沒有這個道具。';
  }
  if (!canDepositItem(facility, itemId)) {
    return getContainerDepositDisabledMessage(facility);
  }
  return '';
}

function createForageLootDraftSummaryLines(draftState) {
  const takeText = formatTradeDraftLine({
    prefix: '放入背包',
    entries: Object.entries(forageLootDraft?.take || {}),
    getItemName: (itemId) => getItem(itemId)?.name || itemId
  });
  const placeText = formatTradeDraftLine({
    prefix: '放下',
    entries: Object.entries(forageLootDraft?.place || {}),
    getItemName: (itemId) => getItem(itemId)?.name || itemId
  });
  const leaveText = draftState.loot.length ? `將留在遺落道具：${formatInventory(draftState.loot)}。` : '';
  return [takeText, placeText, leaveText].filter(Boolean);
}

function createForageLootFinalizeChoices(returnSceneId, lootMode = 'forage') {
  return [
    {
      id: 'confirm_forage_loot_draft',
      label: '確認整理',
      actionType: 'confirmForageLootDraft',
      timeCostSeconds: 0,
      hideCost: true,
      dynamicAction: 'confirmForageLootDraft',
      returnSceneId,
      lootMode
    },
    {
      id: 'cancel_forage_loot_draft',
      label: '返回',
      actionType: 'cancelForageLootDraft',
      timeCostSeconds: 0,
      hideCost: true,
      dynamicAction: 'cancelForageLootDraft',
      returnSceneId,
      lootMode
    }
  ];
}

function getFacilityStorageText(facility, facilityContext = null) {
  const context = facilityContext || resolveFacilityContext(facility.id, gameState.currentSceneId);
  if (facility.facilityType === 'small_storage') {
    const contents = formatInventory(context.state?.items || []);
    const obtainAction = getFacilityObtainAction(facility);
    if (facility.randomGatherAction) {
      const alreadySearched = isRandomGatherActionUsedUp(context, context.state || {}, facility.randomGatherAction);
      if (contents) {
        return `已發現：${contents}`;
      }
      return alreadySearched ? getRandomGatherUsedStatus(facility) : getRandomGatherAvailableStatus(facility);
    }
    if (contents) {
      return getObtainAvailableStatus(obtainAction);
    }
    return getObtainEmptyStatus(facility, obtainAction);
  }

  if (facility.facilityType === 'container') {
    const state = context.state || {};
    const contents = formatInventory(state.items || []);
    if (facility.id === 'discarded_items') {
      return `內容物：${contents || '空'}`;
    }
    return `內容物：${contents || '空'}\n容量：${formatNumber(getInventoryWeight(state.items || []))} / ${formatNumber(getContainerCapacity(facility))}`;
  }

  return '';
}

function getRandomGatherAvailableStatus(facility) {
  const label = facility?.randomGatherAction?.label || '';
  if (label.includes('翻找')) {
    return '可翻找';
  }
  if (label.includes('尋找')) {
    return '可尋找';
  }
  return '可互動';
}

function getRandomGatherUsedStatus(facility) {
  const label = facility?.randomGatherAction?.label || '';
  if (label.includes('翻找')) {
    return '已翻找';
  }
  if (label.includes('尋找')) {
    return '已尋找';
  }
  return '已使用';
}

function getObtainAvailableStatus(obtainAction) {
  const label = obtainAction?.label || '';
  if (label.includes('摘')) {
    return '可摘取';
  }
  if (label.includes('採')) {
    return '可採集';
  }
  if (label.includes('取')) {
    return '可取出';
  }
  return '可取得';
}

function getObtainEmptyStatus(facility, obtainAction) {
  const label = obtainAction?.label || '';
  if (label.includes('摘')) {
    const itemName = getSingleFixedStorageItemName(facility);
    return itemName ? `${itemName}已被摘取` : '已摘取';
  }
  if (label.includes('採')) {
    return '已採集';
  }
  if (label.includes('取')) {
    return '沒有可取出的內容';
  }
  return '沒有可取得的內容';
}

function getSingleFixedStorageItemName(facility) {
  const itemEntries = Object.entries(facility?.smallStorage?.restockRule?.items || {});
  if (itemEntries.length !== 1) {
    return '';
  }
  return getItem(itemEntries[0][0])?.name || '';
}

function getFacilityObtainAction(facility) {
  const action = facility?.obtainAction || {};
  return {
    label: action.label || '取得',
    contentsLabel: action.contentsLabel || '可取得',
    emptyMessage: action.emptyMessage || `${facility?.name || '設施'}目前沒有可取得的道具。`,
    successMessage: action.successMessage || '已取得道具。'
  };
}

function createDialogueScene(sceneId) {
  const [, villagerId, returnSceneId] = sceneId.split(':');
  const villager = villagers.find((candidate) => candidate.id === villagerId);
  if (!villager) {
    return createLocationScene(locations.find((location) => location.id === returnSceneId) || locations[0]);
  }

  if (!canInteractWithVillager(villagerId)) {
    return createDoNotDisturbDialogueScene(villager, returnSceneId);
  }

  const interactionMode = getNpcInteractionMode(villager);
  const lastText = gameState.lastInteraction && gameState.lastInteraction.villagerId === villagerId
    ? gameState.lastInteraction.text
    : '';
  const npcDescription = lastText.trim() || createNpcImpressionDescription(villager, returnSceneId);

  return {
    id: sceneId,
    title: villager.name,
    subtitle: villager.role || '',
    location: getLocationLabel(getVillagerLocationId(villager)),
    description: [
      npcDescription,
      createDebugInfoBlock([
        `villagerId: ${villager.id}`,
        `interactionMode: ${interactionMode}`,
        `affection: ${gameState.villagers[villager.id]?.affection ?? 'n/a'}`,
        `locationId: ${getVillagerLocationId(villager)}`
      ])
    ].filter(Boolean).join('\n\n'),
    infoRows: [],
    choiceGroups: createNpcInteractionChoiceGroups(villager, returnSceneId)
  };
}

function createNpcImpressionDescription(villager, returnSceneId = '') {
  const candidates = [
    ...getAuthoredNpcImpressionCandidates(villager, returnSceneId),
    ...createGeneratedNpcImpressionCandidates(villager, returnSceneId)
  ].filter((entry) => entry && entry.text);
  const selected = weightedPick(candidates);
  return selected?.text || createNpcPresenceDescription(villager);
}

function createSceneImpressionDescription(scene, locationId = '', options = {}) {
  if (!scene) {
    return '';
  }
  const candidates = getSceneImpressionCandidates(scene, locationId, options)
    .filter((entry) => entry && entry.text);
  const selected = weightedPick(candidates);
  return selected?.text || scene.description || '';
}

function getSceneImpressionCandidates(scene, locationId = '', options = {}) {
  const pools = [
    ...(scene?.impressionInfos || []),
    ...(scene?.sceneImpressionInfos || [])
  ];
  if (options.includeScenery && Array.isArray(scene?.sceneryDescriptions)) {
    pools.push(...scene.sceneryDescriptions);
  }

  return pools
    .map((entry) => normalizeImpressionEntry(entry))
    .filter((entry) => entry.text && doesImpressionMeetConditions(entry.conditions || {}, { locationId }))
    .map((entry) => ({
      text: entry.text,
      weight: Number(entry.weight || 1)
    }));
}

function normalizeImpressionEntry(entry) {
  if (typeof entry === 'string') {
    return { text: entry, weight: 1, conditions: {} };
  }
  return {
    text: entry?.text || entry?.description || '',
    weight: Number(entry?.weight || 1),
    conditions: entry?.conditions || {}
  };
}

function getAuthoredNpcImpressionCandidates(villager, returnSceneId = '') {
  const pools = [
    ...(villager?.impressionInfos || []),
    ...(villager?.appearance?.impressionInfos || [])
  ];
  return pools
    .filter((entry) => doesNpcImpressionMeetConditions(entry.conditions || {}, villager, returnSceneId))
    .map((entry) => ({
      text: entry.text || entry.description || '',
      weight: Number(entry.weight || 1)
    }));
}

function doesNpcImpressionMeetConditions(conditions = {}, villager, returnSceneId = '') {
  const timeBlock = getTimeBlock(gameState.time.secondsOfDay);
  const locationId = returnSceneId || getVillagerLocationId(villager, timeBlock);
  const affection = gameState.villagers?.[villager?.id]?.affection || 0;

  if (typeof conditions.affectionMin === 'number' && affection < conditions.affectionMin) return false;
  if (typeof conditions.affectionMax === 'number' && affection > conditions.affectionMax) return false;
  return doesImpressionMeetConditions(conditions, { locationId, timeBlock });
}

function doesImpressionMeetConditions(conditions = {}, context = {}) {
  const timeBlock = context.timeBlock || getTimeBlock(gameState.time.secondsOfDay);
  const locationId = context.locationId || gameState.currentSceneId || '';
  const flags = gameState.player.flags || [];
  const dailyFlags = gameState.player.dailyFlags || [];

  if (Array.isArray(conditions.timeBlocks) && !conditions.timeBlocks.includes(timeBlock)) return false;
  if (Array.isArray(conditions.locationIds) && !conditions.locationIds.includes(locationId)) return false;
  if (Array.isArray(conditions.locations) && !conditions.locations.includes(getLocationLabel(locationId))) return false;

  const requiredFlags = [
    ...(conditions.requiredFlags || []),
    ...(conditions.requiredFlag ? [conditions.requiredFlag] : [])
  ];
  if (requiredFlags.some((flag) => !flags.includes(flag))) return false;

  const blockedFlags = [
    ...(conditions.blockedFlags || []),
    ...(conditions.blockedFlag ? [conditions.blockedFlag] : [])
  ];
  if (blockedFlags.some((flag) => flags.includes(flag))) return false;

  const requiredDailyFlags = [
    ...(conditions.requiredDailyFlags || []),
    ...(conditions.requiredDailyFlag ? [conditions.requiredDailyFlag] : [])
  ];
  if (requiredDailyFlags.some((flag) => !dailyFlags.includes(flag))) return false;

  const blockedDailyFlags = [
    ...(conditions.blockedDailyFlags || []),
    ...(conditions.blockedDailyFlag ? [conditions.blockedDailyFlag] : [])
  ];
  if (blockedDailyFlags.some((flag) => dailyFlags.includes(flag))) return false;

  return true;
}

function createGeneratedNpcImpressionCandidates(villager, returnSceneId = '') {
  const appearance = villager?.appearance || {};
  const timeBlock = getTimeBlock(gameState.time.secondsOfDay);
  const locationId = returnSceneId || getVillagerLocationId(villager, timeBlock);
  const locationLabel = getLocationLabel(locationId);
  const candidates = [
    { text: appearance.presenceSummary || '', weight: 3 },
    { text: createTimeBasedNpcImpression(villager, appearance, timeBlock), weight: 2 },
    { text: createLocationBasedNpcImpression(villager, appearance, locationLabel), weight: 2 },
    { text: createFlagBasedNpcImpression(villager, appearance), weight: 1 }
  ];
  return candidates.filter((entry) => entry.text);
}

function createTimeBasedNpcImpression(villager, appearance, timeBlock) {
  const name = getNpcSubject(villager);
  if (['夜晚', '深夜'].includes(timeBlock)) {
    return appearance.eyes
      ? `${name}在昏暗裡抬眼看你，${extractLeadPhrase(appearance.eyes)}，比白天更像藏著沒說完的心事。`
      : '';
  }
  if (['清晨', '上午'].includes(timeBlock)) {
    return appearance.clothing
      ? `${name}身上的${extractLeadPhrase(appearance.clothing)}還帶著清早的冷意，動作卻已經收拾得很俐落。`
      : '';
  }
  if (timeBlock === '中午') {
    return appearance.distinctiveFeatures
      ? `${name}停下手邊動作時，${extractLeadPhrase(appearance.distinctiveFeatures)}，那點小習慣比她說出口的話更先露出情緒。`
      : '';
  }
  if (['下午', '傍晚'].includes(timeBlock)) {
    return appearance.silhouette
      ? `${name}站在光線漸斜的地方，${extractLeadPhrase(appearance.silhouette)}，像把一整天的疲憊暫時壓在身後。`
      : '';
  }
  return '';
}

function createLocationBasedNpcImpression(villager, appearance, locationLabel) {
  if (!locationLabel || !appearance.silhouette) {
    return '';
  }
  const name = getNpcSubject(villager);
  return `${name}在${locationLabel}裡顯得格外鮮明：${extractLeadPhrase(appearance.silhouette)}。你還沒開口，就先感覺到她此刻的步調。`;
}

function createFlagBasedNpcImpression(villager, appearance) {
  const flags = gameState.player.flags || [];
  const firstMeetingFlag = getVillagerFirstMeetingFlag(villager?.id);
  if (!firstMeetingFlag || !flags.includes(firstMeetingFlag) || !appearance.distinctiveFeatures) {
    return '';
  }
  const name = getNpcSubject(villager);
  return `${name}已經不像最初那樣完全陌生。你注意到${extractLeadPhrase(appearance.distinctiveFeatures)}，那細節讓先前的交談又短暫浮上心頭。`;
}

function getVillagerFirstMeetingFlag(villagerId) {
  return {
    aida: 'aida_first_village_briefing_seen',
    mira: 'mira_first_potion_lesson_seen',
    nuosi: 'nuosi_first_workshop_meeting_seen',
    sela: 'sela_first_combat_tool_lesson_seen',
    tori: 'tori_first_field_greeting_seen',
    elaine: 'elaine_first_fluorite_intro_seen',
    talkative_cat: 'black_cat_first_encounter_seen'
  }[villagerId] || '';
}

function getNpcSubject(villager) {
  return villager?.id === BLACK_CAT_NPC_ID || villager?.id === 'lizard_merchant' ? '牠' : '她';
}

function createNpcPresenceDescription(villager) {
  const appearance = villager?.appearance || {};
  return appearance.presenceSummary
    || createCompactNpcPresenceSummary(villager, appearance)
    || '對方正安靜地看著你。';
}

function createCompactNpcPresenceSummary(villager, appearance) {
  if (villager?.profileDescription) {
    return extractFirstSentence(villager.profileDescription);
  }
  if (appearance.silhouette) {
    return `她${extractLeadPhrase(appearance.silhouette)}。`;
  }
  if (appearance.eyes) {
    return `她看著你，${extractLeadPhrase(appearance.eyes)}。`;
  }
  return villager?.personality ? `她看起來${extractLeadPhrase(villager.personality)}。` : '';
}

function extractLeadPhrase(text) {
  return String(text || '').split(/[，。；;]/)[0].trim();
}

function extractFirstSentence(text) {
  return String(text || '').split(/[。！？]/)[0].trim();
}

function createDoNotDisturbDialogueScene(villager, returnSceneId) {
  return {
    id: `dialogue:${villager?.id || 'unknown'}:${returnSceneId}`,
    title: villager?.name || '角色',
    subtitle: villager?.role || '',
    location: getLocationLabel(DORMITORY_LOCATION_ID),
    description: `${villager?.name || '對方'}多半已經歇下了。這種安靜的時候，還是別把人吵醒比較好。`,
    choices: [createReturnChoice(returnSceneId)]
  };
}

function getAvailableQuestsForVillager(villagerId) {
  return quests.filter((quest) =>
    quest.giver === villagerId
    && !isQuestCompleted(quest.id)
    && !isQuestActive(quest.id)
    && meetsQuestPrerequisites(quest.prerequisites || {})
  );
}

function getActiveQuestsForVillager(villagerId) {
  return quests.filter((quest) => quest.giver === villagerId && isQuestActive(quest.id));
}

function getSubmittableQuestsForVillager(villagerId) {
  return getActiveQuestsForVillager(villagerId)
    .filter((quest) => !getQuestCompletionDisabledReason(quest, villagerId));
}

function createOfferQuestChoice(quest, villagerId, returnSceneId) {
  return {
    id: `offer_quest_${quest.id}`,
    label: createQuestActionLabel(quest, 'offer', villagerId),
    actionType: 'quest',
    timeCostSeconds: 0,
    hideCost: true,
    dynamicAction: 'startQuestEvent',
    eventId: `quest_offer_${quest.id}`,
    questEventType: 'questOffer',
    questId: quest.id,
    villagerId,
    returnSceneId
  };
}

function createSubmitQuestChoice(quest, villagerId, returnSceneId) {
  return {
    id: `submit_quest_${quest.id}`,
    label: createQuestActionLabel(quest, 'submit', villagerId),
    actionType: 'quest',
    timeCostSeconds: 0,
    hideCost: true,
    dynamicAction: 'startQuestEvent',
    eventId: `quest_complete_${quest.id}`,
    questEventType: 'questComplete',
    questId: quest.id,
    villagerId,
    returnSceneId
  };
}

function createQuestActionLabel(quest, type, villagerId) {
  const villagerName = getVillagerName(villagerId);
  if (type === 'submit') {
    return quest.submitLabel || `向${villagerName}交代完成的事`;
  }
  return quest.offerLabel || `問${villagerName}還有什麼事`;
}

function formatQuestObjectiveProgress(objective) {
  if (objective.type === 'collectItem' || objective.type === 'submitItems') {
    const requiredCount = Number(objective.requiredCount || 0);
    const owned = getInventoryCount(gameState.player.inventory, objective.targetId);
    const current = Math.min(requiredCount, owned);
    return `${objective.description}（${current}/${requiredCount}）`;
  }

  if (objective.type === 'talkToVillager') {
    return `${objective.description}（待回報）`;
  }

  return objective.description || '';
}

function createEventScene(sceneId) {
  const [, eventId, pageId] = sceneId.split(':');
  const event = getEventById(eventId);
  const page = getEventPage(eventId, pageId);
  const returnSceneId = gameState.events?.active?.returnSceneId || FALLBACK_SCENE_ID;
  const returnPosition = getResolvedPlayerPosition(returnSceneId);
  if (!event || !page) {
    finishActiveEvent(returnSceneId);
    return getCurrentScene();
  }

  const pageChoices = Array.isArray(page.choices) ? page.choices : [];
  let choices = [];
  if (pageChoices.length) {
    choices = pageChoices.map((entry) => ({
      id: `${eventId}_${pageId}_${entry.id || entry.targetEventId}`,
      label: entry.label,
      actionType: 'event',
      timeCostSeconds: Number(entry.timeCostSeconds || 0),
      hideCost: entry.hideCost ?? Number(entry.timeCostSeconds || 0) <= 0,
      dynamicAction: 'chooseEventBranch',
      eventId,
      pageId,
      targetEventId: entry.targetEventId,
      targetSceneId: entry.targetSceneId,
      transition: entry.transition || null,
      effects: entry.effects || {},
      resultMessage: entry.resultMessage || '',
      progressLabel: entry.progressLabel || '',
      returnSceneId
    }));
  } else {
    const nextPageId = page.nextPageId || getNextEventPageId(event, pageId);
    const nextPage = nextPageId ? getEventPage(eventId, nextPageId) : null;
    choices = [{
      id: nextPageId ? `event_next_${eventId}_${pageId}` : `event_finish_${eventId}_${pageId}`,
      label: page.continueLabel || (nextPageId ? '下一頁' : '結束'),
      actionType: 'event',
      timeCostSeconds: 0,
      hideCost: true,
      dynamicAction: nextPageId ? 'advanceEventPage' : 'finishEvent',
      eventId,
      pageId,
      targetPageId: nextPageId,
      transition: nextPage?.transition || (!nextPageId ? page.finishTransition : null),
      returnSceneId
    }];
  }

  return {
    id: sceneId,
    title: page.title || event.title,
    location: returnPosition.name || getSceneLocationLabel(returnSceneId),
    description: resolveEventPageText(page.text || ''),
    choiceGroups: [
      {
        title: pageChoices.length ? '選擇' : '繼續',
        choices
      }
    ]
  };
}

function resolveEventPageText(text) {
  const source = String(text || '');
  if (!source.includes('{mealFood')) {
    return source;
  }
  const context = normalizeDinnerContext(gameState.events?.active?.dinnerContext);
  if (!context) {
    return source
      .replaceAll('{mealFood}', getDinnerTokenFallback('{mealFood}'))
      .replaceAll('{mealFoodPhrase}', getDinnerTokenFallback('{mealFoodPhrase}'))
      .replaceAll('{mealFoodPair}', getDinnerTokenFallback('{mealFoodPair}'))
      .replaceAll('{mealFoodComment}', getDinnerTokenFallback('{mealFoodComment}'));
  }
  return source
    .replaceAll('{mealFood}', getDinnerTokenValue(context, 'mealFood'))
    .replaceAll('{mealFoodPhrase}', getDinnerTokenValue(context, 'mealFoodPhrase'))
    .replaceAll('{mealFoodPair}', getDinnerFoodPairText(context))
    .replaceAll('{mealFoodComment}', getDinnerTokenValue(context, 'mealFoodComment'));
}

function getDinnerTokenValue(context, key) {
  const itemId = context?.tokenFoodIds?.[key] || context?.selectedFoods?.[0]?.itemId || '';
  const food = getDinnerFoodConfig(itemId);
  if (!food) {
    return getDinnerTokenFallback(`{${key}}`);
  }
  if (key === 'mealFoodPhrase') {
    return food.dinnerPhrase || food.dinnerLabel || getItem(itemId)?.name || itemId;
  }
  if (key === 'mealFoodComment') {
    return food.dinnerComment || food.dinnerPhrase || food.dinnerLabel || getItem(itemId)?.name || itemId;
  }
  return food.dinnerLabel || getItem(itemId)?.name || itemId;
}

function getDinnerFoodPairText(context) {
  const labels = (context?.mealFoodPairIds || [])
    .map((itemId) => getDinnerFoodConfig(itemId)?.dinnerLabel || getItem(itemId)?.name || '')
    .filter(Boolean);
  if (!labels.length) {
    return getDinnerTokenValue(context, 'mealFood');
  }
  return formatNaturalList(labels);
}

function getDinnerTokenFallback(token) {
  return getDinnerActivity()?.dynamicText?.fallbacks?.[token] || '食材';
}

function createNameProtagonistScene() {
  return {
    id: NAME_PROTAGONIST_SCENE_ID,
    title: '說出名字',
    location: '山谷村',
    description: '艾妲的問題落下後，屋內忽然安靜下來。\n\n你仍然記不起自己為什麼會走進山谷，也不想回頭翻那些已經模糊的過去。至少此刻，你需要一個能被她們叫出口的名字。',
    choiceGroups: [{
      title: '主角名字',
      type: 'nameInput',
      placeholder: '輸入名字',
      submitLabel: '確認名字',
      note: '最多 12 個字。名字會保存在目前存檔中。'
    }]
  };
}

async function confirmProtagonistName(choice = {}) {
  const name = normalizeProtagonistName(choice.value);
  if (!name) {
    recordFailedAction({ id: 'confirm_protagonist_name', label: '確認名字' }, '請輸入主角的名字。');
    return;
  }

  await showSceneTransition({ transition: 'fade' });
  gameState.player.name = name;
  clearActionResultDisplay();
  if (!startEvent('opening_recovery_intro', {
    returnSceneId: 'village_square_hub',
    triggerType: 'openingNameConfirmed',
    triggerSourceId: 'protagonist_name',
    triggerContextKey: 'openingNameConfirmed'
  })) {
    gameState.currentSceneId = FALLBACK_SCENE_ID;
  }
  saveGame(`主角的名字已記為 ${name}。`);
  render();
  await finishSceneTransition();
}

function createQuestOfferDialogue(villager, quest) {
  const description = String(quest.description || '').trim();
  if (/[「」『』]/.test(description)) {
    return `${description}\n\n你要答應這份委託嗎？`;
  }
  return `${villager.name}看了你一眼。\n\n「${description}」\n\n你要答應這份委託嗎？`;
}

function createQuestSubmitDialogue(villager, quest) {
  return `${villager.name}低頭確認了你帶來的東西，神情像是終於鬆了一口氣。\n\n這件事到這裡總算正式交代清楚了。`;
}

function createLegacyQuestReturnScene(sceneId) {
  const parts = sceneId.split(':');
  const villagerId = parts[1] || '';
  const returnSceneId = parts[sceneId.startsWith('quest:') ? 2 : 3] || FALLBACK_SCENE_ID;
  if (villagers.some((villager) => villager.id === villagerId)) {
    gameState.currentSceneId = `dialogue:${villagerId}:${returnSceneId}`;
    return createDialogueScene(gameState.currentSceneId);
  }
  gameState.currentSceneId = returnSceneId;
  return getCurrentScene();
}

function getQuestCompletionDisabledReason(quest, villagerId) {
  if (!isQuestActive(quest.id)) {
    return '這個委託尚未接取。';
  }

  for (const objective of quest.objectives || []) {
    const reason = getQuestObjectiveDisabledReason(objective, villagerId);
    if (reason) {
      return reason;
    }
  }
  return '';
}

function getQuestObjectiveDisabledReason(objective, villagerId) {
  if (objective.type === 'collectItem' || objective.type === 'submitItems') {
    const requiredCount = Number(objective.requiredCount || 0);
    const owned = getInventoryCount(gameState.player.inventory, objective.targetId);
    if (owned < requiredCount) {
      const itemName = getItem(objective.targetId)?.name || objective.targetId;
      return `需要 ${itemName} x${requiredCount}，目前 x${owned}。`;
    }
    return '';
  }

  if (objective.type === 'talkToVillager') {
    return objective.targetId === villagerId ? '' : '需要向指定對象回報。';
  }

  return '';
}

function getDialogueCommandIds(villager) {
  const commandIds = [...getCommandSet('dialogueMenu')];
  const rules = villager.socialRules || {};
  const interactionRule = getNpcInteractionRule(villager);
  const interactions = interactionRule?.interactions || {};

  if (villager.npcType === 'special_merchant') {
    removeFromArray(commandIds, 'gift');
  }
  for (const commandId of ['chat', 'gift', 'trade', 'quest']) {
    if (interactions[commandId] === false) {
      removeFromArray(commandIds, commandId);
    }
  }
  if (rules.canReceiveGifts === false) removeFromArray(commandIds, 'gift');
  if (rules.canUseNormalTrade === false) removeFromArray(commandIds, 'trade');
  if (rules.canUseNormalQuestMenu === false) removeFromArray(commandIds, 'quest');
  return commandIds;
}

function normalizeNpcInteractionMode(mode) {
  const supportedModes = new Set(['menuView']);
  return supportedModes.has(mode) ? mode : 'menuView';
}

function getNpcInteractionMode(villager) {
  return normalizeNpcInteractionMode(villager?.interactionMode || getNpcInteractionRule(villager)?.interactionMode);
}

function createNpcInteractionChoiceGroups(villager, returnSceneId) {
  const commandIds = getDialogueCommandIds(villager)
    .filter((commandId) => commandId !== 'leave')
    .filter((commandId) => commandId !== 'quest')
    .filter((commandId) => shouldShowDialogueCommand(villager, commandId));
  const questGroup = createNpcQuestChoiceGroup(villager, returnSceneId);

  return [
    {
      title: '互動',
      choices: [
        ...commandIds.map((commandId) => createDialogueChoice(villager, commandId, returnSceneId)),
        ...createNpcFeatureChoices(villager, returnSceneId)
      ]
    },
    ...(questGroup ? [questGroup] : []),
    {
      title: '設施協助',
      choices: createFacilityUpgradeChoices(villager)
    },
    {
      title: '其他',
      choices: [createReturnChoice(returnSceneId, villager)]
    }
  ];
}

function createLocationInquiryScene(sceneId) {
  const [, villagerId, returnSceneId = FALLBACK_SCENE_ID] = sceneId.split(':');
  const villager = villagers.find((candidate) => candidate.id === villagerId);
  if (!villager) {
    return createLocationScene(locations.find((location) => location.id === returnSceneId) || locations[0]);
  }
  const targets = getLocationInquiryTargets(villager, returnSceneId);
  return {
    id: sceneId,
    title: '詢問位置',
    subtitle: villager.role || '',
    location: getSceneLocationLabel(returnSceneId),
    description: createLocationInquiryPrompt(villager, targets),
    choiceGroups: [
      {
        title: '想問誰的位置',
        choices: targets.map((target) => createLocationInquiryTargetChoice(villager, target, returnSceneId))
      },
      {
        title: '其他',
        choices: [createReturnChoice(`dialogue:${villager.id}:${returnSceneId}`)]
      }
    ]
  };
}

function createLocationInquiryPrompt(villager, targets) {
  if (!targets.length) {
    return `${villager.name}看了看附近。\n\n現在能想到的人都在這裡，沒有什麼需要特地問的位置。`;
  }
  const authored = villager.locationInquiry?.prompt;
  if (authored) {
    return authored;
  }
  return `${villager.name}順著你的問題想了想。\n\n村裡地方不大，只要知道現在是什麼時候，大概就能猜到誰在哪裡。`;
}

function createLocationInquiryTargetChoice(asker, target, returnSceneId) {
  return {
    id: `${asker.id}_ask_location_${target.id}`,
    label: target.name,
    subtitle: target.role || '',
    actionType: 'specialInfo',
    timeCostSeconds: 0,
    hideCost: true,
    dynamicAction: 'askVillagerLocation',
    villagerId: asker.id,
    targetVillagerId: target.id,
    returnSceneId
  };
}

function createLocationInquiryResponse(asker, target) {
  const targetLocationId = getVillagerLocationId(target);
  const targetLocationName = getLocationLabel(targetLocationId) || '不太確定的地方';
  const timeBlock = getTimeBlock(gameState.time.secondsOfDay);
  const authoredResponses = getLocationInquiryAuthoredResponses(asker, target, targetLocationId, timeBlock);
  const responsePool = authoredResponses.length
    ? authoredResponses
    : [{ text: createFallbackLocationInquiryResponse(asker, target, targetLocationName, timeBlock), weight: 1 }];
  const selected = weightedPick(responsePool.filter((entry) => entry.text));
  return applyLocationInquiryTemplate(selected?.text || '', {
    asker,
    target,
    locationName: targetLocationName,
    timeBlock
  });
}

function getLocationInquiryAuthoredResponses(asker, target, targetLocationId, timeBlock) {
  return (asker.locationInquiry?.responses || [])
    .filter((entry) => {
      const conditions = entry.conditions || {};
      if (!Array.isArray(conditions.targetVillagerIds) || !conditions.targetVillagerIds.includes(target.id)) return false;
      if (Array.isArray(conditions.targetLocationIds) && !conditions.targetLocationIds.includes(targetLocationId)) return false;
      if (Array.isArray(conditions.timeBlocks) && !conditions.timeBlocks.includes(timeBlock)) return false;
      return true;
    })
    .map((entry) => ({
      text: entry.text || '',
      weight: Number(entry.weight || 1)
    }));
}

function applyLocationInquiryTemplate(text, context) {
  return String(text || '')
    .replaceAll('{targetName}', context.target?.name || '她')
    .replaceAll('{targetRole}', context.target?.role || '')
    .replaceAll('{locationName}', context.locationName || '')
    .replaceAll('{timeBlock}', context.timeBlock || '');
}

function createFallbackLocationInquiryResponse(asker, target, locationName, timeBlock) {
  const openerByAsker = {
    aida: '艾妲把記事紙往下壓：「往{locationName}找{targetName}。」她說得很穩，像先把這件事放進今天還能處理的清單裡。',
    mira: '米菈收好手邊的藥草：「{targetName}的話，去{locationName}看看。」她說得很輕，卻沒有敷衍這個問題。',
    nuosi: '諾絲把工具放回桌邊：「找{targetName}就去{locationName}。」她答得很快，像不想讓這種問題占用太多工坊時間。',
    sela: '賽拉先看了一眼你要走的路：「{locationName}，找{targetName}。」她把答案壓得很短，注意力卻仍在出口。',
    tori: '托莉眼睛一亮：「去{locationName}！{targetName}常會在那邊冒出來。」她說得像剛發現一條小捷徑。',
    elaine: '伊蓮輕輕碰了碰鑰匙串：「往{locationName}找{targetName}吧。」那語氣像把一頁折角重新攤平。'
  };
  const followupByTarget = {
    aida: {
      aida: '「如果她正在看記錄，先讓她把那一行寫完。艾妲最怕事情被打斷後少了一個人手。」',
      mira: '「艾妲通常不會離該處理的事太遠。你找到她時，先把來意說清楚，她比較能安排。」',
      nuosi: '「找艾妲就直接說重點。她不是不聽閒話，是手上通常已經排著三件正事。」',
      sela: '「她若在那裡，多半是在確認村裡的安排。別從她背後突然開口。」',
      tori: '「艾妲在忙的時候也會聽人說話，可是你要先等她抬頭。不然她會一邊答你，一邊把事情記到紙上。」',
      elaine: '「她會在能看見大家動向的地方停下。你找到她時，大概也會被順手交代一件事。」'
    },
    mira: {
      aida: '「米菈若正在處理藥草，門邊動作放輕一點。她安靜，不代表沒注意到誰進來。」',
      mira: '「如果她手上有藥草或繃帶，先等她放穩。她會回答，只是不喜歡急著打斷手邊的事。」',
      nuosi: '「去找米菈別亂碰瓶子。弄倒一排的話，我可不幫你修尷尬。」',
      sela: '「找米菈時先出聲。藥草棚裡東西多，讓她知道是你，比突然靠近安全。」',
      tori: '「米菈如果在那裡，可能正在忙很細的事。你可以小聲一點，然後不要碰看起來很好奇的瓶子。」',
      elaine: '「米菈常在安靜的地方把事情做完。你若找她，讓聲音先到，人再靠近。」'
    },
    nuosi: {
      aida: '「諾絲若在工坊附近，先看地上有沒有工具。她嘴上會嫌你擋路，其實是怕你踩壞或踩傷。」',
      mira: '「如果聽見敲打聲，多半就是她。你找她時別急著插話，等她手上的力道停一下。」',
      nuosi: '「找我？你已經找到了。找別人就快去，別在這裡把路也問壞。」',
      sela: '「諾絲做事時警覺也不差，只是她會先罵工具。你靠近前最好讓她聽見。」',
      tori: '「諾絲嗎？如果她看起來很兇，不一定是生氣，也可能只是某個東西又壞得很有主見。」',
      elaine: '「諾絲留下的痕跡很好認：木屑、鐵屑，還有一句被她忍住沒說完的抱怨。」'
    },
    sela: {
      aida: '「賽拉通常會站在能看見出口的位置。你找她時別只顧著喊人，先注意腳下。」',
      mira: '「賽拉如果在那裡，多半不是閒逛。你靠近時讓她先看見你，別讓她以為有什麼追上來。」',
      nuosi: '「找賽拉就別繞小路。她會知道，而且八成會用那種眼神看你。」',
      sela: '「如果你找的是我，先說事。若是要問路，我會希望你聽完再走。」',
      tori: '「賽拉會注意很遠的地方，所以你不要突然從旁邊跳出來。她不會嚇到，但你可能會。」',
      elaine: '「賽拉常把自己放在能替大家多看一眼的位置。找到她時，先讓她把遠處確認完。」'
    },
    tori: {
      aida: '「托莉若在那裡，八成已經把事情做得比她自己說的還多。你過去時提醒她慢一點。」',
      mira: '「托莉容易一忙就忘記休息。你找到她時，順手問她有沒有喝水。」',
      nuosi: '「托莉？她多半跑得比事情還快。你要找她就快點，免得她又把下一件事也接走。」',
      sela: '「托莉會把腳步放得很輕，直到她忘記自己該放輕。你找到她時，讓她先停下來看路。」',
      tori: '「咦，是找我嗎？我在這裡！如果你要找的是剛才的我，那她可能已經跑去下一件事那邊了。」',
      elaine: '「托莉留下的位置通常不難找。哪裡多了一點泥、一點笑聲，或一個被扶正的小東西，她大概剛經過。」'
    },
    elaine: {
      aida: '「伊蓮若在那裡，可能正在把舊事和今天的事放到同一張紙上。你找她時，給她一點收尾的時間。」',
      mira: '「伊蓮會聽見你靠近，只是未必馬上抬頭。她常像在看書，其實也在看大家。」',
      nuosi: '「找伊蓮就去那邊。她說話繞，可人不難找，通常哪裡需要鑰匙或記錄，她就在哪裡。」',
      sela: '「伊蓮看起來慢，其實記得很多路。你問她事時，別被她的玩笑帶得忘了原本要問什麼。」',
      tori: '「伊蓮的話，她可能在那裡。你找到她時要小心，她會笑著講一句話，然後你才發現自己被點名了。」',
      elaine: '「如果你要找我，我就在這裡。若你找的是剛才那個想偷懶的我，她大概已經被舍監本人抓回來了。」'
    }
  };
  const opener = openerByAsker[asker?.id] || '「往{locationName}找{targetName}。」';
  const followup = followupByTarget[target?.id]?.[asker?.id] || '';
  return [opener, followup].filter(Boolean).join('\n\n');
}

function getLocationInquiryTargets(asker, returnSceneId = '') {
  if (!asker || !isCoreVillager(asker)) {
    return [];
  }
  const askerLocationId = returnSceneId || getVillagerLocationId(asker);
  return villagers
    .filter((villager) => villager.id !== asker.id && isCoreVillager(villager))
    .filter((villager) => {
      const locationId = getVillagerLocationId(villager);
      return locationId && locationId !== askerLocationId && !isDormitoryDeepNightUnavailable(villager, getTimeBlock(gameState.time.secondsOfDay));
    });
}

function hasLocationInquiryTargets(villager, returnSceneId = '') {
  return getLocationInquiryTargets(villager, returnSceneId).length > 0;
}

function createNpcQuestChoiceGroup(villager, returnSceneId) {
  if (!villager) {
    return null;
  }

  const availableQuests = getAvailableQuestsForVillager(villager.id);
  const submittableQuests = getSubmittableQuestsForVillager(villager.id);
  const choices = [
    ...availableQuests.map((quest) => createOfferQuestChoice(quest, villager.id, returnSceneId)),
    ...submittableQuests.map((quest) => createSubmitQuestChoice(quest, villager.id, returnSceneId))
  ];
  if (!choices.length) {
    return null;
  }

  return {
    title: '委託',
    choices
  };
}

function createNpcFeatureChoices(villager, returnSceneId) {
  return [
    ...createNpcRuleActionChoices(villager, returnSceneId),
    ...createVillagerInteractionActionChoices(villager, returnSceneId),
    ...createAidaSkillTrainingEntryChoices(villager, returnSceneId),
    ...createDinnerActivityChoices(villager, returnSceneId)
  ];
}

function createAidaSkillTrainingEntryChoices(villager, returnSceneId) {
  if (villager?.id !== 'aida') {
    return [];
  }
  return [{
    id: 'aida_open_training_menu',
    label: '安排訓練',
    actionType: 'training',
    timeCostSeconds: 0,
    hideCost: true,
    dynamicAction: 'openAidaSkillTrainingMenu',
    villagerId: villager.id,
    returnSceneId
  }];
}

function openAidaSkillTrainingMenu(choice) {
  if (choice.villagerId !== 'aida') {
    recordFailedAction(choice, '只有艾妲能安排這類訓練。');
    return;
  }
  clearActionResultDisplay();
  gameState.currentSceneId = `aidaTraining:${choice.returnSceneId || FALLBACK_SCENE_ID}`;
  saveGame();
  render();
}

function createAidaSkillTrainingScene(sceneId) {
  const [, returnSceneId = FALLBACK_SCENE_ID] = sceneId.split(':');
  const aida = villagers.find((villager) => villager.id === 'aida');
  return {
    id: sceneId,
    title: '安排訓練',
    subtitle: aida?.role || '',
    location: getSceneLocationLabel(returnSceneId),
    description: '艾妲把手上的記錄紙合起來，看了看你，又看向村裡幾條通往工坊、藥草棚和開墾區的路。\n\n「你可能要累積足夠的貢獻，我才能說動大家幫你安排訓練。」她說得很直接，卻不是拒絕。「大家手上的事都不少；可如果你真的一直在幫忙，她們會願意花時間替你想辦法。」',
    choiceGroups: [
      {
        title: '訓練',
        choices: createAidaSkillTrainingChoices(aida, returnSceneId)
      },
      {
        title: '其他',
        choices: [createReturnChoice(`dialogue:aida:${returnSceneId}`)]
      }
    ]
  };
}

function createAidaSkillTrainingChoices(villager, returnSceneId) {
  if (villager?.id !== 'aida') {
    return [];
  }
  return AIDA_SKILL_TRAINING_OPTIONS.map((training) => {
    const currentLevel = getSkillValue(training.skillKey);
    const nextLevel = currentLevel + 1;
    const cost = getAidaSkillTrainingCost(nextLevel);
    const eventId = training.eventIds[nextLevel] || '';
    const label = nextLevel <= AIDA_SKILL_TRAINING_MAX_LEVEL
      ? `${training.label} Lv.${nextLevel}`
      : `${training.label} Lv.${AIDA_SKILL_TRAINING_MAX_LEVEL}`;
    return {
      id: `aida_training_${training.skillKey}_${nextLevel}`,
      label,
      subtitle: nextLevel <= AIDA_SKILL_TRAINING_MAX_LEVEL
        ? `耗時 ${formatDuration(AIDA_SKILL_TRAINING_TIME_COST_SECONDS)} / 需要貢獻 ${cost}`
        : '',
      actionType: 'training',
      timeCostSeconds: 0,
      hideCost: true,
      dynamicAction: 'startAidaSkillTraining',
      villagerId: villager.id,
      skillKey: training.skillKey,
      nextLevel,
      cost,
      eventId,
      returnSceneId,
      disabledReason: getAidaSkillTrainingDisabledReason(training, nextLevel, cost, eventId)
    };
  });
}

function getAidaSkillTrainingCost(level) {
  const costsByLevel = {
    1: 100,
    2: 150
  };
  const normalizedLevel = Math.max(1, Number(level || 1));
  return costsByLevel[normalizedLevel] || 100 + (normalizedLevel - 1) * 50;
}

function getAidaSkillTrainingDisabledReason(training, nextLevel, cost, eventId) {
  if (nextLevel > AIDA_SKILL_TRAINING_MAX_LEVEL) {
    return '目前這項訓練暫時只能到 2 級。';
  }
  if (!eventId || !getEventById(eventId)) {
    return '這項訓練演出尚未準備好。';
  }
  const contribution = Number(gameState.player.contribution || 0);
  if (contribution < cost) {
    return `需要貢獻 ${cost}，目前 ${contribution}。`;
  }
  return '';
}

function startAidaSkillTraining(choice) {
  if (choice.villagerId !== 'aida') {
    recordFailedAction(choice, '只有艾妲能安排這類訓練。');
    return;
  }
  const training = AIDA_SKILL_TRAINING_OPTIONS.find((entry) => entry.skillKey === choice.skillKey);
  if (!training) {
    recordFailedAction(choice, '找不到這項訓練資料。');
    return;
  }
  const currentLevel = getSkillValue(training.skillKey);
  const expectedNextLevel = currentLevel + 1;
  const cost = getAidaSkillTrainingCost(expectedNextLevel);
  const eventId = training.eventIds[expectedNextLevel] || '';
  const disabledReason = getAidaSkillTrainingDisabledReason(training, expectedNextLevel, cost, eventId);
  if (disabledReason) {
    recordFailedAction(choice, disabledReason);
    return;
  }
  clearActionResultDisplay();
  if (!startEvent(eventId, {
    returnSceneId: `dialogue:aida:${choice.returnSceneId || FALLBACK_SCENE_ID}`,
    triggerType: 'skillTraining',
    triggerSourceId: `aida:${training.skillKey}:${expectedNextLevel}`,
    triggerContextKey: `skillTraining:aida:${training.skillKey}:${expectedNextLevel}`
  })) {
    recordFailedAction(choice, '訓練事件不存在。');
    return;
  }
  saveGame(`艾妲開始安排${training.label}。`);
  render();
}

function openKnowledge(choice) {
  clearActionResultDisplay();
  const returnSceneId = choice.returnSceneId || FALLBACK_SCENE_ID;
  const knowledgeSceneId = `knowledge:${choice.villagerId}:${returnSceneId}`;
  const context = {
    type: 'knowledgeOpen',
    villagerId: choice.villagerId,
    sceneId: returnSceneId,
    returnSceneId: knowledgeSceneId,
    triggerSourceId: choice.villagerId,
    triggerContextKey: `knowledgeOpen:${choice.villagerId}:${returnSceneId}`
  };
  if (!tryStartTriggeredEvent(context)) {
    gameState.currentSceneId = knowledgeSceneId;
  }
  saveGame();
  render();
}

function openKnowledgePage(choice) {
  clearActionResultDisplay();
  let learnedEnemyName = '';
  if (choice.enemyId && Number(choice.pageIndex || 0) >= 1) {
    const learned = rememberKnownEnemyWeakness(choice.enemyId);
    if (learned) {
      learnedEnemyName = enemies.find((entry) => entry.id === choice.enemyId)?.name || choice.enemyId;
    }
  }
  gameState.currentSceneId = choice.nextSceneId || choice.targetSceneId || FALLBACK_SCENE_ID;
  if (learnedEnemyName) {
    recordInformationalAction(choice, `你理解了${learnedEnemyName}的應對方式。之後遭遇牠時，可以查看賽拉的情報。`);
  }
  saveGame();
  render();
}

function createKnowledgeScene(sceneId) {
  const [, villagerId, returnSceneId = FALLBACK_SCENE_ID] = sceneId.split(':');
  const villager = villagers.find((candidate) => candidate.id === villagerId);
  const knowledge = getVillagerKnowledge(villagerId);
  return {
    id: sceneId,
    title: `問${villager?.name || '伊蓮'}知道些什麼`,
    subtitle: villager?.role || '',
    location: getSceneLocationLabel(returnSceneId),
    description: knowledge?.introText || '對方安靜地等你把問題說清楚。',
    choiceGroups: [
      {
        title: '想問的事',
        choices: (knowledge?.categoryQuestions || []).map((category) => ({
          id: `knowledge_category_${category.id}`,
          label: category.label,
          actionType: 'knowledge',
          timeCostSeconds: 0,
          hideCost: true,
          nextSceneId: `knowledgeCategory:${villagerId}:${category.id}:${returnSceneId}`
        }))
      },
      {
        title: '返回',
        choices: [createReturnChoice(`dialogue:${villagerId}:${returnSceneId}`)]
      }
    ]
  };
}

function createKnowledgeCategoryScene(sceneId) {
  const [, villagerId, categoryId, returnSceneId = FALLBACK_SCENE_ID] = sceneId.split(':');
  const knowledge = getVillagerKnowledge(villagerId);
  const category = (knowledge?.categoryQuestions || []).find((entry) => entry.id === categoryId);
  const topicChoices = createKnowledgeCategoryChoices(villagerId, categoryId, returnSceneId);
  return {
    id: sceneId,
    title: category?.label || '想問的事',
    location: getSceneLocationLabel(returnSceneId),
    description: category?.description || '對方安靜地等你把問題說清楚。',
    choiceGroups: [
      {
        title: '可以問',
        choices: topicChoices,
        emptyLabel: '目前沒有整理好的內容。'
      },
      {
        title: '返回',
        choices: [createReturnChoice(`knowledge:${villagerId}:${returnSceneId}`)]
      }
    ]
  };
}

function getVillagerKnowledge(villagerId) {
  if (villagerId === 'sela') {
    return selaKnowledge;
  }
  return elaineKnowledge;
}

function createKnowledgeCategoryChoices(villagerId, categoryId, returnSceneId) {
  if (villagerId === 'sela' && categoryId === 'enemy_knowledge') {
    return createSelaEnemyKnowledgeChoices(villagerId, returnSceneId);
  }
  if (villagerId === 'sela' && categoryId === 'forest_notes') {
    return createKnowledgeTopicChoices(villagerId, categoryId, returnSceneId);
  }
  return categoryId === 'item_sources'
    ? createKnowledgeItemSourceChoices(villagerId, returnSceneId)
    : createKnowledgeTopicChoices(villagerId, categoryId, returnSceneId);
}

function createSelaEnemyKnowledgeChoices(villagerId, returnSceneId) {
  const encounteredIds = new Set(normalizeEncounteredEnemyIds(gameState.player.encounteredEnemyIds));
  return enemies
    .filter((enemy) => encounteredIds.has(enemy.id))
    .map((enemy) => ({
      id: `knowledge_enemy_${enemy.id}`,
      label: enemy.name,
      actionType: 'knowledge',
      timeCostSeconds: 0,
      hideCost: true,
      dynamicAction: 'openKnowledgePage',
      nextSceneId: `knowledgeEnemy:${villagerId}:${enemy.id}:0:${returnSceneId}`
    }));
}

function createKnowledgeItemSourceChoices(villagerId, returnSceneId) {
  return getKnowledgeSourceItems().map((item) => ({
    id: `knowledge_item_${item.id}`,
    label: item.name,
    actionType: 'knowledge',
    timeCostSeconds: 0,
    hideCost: true,
    nextSceneId: `knowledgeItem:${villagerId}:${item.id}:0:${returnSceneId}`
  }));
}

function getKnowledgeSourceItems() {
  const questItemIds = getCurrentQuestRequirementItemIds();
  const obtainedItemIds = new Set(normalizeObtainedItemIds(gameState.player.obtainedItemIds, gameState.player.inventory || []));
  return items
    .filter((item) => isKnowledgeSourceItem(item))
    .map((item, index) => ({ item, index }))
    .sort((a, b) => {
      const priorityA = questItemIds.has(a.item.id) ? 0 : obtainedItemIds.has(a.item.id) ? 1 : 2;
      const priorityB = questItemIds.has(b.item.id) ? 0 : obtainedItemIds.has(b.item.id) ? 1 : 2;
      return priorityA - priorityB || a.index - b.index;
    })
    .map(({ item }) => item);
}

function isKnowledgeSourceItem(item) {
  if (!item) {
    return false;
  }
  if (item.category === 'material' || item.category === 'resource') {
    return true;
  }
  const tags = item.tags || [];
  const isEdible = item.category === 'consumable' && Number(item.effects?.stamina || 0) > 0;
  const isConsumableCombatTool = item.category === 'consumable' && tags.includes('戰鬥工具');
  return isEdible || isConsumableCombatTool;
}

function getCurrentQuestRequirementItemIds() {
  const ids = new Set();
  for (const questId of gameState.quests?.active || []) {
    const quest = quests.find((candidate) => candidate.id === questId);
    for (const objective of quest?.objectives || []) {
      if ((objective.type === 'submitItems' || objective.type === 'collectItem') && objective.targetId) {
        ids.add(objective.targetId);
      }
    }
  }
  return ids;
}

function createKnowledgeTopicChoices(villagerId, categoryId, returnSceneId) {
  const topicList = getKnowledgeTopics(villagerId, categoryId);
  return topicList.map((topic) => ({
    id: `knowledge_topic_${topic.id}`,
    label: topic.label,
    actionType: 'knowledge',
    timeCostSeconds: 0,
    hideCost: true,
    nextSceneId: `knowledgeTopic:${villagerId}:${categoryId}:${topic.id}:0:${returnSceneId}`
  }));
}

function getKnowledgeTopics(villagerId, categoryId) {
  if (villagerId === 'sela') {
    return categoryId === 'forest_notes' ? selaKnowledge?.forestNotes || [] : [];
  }
  return categoryId === 'game_knowledge'
    ? elaineKnowledge?.gameKnowledge || []
    : elaineKnowledge?.valleyLore || [];
}

function createKnowledgeItemScene(sceneId) {
  const [, villagerId, itemId, pageText = '0', returnSceneId = FALLBACK_SCENE_ID] = sceneId.split(':');
  const item = getItem(itemId);
  const pages = splitKnowledgePages(createElaineItemSourceText(item));
  const pageIndex = clampPageIndex(pageText, pages);
  return createKnowledgePageScene({
    sceneId,
    title: item?.name || itemId,
    description: pages[pageIndex],
    returnSceneId,
    backSceneId: `knowledgeCategory:${villagerId}:item_sources:${returnSceneId}`,
    nextSceneId: pageIndex < pages.length - 1 ? `knowledgeItem:${villagerId}:${itemId}:${pageIndex + 1}:${returnSceneId}` : null
  });
}

function createKnowledgeTopicScene(sceneId) {
  const [, villagerId, categoryId, topicId, pageText = '0', returnSceneId = FALLBACK_SCENE_ID] = sceneId.split(':');
  const topics = getKnowledgeTopics(villagerId, categoryId);
  const topic = topics.find((entry) => entry.id === topicId);
  const pages = splitKnowledgePages(topic?.text || '「這段我還沒整理好。等我把紙頁找齊，再講給你聽。」');
  const pageIndex = clampPageIndex(pageText, pages);
  return createKnowledgePageScene({
    sceneId,
    title: topic?.label || '伊蓮的說法',
    description: pages[pageIndex],
    returnSceneId,
    backSceneId: `knowledgeCategory:${villagerId}:${categoryId}:${returnSceneId}`,
    nextSceneId: pageIndex < pages.length - 1 ? `knowledgeTopic:${villagerId}:${categoryId}:${topicId}:${pageIndex + 1}:${returnSceneId}` : null
  });
}

function createKnowledgeEnemyScene(sceneId) {
  const [, villagerId, enemyId, pageText = '0', returnSceneId = FALLBACK_SCENE_ID] = sceneId.split(':');
  const enemy = enemies.find((entry) => entry.id === enemyId);
  const pages = createSelaEnemyKnowledgePages(enemy);
  const pageIndex = clampPageIndex(pageText, pages);
  if (pageIndex >= 1) {
    rememberKnownEnemyWeakness(enemyId);
  }
  return createKnowledgePageScene({
    sceneId,
    title: enemy?.name || '不明敵影',
    description: pages[pageIndex],
    returnSceneId,
    backSceneId: `knowledgeCategory:${villagerId}:enemy_knowledge:${returnSceneId}`,
    nextSceneId: pageIndex < pages.length - 1 ? `knowledgeEnemy:${villagerId}:${enemyId}:${pageIndex + 1}:${returnSceneId}` : null,
    nextChoiceMeta: pageIndex < pages.length - 1 ? { enemyId, pageIndex: pageIndex + 1 } : null
  });
}

function createKnowledgePageScene({ sceneId, title, description, returnSceneId, backSceneId, nextSceneId, nextChoiceMeta = null }) {
  const choices = [];
  if (nextSceneId) {
    choices.push({
      id: `${sceneId}_next`,
      label: '繼續聽',
      actionType: 'knowledge',
      timeCostSeconds: 0,
      hideCost: true,
      nextSceneId,
      ...(nextChoiceMeta ? { dynamicAction: 'openKnowledgePage', ...nextChoiceMeta } : {})
    });
  }
  choices.push(createReturnChoice(backSceneId));
  return {
    id: sceneId,
    title,
    location: getSceneLocationLabel(returnSceneId),
    description,
    choiceGroups: [{ title: '選擇', choices }]
  };
}

function splitKnowledgePages(text) {
  const pages = String(text || '')
    .split('§')
    .map((page) => page.trim())
    .filter(Boolean);
  return pages.length ? pages : ['「這件事我暫時還沒有能說準的版本。」'];
}

function clampPageIndex(value, pages) {
  return clampNumber(Number(value) || 0, 0, Math.max(0, pages.length - 1));
}

function createSelaEnemyKnowledgePages(enemy) {
  if (!enemy) {
    return ['「你說的東西我對不上。下次先把腳印、聲音和攻擊方式記清楚。」'];
  }
  return [
    createSelaEnemyOverviewText(enemy),
    createSelaEnemyWeaknessText(enemy)
  ];
}

function createSelaEnemyOverviewText(enemy) {
  const enemyName = enemy?.name || '那東西';
  const region = enemy?.region || '森林';
  const appearance = enemy?.appearanceDescription || '你記得牠的輪廓，但細節還散在恐懼裡。';
  const threat = enemy?.threatDescription || '牠不一定急著撲上來，真正危險的是牠等你慌。';
  const openings = {
    outer_forest_mist_bat: `賽拉聽到你提起白霧和薄翅，手指先停在桌面邊緣。\n\n「${enemyName}多半出現在${region}。${appearance}」\n\n「${threat}」`,
    outer_forest_root_hare: `你剛說到枯枝般的彎角，賽拉就低頭看向你的膝蓋。\n\n「${enemyName}多半出現在${region}。${appearance}」\n\n「${threat}」`,
    outer_forest_bark_ape: `賽拉讓你比出牠手臂垂下的位置，視線跟著落到旁邊的樹影。\n\n「${enemyName}多半出現在${region}。${appearance}」\n\n「${threat}」`,
    outer_forest_thorn_boarlet: `你提到鼻息和泥葉，賽拉在地上點出一段很短的距離。\n\n「${enemyName}多半出現在${region}。${appearance}」\n\n「${threat}」`,
    outer_forest_hollow_owl: `賽拉聽見「眼眶很黑」時，先看了一眼屋梁的陰影。\n\n「${enemyName}多半出現在${region}。${appearance}」\n\n「${threat}」`,
    outer_forest_mudback_auroch: `你說到濕泥和巨大的樹影時，賽拉把杯子往桌內側挪了挪，像替它讓路。\n\n「${enemyName}多半出現在${region}。${appearance}」\n\n「${threat}」`,
    middle_forest_blood_moth: `賽拉聽見你說喉頭發緊，眉頭立刻收起來。\n\n「${enemyName}多半出現在${region}。${appearance}」\n\n「${threat}」`,
    middle_forest_ironjaw_wolf: `你形容牙齒碰撞的聲音，賽拉的目光停在你的喉嚨上。\n\n「${enemyName}多半出現在${region}。${appearance}」\n\n「${threat}」`,
    middle_forest_masked_clawbeast: `賽拉聽完「破面具」和「長爪」，用指尖在空中描了一道爪痕。\n\n「${enemyName}多半出現在${region}。${appearance}」\n\n「${threat}」`,
    middle_forest_moss_bear: `你說牠像山石在呼吸，賽拉把手掌壓在桌面，感受那個重量似的。\n\n「${enemyName}多半出現在${region}。${appearance}」\n\n「${threat}」`,
    middle_forest_antler_crow: `賽拉讓你抬手畫出牠盤旋的高度，直到那個圈越縮越低。\n\n「${enemyName}多半出現在${region}。${appearance}」\n\n「${threat}」`,
    middle_forest_stonehide_goliath: `你剛說完「岩壁站起來」，賽拉就把桌上的東西清開一片。\n\n「${enemyName}多半出現在${region}。${appearance}」\n\n「${threat}」`,
    deep_forest_greywing_vulture: `賽拉聽到腐腥味時，沒有皺鼻，只是把你的描述從頭到尾又問了一遍。\n\n「${enemyName}多半出現在${region}。${appearance}」\n\n「${threat}」`,
    deep_forest_cursehorn_deer: `你提到黑色紋路纏在長角上，賽拉的手指慢慢敲了兩下桌面。\n\n「${enemyName}多半出現在${region}。${appearance}」\n\n「${threat}」`,
    deep_forest_ruin_husk: `賽拉聽見「胸腔空洞」時，神情比剛才更冷。\n\n「${enemyName}多半出現在${region}。${appearance}」\n\n「${threat}」`,
    deep_forest_redclaw_ape: `你形容那對暗紅利爪時，賽拉先問你：牠是不是等你先動。\n\n「${enemyName}多半出現在${region}。${appearance}」\n\n「${threat}」`,
    deep_forest_blackroot_hound: `賽拉讓你重畫牠繞行的方向，特別看你最後被逼到哪裡。\n\n「${enemyName}多半出現在${region}。${appearance}」\n\n「${threat}」`,
    deep_forest_oldroot_colossus: `你說到沉重腳步聲時，賽拉沒有看你，而是看向門外的地面。\n\n「${enemyName}多半出現在${region}。${appearance}」\n\n「${threat}」`,
    night_forest_black_shadow: `你還沒說完黑影的形狀，賽拉就打斷你，先確認你當時手邊有沒有光。\n\n「${enemyName}只會在夜裡的森林變得明顯。${appearance}」\n\n「${threat}」`
  };
  if (openings[enemy?.id]) {
    return openings[enemy.id];
  }
  const categoryOpenings = {
    '飛獸': `賽拉先問牠飛得高不高，又問你最後一次看見牠時在左邊還是右邊。`,
    '四足獸': `賽拉讓你描述牠壓低身體前，前腳是怎麼踩的。`,
    '雙足獸': `賽拉問牠靠近時是直直逼來，還是先用手和爪試探距離。`,
    '巨獸': `賽拉把你說的距離又往外推了一點，像覺得你記得太近了。`
  };
  const opening = categoryOpenings[enemy?.category] || '賽拉讓你把遭遇時的第一個動作說清楚。';
  return `${opening}\n\n「${enemyName}多半出現在${region}。${appearance}」\n\n「${threat}」`;
}

function createSelaEnemyWeaknessText(enemy) {
  const specificText = getSelaSpecificWeaknessText(enemy);
  if (specificText) {
    return specificText;
  }
  const toolText = formatSelaToolHintText(enemy);
  const escapeText = formatSelaEscapeHintText(enemy);
  const ammoText = formatSelaAmmoWeaknessText(enemy);
  const meleeText = formatSelaMeleeWeaknessText(enemy);
  const openingText = createSelaWeaknessOpeningText(enemy);
  return [openingText, toolText, ammoText, meleeText, escapeText].filter(Boolean).join('\n\n');
}

function getSelaSpecificWeaknessText(enemy) {
  const entries = {
    outer_forest_mist_bat: '賽拉攤開一片薄葉，讓它從指間滑落，葉緣還沒碰到桌面就被她按住。\n\n「霧翼蝠麻煩在牠不肯好好停下。先想辦法讓牠那對薄翅失去路線，讓牠落到你能看清的位置；別急著往霧裡射，牠很會把距離變成你的錯覺。真被牠貼近時，短短一下比拉扯有用，能切開牠掠過來的空隙就退。」',
    outer_forest_root_hare: '賽拉在地上點了兩下，第一下很輕，第二下重得像後腿蹬地。\n\n「根角兔真正危險的是起跳那一瞬。讓牠落腳的地方不安穩，牠的角就會先偏掉；如果你離牠還有一段距離，選能扎進皮肉、留住牠動作的東西，比只讓牠吃痛更可靠。被逼近時別往旁邊亂閃，撐住牠撞進來的距離，別讓那對角碰到你的膝側。」',
    outer_forest_bark_ape: '賽拉把手背貼近燈火，又很快收回來。\n\n「樹皮猿會看你的肩膀和手，等你怕了才壓上來。先讓牠不敢大步貼近，牠一猶豫，長臂就沒有那麼討厭；遠遠牽制時，能砸亂牠攀抓和視線的東西比較有用。真靠太近，就別和牠比力氣，抓牠伸臂露出的短空檔切進去。」',
    outer_forest_thorn_boarlet: '賽拉用鞋尖撥開地上的碎枝，露出底下潮軟的土。\n\n「刺背幼豬低頭衝時看起來莽，其實很吃第一腳。讓牠那一腳踩空或踩錯，背刺就只是跟著身體往前栽。還有距離時，能扎住牠的東西可以讓牠慢下來；真被逼到面前，就把距離頂住，別用短手段去碰牠背上的刺。」',
    outer_forest_hollow_owl: '賽拉沒有立刻看你，她先看向窗外最高的枯枝。\n\n「空洞夜梟不只是在飛，牠是在等你抬頭追牠。先讓牠不能自由落下，讓那對翅膀離開牠選好的高度；遠遠丟射多半只是在餵黑影，別把彈藥交給牠的耐心。牠真撲低時，抓那一下擦過身側的空隙，快切、快退。」',
    outer_forest_mudback_auroch: '賽拉把杯子推到桌邊，沒有讓它掉下去，只讓你看見那一點重量壓過邊緣。\n\n「移動巨木不是你該正面接的東西。小工具壓不住牠，近身也沒有漂亮破口；能在牠壓過來前把傷留在厚泥和枯葉的縫裡，就慢慢削。牠轉向重，退路比逞強重要，看見那截樹影開始偏過來就走。」',
    middle_forest_blood_moth: '賽拉用指腹抹過桌上的灰，留下淡淡一圈粉痕。\n\n「血粉蛾靠的不是咬，是讓你先吸亂氣。先把牠的翅路收窄，別讓那團粉霧在你臉前散開；遠遠射牠通常只會讓你追著粉塵跑。若牠被逼低，短刃處理比久站更好，拖久了先倒下的會是你。」',
    middle_forest_ironjaw_wolf: '賽拉用兩指敲了敲自己的下顎，聲音很乾。\n\n「鐵顎狼撲上來不是為了撞倒你，是要一口咬住要害。先讓牠起跑的路斷掉，別讓牠把顎骨送到你的喉前；有距離時，能扎住牠肩頸、讓牠咬合前慢一拍的東西值得用。近身就守距離，讓牠咬不到，別拿短促的硬拼換牠一口。」',
    middle_forest_masked_clawbeast: '賽拉曲起手指，在桌面拖出一道很淺的刮痕。\n\n「覆面立爪獸會用爪子逼你後退，退亂了就輸。先讓牠不敢踏進你身前那一步；遠處能砸歪牠的面殼和視線，就有喘息。真被爪子壓到面前，別和牠的臂長糾纏，找牠抬爪後胸前空出來的瞬間。」',
    middle_forest_moss_bear: '賽拉看著自己的掌心，像在回想某次被震麻的手臂。\n\n「苔甲熊不是快，是厚。先破壞牠壓過來的腳步，讓那身重量先和地面打架；有距離時，能扎進苔甲縫裡的牽制才有意義。近身不要貪，撐開距離，別讓牠的肩和掌把你擠進樹根。」',
    middle_forest_antler_crow: '賽拉把手舉到頭頂，又慢慢壓低，像在量一圈越收越小的盤旋。\n\n「鹿角鴉喜歡讓你一直抬頭。先讓牠不能安心繞圈，牠的角和翅膀一亂，俯衝就會變笨；遠射很難留下牠，別把希望放在追影子上。牠落低時，能撐距離也能快切，重點是別站在牠下一圈的中心。」',
    middle_forest_stonehide_goliath: '賽拉拿木炭在地上畫了一片厚殼，然後在殼縫上點了幾個小黑點。\n\n「石皮巨獸沒有給人近身取巧的地方。那些小工具對牠像樹枝碰石頭；真要打，只能趁牠還沒壓到身前，把傷一點點送進裂縫。牠回身慢，這是少數好消息。看到牠整片影子轉過來，就退。」',
    deep_forest_ashwing_vulture: '賽拉皺了皺鼻，像那股腐味還留在屋裡。\n\n「灰翼禿鷲等的是你慌，不是你倒。先讓牠那對大翼失去高度，逼牠離開頭頂；遠射追不上牠的耐心，彈藥多半只會掉進樹影。牠壓低撲食時，長距離撐住會比貼身亂砍安全，別讓腐味先把你的呼吸拖慢。」',
    deep_forest_curse_stag: '賽拉盯著桌上的木紋，手指沿著一道黑線慢慢停下。\n\n「咒角鹿踏得輕，但牠衝起來不輕。先讓牠信不過自己的落腳點，否則那對角會把你整個人帶偏；遠處能扎住牠的身形，就能打斷牠那種不自然的節奏。近身時把距離撐住，別讓角尖碰到你的胸口。」',
    deep_forest_ruin_husk: '賽拉把燈芯挑亮了一點，視線仍停在火光外圍。\n\n「遺跡空殼怕的不是痛，是被逼得停下。先用亮處壓住牠往前貼的本能；遠處能砸亂牠空洞裡的平衡，比扎進硬殼更實際。真到近前，別和那副殼耗，找它動作卡住的瞬間切開。」',
    deep_forest_redclaw_ape: '賽拉攤開手掌，又慢慢收成爪形。\n\n「赤爪猿會催你先動，因為牠等著抓你的破綻。先讓牠不敢直接撲進火亮的範圍；遠處能砸亂牠的手眼，就能讓那對紅爪慢半拍。近身不要被吼聲帶著走，牠伸臂過頭時，胸前和肋側才會短短空出來。」',
    deep_forest_blackroot_hound: '賽拉把一條細繩繞過杯腳，輕輕一拉，杯子就偏了半寸。\n\n「黑根獵犬會把你繞進死角。先讓牠腳下那些根鬚和步伐一起失準，別讓牠選好撲咬的線；有距離時，能扎住牠身形的牽制能爭到時間。近身就守距離，別讓牠把你拖進盤根裡。」',
    deep_forest_oldroot_colossus: '賽拉沉默了一會兒，把木炭橫放在地圖邊緣，像一截倒下的老樹。\n\n「古根巨獸不是拿來硬碰的。你帶的小東西壓不住牠，近身也找不到能借力的破口；只能趁牠還在拖著根足前進時，遠遠把傷留在裂開的老皮裡。牠慢，但慢不代表安全。路還在你身後時，就該退。」',
    night_forest_black_shadow: '賽拉把燈往你這邊推近，火光照到她的手背，照不到她的眼神。\n\n「黑影不是野獸。別想用箭、石頭或刀口讓它流血，那只會讓你更晚承認自己碰到的不是活物。能讓黑暗退開的光要先在手上；沒有，就不要站著證明膽量。退到還看得見路的地方，活著回來再說。」'
  };
  return entries[enemy?.id] || '';
}

function createSelaWeaknessOpeningText(enemy) {
  if (enemy?.id === BLACK_SHADOW_ENEMY_ID) {
    return `賽拉把聲音壓得很低，指尖停在燈火照不到的桌角。\n\n「那種黑暗不能當野獸看。先確認手上有沒有能逼退它的光，再想自己還有沒有路退。」`;
  }
  if (enemy?.category === '飛獸') {
    return `賽拉用指節敲了敲桌面，像在模擬翅膀掠過樹枝的節奏。\n\n「會飛的東西最會偷走距離。先讓牠不能安心待在上方，再談你手上還能做什麼。」`;
  }
  if (enemy?.category === '四足獸') {
    return `賽拉在地上比出一段短短的衝刺距離。\n\n「四足獸靠第一段衝勢吃人。牠腳下和肩頭一亂，你才有資格談下一步。」`;
  }
  if (enemy?.category === '雙足獸') {
    return `賽拉把手停在自己肩側，示意牠能直起身貼近人的高度。\n\n「會直起身逼近人的東西，麻煩在牠看得懂你的慌。先別讓牠舒服地走到你面前。」`;
  }
  if (enemy?.category === '巨獸') {
    return `賽拉用木炭在地上畫出很寬的一道弧。\n\n「巨獸不是每一步都有解。能遠遠削慢牠就削，不能就趁牠還沒壓過來前離開。」`;
  }
  return `賽拉讓你把遭遇時的距離、聲音和第一個動作重新說一次。\n\n「先別急著想怎麼贏。把牠怎麼靠近你說清楚，解法通常藏在第一個動作裡。」`;
}

function formatSelaToolHintText(enemy) {
  if (enemy?.id === BLACK_SHADOW_ENEMY_ID) {
    return '「那不是普通野獸。手邊要有穩定的光，不是照路，是讓那塊黑暗不能再往你身上貼。」';
  }
  if (!getEnemyFearedCombatTools(enemy).length) {
    return '「我沒看出牠會被哪種小工具壓住。不要把背包裡的東西亂丟出去，先把退路留好。」';
  }
  if (enemy?.category === '飛獸') {
    return '「牠如果離地，第一步不是揮，是讓翅膀和飛行路線一起亂掉。能把牠從上方拉回低處的東西，才算對路。」';
  }
  if (enemy?.category === '四足獸') {
    return '「四足衝起來靠第一段力道。讓牠準備踩穩的地方變得不可信，牠那一下就會斷。」';
  }
  if (enemy?.category === '雙足獸') {
    return '「會直起身逼近的東西，最怕靠近前先被亮處逼退。讓牠不敢貼到你面前，比多揮一下更重要。」';
  }
  return '「真要穩，就先讓牠照自己的壞習慣犯錯。用對了，牠通常撐不到第二次撲擊。」';
}

function formatSelaMeleeWeaknessText(enemy) {
  const weapon = enemy?.effectiveMeleeWeapon || '無';
  if (weapon === '兩者') {
    return '「如果最後真的被逼近，能切開空隙的可以用，能撐住距離的也可以用。重點不是漂亮，是別讓牠把距離拿走。」';
  }
  if (weapon && weapon !== '無') {
    return weapon === '槍'
      ? '「真被逼到近前，就別讓牠進到膝邊或胸口。能把距離撐住的東西，會比短短迎上去更穩。」'
      : '「真被逼到近前，別拖長角力。能在短距離內快點切開破口的東西，比硬撐更可靠。」';
  }
  return '「我不建議硬撐。牠沒有明顯能讓你近身利用的破口，能避就避，別拿身體試牠的力氣。」';
}

function formatSelaAmmoWeaknessText(enemy) {
  const ammo = enemy?.effectiveAmmo || '無';
  if (enemy?.absoluteAmmoEvasion) {
    return '「遠遠出手不是好選擇。牠會讓彈藥白白消失，別把活路押在那一下。」';
  }
  if (ammo === '兩者') {
    return '「可以試。尖的、重的，只要能讓牠慢一拍，都可能爭到一點空隙。」';
  }
  if (ammo && ammo !== '無') {
    return ammo === '箭矢'
      ? '「值得準備。選能咬進去、留在牠身上的那種，比只打疼牠更有用。」'
      : '「值得準備。選能砸亂步伐和視線的那種，別指望一下就結束。」';
  }
  return '「幫不上太多。別因為離得遠就以為安全，這段距離沒有好解法。」';
}

function formatSelaEscapeHintText(enemy) {
  if (enemy?.category !== '巨獸' && enemy?.id !== BLACK_SHADOW_ENEMY_ID) {
    return '';
  }
  if (enemy?.id === BLACK_SHADOW_ENEMY_ID) {
    return '「如果沒有能逼退黑暗的準備，就不要逞強。先退到還看得見路的地方。」';
  }
  return '「那種龐然大物轉身慢。能在牠重新壓過來之前退開，就不要留在牠的影子底下。」';
}

function isEnemyWeaknessKnown(enemyId) {
  return Boolean(enemyId && normalizeKnownEnemyWeaknessIds(gameState.player?.knownEnemyWeaknessIds).includes(enemyId));
}

function createElaineItemSourceText(item) {
  if (!item) {
    return '「這個名字我對不上資料。也許是我記漏了，也許是你把名字聽岔了。」';
  }
  const sources = collectItemAcquisitionSources(item.id);
  if (!sources.length) {
    return `「${item.name}啊……這樣東西我暫時找不到可靠來源。」§「如果哪天你真的摸到了，記得告訴我。山谷裡最麻煩的，不是沒有答案，是答案常常晚一步才露面。」`;
  }
  const sourceText = formatElaineSourceSentence(sources, item);
  const useText = createElaineItemUseText(item);
  return `「${sourceText}」§「${useText}」`;
}

function formatElaineSourceSentence(sources, item = null) {
  const customCopy = getElaineItemKnowledgeCopy(item);
  if (customCopy?.source) {
    return customCopy.source(sources, item);
  }

  const itemName = item?.name || '那樣東西';
  return `${itemName}我只敢說幾個比較可靠的方向：${formatNaturalList(sources.slice(0, 3))}。剩下的，就得看你當天的腳程和運氣願不願意合作。`;
}

function formatNaturalList(values) {
  const entries = values.filter(Boolean);
  if (!entries.length) {
    return '我暫時想不起來';
  }
  if (entries.length === 1) {
    return entries[0];
  }
  if (entries.length === 2) {
    return `${entries[0]}和${entries[1]}`;
  }
  return `${entries[0]}、${entries[1]}，還有${entries[2]}`;
}

function createElaineItemUseText(item) {
  const customCopy = getElaineItemKnowledgeCopy(item);
  if (customCopy?.use) {
    return customCopy.use(item);
  }

  const tags = item.tags || [];
  const effects = item.effects || {};
  if (item.category === 'consumable' && Number(effects.stamina || 0) > 0) {
    return `${item.name}的用處很老實：讓你在腿開始抗議時，還能多走一段。它不會讓路變短，只會讓你比較不像被路拖著走。`;
  }
  if (item.category === 'consumable' && Number(effects.life || 0) > 0) {
    return `${item.name}管的是傷，不管你的面子。該用就用，傷口不會因為你假裝沒事就學會閉嘴。`;
  }
  if (item.id === 'smoke_bomb') {
    return `${item.name}適合送給追著你不放的麻煩。丟出去、退開、別回頭確認煙好不好看，這才是它真正的用法。`;
  }
  if (item.category === 'consumable' && tags.includes('戰鬥工具')) {
    return `${item.name}不是裝飾，也不是勇氣證明。遇到吃這一套的野獸時拿出來，它會比你空手講道理有說服力。`;
  }
  if (tags.includes('製作') || item.category === 'material') {
    return `${item.name}平時像雜物，缺的時候像債主。製作、修補、別人的請託，都很愛在最後一刻伸手要它。`;
  }
  if (item.category === 'resource') {
    return `${item.name}是那種沒人歌頌、但大家都會用到的東西。帶得動就留一點，村裡很多麻煩都從「剛好少一份」開始。`;
  }
  return `${item.name}的價值不一定寫在表面。山谷裡有些東西像沉默的人，要碰到懂它的手，才知道能做什麼。`;
}

function getElaineItemKnowledgeCopy(item) {
  const copy = {
    berry: {
      source: (sources) => `莓果不用把它想得太隆重。矮枝、田邊和偶爾被人照看的地方最容易出現，像是${formatNaturalList(sources.slice(0, 3))}；只是摘的時候別只盯著最紅的一顆，旁邊常有更熟的。`,
      use: () => '莓果救不了大傷，但能把空掉的肚子哄安靜一點。走遠路前塞幾顆，比到半路才後悔實在。'
    },
    apple: {
      source: (sources) => `蘋果脾氣比莓果端正些，通常掛在它該待的地方。${formatNaturalList(sources.slice(0, 2))}最值得看；抬頭看葉子深處，別只看掉在地上的。`,
      use: () => '蘋果的好處是乾淨、直白，咬下去就知道自己還活著。體力差一點時，它比一段大道理有效。'
    },
    lettuce: {
      source: (sources) => `生菜多半跟托莉和田地脫不了關係。你聽見她一邊抱怨土、一邊還是把菜照顧得很好時，就知道${formatNaturalList(sources.slice(0, 2))}不是隨口說說。`,
      use: () => '生菜不會讓人熱血沸騰，卻很適合把身體從沉重裡拉回來。它像托莉本人，吵歸吵，實際。'
    },
    bird_egg: {
      source: (sources) => `禽蛋要找巢，不要找雞。墓地那邊的鴉巢若有動靜，可以去${formatNaturalList(sources.slice(0, 2))}碰碰看；手要輕，別把巢拆得像被野獸翻過。`,
      use: () => '禽蛋小歸小，吃下去還是能補一口力氣。只是別在鴉還盯著你的時候露出太得意的表情。'
    },
    dry_ration: {
      source: (sources) => `乾糧通常出現在「有人怕你餓死」的地方。${formatNaturalList(sources.slice(0, 3))}都可能找到；味道先別期待，能撐住才是它的本事。`,
      use: () => '乾糧不是享受，是保險。它難吃得很誠實，也可靠得很誠實。'
    },
    empty_potion_bottle: {
      source: () => '空藥水瓶別急著當廢物丟掉。小治療藥喝完後會留下瓶子，米菈那邊偶爾也會把乾淨的瓶子交給你；製藥時缺的往往不是草，而是能把藥裝起來的東西。',
      use: () => '空瓶看起來像廢物，到了製藥時就會突然抬高身價。別亂丟，米菈看見大概會安靜地嘆氣。'
    },
    moondew_herb: {
      source: (sources) => `月露草喜歡潮冷、陰影和不太被人踩亂的角落。${formatNaturalList(sources.slice(0, 3))}都能找；看葉上的水光，別只靠名字浪漫。`,
      use: () => '月露草不是花瓶裡的漂亮草，它是米菈手裡能把傷壓下去的東西。帶一株回來，很多擔心就少一點。'
    },
    flower: {
      source: (sources) => `花朵不太像物資，倒像山谷偶爾露出的好心情。${formatNaturalList(sources.slice(0, 3))}可能看見；別把每一朵都當材料，有些只是剛好長得讓人想停一下。`,
      use: () => '花能吃的部分有限，能說的話倒不少。送人、留著、或只是看一眼，都比你想的有用。'
    },
    soil: {
      source: () => '泥土普通到幾乎沒人會特地稱讚它，可田地要長好，偏偏就少不了這種普通東西。往森林裡走時留意鬆軟的土堆，能鏟起來、帶得動的，才算真正到手。',
      use: () => '泥土不神祕，重、髒、佔地方，但田地就是吃這個長大的。托莉要它時，通常不是在刁難你。'
    },
    wood: {
      source: (sources) => `木材的路線很清楚：要嘛從林子裡帶回來，要嘛去工坊倉庫的木材堆花力氣劈。${formatNaturalList(sources.slice(0, 3))}，聽起來樸素，做起來會流汗。`,
      use: () => '木材像村裡的骨架，工具、箱子、修修補補都會伸手要它。它不稀奇，但缺起來很吵。'
    },
    ore_piece: {
      source: (sources) => `礦石不是會乖乖躺在路邊的東西。${formatNaturalList(sources.slice(0, 3))}比較有指望；找到時先想想自己背不背得動，別讓它替你決定行程。`,
      use: () => '礦石沉，脾氣也硬。交到諾絲那類人手上，才會從一塊麻煩變成能派上用場的東西。'
    },
    resin: {
      source: (sources) => `樹脂要看樹，也要看耐心。${formatNaturalList(sources.slice(0, 3))}都有線索；摸到黏手時別急著嫌，它黏住的常常是工具能不能成的關鍵。`,
      use: () => '樹脂適合拿來黏、封、燃。它不像木材那麼大聲，卻常在火把和陷阱裡偷偷決定成敗。'
    },
    cloth_strip: {
      source: (sources) => `布條多半不是「找到」的，是從一堆不再體面的東西裡挑出還能用的部分。${formatNaturalList(sources.slice(0, 3))}值得翻，但別穿太好的衣服去。`,
      use: () => '布條能綁、能包、能補洞。看起來寒酸，真正出事時反而比漂亮東西更像朋友。'
    },
    dry_moss: {
      source: (sources) => `乾苔要找乾得剛好的，不是隨便抓一把綠色東西就算。${formatNaturalList(sources.slice(0, 3))}可以試；摸起來太濕的，通常只會讓你失望。`,
      use: () => '乾苔很適合拿來引火或做煙。它安靜、輕，壞心思卻不少，賽拉大概會喜歡這點。'
    },
    sharp_stone: {
      source: (sources) => `銳利碎石要看邊，不是看大小。${formatNaturalList(sources.slice(0, 3))}都可能有；會割手的那種，反而常常比較有用。`,
      use: () => '銳利碎石能做箭，也能當作某些訓練的證明。它提醒人一件事：小東西也可以很危險。'
    },
    cracked_bone: {
      source: (sources) => `碎骨多半跟戰鬥後的狼狽場面一起出現。${formatNaturalList(sources.slice(0, 3))}是線索；撿的時候別想太多，不然你會開始替它原本的主人想太多。`,
      use: () => '碎骨邊緣亂、手感差，拿來練習反而剛好。賽拉要它時，多半不是缺骨頭，是要看你怕不怕麻煩。'
    },
    beast_bone: {
      source: (sources) => `獸骨比碎骨完整，也比較像山谷把一次衝突留下來的簽名。${formatNaturalList(sources.slice(0, 3))}能找到；帶回來時別敲得太響，宿舍不需要半夜聽骨頭唱歌。`,
      use: () => '獸骨能做材料，也能提醒你有些野獸不是故事裡的影子。它硬，記性也硬。'
    },
    hard_beast_bone: {
      source: (sources) => `硬獸骨通常不會從好欺負的東西身上來。${formatNaturalList(sources.slice(0, 3))}比較可能遇到；真拿到了，代表你那天運氣和準備至少有一邊沒偷懶。`,
      use: () => '硬獸骨適合留給更吃強度的製作。別把它和普通骨頭混在一起，諾絲會用眼神罵人。'
    },
    feather: {
      source: (sources) => `羽毛會跟風、巢和飛過的東西有關。${formatNaturalList(sources.slice(0, 3))}都能留意；別只看地面，很多線索是從上面掉下來的。`,
      use: () => '羽毛輕得像沒重量，做箭時卻很有脾氣。少了它，箭會飛得像喝醉。'
    },
    beast_fang: {
      source: (sources) => `獸牙不是禮物，是你從危險嘴邊拿回來的紀念。${formatNaturalList(sources.slice(0, 3))}可能找到；拿的時候小心，離開身體的牙也還是牙。`,
      use: () => '獸牙能做材料，也能拿來證明你不是只會說自己很勇敢。只是別在飯桌上炫耀。'
    },
    beast_horn: {
      source: (sources) => `獸角通常不會便宜地出現。${formatNaturalList(sources.slice(0, 3))}有機會；如果你撿到一支完整的，先感謝它沒有還長在會衝撞你的東西頭上。`,
      use: () => '獸角硬、稀少，拿去交易或製作都有人看一眼。它不溫柔，但很有分量。'
    },
    trap: {
      source: (sources) => `陷阱不是靠臨場勇氣變出來的。${formatNaturalList(sources.slice(0, 3))}能準備；帶它出門前，先確認自己記得怎麼放，別把腳也算進獵物。`,
      use: () => '陷阱的價值在於讓野獸先犯錯。你要做的不是比牠兇，是比牠早一步。'
    },
    torch: {
      source: (sources) => `火把要的是木料、可燃物，還有一點不要把自己燒到的常識。${formatNaturalList(sources.slice(0, 3))}能幫上忙；天黑之前準備，總比天黑之後後悔好。`,
      use: () => '火把能照路，也能讓某些東西退開。火不是勇敢，火只是提醒黑暗別靠太近。'
    },
    capture_net: {
      source: (sources) => `補網聽起來笨重，實際上很講時機。${formatNaturalList(sources.slice(0, 3))}可以準備；別等東西撲到臉上才想起網有正反面。`,
      use: () => '補網不是為了打贏所有東西，是為了讓某些東西暫時輸給自己的慣性。'
    },
    smoke_bomb: {
      source: (sources) => `煙霧彈要靠乾苔、布和一點不想正面挨打的智慧。${formatNaturalList(sources.slice(0, 3))}是方向；它不像武器，更像一扇突然冒出來的門。`,
      use: () => '煙霧彈適合送給追著你不放的麻煩。丟出去、退開、別回頭確認煙好不好看，這才是它真正的用法。'
    }
  };
  return copy[item?.id] || null;
}

function collectItemAcquisitionSources(itemId) {
  const sourceSet = new Set();
  const addSource = (text) => {
    const sourceText = typeof text === 'string' ? text.trim() : '';
    if (sourceText && !sourceText.includes('委託')) {
      sourceSet.add(sourceText);
    }
  };
  const item = getItem(itemId);
  (item?.source || []).forEach(addSource);

  for (const facility of facilities) {
    const locationNames = (facility.locationIds || []).map(getLocationLabel).filter(Boolean);
    const facilityLabel = locationNames.length ? `${locationNames.join('、')}的${facility.name}` : `探索途中遇到的${facility.name}`;
    if (facility.infiniteSource?.itemId === itemId) {
      addSource(facilityLabel);
    }
    if (facility.smallStorage?.restockRule?.items?.[itemId]) {
      addSource(facilityLabel);
    }
    if ((facility.smallStorage?.restockRule?.candidateItemIds || []).includes(itemId)) {
      addSource(facilityLabel);
    }
    if ((facility.smallStorage?.initialItems || []).some((entry) => entry.itemId === itemId)) {
      addSource(`${facilityLabel}裡留下的舊物`);
    }
    if ((facility.randomGatherAction?.results || []).some((entry) => entry.itemId === itemId)) {
      addSource(`${facilityLabel}底下翻找`);
    }
  }

  for (const pool of forageLootConfig?.regionLootPools || []) {
    if ((pool.candidateItems || []).some((entry) => entry.itemId === itemId)) {
      addSource(`${pool.region}搜尋`);
    }
  }

  for (const villager of villagers) {
    if ((villager.carriedItems || []).some((entry) => entry.itemId === itemId)) {
      addSource(`${villager.name}手邊的交易物`);
    }
  }

  for (const quest of quests) {
    if (quest.rewards?.items?.[itemId]) {
      addSource(`完成「${quest.title}」後收到的謝禮`);
    }
  }

  for (const event of events) {
    for (const page of event.pages || []) {
      if (page.rewardItems?.[itemId] || (page.rewardItemsByFacilityLevel || []).some((entry) => entry.itemId === itemId)) {
        addSource(`遇上「${event.title}」那類事`);
      }
    }
  }

  for (const recipe of recipes) {
    if (recipe.result?.itemId === itemId || recipe.resultItemId === itemId) {
      addSource(`學會「${recipe.name || recipe.id}」後自己做`);
    }
  }

  return [...sourceSet];
}

function createNpcRuleActionChoices(villager, returnSceneId) {
  const rule = getNpcInteractionRule(villager);
  return (rule?.specialActions || [])
    .filter((action) => isInteractionActionAvailable(villager, action, returnSceneId))
    .map((action) => ({
      id: `${villager.id}_${action.id}`,
      label: action.label || action.id,
      actionType: action.actionType || 'specialInfo',
      timeCostSeconds: action.timeCostSeconds || 0,
      effects: action.effects || {},
      dynamicAction: action.dynamicAction || 'runDialogueCommand',
      villagerId: villager.id,
      commandId: action.commandId || action.id,
      returnSceneId,
      progressLabel: action.progressLabel || `正在${action.label || '互動'}...`
    }));
}

function createVillagerInteractionActionChoices(villager, returnSceneId) {
  return (villager.interactionActions || [])
    .filter((action) => isInteractionActionAvailable(villager, action, returnSceneId))
    .map((action) => ({
      ...action,
      id: `${villager.id}_${action.id}`,
      dynamicAction: action.dynamicAction || 'runInteractionAction',
      villagerId: villager.id,
      commandId: action.id,
      returnSceneId,
      progressLabel: action.progressLabel || `正在${action.label}...`,
      resultText: action.dynamicAction ? '' : createInteractionActionResultText(villager, action)
    }));
}

function isInteractionActionAvailable(villager, action, returnSceneId) {
  const requiredVillagerId = action.availability?.requiresPresentVillager;
  if (requiredVillagerId && requiredVillagerId !== villager.id) {
    return false;
  }
  if (requiredVillagerId && getVillagerLocationId(villager) !== returnSceneId) {
    return false;
  }
  if (action.availability?.hasAbsentCoreVillagers && !hasLocationInquiryTargets(villager, returnSceneId)) {
    return false;
  }
  const timeBlocks = action.availability?.timeBlocks || [];
  if (timeBlocks.length && !timeBlocks.includes(getTimeBlock(gameState.time.secondsOfDay))) {
    return false;
  }
  for (const [facilityId, maxLevel] of Object.entries(action.availability?.facilityLevelBelow || {})) {
    if (getFacilityLevel(facilityId) >= Number(maxLevel || 0)) {
      return false;
    }
  }
  return true;
}

function createInteractionActionResultText(villager, action) {
  if (action.actionType === 'recover') {
    return `${villager.name}替你處理了傷勢。`;
  }
  return `${villager.name}完成了${action.label}。`;
}

function createFacilityUpgradeChoices(villager) {
  return facilities
    .filter((facility) => facility.upgrade?.upgrader === villager?.id)
    .map((facility) => ({
      id: `${villager.id}_upgrade_${facility.id}`,
      label: `升級${facility.name}`,
      actionType: 'upgrade',
      timeCostSeconds: 1200,
      effects: { facilities: { [facility.id]: 1 } },
      dynamicAction: 'runDialogueCommand',
      villagerId: villager.id,
      commandId: `upgradeFacility:${facility.id}`
    }));
}

function shouldShowDialogueCommand(villager, commandId) {
  if (commandId === 'quest') {
    return hasVisibleQuest(villager.id);
  }
  return true;
}

function hasVisibleQuest(villagerId) {
  return getAvailableQuestsForVillager(villagerId).length > 0
    || getActiveQuestsForVillager(villagerId).length > 0
    || getSubmittableQuestsForVillager(villagerId).length > 0;
}

function isQuestCompleted(questId) {
  return gameState.quests?.completed?.includes(questId);
}

function isQuestActive(questId) {
  return gameState.quests?.active?.includes(questId);
}

function meetsQuestPrerequisites(prerequisites) {
  const flags = gameState.player.flags || [];
  if (Array.isArray(prerequisites.flags) && prerequisites.flags.some((flag) => !flags.includes(flag))) return false;

  for (const [villagerId, requiredAffection] of Object.entries(prerequisites.affection || {})) {
    if ((gameState.villagers[villagerId]?.affection || 0) < requiredAffection) return false;
  }

  for (const [statId, requiredValue] of Object.entries(prerequisites.player || {})) {
    if (Number(gameState.player?.[statId] || 0) < Number(requiredValue || 0)) return false;
  }
  return true;
}

function createDialogueChoice(villager, commandId, returnSceneId) {
  const command = commands.commands[commandId] || {};
  if (commandId === 'leave') {
    return createReturnChoice(returnSceneId, villager);
  }

  if (commandId === 'trade') {
    return {
      id: `${villager.id}_${commandId}`,
      label: command.label || '交易',
      actionType: command.actionType,
      timeCostSeconds: 0,
      hideCost: true,
      dynamicAction: 'openTrade',
      villagerId: villager.id,
      returnSceneId
    };
  }

  if (commandId === 'gift') {
    return {
      id: `${villager.id}_${commandId}`,
      label: command.label || '送禮',
      actionType: command.actionType,
      timeCostSeconds: 0,
      hideCost: true,
      dynamicAction: 'openGiftMenu',
      villagerId: villager.id,
      returnSceneId,
      disabledReason: hasGivenGiftToday(villager.id) ? '今天已經送過禮了。' : ''
    };
  }

  return {
    id: `${villager.id}_${commandId}`,
    label: command.label || commandId,
    actionType: command.actionType,
    timeCostSeconds: command.defaultTimeCostSeconds || 0,
    effects: createDialogueCommandEffects(villager, commandId),
    dynamicAction: 'runDialogueCommand',
    villagerId: villager.id,
    commandId,
    returnSceneId
  };
}

function createReturnChoice(returnSceneId, villager = null) {
  const command = commands.commands.leave || {};
  return {
    id: `leave_${villager?.id || returnSceneId}`,
    label: '返回',
    actionType: command.actionType || 'leave',
    timeCostSeconds: 0,
    hideCost: true,
    dynamicAction: 'returnToScene',
    returnSceneId,
    villagerId: villager?.id || ''
  };
}

function createDialogueCommandEffects(villager, commandId) {
  if (commandId === 'chat' && isCoreVillager(villager)) {
    const dailyFlag = getChatAffectionDailyFlag(villager.id);
    if (hasPlayerDailyFlag(dailyFlag)) {
      return {};
    }
    return {
      villagerAffection: { [villager.id]: 1 },
      dailyFlags: [dailyFlag]
    };
  }
  return {};
}

function getChatAffectionDailyFlag(villagerId) {
  return `chat_affection_gained:${villagerId}`;
}

function getGiftDailyFlag(villagerId) {
  return `gift_given:${villagerId}`;
}

function hasPlayerDailyFlag(flag, state = gameState) {
  return Array.isArray(state?.player?.dailyFlags) && state.player.dailyFlags.includes(flag);
}

function addPlayerDailyFlag(flag, state = gameState) {
  if (!state?.player || !flag) {
    return;
  }
  if (!Array.isArray(state.player.dailyFlags)) {
    state.player.dailyFlags = [];
  }
  if (!state.player.dailyFlags.includes(flag)) {
    state.player.dailyFlags.push(flag);
  }
}

function hasGivenGiftToday(villagerId) {
  return hasPlayerDailyFlag(getGiftDailyFlag(villagerId));
}

function createInteractionResult(villagerId, commandId) {
  const villager = villagers.find((candidate) => candidate.id === villagerId);
  if (commandId.startsWith('upgradeFacility:')) {
    const facilityId = commandId.split(':')[1];
    const facility = facilities.find((candidate) => candidate.id === facilityId);
    const level = gameState.facilities[facilityId]?.level || 0;
    return {
      villagerId,
      commandId,
      text: `${villager.name}幫你升級了${facility?.name || '設施'}。目前等級：${level}。`
    };
  }

  const matchedDialogue = selectDialogueFragment(villagerId, commandId);
  const fallbackByCommand = {
    chat: `${villager.name}和你聊了一會兒。`,
    gift: `你打開背包，準備選擇要送給${villager.name}的東西。`,
    trade: `${villager.name}確認目前可交換的物品。`
  };
  const configuredAction = getNpcConfiguredAction(villager, commandId);

  return {
    villagerId,
    commandId,
    text: matchedDialogue || configuredAction?.resultText || fallbackByCommand[commandId] || `${villager.name}等待你的下一個指令。`
  };
}

function getNpcConfiguredAction(villager, commandId) {
  if (!villager) {
    return null;
  }
  return [
    ...(getNpcInteractionRule(villager)?.specialActions || []),
    ...(villager.interactionActions || [])
  ].find((action) => (action.commandId || action.id) === commandId) || null;
}

function applyQuestAcceptEffect(effect = null) {
  if (!effect) {
    return '';
  }
  const questId = typeof effect === 'string' ? effect : effect?.questId;
  const villagerId = effect && typeof effect === 'object' ? effect.villagerId : '';
  const quest = quests.find((entry) => entry.id === questId);
  if (!quest || isQuestActive(quest.id) || isQuestCompleted(quest.id) || !meetsQuestPrerequisites(quest.prerequisites || {})) {
    return '';
  }

  gameState.quests.active.push(quest.id);
  return '';
}

function applyQuestCompleteEffect(effect = null) {
  if (!effect) {
    return '';
  }
  const questId = typeof effect === 'string' ? effect : effect?.questId;
  const villagerId = effect && typeof effect === 'object' ? effect.villagerId : '';
  const returnSceneId = effect && typeof effect === 'object' ? effect.returnSceneId : '';
  const quest = quests.find((entry) => entry.id === questId);
  if (!quest) {
    return '';
  }

  const disabledReason = getQuestCompletionDisabledReason(quest, villagerId || quest.giver);
  if (disabledReason) {
    return disabledReason;
  }

  for (const objective of quest.objectives || []) {
    if (objective.type === 'submitItems') {
      changeInventoryItem(gameState.player.inventory, objective.targetId, -Number(objective.requiredCount || 0));
    }
  }

  const droppedRewards = applyQuestRewards(quest.rewards || {}, returnSceneId || gameState.events?.active?.returnSceneId || FALLBACK_SCENE_ID);
  removeFromArray(gameState.quests.active, quest.id);
  if (!gameState.quests.completed.includes(quest.id)) {
    gameState.quests.completed.push(quest.id);
  }

  return createQuestCompletionMessage(quest, droppedRewards);
}

function applyQuestRewards(rewards, returnSceneId = FALLBACK_SCENE_ID) {
  applyEffectsToState(gameState, {
    villagerAffection: rewards.villagerAffection || {},
    flags: rewards.flags || [],
    player: rewards.player || {}
  });
  applyQuestFacilityRewards(rewards.facilities || {});
  learnRecipes(rewards.recipeIds || []);
  return applyCarryAwareItemRewards(rewards.items || {}, returnSceneId);
}

function applyQuestFacilityRewards(facilityRewards = {}) {
  applyFacilityEffectsToState(gameState, facilityRewards);
}

function resolveDropLocationSceneId(sceneId = FALLBACK_SCENE_ID) {
  return getResolvedPlayerPosition(sceneId).id || FALLBACK_SCENE_ID;
}

function applyCarryAwareItemRewards(itemRewards, returnSceneId = FALLBACK_SCENE_ID) {
  const dropped = [];
  const dropSceneId = resolveDropLocationSceneId(returnSceneId);
  for (const [itemId, countValue] of Object.entries(itemRewards || {})) {
    const count = Number(countValue || 0);
    if (!Number.isFinite(count) || count === 0) {
      continue;
    }
    if (count < 0) {
      changeInventoryItem(gameState.player.inventory, itemId, count);
      continue;
    }
    for (let index = 0; index < count; index += 1) {
      if (canPlayerCarryItem(itemId, 1)) {
        changeInventoryItem(gameState.player.inventory, itemId, 1);
      } else {
        changeInventoryItem(dropped, itemId, 1);
      }
    }
  }
  if (dropped.length) {
    addDroppedItemsAtLocation(dropSceneId, dropped);
  }
  return dropped;
}

function createQuestCompletionMessage(quest, droppedRewards = []) {
  const parts = [`已完成委託：${quest.title}。`];
  if (droppedRewards.length) {
    parts.push(`獎勵中的${formatInventory(droppedRewards)}太重，暫時被留在地上。`);
  }
  return parts.join('');
}

function createDroppedItemsNotice(droppedItems = []) {
  if (!droppedItems.length) {
    return '';
  }
  return `${formatInventory(droppedItems)}太重，暫時被留在遺落的道具。`;
}

function selectDialogueFragment(villagerId, commandId) {
  const timeBlock = getTimeBlock(gameState.time.secondsOfDay);
  const locationId = getDialogueLocationId(villagerId);
  const affection = gameState.villagers[villagerId]?.affection || 0;
  const ignoreAffection = shouldIgnoreDialogueAffection(villagerId);
  const candidates = dialogues
    .filter((dialogue) => dialogue.villagerId === villagerId && dialogue.command === commandId)
    .filter((dialogue) => matchesDialogueConditions(dialogue.conditions || {}, timeBlock, locationId, affection, { ignoreAffection, villagerId }))
    .sort((a, b) => (b.priority || 0) - (a.priority || 0));
  const selectedDialogue = pickDialogueForContext(candidates, createDialogueHistoryContextKey(villagerId, commandId, timeBlock, locationId));

  if (!selectedDialogue) {
    return null;
  }

  rememberDialogueLine(selectedDialogue.id, createDialogueHistoryContextKey(villagerId, commandId, timeBlock, locationId));
  return selectedDialogue.lines?.join('\n');
}

function matchesDialogueConditions(conditions, timeBlock, locationId, affection, options = {}) {
  const flags = gameState.player.flags || [];
  if (!options.allowOffSchedule && !isDialogueLocationOnSchedule(options.villagerId, timeBlock, locationId)) return false;
  if (conditions.timeBlocks && !conditions.timeBlocks.includes(timeBlock)) return false;
  if (conditions.locationIds && !conditions.locationIds.includes(locationId)) return false;
  if (conditions.locations && !conditions.locations.includes(getLocationLabel(locationId))) return false;
  if (!options.ignoreAffection && typeof conditions.affectionMin === 'number' && affection < conditions.affectionMin) return false;
  if (!options.ignoreAffection && typeof conditions.affectionMax === 'number' && affection > conditions.affectionMax) return false;
  if (Array.isArray(conditions.requiredFlags) && conditions.requiredFlags.some((flag) => !flags.includes(flag))) return false;
  if (Array.isArray(conditions.blockedFlags) && conditions.blockedFlags.some((flag) => flags.includes(flag))) return false;
  return true;
}

function isDialogueLocationOnSchedule(villagerId, timeBlock, locationId) {
  const villager = villagers.find((candidate) => candidate.id === villagerId);
  if (!villager) {
    return false;
  }
  if (villager.id === 'lizard_merchant' && locationId === 'reclamation_area') {
    return getVillagerLocationId(villager, timeBlock) === locationId
      || Boolean(villager.tradeRules?.daytimeAccess?.timeBlocks?.includes(timeBlock));
  }
  return getVillagerLocationId(villager, timeBlock) === locationId;
}

function shouldIgnoreDialogueAffection(villagerId) {
  const villager = villagers.find((candidate) => candidate.id === villagerId);
  return Boolean(getNpcInteractionRule(villager)?.dialogueConditionOverrides?.ignoreAffectionMin);
}

function getNpcInteractionRule(villager) {
  if (!villager) {
    return null;
  }
  return npcInteractionRules.find((rule) => rule.appliesTo?.includes(villager.id) || rule.npcType === villager.npcType) || null;
}

function createDialogueHistoryContextKey(villagerId, commandId, timeBlock, locationId) {
  return [villagerId, commandId, timeBlock, locationId].join('|');
}

function pickDialogueForContext(candidates, contextKey) {
  if (!candidates.length) {
    return null;
  }

  gameState.dialogueHistory = normalizeDialogueHistory(gameState.dialogueHistory);
  const now = getCurrentTotalSeconds();
  let selectableCandidates = candidates.filter((candidate) => !isDialogueLineCoolingDown(candidate.id, now));
  if (!selectableCandidates.length) {
    releaseDialogueCooldowns(candidates);
    selectableCandidates = candidates;
  }
  const highestPriority = selectableCandidates[0].priority || 0;
  selectableCandidates = selectableCandidates.filter((candidate) => (candidate.priority || 0) === highestPriority);
  return pickWeightedDialogue(selectableCandidates);
}

function isDialogueLineCoolingDown(dialogueId, now = getCurrentTotalSeconds()) {
  const lastShownAt = Number(gameState.dialogueHistory?.lastShownAtTotalSeconds?.[dialogueId] || 0);
  return lastShownAt > 0 && now - lastShownAt < DIALOGUE_LINE_COOLDOWN_SECONDS;
}

function releaseDialogueCooldowns(candidates) {
  gameState.dialogueHistory = normalizeDialogueHistory(gameState.dialogueHistory);
  for (const candidate of candidates) {
    delete gameState.dialogueHistory.lastShownAtTotalSeconds[candidate.id];
  }
}

function pickWeightedDialogue(selectableCandidates) {
  const totalWeight = selectableCandidates.reduce((sum, candidate) => sum + Math.max(1, candidate.weight || 1), 0);
  let roll = Math.random() * totalWeight;

  for (const candidate of selectableCandidates) {
    roll -= Math.max(1, candidate.weight || 1);
    if (roll <= 0) {
      return candidate;
    }
  }

  return selectableCandidates[selectableCandidates.length - 1];
}

function rememberDialogueLine(dialogueId, contextKey = '') {
  if (!dialogueId) {
    return;
  }

  gameState.dialogueHistory = normalizeDialogueHistory(gameState.dialogueHistory);
  gameState.dialogueHistory.recentLineIds = [
    dialogueId,
    ...gameState.dialogueHistory.recentLineIds.filter((id) => id !== dialogueId)
  ].slice(0, 10);
  gameState.dialogueHistory.shownCounts[dialogueId] = (gameState.dialogueHistory.shownCounts[dialogueId] || 0) + 1;
  gameState.dialogueHistory.lastShownAtTotalSeconds[dialogueId] = getCurrentTotalSeconds();
  if (contextKey) {
    const seenIds = gameState.dialogueHistory.seenByContext[contextKey] || [];
    gameState.dialogueHistory.seenByContext[contextKey] = [...new Set([...seenIds, dialogueId])];
  }
}

function getDialogueLocationId(villagerId) {
  const returnSceneId = gameState.currentSceneId.split(':')[2];
  const villager = villagers.find((candidate) => candidate.id === villagerId);
  return locations.some((location) => location.id === returnSceneId)
    ? returnSceneId
    : getVillagerLocationId(villager);
}

function getPresentVillagers(locationId) {
  const timeBlock = getTimeBlock(gameState.time.secondsOfDay);
  return villagers
    .filter((villager) => getVillagerLocationId(villager, timeBlock) === locationId)
    .filter((villager) => villager.id !== BLACK_CAT_NPC_ID || isBlackCatPresentAt(locationId))
    .filter((villager) => !isDormitoryDeepNightUnavailable(villager, timeBlock))
    ;
}

function isVillagerPresentAtCurrentScene(villagerId) {
  const sceneId = getResolvedPlayerPosition(gameState.currentSceneId).id;
  return getPresentVillagers(sceneId).some((villager) => villager.id === villagerId);
}

function canInteractWithVillager(villagerId) {
  const villager = villagers.find((candidate) => candidate.id === villagerId);
  return Boolean(villager && !isDormitoryDeepNightUnavailable(villager, getTimeBlock(gameState.time.secondsOfDay)));
}

function isDormitoryDeepNightUnavailable(villager, timeBlock) {
  return Boolean(villager && timeBlock === '深夜' && getVillagerLocationId(villager, timeBlock) === DORMITORY_LOCATION_ID);
}

function getVillagerLocationId(villager, timeBlock = getTimeBlock(gameState.time.secondsOfDay)) {
  return villager?.defaultLocations?.[timeBlock] || null;
}

function getItemUseHoverText(item) {
  if (!item) {
    return '';
  }
  const parts = [];
  const effectText = formatEffects(item.effects);
  if (effectText) {
    parts.push(effectText);
  }
  if (Array.isArray(item.useReturnsItems) && item.useReturnsItems.length) {
    const returnText = item.useReturnsItems
      .filter((entry) => entry?.itemId && Number(entry.count || 0) > 0)
      .map((entry) => `${getItem(entry.itemId)?.name || entry.itemId} x${entry.count}`)
      .join('、');
    if (returnText) {
      parts.push(`返還：${returnText}`);
    }
  }
  return parts.join(' / ') || '沒有可顯示的效果。';
}

function createUseItemScene(sceneId) {
  const returnSceneId = sceneId.split(':')[1] || FALLBACK_SCENE_ID;
  const consumableEntries = getConsumableInventoryEntries(returnSceneId);
  const portableRecipes = getPortableRecipes();
  const useChoices = consumableEntries.map(({ item, count }) => ({
    id: `use_${item.id}`,
    label: `使用${item.name}（${count}）`,
    actionType: 'useItem',
    timeCostSeconds: item.timeCostSeconds || 0,
    dynamicAction: 'useItem',
    itemId: item.id,
    returnSceneId,
    hoverText: getItemUseHoverText(item),
    disabledReason: getItemUseDisabledReason(item, returnSceneId)
  }));

  return {
    id: sceneId,
    title: '道具',
    location: getSceneLocationLabel(returnSceneId),
    description: '你低頭翻了翻身上的東西，看看現在該拿哪一樣出來，或乾脆把不想帶著的留在這裡。',
    choiceGroups: [
      {
        title: '可使用的道具',
        choices: useChoices,
        emptyLabel: '目前沒有可直接使用的消耗品。'
      },
      {
        title: '其他',
        choices: [
          {
            id: `open_portable_craft_${returnSceneId}`,
            label: '製作道具',
            actionType: 'craft',
            timeCostSeconds: 0,
            hideCost: true,
            dynamicAction: 'openPortableCraftMenu',
            returnSceneId,
            disabledStatic: !portableRecipes.length,
            disabledReason: portableRecipes.length ? '' : '目前沒有能徒手處理的簡易配方。'
          },
          {
            id: `open_discard_${returnSceneId}`,
            label: '丟棄道具',
            actionType: 'discard',
            timeCostSeconds: 0,
            hideCost: true,
            dynamicAction: 'openDiscardMenu',
            returnSceneId,
            disabledStatic: !normalizeInventory(gameState.player.inventory || []).length,
            disabledReason: normalizeInventory(gameState.player.inventory || []).length ? '' : '背包裡沒有可丟棄的道具。'
          },
          createReturnChoice(returnSceneId)
        ]
      }
    ]
  };
}

function createPortableCraftScene(sceneId) {
  const returnSceneId = sceneId.split(':')[1] || FALLBACK_SCENE_ID;
  const craftChoices = getPortableRecipes().map((recipe) => {
    return {
      id: `portable_craft_${recipe.id}`,
      label: `製作${formatRecipeResult(recipe)}：${formatRecipeMaterials(recipe)}`,
      actionType: 'craft',
      timeCostSeconds: Number(recipe.timeCostSeconds || 0),
      dynamicAction: 'craftRecipe',
      facilityId: 'portable_crafting',
      recipeId: recipe.id,
      returnSceneId,
      disabledReason: getRecipeDisabledReason(recipe)
    };
  });

  return {
    id: sceneId,
    title: '製作道具',
    location: getSceneLocationLabel(returnSceneId),
    description: '你把能就地處理的材料攤在手邊，挑出不必靠工作台也能完成的小東西。',
    choiceGroups: [
      {
        title: '可製作',
        choices: craftChoices,
        emptyLabel: '目前沒有能徒手處理的簡易配方。'
      },
      {
        title: '返回',
        choices: [createReturnChoice(`useItem:${returnSceneId}`)]
      }
    ]
  };
}

function createGiftScene(sceneId) {
  const [, villagerId, returnSceneId] = sceneId.split(':');
  const villager = villagers.find((candidate) => candidate.id === villagerId);
  if (!villager || villager.socialRules?.canReceiveGifts === false) {
    return createDialogueScene(`dialogue:${villagerId}:${returnSceneId}`);
  }

  const choices = [];
  let emptyLabel = '目前沒有可送出的禮物。';
  if (hasGivenGiftToday(villagerId)) {
    choices.push(createDisabledChoice('今天已經送過禮了。'));
  } else {
    const giftEntries = gameState.player.inventory
      .map((entry) => ({ ...entry, item: getItem(entry.itemId) }))
      .filter(({ item, count }) => item?.canGift && count > 0);
    choices.push(...giftEntries.map(({ item, count }) => ({
      id: `gift_${villagerId}_${item.id}`,
      label: `${item.name}（${count}）`,
      actionType: 'gift',
      timeCostSeconds: commands.commands.gift?.defaultTimeCostSeconds || 180,
      dynamicAction: 'giveGift',
      villagerId,
      itemId: item.id,
      returnSceneId,
      progressLabel: `正在把${item.name}交給${villager.name}...`
    })));
  }

  return {
    id: sceneId,
    title: `送禮給${villager.name}`,
    location: getLocationLabel(returnSceneId),
    description: `從背包裡挑一樣你願意交到${villager.name}手上的東西。`,
    choiceGroups: [
      {
        title: '選擇禮物',
        choices,
        emptyLabel
      },
      {
        title: '其他',
        choices: [createReturnChoice(`dialogue:${villagerId}:${returnSceneId}`)]
      }
    ]
  };
}

function giveGift(villagerId, itemId, returnSceneId) {
  const villager = villagers.find((candidate) => candidate.id === villagerId);
  const item = getItem(itemId);
  if (hasGivenGiftToday(villagerId)) {
    recordFailedAction({ id: `gift_${villagerId}_${itemId}`, label: `送出${item?.name || itemId}` }, '今天已經送過禮了。');
    return;
  }
  if (!villager || !item?.canGift || getInventoryCount(gameState.player.inventory, itemId) <= 0) {
    recordFailedAction({ id: `gift_${villagerId}_${itemId}`, label: `送出${item?.name || itemId}` }, '目前不能送出這個道具。');
    return;
  }

  let gain = 0;
  let reactionText = '';
  runTrackedAction({
    id: `gift_${villagerId}_${item.id}`,
    label: `送出${item.name}`,
    timeCostSeconds: commands.commands.gift?.defaultTimeCostSeconds || 180
  }, () => {
    changeInventoryItem(gameState.player.inventory, itemId, -1);
    gain = getGiftAffectionGain(villager, item);
    if (!gameState.villagers[villagerId]) {
      gameState.villagers[villagerId] = { affection: 0 };
    }
    gameState.villagers[villagerId].affection = Math.max(0, (gameState.villagers[villagerId].affection || 0) + gain);
    addPlayerDailyFlag(getGiftDailyFlag(villagerId));
    advanceTime(commands.commands.gift?.defaultTimeCostSeconds || 180);
    reactionText = createGiftReactionText(villager, item);
    gameState.currentSceneId = `dialogue:${villagerId}:${returnSceneId}`;
    gameState.lastInteraction = {
      villagerId,
      commandId: 'gift',
      text: reactionText
    };
  }, { message: '' });
  saveGame();
  render();
}

function getGiftAffectionGain(villager, item) {
  return isLikedGiftForVillager(villager, item) ? 3 : 1;
}

function isLikedGiftForVillager(villager, item) {
  return (villager?.likes || []).some((like) => like === item.name || item.tags?.includes(like));
}

function getOtherGiftLikers(villager, item) {
  return villagers
    .filter((candidate) => candidate.id !== villager.id)
    .filter((candidate) => candidate.socialRules?.canReceiveGifts !== false)
    .filter((candidate) => isLikedGiftForVillager(candidate, item));
}

function createGiftReactionText(villager, item) {
  const liked = isLikedGiftForVillager(villager, item);
  const otherLikers = liked ? [] : getOtherGiftLikers(villager, item);
  const reactionType = liked ? 'liked' : otherLikers.length ? 'otherLikes' : 'neutral';
  const otherNames = otherLikers.map((candidate) => candidate.name).join('、');
  const fallback = createFallbackGiftReaction(villager, item, reactionType, otherNames);
  const reactionTable = {
    aida: {
      liked: `艾妲接過${item.name}時，表情明顯柔和了些。\n\n「這個正好。你記得我需要什麼，比我想像中細心。」`,
      otherLikes: `艾妲接過${item.name}，很快就看出它的用途。\n\n「我會收下。不過這個拿去給${otherNames}，也許更能派上用場。下次可以試試。」`,
      neutral: `艾妲把${item.name}收進手邊，向你點了點頭。\n\n「心意我收到了。村裡能多一點能用的東西，總不是壞事。」`
    },
    mira: {
      liked: `米菈捧著${item.name}看了看，眼神像被一小片柔光碰到。\n\n「謝謝你。這個我很喜歡，會好好收著。」`,
      otherLikes: `米菈小心接過${item.name}，想了想才輕聲開口。\n\n「謝謝。不過${otherNames}應該會更喜歡這個。你願意記住這些事，大家都會高興的。」`,
      neutral: `米菈把${item.name}收下，聲音放得很輕。\n\n「謝謝你特地拿來。雖然不是我最常用的東西，但你的心意我明白。」`
    },
    nuosi: {
      liked: `諾絲掂了掂${item.name}，嘴角很短地抬了一下。\n\n「不錯。這東西我用得上，你沒有亂送。」`,
      otherLikes: `諾絲看了${item.name}一眼，像是在估量它該放到哪裡。\n\n「我可以收。不過真要討人高興，${otherNames}應該比我更吃這套。」`,
      neutral: `諾絲把${item.name}收進一旁，語氣仍舊平穩。\n\n「行，我收下。下次如果想送得準一點，先想想對方平常碰什麼。」`
    },
    sela: {
      liked: `賽拉接過${item.name}，目光停了比平常久一些。\n\n「這個我喜歡。你有在觀察，不只是隨手把東西丟過來。」`,
      otherLikes: `賽拉看著${item.name}，很快把它收好。\n\n「謝了。不過這個更像${otherNames}會喜歡的東西。送禮也要看對象，跟帶裝備一樣。」`,
      neutral: `賽拉收下${item.name}，神情沒有太大變化。\n\n「我收下。心意是一回事，判斷又是另一回事。下次可以更準。」`
    },
    tori: {
      liked: `托莉一看到${item.name}，眼睛立刻亮了起來。\n\n「欸，這個我喜歡！你真的拿給我？那、那我就不客氣了！」`,
      otherLikes: `托莉接過${item.name}，先是高興，接著又像想到什麼似地歪頭。\n\n「謝啦！不過這個${otherNames}好像也會很喜歡。你下次送給她看看嘛。」`,
      neutral: `托莉把${item.name}抱在手裡，還是很快露出笑。\n\n「謝啦！雖然不是我最喜歡的那種，不過有人特地送東西，感覺還是不錯。」`
    },
    elaine: {
      liked: `伊蓮接過${item.name}，指尖輕輕拂過它的邊緣。\n\n「這個很合我意。你挑它時，多少也想過它代表什麼吧。」`,
      otherLikes: `伊蓮看著${item.name}，像是在腦中替它找到更適合的位置。\n\n「我會收下。不過若要說誰會真正開心，${otherNames}或許更適合收到它。」`,
      neutral: `伊蓮把${item.name}收進身旁，語氣溫和。\n\n「謝謝。禮物未必每次都要正中喜好，有時候願意給出本身就已經足夠。」`
    }
  };
  return reactionTable[villager.id]?.[reactionType] || fallback;
}

function createFallbackGiftReaction(villager, item, reactionType, otherNames) {
  if (reactionType === 'liked') {
    return `${villager.name}接過${item.name}，露出比平常更明顯的笑意。\n\n「謝謝，這個我很喜歡。」`;
  }
  if (reactionType === 'otherLikes') {
    return `${villager.name}收下${item.name}，想了想後提醒你。\n\n「謝謝。不過${otherNames}應該會更喜歡這個。」`;
  }
  return `${villager.name}收下${item.name}。\n\n「謝謝你特地拿來。」`;
}

function createWaitScene(sceneId) {
  const returnSceneId = sceneId.split(':')[1] || FALLBACK_SCENE_ID;
  return {
    id: sceneId,
    title: '等待',
    location: getSceneLocationLabel(returnSceneId),
    description: '先把手上的事停一停，讓時間慢慢往前走。',
    choiceGroups: [{
      title: '等待時間',
      type: 'waitSlider',
      returnSceneId,
      choices: [createReturnChoice(returnSceneId)]
    }]
  };
}

function createSleepScene(sceneId) {
  const [, returnSceneId, facilityId] = sceneId.split(':');
  const facility = getFacility(facilityId || 'protagonist_bed');
  const baseReturnSceneId = returnSceneId || FALLBACK_SCENE_ID;
  return {
    id: sceneId,
    title: '睡覺',
    location: getSceneLocationLabel(baseReturnSceneId),
    description: facility?.description || '你可以在這裡躺下，好好讓身體鬆開幾個小時。',
    facilityStatusRows: facility ? createFacilityStatusRows(facility, resolveFacilityContext(facility.id, baseReturnSceneId)) : [],
    choiceGroups: [{
      title: '睡覺時間',
      type: 'sleepSlider',
      returnSceneId: baseReturnSceneId,
      facilityId: facility?.id || 'protagonist_bed',
      choices: [createReturnChoice(baseReturnSceneId)]
    }]
  };
}

function createTradeScene(sceneId) {
  const [, villagerId, returnSceneId] = sceneId.split(':');
  const villager = villagers.find((candidate) => candidate.id === villagerId);
  if (!villager) {
    return createLocationScene(locations.find((location) => location.id === returnSceneId) || locations[0]);
  }

  ensureTradeDraft(villagerId, returnSceneId);
  const buyRows = createBuyTradeRows(villager, returnSceneId);
  const sellRows = villager.id === 'lizard_merchant' ? createSellTradeRows(villager, returnSceneId) : [];
  const summary = getTradeSummary(villager);
  const groups = [
    { title: '購買', type: 'tradeRows', rows: buyRows, emptyLabel: '目前沒有可交易的商品。' },
    ...(villager.id === 'lizard_merchant'
      ? [{ title: '賣出', type: 'tradeRows', rows: sellRows, emptyLabel: '目前沒有可賣出的道具。' }]
      : []),
    { title: '本次交易', type: 'tradeSummary', lines: createTradeSummaryLines(villager, summary) },
    { title: '結算', choices: createTradeCheckoutChoices(villager, returnSceneId, summary) },
    { title: '返回', choices: [createReturnChoice(`dialogue:${villager.id}:${returnSceneId}`)] }
  ];

  return {
    id: sceneId,
    title: `與${villager.name}交易`,
    location: getLocationLabel(returnSceneId),
    description: [
      '你摸了摸身上的螢石，心裡盤算著這次該換些什麼。',
      createDebugInfoBlock([
        `villagerId: ${villager.id}`,
        `buyDraft: ${JSON.stringify(tradeDraft?.buy || {})}`,
        `sellDraft: ${JSON.stringify(tradeDraft?.sell || {})}`
      ])
    ].filter(Boolean).join('\n\n'),
    infoRows: [{ label: '螢石', value: `${summary.fluorite} 顆` }],
    choiceGroups: groups
  };
}

function createDisabledChoice(label, reason = label) {
  return {
    id: `disabled_${label}`,
    label,
    timeCostSeconds: 0,
    disabledStatic: true,
    disabledReason: reason
  };
}

function createBuyTradeRows(villager, returnSceneId) {
  const affection = gameState.villagers[villager.id]?.affection || 0;
  return (villager.carriedItems || [])
    .filter((entry) => villager.id === 'lizard_merchant' || affection >= (entry.affectionMin || 0))
    .map((entry) => {
      const item = getItem(entry.itemId);
      const stock = getTradeStock(villager.id, entry);
      const price = entry.price?.amount || item?.price?.amount || 0;
      const selected = tradeDraft?.buy?.[entry.itemId] || 0;
      return {
        id: `trade_buy_row_${villager.id}_${entry.itemId}`,
        itemId: entry.itemId,
        count: getInventoryCount(gameState.player.inventory || [], entry.itemId),
        name: item?.name || entry.itemId,
        meta: `庫存 ${stock}/${entry.stock?.max ?? stock}　${price} 螢石`,
        selectedLabel: `買入 ${selected}`,
        minusChoice: {
          id: `buy_${villager.id}_${entry.itemId}_minus`,
          label: `${item?.name || entry.itemId}　減少買入`,
          actionType: 'adjustTrade',
          timeCostSeconds: 0,
          hideCost: true,
          dynamicAction: 'adjustTradeItem',
          villagerId: villager.id,
          itemId: entry.itemId,
          price,
          mode: 'buy',
          delta: -1,
          returnSceneId,
          disabledReason: selected <= 0 ? '目前未選擇這個道具。' : ''
        },
        plusChoice: {
          id: `buy_${villager.id}_${entry.itemId}`,
          label: `${item?.name || entry.itemId}　增加買入`,
          actionType: 'adjustTrade',
          timeCostSeconds: 0,
          hideCost: true,
          dynamicAction: 'adjustTradeItem',
          villagerId: villager.id,
          itemId: entry.itemId,
          price,
          mode: 'buy',
          delta: 1,
          returnSceneId,
          disabledReason: getTradeAdjustmentDisabledReason({
            mode: 'buy',
            direction: 'plus',
            villagerId: villager.id,
            itemId: entry.itemId,
            price,
            stock,
            selected
          })
        }
      };
    })
    .filter((row) => row.plusChoice.price >= 0);
}

function createSellTradeRows(villager, returnSceneId) {
  return gameState.player.inventory
    .map((entry) => ({ ...entry, item: getItem(entry.itemId) }))
    .filter(({ item, count }) => item?.price?.sellable && count > 0)
    .map(({ item, count }) => {
      const selected = tradeDraft?.sell?.[item.id] || 0;
      return {
        id: `trade_sell_row_${item.id}`,
        itemId: item.id,
        count,
        name: item.name,
        meta: `持有 ${count}　${item.price.amount} 螢石`,
        selectedLabel: `賣出 ${selected}`,
        minusChoice: {
          id: `sell_${item.id}_minus`,
          label: `${item.name}　減少賣出`,
          actionType: 'adjustTrade',
          timeCostSeconds: 0,
          hideCost: true,
          dynamicAction: 'adjustTradeItem',
          villagerId: villager.id,
          itemId: item.id,
          price: item.price.amount,
          mode: 'sell',
          delta: -1,
          returnSceneId,
          disabledReason: selected <= 0 ? '目前未選擇這個道具。' : ''
        },
        plusChoice: {
          id: `sell_${item.id}`,
          label: `${item.name}　增加賣出`,
          actionType: 'adjustTrade',
          timeCostSeconds: 0,
          hideCost: true,
          dynamicAction: 'adjustTradeItem',
          villagerId: villager.id,
          itemId: item.id,
          price: item.price.amount,
          mode: 'sell',
          delta: 1,
          returnSceneId,
          disabledReason: getTradeAdjustmentDisabledReason({
            mode: 'sell',
            direction: 'plus',
            itemId: item.id,
            selected,
            ownedCount: count
          })
        }
      };
    });
}

function getTradeAdjustmentDisabledReason({
  mode,
  direction,
  villagerId,
  itemId,
  price = 0,
  stock = 0,
  selected = 0,
  ownedCount = 0
}) {
  if (direction === 'minus') {
    return selected <= 0 ? '目前未選擇這個道具。' : '';
  }

  if (mode === 'buy') {
    if (stock <= 0) {
      return '這件東西眼下已經被換光了。';
    }
    if (selected >= stock) {
      return '已達目前庫存上限。';
    }
    const villager = villagers.find((candidate) => candidate.id === villagerId);
    const summary = getTradeSummary(villager);
    if (summary.afterFluorite - price < 0) {
      return '螢石不足，無法再增加買入。';
    }
    if (wouldTradeAdjustmentOverCarry({ mode, itemId, delta: 1 })) {
      return getCarryOverLimitMessage();
    }
    return '';
  }

  if (selected >= ownedCount) {
    return '已達目前可賣上限。';
  }
  return '';
}

function wouldTradeAdjustmentOverCarry({ mode, itemId, delta }) {
  const nextInventory = getTradeResultInventory();
  changeInventoryItem(nextInventory, itemId, mode === 'sell' ? -delta : delta);
  return getInventoryWeight(normalizeInventory(nextInventory)) > getPlayerCarryCapacity();
}

function getTradeStock(villagerId, carriedItem) {
  const stockState = gameState.tradeStocks?.[villagerId] || {};
  const saved = stockState[carriedItem.itemId];
  if (typeof saved === 'number') {
    return saved;
  }
  return carriedItem.stock?.max ?? 0;
}

function ensureTradeDraft(villagerId, returnSceneId, reset = false) {
  const key = `${villagerId}:${returnSceneId}`;
  if (reset || !tradeDraft || tradeDraft.key !== key) {
    tradeDraft = {
      key,
      villagerId,
      returnSceneId,
      buy: {},
      sell: {}
    };
  }
  return tradeDraft;
}

function adjustContainerDraft(choice) {
  const facility = facilities.find((candidate) => candidate.id === choice.facilityId);
  if (!facility) {
    recordFailedAction(choice, '找不到要整理的容器。');
    return;
  }
  const storageMode = choice.storageMode || '';
  const draft = ensureContainerDraft(choice.facilityId, choice.returnSceneId, false, storageMode);
  const mode = choice.mode === 'deposit' ? 'deposit' : 'withdraw';
  const oppositeMode = mode === 'deposit' ? 'withdraw' : 'deposit';
  const bucket = draft[mode];
  const oppositeBucket = draft[oppositeMode];

  if (Number(oppositeBucket[choice.itemId] || 0) > 0) {
    oppositeBucket[choice.itemId] = Math.max(0, Number(oppositeBucket[choice.itemId] || 0) - 1);
    if (oppositeBucket[choice.itemId] <= 0) {
      delete oppositeBucket[choice.itemId];
    }
    clearActionResultDisplay();
    render();
    return;
  }

  const draftState = getContainerDraftState(facility, choice.returnSceneId, storageMode);
  const disabledReason = mode === 'deposit'
    ? getContainerDraftDepositDisabledReason(facility, choice.itemId, draftState, storageMode)
    : getContainerDraftWithdrawDisabledReason(facility, choice.itemId, draftState);
  if (disabledReason) {
    recordFailedAction(choice, disabledReason);
    return;
  }

  bucket[choice.itemId] = Number(bucket[choice.itemId] || 0) + 1;
  clearActionResultDisplay();
  render();
}

function cancelContainerDraft(facilityId, returnSceneId, storageMode = '') {
  ensureContainerDraft(facilityId, returnSceneId, true, storageMode);
  const flow = isBlackCatCarryStorageMode(storageMode) ? clearPendingActionFlow('blackCatCarryItems') : null;
  containerDraft = null;
  gameState.currentSceneId = isBlackCatCarryStorageMode(storageMode)
    ? flow?.cancelAction?.targetSceneId || flow?.cancelSceneId || `dialogue:${BLACK_CAT_NPC_ID}:${returnSceneId || EXPLORATION_SCENE_ID}`
    : returnSceneId || FALLBACK_SCENE_ID;
  clearActionResultDisplay();
  if (isBlackCatCarryStorageMode(storageMode)) {
    gameState.lastInteraction = {
      villagerId: BLACK_CAT_NPC_ID,
      commandId: 'blackCatCarryItems',
      text: '你收回攤開的東西。黑貓仍待在旁邊，尾巴慢慢掃過落葉，像是在等你重新決定。'
    };
  }
  saveGame();
  render();
}

function confirmContainerDraft(choice) {
  const facility = facilities.find((candidate) => candidate.id === choice.facilityId);
  if (!facility) {
    recordFailedAction(choice, '找不到要整理的容器。');
    return;
  }
  const returnSceneId = choice.returnSceneId || FALLBACK_SCENE_ID;
  const storageMode = choice.storageMode || '';
  const draft = ensureContainerDraft(facility.id, returnSceneId, false, storageMode);
  const withdrawEntries = inventoryMapToArray(draft.withdraw);
  const depositEntries = inventoryMapToArray(draft.deposit);
  if (!withdrawEntries.length && !depositEntries.length) {
    recordFailedAction(choice, '尚未調整任何道具。');
    return;
  }

  const nextState = getContainerDraftState(facility, returnSceneId, storageMode);
  if (getInventoryWeight(nextState.inventory) > getPlayerCarryCapacity()) {
    recordFailedAction(choice, getCarryOverLimitMessage());
    return;
  }
  if (getInventoryWeight(nextState.storage) > getContainerCapacity(facility)) {
    recordFailedAction(choice, getContainerCapacityDisabledMessage(facility));
    return;
  }

  const withdrawText = withdrawEntries.length ? `取回：${formatInventory(withdrawEntries)}。` : '';
  const depositPrefix = isBlackCatCarryStorageMode(storageMode) ? '帶回村子' : '放入';
  const depositText = depositEntries.length ? `${depositPrefix}：${formatInventory(depositEntries)}。` : '';
  const resultName = isBlackCatCarryStorageMode(storageMode) ? '黑貓帶走的東西' : (facility.name || '容器');
  const blackCatLeaveText = isBlackCatCarryStorageMode(storageMode) ? '黑貓叼起你交給牠的東西，很快消失在林影裡。' : '';
  const blackCatSceneDescription = isBlackCatCarryStorageMode(storageMode)
    ? '黑貓低頭叼起你交給牠的東西，沒有發出半點聲音。牠越過潮濕的落葉，像一道黑影滑進林間。'
    : '';
  const pendingFlow = isBlackCatCarryStorageMode(storageMode) ? getPendingActionFlow('blackCatCarryItems') : null;
  const confirmSettings = getPendingActionConfirmSettings('blackCatCarryItems', { timeCostSeconds: 60 });
  runTrackedAction(choice, () => {
    if (isBlackCatCarryStorageMode(storageMode)) {
      advanceTime(confirmSettings.timeCostSeconds);
    }
    const context = resolveFacilityContext(facility.id, returnSceneId);
    context.state.items = nextState.storage;
    gameState.player.inventory = nextState.inventory;
    for (const entry of withdrawEntries) {
      rememberObtainedItem(entry.itemId);
    }
    gameState.currentSceneId = returnSceneId;
    containerDraft = null;
    if (isBlackCatCarryStorageMode(storageMode)) {
      if (!gameState.player.flags.includes(BLACK_CAT_FIRST_DELIVERY_NOTICE_FLAG)
        && !gameState.player.flags.includes(BLACK_CAT_FIRST_DELIVERY_PENDING_FLAG)) {
        gameState.player.flags.push(BLACK_CAT_FIRST_DELIVERY_PENDING_FLAG);
      }
      dismissBlackCatFromCurrentPosition();
      clearPendingActionFlow(pendingFlow?.id || 'blackCatCarryItems');
    }
  }, {
    message: [`整理了${resultName}。${withdrawText}${depositText}`, blackCatLeaveText].filter(Boolean).join(' '),
    messageLabel: isBlackCatCarryStorageMode(storageMode) ? '狀態' : '',
    showMessageWhenPresent: isBlackCatCarryStorageMode(storageMode)
  });
  if (blackCatSceneDescription) {
    markBlackCatLeftSceneDescription(blackCatSceneDescription);
  }
  saveGame(`已整理${resultName}。`);
  render();
}

function adjustDroppedItemsDraft(choice) {
  const draft = ensureDroppedItemsDraft(choice.returnSceneId);
  const mode = choice.mode === 'place' ? 'place' : 'take';
  const oppositeMode = mode === 'place' ? 'take' : 'place';
  const bucket = draft[mode];
  const oppositeBucket = draft[oppositeMode];
  const delta = Number(choice.delta || 0);

  if (delta > 0 && Number(oppositeBucket[choice.itemId] || 0) > 0) {
    oppositeBucket[choice.itemId] = Math.max(0, Number(oppositeBucket[choice.itemId] || 0) - delta);
    if (oppositeBucket[choice.itemId] <= 0) {
      delete oppositeBucket[choice.itemId];
    }
    clearActionResultDisplay();
    render();
    return;
  }

  const disabledReason = mode === 'place'
    ? getDroppedItemsPlaceDisabledReason(choice.itemId, getDroppedItemsDraftState(choice.returnSceneId))
    : getDroppedItemsTakeDisabledReason(choice.itemId, getDroppedItemsDraftState(choice.returnSceneId));
  if (delta > 0 && disabledReason) {
    recordFailedAction(choice, disabledReason);
    return;
  }

  const current = Number(bucket[choice.itemId] || 0);
  const next = Math.max(0, current + delta);
  if (next <= 0) {
    delete bucket[choice.itemId];
  } else {
    bucket[choice.itemId] = next;
  }
  clearActionResultDisplay();
  render();
}

function cancelDroppedItemsDraft(returnSceneId) {
  ensureDroppedItemsDraft(returnSceneId, true);
  droppedItemsDraft = null;
  gameState.currentSceneId = returnSceneId || FALLBACK_SCENE_ID;
  clearActionResultDisplay();
  saveGame();
  render();
}

function confirmDroppedItemsDraft(choice) {
  const returnSceneId = choice.returnSceneId || FALLBACK_SCENE_ID;
  const draft = ensureDroppedItemsDraft(returnSceneId);
  const takeEntries = inventoryMapToArray(draft.take);
  const placeEntries = inventoryMapToArray(draft.place);
  if (!takeEntries.length && !placeEntries.length) {
    recordFailedAction(choice, '尚未調整任何道具。');
    return;
  }

  const nextState = getDroppedItemsDraftState(returnSceneId);
  if (getInventoryWeight(nextState.inventory) > getPlayerCarryCapacity()) {
    recordFailedAction(choice, getCarryOverLimitMessage());
    return;
  }

  const facility = facilities.find((candidate) => candidate.id === 'discarded_items');
  if (getInventoryWeight(nextState.ground) > getContainerCapacity(facility)) {
    recordFailedAction(choice, getContainerCapacityDisabledMessage(facility));
    return;
  }

  const takeText = takeEntries.length ? `取回：${formatInventory(takeEntries)}。` : '';
  const placeText = placeEntries.length ? `放下：${formatInventory(placeEntries)}。` : '';
  runTrackedAction(choice, () => {
    const state = getDroppedItemsState(returnSceneId, true);
    state.items = nextState.ground;
    gameState.player.inventory = nextState.inventory;
    for (const entry of takeEntries) {
      rememberObtainedItem(entry.itemId);
    }
    if (placeEntries.length) {
      state.expiresAtTotalSeconds = getCurrentTotalSeconds() + 3600;
    }
    if (countInventoryItems(state.items) <= 0) {
      deleteDroppedItemsState(returnSceneId);
    } else {
      gameState.facilities.discarded_items.perLocationStates[returnSceneId] = state;
    }
    gameState.currentSceneId = returnSceneId;
    droppedItemsDraft = null;
  }, { message: `整理了遺落的道具。${takeText}${placeText}留在這裡的東西可能永久消失。` });
  saveGame('已整理遺落的道具。');
  render();
}

function adjustForageLootDraft(choice) {
  const draft = ensureForageLootDraft(choice.returnSceneId);
  const mode = choice.mode === 'place' ? 'place' : 'take';
  const bucket = mode === 'place' ? draft.place : draft.take;
  const delta = Number(choice.delta || 0);
  const draftState = getForageLootDraftState();
  const disabledReason = mode === 'place'
    ? getForageLootPlaceDisabledReason(choice.itemId, draftState)
    : getForageLootTakeDisabledReason(choice.itemId, draftState);
  if (delta > 0 && disabledReason) {
    recordFailedAction(choice, disabledReason);
    return;
  }

  const current = Number(bucket[choice.itemId] || 0);
  const next = Math.max(0, current + delta);
  if (next <= 0) {
    delete bucket[choice.itemId];
  } else {
    bucket[choice.itemId] = next;
  }
  clearActionResultDisplay();
  render();
}

function cancelForageLootDraft(choice) {
  const returnSceneId = choice.returnSceneId || EXPLORATION_SCENE_ID;
  const isBattleLoot = choice.lootMode === 'battle';
  const leftover = cloneInventory(gameState.exploration?.temporaryLoot || []);
  runTrackedAction(choice, () => {
    if (leftover.length) {
      addDroppedItemsAtLocation(resolveDropLocationSceneId(returnSceneId), leftover);
    }
    gameState.exploration.temporaryLoot = [];
    forageLootDraft = null;
    gameState.currentSceneId = returnSceneId;
  }, {
    message: leftover.length
      ? `你沒有整理${isBattleLoot ? '戰利品' : '剛找到的東西'}，${formatInventory(leftover)}被留在遺落的道具。`
      : `你離開了${isBattleLoot ? '戰利品' : '搜尋到的物資'}。`
  });
  saveGame(`已離開${isBattleLoot ? '戰利品' : '搜尋到的物資'}。`);
  render();
}

function confirmForageLootDraft(choice) {
  const returnSceneId = choice.returnSceneId || EXPLORATION_SCENE_ID;
  const resultName = choice.lootMode === 'battle' ? '戰利品' : '搜尋到的物資';
  ensureForageLootDraft(returnSceneId);
  const nextState = getForageLootDraftState();
  if (getInventoryWeight(nextState.inventory) > getPlayerCarryCapacity()) {
    recordFailedAction(choice, getCarryOverLimitMessage());
    return;
  }

  const takeEntries = inventoryMapToArray(forageLootDraft.take);
  const placeEntries = inventoryMapToArray(forageLootDraft.place);
  const leftover = cloneInventory(nextState.loot);
  const takeText = takeEntries.length ? `放入背包：${formatInventory(takeEntries)}。` : '';
  const placeText = placeEntries.length ? `放下：${formatInventory(placeEntries)}。` : '';
  const leftoverText = leftover.length ? `留在遺落道具：${formatInventory(leftover)}。` : '';

  runTrackedAction(choice, () => {
    gameState.player.inventory = nextState.inventory;
    for (const entry of takeEntries) {
      rememberObtainedItem(entry.itemId);
    }
    if (leftover.length) {
      addDroppedItemsAtLocation(resolveDropLocationSceneId(returnSceneId), leftover);
    }
    gameState.exploration.temporaryLoot = [];
    forageLootDraft = null;
    gameState.currentSceneId = returnSceneId;
  }, {
    message: `整理了${resultName}。${takeText}${placeText}${leftoverText}`
  });
  saveGame(`已整理${resultName}。`);
  render();
}

function createTradeCheckoutChoices(villager, returnSceneId, summary) {
  const hasAnyChange = summary.buyTotal > 0 || summary.sellTotal > 0;
  const carryReason = summary.overCarry ? getCarryOverLimitMessage() : '';
  return [
    {
      id: 'finalize_trade',
      label: '完成交易',
      actionType: 'finalizeTrade',
      timeCostSeconds: 300,
      dynamicAction: 'finalizeTrade',
      villagerId: villager.id,
      returnSceneId,
      disabledStatic: !hasAnyChange || summary.afterFluorite < 0 || summary.overCarry,
      disabledReason: !hasAnyChange
        ? '尚未選擇交易項目。'
        : summary.afterFluorite < 0
          ? '螢石不足，請減少買入或增加賣出。'
          : carryReason,
      progressLabel: '正在完成交易...'
    },
    {
      id: 'clear_trade',
      label: '清空選擇',
      actionType: 'adjustTrade',
      timeCostSeconds: 0,
      hideCost: true,
      dynamicAction: 'adjustTradeItem',
      villagerId: villager.id,
      returnSceneId,
      mode: 'clear'
    }
  ];
}

function createTradeSummaryLines(villager, summary) {
  const buyText = formatTradeDraftLine({
    prefix: '買入',
    entries: Object.entries(tradeDraft?.buy || {}),
    getItemName: (itemId) => getItem(itemId)?.name || itemId
  });
  const sellText = formatTradeDraftLine({
    prefix: '賣出',
    entries: Object.entries(tradeDraft?.sell || {}),
    getItemName: (itemId) => getItem(itemId)?.name || itemId
  });
  const hasBuy = Boolean(buyText);
  const hasSell = Boolean(sellText);
  if (!hasBuy && !hasSell) {
    return [];
  }

  const fluoriteLine = createTradeFluoriteSummaryLine(summary);
  const lines = [];
  if (hasBuy) {
    lines.push(buyText);
  }
  if (hasSell) {
    lines.push(sellText);
  }
  lines.push(fluoriteLine);
  return lines;
}

function formatTradeDraftLine({ prefix, entries, getItemName }) {
  const parts = (entries || [])
    .map(([itemId, count]) => ({ itemId, count: Number(count || 0) }))
    .filter((entry) => entry.count > 0)
    .map((entry) => `${getItemName(entry.itemId)} x ${entry.count}`);
  if (!parts.length) {
    return '';
  }
  return `${prefix}：${parts.join(' 、 ')}。`;
}

function createTradeFluoriteSummaryLine(summary) {
  if (summary.afterFluorite < 0) {
    return '這筆交易無法被接受。';
  }
  if (summary.buyTotal > summary.sellTotal) {
    return `交易後，你共花費 ${summary.buyTotal - summary.sellTotal} 顆螢石，你身上的螢石將為 ${summary.afterFluorite} 顆。`;
  }
  if (summary.sellTotal > summary.buyTotal) {
    return `交易後，你共賺取 ${summary.sellTotal - summary.buyTotal} 顆螢石，你身上的螢石將為 ${summary.afterFluorite} 顆。`;
  }
  return `交易後，你不會花費或賺取螢石，你身上的螢石將維持 ${summary.afterFluorite} 顆。`;
}

function getTradeSummary(villager) {
  const fluorite = getInventoryCount(gameState.player.inventory, 'fluorite');
  let buyTotal = 0;
  let sellTotal = 0;

  for (const [itemId, count] of Object.entries(tradeDraft?.buy || {})) {
    const carriedItem = villager.carriedItems?.find((entry) => entry.itemId === itemId);
    const item = getItem(itemId);
    const price = carriedItem?.price?.amount || item?.price?.amount || 0;
    buyTotal += price * count;
  }

  for (const [itemId, count] of Object.entries(tradeDraft?.sell || {})) {
    const item = getItem(itemId);
    sellTotal += (item?.price?.amount || 0) * count;
  }

  return {
    fluorite,
    buyTotal,
    sellTotal,
    afterFluorite: fluorite - buyTotal + sellTotal,
    afterCarryWeight: getInventoryWeight(getTradeResultInventory()),
    overCarry: getInventoryWeight(getTradeResultInventory()) > getPlayerCarryCapacity()
  };
}

function getTradeResultInventory() {
  const nextInventory = cloneInventory(gameState.player.inventory);
  const summaryFluoriteDelta = getTradeFluoriteDelta();
  if (summaryFluoriteDelta) {
    changeInventoryItem(nextInventory, 'fluorite', summaryFluoriteDelta);
  }

  for (const [itemId, count] of Object.entries(tradeDraft?.buy || {})) {
    changeInventoryItem(nextInventory, itemId, count);
  }

  for (const [itemId, count] of Object.entries(tradeDraft?.sell || {})) {
    changeInventoryItem(nextInventory, itemId, -count);
  }

  return normalizeInventory(nextInventory);
}

function getTradeFluoriteDelta() {
  const villager = villagers.find((candidate) => candidate.id === tradeDraft?.villagerId);
  let buyTotal = 0;
  let sellTotal = 0;
  for (const [itemId, count] of Object.entries(tradeDraft?.buy || {})) {
    const carriedItem = villager?.carriedItems?.find((entry) => entry.itemId === itemId);
    const item = getItem(itemId);
    buyTotal += (carriedItem?.price?.amount || item?.price?.amount || 0) * count;
  }
  for (const [itemId, count] of Object.entries(tradeDraft?.sell || {})) {
    const item = getItem(itemId);
    sellTotal += (item?.price?.amount || 0) * count;
  }
  return -buyTotal + sellTotal;
}

function setTradeStock(villagerId, itemId, count) {
  if (!gameState.tradeStocks) {
    gameState.tradeStocks = {};
  }
  if (!gameState.tradeStocks[villagerId]) {
    gameState.tradeStocks[villagerId] = {};
  }
  gameState.tradeStocks[villagerId][itemId] = Math.max(0, count);
}

function adjustTradeItem(choice) {
  if (choice.mode === 'clear') {
    clearActionResultDisplay();
    ensureTradeDraft(choice.villagerId, choice.returnSceneId, true);
    render();
    return;
  }

  const draft = ensureTradeDraft(choice.villagerId, choice.returnSceneId);
  const bucket = choice.mode === 'sell' ? draft.sell : draft.buy;
  const current = bucket[choice.itemId] || 0;
  const disabledReason = getTradeAdjustmentDisabledReason({
    mode: choice.mode,
    direction: choice.delta > 0 ? 'plus' : 'minus',
    villagerId: choice.villagerId,
    itemId: choice.itemId,
    price: choice.price,
    stock: choice.mode === 'buy'
      ? getTradeStock(choice.villagerId, villagers.find((candidate) => candidate.id === choice.villagerId)?.carriedItems?.find((entry) => entry.itemId === choice.itemId) || {})
      : 0,
    selected: current,
    ownedCount: choice.mode === 'sell' ? getInventoryCount(gameState.player.inventory, choice.itemId) : 0
  });
  if (disabledReason) {
    recordFailedAction(choice, disabledReason);
    return;
  }

  const max = choice.mode === 'sell'
    ? getInventoryCount(gameState.player.inventory, choice.itemId)
    : getTradeStock(choice.villagerId, villagers.find((candidate) => candidate.id === choice.villagerId)?.carriedItems?.find((entry) => entry.itemId === choice.itemId) || {});
  const next = Math.max(0, Math.min(max, current + choice.delta));
  if (next <= 0) {
    delete bucket[choice.itemId];
  } else {
    bucket[choice.itemId] = next;
  }
  clearActionResultDisplay();
  render();
}

function finalizeTrade(choice) {
  const villager = villagers.find((candidate) => candidate.id === choice.villagerId);
  const draft = ensureTradeDraft(choice.villagerId, choice.returnSceneId);
  const summary = getTradeSummary(villager);
  if (summary.buyTotal <= 0 && summary.sellTotal <= 0) {
    recordFailedAction(choice, '尚未選擇交易項目。');
    return;
  }
  if (summary.afterFluorite < 0) {
    recordFailedAction(choice, '螢石不足。');
    return;
  }
  if (summary.overCarry) {
    recordFailedAction(choice, getCarryOverLimitMessage());
    return;
  }

  for (const [itemId, count] of Object.entries(draft.buy)) {
    const carriedItem = villager?.carriedItems?.find((entry) => entry.itemId === itemId);
    const stock = carriedItem ? getTradeStock(choice.villagerId, carriedItem) : 0;
    if (!carriedItem || stock < count) {
      recordFailedAction(choice, '交易庫存不足，請重新確認數量。');
      return;
    }
  }

  for (const [itemId, count] of Object.entries(draft.sell)) {
    if (getInventoryCount(gameState.player.inventory, itemId) < count) {
      recordFailedAction(choice, '背包數量不足，請重新確認數量。');
      return;
    }
  }

  runTrackedAction(choice, () => {
    changeInventoryItem(gameState.player.inventory, 'fluorite', -summary.buyTotal + summary.sellTotal);

    for (const [itemId, count] of Object.entries(draft.buy)) {
      const carriedItem = villager.carriedItems.find((entry) => entry.itemId === itemId);
      changeInventoryItem(gameState.player.inventory, itemId, count);
      setTradeStock(choice.villagerId, itemId, getTradeStock(choice.villagerId, carriedItem) - count);
    }

    for (const [itemId, count] of Object.entries(draft.sell)) {
      changeInventoryItem(gameState.player.inventory, itemId, -count);
    }

    advanceTime(300);
    ensureTradeDraft(choice.villagerId, choice.returnSceneId, true);
    gameState.lastInteraction = null;
    gameState.currentSceneId = choice.returnSceneId || FALLBACK_SCENE_ID;
  }, { message: '交易完成。' });
  saveGame('交易完成，時間經過 5 分鐘。');
  render();
}

function getFacilitiesAtLocation(locationId) {
  const baseFacilities = facilities.filter((facility) =>
    facility.locationIds?.includes(locationId)
    && !shouldHideEmptyClaimedSmallStorage(facility, locationId)
  );
  const droppedFacility = getDroppedItemsFacilityForScene(locationId);
  return droppedFacility ? [...baseFacilities, droppedFacility] : baseFacilities;
}

function supportsPerLocationFacilityState(facility) {
  return facility?.facilityType === 'small_storage'
    && Array.isArray(facility?.locationIds)
    && facility.locationIds.length > 1;
}

function usesPerLocationContainerState(facility) {
  return facility?.facilityType === 'container' && facility.id === 'discarded_items';
}

function getTemporaryExplorationFacilities() {
  const temporaryFacilities = (gameState.exploration?.temporaryResourceNodes || [])
    .map((node) => {
      const baseFacility = facilities.find((facility) => facility.id === node.facilityId);
      return baseFacility ? { ...baseFacility, instanceId: node.instanceId } : null;
    })
    .filter(Boolean);
  const droppedFacility = getDroppedItemsFacilityForScene(EXPLORATION_SCENE_ID);
  return droppedFacility ? [...temporaryFacilities, droppedFacility] : temporaryFacilities;
}

function getDroppedItemsFacilityForScene(sceneId) {
  const state = getDroppedItemsState(sceneId);
  if (!countInventoryItems(state.items || [])) {
    return null;
  }
  const facility = facilities.find((candidate) => candidate.id === 'discarded_items');
  return facility ? { ...facility, instanceId: facility.id } : null;
}

function getDroppedItemsState(sceneId, create = false) {
  if (!gameState.facilities?.discarded_items) {
    if (!create) {
      return { items: [] };
    }
    gameState.facilities.discarded_items = { perLocationStates: {} };
  }
  const root = gameState.facilities.discarded_items;
  if (!root.perLocationStates) {
    root.perLocationStates = {};
  }
  if (!root.perLocationStates[sceneId]) {
    if (!create) {
      return { items: [] };
    }
    root.perLocationStates[sceneId] = { items: [], expiresAtTotalSeconds: 0 };
  }
  root.perLocationStates[sceneId].items = normalizeInventory(root.perLocationStates[sceneId].items || []);
  root.perLocationStates[sceneId].expiresAtTotalSeconds = Number(root.perLocationStates[sceneId].expiresAtTotalSeconds || 0);
  return root.perLocationStates[sceneId];
}

function deleteDroppedItemsState(sceneId) {
  const root = gameState.facilities?.discarded_items;
  if (!root?.perLocationStates?.[sceneId]) {
    return;
  }
  delete root.perLocationStates[sceneId];
}

function addDroppedItemsAtLocation(sceneId, entries) {
  const state = getDroppedItemsState(sceneId, true);
  for (const entry of entries || []) {
    changeInventoryItem(state.items, entry.itemId, Number(entry.count || 0));
  }
  state.expiresAtTotalSeconds = getCurrentTotalSeconds() + 3600;
}

function resolveFacilityContext(facilityId, returnSceneId) {
  if (isExplorationSceneId(returnSceneId)) {
    const node = (gameState.exploration?.temporaryResourceNodes || []).find((entry) => entry.instanceId === facilityId);
    if (node) {
      return {
        instanceId: node.instanceId,
        baseFacility: facilities.find((facility) => facility.id === node.facilityId) || null,
        state: node,
        isTemporary: true
      };
    }
  }

  const baseFacility = facilities.find((facility) => facility.id === facilityId) || null;
  const baseState = baseFacility ? (gameState.facilities[baseFacility.id] || {}) : null;
  let state = baseState;
  if (baseFacility && supportsPerLocationFacilityState(baseFacility)) {
    state = baseState.perLocationStates?.[returnSceneId] || { lastRestockDay: 0, lastGatherDay: 0, gatherCountDay: 0, gatherCount: 0, items: [] };
  }
  if (baseFacility && usesPerLocationContainerState(baseFacility)) {
    state = getDroppedItemsState(returnSceneId, true);
  }
  return {
    instanceId: facilityId,
    baseFacility,
    state,
    isTemporary: false
  };
}

function getCommandSet(commandSetId) {
  return commands.baseCommandSets[commandSetId] || [];
}

function getCommandCost(commandId) {
  return commands.commands[commandId]?.defaultTimeCostSeconds || 0;
}

function getFacilityMaxLevel(facilityId) {
  const facility = facilities.find((candidate) => candidate.id === facilityId);
  return facility?.storage?.maxLevel || facility?.upgrade?.maxLevel || 99;
}

function getFacilityLevel(facilityId, state = gameState) {
  const facility = facilities.find((candidate) => candidate.id === facilityId);
  return getFacilityInitialLevel(facility, state?.facilities?.[facilityId]?.level);
}

function getContainerCapacity(facility) {
  const state = gameState.facilities[facility.id] || {};
  return getFacilityContainerCapacity(facility, state);
}

function getInventoryWeight(inventory) {
  return normalizeInventory(inventory)
    .reduce((sum, entry) => sum + getItemWeight(entry.itemId) * entry.count, 0);
}

function getPlayerCarryCapacity() {
  return Number(gameState.player.maxCarryWeight || 0) + Number(gameState.player.carrySkill || 0) * 5;
}

function getPlayerCarryWeight() {
  return getInventoryWeight(gameState.player.inventory || []);
}

function cloneInventory(inventory) {
  return normalizeInventory(inventory).map((entry) => ({ ...entry }));
}

function canPlayerCarryItem(itemId, count) {
  const nextInventory = cloneInventory(gameState.player.inventory || []);
  changeInventoryItem(nextInventory, itemId, count);
  return getInventoryWeight(nextInventory) <= getPlayerCarryCapacity();
}

function getPlayerCarryDisabledReason(itemId, count) {
  if (!itemId || count <= 0) {
    return '';
  }
  if (canPlayerCarryItem(itemId, count)) {
    return '';
  }
  return getCarryOverLimitMessage();
}

function getChoiceCarryDisabledReason(choice) {
  const items = choice?.effects?.items;
  if (!items || typeof items !== 'object') {
    return '';
  }
  const nextInventory = cloneInventory(gameState.player.inventory || []);
  for (const [itemId, count] of Object.entries(items)) {
    if (count > 0) {
      changeInventoryItem(nextInventory, itemId, count);
    }
  }
  const nextWeight = getInventoryWeight(nextInventory);
  if (nextWeight <= getPlayerCarryCapacity()) {
    return '';
  }
  return getCarryOverLimitMessage();
}

function getCarryOverLimitMessage() {
  return '你已經無法負荷這個重量。';
}

function getItemWeight(itemId) {
  const weight = Number(getItem(itemId)?.weight);
  return Number.isFinite(weight) ? weight : 0;
}

function canDepositItem(facility, itemId, storageMode = '') {
  if (!facility || facility.facilityType !== 'container') {
    return false;
  }
  if (facility.storage?.canDeposit === false && !(facility.id === 'lost_and_found_box' && isBlackCatCarryStorageMode(storageMode))) {
    return false;
  }
  if (itemId === 'fluorite') {
    return false;
  }
  return Boolean(getItem(itemId));
}

function getContainerDepositDisabledMessage(facility) {
  if (facility?.id === 'discarded_items') {
    return '這個道具目前不能丟在這裡。';
  }
  return '這個道具目前不放入倉庫箱。';
}

function getContainerCapacityDisabledMessage(facility) {
  if (facility?.id === 'discarded_items') {
    return '這裡已經放不下更多東西。';
  }
  return '倉庫箱容量不足。';
}

function renderSystemVersionList() {
  const versions = {
    interfacePlan: gameState?.versions?.interfacePlan || INTERFACE_PLAN_VERSION,
    program: gameState?.versions?.program || PROGRAM_VERSION
  };
  const rows = [
    ['介面', versions.interfacePlan],
    ['程式', versions.program]
  ].map(([label, value]) => {
    const fragment = document.createDocumentFragment();
    const term = document.createElement('dt');
    term.textContent = label;
    const description = document.createElement('dd');
    description.textContent = value;
    fragment.append(term, description);
    return fragment;
  });
  elements.systemVersionList.replaceChildren(...rows);
}

function renderSidebar() {
  const timeBlock = getTimeBlock(gameState.time.secondsOfDay);
  elements.timeDay.textContent = `第 ${gameState.time.day} 天`;
  elements.timeDisplay.textContent = `${formatTime(gameState.time.secondsOfDay)} ${timeBlock}`;
  renderTimebarTone(timeBlock);
  renderPlayerGauge('life');
  renderPlayerGauge('stamina');
  if (elements.contributionDisplay) {
    elements.contributionDisplay.textContent = String(Math.max(0, Number(gameState.player.contribution || 0)));
  }
  elements.statusToggle.setAttribute('aria-expanded', String(!statusCollapsed));
  elements.statusToggle.querySelector('.inventory-toggle-icon').textContent = statusCollapsed ? '[展開]' : '[收合]';
  elements.statusBody.hidden = statusCollapsed;
  renderQuestPanel();
  elements.skillToggle.setAttribute('aria-expanded', String(!skillCollapsed));
  elements.skillToggle.querySelector('.inventory-toggle-icon').textContent = skillCollapsed ? '[展開]' : '[收合]';
  elements.skillBody.hidden = skillCollapsed;
  elements.inventoryWeight.textContent = `（負重：${formatNumber(getPlayerCarryWeight())} / ${formatNumber(getPlayerCarryCapacity())}）`;
  elements.inventoryWeight.classList.toggle('is-overweight', getPlayerCarryWeight() > getPlayerCarryCapacity());
  elements.inventoryToggle.setAttribute('aria-expanded', String(!inventoryCollapsed));
  elements.inventoryToggle.querySelector('.inventory-toggle-icon').textContent = inventoryCollapsed ? '[展開]' : '[收合]';
  elements.inventoryBody.hidden = inventoryCollapsed;
  elements.systemToggle.setAttribute('aria-expanded', String(!systemCollapsed));
  elements.systemToggle.querySelector('.inventory-toggle-icon').textContent = systemCollapsed ? '[展開]' : '[收合]';
  elements.systemBody.hidden = systemCollapsed;
  renderSystemVersionList();
  elements.saveGameButton.disabled = !hasUnsavedChanges;
  elements.saveGameButton.title = hasUnsavedChanges
    ? '會保存目前角色狀態、背包、倉庫物品與村莊設施狀態。'
    : '目前沒有新的變更需要存檔。';

  if (!gameState.player.inventory.length) {
    elements.inventoryList.replaceChildren(createTextRow('尚無道具'));
  } else {
    elements.inventoryList.replaceChildren(...gameState.player.inventory.map((entry) => {
      const item = getItem(entry.itemId);
      return createInventoryItemButton(item, entry);
    }));
  }

  const visibleSkills = SKILL_DEFINITIONS.filter((skill) => getSkillValue(skill.key) > 0);
  elements.skillPanel.hidden = !visibleSkills.length;
  elements.skillList.replaceChildren(...visibleSkills.map(createSkillButton));

  renderDebugTools();
}

function renderPlayerGauge(statId) {
  const isLife = statId === 'life';
  const maxKey = isLife ? 'maxLife' : 'maxStamina';
  const max = Math.max(1, Number(gameState.player[maxKey] || 1));
  const current = clampNumber(Number(gameState.player[statId] || 0), 0, max);
  const percent = clampNumber((current / max) * 100, 0, 100);
  const display = isLife ? elements.lifeDisplay : elements.staminaDisplay;
  const gauge = isLife ? elements.lifeGauge : elements.staminaGauge;
  const fill = isLife ? elements.lifeGaugeFill : elements.staminaGaugeFill;

  display.textContent = `${current} / ${max}`;
  gauge?.style.setProperty('--gauge-value', `${percent}%`);
  gauge?.setAttribute('aria-valuenow', String(current));
  gauge?.setAttribute('aria-valuemax', String(max));
  fill?.style.setProperty('width', `${percent}%`);
}

function renderTimebarTone(timeBlock) {
  const classByTimeBlock = {
    '清晨': 'timeblock-dawn',
    '上午': 'timeblock-morning',
    '中午': 'timeblock-noon',
    '下午': 'timeblock-afternoon',
    '傍晚': 'timeblock-evening',
    '夜晚': 'timeblock-night',
    '深夜': 'timeblock-late-night'
  };
  elements.sceneTimebar.classList.remove(
    'timeblock-dawn',
    'timeblock-morning',
    'timeblock-noon',
    'timeblock-afternoon',
    'timeblock-evening',
    'timeblock-night',
    'timeblock-late-night'
  );
  const toneClass = classByTimeBlock[timeBlock];
  if (toneClass) {
    elements.sceneTimebar.classList.add(toneClass);
  }
}

function renderQuestPanel() {
  const activeQuestEntries = normalizeQuestState(gameState.quests).active
    .map((questId) => quests.find((quest) => quest.id === questId))
    .filter(Boolean);

  elements.questPanel.hidden = !activeQuestEntries.length;
  elements.questToggle.setAttribute('aria-expanded', String(!questCollapsed));
  elements.questToggle.querySelector('.inventory-toggle-icon').textContent = questCollapsed ? '[展開]' : '[收合]';
  elements.questBody.hidden = questCollapsed;
  if (!activeQuestEntries.length) {
    elements.questList.replaceChildren();
    return;
  }

  elements.questList.replaceChildren(...activeQuestEntries.map(createQuestSidebarCard));
}

function createQuestSidebarCard(quest) {
  const card = document.createElement('article');
  card.className = 'quest-card';

  const title = document.createElement('h3');
  title.className = 'quest-card-title';
  title.textContent = quest.title;

  const giver = document.createElement('p');
  giver.className = 'quest-card-meta';
  giver.textContent = `發布者：${getVillagerName(quest.giver)}`;

  const objectives = document.createElement('div');
  objectives.className = 'quest-card-objectives';
  objectives.replaceChildren(...(quest.objectives || []).map(createQuestObjectiveRow));

  card.append(title, giver, objectives);
  return card;
}

function createQuestObjectiveRow(objective) {
  const row = document.createElement('p');
  row.className = 'quest-card-objective';
  row.textContent = formatQuestObjectiveProgress(objective);
  return row;
}

function getVillagerName(villagerId) {
  return villagers.find((entry) => entry.id === villagerId)?.name || villagerId || '未知';
}

function renderDebugTools() {
  const carryWeight = getPlayerCarryWeight();
  const carryCapacity = getPlayerCarryCapacity();
  elements.debugCarryStatus.textContent = `目前負重：${formatNumber(carryWeight)} / ${formatNumber(carryCapacity)}`;
  elements.debugCarryStatus.classList.toggle('is-overweight', carryWeight > carryCapacity);
  elements.debugModeToggle.checked = isDebugModeEnabled();
  elements.debugModeSummary.textContent = isDebugModeEnabled()
    ? '已啟用。主畫面會顯示部分原本隱藏的系統資訊，並且這個狀態會一起存檔。'
    : '目前關閉。打開後才會顯示額外的隱藏系統資訊，並且這個狀態會一起存檔。';
  renderDebugItemOptions();
  renderDebugItemSummary();
  renderDebugRecipeOptions();
  renderDebugRecipePanel();
  renderDebugOwnedItems();
  elements.debugLifeInput.value = String(gameState.player.life);
  elements.debugLifeInput.max = String(gameState.player.maxLife);
  elements.debugStaminaInput.value = String(gameState.player.stamina);
  elements.debugStaminaInput.max = String(gameState.player.maxStamina);
  elements.debugContributionInput.value = String(Math.max(0, Math.floor(Number(gameState.player.contribution || 0))));
  renderDebugQuickControlOptions();
  renderDebugFacilityInputs();
  renderDebugFlagBrowser();
}

function formatDebugFlagLabel(flagId) {
  const source = getFlagSource(flagId);
  return source?.description ? `${flagId}：${source.description}` : flagId;
}

function renderDebugQuickControlOptions() {
  renderDebugSelectOptions(
    elements.debugLocationSelect,
    DEBUG_LOCATION_IDS.filter((locationId) => isKnownRuntimeSceneId(locationId)),
    (locationId) => getSceneLocationLabel(locationId) || getLocationLabel(locationId) || locationId
  );
  renderDebugSelectOptions(
    elements.debugVillagerSelect,
    villagers.map((villager) => villager.id),
    (villagerId) => getVillagerName(villagerId)
  );
  renderDebugSelectOptions(
    elements.debugTimeblockSelect,
    TIME_BLOCKS.map((block) => block.id),
    (timeBlockId) => `${timeBlockId} ${formatTime(TIME_BLOCKS.find((block) => block.id === timeBlockId)?.startSecond || 0)}`
  );
}

function renderDebugSelectOptions(select, values, labelGetter) {
  if (!select) {
    return;
  }
  const currentValue = select.value;
  select.replaceChildren(...values.map((value) => {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = labelGetter(value);
    return option;
  }));
  select.value = values.includes(currentValue) ? currentValue : (values[0] || '');
}

function renderDebugFacilityInputs() {
  const fieldState = gameState.facilities?.field || {};
  elements.debugFieldLevelInput.value = String(Number(fieldState.level || getFacilityInitialLevel(getFacility('field'), 1)));
  elements.debugFieldLevelInput.max = String(getFacilityMaxLevel('field'));
  elements.debugFieldProgressInput.value = String(Number(fieldState.progress || 0));
  const storageState = gameState.facilities?.storage_box || {};
  elements.debugStorageLevelInput.value = String(Number(storageState.level || getFacilityInitialLevel(getFacility('storage_box'), 1)));
  elements.debugStorageLevelInput.max = String(getFacilityMaxLevel('storage_box'));
}

function renderDebugFlagBrowser() {
  const query = normalizeSearchText(elements.debugFlagFilterInput?.value || '');
  const sources = flagSources
    .filter((source) => source?.flagId)
    .filter((source) => !query || normalizeSearchText(createDebugFlagSearchText(source)).includes(query))
    .sort((a, b) => a.flagId.localeCompare(b.flagId));
  const acquired = sources.filter((source) => hasDebugFlag(source.flagId));
  const available = sources.filter((source) => !hasDebugFlag(source.flagId));
  const selectedStillVisible = sources.some((source) => source.flagId === debugSelectedFlagId);
  if (!selectedStillVisible) {
    debugSelectedFlagId = acquired[0]?.flagId || available[0]?.flagId || '';
  }
  elements.debugAcquiredFlagList.replaceChildren(...createDebugFlagListRows(acquired, '目前沒有符合條件的已獲取旗標。'));
  elements.debugAvailableFlagList.replaceChildren(...createDebugFlagListRows(available, '目前沒有符合條件的可新增旗標。'));
  renderDebugFlagDetail();
}

function createDebugFlagListRows(sources, emptyLabel) {
  if (!sources.length) {
    return [createTextRow(emptyLabel)];
  }
  return sources.map((source) => createDebugFlagBrowserRow(source));
}

function createDebugFlagSearchText(source) {
  return [
    source.flagId,
    source.description,
    source.sourceType,
    source.sourceId,
    ...(source.unlocks || []),
    source.notes
  ].filter(Boolean).join(' ');
}

function createDebugFlagBrowserRow(source) {
  const flagId = source.flagId;
  const enabled = hasDebugFlag(flagId);
  const row = document.createElement('button');
  row.type = 'button';
  row.className = 'debug-flag-row';
  row.dataset.flagId = flagId;
  row.classList.toggle('is-selected', flagId === debugSelectedFlagId);
  row.addEventListener('click', () => {
    selectDebugFlag(flagId);
  });

  const meta = document.createElement('div');
  meta.className = 'debug-flag-meta';

  const title = document.createElement('div');
  title.className = 'debug-flag-title';
  title.textContent = flagId;

  meta.append(title);
  row.append(meta);
  return row;
}

function selectDebugFlag(flagId) {
  debugSelectedFlagId = flagId;
  for (const row of elements.debugModal.querySelectorAll('.debug-flag-row')) {
    row.classList.toggle('is-selected', row.dataset.flagId === flagId);
  }
  renderDebugFlagDetail();
}

function renderDebugFlagDetail() {
  const source = getFlagSource(debugSelectedFlagId);
  if (!source) {
    elements.debugFlagDetail.replaceChildren(createTextRow('選取左側旗標後查看詳細資訊。'));
    return;
  }
  const enabled = hasDebugFlag(source.flagId);
  const title = document.createElement('div');
  title.className = 'debug-flag-detail-title';
  title.textContent = source.flagId;

  const description = document.createElement('p');
  description.className = 'debug-flag-detail-description';
  description.textContent = source.description || '沒有說明。';

  const meta = document.createElement('div');
  meta.className = 'debug-flag-detail-meta';
  meta.textContent = [
    enabled ? '已獲取' : '未獲取',
    getDebugFlagStorageLabel(source.flagId),
    source.sourceType || '',
    source.sourceId || ''
  ].filter(Boolean).join(' / ');

  const action = document.createElement('button');
  action.type = 'button';
  action.textContent = enabled ? '移除此旗標' : '加入此旗標';
  action.addEventListener('click', () => setDebugFlagState(source.flagId, !enabled));

  elements.debugFlagDetail.replaceChildren(title, description, meta, action);
}

function normalizeSearchText(text) {
  return String(text || '').trim().toLocaleLowerCase();
}

function isDebugDailyFlag(flagId) {
  const source = getFlagSource(flagId);
  return Boolean(source && (
    String(source.sourceId || '').includes('dailyFlags')
    || String(source.description || '').includes('每日旗標')
    || String(source.notes || '').includes('每日旗標')
  ));
}

function getDebugFlagStorageLabel(flagId) {
  return isDebugDailyFlag(flagId) ? '每日旗標' : '進度旗標';
}

function hasDebugFlag(flagId) {
  return isDebugDailyFlag(flagId)
    ? hasPlayerDailyFlag(flagId)
    : gameState.player.flags.includes(flagId);
}

function renderDebugItemOptions() {
  const currentValue = elements.debugItemSelect.value;
  const missingItems = items.filter((item) => getInventoryCount(gameState.player.inventory || [], item.id) <= 0);
  elements.debugItemSelect.replaceChildren(...missingItems.map((item) => {
    const option = document.createElement('option');
    option.value = item.id;
    option.textContent = item.name;
    return option;
  }));

  const hasCurrent = missingItems.some((item) => item.id === currentValue);
  elements.debugItemSelect.value = hasCurrent ? currentValue : (missingItems[0]?.id || '');
}

function renderDebugItemSummary() {
  const itemId = elements.debugItemSelect.value;
  const item = getItem(itemId);
  if (!item) {
    elements.debugItemSummary.textContent = '目前沒有可新增的未持有道具。';
    return;
  }
  elements.debugItemSummary.textContent = `單件重量 ${formatNumber(item.weight)}。新增時仍會檢查目前負重。`;
}

function renderDebugRecipeOptions() {
  const currentValue = elements.debugRecipeSelect.value;
  elements.debugRecipeSelect.replaceChildren(...recipes.map((recipe) => {
    const option = document.createElement('option');
    option.value = recipe.id;
    option.textContent = formatDebugRecipeName(recipe);
    return option;
  }));
  const hasCurrent = recipes.some((recipe) => recipe.id === currentValue);
  elements.debugRecipeSelect.value = hasCurrent ? currentValue : (recipes[0]?.id || '');
}

function renderDebugRecipePanel() {
  const recipe = recipes.find((entry) => entry.id === elements.debugRecipeSelect.value);
  if (!recipe) {
    elements.debugRecipeSummary.textContent = '目前沒有可用配方。';
    elements.debugRecipeList.replaceChildren(createTextRow('目前沒有可顯示的配方道具。'));
    return;
  }

  const resultItem = getItem(recipe.result?.itemId);
  const workstation = facilities.find((facility) => facility.id === recipe.workstationFacilityId);
  elements.debugRecipeSummary.textContent = `成品 ${resultItem?.name || recipe.result?.itemId} x${recipe.result?.count || 1}；工作台：${workstation?.name || recipe.workstationFacilityId || '未指定'}`;

  const rows = [
    createDebugRecipeItemRow({
      itemId: recipe.result?.itemId,
      count: Number(recipe.result?.count || 1),
      kindLabel: '成品'
    }),
    ...(recipe.materials || []).map((material) => createDebugRecipeItemRow({
      itemId: material.itemId,
      count: Number(material.count || 0),
      kindLabel: '材料'
    }))
  ].filter(Boolean);

  elements.debugRecipeList.replaceChildren(...(rows.length ? rows : [createTextRow('這個配方沒有可顯示的道具資料。')]));
}

function createDebugRecipeItemRow({ itemId, count, kindLabel }) {
  if (!itemId || count <= 0) {
    return null;
  }

  const item = getItem(itemId);
  const owned = getInventoryCount(gameState.player.inventory || [], itemId);
  const row = document.createElement('div');
  row.className = 'debug-recipe-row';

  const meta = document.createElement('div');
  meta.className = 'debug-recipe-meta';

  const name = document.createElement('strong');
  name.className = 'debug-recipe-name';
  name.textContent = `${kindLabel}：${item?.name || itemId} x${count}`;

  const note = document.createElement('span');
  note.className = 'debug-recipe-weight';
  note.textContent = `持有 ${owned}　總重量 ${formatNumber(getItemWeight(itemId) * count)}`;

  meta.append(name, note);

  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = '加入背包';
  button.addEventListener('click', () => addDebugItemsToInventory([{ itemId, count }], `${kindLabel}${item?.name || itemId}`));

  row.append(meta, button);
  return row;
}

function formatDebugRecipeName(recipe) {
  const resultItem = getItem(recipe.result?.itemId);
  return `${resultItem?.name || recipe.result?.itemId || recipe.id}`;
}

function renderDebugOwnedItems() {
  const ownedItems = normalizeInventory(gameState.player.inventory || []);
  if (!ownedItems.length) {
    elements.debugOwnedList.replaceChildren(createTextRow('背包目前沒有道具。'));
    return;
  }

  elements.debugOwnedList.replaceChildren(...ownedItems.map((entry) => {
    const item = getItem(entry.itemId);
    const row = document.createElement('div');
    row.className = 'debug-owned-row';

    const label = document.createElement('strong');
    label.className = 'debug-owned-name';
    label.textContent = `${item?.name || entry.itemId} x${entry.count}`;

    const controls = document.createElement('div');
    controls.className = 'debug-owned-controls';

    const minus = document.createElement('button');
    minus.type = 'button';
    minus.className = 'debug-step-button';
    minus.textContent = '-';
    minus.addEventListener('click', () => adjustDebugOwnedItem(entry.itemId, -1));

    const plus = document.createElement('button');
    plus.type = 'button';
    plus.className = 'debug-step-button';
    plus.textContent = '+';
    plus.addEventListener('click', () => adjustDebugOwnedItem(entry.itemId, 1));

    const weight = document.createElement('span');
    weight.className = 'debug-owned-weight';
    weight.textContent = `重量 ${formatNumber((item?.weight || 0) * entry.count)}`;

    controls.append(minus, plus);
    row.append(label, controls, weight);
    return row;
  }));
}

function createInventoryItemButton(item, entry) {
  const button = document.createElement('button');
  button.className = 'inventory-item';
  button.type = 'button';
  button.title = '查看道具說明';
  button.addEventListener('click', () => openItemModal(item, entry));

  const name = document.createElement('strong');
  name.className = 'inventory-item-name';
  name.textContent = `${item?.name || entry.itemId} x ${entry.count}`;

  const weight = document.createElement('span');
  weight.className = 'inventory-item-weight';
  weight.textContent = `總重量 ${formatNumber(getItemWeight(entry.itemId) * entry.count)}`;

  button.append(name, weight);
  return button;
}

function openRecipeModal() {
  renderRecipeBook();
  elements.recipeModal.hidden = false;
  document.body.classList.add('modal-open');
  elements.recipeModalClose.focus();
}

function closeRecipeModal() {
  elements.recipeModal.hidden = true;
  if (elements.itemModal.hidden && elements.debugModal.hidden) {
    document.body.classList.remove('modal-open');
  }
}

function renderRecipeBook() {
  const knownRecipes = getKnownRecipes();
  elements.recipeModalDescription.textContent = knownRecipes.length
    ? '你翻看記下來的做法。'
    : '你還沒有記住任何配方。';
  elements.recipeList.replaceChildren(...(knownRecipes.length
    ? knownRecipes.map(createRecipeBookCard)
    : []));
}

function createRecipeBookCard(recipe) {
  const card = document.createElement('article');
  card.className = 'recipe-card';

  const header = document.createElement('div');
  header.className = 'recipe-card-header';

  const resultItem = getItem(recipe.result?.itemId);
  const title = document.createElement('h3');
  title.className = 'recipe-card-title';
  title.textContent = `${resultItem?.name || recipe.result?.itemId || recipe.name} x${recipe.result?.count || 1}`;

  header.append(title);

  const meta = document.createElement('p');
  meta.className = 'recipe-card-meta';
  meta.textContent = [
    `材料：${formatRecipeMaterials(recipe) || '無'}`,
    `耗時：${formatDuration(Number(recipe.timeCostSeconds || 0))}`,
    `場所：${getRecipeCraftingPlaceLabel(recipe)}`
  ].join('　');

  card.append(header, meta);
  return card;
}

function getRecipeCraftingPlaceLabel(recipe) {
  if (recipe.portableCrafting) {
    return '隨身製作';
  }
  const facility = facilities.find((entry) => entry.id === recipe.workstationFacilityId);
  return facility?.name || recipe.workstationFacilityId || '未知';
}

function createSkillButton(skill) {
  const button = document.createElement('button');
  button.className = 'inventory-item skill-item';
  button.type = 'button';
  button.title = '查看技能介紹';
  button.addEventListener('click', () => openSkillModal(skill));

  const name = document.createElement('strong');
  name.className = 'inventory-item-name';
  name.textContent = skill.name;

  const value = document.createElement('span');
  value.className = 'inventory-item-weight';
  value.textContent = `等級 ${getSkillValue(skill.key)}`;

  button.append(name, value);
  return button;
}

function getSkillValue(skillKey) {
  return Number(gameState.player?.[skillKey] || 0);
}

function adjustDebugInventory(deltaSign) {
  const itemId = elements.debugItemSelect.value;
  const count = Math.max(1, Number(elements.debugItemCount.value || 1));
  const item = getItem(itemId);
  if (!itemId || !item) {
    recordFailedAction({ id: 'debug_inventory', label: '調整背包道具' }, '找不到要調整的道具。');
    return;
  }

  if (deltaSign > 0 && getPlayerCarryDisabledReason(itemId, count)) {
    recordFailedAction({ id: `debug_add_${itemId}`, label: `增加${item.name}` }, getCarryOverLimitMessage());
    return;
  }

  const owned = getInventoryCount(gameState.player.inventory || [], itemId);
  if (deltaSign < 0 && owned < count) {
    recordFailedAction({ id: `debug_remove_${itemId}`, label: `減少${item.name}` }, `背包裡的${item.name}不足，目前 ${owned}。`);
    return;
  }

  runTrackedAction({
    id: `debug_inventory_${itemId}`,
    label: `${deltaSign > 0 ? '增加' : '減少'}${item.name}`,
    timeCostSeconds: 0
  }, () => {
    changeInventoryItem(gameState.player.inventory, itemId, deltaSign * count);
  }, { message: `${deltaSign > 0 ? '已增加' : '已減少'}${item.name} x${count}。` });
  saveGame(gameState.lastActionResult?.message || '已調整背包道具。');
  render();
}

function adjustDebugOwnedItem(itemId, deltaSign) {
  const item = getItem(itemId);
  if (!item) {
    recordFailedAction({ id: 'debug_owned_inventory', label: '調整背包道具' }, '找不到要調整的道具。');
    return;
  }

  if (deltaSign > 0 && getPlayerCarryDisabledReason(itemId, 1)) {
    recordFailedAction({ id: `debug_add_${itemId}`, label: `增加${item.name}` }, getCarryOverLimitMessage());
    return;
  }

  const owned = getInventoryCount(gameState.player.inventory || [], itemId);
  if (deltaSign < 0 && owned < 1) {
    recordFailedAction({ id: `debug_remove_${itemId}`, label: `減少${item.name}` }, `背包裡的${item.name}不足，目前 ${owned}。`);
    return;
  }

  runTrackedAction({
    id: `debug_owned_inventory_${itemId}`,
    label: `${deltaSign > 0 ? '增加' : '減少'}${item.name}`,
    timeCostSeconds: 0
  }, () => {
    changeInventoryItem(gameState.player.inventory, itemId, deltaSign);
  }, { message: `${deltaSign > 0 ? '已增加' : '已減少'}${item.name} x1。` });
  saveGame(gameState.lastActionResult?.message || '已調整背包道具。');
  render();
}

function addDebugItemsToInventory(entries, label) {
  const normalized = (entries || [])
    .filter((entry) => entry?.itemId && Number(entry.count || 0) > 0)
    .map((entry) => ({ itemId: entry.itemId, count: Number(entry.count || 0), item: getItem(entry.itemId) }));

  if (!normalized.length) {
    recordFailedAction({ id: 'debug_recipe_items', label: '增加配方道具' }, '找不到可加入背包的道具。');
    return;
  }

  const nextInventory = cloneInventory(gameState.player.inventory || []);
  for (const entry of normalized) {
    changeInventoryItem(nextInventory, entry.itemId, entry.count);
  }
  if (getInventoryWeight(nextInventory) > getPlayerCarryCapacity()) {
    recordFailedAction({ id: 'debug_recipe_items', label: label || '增加配方道具' }, getCarryOverLimitMessage());
    return;
  }

  runTrackedAction({
    id: `debug_recipe_items_${normalized.map((entry) => entry.itemId).join('_')}`,
    label: label || '增加配方道具',
    timeCostSeconds: 0
  }, () => {
    for (const entry of normalized) {
      changeInventoryItem(gameState.player.inventory, entry.itemId, entry.count);
    }
  }, { message: `已加入背包：${normalized.map((entry) => `${entry.item?.name || entry.itemId} x${entry.count}`).join('、')}。` });
  saveGame(gameState.lastActionResult?.message || '已加入配方道具。');
  render();
}

function applyDebugStat(key) {
  const statConfigs = {
    life: {
      input: elements.debugLifeInput,
      max: gameState.player.maxLife,
      label: '生命'
    },
    stamina: {
      input: elements.debugStaminaInput,
      max: gameState.player.maxStamina,
      label: '體力'
    },
    contribution: {
      input: elements.debugContributionInput,
      max: Number.POSITIVE_INFINITY,
      label: '貢獻'
    }
  };
  const config = statConfigs[key];
  if (!config) {
    return;
  }
  const input = config.input;
  const max = config.max;
  const label = config.label;
  const nextValue = Math.floor(clampNumber(Number(input.value), 0, max));

  runTrackedAction({
    id: `debug_${key}`,
    label: `調整${label}`,
    timeCostSeconds: 0
  }, () => {
    gameState.player[key] = nextValue;
  }, { message: `已把${label}調整為 ${nextValue}。` });
  saveGame(gameState.lastActionResult?.message || `已調整${label}。`);
  render();
}

function resetDebugTransientSceneState() {
  gameState.events.active = null;
  gameState.pendingEncounterReport = null;
  tradeDraft = null;
  droppedItemsDraft = null;
  containerDraft = null;
  forageLootDraft = null;
  pendingActionFlow = null;
}

function jumpDebugLocation() {
  const locationId = elements.debugLocationSelect.value;
  if (!isKnownRuntimeSceneId(locationId)) {
    recordFailedAction({ id: 'debug_jump_location', label: 'Debug 跳轉地點' }, '找不到指定地點。');
    return;
  }

  runTrackedAction({
    id: `debug_jump_location_${locationId}`,
    label: 'Debug 跳轉地點',
    timeCostSeconds: 0
  }, () => {
    resetDebugTransientSceneState();
    gameState.currentSceneId = locationId;
  }, { message: `已跳到${getSceneLocationLabel(locationId) || getLocationLabel(locationId) || locationId}。` });
  saveGame(gameState.lastActionResult?.message || '已跳轉地點。');
  render();
}

function openDebugVillager() {
  const villagerId = elements.debugVillagerSelect.value;
  openDebugVillagerScene(villagerId, false);
}

function openDebugVillagerMenu() {
  const villagerId = elements.debugVillagerSelect.value;
  openDebugVillagerScene(villagerId, true);
}

function openDebugVillagerScene(villagerId, bypassTriggeredEvents = false) {
  const villager = villagers.find((entry) => entry.id === villagerId);
  if (!villager) {
    recordFailedAction({ id: 'debug_open_villager', label: 'Debug 開啟角色互動' }, '找不到指定角色。');
    return;
  }

  const returnSceneId = getVillagerLocationId(villager) || FALLBACK_SCENE_ID;
  runTrackedAction({
    id: `debug_open_villager_${bypassTriggeredEvents ? 'menu_' : ''}${villagerId}`,
    label: bypassTriggeredEvents ? 'Debug 直接開啟角色選單' : 'Debug 開啟角色互動',
    timeCostSeconds: 0
  }, () => {
    resetDebugTransientSceneState();
    debugBypassNextTriggeredEvent = Boolean(bypassTriggeredEvents);
    gameState.currentSceneId = `dialogue:${villagerId}:${returnSceneId}`;
  }, { message: bypassTriggeredEvents
    ? `已直接開啟${villager.name || villagerId}選單，略過本次初始互動事件檢查。`
    : `已開啟${villager.name || villagerId}互動。` });
  saveGame(gameState.lastActionResult?.message || (bypassTriggeredEvents ? '已直接開啟角色選單。' : '已開啟角色互動。'));
  closeDebugModal();
  render();
}

function setDebugTimeBlock() {
  const timeBlockId = elements.debugTimeblockSelect.value;
  const block = TIME_BLOCKS.find((entry) => entry.id === timeBlockId);
  if (!block) {
    recordFailedAction({ id: 'debug_set_timeblock', label: 'Debug 調整時段' }, '找不到指定時段。');
    return;
  }

  runTrackedAction({
    id: `debug_set_timeblock_${timeBlockId}`,
    label: 'Debug 調整時段',
    timeCostSeconds: 0
  }, () => {
    gameState.time.secondsOfDay = block.startSecond;
  }, { message: `已把時間調整到${block.id} ${formatTime(block.startSecond)}。` });
  saveGame(gameState.lastActionResult?.message || '已調整時段。');
  render();
}

function applyDebugAidaDinnerPreset() {
  const activity = getDinnerActivity();
  const hostVillagerId = activity?.hostVillagerId || 'aida';
  const host = villagers.find((entry) => entry.id === hostVillagerId);
  if (!host) {
    recordFailedAction({ id: 'debug_preset_aida_dinner', label: '艾妲晚餐測試' }, '找不到艾妲資料。');
    return;
  }

  const returnSceneId = getVillagerLocationId(host) || FALLBACK_SCENE_ID;
  const eveningBlock = TIME_BLOCKS.find((entry) => entry.id === '傍晚');
  const dinnerDailyFlag = activity?.entry?.dailyLimitFlag || '';
  const foodEntries = [
    { itemId: 'apple', count: 2 },
    { itemId: 'lettuce', count: 1 },
    { itemId: 'dry_ration', count: 1 }
  ];

  runTrackedAction({
    id: 'debug_preset_aida_dinner',
    label: '艾妲晚餐測試',
    timeCostSeconds: 0
  }, () => {
    resetDebugTransientSceneState();
    gameState.player.name = gameState.player.name || DEFAULT_PROTAGONIST_NAME;
    ensurePlayerFlag('opening_recovery_intro_seen');
    ensurePlayerFlag('aida_first_village_briefing_seen');
    if (dinnerDailyFlag) {
      gameState.player.dailyFlags = (gameState.player.dailyFlags || []).filter((flag) => flag !== dinnerDailyFlag);
    }
    if (eveningBlock) {
      gameState.time.secondsOfDay = eveningBlock.startSecond;
    }
    ensureInventoryCounts(foodEntries);
    debugBypassNextTriggeredEvent = true;
    gameState.currentSceneId = `dialogue:${hostVillagerId}:${returnSceneId}`;
  }, { message: '已套用艾妲晚餐測試：主角名、初期旗標、傍晚時段與測試食材都已準備，並直接開啟艾妲選單。' });
  saveGame(gameState.lastActionResult?.message || '已套用艾妲晚餐測試。');
  closeDebugModal();
  render();
}

function ensurePlayerFlag(flagId) {
  if (!flagId) {
    return;
  }
  if (!Array.isArray(gameState.player.flags)) {
    gameState.player.flags = [];
  }
  if (!gameState.player.flags.includes(flagId)) {
    gameState.player.flags.push(flagId);
  }
}

function ensureInventoryCounts(entries = []) {
  for (const entry of entries) {
    const itemId = entry?.itemId;
    const count = Math.max(0, Number(entry?.count || 0));
    if (!itemId || count <= 0 || !getItem(itemId)) {
      continue;
    }
    const owned = getInventoryCount(gameState.player.inventory || [], itemId);
    if (owned < count) {
      changeInventoryItem(gameState.player.inventory, itemId, count - owned);
    }
  }
  gameState.player.inventory = normalizeInventory(gameState.player.inventory || []);
}

function applyDebugFieldState() {
  const facility = getFacility('field');
  if (!facility) {
    recordFailedAction({ id: 'debug_apply_field', label: 'Debug 調整田地' }, '找不到田地設施資料。');
    return;
  }

  const maxLevel = getFacilityMaxLevel('field');
  const level = clampNumber(Number(elements.debugFieldLevelInput.value || 1), getFacilityInitialLevel(facility, 1), maxLevel);
  const maxProgress = Number(facility.progress?.max ?? 100);
  const progress = clampNumber(Number(elements.debugFieldProgressInput.value || 0), 0, maxProgress);
  runTrackedAction({
    id: 'debug_apply_field',
    label: 'Debug 調整田地',
    timeCostSeconds: 0
  }, () => {
    gameState.facilities.field = {
      ...createUpgradeableFacilityState(facility, { level, progress }),
      level,
      progress
    };
  }, { message: `已調整田地為等級 ${level}、進度 ${progress}%。` });
  saveGame(gameState.lastActionResult?.message || '已調整田地。');
  render();
}

function applyDebugStorageState() {
  const facility = getFacility('storage_box');
  if (!facility) {
    recordFailedAction({ id: 'debug_apply_storage_box', label: 'Debug 調整倉庫箱' }, '找不到倉庫箱設施資料。');
    return;
  }

  const current = gameState.facilities.storage_box || {};
  const level = clampNumber(
    Number(elements.debugStorageLevelInput.value || 1),
    getFacilityInitialLevel(facility, 1),
    getFacilityMaxLevel('storage_box')
  );
  const capacityWeight = getFacilityContainerCapacity(facility, { ...current, level });
  runTrackedAction({
    id: 'debug_apply_storage_box',
    label: 'Debug 調整倉庫箱',
    timeCostSeconds: 0
  }, () => {
    gameState.facilities.storage_box = {
      ...current,
      level,
      capacityWeight,
      items: normalizeInventory(current.items || [])
    };
  }, { message: `已調整倉庫箱為等級 ${level}、容量 ${formatNumber(capacityWeight)}。` });
  saveGame(gameState.lastActionResult?.message || '已調整倉庫箱。');
  render();
}

function setFlag(flagId, enabled) {
  setDebugFlagState(flagId, enabled);
}

function setDebugFlagState(flagId, enabled) {
  if (!flagId) {
    recordFailedAction({ id: 'debug_set_flag', label: 'Debug 調整旗標' }, '找不到指定旗標。');
    return;
  }
  if (enabled && hasDebugFlag(flagId)) {
    recordFailedAction({ id: `debug_add_flag_${flagId}`, label: '新增旗標' }, '這個旗標已經存在。');
    return;
  }
  if (!enabled) {
    removeFlag(flagId);
    return;
  }

  runTrackedAction({
    id: `debug_add_flag_${flagId}`,
    label: '新增旗標',
    timeCostSeconds: 0
  }, () => {
    if (isDebugDailyFlag(flagId)) {
      addPlayerDailyFlag(flagId);
    } else {
      ensurePlayerFlag(flagId);
    }
  }, { message: `已新增旗標 ${flagId}。` });
  saveGame(gameState.lastActionResult?.message || '已新增旗標。');
  debugSelectedFlagId = flagId;
  render();
}

function removeFlag(flagId) {
  if (!hasDebugFlag(flagId)) {
    recordFailedAction({ id: `debug_remove_flag_${flagId}`, label: '刪除旗標' }, '找不到指定旗標。');
    return;
  }

  const isDailyFlag = isDebugDailyFlag(flagId);
  const relatedEventIds = isDailyFlag ? [] : getEventIdsRecordedByFlag(flagId);
  runTrackedAction({
    id: `debug_remove_flag_${flagId}`,
    label: '刪除旗標',
    timeCostSeconds: 0
  }, () => {
    if (isDailyFlag) {
      gameState.player.dailyFlags = (gameState.player.dailyFlags || []).filter((entry) => entry !== flagId);
    } else {
      gameState.player.flags = gameState.player.flags.filter((entry) => entry !== flagId);
    }
    if (relatedEventIds.length) {
      gameState.events.completedEventIds = gameState.events.completedEventIds
        .filter((eventId) => !relatedEventIds.includes(eventId));
    }
  }, { message: `已刪除旗標 ${flagId}。` });
  if (relatedEventIds.length && gameState.lastActionResult) {
    gameState.lastActionResult.message = `已刪除旗標 ${flagId}，並解除相關事件完成紀錄。`;
  }
  saveGame(gameState.lastActionResult?.message || '已刪除旗標。');
  debugSelectedFlagId = flagId;
  render();
}

function getEventIdsRecordedByFlag(flagId) {
  const source = getFlagSource(flagId);
  const eventIds = new Set();
  if (source?.sourceType === 'event' && getEventById(source.sourceId)) {
    eventIds.add(source.sourceId);
  }

  for (const event of events) {
    const writesFlag = (event.pages || []).some((page) =>
      (page.effects?.flags || []).includes(flagId)
    );
    if (writesFlag) {
      eventIds.add(event.id);
    }
  }

  return [...eventIds].filter((eventId) => gameState.events.completedEventIds.includes(eventId));
}

function openItemModal(item, entry) {
  if (!item) {
    return;
  }

  elements.itemModalKicker.textContent = [formatItemCategory(item.category), `持有 ${entry.count}`].filter(Boolean).join(' / ');
  elements.itemModalTitle.textContent = item.name || item.id;
  elements.itemModalDescription.classList.remove('is-memory-recall');
  elements.itemModalDescription.textContent = item.description || '沒有道具說明。';
  elements.itemModalStats.replaceChildren(...createItemStatRows(item, entry));
  elements.itemModal.hidden = false;
  document.body.classList.add('modal-open');
  elements.itemModalClose.focus();
}

function openSkillModal(skill) {
  if (!skill) {
    return;
  }

  elements.itemModalKicker.textContent = `技能 / 等級 ${getSkillValue(skill.key)}`;
  elements.itemModalTitle.textContent = skill.name;
  elements.itemModalDescription.classList.remove('is-memory-recall');
  elements.itemModalDescription.textContent = skill.description || '沒有技能說明。';
  elements.itemModalStats.replaceChildren(...createSkillStatRows(skill));
  elements.itemModal.hidden = false;
  document.body.classList.add('modal-open');
  elements.itemModalClose.focus();
}

function openSelaIntelModal(enemyId) {
  const enemy = enemies.find((entry) => entry.id === enemyId);
  if (!enemy) {
    return;
  }

  elements.itemModalKicker.textContent = '';
  elements.itemModalTitle.textContent = enemy.name || enemy.id;
  renderSelaIntelRecallDescription(enemy);
  elements.itemModalStats.replaceChildren();
  elements.itemModal.hidden = false;
  document.body.classList.add('modal-open');
  elements.itemModalClose.focus();
}

function renderSelaIntelRecallDescription(enemy) {
  const enemyName = enemy?.name || '那東西';
  const memoryText = createSelaEnemyWeaknessText(enemy);
  const memoryElement = document.createElement('em');
  memoryElement.textContent = memoryText;
  elements.itemModalDescription.classList.add('is-memory-recall');
  elements.itemModalDescription.replaceChildren(
    document.createTextNode(`你記得賽拉曾提及${enemyName}：`),
    memoryElement
  );
}

function closeItemModal() {
  elements.itemModal.hidden = true;
  if (elements.debugModal.hidden && elements.recipeModal.hidden) {
    document.body.classList.remove('modal-open');
  }
}

function openDebugModal() {
  renderDebugTools();
  elements.debugModal.hidden = false;
  document.body.classList.add('modal-open');
  elements.debugModalClose.focus();
}

function closeDebugModal() {
  elements.debugModal.hidden = true;
  if (elements.itemModal.hidden && elements.recipeModal.hidden) {
    document.body.classList.remove('modal-open');
  }
}

function createItemStatRows(item, entry) {
  const rows = [
    ['持有數量', entry.count],
    ['重量', formatNumber(item.weight)]
  ];

  if (item.timeCostSeconds) {
    rows.push(['使用耗時', formatDuration(item.timeCostSeconds)]);
  }
  const effectText = formatEffects(item.effects);
  if (effectText) {
    rows.push(['效果', effectText]);
  }
  if (item.price?.sellable) {
    rows.push(['售價', `${item.price.amount} ${getItem(item.price.currencyItemId)?.name || item.price.currencyItemId}`]);
  }
  if (item.tags?.length) {
    rows.push(['標籤', item.tags.join('、')]);
  }
  if (isDebugModeEnabled()) {
    rows.push(['Debug / itemId', item.id]);
    if (item.source?.length) {
      rows.push(['Debug / source', item.source.join('、')]);
    }
  }

  return rows.map(([label, value]) => createDescriptionRow(label, value));
}

function createSkillStatRows(skill) {
  const rows = [
    ['目前等級', getSkillValue(skill.key)]
  ];

  for (const [label, value] of skill.detailRows || []) {
    rows.push([label, value]);
  }
  if (isDebugModeEnabled()) {
    rows.push(['Debug / key', skill.key]);
  }

  return rows.map(([label, value]) => createDescriptionRow(label, value));
}

function summarizeDebugFacilityState(state) {
  if (!state || typeof state !== 'object') {
    return 'none';
  }
  const parts = [];
  if (Array.isArray(state.items)) {
    parts.push(`items=${formatInventory(state.items) || 'none'}`);
  }
  if (state.perLocationStates && typeof state.perLocationStates === 'object') {
    parts.push(`perLocation=${Object.keys(state.perLocationStates).join(',') || 'none'}`);
  }
  if (typeof state.level === 'number') {
    parts.push(`level=${state.level}`);
  }
  if (typeof state.unlocked === 'boolean') {
    parts.push(`unlocked=${state.unlocked}`);
  }
  if (typeof state.lastRestockDay === 'number') {
    parts.push(`lastRestockDay=${state.lastRestockDay}`);
  }
  return parts.join(' / ') || 'state object';
}

function toggleDebugMode(enabled) {
  runTrackedAction({
    id: 'debug_mode_toggle',
    label: enabled ? '打開 Debug 模式' : '關閉 Debug 模式',
    timeCostSeconds: 0
  }, () => {
    gameState.debug = {
      ...(gameState.debug || {}),
      enabled: Boolean(enabled)
    };
  }, { message: enabled ? '已打開 Debug 模式。' : '已關閉 Debug 模式。' });
  saveGame(gameState.lastActionResult?.message || '已切換 Debug 模式。');
  render();
}

function createDescriptionRow(labelText, valueText) {
  const row = document.createElement('div');
  const label = document.createElement('dt');
  const value = document.createElement('dd');
  label.textContent = labelText;
  value.textContent = valueText;
  row.append(label, value);
  return row;
}

function formatItemCategory(category) {
  const labels = {
    consumable: '消耗品',
    material: '材料',
    resource: '資源',
    key_material: '關鍵材料',
    quest_item: '委託道具',
    clue: '線索',
    currency: '貨幣',
    equipment: '裝備',
    ammo: '彈藥'
  };
  return labels[category] || category || '';
}

function formatEffects(effects = {}) {
  const parts = [];
  if (typeof effects.life === 'number') parts.push(`生命 ${formatSignedNumber(effects.life)}`);
  if (typeof effects.stamina === 'number') parts.push(`體力 ${formatSignedNumber(effects.stamina)}`);
  if (effects.life === 'full') parts.push('生命全恢復');
  if (effects.stamina === 'full') parts.push('體力全恢復');
  if (typeof effects.lifePercentOfMax === 'number' && Number.isFinite(effects.lifePercentOfMax)) {
    parts.push(`生命恢復最大值的 ${formatPercent(effects.lifePercentOfMax)}`);
  }
  if (typeof effects.staminaPercentOfMax === 'number' && Number.isFinite(effects.staminaPercentOfMax)) {
    parts.push(`體力恢復最大值的 ${formatPercent(effects.staminaPercentOfMax)}`);
  }
  for (const [itemId, count] of Object.entries(effects.items || {})) {
    parts.push(`${getItem(itemId)?.name || itemId} ${formatSignedNumber(count)}`);
  }
  return parts.join('、');
}

function formatPercent(value) {
  return `${formatNumber(value * 100)}%`;
}

function formatSignedNumber(value) {
  return `${value >= 0 ? '+' : ''}${value}`;
}

function formatNumber(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) {
    return '無';
  }
  return String(Math.round((number + Number.EPSILON) * 100) / 100);
}

function formatProgressPercent(value, max = 100) {
  const capped = clampNumber(Number(value || 0), 0, Number(max || 100));
  return String(Math.floor(capped));
}

function createTextRow(text) {
  const row = document.createElement('div');
  row.textContent = text;
  return row;
}

function exportSave() {
  const saveText = JSON.stringify(gameState, null, 2);
  const blob = new Blob([saveText], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `valleyembers-save-day-${gameState.time.day}.json`;
  link.click();
  URL.revokeObjectURL(url);
  elements.saveNote.textContent = '已匯出目前記錄檔。';
}

async function importSave(file) {
  if (!file) {
    return;
  }

  try {
    gameState = normalizeImportedState(JSON.parse(await file.text()));
    saveGame('已匯入記錄檔並寫入本機存檔。', true);
    render();
  } catch (error) {
    elements.saveNote.textContent = error.message || '匯入失敗，請確認檔案是有效的 JSON 存檔。';
  } finally {
    elements.importSaveInput.value = '';
  }
}

async function loadJson(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`無法載入 ${path}`);
  }
  return response.json();
}

function createDinnerRuntimeEvents() {
  const activity = getDinnerActivity();
  if (!activity) {
    return [];
  }
  const preparationEvents = (activity.preparationEvents || []).map((entry) => ({
    id: entry.id,
    title: entry.title || activity.name || '黃昏晚餐',
    repeatable: true,
    pages: [
      {
        id: 'start',
        title: entry.title || activity.name || '黃昏晚餐',
        text: entry.pages?.[0] || ''
      },
      {
        id: 'finish',
        title: entry.title || activity.name || '黃昏晚餐',
        text: entry.pages?.[1] || '',
        timeCostSeconds: getDinnerStageTimeCost('preparation'),
        resultMessage: '晚餐準備好了。',
        choices: [
          {
            id: 'start_meal',
            label: '一起享用晚餐',
            targetEventId: DINNER_SELECTED_MEAL_EVENT_TARGET,
            transition: 'fade'
          }
        ]
      }
    ]
  }));
  const mealEvents = Object.entries(activity.mealEvents || {}).flatMap(([tierId, entries]) => {
    const tier = (activity.scoring?.resultTiers || []).find((entry) => entry.id === tierId);
    return (entries || []).map((entry) => ({
      id: entry.id,
      title: entry.title || tier?.label || activity.name || '黃昏晚餐',
      repeatable: true,
      pages: [
        {
          id: 'start',
          title: entry.title || tier?.label || activity.name || '黃昏晚餐',
          text: entry.pages?.[0] || ''
        },
        {
          id: 'finish',
          title: entry.title || tier?.label || activity.name || '黃昏晚餐',
          text: entry.pages?.[1] || '',
          timeCostSeconds: getDinnerStageTimeCost('meal'),
          effects: createDinnerMealEffects(tier),
          resultMessage: `${activity.name || '晚餐'}結束了。`,
          finishTransition: 'fade'
        }
      ]
    }));
  });
  return [...preparationEvents, ...mealEvents];
}

function getDinnerStageTimeCost(stageId) {
  const stage = (getDinnerActivity()?.flow?.stages || []).find((entry) => entry.id === stageId);
  return Number(stage?.timeCostSeconds || 0);
}

function createDinnerMealEffects(tier = {}) {
  const affectionDelta = Number(tier?.allCoreVillagerAffectionDelta || 0);
  const villagerAffection = {};
  for (const villager of villagers.filter(isCoreVillager)) {
    villagerAffection[villager.id] = affectionDelta;
  }
  const dailyFlag = getDinnerActivity()?.entry?.dailyLimitFlag || '';
  return {
    villagerAffection,
    dailyFlags: dailyFlag ? [dailyFlag] : [],
    contributionPerDinnerScore: 5
  };
}

async function boot() {
  [scenes, villagers, items, enemies, recipes, commands, locations, dialogues, quests, events, facilities, flagSources, npcInteractionRules, elaineKnowledge, selaKnowledge, saveTemplate, forageLootConfig, resourceNodeSpawnConfig, villageDinnerActivity] = await Promise.all([
    loadJson('./data/scenes/scenes.json'),
    loadJson('./data/villagers/villagers.json'),
    loadJson('./data/items/items.json'),
    loadJson('./data/enemies/enemies.json'),
    loadJson('./data/recipes/recipes.json'),
    loadJson('./data/commands/commands.json'),
    loadJson('./data/locations/locations.json'),
    loadJson('./data/dialogues/dialogues.json'),
    loadJson('./data/quests/quests.json'),
    loadJson('./data/events/events.json'),
    loadJson('./data/facilities/facilities.json'),
    loadJson('./data/flags/flag-sources.json'),
    loadJson('./data/npc-interactions/npc-interaction-rules.json'),
    loadJson('./data/knowledge/elaine-knowledge.json'),
    loadJson('./data/knowledge/sela-knowledge.json'),
    loadJson('./data/save/save-template.json'),
    loadJson('./data/exploration/forage-loot.json'),
    loadJson('./data/exploration/resource-node-spawns.json'),
    loadJson('./data/village-activities/dinner.json')
  ]);

  events = [...events, ...createDinnerRuntimeEvents()];

  clearLegacyCookieSave();
  gameState = loadPersistentSave() || createInitialState();
  hasUnsavedChanges = false;
  syncGameVersions();
  elements.saveNote.textContent = readPersistentSave() ? '已載入本機存檔。' : '目前尚未存檔。';
  render();
}

function getItem(itemId) {
  return items.find((candidate) => candidate.id === itemId);
}

function getFacility(facilityId) {
  return facilities.find((candidate) => candidate.id === facilityId);
}

function getLocationLabel(locationId) {
  if (locationId === HIDDEN_CAVE_SCENE_ID) {
    return '隱藏的洞穴';
  }
  if (locationId === ABANDONED_CABIN_SCENE_ID) {
    return '廢棄小屋';
  }
  return locations.find((location) => location.id === locationId)?.name || locationId || '';
}

function getResolvedPlayerPosition(sceneId) {
  if (!sceneId) {
    return { id: '', name: '' };
  }
  if (locations.some((location) => location.id === sceneId)) {
    return { id: sceneId, name: getLocationLabel(sceneId) };
  }
  if (sceneId === EXPLORATION_SCENE_ID) {
    return { id: sceneId, name: getSceneLocationLabel(sceneId) };
  }
  if (sceneId === ABANDONED_CABIN_SCENE_ID) {
    return { id: sceneId, name: '廢棄小屋' };
  }
  if (sceneId === HIDDEN_CAVE_SCENE_ID) {
    return { id: sceneId, name: '隱藏的洞穴' };
  }
  if (sceneId === NAME_PROTAGONIST_SCENE_ID) {
    return { id: FALLBACK_SCENE_ID, name: getSceneLocationLabel(FALLBACK_SCENE_ID) };
  }
  if (sceneId.startsWith('event:')) {
    const returnSceneId = gameState.events?.active?.returnSceneId || FALLBACK_SCENE_ID;
    return { id: returnSceneId, name: getSceneLocationLabel(returnSceneId) };
  }
  if (sceneId.startsWith('dialogue:')) {
      return { id: sceneId.split(':')[2] || FALLBACK_SCENE_ID, name: getSceneLocationLabel(sceneId.split(':')[2] || FALLBACK_SCENE_ID) };
    }
  if (sceneId.startsWith('aidaTraining:')) {
    const returnSceneId = sceneId.split(':')[1] || FALLBACK_SCENE_ID;
    return { id: returnSceneId, name: getSceneLocationLabel(returnSceneId) };
  }
  if (sceneId.startsWith('locationInquiry:')) {
    const returnSceneId = sceneId.split(':')[2] || FALLBACK_SCENE_ID;
    return { id: returnSceneId, name: getSceneLocationLabel(returnSceneId) };
  }
  if (sceneId.startsWith('dinner:')) {
    const returnSceneId = sceneId.split(':')[2] || FALLBACK_SCENE_ID;
    return { id: returnSceneId, name: getSceneLocationLabel(returnSceneId) };
  }
      if (sceneId.startsWith('sleepMenu:') || sceneId.startsWith('sleep:')) {
    const returnSceneId = sceneId.split(':')[1] || FALLBACK_SCENE_ID;
    return { id: returnSceneId, name: getSceneLocationLabel(returnSceneId) };
  }
      if (sceneId.startsWith('facility:') || sceneId.startsWith('trade:') || sceneId.startsWith('storage:') || sceneId.startsWith('forageLoot:') || sceneId.startsWith('battleLoot:') || sceneId.startsWith('useItem:') || sceneId.startsWith('craftItem:')
        || sceneId.startsWith('quest:') || sceneId.startsWith('questOffer:') || sceneId.startsWith('questSubmit:')
        || sceneId.startsWith('knowledge:') || sceneId.startsWith('knowledgeCategory:') || sceneId.startsWith('knowledgeItem:') || sceneId.startsWith('knowledgeTopic:') || sceneId.startsWith('knowledgeEnemy:')
        || sceneId.startsWith('wait:') || sceneId.startsWith('discard:') || sceneId.startsWith('gift:')) {
    const parts = sceneId.split(':');
    const returnSceneId = parts[parts.length - 1] || FALLBACK_SCENE_ID;
    return { id: returnSceneId, name: getSceneLocationLabel(returnSceneId) };
  }
  if (sceneId.startsWith('encounter:')) {
    const returnSceneId = sceneId.split(':')[2] || EXPLORATION_SCENE_ID;
    return { id: returnSceneId, name: getSceneLocationLabel(returnSceneId) };
  }
  if (sceneId === ENCOUNTER_REPORT_SCENE_ID) {
    const returnSceneId = gameState.pendingEncounterReport?.returnSceneId || EXPLORATION_SCENE_ID;
    return { id: returnSceneId, name: getSceneLocationLabel(returnSceneId) };
  }
  return { id: sceneId, name: getSceneLocationLabel(sceneId) };
}

function getSceneLocationLabel(sceneId) {
  const location = locations.find((entry) => entry.id === sceneId);
  if (location) {
    return location.name;
  }
  if (sceneId === ABANDONED_CABIN_SCENE_ID) {
    return '廢棄小屋';
  }
  if (sceneId === HIDDEN_CAVE_SCENE_ID) {
    return '隱藏的洞穴';
  }
  return scenes.find((scene) => scene.id === sceneId)?.location || sceneId || '';
}

function formatSceneBreadcrumb(scene) {
  const segments = createSceneBreadcrumb(scene)
    .map((segment) => String(segment || '').trim())
    .filter(Boolean);
  return segments.filter((segment, index) => segment !== segments[index - 1]).join(' > ');
}

function createSceneBreadcrumb(scene) {
  const sceneId = scene?.id || gameState?.currentSceneId || '';
  if (!sceneId) {
    return [scene?.location || ''];
  }

  if (locations.some((location) => location.id === sceneId)) {
    return createLocationBreadcrumb(sceneId, scene);
  }

  if (sceneId === NAME_PROTAGONIST_SCENE_ID) {
    return [...createLocationBreadcrumb(FALLBACK_SCENE_ID), '說出名字'];
  }

  if (sceneId.startsWith('event:')) {
    const [, eventId] = sceneId.split(':');
    return [...createLocationBreadcrumb(getResolvedPlayerPosition(gameState.events?.active?.returnSceneId || FALLBACK_SCENE_ID).id), getEventById(eventId)?.title || '事件'];
  }

  if (sceneId.startsWith('dialogue:')) {
    const [, villagerId, returnSceneId] = sceneId.split(':');
    return [...createLocationBreadcrumb(returnSceneId), getVillagerName(villagerId)];
  }

  if (sceneId.startsWith('aidaTraining:')) {
    const [, returnSceneId] = sceneId.split(':');
    return [...createLocationBreadcrumb(returnSceneId), getVillagerName('aida'), '安排訓練'];
  }

  if (sceneId.startsWith('locationInquiry:')) {
    const [, villagerId, returnSceneId] = sceneId.split(':');
    return [...createLocationBreadcrumb(returnSceneId), getVillagerName(villagerId), '詢問位置'];
  }

  if (sceneId.startsWith('dinner:')) {
    const [, activityId, returnSceneId] = sceneId.split(':');
    return [...createLocationBreadcrumb(returnSceneId), getDinnerActivityName(activityId)];
  }

  if (sceneId.startsWith('trade:')) {
    const [, villagerId, returnSceneId] = sceneId.split(':');
    return [...createLocationBreadcrumb(returnSceneId), getVillagerName(villagerId), '交易'];
  }

  if (sceneId.startsWith('gift:')) {
    const [, villagerId, returnSceneId] = sceneId.split(':');
    return [...createLocationBreadcrumb(returnSceneId), getVillagerName(villagerId), '送禮'];
  }

  if (sceneId.startsWith('quest:') || sceneId.startsWith('questOffer:') || sceneId.startsWith('questSubmit:')) {
    const parts = sceneId.split(':');
    const villagerId = parts[1];
    const returnSceneId = parts[sceneId.startsWith('quest:') ? 2 : 3];
    const questLabel = sceneId.startsWith('questOffer:') || sceneId.startsWith('questSubmit:')
      ? (quests.find((quest) => quest.id === parts[2])?.title || '委託')
      : '委託';
    return [...createLocationBreadcrumb(returnSceneId), getVillagerName(villagerId), questLabel];
  }

  if (sceneId.startsWith('knowledge:') || sceneId.startsWith('knowledgeCategory:') || sceneId.startsWith('knowledgeItem:') || sceneId.startsWith('knowledgeTopic:') || sceneId.startsWith('knowledgeEnemy:')) {
    const parts = sceneId.split(':');
    const villagerId = parts[1];
    const returnSceneId = parts[parts.length - 1] || FALLBACK_SCENE_ID;
    return [...createLocationBreadcrumb(returnSceneId), getVillagerName(villagerId), '尋求知識'];
  }

  if (sceneId.startsWith('facility:')) {
    const [, facilityId, returnSceneId] = sceneId.split(':');
    return [...createLocationBreadcrumb(returnSceneId), getFacilityDisplayName(facilityId, returnSceneId)];
  }

  if (sceneId.startsWith('storage:')) {
    const parts = sceneId.split(':');
    const facilityId = parts.length > 3 ? parts[2] : parts[1];
    const returnSceneId = parts.length > 3 ? parts[3] : parts[2];
    return [...createLocationBreadcrumb(returnSceneId), getFacilityDisplayName(facilityId, returnSceneId)];
  }

  if (sceneId.startsWith('forageLoot:')) {
    const returnSceneId = sceneId.split(':')[1] || EXPLORATION_SCENE_ID;
    return [...createLocationBreadcrumb(returnSceneId), '搜尋到的物資'];
  }

  if (sceneId.startsWith('battleLoot:')) {
    const returnSceneId = sceneId.split(':')[1] || EXPLORATION_SCENE_ID;
    return [...createLocationBreadcrumb(returnSceneId), '蒐集戰利品'];
  }

  if (sceneId.startsWith('sleepMenu:') || sceneId.startsWith('sleep:')) {
    const [, returnSceneId, facilityId] = sceneId.split(':');
    return [...createLocationBreadcrumb(returnSceneId), getFacilityDisplayName(facilityId || 'protagonist_bed', returnSceneId), '睡覺'];
  }

  if (sceneId.startsWith('useItem:')) {
    return [...createLocationBreadcrumb(sceneId.split(':')[1]), '道具'];
  }

  if (sceneId.startsWith('craftItem:')) {
    return [...createLocationBreadcrumb(sceneId.split(':')[1]), '道具', '製作'];
  }

  if (sceneId.startsWith('discard:')) {
    return [...createLocationBreadcrumb(sceneId.split(':')[1]), '道具', '丟棄'];
  }

  if (sceneId.startsWith('wait:')) {
    return [...createLocationBreadcrumb(sceneId.split(':')[1]), '等待'];
  }

  if (sceneId.startsWith('encounter:')) {
    return [...createLocationBreadcrumb(sceneId.split(':')[2] || EXPLORATION_SCENE_ID), '遭遇'];
  }

  if (sceneId === ENCOUNTER_REPORT_SCENE_ID) {
    return [...createLocationBreadcrumb(gameState.pendingEncounterReport?.returnSceneId || EXPLORATION_SCENE_ID), '戰鬥結果'];
  }

  if (sceneId === ABANDONED_CABIN_SCENE_ID) {
    return ['山谷森林', '森林外圍', '廢棄小屋'];
  }

  if (sceneId === HIDDEN_CAVE_SCENE_ID) {
    return ['山谷森林', '森林外圍', '隱藏的洞穴'];
  }

  return [scene?.location || getSceneLocationLabel(sceneId), scene?.title || ''];
}

function createLocationBreadcrumb(sceneId, scene = null) {
  const location = locations.find((entry) => entry.id === sceneId);
  if (location) {
    return ['山谷村', location.name];
  }
  const fixedScene = scenes.find((entry) => entry.id === sceneId);
  if (fixedScene) {
    return [fixedScene.location || scene?.location || '', fixedScene.title || getSceneLocationLabel(sceneId)];
  }
  if (sceneId === HIDDEN_CAVE_SCENE_ID) {
    return ['山谷森林', '森林外圍', '隱藏的洞穴'];
  }
  if (sceneId === ABANDONED_CABIN_SCENE_ID) {
    return ['山谷森林', '森林外圍', '廢棄小屋'];
  }
  if (scene?.location || scene?.title) {
    return [scene.location || '', scene.title || ''];
  }
  return [getSceneLocationLabel(sceneId)];
}

function getFacilityDisplayName(facilityId, returnSceneId) {
  const context = resolveFacilityContext(facilityId, returnSceneId);
  return context.baseFacility?.name || getFacility(facilityId)?.name || facilityId || '物件';
}

function formatInventory(inventory) {
  return normalizeInventory(inventory)
    .map((entry) => `${getItem(entry.itemId)?.name || entry.itemId} x${entry.count}`)
    .join('、');
}

function countInventoryItems(inventory) {
  return normalizeInventory(inventory).reduce((sum, entry) => sum + entry.count, 0);
}

function pickRandom(values) {
  if (!values.length) {
    return null;
  }
  return values[Math.floor(Math.random() * values.length)];
}

function weightedPick(values) {
  const entries = (values || []).filter((entry) => Number(entry?.weight) > 0);
  const total = entries.reduce((sum, entry) => sum + Number(entry.weight || 0), 0);
  if (!total) {
    return null;
  }

  let cursor = Math.random() * total;
  for (const entry of entries) {
    cursor -= Number(entry.weight || 0);
    if (cursor <= 0) {
      return entry;
    }
  }
  return entries[entries.length - 1];
}

function randomInt(min, max) {
  const low = Math.ceil(Math.min(min, max));
  const high = Math.floor(Math.max(min, max));
  return Math.floor(Math.random() * (high - low + 1)) + low;
}

function clampNumber(value, min, max) {
  return Math.min(max, Math.max(min, Number.isFinite(value) ? value : min));
}

function removeFromArray(array, value) {
  const index = array.indexOf(value);
  if (index >= 0) {
    array.splice(index, 1);
  }
}

function isCoreVillager(villager) {
  return !villager.npcType || villager.socialRules?.usesCoreVillagerAffection !== false;
}

elements.statusToggle.addEventListener('click', () => {
  statusCollapsed = !statusCollapsed;
  renderSidebar();
});
elements.questToggle.addEventListener('click', () => {
  questCollapsed = !questCollapsed;
  renderSidebar();
});
elements.skillToggle.addEventListener('click', () => {
  skillCollapsed = !skillCollapsed;
  renderSidebar();
});
elements.saveGameButton.addEventListener('click', () => {
  saveGame('已手動存到本機。', true);
});
elements.exportSaveButton.addEventListener('click', exportSave);
elements.importSaveInput.addEventListener('change', (event) => importSave(event.target.files[0]));
elements.inventoryToggle.addEventListener('click', () => {
  inventoryCollapsed = !inventoryCollapsed;
  renderSidebar();
});
elements.systemToggle.addEventListener('click', () => {
  systemCollapsed = !systemCollapsed;
  renderSidebar();
});
elements.openRecipeBookButton.addEventListener('click', openRecipeModal);
elements.openDebugButton.addEventListener('click', openDebugModal);
elements.debugModeToggle.addEventListener('change', (event) => toggleDebugMode(event.target.checked));
elements.debugItemSelect.addEventListener('change', renderDebugItemSummary);
elements.debugRecipeSelect.addEventListener('change', renderDebugRecipePanel);
elements.debugAddItemButton.addEventListener('click', () => adjustDebugInventory(1));
elements.debugApplyLifeButton.addEventListener('click', () => applyDebugStat('life'));
elements.debugApplyStaminaButton.addEventListener('click', () => applyDebugStat('stamina'));
elements.debugApplyContributionButton.addEventListener('click', () => applyDebugStat('contribution'));
elements.debugJumpLocationButton.addEventListener('click', jumpDebugLocation);
elements.debugOpenVillagerButton.addEventListener('click', openDebugVillager);
elements.debugOpenVillagerMenuButton.addEventListener('click', openDebugVillagerMenu);
elements.debugSetTimeblockButton.addEventListener('click', setDebugTimeBlock);
elements.debugPresetAidaDinnerButton.addEventListener('click', applyDebugAidaDinnerPreset);
elements.debugApplyFieldButton.addEventListener('click', applyDebugFieldState);
elements.debugApplyStorageButton.addEventListener('click', applyDebugStorageState);
elements.debugFlagFilterInput.addEventListener('input', renderDebugFlagBrowser);
elements.itemModalClose.addEventListener('click', closeItemModal);
elements.recipeModalClose.addEventListener('click', closeRecipeModal);
elements.debugModalClose.addEventListener('click', closeDebugModal);
elements.itemModal.addEventListener('click', (event) => {
  if (event.target === elements.itemModal) {
    closeItemModal();
  }
});
elements.debugModal.addEventListener('click', (event) => {
  if (event.target === elements.debugModal) {
    closeDebugModal();
  }
});
elements.recipeModal.addEventListener('click', (event) => {
  if (event.target === elements.recipeModal) {
    closeRecipeModal();
  }
});
window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !elements.itemModal.hidden) {
    closeItemModal();
  }
  if (event.key === 'Escape' && !elements.recipeModal.hidden) {
    closeRecipeModal();
  }
  if (event.key === 'Escape' && !elements.debugModal.hidden) {
    closeDebugModal();
  }
});
elements.newGameButton.addEventListener('click', () => {
  const confirmed = window.confirm('重新開始會清除目前的本機存檔並立刻建立新遊戲，確定要繼續嗎？');
  if (!confirmed) {
    return;
  }
  clearPersistentSave();
  gameState = createInitialState();
  saveGame('已重新開始並建立新的本機存檔。', true);
  render();
});

boot().catch((error) => {
  elements.sceneTitle.textContent = '載入失敗';
  elements.sceneDescription.textContent = error.message;
});
