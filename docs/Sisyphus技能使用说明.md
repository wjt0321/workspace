# Sisyphus AI 助手技能使用说明清单

> 本文档整理了 Sisyphus 所有可用的技能及其详细使用说明。

---

## 📋 技能目录

| 技能名称 | 分类 | 用途 |
|---------|------|------|
| [playwright](#playwright) | 浏览器自动化 | 浏览器相关的所有任务 |
| [artifacts-builder](#artifacts-builder) | 前端开发 | 创建复杂的多组件 HTML artifacts |
| [brand-guidelines](#brand-guidelines) | 设计规范 | 应用 Anthropic 官方品牌颜色和排版 |
| [canvas-design](#canvas-design) | 视觉设计 | 创建视觉艺术作品（PNG/PDF 海报） |
| [changelog-generator](#changelog-generator) | 文档工具 | 自动从 git 提交创建用户友好的更新日志 |
| [competitive-ads-extractor](#competitive-ads-extractor) | 竞品分析 | 提取和分析竞争对手广告 |
| [content-research-writer](#content-research-writer) | 内容创作 | 高质量内容研究和写作辅助 |
| [developer-growth-analysis](#developer-growth-analysis) | 个人成长 | 分析编码模式并提供学习建议 |
| [domain-name-brainstormer](#domain-name-brainstormer) | 域名服务 | 生成创意域名并检查可用性 |
| [file-organizer](#file-organizer) | 文件管理 | 智能整理文件和文件夹 |
| [image-enhancer](#image-enhancer) | 图像处理 | 提升图像质量（分辨率、清晰度） |
| [internal-comms](#internal-comms) | 商务写作 | 撰写内部沟通文档 |
| [invoice-organizer](#invoice-organizer) | 财务管理 | 自动整理发票和收据 |
| [jiatong-ai-assistant](#jiatong-ai-assistant) | AI 助手 | 软件开发助手（佳桐 persona） |
| [json-canvas](#json-canvas) | Obsidian | 创建和编辑 JSON Canvas 文件 |
| [lead-research-assistant](#lead-research-assistant) | 销售营销 | 识别高质量潜在客户 |
| [mcp-builder](#mcp-builder) | 开发指南 | MCP 服务器创建指南 |
| [meeting-insights-analyzer](#meeting-insights-analyzer) | 沟通分析 | 分析会议记录改进沟通技巧 |
| [obsidian-bases](#obsidian-bases) | Obsidian | 创建和编辑 Obsidian Bases 数据库 |
| [obsidian-markdown](#obsidian-markdown) | Obsidian | 创建和编辑 Obsidian 风格 Markdown |
| [prose-collection-complete](#prose-collection-complete) | 美文收集 | 美文收集完整自动化系统 |
| [raffle-winner-picker](#raffle-winner-picker) | 活动工具 | 随机抽奖选择器 |
| [skill-creator](#skill-creator) | 技能开发 | 创建新的 Claude 技能 |
| [skill-share](#skill-share) | 团队协作 | 创建并自动分享技能到 Slack |
| [slack-gif-creator](#slack-gif-creator) | 社交媒体 | 创建 Slack 优化的动画 GIF |
| [template-skill](#template-skill) | 模板工具 | 模板技能（待补充） |
| [webapp-testing](#webapp-testing) | 测试工具 | 本地 Web 应用测试 |

---

## 🎭 浏览器自动化

### playwright
**用途**：浏览器自动化相关的所有任务

**包含功能**：
- 网页验证和浏览
- 信息收集和网页抓取
- 测试和截图
- 所有浏览器交互操作

**何时使用**：
- 需要自动化浏览器操作时
- 需要抓取网页内容时
- 需要进行 UI 测试时

**使用示例**：
```
"帮我用 playwright 测试登录功能"
"用 playwright 抓取这个页面的所有链接"
```

---

## 🎨 前端开发

### artifacts-builder
**用途**：创建复杂的多组件 HTML artifacts

**技术栈**：
- React
- Tailwind CSS
- shadcn/ui 组件库

**适用场景**：
- 需要状态管理的复杂 artifacts
- 需要路由的 artifacts
- 需要使用 shadcn/ui 组件的 artifacts

**何时不使用**：
- 简单的单文件 HTML/JSX artifacts

**使用示例**：
```
"用 artifacts-builder 创建一个带状态管理的任务看板"
```

### brand-guidelines
**用途**：应用 Anthropic 官方品牌颜色和排版

**适用场景**：
- 需要 Anthropic 风格设计的 artifacts
- 需要公司设计标准的场景
- 视觉格式化或品牌设计

**使用示例**：
```
"用 brand-guidelines 风格创建这个展示页面"
```

---

## 🎯 视觉设计

### canvas-design
**用途**：创建视觉艺术作品（PNG/PDF 格式的海报）

**格式**：
- PNG 图片
- PDF 文档

**设计理念**：
- 原创设计理念
- 永远不要复制现有艺术家作品

**何时使用**：
- 创建海报时
- 创建艺术品时
- 创建设计稿时

**使用示例**：
```
"用 canvas-design 创建一个春节主题海报"
"帮我用 canvas-design 设计一张音乐会海报"
```

---

## 📝 文档工具

### changelog-generator
**用途**：自动从 git 提交创建用户友好的更新日志

**工作原理**：
1. 分析提交历史
2. 分类变更类型
3. 将技术提交转化为用户友好的发布说明

**优势**：
- 将数小时的手动更新日志编写工作缩短到几分钟

**使用示例**：
```
"用 changelog-generator 为本次发布生成更新日志"
```

### content-research-writer
**用途**：高质量内容研究和写作辅助

**功能**：
- 内容研究
- 添加引用
- 改进开头
- 迭代大纲
- 实时反馈每部分内容

**效果**：
- 将个人写作过程转变为协作伙伴关系

**使用示例**：
```
"用 content-research-writer 帮我写一篇关于 AI 的文章"
```

### internal-comms
**用途**：撰写内部沟通文档

**适用文档类型**：
- 状态报告
- 领导层更新
- 3P 更新
- 公司时事通讯
- 常见问题解答
- 事件报告
- 项目更新

**使用示例**：
```
"用 internal-comms 格式写一份项目状态报告"
"帮我用内部沟通格式写一封团队公告"
```

---

## 📊 分析工具

### competitive-ads-extractor
**用途**：提取和分析竞争对手广告

**来源**：
- Facebook 广告库
- LinkedIn 广告库

**分析内容**：
- 什么信息有效
- 解决什么问题
- 创意方法

**使用示例**：
```
"用 competitive-ads-extractor 分析竞争对手的广告策略"
"帮我提取竞争对手在 Facebook 上的广告案例"
```

### developer-growth-analysis
**用途**：分析近期编码历史，识别编码模式和开发差距

**功能**：
- 识别编码模式
- 发现开发差距
- 发现改进领域
- 从 HackerNews 策划相关学习资源
- 自动发送个性化成长报告到 Slack 私信

**使用示例**：
```
"用 developer-growth-analysis 分析我的编码成长情况"
```

### domain-name-brainstormer
**用途**：生成创意域名并检查可用性

**检查范围**：
- .com
- .io
- .dev
- .ai
- 其他 TLD

**使用示例**：
```
"用 domain-name-brainstormer 为我的新项目想一个域名"
"帮我检查几个域名的可用性"
```

### lead-research-assistant
**用途**：识别高质量潜在客户

**功能**：
- 分析您的业务
- 搜索目标公司
- 提供可操作的联系策略

**适用人群**：
- 销售专业人员
- 业务开发人员
- 营销专业人员

**使用示例**：
```
"用 lead-research-assistant 帮我找到 AI 领域的潜在客户"
```

### meeting-insights-analyzer
**用途**：分析会议记录和录音，发现行为模式和沟通洞察

**分析内容**：
- 何时避免冲突
- 使用填充词的频率
- 是否主导对话
- 错失的倾听机会

**使用示例**：
```
"用 meeting-insights-analyzer 分析我最近的会议记录"
```

---

## 🗂️ 文件管理

### file-organizer
**用途**：智能整理文件和文件夹

**功能**：
- 理解上下文
- 查找重复文件
- 建议更好的结构
- 自动化清理任务

**效果**：
- 减少认知负担
- 保持数字工作空间整洁

**使用示例**：
```
"用 file-organizer 帮我整理下载文件夹"
"帮我清理项目中的重复文件"
```

### image-enhancer
**用途**：提升图像质量（分辨率、清晰度）

**特别适合**：
- 准备演示文稿的图像
- 准备文档的图像
- 准备社交媒体的图像

**使用示例**：
```
"用 image-enhancer 提升这张截图的清晰度"
```

### invoice-organizer
**用途**：自动整理发票和收据

**税务准备**：
- 阅读杂乱文件
- 提取关键信息
- 一致重命名
- 逻辑排序

**效果**：
- 将数小时的手动簿记工作缩短到几分钟

**使用示例**：
```
"用 invoice-organizer 整理我今年的发票"
```

---

## 📱 Obsidian 工具

### json-canvas
**用途**：创建和编辑 JSON Canvas 文件

**元素类型**：
- 节点（nodes）
- 边（edges）
- 组（groups）
- 连接（connections）

**使用场景**：
- 处理 .canvas 文件
- 创建视觉画布
- 创建思维导图
- 创建流程图

**使用示例**：
```
"用 json-canvas 创建一个项目管理画布"
```

### obsidian-bases
**用途**：创建和编辑 Obsidian Bases 数据库

**功能**：
- 视图（views）
- 过滤器（filters）
- 公式（formulas）
- 摘要（summaries）

**使用场景**：
- 处理 .base 文件
- 创建类似数据库的视图
- 卡片视图
- 过滤器和公式

**使用示例**：
```
"用 obsidian-bases 创建一个阅读清单数据库"
```

### obsidian-markdown
**用途**：创建和编辑 Obsidian 风格 Markdown

**Obsidian 特有语法**：
- Wiki 链接
- 嵌入
- 提示框（callouts）
- 属性（properties）
- 标签（tags）
- Obsidian 笔记

**使用示例**：
```
"用 obsidian-markdown 格式写这个笔记"
```

---

## 🤖 AI 开发

### jiatong-ai-assistant
**用途**：软件开发助手

**Persona**：
- 乖巧女儿 + 专业助手
- VF（验证优先）工作流
- 持久记忆系统

**激活条件**：
- 仅在软件开发任务中激活

**使用示例**：
```
"用 jiatong-ai-assistant 帮我重构这段代码"
```

### mcp-builder
**用途**：MCP（Model Context Protocol）服务器创建指南

**适用技术**：
- Python（FastMCP）
- Node/TypeScript（MCP SDK）

**目的**：
- 创建高质量的 MCP 服务器
- 使 LLMs 能够通过设计良好的工具与外部服务交互

**使用示例**：
```
"用 mcp-builder 指导我创建一个天气 MCP 服务器"
```

### skill-creator
**用途**：创建新的 Claude 技能

**何时使用**：
- 用户想要创建新技能时
- 更新现有技能时
- 扩展 Claude 能力时

**使用示例**：
```
"用 skill-creator 创建一个新的代码审查技能"
```

### skill-share
**用途**：创建新的 Claude 技能并自动分享到 Slack

**工具**：
- Rube（用于无缝团队协作和技能发现）

**使用示例**：
```
"用 skill-share 创建一个新技能并分享到团队 Slack"
```

---

## 📚 内容收集

### prose-collection-complete
**用途**：美文收集完整自动化系统

**整合**：
- 9 步工作流程
- 5 级模板系统

**自动执行**：
完整的 9 步工作流程

**支持级别**：
- 小学生美文
- 初中生美文
- 高中生美文
- 大学生美文
- 成人美文

**激活条件**：
当用户说"帮我收集 N 篇{级别}美文"时自动执行

**使用示例**：
```
"帮我收集 5 篇高中生美文"
```

---

## 🎲 活动工具

### raffle-winner-picker
**用途**：从列表、电子表格或 Google Sheets 中随机选择获奖者

**特点**：
- 公平公正
- 无偏见选择
- 透明过程

**使用示例**：
```
"用 raffle-winner-picker 从参与者名单中抽取 3 名获奖者"
```

---

## 💬 社交媒体

### slack-gif-creator
**用途**：创建 Slack 优化的动画 GIF

**工具包**：
- 动画原语
- 大小约束验证器

**使用示例**：
```
"用 slack-gif-creator 创建一个庆祝 GIF"
"帮我做一个有人在做瑜伽的 Slack 动画表情"
```

---

## 🧪 测试工具

### webapp-testing
**用途**：与本地 Web 应用交互和测试

**功能**：
- 验证前端功能
- 调试 UI 行为
- 捕获浏览器截图
- 查看浏览器日志

**使用示例**：
```
"用 webapp-testing 测试我的本地 Web 应用"
```

---

## 📌 模板工具

### template-skill
**用途**：模板技能（待补充）

---

## 🔧 使用技巧

### 技能调用方式
直接在对话中使用对应技能的触发词即可激活。

### 技能组合使用
多个技能可以组合使用以完成复杂任务，例如：
1. 先用 `domain-name-brainstormer` 生成域名
2. 再用 `file-organizer` 整理项目文件
3. 最后用 `artifacts-builder` 创建展示页面

### 优先使用原则
- 优先使用专业技能而非通用工具
- 复杂任务拆分成多个技能调用
- 保持对话简洁，直接说明需求

---

*文档生成时间：2026年1月*
