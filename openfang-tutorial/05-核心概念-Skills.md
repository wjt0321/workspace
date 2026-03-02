---
title: OpenFang Skills 核心概念
tags:
  - OpenFang
  - Skills
  - 核心概念
aliases:
  - Skills系统
  - 技能系统
date: 2026-03-01
---

# OpenFang Skills 核心概念

## 什么是 Skills？

Skills（技能）是 OpenFang 的**知识注入系统**——领域专业知识的参考文档，在运行时被注入到 Agent 的上下文中，提供专业背景知识。

> [!important] 核心概念
> Skills 不是可执行代码，而是**知识参考**——告诉 Agent 如何正确执行特定领域的任务。

## SKILL.md 格式

### 基本结构

```markdown
# Skill: 技能名称

## 概述
简要描述这个技能的用途和能力。

## 专业知识

### 核心概念
- 概念1：解释
- 概念2：解释

### 最佳实践
1. 实践1
2. 实践2

## 工作流程

### 步骤1：...
描述...

### 步骤2：...
描述...

## 示例

### 示例1
...

## 注意事项
- 注意点1
- 注意点2

## 参考资料
- [参考1](url)
- [参考2](url)
```

### 完整示例

```markdown
# Skill: SEO内容优化

## 概述
专业的搜索引擎优化内容创作技能，帮助创建高排名的网页内容。

## 专业知识

### 关键词研究
- **长尾关键词**：竞争度低、转化率高
- **搜索意图**：信息型、导航型、交易型
- **关键词密度**：建议1-2%

### 内容结构
1. **标题优化**
   - 包含主关键词
   - 长度控制在60字符内
   
2. **Meta描述**
   - 155-160字符
   - 包含行动号召

3. **标题层级**
   - H1：仅一个，含主关键词
   - H2：分段主题
   - H3：细分要点

## 工作流程

### 步骤1：关键词分析
分析目标关键词的：
- 搜索量
- 竞争度
- 相关关键词

### 步骤2：竞品分析
研究前10名结果：
- 内容长度
- 结构特点
- 覆盖主题

### 步骤3：内容创作
遵循最佳实践撰写内容...

## 示例

### 示例：优化博客文章
**原标题**：如何做SEO
**优化后**：2024年SEO完整指南：从入门到精通的15个技巧

## 注意事项
- 避免关键词堆砌
- 保持内容自然流畅
- 定期更新内容

## 参考资料
- [Google搜索中心](https://developers.google.com/search)
```

## 内置技能列表

OpenFang 内置 **60+ 技能**，涵盖多个领域：

### 编程开发

| 技能 | 描述 |
|------|------|
| `coding-python` | Python最佳实践 |
| `coding-javascript` | JavaScript/TypeScript |
| `coding-rust` | Rust编程指南 |
| `coding-golang` | Go语言开发 |
| `code-review` | 代码审查规范 |
| `debugging` | 调试技巧 |
| `testing` | 测试策略 |

### 数据分析

| 技能 | 描述 |
|------|------|
| `data-analysis` | 数据分析方法 |
| `sql-optimization` | SQL查询优化 |
| `visualization` | 数据可视化 |
| `statistics` | 统计分析 |
| `ml-basics` | 机器学习基础 |

### 写作创作

| 技能 | 描述 |
|------|------|
| `technical-writing` | 技术文档写作 |
| `copywriting` | 文案写作 |
| `seo-content` | SEO内容优化 |
| `academic-writing` | 学术写作 |
| `storytelling` | 叙事技巧 |

### 研究分析

| 技能 | 描述 |
|------|------|
| `research-methodology` | 研究方法论 |
| `fact-checking` | 事实核查 |
| `source-evaluation` | 来源评估 |
| `citation-apa` | APA引用格式 |
| `citation-mla` | MLA引用格式 |

### 商业营销

| 技能 | 描述 |
|------|------|
| `marketing-strategy` | 营销策略 |
| `competitive-analysis` | 竞品分析 |
| `customer-research` | 用户研究 |
| `business-plan` | 商业计划书 |
| `pitch-deck` | 路演文稿 |

## 技能管理

### 列出技能

```bash
# 列出所有技能
openfang skill list

# 按类别筛选
openfang skill list --category research

# 搜索技能
openfang skill search "关键词"
```

### 安装技能

```bash
# 从 FangHub 安装
openfang skill install <skill-name>

# 从本地安装
openfang skill install ./path/to/skill

# 从 URL 安装
openfang skill install https://example.com/skill.md
```

### 创建自定义技能

```bash
# 创建新技能
openfang skill create my-skill

# 生成的文件
~/.openfang/skills/my-skill/
├── SKILL.md
└── metadata.toml
```

### 验证技能

```bash
# 验证格式
openfang skill validate my-skill

# 输出示例
✓ SKILL.md 格式正确
✓ 必要章节存在
✓ 链接可访问
✓ 无语法错误
```

## 技能与 Agent 绑定

### 方法1：配置文件绑定

```toml
# ~/.openfang/agents/my-agent.toml

[agent]
name = "my-agent"
skills = ["research-methodology", "fact-checking", "citation-apa"]
```

### 方法2：命令行绑定

```bash
# 创建时指定
openfang agent create researcher --skills "research-methodology,fact-checking"

# 动态添加
openfang agent add-skill my-agent seo-content

# 移除技能
openfang agent remove-skill my-agent seo-content
```

### 方法3：Hands 自动关联

Hands 会自动加载相关技能：

```bash
# Researcher Hand 自动加载
- research-methodology
- fact-checking
- source-evaluation
- citation-apa
```

## FangHub 技能市场

FangHub 是 OpenFang 的技能市场：

```
┌─────────────────────────────────────────────────────────┐
│                    FangHub 技能市场                      │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  🔥 热门技能                                              │
│  ├─ ai-prompt-engineering    ⭐ 1.2k                     │
│  ├─ technical-writing        ⭐ 890                      │
│  └─ research-methodology     ⭐ 756                      │
│                                                          │
│  📦 新发布                                                │
│  ├─ rust-async-programming   v0.2.0                      │
│  ├─ data-visualization       v1.0.0                      │
│  └─ api-documentation        v0.3.1                      │
│                                                          │
│  🏷️ 分类                                                 │
│  ├─ 编程开发 (23)                                        │
│  ├─ 数据分析 (15)                                        │
│  ├─ 写作创作 (12)                                        │
│  └─ 商业营销 (10)                                        │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### 使用 FangHub

```bash
# 浏览市场
openfang skill browse

# 搜索
openfang skill search "prompt" --hub

# 安装
openfang skill install ai-prompt-engineering --hub

# 发布
openfang skill publish my-skill
```

## 技能最佳实践

### 1. 保持专注

> [!tip] 原则
> 一个技能应该只解决一个问题领域。

```markdown
❌ 错误：包含编程、写作、营销的综合技能
✅ 正确：专注SEO内容优化技能
```

### 2. 提供具体示例

```markdown
## 示例

### 输入
"写一篇关于AI的文章"

### 输出
# 2024年人工智能发展趋势：从实验室到日常生活

## 引言
人工智能已经从实验室走向...

（展示期望的输出格式和质量）
```

### 3. 包含边界条件

```markdown
## 注意事项

### 不适用场景
- 技术文档（请使用 technical-writing 技能）
- 学术论文（请使用 academic-writing 技能）

### 已知限制
- 不支持多语言SEO
- 不包含技术SEO检查
```

### 4. 版本管理

```markdown
# Skill: SEO内容优化

**版本**: 1.2.0
**更新日期**: 2024-03-15
**变更日志**:
- 添加结构化数据指南
- 更新Meta描述长度建议
```

## 技能与工具的关系

```
┌─────────────────────────────────────────────────────────┐
│                Skills vs Tools                          │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Skills (知识)              Tools (能力)                │
│  ┌─────────────┐           ┌─────────────┐             │
│  │ 知道如何做   │           │ 能够执行操作 │             │
│  │ 领域知识    │           │ API调用      │             │
│  │ 最佳实践    │           │ 文件操作     │             │
│  │ 注意事项    │           │ 网络请求     │             │
│  └─────────────┘           └─────────────┘             │
│         │                         │                     │
│         └─────────┬───────────────┘                     │
│                   ↓                                     │
│         ┌─────────────────┐                             │
│         │   有效的执行    │                             │
│         │  (知识 + 能力)  │                             │
│         └─────────────────┘                             │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

## 相关链接

- [[04-核心概念-Hands]] - Hands 系统
- [[06-核心概念-Channels]] - 消息通道
- [[07-核心概念-Memory]] - 内存系统
- [[09-API参考]] - API 文档

---

> [!info] 提示
> OpenFang 原生支持 SKILL.md 格式，与 ClawHub 市场兼容。
