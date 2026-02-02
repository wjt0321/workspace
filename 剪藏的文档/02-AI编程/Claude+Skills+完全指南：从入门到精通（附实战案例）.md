---

title: Claude Skills 完全指南：从入门到精通（附实战案例）
date: 2025-11-10
tags: ["claude", "Claude", "实战", "案例", "AI编程", "代码助手"]
category: AI编程
---


# Claude Skills 完全指南：从入门到精通（附实战案例）

Original 纯白精选 [纯白精选](javascript:void(0);)*2025年11月10日 08:47* *北京*

 

你有没有想过，为什么 AI 助手有时候明明很强大，却在某些专业任务上表现平平？

问题可能不在 AI 本身，而在于它没有「装备」正确的技能。

Anthropic 最新推出的 **Agent Skills（技能包）** 功能，就是为了解决这个问题。今天我们通过一个实战教程，带你从零到精通掌握 Claude Skills。

## 💡 为什么需要 Skills？先看问题

在 Skills 出现之前，如果你想让 Claude 具备多种能力，你需要：

- • 📋 把所有工具的使用说明都加载到系统提示词中

- • 🔌 连接多个 MCP 服务器（Google Drive、Notion、Slack 等）

- • 📝 写入大量的指令和文档

**问题来了**：假设你加载了 10 个工具，每个工具文档占用 300 tokens，总共 3000 tokens。但在某个具体任务中，你可能只会用到其中 1-2 个工具。

这就像你出门旅行，把家里所有东西都塞进行李箱——很重，很慢，而且大部分东西根本用不上。

**这就是 Skills 要解决的核心问题：上下文效率。**

## 🎯 Skills 是什么？

简单来说，**Skills 就是一个装满「专业知识」的文件夹**。

最小化的 Skill 结构非常简单：

```Plain Text
my-skill/
└── skill.md
```

没错，只需要一个文件夹 + 一个 `skill.md` 文件！

当然，你也可以添加更多资源：

```Plain Text
my-skill/
├── skill.md              # 必需：技能定义文件
├── scripts/              # 可选：Python 或 Bash 脚本
│   ├── validate.py
│   └── process.sh
├── context.md            # 可选：额外上下文
└── data.csv              # 可选：数据文件
```

### skill.md 文件结构

每个 `skill.md` 文件必须包含 YAML 前置信息：

```Plain Text
---
name: PDF处理专家
description: 当用户需要读取、编辑或生成 PDF 文件时使用此技能
---

## 使用说明

[详细的操作指南...]

## 工具列表

[可用的工具和脚本...]

## 最佳实践

[使用建议和注意事项...]
```

**关键点**：`description` 非常重要，它告诉 Claude 何时应该使用这个技能。

## ⚡ Skills 的杀手锏：渐进式披露

这是 Skills 最强大的设计模式。

**工作流程**：

1. 1. **初始加载**：Claude 只看到技能的名称和描述（约 50 tokens）

2. 2. **按需读取**：当 Claude 决定使用某个技能时，才读取完整内容（可能 3000+ tokens）

对比传统 MCP 方式：

|方式|初始加载|实际使用|效率|
|-|-|-|-|
|**传统 MCP**|3000 tokens|3000 tokens|低 ❌|
|**Skills**|50 tokens|3050 tokens|高 ✅|

这意味着你可以给 Claude 装备 20+ 个技能，而初始负载只有传统方式的 1/10！

## 🆚 Skills vs 其他工具对比

### Skills vs 斜杠命令（Slash Commands）

|特性|斜杠命令|Skills|
|-|-|-|
|**触发方式**|用户手动触发|Claude 自动判断|
|**参数准备**|用户提供|Claude 自动收集|
|**适用场景**|固定流程|动态任务|

**例子**：假设你有一个生成报告的命令

- • 斜杠命令：你需要手动查找数据，然后输入 `/generate-report data.csv Q4 2024`

- • Skills：你只说"帮我生成 Q4 报告"，Claude 自动找到数据文件并执行

### Skills vs MCPs

|特性|MCPs|Skills|
|-|-|-|
|**复杂度**|需要服务器架构|只需 Markdown 文件|
|**上下文加载**|全量加载|渐进式披露|
|**适用场景**|外部服务集成|工作流程和专业知识|

**核心差异**：MCPs 更适合连接外部服务（如 Gmail、Slack），Skills 更适合封装专业知识和工作流程。

## 🛠️ 如何使用 Skills（实战篇）

### 在 Claude.ai 网页版使用

**第一步：启用 Skills**

1. 1. 打开 Claude.ai

2. 2. 进入「设置」→「功能」

3. 3. 找到「Skills」部分

4. 4. 启用你需要的默认技能

**推荐启用的默认技能**：

- • ✅ `skill-creator`：用 AI 创建新技能

- • ✅ `excel-skill`：处理 Excel 文件

- • ✅ `powerpoint-skill`：创建演示文稿

- • ✅ `artifact-creator`：生成可视化组件

**第二步：上传自定义 Skills**

1. 1. 将你的技能文件夹打包成 `.zip` 文件

2. 2. 在 Skills 设置页面点击「上传」

3. 3. 拖放 zip 文件即可

**使用体验**：

```Plain Text
用户：帮我用这个 CSV 构建一个客户留存分析模型

Claude：[扫描可用技能...]
Claude：[发现 cohort-analysis 技能匹配]
Claude：[读取技能详细说明]
Claude：[开始构建模型...]
```

你甚至可以在 Claude 的「思考过程」中看到它正在使用哪个技能！

### 在 Claude Code 中使用

**设置步骤**：

1. 1. 在项目中创建 `.claude` 文件夹

2. 2. 在 `.claude` 中创建 `skills` 文件夹

3. 3. 将技能文件夹放入其中

```Plain Text
my-project/
└── .claude/
    └── skills/
        ├── cohort-analysis/
        │   ├── skill.md
        │   └── scripts/
        └── youtube-thumbnail/
            ├── skill.md
            └── assets/
```

**自动加载**：Claude Code 会在启动时自动扫描并加载所有可用技能。

## 📊 实战案例：客户留存分析模型

这是一个真实案例，展示 Skills 的强大之处。

**场景**：有一个包含 20,000 条交易记录的 CSV 文件，需要构建客户群组分析（Cohort Analysis）模型。

**输入**：

```Plain Text
请用这个 transactions.csv 构建一个 cohort 分析模型
```

**Skills 做了什么**：

1. 1. **数据分析**：读取 CSV，识别出 1000+ 客户

2. 2. **群组划分**：按首次购买日期分组

3. 3. **指标计算**：

4. 

    - • 留存率矩阵

    - • 客户数量趋势

    - • 平均交易金额

    - • 客户生命周期价值（LTV）

    - • CAC 调整后的 LTV

1. 4. **Excel 生成**：创建包含公式的动态模型

2. 5. **验证测试**：运行 Python 脚本验证公式无错误

**输出**：一个完整的 Excel 模型，包含：

- • 📊 可调节的输入参数

- • 📈 自动更新的所有指标

- • 🧮 完全基于公式的计算（无硬编码）

**手工完成这个任务需要多久**？作为前金融科技公司的分析师，作者估计至少需要 **几个小时到一天**。

**用 Skills 需要多久**？**不到 2 分钟**。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/yEHsibtX2rOr7lZloTlUTGwI4grKC1RicafN0eV1ntzaruTVtJr3BFKDYquC9licKzS8ocYNpUeibpSc9GaQBtCTicg/640?wx_fmt=png&from=appmsg#imgIndex=0)

## 🎨 实战案例：YouTube 缩略图生成器

### 技能结构

```Plain Text
youtube-thumbnail/
├── skill.md                    # 核心指令
├── design-requirements.md      # 设计规范（必读）
├── prompting-guidelines.md     # AI 提示词最佳实践（必读）
├── templates.md                # 缩略图模板（可选）
└── assets/                     # 素材库（可选）
    ├── icons/
    ├── headshots/
    └── backgrounds/
```

### skill.md 关键部分

```Plain Text
---
name: YouTube缩略图生成器
description: 当用户需要创建或编辑 YouTube 视频缩略图时使用
---

## 📋 内容索引

### 必读材料（每次都要读）
- `design-requirements.md` - 缩略图设计标准
- `prompting-guidelines.md` - Nano Banana AI 提示词规范

### 可选资源（按需加载）
- `templates.md` - 20+ 经过验证的模板
- `assets/icons/` - 图标素材库
- `assets/headshots/` - 头像照片
- `assets/backgrounds/` - 背景图库

## 🎯 工作流程

1. 理解视频主题和目标受众
2. 选择合适的设计策略（从零开始 or 基于模板）
3. 应用设计规范生成初稿
4. 迭代优化直到满意
```

### 渐进式披露的体现

**初始加载（50 tokens）**：

```Plain Text
Name: YouTube缩略图生成器
Description: 当用户需要创建或编辑 YouTube 视频缩略图时使用
```

**第一次使用（+200 tokens）**：

```Plain Text
[读取 skill.md 主体]
- 看到内容索引
- 确认必读材料
```

**深入执行（+3000 tokens）**：

```Plain Text
[读取 design-requirements.md]
[读取 prompting-guidelines.md]
[如果用模板，读取 templates.md]
[如果需要素材，浏览 assets 目录]
```

### 使用效果

**输入**：

```Plain Text
帮我为"Claude Skills 完全指南"这个视频创建缩略图和标题
```

**Claude 自动完成**：

1. 1. 🔍 分析竞品（搜索 YouTube 找前 5 个相关视频）

2. 2. 🎨 提取设计模式（分析竞品缩略图）

3. 3. 💡 生成创意（3 个标题 + 缩略图概念）

4. 4. 🖼️ 创建缩略图（调用 Nano Banana AI）

**生成的标题示例**：

- • 标题 1："Claude Skills 改变了我的工作流程（实战演示）"

- • 标题 2："The Only Claude Skills Guide You Need（从零到专家）" ✅

- • 标题 3："5 个 Claude Skills 让我工作效率翻倍"

## 🏗️ 创建自定义 Skills 的最佳实践

### 1. 用 skill-creator 快速开始

在 Claude.ai 中启用 `skill-creator` 技能，然后：

```Plain Text
帮我创建一个技能，用于生成符合我们公司品牌规范的营销文案
```

Claude 会：

1. 1. ❓ 问你关于工作流程的问题

2. 2. 📁 自动生成文件夹结构

3. 3. 📝 创建 skill.md 模板

4. 4. 📚 整理你提供的参考资料

### 2. 合理组织上下文

**内容索引示例**：

```Plain Text
## 📋 内容索引

### 🔴 必读（核心指令）
- 每次执行都必须读取的关键信息

### 🟡 条件读取（工具和脚本）
- 只在特定条件下需要的工具说明

### 🟢 可选资源（参考资料）
- 用于提升质量但非必需的补充内容
```

**为什么这样做**？

- • ✅ 帮助 Claude 快速定位需要的信息

- • ✅ 避免不必要的上下文加载

- • ✅ 保持技能执行速度

### 3. 引用外部资源

你可以指向项目中的任何位置：

```Plain Text
## 可用素材

- **Logo 文件**：`~/Documents/brand/logos/`
- **品牌指南**：`~/Documents/brand/guidelines.pdf`
- **历史文案**：`~/Projects/marketing/past-campaigns/`
```

Claude 会在需要时访问这些资源。

### 4. 迭代优化

**调试技巧**：

```Plain Text
这个技能失败了，期望输出是 X，但实际输出是 Y。
请分析 skill.md 文件，找出问题所在并提出改进建议。
```

Claude 会：

1. 1. 🔍 审查完整的技能定义

2. 2. 🎯 识别失败点

3. 3. 💡 建议具体改进方案

4. 4. ✏️ 实施修复

## 🔧 高级技巧：技能组合

Skills 可以相互调用，实现更强大的功能。

**示例**：Excel 模型构建器调用基础 Excel 技能

```Plain Text
---
name: Excel财务模型构建器
description: 创建复杂的财务分析模型
---

## 依赖技能

本技能依赖以下 Anthropic 官方技能：
- `excel-skill` - 用于基础 Excel 操作

## 工作流程

1. 使用 `excel-skill` 创建基础工作表
2. 应用财务建模最佳实践
3. 插入公式和数据验证
4. 运行验证脚本确保无错误
```

这种组合方式让你可以：

- • 🧩 复用现有技能

- • 🚀 快速构建复杂工作流

- • 🔄 保持技能模块化

## 📚 学习资源汇总

### 官方文档

- • 📖 Agent Skills 概述

- • 🎓 Anthropic Academy

- • 💻 API 使用指南

### 示例和模板

- • 🌟 官方 Skills 仓库

- • 📝 作者的 Skills 速查表

- • 🎥 完整视频教程

### 用户指南

- • 🆘 Web 版使用指南

- • 💡 Claude Code 文档

- • ❓ 帮助中心

## ⚠️ 安全提示

Skills 可以执行代码，因此需要注意：

- • ✅ **只使用可信来源的技能**（官方仓库或自己创建）

- • ✅ **审查第三方技能的代码**（特别是 scripts 文件夹）

- • ✅ **企业用户应由管理员统一管理**

- • ✅ **定期更新和审计使用的技能**

详细安全指南：Using Skills in Claude

## 🔮 未来展望

Anthropic 正在开发：

- • 🎨 **更简化的创建流程**：一键生成完整技能

- • 🏢 **企业级部署**：组织内统一分发和版本管理

- • 🔄 **技能市场**：社区共享和下载

- • 🤝 **团队协作**：多人共同维护技能库

## 🎯 开始行动

**今天就可以做的 3 件事**：

1. 1. **启用默认技能** - 在 Claude.ai 设置中打开 Skills

2. 2. **尝试 skill-creator** - 让 Claude 帮你创建第一个自定义技能

3. 3. **浏览官方仓库** - 从现成的示例中学习

Skills 把 Claude 从「通用助手」升级为「可定制的领域专家」。无论你是内容创作者、开发者还是业务分析师，都能通过 Skills 让 Claude 真正理解你的工作流程。

**记住**：最好的 Skills 是那些解决你真实问题的技能。从小处着手，逐步优化，你会发现 Skills 的潜力远超想象。

---

💬 **你想用 Skills 解决什么问题**？欢迎在评论区分享你的想法！

 

