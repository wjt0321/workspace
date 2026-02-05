---

title: 利用n8n+即梦实现自动化图片生成，AI文生图邪修玩法！
date: 2025-11-05
tags: ["n8n", "工作流", "自动化", "AI", "人工智能", "智能体", "Agent", "图片", "封面", "配图", "工作流自动化"]
category: 自动化工具
---


# 利用n8n+即梦实现自动化图片生成，AI文生图邪修玩法！

Original RPA小站 [RPA小站](javascript:void(0);)*2025年11月5日 14:13* *天津*

最近我又痴迷上了AI文生图，AI绘画已经成为创作者们的新宠，对于需要批量生成图片或者希望将AI绘画集成到自动化工作流中的用户来说，传统的手动操作方式显然无法满足需求。

今天我来带大家探索一种全新的解决方案：通过n8n这款强大的自动化工具，结合即梦AI绘画平台，打造一个高效的自动化文生图系统。

先看工作流：

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/icC5z290icQgSzqTOYTL5Cfdv8LaNJmxIMhev4msaMyDAv7DLNQ6EPaCwhqjV2Yxk94zlAff2o8bywoucmP3xNkA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=0)

实现思路如下：

```Plain Text
n8n Form → 输入提示词、选择模型和宽高比等 → 调用jimeng node（sessionid） → 生图 → 下载图片到本地
```

1、获取即梦AI的sessionid 

打开https://jimeng.jianying.com/ai-tool/generate/?type=image，登录即梦，快捷键按F12打开开发者工具，复制sessionid

![Image 1](https://mmbiz.qpic.cn/sz_mmbiz_png/icC5z290icQgSzqTOYTL5Cfdv8LaNJmxIMqrlRG7GeVO5FkVB4k4dyRqADvjTBBKSibOFahWN4VtD78eMwByRT8SA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=1)

在n8n里安装 n8n-nodes-jimeng 节点

![Image 2](https://mmbiz.qpic.cn/sz_mmbiz_png/icC5z290icQgSzqTOYTL5Cfdv8LaNJmxIM63qbV5XM17lRct8RhozX77PhnvRdoC5ZviaMRHZoEQ7YtIS5hT7h3CA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=2)

找到jimeng控件，并新建凭证，输入你刚才的sessionid

![Image 3](https://mmbiz.qpic.cn/sz_mmbiz_png/icC5z290icQgSzqTOYTL5Cfdv8LaNJmxIMUAdNZOpdRTibwEkOl1mmTnMfFClaKVdZGcV9ZVf9A3c4JicweddDiczEA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=3)

2、输入你的提示词、模型等信息

![Image 4](https://mmbiz.qpic.cn/sz_mmbiz_png/icC5z290icQgSzqTOYTL5Cfdv8LaNJmxIMVgRzQ3cs0cTmm6VvSYsrG5F2y1RfibSibEuiczgK4Sd6hrHVTzK9qSPjw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=4)

3、生图

一般会生成4张图，利用Split Out、Loop Over Items等提取生成的图的链接

![Image 5](https://mmbiz.qpic.cn/sz_mmbiz_png/icC5z290icQgSzqTOYTL5Cfdv8LaNJmxIMJ2hs7rXJqFwEpKRYJI0DYCvXN8gOhfCBqvUuBKib82dePURWPTPsJTw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=5)

和 [n8n文件保存方法：让AI生成的内容轻松落地本地硬盘](https://mp.weixin.qq.com/s?__biz=MzI4OTc4MDY3Nw==&mid=2247485843&idx=1&sn=79765f0f18e09f6c5c233b005ba1df35&scene=21#wechat_redirect) 这一篇类似，

每次循环中利用 HTTP Request 下载图片，然后再利用 Read/Write Files from Disk 写入你的硬盘。

演示如下：

![Image 6](https://mmbiz.qpic.cn/sz_mmbiz_png/icC5z290icQgSzqTOYTL5Cfdv8LaNJmxIMELTx3TynbeSDCZn3hOfhpAu8OYibawic0mhaVv0S2pwvJ4WmkYmWXCpg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=6)

最终效果，打开D盘文件夹：

![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/icC5z290icQgSzqTOYTL5Cfdv8LaNJmxIM548xdz00jrEaQ6FvIkDRK1R7pib8V2Oeo22k7oTzibr9jbj74SqVA4cw/640?wx_fmt=jpeg&from=appmsg&watermark=1#imgIndex=7)




下期继续分享，欢迎关注

![https://res.wx.qq.com/t/wx_fed/we-emoji/res/v1.3.10/assets/newemoji/2_06.png#imgIndex=8](利用n8n+即梦实现自动化图片生成，AI文生图邪修玩法！+060d929e-9fe0-4fc5-a5a8-56b545406122/Image 7.png)

**分享几个我的小程序**
👇点击或长按识别体验👇

![图片](https://mmbiz.qpic.cn/sz_mmbiz_jpg/icC5z290icQgTiaRKvZ10vGL94b14GNcHwssNTmGg0EW6sbgYv5RI4dEjeYbUg7Feb34hvDFV9AV0XYv8v0Xa6zrA/640?wx_fmt=jpeg&from=appmsg&tp=wxpic&wxfrom=5&wx_lazy=1&watermark=1#imgIndex=4)

生日水印相机

![图片 1](https://mmbiz.qpic.cn/sz_mmbiz_jpg/icC5z290icQgTiaRKvZ10vGL94b14GNcHws2OuI8icLbF0Bd6WoTiaia4NTNibuHES8IiaCbwsjXYMJpSs5IWvjN4bMmXQ/640?wx_fmt=jpeg&from=appmsg&tp=wxpic&wxfrom=5&wx_lazy=1&watermark=1#imgIndex=5)

超级字符

![图片 2](https://mmbiz.qpic.cn/sz_mmbiz_jpg/icC5z290icQgTiaRKvZ10vGL94b14GNcHwsHHBJbRQF4pKh8XwQdPPSo0MqoRasTIIJeA5dgvgvM0XprURKEcwia4Q/640?wx_fmt=jpeg&from=appmsg&tp=wxpic&wxfrom=5&wx_lazy=1&watermark=1#imgIndex=6)

春节倒计时

 **// / 往期精选// /**

- **[n8n里如何循环指定次数？](https://mp.weixin.qq.com/s?__biz=MzI4OTc4MDY3Nw==&mid=2247485754&idx=1&sn=f7ed4f3ea946102296d9d2b8a4370d5d&scene=21#wechat_redirect)**

- **[n8n里如何给自己的微信发消息？](https://mp.weixin.qq.com/s?__biz=MzI4OTc4MDY3Nw==&mid=2247485766&idx=1&sn=81f6fc8e0f1e2b9109d31de763e2a9f4&scene=21#wechat_redirect)**

- **[n8n文件保存方法：让AI生成的内容轻松落地本地硬盘](https://mp.weixin.qq.com/s?__biz=MzI4OTc4MDY3Nw==&mid=2247485843&idx=1&sn=79765f0f18e09f6c5c233b005ba1df35&scene=21#wechat_redirect)**

