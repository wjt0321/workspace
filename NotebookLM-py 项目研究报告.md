---
title: NotebookLM-py 项目研究报告
tags: [研究, AI, NotebookLM, Python, 工具]
created: 2026-01-17
status: completed
---

# NotebookLM-py 项目研究报告

## 一、项目概述

**项目名称**: notebooklm-py
**开发者**: [[teng-lin]]
**发布时间**: 2025年1月
**GitHub**: https://github.com/teng-lin/notebooklm-py
**Star数**: 1.1k+
**Fork数**: 93+

### 核心定位

notebooklm-py 是 [[Google NotebookLM]] 的缺失 API。它是一个非官方的 Python 库和命令行工具，通过逆向工程 NotebookLM 的内部 RPC 协议，为用户提供程序化访问 NotebookLM 所有功能的能力。

### 解决的核心痛点

> ![[callout/warning]] **核心痛点**
>
> 1. **无法导出内容**: NotebookLM Web 界面生成的闪卡、思维导图、报告无法下载
> 2. **解析文本被锁定**: 从 YouTube 视频、PDF、网页提取的文本无法直接访问
> 3. **缺乏自动化**: 无法批量处理文档或集成到工作流中

---

## 二、技术架构

### 2.1 核心技术栈

| 技术 | 用途 |
|------|------|
| [[Python]] | 完全异步的 Python 库 |
| [[Playwright]] | 浏览器自动化（用于初始登录认证） |
| [[httpx]] | 轻量级 HTTP 请求（运行时无需浏览器） |
| [[asyncio]] | 异步架构，支持高效批处理 |

### 2.2 架构特点

#### RAG 架构优势

- NotebookLM 基于检索增强生成（[[RAG]]）架构
- 所有答案严格基于上传的文档
- 最小化幻觉问题
- 每个响应都可追溯到具体源段落（学术研究友好）

#### 双模式设计

1. **初始认证阶段**: 使用 Playwright 模拟真实用户交互（包括打字速度变化和鼠标移动模式），绕过 [[Google]] 自动化检测
2. **运行时阶段**: 使用 httpx 进行轻量级 HTTP 调用，完全异步，无需浏览器

### 2.3 项目结构

```
notebooklm-py/
├── _core.py              # 核心 HTTP/RPC 基础设施
├── notebook.py           # 笔记本管理：列表、创建、删除、重命名
├── source.py             # 源管理：添加、列表、删除
├── rpc/types.py          # RPC 类型定义
└── tests/
    ├── integration/      # 集成测试
    └── test_vcr_*.py     # E2E 测试
```

---

## 三、功能矩阵

| 功能类别 | 能力 |
|---------|------|
| **Notebook 管理** | 创建、列表、重命名、删除、分享 |
| **Source 导入** | URLs、YouTube、PDF/TXT/MD/DOCX、Google Drive、粘贴文本 |
| **交互式聊天** | Q&A、对话历史、自定义角色 |
| **内容生成** | 音频播客、视频、幻灯片、测验、闪卡、报告、信息图、思维导图 |
| **研究工具** | 网络研究、Drive 研究、自动导入源 |
| **导出与下载** | 音频、视频、幻灯片、信息图、报告、思维导图、数据表、测验、闪卡 |

---

## 四、安装与配置

### 4.1 系统要求

- [[Python]] 3.8+
- 网络连接（需访问 Google NotebookLM）
- Chromium 浏览器（仅初始登录需要）

### 4.2 安装步骤

#### 基础安装

```bash
pip install notebooklm-py
```

#### 完整安装（含浏览器支持）

```bash
pip install "notebooklm-py[browser]"
playwright install chromium
```

### 4.3 初始认证

```bash
notebooklm login
```

> ![[callout/info]] **认证说明**
>
> - 只需一次 Google 账户认证
> - 凭证存储在本地
> - 后续使用无需重复登录

### 4.4 环境变量（可选）

```bash
export NOTEBOOKLM_AUTH_JSON="..."  # CI/CD 环境中使用
export NOTEBOOKLM_READ_ONLY_NOTEBOOK_ID="..."  # 只读模式测试
```

---

## 五、使用模式

notebooklm-py 支持三种主要集成模式，每种模式适合不同的场景。

### 5.1 CLI 模式（命令行）

**适用场景**: 快速任务、Shell 脚本集成、日常操作

#### 基础命令

```bash
# 列出所有笔记本
notebooklm list

# 创建新笔记本
notebooklm create "Q1 Market Analysis"

# 添加源文件
notebooklm source add "https://example.com/report.pdf"

# 从 YouTube 添加视频
notebooklm source add "https://youtube.com/watch?v=xxxxx"

# 生成音频播客并等待完成
notebooklm generate audio --wait

# 下载音频文件
notebooklm download audio ./podcast.mp3
```

#### 高级工作流示例

```bash
# 1. 创建研究笔记本
notebooklm create "Climate Change Research 2024"

# 2. 批量添加研究源（深度模式）
notebooklm source add-research "climate change policy 2024" --mode deep --import-all

# 3. 等待所有源导入完成
notebooklm research wait --import-all --timeout 300

# 4. 生成学习指南报告
notebooklm generate report --type study-guide --wait

# 5. 下载测验题
notebooklm download quiz quiz.json

# 6. 下载闪卡
notebooklm download flashcards cards.md
```

#### 研究命令

```bash
# 网络研究
notebooklm source add-research "Quantum computing basics"

# Google Drive 深度研究
notebooklm source add-research "Project Alpha" --from drive --mode deep

# 不等待导入
notebooklm source add-research "AI safety papers" --mode deep --no-wait

# 超时等待
notebooklm research wait --timeout 600
```

### 5.2 Python API 模式

**适用场景**: 开发者、构建自动化研究流水线、批处理

#### 快速开始

```python
import asyncio
from notebooklm import NotebookLMClient

async def main():
    # 从本地存储加载认证
    async with await NotebookLMClient.from_storage() as client:
        # 列出所有笔记本
        notebooks = await client.notebooks.list()
        print(f"找到 {len(notebooks)} 个笔记本")

        # 创建新笔记本
        nb = await client.notebooks.create("Research")
        print(f"创建笔记本: {nb.id}")

        # 添加 URL 源
        await client.sources.add_url(nb.id, "https://example.com")

        # 问答
        result = await client.chat.ask(nb.id, "总结这个文档")
        print(result.answer)

        # 生成播客
        status = await client.artifacts.generate_audio(nb.id)
        await client.artifacts.wait_for_completion(nb.id, status.task_id)

asyncio.run(main())
```

#### 批量处理示例

```python
import asyncio
from notebooklm import NotebookLMClient

async def batch_process_papers():
    async with await NotebookLMClient.from_storage() as client:
        # 创建论文综述笔记本
        nb = await client.notebooks.create("Academic Literature Review")

        # 批量添加 PDF 论文
        pdf_urls = [
            "https://arxiv.org/pdf/1.pdf",
            "https://arxiv.org/pdf/2.pdf",
            "https://arxiv.org/pdf/3.pdf",
        ]

        for url in pdf_urls:
            await client.sources.add_url(nb.id, url)

        # 等待所有源处理完成
        await client.sources.wait_all(nb.id)

        # 生成总结报告
        report_status = await client.artifacts.generate_report(nb.id, type="summary")
        await client.artifacts.wait_for_completion(nb.id, report_status.task_id)

        # 下载所有生成的内容
        await client.artifacts.download(nb.id, "report", "./reports/")
        await client.artifacts.download(nb.id, "flashcards", "./cards.md")

asyncio.run(batch_process_papers())
```

#### 自定义配置

```python
from notebooklm import configure, ChatMode

# 低级 API 配置
client = await configure(
    auth_data={...},
    base_url="https://notebooklm.google.com"
)

# 使用预定义聊天模式
client = NotebookLMClient(mode=ChatMode.RESEARCH)
```

### 5.3 Claude Code Skills 模式

**适用场景**: 自然语言控制、无代码用户、快速集成

#### 安装 Skill

```bash
notebooklm skill install
```

#### 使用示例

```bash
# 自然语言命令
"Create a podcast about quantum computing"

"Download the quiz as markdown"

"Generate a video explaining this for kids"

"Create a study guide from my research notes"

"Find the budget figures in last week's meeting notes"
```

> ![[callout/success]] **Claude Code Skills 优势**
>
> - 无需编写代码
> - Claude Code 自动处理 NotebookLM 连接
> - 直接在对话中获取结果
> - 支持复杂的多步骤任务

---

## 六、实际应用案例

### 6.1 学术文献综述

**场景**: 研究生需要处理数十篇 PDF 论文

#### 传统方式

- 手动阅读每篇论文
- 手动整理笔记
- 手动制作闪卡
- 耗时数周

#### 使用 notebooklm-py

```bash
# 上传所有论文
for paper in papers/*.pdf; do
    notebooklm source add "$paper"
done

# 批量生成每篇论文的总结
notebooklm generate report --type summary

# 生成跨论文主题思维导图
notebooklm generate mindmap --theme "methods"

# 导出复习闪卡
notebooklm download flashcards cards.md
```

**结果**: 数周工作压缩到一天

### 6.2 企业知识库

**场景**: 公司需要让员工自然查询内部文档

#### 实现方案

1. 将所有内部文档组织到 NotebookLM 中：
   - 合同模板
   - 技术规范
   - 会议记录
   - 政策文档

2. 集成 [[Claude Code]] Skills

3. 员工使用自然语言查询：
   - "2024年Q3的销售目标是什么？"
   - "新的休假政策有哪些变化？"
   - "项目Alpha的技术规范在哪里？"

#### 优势

- 比传统文档搜索更直观
- 答案包含来源引用
- 减少幻觉风险（基于上传文档）

### 6.3 内容创作者工作流

**场景**: [[YouTube]] 创作者分析竞争对手内容

#### 自动化流程

```python
import asyncio
from notebooklm import NotebookLMClient

async def competitor_analysis():
    async with await NotebookLMClient.from_storage() as client:
        nb = await client.notebooks.create("Competitor Analysis")

        # 批量导入竞争对手视频
        competitor_videos = [
            "https://youtube.com/watch?v=xxx1",
            "https://youtube.com/watch?v=xxx2",
            # ... 更多视频
        ]

        for video_url in competitor_videos:
            await client.sources.add_url(nb.id, video_url)

        # 自动提取所有字幕
        transcripts = await client.sources.extract_text(nb.id)

        # 分析内容策略
        analysis = await client.chat.ask(
            nb.id,
            "分析这些视频的共同内容策略、主题和风格"
        )

        # 导出数据供进一步分析
        with open("analysis.txt", "w") as f:
            f.write(analysis.answer)

asyncio.run(competitor_analysis())
```

#### 优势

- 无需手动运行 [[yt-dlp]]
- 完全自动化
- 跨平台内容智能收集

---

## 七、高级功能

### 7.1 生成内容类型详解

#### 音频播客

```bash
# 生成音频
notebooklm generate audio "Focus on history"

# 等待完成
notebooklm generate audio --wait

# 下载音频文件
notebooklm download audio ./podcast.mp3
```

#### 视频生成

```bash
# 不同风格视频
notebooklm generate video "Explainer for kids" --style classic
notebooklm generate video --style modern --wait

# 下载视频
notebooklm download video ./output.mp4
```

#### 测验题

```bash
# 生成测验
notebooklm generate quiz

# 下载为 JSON
notebooklm download quiz quiz.json

# 下载为 Markdown
notebooklm download quiz quiz.md --format markdown
```

#### 闪卡

```bash
# 生成闪卡
notebooklm generate flashcards

# 下载为不同格式
notebooklm download flashcards cards.json
notebooklm download flashcards cards.md
notebooklm download flashcards cards.txt
```

#### 思维导图

```bash
# 生成思维导图
notebooklm generate mindmap

# 下载（支持可编辑格式）
notebooklm download mindmap ./mindmap.svg
```

### 7.2 源管理高级选项

#### 批量导入

```bash
# 从文件列表批量导入
cat urls.txt | xargs -I {} notebooklm source add {}

# 从 Google Drive 批量导入
notebooklm source add-drive --folder-id="xxx" --recursive
```

#### 研究模式

```bash
# 浅层研究（快速）
notebooklm source add-research "topic" --mode shallow

# 深度研究（全面）
notebooklm source add-research "topic" --mode deep

# 从 Drive 深度研究
notebooklm source add-research "Project Alpha" --from drive --mode deep
```

### 7.3 CI/CD 集成

```yaml
# GitHub Actions 示例
name: Generate NotebookLM Report

on:
  schedule:
    - cron: '0 9 * * 1'  # 每周一早上9点

jobs:
  generate-report:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Install dependencies
        run: |
          pip install notebooklm-py
          playwright install chromium

      - name: Authenticate
        env:
          NOTEBOOKLM_AUTH_JSON: ${{ secrets.NOTEBOOKLM_AUTH_JSON }}
        run: |
          notebooklm auth check --json

      - name: Generate weekly report
        run: |
          notebooklm generate report --type weekly --wait
          notebooklm download report ./reports/weekly.md

      - name: Upload artifacts
        uses: actions/upload-artifact@v3
        with:
          name: weekly-report
          path: reports/weekly.md
```

---

## 八、风险与限制

> ![[callout/warning]] **重要提示**
>
> 本项目使用未公开的 API，存在以下风险，使用前请仔细阅读

### 8.1 API 稳定性风险

#### 问题

使用未公开的 API

#### 影响

- Google 可随时修改内部接口
- 可能导致工具临时不可用

#### 缓解措施

- 开发者维护快速修复流程
- GitHub 上有测试套件及早发现破坏性更改
- 每日对真实 API 运行 E2E 测试

### 8.2 账户安全风险

#### 安全设计

- 不存储 Google 密码
- 使用浏览器 Cookie 认证
- 凭证存储在本地

#### 风险

- 任何自动化工具都存在账户标记风险
- 建议使用专用测试账户

### 8.3 服务条款风险

#### 状态

- Google TOS 通常禁止自动化访问
- 目前尚无用户报告账户被封禁
- 风险仍存在

#### 建议

- 仅用于个人研究和原型开发
- 生产环境等待官方 API

### 8.4 其他限制

- **免费用户**: 大部分功能可用，主要区别在于生成限制和源数量
- **文档依赖**: NotebookLM Plus 功能需要订阅
- **网络要求**: 需稳定网络连接访问 Google 服务

---

## 九、开发与贡献

### 9.1 开发环境设置

```bash
# 克隆仓库
git clone https://github.com/teng-lin/notebooklm-py.git
cd notebooklm-py

# 安装开发依赖
pip install -e ".[dev]"

# 运行测试
pytest tests/
```

### 9.2 添加新 RPC 方法

```python
# 1. 在 rpc/types.py 中添加类型定义
NEW_METHOD = "AbCdEf"

# 2. 实现方法逻辑
# 3. 添加测试用例
```

### 9.3 VCR 测试（回放模式）

```bash
# 记录真实 API 调用
export NOTEBOOKLM_VCR_RECORD=1
pytest tests/integration/test_vcr_*.py -v

# 使用回放模式测试（无需真实 API）
pytest tests/integration/test_vcr_*.py
```

### 9.4 故障排查

#### 常见问题

**问题**: "NOTEBOOKLM_AUTH_JSON 环境变量已设置但为空"

```bash
# 检查变量是否正确设置
echo "长度: ${#NOTEBOOKLM_AUTH_JSON}"
```

**问题**: "无法在 NOTEBOOKLM_AUTH_JSON 设置时运行 login"

```bash
# 在 CI/CD 中不要运行 login
# 使用 separate secrets 设置 NOTEBOOKLM_AUTH_JSON
```

#### 调试

```bash
# 诊断认证问题
notebooklm auth check --json
```

---

## 十、最佳实践建议

### 10.1 使用建议

✅ **适合**

- 个人研究和学习
- 原型开发和内部工具
- 自动化重复性任务
- 学术文献综述
- 企业知识库集成（内部使用）

❌ **不适合**

- 生产环境（需要 100% 可靠性）
- 大规模商业应用
- 官方 API 可用后继续使用

### 10.2 安全建议

1. 使用专用测试账户
2. 不要在公开仓库中暴露认证凭证
3. 定期备份重要内容
4. 监控 API 变更通知

### 10.3 性能优化

1. **批量操作**: 使用异步 API 同时处理多个任务
2. **缓存结果**: 下载生成的内容后本地缓存
3. **智能等待**: 使用 `--wait` 而非轮询
4. **限制并发**: 大规模导入时分批处理

---

## 十一、生态系统

### 11.1 相关项目

- [[notebooklm-mcp]]: NotebookLM MCP Server（另一个实现）
- [[awesome-agent-skills]]: AI Agent 技能列表

### 11.2 趋势分析

notebooklm-py 的出现反映了一个重要模式：

- 官方产品优先考虑消费者友好的界面
- 忽略了专业用户对程序化访问的需求
- 这种供需差距催生了大量第三方集成工具

#### 未来趋势

- AI 工具之间的互连（[[MCP 协议]]）
- NotebookLM 作为知识库被其他 AI agent 调用
- 真正的 AI 工作流自动化

---

## 十二、总结

### 核心价值

1. **解锁受限内容**: 导出 NotebookLM 生成的所有内容类型
2. **提取处理文本**: 获取从 YouTube、PDF、网页解析的文本
3. **自动化工作流**: 批量处理、CLI 脚本、Python API 集成
4. **RAG 架构优势**: 最小化幻觉、可追溯来源

### 适用人群

- 研究人员和学者
- 内容创作者
- 企业知识管理者
- AI 开发者
- 需要自动化文档处理的用户

### 限制认知

- API 稳定性风险
- 非官方工具
- 个人和内部使用为主
- 生产环境需谨慎

### 最终建议

> ![[callout/success]] **总结**
>
> notebooklm-py 是一个功能强大、设计精良的工具，填补了 Google NotebookLM 的重要空白。对于需要程序化访问 NotebookLM 功能的用户来说，这是目前最佳解决方案。但同时也要清醒认识到使用未公开 API 的风险，合理评估使用场景。

---

## 附录：快速参考卡

### 安装

```bash
pip install "notebooklm-py[browser]"
playwright install chromium
notebooklm login
```

### 常用命令

```bash
# 创建笔记本
notebooklm create "项目名称"

# 添加源
notebooklm source add "URL或文件路径"

# 生成播客
notebooklm generate audio --wait

# 下载
notebooklm download audio ./output.mp3
```

### Python API

```python
import asyncio
from notebooklm import NotebookLMClient

async def main():
    async with await NotebookLMClient.from_storage() as client:
        nb = await client.notebooks.create("Research")
        result = await client.chat.ask(nb.id, "总结内容")
        print(result.answer)

asyncio.run(main())
```

---

**报告生成时间**: 2026-01-17
**资料来源**: GitHub、Medium文章、Reddit讨论、官方文档

---

# 相关链接

- [[https://github.com/teng-lin/notebooklm-py|GitHub 仓库]]
- [[Google NotebookLM]]
- [[Claude Code]]
- [[Python 异步编程]]
- [[RAG 架构]]
