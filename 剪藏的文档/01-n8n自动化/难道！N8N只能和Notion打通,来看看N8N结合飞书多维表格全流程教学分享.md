---

title: 难道！N8N只能和Notion打通,来看看N8N结合飞书多维表格全流程教学分享
date: 2025-10-29
tags: ["n8n", "工作流", "自动化", "飞书", "工作流自动化"]
category: 自动化工具
---


# 难道！N8N只能和Notion打通,来看看N8N结合飞书多维表格全流程教学分享

Original 杰克船长的AIGC [杰克船长的AIGC](javascript:void(0);)*2025年10月29日 11:53* *江苏*




点击上方卡片关注 不要错过精彩文章










📌

持续更新有关Agent的最新搭建思路和工作流分享，希望能给您带来帮助，点一点上方的🔵蓝色小字关注，你的支持是我最大的动力！🙏谢谢啦！🌟"　

      大家好！我是舰长！🤝这些时间收集很多伙伴学习N8N的问题,主要是在飞书如何和N8N打通数据连接，舰长之前只分享过Notion的使用，毕竟N8N属于国外开发，对于Notion比较友好，但飞书对于国内来说也更方便，更好用。




舰长本次将分享“飞书和N8N的数据连通”，就依定时收录头部博主的公众号文章案例进行实操演示




飞书在N8N中是没有直接存放节点的，需要去社区里找社区优秀开发者开发的节点，正好这位优秀的开发者开发了飞书社区节点，基本上涵盖了大部分的飞书使用。




社区节点文档：https://www.npmjs.com/package/n8n-nodes-feishu-lite




以下是往期全套关于N8N文章的地址欢迎回顾：

[乌炸天！给自己电脑免费部属一套Agent 智能体搭建平台，万事不求人](https://mp.weixin.qq.com/s?__biz=MzkyMzY5OTkxOQ==&mid=2247517402&idx=1&sn=4f6c28e73989e56c0fa6440ef6c64879&scene=21#wechat_redirect)

[来来来,到云端部属免费的AI agent智能体搭建平台,超详细教程](https://mp.weixin.qq.com/s?__biz=MzkyMzY5OTkxOQ==&mid=2247517470&idx=1&sn=361242cf369a514163ffd1149bcbaca6&scene=21#wechat_redirect)

[最新N8N 构建企业级知识库问答Agent：文档向量存储及RAG检索](https://mp.weixin.qq.com/s?__biz=MzkyMzY5OTkxOQ==&mid=2247518142&idx=1&sn=4da9f40bec296bf5bc1d220d24553fa3&scene=21#wechat_redirect)

[构建N8N第一条工作流：自动获取资讯信息并保存到本地](https://mp.weixin.qq.com/s?__biz=MzkyMzY5OTkxOQ==&mid=2247517513&idx=1&sn=70e1c8592807a6f1ebab993f9f480bdb&scene=21#wechat_redirect)

[N8N工作流,AI各大节点解剖式讲解,学好N8N扎实的基础](https://mp.weixin.qq.com/s?__biz=MzkyMzY5OTkxOQ==&mid=2247517799&idx=1&sn=47823a8f55e339f5df258fdf06b9a201&scene=21#wechat_redirect)

[最新N8N 构建企业级知识库问答Agent：文档向量存储及RAG检索](https://mp.weixin.qq.com/s?__biz=MzkyMzY5OTkxOQ==&mid=2247518142&idx=1&sn=4da9f40bec296bf5bc1d220d24553fa3&scene=21#wechat_redirect)

[整套 N8N 工作流搭建教程拿走,欢迎点击收藏,更新教程系列之5 : 一文搞定谷歌/notion授权问题](https://mp.weixin.qq.com/s?__biz=MzkyMzY5OTkxOQ==&mid=2247519703&idx=1&sn=d19524f2665a7a7ceae636aea98de827&scene=21#wechat_redirect)

[别用复杂云部署,也能轻松访问N8N,小白轻松搞定内网穿透,免费保姆级教程](https://mp.weixin.qq.com/s?__biz=MzkyMzY5OTkxOQ==&mid=2247519798&idx=1&sn=17bff6467379aa40b9f1f1c39ef3ffe5&scene=21#wechat_redirect)

[批量出图就拿 Nano Banana+N8N 图生图、文生图两套工作流，手把手教程AI agent](https://mp.weixin.qq.com/s?__biz=MzkyMzY5OTkxOQ==&mid=2247519845&idx=1&sn=c1a9c5be20e7da02b0b695e2b9d2504d&scene=21#wechat_redirect)

[抖音对标视频数据抓取难？别搭工作流了，电脑本地部署1套抖音全部数据下载工具，全网最详细教程手把手教学](https://mp.weixin.qq.com/s?__biz=MzkyMzY5OTkxOQ==&mid=2247519882&idx=1&sn=3873ae5f77345bf90362931d2b27f978&scene=21#wechat_redirect)

[最新N8N实战工作流:抖音对标账号全量数据自动化批量采集，一键写入Notion](https://mp.weixin.qq.com/s?__biz=MzkyMzY5OTkxOQ==&mid=2247519990&idx=1&sn=e6305dbc09f83cbdc563ad6278aec03a&scene=21#wechat_redirect)

[绝了！N8N 居然支持个人微信全自动发布，重复工作终于能躺平了！](https://mp.weixin.qq.com/s?__biz=MzkyMzY5OTkxOQ==&mid=2247521826&idx=1&sn=51617c7a958b1de28d22bd45f8e295d6&scene=21#wechat_redirect)

[哈哈,全程不要你干涉！用N8N也能"一句话全自动"直接创作发布红薯到平台](https://mp.weixin.qq.com/s?__biz=MzkyMzY5OTkxOQ==&mid=2247522302&idx=1&sn=1eb6fd5c29952a51f41536a9a58b750b&scene=21#wechat_redirect)




![Image](https://mmbiz.qpic.cn/mmbiz_png/sqr7oTe0d20DMlQ29POm8TA6MibFXcyTXlekf2Vbtuz1LvySeQ39bCXqmHqsZRfzuZxvuqtXp9n7IeRlic925q8A/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=0)




在n8n的左下角的三个点，打开设置并找到Community nodes

![Image 1](https://mmbiz.qpic.cn/mmbiz_png/sqr7oTe0d20DMlQ29POm8TA6MibFXcyTXu9qh6IibLkZRKRiazvEZAia1LpTfVSfPv0IjiaObCE24IibeFfuSdfC6zhw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=1)




然后输入节点名字进行安装

```Plain Text
n8n-nodes-feishu-lite
```

![Image 2](https://mmbiz.qpic.cn/mmbiz_png/sqr7oTe0d20DMlQ29POm8TA6MibFXcyTXWup8HXOIcKoPP4K6GMwhogibVjIJpswM4gYSvUqNpCqdRH18BZpyXRw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=2)




添加好社区节点，就可以在工作流中添加飞书的各种使用节点：

![Image 3](https://mmbiz.qpic.cn/mmbiz_png/sqr7oTe0d20DMlQ29POm8TA6MibFXcyTXyVyER0kPQ4xarCt0dibayRozMibsXZic1Hu9K9rvShm3iaMNl2YWliaqicvA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=3)




飞书上的这些基本使用功能基本都涵盖：云文档、表格、多维表格、日历、发消息等




![Image 4](https://mmbiz.qpic.cn/mmbiz_png/sqr7oTe0d20DMlQ29POm8TA6MibFXcyTXnut0x33tUjEA1acliam2ZBSA4NLUreAzDuFiaT7ibsFLhTXC6a8F3iaagA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=4)




![Image 5](https://mmbiz.qpic.cn/mmbiz_png/sqr7oTe0d20DMlQ29POm8TA6MibFXcyTXBcQXUbWMNanT5oHjF8qcHe6ShJQWXUm57B61cdxgjsQeuBS4Hcd5ew/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=5)




就以多维表格进行实操：飞书的多维表格新增数据




也就是对应在飞书多维表格中增加新的记录：

![Image 6](https://mmbiz.qpic.cn/mmbiz_png/sqr7oTe0d20DMlQ29POm8TA6MibFXcyTX5WAFTFGhYqPsheUIibWXxk0LnvoH6FtTHIfPHsibeDChUAib2VgJqJJyQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=6)

![Image 7](https://mmbiz.qpic.cn/mmbiz_png/sqr7oTe0d20DMlQ29POm8TA6MibFXcyTXcicYvDG9faDkOu6uNNTaSknjfjGnkLRd5bV2NY1hwfMGbHniaiclNsvsA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=7)




在整个节点中需要提供的前置条件比较多

第一个：和飞书之间的授权“Appid”和“AppSecret”（ID和密钥）

![Image 8](https://mmbiz.qpic.cn/mmbiz_png/sqr7oTe0d20DMlQ29POm8TA6MibFXcyTXOPzTHhzZMy0ZoLcH7DVyVeeVkiaxjDynBogRXvY26letJavukhG1Bow/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=8)




这两个需要在飞书的开放平台上获取

网址：https://open.feishu.cn/?lang=zh-CN




进入开发者后台

![Image 9](https://mmbiz.qpic.cn/mmbiz_png/sqr7oTe0d20DMlQ29POm8TA6MibFXcyTXBV5hoqyMIc6qlfmJ2yNdU1yOaeVc0goAlzswwf9jATUZkGevm8Zuvw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=9)




创建企业自建应用

![Image 10](https://mmbiz.qpic.cn/mmbiz_png/sqr7oTe0d20DMlQ29POm8TA6MibFXcyTXQA7RiakGKVic0iaRKdVQcuFb0KyT7ezDf3YVibxdjDfCpkicRtw6LibpEjCQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=10)




填写上基本信息

![Image 11](https://mmbiz.qpic.cn/mmbiz_png/sqr7oTe0d20DMlQ29POm8TA6MibFXcyTX2kpTXrnCmEPxsfwcJf1HHRfOGpaA83oI4anZ7PnOgibhpXNOEV7rrqQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=11)




在左侧找到权限管理并选择开通权限

![Image 12](https://mmbiz.qpic.cn/mmbiz_png/sqr7oTe0d20DMlQ29POm8TA6MibFXcyTXJmtoyawAX1SjkUibPYlZ56gGAiayzViasC5zyc2SScMdS2bWnWa5cRhsg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=12)




一定要搜索“多维表格”后一键全部勾选

![Image 13](https://mmbiz.qpic.cn/mmbiz_png/sqr7oTe0d20DMlQ29POm8TA6MibFXcyTXibHFeiaibiauT3e0Vk8GicvPqmHZRpVhcjtB9XZe9FI18BbiceJFzicxXSO9w/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=13)




再找到版本管理，发布一下版本

![Image 14](https://mmbiz.qpic.cn/mmbiz_png/sqr7oTe0d20DMlQ29POm8TA6MibFXcyTXXwiblTOoIiaHC7WibKkehlsS1Y0pdjKaJXibHt3VtyqDzmlE7jH2Nu9BQA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=14)




当应用发布成功，就可以使用“Appid”和“AppSecret”

![Image 15](https://mmbiz.qpic.cn/mmbiz_png/sqr7oTe0d20DMlQ29POm8TA6MibFXcyTXdib4Ypib5AF1ft0ic9D0bKhlcr41b4CzHhfbUONt0FBfDgLYxfdWHBB8Q/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=15)




回到n8n中进行授权

![Image 16](https://mmbiz.qpic.cn/mmbiz_png/sqr7oTe0d20DMlQ29POm8TA6MibFXcyTX12bTS7sF2iciaQypIH4WLw52k057DTUrIsdwqtRa1NXsyp4BG76P1fVQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=16)




第二个：多维表格的token和ID

![Image 17](https://mmbiz.qpic.cn/mmbiz_png/sqr7oTe0d20DMlQ29POm8TA6MibFXcyTXAKY9eHbkfy46B0Ug19dFYmw4Z1qWQZDYoXL6Qs2C1sYtfz4X272Gkw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=17)




创建一个新的（或者准备使用的多维标题）

要在多维表格中创建新的表格，如果是别的创建方式使用比较麻烦

![Image 18](https://mmbiz.qpic.cn/mmbiz_png/sqr7oTe0d20DMlQ29POm8TA6MibFXcyTXXIeQrppalc1k5qT4vR159EdusurDJZgicfkT0wIFp44K1WV2NYEDNpg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=18)




右上角的三个点找到“更多”选择添加文档应用

（因为飞书的安全限制要求：只有关联应用的表格，才能被应用读写数据，这一步漏掉 n8n 会提示“表格未授权”）

![Image 19](https://mmbiz.qpic.cn/mmbiz_png/sqr7oTe0d20DMlQ29POm8TA6MibFXcyTXsFticIqdoVMEP0GFt9nHFwuibMF3S3KqicmWshkiaUx4LcaWs7r6qwmtnQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=19)




直接搜索创建应用的名称进行添加

![Image 20](https://mmbiz.qpic.cn/mmbiz_png/sqr7oTe0d20DMlQ29POm8TA6MibFXcyTXyH4JwJ8hibhclR7tVcSRsOGsnp42F7rCuhBwaco4K59bwEEaxzRC0icw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=20)




配置好后需要找多维表格的token和ID，不管是在网页端创建的还是在app中创建，统一在浏览器中打开，这样可以看到网址，而多维表格的token和ID就在网址上。

![Image 21](https://mmbiz.qpic.cn/mmbiz_png/sqr7oTe0d20DMlQ29POm8TA6MibFXcyTXJ54NjCibIu1Wj6s3ckktX9837uzXjd5RCF2cDu8x9hrz3SbuiaJURRMA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=21)




如果打开网址是feishu.cn/wiki/的需要在多维表格中去创建，一定要是feishu.cn/base/开头的网址




cn/base/到？的就是多维表格的token，table=到&的就是多维表格的ID；这一步一定要注意




下面配置到n8n的飞书节点中即可

![Image 22](https://mmbiz.qpic.cn/mmbiz_png/sqr7oTe0d20DMlQ29POm8TA6MibFXcyTXicDf40gDLMckeicwrme8Sv2dDGia0pmkiaialkfoqZ4HoOUL47LcMYBCpbw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=22)




这样两步的验证，就可以将n8n和飞书的多维表格进行连接，接下来需要注意的就是传递的josn，为了更好的让大家理解，舰长用定时采集头部博主的公众号案例进行演示。




想要获取到公众号的文章可以采用rss订阅的方式：

今天看点啥：https://www.jintiankansha.me/mycolumn/rss

订阅号博主之后就可以在订阅管理中复制对应博主的RSS订阅链接

![Image 23](https://mmbiz.qpic.cn/mmbiz_png/sqr7oTe0d20DMlQ29POm8TA6MibFXcyTXuqAgRibNWok2aqcfK0ujib3dkU8G0WCDib7tCaHx5ibpmUney2JZCa1Ulw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=23)




打开n8n，如果没有部署的小伙伴可以参考舰长这篇文章：

[乌炸天！给自己电脑免费部属一套Agent 智能体搭建平台，万事不求人](https://mp.weixin.qq.com/s?__biz=MzkyMzY5OTkxOQ==&mid=2247517402&idx=1&sn=4f6c28e73989e56c0fa6440ef6c64879&scene=21#wechat_redirect)




以下是本次的工作流详图

![Image 24](https://mmbiz.qpic.cn/mmbiz_png/sqr7oTe0d20DMlQ29POm8TA6MibFXcyTXj9yqXLSfMyFNnawBA6aPYibO1lXB3CShBYdKp3p6L6w34mQcJicsm6vQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=24)




定时触发节点

时间根据需求选择即可

![Image 25](https://mmbiz.qpic.cn/mmbiz_png/sqr7oTe0d20DMlQ29POm8TA6MibFXcyTXhz7iavVUqOjTIxIZljeafldZbHBmicMVfvIVicAp4QiaXblrPkY56uWXew/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=25)




rss订阅

需要订阅一个博主就放置一个rss节点

![Image 26](https://mmbiz.qpic.cn/mmbiz_png/sqr7oTe0d20DMlQ29POm8TA6MibFXcyTXqTicRiat40jp0BXHZf2958yKeicgDQbHPUZQUNx2Wmj511jOAlPhKeMsw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=26)

![Image 27](https://mmbiz.qpic.cn/mmbiz_png/sqr7oTe0d20DMlQ29POm8TA6MibFXcyTXj9yqXLSfMyFNnawBA6aPYibO1lXB3CShBYdKp3p6L6w34mQcJicsm6vQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=27)




Merge合并节点

需要获取几个博主就输入几个数，再把rss节点和合并节点链接

![Image 28](https://mmbiz.qpic.cn/mmbiz_png/sqr7oTe0d20DMlQ29POm8TA6MibFXcyTXgaTicjyhwXr8ESuH62jcHIHEypcibBpPRlIwgp6PONjjWP9TictP13HYA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=28)




Filter筛选器节点

rss节点每次会获取前五条文章，但并不是每条链接都是最接近当天时间的，所以用筛选器节点去筛选往前一天的数据进行输出

左侧：

```Plain Text
{{ new Date($json.pubDate).getTime() }}
```

右侧：

```Plain Text
{{ Date.now() - 24 * 3600 * 1000 }}
```

![Image 29](https://mmbiz.qpic.cn/mmbiz_png/sqr7oTe0d20DMlQ29POm8TA6MibFXcyTXaFy7NTkGnD1ssqrwgXLticnehbicGCHFtiaYdUuqs85rCoibXsYFAQpAjA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=29)




Loop Over Items循环节点

![Image 30](https://mmbiz.qpic.cn/mmbiz_png/sqr7oTe0d20DMlQ29POm8TA6MibFXcyTXAusVqWMFe9FsSGMAaBLw2sa2GZmM3VO0UzU8lib7LibqqQnEx1qOLQ3g/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=30)




飞书多维表格节点：新增记录

这个节点的和飞书的授权以及token和id按照文章上面进行获取

而请求体josn为：

```Plain Text
{  "fields": {    "文章标题":"{{ $json.title }}",    "文章链接":"{{ $json.link }}",    "收录时间":"{{ $now.toFormat("yyyy-MM-dd") }}"    }  }
```

![Image 31](https://mmbiz.qpic.cn/mmbiz_png/sqr7oTe0d20DMlQ29POm8TA6MibFXcyTXoFIice0fPDyJJdF7IDc9ADz2TugENo9SPmWWVLliaa3Fz2WUOounDt4g/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=31)




文章标题、文章链接、收录时间都是飞书表格中的字段名称，字段的类型也是文本类型

![Image 32](https://mmbiz.qpic.cn/mmbiz_png/sqr7oTe0d20DMlQ29POm8TA6MibFXcyTXib8yEgja7NC1sXy0wyr5bGG3ohnn5GXCXmVcZVyUv516YDEtcSy9Mog/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=32)




![Image 33](https://mmbiz.qpic.cn/mmbiz_png/sqr7oTe0d20DMlQ29POm8TA6MibFXcyTXxdIUrmVKXAMqicfIicJ7psdIQwTMT62p49Fu7qcA37Jc3ednz6IVpJ8A/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=33)

有几个字段就写上几个对应字段的json格式数据即可

最终效果：

![Image 34](https://mmbiz.qpic.cn/mmbiz_png/sqr7oTe0d20DMlQ29POm8TA6MibFXcyTX6ic7VsRtR3tuibUlwMCf24vyJ5dK3Wyziaq7jMl8wBG85VtFickRrMPmOg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=34)




总结:飞书和N8N的数据打通流程为：获取id和密钥——创建多维表格——添加应用——获取token和id——编写好表格的字段和字段类型——搭建工作流传递json数据。




本次的分享就到，您有收获请麻烦您一键三连,搭建卡点可以加入舰长的交流群进行交流




关注公众号并添加舰长微信，领取智能体学习资料，并参与智能体技术直播讲解

![Image 35](https://mmbiz.qpic.cn/mmbiz_png/sqr7oTe0d20DMlQ29POm8TA6MibFXcyTXOfYzia5KaSiaZzZoKXVCW9Dx0AobC72gibsJ5aJYyciaA5sxicCJ9oW3Btw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=35)

另外非常欢迎大家加入[唐舰长AI落地智能体交流群],主要交流群每周都会进行公益直播教大家搭建AI智能体工作流

![Image 36](https://mmbiz.qpic.cn/mmbiz_png/sqr7oTe0d20DMlQ29POm8TA6MibFXcyTXs7sn5h8LTYSLpgJaQZC9TdWXex9daiaFWtsxfCXE381sBuKX5zjmRmw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=36)

