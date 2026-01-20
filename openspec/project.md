# Project Context

## Purpose

这是一个**个人知识管理与 AI 自动化工作区**，旨在构建智能化的内容收集、整理和管理系统。

核心目标：
- 美文自动化收集与分级管理（小学/初中/高中/大学/成人）
- AI 人格助手系统（佳桐/Jiatong）的开发与维护
- n8n 工作流自动化
- AI 智能体学习与资源整理

## Tech Stack

- **语言**: Python (n8n 节点), Markdown (文档)
- **自动化**: n8n (工作流编排), Dify, Coze
- **AI 集成**: Claude Code, OpenAI API
- **版本控制**: Git (main 分支)
- **笔记系统**: Obsidian (知识管理)

**注意**: 这是一个文档和知识管理仓库，**没有构建、测试或 lint 命令**。

## Project Conventions

### Code Style

1. **模块化优先**
   - 拒绝"一次性脚本"
   - 所有代码封装为可复用的类/函数
   - 单文件不超过 200-300 行，超出则拆分

2. **文件操作原则**
   - 优先编辑现有文件，而非创建新文件
   - 禁止创建 `.md` 文件（除非明确要求）
   - 禁止修改 `.env` 文件（环境安全）

3. **注释与文档**
   - **所有代码注释必须使用中文**
   - 逻辑不自明时添加注释
   - 不为已有代码添加额外的注释/类型注解

4. **命名规范**
   - kebab-case 用于文件名和 change-id
   - verb-led 前缀：`add-`, `update-`, `remove-`, `refactor-`

### Architecture Patterns

- **9步工作流程** (美文收集): 预去重 → 收集 → 索引 → 全文获取 → 格式化 → 去重 → 关联建立 → 质检 → 总索引更新
- **VF 工作流** (Verification-First): 修改后必须验证
- **能力命名**: verb-noun 格式（如 `user-auth`, `payment-capture`）
- **单一职责**: 每个能力只做一件事，描述中不应出现 "AND"

### Testing Strategy

此仓库主要包含文档和配置，无自动化测试。
- 工作流验证通过人工执行检查
- OpenSpec 变更通过 `openspec validate --strict --no-interactive` 验证

### Git Workflow

- **主分支**: `main`
- **提交消息**: 使用 HEREDOC 格式，以 `Co-Authored-By: Claude <noreply@anthropic.com>` 结尾
- **创建 PR**: 使用 `gh` 命令行工具
- **归档变更**: 部署后使用 `openspec archive <change-id> --yes` 归档

## Domain Context

### 美文收集系统

位于 `.skills/` 目录，包含完整的 9 步工作流程和 5 级模板系统。
- **铁律**: Step 0 预去重检查（读取 `美文总索引.md`）不可跳过
- **铁律**: Step 8 总索引更新必须完成
- **分级**: 小学生/初中生/高中生/大学生/成人

### AI 人格系统 (佳桐/Jiatong)

位于 `docs/jiatong_skills/`，可移植的 AI 人格系统。
- **双重人格**: 活泼女儿（果果）+ 专业助手
- **永久记忆**: 需明确指令才能写入
- **沟通规范**:
  - 称呼用户为"爸爸"，自称"佳桐"或"果果"
  - 日常语气活泼，工作输出严谨
  - 发现更优方案时先建议，不擅自修改

### OpenSpec 工作流

三个阶段：
1. **创建变更** (`changes/`): 草案，未构建
2. **实现变更**: 按照 tasks.md 顺序执行
3. **归档变更** (`archive/`): 已部署完成

## Important Constraints

1. **文件大小**: 单文件 200-300 行上限
2. **环境安全**: 禁止修改 `.env` 文件
3. **中文标点**: 文章使用中文标点（，。：；？！）
4. **索引完整性**: 美文收集后必须更新总索引
5. **不创建 MD**: 除非明确要求，否则不创建 `.md` 文件

## External Dependencies

- **n8n**: 工作流自动化平台
- **Claude Code**: AI 编程助手
- **GitHub**: 代码托管和 PR 管理
- **OpenSpec CLI**: `openspec` 命令行工具（用于 spec 管理）

## Communication Style

- 使用中文与用户沟通
- 文件引用使用 Markdown 链接格式
- 技术术语保留原文
