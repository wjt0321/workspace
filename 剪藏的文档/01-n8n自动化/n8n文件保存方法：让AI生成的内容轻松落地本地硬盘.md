---

title: n8n文件保存方法：让AI生成的内容轻松落地本地硬盘
date: 2025-11-04
tags: ["n8n", "工作流", "自动化", "AI", "人工智能", "智能体", "Agent", "工作流自动化"]
category: 自动化工具
---


# n8n文件保存方法：让AI生成的内容轻松落地本地硬盘

Original RPA小站 [RPA小站](javascript:void(0);)*2025年11月4日 16:58* *天津*

在AI内容生成日益普及的今天，如何高效地管理和保存AI生成的文字、图片等数字资产，成为了许多用户面临的实际问题。

特别是在Windows环境下使用n8n这样的自动化工具时，如何将生成的内容自动保存到本地硬盘，不仅能提高工作效率，还能确保重要内容的安全存储，今天就来简单介绍一下。

先来看一下我的主要流程：调用智谱API——生图——保存图片到本地硬盘

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/icC5z290icQgRyxS9V8bmickTU63e4URf3tZelOpNIv1wicibqvbibKkTxn82GhZcT8ib1WeuEI5laWgDGnEFibokSdKbw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=0)

在做这些之前，你先得把n8n部署正确：

```Plain Text
docker run -d --name n8n -p 5678:5678 -v D:\docker\n8n_data:/home/node/.n8n -v D:\docker\n8n_files:/home/node/Files n8nio/n8n:latest
```

简单解释一下：

- `-v D:\docker\n8n_data:/home/node/.n8n`

- 

    - 宿主机路径：`D:\docker\n8n_data` - Windows本地目录

    - 容器路径：`/home/node/.n8n` - n8n的配置和数据目录

- 

    - 作用：第一个数据卷挂载

    - 格式：宿主机路径:容器内路径

    - 用途：

    - 功能：保存工作流、凭据、设置等n8n核心数据

    - 重要性：确保数据持久化，容器重启后数据不丢失

- `-v D:\docker\n8n_files:/home/node/Files`

- 

    - 宿主机路径：`D:\docker\n8n_files` - Windows本地文件目录

    - 容器路径：`/home/node/Files` - 容器内的文件目录

- 

    - 作用：第二个数据卷挂载

    - 格式：宿主机路径:容器内路径

    - 用途：

    - 功能：这是你自定义的文件存储位置，用于保存生成的文字和图片

    - 优势：可以直接从Windows文件管理器访问这些文件

部署完之后显示如下：

![Image 1](https://mmbiz.qpic.cn/sz_mmbiz_png/icC5z290icQgRyxS9V8bmickTU63e4URf3tAg3YH9IjU5QIbM3BDGzUVml3KsTTHMOGNib7lWBt9H66AhPFEdHTQ5A/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=1)

在Windows上部署n8n之前一定要做好这部分设置，否则后面再想改的话就麻烦了。

下面进入主流程：

1、利用智谱的文生图API

（https://docs.bigmodel.cn/cn/api/introduction，你也可以用其他更好的的文生图API，这里仅举个例子，毕竟免费）

2、在n8n里调用http requests

偷懒的话可以直接导入官方文档的cURL

```Plain Text
curl --request POST \
  --url https://open.bigmodel.cn/api/paas/v4/images/generations \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '{
  "model": "cogView-4-250304",
  "prompt": "一只可爱的小猫咪，坐在阳光明媚的窗台上，背景是蓝天白云.",
  "size": "1024x1024"
}'
```

运行完输出的是个url，形如：

```Plain Text
[
  {
    "created": 1762240925,
    "data": [
      {
        "url": "https://maas-watermark-prod.cn-wlcb.ufileos.com/1762240933358_watermark.png?UCloudPublicKey=TOKEN_75a9ae85-4f15-4045-940f-e94c0f82ae90&Signature=rGMyjUT3Kzlaj46oVEAJisoAg8A%3D&Expires=1762327333"
      }
    ]
  }
]
```

你需要另一个http requests下载成Binary文件，然后再利用Read/Write Files from Disk写入本地硬盘。

3、Read/Write Files from Disk的配置

尤其需要注意这里红框处的写法，后面的文件名和扩展名根据你的文件自定义即可

![Image 2](https://mmbiz.qpic.cn/sz_mmbiz_png/icC5z290icQgRyxS9V8bmickTU63e4URf3tjicQWOhxpvmDiaARbVrz8WmvdqKaRtFwzJWCeE3Rvia8Aqu4t5IneNU2w/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=2)

我这里用了一个Form来录入信息：

![Image 3](https://mmbiz.qpic.cn/sz_mmbiz_png/icC5z290icQgRyxS9V8bmickTU63e4URf3ticN0NjZ095Y5jrISiacwBCl7Qlicg8tp9j2j6FGEpzS0MXEPiaHnWn4wpQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=3)

成功后会提示文件已经写入了本地硬盘：

![Image 4](https://mmbiz.qpic.cn/sz_mmbiz_png/icC5z290icQgRyxS9V8bmickTU63e4URf3twSj1otb6AajIpicNvZiar5HY21MicSnhoEjdYMicAJ85qIDlnZY6nzeP4Q/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=4)

图片可以保存，Markdown、txt等文件皆可，赶紧去试试吧。

![Image 5](https://mmbiz.qpic.cn/sz_mmbiz_png/icC5z290icQgRyxS9V8bmickTU63e4URf3tzHckupM6vOiahsDibrFZTJF4OYqOfE4g3HhlzZRTZEm7YoOR8h4eb1ug/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=5)




下期继续分享，欢迎关注

![https://res.wx.qq.com/t/wx_fed/we-emoji/res/v1.3.10/assets/newemoji/2_06.png#imgIndex=6](n8n文件保存方法：让AI生成的内容轻松落地本地硬盘+0334f3c1-ee65-4215-9680-6ed8de3dd07a/Image 6.png)

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

- **[n8n里“定时触发”如何做？你会几招？](https://mp.weixin.qq.com/s?__biz=MzI4OTc4MDY3Nw==&mid=2247485829&idx=1&sn=fdea2d2361ec5611b59a6162496b4ec8&scene=21#wechat_redirect)**

