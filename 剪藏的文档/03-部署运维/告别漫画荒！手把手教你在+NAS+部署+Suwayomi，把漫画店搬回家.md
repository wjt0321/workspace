---

title: 告别漫画荒！手把手教你在 NAS 部署 Suwayomi，把漫画店搬回家
date: 2025-10-18
tags: ["部署", "安装", "搭建", "运维"]
category: 部署运维
---


# 告别漫画荒！手把手教你在 NAS 部署 Suwayomi，把漫画店搬回家

David的日常 [NASBox](javascript:void(0);)*2025年10月18日 10:25* *广东*

如有修改或改动，关注文章底部留言！

教程对你有用，可以 “**点赞**” 和 “**打赏**”支持 ~







![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/5xFLia3A3km5vVuXTuN3dpwdnfDVtLx8v34J8icNFfqf1fyc6yI1gVG4acGVklTXfNZoema6C2yxBYaCy2RbcjqQ/640?wx_fmt=png&from=appmsg#imgIndex=0)

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

Suwayomi：

一个免费开源的漫画阅读器服务器，能够运行为 Mihon（Tachiyomi）构建的扩展。它并非 Mihon（Tachiyomi）的分支，而是一个独立的兼容软件。

![Image 1](https://mmbiz.qpic.cn/sz_mmbiz_png/5xFLia3A3km5vVuXTuN3dpwdnfDVtLx8vuDcfia5ecgkian15GwVvA2LDlAicLXvNn9GTW52AiaWZ6s79SSkmHmFaUQ/640?wx_fmt=png&from=appmsg#imgIndex=1)

### 安装

Docker Compose

```Plain Text
services:
  suwayomi:
    image: ghcr.io/suwayomi/suwayomi-server:stable
    container_name: suwayomi
    ports:
      - 4567:4567
    environment:
      - TZ=Asia/Shanghai
    volumes:
      - ./data:/home/suwayomi/.local/share/Tachidesk
    restart: unless-stopped
```

TIP：FlareSolverr 主要用于帮助绕过网站的反爬虫机制（如 Cloudflare 等服务的验证码或浏览器验证），确保 Suwayomi-Server 能够正常访问和抓取那些启用了反爬虫措施的漫画源内容。

Docker Compose（带 FlareSolverr）

```Plain Text
services:
suwayomi:
    image: ghcr.io/suwayomi/suwayomi-server:stable
    container_name: suwayomi
    ports:
      - 4567:4567
    environment:
      - TZ=Asia/Shanghai
      - FLARESOLVERR_ENABLED=true
      - FLARESOLVERR_URL=http://flaresolverr:8191
    volumes:
      - ./data:/home/suwayomi/.local/share/Tachidesk
    restart: unless-stopped

flaresolverr:
    image: ghcr.io/thephaseless/byparr:latest
    container_name: flaresolverr
    environment:
      - TZ=Asia/Shanghai
    restart: unless-stopped
```

参数说明（更多参数建议去看文档）

:::
4567（端口）：访问端口

TZ（环境变量）：设置时区

FLARESOLVERR_ENABLED（环境变量，可选）：设置为 true 时启用 FlareSolverr

FLARESOLVERR_URL（环境变量，可选）：FlareSolverr 的 URL

SOCKS_PROXY_ENABLED（环境变量，可选）：设置为 true 时启用代理

SOCKS_PROXY_HOST（环境变量，可选）：指定 SOCKS 代理的主机地址

SOCKS_PROXY_PORT（环境变量，可选）：代理主机的端口号

:::

TIP：为了避免奇怪问题，后面的步骤和操作，建议在良好网络下运行

初次启动，Suwayomi 会下载 WebUI 界面文件

![Image 2](https://mmbiz.qpic.cn/sz_mmbiz_png/5xFLia3A3km5vVuXTuN3dpwdnfDVtLx8vpqlYFicYaADOZiak8MNWUb7iaR0V7BcEqpuAUDNWQlaOO4S2FLBdjlUPw/640?wx_fmt=png&from=appmsg#imgIndex=2)

### 使用

浏览器中输入 `http://NAS的IP:4567` 就能看到界面

![Image 3](https://mmbiz.qpic.cn/sz_mmbiz_png/5xFLia3A3km5vVuXTuN3dpwdnfDVtLx8vbUTRvib1jCpXHNibHAhBFWn4Sib7sM0qEH1zNeQcSPDHYHICG2aFn9pOw/640?wx_fmt=png&from=appmsg#imgIndex=3)

#### 设置语言

点击 Settings -> Appearance

![Image 4](https://mmbiz.qpic.cn/sz_mmbiz_png/5xFLia3A3km5vVuXTuN3dpwdnfDVtLx8vibWMsOiaJQdJMC1fvtY8TnYAfCOzUr0esNJVaXBxJkpsSvwYZMfuicRvg/640?wx_fmt=png&from=appmsg#imgIndex=4)

设置一下语音为中文

![Image 5](https://mmbiz.qpic.cn/sz_mmbiz_png/5xFLia3A3km5vVuXTuN3dpwdnfDVtLx8vicMwq0KH1j8hNNNAlO8tP5oNvNV8qJ5y8nUCbNBADqhb50JYxGNXeEQ/640?wx_fmt=png&from=appmsg#imgIndex=5)

#### 添加扩展库

默认是没有扩展库，需要手动添加

![Image 6](https://mmbiz.qpic.cn/sz_mmbiz_png/5xFLia3A3km5vVuXTuN3dpwdnfDVtLx8vHnRPzpsdvudUlbibWnaHpV4SqUqcLCmUrNxlLmEKxxEQd2LYChhWrtA/640?wx_fmt=png&from=appmsg#imgIndex=6)

点击“扩展库”

![Image 7](https://mmbiz.qpic.cn/sz_mmbiz_png/5xFLia3A3km5vVuXTuN3dpwdnfDVtLx8vk3nYnRiatAMgD3rUfxmRL5LGTcNkwiammWft7drjFWLASUqPrhibWNkyA/640?wx_fmt=png&from=appmsg#imgIndex=7)

粘贴下面链接，全都添加到里面

```Plain Text
综合：
https://raw.githubusercontent.com/keiyoushi/extensions/repo/index.min.json
https://raw.githubusercontent.com/ThePBone/tachiyomi-extensions-revived/repo/index.min.json

拷贝漫画：
https://raw.githubusercontent.com/LittleSurvival/copymanga-copy20/main/index.min.json
```

![Image 8](https://mmbiz.qpic.cn/sz_mmbiz_png/5xFLia3A3km5vVuXTuN3dpwdnfDVtLx8vCYomm0uXlKiaicoXRNO3YYhNQUMreGvPtyX12m7VCAc1wR7wj24VeAHg/640?wx_fmt=png&from=appmsg#imgIndex=8)

#### 在线漫画

可以看到已经显示有插件了（别问为什么后面写着 18，懂得都懂）

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/5xFLia3A3km5vVuXTuN3dpwdnfDVtLx8vBsictibCYeCe4Q7LzdskCQ1xUVMHXDXVnEg3TmVHuaSqS3Lc7iclNd8Yw/640?wx_fmt=png&from=appmsg#imgIndex=9)

右上角进行筛选，只选中文就行

![Image 9](https://mmbiz.qpic.cn/sz_mmbiz_png/5xFLia3A3km5vVuXTuN3dpwdnfDVtLx8vFhUKsaM8NOoicVQ4pab5HCiacuKEfru671oEfpkYKmr80uAib8CWXTcjw/640?wx_fmt=png&from=appmsg#imgIndex=10)

插件还是挺多了，可以自行点击安装

![Image 10](https://mmbiz.qpic.cn/sz_mmbiz_png/5xFLia3A3km5vVuXTuN3dpwdnfDVtLx8vKtjbUxDDdnAFAgcMnhqSTKYDyQn8T69WG15jQFhX3p40juFo2Fe0Dg/640?wx_fmt=png&from=appmsg#imgIndex=11)

测试过，可以观看漫画的有下面几个

![Image 11](https://mmbiz.qpic.cn/sz_mmbiz_png/5xFLia3A3km5vVuXTuN3dpwdnfDVtLx8vib6lhotSj2xl9xML61FVxww6M9Ultx0HzWpQYpZHic5fT6s40e8rk4sQ/640?wx_fmt=png&from=appmsg#imgIndex=12)

切换到图源，就能看到安装的插件了

![Image 12](https://mmbiz.qpic.cn/sz_mmbiz_png/5xFLia3A3km5vVuXTuN3dpwdnfDVtLx8vSgXPhdw8hru5ZQicmuocCQSdica1gq3HvW5XQOXIGgrkRS6SwLDjdvFg/640?wx_fmt=png&from=appmsg#imgIndex=13)

点击进入看看，推荐 CopyManga（拷贝漫画）速度挺快的

![Image 13](https://mmbiz.qpic.cn/sz_mmbiz_png/5xFLia3A3km5vVuXTuN3dpwdnfDVtLx8vaNmaiar8rFUOXPMmehMGBefiam6cJgpgaXHjELRMEO4aUiar8nFbZhl4A/640?wx_fmt=png&from=appmsg#imgIndex=14)

界面排版挺不错的

![Image 14](https://mmbiz.qpic.cn/sz_mmbiz_png/5xFLia3A3km5vVuXTuN3dpwdnfDVtLx8vQacZBz1vPyTCGLiazU16IQ1gTTFBtszVPfDzxmiaAEJdicQlvaQwodPUQ/640?wx_fmt=png&from=appmsg#imgIndex=15)

可以点击添加到书架，下次可以快速找到

![Image 15](https://mmbiz.qpic.cn/sz_mmbiz_png/5xFLia3A3km5vVuXTuN3dpwdnfDVtLx8vCY7TCBxpI8nd8lOAyX3n2Ua0vlcZn1qbHCvGZnSicLrYD2lqBjjI8Bg/640?wx_fmt=png&from=appmsg#imgIndex=16)

打开漫画，这画质没得说了

![Image 16](https://mmbiz.qpic.cn/sz_mmbiz_png/5xFLia3A3km5vVuXTuN3dpwdnfDVtLx8vGawMOddgQaYKShxZKV3MUKj5qc8biagvHYqTnGcF7O0Z86DhLNXbiczA/640?wx_fmt=png&from=appmsg#imgIndex=17)

点击中间可以唤出设置界面

![Image 17](https://mmbiz.qpic.cn/sz_mmbiz_png/5xFLia3A3km5vVuXTuN3dpwdnfDVtLx8vflPAzy5L8AM9klkt81AQQcC9yGlmmf7Vo66qgoCCrRicmgFfwBY8tCQ/640?wx_fmt=png&from=appmsg#imgIndex=18)

设置项非常多，自由设置都没问题

![Image 18](https://mmbiz.qpic.cn/sz_mmbiz_png/5xFLia3A3km5vVuXTuN3dpwdnfDVtLx8vtL6M5bdYKIjibo5Yu8aJlcnG7NzTFCz10QP1xBPgMLWDEUN3eq8qhLg/640?wx_fmt=png&from=appmsg#imgIndex=19)

移动网页的效果也很不错

![Image 19](https://mmbiz.qpic.cn/sz_mmbiz_png/5xFLia3A3km5vVuXTuN3dpwdnfDVtLx8vibt4c7Hp0xLiaD59x7rxgd7lj5ubOp8RZ17Ecd9HvJ4p19icJCia78RiaBg/640?wx_fmt=png&from=appmsg#imgIndex=20)

除了在线阅读，也可以离线下载

![Image 20](https://mmbiz.qpic.cn/sz_mmbiz_png/5xFLia3A3km5vVuXTuN3dpwdnfDVtLx8vj5TxQf2PFgEcUibxc8l7DCsOobQvKkSX1Q7Bia3FI0GVGhahx11FasJg/640?wx_fmt=png&from=appmsg#imgIndex=21)

在 downloads 文件夹就能看到下载的漫画

![Image 21](https://mmbiz.qpic.cn/sz_mmbiz_png/5xFLia3A3km5vVuXTuN3dpwdnfDVtLx8vtfnGlbxZP1ILdf26c0BKFYcLBCQ2lEHl7iaic6o8MTbL4yfSE7ERicNibg/640?wx_fmt=png&from=appmsg#imgIndex=22)

#### 本地漫画

支持的章节格式是包含图片的文件夹（如.jpg、.png等）、ZIP、CBZ、RAR、CBR 和 EPUB。

将漫画放到 local 文件夹下

![Image 22](https://mmbiz.qpic.cn/sz_mmbiz_png/5xFLia3A3km5vVuXTuN3dpwdnfDVtLx8vIib0AFzbx0icjkxZUn8CGlVyfjtZsej7a64YrPx0lWTv9swMKBsRJoicQ/640?wx_fmt=png&from=appmsg#imgIndex=23)

找到本地图源

![Image 23](https://mmbiz.qpic.cn/sz_mmbiz_png/5xFLia3A3km5vVuXTuN3dpwdnfDVtLx8vmwzicniaEMrQ2KFkFjEIb62aPw66kvqiams8KGokNibRHCArZWukCMAw7g/640?wx_fmt=png&from=appmsg#imgIndex=24)

可以看到本地的漫画了

![Image 24](https://mmbiz.qpic.cn/sz_mmbiz_png/5xFLia3A3km5vVuXTuN3dpwdnfDVtLx8v9c1Sib9O9REs7KQcm64gPGfic5vAmYZdLKGSViaYfUD5icXm2E32UNOyvg/640?wx_fmt=png&from=appmsg#imgIndex=25)

界面和前面都是一样的

![Image 25](https://mmbiz.qpic.cn/sz_mmbiz_png/5xFLia3A3km5vVuXTuN3dpwdnfDVtLx8vUKmJAIl8lIZd3Ilt2lbOoaQTS7VJnw5rfoiaN9BedKpuHxELPnWFzVQ/640?wx_fmt=png&from=appmsg#imgIndex=26)

效果都非常出色

![Image 26](https://mmbiz.qpic.cn/sz_mmbiz_png/5xFLia3A3km5vVuXTuN3dpwdnfDVtLx8vfgqTKNibpD1Eiciap7VgrF4GoUKic0pGxox5KX2MqPp46jVB5FGN6yQmSg/640?wx_fmt=png&from=appmsg#imgIndex=27)

### 总结

整体体验下来还是挺不错的，在线漫画资源很多，界面美观简洁，可以自由设置项齐全。不过还是有一些小问题需要注意的，比如一开始可能需要良好的网络下载应用数据和安装插件，其他就没什么的了。当然如果是想作为本地阅读器来看漫画也是完全没有问题的，有需要的小伙伴可以部署体验试试。

综合推荐：⭐⭐⭐⭐（既可在线，也可本地）

使用体验：⭐⭐⭐⭐（总的体验不错，不过需要良好网络）

部署难易：⭐⭐⭐（中规中矩）︎

 

 

 

 ︎

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 




 

︎

 ︎

 

 ︎

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 




 ︎

 

 

 ︎

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 




 

 

 

 

 

 





 ︎

 

 

 

 




 

 

