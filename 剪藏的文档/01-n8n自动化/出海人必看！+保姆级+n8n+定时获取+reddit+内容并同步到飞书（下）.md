---

title: 出海人必看！ 保姆级 n8n 定时获取 reddit 内容并同步到飞书（下）
date: 2025-09-13
tags: ["n8n", "工作流", "自动化", "飞书", "工作流自动化"]
category: 自动化工具
---


# 出海人必看！ 保姆级 n8n 定时获取 reddit 内容并同步到飞书（下）

Original 二师兄 [二师兄聊AI](javascript:void(0);)*2025年09月13日 23:30* *河南*

> 大家好，我是二师兄，程序员，宝爸，短视频 AIP 教练， 专注 AI 工具、AI 智能体、 AI 编程。

踏上取经路比抵达灵山更重要，干起来，再完美。

上篇提到，reddit 在海外社交流量中，占据了统治位置。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/oBeibW4GQ8131iaEibRUAtOadF7e3U4Ozf3FiblqyHyrkwO7lbIfqDu3xQxAJ0Vt5VuAlriclOuiaQZAsgSpAaXqOqEg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=0)

那每个出海人，都需要一个自动化的助手每天帮你收集 reddit 上你感兴趣的信息。

所以目标是打造一个 自动化的能自动帮你筛选有价值信息的工作流，目前方案采取的是 n8n 结合 reddit 实现。

上篇内容，[不玩 reddit 你搞的什么出海？ n8n 定时获取 reddit 内容并同步到飞书（上）](https://mp.weixin.qq.com/s?__biz=MzkxMzg4MzIwNg==&mid=2247487778&idx=1&sn=6e31ad25c6ed47520ce6a16e6e7b56f2&scene=21#wechat_redirect)咱们主要是讲了 n8n 在 windows 上本地部署的情况，解决了公网 reddit 成功回到本地的问题。

今天这篇就详细讲解下工作流的搭建，先上图

![Image 1](https://mmbiz.qpic.cn/sz_mmbiz_png/oBeibW4GQ8131iaEibRUAtOadF7e3U4Ozf3TkcueLkT2nyPSHCUSVehurEtmSvczPiaQdkuVQialKibF9tfhDFmeIPOA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=1)

接下来介绍下主要节点信息

# 一 触发器节点

指定了每天晚上半夜进行任务触发，收集 reddit 内容

![Image 2](https://mmbiz.qpic.cn/sz_mmbiz_png/oBeibW4GQ8131iaEibRUAtOadF7e3U4Ozf39ibibl9Ps2qocIs2te2GqIZYZiaI3sPl4SomMYhrDibctpGOf7JQDI0E1A/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=2)

# 二 reddit 节点

n8n 中是内置 reddit 节点的， 直接添加就可以 ，重点讲一下如何添加鉴权

![Image 3](https://mmbiz.qpic.cn/sz_mmbiz_png/oBeibW4GQ8131iaEibRUAtOadF7e3U4Ozf3CnyHNFmb7CmlWqjrFhbC1LpUJxWPOHTbhIvZFDDpYiavFOx27iaH1XBg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=3)

选择 Cretate new credential ， 会出现三个信息。

第一个是你需要在 reddit 中填写的信息， **上一篇内容中核心解决的也是这个地址的问题， 千万千万不能是 localhost 开头的（不知道怎么解决的，去看上一篇 //TODO ）**

第二个第三个信息来自于 reddit 创建的应用信息。

![Image 4](https://mmbiz.qpic.cn/sz_mmbiz_png/oBeibW4GQ8131iaEibRUAtOadF7e3U4Ozf3sZmpibpMXmibqPVMhOBtX8WBnmoibAPHW8x9O8zXgxAPaPVPSOoVBbJCg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=4)

我们打开 reddit 的配置应用入口

https://www.reddit.com/prefs/apps

填写 应用名称 name 以及 回调地址 redirect uri 。

![Image 5](https://mmbiz.qpic.cn/sz_mmbiz_png/oBeibW4GQ8131iaEibRUAtOadF7e3U4Ozf3ubhuZxibpw6JuaLdh7cFicnKLhTLsHkHelTdGib9HA649A77IDkib7dm3w/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=5)

接下来 reddit 就会给你返回一个 id 和 secret

![Image 6](https://mmbiz.qpic.cn/sz_mmbiz_png/oBeibW4GQ8131iaEibRUAtOadF7e3U4Ozf3CZfiaySjCOGRxdGn5QReDkyTET39PAOiaOxSbjskib0BvsicBwAJFVpoyg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=6)

然后我们回到 n8n 的 reddit 节点鉴权配置页面，依次填入上面的信息，并点击链接测试。

![Image 7](https://mmbiz.qpic.cn/sz_mmbiz_png/oBeibW4GQ8131iaEibRUAtOadF7e3U4Ozf3baImb16dQcLsOyZKyQfRwbWyia3ve1Z4BK72IcgRXvr50z0FLxRnYCw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=7)

然后我们对 reddit 节点进行配置， 我需要的关键词是 n8n ， 所以 Keyword 那里我就配置的是 n8n 。

![Image 8](https://mmbiz.qpic.cn/sz_mmbiz_png/oBeibW4GQ8131iaEibRUAtOadF7e3U4Ozf35fqIdTAFIJ6NDGVdK63IpbDicut2Ay86NCwe232TOUOPuaDb6DRBdLw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=8)

然后我们执行测试 ，如果你能看到数据返回，说明我们成功打通了 n8n 访问 reddit 的能力。

![Image 9](https://mmbiz.qpic.cn/sz_mmbiz_png/oBeibW4GQ8131iaEibRUAtOadF7e3U4Ozf3YtYehpKjtewto17U3Lsw2KBdMibJ9UNf5FbRZqvRP5uUGRC4wZbcGgg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=9)

# 三 筛选最新的帖子

添加一个 if 节点， 只取 有内容、最近七天且点赞大于 10 的帖子

![Image 10](https://mmbiz.qpic.cn/sz_mmbiz_png/oBeibW4GQ8131iaEibRUAtOadF7e3U4Ozf31aIrreb1rvEUWuVeRZDvV7EEVgvib8rkCzAKXhfNtuNRqxL8cEicicC6g/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=10)

# 四 循环节点

因为条目较多，所以要进行挨个循环处理

![Image 11](https://mmbiz.qpic.cn/sz_mmbiz_png/oBeibW4GQ8131iaEibRUAtOadF7e3U4Ozf3bSgVicfyGJTkwJx3sy9icNhK3QxtbNLQicDaGLicWOtdjXvLJP4DyC84ug/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=11)

# 五 获取帖子内容链接评论

拿到每一个条目之后，分成了三条线去获取信息。

![Image 12](https://mmbiz.qpic.cn/sz_mmbiz_png/oBeibW4GQ8131iaEibRUAtOadF7e3U4Ozf3AphzWBTR8RyFkoaMDxW3mJatouIC0gvC3N3dvyibrdUVV0dDdHbwiaKw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=12)

获取链接比较简单，就是一个 set 节点

![Image 13](https://mmbiz.qpic.cn/sz_mmbiz_png/oBeibW4GQ8131iaEibRUAtOadF7e3U4Ozf3LMkicouVvQWJljnlQmnTUzIVvIcWFkXXYrz0iaoYhQjic3Q5tGJPtIuFg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=13)

获取内容也是

![Image 14](https://mmbiz.qpic.cn/sz_mmbiz_png/oBeibW4GQ8131iaEibRUAtOadF7e3U4Ozf32AjibFlu1ibTG8Hr2LtGFwp7xc2TSTJqIhLw4nOb79Plxm8uGbEjerBA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=14)

获取帖子评论，又添加了一个 reddit 节点

![Image 15](https://mmbiz.qpic.cn/sz_mmbiz_png/oBeibW4GQ8131iaEibRUAtOadF7e3U4Ozf3gCEETqBSsJRbD0UEj9utgET56zBalVdAtp1icg4OZQeia4448haOaZ9w/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=15)

# 六 评论聚合

因为 1 个帖子下面的评论太多了，所以会对评论进行聚合处理

![Image 16](https://mmbiz.qpic.cn/sz_mmbiz_png/oBeibW4GQ8131iaEibRUAtOadF7e3U4Ozf3W9wG3VGI12brug9k8UQ7ic7tId4tcP4sb2Sxd3eGVcvy0XwNYJuxG3w/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=16)

首先是先从一堆信息里面把评论取出来，放到 comment 变量里面

![Image 17](https://mmbiz.qpic.cn/sz_mmbiz_png/oBeibW4GQ8131iaEibRUAtOadF7e3U4Ozf30zakU2WN7wbIAZiboia52Vpic7C9s3QgnaaogLKCPgYrTFhBTaszWgic1A/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=17)

然后是一个代码节点，对评论进行拼接聚合

![Image 18](https://mmbiz.qpic.cn/sz_mmbiz_png/oBeibW4GQ8131iaEibRUAtOadF7e3U4Ozf3r3ERPAsNpLS20ouYl1F88pic9VjaWFVZxMibIRskYYXicZIa23iaO3WFLA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=18)

# 七 整合最终数据

接下来就需要对前面拿到的 1 个帖子的 url、内容、还有评论整合到一起，用了 3 个节点，第三个 code 节点是对 comment 里面的一些不符合 json 格式的内容进行转义去除什么。

![Image 19](https://mmbiz.qpic.cn/sz_mmbiz_png/oBeibW4GQ8131iaEibRUAtOadF7e3U4Ozf3XtJ2QMjXicr0YsyMxW1SXtcawVStekuCMqUibzM8Lf6oeHgUoniaNus6A/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=19)

# 八 写入飞书多维表格

这一步会稍微麻烦一些，你需要先进行飞书平台配置，然后在 n8n 工作流中还需要装飞书插件，最后才是飞书节点配置。

### 一） 飞书平台准备事项

访问 飞书开放平台 → 点击右上角「开发者后台」→「创建企业自建应用」

![Image 20](https://mmbiz.qpic.cn/sz_mmbiz_png/oBeibW4GQ8131iaEibRUAtOadF7e3U4Ozf3ep7Nnp43gLzY1oQQkHh81ibX7kiboDgyQjwSBHM9cwD1tkBlaPJOibqTA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=20)

填写应用名称和描述（需清晰标识用途）→ **记录生成的 App ID 和 App Secret（关键凭证，需妥善保存）。**

![Image 21](https://mmbiz.qpic.cn/sz_mmbiz_png/oBeibW4GQ8131iaEibRUAtOadF7e3U4Ozf3AtoIPTWEiaibWTmUicrMs16GUZ0yujkqGA0UU6dI3dpmyPPMnysHyYZng/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=21)

激活机器人能力， 操作路径 应用能力 → 添加应用能力 → 机器人 → 添加

![Image 22](https://mmbiz.qpic.cn/sz_mmbiz_png/oBeibW4GQ8131iaEibRUAtOadF7e3U4Ozf3YonEaUZSXNsTIwkibbOchk7kEINJ6bibM2FY6jTPRv2xOBYibpNwdiakKg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=22)

注意 一定要发布 前往「版本管理与发布」→「创建版本」→ 发布应用，否则会提示“机器人能力未激活”

接下来还需要开通多维表格的权限 ， 入口是 “权限管理”

![Image 23](https://mmbiz.qpic.cn/sz_mmbiz_png/oBeibW4GQ8131iaEibRUAtOadF7e3U4Ozf3XZ4FYzZWDJBE0ZdPCLHHcMgDo17tUicdYAVHcJ4EPnfWmaxuB2qzWAA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=23)

最后发布

![Image 24](https://mmbiz.qpic.cn/sz_mmbiz_png/oBeibW4GQ8131iaEibRUAtOadF7e3U4Ozf3CbouAHIsm3XUZ5oRBk5YCNMwM51pb2uozQHUmibdSzNLIXHTCLb6XZg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=24)

### 二） 多维表格创建

创建一个多维表格， 字段全部都是 **文本类型，**  字段名字必须跟下方保持一致。

![Image 25](https://mmbiz.qpic.cn/sz_mmbiz_png/oBeibW4GQ8131iaEibRUAtOadF7e3U4Ozf3RQibh2YxVr2gGUaJRjDHNfEkRKZW8yAr28JD2AiaQgsYuMUPIvv2D7Zg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=25)

注意要从多维表格的 url 链接中获取两个关于该多维表格的重要信息。

https://zo8jrw69j7.feishu.cn/base/xxxx?table=yyyy&view=vews9N5JJH

**Xxxx 代表 多维表格的 token， yyyy 代表多维表格的 ID，保留备用。**

注意：

**这个多维表格一定要授权给文档应用。**

![Image 26](https://mmbiz.qpic.cn/sz_mmbiz_png/oBeibW4GQ8131iaEibRUAtOadF7e3U4Ozf31DTIsq6OwWgaFWoFTebGsGl3ADrjZpzS5Sjc2HAicIahzp94NMia8ibpQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=26)

添加之后的效果如下

![Image 27](https://mmbiz.qpic.cn/sz_mmbiz_png/oBeibW4GQ8131iaEibRUAtOadF7e3U4Ozf31rwtiaZ7RTHribOfIrEiaQb7CahMDodsicgD8r5VGz39YbXBH4sfF9ibUiaw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=27)

### 三） n8n 添加飞书 mcp

找到 n8n 左下角的 settings 选项

![Image 28](https://mmbiz.qpic.cn/sz_mmbiz_png/oBeibW4GQ8131iaEibRUAtOadF7e3U4Ozf3LESeCFKnMWe4icB3F6SDBWlDVOO3kMXccrCE5MY3LGX3B6w9klrTGww/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=28)

按照下图进行 飞书 mcp 安装

![Image 29](https://mmbiz.qpic.cn/sz_mmbiz_png/oBeibW4GQ8131iaEibRUAtOadF7e3U4Ozf3IvgMkoNFibNmKicDSnpDQwibrdfNek7yxIYh445CziaNIU51cr5ybYnoRg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=29)

### 四）在 n8n 工作流中新增飞书节点

配置如下

![Image 30](https://mmbiz.qpic.cn/sz_mmbiz_png/oBeibW4GQ8131iaEibRUAtOadF7e3U4Ozf3ptGVkVoNv2Oialtx6edL1cwPdPr4h9WtSB1rKZ6XKWClJa9YcbKmH4w/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=30)

首先先设置认证方式 ，填入第 1 步中的 appid 和 appsecret

![Image 31](https://mmbiz.qpic.cn/sz_mmbiz_png/oBeibW4GQ8131iaEibRUAtOadF7e3U4Ozf3C2g9zCIb12ibn2yPLguohd651WF5jIHnrUKCpc2ibBia2uU1na2gUB14w/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=31)

然后填入 第 2 步的多维表格的 token 和 tableId

![Image 32](https://mmbiz.qpic.cn/sz_mmbiz_png/oBeibW4GQ8131iaEibRUAtOadF7e3U4Ozf3m8HJsYpDDJEegjk74PjVY5y6kZE69coKAaHia5QKkNMPTIQtJ4VTNwQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=32)

最后在请求体中，增加以下内容：

![Image 33](https://mmbiz.qpic.cn/sz_mmbiz_png/oBeibW4GQ8131iaEibRUAtOadF7e3U4Ozf3A72VxWic40m9mdAIQvSKuxae9sqJFBuiau1rqa42zQJyicJia4uqkPD40g/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=33)

最后执行测试验证

![Image 34](https://mmbiz.qpic.cn/sz_mmbiz_png/oBeibW4GQ8131iaEibRUAtOadF7e3U4Ozf3YmMfWsjXztYaC6Ha5JXgVvrLz2J4zTxUFrtnmOcxdDcO7IgcjYficIQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=34)

以及到飞书多维表格中进行查看

![Image 35](https://mmbiz.qpic.cn/sz_mmbiz_png/oBeibW4GQ8131iaEibRUAtOadF7e3U4Ozf3I86wEmchLDptzWZmugXDq91dhtS4OmqAVCibU2z0LGtziaw3hibJufiayQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=35)

因为都是英文的，咱们还可以增加一个翻译字段。

![Image 36](https://mmbiz.qpic.cn/sz_mmbiz_png/oBeibW4GQ8131iaEibRUAtOadF7e3U4Ozf3wLAhTEWqNZKg6QuQwWTIyiaYEmODyYG9CSqtpeg5snot3FRjH8WibLGQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=36)

最终效果如下

![Image 37](https://mmbiz.qpic.cn/sz_mmbiz_png/oBeibW4GQ8131iaEibRUAtOadF7e3U4Ozf3yzVZ5kQSJByicJ2GwfDmAMGRO72sbKKP3GyXljgpzVVPWG4xO0Gx16A/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=37)

# 写在最后

Reddit 信息收集可以通过 n8n 工作流来搞定， 那如果有 AI 能帮助你自动养 reddit 账号，是不是就更有意思了？

感兴趣的小伙伴可以留言 “reddit 自动养号” ， 人多了下期二师兄再肝一期教程。

如果你也对n8n工作流感兴趣，欢迎链接我，送你一份智能体保姆级入门手册。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/oBeibW4GQ8131iaEibRUAtOadF7e3U4Ozf34vBDNkQ0NR0FibxN87bOjNv8icHldGJEwQAkIkJyJjp4Ua8ELyaCdUuA/640?wx_fmt=png&from=appmsg&watermark=1&wxfrom=5&wx_lazy=1&tp=wxpic#imgIndex=15)

![图片 1](https://mmbiz.qpic.cn/sz_mmbiz_png/oBeibW4GQ8131iaEibRUAtOadF7e3U4Ozf3iaP2PnO8YZw8ew455ibhp7OjpaojYvY5lYLAd23I2FVckgyryDqvQPVQ/640?from=appmsg&watermark=1&wxfrom=5&wx_lazy=1&tp=wxpic#imgIndex=16)

扫码领👆资料


二师兄


也可以加入到我们的n8n交流社群

![图片 2](https://mmbiz.qpic.cn/sz_mmbiz_png/oBeibW4GQ8131iaEibRUAtOadF7e3U4Ozf3b122icibvJS9c3jsZXC83Eqh76qAgq5cwsdfepU4hcJfUfxFy4WfTYNA/640?wx_fmt=png&from=appmsg&watermark=1&wxfrom=5&wx_lazy=1&tp=wxpic#imgIndex=17)

[#智能体](javascript:;) [#n8n](javascript:;) [#reddit](javascript:;) [#ngrok](javascript:;) [#n8n公网访问](javascript:;)

