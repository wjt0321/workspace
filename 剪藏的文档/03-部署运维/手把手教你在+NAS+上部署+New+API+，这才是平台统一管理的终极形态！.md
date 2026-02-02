---

title: 手把手教你在 NAS 上部署 New API ，这才是平台统一管理的终极形态！
date: 2026-01-26
tags: ["部署", "安装", "搭建", "运维"]
category: 部署运维
---


# 手把手教你在 NAS 上部署 New API ，这才是平台统一管理的终极形态！

如有修改或改动，关注文章底部留言！

教程对你有用，可以 “**点赞**” 和 “**打赏**”支持 ~



![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/5xFLia3A3km6dJsEY5icf6mOsVLbKtcBEPIw2s8h3OiaopVyYw7XDPqKpJH5P1gDqZicRATpOftnopSwz3FWPeoBvg/640?wx_fmt=png&from=appmsg#imgIndex=0)

New API：

一个新一代大模型网关与 AI 资产管理系统，基于 One API 进行二次开发。该项目旨在提供一个统一的接口来管理和使用各种 AI 模型服务，包括但不限于 OpenAI、Anthropic、Midjourney 等。

![Image 1](https://mmbiz.qpic.cn/sz_mmbiz_png/5xFLia3A3km6dJsEY5icf6mOsVLbKtcBEPotKauPcpCCNonJDTGkwXOQgtZ3wITz5doeAWgdtia0V3eEckj0qpedA/640?wx_fmt=png&from=appmsg#imgIndex=1)

主要特性：

- • 全新的 UI 界面，提升用户操作体验

- • 多语言支持，满足不同地区用户需求

- • 在线充值功能（集成易支付）

- • 支持用 key 查询使用额度（需配合 neko-api-key-tool）

- • 兼容原版 One API 的数据库，便于迁移

- • 模型按次数收费模式支持

- • 渠道加权随机功能

- • 数据看板（控制台），直观展示系统数据

- • 令牌分组、模型限制，更精细的权限管理

- • 更多授权登录方式（LinuxDO、Telegram、OIDC 等）

- • 支持 Rerank 模型（Cohere 和 Jina）

- • 支持 OpenAI Realtime API（包括 Azure 渠道）

- • 支持 Claude Messages 格式

- • 提供聊天界面入口（路由 /chat2link）

- • 模型推理力度设置，通过模型名称后缀调整（如 -high、-medium、-low 等）

- • 思考转内容功能

- • 针对用户的模型限流功能

- • 缓存计费支持，可设置缓存命中时的计费比例




### 安装

Docker Compose

```Plain Text
services:
  new-api:
    image: calciumion/new-api:latest
    container_name: new-api
    ports:
      - 3000:3000
    environment:
      - TZ=Asia/Shanghai
    volumes:
      - /vol1/1000/docker/new-api:/data
    restart: unless-stopped
```




### 使用

浏览器中输入 `http://NAS的IP:3000` 就能看到界面

![Image 2](https://mmbiz.qpic.cn/sz_mmbiz_png/5xFLia3A3km6dJsEY5icf6mOsVLbKtcBEPt7pGEwRz8jGuRzNNatCoTCjky0ibf9EvmWcJyKMuQs0ZicoY9Kpyy9pg/640?wx_fmt=png&from=appmsg#imgIndex=2)

为了更好截图，这里我切换为深色模式

![Image 3](https://mmbiz.qpic.cn/sz_mmbiz_png/5xFLia3A3km6dJsEY5icf6mOsVLbKtcBEPEHpnFJUQHPBiaHaoJYCLiaaAm6ezhQMBkTGUe91GtTwfrMxK8AxO842A/640?wx_fmt=png&from=appmsg#imgIndex=3)

如果使用 SQlite 的话，会有一个数据持久化的警告

![Image 4](https://mmbiz.qpic.cn/sz_mmbiz_png/5xFLia3A3km6dJsEY5icf6mOsVLbKtcBEPE338sepvlibNyXrdTu8cSBILIoric1vdAE0WHPMn3H76dVMibiarNIrlPg/640?wx_fmt=png&from=appmsg#imgIndex=4)

可以去映射的路径，确认是否有创建数据库

![Image 5](https://mmbiz.qpic.cn/sz_mmbiz_png/5xFLia3A3km6dJsEY5icf6mOsVLbKtcBEPhD8yevwV2dCYS6NGx7G07F8XvVNZKWtDFic56XVMRq7trYPL0L6A00A/640?wx_fmt=png&from=appmsg#imgIndex=5)

设置管理员用户和密码

![Image 6](https://mmbiz.qpic.cn/sz_mmbiz_png/5xFLia3A3km6dJsEY5icf6mOsVLbKtcBEPKaEXmvOUKrJYD3t0q1iaTxpy0ibicT61h0WlOKF4qpmsLdBJUkhflHibNQ/640?wx_fmt=png&from=appmsg#imgIndex=6)

模式的话根据自己实际情况选择，一个人的话选自用模式

![Image 7](https://mmbiz.qpic.cn/sz_mmbiz_png/5xFLia3A3km6dJsEY5icf6mOsVLbKtcBEPPOxTlS8YGI49pmC6542xD9lx3D4YBukibdKuEBtTfNfmKPcju51EhRQ/640?wx_fmt=png&from=appmsg#imgIndex=7)

没有其他问题，点击“初始化系统”

![Image 8](https://mmbiz.qpic.cn/sz_mmbiz_png/5xFLia3A3km6dJsEY5icf6mOsVLbKtcBEPku32gx7aVKIfWFo37M5fELibJxricrtTGhM3rT3ctjkZiaN43HUO9vB0Q/640?wx_fmt=png&from=appmsg#imgIndex=8)

初始化完成，可以看到支持挺多国内大模型提供商的

![Image 9](https://mmbiz.qpic.cn/sz_mmbiz_png/5xFLia3A3km6dJsEY5icf6mOsVLbKtcBEPLy1oTic2Dgok4JYeNf5uDbb2CYZbCss9gypHuicgsI8ra7f3sOFOAqaw/640?wx_fmt=png&from=appmsg#imgIndex=9)

点击“控制台”，输入账号和密码进行登录

![Image 10](https://mmbiz.qpic.cn/sz_mmbiz_png/5xFLia3A3km6dJsEY5icf6mOsVLbKtcBEP1mMTJ0eHcgEUIOOmORnz5FX6icy74A17vN3NBPaqn4YmHxTp94oZmhw/640?wx_fmt=png&from=appmsg#imgIndex=10)

成功进入面板，这个界面要比“One API”好看太多了

![Image 11](https://mmbiz.qpic.cn/sz_mmbiz_png/5xFLia3A3km6dJsEY5icf6mOsVLbKtcBEPWdtnOjJxjhNWb0uq29Egarlw6UHvj3PYXuFdoww8YskS41R7fZVPgw/640?wx_fmt=png&from=appmsg#imgIndex=11)

渠道管理，点击“添加渠道”

![Image 12](https://mmbiz.qpic.cn/sz_mmbiz_png/5xFLia3A3km6dJsEY5icf6mOsVLbKtcBEPNcCRa60bHDAQ5gTAohnfA92rbTWSUYcxdOZ0jVibxszHUXZtGBbbDow/640?wx_fmt=png&from=appmsg#imgIndex=12)

选择大模型提供商和填写密钥

![Image 13](https://mmbiz.qpic.cn/sz_mmbiz_png/5xFLia3A3km6dJsEY5icf6mOsVLbKtcBEPFGuJZh6b9GaI3l7TDicuG2Zhic87hdD8ia0JnhEdjYyFG6QkgPBY0Laicw/640?wx_fmt=png&from=appmsg#imgIndex=13)

TIP：

一般来说可以点击“获取模型列表”就会自动获取，如果获取不到可以在列表选择模型，也可以自定义填写模型名称进行添加。

添加模型（这里我是自定义添加进去的）

![Image 14](https://mmbiz.qpic.cn/sz_mmbiz_png/5xFLia3A3km6dJsEY5icf6mOsVLbKtcBEPYibQvAM9WXEcbmB0mCUF813DnludVXw5VBN8nrcRHBLZ7iaWVvg7Wibqg/640?wx_fmt=png&from=appmsg#imgIndex=14)

其他默认就行，点击“提交”

![Image 15](https://mmbiz.qpic.cn/sz_mmbiz_png/5xFLia3A3km6dJsEY5icf6mOsVLbKtcBEPIENC9pbZ8RXEMy1VbWH2HJTdov8w5gNDicoM5kq3icjCF5RJawtwludQ/640?wx_fmt=png&from=appmsg#imgIndex=15)

添加成功以后，点击“测试”

![Image 16](https://mmbiz.qpic.cn/sz_mmbiz_png/5xFLia3A3km6dJsEY5icf6mOsVLbKtcBEPRWgPNWI1j3ueekEPB1nmbIfqhZppYjfC9ibrxS0XENrZtZkMdfyTAibQ/640?wx_fmt=png&from=appmsg#imgIndex=16)

有响应就说明没问题，可以正常调用了

![Image 17](https://mmbiz.qpic.cn/sz_mmbiz_png/5xFLia3A3km6dJsEY5icf6mOsVLbKtcBEP1aawqfoviaiaOR9xGJookibkrGmyWf62PRBxhtx95KCiaA8l72g9HFOeyw/640?wx_fmt=png&from=appmsg#imgIndex=17)

TIP：

花了不少时间将有的账号都添加，有些平台添加比较麻烦，需要耐心一点点测试

![Image 18](https://mmbiz.qpic.cn/sz_mmbiz_png/5xFLia3A3km6dJsEY5icf6mOsVLbKtcBEPBI0yIicml1HRq5WpIDV2kltwVic4QQWZibTPe5Uqf5dIOZvsZs8yplBfA/640?wx_fmt=png&from=appmsg#imgIndex=18)

操练场，测试一下是否可以正常使用

![Image 19](https://mmbiz.qpic.cn/sz_mmbiz_png/5xFLia3A3km6dJsEY5icf6mOsVLbKtcBEPtJxY0MBNibJJAwO8ZPTo9s6VuSYAsyCQ0jsyt9Y8fVmBBhIxnZyUxoA/640?wx_fmt=png&from=appmsg#imgIndex=19)

数据看板，这里可以看到 API 使用统计

![Image 20](https://mmbiz.qpic.cn/sz_mmbiz_png/5xFLia3A3km6dJsEY5icf6mOsVLbKtcBEP99utg55fvl8swaGHQrf3RZGbnuGKPc6FS1fYJYVp6fKfx9w05ypUYA/640?wx_fmt=png&from=appmsg#imgIndex=20)

令牌管理，添加令牌

![Image 21](https://mmbiz.qpic.cn/sz_mmbiz_png/5xFLia3A3km6dJsEY5icf6mOsVLbKtcBEPbopia99fd4gfJxXwibTHzJ9ZmSJM4LwbHs5OV4tBlDTPULAiaBp3As8gw/640?wx_fmt=png&from=appmsg#imgIndex=21)

填写名称，点击“提交”

![Image 22](https://mmbiz.qpic.cn/sz_mmbiz_png/5xFLia3A3km6dJsEY5icf6mOsVLbKtcBEPwvIiaiaEyichpfCSlQYu0YTIFSbWUThSvF9kibP4RP1IWmoLuQsNELphVg/640?wx_fmt=png&from=appmsg#imgIndex=22)

这个就是创建的密钥（API Key）

![Image 23](https://mmbiz.qpic.cn/sz_mmbiz_png/5xFLia3A3km6dJsEY5icf6mOsVLbKtcBEPFBrJPlicOMllbW78Td56VHwpAPYloLvNvyZr2wOia43H5RfapRm4Jhmw/640?wx_fmt=png&from=appmsg#imgIndex=23)

创建完成以后，可以点击调用 New API 的接口

![Image 24](https://mmbiz.qpic.cn/sz_mmbiz_png/5xFLia3A3km6dJsEY5icf6mOsVLbKtcBEPialDX7DPDibYyy8HwErbj6SXGOib7LibxoARMF2RbkOY6ovfP9VH78gsqg/640?wx_fmt=png&from=appmsg#imgIndex=24)

TIP：

这种集成打开外部窗口聊天体验不是太好，而且测试下来在 LobeHub 调用接口有问题，不过下面还是按正常的步骤进行操作。

点击“头像”

![Image 25](https://mmbiz.qpic.cn/sz_mmbiz_png/5xFLia3A3km6dJsEY5icf6mOsVLbKtcBEPsFBCweKoaeF8kJu5lAzmZtVKj1QKM2kalzYhRrrfGEEuFWd09nl6ibw/640?wx_fmt=png&from=appmsg#imgIndex=25)

点击“应用设置”

![Image 26](https://mmbiz.qpic.cn/sz_mmbiz_png/5xFLia3A3km6dJsEY5icf6mOsVLbKtcBEPavQhpy7zw2Mu9ciadH6pT0A7pRpcaKeTYtepXcLK1BfrKS1C9mFv1eA/640?wx_fmt=png&from=appmsg#imgIndex=26)

打开 OpenAI 设置

![Image 27](https://mmbiz.qpic.cn/sz_mmbiz_png/5xFLia3A3km6dJsEY5icf6mOsVLbKtcBEPl4cPvNXO4VqWiaKeSYa6rQ76tsMRcBUJPdf1nl7jhTQfXoicgzmBNY7Q/640?wx_fmt=png&from=appmsg#imgIndex=27)

API Key，粘贴前面获取的密钥

![Image 28](https://mmbiz.qpic.cn/sz_mmbiz_png/5xFLia3A3km6dJsEY5icf6mOsVLbKtcBEP1AxofzVTa2GML2Haeh2JicPhnVbA6vVernyKp86VOZqicEAzYxVkP41w/640?wx_fmt=png&from=appmsg#imgIndex=28)

API 代理地址，访问 New API 的 v1 接口

![Image 29](https://mmbiz.qpic.cn/sz_mmbiz_png/5xFLia3A3km6dJsEY5icf6mOsVLbKtcBEPBvcGdjPIoS8xxwYtEfkxzDuPIy6zwNibh3BeXgm4z7e92jTicT1PyxJA/640?wx_fmt=png&from=appmsg#imgIndex=29)

TIP：

因为上面的 Lobe Chat 是打开外部在线网页，所以填局域网地址是不行的。如果是本地部署，才可以用局域网调用 API 接口。这里我用节点小白做内网穿透服务，这样就可以在外网访问 New API 的接口了

![Image 30](https://mmbiz.qpic.cn/sz_mmbiz_png/5xFLia3A3km6dJsEY5icf6mOsVLbKtcBEPCicw58eFzpeGtcFmXfG9vjDroYvM0NhuonqicD3aZx2QCRpVyYyrW2ZQ/640?wx_fmt=png&from=appmsg#imgIndex=30)

填写外网可以访问的地址

![Image 31](https://mmbiz.qpic.cn/sz_mmbiz_png/5xFLia3A3km6dJsEY5icf6mOsVLbKtcBEPeaf99Z2eHOOOkBia0C1EgtKRLSMTckK6xCviaYOsvwch0ldAPGoyqbnw/640?wx_fmt=png&from=appmsg#imgIndex=31)

点击“获取模型列表”，就可以看到 New API 里面的模型

![Image 32](https://mmbiz.qpic.cn/sz_mmbiz_png/5xFLia3A3km6dJsEY5icf6mOsVLbKtcBEPNiaAt0P54cVMtVREUjBQtGAAqQFusgkyn4fbwUQyH2wIL8sZFJseicHQ/640?wx_fmt=png&from=appmsg#imgIndex=32)

启用模型，选择模型进行连通性测试

![Image 33](https://mmbiz.qpic.cn/sz_mmbiz_png/5xFLia3A3km6dJsEY5icf6mOsVLbKtcBEPr9Sv6PYAianJUyUgNhKD4ZWqcdWwZiacZON5yNARwxjrXp6ib97M4SIPA/640?wx_fmt=png&from=appmsg#imgIndex=33)

理论上应该是没问题的，但是不清楚为什么不行（后来我用第三方平台测试也是有问题）

![Image 34](https://mmbiz.qpic.cn/sz_mmbiz_png/5xFLia3A3km6dJsEY5icf6mOsVLbKtcBEP1oleMJ4ysBbAAjkJRS4nAEqjicdsfCHjtehcMBjtaBtrxQ0ictZahniaw/640?wx_fmt=png&from=appmsg#imgIndex=34)

对话也是不正常的，不能正常调用

![Image 35](https://mmbiz.qpic.cn/sz_mmbiz_png/5xFLia3A3km6dJsEY5icf6mOsVLbKtcBEPO9YhOrE7yc6IgqR90y19LwFyvs6AGWvzY1jickcOIwIY24ajibsFgk7g/640?wx_fmt=png&from=appmsg#imgIndex=35)




为了搞清楚 New API 的接口是否有问题，本地部署了 Lobe Chat 进行测试，虽然也会报错不过属于正常现象（默认连通检测没有 gpt-4.1-nano 模型）

![Image 36](https://mmbiz.qpic.cn/sz_mmbiz_png/5xFLia3A3km6dJsEY5icf6mOsVLbKtcBEPMJ1exXLZkQt4Nv4hxgIWTPdhicGW1KS7icXlznJKaDKAMtKH8LgASyibw/640?wx_fmt=png&from=appmsg#imgIndex=36)

可以正常调用里面的模型，更换内网穿透的地址也是没有问题的

![Image 37](https://mmbiz.qpic.cn/sz_mmbiz_png/5xFLia3A3km6dJsEY5icf6mOsVLbKtcBEPX8c8gpposibs4un3MFib3aqStaEIQNl4YDQFKYJ0PkSv9Owq4xX4yWtw/640?wx_fmt=png&from=appmsg#imgIndex=37)

### 总结

New API 作为 One API 的二次开发，可以说青出于蓝而胜于蓝。凭借全新 UI 设计、多语言支持、丰富的模型兼容及精细化管理功能，为 AI 资源统一管理提供了高效解决方案。对于有需要统一管理 API 接口的用户和之前一直用 One API 的老用户，我个人是非常推荐用这个平替。

综合推荐：⭐⭐⭐⭐⭐（功能全面，体验优秀）

使用体验：⭐⭐⭐⭐（界面美观，操作便捷）

部署难易：⭐⭐（简单）︎

 

︎

 ︎

 

 ︎

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 




 ︎

 

 

 ︎

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 




 

 

 

 

 

 





 

 ︎

 

 

 

 




 

 

