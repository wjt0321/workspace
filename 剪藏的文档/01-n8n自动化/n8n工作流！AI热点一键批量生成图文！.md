---

title: n8n工作流！AI热点一键批量生成图文！
date: 2025-11-19
tags: ["n8n", "工作流", "自动化", "AI", "人工智能", "智能体", "Agent", "工作流自动化"]
category: 自动化工具
---


# n8n工作流！AI热点一键批量生成图文！

Original 拉克AI [拉克AI智能体](javascript:void(0);)*2025年11月19日 06:40* *江苏*



在小说阅读器中沉浸阅读

哈喽大家好，我是专注于n8n国内生态的应用拉克。

每天花2个小时，辛辛苦苦将AI热点转化成自己想要内容形式，还要花3个小时将文字内容转化成图片，排版，画图，图片上加文字，忙活了一天最后效果还不满意。

这一定是图文创作的你经历过的痛苦，今天分享一个n8n工作流，实现每天自动抓取AI热点，并进行图文转化的功能，帮你一键完成图文自动化批量创作，打造自己的运营神器。

完整的工作流入下：

![Image](https://mmbiz.qpic.cn/mmbiz_png/QOgibUb73gxjzbZUJGqnsCBQwjIiblNVHoj0MewGjhlJicibBVsnZOLKXibqlr1WKMZ6xquGtQYcdEotKib5VuNkT5Kw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=0)

最终批量生成的图文效果: (提示词还有优化空间，这里主要分享思路和方法)

![Image](https://mmbiz.qpic.cn/mmbiz_jpg/QOgibUb73gxjzbZUJGqnsCBQwjIiblNVHowWqP0bSpJwl0e5pn1RDdsicArD2DjUUYYUicJSXYnZh10OHiaRXRQUEoQ/640?wx_fmt=jpeg&from=appmsg&watermark=1#imgIndex=1)

![Image 1](https://mmbiz.qpic.cn/mmbiz_jpg/QOgibUb73gxjzbZUJGqnsCBQwjIiblNVHoD1lLbyg5hZJ0SiaBj5rqYyyayLSRhMQOydxua0X8U0mbM5iczzickSdZg/640?wx_fmt=jpeg&from=appmsg&watermark=1#imgIndex=2)

![Image 2](https://mmbiz.qpic.cn/mmbiz_jpg/QOgibUb73gxjzbZUJGqnsCBQwjIiblNVHoP6tDutq4HLY5NtJNTWFzXfrI0ZBBVF8RBhmamTICrPooshttfTUKVw/640?wx_fmt=jpeg&from=appmsg&watermark=1#imgIndex=3)

<<< 左右滑动见更多 >>>

文章结尾领取详细的**工作流JSON文件**。

# 1、流程任务思路详解

工欲善其事必先利其器，想要把工作流搭建好，前提是要把任务进行很好的拆解有了好的思路，这个时候搭建工作流，就像搭积木一样简单了。

这个工作流的主要思路如下：

- 利用第三方的数据库获取公众号相关的AI热点新闻，提取其中的标题，内容，作为后续处理的输入。

- 然后利用大模型的能力将这些信息进行处理，摘取出文章的核心信息和观点，并利用大模型将其转化成文生图提示词和图片文字的文案部分。

- 其次使用大模型对前面步骤的提示词的文案进行图片生成，并最红写入本地电脑。

# 2、工作流节点详解

这个章节详细讲解整个工作流的搭建及注意事项。

## AI获取和处理

这里主要有5个节点，主要包含工作流触发节点，AI热点信息获取和处理节点。

这里你也可以将AI热点信息换成其他内容创作来源，比如亲子教育，儿童漫画，获客材料等，进行灵活应用。

- 工作流触发

直接选择手动触发即可，实际应用中可根据需要进行每天定时运行。

- AI热点的获取

这里依旧使用新榜的API来获取最新的AI热点详细配置如下。

```Plain Text
Method:Post
URL:https://api.newrank.cn/api/sync/weixin/data/hot/day_content

Header Parameters:
Content-Type=application/x-www-form-urlencoded;charset=utf-8
Key=这里填入你自己的新榜API密钥

Body Parameters:
type:科技
date:{{ $today.format('yyyy-MM-dd') }}
size:5
```

注意这里的size,如果你想一次性获取比较多的AI热点文章，将这里的10设定的高一些。

- 拆解

因为三方数据库获取的是很多的数据组合在一起的数据组，因此需要将数据进行拆分，方便后续的标题和内容的提取与进一步处理。

这里用的是split out插件。

- 标题与内容提取

将前一步骤的众多信息进行筛选，获取我们想要的，也就是标题和文章内容。使用code插件。

代码如下：

```Plain Text
return {
  title:      ($input.item.json.data.title   ?? '').trim() || ' ',
  content:    ($input.item.json.data.content                
               ?.replace(/\n/g, '\\n')
              ?.replace(/\t/g, '\\t')
              ?.replace(/"/g, '\\"')  ?? '').trim() || ' '
};
```

- 限制

这个节点目的是为了调试方便和资源节约，我这里设置的1，实际使用中,可以将限制改到一个比较大的值，实现多个AI热点批量生成图文的目的。

## 图片和文案提示词创作生成

这里使用智能体加大模型来创作图片及文案的创作。这是整个工作流最核心的一个节点之一。

这里需要考虑几点：

- 大模型对文章及内容的理解并摘取核心观点

- 基于核心观点的图片生成提示词

- 根据核心观点生成切合主题的文案

智能体的设定如下：

![Image 1](https://mmbiz.qpic.cn/mmbiz_png/QOgibUb73gxjzbZUJGqnsCBQwjIiblNVHo5LBr1doQUwmrkCJ5wdc2tZlz0ldVbLYWpODPtroMpyFb9SI5pxySng/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=4)

大模型选择deepseek即可，可以使用推理模式，增强对内容的理解。

用户提示词需要考虑图文整体的风格设定，及大模型创作图片提示词及文案的技能设定。

因为是AI热点信息图文创作，因此这里选择是用了赛博朋克的绘画风格，为了节约资源，设定每个AI热点限定3张图片输出，因此需要连续输出3组文案和提示词。

提示词较长，完整提示词获取方法见文末。

为了确保输出格式的稳定，这里打开输出格式限制。

```Plain Text
[{
 "scene": "scene",
 "wenan": "wenan"
}]
```

因为上面设定了3张图文，因此还需要使用split out插件进行拆分，方便后续的图文生成和编辑。

## 图文生成编辑和本地保存

根据工作流的整体思路，在完成文案和提示词后，就来到了图片生成编辑环节。

这个节点是整个工作流另一个核心节点，这里使用到了智能体节点和阿里百炼的图片生成和编辑的MCP服务。

这里的MCP允许你对图片进行任何形式的设定，包括风格，主体的尺寸，画风，篇幅设定等。相比于大模型自动生成全部的提示词，使用MCP调用的情况，会让图片生成更加的精准可控。

开通这个MCP服务见下面链接，有一些免费的额度。

https://bailian.console.aliyun.com/?spm=a2c4g.11186623.0.0.7f477980N1ex6P&tab=mcp#/mcp-market/detail/Wan25Media

整体智能体的设定如下：

![Image 2](https://mmbiz.qpic.cn/mmbiz_png/QOgibUb73gxjzbZUJGqnsCBQwjIiblNVHoJ2o3LgDvD5GwEhqXFZoibXYsUE5e97rkYlicgzt6Vs2DtBtfcr5hXRtQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=5)

大模型依旧可以选择国内的deepseek，建议推理模式。

用户提示词，是这个智能体节点的核心，考虑以下两点关键要素：

- 图片的整体绘画风格，尺寸篇幅设定，整体的质感设定，内容排版，布局的设定，如边框留空白还是铺满，背景主题色是白色还是灰色。

- 文字的设定，在图片中的布局，字体，大小等。

- MCP的使用工作流，思路是先生成图片，再在图片上加文案，因此需要分两步走。因此需要对这两个步骤进行设定，让智能体先后调用图片生成MCP和图片编辑MCP

提示词很长，获取方式见文末。

两个MCP服务的设定分别如下，整体是一样的，区别就是调用的模型不同，一个是图像生成，一个是图像编辑。

![Image 3](https://mmbiz.qpic.cn/mmbiz_png/QOgibUb73gxjzbZUJGqnsCBQwjIiblNVHouLMDKEQbVYUUkSX1C2bnibVwYKibLNBick8oOib6bluVwk4qcIcER9SK3g/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=6)

![Image 4](https://mmbiz.qpic.cn/mmbiz_png/QOgibUb73gxjzbZUJGqnsCBQwjIiblNVHoIDVPlbQ1phFBjsJwzibfCaowicUGruLHZ9ELHfFPOWblX6zDflpHzTjA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=7)

这个节点要求的返回值是一个链接，因此要想将生成的图文写入本地磁盘，需要先通过http request的Get方式下载图片，然后使用write to disc的插件写入本地磁盘。

![Image 5](https://mmbiz.qpic.cn/mmbiz_png/QOgibUb73gxjzbZUJGqnsCBQwjIiblNVHoBj3xVNzuOIncLdxuFy9gBUt7OBiahukvKPusibjdGCsVxZR13rElJicCg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=8)

## 运行调试和优化

到了这里整个工作流就搭建好了，两个智能体的提示词是核心中的核心，需要不断优化来确保输出的质量和稳定性，即使AI现在很聪明，提示词依然很重要。

这是运行后的结果展示，工作流运行无报错，后续持续优化提示词。

![Image 3](https://mmbiz.qpic.cn/mmbiz_jpg/QOgibUb73gxjzbZUJGqnsCBQwjIiblNVHowWqP0bSpJwl0e5pn1RDdsicArD2DjUUYYUicJSXYnZh10OHiaRXRQUEoQ/640?wx_fmt=jpeg&from=appmsg&watermark=1#imgIndex=9)

![Image 4](https://mmbiz.qpic.cn/mmbiz_jpg/QOgibUb73gxjzbZUJGqnsCBQwjIiblNVHoD1lLbyg5hZJ0SiaBj5rqYyyayLSRhMQOydxua0X8U0mbM5iczzickSdZg/640?wx_fmt=jpeg&from=appmsg&watermark=1#imgIndex=10)

![Image 5](https://mmbiz.qpic.cn/mmbiz_jpg/QOgibUb73gxjzbZUJGqnsCBQwjIiblNVHoP6tDutq4HLY5NtJNTWFzXfrI0ZBBVF8RBhmamTICrPooshttfTUKVw/640?wx_fmt=jpeg&from=appmsg&watermark=1#imgIndex=11)

<<< 左右滑动见更多 >>>

这个思路和方法可以改造成很多变体，如爆款漫画，读书，亲子教育等，赶紧动起手来打造自己的图文自动化创作神器吧。

文章底部留言板留言"**26**"获取工作流Json文件和提示词。

[#爆款漫画](javascript:;) [#n8n](javascript:;) [#图文](javascript:;) [#工作流](javascript:;) [#智能体](javascript:;)

另外我给大家准备了几份福利，记得**关注公众号**找我领取。




- 免费领取拉克在用的工作流模板，让你n8n入门更轻松。

- 加入智能体免费交流群，和更多的小伙伴一起探索智能体。

- 免费领取2000+份n8n工作流模板，各类经典应用全部掌握。

- 免费领取一份国内AI头部社区主理人倾力打造的AI赚钱100种方法图书。

也可以扫描以下二维码**添加好友**与我链接

![Image 6](https://mmbiz.qpic.cn/mmbiz_jpg/QOgibUb73gxjzbZUJGqnsCBQwjIiblNVHoJOsoiaVaFeR4sNNHPXRRFfzibCCn55VESz7nwYVKZbicKIcm6licGwEcNw/640?wx_fmt=jpeg&from=appmsg&watermark=1#imgIndex=12)

