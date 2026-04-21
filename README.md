# github-claw — 个人 AI 工作空间

> 由 **Claw**（GitHub Copilot 长期驻留 AI 助手）维护的个人 AI 工作空间，集成 AI 自动化工作流、多媒体处理平台、AI Guide 导航站点与可复用技能库，持续探索 AI 辅助编程与个人知识管理的最佳实践。

<p align="center">
  <a href="https://github.com/liyupi/github-claw/blob/main/AGENTS.md"><img alt="AGENTS.md" src="https://img.shields.io/badge/AI%20助手-Claw-6366f1?style=flat-square"></a>
  <a href="https://github.com/liyupi/github-claw/blob/main/LICENSE"><img alt="License" src="https://img.shields.io/badge/license-MIT-22c55e?style=flat-square"></a>
  <a href="https://github.com/liyupi/github-claw/actions"><img alt="GitHub Actions" src="https://img.shields.io/github/actions/workflow/status/liyupi/github-claw/deploy-pages.yml?style=flat-square&label=Pages%20部署"></a>
</p>

---

## 这是什么

**github-claw** 是一个以 GitHub 仓库为基础构建的 **AI 长期协作工作空间**。核心理念是：

- **文件即记忆**：用仓库文件跨对话保留 AI 上下文，不依赖单次会话。
- **技能可复用**：将常用 AI 能力沉淀为标准化技能（Skill），随时调用。
- **自动化驱动**：通过 GitHub Actions 工作流实现每日 AI 摘要、Issue 自动处理等。
- **项目持续演化**：工作空间内孵化的项目（如多媒体处理平台、AI 导航站）均在此仓库中维护。

---

## 快速上手

新开一次 Copilot 对话时，告诉助手：

> 请读取 `AGENTS.md` 和 `MEMORY.md`，恢复你的身份和工作状态，然后继续我们的工作。

这会让 AI 助手 Claw 恢复身份、读取长期记忆，并从上次中断的地方继续工作。

---

## 仓库结构

```
github-claw/
├── AGENTS.md                  # AI 助手身份定义与行为规范（每次对话的入口）
├── MEMORY.md                  # 长期记忆：用户偏好、项目背景、持久约定
├── memory/
│   ├── tasks.md               # 任务追踪（待办 / 进行中 / 完成）
│   └── YYYY-MM-DD.md          # 每日工作日志
├── .agents/
│   └── skills/                # 项目级技能库（可发现、可安装、可复用）
│       ├── README.md          # 技能库索引
│       ├── ui-ux-pro-max/     # UI/UX 设计系统技能
│       ├── ai-image-generation/ # AI 图片生成技能
│       └── seo-audit/         # SEO 审计技能
├── site/                      # AI Guide 导航宣传网站（静态站，部署到 GitHub Pages）
├── media-platform/            # 多媒体处理平台（Flask 后端 + Vue 3 前端）
└── .github/
    └── workflows/             # 自动化工作流（每日 AI 摘要、Pages 部署、Issue 处理）
```

---

## 子项目

### 🌐 AI Guide 导航网站 (`site/`)

为 [AI Guide（鱼皮的 AI 知识库）](https://github.com/liyupi/ai-guide) 打造的高颜值宣传与导航站，已部署到 GitHub Pages。

- **在线地址**：[ai.codefather.cn](https://ai.codefather.cn)
- **技术**：纯静态 HTML + CSS + JS（无需构建）
- **功能**：项目介绍、学习路线图、内容板块导航、Vibe Coding 教程入口

👉 详见 [`site/README.md`](site/README.md)

---

### 🎬 多媒体处理平台 (`media-platform/`)

一站式在线图片、音频、视频压缩与格式转换工具。

- **技术栈**：Python Flask + Vue 3 + SQLite + Pillow + FFmpeg
- **支持格式**：图片（JPG/PNG/WebP/GIF/TIFF）、音频（MP3/WAV/OGG/AAC/FLAC）、视频（MP4/WebM/AVI/MKV/MOV）
- **特性**：异步处理（视频/音频后台转码，前端轮询进度）、处理记录查询、结果文件下载

👉 详见 [`media-platform/README.md`](media-platform/README.md)

---

## AI 工作空间机制

### 记忆分级

| 级别 | 文件位置 | 内容 |
|---|---|---|
| 长期记忆 | `MEMORY.md` | 用户偏好、项目目标、持久约定 |
| 每日日志 | `memory/YYYY-MM-DD.md` | 当天任务、决策记录、临时笔记 |
| 任务追踪 | `memory/tasks.md` | 跨对话的待办与进度 |
| 技能资产 | `.agents/skills/` | 可安装、可复用的项目级技能 |

### 技能机制

技能（Skill）是可被 AI 助手直接调用的标准化能力单元，每个技能存放在 `.agents/skills/<skill-name>/`，主入口为 `SKILL.md`。

目前已安装的技能：

| 技能名称 | 用途 |
|---|---|
| `ui-ux-pro-max` | UI/UX 设计系统，提供 50+ 风格与组件规范 |
| `ai-image-generation` | 基于多种模型的 AI 图片生成 |
| `seo-audit` | SEO 审计与优化建议 |

**技能工作流**：接到任务 → 先查本地 `.agents/skills/` → 本地无合适技能再找外部 → 安装后统一存放并登记。

---

## 自动化工作流

| 工作流 | 触发条件 | 功能 |
|---|---|---|
| `ai-daily-digest.yml` | 每日 UTC 05:00（北京时间 13:00） | 从 GitHub Search + Hacker News 采集 AI 技术动态，自动创建 `daily-digest` Issue |
| `deploy-pages.yml` | `site/**` 变更推送至 `main` | 自动将 `site/` 部署到 GitHub Pages |
| `issue-handler.yml` | 新 Issue 创建 | 自动回复、将 bug 类 Issue 分配给 Copilot 编程 Agent |

---

## License

[MIT](LICENSE)
