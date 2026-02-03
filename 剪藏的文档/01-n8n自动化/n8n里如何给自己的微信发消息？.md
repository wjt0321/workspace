---

title: n8n里如何给自己的微信发消息？
date: 2025-10-21
tags: ["n8n", "工作流", "自动化", "工作流自动化"]
category: 自动化工具
---


# n8n里如何给自己的微信发消息？

Original RPA小站 [RPA小站](javascript:void(0);)*2025年10月21日 16:58* *天津*

有时候我们需要在自动化流程里给自己发消息，尤其是发到【微信】里，这种消息比较及时

如何在n8n里实现这个需求呢？

这里我用到 https://www.pushplus.plus/ 来实现

pushplus可以实现“一对一”（发给自己）或者“一对多”（发给群组）发消息

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/icC5z290icQgSiaZQ8mHf5CzJEYN7uR79ibibicRB5wZEiay1bicbtjjgLALyJy1su8xL9ibSFCicQnKLupLCMNK3JZYiaE8Q/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=0)

“一对一”

注册后会得到自己的专属token：

![Image 1](https://mmbiz.qpic.cn/sz_mmbiz_png/icC5z290icQgSiaZQ8mHf5CzJEYN7uR79ibibUvcqMBcVvnrf1Gvy2fRwG8sXxic98scPzyIJUsicq0icjibu3ThQKfddsQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=1)

得到一个新平台，首先要学会看它的官方文档：

![Image 2](https://mmbiz.qpic.cn/sz_mmbiz_png/icC5z290icQgSiaZQ8mHf5CzJEYN7uR79ibibX4mlicWQ7ZaKgn8GZYczT7vgPibCYZBy19Dm6I5BibkcwUVuiarK6TylmA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=2)

POST方式推送消息

请求地址：http://www.pushplus.plus/send/

请求方式: POST

请求内容：

```Plain Text
{
    "token":"{token}",
    "title":"标题",
    "content":"消息内容",
    "topic":"test"
}
```

说明：具体使用的时候将请求内容中的{token}替换成自己的token

可以看到，通过n8n里的 HTTP Request 就可以实现，下面是具体配置，相当简单：

填写url：

![Image 3](https://mmbiz.qpic.cn/sz_mmbiz_png/icC5z290icQgSiaZQ8mHf5CzJEYN7uR79ibibk1vguGIWo0qYWzeDZ6k8qynLvraKdWJyLdRRWFDSBycicGfz5WPZVPg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=3)

填写body：包含你的token、title、content等

![Image 4](https://mmbiz.qpic.cn/sz_mmbiz_png/icC5z290icQgSiaZQ8mHf5CzJEYN7uR79ibibaJcGfvRfuhmljcfz99CJFaGRchCuE9ibYnuamVaiaT9ic0ZZXwKjia28PQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=4)

然后点击运行即可

“一对多”

只需要提前创建群组，获取到自己的群组编码

![Image 5](https://mmbiz.qpic.cn/sz_mmbiz_png/icC5z290icQgSiaZQ8mHf5CzJEYN7uR79ibibpWpSxHEmVKQXQYO80BlvjUUsXkgYxsSEdarq7jibb0yhHRft3ibrnIIg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=5)

然后在 HTTP Request 的 Send Body 里多添加一个 topic 参数即可

下期继续分享，欢迎关注

 **// / 往期精选// /**

- **[n8n里如何循环指定次数？](https://mp.weixin.qq.com/s?__biz=MzI4OTc4MDY3Nw==&mid=2247485754&idx=1&sn=f7ed4f3ea946102296d9d2b8a4370d5d&scene=21#wechat_redirect)**

