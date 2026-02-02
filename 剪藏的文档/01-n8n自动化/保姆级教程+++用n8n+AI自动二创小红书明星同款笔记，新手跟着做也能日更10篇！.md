---

title: 保姆级教程 | 用n8n+AI自动二创小红书明星同款笔记，新手跟着做也能日更10篇！
date: 2025-11-18
tags: ["n8n", "工作流", "自动化", "AI", "人工智能", "智能体", "Agent", "教程", "入门", "上手", "保姆", "喂饭", "工作流自动化"]
category: 自动化工具
---


# 保姆级教程 | 用n8n+AI自动二创小红书明星同款笔记，新手跟着做也能日更10篇！

Original 茉茉AI成长 [光予学姐](javascript:void(0);)*2025年11月18日 10:22* *陕西*

> **00后光予，不甘平凡。正用AI重塑未来，并将全程分享自己的思考与实战 。 愿能成为你打破人生困局的第一束光 ，引领你找到向上的力量 🚀。**

**大家好呀，我是光予，一位专注于分享 AI 智能体实战技能的博主。**

最近搓了一个爆款书单的coze工作流，效果如下：



已关注



Follow

Replay Share Like

Close

**观看更多**

更多







*退出全屏*



*切换到竖屏全屏退出全屏*

光予学姐已关注



Share Video

，时长00:54

0/0

00:00/00:54

切换到横屏模式

继续播放

[ ]

进度条，百分之0



[Play](javascript:;)

00:00

/

00:54

00:54

[倍速](javascript:;)

*全屏*

倍速播放中

[0.5倍 ](javascript:;)[0.75倍 ](javascript:;)[1.0倍 ](javascript:;)[1.5倍 ](javascript:;)[2.0倍](javascript:;)

[超清 ](javascript:;)[流畅](javascript:;)

![http://mmbiz.qpic.cn/sz_mmbiz_jpg/cnV3NKP0vGmLospg9JDUHBTgicqGmowsDhYHdmkgsfiacdGOqjTibRQJEMLqPVAmGQQUaMGYnRsfTquqI9xUhgEicA/0?wx_fmt=jpeg&wxfrom=16](保姆级教程+++用n8n+AI自动二创小红书明星同款笔记，新手跟着做也能日更10篇！+8bb6c0b1-b744-4c54-896f-e474a9a6d89a/Your+browser+do.jpg)



继续观看

保姆级教程 | 用n8n+AI自动二创小红书明星同款笔记，新手跟着做也能日更10篇！

观看更多

Original

,

保姆级教程 | 用n8n+AI自动二创小红书明星同款笔记，新手跟着做也能日更10篇！



光予学姐已关注

Share点赞Wow

Added to Top Stories[Enter comment](javascript:;)



[Video Details](javascript:;)

有需要的伙伴可以找光予获取哦

今天光予给大家分享的是通过n8n搭建『小红书AI智能二创与自动发布工作流』的保姆级教程

你还在为小红书日更绞尽脑汁？觉得手动改写明星同款笔记效率太低？

无需理解复杂的代码，只需要跟着本期教程一步步操作，就能搭建一套属于自己的 “内容流水线”：

> 👉 **输入一个明星同款笔记链接，工作流将自动：**

> 

    1. 智能抓取原笔记的标题、正文和图片。

> 

    1. 调用AI深度改写，生成全新且高质量的标题、文案和标签。

> 

    1. 自动上传图片到图床，并一键发布到你的小红书账号。

从“手动劳动”到“自动生产”，真正实现3分钟生成一篇优质二创笔记，轻松挑战日更10篇！（无需担心封号问题）

**接下来，就让我们一起解锁这套能让你效率起飞的神奇工作流吧！**👇

### 一、效果如图

改写明星同款笔记，配图不变，二创改写笔记标题、文案、标签内容

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/cnV3NKP0vGmLospg9JDUHBTgicqGmowsDXp0X7WJcffhiaTIuiacLg0jnib2o6yeYgsTFiatFM3KSHrtZ47MRRYeXhg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=0)

![Image 1](https://mmbiz.qpic.cn/sz_mmbiz_png/cnV3NKP0vGmLospg9JDUHBTgicqGmowsDhNfsEfhEUY6Tx5EBupZ3ws50fCc5iawoQGZanWfDcLcVNoPw2V50ibiaA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=1)

### 二、工作流全景

![Image 2](https://mmbiz.qpic.cn/sz_mmbiz_png/cnV3NKP0vGmLospg9JDUHBTgicqGmowsDXBhsdmEbPgGTKBmgbKX30aMWzQibLTmwB3z4ggvV3rLEnqWQk4iaKwVQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=2)

### 三、安装小红书社区节点

今天这里和往期文章不一样，先带大家安装一下小红书社区节点

#### （1）进入到社区节点安装网址

**`http://localhost:5678/settings/community-nodes`**

点击`install`

![Image 3](https://mmbiz.qpic.cn/sz_mmbiz_png/cnV3NKP0vGmLospg9JDUHBTgicqGmowsDyOTvm6VAGWqLq7Y5Lwqmj5ibEU8nOqaBysb9ic6icc4azUV5FxGJkxnGA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=3)

输入节点名称`@donney521/n8n-nodes-xiaohongshu`进行安装

![Image 4](https://mmbiz.qpic.cn/sz_mmbiz_png/cnV3NKP0vGmLospg9JDUHBTgicqGmowsDMaFynL5rU3A8z5udLpEtdfJfcAcGzrX53ukuuCoiclyZVfYnBvuC8MA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=4)

#### （2）docker安装小红书API

进入@donney521/n8n-nodes-xiaohongshu该节点的介绍文档

`https://www.npmjs.com/package/@donney521/n8n-nodes-xiaohongshu`

![Image 5](https://mmbiz.qpic.cn/sz_mmbiz_png/cnV3NKP0vGmLospg9JDUHBTgicqGmowsD1QQOjB55vEZMjaGpYuxdldzLiays2CHq53pUXLTzRTQ2ezcu9YibPZYg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=5)

打开本地的终端，此处以win为例：

> `win＋R`后，输入`cmd`或`powershell`输入上图中对应的命令进行安装

安装好后我们可以在docker中看到

![Image 6](https://mmbiz.qpic.cn/sz_mmbiz_png/cnV3NKP0vGmLospg9JDUHBTgicqGmowsDA5hK8BG0I2TwMadMNaUCeSYibpCsnalKJCr1T9T5WUSjcRLt9elh3NA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=6)

### 四、工作流拆解（主要节点）

#### （一）小红书登入工作流

小红书登入这部分节点的json文件如下，大家直接获取导入到自己的n8n即可

`https://res.cloudinary.com/do4gy6naw/raw/upload/v1758474090/%E5%B0%8F%E7%BA%A2%E4%B9%A6%E7%99%BB%E9%99%86-v1.1.1-20250922_b8xga8.json`

![Image 7](https://mmbiz.qpic.cn/sz_mmbiz_png/cnV3NKP0vGmLospg9JDUHBTgicqGmowsDZx45BvxSh2BSmBCGriaZ8xDDZjZfYXsh5Dyp6gTO6jia5KILsMBP84HA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=7)

#### 工作流导入之后记得配置小红书凭证

![Image 8](https://mmbiz.qpic.cn/sz_mmbiz_png/cnV3NKP0vGmLospg9JDUHBTgicqGmowsDZNRG5ic31tsumgNoiaIZJFvMq9VaZmibxaibIjqI23S7Yc1cl2wO4IMiccQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=8)

`API Key`找该节点的开发者获取，记得备注小红书插件

`Domain`填写`http://host.docker.internal:3000`

![Image 9](https://mmbiz.qpic.cn/sz_mmbiz_png/cnV3NKP0vGmLospg9JDUHBTgicqGmowsDia4HW98j8U7c1lIHNhaRSJDy8BxIuP15wIWqXJzvIicPp4fOqbxgFQyQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=9)

#### （二）二创＋自动发布笔记工作流

1. 

    #### On form submission节点作为工作流的开始节点

按照图片简单设置一下内容

![Image 10](https://mmbiz.qpic.cn/sz_mmbiz_png/cnV3NKP0vGmLospg9JDUHBTgicqGmowsD6eAvlRQZI1UE1ppGSLDVHpJp900zpqcvsM7dyonaCWO4qj6CfFHQjw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=10)

1. 

    #### 获取笔记基础信息

![Image 11](https://mmbiz.qpic.cn/sz_mmbiz_png/cnV3NKP0vGmLospg9JDUHBTgicqGmowsDEMWCJGn3HGmudyry5XUZMRngMiangstLbFWCic0HZ8pTG6vNBCxdOf3A/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=11)

![Image 12](https://mmbiz.qpic.cn/sz_mmbiz_png/cnV3NKP0vGmLospg9JDUHBTgicqGmowsD1wphqicC6t1TYVZYSI0KBLVXBQk86tuvZqOl1uhP6JjCu4H00s559aw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=12)

1. 

    #### AI Agent：二创笔记

![Image 13](https://mmbiz.qpic.cn/sz_mmbiz_png/cnV3NKP0vGmLospg9JDUHBTgicqGmowsDeT3chibCKEhuaRhEYBmRjP9o3QjGjpQviaJO2rH2gFrLkB2BJ5U63YTg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=13)

`Prompt (User Message)`填写

```Plain Text
原标题： {{ $('获取笔记基础信息').item.json.data.title }}原内容：{{ $json.data.content }}原关键词：{{ $json.data.tags }}
```

`System Message`关注公众号后文末加光予好友获取哦

`Chat model`这里选择`deepseek`，大家自行配置，第一次使用的伙伴可以看往期文章学习哦，也可以在公众号后台领取`【n8n新手入门教程】`学习创建

点击👇名片关注公众号，后台回复关键词【n8n入门】

领取n8n小白入门教程

![Image 14](https://mmbiz.qpic.cn/sz_mmbiz_png/cnV3NKP0vGmLospg9JDUHBTgicqGmowsDKlQ1hSkmPr42rYRqkA05EELAwlicaxpn8ORpauyYTd9iarXkRcPykHvg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=14)

`Output parser`大家选择`Structured Output Parser` ，作用是结构化输出文本

![Image 15](https://mmbiz.qpic.cn/sz_mmbiz_png/cnV3NKP0vGmLospg9JDUHBTgicqGmowsD9LSkTT2kChC95EWAmWvVxPwOWXibB6xdx8fZeF7tiaUp3H5Gzq98dAiaA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=15)

1. 

    #### 获取图片资源

![Image 16](https://mmbiz.qpic.cn/sz_mmbiz_png/cnV3NKP0vGmLospg9JDUHBTgicqGmowsDRQdRxad5mbD8icswop26iclnS8OovLic77RZdTaxor4J3PdUJ08SllUDQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=16)

![Image 17](https://mmbiz.qpic.cn/sz_mmbiz_png/cnV3NKP0vGmLospg9JDUHBTgicqGmowsD7v7PgsuYp5QibNQj71lhW60D5IPaciadRGuAiasPEqnlgEv3sY1bMQIjw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=17)

1. 

    #### Code in JavaScript：提取图片数组

![Image 18](https://mmbiz.qpic.cn/sz_mmbiz_png/cnV3NKP0vGmLospg9JDUHBTgicqGmowsDrkVOgnsPR8Te5hr08QEBT4dTSYZB1Vtjxk1bVAo1WSicEiboQoWxooiaw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=18)

```Plain Text
// 正确获取输入中data下的images数组const images = $input.first().json.data.images || [];// 生成每个链接单独作为一项的数组const result = images.map(url => ({  json: { singleImage: url } }));return result;
```

1. 

    #### Split Out：拆分数组

![Image 19](https://mmbiz.qpic.cn/sz_mmbiz_png/cnV3NKP0vGmLospg9JDUHBTgicqGmowsDxnx4RQdDIXyr5xmibj5SFl7u74zHoJSyTu5ibut1cmSDP4nsINCzfPtA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=19)

1. 

    #### Loop Over Items：循环

`Split Out：拆分`和`Loop Over Items：循环`一般会一起出现，搭配使用

我们获取到的笔记图片链接是多个，需要对其依次进行上传操作

![Image 20](https://mmbiz.qpic.cn/sz_mmbiz_png/cnV3NKP0vGmLospg9JDUHBTgicqGmowsDE1sXWZf1icrJicUnZr0lib1IYP2aVbibNcDN8ZZLeXVnuNSTeYSdtncB4A/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=20)

1. 

    #### **添加Upload an asset fromURL节点**

**这个节点的作用将我们获取到的图片通过URL导入到 Cloudinary 存储**，方便后续对图片进行处理、管理或调用。

我们在在添加节点中搜索`cloudinary`，没有安装的点安装按钮即可

![Image 21](https://mmbiz.qpic.cn/sz_mmbiz_png/cnV3NKP0vGmLospg9JDUHBTgicqGmowsDotX2zibjpG14JlOuSl2lUClWdSO9eGTVwltictQwW4RITkl9iaSJRfiaZw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=21)

![Image 22](https://mmbiz.qpic.cn/sz_mmbiz_png/cnV3NKP0vGmLospg9JDUHBTgicqGmowsDlaE3jd6SNuOyMPeibte74IRr2UKicTg2kqj6GPL8MODfW44AKzsDducQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=22)

![Image 23](https://mmbiz.qpic.cn/sz_mmbiz_png/cnV3NKP0vGmLospg9JDUHBTgicqGmowsDE38RQjjYJMHichgiaMJ5qDj4GR0ST5w0QAKRib4ibA2bmXWt8jrIj8Wv7Q/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=23)

第一次使用我们需要创建凭证

![Image 24](https://mmbiz.qpic.cn/sz_mmbiz_png/cnV3NKP0vGmLospg9JDUHBTgicqGmowsDu5N3UEEoxZu3POYXIepMWv1hDnMYSZV2tM9d0T44mL1SoSueTa9aQw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=24)

`Cloud Name`去`https://cloudinary.com/`获取

![Image 25](https://mmbiz.qpic.cn/sz_mmbiz_png/cnV3NKP0vGmLospg9JDUHBTgicqGmowsD6w2Ju1MjLFibdpIeicojv44Tae21h2A2jia6jJO6WH8XUw3ffoB7HsdAA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=25)

![Image 26](https://mmbiz.qpic.cn/sz_mmbiz_png/cnV3NKP0vGmLospg9JDUHBTgicqGmowsDqR5WMo0k8fHjTqHskoL0WHIl251O6nJM5FjUBW2ZagNuXCYHFHmu2g/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=26)

![Image 27](https://mmbiz.qpic.cn/sz_mmbiz_png/cnV3NKP0vGmLospg9JDUHBTgicqGmowsDNSuiaC2Po53kSibJqugQFw4iaaaqyXPRIse8r6ib2kB5nnn8niau9ALyZnA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=27)

1. 

    #### Code in JavaScript：数组变字符串

![Image 28](https://mmbiz.qpic.cn/sz_mmbiz_png/cnV3NKP0vGmLospg9JDUHBTgicqGmowsD7vQ037oqwhDMnwdDAGwYia0dG0v5JX2xGBhlOuMwsLciaqXll6D3dQSg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=28)

这里的代码光予就不放在文章里面了，文章太长会影响完读率，需要的伙伴关注公众号后文末加光予好友获取哦

1. 

    #### 发布笔记

![Image 29](https://mmbiz.qpic.cn/sz_mmbiz_png/cnV3NKP0vGmLospg9JDUHBTgicqGmowsDHngMYHVJdPxvWOozX0SoHaATn3iaW2NpQq6MHYQmcR9ibNiaeG82Tp8IQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=29)

![Image 30](https://mmbiz.qpic.cn/sz_mmbiz_png/cnV3NKP0vGmLospg9JDUHBTgicqGmowsD1DkZiaL7zjAZuhuRLx0ichvd5mahibibhQvesvSAbJJWzoCgWUyRdM8YsA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=30)

这个节点填入的内容需要做下特殊处理，不能直接使用拖拉拽的方式获取变量内容

`标题`填写`{{ $("AI Agent").first().json.output.title }}`

`笔记内容`填写`{{ $("AI Agent").first().json.output.content }}`

`图片路径或地址`填写`{{ $json.secureUrlString }}`

`标签`填写`{{ $("AI Agent").first().json.output.tags }}`

![Image 31](https://mmbiz.qpic.cn/sz_mmbiz_png/cnV3NKP0vGmLospg9JDUHBTgicqGmowsDVGJBKqESBxPSmHxFLwJe2GovuugtlBFXVKjsNibL6ECddFKDDkUGPrg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=31)

以上就是整个工作流流程，动手能力强的伙伴可以跟着教程搭建哦，如果想直接获取工作流原件，文末扫码加光予好友获取~

码字不易，如果有收获，辛苦你点赞，转发，推荐给更多需要的小伙伴。

> 另外，我还建了一个**【AIGC交流群】**， 里面会分享我平时用的工具和资料， 一个人学容易放弃，大家一起就更有动力啦 ✨

想进群的朋友很简单：

👉 【关注】后在文末扫码加光予好友，备注【已关注＋进群】，光予邀请你进群交流学习哈

我是光予，一个爱折腾的 00 后， 和你一起 用 AI 开辟人生第二条赛道 🚀

感谢你耐心看完我的文章，祝你万事皆胜意，我们下期教程见！👋

![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/cnV3NKP0vGmLospg9JDUHBTgicqGmowsDCdTXo4yU4wvs6WdnyzWyYGD1Z23C6ynyWHvTbIEWh978RynGonOl8w/640?wx_fmt=jpeg&from=appmsg&watermark=1#imgIndex=32)

