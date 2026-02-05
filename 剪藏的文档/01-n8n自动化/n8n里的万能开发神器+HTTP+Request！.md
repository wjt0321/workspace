---

title: n8n里的万能开发神器 HTTP Request！
date: 2025-10-22
tags: ["n8n", "工作流", "自动化", "工作流自动化"]
category: 自动化工具
---


# n8n里的万能开发神器 HTTP Request！

Original RPA小站 [RPA小站](javascript:void(0);)*2025年10月22日 16:58* *天津*

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/icC5z290icQgT0uaXwEia1UZibCAOhTkF2hdzYkiatrLgBTgMADa0uORuonABN0Fhw457fyUib9L8T8Vb5IIQaUpljaw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=0)

HTTP Request 节点是 n8n 中最重要和常用的节点之一，用于向任何 HTTP 端点发送请求。

今天来介绍一个它的简单用法，获取API信息，这里**以获取天气信息为例**

先找一些api信息查询相关的网站，你可以获取天气、每日新闻等等你所需要的信息，这种网站很多，这里我用的：https://www.mxnzp.com/doc/list




![Image 1](https://mmbiz.qpic.cn/sz_mmbiz_png/icC5z290icQgT0uaXwEia1UZibCAOhTkF2hdFFaKuKOPnQVdW9ibGjYnJSaMvbzuZlbjfeTLQFInOCqw3c2xDiallQNw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=1)

开发任何东西之前，记得先看文档

```Plain Text
接口地址： https://www.mxnzp.com/api/weather/current/{城市名或者区或者县}
返回格式： JSON
请求方式： GET
请求示例： https://www.mxnzp.com/api/weather/current/深圳市?app_id=不再提供请自主申请&app_secret=不再提供请自主申请
接口备注： 获取特定城市名或者区或者县今日天气信息
```




根据文档，申请自己的 app_id 和 app_secret

为方便起见，你可以用一个 Edit Fields 节点设置好自己的参数，其中包含上面你自己的id和secret，另外根据文档还得加一个location，如下：

![Image 2](https://mmbiz.qpic.cn/sz_mmbiz_png/icC5z290icQgT0uaXwEia1UZibCAOhTkF2hdKLibGFtewFGRaS6HkVQ9oHQGTibGN3FOCpaEprLIgGm7ouib0ScBgcCRg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=2)

▲ 随便写了一个我出差的地方“赤峰”

在 HTTP Request 调用你上一个节点设置好的参数，这里比较简单，只需要设置url即可：

![Image 3](https://mmbiz.qpic.cn/sz_mmbiz_png/icC5z290icQgT0uaXwEia1UZibCAOhTkF2hdB7Pz85dW5r8numhvp1iboOiaIeDuTiblkfibYnyQkAOZBhKF6K0rE6A8aQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=3)

运行得到：

![Image 4](https://mmbiz.qpic.cn/sz_mmbiz_png/icC5z290icQgT0uaXwEia1UZibCAOhTkF2hdYEjJq0NsGlCY79HdBP0QVRf2laurzzsYMuNZXgtkh6qlgbGgSnzWFg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=4)

你可以结合 [n8n里如何给自己的微信发消息？](https://mp.weixin.qq.com/s?__biz=MzI4OTc4MDY3Nw==&mid=2247485766&idx=1&sn=81f6fc8e0f1e2b9109d31de763e2a9f4&scene=21#wechat_redirect)这篇，把你想要的信息推送到自己的微信上。当然，你还可以找一些新闻api、段子api，直接推送到微信上。

整体工作流如下：

![Image 5](https://mmbiz.qpic.cn/sz_mmbiz_png/icC5z290icQgT0uaXwEia1UZibCAOhTkF2hdzzzUibB6WDfNusgED5hmLRPLbPdNX9AM23SD3kJXurfbQRsSScxbStg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=5)




下期继续分享，欢迎关注

![图片](https://mmbiz.qpic.cn/sz_mmbiz_jpg/icC5z290icQgT0uaXwEia1UZibCAOhTkF2hdiabN50P2EYwhxEUqvBAMFHpQZGOj3Yibs79Laf2M2Kbo7kuBOOIMsgww/640?wx_fmt=jpeg&from=appmsg&tp=wxpic&wxfrom=5&wx_lazy=1&watermark=1#imgIndex=3)

▲ 点击上方，体验我的小程序

 **// / 往期精选// /**

- **[n8n里如何循环指定次数？](https://mp.weixin.qq.com/s?__biz=MzI4OTc4MDY3Nw==&mid=2247485754&idx=1&sn=f7ed4f3ea946102296d9d2b8a4370d5d&scene=21#wechat_redirect)**

- **[n8n里如何给自己的微信发消息？](https://mp.weixin.qq.com/s?__biz=MzI4OTc4MDY3Nw==&mid=2247485766&idx=1&sn=81f6fc8e0f1e2b9109d31de763e2a9f4&scene=21#wechat_redirect)**

