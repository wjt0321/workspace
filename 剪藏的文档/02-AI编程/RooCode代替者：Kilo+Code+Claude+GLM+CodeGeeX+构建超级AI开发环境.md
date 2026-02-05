---

title: RooCode代替者：Kilo Code+Claude+GLM+CodeGeeX 构建超级AI开发环境
date: 2025-10-21
tags: ["claude", "Claude", "AI", "人工智能", "智能体", "Agent", "AI编程", "代码助手"]
category: AI编程
---


# RooCode代替者：Kilo Code+Claude+GLM+CodeGeeX 构建超级AI开发环境

Original 黑夜路人 [黑夜路人技术](javascript:void(0);)*2025年10月21日 08:01* *北京*



在小说阅读器中沉浸阅读

作者：黑夜路人

时间：2025年10月

目标

本文会告诉你如何使用 RooCode/Cline 的优秀替代品 Kilo Code的安装使用，让 Kilo Code 取代 Cursor / RooCode 等 Code Agent 产品。

同时也会告诉你如何使用 Kilo Code（核心Code Agent） + CodeGeeX（自动补全） + OpenRouter（使用Claude/Gemini） + GLM-4.6（国内快速模型） 结合的良好执行效果。

Kilo Code 介绍

Kilo Code （注意不是Kiro）是由 JP Posma 等人在旧金山与阿姆斯特丹为中心组建的 Remote-First 团队运营。

Kilo Code 它的设计理念之一，是让 AI 接手编程中那些重复而琐碎的环节。比如依赖管理、bug 定位、文档更新、测试用例维护、类型检查和翻译文件修改等，都可以交由 agent 自动完成。

Kilo Code始于Roo Code的分支，而Roo Code本身是Cline的分支——这两个是增长最快、最受欢迎的开源Cursor替代品。我们正在构建两者的超集：包含它们的所有功能，再加上自己的特色。

OpenRouter 的2025年9月三方APP调用排行榜，Kilo Code 排在第一：

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/ibBPzzwQ3qZUsz1zbmYh0OPRKNZUJaRTfjTxuYape4hiaE1dNRuazibvxW6X95bmXOelXd5bKQ2FDJT2RroJ1quYg/640?from=appmsg&watermark=1#imgIndex=0)

数据不会说谎，API调用都是真金白银，只有好的工具才能排在前面，群众优选。

Cline、Roo Code 和 Kilo Code 继承关系和演进时间线：

![Image 1](https://mmbiz.qpic.cn/sz_mmbiz_png/ibBPzzwQ3qZUsz1zbmYh0OPRKNZUJaRTf6LgicD6dga83ictOaqlW2KMwlshCnTdM8UBBhicTHF2fGOEQpWSLvNSjw/640?from=appmsg&watermark=1#imgIndex=1)

Kilo Code横空出世，完美融合Cline和Roo Code所有优势，彻底解决卡死bug，支持5种智能模式，20美金免费额度，自动触发上下文压缩、智能任务分解、实时代码解释，编程效率大幅提升！

Kilo 特性

Kilo Code适应你的需求，提供专门的模式：代码模式用于通用编程任务，架构师模式用于规划和技术领导，询问模式用于回答问题和提供信息，调试模式用于系统性问题诊断。

你甚至可以创建无限的专门角色，用于安全审计、性能优化、文档编写或任何其他任务！这简直就是一个编程界的"变形金刚"。

Kilo Code有多种编程模式可以使用，Architect 负责架构设计，Code 负责写代码，Debug 负责查错修复。

比较高级的在 Orchestrator 模式里，复杂项目会被自动拆解成一步步可执行的小任务，然后分配给不同的 agent 来完成。

Kilo Code 具备如下特点：

- 具备RooCode所有特性，青出于蓝胜于蓝；

- 保留完整上下文，智能上下文压缩；

- 可以选择单块代码进行加入task进行优化重写或fix bug（体验非常舒服）；

- 输入自然语言，能够生成块状的代码（非常爽）

- Orchestrator 管家模式能智能任务分解，也能够与Spec-kit或者spec-workflow MCP进行结合，进行开发任务规划拆解开发；

- 内置了类似于OpenRouter的大模型代理（Kilo Code），可以访问Claude/Gemini/GPT等模型，价格比OpenRouter便宜5%，并且内置的Z-AI可以直接访问GLM-4.6模型。；

- 具备代码自动提示和补全；

- 自动文档查找，再配合 Context7更完整；

- 自带MCP Server应用市场，各个常用MCP服务一键安装；

![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/ibBPzzwQ3qZUsz1zbmYh0OPRKNZUJaRTfLxT0lMcMpBOhKHZj8vzialBvVV0KsbUerCSMEcYerGm8EdWusj4hYqQ/640?from=appmsg&watermark=1#imgIndex=2)

![Image 2](https://mmbiz.qpic.cn/sz_mmbiz_png/ibBPzzwQ3qZUsz1zbmYh0OPRKNZUJaRTfhozGica5IBO2Uv2rDPZpS8PibWIBbZiahClp0GeDXVvQOia817OjKpvQWw/640?from=appmsg&watermark=1#imgIndex=3)

主要特性：

- AI 驱动的代码生成：输入自然语言描述，自动生成代码。

![Image 3](https://mmbiz.qpic.cn/sz_mmbiz_png/ibBPzzwQ3qZUsz1zbmYh0OPRKNZUJaRTfPTubjIE397fHOu0v15KOE1icOPHLcDCNvCDSGTwDzza0jHBmyic2d8pQ/640?from=appmsg&watermark=1#imgIndex=4)

![Image 4](https://mmbiz.qpic.cn/sz_mmbiz_png/ibBPzzwQ3qZUsz1zbmYh0OPRKNZUJaRTfF0arO0LeuGPL3bmKGGiblH1YPqdboYtGCIfUBCZLwG3bHCibf09Fn3ew/640?from=appmsg&watermark=1#imgIndex=5)

- 自动化重构：分析并优化现有代码，提升质量。

![Image 5](https://mmbiz.qpic.cn/sz_mmbiz_png/ibBPzzwQ3qZUsz1zbmYh0OPRKNZUJaRTfsjm5G5dLsFTkfxttDoMlYuF0sACDP9cnc7hVIj69TWkMgum464ZaSw/640?from=appmsg&watermark=1#imgIndex=6)

- 智能代码补全：根据上下文提供实时建议。

- 任务自动化：处理重复性任务，比如批量修改或格式化。

- Claude 4.5 支持：可以使用 Anthropic 的 AI 模型，提供更精准的代码分析。

- 三方大模型API支持：也可以支持各种三方代理的大模型API

-  强大的工具箱：Kilo Code配备了丰富的工具集

- 

    - 文件操作：读写项目文件，轻松管理代码库

    - 命令执行：在VS Code终端中执行命令

    - 浏览器控制：自动化web测试和操作

    - 代码搜索：智能搜索代码库中的内容

    - 实时问答：随时提出编程相关问题

- 智能错误检测与修复：过去需要告诉AI它自己创建的错误。Kilo会自动检测错误，运行测试套件并在失败时自动恢复。这意味着什么？意味着你再也不用为AI犯的错误买单了。

- 自动文档查找：厌倦了AI工具虚构不存在的库API吗？Kilo会自动查找库文档，确保它遵循最佳实践。这就像给AI装上了"火眼金睛"，再也不会被虚假信息误导。

![Image 6](https://mmbiz.qpic.cn/sz_mmbiz_png/ibBPzzwQ3qZU2uqngzgWcBs87jyfSOj5GNh8MRztuKljuhUtF6gbdHLAT4phsOKDVJ9gyuEkaoicWV9N73kbkJBw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=7)

- 其他特性

- 

    - 完美解决Cline卡死和任务中断问题

    - 支持 MCP 市场，轻松扩展功能

    - 智能上下文压缩，告别手动设置烦恼

    - 五大专业模式：Code/Ask/Debug/Architect/Orchestrator

支持的IDE（支持 VSCode/JetBrains）

![Image 7](https://mmbiz.qpic.cn/sz_mmbiz_png/ibBPzzwQ3qZUsz1zbmYh0OPRKNZUJaRTftoUsqY8bibAfOze3zKFUOWTYqMwI6Mvd2ALUAaYqtET5TUvlrkhg6iaw/640?from=appmsg&watermark=1#imgIndex=8)

Goland 安装 （Android Studio / WebStorm 也可以直接安装）

![Image 8](https://mmbiz.qpic.cn/sz_mmbiz_png/ibBPzzwQ3qZUsz1zbmYh0OPRKNZUJaRTfZhrwxxNwnYAibWNZjcdFaKRxqttl9KZlDRvtb9B43LCjx8yMquwKU7g/640?from=appmsg&watermark=1#imgIndex=9)

Kilo Code 与 Claude Code 对比

现在 Claude code 很火，也确实厉害，绑定 Claude 模型非常无敌，并且有 Subagent 这些强大功能，但是它归根结底得用终端去写代码，CC 会存在这么几个问题：

1. 成本和稳定性： Token 消耗很快，长期成本是个问题。另外，依赖外部大模型，我们需要考虑其政策变动和服务中断的风险（国内很容易被封）。

2. 纠错成本高：这类工具追求“一步到位”，但如果方向错了，我们去修正 AI 生成的大量代码，付出的时间和精力非常的多。

3. 操作灵活性不足：终端交互是线性的，不像在 IDE 里可以随时修改和重试。一旦 Prompt 没给对，很难中途调整，只能推倒重来。

4. 过程黑盒：太依赖最终结果，容易让我们失去对代码的掌控感。长此以往，可能会产生难以维护的代码，也不利于我们自身对系统复杂度的理解。

我们可能需要一种更注重过程透明度和开发者控制权的工具，比如像 Kilo Code 提倡的模式：让 AI 作为助手，辅助我们完成每一步，同时确保我们能理解和审核它的工作。这样，既利用了 AI 的效率，又保证了工程质量和我们团队的持续成长。

安装 Kilo Code

在VSCode中安装（其他从VSCode中clone实现的IDE方法类似，或者是在 Cursor / Windsurf / Trae 中等操作使用是类似的，从VSCode中导出VSX插件后导入 ）

安装代码补全插件 CodeGeeX

如果需要额外的代码提示自动补全的插件，可以使用 CodeGeeX （智谱AI的产品），体验不错（还免费）。

（当然，如果你使用Cursor会自带自动补全，如果你安装了 Augment 插件，也是具备非常优秀的自动补全能力的）

搜索 CodeGeeX 插件后安装：

![Image 9](https://mmbiz.qpic.cn/sz_mmbiz_png/ibBPzzwQ3qZUsz1zbmYh0OPRKNZUJaRTfeQgBPjdrjFwRXILH7HWm3MGx5mLGn4wdmPBz7zR9KliaRugicoicvrbow/640?from=appmsg&watermark=1#imgIndex=10)

登录CodeGeeX（跳转到智谱AI官网登录，可以使用手机号或者是Gmail账号登）：

![Image 10](https://mmbiz.qpic.cn/sz_mmbiz_png/ibBPzzwQ3qZUsz1zbmYh0OPRKNZUJaRTfYwUGGO8c8liavxIREPmZIJ5fLuIaT3WhuvVmTo433vDTvEYq7C4bPdw/640?from=appmsg&watermark=1#imgIndex=11)

![Image 11](https://mmbiz.qpic.cn/sz_mmbiz_png/ibBPzzwQ3qZUsz1zbmYh0OPRKNZUJaRTfVicwBawYhpZ3uibhyodak5ugkGXiboPkicILZantvtbZkGp5AVl4PnT5Gg/640?from=appmsg&watermark=1#imgIndex=12)

登录后就可以使用了：

![Image 12](https://mmbiz.qpic.cn/sz_mmbiz_png/ibBPzzwQ3qZUsz1zbmYh0OPRKNZUJaRTfotqFMut5cUeGFFXdntr9n2JNZ54c0rqRdHYkUAAkQCpb5b4SP10DyQ/640?from=appmsg&watermark=1#imgIndex=13)

在每个代码下面是可以直接按 Tab 键出代码补全提示（速度非常快）

![Image 13](https://mmbiz.qpic.cn/sz_mmbiz_png/ibBPzzwQ3qZUsz1zbmYh0OPRKNZUJaRTfZxby2gqEN1aaCE3JibJTyY85LnyFdamOvwQEFRN2kQaCYjSUdm40xmg/640?from=appmsg&watermark=1#imgIndex=14)

它默认使用的是GLM-4.6模型，执行速度非常快：

![Image 14](https://mmbiz.qpic.cn/sz_mmbiz_png/ibBPzzwQ3qZUsz1zbmYh0OPRKNZUJaRTf9O1z7QnzLA7Nb3ZfmlMvuNIC1KRVjGWDNYFaQu2u0GibTNVZ87N62oQ/640?from=appmsg&watermark=1#imgIndex=15)

安装Kilo Code

搜索 ：Kilo ，然后安装：

![Image 15](https://mmbiz.qpic.cn/sz_mmbiz_png/ibBPzzwQ3qZUsz1zbmYh0OPRKNZUJaRTfknc5IN5mysASFmFfgmsxFH7wp3mD7pImfBo1SIkzdOEnQtibCv9OhFQ/640?from=appmsg&watermark=1#imgIndex=16)

打开后点击使用API（可以使用各种优秀大模型）

![Image 16](https://mmbiz.qpic.cn/sz_mmbiz_png/ibBPzzwQ3qZUsz1zbmYh0OPRKNZUJaRTfXxib9IqElEsjXM3ncOKXfP28ibCYzjR8wiaLLY1GH4RtCoJ5EMFHc1Ejw/640?from=appmsg&watermark=1#imgIndex=17)

方式一：使用 OpenRouter 访问大模型（访问 Claude/Gemini/GPT 模型）

可以使用OpenRouter体系（其他支持OpenAI 模型API协议的都可以），填写界面大概如下：

![Image 17](https://mmbiz.qpic.cn/sz_mmbiz_png/ibBPzzwQ3qZUsz1zbmYh0OPRKNZUJaRTf3UIyK6ibAMrTLhXsBQiahsMZwMMjVAnc1aibduS4ZDqpzJ7AnvkU9YV0Q/640?from=appmsg&watermark=1#imgIndex=18)

方式二：使用GLM-4.6模型

去智谱官方注册：https://www.bigmodel.cn/claude-code?ic=WS3SRXPKF0 （使用注册码可以优惠10%的金额）

注册完成之后在我的中获取对应的api key：

![Image 18](https://mmbiz.qpic.cn/sz_mmbiz_png/ibBPzzwQ3qZUsz1zbmYh0OPRKNZUJaRTfNxxOIOYf5kWrichicI0PV8GtJZc7ZyErbW4fL4ib2UP2l8OrfH7oKCc4A/640?from=appmsg&watermark=1#imgIndex=19)

然后在 Kilo Code 中填入对应的GLM的API Key，填写信息：

```Plain Text
API 提供商：选择 OpenAI Compatible
OpenAI 基础 URL：输入 https://open.bigmodel.cn/api/coding/paas/v4
API Key：填入您的智谱 API Key
模型名称：输入 glm-4.6，并选择 使用自定义
```

填写示例如下：

![Image 19](https://mmbiz.qpic.cn/sz_mmbiz_png/ibBPzzwQ3qZUsz1zbmYh0OPRKNZUJaRTfR3ztqHcv7TuYtLaGlPRw0yPxkGQFNI0y0Nj84KuI03GIpUBhMTe1mQ/640?from=appmsg&watermark=1#imgIndex=20)

简单交互

开始以后就可以选择模式，能够查看对应的模型：

![Image 20](https://mmbiz.qpic.cn/sz_mmbiz_png/ibBPzzwQ3qZUsz1zbmYh0OPRKNZUJaRTfh0FX4zh1DLBPpH0C2trY9qMSbzwwN7wicVoAmic90H24ZWckMn2cG3dg/640?from=appmsg&watermark=1#imgIndex=21)

简单交互就会有提示（看看使用GLM-4.6 和 Claude 4.5 的交互场景）

![Image 21](https://mmbiz.qpic.cn/sz_mmbiz_png/ibBPzzwQ3qZUsz1zbmYh0OPRKNZUJaRTfRzcmatN3tB1Srh7xbsNEgHjc2YP9kXqMuwfMlbGZyqq3BRjw9Ouiacg/640?from=appmsg&watermark=1#imgIndex=22)

![Image 22](https://mmbiz.qpic.cn/sz_mmbiz_png/ibBPzzwQ3qZUsz1zbmYh0OPRKNZUJaRTf8YE3FQkTsmdvKCJHPkibS0rfEtrZKic2eoyU2toEiaw4BStuBUXHWpZiag/640?from=appmsg&watermark=1#imgIndex=23)

我们看在一个真实项目中改代码的场景，交互还是非常流畅舒服的：

![Image 1](https://mmbiz.qpic.cn/sz_mmbiz_jpg/ibBPzzwQ3qZUsz1zbmYh0OPRKNZUJaRTfia646SyiaDl3f4Wq54n9CNnxPXWuCPXvHnCBwa6B7uNhLWLF1PZRfN0g/640?from=appmsg&watermark=1#imgIndex=24)

也可以让它帮助你快速搭建环境：（它会想的很细致）

![Image 23](https://mmbiz.qpic.cn/sz_mmbiz_png/ibBPzzwQ3qZUsz1zbmYh0OPRKNZUJaRTfwCVjOpicwopib7TwvWcHnib1I0psHYNXByRKvwjfmey4icONpEqNfSkQOg/640?from=appmsg&watermark=1#imgIndex=25)

Kilo Code 模式说明

使用技巧建议：

先用架构模式设计，然后人肉检查，再用code模式撸码，效果要比code模式直接一把梭好的多。

Kilo Code 这几种模式的区别和说明：

||||||
|-|-|-|-|-|
|模式|图标|英文名称|用途说明|适用场景|
|架构师模式|⚒️|Architect|在实施之前进行规划和设计|需要先构思项目架构、设计系统结构、制定技术方案时使用|
|代码模式|</>|Code|编写、修改和重构代码|直接编写代码、修改现有代码、优化代码结构时使用（当前已选中）|
|问答模式|❓|Ask|获取答案和解释说明|询问技术问题、寻求概念解释、获取使用建议时使用|
|调试模式|🐞|Debug|诊断和修复软件问题|排查程序错误、分析bug原因、修复代码缺陷时使用|
|编排者模式 / 管家模式|▶️|Orchestrator|跨多个模式协调任务|需要组合使用多种模式完成复杂任务、自动切换不同工作流程时使用|

快捷键提示：

- Ctrl + . - 切换到下一个模式

- Ctrl + Shift + . - 切换到上一个模式

使用建议：

- 开发新项目 → 先用 Architect 规划，再用 Code 实现

- 解决问题 → 用 Ask 了解方案，用 Debug 定位问题，用 Code 修复

- 复杂任务 → 用 Orchestrator 自动协调各模式完成

Kilo Code 模式详细说明

Kilo Code 提供多种专业模式，灵活适配您的需求：

![Image 24](https://mmbiz.qpic.cn/sz_mmbiz_png/ibBPzzwQ3qZUsz1zbmYh0OPRKNZUJaRTfSrSj3VyWWmts3ZvsDvhhCGja4HEL4OXkx1X9UaOlMXGC2hod4nSdew/640?from=appmsg&watermark=1#imgIndex=26)

🔧 代码模式（Code） - 通用型编程任务解决方案

|||
|-|-|
|项目|详情|
|描述|资深软件工程师，精通编程语言、设计模式与最佳实践|
|工具权限|完整权限: 读取、编辑、浏览器、命令行、多协作平台（MCP）|
|适用场景|代码编写、功能实现、调试及常规开发任务|
|特色功能|无工具限制——为所有编码任务提供完全灵活性|

🏗️ 架构师模式 -  技术规划与系统设计专家

|||
|-|-|
|项目|详情|
|描述|擅长系统设计与实施方案制定的技术领导者|
|工具权限|读取、浏览器、多协作平台（MCP）及受限编辑权限（仅限Markdown文件）|
|适用场景|系统设计、高层规划与架构讨论|
|特色功能|采用从信息收集到详细规划的结构化流程|

🤔 问答模式（Ask）-  专业技术咨询与知识解答

|||
|-|-|
|项目|详情|
|描述|专注于解答疑问、提供解释与使用建议的互动助手|
|工具权限|具备信息检索、知识整合与简洁回复的基础权限|
|适用场景|询问技术问题、寻求概念解释、获取工具或模式使用建议等场景|
|特色功能|能快速匹配问题与知识储备，给出清晰易懂的答案与指导|

🐞 调试模式 - 系统性故障诊断专家(Debug解决问题)

|||
|-|-|
|项目|详情|
|描述|专精系统性故障排查的诊断专家|
|工具权限|完整权限：读取、编辑、浏览器、命令行、多协作平台（MCP）|
|适用场景|追踪漏洞、诊断错误及解决复杂问题|
|特色功能|采用"分析-缩小范围-修复问题"的严谨方法论|

🔧 协调者模式 - 综合调度专家 （管家模式)

|||
|-|-|
|项目|详情|
|描述|通过任务分派协调复杂工作流的战略指挥者|
|工具权限|仅限创建新任务和协调工作流的有限权限|
|适用场景|将复杂项目拆解为可管理子任务并分派至专项模式|
|特色功能|通过new_task工具将工作委派给其他模式|

✨ 自定义模式 -  可无限扩展的专属场景方案

 • 安全审计

 • 性能优化

 • 文档编写

 • 及其他任意定制化任务

![Image 25](https://mmbiz.qpic.cn/sz_mmbiz_png/ibBPzzwQ3qZUsz1zbmYh0OPRKNZUJaRTftk0kMZQ3s4EOCzWs5NWFqaECYdkYmtcHVLZUYsLzjWJHyk3ibZgHb7g/640?from=appmsg&watermark=1#imgIndex=27)

Kilo Code 的 Rule 配置

自定义规则概述

自定义规则是定义项目专属AI行为约束的强大工具，可确保：

 ✅ 统一代码格式化标准

 🔒 限制敏感文件访问

 📐 强制执行编码规范

 🎯 定制AI行为满足项目需求

规则存放位置（参考结构）

```Plain Text
project/
├── .kilocode/
│   ├── rules/
│   │   ├── formatting.md
│   │   ├── restricted_files.md
│   │   └── naming_conventions.md
├── src/
└── ...
```

规则加载优先级

1. 通用规则加载顺序：

• 首选 .kilocode/rules/ 目录

• 次选根目录下（兼容旧版）：.roorules → .clinerules → .kilocoderules

1. 模式专属规则：

• 优先加载 .kilocode/rules-${模式名}/ 目录

• 次选 .kilocoderules-${模式名} 文件

💡 强烈建议使用目录结构

规则编写规范

```Plain Text
# 使用Markdown语法编写（推荐）
## 章节标题
- 列表形式声明规则
- 每条规则单独成项

`代码块`展示示例：
‍‍```python
def 规范示例():
    print("使用4空格缩进")
```

典型规则示例

🔧 代码风格

```Plain Text
# 代码格式化
- 严格使用4空格缩进
- 变量命名采用小驼峰式
- 所有新函数必须包含单元测试
```

🔐 安全限制

```Plain Text
# Restricted files
Files in the list contain sensitive data, they MUST NOT be read
- supersecrets.txt
- credentials.json
- .env


# 受限文件
列表中的文件包含敏感数据，**严禁读取**：
- supersecrets.txt（超级机密文件）
- credentials.json（凭证文件）
- .env（环境变量配置文件）
```

📝 文档规范

```Plain Text
# API文档要求
- 每个导出函数需包含JSDoc注释
- 必须包含@param和@return说明
```

最佳实践

1. 团队协作：将规则文件纳入版本控制，确保团队统一

2. 规则设计：

- • 每条规则保持原子性

- • 相同类型规则集中管理

- • 复杂规则需配示例说明

1. 版本迭代：随项目演进定期更新规则

故障排查 - 规则未生效时检查：

1. 文件是否存放在支持的位置

2. Markdown语法是否正确

3. 规则表述是否无歧义

4. 重启IDE加载最新规则

Kilo Code 使用中的 Prompt（提示词工程）

提示词工程是一门为 AI 模型（如 Kilo Code）设计高效指令的艺术。精心编写的提示词能带来更优质的结果、减少错误，并提升工作效率。

核心原则

||||
|-|-|-|
|核心原则|说明|示例|
|✅ 清晰明确|避免模糊表述，明确任务目标。|✖ 差示例：“修复代码”✔ 好示例：“修复 calculateTotal 函数中导致返回错误结果的 bug”|
|✅ 提供上下文|使用 @上下文引用 指定文件、目录或问题。|✔ 好示例：@/src/utils.ts 将 calculateTotal 函数重构为使用 async/await|
|✅ 任务拆解|将复杂任务分解为小而明确的步骤。|-|
|✅ 提供示例|若需特定代码风格或模式，请给出参考示例。|-|
|✅ 指定输出格式|如需特定格式（如 JSON、Markdown），请在提示词中说明。|-|
|✅ 迭代优化|若初次结果不理想，可调整提示词再次尝试。|-|

六项核心原则，分别是清晰明确、提供上下文、任务拆解、提供示例、指定输出格式、迭代优化。清晰明确需避免模糊表述、提供上下文需用 @引用指定内容等，为规范任务描述、提升执行准确性提供了明确指引。

"思考-执行" 流程

建议引导 Kilo Code 分阶段完成任务：

 分析：让 AI 分析当前代码、识别问题或规划方案。

 规划：要求 AI 列出任务执行步骤。

 执行：逐步实施计划中的每一步。

 审查：在继续前仔细检查每一步的结果。

自定义指令

可通过两种方式定制 Kilo Code 行为：

 🔹 全局指令：适用于所有模式

 🔹 模式专属指令：仅针对特定模式（如代码模式、架构师模式等）

 自定义指令用途：

1. 强制代码风格规范

2. 指定首选库或框架

3. 定义项目特定约定

4. 调整 AI 语气或交互风格

处理模糊指令

若提示词含糊或信息不足，Kilo Code 可能：

 ⚠ 自行假设：按最佳猜测执行，结果可能不符预期

 ⚠ 追问澄清：使用 ask_followup_question 工具请求补充说明

 建议：尽量从开始就提供清晰、具体的指令，避免无效来回沟通。

反馈机制

若结果不理想，可通过以下方式优化：

 🛑 拒绝操作：点击 “拒绝” 按钮并说明原因，帮助 AI 学习

 ✍ 重述需求：用更具体的指令重新表述任务

 🛠 手动修正：直接修改代码后再接受变更

示例对比

|||
|-|-|
|✅ 优质提示词|❌ 劣质提示词|
|@/src/components/Button.tsx 将 Button 组件从 useReducer 重构为 useState|“修复按钮”|
|创建 utils.py 文件，添加计算列表平均值的 calculate_average 函数|“写点 Python 代码”|
|@problems 修复当前文件中的所有错误和警告|“全部修好”|

---

【想要讨论AI编程和AI技术加群】

![Image 26](https://mmbiz.qpic.cn/sz_mmbiz_png/ibBPzzwQ3qZUsz1zbmYh0OPRKNZUJaRTfGLVHgTCVnlB1OKlv7EcjOGnMRxIvVGXJCb1baDXesaoFg49bpf9mhQ/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=3)

