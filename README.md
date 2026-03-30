# github-claw

这是一个由 **Claw**（GitHub Copilot 长期驻留 AI 助手）维护的个人 AI 工作空间。

## 快速上手

新开一次 Copilot 对话时，告诉助手：

> 请读取 `AGENTS.md` 和 `MEMORY.md`，恢复你的身份和工作状态，然后继续我们的工作。

## 文件结构

| 文件 / 目录 | 说明 |
|---|---|
| `AGENTS.md` | AI 助手身份定义与工作规范（核心） |
| `MEMORY.md` | 长期记忆：用户偏好、项目背景、持久约定 |
| `memory/tasks.md` | 任务追踪 |
| `memory/YYYY-MM-DD.md` | 每日工作日志 |
| `.agents/skills/<skill-name>/SKILL.md` | 项目级技能主入口，供后续任务直接复用 |

## 技能机制

- 开始任务前，先检查本地 `.agents/skills/`
- 本地无合适技能时，再到 GitHub 开源仓库和 Skills.sh 搜索
- 安装后的技能统一存放到 `.agents/skills/<skill-name>/`
