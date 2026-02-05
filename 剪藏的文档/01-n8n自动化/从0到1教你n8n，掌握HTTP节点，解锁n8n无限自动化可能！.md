---

title: 从0到1教你n8n，掌握HTTP节点，解锁n8n无限自动化可能！
date: 2025-10-19
tags: ["n8n", "工作流", "自动化", "工作流自动化"]
category: 自动化工具
---


# 从0到1教你n8n，掌握HTTP节点，解锁n8n无限自动化可能！

Original 流星 [流星自动化](javascript:void(0);)*2025年10月19日 12:01* *上海*

## 为什么要学 HTTP 节点？

日常数据获取需求几乎都能通过它实现，无论是实时天气、动态股票行情，还是最新新闻资讯，都可借助 HTTP 请求快速抓取。在技术应用层面，调用各类 AI 模型接口也离不开它，为自动化工作流注入智能能力。更关键的是，面对没有现成官方节点的小众平台或定制化服务，HTTP 节点能直接建立连接，填补官方节点的覆盖空白。

掌握 HTTP 节点意味着彻底摆脱官方节点的束缚，实现个性化的工作流搭建。无论是企业对接内部系统，还是个人整合小众工具，都能通过灵活配置 HTTP 请求达成目标，极大提升 n8n 的适用范围与使用价值，成为高效运用 n8n 的必备技能。

## HTTP节点介绍

![Image](https://mmbiz.qpic.cn/mmbiz_png/0SDKHiarmmYVkWpWmvcCzsn1NQVcHeNZDno9Hq5rKD6dLR0rIQausEagib5iasyPVNGEXia5a4ydO0Fd328Libts8BQ/640?wx_fmt=png#imgIndex=0)

- Method:常见两种：POST、GET

![Image 1](https://mmbiz.qpic.cn/mmbiz_png/0SDKHiarmmYVkWpWmvcCzsn1NQVcHeNZD9YdSsbcPvnEwqOfOmJib0miczbzkgpLeHVSc8yIb5lk2vy8AjgtAH4KA/640?wx_fmt=png#imgIndex=1)

**GET**： 请求就像 “去问东西”。比如你想知道今天的天气，用 GET 向天气网站 “要” 数据就行 —— 只拿结果，不改动网站里的内容。就像去便利店问 “有没有矿泉水”，店员告诉你有，你只是获取信息，货架上的水没变化，适合单纯要数据的场景。

**POST**： 请求更像 “交东西” 或 “让办事”。比如你填了个订单表点提交，就是用 POST 把信息发给服务器，让它处理可能会改服务器里的数据，比如库存变少。就像寄快递时填单交给快递点，对方会按单记录发货，适合需要提交数据、让对方处理的情况。

- URL: 请求地址

- Authentication：

![Image 2](https://mmbiz.qpic.cn/mmbiz_png/0SDKHiarmmYVkWpWmvcCzsn1NQVcHeNZDJ3ugtDXF8vHs4wpuwyhnJuaanFPQZGXBm5G7TLo3E23rYGjsVBRDbQ/640?wx_fmt=png#imgIndex=2)

**NONE**:

**预设凭证(Predefined Credential Type)**:针对常见平台（如 GitHub）提前配好基础信息，用的时候直接选，不用自己填一堆细节，省事儿

**通用凭证(Generic Credential Type)**:像 “万能钥匙坯”，啥平台都能用，但得自己填账号、密码等信息，灵活应对没预设的平台，就是得多动手设

- 参数：Query / Headers / Body

**Query**：像点外卖时备注 “少辣”，是跟请求一起发的小参数，写在网址后面，告诉对方具体要什么细节，让返回结果更精准。

**Headers**： 像快递单上的 “易碎品” 标签，是请求带的附加说明，告诉服务器 “我要 JSON 格式” 这类信息，让双方沟通更顺畅。

**Body**：像信封里的信纸，是 POST 请求时发的主要内容，比如填的表单信息，把详细数据传给对方，适合需要提交大量内容的情况。

## GET请求调用公开 API获取天气

- 流程

![Image 3](https://mmbiz.qpic.cn/mmbiz_png/0SDKHiarmmYVkWpWmvcCzsn1NQVcHeNZDyRnTZxjyqwkTQU7x5Xm6I3WvmpEVpDcgy1wksiaLFFXOQoAGyQKic3ibg/640?wx_fmt=png#imgIndex=3)

- 步骤

1. 新建工作流，添加 HTTP Request 节点。

2. 配置：

**•** Method：GET

**•** URL：https://api.open-meteo.com/v1/forecast?latitude=31.14&longitude=121.29&current_weather=true

**（这里的经纬度是上海，可替换成任何城市）**

1. 执行后会看到返回的 JSON，里面包含当前温度、风速等。

- 输出 用 Set 节点提取 current_weather.temperature 字段，改名为 “当前气温”。

![Image 4](https://mmbiz.qpic.cn/mmbiz_png/0SDKHiarmmYVkWpWmvcCzsn1NQVcHeNZDBAhqjDW966vbaFpoCxib3RSsX2bYk9WptbWhZ0pPgoP8LWvnH9qptwg/640?wx_fmt=png#imgIndex=4)

## POST请求提交数据

- 流程

![Image 5](https://mmbiz.qpic.cn/mmbiz_png/0SDKHiarmmYVkWpWmvcCzsn1NQVcHeNZDGnHpNY5CqPncd98ufEwuI8YjymMezyBvKUX1CiaU0qibZrliaibzmE8Pvg/640?wx_fmt=png#imgIndex=5)

- 步骤

1. 新建工作流，添加 HTTP Request 节点。

2. 配置：

**•** Method：POST

**•** URL：https://jsonplaceholder.typicode.com/posts

**•** Body:

```Plain Text
{
  "title": "这是一条n8n消息",
  "body":"body",
  "userId":"001"
}
```

![Image 6](https://mmbiz.qpic.cn/mmbiz_png/0SDKHiarmmYVkWpWmvcCzsn1NQVcHeNZDNzT0qeFicXD0Kmddc8vqfnl9Ut8kDnQDMqRstr6FesSnXZcKpicMO4eA/640?wx_fmt=png#imgIndex=6)

- 输出

你会看到刚刚提交的数据被“回显”出来，还会多一个 id

![Image 7](https://mmbiz.qpic.cn/mmbiz_png/0SDKHiarmmYVkWpWmvcCzsn1NQVcHeNZD295uIGbxoprkHosp6uy8QQo5KMTen2BgYqtc26xXQciabOzLVicfLO1w/640?wx_fmt=png#imgIndex=7)

朋友，我创建了 【从0教你n8n的学习群】，点击下方公众号名片，添加好友，备注“学习n8n”。




