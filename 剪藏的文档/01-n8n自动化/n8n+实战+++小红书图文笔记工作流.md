---

title: n8n 实战 | 小红书图文笔记工作流
date: 2025-11-05
tags: ["n8n", "工作流", "自动化", "实战", "案例", "工作流自动化"]
category: 自动化工具
---


# n8n 实战 | 小红书图文笔记工作流

Original AI X-Talk [AI X-Talk](javascript:void(0);)*2025年11月5日 22:01* *广东*

小红书是很多自媒体人绕不开的平台，小红书笔记也是绕不开的内容创作。

很多场景下的笔记内容都能够借助AI来辅助完成，甚至AI生成的内在某些场景中能够直接使用。能够通过AI完成，自然也就能够通过工作的方式来自动化完成。

下面，以一个基础的小红书图文制作案例：宠物穿搭。来搭建一个简易的小红书笔记自动化生成工作流，更多类型的小红书笔记，也能够通过变种来实现特定的工作流。

先来看一下效果：

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/V9YU4icHiaEo23wLgW7JPlYgV3vibCj628TyJ2mxD76E9iclOsm5wYzSasd2R1yQokpA2OUyibay3MiaV6KVnjbId4QA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=0)

笔记详情如下：

![Image 1](https://mmbiz.qpic.cn/sz_mmbiz_png/V9YU4icHiaEo23wLgW7JPlYgV3vibCj628T7AictpIoWVKicdVaxRNJ7iaibjhbHPoVsjggdkt3evednH9Nzez0CEm69A/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=1)







本工作流是一个基础的工作流，工作流中的AI Agent 使用的 DeepSeek API 完全够用，图片生成使用的阿里云百炼的免费模型，出图上可能存在效果不佳和水印的问题，自行替换相关的图片生成模块即可解决。其他细节的定制，自行根据业务进行调整。

首先，先看一下整个工作流相关的多维表格数据，如下图：

![Image 2](https://mmbiz.qpic.cn/sz_mmbiz_png/V9YU4icHiaEo23wLgW7JPlYgV3vibCj628TgskKayUDVqmXHiaqOvqVY0R2adxFhkicTB3MxMgm7mqJOYNaupiazz0SQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=5)

在实现工作流前，来看一下工作流全览

![Image 3](https://mmbiz.qpic.cn/sz_mmbiz_png/V9YU4icHiaEo23wLgW7JPlYgV3vibCj628TojUPeibOOGLpO5cUQ4tYUricTLfaiab00wUVThOZApYnhegW95nfj6cdw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=6)





整个工作流很简单，主要分为四个模块

1. 操作入口+数据获取

2. 小红书标题、文案生成

3. 小红书图片生成

4. 将生成内容回写到飞书多维表格中

整个工作流的数据都以飞书多维表格作为数据中心。

多维表格的操作可以看之前的文章 [n8n 操作飞书多维表格](https://mp.weixin.qq.com/s?__biz=MzU1MDc4MTk3OA==&mid=2247489857&idx=1&sn=bf097e4375e4559b639e0a34595c670e&scene=21#wechat_redirect)

下面针对每个模块进行拆解

![Image](https://mmbiz.qpic.cn/sz_mmbiz_gif/HBLcNkZ8PQddO5DZYzH4GcwlsOwEK5cR1A5XZuWXTP3ib3tWpcAtuLUaliasnZQvBmenGd0UNicFQOsJGyIzodicicg/640?from=appmsg#imgIndex=9)

1、操作入口 + 数据获取

![Image 4](https://mmbiz.qpic.cn/sz_mmbiz_png/dJGuszYr5iaRGiaZURAxJAROibCh1sjaZictcbC4iasuuOgCMQSDSwrG5Wfrx2QgfvKx8icDhm0gIia8fN6mThehEK8ww/640?from=appmsg#imgIndex=10)

![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/V9YU4icHiaEo23wLgW7JPlYgV3vibCj628T3aXQmEd0rNIWmwvuBke8wXJoTHJ3pCRQ6ddP6OmywqWL8FtI6DADEQ/640?wx_fmt=jpeg&watermark=1#imgIndex=11)



操作入口 Trigger有两个，一个是：手动触发，一个是 webhook 被动触发。

手动触发：用于调试和单个任务执行。

Webhook：飞书表格更新后，会主动推送调用工作流，触发任务执行。

获取小红书创作任务：是一个飞书节点，用来查询多维表格中的数据。

获取节点对应的查询参数

![Image 5](https://mmbiz.qpic.cn/sz_mmbiz_png/V9YU4icHiaEo23wLgW7JPlYgV3vibCj628TicfZyc8XnaWAC8BO6MIA2tMYR1aG8Ww4MeozJBotKOB0Psica63hI3AQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=13)

需求分发节点：将获取到的任务下发给后续工作节点执行。

![Image 1](https://mmbiz.qpic.cn/sz_mmbiz_gif/HBLcNkZ8PQddO5DZYzH4GcwlsOwEK5cR1A5XZuWXTP3ib3tWpcAtuLUaliasnZQvBmenGd0UNicFQOsJGyIzodicicg/640?from=appmsg#imgIndex=14)

2、小红书标题、文案生成

![Image 6](https://mmbiz.qpic.cn/sz_mmbiz_png/dJGuszYr5iaRGiaZURAxJAROibCh1sjaZictcbC4iasuuOgCMQSDSwrG5Wfrx2QgfvKx8icDhm0gIia8fN6mThehEK8ww/640?from=appmsg#imgIndex=15)

![Image 7](https://mmbiz.qpic.cn/sz_mmbiz_png/V9YU4icHiaEo23wLgW7JPlYgV3vibCj628TAqPeNThBvRmQqFyy9McvP3CEkyLMicrtlMCJeT2Yjxzsf2skEmBKTHg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=16)

该模块主要是三个节点

变更任务状态：将正在处理的

任务状态，变更为：生成中。避免多次处理。

![Image 8](https://mmbiz.qpic.cn/sz_mmbiz_png/V9YU4icHiaEo23wLgW7JPlYgV3vibCj628TVWjVAiaPc3BkIMyicwX7btXiaRjE8VQvW786fHIrGwdRdCxHusxT7A4LA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=17)

AI Agent(小红书文案生成器)：根据提示词生成小红书文案

![Image 9](https://mmbiz.qpic.cn/sz_mmbiz_png/V9YU4icHiaEo23wLgW7JPlYgV3vibCj628To5Zcibg4Aic8YnibVpkaUwbZv1ZQJrPNZG0AdsP7ROkQibALnQWrxJ2Xag/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=18)

AI Agent(小红书内容分段专家)：将生成的提示词中的图案进行分段处理。

![Image 10](https://mmbiz.qpic.cn/sz_mmbiz_png/V9YU4icHiaEo23wLgW7JPlYgV3vibCj628TZq3qZD2uVmactmkCRKQ1NiaYEcWMMoyNnyKwgVhU1AdxQDiahdGicC5zQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=19)

![Image 2](https://mmbiz.qpic.cn/sz_mmbiz_gif/HBLcNkZ8PQddO5DZYzH4GcwlsOwEK5cR1A5XZuWXTP3ib3tWpcAtuLUaliasnZQvBmenGd0UNicFQOsJGyIzodicicg/640?from=appmsg#imgIndex=20)

3、小红书图片生成

![Image 11](https://mmbiz.qpic.cn/sz_mmbiz_png/dJGuszYr5iaRGiaZURAxJAROibCh1sjaZictcbC4iasuuOgCMQSDSwrG5Wfrx2QgfvKx8icDhm0gIia8fN6mThehEK8ww/640?from=appmsg#imgIndex=21)

![Image 12](https://mmbiz.qpic.cn/sz_mmbiz_png/V9YU4icHiaEo23wLgW7JPlYgV3vibCj628Ts16S7B1iaocrzmhic8mzK6C28g4G82ZL6jRjlFEDxmtAgFZLYqypcviaQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=22)

根据模块二生成的图片提示词数组，遍历生成。

AI Agent（小红书图片提示词设计专家）：根据提示词二次生成提示词。

通义千问文生图：Http 的方式调用通义千问API。

上传图片：飞书多维表格的图片素材需要先上传素材库，然后才能添加到表格

![Image 3](https://mmbiz.qpic.cn/sz_mmbiz_gif/HBLcNkZ8PQddO5DZYzH4GcwlsOwEK5cR1A5XZuWXTP3ib3tWpcAtuLUaliasnZQvBmenGd0UNicFQOsJGyIzodicicg/640?from=appmsg#imgIndex=23)

4、将生成的内容写回飞书多维表格

![Image 13](https://mmbiz.qpic.cn/sz_mmbiz_png/dJGuszYr5iaRGiaZURAxJAROibCh1sjaZictcbC4iasuuOgCMQSDSwrG5Wfrx2QgfvKx8icDhm0gIia8fN6mThehEK8ww/640?from=appmsg#imgIndex=24)

![Image 14](https://mmbiz.qpic.cn/sz_mmbiz_png/V9YU4icHiaEo23wLgW7JPlYgV3vibCj628TLkiaLespuDp9ibmpSpcb19zT1Dbpbpn0IeoB3pQjDagQAU4ZPKrRo6kg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=25)

Code 节点：用户组装多维表格需要的所有数据，小红书标题、内容图片

![Image 15](https://mmbiz.qpic.cn/sz_mmbiz_png/V9YU4icHiaEo23wLgW7JPlYgV3vibCj628TA8F3oqsWiccHu8zg3DdtrChc47lUw4QGKGiayibbticDeoDuoMVaetJq0w/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=26)

封面上传+变更状态：更新多维表格数据

![Image 16](https://mmbiz.qpic.cn/sz_mmbiz_png/V9YU4icHiaEo23wLgW7JPlYgV3vibCj628T1bsFkHVoEwGt7ohD5nJxAIqWuOy9fqCHTuppsTiaeaBfWGAdh22EeoQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=27)

通过拼接串联，就可以复刻一个日常AI辅助生成小红书笔记的流程。不过该工作流也存在一定的局限性，以及AI部分效果的差异性。但是整体的工作流程大差不差，可以通过优化AI提示词，切换更好的语言大模型已经图片大模型，达到更好的效果。


