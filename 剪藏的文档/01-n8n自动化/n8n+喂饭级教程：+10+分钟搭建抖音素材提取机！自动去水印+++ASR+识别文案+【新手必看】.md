---

title: n8n 喂饭级教程： 10 分钟搭建抖音素材提取机！自动去水印 + ASR 识别文案 【新手必看】
date: 2025-10-26
tags: ["n8n", "工作流", "自动化", "教程", "入门", "上手", "保姆", "喂饭", "工作流自动化"]
category: 自动化工具
---


# n8n 喂饭级教程： 10 分钟搭建抖音素材提取机！自动去水印 + ASR 识别文案 【新手必看】

Original 茉茉AI成长 [茉茉AI智能体](javascript:void(0);)*2025年10月26日 15:20* *陕西*

> **00后茉茉，不甘平凡。正用AI重塑未来，并将全程分享自己的思考与实战 。 愿能成为你打破人生困局的第一束光 ，引领你找到向上的力量 🚀。**

**大家好呀，我是 茉茉，一位专注于分享 AI 智能体实战技能（自媒体提效）的博主。**

这周更新的慢了，是因为在做商单的缘故，这是商单效果。



已关注



Follow

Replay Share Like

Close

**观看更多**

更多







*退出全屏*



*切换到竖屏全屏退出全屏*

茉茉AI智能体已关注



Share Video

，时长01:58

0/0

00:00/01:58

切换到横屏模式

继续播放

[ ]

进度条，百分之0



[Play](javascript:;)

00:00

/

01:58

01:58

[倍速](javascript:;)

*全屏*

倍速播放中

[0.5倍 ](javascript:;)[0.75倍 ](javascript:;)[1.0倍 ](javascript:;)[1.5倍 ](javascript:;)[2.0倍](javascript:;)

[超清 ](javascript:;)[流畅](javascript:;)

![http://mmbiz.qpic.cn/sz_mmbiz_jpg/cnV3NKP0vGkdfS1AAicnU6Yr9K9pf0Dh5XaRduwNgluicOfcSRFSYEya83tDfe5SCwia3dOKSLbu31fSgH1oAAI4A/0?wx_fmt=jpeg&wxfrom=16](n8n+喂饭级教程：+10+分钟搭建抖音素材提取机！自动去水印+++ASR+识别文案+【新手必看】+8ed8b555-c77c-4014-8287-28cfbb63af0a/Your+browser+do.jpg)



继续观看

n8n 喂饭级教程： 10 分钟搭建抖音素材提取机！自动去水印 + ASR 识别文案 【新手必看】

观看更多

Original

,

n8n 喂饭级教程： 10 分钟搭建抖音素材提取机！自动去水印 + ASR 识别文案 【新手必看】



茉茉AI智能体已关注

Share点赞Wow

Added to Top Stories[Enter comment](javascript:;)



[Video Details](javascript:;)

有coze视频流制作需求的伙伴可合作，想学习的伙伴也可以找茉茉学习~

**一个痛点，一个解决方案：** 怎么高效、无水印地提取抖音视频素材，并同步拿到视频的原始文案？

今天，茉茉直接给你看一个**“一站式素材提取机”**。

这是一个由 AI Agent 驱动的自动化工作流，只需要你扔进一个抖音链接，它就能：

1. **智能提取无水印视频URL。**

2. **调用ASR语音识别模型，自动转录视频原版文案。**

本文手把手拆解这套高效流程的搭建过程，从链接解析到代码整理，全是能直接用的实战干货。欢迎给茉茉点点关注，后续会分享更多干货~

**想让你的素材收集效率翻倍？跟着茉茉，现在开始！**

### 一、效果如图

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/cnV3NKP0vGkdfS1AAicnU6Yr9K9pf0Dh5iaCEXEABgpibXtL9I2wN8SNhATugTr7bloetRATBBxO0h62Gic7z07DZg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=0)

### 二、工作流全景

![Image 1](https://mmbiz.qpic.cn/sz_mmbiz_png/cnV3NKP0vGkdfS1AAicnU6Yr9K9pf0Dh5f1JsDT67CXVjmfvguVvItqMbXeMQjeXPmEjc1EEdpZpaqTayiaNRh8Q/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=1)

### 三、工作流拆解（手把手）

#### （一）"When chat message received"：当聊天信息被接收时

这个节点是整个工作流程的“入口”，它的作用是接收用户在聊天框中输入的信息（比如你的需求或指令），并用这些信息来启动后续的所有步骤。

![Image 2](https://mmbiz.qpic.cn/sz_mmbiz_png/cnV3NKP0vGkdfS1AAicnU6Yr9K9pf0Dh5r9cJXrt71koJBj3wVNDfAayYrhJibysm5tCibhbEO0X67NfRKHyEfCGg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=2)

![Image 3](https://mmbiz.qpic.cn/sz_mmbiz_png/cnV3NKP0vGkdfS1AAicnU6Yr9K9pf0Dh5xsfyRicTFr32hrGcQZpAic7tnmhTlN1hTOXyPic6hQP3S1nq19L13EVAA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=3)

![Image 4](https://mmbiz.qpic.cn/sz_mmbiz_png/cnV3NKP0vGkdfS1AAicnU6Yr9K9pf0Dh5IibYkX02iaODmsQ4NgibX9vjP87tRaujjJY3hHxxldzo8DuPHUAgjCKvQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=4)

这里是茉茉输入的抖音分享链接

![Image 5](https://mmbiz.qpic.cn/sz_mmbiz_png/cnV3NKP0vGkdfS1AAicnU6Yr9K9pf0Dh5mGjywvvkrrXVEellpX9AVaVU4Ac6LRGdmhDBxqrr7WvibYTfKrdzTxg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=5)

#### （二）AI Agent

这个 AI Agent 节点就像一位“翻译官”和“提取器”，它接收一堆文字（用户输入），理解你的真实意图，然后执行专家任务，把隐藏在文字中的关键视频链接准确地找出来，交给下一个流程去使用。

![Image 6](https://mmbiz.qpic.cn/sz_mmbiz_png/cnV3NKP0vGkdfS1AAicnU6Yr9K9pf0Dh58hmYZpUUYcTictj8jIupwpJzMmDZHnAAQXZgq8KWEPsOv87ibSxVWP1g/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=6)

![Image 7](https://mmbiz.qpic.cn/sz_mmbiz_png/cnV3NKP0vGkdfS1AAicnU6Yr9K9pf0Dh5f3nlVNF9Iq53jrictfn6TWRNwiaeHnYmrMGGiboD5kicYFTebToYtIq7CQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=7)

```Plain Text
你是一个抖音作品解析专家，获取用户输入的抖音链接，调用工具提取视频下载链接、只回下载链接，不要做任何解释
```

![Image 8](https://mmbiz.qpic.cn/sz_mmbiz_png/cnV3NKP0vGkdfS1AAicnU6Yr9K9pf0Dh5p5hd0icZ5SXHCejgJz6ocX9ImvlIGRlX0Xfiaa6W6cOHnOka4IfK9Kfw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=8)

创建凭证这块内容在前面几篇文章里说过好几遍了，在这里就不再赘述了

如果是第一次学习的小伙伴可以在公众号后台领取`【n8n新手入门教程】`学习创建

点击👇名片关注公众号，后台回复关键词【n8n入门】

领取n8n小白入门教程

![Image 9](https://mmbiz.qpic.cn/sz_mmbiz_png/cnV3NKP0vGkdfS1AAicnU6Yr9K9pf0Dh5dSFuYibNwgMa1VMoIK7F3dT6st8EFcFbIq69S0ncutLicnqGL0KOA0ug/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=9)

![Image 10](https://mmbiz.qpic.cn/sz_mmbiz_png/cnV3NKP0vGkdfS1AAicnU6Yr9K9pf0Dh5oHD3Kx2SGxK14h4dXq7b8kZVxQYfu9VnziaiaeY72et5l7VoywWXkopA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=10)

![Image 11](https://mmbiz.qpic.cn/sz_mmbiz_png/cnV3NKP0vGkdfS1AAicnU6Yr9K9pf0Dh5rliaPQL5WBoictRlIAmkZogECmbiaa2M6enicoOkTpDs7tJ4dl7CIogXnw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=11)

`Endpoint`的值是`https://dashscope.aliyuncs.com/api/v1/mcps/douyin/sse`

![Image 12](https://mmbiz.qpic.cn/sz_mmbiz_png/cnV3NKP0vGkdfS1AAicnU6Yr9K9pf0Dh5ibOrWFShXFl3FjRd9GEvtWlh34196l5MExPlYyoD00Hh7FicVDjDSic3w/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=12)

`Name`填写`Authorization`

`Value`填写阿里云百炼的key（`https://bailian.console.aliyun.com/?spm=a2c4g.11186623.0.0.7f477980N1ex6P&tab=model#/api-key` ）

注意key前面需要加Bearer和一个英文空格。

![Image 13](https://mmbiz.qpic.cn/sz_mmbiz_png/cnV3NKP0vGkdfS1AAicnU6Yr9K9pf0Dh5xH6O846ibQrT7GH4jp4JXWHuV886WxQWa0YKNzVYVRYzicWzCOFLt42w/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=13)

记得命名一下，在后面节点使用时可以更方便的找到

![Image 14](https://mmbiz.qpic.cn/sz_mmbiz_png/cnV3NKP0vGkdfS1AAicnU6Yr9K9pf0Dh5THpAQ4bq5ptVWnVUatFPnDB0gOicabscGy4nrzXHXtelZa8zzm0eyuQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=14)

#### （三）HTTP Request

这个`HTTP Request`节点就像一个中转站，它拿着上一个AI节点准备好的“包裹”（视频链接），按照正确的地址和身份证明（URL 和 Auth），把它送到一个外部的“文案提取服务器”那里，然后将 服务器返回的“文案”带回来，交给下一个流程。

![Image 15](https://mmbiz.qpic.cn/sz_mmbiz_png/cnV3NKP0vGkdfS1AAicnU6Yr9K9pf0Dh5EazPHxZB6JRXTwJSZS7QspQY0CWE2fmzEzn6BsP7XdhroJ6MmU9Ijw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=15)

![Image 16](https://mmbiz.qpic.cn/sz_mmbiz_png/cnV3NKP0vGkdfS1AAicnU6Yr9K9pf0Dh5fQNh66KNOaElbUa7nFLB6ibp8tkI2GxMhaHDQxQLxM8JlluC1biaew5g/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=16)

`url`的值是`https://dashscope.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation`

![Image 17](https://mmbiz.qpic.cn/sz_mmbiz_png/cnV3NKP0vGkdfS1AAicnU6Yr9K9pf0Dh5zgwRgobPYmKovtnO7Xf2bq3wVCAw33FzvDG3Nia8aAUQMJWAgZX3aDQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=17)

`Name`的值是`Content-Type`

`Value`的值是`application/json`

![Image 18](https://mmbiz.qpic.cn/sz_mmbiz_png/cnV3NKP0vGkdfS1AAicnU6Yr9K9pf0Dh5VMH5P9LR30XTsNaEnu0rLGuYP1l4nhLy36J0d271eQWKm1RG2VePTQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=18)

```Plain Text
{    "model": "qwen3-asr-flash",    "input": {        "messages": [            {                "content": [                    {                        "text": ""                    }                ],                "role": "system"            },            {                "content": [                    {                        "audio": "{{ $json.output }}"                    }                ],                "role": "user"            }        ]    },    "parameters": {        "asr_options": {            "enable_itn": true        }    }}
```

#### （四）Code in JavaScript

这个 `Code in JavaScript`节点是流程的“数据整理大师”，它接收两个来源的“脏数据”，然后执行代码进行精准剪裁、提取和命名，最终确保输出给用户的是一个整洁、可以直接拿去用的文案和视频链接。

![Image 19](https://mmbiz.qpic.cn/sz_mmbiz_png/cnV3NKP0vGkdfS1AAicnU6Yr9K9pf0Dh5klnBdmbImD6JhbtMwAQnffNBekZPXvbndxMMJPsjwJ44TwN5WvNP8Q/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=19)

![Image 20](https://mmbiz.qpic.cn/sz_mmbiz_png/cnV3NKP0vGkdfS1AAicnU6Yr9K9pf0Dh5WZwyicT1EKhIXrtcU1SGQoywhicjpq2Kq1TBp3D05VIWO2lnUDLCibRKQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=20)

```Plain Text
const text = $input.first().json.output.choices[0].message.content[0].text;console.log(text);const url=$("AI Agent：获取真实视频地址").item.json.output;return [  {      dyTxt: text, // 你可以随意命名      dyUrl: url  }];
```

好了，今天的干货分享到这里就结束了！

相信看完这篇，你现在应该已经掌握了这套**“AI 自动抓取抖音无水印素材 + 识别原版文案”**的工作流精髓。

记住，搞定这些复杂的流程图，目的只有一个：**把更多时间留给创作，而不是繁琐的搬砖。**

**如果你已经成功跑通了流程，** 赶紧去试试你的素材库，体验一下效率起飞的感觉吧！

**如果你在搭建过程中遇到了任何问题，**随时在评论区留言，或者在后台找茉茉。

码字不易，如果有收获，辛苦你点赞，转发，推荐给更多需要的小伙伴。我们下期教程见！👋

> 另外，我还建了一个**【AI技能共学群】**， 里面会分享我平时用的工具和资料， 一个人学容易放弃，大家一起就更有动力啦 ✨

想进群的朋友很简单：

👉 【关注】后在文末扫码加茉茉好友，备注【已关注＋进群】，茉茉邀请你进群交流学习哈

我是茉茉，一个爱折腾的 00 后， 和你一起 用 AI 开辟人生第二条赛道 🚀

感谢你耐心看完我的文章，祝你万事皆胜意，我们下期见~

![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/cnV3NKP0vGkdfS1AAicnU6Yr9K9pf0Dh5EkEVia2YHL79qIbeDuwSC0NT4JyibJoVkvbN9TMa6OQs9TCMDEksFt1g/640?wx_fmt=jpeg&from=appmsg&watermark=1#imgIndex=21)

