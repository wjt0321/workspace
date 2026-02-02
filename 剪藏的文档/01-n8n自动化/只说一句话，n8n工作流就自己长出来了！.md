---

title: 只说一句话，n8n工作流就自己长出来了！
date: 2025-10-05
tags: ["n8n", "工作流", "自动化", "工作流自动化"]
category: 自动化工具
---


# 只说一句话，n8n工作流就自己长出来了！

Original 鲤鱼冲啊 [鲤鱼冲啊](javascript:void(0);)*2025年10月05日 12:02* *福建*

最近看到不少教程，讲述了利用mcp可以快速自动创建n8n工作流并且部署到线上，忍不住试了下，结果工作流没有自动部署，而且一直报错。休息了一天，重整旗鼓，这次仔细查看了文档，补充了步骤，并且降低工作流难度，终于成功了！

解释一下什么是MCP，这是一种协议，允许大语言模型访问自定义的工具和服务。在这里，我感觉起到的作用类似于专业知识库，提供了齐全的n8n官方文档并且可以供大模型查询。

目前可以用的mcp有两种（n8n官方也快要出了），一种叫n8n-mcp（https://github.com/czlonkowski/n8n-mcp），一种叫n8n-mcp-server（https://github.com/leonardsellem/n8n-mcp-server），看了别人的测评，这两种效果应该差不多，因为n8n-mcp更新最勤快，星最多，所以这里选它！

先安装Node.js，https://nodejs.org/zh-cn/download，这里按实际选择

![Image](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatN1TjrM4toNNOpf6XeeaicUm1LOvPG0M4kngySMX5bTReEueG24Q7wRiacnuuibsQecWrgBppuuVPqIw/640?wx_fmt=png&from=appmsg#imgIndex=0)

中间有个是否弹窗安装依赖的选项打钩，当安装完Node.js后会自动安装依赖（开着魔法），一直到出现类似如下提示，说明依赖安装成功，按Enter键退出。

![Image 1](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatN1TjrM4toNNOpf6XeeaicUmefs9n3ZHUKe3X2oIEzs4ZvLkMNTLpGPBZBYWibPuwcMqqWIV0icMhBNg/640?wx_fmt=png&from=appmsg#imgIndex=1)

打开运行--cmd

![Image 2](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatN1TjrM4toNNOpf6XeeaicUmia5aOhYH2plQIZuKgRFYzGNXpmPnII4bV2gZLiamRhbTVET0mmh2SXRA/640?wx_fmt=png&from=appmsg#imgIndex=2)

可以看到node已经安装成功。

![Image 3](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatN1TjrM4toNNOpf6XeeaicUmJVNL4rfspU3OrPxCw4Yn94ib5EdjIYUwUQJblI9IXrjufVPrRt7MCYg/640?wx_fmt=png&from=appmsg#imgIndex=3)

用npx n8n-mcp命令临时运行npx（用这种方式不会本地安装，但可以确保获取到最新版），会询问是否可以临时下载并运行，输入y，mcp服务器运行成功，这个终端窗口不要关闭，可以最小化。（之前没有自动部署，我怀疑可能是漏了这一步，如果想本地或者通过Docker安装的，步骤不一样，具体看文档）

![Image 4](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatMIN69PJvTZIJWKTciatmHGpricepynjzECmWicwx4XLxf82BKH7RItFUcQUImCK5uONiaoc3JIvIfeCw/640?wx_fmt=png&from=appmsg#imgIndex=4)

下载安装TRAE国际版，https://www.trae.ai/

打开TRAE后找到Builder

![Image 5](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatNsDDxrxNbbJv2ibDictgqZcIdBHnC8XSiaYicuWMjmGia1RzfW6Pv1D4qPIWiaksiby0bsgp4mIExOOLeicA/640?wx_fmt=png&from=appmsg#imgIndex=5)

选择Builder with MCP--前往添加

![Image 6](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatNsDDxrxNbbJv2ibDictgqZcIia2Z2icBicmMSiaEXldMSUZEHe1ib2R3qnCKECLk4EezvibOtKibGSlKuicdUA/640?wx_fmt=png&from=appmsg#imgIndex=6)

选择手动添加

![Image 7](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatNsDDxrxNbbJv2ibDictgqZcI5R71b9iafN4mSIoZOI3ctBljwpTzkWX6VhqYenW3bhYP7cHPZupXibqQ/640?wx_fmt=png&from=appmsg#imgIndex=7)

打开GitHub上的n8n-mcp文档，找到下图部分（页面不要关闭，后面还要复制项目设置），复制到TRAE

![Image 8](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatNsDDxrxNbbJv2ibDictgqZcIhYtZxExU4libNNSOBgMlFN9l3d4qaEbYkaibA2eNicvYibwtQm9T35J3Ng/640?wx_fmt=png&from=appmsg#imgIndex=8)

这里需要改两个地方，N8N_API_URL和N8N_API_KEY

![Image 9](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatNsDDxrxNbbJv2ibDictgqZcIr2Sbo217e5kDHEgMOkGARGtFjV0ic2HkQlaVUSG4h2f7iaWk9G9CQVrA/640?wx_fmt=png&from=appmsg#imgIndex=9)

N8N_API_URL就是你的n8n工作流链接（/前面部分）

![Image 10](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatNsDDxrxNbbJv2ibDictgqZcICJeECBaKiaichglkLG6uqDK2IguVxN3Ehgqd8Y1cibbFQP5T5k58PYp0w/640?wx_fmt=png&from=appmsg#imgIndex=10)

N8N_API_KEY需要打开工作流页面创建，左下角三个点--Settings

![Image 11](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatNsDDxrxNbbJv2ibDictgqZcITGWxff3zceRVGZZOh2z7vrIvgs7ibcfHkiaZGenvd7c0F1jQMXFjwpDw/640?wx_fmt=png&from=appmsg#imgIndex=11)

选择n8n API--Create an API Key

![Image 12](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatNsDDxrxNbbJv2ibDictgqZcIfCZOwTSj2ibyM5BqDhSYpsSUfiaia3BbicFpn2iagytib69DFBwR2hBPfu5g/640?wx_fmt=png&from=appmsg#imgIndex=12)

Label随便填，过期时间看自己实际需要，点击Save

![Image 13](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatNsDDxrxNbbJv2ibDictgqZcIiafr5mOBwkBRtuIZUSd0iaMnlIZsbsqbHXMia4DLuqLNuDUKW8qOv67zQ/640?wx_fmt=png&from=appmsg#imgIndex=13)

这样就会获得秘钥，复制到TRAE

![Image 14](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatNsDDxrxNbbJv2ibDictgqZcImmGYsNbAfw2FEmFLMeyYoFq4xyIbj2NGiaWhXaqPNOzDeFuXDc6LNng/640?wx_fmt=png&from=appmsg#imgIndex=14)

回到TRAE，点击确认

![Image 15](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatNsDDxrxNbbJv2ibDictgqZcItVOlVwXs4YKn2JwkzArXyyUgS8saUAia90Jl2KDHB14la17LoKUNvNw/640?wx_fmt=png&from=appmsg#imgIndex=15)

MCP准备中

![Image 16](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatNsDDxrxNbbJv2ibDictgqZcIfRwmCCgf9icog5ptXfl25JVkIZFKSZeUBDgOKfLDxGr7IwnyHv0mFGA/640?wx_fmt=png&from=appmsg#imgIndex=16)

显示打钩，说明安装好了。

![Image 17](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatNsDDxrxNbbJv2ibDictgqZcI9Maw16RrS5vYMlojsiaD5aYQG846FKPNibOoicnYicelF9A7kZKq8sgZtA/640?wx_fmt=png&from=appmsg#imgIndex=17)

接下来找到规则，点击创建项目规则project_rules.md

![Image 18](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatNsDDxrxNbbJv2ibDictgqZcI5qcgqd6LiahAQQICwAnwpcwsmIps0n4cjNM9Vey4RJ2UX2oJiaf1cyAQ/640?wx_fmt=png&from=appmsg#imgIndex=18)

提示先打开文件夹，这里可以在D盘先创建一个文件夹，然后再打开

![Image 19](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatNsDDxrxNbbJv2ibDictgqZcInG8EBPOxYUltDjVL6eVORUbaDYYT7gdgWhaly3Vb7DlzRA16lWm1wg/640?wx_fmt=png&from=appmsg#imgIndex=19)

选择信任

![Image 20](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatMIN69PJvTZIJWKTciatmHGp4fcrXWj1m9ibNM0bLhhl11ibZSNU6epAyRCSvcpQ4LFNvgK2lYgZgb6Q/640?wx_fmt=png&from=appmsg#imgIndex=20)

会创建一个md文件，如果没有创建，则重新操作一遍

![Image 21](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatNsDDxrxNbbJv2ibDictgqZcIichloxzjoHCNCZenSqcSXtILfc6du7YveXiaYZicnhFdIqgIwWVZQwJ4A/640?wx_fmt=png&from=appmsg#imgIndex=21)

GitHub的n8n-mcp页面搜索找到Cluade Project Setup（相当于给n8n-mcp制定的操作手册和规则），复制到TRAE

![Image 22](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatNsDDxrxNbbJv2ibDictgqZcIVjamI2dIL7icoHBjER5pv6TtPiaeI3IBXHmqnhySLOs5ob9wZnvZN9nA/640?wx_fmt=png&from=appmsg#imgIndex=22)

CTRL+S快速保存下

![Image 23](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatNsDDxrxNbbJv2ibDictgqZcI5zPpwDibQqXWe0NmLI5jAEQxybXllEfdnzLJYWrwVrdLdCTJGIRaITg/640?wx_fmt=png&from=appmsg#imgIndex=23)

除了原有模型外，如果想用其他模型，可以通过API Key添加

![Image 24](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatNsDDxrxNbbJv2ibDictgqZcIEu9DZEDWPzdPK1icg82q670vyhXPnDYEj23trxE5XeETT3KxVPjfVlQ/640?wx_fmt=png&from=appmsg#imgIndex=24)

接下来返回对话

![Image 25](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatMIN69PJvTZIJWKTciatmHGphQONImencuscNx1f2flQfUicxAL1kIR0Ppvyb9JL4kvFQqFqyOHcxtw/640?wx_fmt=png&from=appmsg#imgIndex=25)

因为免费版Claude-4-Sonnet要排队比较久，所以这里模型用3.7，输入：帮我创建一个工作流：手动触发，可以获取全球10个重点城市当地时间（包含北京），并部署到到服务器，给我工作流id

![Image 26](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatMIN69PJvTZIJWKTciatmHGpwxdCaH3OgBJXZmc1xUicWia8hobaITOCautCh5jyhQd1L84ib3VjhibHIA/640?wx_fmt=png&from=appmsg#imgIndex=26)

可以看到自动规划了5个步骤

![Image 27](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatMIN69PJvTZIJWKTciatmHGplJibicaicI9YibEh9Uc1Fej138fkFoFxEicpjOfCb9pxumoUmUmGXl86Ukw/640?wx_fmt=png&from=appmsg#imgIndex=27)

每次运行都需要手动点击，这里勾选自动

![Image 28](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatMIN69PJvTZIJWKTciatmHGphutaK1T2Xj2OlCWgD9PGYptibPVQjnj1JPrY61JaRBy2RAE8wBmNiapA/640?wx_fmt=png&from=appmsg#imgIndex=28)

中间会自动寻找最优方法，遇到报错会自行解决。最后显示成功（有出现工作流ID就代表部署到线上了）。

![Image 29](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatMIN69PJvTZIJWKTciatmHGpuHgvpElIdyvTH0xciar52SKce0d4PTkyNKyib8glz2QMacTkJlWFGYgw/640?wx_fmt=png&from=appmsg#imgIndex=29)

来工作流页面看下，确实创建出来了

![Image 30](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatMIN69PJvTZIJWKTciatmHGpOdK57oB2DAHWTx32JmoeD3oTIryOEf6luZ9MPCXYeDQ8YH3ibVkdAiag/640?wx_fmt=png&from=appmsg#imgIndex=30)

打开看下，居然就两个节点，不过用了code节点

![Image 31](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatMIN69PJvTZIJWKTciatmHGpVxH45yWQsmMPKofkc8gkVjsnhG25FXl0ibibLeSDcLEibGurWch49ibUuQ/640?wx_fmt=png&from=appmsg#imgIndex=31)

这些代码应该是大模型参考官方文档手册写的，让我自己写，肯定是写不出来的。

![Image 32](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatMIN69PJvTZIJWKTciatmHGpcukPYBWXsYu287LVt9ViamrhONeQ7WguuorayvNicyPqQePRChYDQoKg/640?wx_fmt=png&from=appmsg#imgIndex=32)

执行看看效果，不错，时间是准确的。

![Image 33](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatMIN69PJvTZIJWKTciatmHGpsQMFzmruaCIs0PnYDaKFTNhqqcHBEcLhhIFqVOBwicibib7BtXCFE15tw/640?wx_fmt=png&from=appmsg#imgIndex=33)

至于复杂的工作流，还待测试，不少人反馈问题比较多。因为目前主要覆盖的是官方节点，所以如果想用社区节点，可能会力不从心。然后n8n是一直在升级的，有可能出现版本对不上的情况，mcp这里是按最新版配置的工作流，但自己部署的可能是旧版本，也会导致节点出错，这时可以把线上版本升级下。

好了，今天的内容就到这里，ai编程早已实现了口述自动化，n8n这边正在迎头赶上，觉得有帮助的话，点赞收藏关注，我们下期见！

