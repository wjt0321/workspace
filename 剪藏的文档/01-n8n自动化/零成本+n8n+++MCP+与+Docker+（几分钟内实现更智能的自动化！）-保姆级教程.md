---

title: 零成本 n8n + MCP 与 Docker （几分钟内实现更智能的自动化！）-保姆级教程
date: 2025-12-25
tags: ["n8n", "工作流", "自动化", "docker", "Docker", "nas", "NAS", "部署", "教程", "入门", "上手", "保姆", "喂饭", "工作流自动化"]
category: 自动化工具
---


# 零成本 n8n + MCP 与 Docker （几分钟内实现更智能的自动化！）-保姆级教程

Original 程序员阿灏 [ven coding](javascript:void(0);)*2025年12月25日 08:21* *上海*



在小说阅读器中沉浸阅读

今天的文章主要step by step地分享n8n工作流的两种免费部署方式，一种是命令行直接部署，轻量极客式，另一种docker部署方式，简单懒人式。

并且会详细介绍如何在这两种方式下分别搭建Ai Agent和MCP的注意点和区别。

相信通过这篇文章，你会完全掌握免费使用n8n服务的技巧，并且可以感受到ai agent和mcp联合使用的强大效果。

### 

### 环境安装




免费使用n8n有两种方式，只要现在跟着n8n github上的教程，我们就能免费使用n8n。

![Image](https://mmbiz.qpic.cn/mmbiz_png/SMmzFib4ekxSOl9qGEAibtuj4IZ4Mfic1sWKNKOyFkmYrH0EZ3zWrmptMeJRl5xbOJss52vqwhEgGx7ro1TLSpshg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=0)

可能你会对npx或者docker这样的名词感到陌生，不用担心，我会一步步解释这些是什么概念，如何使用，你会像我一样把n8n在本地跑起来。

**第一种：通过命令行方式来安装n8n**

![Image 1](https://mmbiz.qpic.cn/mmbiz_png/SMmzFib4ekxSOl9qGEAibtuj4IZ4Mfic1sW65GQdSSoFQggdeJfcVz1e3eDQTczv64BRWgsACDylybDA7edyQgt7w/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=1)

点击进入npx安装教程，来n8n的官方文档页面，官方说明需要提前安装nodejs，并且规定了nodejs的版本是20.19到24.x之间。

![Image 2](https://mmbiz.qpic.cn/mmbiz_png/SMmzFib4ekxRfHSWSYRXym6icWkVkQiaBW7TXEbT2a1gjgywzhEiaXfGpMIIj39A7XY3BkDeyfvDArrXrO23PBozdg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=2)

在我们开始之前，不妨可以稍微了解下npx,npm,nodejs这些名词的概念

![Image 3](https://mmbiz.qpic.cn/mmbiz_png/SMmzFib4ekxSOl9qGEAibtuj4IZ4Mfic1sWmjvpMyxAJx4u1QhwTiaNKrgOaYdOA2zpEia7cCKfHZiaaMkvXoPNNwC9w/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=3)

用ai来搜索下：

![Image 4](https://mmbiz.qpic.cn/mmbiz_png/SMmzFib4ekxSOl9qGEAibtuj4IZ4Mfic1sWxkic6nZRkricT4z1rpNzj0YQibcXVKJB5BCP5pvJia4HZV7Mue2StVx83A/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=4)

![Image 5](https://mmbiz.qpic.cn/mmbiz_png/SMmzFib4ekxT5k8w9hYjB4pYB7mSGvgLoDr5AJVROB6pmUM3IUOSaFTibjXPdh3GZ8AGpPELiaBTkR6iaqXJ6xsO9A/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=5)

![Image 6](https://mmbiz.qpic.cn/mmbiz_png/SMmzFib4ekxRfHSWSYRXym6icWkVkQiaBW79ibImnXm85ARNsmkAqVibZib2adPx26MsWWNxREibkiceT2UJL6BiaOOnw1A/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=6)

![Image 7](https://mmbiz.qpic.cn/mmbiz_png/SMmzFib4ekxSOl9qGEAibtuj4IZ4Mfic1sWIkibkK07XwnSPiascBoa3XKVJjzurr2FmPhI3o6MMaOnic22LnBV1Dlcg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=7)

所以nodejs是一个javascript运行环境，这这就是为什么 n8n需要 Node.js——因为nodejs它提供了n8n实际执行的环境。因此，在安装任何其他东西之前，您必须安装 Node.js，安装完nodejs，就可以用npm和npx工具了。

而npx其实是npm 5.2版本后附带一个工具包，唯一的区别是：npx是立即运行 n8n，无需全局安装，适用于测试或一次性运行。而npm是全局安装 n8n。您可以以后随时运行n8n。

了解清楚后，我们就可以安装了：

先来安装nodejs：

![Image 8](https://mmbiz.qpic.cn/mmbiz_png/SMmzFib4ekxRfHSWSYRXym6icWkVkQiaBW7ias6AN5IEsFWAlLeUPxH1d0MT7gfasQlkwy04SZUL6lTYtbK9Xn1fCg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=8)

按照刚才说过的，nodejs版本我们需要选择20.19到24.x之间的，系统根据自己的电脑选择合适的，

按照刚才说过的，nodejs版本我们需要选择20.19到24.x之间的，系统根据自己的电脑选择合适的。

![Image 9](https://mmbiz.qpic.cn/mmbiz_png/SMmzFib4ekxT5k8w9hYjB4pYB7mSGvgLoD3XQxiauc5QGC3vqes0gpcsYJ2VSoMXBEAboYv4A27pay8yOicMFK7Yw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=9)

下载后安装即可。

![Image 10](https://mmbiz.qpic.cn/mmbiz_png/SMmzFib4ekxSOl9qGEAibtuj4IZ4Mfic1sWPz2Xe3QX6JuLNLDQlGj7j2rmI15ursud7nvqibYjutEP0326XTAxP3A/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=10)

然后打开命令行界面，输入命令，检查安装的版本：

![Image 11](https://mmbiz.qpic.cn/mmbiz_png/SMmzFib4ekxRfHSWSYRXym6icWkVkQiaBW70gzzRpJDO3iaBaA9kk7JRaMnicgXHE3IktgoyQ1icM9YIbrJTsSKXzhMg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=11)

版本无误后，可以直接通过npx n8n命令来启动本地n8n服务。

![Image 12](https://mmbiz.qpic.cn/mmbiz_png/SMmzFib4ekxRfHSWSYRXym6icWkVkQiaBW79ThsibnicTia4ReD5SzdkgdnI1YnX1mk7LKD8BQCC1TqdcVS4C3ygALrA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=12)

运行成功后，会出现一个本地的访问网址：http://localhost:5678/，根据提示，按o就可以在浏览器打开页面了，然后进入注册流程，填写一些基本信息后，进入n8n的编辑界面。

![Image 13](https://mmbiz.qpic.cn/mmbiz_png/SMmzFib4ekxSOl9qGEAibtuj4IZ4Mfic1sWsc59BpWFnvica8Bmr9sa9ppQplAxiaiaicErRI3GWmtC9LTj1xqc6KaH1w/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=13)

![Image 14](https://mmbiz.qpic.cn/mmbiz_png/SMmzFib4ekxRfHSWSYRXym6icWkVkQiaBW706JyRQlOqbyZh8kOFY6hfNiabW335G7bG3M0fhvoZjrypaqO1HScAyg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=14)

![Image 15](https://mmbiz.qpic.cn/mmbiz_png/SMmzFib4ekxSOl9qGEAibtuj4IZ4Mfic1sWRI1KD5lmdMaZ6bShcODC8oSgwa7GZCHrtmBiaql84TmokbzKm4eE6kA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=15)

或者运行npm install n8n -g ，可以全局安装n8n。

![Image 16](https://mmbiz.qpic.cn/mmbiz_png/SMmzFib4ekxSOl9qGEAibtuj4IZ4Mfic1sWqDmXXSpanky9SSWWwQeldjicPOEwaB71QeBcibib7QLqLU7JAcVIb1gtA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=16)

安装完成后，再通过命令n8n start启动本地n8n服务。

![Image 17](https://mmbiz.qpic.cn/mmbiz_png/SMmzFib4ekxSOl9qGEAibtuj4IZ4Mfic1sWJXbzdM1xolm2iccaOp2COmAeIXCBljr92uakyVHCHvjYyib70nay8oAw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=17)

安装完成后，再通过命令n8n start启动本地n8n服务

![Image 18](https://mmbiz.qpic.cn/mmbiz_png/SMmzFib4ekxSOl9qGEAibtuj4IZ4Mfic1sWJXbzdM1xolm2iccaOp2COmAeIXCBljr92uakyVHCHvjYyib70nay8oAw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=18)

跟上面一样，运行成功后，会出现一个本地的访问网址：http://localhost:5678/，根据提示，按o就可以在浏览器打开页面了。

![Image 19](https://mmbiz.qpic.cn/mmbiz_png/SMmzFib4ekxSOl9qGEAibtuj4IZ4Mfic1sWsc59BpWFnvica8Bmr9sa9ppQplAxiaiaicErRI3GWmtC9LTj1xqc6KaH1w/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=19)

第二种：通过docker的方式来安装n8n 

![Image 20](https://mmbiz.qpic.cn/mmbiz_png/SMmzFib4ekxT5k8w9hYjB4pYB7mSGvgLo5E3vaoH9b7Fiarss8uwcQKPl7iaI7hdVxAY0xVuZ0glEcGfsRnM6QNvw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=20)

点击进入Docker安装教程：

![Image 21](https://mmbiz.qpic.cn/mmbiz_png/SMmzFib4ekxT5k8w9hYjB4pYB7mSGvgLoticotLfSEtr4BeANKaJswES9XmeJ6vqKJVyibZ4982NyX3AZQA6xkia1g/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=21)

还是一样，先来解释下什么是docker？ 我们一样用ai来搜索下：

![Image 22](https://mmbiz.qpic.cn/mmbiz_png/SMmzFib4ekxT5k8w9hYjB4pYB7mSGvgLorE3ib0hicsUv1niaW4QT1iahAb3ZTzia0N4nAIibDPC7XKxTewpDQYmcRl2g/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=22)

![Image 23](https://mmbiz.qpic.cn/mmbiz_png/SMmzFib4ekxT5k8w9hYjB4pYB7mSGvgLoWMB3RWtDSIJsw7Ymia8v8yzYOt8aeiaHcnXxZRMed6uS8N4jfljMcVibA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=23)

所以docker其实就像是一个轻量级的虚拟机，它是一款自带运行环境的应用程序，因此不受操作系统的影响，当把一个基于docker的应用迁移到其他机器上时，这个应用一样可以跑起来，不需要重新安装环境了，听起来是不是感觉很方便。

所以我们现在是要把n8n安装在docker里面，这样n8n就可以迁移到任何一台机器上运行了。

![Image 24](https://mmbiz.qpic.cn/mmbiz_png/SMmzFib4ekxT5k8w9hYjB4pYB7mSGvgLortCuLKicdD2fDSjG5gxVPnicIPSJSv6SkNpgRZD6iaad5JBJkJb3uMbAQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=24)

安装Docker之前，我们先看一下先决条件：

![Image 25](https://mmbiz.qpic.cn/mmbiz_png/SMmzFib4ekxT5k8w9hYjB4pYB7mSGvgLoazHK4Dw959lEpMDRBAZKnH3DVaGicMKAF4xy30PxCnyjh25PWAxP5WQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=25)

Docker Desktop版本支持Mac、Windows、Linux，所以我们可以选择这个版本：

![Image 26](https://mmbiz.qpic.cn/mmbiz_png/SMmzFib4ekxSOl9qGEAibtuj4IZ4Mfic1sWDT9ibrpqHaIK4btpf7crjRibsVQjVmdFJUwskUPZUtmoTvwkicnYrqmFg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=26)

根据自己的电脑系统选择相应的版本即可：

![Image 27](https://mmbiz.qpic.cn/mmbiz_png/SMmzFib4ekxSOl9qGEAibtuj4IZ4Mfic1sWNicHBuFgNUeZ1SicGicmCkVgGiaxk9yvBvAYsrHP9SBjibB8qovwUX4FLkg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=27)

下载好后就可以安装。

![Image 28](https://mmbiz.qpic.cn/mmbiz_png/SMmzFib4ekxSOl9qGEAibtuj4IZ4Mfic1sWvrDEB6a6YvibQSecHXUDEIP0mMCgnbnX6vo8wfc1b6MiaNic416LwOaew/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=28)

安装好后就可以启动docker desktop。

![Image 29](https://mmbiz.qpic.cn/mmbiz_png/SMmzFib4ekxT5k8w9hYjB4pYB7mSGvgLoKxCAYs0Hib8ZdpDbToXecPpwyC27OricCV9icPKTOtrZn8NVib5wIqePQg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=29)

然后搜索n8n, 点击PULL，把n8n的docker镜像拉取到本地。

![Image 30](https://mmbiz.qpic.cn/mmbiz_png/SMmzFib4ekxRfHSWSYRXym6icWkVkQiaBW7ncg0eBJ4Cq2RuERgqCovewwicvJsMOaT9XabcqRo7WMhMA2Lib6cxtyw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=30)

大概不到2G大小的镜像，等待10分钟左右即可拉取成功：

![Image 31](https://mmbiz.qpic.cn/mmbiz_png/SMmzFib4ekxT5k8w9hYjB4pYB7mSGvgLokoAiar6iaerXZSMIUDyAcAfKgPZUUWtAby044R9KBdFF5c5QjaFe0s9g/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=31)

![Image 32](https://mmbiz.qpic.cn/mmbiz_png/SMmzFib4ekxT5k8w9hYjB4pYB7mSGvgLoibNUusYaf3aj0thE9ia3gZ7I2LmY3cjb43yn8j501fCdnc4APict3iby7Q/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=32)

然后启动n8n。

填写container name，ports，默认可以填写5678，其他暂时可以不设置，点击Run。

![Image 33](https://mmbiz.qpic.cn/mmbiz_png/SMmzFib4ekxSOl9qGEAibtuj4IZ4Mfic1sWcnO8QiaB9kGfJn8cORlTc9Un5zBwMkiaKDlYHUMJSVKMOEQKRicGOpvoQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=33)

启动成功后，可以看到跟刚才一样的本地网址。

![Image 34](https://mmbiz.qpic.cn/mmbiz_png/SMmzFib4ekxSOl9qGEAibtuj4IZ4Mfic1sW3MuQq6A8fAkKtJyMXNTjIAeABCKU0TIGibFzjTARF8I8s5jg8ImkXbw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=34)

在浏览器中打开网址进入n8n初始化页面，开始注册流程。

![Image 35](https://mmbiz.qpic.cn/mmbiz_png/SMmzFib4ekxT5k8w9hYjB4pYB7mSGvgLoVmEM7ZWA2oaeXleL4ia1AAfkRzhExwopRTud9T2Aq4zPSJTJLqibWLuQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=35)

填写基本信息。

![Image 36](https://mmbiz.qpic.cn/mmbiz_png/SMmzFib4ekxSOl9qGEAibtuj4IZ4Mfic1sWRSFWTgmAicV1MubvfBUrBNBsvZRUJCLovM5q1jCF5F1ic2my6p9Ae15Q/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=36)

进入n8n编辑环境：

![Image 37](https://mmbiz.qpic.cn/mmbiz_png/SMmzFib4ekxSOl9qGEAibtuj4IZ4Mfic1sWcqRALlSLAZe52pAOCInk6ibbLC6z9ezKgEFPaPkgmhwXbQu1jIkrdBw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=37)




![Image 38](https://mmbiz.qpic.cn/mmbiz_png/SMmzFib4ekxT5k8w9hYjB4pYB7mSGvgLoQADNdYicfEuFkXzAb4X9lIZCvQoZh7KGpI3J7dX1rZ0R9ebWABN0yCw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=38)

### MCP启动

### 

环境安装好后，我们用n8n来搭建一个Ai Agent + MCP的工作流，来感受下n8n是如何给我们提效加速的。

ai agent的概念相信大家都表熟悉了，n8n中也集成了ai agent的节点：

![Image 39](https://mmbiz.qpic.cn/mmbiz_png/SMmzFib4ekxT5k8w9hYjB4pYB7mSGvgLoCGqGtdGqQ5WBauvwlDpKd5bqL05HEjMs2ocp85Vx1k5RKeqpAfFKmQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=39)

可以看到ai agent包含了三部分内容，分别是Chat Model , Memory ,Tool 。

Chat model就是ai大模型，像openai , claude ,groq ,deepseek ,gemini等。

![Image 40](https://mmbiz.qpic.cn/mmbiz_png/SMmzFib4ekxT5k8w9hYjB4pYB7mSGvgLo5I8E6VHcFcfExwUB87tXdCLibR2a9lCXhlRnr8NDbPPH3EVy5ibr26xw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=40)

Memory是ai大模型的记忆能力，能够记住用户交互中的关键内容，帮助理解用户前后的逻辑。

![Image 41](https://mmbiz.qpic.cn/mmbiz_png/SMmzFib4ekxSOl9qGEAibtuj4IZ4Mfic1sWwL0CicicTnibP6C6Rj4icBlTiaznCibyNQMyic5xlfSP4WKkCMhFc3y1iaJdfQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=41)

Tool指的是外部工具，Ai大模型可以根据用户指令调用外部工具，使功能更加强大，而这部分也是接下来要讲的MCP的功能。

![Image 42](https://mmbiz.qpic.cn/mmbiz_png/SMmzFib4ekxRfHSWSYRXym6icWkVkQiaBW75rciaw1lAxH1zciab1mCDVMk0R74HiaB9FDywP92lhCq9pY6bVnAn3apA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=42)

那么什么是MCP呢？ 

https://github.com/modelcontextprotocol

![Image 43](https://mmbiz.qpic.cn/mmbiz_png/SMmzFib4ekxT5k8w9hYjB4pYB7mSGvgLoa9QR6zKc8NkRvPCBnEqJFrCWQvH7cLmReH2tOmxEKq2ksqXLt83Bxg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=43)

简单来说，MCP就是连接大模型和外部工具的协议，通过MCP，可以让用户指令不仅操纵大模型，还可以通过大模型更加精准地调用外部工具来完成任务。

下面我们就来尝试下Ai agent + MCP效果：

先增加一个Chat Tigger的节点，这个节点主要用来做用户指令输入

![Image 44](https://mmbiz.qpic.cn/mmbiz_png/SMmzFib4ekxSOl9qGEAibtuj4IZ4Mfic1sWr3jrxjmCLM2CqwOEyUXY7mwXCUCMricyYKzAnEfVTEbibhy4GS0N8Z7Q/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=44)

当输入一些用户指令，然后回车，就会触发这个节点的执行：

![Image 45](https://mmbiz.qpic.cn/mmbiz_png/SMmzFib4ekxSOl9qGEAibtuj4IZ4Mfic1sWshkmDTsSzibp3mTk9tsic0PGqMnNP7CrGLHfnWBRAiaG7uXNEX45xlFxw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=45)

然后添加核心节点：ai agent

![Image 46](https://mmbiz.qpic.cn/mmbiz_png/SMmzFib4ekxT5k8w9hYjB4pYB7mSGvgLo86icbe3pNrbRbia7pSOL4zibfkHkcBRVO53Le5n4YVU91f0r8pbiaiaWQDA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=46)

然后我们来配置Chat Modal，Memory和Tool，

先来配置Chat Modal，跟之前的文章一样，需要配置大模型的apikey，我还是用openai来举例 ,将openai的apikey加到n8n节点的credential中：

![Image 47](https://mmbiz.qpic.cn/mmbiz_png/SMmzFib4ekxT5k8w9hYjB4pYB7mSGvgLotQ8vQWKVSpBpxoBlyQlrJ8mWAvib0HuWKghD2V4vXhxfGXbQTXyV4ww/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=47)

然后来配置Memory, 可以用最简单的simple memory节点，

![Image 48](https://mmbiz.qpic.cn/mmbiz_png/SMmzFib4ekxSOl9qGEAibtuj4IZ4Mfic1sWlIrotAnatmXhhsia5SaPLFh0JKsu9G0aXRPVYiaPibkPRY8ICyib38OaUQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=48)

配置项保持默认值即可：

![Image 49](https://mmbiz.qpic.cn/mmbiz_png/SMmzFib4ekxSOl9qGEAibtuj4IZ4Mfic1sWKH0SSvPtnicMe6AuQWjeYu8GbX7mXNVoibu3Ch6PhAbxian6mufxbIwCA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=49)

在进入mcp前，我们可以来尝试下目前的效果：

![Image 50](https://mmbiz.qpic.cn/mmbiz_png/SMmzFib4ekxT5k8w9hYjB4pYB7mSGvgLoyL0PyibMQDvMvSV9hQCgpIU2j9An2kOib20GYqPicBbBLWJNrFuxiauZicQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=50)

可以看到用户输入指令，得到了大模型的正常回复，并且我们注意到大模型是由记忆的，因为有了Memory，如果去掉Memory，大模型就只能提供单次对话功能，可以尝试下：

![Image 51](https://mmbiz.qpic.cn/mmbiz_png/SMmzFib4ekxRfHSWSYRXym6icWkVkQiaBW7ibHDpFdpuMTNAia90aCNrddcgaflWwb4PBzeWyibvO4iaWu95CbNRzbdMg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=51)

看到了吧，去掉了memory功能后，大模型第二次回答的时候就已经不认识我了，哈哈哈。

我们现在开始设置Ai Agent的Tool的部分，我们先回到modelcontextprotocol这个开源项目中来，

我们来查找servers这个项目库，看看目前有哪些mcp server可以用，可能这里还需要补充一个概念，刚才说到mcp是llm（大模型）和外部工具连接的协议，那么这时候llm（大模型）其实就是客户端，而外部工具就是服务端。

我们点进servers去看下，可以看到像AWS、Brave Search、Github、Google Driver、PostgreSQL、Slack、SQLite等都是支持MCP模式等，提供了专门的MCP Server，所以这些我们都是可以让大模型去连接的，而据我所知，目前MCP Server其实不仅仅是目前这里看到的这些了，有非常多的MCP Server，全世界的开发团队、个人开发者都在这块做了很多贡献。

![Image 52](https://mmbiz.qpic.cn/mmbiz_png/SMmzFib4ekxRfHSWSYRXym6icWkVkQiaBW77UNjWicRFdvkzicKCXc8P5jlRiaibpsick9YMAHB9nOkMibAiaTPzjDHwfwUA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=52)

![Image 53](https://mmbiz.qpic.cn/mmbiz_png/SMmzFib4ekxSOl9qGEAibtuj4IZ4Mfic1sWEaWO5OsjwVobZnGzB4fJdldwdce0RGhm7mzWL4byGzcvgY3s3PfqRg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=53)

我们今天就以Brave Search这个MCP Server来做例子，来感受下大模型连接MCP Server的实际效，

点击进入Brave Search 这个MCP Server项目，

![Image 54](https://mmbiz.qpic.cn/mmbiz_png/SMmzFib4ekxSOl9qGEAibtuj4IZ4Mfic1sWoLNNxulsB8ACe7YYxicp7fm2zHgB8gmLNbficlJ0YupFNUDoibMsZPy9w/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=54)

Brave其实类似一个搜索引擎的功能，支持网页搜索、本地商家搜索、图片搜索、视频搜索、新闻搜索以及 AI 驱动的摘要。

![Image 55](https://mmbiz.qpic.cn/mmbiz_png/SMmzFib4ekxT5k8w9hYjB4pYB7mSGvgLo6E6my35n2ibRQib7kXUMdIFianwcuFc6e19PFic50tp7HACz9ILB2cV0fQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=55)

我们回到n8n去查询mcp相关的节点功能，搜索mcp，添加MCP Client Tool节点，

![Image 56](https://mmbiz.qpic.cn/mmbiz_png/SMmzFib4ekxT5k8w9hYjB4pYB7mSGvgLo7Zia86ZJIf2HYKn00smQJwC28xUxibw9InSu6mk6fDHiaicwibIIjdQucVg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=56)

然后配置Mcp Client Tool节点，发现目前n8n中的mcp client支持两种连接方式，一种是Http Streamable，另一种是Server Sent Events，但过期了。

![Image 57](https://mmbiz.qpic.cn/mmbiz_png/SMmzFib4ekxT5k8w9hYjB4pYB7mSGvgLoictXqC9uGRvTJdcG8DVMk7Fc7YgNYDGDXh6j7R1aDkf9dVO52ic6icyBg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=57)

我们回到Brave Search的github项目中查看，发现目前Brave Search已经迁移到2.0了，2.0默认支持的协议是STDIO。

![Image 58](https://mmbiz.qpic.cn/mmbiz_png/SMmzFib4ekxRfHSWSYRXym6icWkVkQiaBW7iawHKfwfdWI8uqf8H6dHZmJqAdZ23lAFHz3VIMdIkmFdjrlAOu43dOw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=58)

于是通过不断查询调研，找到一个github上的可用的项目n8n-nodes-mcp：https://github.com/nerding-io/n8n-nodes-mcp

![Image 59](https://mmbiz.qpic.cn/mmbiz_png/SMmzFib4ekxSOl9qGEAibtuj4IZ4Mfic1sWRS69YGmH3iawCEr6Zxm3MPGhSBbk4Ogy66HEhiaStVmDyrblCVpWXLgg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=59)

这个项目可以支持向n8n中增加宿舍区节点的的方式，来增加MCP Client的支持，并且是支持STDIO连接方式的，太好了，我们可以用这种方式集成了。

回到n8n服务，打开左下角的Settings，

![Image 60](https://mmbiz.qpic.cn/mmbiz_png/SMmzFib4ekxSOl9qGEAibtuj4IZ4Mfic1sWFibf692j6VGVgzTmmYUe5klHkkW1jHGs0na0ib0kcicXGfuw7m9TyGK1Q/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=60)

点击左侧的Community nodes，然后点击install a community node ,

![Image 61](https://mmbiz.qpic.cn/mmbiz_png/SMmzFib4ekxT5k8w9hYjB4pYB7mSGvgLooDo72ib50nJLficoDRbXhMRG2cYibMMicznYUwvFKbsnsJmLLw64ycUdTA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=61)

输入刚那个项目n8n-nodes-mcp, 勾选， 点击Install。

![Image 62](https://mmbiz.qpic.cn/mmbiz_png/SMmzFib4ekxRfHSWSYRXym6icWkVkQiaBW7NWgtiaFG6xdlYDqMVIKeJGjOKr65QAnnLmyaH3GZzg8E0GPkMNhzIIA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=62)

安装完成：

![Image 63](https://mmbiz.qpic.cn/mmbiz_png/SMmzFib4ekxT5k8w9hYjB4pYB7mSGvgLovNASn8lYhZvLhRz6YYVd9hVibCVE5FhP7ejfUTRz4zYNEXeCZlu9Bdg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=63)

然后回到workflow，重新添加MCP Client节点，搜索mcp，点击右侧新增的这个节点，内容描述是Use MCP client。

![Image 64](https://mmbiz.qpic.cn/mmbiz_png/SMmzFib4ekxSOl9qGEAibtuj4IZ4Mfic1sWicc4BykLvYdh2dlibNxgg92nHbQjgDvJs8DaCPOwI910Sm9Zca7FOrsg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=64)

配置MCP Client，先来配置Credential。

![Image 65](https://mmbiz.qpic.cn/mmbiz_png/SMmzFib4ekxSOl9qGEAibtuj4IZ4Mfic1sWZExaGJmib3ZNgErqfHKVm5RE2EzWZHheBLnl3RAW7yia82EXvRYjiaYPg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=65)

配置Credential一共有三个选项，分别是Command, Arguments 和 Environments，

我们再回到Brave Search这个github项目，不管n8n服务是docker安装的还是命令行npx安装，统一都用下面的配置来Credential。

![Image 66](https://mmbiz.qpic.cn/mmbiz_png/SMmzFib4ekxSOl9qGEAibtuj4IZ4Mfic1sW2x98zyG2tLcOxXxtcRhsmFOic81BGxia8zTSM29NPaxN6EQ1rjh6vW7g/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=66)

将配置command和args的值分别填入n8n节点的Command和Arguments中，

![Image 67](https://mmbiz.qpic.cn/mmbiz_png/SMmzFib4ekxSOl9qGEAibtuj4IZ4Mfic1sW77PyYAsIZrjbTF2CUL1uwic1mcYIiaYJw0r63hNsbBVRYb4CnrkBMzWw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=67)

BRAVE_API_KEY需要去https://api-dashboard.search.brave.com/ 进行注册账号，然后申请apikey

将申请到的apikey填入这里的xxxx部分即可。

Credential配置好后，然后配置Tool Description，这个可以自动配置，也可以手动配置，都可以。

![Image 68](https://mmbiz.qpic.cn/mmbiz_png/SMmzFib4ekxT5k8w9hYjB4pYB7mSGvgLoSQ3knjyKkw8vSuuB7wuZS7jomHV0TZQoiakJvtIa8GyickmI58Uwibdew/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=68)

最后配置Operation，这里有多种操作，我们可以选择List Tools来尝试看看MCP Server支持多少种操作。

![Image 69](https://mmbiz.qpic.cn/mmbiz_png/SMmzFib4ekxT5k8w9hYjB4pYB7mSGvgLornHJhtSiaZoUMRbSRY6oRpmgq6T5DEmXOLYjXIR7gNEU1vLYIeicep9g/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=69)

这个设置完成后，就差最后一步了，我们再回到n8n-nodes-mcp的github官网，需要将

这个环境变量的值设置为TRUE：

![Image 70](https://mmbiz.qpic.cn/mmbiz_png/SMmzFib4ekxSOl9qGEAibtuj4IZ4Mfic1sWKwZ7WlukdhibJ8VXhlpPHuxUjaZHvnpdUL6StK0DqWdDwVUjygICZSQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=70)

同样，提供了Docker和命令行(npx或npm安装）两种方式,

![Image 71](https://mmbiz.qpic.cn/mmbiz_png/SMmzFib4ekxSOl9qGEAibtuj4IZ4Mfic1sW61v0vovic7S78zoy6yqhXp2FIKicGvmWayZRCBmvyiaQ5C4NhHVkkKSMQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=71)

如果是命令行安装的方式，先在命令行下执行export操作，再重启n8n。

![Image 72](https://mmbiz.qpic.cn/mmbiz_png/SMmzFib4ekxSOl9qGEAibtuj4IZ4Mfic1sW05kdGVC3fSnX3JRsLPnYP15qvGDVY8AXekWVC8FIEkghSYSIhK0c7A/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=72)

如果是docker安装的方式，

在运行容器的配置项里加入环境变量，设置环境变量的值为True，保存即可。

然后再回到n8n MCP Client节点点击Execute Step 执行，就能看到MCP Server的返回结果了，可以看到Brave Search 支持brave_web_search , brave_local_search, brave_video_search和brave_image_search,brave_news_search,brave_summarizer这6种seach操作。

![Image 73](https://mmbiz.qpic.cn/mmbiz_png/SMmzFib4ekxSOl9qGEAibtuj4IZ4Mfic1sWsfUR5HyLeTusZibEtp7kZNTnZibHNpAribqjCCoFBX4Olibv07n0YZufrA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=73)

就快大功告成了，我们回到n8n的workflow, 点击AI Agent ，加入system提示词。

![Image 74](https://mmbiz.qpic.cn/mmbiz_png/SMmzFib4ekxSOl9qGEAibtuj4IZ4Mfic1sW6gWmicdl40MsY4flesXx1IvfWXZAvzDWwuicNY9I1upd7IWYD3X3PAGg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=74)

system提示词的作用保障大模型在需要的时候可以调用Tool的功能，如果没有system提示词的保障，很可能大模型就会随便回答我们的问题，而最终不会调用到MCP Server中的功能了。

具体的调用规范如果有时间深入研究，也可以看这里：https://modelcontextprotocol.io/specification/2025-06-18/server/tools

![Image 75](https://mmbiz.qpic.cn/mmbiz_png/SMmzFib4ekxT5k8w9hYjB4pYB7mSGvgLoMq2dfoRH0wILwO61xibq9ZggWp2SDickcHrRtYXKbXdT1zFnrP3c6XRg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=75)

我们用Ai来给我们生成一段针对brave search 这个MCP server的system 提示词 。

```Plain Text
You are an AI agent connected to an external tool environment.
This environment provides dynamic capabilities through one or more tools.
You do not need to know the tool names in advance — you can discover and invoke them automatically.

YOUR BEHAVIOR
- Whenever the user's request requires data retrieval, reasoning with external knowledge, or actions beyond your internal memory, explore and use the available tools.
- Determine when external information is required (for example: current events, factual lookups, location-specific data, online content, images, videos, summaries, or lists).
- When a suitable tool is available, invoke it instead of fabricating an answer.
- When no tool can satisfy the query, clearly explain your limitation.

INTERACTION PRINCIPLES
- Do not mention tool names, endpoints, APIs, or implementation details in your reply.
- Present answers naturally as if you directly know or found the information, without referencing any backend process.
- Use concise, factual, and human-readable language.
- When a tool returns structured results (lists, items, summaries), convert them into natural sentences or bullet points.
- If tool output is insufficient, state that results were limited and suggest a better query.

FAIL-SAFE
- If a tool invocation fails or no tool exists, gracefully explain that live results are unavailable right now and suggest how the user could refine the question.

Your goal is to provide grounded, up-to-date, and accurate responses by intelligently discovering and invoking external tools when necessary — without ever exposing the tool layer itself.
```

将提示词复制到system message中，

![Image 76](https://mmbiz.qpic.cn/mmbiz_png/SMmzFib4ekxT5k8w9hYjB4pYB7mSGvgLoBmf6NtwD4GZFG1TzfbicDmSecR9CM1Ky0ehKvP656SJpCxVl1J6IpWA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=76)

再加入一个MCP Client节点，用来执行具体的功能，

![Image 77](https://mmbiz.qpic.cn/mmbiz_png/SMmzFib4ekxT5k8w9hYjB4pYB7mSGvgLo3PGjHjpoTJkLSyLrvEhcyaa7KHiax8dVrcgjVQ9fRS8kDClagCJbaRA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=77)

配置节点：

![Image 78](https://mmbiz.qpic.cn/mmbiz_png/SMmzFib4ekxRfHSWSYRXym6icWkVkQiaBW7LbSnAl2LgLCutTpTBu3qdzfRbV74sdzIxZmwL8focvgx6HGGiajicDkg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=78)

然后执行整个workflow，尝试让ai给我找出10个最火的ai视频生成工具，执行成功。

![Image 79](https://mmbiz.qpic.cn/mmbiz_png/SMmzFib4ekxRfHSWSYRXym6icWkVkQiaBW7COVWpBXTbXFwRc9HbNfDltacoA9A1uwu62koVcg83CNnxY8jQlS2kA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=79)

### 结尾




今天的内容就到这里，下一期将分享如何将n8n和我们的产品思维相结合，不仅打造我们生活的自动化，还能实现我们商业自动化（尤其是我们的跨境电商），记得保持关注阿灏。




