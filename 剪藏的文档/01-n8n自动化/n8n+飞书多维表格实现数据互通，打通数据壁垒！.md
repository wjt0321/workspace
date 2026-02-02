---

title: n8n+飞书多维表格实现数据互通，打通数据壁垒！
date: 2025-11-06
tags: ["n8n", "工作流", "自动化", "飞书", "工作流自动化"]
category: 自动化工具
---


# n8n+飞书多维表格实现数据互通，打通数据壁垒！

Original 小技巧Pro [RPA小站](javascript:void(0);)*2025年11月6日 14:02* *天津*

飞书作为新一代企业协作平台，承载着团队沟通、文档协作、项目管理等重要功能。

今天我给大家介绍一下：通过n8n+飞书多维表格的深度集成，构建一个灵活的数据互通桥梁，帮你解决数据孤岛问题，大大提升工作效率，让数据在各个系统间自由流动。

1、安装飞书社区节点

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/icC5z290icQgTEB4tFYMiarjcKyOdZcONic0Ezey7NmWUItJ8VXeexHIP6MblMj8kBIv9qbkHWWicC1xbGYComFun7Q/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=0)

使用前得先在“飞书开放平台”创建一个企业自建应用，不做这一步不太行

![Image 1](https://mmbiz.qpic.cn/sz_mmbiz_png/icC5z290icQgTEB4tFYMiarjcKyOdZcONic0YFun2bz2iam8gFWUQk0gWqx5kyLTkBsibrDMHHFVuXu5j7VAVgm2IrBQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=1)

添加各种权限：

![Image 2](https://mmbiz.qpic.cn/sz_mmbiz_png/icC5z290icQgTEB4tFYMiarjcKyOdZcONic07awmnYfFcCnuoWjrdbhDnT4iaAYHVdRZ8L4YBfxG0VhMmBbL9PWfXrw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=2)

在“版本管理与发布”里发布你新建的这个应用

这时候得将应用的 App ID 和 App Secret 复制下来，方便后续使用，打开 n8n 新建credentials，新建飞书节点账号，把刚才复制的内容填进去，看到测试成功即可

![Image 3](https://mmbiz.qpic.cn/sz_mmbiz_png/icC5z290icQgTEB4tFYMiarjcKyOdZcONic0au1c3XvaicGA7S2pBXnH2VkY4XZQSHLqgJYHhotHicgiaSsT76jVHY2dA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=3)

2、操作读取多维表格

打开你的多维表格，“添加文档应用”，这一步也是必不可少

![Image 4](https://mmbiz.qpic.cn/sz_mmbiz_png/icC5z290icQgTEB4tFYMiarjcKyOdZcONic0mRjo290q2PJ1g6ae53ibxqkuH0cCKnX8kIIIIF3BIXRQoHXAhWOud1w/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=4)

3、搭建工作流

又到了熟悉的n8n工作流环节

![Image 5](https://mmbiz.qpic.cn/sz_mmbiz_png/icC5z290icQgTEB4tFYMiarjcKyOdZcONic0JDz7hauCSUe8mRymbSfMSVraqJqMw8gQqkAibSMUIQj9hU95l4ocC1w/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=5)

我这里只简单写了数据的读取，比如“列出字段”

![Image 6](https://mmbiz.qpic.cn/sz_mmbiz_png/icC5z290icQgTEB4tFYMiarjcKyOdZcONic0FPFbgfp1v2jGfn7kR2eHRFMkB0sbFXfftMUYUFHARt8INHbcWQb9PA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=6)

我的表格内容如下

![Image 7](https://mmbiz.qpic.cn/sz_mmbiz_png/icC5z290icQgTEB4tFYMiarjcKyOdZcONic0wWXA3oibpkAVVwFyvI9QJ0GjoVIb4tKkwedSbFO2iaMrGkicCnQOysuxA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=7)

“新增记录”，这里要注意请求体的写法，格式为：你的字段名称键值对

```Plain Text
{"fields":{
  "文本":"2025年11月06日 11:11:49"
}}
```

![Image 8](https://mmbiz.qpic.cn/sz_mmbiz_png/icC5z290icQgTEB4tFYMiarjcKyOdZcONic0mKtw2A5SJ2A577UO4DfEHCZms2boNk6gAPxQCjOBjsGzox8EZQibf1w/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=8)

后续你可以把n8n抓到的数据写入飞书表格里，然后利用飞书多维表格的AI能力，实现更多想法。




下期继续分享，欢迎关注

![https://res.wx.qq.com/t/wx_fed/we-emoji/res/v1.3.10/assets/newemoji/2_06.png#imgIndex=9](n8n+飞书多维表格实现数据互通，打通数据壁垒！+29b8eca9-3d6b-4e04-b4cf-a059d721b338/Image 9.png)

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

- **[利用n8n+即梦实现自动化图片生成，AI文生图邪修玩法！](https://mp.weixin.qq.com/s?__biz=MzI4OTc4MDY3Nw==&mid=2247485864&idx=1&sn=28f00a448b264bbd251fb204dd4e2e4b&scene=21#wechat_redirect)**

- **[n8n文件保存方法：让AI生成的内容轻松落地本地硬盘](https://mp.weixin.qq.com/s?__biz=MzI4OTc4MDY3Nw==&mid=2247485843&idx=1&sn=79765f0f18e09f6c5c233b005ba1df35&scene=21#wechat_redirect)**

