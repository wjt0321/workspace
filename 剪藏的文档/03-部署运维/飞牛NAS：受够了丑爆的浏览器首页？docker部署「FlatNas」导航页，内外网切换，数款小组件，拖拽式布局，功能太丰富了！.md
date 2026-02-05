---

title: 飞牛NAS：受够了丑爆的浏览器首页？docker部署「FlatNas」导航页，内外网切换，数款小组件，拖拽式布局，功能太丰富了！
date: 2025-12-06
tags: ["docker", "Docker", "nas", "NAS", "部署", "安装", "搭建", "运维"]
category: 部署运维
---


# 飞牛NAS：受够了丑爆的浏览器首页？docker部署「FlatNas」导航页，内外网切换，数款小组件，拖拽式布局，功能太丰富了！

Original 不正经科技 [不正经科技](javascript:void(0);)*2025年12月6日 15:09* *河北*



在小说阅读器中沉浸阅读




点击上方蓝字关注我们




我们是 「不正经科技」—— 一个立志于把硬核技术，变成你手里超级玩具的搞事组织。

![Image](https://mmbiz.qpic.cn/mmbiz_gif/vyxFHNhwB6McPNffic9ttr0kic0o5s5XFSFzoQRBTLPxFprhYCcVw9kNLzp8S47kuxnmWxCdFMfAa6QjbkKsZb1w/640?wx_fmt=gif&from=appmsg#imgIndex=0)

【今天可能讲的有点细，文字有点多，请耐心看完】

你的浏览器首页，是不是还长这样？

- **原始人版：
一片空白，每次都要手动输入网址。**

- **暴发户型：
收藏夹塞了200个网站，找起来像大海捞针。**

- **全家桶版：
某数字导航，满屏牛皮癣广告，开机先看30秒游戏弹窗。**

**今天，「不正经科技」就带你玩转一个真正属于极客的导航页—「FlatNas」。一个只属于你的并随心所欲的仪表盘！**

![Image](https://mmbiz.qpic.cn/mmbiz_png/vyxFHNhwB6OXVPUGZCQeDsLCibTU5MIZcYWmkTSSuOicNZicTwe3geW9keYQpmP9rO5Y92DEmIfIFyBbQfoPiazaoA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=1)




说到「FlatNas」的诞生，背后还有一段有趣的“缘分”。




        这款精致的工具，最初源于一次偶然的灵感闪现，触动了社区大佬「青团」的创作神经。作为飞牛生态的“老熟人”，青团此前已凭借多次宝贵的贡献，为社区添砖加瓦。「FlatNas」，正是他将其对效率与美学的理解，再次付诸实践的作品。




以下往期文章素材都源于「青团」大佬提供。




[飞牛中医馆「青团」坐诊，聊一聊近300真实病例总结----存储空间那点事。](https://mp.weixin.qq.com/s?__biz=MzYzNTAxODIzOQ==&mid=2247484855&idx=1&sn=28936f8cd34fac4985869bfa6001d87e&scene=21#wechat_redirect)

[2025-11-27](https://mp.weixin.qq.com/s?__biz=MzYzNTAxODIzOQ==&mid=2247484855&idx=1&sn=28936f8cd34fac4985869bfa6001d87e&scene=21#wechat_redirect)

![Image](https://mmbiz.qpic.cn/mmbiz_jpg/vyxFHNhwB6OXVPUGZCQeDsLCibTU5MIZc2GP94W2OGq4trbqR8PicbrpX3xfPaFfR8acGcbBia8JVvICaYicCTwG5A/640?wx_fmt=jpeg&watermark=1#imgIndex=2)

[飞牛NAS，更新报错/FN ID异常/Docker抽风/GPU解码不明？一行代码下去，立马药到病除！](https://mp.weixin.qq.com/s?__biz=MzYzNTAxODIzOQ==&mid=2247484611&idx=1&sn=8d7dab1a04032d1ecebeb3bda60e8cb0&scene=21#wechat_redirect)

[2025-11-12](https://mp.weixin.qq.com/s?__biz=MzYzNTAxODIzOQ==&mid=2247484611&idx=1&sn=8d7dab1a04032d1ecebeb3bda60e8cb0&scene=21#wechat_redirect)

![Image 1](https://mmbiz.qpic.cn/mmbiz_jpg/vyxFHNhwB6MdicTUNrmfkvsNOLGS9w55Du94os8H3oKFNj1oGvWZRUugBYUVHCzicerB0GHfic11KnLyiauuxlLjxQ/640?wx_fmt=jpeg&watermark=1#imgIndex=3)




---

#### 

01

 FlatNas是啥？

 

        简单说，**FlatNas** 是一个基于 Vue 3 + Express 打造的、**高度可定制的个人导航页与仪表盘系统**。

        它把你所有常用的网络服务、本地应用、待办事项、实时信息，用一个个可自由组合的“卡片”聚合在一个页面上。你访问这个页面，就等于进入了你的聚合控制台。

---

#### **核心亮点：**

####  ****

市面上导航页不少，但FlatNas在“个性化”和“实用性”上做到了令人发指的平衡。




**自由拖拽布局：**打开FlatNas，映入眼帘的是一个干净的**网格化桌面**。所有组件——无论是书签、时钟、还是RSS阅读器——都化身成一张张“卡片”。




- **编辑模式：点击右上角的编辑按钮。添加、删除、排序，所见即所得，改完一点“完成”，布局自动保存。**




- 拖拽：用鼠标按住卡片标题栏，想放哪儿放哪儿。




![Image 1](https://mmbiz.qpic.cn/mmbiz_gif/vyxFHNhwB6OXVPUGZCQeDsLCibTU5MIZczicytsAtYOvUSia33icibK7fHkCmN7RbzicZQzr2BAhpBpbvuD8H8hsRg6Q/640?wx_fmt=gif&from=appmsg#imgIndex=4)




- **缩放：拖动卡片右下角，随意调整大小。**



****

![Image 1](https://mmbiz.qpic.cn/mmbiz_png/vyxFHNhwB6OXVPUGZCQeDsLCibTU5MIZcGGcMelYeTS4xnVMwEmia8NfwIYuxXwBjkic6kE1PIulH4olSSsAElZRQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=5)


****

**内外网智能识别：”**这是它最让我拍案叫绝的功能！**完美解决NAS玩家最头疼的“回家无法自动切内网地址”问题。**


****

- 智能判断：FlatNas的后台会综合你的客户端IP、访问域名、甚至网络延迟，精准判断你是在公司、在家连Wi-Fi，还是用手机流量。




- 无感切换：


    当你为同一个服务同时设置了

- 

    - 内网地址（http://192.168.1.3:5666）

    - 外网地址（https://fn.abc.com）后……

- 

    - 在公司点开，自动跳转外网域名，通过公网访问。

- 

    - 回到家，自动跳转内网IP，享受局域网飞速加载！

- 

    - 整个过程，你无需任何操作，点击的永远是同一个图标。 这体验，丝滑得像德芙巧克力。




**自定义搜索引擎：**

- **可以用于内站搜索、网络搜索、pt站搜索等等自己发挥想想**




![Image 2](https://mmbiz.qpic.cn/mmbiz_png/vyxFHNhwB6OXVPUGZCQeDsLCibTU5MIZc3aiaEaJOQkqianCibpUrkJrqPq859pD4zU74Ub2BaFTSHwdeb9PoDTCxA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=6)

**原生小组件：”**它不是一个空壳，出厂就自带了一堆开箱即用的实用工具：


![Image 3](https://mmbiz.qpic.cn/mmbiz_png/vyxFHNhwB6OXVPUGZCQeDsLCibTU5MIZcgvsCdYTqUl2RS6VrkswYoibgYB1rTwf4hbhAhpBiawCT7jZDib2o0eDiaA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=7)

- 时间/天气：打开页面就知道今天要不要带伞，不用再装任何浏览器插件。

![Image 4](https://mmbiz.qpic.cn/mmbiz_png/vyxFHNhwB6OXVPUGZCQeDsLCibTU5MIZc0IWRXiaaYAxdAE9epH6rtRIyiaqklBGlX1FyhNX9yqDjkUiaE5aquP7lg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=8)




- Todo待办：临时灵感、工作任务，随手记在首页，比任何便签App都顺手。




![Image 5](https://mmbiz.qpic.cn/mmbiz_png/vyxFHNhwB6OXVPUGZCQeDsLCibTU5MIZc70AC3pTslXA9ZoM0L88lBby7kWAH0PzV4BuFEOEViaDnzLEx2vj64xQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=9)




- RSS阅读器：把你关注的科技博客、新闻源直接喂到首页，碎片时间高效获取信息。




![Image 6](https://mmbiz.qpic.cn/mmbiz_png/vyxFHNhwB6OXVPUGZCQeDsLCibTU5MIZcibfamDxNh3FMF6p8MH1ZkEplYPQEJKhrIw4YFHbl6bkZAWLYGyK9jAg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=10)







- 实时热搜：微博、中新网、虎嗅热榜一键聚合，摸鱼的时候也得掌握时代脉搏。




![Image 7](https://mmbiz.qpic.cn/mmbiz_png/vyxFHNhwB6OXVPUGZCQeDsLCibTU5MIZcDBsvYBHd5XCrbxj2dX9TXk6qiaDSAqsLDIEpykOVpoHcKerZHmYBibKA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=11)




- 本地音乐播放器：把MP3文件丢进映射的/music文件夹，它就能变成一个精美的网页版播放器，边工作边听NAS里的无损音乐。




![Image 8](https://mmbiz.qpic.cn/mmbiz_png/vyxFHNhwB6OXVPUGZCQeDsLCibTU5MIZcxjYusm6ibqVam5mItYdFribjy6CSRRWeswXL7ib0Q9fSntry4M4dmnzNA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=12)




- 万能窗口（Iframe）：这个是王炸！我个人最喜欢，简直是摸鱼神器。你可以把飞牛终端、小说、漫画、甚至你部署的任何Web服务，直接“嵌入”到FlatNas的一个卡片窗口里。相当于在导航页里又开了个小窗口，无需跳转新标签页，管理操作行云流水。




![Image 9](https://mmbiz.qpic.cn/mmbiz_png/vyxFHNhwB6OXVPUGZCQeDsLCibTU5MIZcqGibiczYaPk24EZZhia73P0ibYqDqwMMAYQYAmIJicg5D9PrCXLibWCwzicCA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=13)




**个性化定制**

- 图标DIY：不仅可以用内置图标库，还能上传任意图片当图标，更支持输入HEX色码（如[#FF6B6B](javascript:;)）自定义图标背景色。




- 壁纸自由：上传一张你喜欢的图片，整个页面背景瞬间焕然一新。




- 分组美学：每个分类卡片组都可以独立设置背景、毛玻璃模糊效果、遮罩颜色。让你的导航页既有统一风格，又有层次感。




![Image 10](https://mmbiz.qpic.cn/mmbiz_png/vyxFHNhwB6OXVPUGZCQeDsLCibTU5MIZcjJNWMFJo0BISkPibAx9jrkOwDz7v0zZfrHo9zI2NxxPwiad572ZFWVibA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=14)




- 数据自持：所有配置都保存在本地的data.json文件里，完全掌控在自己手中，支持一键导入导出。

![Image 11](https://mmbiz.qpic.cn/mmbiz_png/vyxFHNhwB6OXVPUGZCQeDsLCibTU5MIZcBvJ9vwYXFViaZBk6qPOg2rGBpJmmEI3aQQ0ZaP6z6Wm9Vibbdw98urpQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=15)


****

---

 

02

 Docker Compose 一键部署

 




部署过程依然是熟悉的“抄作业”环节，我们主打一个“复制粘贴就能用”。




第一步：创建它的“小单间”

- 在你的NAS上，比如在 docker 文件夹里

- 新建一个 flatnas目录。

    


第二步：编写 docker-compose

- 打开飞牛桌面上的Docker界面 -> Compose

- 写一个项目名称，选择储存路径


    （例如你之前创建的目录/vol1/1000/docker/flatnas）

- 创建 docker-compose.yml 文件，把下面的“咒语”复制粘贴进去




 

```Plain Text
services:
  flatnas:
    image: qdnas/flatnas:latest 
    container_name: flatnas
    restart: unless-stopped
    ports:
      - ‘23000:3000’
    volumes:
      - ./data:/app/server/data   # 配置数据存放处
      - ./music:/app/server/music # 音乐库映射，想用播放器必选
```

 




  

  




![Image 12](https://mmbiz.qpic.cn/mmbiz_png/vyxFHNhwB6OXVPUGZCQeDsLCibTU5MIZcbgThLqcibDgTslXg8I0yibNWVz9S6WQqQU20ApZmnejAWdxGMBOictZcw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=16)




第三步：启动！！

- 启动 -> 自动拉取镜像并构建坐等完成。

- 打开浏览器，访问：http://你的飞牛NAS IP:23000




![Image 2](https://mmbiz.qpic.cn/mmbiz_jpg/vyxFHNhwB6OXVPUGZCQeDsLCibTU5MIZcfyTkLlZ8VAs0JkD7KicfTMicia2OAeklw20KicK76xp65lyhfOF1V3YXWg/640?wx_fmt=jpeg&watermark=1#imgIndex=17)

![Image 13](https://mmbiz.qpic.cn/mmbiz_png/vyxFHNhwB6OXVPUGZCQeDsLCibTU5MIZcOYmmaqhouz3EMhBYtXnCL6bo270DJc9WUBLpwfAtDvzSoGvHn5LxZA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=18)

---

#### **技巧一：内外网地址配置示范**编辑一个卡片，你会看到两个URL输入框：

![Image 14](https://mmbiz.qpic.cn/mmbiz_png/vyxFHNhwB6OXVPUGZCQeDsLCibTU5MIZcobKzSTHCScibfm7PNBMn9aIiabz1C1levwnZRnjFsZuMBiaNZicJumbxdg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=19)

**技巧二：用“万能窗口”整合所有管理界面**新建一个“万能窗口”组件，把web服务地址填进去。以后，你只需要打开FlatNas这一个页面，就能直接在里面操作命令行，管理Docker，无需再记一堆IP和端口。

![Image 15](https://mmbiz.qpic.cn/mmbiz_png/vyxFHNhwB6OXVPUGZCQeDsLCibTU5MIZcviaNXRdOHNJsdQWibkoUYglNuJG6ibfDlGfuIicHOHBANJBRBr8v4IZ7Mg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=20)

![Image 16](https://mmbiz.qpic.cn/mmbiz_png/vyxFHNhwB6OXVPUGZCQeDsLCibTU5MIZctTYibDDp5BeyQF7YVQNII5iacbCgNzmWD62icpGzKb8sTaK1LERwKhibCQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=21)

![Image 17](https://mmbiz.qpic.cn/mmbiz_png/vyxFHNhwB6OXVPUGZCQeDsLCibTU5MIZcJ2IkGyetAszdV12uMdArldRVMaow8TILZ2Qwmz2e25r9fUsbZoib5kA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=22)




**技巧三：音乐播放器的正确姿势**在宿主机（你的NAS）上，

把你存放音乐的文件夹（例如 `/vol1/1000/音乐`）

修改docker-compose.yml中

 `./music:/app/server/music` 

改为

 `/vol1/1000/音乐:/app/server/music`

重启容器后，播放器就能自动扫描你的音乐库了。

![Image 18](https://mmbiz.qpic.cn/mmbiz_png/vyxFHNhwB6OXVPUGZCQeDsLCibTU5MIZccsojvUf4befkrq8iaUIEiaCy92iao8UPfm3UrMCViaTw4fMKrqdb42FDbA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=23)

---

#### **“但是”时间：**

**->适合谁？**

- NAS重度用户：有大量自建服务需要管理。

- 极客与开发者：追求效率和个性化，讨厌千篇一律。

- 希望统一入口的用户：想用一个页面聚合所有日常所需。

**-> 需要注意：**

- 单用户系统：目前不支持多账号，适合个人或家庭共享一个账户。

- 功能持续迭代：作为开源项目，新功能在不断增加,意味着你可能需要偶尔关注更新。

- 依赖Docker：对纯小白用户来说，需要一点点Docker基础，但教程已足够详细。




---

【Github地址】：

- https://github.com/Garry-QD/FlatNas


****

![Image 19](https://mmbiz.qpic.cn/mmbiz_png/vyxFHNhwB6O6Sx5fnxZ7spb8G9N7JiboK3EAzgzoyBrpGpWRQribdNS0NW3dOTzWx3FhHSkiaKHTBGcaqj6fVcQYw/640?wx_fmt=png&from=appmsg#imgIndex=24)




[飞牛NAS新爆料早先知！疑似EVO系列碟片来了，不保真。最终本月揭晓。](https://mp.weixin.qq.com/s?__biz=MzYzNTAxODIzOQ==&mid=2247484944&idx=1&sn=6e24fcbace472cac8635b9fbb2942b34&scene=21#wechat_redirect)

[2025-12-04](https://mp.weixin.qq.com/s?__biz=MzYzNTAxODIzOQ==&mid=2247484944&idx=1&sn=6e24fcbace472cac8635b9fbb2942b34&scene=21#wechat_redirect)

![Image 3](https://mmbiz.qpic.cn/mmbiz_jpg/vyxFHNhwB6MSic3OOwjQXlZEfPjUibLY8N9DhmnLxqAaTAtS6yvwicQMdorah1zuT5unBUbedpTPpOklotJv3t1qg/640?wx_fmt=jpeg&watermark=1#imgIndex=25)

[飞牛 fnOS 先锋计划招募：提前体验新版，一起打磨更稳的系统！](https://mp.weixin.qq.com/s?__biz=MzYzNTAxODIzOQ==&mid=2247484935&idx=1&sn=fd58bc983862af7c0f0f28bb657417c4&scene=21#wechat_redirect)

[2025-12-03](https://mp.weixin.qq.com/s?__biz=MzYzNTAxODIzOQ==&mid=2247484935&idx=1&sn=fd58bc983862af7c0f0f28bb657417c4&scene=21#wechat_redirect)

![Image 4](https://mmbiz.qpic.cn/mmbiz_jpg/vyxFHNhwB6O1PVwJIHCmMM1jsbUSt7y69iaABYpaZFDJnGWyort3bWCpPzCKak3lYvI6rldxpR3EY1TP0aboT3g/640?wx_fmt=jpeg&watermark=1#imgIndex=26)

[飞牛NAS：docker部署EasyVoice 小说文字转语音，免费、不限量、多角色配音。](https://mp.weixin.qq.com/s?__biz=MzYzNTAxODIzOQ==&mid=2247484922&idx=1&sn=ae17c642a5e53336d38fd4cf831a6661&scene=21#wechat_redirect)

[2025-12-02](https://mp.weixin.qq.com/s?__biz=MzYzNTAxODIzOQ==&mid=2247484922&idx=1&sn=ae17c642a5e53336d38fd4cf831a6661&scene=21#wechat_redirect)

![Image 5](https://mmbiz.qpic.cn/mmbiz_jpg/vyxFHNhwB6NjOHIOhcvHYxRCj9fR1RDuoLSfZGX2ib8KIKCwbPI2rcEgiaGTaHWE972sXHGnl6mYZCJTy7UD40Mw/640?wx_fmt=jpeg&watermark=1#imgIndex=27)

[飞牛NAS：docker部署Stirling-PDF，自建全能PDF工作站，几十种功能供你使用，并支持自动化。](https://mp.weixin.qq.com/s?__biz=MzYzNTAxODIzOQ==&mid=2247484903&idx=1&sn=478cbf25310474a715c7890b91a85384&scene=21#wechat_redirect)

[2025-12-01](https://mp.weixin.qq.com/s?__biz=MzYzNTAxODIzOQ==&mid=2247484903&idx=1&sn=478cbf25310474a715c7890b91a85384&scene=21#wechat_redirect)

![Image 6](https://mmbiz.qpic.cn/mmbiz_jpg/vyxFHNhwB6NXVtLELUhqPglNGdMstYyib8PibZ0BZ4qhgOluzrOtDYeaJkfH8YezJiaqq1dkrYawdTx5bQ8epgiagw/640?wx_fmt=jpeg&watermark=1#imgIndex=28)

[终于迎来飞牛NAS的“矿神”，第三方应用中心FnDepot。诚邀各界开发大神一起完善。](https://mp.weixin.qq.com/s?__biz=MzYzNTAxODIzOQ==&mid=2247484885&idx=1&sn=f805c915c3711a5957a8592ca1f7c39e&scene=21#wechat_redirect)

[2025-11-30](https://mp.weixin.qq.com/s?__biz=MzYzNTAxODIzOQ==&mid=2247484885&idx=1&sn=f805c915c3711a5957a8592ca1f7c39e&scene=21#wechat_redirect)

![Image 7](https://mmbiz.qpic.cn/mmbiz_jpg/vyxFHNhwB6OXVPUGZCQeDsLCibTU5MIZcOKc7bEg3WnbdwlibKcTBqHHSIKgHYgibibOeMQvXqEd8XvNIaMCLpextg/640?wx_fmt=jpeg&watermark=1#imgIndex=29)

[「fndesk」飞牛nas桌面图标主题、飞牛影视主题--第四篇，告别docker拥抱源生fpk应用，集成图片库解决找图标的痛苦。](https://mp.weixin.qq.com/s?__biz=MzYzNTAxODIzOQ==&mid=2247484873&idx=1&sn=26543d881182aedc8a70983428e5c9fa&scene=21#wechat_redirect)

[2025-11-28](https://mp.weixin.qq.com/s?__biz=MzYzNTAxODIzOQ==&mid=2247484873&idx=1&sn=26543d881182aedc8a70983428e5c9fa&scene=21#wechat_redirect)

![Image 8](https://mmbiz.qpic.cn/mmbiz_jpg/vyxFHNhwB6OXVPUGZCQeDsLCibTU5MIZc3yRVd0jzhoKZze3VlLhjIlDhRMB4nllcyuykBS1r91dibKaFMib71YdA/640?wx_fmt=jpeg&watermark=1#imgIndex=30)

[飞牛中医馆「青团」坐诊，聊一聊近300真实病例总结----存储空间那点事。](https://mp.weixin.qq.com/s?__biz=MzYzNTAxODIzOQ==&mid=2247484855&idx=1&sn=28936f8cd34fac4985869bfa6001d87e&scene=21#wechat_redirect)

[2025-11-27](https://mp.weixin.qq.com/s?__biz=MzYzNTAxODIzOQ==&mid=2247484855&idx=1&sn=28936f8cd34fac4985869bfa6001d87e&scene=21#wechat_redirect)

![Image 9](https://mmbiz.qpic.cn/mmbiz_jpg/vyxFHNhwB6OXVPUGZCQeDsLCibTU5MIZc2GP94W2OGq4trbqR8PicbrpX3xfPaFfR8acGcbBia8JVvICaYicCTwG5A/640?wx_fmt=jpeg&watermark=1#imgIndex=31)

[往期以飞牛NAS视角介绍了很多好玩的Docker项目，总有人后台问镜像拉取不动/太慢？解决办法来了！！](https://mp.weixin.qq.com/s?__biz=MzYzNTAxODIzOQ==&mid=2247484832&idx=1&sn=8773b1f866f660382ef8c4a6498fa070&scene=21#wechat_redirect)

[2025-11-25](https://mp.weixin.qq.com/s?__biz=MzYzNTAxODIzOQ==&mid=2247484832&idx=1&sn=8773b1f866f660382ef8c4a6498fa070&scene=21#wechat_redirect)

![Image 10](https://mmbiz.qpic.cn/mmbiz_jpg/vyxFHNhwB6OXVPUGZCQeDsLCibTU5MIZcUmFPGlH6tRerQMr86zSCSPnMEF68P5mDCMhw61MwW5RNBpd88p6UnQ/640?wx_fmt=jpeg&watermark=1#imgIndex=32)

[飞牛NAS：docker部署Ech0，构建属于你的博客、Markdown写作、待办、社交、媒体等一体化发布平台。](https://mp.weixin.qq.com/s?__biz=MzYzNTAxODIzOQ==&mid=2247484796&idx=1&sn=4bd9e97003bfb64f4b146b3d58ccd300&scene=21#wechat_redirect)

[2025-11-22](https://mp.weixin.qq.com/s?__biz=MzYzNTAxODIzOQ==&mid=2247484796&idx=1&sn=4bd9e97003bfb64f4b146b3d58ccd300&scene=21#wechat_redirect)

![Image 11](https://mmbiz.qpic.cn/mmbiz_jpg/vyxFHNhwB6OXVPUGZCQeDsLCibTU5MIZcrvRf9xpRL2HXCFn3ibQQm7pEv6NxdxlxPbkiaEOcB9ShxVybu6Bb8sjQ/640?wx_fmt=jpeg&watermark=1#imgIndex=33)

[昨天和小伙伴聊天，从NAS聊到飞牛，从飞牛聊到影视，从影视聊到了国漫。国漫好看是好看，但费寿命也是真的费寿命啊！！](https://mp.weixin.qq.com/s?__biz=MzYzNTAxODIzOQ==&mid=2247484760&idx=1&sn=25c6e349e329323ef776dfe7c73c2869&scene=21#wechat_redirect)

[2025-11-21](https://mp.weixin.qq.com/s?__biz=MzYzNTAxODIzOQ==&mid=2247484760&idx=1&sn=25c6e349e329323ef776dfe7c73c2869&scene=21#wechat_redirect)

![Image 12](https://mmbiz.qpic.cn/mmbiz_jpg/vyxFHNhwB6OXVPUGZCQeDsLCibTU5MIZc9Ju10fn1eSicZJMVfZIRmQ9fichlln1Az5N9GMptgS6H9wqrG7RtVoLQ/640?wx_fmt=jpeg&watermark=1#imgIndex=34)







**关注按一下又不会怀孕
我们一起探讨更无聊的知识**


****

评论区已开放！您感觉怎么样，或您还有什么好玩的项目与大家分享？

