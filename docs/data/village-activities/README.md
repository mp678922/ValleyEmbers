# Village Activities

This folder stores planning data for village-wide activities that are not normal quests, facilities, or crafting recipes.

- `dinner.json`: 黃昏晚餐活動企劃。艾妲主持，玩家投入可料理食材，分成準備與享用兩階段演出；runtime 結算時依晚餐分數給予貢獻，每點 `+5`。

Activity data here is planning authority only until the browser runtime explicitly adds a generic village-activity handler. Do not duplicate these records into `events/events.json` before that handler exists.
