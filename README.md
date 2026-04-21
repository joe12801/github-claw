# github-claw — 用 GitHub 打造你自己的 AI 智能体

> 一套开箱即用的 **AI Agent 工作空间模板**：以 GitHub 仓库为载体，集成长期记忆、可复用 AI 技能包（Skill）、GitHub Actions 自动化与 Copilot 编程智能体，让 AI 真正成为你的长期协作伙伴。

<p align="center">
  <a href="https://github.com/liyupi/github-claw/blob/main/AGENTS.md"><img alt="AI Agent" src="https://img.shields.io/badge/AI%20Agent-Claw-6366f1?style=flat-square"></a>
  <a href="https://github.com/liyupi/github-claw/blob/main/LICENSE"><img alt="License" src="https://img.shields.io/badge/license-MIT-22c55e?style=flat-square"></a>
  <a href="https://github.com/liyupi/github-claw/actions"><img alt="GitHub Actions" src="https://img.shields.io/github/actions/workflow/status/liyupi/github-claw/deploy-pages.yml?style=flat-square&label=AI%20自动化"></a>
</p>

---

## 这是什么

**github-claw** 展示了如何用 GitHub 仓库打造一个**有记忆、有技能、可自动化的 AI 智能体**。它的核心不是某个具体项目，而是一套让 AI 持续工作的机制：

- 🧠 **文件即记忆**：用仓库文件跨对话保留 AI Agent 上下文，实现真正的长期记忆，不再受单次会话限制。
- 🔧 **AI 技能包（Agent Skills）**：将 UI/UX 设计、AI 图片生成、SEO 审计等能力封装为标准化技能包，AI 助手可直接调用，人人可复用。
- ⚡ **GitHub Actions 驱动的 AI 自动化**：利用 GitHub Actions 实现每日 AI 技术摘要、Issue 智能分配、Copilot 编程 Agent 自动接单等工作流，无需人工干预。
- 🚀 **Vibe Coding 实践**：借助 AI Agent 技能包，用自然语言描述需求，AI 自动完成编码、测试与部署——仓库内的子项目均由此方式孵化。

> **site/** 和 **media-platform/** 只是这套 AI 智能体体系的落地成果，展示了 AI Agent + Vibe Coding 能做出什么。

---

## 快速上手

新开一次 Copilot 对话时，告诉助手：

```
请读取 AGENTS.md 和 MEMORY.md，恢复你的身份和工作状态，然后继续我们的工作。
```

这会让 AI 助手 Claw 恢复身份、读取长期记忆，并从上次中断的地方继续工作。

---

## AI Agent 技能包

技能包（Agent Skill）是本仓库的核心机制——将可复用的 AI 能力封装为标准单元，存放在 `.agents/skills/<skill-name>/`，主入口为 `SKILL.md`，AI 助手接到任务时可直接调用。

**已内置技能包：**

| 技能包 | 能力说明 |
|---|---|
| `ui-ux-pro-max` | UI/UX 设计系统：50+ 视觉风格、161 种配色、57 种字体搭配，一键生成高质量界面 |
| `ai-image-generation` | 多模型 AI 图片生成（FLUX、Gemini、Grok 等），支持文生图、图生图、LoRA 等 |
| `seo-audit` | SEO 审计与优化建议，自动分析页面结构、关键词密度与技术 SEO 问题 |

**技能工作流**：
1. 接到任务 → 先查本地 `.agents/skills/`，优先复用已有技能包
2. 本地无合适技能 → 搜索 GitHub 开源仓库或 Skills.sh
3. 安装后统一存放在 `.agents/skills/<skill-name>/` 并更新索引

---

## AI 长期记忆机制

| 级别 | 文件位置 | 内容 |
|---|---|---|
| 长期记忆 | `MEMORY.md` | 用户偏好、项目目标、持久约定 |
| 每日日志 | `memory/YYYY-MM-DD.md` | 当天 AI 工作记录、决策与笔记 |
| 任务追踪 | `memory/tasks.md` | 跨对话的待办与进度 |
| 技能资产 | `.agents/skills/` | 已安装、可调用的 AI Agent 技能包 |

---

## GitHub Actions AI 自动化工作流

| 工作流 | 触发条件 | AI 能力 |
|---|---|---|
| `ai-daily-digest.yml` | 每日北京时间 13:00 | 自动采集 GitHub + Hacker News AI 技术动态，生成并发布每日 AI 摘要 Issue |
| `issue-handler.yml` | 新 Issue 创建 | AI 自动回复、识别 bug 类 Issue 并分配给 Copilot 编程 Agent 自动修复 |
| `deploy-pages.yml` | `site/**` 变更推送至 `main` | 自动将 AI 生成的静态站部署到 GitHub Pages |

---

## 仓库结构

```
github-claw/
├── AGENTS.md                  # AI Agent 身份定义与行为规范（每次对话的入口）
├── MEMORY.md                  # AI 长期记忆：用户偏好、项目背景、持久约定
├── memory/
│   ├── tasks.md               # AI 任务追踪（待办 / 进行中 / 完成）
│   └── YYYY-MM-DD.md          # 每日 AI 工作日志
├── .agents/
│   └── skills/                # AI Agent 技能包库（可发现、可安装、可复用）
│       ├── ui-ux-pro-max/     # UI/UX 设计系统技能包
│       ├── ai-image-generation/ # AI 图片生成技能包
│       └── seo-audit/         # SEO 审计技能包
├── site/                      # 【AI 产出】AI Guide 导航宣传网站
├── media-platform/            # 【AI 产出】多媒体处理平台
└── .github/
    └── workflows/             # AI 自动化工作流（每日摘要、Pages 部署、Issue 处理）
```

---

## AI 产出：孵化的子项目

以下项目均由 AI Agent + Vibe Coding 方式开发，展示了这套智能体体系的实际产出能力。

### 🌐 AI Guide 导航网站 (`site/`)

由 AI 设计并生成的高颜值宣传导航站，已自动部署到 GitHub Pages。

- **在线地址**：[ai.codefather.cn](https://ai.codefather.cn)
- **技术**：AI 生成的纯静态 HTML + CSS + JS
- **功能**：AI Guide 知识库导航、学习路线图、Vibe Coding 教程入口

👉 详见 [`site/README.md`](site/README.md)

### 🎬 多媒体处理平台 (`media-platform/`)

由 AI Agent 编码实现的完整 Web 应用，支持图片、音频、视频的在线压缩与格式转换。

- **技术栈**：Python Flask + Vue 3 + SQLite + Pillow + FFmpeg
- **AI 编程亮点**：后端异步任务队列、前端实时进度轮询，全由 AI 自动生成与调试

👉 详见 [`media-platform/README.md`](media-platform/README.md)

---

## License

[MIT](LICENSE)
