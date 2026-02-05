---

title: 开源 AI 神器 PPTAgent：让你的演示文稿制作效率提升 10 倍
date: 2026-01-04
tags: ["AI", "人工智能", "智能体", "Agent", "AI工具"]
category: AI Agent
---


# 开源 AI 神器 PPTAgent：让你的演示文稿制作效率提升 10 倍

Original 徐小夕 [趣谈AI](javascript:void(0);)*2026年1月4日 08:22* *重庆*



在小说阅读器中沉浸阅读

👆关注**趣谈AI，获取热门AI产品深度剖析**

作者简介：
****徐小夕，曾任职多家上市公司，多年架构经验，打造过上亿用户规模的产品，聚集于AI应用的实践落地。

最近推出了[《架构师精选](https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzU2Mzk1NzkwOA==&action=getalbum&album_id=3943207570462097423&scene=21#wechat_redirect)[》](https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzU2Mzk1NzkwOA==&action=getalbum&album_id=3943207570462097423&scene=21#wechat_redirect)专栏，会分享一线企业AI应用实践，并和大家拆解可视化搭建平台，AI产品，办公协同软件的源码实现。

![图片](https://mmbiz.qpic.cn/mmbiz_png/SPuE3j6U9WicngSNbMbfbqOia03PhPn95KjJg40kULvNqBYEqqAPrKkYzjOXa4SE9icz5Bv07Btgva67swKVsAIrg/640?wx_fmt=png&from=appmsg&wxfrom=5&wx_lazy=1&randomid=27o78l32&tp=webp#imgIndex=0)

之前和大家分享了我们精心打磨的协同AI文档 JitWord：

![图片](https://mmbiz.qpic.cn/mmbiz_gif/dFTfMt01148L0PBYb7rC2B1r1t3Ip50tjbmqdCeb8GZZgT4yhHGjGWicwmeL7l1qf5sHsVicmcrhCqgviaacHdzxw/640?wx_fmt=gif&from=appmsg&wxfrom=5&wx_lazy=1&tp=webp#imgIndex=1)

体验地址：https://jitword.com

最近准备给 JitWord AI 文档添加一键生成PPT能力，研究了很多方案，最终确定了一个比较合适的AI生成PPT方案，后面上线之后会写文章给大家分享体验。

接下来和大家分享一款我在调研 AI2PPT 时发现的一款非常有价值的开源项目 ——PPTAgent。

![Image](https://mmbiz.qpic.cn/mmbiz_png/dFTfMt01148Xd5kg5XqRIcKpPd3VWlg7iaiaSqibJtduKlTPyIUcQhDIlKYHuEcApjpAheXsN7altdg2fKSIK4q1g/640?wx_fmt=png&from=appmsg#imgIndex=2)

它是由中科院计算所团队开发的AI开源工具，能把文档自动转换成专业幻灯片。借鉴了人类制作演示文稿的思维方式，通过两阶段处理流程，先分析参考幻灯片的模式，再生成结构清晰、视觉统一的新幻灯片。

![Image 1](https://mmbiz.qpic.cn/mmbiz_png/dFTfMt01148Xd5kg5XqRIcKpPd3VWlg7KPNfNFrDfvGXicWcHicTcy5B5z51YQAyrgmE5Swhicw2RCokopgdDCqUA/640?wx_fmt=png&from=appmsg#imgIndex=3)

一句话结论：PPTAgent 把「大纲→逻辑→视觉」三步完全自动化，让做汇报从 3 小时压缩到 10 分钟，而且代码全开源，Star 数已突破3k star。

老规矩，先上 github 地址。

github：https://github.com/alibaba/page-agent

## 解决的核心痛点

做 PPT 这件事，估计大家都深有体会：

- 从文档提炼核心观点要花大量时间

- 排版设计耗费精力却效果不佳

- 视觉元素与内容匹配度低

- 缺乏专业评估标准判断 PPT 质量

PPTAgent 正是为解决这些问题而来。它就像一个专业的演示文稿设计师，能把我们从繁琐的 PPT 制作中解放出来，让我们专注于内容本身而非排版设计。

## 功能亮点

PPTAgent 我总结了三大核心优势，能让它在同类工具中脱颖而出：

1. **动态内容生成**：

    ![Image 2](https://mmbiz.qpic.cn/mmbiz_png/dFTfMt01148Xd5kg5XqRIcKpPd3VWlg74L7EKRjx4a9oAwvjWHViaIoSm0MtVfbUXazHRiaYjYsCeyVW7yN0BrNg/640?wx_fmt=png&from=appmsg#imgIndex=4)

    不仅仅是文本搬运，而是能将文档内容智能转化为适合幻灯片展示的形式，同时自动匹配相关图片，实现图文无缝融合。

1. **智能参考学习**：

    ![Image 3](https://mmbiz.qpic.cn/mmbiz_png/dFTfMt01148Xd5kg5XqRIcKpPd3VWlg7Frf77fUt3JO2S7vxqdoPZ539kXr9nUdM7Op7ELU7odnKE3anBhrfHw/640?wx_fmt=png&from=appmsg#imgIndex=5)

    


    不需要人工标注，就能从现有幻灯片中学习布局模式和设计风格，生成风格统一的新演示文稿。

1. **全面质量评估**：

    ![Image 4](https://mmbiz.qpic.cn/mmbiz_png/dFTfMt01148Xd5kg5XqRIcKpPd3VWlg7ks506gTcxiatolDjZjRn3JmUazrOTnbjD50PqMyhpfS4sYmkhXxknuQ/640?wx_fmt=png&from=appmsg#imgIndex=6)

    


    内置的 PPTEval 框架从内容准确性、设计美观度和逻辑连贯性三个维度对生成的 PPT 进行评估，帮助我们持续优化。

项目还提供了丰富的案例，比如基于 iPhone 16 Pro 官网内容和 Anthropic 的研究论文生成的演示文稿，效果都相当惊艳。

## 技术架构深度解析

理解 PPTAgent 的架构，我们可以从它的工作流程入手。下面给大家分享一下我基于它的开源项目总结的架构层级模式：

```Plain Text
PPTAgent技术架构
├── 核心工作流
│   ├── 分析阶段（Induct）
│   │   ├── 参考PPT解析（presentation模块）
│   │   │   ├── 布局结构提取
│   │   │   ├── 内容组织模式识别
│   │   │   └── 视觉元素分布分析
│   │   └── 模式库构建
│   │       ├── 幻灯片模板分类（slide_induction.json）
│   │       ├── 布局模式抽象（如"单中心热图+横向要点"）
│   │       └── 设计风格特征提取
│   └── 生成阶段（PPTGen）
│       ├── 输入文档处理（document模块）
│       │   ├── Markdown/PDF内容解析
│       │   ├── 关键信息提取
│       │   └── 内容结构化重组
│       ├── 幻灯片生成
│       │   ├── 大纲构建（基于金字塔原则）
│       │   ├── 布局匹配（参考模式库）
│       │   ├── 图文融合（image_generation工具）
│       │   └── 样式统一（Design角色定义规范）
│       └── 质量评估（PPTEval框架）
│           ├── 内容准确性校验
│           ├── 设计美观度评分
│           └── 逻辑连贯性检查
├── 核心模块
│   ├── 主体控制（agent.py）
│   │   ├── 多角色协同调度（Research/Design等角色）
│   │   ├── 工具调用管理
│   │   └── 工作流状态维护
│   ├── 语言模型接口（llms.py）
│   │   ├── LLM/AsyncLLM封装
│   │   ├── 多模型适配（GPT-4o/Qwen2.5等）
│   │   └── 长文本处理优化
│   ├── 视觉处理工具
│   │   ├── 图像生成（image_generation）
│   │   ├── 图像标注（image_caption）
│   │   └── 图表识别与转换
│   └── 交互层（pptagent_ui）
│       ├── 前端界面（src目录）
│       ├── 后端服务（backend.py）
│       └── 进度展示与结果下载
└── 支撑系统
    ├── 模板系统
    │   ├── 预设模板（cip/hit/default等）
    │   ├── 动态模板生成规则
    │   └── 样式配置（配色/字体/栅格）
    ├── 工具链
    │   ├── 文档分析（document_analyze）
    │   ├── 幻灯片检查（inspect_slide）
    │   └── 最终导出（finalize）
    └── 依赖环境
        ├── 容器化部署（Docker）
        ├── Web框架（FastAPI/Uvicorn）
        └── 文档处理库（python-pptx/Pillow等）
```

### 整体流程如下：

PPTAgent 采用两阶段工作模式：

1. **分析阶段（Induct）**：

2. 

    - 解析参考 PPT 文件，提取布局结构

    - 分析内容组织方式和视觉元素分布

    - 建立幻灯片生成的模式库

1. **生成阶段（PPTGen）**：

2. 

    - 解析输入文档，提取关键信息

    - 根据分析阶段得到的模式，构建幻灯片大纲

    - 生成符合风格的幻灯片内容和布局

### 核心模块

从项目结构来看，主要包含这些关键部分：

- **presentation**

    负责解析 PowerPoint 文件

- **document**

    处理输入的 markdown 文档

- **agent.py**

    定义核心代理类，协调各模块工作

- **llms.py**

    封装了 LLM 和 AsyncLLM 接口，处理语言模型交互

- **induct.py**

    实现第一阶段的演示文稿分析功能

- **pptgen.py**

    实现第二阶段的演示文稿生成功能

- **pptagent_ui**

    提供 Web 界面，方便用户操作

### PPTEval 评估框架

评估部分同样值得关注，它从三个维度进行打分：

- **内容（Content）**

    检查幻灯片内容的准确性和相关性

- **设计（Design）**

    评估视觉吸引力和风格一致性

- **连贯性（Coherence）**

    确保整体逻辑流畅，观点衔接自然

## 核心技术栈总结

PPTAgent 用到的关键技术和工具我总结如下，供大家参考学习：

|技术类别|具体内容|
|-|-|
|编程语言|Python 3.11+|
|Web 框架|FastAPI, Uvicorn|
|前端技术|NodeJS（前端源码在 src 目录）|
|文档处理|python-pptx, pdf2image, Pillow|
|语言模型|支持 GPT-4.1 等 70B + 参数模型 🦾|
|视觉模型|Qwen2.5-VL-7B-Instruct 等 7B + 参数模型 👀|
|开发工具|pytest, Docker, Git|
|其他依赖|aiohttp, beautifulsoup4, jinja2, PyYAML 等|

> 小贴士：这些技术在很多大型科技公司都是核心栈哦，掌握了不仅能玩转 PPTAgent，还能提升职业竞争力😉

## 应用场景

![Image 5](https://mmbiz.qpic.cn/mmbiz_png/dFTfMt01148Xd5kg5XqRIcKpPd3VWlg7J1nUziaibhMvTkGX2g66VszJ8pPD57GlZp6Qp5uicorbnzhWHHAtSR13A/640?wx_fmt=png&from=appmsg#imgIndex=7)

PPTAgent 的应用场景非常广泛，接下来我总结几类，供大家参考：

- **学术科研**

    将论文自动转化为学术会议演示文稿

- **商业汇报**

    快速将业务报告生成简洁有力的演示材料

- **产品介绍**

    基于产品文档生成产品演示幻灯片

- **教育培训**

    将教案内容转化为教学用 PPT

- **会议演讲**

    为演讲者节省制作演示文稿的时间

特别适合那些经常需要制作 PPT 但又不擅长设计的人群，比如研究员、产品经理、教师等。

## 优缺点复盘（个人观点，仅供参考～）

### 优点

1. 开源免费，可自由定制和二次开发

2. 采用两阶段生成模式，效果更接近专业水准

3. 提供 UI 界面，使用门槛低

4. 支持多种输入格式和自定义模板

5. 包含评估框架，方便优化生成结果

### 缺点

1. 系统要求较高，推荐使用 70B + 参数的 LLM

2. 对硬件配置有一定要求，推荐 CUDA 或 MPS 支持

3. 目前不支持 Windows 系统

4. 复杂幻灯片的解析可能存在局限性

5. 图片生成依赖外部资源，有时不够精准

## 本地部署教程

### Docker 部署（推荐）

1. 拉取镜像

```Plain Text
docker pull forceless/pptagent:latest
```

2. 运行容器

```Plain Text
docker run -dt --gpus all --ipc=host --name pptagent \
  -e OPENAI_API_KEY=$OPENAI_API_KEY \
  -e MINERU_API=$MINERU_API \
  -p 9297:9297 \
  -p 8088:8088 \
  -v $HOME:/root \
  forceless/pptagent
```

3. 查看日志

```Plain Text
docker logs -f pptagent
```

4. 访问 http://localhost:8088 即可使用。

### 本地直接运行

1. 克隆仓库

```Plain Text
git clone https://github.com/icip-cas/PPTAgent.git
cd PPTAgent
```

2. 安装依赖

```Plain Text
pip install -e .[full]
```

3. 启动服务

```Plain Text
python pptagent_ui/backend.py
```

4. 访问 Web 界面开始使用。

> 注意：需要提前安装 Python 3.11+、LibreOffice、Chrome、poppler-utils 等依赖

## 官方 Roadmap 泄密（未经证实，仅供吃瓜）

据小道消息，PPTAgent 团队可能正在开发下面这些功能：

1. 多语言支持增强，特别是对中文排版的优化

2. 移动端适配，支持手机端编辑和预览

3. 更强大的图表生成功能，直接从数据自动生成可视化

4. 团队协作功能，支持多人实时编辑同一 PPT

5. 与主流文档工具（如 Notion、JitWord）的深度集成

如果这些功能真能实现，PPTAgent 的实用性将会再上一个台阶。

AI 技术交流群：

![Image](https://mmbiz.qpic.cn/mmbiz_jpg/dFTfMt01148Xd5kg5XqRIcKpPd3VWlg7q2k6TaWXfEIC59XEql67ZS1iacEvEkzkjhbrTrymZiagzHxPxtXkYAwg/640?wx_fmt=jpeg&from=appmsg#imgIndex=8)

## 总结

PPTAgent 作为一个开源的 AI 演示文稿生成工具，不仅解决了我们制作 PPT 时的诸多痛点，其技术实现也颇具参考价值。它采用的两阶段生成模式和多维度评估框架，为 AI 辅助内容创作提供了新的思路。

对于普通用户来说，它能节省大量制作演示文稿的时间；

对于开发者而言，它的代码结构和实现方式值得学习借鉴。

无论我们是 PPT 制作的 "困难户"，还是对 AI 内容生成感兴趣的技术爱好者，这个项目都值得一试。

如果大家也被 PPT 制作困扰过，不妨试试 PPTAgent，让 AI 为我们分担这份工作吧！

关于架构专栏

![图片 1](https://mmbiz.qpic.cn/mmbiz_png/dFTfMt01149F1IDSuCHN8VedIxjpw6leMsE7pvb1ZvWRHRAtjODAAE3st9k2T845ic0yh4XvvibqOeuv641ACicLw/640?wx_fmt=png&from=appmsg&wxfrom=5&wx_lazy=1&tp=webp#imgIndex=10)

我的架构专栏计划写60期，会从源码级技术方案到产品商业化设计，再到商业化运营，包含了我近8年的技术研发和AI实践，也希望和更多优秀的人一起交流，学习，成长。

如果大家有更好的AI 开源项目，有好的建议，也欢迎留言交流～

