---

title: 太强了！这个 NotebookLM Skill，真的把 NotebookLM 搬进了命令行！
date: 2026-01-15
tags: ["AI编程", "代码助手"]
category: AI编程
---


# 太强了！这个 NotebookLM Skill，真的把 NotebookLM 搬进了命令行！

Original 痕小子 [开源星探](javascript:void(0);)*2026年1月15日 07:05* *湖北*

![notebooklm-py项目截图](https://mmbiz.qpic.cn/mmbiz_png/NjA8gwicXyeKwG3TIKmeeicxIkvbXVWGcvcI8fDLkicOfwNym7FG9s4GFCYGSliapvA0OghQdHniaibjowtzSy3icfGpA/640?wx_fmt=png&from=appmsg)

![X用户推荐](https://mmbiz.qpic.cn/mmbiz_jpg/NjA8gwicXyeKwG3TIKmeeicxIkvbXVWGcvLDKtDX1tXKKXibM0ecqZlGer4FRv5bcialEdo3hOlqcufaG3nYPJ9lEw/640?wx_fmt=jpeg&from=appmsg)

（来源：X@向阳乔木）

只需一行命令，生成思维导图、音频播客、PPT，乃至解析在线YTB视频，统统不在话下。

#### 核心功能

- • **AI Agent工具**：将 NotebookLM 集成到 Claude Code 或其他大语言模型代理中。用于 AI 自动化的 Claude Code 技能，或者通过异步 Python API 构建集成。

- • **研究自动化**：批量导入来源（URL、PDF、YTB、Google Drive），运行网络研究查询，并以编程方式提取见解。构建可重复的研究流程。

- • **内容生成**：生成音频播客、视频、测验、抽认卡和学习指南。只需一个命令，就能将你的来源转化为精美的内容。

#### 快速使用

项目安装：

```Plain Text
# Basic installation
pip install notebooklm-py

# With browser login support (required for first-time setup)
pip install "notebooklm-py[browser]"
playwright install chromium
```

当然也可以通过我们之前说的 skill 安装方式，让 AI 帮我们装：

> 帮我安装这个Claude skill：https://github.com/teng-lin/notebooklm-py

该项目同时提供了三种使用方式：

第一种：Claude Skills 方式

```Plain Text
# 通过命令行界面安装，或者让Claude Code来安装
notebooklm skill install

# 然后使用自然语言：
# "制作一个关于量子计算的播客"
# "将测验下载为markdown格式"
# "/notebooklm 生成视频"
```

第二种：命令行界面

```Plain Text
# 1. 首次运行先要登录认证（会打开浏览器）
notebooklm login

# 2. 创建一个 notebook
notebooklm create "My Research"
notebooklm use <notebook_id>

# 3. 添加源
notebooklm source add "https://en.wikipedia.org/wiki/Artificial_intelligence"
notebooklm source add "./paper.pdf"

# 4. 自然语言对话
notebooklm ask "What are the key themes?"

# 5. 生成播客
notebooklm generate audio --wait
notebooklm download audio ./podcast.mp3
```

第三种：Python API方式

```Plain Text
import asyncio
from notebooklm import NotebookLMClient

async def main():
    async with await NotebookLMClient.from_storage() as client:
        # List notebooks
        notebooks = await client.notebooks.list()

        # Create notebook and add source
        nb = await client.notebooks.create("Research")
        await client.sources.add_url(nb.id, "https://example.com")

        # Chat
        result = await client.chat.ask(nb.id, "Summarize this")
        print(result.answer)

        # Generate podcast
        status = await client.artifacts.generate_audio(nb.id)
        await client.artifacts.wait_for_completion(nb.id, status.task_id)

asyncio.run(main())
```

主要特性功能可参考下表：

![特性对比表](https://mmbiz.qpic.cn/mmbiz_jpg/NjA8gwicXyeKwG3TIKmeeicxIkvbXVWGcvPibW6vGz5uu6YsOEQlstiaDMUxHzaRulKjicSJzJ9uMlV8kgTd14biaGpQ/640?wx_fmt=jpeg#imgIndex=2)

#### 特别适合这几类人

- • 做研究/调研/技术写作的

- • 经常看 YTb 技术视频的

- • 想把 NotebookLM 当成「长期知识库」的

- • 用 Claude Code/Gemini CLI/各种Agent的重度用户

这个工具的价值，会随使用时间指数级增长。

#### 写在最后

现在的 AI 产品都在卷 UI、卷动效，界面越来越花哨。

但对于真正的 Power User 来说，可编程性和自动化才是王道。

Google NotebookLM 本身是一个非常优秀的产品，它的 RAG 能力在目前市面上属于第一梯队。但在网页版中有时候会限制了它的想象力。

未来的知识管理，不是我们在 Notion 里手动整理，也不是在浏览器里一个个点开链接。而是一个自动化的管道，信息从一端流入（PDF、视频、网页），经过 AI 的提取、重组，从另一端流出我们需要的格式（脑图、音频、PPT）。

这个工具，包括类似的项目，就是搭建这个管道的一块关键积木。

GitHub:

> https://github.com/teng-lin/notebooklm-py

![结束语](https://mmbiz.qpic.cn/mmbiz_gif/NjA8gwicXyeKqAjyn8A3ob9xT4DDY8DB3JCvIaM6JKWXFsgCxznXicJhpRYJ5MIPb9xvgGA4WYhPagIKorlScib0Q/640?wx_fmt=gif#imgIndex=3)

如果本文对您有帮助，也请帮忙点个 赞👍 + 在看 哈！❤️

**在看你就赞赞我！**

![点赞](https://mmbiz.qpic.cn/mmbiz_gif/NjA8gwicXyeLZdEkueqhds4y07sImrPvibkDIsnVCibl5ibS6jSiccRh6RtH8ZqBPBWSib0kn7Ep6mP5YPJCJkraJ3kw/640?wx_fmt=gif#imgIndex=4)

