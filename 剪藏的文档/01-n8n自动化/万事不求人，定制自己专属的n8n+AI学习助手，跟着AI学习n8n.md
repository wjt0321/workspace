---

title: 万事不求人，定制自己专属的n8n AI学习助手，跟着AI学习n8n
date: 2025-09-19
tags: ["n8n", "工作流", "自动化", "AI", "人工智能", "智能体", "Agent", "工作流自动化"]
category: 自动化工具
---


# 万事不求人，定制自己专属的n8n AI学习助手，跟着AI学习n8n

Original 阿飞 [阿飞AI实操日记](javascript:void(0);)*2025年09月19日 17:40* *河北*

很多小伙伴在后台问，什么时候出个 n8n的系列教程，哪怕付费呢。。

首先，非常感谢小伙伴们的信任

第一，本身工作也很忙

第二，我感觉自己能力也没到可以出教程的程度，我也是边学边记录，有些也是社区案例，自己只是做了记录。方便自己以后查看，也可以帮助一些小伙伴

再者，官方文档以及社区也都很丰富，很多市面上收费的教程也都是基于官方文档整理的，亦或社区分享的内容。

咱也不讨论拿这个去收费的情况，毕竟人家整理也是花了时间、精力的！但是动辄上千，咱就不做评论了……

不过，

如今的AI已经很强大了，XXXAI助手的产品层出不穷，那我们学习 n8n 是不是也可以创建一个专门的 AI 助手呢？

让这个AI助手来指导我们学习呢？

答案当然是肯定的

今天我们就来看看，如何创建一个专门的 n8nAI助手，来带领我们一起学习 n8n

**基本思路：**

1. cherryStudio精心打造了一位专属助手——【n8nAI助手】，他将全程陪伴并指导你的n8n学习之旅。

2. 让【n8nAI助手】为你量身定制一套详尽的学习计划，将复杂的知识体系巧妙地拆解成易于理解的小模块，助你循序渐进，稳步提升。

3. 在【n8nAI助手】的悉心引领下，开启你的学习之旅吧！

**准备工作**

1. 按照 cherry studio，用来指定我们专门的 n8nAI助手

2. n8n 运行环境，安装教程：

准备工作就绪后，接下来我们进入正题

# 一、创建“n8n AI学习助手”

打开 Cherry Studio，点击【助手】→【添加助手】→输入助手名称，这里我写的是“n8nAI助手”

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/1ibLKxRDVt6ibAKqoicPoRpHAVoaJSygEUQZvYkIcDGoCenOArgrBfY34aMpezBfcRY4Mg99XvOmnSIzMT93ah8bQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=0)

选择我们新建的助手，【设置】 打开设置，选择【提示词设置】，然后输入我们的提示词

![Image 1](https://mmbiz.qpic.cn/sz_mmbiz_png/1ibLKxRDVt6ibAKqoicPoRpHAVoaJSygEUQ8uXUUqhScccYfMmWViczP5MMznjABib6zibOzibrNL8FKrJ8MYwkljQTkA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=1)

提示词如下，可根据情况自行调整

```Plain Text
🧩 角色定义：  
您是一位资深 n8n 专业指导老师，专注于工作流自动化平台的教学与实战指导。精通 n8n 节点配置、流程设计、调试优化、集成开发与 API 应用，能根据用户技术水平、业务场景，提供从基础到高阶的个性化教学与项目指导。

您的核心目标是帮助用户高效掌握 n8n，解决自动化流程中的实际问题，并支持其在真实业务中完成流程搭建、优化与扩展。

📚 知识范围：  
涵盖以下 n8n 相关内容：  
- n8n 官方文档（https://docs.n8n.io/）  
- 核心节点详解（如 HTTP Request、Google Sheets、Slack、Webhook、IF、Function、Set、Switch、Loop Over Items 等）  
- JSON 数据处理与结构设计  
- 工作流设计原则与性能优化  
- 本地部署与 Docker 环境配置  
- 调试技巧与安全性配置  
- 企业级集成（如 CRM、ERP、数据库、API 网关等）  
- 第三方平台对接与迁移方案（如 Zapier / Make.com 替代、Node-RED 对比等）

📝 教学风格：  
- 表达清晰、结构分明、由浅入深  
- 将复杂流程拆解为可操作的步骤  
- 提供节点配置截图、流程 JSON、示例代码等实用材料  
- 引导用户动手实践，并根据反馈动态调整讲解深度

🧩 用户交互流程（Workflow）：  
1. 了解用户背景：  
   - 技术水平（入门 / 中级 / 专业开发者）  
   - 使用场景（个人自动化 / 企业业务流 / 系统集成等）  
   - 当前目标或具体问题  

2. 定制学习路径：  
   - 推荐适合的学习路线与实战案例  
   - 提供每日/每周学习计划（可选）  

3. 问题诊断与解决：  
   - 分析问题根源，提供步骤清晰的解决方案  
   - 展示节点配置示例与调试方法  
   - 分享流程 JSON 或典型错误处理方案  

4. 实战项目支持：  
   - 协助设计、搭建和优化完整工作流  
   - 提供扩展建议与性能调优方案  
   - 帮助将手动流程转为自动化方案  

5. 学习资源推荐：  
   - 官方文档、社区论坛、视频教程与节点大全  
   - 最佳实践与避坑指南

📌 回答格式建议：  
- 使用标题与编号提升可读性  
- 搭配流程结构示意图或 JSON 片段（如适用）  
- 突出关键配置与常见误区  
- 分步拆解复杂任务  
- 鼓励实践并设置反馈环节

✅ 回答规则（Rules）：  
- 保持专业、清晰、易懂的教学风格  
- 技术术语使用前后一致，必要时加以解释  
- 提供可复用的配置示例或代码片段  
- 复杂流程按步骤讲解，避免信息过载  
- 如问题超出 n8n 范围（如基础编程、API 原理），引导至相关知识基础  
- 所有建议基于 n8n 最新稳定版本

💬 初始化欢迎语：  
您好！我是您的 n8n 专属指导老师。无论您是刚入门还是已有经验，希望优化自动化流程或完成具体项目，我都将为您提供清晰、实用、针对性的指导。请告诉我您的学习目标或遇到的问题，我们开始吧！
```

模型设置如下：关于如何设置模型可以看我之前的文章

![Image 2](https://mmbiz.qpic.cn/sz_mmbiz_png/1ibLKxRDVt6ibAKqoicPoRpHAVoaJSygEUQibqkq1FmPtRKCmNmux8UoJ0KvnCVzKITRh5ibYSb1HGSm2icRQXhhszYA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=2)

至此，我们的 n8nAI助手就创建好了。

下面来看看，如何让这个 AI 助手来教我们学习 n8n

# 二、让n8nAI助手制定学习计划

把我们的要求给他，让n8nAI助手帮我们制定学习计划

![Image 3](https://mmbiz.qpic.cn/sz_mmbiz_png/1ibLKxRDVt6ibAKqoicPoRpHAVoaJSygEUQ4CENsej02S2ZmzR58IibziacMjgicibddErbDtQCzicCGniaN7dPKFzZrUyw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=3)

因为我使用的是本地部署的大模型，速度嗖嗖的~~

有条件的也推荐本地部署一个 

看看这个 n8nAI助手帮我们制定的学习计划如何：

![Image 4](https://mmbiz.qpic.cn/sz_mmbiz_png/1ibLKxRDVt6ibAKqoicPoRpHAVoaJSygEUQLIAp3GTb0BwrhibjicXI1ibnT5ETc7VZkDeyOme0NW5UGQlRxQ0vS6H4g/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=4)

我看了看，基本上还是可以的。涉及的知识点还是挺全面的

大伙可以根据提供的提示词结合自己的情况，进行调整。

这样这个AI助手就更符合自己的领域，然后就可以安装这个学习计划让AI再丰富、再详细的出学习内容

![Image 5](https://mmbiz.qpic.cn/sz_mmbiz_png/1ibLKxRDVt6ibAKqoicPoRpHAVoaJSygEUQEsHpUup24v3exnYia9ibHIKAagtuMFG5dxY0fBhlCBZRoMjxU1qmIcsw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=5)

好了，今天就这样吧~~

学到的，赶紧去实操以下吧~

**喜欢的话❤，欢迎点赞、关注一波，后续会持续为大伙分享 工作流、 AI编程等实战干货，让我们一起学 AI！**

---

**推荐阅读：**

[【案例实操】n8n + crawl4ai 直接封神！一键爬任意网站，搭 RAG知识库和本地大模型简直不要太爽！](https://mp.weixin.qq.com/s?__biz=MzIyMTI1MTkyNQ==&mid=2649775432&idx=1&sn=0dfe60f6e3f131337670fde4cc91479d&scene=21#wechat_redirect)

[Claude Code国内稳定使用最新方法来了，太贵封号不存在！！！](https://mp.weixin.qq.com/s?__biz=MzIyMTI1MTkyNQ==&mid=2649775432&idx=2&sn=d99b269c33fae0437100793bd49edc65&scene=21#wechat_redirect)

[【喂饭级教程】这不比coze香吗！！万事不求人，给自己的电脑免费部署一个自己的智能体搭建平台](https://mp.weixin.qq.com/s?__biz=MzIyMTI1MTkyNQ==&mid=2649775168&idx=1&sn=0a689588233a8b57818ed522a6a41bf4&scene=21#wechat_redirect)

