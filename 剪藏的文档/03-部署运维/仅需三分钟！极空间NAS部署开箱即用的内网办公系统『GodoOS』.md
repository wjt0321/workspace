---

title: 仅需三分钟！极空间NAS部署开箱即用的内网办公系统『GodoOS』
date: 2025-09-28
tags: ["部署", "安装", "搭建", "运维"]
category: 部署运维
---


# 仅需三分钟！极空间NAS部署开箱即用的内网办公系统『GodoOS』

Original Stark-C [Stark324](javascript:void(0);)*2025年09月28日 10:02* *湖北*

# 仅需三分钟！极空间NAS部署开箱即用的内网办公系统『GodoOS』

哈喽小伙伴们好，我是Stark-C~

不知道有多少牛马人在工作的时候遇到这样的困境或者有其它的想法：

- 因为自己的职业问题（比如说医院或者保险行业），办公电脑受限，不能安装第三方的办公程序；

- 电脑桌面杂乱的文档文件和一堆办公软件混在一起，操作起来很不方便不说，每次看着还糟心；

- 收到一个紧急文件需要修改，却发现没网络，或者常用的在线工具突然打不开，工作瞬间陷入停滞；

- 希望有一个自己私有办公系统，可以随时随地打开，保证工作24小时在线状态，同时工作进度永不丢失；

如果说以上问题正好有你感同身受的，那么今天介绍的这款名为『GodoOS』的“一站式私有内网办公系统”，或许就能为你解决这些麻烦。

## 关于GodoOS

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/hLacRGGu1wrcUOvUDmiaLPnpTFXEmXPWpamicL0rpaxtZK0ZVicia2tfh2kURIJzrEAmG9eXUCPCYdWPJuLaxehTaw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=0)

🔺GodoOS是一个一款专为内网环境设计的高效、轻量级办公操作系统。它集成了日常办公所需的多种工具，包括word/excel/ppt/pdf/内网聊天/白板/思维导图等，并支持原生文件存储。

该系统界面精仿windows风格，操作简便，同时保持低资源消耗和高性能运，同时特别注重数据本地存储和内部协作，旨在为用户提供一个安全、私有、高效的办公环境。

GodoOS官网：https://godoos.com/home/os/

Github主页：https://github.com/phpk/godoos

> **💝GodoOS的亮点特性（引自官网）：**

    - 无远程请求，无需联网使用，全开源

    - 极易安装，无论是web端还是桌面版

    - 零配置，无需注册，下载即用

    - 零污染，无插件依赖

    - 精小，打包后仅70M，却包含了所有的办公套件

    - 可无限扩展，支持自定义应用

    - golang开发后端，低资源消耗和高性能

    - 支持多平台，Windows、Linux、MacOS

    - 完善的应用商店体系，简单学习一下应用商店配置即可开发出复杂的应用

![img](https://mmbiz.qpic.cn/sz_mmbiz_png/hLacRGGu1wrcUOvUDmiaLPnpTFXEmXPWpzrf9P9rnoho6eibhxHUVbwpAzAZGVrf4ZwfzNm0547PctMhMOoVeJRg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=1)

img

🔺需要说明的是，该系统其实是支持Windows、MacOS 、 Linux直接安装，但是我们今天的重点是将它以Docker容器的方式部署在我们的极空间NAS中，这样我们在该系统操作的文件都可以直接保存在我们NAS本地硬盘，同时做好反向代理之后，我们还可以让该系统24小时在线，随时随地都能打开，不受限制。

## GodoOS部署

![Image 1](https://mmbiz.qpic.cn/sz_mmbiz_png/hLacRGGu1wrcUOvUDmiaLPnpTFXEmXPWpXt16NZLmHjZfCvmK6TqOk1gqIicTEZO1FicnFKzeQGgVaBuoSVRhDxMg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=2)

🔺先在文件管理器的Docker目录新建一个godoos的文件夹保存相关数据的持久化存储。

![Image 2](https://mmbiz.qpic.cn/sz_mmbiz_png/hLacRGGu1wrcUOvUDmiaLPnpTFXEmXPWpcO8cO7G9HRRBXnCNdmt422uhIGmarkyrrvevLJII8cOc30mM6wAnuQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=3)

🔺接着打开极空间NAS的“Docker”应用，点击【Compose】 > 【新增项目】。

![Image 3](https://mmbiz.qpic.cn/sz_mmbiz_png/hLacRGGu1wrcUOvUDmiaLPnpTFXEmXPWpLnfMKTk4CBXFskTRQfCibTm2T65VNejVxtDv0X1KKS5WJ7icYxToGzog/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=4)

🔺在新增项目页面自定义项目名称，输入以下 Docker Compose 配置信息后点“创建”按钮：

```Plain Text
services:
 godoos:
  image: godoos/godoos:latest
  container_name: godoos
  volumes:
   - ./Docker/godoos:/root/.godoos/os    # 映射godoos文件夹实际路径
  ports:
   - "56780:56780"   # 项目WebUI打开端口，冒号前面请勿和本地冲突
  restart: unless-stopped
```

以上代码需要根据注释自行修改，没有注释的默认即可，镜像的拉取需要自行解决网络问题，粘贴到自己的NAS这边之前建议使用AI工具优化一下，以防止格式问题造成的部署失败。

顺便说一下，volumes映射的路径需要在当前界面使用“查询路径”查找到真实路径直接复制粘贴就可以了，个人觉得极空间这里对于新手小白已经是相当友好的操作了。

![Image 4](https://mmbiz.qpic.cn/sz_mmbiz_png/hLacRGGu1wrcUOvUDmiaLPnpTFXEmXPWpOIFL31m6A4uOSSUPblSF6nVL8ibsG9kQW1ibwm802L0WiaQwjVUv2cmmg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=5)

🔺如果没啥问题就能看到容器显示“运行中”，现在就可以直接打开该项目了。

## GodoOS体验

![Image 5](https://mmbiz.qpic.cn/sz_mmbiz_png/hLacRGGu1wrcUOvUDmiaLPnpTFXEmXPWpPbTGXqib3ZIIr8RmclfMF1GqicQfRGaiaprKdxU7JJtIMfib9CozYWUO0A/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=6)

🔺项目打开之后看到的界面几乎和Windows 11完全一样，只不过桌面目前还是空白。

![Image 6](https://mmbiz.qpic.cn/sz_mmbiz_png/hLacRGGu1wrcUOvUDmiaLPnpTFXEmXPWpk7jCNr5vmjYXEkbVnI3xNl3b865dCic2LeIDXJwicXQicpsxgW2DI7xVw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=7)

🔺这个时候我们需要点开左下角的“开始”按钮，选择“设置”。

![Image 7](https://mmbiz.qpic.cn/sz_mmbiz_png/hLacRGGu1wrcUOvUDmiaLPnpTFXEmXPWp3IOPsicRgHMtoXIEzEA8MJf8lVntokqL3bwbf4eggsaz5r42ibbrLbDg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=8)

🔺打开“系统”。

![Image 8](https://mmbiz.qpic.cn/sz_mmbiz_png/hLacRGGu1wrcUOvUDmiaLPnpTFXEmXPWpYw1XLrpohCNqh3TmWwr8VFHW7cWibsyg3yavicF65FOscQfAdicbZSGOg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=9)

🔺点击“个人存储”，存储方式选择“远程存储”，服务器地址输入该项目的内网地址（也就是IP:端口号）即可。

![Image 9](https://mmbiz.qpic.cn/sz_mmbiz_png/hLacRGGu1wrcUOvUDmiaLPnpTFXEmXPWpnR81UgVnyeLajiaZJGr7MwLntV56iazHD6cvQ5EQ6bVjvCG5A9ibH14XA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=10)

🔺如果需要外网使用，在我们做好反向代理后，这里也是一样选择“远程存储”，之后输入我们的整个反向代理链接即可（记得不要后面的“/”）。

![Image 10](https://mmbiz.qpic.cn/sz_mmbiz_png/hLacRGGu1wrcUOvUDmiaLPnpTFXEmXPWpApm9WTpCB0tRHbcSldb6OQBKeaaJMCMB295YwboCqibiboUQ2I93twhA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=11)

🔺之后所有的图标就显示出来了。

![Image 11](https://mmbiz.qpic.cn/sz_mmbiz_png/hLacRGGu1wrcUOvUDmiaLPnpTFXEmXPWpbhlWG24AFehRYLUzhuQv41KianQIoEv0t1iaadU5M9CjsgJA24l4Cx1g/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=12)

🔺操作起来没什么好说的，完全和我们操作Windows电脑一样。

![Image 12](https://mmbiz.qpic.cn/sz_mmbiz_png/hLacRGGu1wrcUOvUDmiaLPnpTFXEmXPWp1KlByia1viaPbicQzicSpPBxmNW0g46owvme4iaecPz50jRdeK5pzfAvvZw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=13)

🔺办公三件套（word，excel，ppt）都可以直接打开并使用。

![Image 13](https://mmbiz.qpic.cn/sz_mmbiz_png/hLacRGGu1wrcUOvUDmiaLPnpTFXEmXPWp4HUSpVQicpvicV1XkcRzKOaC3hkicSdkpn3S2c3tC0C1GibKNLRtRUTdIQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=14)

🔺但是支持的并不算完美，有些功能显示“服务器正在维护”（其实就是用不了），好在我们常用的基本功能都是正常使用的。

![Image 14](https://mmbiz.qpic.cn/sz_mmbiz_png/hLacRGGu1wrcUOvUDmiaLPnpTFXEmXPWpnhZ7fyVJ9CUdZSk5r8QS3xsF3FuiaAB1EYuIibR2uVgfQJlXhzYvcic0g/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=15)

🔺图片编辑竟然可以直接选择我们本地电脑上任意图片导入过来，非常神奇！

![Image 15](https://mmbiz.qpic.cn/sz_mmbiz_png/hLacRGGu1wrcUOvUDmiaLPnpTFXEmXPWpDtztib2nsictWPDtGW5csU3ct0A5q0PRJjzy6DOAOltLFgiaVvoddcADA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=16)

🔺竟然还支持markdown，我甚至可以直接将本地电脑正在编辑的markdown文件复制粘贴过来，连图片都没有落下。看来我又找到了一个上班摸鱼的好路子了~

![Image 16](https://mmbiz.qpic.cn/sz_mmbiz_png/hLacRGGu1wrcUOvUDmiaLPnpTFXEmXPWpN97BltLCdNC6pF6B6RQqLw3t34fP0oicsT596bXIq2qsnLEhmPrjRfw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=17)

🔺保存之后文件直接可以在搭建的这个系统中的“此电脑”中查看。

![Image 17](https://mmbiz.qpic.cn/sz_mmbiz_png/hLacRGGu1wrcUOvUDmiaLPnpTFXEmXPWpNSF7F9HGib3z7CkvOS92vlnRwnSvHg9WT4lNv71toEuNkxic5hmCs6ibw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=18)

🔺另外保存的文件也存在于NAS中的本地硬盘中。

![Image 18](https://mmbiz.qpic.cn/sz_mmbiz_png/hLacRGGu1wrcUOvUDmiaLPnpTFXEmXPWpXwib1RorhXSfkqnX8OibaOibdM2ibicEJ2Vu650E1yx6UsupG6Pey7Oy75A/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=19)

🔺还内置了浏览器，不过目前仅支持wap模式，也就是移动端模式（简单理解就是我们手机浏览器模式）。

![Image 19](https://mmbiz.qpic.cn/sz_mmbiz_png/hLacRGGu1wrcUOvUDmiaLPnpTFXEmXPWpva2Rlg1RibahqGIjj9WwEFGjiawBssh3QYnl0Fiap7SrpGzICXZdjRWXg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=20)

🔺但是丝毫不影响我们刷视频（嘿嘿，是不是又解锁了一个摸鱼的路子~）。

![Image 20](https://mmbiz.qpic.cn/sz_mmbiz_png/hLacRGGu1wrcUOvUDmiaLPnpTFXEmXPWpAK5ib8buxbnntl6Vzz7uvzN2CTuf5pnwdBIbVWuvsMDhCpbVUiaM6fBA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=21)

🔺还有一个应用商店，打开后是空白。

![img 1](https://mmbiz.qpic.cn/sz_mmbiz_png/hLacRGGu1wrcUOvUDmiaLPnpTFXEmXPWpvUmN0SNovmWmtGd8WzJpymkWmOIwgCb0icNDRnoZZHgM2h5gNhj2EdQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=22)

img

🔺作者的回复是“还在开发中，请耐心等待”（事实上已经等待差不多一年了吧~)

其它更多功能就不在一一体验了，有兴趣的小伙伴部署之后可以自己满满摸索和体验。

## 最后

这个项目出来很久了，项目的开发者也一直在更新，遗憾的是貌似Docker版并没有跟上它桌面端的进度，非常不错的一个好项目，希望作者也能照顾下我们广大的NAS用户，将项目的Docker版也一直维护起来，感谢~

极空间NAS作为国产家用与轻办公市场的新兴力量，凭借简单易用、高性价比的特性，以及功能丰富、娱乐性强的优点，迅速成为众多NAS需求用户的不二之选。其产品线更是覆盖广泛，从百元级的入门款，到千元级的旗舰款应有尽有，能够满足不同用户群体的多样化需求，有兴趣的小伙伴可以关注下！

好了，以上就是今天给大家分享的内容，我是爱分享的Stark-C，如果今天的内容对你有帮助请记得收藏，顺便点点关注，咱们下期再见！谢谢大家~

