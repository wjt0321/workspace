---

title: 让AI帮你打工！n8n将AI资讯自动写入到你的飞书表格
date: 2025-09-05
tags: ["n8n", "工作流", "自动化", "飞书", "AI", "人工智能", "智能体", "Agent", "工作流自动化"]
category: 自动化工具
---


# 让AI帮你打工！n8n将AI资讯自动写入到你的飞书表格

Original 鲤鱼冲啊 [鲤鱼冲啊](javascript:void(0);)*2025年09月05日 20:42* *福建*

n8n学习中，这次的目标是将RSS获取的数据简单清洗下，自动填入飞书多维表格，可以实现每日定时获取最新资讯。

![Image](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatMFXoP9oWWtjYsNLxCZNrkgoEFicl1BcNGCpw6sUahaPkImQX3qE5g2fQD4Mpddiayia8JYUp93vvcrg/640?wx_fmt=png&from=appmsg#imgIndex=0)

①创建n8n工作流，获取想要的数据

打开n8n，右上角创建工作流

![Image 1](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatPfsBPT76micLo6ogq39bjQZf4YRpbQt6WibDMBvegbfgJAoib6U3lRxmVEsraR944YyicdJibAMn6IrGw/640?wx_fmt=png&from=appmsg#imgIndex=1)

添加4个节点：Manual Trigger（点击触发器），Rss Read（Rss读取），If（如果，条件判断），Edit Fields(Set)（编辑字段（设置）），并按下图连接起来。

![Image 2](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatMFXoP9oWWtjYsNLxCZNrkgmgElKt3yrDk2UdKibtgqVRKHGVRupdHkbTnQotG6GDfVWsENpOCVFrw/640?wx_fmt=png&from=appmsg#imgIndex=2)

修改RSS Read节点参数（双击打开），URL处填入一个RSS链接，我这里用（https://rssweball.top/feed/23c2b171-245c-479e-af18-3841bb0d9527.xml）

![Image 3](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatMFXoP9oWWtjYsNLxCZNrkgejTO0lSOQ7QHgVCdbmxhmibUs271zYApI0Nrbjn4Xhz21Fwic6FlWBEA/640?wx_fmt=png&from=appmsg#imgIndex=3)

修改If节点参数，value1这里点一下

![Image 4](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatMFXoP9oWWtjYsNLxCZNrkg5r50F8Sib7kxUPjU2xb3msiaSEiaNtpxAd5NbPFJcNiaIicH3ib4ZndAgOWg/640?wx_fmt=png&from=appmsg#imgIndex=4)

选择Expression模式，填入{{ $json.isoDate.substring(0, 10) }}

![Image 5](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatMFXoP9oWWtjYsNLxCZNrkg9djcnXrOrsdyIWh51dqncpj3BbrhLCf5kU2xrmO6nxtq0RYMSOHXbQ/640?wx_fmt=png&from=appmsg#imgIndex=5)

意思是获取输入的isoDate字段的前10位，如下图所示为2025-09-04

![Image 6](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatMFXoP9oWWtjYsNLxCZNrkgISolV0EibE1nb17QecE8hXjrnwSm7P1ffdUiaDc1wVocYbias1BA3269Q/640?wx_fmt=png&from=appmsg#imgIndex=6)

右侧选择String is equal to

![Image 7](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatMFXoP9oWWtjYsNLxCZNrkgJ2jhVEC3BKTwdKG7QcdPVFoojsTNhD2PnrnGFrbt66zucD3bt43lpQ/640?wx_fmt=png&from=appmsg#imgIndex=7)

value2填入20250904，意思是我只获取9月4号这一天的记录

![Image 8](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatMFXoP9oWWtjYsNLxCZNrkgXx90BoBuWpsQhmz8ZyzsMeAbts2w1a5iaJtZtVCZe1HS8cKXM6hQzLQ/640?wx_fmt=png&from=appmsg#imgIndex=8)

如果想要获取当前日期的记录，则改为{{ 

DateTime.now().setZone('Asia/Shanghai').toISODate() }}，意思是指定为当前东八区的时间，但这个RSS链接有可能上午9点时当日资讯还未出来，所以9点前会获取到空记录。


接下来可以先执行下工作流，看看输出的数据是什么样的，点击最下方的Excute workflow

![Image 9](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatMFXoP9oWWtjYsNLxCZNrkgYwmkT8HSE1ZWiaoX4t2sZ3l1hw4XfBwnhwhu2e63bHy887DoBIAlolw/640?wx_fmt=png&from=appmsg#imgIndex=9)

执行成功后，工作流会显示绿色打钩状态，If节点的true输出口会显示1 item

![Image 10](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatMFXoP9oWWtjYsNLxCZNrkgNuTpJDY5rEOnBicvwwsEwdp76nIibbxJOCMOcduR3eskQDBZL3w6EquA/640?wx_fmt=png&from=appmsg#imgIndex=10)

双击打开If节点，看右侧的OUTPUT部分，True这里是1条数据，False这里是49条数据，True这里就是我想要的。

![Image 11](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatMFXoP9oWWtjYsNLxCZNrkgaPiccYK4lqjUOomoxqTJFTIMwTtcuoGaLiaJKr16jwWJxiblia59oicptibA/640?wx_fmt=png&from=appmsg#imgIndex=11)

![Image 12](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatMFXoP9oWWtjYsNLxCZNrkgSuM5fWKBxYibJGukM6G9IicbcHfnehXic0bQf8cm1icZJVzGGtyOTrKI7A/640?wx_fmt=png&from=appmsg#imgIndex=12)

再仔细观察下数据，contentSnippet这个字段内容更符合我的需求，就是需要清洗下数据。

在If节点的true出口接入Edit Fields(Set)节点

![Image 13](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatMFXoP9oWWtjYsNLxCZNrkg0axK1xxMIXeLCxMI13hhw9ywXamvnzCiaSsSWAW2Zia3BXcQW1nvqtdw/640?wx_fmt=png&from=appmsg#imgIndex=13)

双击打开Edit节点设置，点击Add Field添加字段

![Image 14](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatMFXoP9oWWtjYsNLxCZNrkghxAXUlIIXdETRxLqgaIhupgN9bibqFcw3eu83bvmSSPnzs7Ya5JQBBA/640?wx_fmt=png&from=appmsg#imgIndex=14)

参考下图设置，分别添加两个字段：

字段1：date，类型选String，={{ $json.isoDate.substring(0, 10) }}

字段2：information（注意选Expression表达式模式），类型选String，={{ $json.contentSnippet.split('\n').slice(1).join(' ').trim() }}

![Image 15](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatMFXoP9oWWtjYsNLxCZNrkgad2w3uMP2nKrZL1OTeM50LV3KbeChZHhEKV3DfrE5aNuWWuZXS7JZg/640?wx_fmt=png&from=appmsg#imgIndex=15)

解释一下：

- $json.contentSnippet: 获取原始的 contentSnippet 字符串。

- .split('\n'): 以“换行符”为分隔，将整个字符串切割成一个数组（列表），每一行是列表中的一项。

- .slice(1): **丢弃**列表中的第一项（也就是“每日AI早报-9/4...”那一行标题）。

- .join(' '): 将剩下的所有项用一个“空格”连接起来，变回一个**单行**的字符串。

- .trim(): 清理掉字符串开头和结尾可能存在的任何多余空格，让结果更干净。

输出的数据是这样的。是我想要的。

![Image 16](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatMFXoP9oWWtjYsNLxCZNrkgMmDic4mo9Y1ibFf9dCKttbYAKwGNFWqTDTwriaC4sVZb7NPAg5QMVu83A/640?wx_fmt=png&from=appmsg#imgIndex=16)

接下来就需要把数据写入到飞书表格了。

②配置飞书表格

打开飞书开放平台（https://open.feishu.cn/），登录后右上角点击开发者后台。

![Image 17](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatPfsBPT76micLo6ogq39bjQZNu2RicDZYLQX1fXoPgOzhUjbNVrDyf86EvU8Lvd1qNp2cRwDmfgFktQ/640?wx_fmt=png&from=appmsg#imgIndex=17)

点击创建企业自建应用

![Image 18](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatPfsBPT76micLo6ogq39bjQZzL6G58AnicouhC2jupQ9s5iaOia7XNyE3miclhlT1Sm1DzLibxSmT6kB5sA/640?wx_fmt=png&from=appmsg#imgIndex=18)

填写应用名称及描述，点击创建

![Image 19](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatPfsBPT76micLo6ogq39bjQZTODg3t18HY8TQBfmbicAokTH4D2rrlmOVW12ZmYPtmhFYHBW9SXptWQ/640?wx_fmt=png&from=appmsg#imgIndex=19)

选择左侧权限管理-开通权限，搜索多维表格，勾选应用身份权限这里的3个权限：“获取/更新/查看、评论、编辑和管理多维表格”，然后点击确认开通权限。

![Image 20](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatPfsBPT76micLo6ogq39bjQZeFvKsAjZQIPQpkVtcbcBGu9NJBMA4TRZGk1Z5AQmPDVHtlXOViaf2xQ/640?wx_fmt=png&from=appmsg#imgIndex=20)

点击左侧版本管理与发布，再点击右侧创建版本

![Image 21](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatPfsBPT76micLo6ogq39bjQZiaB8mVkfd2ZVpOjKLEI4axH6JyH6rd0jyXojibW2wKkhoVcVZvlQB7xg/640?wx_fmt=png&from=appmsg#imgIndex=21)

填写版本号和说明，然后点击保存

![Image 22](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatPfsBPT76micLo6ogq39bjQZq7eF8CKsIZIQ8OujslqkNjjQcBldgL9a1Z82AXgMthcpVU1oF6VkZQ/640?wx_fmt=png&from=appmsg#imgIndex=22)

点击确认发布

![Image 23](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatPfsBPT76micLo6ogq39bjQZKuNdTYvWGNcBvv67cYFic4WjfYAwq7LYfffx3IOmQGBdWGOqOy8Im9w/640?wx_fmt=png&from=appmsg#imgIndex=23)

然后打开凭证与基础信息，就能看到自己的App ID和App Secret了，可以直接复制，后面要用到。

![Image 24](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatPfsBPT76micLo6ogq39bjQZMQUNm0hTjLJQrUke0CJa6DnVOjCghoWCns6iaicmshRGuXzhqXygQd0A/640?wx_fmt=png&from=appmsg#imgIndex=24)

接下来创建飞书数据表

登录电脑版飞书客户端（网页端也行，界面稍有不同），点击云文档-云盘

![Image 25](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatPfsBPT76micLo6ogq39bjQZFKBsaXt28mbY6iaySMRKwuphjlWZ4bEq1D7zexfZdgmop4KbkApwbWQ/640?wx_fmt=png&from=appmsg#imgIndex=25)

选择我的文件夹，右侧点击新建-多维表格

![Image 26](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatPfsBPT76micLo6ogq39bjQZibBWwk0tU6icHathXvuTYpzKichibLqBwhltZnHz67Xl4BoJeibBEu1UFdg/640?wx_fmt=png&from=appmsg#imgIndex=26)

选择新建多维表格

![Image 27](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatPfsBPT76micLo6ogq39bjQZr3oSdjEgjZEpDLvk5CRicaS9u4MwKbYh8sbQNarVrph7FNL9NGycKKg/640?wx_fmt=png&from=appmsg#imgIndex=27)

修改文档名称和数据表名称（一个文档可以有多个数据表）

![Image 28](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatMFXoP9oWWtjYsNLxCZNrkgNenmSn0bRuxQH5zxvib9pKqGy2NtwYNkYqibtdm0TbzSib7BLCcMpDfCQ/640?wx_fmt=png&from=appmsg#imgIndex=28)

接下来，第一列名称改为“资讯”（按默认的文本格式）

![Image 29](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatMFXoP9oWWtjYsNLxCZNrkgDx9CrV51VIE3xlUVsiblzmoXvxykEEv2tZ9xcRTNzUB545fEqgKGzvw/640?wx_fmt=png&from=appmsg#imgIndex=29)

第二列“单选”列删除，第三列“日期”列，点击下拉箭头

![Image 30](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatMFXoP9oWWtjYsNLxCZNrkgBD0EAIoqTYsghNPz79h39dqpMH75WWIHuCPJQYWqfArLRpKqRibOHLg/640?wx_fmt=png&from=appmsg#imgIndex=30)

选择修改字段列

![Image 31](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatMFXoP9oWWtjYsNLxCZNrkgJiaTYCiaUqTxXeDbBoAW0ObMbz1t2KWwrMbwfRC5RPTDER4UXwozKgnw/640?wx_fmt=png&from=appmsg#imgIndex=31)

类型改为文本

![Image 32](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatMFXoP9oWWtjYsNLxCZNrkgER9HgePkEOIm4ZD2wUAzMoYpymnZomsO7h4lagxCauibFBGdDpzQaxQ/640?wx_fmt=png&from=appmsg#imgIndex=32)

最后一列标题改为创建时间，字段类型改为创建时间（这样表格每新增一条记录，会自动显示添加时间）

![Image 33](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatMFXoP9oWWtjYsNLxCZNrkgBQmaxlsUneAjpU3rIkdIh83fvX0srLX8N4lwhItcYTHpyic0RZibibEWA/640?wx_fmt=png&from=appmsg#imgIndex=33)

点击“...”-更多-添加文档应用

![Image 34](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatMFXoP9oWWtjYsNLxCZNrkguD6SViasb5tGyLuFdDdicg5wew68A6ACibHMaQ7ibTzSVZS4XCiaick2Kueg/640?wx_fmt=png&from=appmsg#imgIndex=34)

搜索n8n，点击创建的应用

![Image 35](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatMFXoP9oWWtjYsNLxCZNrkgVYpJLsDf4njzgqVu31R9lVezqrrgsWNIv1UolxCK53mVdcc0VagsUg/640?wx_fmt=png&from=appmsg#imgIndex=35)

选择可编辑，点添加，显示添加应用成功。

![Image 36](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatMFXoP9oWWtjYsNLxCZNrkgLCWlrmwK782RjSicDSRJniaUJS5H1ibkORJgakbku8RlCsC9BeRSe6p3A/640?wx_fmt=png&from=appmsg#imgIndex=36)

③配置n8n中的飞书节点并测试运行

Edit Fields节点点击加号，搜索feishu，如果没出现飞书节点，需要自行添加，详见[n8n保姆级入门！一起来熟悉下n8n界面及常用节点](https://mp.weixin.qq.com/s?__biz=Mzg5ODU1NjQ3MA==&mid=2247485065&idx=1&sn=4df0efabc0eed420ae0c6e8d64aa6621&scene=21#wechat_redirect)的二⑨社区节点部分。

![Image 37](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatMFXoP9oWWtjYsNLxCZNrkggTQK1QicyTQ7qFXWYnLAZasl8ibBV3gatkMc5JEhcqbbpbpkMOr9Ew9A/640?wx_fmt=png&from=appmsg#imgIndex=37)

继续点击Feishu Node，会展开一系列节点，选择“多维表格 新增记录”。

![Image 38](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatMFXoP9oWWtjYsNLxCZNrkgia3rzsezCv8vziaugdYXicxQ16I1Ojwic2UQMYmjPLLRXicZBsOkuB5S0IQ/640?wx_fmt=png&from=appmsg#imgIndex=38)

Credential to connect with这里选择Create new

![Image 39](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatMFXoP9oWWtjYsNLxCZNrkgTsdcGQflnib3rG310hHrMqe0CicAYicO8stz9FTA5vtVgm4l3XYRMFsAQ/640?wx_fmt=png&from=appmsg#imgIndex=39)

填入Appid和AppSecret，就是飞书开放平台刚配置好的应用凭证。

![Image 40](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatMFXoP9oWWtjYsNLxCZNrkgkxS5L3ibfPWZrYjbkpMPWd3eicrDgqUKTN7P9gic05umDTycxXEEfFqNQ/640?wx_fmt=png&from=appmsg#imgIndex=40)

![Image 41](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatMFXoP9oWWtjYsNLxCZNrkgibFpof0uyHmsWcFQYfRdwXkoUeUBQcRgQUiapCwxd8r5zULp00SmwPpw/640?wx_fmt=png&from=appmsg#imgIndex=41)

如果AppSecret点不了，可以鼠标悬浮，点击右侧Expression和Fixed切换下就可以输入了（选择Fixed），记得点击右上方Save。显示连接成功。

![Image 42](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatMFXoP9oWWtjYsNLxCZNrkgYYt8kcrAuZlHl3B05YOCTOL5iaEawmjh2uEbKKS4Ao3J6r7dE5OybAg/640?wx_fmt=png&from=appmsg#imgIndex=42)

回到飞书节点，Resource选择多维表格，Operation选择新增记录，需要填写多维表格Token和ID。

![Image 43](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatMFXoP9oWWtjYsNLxCZNrkg5OVDONR8BS89Pl7Rk8WUJop7dKkIuK95Z5fbFPubbzTyYHoD1lia3Zg/640?wx_fmt=png&from=appmsg#imgIndex=43)

回到飞书多维表格，如果是电脑客户端，点开右上角浏览器图标，可在浏览器打开页面

![Image 44](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatMFXoP9oWWtjYsNLxCZNrkgCIdLmfSYFKrrK4z3WYRUNCaypxCqUU4lljjSFF66U99ibuQ40oicCNgw/640?wx_fmt=png&from=appmsg#imgIndex=44)

如下图，“base/”和“?table”之间的是Token，“table=”和“&view”之间的是ID

![Image 45](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatMFXoP9oWWtjYsNLxCZNrkgs6CHrJs1lRwAVRI7Lhic10I2jzCQ4t87aK907pNA8FZsUWurJyq0nhQ/640?wx_fmt=png&from=appmsg#imgIndex=45)

填入Token、ID和请求体JSON

![Image 46](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatMFXoP9oWWtjYsNLxCZNrkgJAUicd1Y2ianIKjKFou8bfrmTfT7DrVnJ4trE6AntPpjv5mib6kl9UHcg/640?wx_fmt=png&from=appmsg#imgIndex=46)

```Plain Text
{"fields": {
    "资讯": "{{ $json.information}}",
    "日期": "{{ $json.date}}"}
}
```

这样就配置完成了。执行工作流试下，点击Execute workflow

![Image 47](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatMFXoP9oWWtjYsNLxCZNrkgbBFQqpZkQQIopu5ld6Tj5Lnv6T050kpZD5lMiaPItUxhDOOzkNVAVPA/640?wx_fmt=png&from=appmsg#imgIndex=47)

可以看到所有节点都是绿色打钩状态，说明运行正常。

![Image 48](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatMFXoP9oWWtjYsNLxCZNrkgmpmHmY5WvYLNgXDfN8xzyJOibYAGxLh4QGcz1FoDQmo5NB8bLlbIuqQ/640?wx_fmt=png&from=appmsg#imgIndex=48)

打开飞书节点，输入输出正常（左侧为输入数据，右侧为输出数据）。

![Image 49](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatMFXoP9oWWtjYsNLxCZNrkglhSicN6LcqLU5xv5wqoicwibcwBcnbf8R9I3vnFFEaVaj1ePwq13GDe1g/640?wx_fmt=png&from=appmsg#imgIndex=49)

来到多维表格看下，数据被添加到了最后一行

![Image 50](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatMFXoP9oWWtjYsNLxCZNrkgQfY3vDGicrN1qtFrRNkrTY7Afa4ypbv0LQDRPI3w55ws2WUGc6n1Dxw/640?wx_fmt=png&from=appmsg#imgIndex=50)

但是我想把每次添加的数据显示到第一行，怎么办？也简单，创建时间这 列选择按9到0排序

![Image 51](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatMFXoP9oWWtjYsNLxCZNrkg5Cw2DmMPiahg0WLJwsSFicDfMdFou7Yghdmp5LZ170V2BORqsZbgWXmA/640?wx_fmt=png&from=appmsg#imgIndex=51)

点击保存

![Image 52](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatMFXoP9oWWtjYsNLxCZNrkg8gxXgPicVhygGy7jIZyHrFpyxN8FBQGAo4hjNPZpLSRz6HTEtK8TVrg/640?wx_fmt=png&from=appmsg#imgIndex=52)

再测试下，我把If节点的日期改为9月5号，再次执行工作流，搞定！

![Image 53](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatMFXoP9oWWtjYsNLxCZNrkgNibfibys7nrh4o49fEaw2Y0quLHqvPmhKbbyv3OnHBXAhQu3qB9wtjfQ/640?wx_fmt=png&from=appmsg#imgIndex=53)

④定期执行工作流

假设我想定时执行工作流，可以将第一个Manual Trigger（点击触发器）节点删除，换成Schedule Trigger（定时触发器）节点

![Image 54](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatMFXoP9oWWtjYsNLxCZNrkgSpZpaqnBStbmzQsdQzBfcUbYeTl2fzyPoxQySlbSazlmdLgGkjRXVA/640?wx_fmt=png&from=appmsg#imgIndex=54)

打开节点设置，可以选择触发时间单位是分钟还是天

![Image 55](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatMFXoP9oWWtjYsNLxCZNrkgAN3aO2F0DvH39zQx4skbiaNklIeCpO25eODib4Mz5GZbdSRDrcWSBJPQ/640?wx_fmt=png&from=appmsg#imgIndex=55)

先配置每隔2分钟触发一次测试下，保存工作流。

![Image 56](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatMFXoP9oWWtjYsNLxCZNrkgLp7UKCCxzIHFu298wcFwd0Zgjod2LDEHDNicyJRJ2wTQDr9ibgwfmrqg/640?wx_fmt=png&from=appmsg#imgIndex=56)

然后把工作流改为活动状态（默认为非活动），点击下图所示

![Image 57](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatMFXoP9oWWtjYsNLxCZNrkgolicOtvcMicncSPPzdVDhzNQXGV4icwC91gQ8RSxyibD9taohLtjickaoNg/640?wx_fmt=png&from=appmsg#imgIndex=57)

勾选Don，点击Got it

![Image 58](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatMFXoP9oWWtjYsNLxCZNrkghiaiagwqZtE6yWuAia2UcCstWdpqzkr9oUiaicluHOmAShTYMLvALKOu61g/640?wx_fmt=png&from=appmsg#imgIndex=58)

工作流状态变更为Active（活动状态）

![Image 59](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatMFXoP9oWWtjYsNLxCZNrkg1lfqeDYdukVpak8OJ41v880WSUSAPcwx0kOnq1MCOyKNgPxdahBBIg/640?wx_fmt=png&from=appmsg#imgIndex=59)

等几分钟看下飞书表格，可以看到数据定时写进来了。

![Image 60](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatMFXoP9oWWtjYsNLxCZNrkgLFhXrR81D0wsDiavXvbwheg7MEAjlTMZLMxmYicy3XYYr4biaBP4pDL1w/640?wx_fmt=png&from=appmsg#imgIndex=60)

如果想每天固定时间获取当日资讯，可以修改定时节点参数如下，意思是每天上午10点触发工作流（不过在本例中，给出的RSS链接可能到中午12点后才有当日资讯，所以可能导致触发时没有数据，可以调整时间点）

![Image 61](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatMFXoP9oWWtjYsNLxCZNrkgIvR9RQRTJcD8qkDjlj8Lu9T3JMB2iaglxCf2dC7MwjyS86XlwZWNiaDg/640?wx_fmt=png&from=appmsg#imgIndex=61)

If节点的value2改为Expression模式，填写{{ DateTime.now().setZone('Asia/Shanghai').toISODate() }}，意思是获取当日日期，注意末尾不要出现空格，否则会匹配不上。

![Image 62](https://mmbiz.qpic.cn/mmbiz_png/Y6SAzWmciatMFXoP9oWWtjYsNLxCZNrkg5HaD7qkgsMwRQ3lXicN8qzgBbWaVt7YibIYdRMKYLP7LfUmPnXv95xCA/640?wx_fmt=png&from=appmsg#imgIndex=62)

点击保存就可以啦。

好了，今天的内容就到这里，觉得对你有用的话，别忘了点赞、收藏、关注！我们下期见！

