---

title: 零基础玩转n8n工作流6|用多个Agnet搭建一个写作团队，实现公众号转小红书文章工作流
date: 2025-10-18
tags: ["n8n", "工作流", "自动化", "写作", "创作", "文章", "工作流自动化"]
category: 自动化工具
---


# 零基础玩转n8n工作流6|用多个Agnet搭建一个写作团队，实现公众号转小红书文章工作流

Original 科叔 [科叔AI进化记](javascript:void(0);)*2025年10月18日 22:43* *江苏*

"你好呀，我是科叔，专注分享AI工作流、AI编程，AI落地案例"




![Image](https://mmbiz.qpic.cn/mmbiz_jpg/L6j3KUdn3ySkKibElqOF3MBoEnrKr6EAcwESYibPT77HGqZ1SV3uwbwzmDB4icV75eqcPBwVVjxiaTRZzXuO2dnvaQ/640?wx_fmt=jpeg&from=appmsg&watermark=1#imgIndex=0)




最近我发现有个明显的趋势，就是AI Agent 正在向Agentic AI进化





通俗一点打个比方吧，如果AI Agent 是个“会干活的单兵”；Agentic AI 则是“会定战略、排兵布阵的指挥部”，这样使得AI的能力可以得到大幅提升，解决更为复杂的问题。




这也就是为什么，2025 年 8 月 20 日，n8n要发布所谓的多 Agent 编排模式（Multi-Agent Orchestration）




![Image](https://mmbiz.qpic.cn/mmbiz_png/L6j3KUdn3ySkKibElqOF3MBoEnrKr6EAc4ZibBjJsiaXfMUtpbpEAkoEEfkFicNoLL3WcaJppXfLSatcjw3UmkEqyQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=1)




如上图所示，AI Agent Tool 节点首次允许“在一幅画布里把多个 AI Agent 串成层级化团队”，从而标志着 n8n 从“单 Agent 调用”进入“原生多 Agent 编排”阶段。




本期我们拆解一下，如何在n8n通过多agnet编排一个写作团队，实现公众号转小红书文章合成工作流。




第一个Agent负责把你文章中的核心观点提炼出来

第二个Agent负责把核心观点，按照小红书风格改写

第三个Agent负责审核内容是否符合小红书公约，然后以格式化输出




![Image 1](https://mmbiz.qpic.cn/mmbiz_png/L6j3KUdn3ySkKibElqOF3MBoEnrKr6EAchicRw1OTXjxfTriakQFnr1WJwG98LR0Rsib4TZnYkHqxOIZzs4eQkQbgw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=2)




跑通这个工作流大概用了2天，80%时间是用来调试环境和填坑，补计算机知识短板。而n8n工作流节点流程其实非常简单和清晰的。




主要其中用到了一个n8n关键的节点google sheets, n8n在调用这个API时候，必须要部署n8n的云服务器以顶级域名形式回传给google，就这个过程比较繁琐一些坑。




![Image 2](https://mmbiz.qpic.cn/mmbiz_png/L6j3KUdn3ySkKibElqOF3MBoEnrKr6EAcqRLSzojFNBsKfW3Fsy8ZFyibr7wjlnQEQhRM4Rl7dNGTZg9fIlLUqhw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=3)

在开始之前需要做以下准备，做好这一步以后就可以让n8n丝滑增删改查Google Sheets了




1. 1. 注册谷歌邮箱:https://mail.google.com/

2. 2. 注册谷歌表格:https://docs.google.com/

3. 3. Google OAuth 2.0 Credentials配置：https://console.cloud.google.com/ （见下图）

4. 4. 云服务器准备：国内阿里云、华为云等、或国际云厂商

5. 5. 域名注册：https://wanwang.aliyun.com/ ，如使用国内云服务器，域名需要并完成实名认证和备案 （重要）

6. 6. n8n在云服务器完成部署，同时部署Nginx做反向代理，可以通过域名访问n8n（重要）

7. 7. n8n接入google sheets（重要）




![Image 1](https://mmbiz.qpic.cn/mmbiz_jpg/L6j3KUdn3ySkKibElqOF3MBoEnrKr6EAcW0EPsNzMoXrTSCo82FWIrLGxAWmC8T3FVBqQkyH93P2zia0x1oSX5VA/640?wx_fmt=jpeg&from=appmsg&watermark=1#imgIndex=4)







Google OAuth 2.0 Credentials配置篇幅较长，如果有需要笔记可以关注公众号，加科叔微信获取







# 那么如何编排多Agnet搭建写作团队，实现公众号转小红书文章工作流

下面开始逐步拆解：




首先在新增内容触发工作流触发器 Google Sheets







![Image 3](https://mmbiz.qpic.cn/mmbiz_png/L6j3KUdn3ySkKibElqOF3MBoEnrKr6EAcJmAL3iaNxyIFNWAC2FDFbFR977p6PY4tv31hkMV434qMGpOswGXYRjw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=5)







配置Google Shhets Trigger凭证




![Image 4](https://mmbiz.qpic.cn/mmbiz_png/L6j3KUdn3ySkKibElqOF3MBoEnrKr6EAcoyuNnb9FkHC0ZlPTMR63wH6Njv5JlYbyiaCpH8Hz4sJX4OpzQ9CZJ4Q/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=6)




这里第一行是需要回传给Google Cloud的的URL（googel需要以顶级域名回传）




![Image 5](https://mmbiz.qpic.cn/mmbiz_png/L6j3KUdn3ySkKibElqOF3MBoEnrKr6EAcEffByXicAtL7EZc1FN7FVVdspmic0zl6WrLXUKsJJmicEE85iahVrWK5lw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=7)

Client ID 和 Client Secrect在 google cloud consol 可以获取（密码只出现一次）




![Image 6](https://mmbiz.qpic.cn/mmbiz_png/L6j3KUdn3ySkKibElqOF3MBoEnrKr6EAchH59aLlBzm3LDicdxaY9zzMibGEkZV7xvQZHnJdXQzibKvbC4tVsziaApQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=8)




出现绿色说明这个节点和google cloud连接成功




![Image 7](https://mmbiz.qpic.cn/mmbiz_png/L6j3KUdn3ySkKibElqOF3MBoEnrKr6EAcePp0V0qsFdssZEibo7d9DicFibp3AA6vNF9QcJFOOyhgO1fma8GWQYmWw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=9)




打开在 goole sheet 创建一个名叫n8n-wechat的文档

![Image 8](https://mmbiz.qpic.cn/mmbiz_png/L6j3KUdn3ySkKibElqOF3MBoEnrKr6EAcfAgicPFvWfziahSR1SybEDoa0kcIO2qdWAiagSCPE7I7QHLHMlYibReMtA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=10)




Frome list 选择 n8n-wechat From list选择当前 Sheet1




![Image 9](https://mmbiz.qpic.cn/mmbiz_png/L6j3KUdn3ySkKibElqOF3MBoEnrKr6EAcsk4orrxVofqZIRfiaQ8DLhLRVfHk6InhS2Ic4CU5ibvz0ecRib3ZWgZeA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=11)




接着添加 Update row in sheet 节点，这是一个Action Node 有关n8n节点分类可以参考[零基础玩转n8n工作流4|核心节点介绍&创建n8n版钢铁侠贾维斯AI助手1.0](https://mp.weixin.qq.com/s?__biz=MzkzODkwODYwMA==&mid=2247485988&idx=1&sn=c538e255830978a8f712a65938cbdeff&scene=21#wechat_redirect)




![Image 10](https://mmbiz.qpic.cn/mmbiz_png/L6j3KUdn3ySkKibElqOF3MBoEnrKr6EAcOeEPDcm56NcNlyx4G05rxdQcV4Gfjldtibib5w2ap2XEkRLOyhicJAhvQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=12)




在最下面Values to Updat添加 sheet中的 文章链接 和 工作状态 两个字段




![Image 11](https://mmbiz.qpic.cn/mmbiz_png/L6j3KUdn3ySkKibElqOF3MBoEnrKr6EAcI08qdZ3mt1GF7iasAgicIWFVicicpIr5QX4Zq4IQowEiaAPhfsRicico8H67w/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=13)




将Goggle Sheets Trigger 触发器和第一个动作节点 Update row in sheet 相连







![Image 12](https://mmbiz.qpic.cn/mmbiz_png/L6j3KUdn3ySkKibElqOF3MBoEnrKr6EAcslEkV0PIVwOnw088U8kxf1nL2uibanend2cmwicaGauicQibAxmzBbTMQg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=14)




打开google sheet，在文章链接输入一个公众号文章的链接，然后回n8n执行一下

在Update row in sheet 节点 新增两个变量，文章链接和工作状态

然后将文章链接和工作状态，分别拖入

![Image 13](https://mmbiz.qpic.cn/mmbiz_png/L6j3KUdn3ySkKibElqOF3MBoEnrKr6EAc7kwqHxl21qVS9ibk1rxPjby2pia1q4B93gtLDsNxUfCGF120L3luTdJA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=15)




增加一个Firecrawl节点，这是一个社区节点，需要手动安装一下

📍

Firecrawl 是一个面向开发者与企业、兼顾“单页秒抓”与“整站深爬”的企业级数据获取平台，同时提供开放源代码的本地版本。一句话概括：把任何网页快速变成干净、结构化的数据。https://www.firecrawl.dev/

Actions 选择 根据url获取全文 Scrape a url and get its content

![Image 14](https://mmbiz.qpic.cn/mmbiz_png/L6j3KUdn3ySkKibElqOF3MBoEnrKr6EAcl0ah7DrE7lLlh3UOutwUjuOaNQ6c1TYmMlmMrk9v6TCYnHibEbzrnbg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=16)




将文章链接拖入 到节点中对应的Url中




![Image 15](https://mmbiz.qpic.cn/mmbiz_png/L6j3KUdn3ySkKibElqOF3MBoEnrKr6EAcBr5IzOJtOtibnDAqybaAZbE6RJGxzkgZ6TTVc8msqianp7Ouoc6NrNTQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=17)




执行当前节点，输出正常，网页默认以markdown格式进行输出




![Image 16](https://mmbiz.qpic.cn/mmbiz_png/L6j3KUdn3ySkKibElqOF3MBoEnrKr6EAcv6LYahGMCV0ukUjyT6TzR0f348IR4iciaIX69XJBf7pDGsQgFUs83kwQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=18)




下面添加一个AI Agent 节点，用于对文章主要观点提炼

![Image 17](https://mmbiz.qpic.cn/mmbiz_png/L6j3KUdn3ySkKibElqOF3MBoEnrKr6EAcAcVhjrUMmCIWbEMibET8ibH3iaFw8JRNARCsXbPef16EH1zR7YYpiaueGQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=19)




将上一个firecraw 获取到的markdown 拖入到User Message ,并围绕文章主要观点提炼编写System Message




![Image 18](https://mmbiz.qpic.cn/mmbiz_png/L6j3KUdn3ySkKibElqOF3MBoEnrKr6EAc20BVYek3IRj8FHnbs4NxskeaOuCIxmTYUB6atia2JiacI8WhCnne4IVw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=20)




添加 OpenAI Chat Model，具体接入时候只要兼容OpenAI格式的大模型厂商都可以




![Image 19](https://mmbiz.qpic.cn/mmbiz_png/L6j3KUdn3ySkKibElqOF3MBoEnrKr6EAc4yN8COQLQdU3qpicCwPHJv2SNnaaMa4RPO6LiaXwwjd5qtch194TCyQQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=21)




执行一下，AI 对原文核心内容进行了总结




![Image 20](https://mmbiz.qpic.cn/mmbiz_png/L6j3KUdn3ySkKibElqOF3MBoEnrKr6EActz3JGVrCb5yiaF5d6Z6icT1B8EWiabttic66OMSIaD6RhSg3XiaFbG2oMnw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=22)







然后我们在继续创建下一个节点， 小红书文章风格生成Agent







![Image 21](https://mmbiz.qpic.cn/mmbiz_png/L6j3KUdn3ySkKibElqOF3MBoEnrKr6EAcIAHlaGVYaUOMl0ZnhLgJsaVDL1NyzwGl9vAtUILuJxczIdg4xricSrQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=23)




依葫芦画瓢，继续添加一个小红书文章风格生成Agent , 执行一下，节点输入输出正常




![Image 22](https://mmbiz.qpic.cn/mmbiz_png/L6j3KUdn3ySkKibElqOF3MBoEnrKr6EAcfsO2tYdMyrdTXOMCcD0rAkqQRKWCibQ2ODiceiaiaq9RV7sKfzBNKzRkFA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=24)







最后再继续创建一个小红书审稿&格式化输出 Agent




👍

这个节点的主要目的是，首先把上一个节点传入的markdown格式的文件，转为为标准的json格式。

其次进行审稿，由于小红书平台还是较为严格，在小红书发布文章必须遵守小红书社区公约https://www.xiaohongshu.com/crown/community/agreement，检查上一个Agent 输出的内容是否有违规。




![Image 23](https://mmbiz.qpic.cn/mmbiz_png/L6j3KUdn3ySkKibElqOF3MBoEnrKr6EAcud7avJyCl9jnDY6V1lzBcW7hEP78qeckiaeb40FjhhOPnBChHsfXzhw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=25)




在格式化输出方面，可以直接勾选AI Agent 节点预置的 Require Specific Output Format




![Image 24](https://mmbiz.qpic.cn/mmbiz_png/L6j3KUdn3ySkKibElqOF3MBoEnrKr6EAciaX5WR7J65lbEU0hQPP8HHZ9d82RxJm2moFcib3aCI8mqenB7gWxPvwQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=26)




最底下有个 Output Parser 配置一下示例




![Image 25](https://mmbiz.qpic.cn/mmbiz_png/L6j3KUdn3ySkKibElqOF3MBoEnrKr6EAc9KGr4iazUjh9Dmh86aT7ErOy9ZLD6UVl8eU9CVPG2QT6N9G02BGz4Hg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=27)




再次执行，可以看到已经按照要求的json标准格式输出




![Image 26](https://mmbiz.qpic.cn/mmbiz_png/L6j3KUdn3ySkKibElqOF3MBoEnrKr6EAcmn4uThPAvxTCBFUZnVITVvIVM1oWNhPHxm1VUichVR7Lu8hG5n60E9w/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=28)







最后一步把输出结果同步到google sheets里，还是选择 Upadate row in sheet 这个Action Node




![Image 27](https://mmbiz.qpic.cn/mmbiz_png/L6j3KUdn3ySkKibElqOF3MBoEnrKr6EAc0GEWkwgiaIXaAoib4RNvIlXm2ic1ia6diaAUsqbRYeG8XBZwpHMDofdpHmA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=29)




将上一个节点中的 title content keywords 分别拖入

![Image 28](https://mmbiz.qpic.cn/mmbiz_png/L6j3KUdn3ySkKibElqOF3MBoEnrKr6EAcTmsEibXgj4Ljc1T2vpJjFt5icnFffsbGZM5xg1I8XOPwaa4yf2TJcZUA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=30)




执行以下，可以看到google sheets 已同步




![Image 29](https://mmbiz.qpic.cn/mmbiz_png/L6j3KUdn3ySkKibElqOF3MBoEnrKr6EAcpbs3ib9WFLH6hmFsFsJhsiabibcmtVNRqY6DicKcQS3FEuko8Cusodtmuw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=31)




最后我们用xiaohonshu-mcp实现自动化发布，如果感兴趣可以参考科叔之前写的文章[全自动发布小红书，你的24小时数字员工已就位！这个开源免费MCP工作流绝了！](https://mp.weixin.qq.com/s?__biz=MzkzODkwODYwMA==&mid=2247485608&idx=1&sn=3e649d6d9232cb75bb49adcf8459ba24&scene=21#wechat_redirect)




# 在Trae 中调用 xiaohonshu-mcp-server




这一步只要将google sheets 中已经处理好的标题、内容、关键词，直接复制出来作为提示词，也可以根据要求适当修改，然后准备一个图片就可以发布了。




```Plain Text
Prompt：
根据以下内容，发布一篇文章到小红书
n8n小白福音！3步搭建AI贾维斯助手；
内容["你们知道吗，我最近发现了一个超好用的工具叫n8n，真的是打开了新世界的大门！作为一个刚入门AI的小白，用起来才发现这玩意儿其实贼简单。","## 节点就是搭积木","n8n的核心就是节点（Nodes），你可以把它想象成乐高积木。有两种基础积木：触发器节点和动作节点。","触发器节点就是启动开关，比如手动触发、定时任务。动作节点就是干活的部分，比如处理数据、调用API接口。","## 三步搭个AI助手","我最开始也是半信半疑，直到跟着教程搭了个简易版\"贾维斯\"AI助手：","第一步：用On Chat Message节点作为触发器","第二步：接上AI Agent节点，自定义提示词","第三步：连上DeepSeek模型节点","就这么三步！关键是提示词可以随便改，想让AI用什么语气说话都行。","## 扩展性真的很强","n8n自带了500多个官方节点，还有各种社区扩展。这意味着你不仅能做简单的AI对话，还能集成邮件、日历、各种API接口。","我试过把AI助手的回复自动发到邮箱，还设置了定时提醒功能，超级实用。","## 给新手的建议","如果你是AI小白，真的可以试试n8n。它最大的优点就是可视化操作，不用写代码就能搭建复杂的AI工作流。","我现在用n8n做了好多自动化小工具：自动整理文件、智能回复邮件、写周报的AI助手。虽然刚开始可能会觉得有点懵，但上手之后真的停不下来。"]
关键词
["#n8n","#AI助手","#自动化工具","#工作流","#贾维斯"] 图片使用E:\code\xiaohongshu-mcp-main\n8n_jarvis_guide.jpg
```




完成发布，可以看到mcp会严格按照给到的标题、内容、关键词发布




![Image 30](https://mmbiz.qpic.cn/mmbiz_png/L6j3KUdn3ySkKibElqOF3MBoEnrKr6EAcBQvlggUd8HQwCNEcjA9GOqlkkq7YibmhEkQUOMWEn4BPnyAlicPtxv0g/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=32)




查看发布成功




![Image 31](https://mmbiz.qpic.cn/mmbiz_png/L6j3KUdn3ySkKibElqOF3MBoEnrKr6EAcIluxk5biauRJv0lqgxeeO2DoFExUOyf5AUlbzPpTV3Fz8JXbk3UzKmw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=33)







# 总结




本次通过n8n使用多个Agent编排一个公众号转小红书文章工作流，相当于你拥有了一支数字写作团队来为你写稿，我觉得，至少对我来说比自己写的要更快更好哈哈。




在整个执行过程中，也不是啥都不用干，你只要负责内容和整体方向把关就可以了。在正式发布之前，还是需要自己再看一遍。如果不满意，每一个工作节点都可以再进一步调整，大不了重新再来一遍。连续迭代优化几次后，大概率会输出一个令你满意的小红书风格的文案。




工作流内部的节点节点输入和输出完全透明， AI Agent内部接入的模型和提示词也可自己优化调整。可以说在AI自主性和人工控制之间，n8n已经找到了极佳的平衡点。




另外这个工作流可以作为原型，在此基础上衍生出更多的工作流，后续会进一步优化，欢迎关注。


如果本文恰好帮到你，不妨点赞+收藏+分享，让科叔知道你来过！❤️




以上就是今天的分享内容，我们下期见。

END

为了帮助大家快速入门n8n和AI编程，科叔拉了一个微信交流群，分享最新行业资讯、热门工作流模板、编程技巧，感兴趣欢迎扫码加入

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/L6j3KUdn3ySkKibElqOF3MBoEnrKr6EAc10ybOvPuDO4PbU4iaEpcrxTxvRf3KUl17dAdy4fQMw5Ty4cw0j29ZGg/640?wx_fmt=jpeg&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=26)

---



**<精选教程合集>**


****

**AI工作流**


****

![Image+](https://mmbiz.qpic.cn/mmbiz_png/L6j3KUdn3ySkKibElqOF3MBoEnrKr6EAcbRDxtB6NqNrczH7OEj3iaoHl26746t2brDeVAdFFVFPeYa0bQ8bQJvw/640?wx_fmt=png&watermark=1#imgIndex=35)

AI编程

![Image+ 1](https://mmbiz.qpic.cn/mmbiz_png/L6j3KUdn3ySkKibElqOF3MBoEnrKr6EAcQFrkNHJZnzNcnq6Hw6BoClb61cS8Exwd03heneAPVNk4s2uibSn66Mw/640?wx_fmt=png&watermark=1#imgIndex=36)

[#n8n使用教程](javascript:;)[#AI工作流](javascript:;)[#n8n](javascript:;)[#Agent](javascript:;)

