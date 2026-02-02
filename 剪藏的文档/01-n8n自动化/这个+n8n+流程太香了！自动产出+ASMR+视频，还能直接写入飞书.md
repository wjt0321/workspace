---

title: 这个 n8n 流程太香了！自动产出 ASMR 视频，还能直接写入飞书
date: 2025-11-08
tags: ["n8n", "工作流", "自动化", "飞书", "视频", "短视频", "YouTube", "工作流自动化"]
category: 自动化工具
---


# 这个 n8n 流程太香了！自动产出 ASMR 视频，还能直接写入飞书

Original 流星 [流星自动化](javascript:void(0);)*2025年11月8日 20:31* *上海*

今天我们学习新的节点： **Basic LLM Chain** 、**DeepSeek Chat Model**、**StructuredOutput Parser**

![Image](https://mmbiz.qpic.cn/mmbiz_png/0SDKHiarmmYW0pibIT781X7D1oV9LXfD7oQAVy87iaMKP8g2ibc4qib0icibESYCiakwMVKN21v64AA7zrqqYVj1WL1ibvw/640?wx_fmt=png&from=appmsg#imgIndex=0)

1. DeepSeek Chat Model（大语言模型节点）

这是与 AI 模型交互的核心连接器。它负责将你的请求发送给 DeepSeek 的 API 并取回模型生成的原始结果。

- 功能： 配置与 DeepSeek API 的连接，包括 API 密钥、模型版本、温度等参数。

- 作用：它是 n8n 与云端强大 AI 模型之间的“桥梁”。没有这个节点，n8n 就无法调用 DeepSeek 的能力。

简单来说，这个节点决定了“向谁提问”以及“用什么风格回答问题”。




1. Structured Output Parser（结构化输出解析器） 

    这是让 AI 输出变得自动化友好的关键工具。大语言模型的原始输出是自然语言文本，虽然人能读懂，但机器或后续节点很难精准提取信息。这个节点就是来解决这个问题的。

- 功能：定义一个 JSON Schema（JSON 结构 schema），强制要求 LLM 按照这个指定的格式输出内容。

- 作用：将 LLM 自由格式的文本输出，转换为结构清晰、字段明确的 JSON 数据。这样，后续节点就可以像使用一个标准的 API 接口一样，直接引用 字段名 来获取数据。

例如，在你的 ASMR 案例中，你可能定义了如下的 Schema：

```Plain Text
{
  "type": "object",
  "properties": {
    "video_title": { "type": "string" },
    "video_scene": { "type": "string" },
    "asmr_sounds": { "type": "string" },
    "target_audience": { "type": "string" }
  },
  "required": ["video_title", "video_scene", "asmr_sounds"]
}
```

简单来说，这个节点决定了“答案应该长什么样”，它让凌乱的文本回答变成了整齐的数据表格。




1. Basic LLM Chain（基础 LLM 链） 这是组织和执行整个 AI 任务的协调器。

    它本身不直接连接 API，也不解析输出，但它将上述两个节点和你的指令（Prompt）串联起来，形成一个完整的 AI 处理单元。

- 功能：接收输入变量、组装提示词（Prompt）、调用配置好的 LLM 模型、并可选地使用解析器处理输出。

- 作用：它是 AI 任务的“大脑”或“控制器”，定义了要执行的具体任务内容。

简单来说，这个节点决定了“要问什么具体问题”，并把所有部件组装起来去执行任务。




这节课，我们将系统性的讲解如何使用大语言模型（LLM）来赋能你的工作流，让你的 n8n 流程更智能，如何阅读。

## 生成ASMR解压视频

从进阶篇开始，每次案例都展示的是一个完整的工作流。公众号上分享的内容不会详细，详细内容在学习群内部查看。

- 目标

生成ASMR视频并且写入飞书文档

- 整体流程

![Image 1](https://mmbiz.qpic.cn/mmbiz_png/0SDKHiarmmYW0pibIT781X7D1oV9LXfD7oUg3kx07qmBMjibyKJfVSnH5wra3vARBEJKp2HbPo3P0gWAZTPbibW7yw/640?wx_fmt=png&from=appmsg#imgIndex=1)

- 步骤

1. 触发器：Manual Trigger

2. LLM语言大模型生成提示词：Basic LLM Chain ( DeepSeek Chat Model +Structured Output Parser )

3. HTTP Request（调用Kie API生成视频）

4. Wait：等待5秒

5. HTTP Request 2（调用Kie API查询视频状态）

6. IF ：判断状态是否生成，没有生成回到第4步

7. Date & Time：获取当前时间

8. 飞书多维表格：入库

- 入库截图

![Image 2](https://mmbiz.qpic.cn/mmbiz_png/0SDKHiarmmYW0pibIT781X7D1oV9LXfD7oWYZUHgfMFvhYmZuliak1JIic2PZ4Wv9sXZibicKDxeJko88jWW0hefQSCw/640?wx_fmt=png&from=appmsg#imgIndex=2)

- 生成的视频




最终效果： https://tempfile.aiquickdraw.com/v/a76c44affc7f9257615411ca732ce5e4_1762598900.mp4

朋友，我创建了 【从0教你n8n的学习群】，点击下方公众号名片，添加好友，备注“学习n8n”。




