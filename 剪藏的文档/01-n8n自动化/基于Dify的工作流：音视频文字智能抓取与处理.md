---

title: 基于Dify的工作流：音视频文字智能抓取与处理
date: 2025-09-10
tags: ["dify", "Dify", "视频", "短视频", "YouTube", "n8n", "工作流自动化"]
category: 自动化工具
---


# 基于Dify的工作流：音视频文字智能抓取与处理

北京IT川哥 [和川哥一起学AI](javascript:void(0);)*2025年09月10日 18:26* *北京*

基于Dify的工作流：音视频文字智能抓取与处理




场景与用途介绍

本工作流基于Dify平台构建，专为高效处理音视频内容而设计。它能够自动抓取音视频中的文字信息，并将其转化为可操作、可搜索的文本数据。该方案极大地简化了内容创作、在线教育、企业会议、媒体分析等领域的后期处理流程。例如，教育机构可快速为录播课生成精准字幕与讲义；企业可将冗长的会议录音自动总结为简洁的纪要，提升信息流转效率；媒体团队则能对海量访谈素材进行快速检索和关键信息提取，加速内容生产。本方案不仅提升了信息处理的自动化程度，更为知识管理和数据挖掘提供了坚实基础。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/wg4dHDgPvZYljaZzuiarhk9Ir6iaYj8TicibIsGRzHPV6QZicg7GDCgbWIaFpxicibTltEKAxFpyG4deCx3deAEe7HPuQ/640?wx_fmt=jpeg&from=appmsg&watermark=1#imgIndex=0)




通过Dify，我们无需编写复杂的底层代码，仅通过图形化拖拽和配置，就将多个独立的技术模块（音频处理、ASR、LLM）串联成一个稳定、高效且可复用的AI应用，极大地降低了开发门槛和部署成本。

这里用的工具主要是**FFmpeg， 如果你的Dify环境里没有这个工具，要先下载安装。** 

FFmpeg是一款强大的开源跨平台音视频处理工具集，涵盖编码、解码、转码、流处理等核心功能。它支持几乎所有多媒体格式，通过命令行操作即可完成剪辑、压缩、格式转换等任务，是开发者、媒体从业者必备的底层工具库。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/wg4dHDgPvZYljaZzuiarhk9Ir6iaYj8Ticib9AQaS3ibEG9ud5jNrayXJvL5kC5QKTu8Q5PmAhGXnXDh7VSSRibLIOHw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=1)


****

安装完成后， 我们正式进入Dify制作工作流，以下是详细步骤：

1，在Dify里创建一个工作流，新建一个空白应用，并创建Chatflow

![Image 1](https://mmbiz.qpic.cn/sz_mmbiz_png/wg4dHDgPvZYljaZzuiarhk9Ir6iaYj8TicibVdKXOXrw0gTiayCBicBQKduUZOxDkypzuurJthQJtK5uEW6g880Ka7mQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=2)

![Image 2](https://mmbiz.qpic.cn/sz_mmbiz_png/wg4dHDgPvZYljaZzuiarhk9Ir6iaYj8TicibbRAEiawhYnZMnwKcD2phAfdmy4hUmLshy8LYU9KlnpBcywn5F97hibVA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=3)

### 开始

这个开始节点这里我们有1个参数，这个参数主要是提供用户上传的音视频文件。记得写入变量名称。

![Image 3](https://mmbiz.qpic.cn/sz_mmbiz_png/wg4dHDgPvZYljaZzuiarhk9Ir6iaYj8Ticibqd8kOJxNkY6u9Dmt1rOFTwOaUOw0mYg913fAc42R9Q5jOVO1emR9Tg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=4)

在开始后添加第二步，点开始后方的那个加号，在出现的菜单里选择工具，搜索框里输入ffmpeg，找到这个工具，并添加

![Image 4](https://mmbiz.qpic.cn/sz_mmbiz_png/wg4dHDgPvZYljaZzuiarhk9Ir6iaYj8TicibUaibibW6j2rhQJ6Y4XH71pcYtL8mPicwVGYXLLXWJVjQBicHTMYqBGFKxg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=5)

如果没有安装，这里可以安装

![Image 5](https://mmbiz.qpic.cn/sz_mmbiz_png/wg4dHDgPvZYljaZzuiarhk9Ir6iaYj8TicibBIzKfTnJzFR9fKOFxaEkrC0rcAlh6J5h1O8RmPfxQuWXI5DSia3OHhA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=6)

提取音频

![Image 6](https://mmbiz.qpic.cn/sz_mmbiz_png/wg4dHDgPvZYljaZzuiarhk9Ir6iaYj8Ticibu3M72P0XIQdtS2ibVdZKWicaP7fY71BGzfFJ2kTlht5h5hknlRceQd6g/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=7)




提取音频工具中，有2个参数，我们这块其中第一个参数是获取上面开始节点的视频文件。第二个参数是转换的输出格式，目前提取音频

![Image 7](https://mmbiz.qpic.cn/sz_mmbiz_png/wg4dHDgPvZYljaZzuiarhk9Ir6iaYj8TicibWPgiaFfkqop7lweic1icUWRqytBBs8EhQeMXOBFts8mjNXVl7AnXTib63g/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=8)




### 

### 音频提取输出

我们在工作流添加一个直接回复，这个主要是方便调试。我们需要了解上个流程节点视频转音频文件是否能够生成

![Image 8](https://mmbiz.qpic.cn/sz_mmbiz_png/wg4dHDgPvZYljaZzuiarhk9Ir6iaYj8TicibEBzXJkJYhYPVamiaY4bMpSRzfGV8TAibgV2nWC7VC7ZgiaCiaib7QH0jhhQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=9)

![Image 9](https://mmbiz.qpic.cn/sz_mmbiz_png/wg4dHDgPvZYljaZzuiarhk9Ir6iaYj8Ticibg90LjhqFRLL7S1c9dgVbncpVDKhf2VEU5WxuKuneYdg1MS7uYID91Q/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=10)




### Speech To Text

这里我们用的一个叫做Speech To Text的工具。

第二个模型这里我们选择硅基流动提供的最新的智谱提供的FunAudioLLM/SenseVoiceSmall的模型。

![Image 10](https://mmbiz.qpic.cn/sz_mmbiz_png/wg4dHDgPvZYljaZzuiarhk9Ir6iaYj8TicibQ9XdxHfR2GhWPuuFo4OSr2KY8iaKXsCMaGQGtKBV1YHObzaic5Ps7oNg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=11)

### 音频转文字输出（可选）

这个我们为了方便测试把Speech To Text 输出的音频文件也输出。（这个节点可以不需要，大家可以根据自己需要设置）

![Image 11](https://mmbiz.qpic.cn/sz_mmbiz_png/wg4dHDgPvZYljaZzuiarhk9Ir6iaYj8TicibXrsQj4MrRr6aoUOWV5NYGvGXhYgC57ib4J3A4BgQkCtU5Djia1JqJB2g/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=12)

### 音频转文字总结LLM

这里我们使用大语言模型将音频转文字进行总结归纳，这里我们使用火山引擎提供的qwen3模型。这里关键点就是提示词。

![Image 12](https://mmbiz.qpic.cn/sz_mmbiz_png/wg4dHDgPvZYljaZzuiarhk9Ir6iaYj8TicibknZ380m0zevcicszwRbaGBu5ibicX8kWfRs4SDhQzcJiaryZicibKd9WGXIQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=13)

提示词如下：

# Role: 音视频内容总结专家

## Profile

- 专业领域: 音视频内容分析、文本摘要、内容提炼

- 专长: 从音视频转录文本中提取关键信息并生成简洁明了的总结

- 经验: 10年媒体内容分析经验，5年AI辅助内容处理经验

- 教育背景: 传播学硕士，计算机科学学士

## Skills

- 精通内容关键信息提取和主题识别

- 擅长结构化分析叙事内容和情节发展

- 熟练掌握多种总结技巧（摘要式、要点式、图表式等）

- 能够识别和保留内容中的情感基调和核心观点

- 具备跨领域知识，能够理解各类专业内容

## Goals

- 准确提取音视频内容中的核心信息和关键要点

- 保留原始内容的主要情节和情感基调

- 生成结构清晰、逻辑连贯的内容总结

- 根据不同内容类型（教育、娱乐、新闻等）调整总结风格

- 确保总结内容简洁且信息丰富，便于快速理解

## Constraints

- 总结长度应控制在原始内容的10-20%之间

- 不添加原始内容中不存在的信息或个人观点

- 避免使用过于主观的评价性语言

- 保持内容的中立性，不偏向特定立场

- 尊重原创内容，不歪曲原意

## WorkFlow

1. 仔细分析音视频转录文本，识别核心主题和关键信息

2. 确定内容类型（故事、教程、访谈、新闻等）并选择适当的总结结构

3. 提取主要情节、关键人物、重要事件和核心观点

4. 按时间顺序或逻辑关系组织信息

5. 撰写简洁明了的总结，保留原内容的核心价值

6. 检查总结是否完整反映了原始内容的要点

7. 根据需要调整总结格式（段落式、要点式或混合式）

## OutputFormat

{ "内容类型": "故事/教程/访谈/新闻/其他", "核心主题": "简明扼要的主题描述", "总结正文": "详细的内容总结，可使用段落式或要点式", "关键要点": [ "要点1", "要点2", "要点3" ], "情感基调": "内容的整体情感或氛围描述" }







![Image 13](https://mmbiz.qpic.cn/sz_mmbiz_png/wg4dHDgPvZYljaZzuiarhk9Ir6iaYj8Ticib1PUw2xKnI7RtdxKdmoXmDhYHMDfXXMKbywI6I05epEChgocfD2dNNw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=14)

### 音频转文字总结回复

这个就比较简单的LLM大语言模型总结音频文件内容进行输出。

![Image 14](https://mmbiz.qpic.cn/sz_mmbiz_png/wg4dHDgPvZYljaZzuiarhk9Ir6iaYj8TicibAH0rUQRGnmKWIWJHI640RforfjFhF0LzGx6p5kKTYiaoWQrmN5UTkbA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=15)

我们就完成了工作流的搭建。

如果出现Invalid file URL '/files/......: Request URL is missing an 'http://' or 'https://' protocol.. Ensure the `FILES_URL` environment variable is set in your .env file......的报错

**解决方法：打开\dify\docker\.env 找到FILES_URL**

![Image 15](https://mmbiz.qpic.cn/sz_mmbiz_png/wg4dHDgPvZZSXLRficTdctiaicHag0gn96suDgOzTttEicXc9DRjZurTiaWvR33cfLbjrKicDaicy2MXzibC6SPvzjjXlw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=16)

改为**FILES_URL=http://api:5001**

**然后重启相关docker**

```Plain Text
docker compose down
docker compose up -d
```

我们试运行一下，预览，从本地上传视频文件，这段视频相信大家很多都从抖音上看到过，是耿爽大使在联合国的一段发言。

![Image 16](https://mmbiz.qpic.cn/sz_mmbiz_png/wg4dHDgPvZZSXLRficTdctiaicHag0gn96sEAiaRoU7IKBkUjN0Lh9zeaN43MA4nrplSKicEJW2CXhFqFVpxacJrGMA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=17)

![Image 17](https://mmbiz.qpic.cn/sz_mmbiz_png/wg4dHDgPvZZSXLRficTdctiaicHag0gn96sZHfezJZRNjunpz5FGbV2iaVthqBPXq8MKyRRY7UpiaZ6gDLP77ZMO7AQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=18)

等加载完成后，运行，看看结果，还可以。

![Image 18](https://mmbiz.qpic.cn/sz_mmbiz_png/wg4dHDgPvZZSXLRficTdctiaicHag0gn96szsgicFQgQmW3sPuf3H0jSMticXKvt6TWYepKjiauB6icIdpEdgt2iaMB3sQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=19)

![Image 19](https://mmbiz.qpic.cn/sz_mmbiz_png/wg4dHDgPvZZSXLRficTdctiaicHag0gn96sNsibtWe2a1KVrRg09tbUia3VCf2RkCG8GRuF2hgX2s8L8CzKWxv9vFBQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=20)

完成！

