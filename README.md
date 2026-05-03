# 热血格斗 — FC 风格 浏览器原型

这是仓库中的最小可运行原型（方案 A）：基于 HTML5 Canvas 的单机热血格斗演示。

最近更新（2026-05-03）

- 为角色与敌人添加了“像素风”占位美术：不依赖外部图片，直接在 Canvas 上绘制像素图案。
- 添加了简单的音效（WebAudio）：跳跃、命中与必杀的合成音效，用户在首次交互后可听到声音。
- 添加了标题菜单、暂停菜单、以及本地高分保存（localStorage）。
- 为在 GitHub Codespaces 中运行优化：提供 devcontainer 配置，自动在 Codespace 启动时在 8000 端口运行静态服务器（Python）。

如何在本地运行

- 直接在浏览器中打开 `index.html`（无需构建工具）。
- 推荐在本地启动静态服务器以避免浏览器对本地文件的限制：
  - Python 3: `python -m http.server 8000`
  - 然后在浏览器打开 http://localhost:8000

在 GitHub Codespaces 中运行（推荐）

1. 在仓库页面点击 Code → Codespaces → Create codespace on master。
2. Codespace 启动后会自动在容器内以 `python -m http.server 8000` 启动静态服务器（端口 8000 已转发）。
3. 在 Codespaces 的端口预览中打开 8000 端口即可试玩。

键盘操作：← → 移动，↑ 跳跃，Z 普通攻击，X 蓄力并释放特殊技能，Esc 暂停。

说明

- 使用简单的像素 pattern 在 Canvas 上绘制角色；这便于后续替换为真实像素贴图或导入精灵表。
- WebAudio 用于合成短音效，避免依赖外部音频文件；注意某些浏览器要求用户有过交互后才能播放声音。
- 源码位于 `src/game.js`，样式在 `src/styles.css`。

下一步建议：
- 替换占位像素为更精细的像素艺术（可由我生成或使用开源素材）。
- 添加更多敌人类型、连招与反馈（冲击特效、摄像机抖动等）。
- 添加菜单、暂停、关卡与本地高分保存（已完成）。

