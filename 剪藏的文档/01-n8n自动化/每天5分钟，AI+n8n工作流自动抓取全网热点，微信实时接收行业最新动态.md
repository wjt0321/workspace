---

title: 每天5分钟，AI+n8n工作流自动抓取全网热点，微信实时接收行业最新动态
date: 2025-09-10
tags: ["n8n", "工作流", "自动化", "AI", "人工智能", "智能体", "Agent", "工作流自动化"]
category: 自动化工具
---


# 每天5分钟，AI+n8n工作流自动抓取全网热点，微信实时接收行业最新动态

Original 裴火荣 [HiAi智能体](javascript:void(0);)*2025年09月10日 22:24* *江西*

最近开发了一个超酷的 n8n 自动化工作流，它能每日定时帮我自动收集行业新闻、分析内容，还能整理成文档，直接生成一份「行业新闻简报」，每天早上八点自动将整理好的行业内容直接推送到我的微信上，每天节省1个小时浏览行业新闻的时间。

分享一下每个节点的作用，想搞行业新闻阅读自动化的小伙伴们可以参考一下！


![Image](https://mmbiz.qpic.cn/mmbiz_png/2WCbhicmiauia1qHic7iaAabBhbByKdzv0y7anPXSxiccm9NqsLicQAVl4K20ZICyMYy3pKJd4yLGN1KeHA3FPJItia5AQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=0)

n8n工作流

![Image 1](https://mmbiz.qpic.cn/mmbiz_png/2WCbhicmiauia1qHic7iaAabBhbByKdzv0y7as9qkocicKUE29lXDbQuqVUwKCv75jCPgibxgOmyO8RN4swo4bmHDpI1Q/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=1)

数据写入谷歌表格

![Image 2](https://mmbiz.qpic.cn/mmbiz_png/2WCbhicmiauia1qHic7iaAabBhbByKdzv0y7atIW6NQd6wJdpe5TBLeVql5jgicOicYPFjvYiaG95z24Y7nckXAib571LfA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=2)

 发送AI热门新闻至qq邮箱在微信中提醒


工作流拆解

1.Schedule Trigger
定时触发器，设定好时间，它就会自动启动工作流，不用手动点～每天早上醒来就能收到最新新闻，超省心！


![Image 3](https://mmbiz.qpic.cn/mmbiz_png/2WCbhicmiauia1qHic7iaAabBhbByKdzv0y7agJQMcM68woV0HSaibNsFa52U5qrxK5CeJWDbk20EMEl3Ydya6FK9J1w/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=3)


2.读取数据源（API)
这里存放了我要关注的新闻接口，比如科技、创新、数字化相关的。我们用的是newsapi接口。


> https://newsapi.org/

![Image 4](https://mmbiz.qpic.cn/mmbiz_png/2WCbhicmiauia1qHic7iaAabBhbByKdzv0y7ap3OUmrkBtg8DUDmqadfpyia3Cm4StzSd88LcPJ47AhpiczPHYEV7icZFQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=4)


3.Code节点（数据整理）
小小的代码逻辑，用来处理数据格式，保证 读取时不会乱。相当于做一个数据清洗的前置步骤。


![Image 5](https://mmbiz.qpic.cn/mmbiz_png/2WCbhicmiauia1qHic7iaAabBhbByKdzv0y7aHiaibIXZEuYoyLyFScubqzCxsxPZpBh3NwlpWObse45rhnicz39802Arw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=5)


4.翻译中文Agent
这是个智能Agent，将英文的内容翻译成中文


![Image 6](https://mmbiz.qpic.cn/mmbiz_png/2WCbhicmiauia1qHic7iaAabBhbByKdzv0y7abesoVTLn2nrOIO80MxdUZPPbmzBqGPtG3ALvoiaJnugPLzGt82rgRKg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=6)


5.记录数据库（Append Sheet)
把筛选后的新闻存进 Google Sheet，作为我的新闻数据库。以后要回溯或者复盘超级方便～


![Image 7](https://mmbiz.qpic.cn/mmbiz_png/2WCbhicmiauia1qHic7iaAabBhbByKdzv0y7aZW8EuKkNw7ibzQbGCkpUdzc8RCgu4hViaDv0VE3dSSbZWqgIkX92VljQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=7)


6.Code节点（数据聚合）
保证内容结构和格式更适合输出成简报。


![Image 8](https://mmbiz.qpic.cn/mmbiz_png/2WCbhicmiauia1qHic7iaAabBhbByKdzv0y7agfI1o92qvnuCP71ZtuOJIIKW4iaGAsNFAyf4e3uOz7NZPAzXtVtDBOA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=8)


7.发送通知到邮箱
将数据聚合节点的数据发送至qq邮箱，然后在微信中提醒


![Image 9](https://mmbiz.qpic.cn/mmbiz_png/2WCbhicmiauia1qHic7iaAabBhbByKdzv0y7aLudR4kuxNN3qQCT0O7RQvEjxyTc94rRzLhk9jcl22CxzXfkpUicjabQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=9)


8.微信通知
最后一步！在微信中开启qq邮箱通知，每天都能直接打开一份新鲜的「今日行业新闻简报」啦～


![Image 10](https://mmbiz.qpic.cn/mmbiz_png/2WCbhicmiauia1qHic7iaAabBhbByKdzv0y7aiap2P4Fba4OChavyJKE0tw2hHvKesOkuvQfZR56p5b5voxOLNf6kqow/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=10)




如果你也对n8n工作流感兴趣，欢迎来我微信一起交流。V：HiAi766。如果你想要获取今天的工作流源文件，欢迎点赞、关注、分享后联系我获取。

