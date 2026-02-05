---

title: 效果绝了！n8n + nano banana pro 生成手绘风格小红书封面
date: 2025-11-23
tags: ["n8n", "工作流", "自动化", "工作流自动化"]
category: 自动化工具
---


# 效果绝了！n8n + nano banana pro 生成手绘风格小红书封面

Original 科叔 [科叔AI进化记](javascript:void(0);)*2025年11月23日 13:24* *新加坡*



在小说阅读器中沉浸阅读

"你好呀，我是科叔，专注分享n8n工作流、AI编程，AI落地案例"




最近gemini 3 pro和 nano banana pro 刷爆了全网，各种好评不断。google那个曾经的王者又回来了！地表最强模型结合google全家桶，给人无限的想象空间！




![Image](https://mmbiz.qpic.cn/mmbiz_jpg/L6j3KUdn3yTRsmOMOBUl25my18JoCHXnhkFdReibMRAVovPZHU0kDbSdj4O1wTOemghNd9LBInzzCk6k2YhgWxQ/640?wx_fmt=jpeg&from=appmsg&watermark=1#imgIndex=0)




那么nano banan pro 这么强的模型如何才能接入n8n使用，昨天花半天时间尝试了一下，可以说生图效果绝了！




![Image 1](https://mmbiz.qpic.cn/mmbiz_jpg/L6j3KUdn3yTRsmOMOBUl25my18JoCHXnHTiasF820qzwNza7OYX8R6plsyxibhZG6wwvHM9iaN88BbleSefk5P0fw/640?wx_fmt=jpeg&from=appmsg&watermark=1#imgIndex=1)







本期主要介绍n8n工作流如何并接入 nano banan pro API 并直出小红书风格手绘图。大体步骤如下。




1.准备第三方nano banan pro API

2.用claude code 快速打个工作流样稿，并一点点优化

3.运行n8n工作流，并获得自己想要的图片







# 准备 nano banan pro API

开始的时候是想直接使用官方gemini api去生图的，但是发现需要完整绑卡流程，而且有使用地区限制，单次调用费用也比较贵。




后来从@芋头小宝老师那边看到了，有一个APIMart的第三方调用api，目前有优惠，只要0.03$ 每次，差不多2-3毛钱一张

官网地址：https://apimart.ai/model/nano-banana-2-api

![Image](https://mmbiz.qpic.cn/mmbiz_png/L6j3KUdn3yTRsmOMOBUl25my18JoCHXnpjJD3kfeMQhXOFUhfm0tribKicz9r2ONHv6fds2TWh6ZwlEn7TMG3qjw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=2)




先充上个1$ ，可以好多次了，支付国内友好

https://apimart.ai/billing




![Image 1](https://mmbiz.qpic.cn/mmbiz_png/L6j3KUdn3yTRsmOMOBUl25my18JoCHXnXB8sMia0Beh3J6OPHJZs1pzf0mrnW5wmTga4ARzm78c06XE1mMb3uMQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=3)




然后生成一个API Key，下面会用到




![Image 2](https://mmbiz.qpic.cn/mmbiz_png/L6j3KUdn3yTRsmOMOBUl25my18JoCHXnVuiaia0icYPiciaeSeibyqcvAyvKw1Zr90YkxA8oN3KP5xqAGLpVjniarzyKA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=4)




查看API文档中的HTTP 请求方式和相关参数




![Image 3](https://mmbiz.qpic.cn/mmbiz_png/L6j3KUdn3yTRsmOMOBUl25my18JoCHXn6NxUYNxMolkq9nA8nzGoRmqJG3icAd4F5FsL70I9UFmnetaRELROGsg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=5)




# 使用claude code+gml4.6打个工作流样稿




如果你没有什么构建思路，可以拿出claude code，这样可以快速搞一个工作流毛坯出来。

参考之前写的：[n8n自动化+AI编程融合是未来！用Claude code + GLM4.6生成一个推特（x）关键词热点推送工作流](https://mp.weixin.qq.com/s?__biz=MzkzODkwODYwMA==&mid=2247486439&idx=1&sn=56fc60e4d236fe3c30b580a4c1d6d856&scene=21#wechat_redirect)

但是这个毛坯大概率是没法直接用的，还需要自己一点点优化。主要是辅助理解API文档，理清思路，加快开发。




```Plain Text
输入下面提示词：
生成一个n8n工作流，可以通过一个表单输入用户需求提示词、图片分辨率，图片数量，然后调用nano banana pro生成对应图片，并可以下载到本地电脑，图片api使用Apimart 文档参考:https://docs.apimart.ai/en/api-reference/images/gemini-3-pro/generation。最后分别生成一个json格式的n8n工作流文件，和markdown格式的操作说明，保存到当前目录
```




![Image 4](https://mmbiz.qpic.cn/mmbiz_png/L6j3KUdn3yTRsmOMOBUl25my18JoCHXnZdHgomNicFG9y4xFNhzUT7YAAPSS2aicOTVCYqF5EjgHfvrXPYXyLkLA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=6)




最后生成两个文件，一个是工作流json文件，一个是使用说明




![Image 5](https://mmbiz.qpic.cn/mmbiz_png/L6j3KUdn3yTRsmOMOBUl25my18JoCHXnNfUg0YLyxcMviaTQP3Yzx0XkNZIqBtyibRoG9gDXAGBPGX6FqgFThwUQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=7)




![Image 6](https://mmbiz.qpic.cn/mmbiz_png/L6j3KUdn3yTRsmOMOBUl25my18JoCHXnzvMTrzemxJ0LSgrDPxUk0YxiaGCicfCOw6Gndpoia6mdc56V9TGQxqfDw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=8)




导入工作流，查看每一个节点，并自己一点一点优化，最后优化后的工作流如下图




![Image 7](https://mmbiz.qpic.cn/mmbiz_png/L6j3KUdn3yTRsmOMOBUl25my18JoCHXnLb2memXFZkpGh38NFQ522iatRZIdiaicQwicqfHXJoGRAG2PIGxjKpw73Q/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=9)




# 下面介绍每个节点作用




在开始之前，先在n8n credential中创建一个凭证，用来调用Apimart的接口，

凭证类型为Header Auth，




![Image 8](https://mmbiz.qpic.cn/mmbiz_png/L6j3KUdn3yTRsmOMOBUl25my18JoCHXnAIfEyFjfls2Qb6pCB6hVbNIicQGj1UfU0icBp2ltJ7cshw5GA1P7NNJw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=10)




凭证名称 修改为apimart, 然后填写Name 和 Value (按照下面图片中的填写即可，apimart上面申请的api key可以直接复制过来)




![Image 9](https://mmbiz.qpic.cn/mmbiz_png/L6j3KUdn3yTRsmOMOBUl25my18JoCHXngn3JUxiak0biboS5zCBXyic2on03NRspaLyicLVJXTOl7WlZC61EfzKbsw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=11)




第一个节点是一个表单触发器，用来填写生图信息，点击单步测试




![Image 10](https://mmbiz.qpic.cn/mmbiz_png/L6j3KUdn3yTRsmOMOBUl25my18JoCHXnCAWicr43d58x55Bq9BvCFWibxzSCAxZ3EMgh8NsI2NmTH4Nr6czEh7icw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=12)




复制测试url地址到浏览器，然后填写表单，并提交




```Plain Text
提示词可以用下面的
生成多个南京热门旅游景点汇集手绘风格卡片，小红书风格，中文语言，图片左下角账号名称：科叔AI进化记（手写小字）
```

![Image 11](https://mmbiz.qpic.cn/mmbiz_png/L6j3KUdn3yTRsmOMOBUl25my18JoCHXn1wpdiaIkiaYsOzm7sBzFcPZFQO0rgb5CfrYjUnQg9r83XiadkJMkdJcMA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=13)







第二个是http request节点，用来向apimart 发送生图请求数据

Header auth 用上面配置的凭证名称即可，注意名称保持一致

![Image 12](https://mmbiz.qpic.cn/mmbiz_png/L6j3KUdn3yTRsmOMOBUl25my18JoCHXnWm96gYLxR7XYib4wJjDDJOa04Qicgcwm9WUgHxhlKBpxicbZLs1Z9tOrw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=14)




请求体（Request Body ）里面把这三个拖入

![Image 13](https://mmbiz.qpic.cn/mmbiz_png/L6j3KUdn3yTRsmOMOBUl25my18JoCHXniaDRvibL5fbUrmAVxkDkybF39PCicHiajwIJiaqa2N9LDJeTndBN3T1Ujfw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=15)







第三个节点判断apimart调用是否正常。

💣

HTTP 200 OK 状态码是Web开发中最重要的成功状态码之一，表示服务器已成功处理了请求。在API开发和Web应用中，正确处理和理解HTTP状态码对于构建可靠的通信机制至关重要。




![Image 14](https://mmbiz.qpic.cn/mmbiz_png/L6j3KUdn3yTRsmOMOBUl25my18JoCHXnV36GTPdOR4LFgibMkQY3EcYYEz6VT099cmsFszEzvwHKuUOOk5zvCjg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=16)







第四个节点是http request 节点，通过服务器返回的task_id,去获得最后图片生成的url地址




![Image 15](https://mmbiz.qpic.cn/mmbiz_png/L6j3KUdn3yTRsmOMOBUl25my18JoCHXnZY7L53VAykJ0KLkEd5Cs4vGNSnic2sec8Ziax2LAyZ6Bjb8mFt7m9Sug/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=17)




由于服务器可能不是马上处理完，再增加判断处理是否完成和等待两个节点




![Image 16](https://mmbiz.qpic.cn/mmbiz_png/L6j3KUdn3yTRsmOMOBUl25my18JoCHXnibyygxTPx7UdEkibbypqVYFkl6oU2yiblbJ6BN9vKB1CcD68XIPQiabw7w/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=18)




wait可以根据根据需要灵活调整，默认是5秒




![Image 17](https://mmbiz.qpic.cn/mmbiz_png/L6j3KUdn3yTRsmOMOBUl25my18JoCHXnSJ1QicT18Y2HB7SmeYHO9l5ibLDkUXmhwTMdBwhlZeiaRh7DZNIz5Psaw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=19)







最后通过一个http request节点去获取最后生成的图片，然后你就可以下载自己想要的图片了




![Image 18](https://mmbiz.qpic.cn/mmbiz_png/L6j3KUdn3yTRsmOMOBUl25my18JoCHXnTicBLYq6ZyGAicz54pZ9icgzK13iaibj2Y3cU5QB3Bia2eT2tSibtr3UNqpiag/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=20)




还可以用它来生成各类手绘风格的知识卡片




![Image 2](https://mmbiz.qpic.cn/mmbiz_jpg/L6j3KUdn3yTRsmOMOBUl25my18JoCHXna9rDvOjm8pdDDRzW3H1HuZ396ic6APgichgyw3EMiaicU2p6BX57eF48rA/640?wx_fmt=jpeg&from=appmsg&watermark=1#imgIndex=21)




八段锦图片（中文小字还是有局部生成不佳）




![Image 3](https://mmbiz.qpic.cn/mmbiz_jpg/L6j3KUdn3yTRsmOMOBUl25my18JoCHXncEbaZA30pIusZXBZErc9UudgibYO6BFkesvAaIP5Ya8c8XjmibNrUqJA/640?wx_fmt=jpeg&from=appmsg&watermark=1#imgIndex=22)




还可以给小朋友生成英文单词学习连环画




![Image 4](https://mmbiz.qpic.cn/mmbiz_jpg/L6j3KUdn3yTRsmOMOBUl25my18JoCHXnI6Zb91Ylea7XraEVmuB1Q1ibsfZoq0xozMgmCOpHcyXaOnp3OmQswQw/640?wx_fmt=jpeg&from=appmsg&watermark=1#imgIndex=23)




最后查看一下生图费用，和官方描述一致




![Image 19](https://mmbiz.qpic.cn/mmbiz_png/L6j3KUdn3yTRsmOMOBUl25my18JoCHXnjxo4C3hdmnSapeHXbBxdtNrKePsTXyt0dhu4hhzvFk93Rv9Eks54qg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=24)




下一步优化

1. 1. 目前工作流还没实现I跑一次批量生成多图

2. 2. 生成的图片url只能获取1次，后面计划写入在线表格中

3. 3. 生图提示词还可以进一步优化，包括标题和部分细节




如果本文恰好帮到你，不妨点赞+收藏+分享，让科叔知道你来过！❤️

以上就是今天的分享内容，我们下期见。

END

【n8n社群运营计划】

为了帮助更多人学习n8n和AI编程，目前有两个社群可供选择，感兴趣可以扫下方二维码了解

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/L6j3KUdn3yTRsmOMOBUl25my18JoCHXnRssV0g7BshkgSj5dd14A30mfib1yN18WibIC4uANrfFSPGXxDYKln1IQ/640?wx_fmt=jpeg&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=25)

1. 免费群，以群友互助为主，可能有广告，可以获取部分公众号模板

2. 付费共创群 ，实行押金制（可以有效防止广告），每天分享最新行业资讯、n8n工作流、AI编程，AI自学和考证等内容，可以下载公众号所有模板，如果在群内分享你自己的搭建的n8n工作流模板包括完整操作步骤、源文件，押金可返还（非抄袭搬运，实用型强）

3. 另外关注公众号的小伙伴，记得找我领取 7天n8n 入门手册一份，持续更新~

![Image 20](https://mmbiz.qpic.cn/mmbiz_png/L6j3KUdn3yTRsmOMOBUl25my18JoCHXnicM8HVgoFBBnjJiauugspEvrDroErC2icrOW7fDnpibVvicWnBDtt8EkXtg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=26)

---



**<精选教程合集>**


****

**AI工作流**


****

![Image+](https://mmbiz.qpic.cn/mmbiz_png/L6j3KUdn3yTRsmOMOBUl25my18JoCHXnpgtcAJapHia0cc2LPZLV2Oz96b4NqDKkb0Fbd2rqkUILueTiazic82iaKg/640?wx_fmt=png&watermark=1#imgIndex=27)

AI编程

![Image+ 1](https://mmbiz.qpic.cn/mmbiz_png/L6j3KUdn3yTRsmOMOBUl25my18JoCHXnJrQ80T2GOjLYymiaiaHmmgvRm5Jibx4uCiakmQtInEeLOwDWokeJbCzBbA/640?wx_fmt=png&watermark=1#imgIndex=28)

[#n8n](javascript:;) [#n8n使用教程](javascript:;) [#AI自动化](javascript:;) [#AI工作流](javascript:;) [#nano](javascript:;) banana [#gemini](javascript:;) 

