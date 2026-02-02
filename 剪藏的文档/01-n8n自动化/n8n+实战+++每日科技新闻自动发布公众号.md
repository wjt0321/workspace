---

title: n8n 实战 | 每日科技新闻自动发布公众号
date: 2025-09-11
tags: ["n8n", "工作流", "自动化", "实战", "案例", "工作流自动化"]
category: 自动化工具
---


# n8n 实战 | 每日科技新闻自动发布公众号

Original AI X-Talk [AI X-Talk](javascript:void(0);)*2025年09月11日 12:59* *福建*

学习技术是为了落地想法，让工具解放双手。

下面结合  [n8n 工作流：每日新闻推送](https://mp.weixin.qq.com/s?__biz=MzU1MDc4MTk3OA==&mid=2247489815&idx=1&sn=19c0fc24553a4622af52b648be7cc74d&scene=21#wechat_redirect) 一文中的工作流，以此为基础，获取最新的新闻，然后根据获取到的最新的新闻撰写公众号文章，并生成公众号文章主图，最后将文章和主图推送到微信公众号操作草稿箱。实现：每日定时创建一篇科技新闻公众号文章，效果如下：

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/V9YU4icHiaEo0ic3WpgnV2kv5auQhdnFWYISRqWeDVj7fegUxuick5w1cvrcPZRazZib2n8WJfKtur8ud9tdMDm6dQA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=0)













简单排版之后就可以直接发布，效果如下：[科技巨头Meta与谷歌陷争议：VR儿童安全与开放网络衰退成焦点](https://mp.weixin.qq.com/s?__biz=MzU1MDc4MTk3OA==&mid=2247489927&idx=1&sn=e274c51414e91ecca666a14fc0d6a29e&scene=21#wechat_redirect)

![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/V9YU4icHiaEo0ic3WpgnV2kv5auQhdnFWYIARtAWkcZH8Hbjt7vGHpufxsgBuIFMsbemP5n7QcVoVMEjMaBOS8jVw/640?wx_fmt=jpeg&watermark=1#imgIndex=7)













![Image 1](https://mmbiz.qpic.cn/mmbiz_png/jq3b1seOTd4j2XibFgRM200STj4GDeXicjP7zWyibNwzSSCIS01Ly76bwy7bwbtcwlicPdz4Uibm2w4rfhTVnKEzlTQ/640?from=appmsg#imgIndex=14)

一、工作流步骤拆解


![Image](https://mmbiz.qpic.cn/mmbiz_gif/ica8gSV8daBzqvKmxySrFuYrTuw5FaH2bp6QSSq4FwTTbs27iavX6G3dM6f7jdcl0PS2IxYcgMOvzce2WleRxibPw/640?from=appmsg#imgIndex=15)

![Image 2](https://mmbiz.qpic.cn/sz_mmbiz_png/V9YU4icHiaEo0ic3WpgnV2kv5auQhdnFWYIjiam7LhLwoe3fxUaExqicMTt2wXD7UYPRW7iasJkich1PEtl3MUZkY8LCw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=16)













如上图所示，整个工作流主要分为5个部分。

1. 定时任务触发获取最新的科技新闻

2. 科技新闻URL借助 Jina（等）工具获取正文

3. AI 总结新闻

4. AI 根据总结的新闻撰写公众号文章 + 主图

5. 将文章 + 主图 推送到 公众号中

![Image 3](https://mmbiz.qpic.cn/mmbiz_png/jq3b1seOTd4j2XibFgRM200STj4GDeXicjP7zWyibNwzSSCIS01Ly76bwy7bwbtcwlicPdz4Uibm2w4rfhTVnKEzlTQ/640?from=appmsg#imgIndex=23)

二、工作流详细拆解


![Image 1](https://mmbiz.qpic.cn/mmbiz_gif/ica8gSV8daBzqvKmxySrFuYrTuw5FaH2bp6QSSq4FwTTbs27iavX6G3dM6f7jdcl0PS2IxYcgMOvzce2WleRxibPw/640?from=appmsg#imgIndex=24)

根据拆解的步骤进行工作流的详细拆解

2.1、新闻资讯获取定时任务

![Image 4](https://mmbiz.qpic.cn/sz_mmbiz_png/V9YU4icHiaEo0ic3WpgnV2kv5auQhdnFWYINr7BibgzWTyQvt2ZlPxEljqpmqiaiaDhTdLicnfOzNlgGAbqvsbL0TdBGw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=25)













同[ n8n 工作流：每日新闻推送](https://mp.weixin.qq.com/s?__biz=MzU1MDc4MTk3OA==&mid=2247489815&idx=1&sn=19c0fc24553a4622af52b648be7cc74d&scene=21#wechat_redirect) 一文中的工作，在此基础上追加了

- Sort 节点：根据发布时间排序，最新的排在最前面

- Code 节点：根据标题去除相同的新闻，避免重复。

2.2、通过 Jina 获取文章内容

https://jina.ai/ 注册并获取密钥

![Image 1](https://mmbiz.qpic.cn/sz_mmbiz_jpg/V9YU4icHiaEo0ic3WpgnV2kv5auQhdnFWYI9D2eEAtVvz4PpDaXkOwicXNERlvTZ8XHAgoPnFuoHQZibGlI3eib9JhAw/640?wx_fmt=jpeg&watermark=1#imgIndex=32)











该部分只有两个节点

- Limit 节点：新闻资讯获取到的文章太多了，通过 Limit 限制后续需要处理的数量

- Jina 节点：针对需要处理的新闻，逐条获取详细文本内容

2.3、借助AI总结文章

![Image 5](https://mmbiz.qpic.cn/sz_mmbiz_png/V9YU4icHiaEo0ic3WpgnV2kv5auQhdnFWYI01JiaKicCmmXQIqicQYlakU1icYrhCnPkp1FKmG6mLUyvicReHSyRtqwFcQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=38)











该部分主要是两个节点

AI Agent 节点


AI Agent 节点将获取到的新闻内容进行总结。

![Image 6](https://mmbiz.qpic.cn/sz_mmbiz_png/V9YU4icHiaEo0ic3WpgnV2kv5auQhdnFWYITiaaOnsIGjiaJXJBWzlDEicXuicpQmdlUJGRWLm5s37ZCPMIGlaF2lDsLQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=44)













AI Agent 的系统预设信息：

你是一个专业的新闻自媒体工作者，对每一条新闻分别进行总结处理，并拼接成一篇新闻资讯总结文章

Aggregate 节点


AI Agent 会针对每一条资讯的进行总结，总结之后通过 Aggregate 节点，将所有文章的总结聚合在一个数组里。

![Image 7](https://mmbiz.qpic.cn/sz_mmbiz_png/V9YU4icHiaEo0ic3WpgnV2kv5auQhdnFWYI6VjLOv1staKbtWdKWIdl6UJn5iamflric2oAAJicHvRJiaDfeThIGiaxUjA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=51)













2.4、AI 生成文章 + 主图

![Image 8](https://mmbiz.qpic.cn/sz_mmbiz_png/V9YU4icHiaEo0ic3WpgnV2kv5auQhdnFWYId2rTIf7IcHia1QF6KwNiaeicMjBqibv0EOqIKUYLBibUulBhtiawVp5DanBA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=58)













该部分，主要分为三个节点

AI Agent 节点


AI Agent 节点使用上一个节点生成的文章总结 生成新的内容，包括：公众号文章、主图。

![Image 9](https://mmbiz.qpic.cn/sz_mmbiz_png/V9YU4icHiaEo0ic3WpgnV2kv5auQhdnFWYIF6JA6oePy8OGTCU62mPF5vjFqsb9EZQkvc3ITjxzsBkgYeVLEglFTQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=65)













AI Agent 的处理，依赖于提示词，提示词如下：

角色： 你是一位专业的科技媒体编辑，负责为微信公众号撰写每日科技热点汇总文章。

核心任务： 根据我提供的多条科技新闻，撰写一篇结构清晰、排版美观的公众号文章。文章需要对每一则新闻进行独立分段，并为其添加醒目的主题标题和条理分明的内容要点。

输出要求：
你必须将输出严格格式化为一个JSON对象，且只包含这个JSON对象。该JSON对象必须包含以下两个字段：

mainImgPrompt: 字符串。文章主图的提示词，根据上下文内容生成文章主体提示词，要精简且贴合主题。

title: 字符串。整篇文章的总标题。

content: 字符串。文章的整体内容,禁止 markdown 格式的文本，使用 html 文本格式。内容必须遵循以下排版规则：

分主题撰写：为每一则主要新闻创建一个独立的章节。

使用小标题：每个章节必须有一个用 <h2> 标记的二级标题（例如：<h2> 一、Meta再陷儿童安全争议</h2>）作为该新闻的主题标题。

使用列表符号：在每个章节的正文中，使用 ● 或 → 等符号来分点阐述新闻的核心要素（如事件、数据、观点、影响）。

使用加粗强调：使用 <strong>加粗</strong> 来突出最关键的信息（如公司名、核心结论、重要数据）。

段落间隔：每个章节之间，以及章节内的要点之间，使用换行符 <br/> 进行分隔，确保排版稀疏，易于阅读。

写作指引：

文章需有总体引言和结尾总结，将各个新闻主题有机串联起来。

语言风格：专业、简洁、面向大众科技爱好者。

请基于以下新闻内容生成JSON格式的文章：
 {{ $json.output }}

微信公众号无法识别 Markdown 格式，所以需要强调AI生成格式需要为 HTML，同时强制输出格式为 JSON对象，并指定格式

Code 节点


AI Agent 生成内容是一个字符串，需要将字符串中的 JOSN 对象解析出来，解析后的代码结构如下

![Image 10](https://mmbiz.qpic.cn/sz_mmbiz_png/V9YU4icHiaEo0ic3WpgnV2kv5auQhdnFWYIFFUFBibquorm4kSpOAJVVwibHIgV9VyvWSh33dxSlIITFog4NHjLBBdQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=72)













code 代码如下：

![Image 11](https://mmbiz.qpic.cn/sz_mmbiz_png/V9YU4icHiaEo0ic3WpgnV2kv5auQhdnFWYIZafAricic3TY3W2ibSQackrLRcwPfP6V9X6wV37NEhjAt2o5BrZNEuZKg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=79)

HttpRequest 节点


通义千问相关直接登录阿里云百炼平台注册账号即可。

申请密钥、选择模型对应的 API，获取 CURL 案例，直接导入到 HttpRequest 节点即可。

一共有两个 HttpRequest 节点，

第一个用来请求通义千问生成主图。

第二个根据第一个获取到的图片URL获取图片二进制文件流。

几个需要注意的点：

1、通义千问 API 生成图片时，根据图片大小要求选择对应的像素比例

2、申请的密钥记得替换 CURL案例中的 token

请求参数案例如下

![Image 12](https://mmbiz.qpic.cn/sz_mmbiz_png/V9YU4icHiaEo0ic3WpgnV2kv5auQhdnFWYIts0bZicdDzBDbicq0nxrTFYSibqJooyx7d9AO2LYR8aezrYScwmWYicznw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=80)

2.5、推送公众号草稿箱

![Image 13](https://mmbiz.qpic.cn/sz_mmbiz_png/V9YU4icHiaEo0ic3WpgnV2kv5auQhdnFWYIX86PQN4OQbdOQr0uXh8Nj0DnSgjZChibwaJ35u8vxdwtKeFZ24b39kw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=81)













微信公众号的操作依赖于社区节点： n8n-nodes-wechat-offiaccount。

该部分主要依赖于微信公众号节点，执行两部分操作

1、上传主图到公众号

2、推送文章+主图到微信公众号草稿箱。

上传主图


![Image 14](https://mmbiz.qpic.cn/sz_mmbiz_png/V9YU4icHiaEo0ic3WpgnV2kv5auQhdnFWYI4W3E14Ekt0lwsEqOKXKZzZjCAkr8c861VUngpO3etKaZK8wyYZbIcA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=88)













上传后会得到一个 media_id ，这个就是微信公众号返回的主图标识，创建草稿的时候直接作为参数值。

上传公众号文章到草稿箱


![Image 15](https://mmbiz.qpic.cn/sz_mmbiz_png/V9YU4icHiaEo0ic3WpgnV2kv5auQhdnFWYIUX2lO9Q5KTngVJYpBkIyWKrf0EEGEYPWrJ4k0zxQy5lmliatkCoOFRw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=95)













具体的参数如下：

![Image 16](https://mmbiz.qpic.cn/sz_mmbiz_png/V9YU4icHiaEo0ic3WpgnV2kv5auQhdnFWYIx3LpVib2QoTcsUaMpykO7bIeQdozKY7hfAIlLZlNFWaYot1Ss2gmYYA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=102)





更多参数说明可以参考官方文档，本文主要将几个字段

- title ：标题

- digest：摘要

- author：作者

- content：文章内容

- thnmb_media_id：主图ID

