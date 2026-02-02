---

title: AI智能体｜扣子(Coze)实战拆解：一键生成公众号文章封面图
date: 2025-09-13
tags: ["coze", "Coze", "扣子", "AI", "人工智能", "智能体", "Agent", "实战", "案例", "n8n", "工作流自动化"]
category: AI Agent
---


# AI智能体｜扣子(Coze)实战拆解：一键生成公众号文章封面图

Original 红姐 [红姐聊AI](javascript:void(0);)*2025年09月13日 19:51* *湖北*

点击上方关注“红姐聊AI”，可免费领取AI学习大礼包

Hi，你好，我是红姐，专注AI创作与分享

对于写公众号文章的写作博主，每次发公众号最愁什么？

找图、做封面！真耗时又烧脑……

我最开始写的时候文字都还好，一遇到配封面图就伤透脑筋，担心风格不统一，担心与写作主题不匹配。文字与图耗时将近1:1

AI时代这个难题算是能解决了。

今天给大家分享用Coze一键生成公众号文章封面图，输入文章地址生成高质量封面图，风格统一，再也不用苦苦作图找图

无论是情感号、科技类、育儿领域，这套工作流都能适配！✨

以我的上一篇文章为例，我写的是实战拆解老奶奶治愈系短视频的拆解

[AI智能体｜扣子(Coze)实战拆解：一键生成老奶奶治愈系语录短视频（附提示词和代码）](https://mp.weixin.qq.com/s?__biz=MzIxMTA5NzE0MQ==&mid=2247484668&idx=1&sn=e4c8311c0ebf3e4574d475cb851fb219&scene=21#wechat_redirect)

产生的封面图如下，是不是特别赞👍

![previewImag](https://mmbiz.qpic.cn/mmbiz_png/ZHkNqw7XicGvzpKhUuvF0liaekVdAvAyyTm1Jd5S9EOh3mxGEzMa9Ejqe69SZsHZUiaWZibiaGEO3m4fqYz3yhzqhBQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=0)

不过我自己现在文章封面图风格在走逻辑风，大约是下面的这样子，也是一键生成的，自己感觉会让用户对文章内容了解的更清晰，大家更喜欢哪种风格呢？

![Image](https://mmbiz.qpic.cn/mmbiz_png/ZHkNqw7XicGvzpKhUuvF0liaekVdAvAyyTViaUW8Bhd40GyWVvVj3XyUnS2icGha4DD7IiaZDJKSprLFBZfgcNLicDvQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=1)

不扯远了，👉 具体拆解来了：

1.根据文章地址读取文章内容

2.用大模型节点生成作图的提示词

3.用图像生成插件生图

省下的时间，多写两篇爆文不香吗？📸✨

![Image 1](https://mmbiz.qpic.cn/mmbiz_png/ZHkNqw7XicGvzpKhUuvF0liaekVdAvAyyTtBlaAOKVxJLIqeVoFuBsLqmWPzUb6mlcsR37zpJlLCeAkFWq3mia9jg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=2)

这条工作流还是挺简单，即使不会代码也能轻而易举的自己搭建出来，就是需要花点时间耐心跟做（当然编排好了之后也可以按自己喜欢的图片风格自由改造）


![Image 2](https://mmbiz.qpic.cn/mmbiz_png/ZHkNqw7XicGvzpKhUuvF0liaekVdAvAyyTy8O2VaQq4YhiadozcW8ibkWBK3j4pQrX4kR02QU594J8b51bjl3ukokw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=3)

接下来，我将结合coze开发智能体平台，带大家一步步实践如何制作这条工作流：

一、登录coze平台

https://www.coze.cn/home登录到首页之后，切换到工作空间，选择工作流，在右上角的“资源”选择工作流，新增

![Image 3](https://mmbiz.qpic.cn/mmbiz_png/ZHkNqw7XicGsv0oT46KEXNziaxgRIWejTGViazfocQKSibA8koKWH1wLO4oB7hjIQpIAXulr66TM7D5p6rrSowJOFg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=4)

二、工作流配置

接下来，我将根据工作流关键节点配置提供详细说明

开始节点

直接输入文档地址，比如我的上篇文章：[https://mp.weixin.qq.com/s/QBVhyfb46Jr7mTjkCOtlkQ](https://mp.weixin.qq.com/s?__biz=MzIxMTA5NzE0MQ==&mid=2247484668&idx=1&sn=e4c8311c0ebf3e4574d475cb851fb219&scene=21#wechat_redirect)

![Image 4](https://mmbiz.qpic.cn/mmbiz_png/ZHkNqw7XicGvzpKhUuvF0liaekVdAvAyyT0xVC0O5f3972IvWIzOKpgvd81iaUvEqd25dBU0lInKg1Lq611kePoYA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=5)




大模型-生成提示词

1.模型选择

对生成的文案有直接影响，在调试中可以多用几个模型试试看哪个效果好就可以用哪个

2.输入

可以直接引用开始节点，记得类型要匹配上哦

3.提示词

提示词的部分也是内容生成的内容的核心，可以参考之前我写过的提示词技巧相关文章，自由去编写，只要能写出目标的提示词都可以。如果工作流搭建好了之后要自由调整风格就可以调整这里的提示词``

![Image 5](https://mmbiz.qpic.cn/mmbiz_png/ZHkNqw7XicGvzpKhUuvF0liaekVdAvAyyTgs4wYtnSfbgc5YFlxLz3zdzCyN31ztvdUSHgxI2JfB4qIlvc5Y2CnA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=6)

``

附提示词：

# 角色

你是一个专业的视频封面生成器，擅长从输入的文案中精准提取标题和重点关键词，并依据这些内容生成合适的视频封面提示词。




## 技能

### 技能 1: 提取文案标题和关键词

1. 仔细分析输入的文案，提取出能够概括核心内容的标题。

2. 从文案中挑选出关键的、具有代表性的关键词。




### 技能 2: 生成视频封面提示词

1. 结合提取的标题和关键词，生成一个详细的视频封面提示词，该提示词需能清晰描绘出适合该文案的视频封面画面元素、风格等。

2. 生成的提示词应简洁明了且具有指向性。







## 限制:

- 仅围绕输入的文案进行标题、关键词提取及视频封面提示词生成，不涉及其他无关任务。

- 输出的标题应准确概括文案核心，关键词应具有代表性。

- 生成的视频封面提示词需合理、清晰，符合一般视频封面创作逻辑。




---




### 输出案例：




1. **研究主题图片**

   - **标题**: Deep Research Fallout

   - **关键词**: 研究, 紧张, 惊讶, 深色背景, 男性, 灰色混凝土

   - **封面提示词**: 背景为灰色混凝土纹理，右上角用大写黑色和红色文字写“DEEP RESEARCH FALLOUT”。左侧展示一位表情惊讶的男性，双手放在头上。整体风格突出紧张和惊讶的情绪。




2. **教程主题图片**

   - **标题**: 10分钟学会用RAG投喂数据给DeepSeek

   - **关键词**: 教程, 10分钟, RAG, DeepSeek, 吃豆人, 文档

   - **封面提示词**: 背景为蓝色到粉色的渐变色，左上角用白色文字写“10分钟学会”，中间用白色文字写“用RAG投喂数据给DeepSeek”。左侧放置一个黄色吃豆人图案，上面有“deepseek”标志。吃豆人前面排列多个文档图标，包括Word文档和纸张图标。整体风格简洁明了。




3. **科技对抗主题图片**

   - **标题**: The War Has Begun

   - **关键词**: 科技, 对抗, 战争, 蓝色光芒, 芯片, 政治人物, 火焰

   - **封面提示词**: 深色背景，顶部用白色文字写"THE WAR"，下方红色横幅内写"HAS BEGUN"。中央放置一个发光的蓝色芯片/处理器，周围有蓝色光芒和红色粒子效果。左右两侧各放置一位政治人物的侧面剪影，面对中央。底部添加火焰效果。整体氛围紧张对立。




4. **幽默主题图片**

   - **标题**: 又放大招？

   - **关键词**: 幽默, 夸张, 深色背景, 鲸鱼, 男性, 彩色图标

   - **封面提示词**: 背景为黑色，左上角有一个红色矩形标志，内含白色鲸鱼图案和“deepseek”文字。中间用黄色文字写“又放大招？”。右侧展示一位表情夸张的男性，穿着浅色上衣，头戴太阳镜。左下角有一个模糊的彩色图标。




5. **教育主题图片**

   - **标题**: 世界上最致命的蘑菇

   - **关键词**: 教育, 蘑菇, 危险, 深红色, 插图, LOGO

   - **封面提示词**: 背景为深红色，左侧用大写白色文字写“世界上最致命的蘑菇”。右侧展示三朵浅黄色和白色的蘑菇插图。右上角添加一个红色圆形标志，内有白色文字“LOGO”。




生成图片

这个比较简单，就不多说了，把上个大模型节点输出的提示词直接配置好就行。PS：这里的尺寸不能换

![Image 6](https://mmbiz.qpic.cn/mmbiz_png/ZHkNqw7XicGvzpKhUuvF0liaekVdAvAyyT6n2rL0mDUwicgcvF1MWwtsDZmT9kXIwqocnial5dZr5mswgt82dQ7h8A/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=7)

到这里一键生成公众号文章封面图的工作流就制作好了

是不是可以帮助我们解放双手？

最后想说下

温馨提示❤️：

1.本工作流设计颇为比较简单，但能极大的提升封面图的生产效率，对于有配图需求的朋友们都建议用起来

2.这个工作流只能读取到已经发布到公域的信息，如果是需要登录才能访问的内容才能读取到，所以更适合做跨平台内容迁移的自媒体博主们，如果要为当前内容生产图片，也可以将输入直接改为内容，或者是采用浏览器插件的方式来实现

3.想直接获取这条工作流的朋友们可以文末连接我分享哦～

暂时没时间的朋友们也可以先收藏后面再来动手呀，也可关注红姐不错过后面的分享哦




学习搭建工作流，相比流程编排，更重要的是清晰的思路，先了解自己的需求，再分步拆解-实践，我相信，更宝贵的还是你的创意想法🌹

感谢大家的关注，今天的分享就到这里啦，如果我的分享对你有帮助，你的点赞、转发、在看能帮更多朋友有所收获哦

![https://res.wx.qq.com/t/wx_fed/we-emoji/res/assets/Expression/Expression_93@2x.png?tp=webp&wxfrom=5&wx_lazy=1#imgIndex=8](AI智能体｜扣子+Coze+实战拆解：一键生成公众号文章封面图+03cab69e-b67c-482e-ace4-919502c58d36/图片.png)

～

**-END-** 

我是红豆，专注于AI创作分享，坚信未来属于会AI的人，感恩遇见，愿你我能携手共进，拥抱AI时代的来临，交流来撩：👇（加群备注来意）

▼扫下方二维码，与红豆连接~

![Image 7](https://mmbiz.qpic.cn/mmbiz_png/ZHkNqw7XicGuaHBCsJbbNibl3Y6wcMEusaicnTkW0KLAVQr9gqEZAVyB1XJzNo49QrnibibibKVOcxXVkUtA6K3yLhGQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=9)

“红姐聊AI”主页👇，关注不迷路❤️一起探索更多AI创作提效技巧

