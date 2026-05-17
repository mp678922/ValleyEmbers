# 角色美術風格與提示詞記錄

本文件記錄目前角色立繪生成時已確認的畫風方向、共通規格與可重複使用的提示詞模板。

## 目前定案風格

- 用途：`ValleyEmbers` 角色人物資產
- 畫布規格：`128 x 256 px`
- 檔案格式：`PNG`
- 背景：透明背景
- 構圖：單一角色、全身、置中、完整收進畫面
- 風格方向：Q 版 / 半身偏全身比例的兒童卡通角色感，線條圓潤，表情清楚，剪影明確
- 動作方向：比靜態站姿更生動，重心偏移、前傾、抬手、跨步、頭髮與袖口帶動勢
- 參考規則：可參考提供圖片的簡潔可愛比例與臉部語言，但不可直接複製服裝、姿勢、五官細節

## 共通角色提示詞模板

```text
Use case: illustration-story
Asset type: ValleyEmbers game character asset
Primary request: create one full-body character sprite-style illustration for the game
Subject: {name}, {role}
Style/medium: cute rounded children’s-cartoon / chibi character illustration, clean outline, readable at small size
Composition/framing: one character only, centered, full body, fully contained in frame, strong silhouette, clear limb separation
Lighting/mood: bright, lively, friendly, expressive
Color palette: soft but readable colors, not muddy, strong separation between hair, clothing, and skin
Constraints: exact character spec target is 128x256 PNG, transparent background, one character only, no extra objects, no text, no frame, no watermark
Avoid: copied clothing from reference image, copied pose from reference image, realistic rendering, crowded detail, background scenery
```

## 動作強化補充詞

需要更生動時，追加以下描述：

```text
Make the pose more lively and dynamic: energetic forward-leaning motion, one foot stepping out, one arm raised in a cheerful greeting, rallying, or confident gesture, the other arm balancing naturally, expressive bright face, stronger sense of motion in body angle, sleeves, hair, and silhouette.
```

## 艾妲已確認版本方向

- 角色：艾妲 / `aida`
- 身分：領袖
- 角色氣質：可靠、穩重、成熟得較早
- 服裝方向：鄉村奇幻風村長服裝，不使用現代連帽上衣與牛仔短褲
- 畫面方向：活潑、明亮、可愛，但保留「負責任」的領導感

## 批次生成套用規則

- 角色外觀以 `docs/data/villagers/villagers.json` 的角色資料為主。
- 特殊 NPC 也可沿用同一畫風，但需保留其物種或特殊身份辨識度。
- 正式檔名遵循 [art-spec.md](art-spec.md) 的 `character_<id>.png`。
