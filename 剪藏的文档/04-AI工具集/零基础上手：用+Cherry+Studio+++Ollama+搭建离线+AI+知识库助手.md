---

title: 零基础上手：用 Cherry Studio + Ollama 搭建离线 AI 知识库助手
date: 2025-10-20
tags: ["AI", "人工智能", "智能体", "Agent", "AI工具"]
category: 办公协作
---


# 零基础上手：用 Cherry Studio + Ollama 搭建离线 AI 知识库助手

Original 天欣 [天欣实验室](javascript:void(0);)*2025年10月20日 12:23* *云南*

**点击蓝字**

**关注我们**




我们上篇文章讲了，如何判断电脑的显示是否能运行某个模型，以及如何通过ollama来本地部署魔搭社区的模型。文章链接如下：

[Ollama × 魔搭社区：超简单的大模型本地部署方案](https://mp.weixin.qq.com/s?__biz=MzkxMDc1NzU1Ng==&mid=2247484362&idx=1&sn=a3dcc441d0a7835c4c2da092836607aa&scene=21#wechat_redirect)




今天我们就利用上次部署的文本生成模型结合CherryStudio这个应用来本地实现可以离线使用的知识库AI助手（网上也有一些教程教本地知识库的配置，但是大都是使用硅基流动来使用在线的模型api，花钱的同时也无法离线使用）




防止有些小伙伴没有看过上期教程的，我在这里再简要说一下如何通过ollama来拉取魔搭社区的模型。首先大家需要明白的是ollama主要支持的是GGUF格式的模型。

![Image](https://mmbiz.qpic.cn/mmbiz_png/AyVFGmKalNxCsDIk8c3bTibY0ticYpOVYvFOmabKSUnjrRXAOCP0UHeSJ92BZfphM1K8HhyYpp5r93icYicbicDmGPg/640?from=appmsg&watermark=1#imgIndex=0)




我们需要在魔搭社区中找到你想要本地部署的模型，比如这里我选择的是阿里通义千问的qwen3-8b模型。

![Image 1](https://mmbiz.qpic.cn/mmbiz_png/AyVFGmKalNxCsDIk8c3bTibY0ticYpOVYv1ero2M9icyL3svFEf10H60ibxQSPIeV7kQexfK99c3lHicrk7xYLXDjUA/640?from=appmsg&watermark=1#imgIndex=1)




点进去模型的主页，然后我们找到右侧模型谱系的量化。

![Image 2](https://mmbiz.qpic.cn/mmbiz_png/AyVFGmKalNxCsDIk8c3bTibY0ticYpOVYvgZlVu8XcIpKH2wYAxqagumR0hibdicX3NGB9R05FMNJuibtoBAuwwEamQ/640?from=appmsg&watermark=1#imgIndex=2)




关于什么是量化以及如何选择模型等讲解，详细请看这篇文章：

[Ollama × 魔搭社区：超简单的大模型本地部署方案](https://mp.weixin.qq.com/s?__biz=MzkxMDc1NzU1Ng==&mid=2247484362&idx=1&sn=a3dcc441d0a7835c4c2da092836607aa&scene=21#wechat_redirect)




点开之后你会发现这个量化列表的模型中，排在第一位的就是带有GGUF格式的模型，我们点入GGUF模型的主页。

![Image 3](https://mmbiz.qpic.cn/mmbiz_png/AyVFGmKalNxCsDIk8c3bTibY0ticYpOVYv9Hw6WrpxYMXqrXDoGh5Usd49Z1T1pGQibTPnqSbgBW8a3dxMA0hQ9rw/640?from=appmsg&watermark=1#imgIndex=3)




然后复制这个网站的链接。

![Image 4](https://mmbiz.qpic.cn/mmbiz_png/AyVFGmKalNxCsDIk8c3bTibY0ticYpOVYvtmfS7S0QicRyCd9ZyhJPW3d3Nb866unnHcI5FiccvCic5MsstPddf41KA/640?from=appmsg&watermark=1#imgIndex=4)




复制完毕之后删除https://以及models/，然后把删除后的结果复制，运行ollama run的命令，命令后跟着这个结果即可拉取对应的模型了，示例如下。

```Plain Text
ollama pull modelscope.cn/Qwen/Qwen3-8B-GGUF
```




![Image 5](https://mmbiz.qpic.cn/mmbiz_png/AyVFGmKalNxCsDIk8c3bTibY0ticYpOVYvHM61ibMg0US2FOze006mAocO8D662f76z8HwbaFm1AA971YKlQ3RpUA/640?from=appmsg&watermark=1#imgIndex=5)




只使用文本生成模型做本地知识库是不够的，我们还需要一个嵌入（Embedding）模型，用来做知识库的检索，让Qwen3-8B可以检索出信息然后总结。这里选择的嵌入模型则依旧是阿里的Qwen3-Embedding-0.6B模型，同样可以使用类似的ollama命令下载模型。

```Plain Text
ollama run modelscope.cn/Qwen/Qwen3-Embedding-0.6B-GGUF:Q8_0
```




![Image 6](https://mmbiz.qpic.cn/mmbiz_png/AyVFGmKalNxCsDIk8c3bTibY0ticYpOVYvZ652fT7Myj8cMJ1DV6LzcOeOHAmlg9N1R722uxtUygfCCFQESic6hRQ/640?from=appmsg&watermark=1#imgIndex=6)




我们在模型的首页可以看到，这里的:Q8_0就代表了拉取的是8bit量化的，这样占用显存更少的同时也能有不错的准确度。

![Image 7](https://mmbiz.qpic.cn/mmbiz_png/AyVFGmKalNxCsDIk8c3bTibY0ticYpOVYvkGqBVeFX55V0WdavwSyuy4AV17ibQuqZ5BNclgvts3Sj7WkTT3qWfNg/640?from=appmsg&watermark=1#imgIndex=7)




至此我们的本地知识库的模型就准备完毕了，你可以使用ollama list的命令查看你当前已有的模型列表。

![Image 8](https://mmbiz.qpic.cn/mmbiz_png/AyVFGmKalNxCsDIk8c3bTibY0ticYpOVYvib3UAKhaOLK7v7B7Zjic25T9wj6iaV2iaIfjf7CWAQibjQCAOe2rBFndIng/640?from=appmsg#imgIndex=8)




最后一步我们需要运行ollama server来启动ollama的接口服务，到这里ollama的配置就结束了。




下面我们就进行CherryStudio的配置，首先CherryStudio是一个桌面 AI 客户端，可以在电脑上快速使用多平台的模型。

![Image 9](https://mmbiz.qpic.cn/mmbiz_png/AyVFGmKalNxCsDIk8c3bTibY0ticYpOVYvib71BlqiaEDibWyTsclFpUHTYdf702AuMziaXOl220iakq5ovA1kTkDuVWA/640?from=appmsg&watermark=1#imgIndex=9)




官网链接：

https://www.cherry-ai.com/




我们下载并且安装好之后，直接打开这个应用然后点击设置，即可看到模型配置的页面。下图标注了操作步骤，如果大家有不懂的可以看下文相关步骤的解释。

![Image 10](https://mmbiz.qpic.cn/mmbiz_png/AyVFGmKalNxCsDIk8c3bTibY0ticYpOVYvKuUOX6hHMibH4MJSiceY72tM5zpLnDuaAcC1tTS3GdCrwP29JPU1ibftw/640?from=appmsg&watermark=1#imgIndex=10)




首先第一步选择模型的平台为ollama，然后第二部填写api地址为，注意这里的api密钥可以不用填写的，因为毕竟是自己电脑本地的模型：

```Plain Text
http://localhost:11434
```




填写好之后，第三步点击管理按钮就可以看到当前的模型列表，我们把安装的两个都点击右侧加号添加进去。

![Image 11](https://mmbiz.qpic.cn/mmbiz_png/AyVFGmKalNxCsDIk8c3bTibY0ticYpOVYvUiabKFib04tdIVDO8mJ6O0FAmZZnc1VzpGic9YmZaXeoPRqSjvpOjMU1Q/640?from=appmsg&watermark=1#imgIndex=11)




第四步一定要点击右上角的按钮，把它开启。接下来我们就让添加好的模型作为我们默认使用的模型，点击左侧配置栏的默认模型按钮，统一配置默认为qwen3-8b。

![Image 12](https://mmbiz.qpic.cn/mmbiz_png/AyVFGmKalNxCsDIk8c3bTibY0ticYpOVYvoSQ0JHIdibiakNy3IFiaCZy8QjD6sYkPx1bTaq79cer5VD5HNmicBz22IQ/640?from=appmsg&watermark=1#imgIndex=12)




配置好之后，点击上方的加号添加一个知识库的应用类型。

![Image 13](https://mmbiz.qpic.cn/mmbiz_png/AyVFGmKalNxCsDIk8c3bTibY0ticYpOVYvjqRnY51cAJWpHWTwmgYOTEnxW2ThxIYGvCuibUObbgdaMRHz3kZ733A/640?from=appmsg&watermark=1#imgIndex=13)




按照我图片中的设置来配置知识库。

![Image 14](https://mmbiz.qpic.cn/mmbiz_png/AyVFGmKalNxCsDIk8c3bTibY0ticYpOVYvTQdvbuQEsbC1Ia3zrOia5UiaAtuAgaNMFlIgLZar3NgxJbgDD2KjLfDQ/640?from=appmsg&watermark=1#imgIndex=14)




设置好之后，我这里创建了一个虚拟的公司项目方案，然后把他保存为了txt格式传入到了知识库。

![Image 15](https://mmbiz.qpic.cn/mmbiz_png/AyVFGmKalNxCsDIk8c3bTibY0ticYpOVYvODeDaJibQL8UswibYh9bGjZicYPD0mwxXMIwXrgLDibBS6XxPaX6sRpPtw/640?from=appmsg&watermark=1#imgIndex=15)




这时候我们可以回到首页，然后点击添加知识库作为问题的查找。

![Image 16](https://mmbiz.qpic.cn/mmbiz_png/AyVFGmKalNxCsDIk8c3bTibY0ticYpOVYv9KwLfZoV9NvQ2yxibvRUasavBJlbpLUob9MbLL6zcJLWKugoLMeiacGg/640?from=appmsg&watermark=1#imgIndex=16)




这时候你就可以断开网络，使用ai来和你进行知识库的问答了，比如我这里问他公司的项目是什么，可以看到他对知识库的内容做了引用。

![Image 17](https://mmbiz.qpic.cn/mmbiz_png/AyVFGmKalNxCsDIk8c3bTibY0ticYpOVYv7m7E57SGuoYgnKqIr9DBx3WpsVZgy4ia83oA8U404J9rfCGe0a7Mbkg/640?from=appmsg&watermark=1#imgIndex=17)




最后一点补充，如果你发现你每个问题他都要去找一遍知识库，甚至是一些和知识库无关的问题。这时候你可以右键点击助手。选择编辑助手。

![Image 18](https://mmbiz.qpic.cn/mmbiz_png/AyVFGmKalNxCsDIk8c3bTibY0ticYpOVYvHIicKuaM8TuQAxWRs8ZvqAAIhC7EIYYJRY6af32mLOETwfiboQxSlJBg/640?from=appmsg&watermark=1#imgIndex=18)




然后把知识库调用的设置改为意图识别即可在你需要的时候才调用知识库搜索。

![Image 19](https://mmbiz.qpic.cn/mmbiz_png/AyVFGmKalNxCsDIk8c3bTibY0ticYpOVYvVSttvFGjAeSv3p4ib3EutIgQicMt4Nu8HlktV6MyBrFpPwYrxknL6fUg/640?from=appmsg&watermark=1#imgIndex=19)




好了，至此你已经成功的配置好了本地的知识库AI助手，如果这篇文章对你有帮助的话请点赞转发加关注哦~




