---

title: 一句话让 AI 自动生成短视频：用 n8n 打造 YouTube 自动发布系统
date: 2025-10-22
tags: ["n8n", "工作流", "自动化", "AI", "人工智能", "智能体", "Agent", "视频", "短视频", "YouTube", "工作流自动化"]
category: 自动化工具
---


# 一句话让 AI 自动生成短视频：用 n8n 打造 YouTube 自动发布系统

Original 骄阳 [骄阳AI成长记录](javascript:void(0);)*2025年10月22日 22:02* *广东*

不再手动上传，只要输入创意，n8n 帮你自动生成和发布视频。

[#AI](javascript:;) [#自动化](javascript:;) [#n8n](javascript:;) [#YouTube](javascript:;) [#Sora2](javascript:;) [#Claude](javascript:;)

如果你也曾想过：“能不能用 AI 自动生成视频，然后直接发布到 YouTube？”——这篇文章就是为你写的。




最近，我用 n8n、Claude 和 Sora-2 搭建了一个完整的自动化工作流：从输入一个创意开始(手动)，到生成视频、添加标题描述，再自动上传到 YouTube，全程无人值守。




本文会完整讲解整个系统的实现过程、技术细节、常见坑点，以及它的实际应用价值。

---

## 一、为什么要做这个自动化？

AI 视频生成越来越普及，但手动发布依然耗时：

- 每次都要想标题、写描述、加标签。

- YouTube 上传页面填写信息多，流程繁琐。

- 想批量测试不同风格的视频，效率低。

最近Sora-2不是很火嘛，于是我想，如果这些操作能交给自动化工具处理，那就能把精力集中在创意本身。




于是，便有了这个项目：用 n8n 搭建一个自动生成并发布视频的工作流。

目标很明确：

1. 1. 自动生成视频内容（通过 Claude + Sora-2）

2. 2. 自动上传到 YouTube（通过 API）

3. 3. 减少重复操作，实现“输入一句话 ➡️ 自动产出视频 ➡️ 自动发布YouTube”

---

## 二、工作流总体设计

整个系统基于 n8n 实现，核心流程如下：

```Plain Text
💬 聊天输入界面
    ↓
🤖 AI生成内容（Claude）
    ↓  
📝 解析AI响应
    ↓
🎬 生成视频（Sora-2）
    ↓
⏳ 检查生成状态 ──未完成→ ⏰ 等待重试 ──┐
    ↓完成                              │
📥 下载视频文件 ←───────────────────────┘
    ↓
📤 上传到YouTube
```

最终工作流流程图：

![Image](https://mmbiz.qpic.cn/mmbiz_png/aicUgIKATbcEgSlUHYMp4HsggicZECog6FibPnNP1PRjvfWfEAbUosibQU4eiaqAnMssgxOg89Sw5HWHtgHCMthAKCA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=0)

实现效果：

- 输入一句话，例如 “一只金渐层猫咪在追着红色激光点上蹿下跳”。

- 使用https://api.aicso.top/ 接口平台的Claude模型生成提示词、标题、描述、标签。

- 使用https://api.aicso.top/ 接口平台的Sora-2模型生成视频。

- 自动上传到 YouTube，设置标题、文案、区域、标签。

只要输入一句话，就会自动生成视频和发布。

实际耗时：

- 手动操作：15-30分钟（同使用Sora-2制作视频和下载视频）

- 自动流程：输入创意后不到 6 分钟（等待视频生成约 2-5 分钟）

单条视频成本：

单条视频成本约 ¥0.0595~0.096 元：

- Claude API：¥0.01~0.03

- Sora-2 API(限时特价)：¥0.0495~0.066

- n8n：免费（Github注册满180天用户，ClawCloud每月赠送5美刀，一个月的费用都没有5刀，基本够了）

- YouTube API：免费

一条视频的费用约等于无了，可以尽情造。

---

## 三、具体搭建步骤

### 3.1、第一步：准备环境

所需工具和账号：

1. 1. n8n（推荐 ClawCloud，有公网访问）

2. 2. Claude/Sora-2 API 密钥（在https://api.aicso.top/ 创建令牌，claude和Sora-2可以创建不同的分组，claude创建默认分组，Sora-2创建限时特价分组，¥0.0495一个10秒视频）

3. 3. Google Cloud 项目（启用 YouTube Data API v3，这里不会细讲创建项目，主要讲权限配置和应用发布）

4. 4. YouTube 账户（绑定 OAuth2）

⚠️ 注意：YouTube OAuth 认证不支持 localhost。必须部署在有公网域名的服务器上，或者使用ngrok、frp等反向代理，本文主要是讲解在ClawCloud部署的n8n。

推荐部署方式：

- ClawCloud 部署的n8n：GitHub 180天及以上的用户每月有5刀的额度，每天0.14刀，一个月0.14*30=4.2够用了。

- 海外云服务器 npmjs 部署：需绑定域名并配置 SSL。

### 3.2、第二步：创建工作流

#### 3.2.1、创建新工作流

1、打开 n8n 控制台 → 新建工作流「Create Workflow」：

![Image 1](https://mmbiz.qpic.cn/mmbiz_png/aicUgIKATbcEgSlUHYMp4HsggicZECog6FRAo4MvljicNXazicEZbD3XiaEX4BVXqbd0iakHmrZdrVibIwDYibgicFqOSRA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=1)

2、在顶部给工作流命名，例如「YouTube视频自动发布2」，因为我已经存在了，所以加了个2区分：

![Image 2](https://mmbiz.qpic.cn/mmbiz_png/aicUgIKATbcEgSlUHYMp4HsggicZECog6F67DNka0SQCjgdNvYsM999uTibbeXuWERVYCHwhStXptRqdBRVrcp0xw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=2)

#### 3.2.2、添加节点1：Chat Trigger（聊天触发器）

1、点击「Add first step...」，在弹出窗口输入选择「On chat message」：

![Image 3](https://mmbiz.qpic.cn/mmbiz_png/aicUgIKATbcEgSlUHYMp4HsggicZECog6FHcmMgibJKy7Zpkk6NGwcjZvowFSG0Uzdau4DM06ZCkIhmTurlRrlF6w/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=3)

2、启用「Make Chat Publicly Available」，在「Initial Message(s)」输入「请输入要生成的视频主题、内容~」：

![Image 4](https://mmbiz.qpic.cn/mmbiz_png/aicUgIKATbcEgSlUHYMp4HsggicZECog6FblYIcj1QricJgbKvTdKice4M1y7qfL7e3qg8L5THbt3r6V6Pg0daEib6w/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=4)

#### 3.2.3、添加节点2：AI生成视频信息（HTTP Request）

1、点击 「When chat message received」 节点右侧的「+」，搜索「HTTP Request」并点击，修改名称为「AI生成视频信息」：

![Image 5](https://mmbiz.qpic.cn/mmbiz_png/aicUgIKATbcEgSlUHYMp4HsggicZECog6FITRTRpQibJPYsx5ibt8eYvOPrmCcoN3mAhVXSWvFFOay15Okb8hKoibLw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=5)

![Image 6](https://mmbiz.qpic.cn/mmbiz_png/aicUgIKATbcEgSlUHYMp4HsggicZECog6FEsh2RjUZTAaNXssKW8bpmIsAQgrRhIql6iaqVOszwTEDdq3sc4hWZTw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=6)

2、配置节点：

Method：POST

URL：https://api.aicso.top/v1/chat/completions

Authentication：None（我们手动在 Headers 中配置）

Headers：

- 点击「Add Header」

- Name: Authorization

- Value: Bearer 你的API密钥（注意 Bearer 后有空格）

- 再添加一个(可以不加)：Name: Content-Type，Value: application/json

![Image 7](https://mmbiz.qpic.cn/mmbiz_png/aicUgIKATbcEgSlUHYMp4HsggicZECog6Fvp3yyM18NQB3QbdUxOqLtXLBW84bPCe7pwiaDlPvqcAXbkMNHomx0LA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=7)

Body：

```Plain Text
{
  "model": "claude-sonnet-4-5-20250929",
  "messages": [
    {
      "role": "system",
      "content": "你是一个专业的视频创作助手。根据用户输入，生成适合YouTube Shorts的视频提示词、标题、描述和话题，输出内容必须是英文，简洁直白。输出格式必须是JSON: {\"prompt\":\"视频提示词\",\"title\":\"标题含#话题\",\"content\":\"内容含#话题\",\"tags\":\"#话题\"}"
    },
    {
      "role": "user",
      "content": "{{ $json.chatInput.trim() }}"
    }
  ],
  "temperature": 0.7
}
```

![Image 8](https://mmbiz.qpic.cn/mmbiz_png/aicUgIKATbcEgSlUHYMp4HsggicZECog6F459S9GGVpgnWQZaHYdpULp1WXpooRAPKA6Xnrcoflo3PWCWDXabgHA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=8)

#### 3.2.4、添加节点3：解析AI响应（Code）

1、点击上一个节点右侧的「+」，搜索「Code」，点击「Code」，选择「Code in JavaScript」：

![Image 9](https://mmbiz.qpic.cn/mmbiz_png/aicUgIKATbcEgSlUHYMp4HsggicZECog6FFcBgsNCq0csxj0XdSVJNibY0zhWVZdfcf3YsoDudrDp7exhzDbXxP0A/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=9)

![Image 10](https://mmbiz.qpic.cn/mmbiz_png/aicUgIKATbcEgSlUHYMp4HsggicZECog6Fbeic3SDIWgQcWfC6LZly4mdicdaxMLonEpOztNtww78z6OysNgt1k8AQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=10)

2、设置节点名称为「解析AI响应」：

![Image 11](https://mmbiz.qpic.cn/mmbiz_png/aicUgIKATbcEgSlUHYMp4HsggicZECog6FTXyTM8pEAyd1oZmib5zQuvyWZVwtiblEtmR6tmLZqVZAHBp0Ensclic0g/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=11)

3、添加下面代码：

```Plain Text
// 解析AI返回的JSON
const aiResponse = $input.item.json;
const content = JSON.parse(aiResponse.choices[0].message.content);

return {
  json: {
    prompt: content.prompt,
    title: content.title,
    content: content.content    ,
    tags: content.tags
  }
};
```

![Image 12](https://mmbiz.qpic.cn/mmbiz_png/aicUgIKATbcEgSlUHYMp4HsggicZECog6FTiaHhP6sO0VLeibPGwJy3P6S0jhqFYpddEmvfoGlPBJiaz76XibQLWUPww/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=12)

#### 3.2.5、添加节点4：生成视频（Sora-2）

1、点击上一个节点右侧的「+」，搜索「http」，选择「HTTP Request」节点，修改节点名称为「生成视频（Sora-2）」：

![Image 13](https://mmbiz.qpic.cn/mmbiz_png/aicUgIKATbcEgSlUHYMp4HsggicZECog6FdVicU7WWlzkX0iarapKb65IKbkekKcbKAPq0geQCppsYDWTS3hh69Vvw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=13)

![Image 14](https://mmbiz.qpic.cn/mmbiz_png/aicUgIKATbcEgSlUHYMp4HsggicZECog6FIAZJhuVEiazicgw7spwxRXLVLvJicP5jUdNh6YlhfNaPtbfxS8Utu012w/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=14)

2、配置节点：

Method：POST

URL：https://api.aicso.top/v1/chat/completions

Authentication：None

Headers：

- Name: Authorization，Value: Bearer 你的API密钥

- Name: Content-Type，Value: application/json 可不配置

![Image 15](https://mmbiz.qpic.cn/mmbiz_png/aicUgIKATbcEgSlUHYMp4HsggicZECog6FR20pSDEjH2hFXibibFedPHviaErZAxjcSrUoL1Up2O7mEUgA6R3cMuCkA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=15)

Body（JSON）：

```Plain Text
{
  "model":"sora-2-portrait",
"messages":[
    {
      "role":"user",
      "content":[
        {
          "type":"text",
          "text":"{{ $json.prompt }}"
        }
      ]
    }
]
}
```

Options → Timeout：600000（10分钟）

![Image 16](https://mmbiz.qpic.cn/mmbiz_png/aicUgIKATbcEgSlUHYMp4HsggicZECog6FlkGLgFQUBKkIpeSEpNJ85ZfdpEia4C10tvIuvbIZxg6tq6l9a6XFSyA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=16)

#### 3.2.6、添加节点5：检查视频状态（IF）

1、添加节点，点击上一个节点右侧的「+」，搜索「IF」，选择「IF」节点，修改节点名称为「检查视频状态」：

![Image 17](https://mmbiz.qpic.cn/mmbiz_png/aicUgIKATbcEgSlUHYMp4HsggicZECog6Fjq75DFNFzFZlcrdccNl8y00uibEjRzrRxlOMcQL5ic2n5UVcoGmDTyfg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=17)

![Image 18](https://mmbiz.qpic.cn/mmbiz_png/aicUgIKATbcEgSlUHYMp4HsggicZECog6FlTyicmM2RoAL5ujmQkTAtQibRFyMWdtczpfJh7orDN8eAmibicicK1icL61g/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=18)

2、配置节点：

Conditions：

- Value 1: {{ $json.choices[0].message.content }}

- Operation: contains

- Value 2: [download video](https://

![Image 19](https://mmbiz.qpic.cn/mmbiz_png/aicUgIKATbcEgSlUHYMp4HsggicZECog6FLQGGvonsHzl5HiaAqO6kTpD9urazuoOoZ2BTVR0Ce6tOyOlDOBmC4MA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=19)

这个节点会有两个输出：

- true：视频生成完成，连接到下一个「HTTP Request」节点下载视频

- false：视频未完成，连接到「Wait」节点等待，「Wait」节点又连接到「生成视频（Sora-2）」节点，其实只要「生成视频（Sora-2）」开启了重试就可以不用这个节点了。

#### 3.2.7、添加节点6：Wait（等待节点）

1、添加节点，点击 IF 节点下方的「false」输出端，搜索「Wait」，选择「Wait」节点：

![Image 20](https://mmbiz.qpic.cn/mmbiz_png/aicUgIKATbcEgSlUHYMp4HsggicZECog6Fx7iaJDOHkicODF5BeiaoNYF46YR439lf2SwlSedic57DnY4P65b2lyhw2Q/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=20)

![Image 21](https://mmbiz.qpic.cn/mmbiz_png/aicUgIKATbcEgSlUHYMp4HsggicZECog6FNUFVX2UbAicugupE8AiatBb2QGGfJtWx79vz6SFtdSZ52Lkval5nfibmQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=21)

节点使用默认配置即可，然后点击 Wait 节点右侧的「+」,连接到「生成视频（Sora-2）」节点前面形成循环。

#### 3.2.8、添加节点7：下载视频（HTTP Request）

1、添加节点，点击 IF 节点的「true」输出端，搜索「http」，选择「HTTP Request」节点，修改节点名称为「下载视频」：

![Image 22](https://mmbiz.qpic.cn/mmbiz_png/aicUgIKATbcEgSlUHYMp4HsggicZECog6F4zER88Dej0tHO5sm19FEDRskplzJcIcCZetvTmLicuiaAFdssr6HTqJg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=22)

![Image 23](https://mmbiz.qpic.cn/mmbiz_png/aicUgIKATbcEgSlUHYMp4HsggicZECog6FWIicEqAOrLL7mbQ3Ru9uWvYm45FVQPztVoJbblfJGSibvISs9mwTYYlg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=23)

2、配置节点：

Method：GET

URL：使用表达式提取视频链接

```Plain Text
{{ $json.choices[0].message.content.match("(https://.*mp4)")[0] }}
```

Response Format：File

Put Output in Field：videoData（视频数据存储的属性名）

![Image 24](https://mmbiz.qpic.cn/mmbiz_png/aicUgIKATbcEgSlUHYMp4HsggicZECog6FWGcT1EGaAmZdd1o6hXMZJmpkS59aicSMkcdDxD8vJiaw7XbDsyH0ywXQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=24)

#### 3.2.9、添加节点8：上传到YouTube

1、添加节点，点击上一个节点右侧的「+」，搜索「YouTube」，点击「YouTube」，选择「Upload a video」节点，修改节点名称为「上传到YouTube」：

![Image 25](https://mmbiz.qpic.cn/mmbiz_png/aicUgIKATbcEgSlUHYMp4HsggicZECog6FLS9gYS9ibERmjHJpWibh6jp8dKOU9YUnu4Jiah0XMcsTHYxDBwLSwNQtw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=25)

![Image 26](https://mmbiz.qpic.cn/mmbiz_png/aicUgIKATbcEgSlUHYMp4HsggicZECog6FB41br5ibFy9mqwC0u8XA6gRoThutrb4tdNwh2uiavaMNRprB5S8Z6eZg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=26)

![Image 27](https://mmbiz.qpic.cn/mmbiz_png/aicUgIKATbcEgSlUHYMp4HsggicZECog6FAiaBomk9P6Zth52Q3OzawNLS27gUdQUD2e1DjzyBNohskIanpTW397g/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=27)

2、配置节点：

Credential to connect with：待配置（下一步说明）

Resource：Video

Operation：Upload

Title：{{ $('解析AI响应').item.json.title }}

Category ID：1（Film & Animation）

Description：{{ $('解析AI响应').item.json.content }}

Tags：{{ $('解析AI响应').item.json.tags }}

Region Code：United States of America(the)-US

Input Binary Field：videoData

![Image 28](https://mmbiz.qpic.cn/mmbiz_png/aicUgIKATbcEgSlUHYMp4HsggicZECog6FwYYpuHu3icDhZA1M1xofDxK2GFgbGUznsIR6GW7UdKwPvicRX6Oibnj8Q/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=28)

![Image 29](https://mmbiz.qpic.cn/mmbiz_png/aicUgIKATbcEgSlUHYMp4HsggicZECog6FWQ9XouyAibx8c23DO5lqWrkYGbaWmBSaPvZbISww4rE3RcmibzP1vic6w/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=29)

![Image 30](https://mmbiz.qpic.cn/mmbiz_png/aicUgIKATbcEgSlUHYMp4HsggicZECog6FUu5l7VIDynibhaj4Ixwic8fiaiaUuN6vicjhia2iat0QwnoZd5kFR7GibfCR5g/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=30)

设置好后我们就开始YouTube凭证配置这个坑点了。

### 3.3、第三步：配置密钥与凭证

#### 3.3.1、Claude / Sora-2 API

1、访问「https://api.aicso.top/console/token」创建令牌，如未注册，可以点我的邀请链接注册「https://api.aicso.top/register?aff=yzLp」，点击添加令牌创建2个令牌，Claude模型的是「default」默认分组的，Sora2模型的是「限时特价」分组的：

![Image 31](https://mmbiz.qpic.cn/mmbiz_png/aicUgIKATbcEgSlUHYMp4HsggicZECog6FR9nJiasuFHEOXCDlXcV3yK2rQQuJkBOjZKv8kJiakV6j8CkciakZCcqwA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=31)

![Image 32](https://mmbiz.qpic.cn/mmbiz_png/aicUgIKATbcEgSlUHYMp4HsggicZECog6FAOOr9OHM1VibjHqSOekKe2Fkytqfpic01zaFSvJo2PTgmJLVXJkmhgtw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=32)

![Image 33](https://mmbiz.qpic.cn/mmbiz_png/aicUgIKATbcEgSlUHYMp4HsggicZECog6FazeTIRYhc06X3lCCVdLp3X7MG4vhwjOvAQjYJL6vEYsPnhUvasMKPA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=33)

创建好后复制令牌粘贴到对应节点的「Authorization」参数值的「Bearer」后面即可，「Bearer」右边记得要加个空格。




#### 3.3.2、YouTube OAuth2 认证

⚠️ 重要提示：YouTube 凭证配置是整个流程中最容易踩坑的环节，请仔细阅读！

根据 N8N 官方文档，YouTube 节点：

- ✅ 支持 OAuth2 认证

- ❌ 不支持 Service Account（服务账号）

1、在 Google Cloud Console「https://console.cloud.google.com/」 创建新项目或选择现有项目：

![Image 34](https://mmbiz.qpic.cn/mmbiz_png/aicUgIKATbcEgSlUHYMp4HsggicZECog6FPicibnFtHmrpCiaPfwxib5Y9Urrt69ftibU7O79YU7PMEiaPF9BBlxTWTqTA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=34)

![Image 35](https://mmbiz.qpic.cn/mmbiz_png/aicUgIKATbcEgSlUHYMp4HsggicZECog6FX9m8Uabic5fjHPoPBbVPbfInCyKybJg7H3nOg77Oclnew3VibJfXPCZQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=35)

2、点击「API和服务」，在新页面点击「库」：

![Image 36](https://mmbiz.qpic.cn/mmbiz_png/aicUgIKATbcEgSlUHYMp4HsggicZECog6FmICFyCLwT5sB2VnKTALkfw3kvFoOK8xQoZ7OHwdibeXN4ViaSAzKibXWw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=36)

![Image 37](https://mmbiz.qpic.cn/mmbiz_png/aicUgIKATbcEgSlUHYMp4HsggicZECog6FOuWp3tCOWR5K5ia5gbAUnVyFI90aGE9tK9n1jFiazT9LJaVlZ2QNhj9Q/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=37)

3、在「API库」页面输入「YouTube」搜索，找到「YouTube Data API v3」并启用：

![Image 38](https://mmbiz.qpic.cn/mmbiz_png/aicUgIKATbcEgSlUHYMp4HsggicZECog6F1tOTXjkBcacKCORzhVnb5ibru9R4FrY9AQEWOlBV9xq0QHGREC9aj6A/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=38)

![Image 39](https://mmbiz.qpic.cn/mmbiz_png/aicUgIKATbcEgSlUHYMp4HsggicZECog6FFJ7G0vlD8lcakb4nvSaWicgRicq2hkzXIDbzabQaxonXVerfHctUmpbg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=39)

![Image 40](https://mmbiz.qpic.cn/mmbiz_png/aicUgIKATbcEgSlUHYMp4HsggicZECog6FxRUAuMwVhgvlIPlibjuGvJ0v0jgiboM4teCFgaN7PSaicerPFibOsCHzlw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=40)

![Image 41](https://mmbiz.qpic.cn/mmbiz_png/aicUgIKATbcEgSlUHYMp4HsggicZECog6FH1tCpRlo3ehz54Sox0C82U2UKuS0x7mTXgbP4TS3dbrH2jeLamibk0g/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=41)

4、点击「凭证➡️创建凭证」，选择「OAuth 客户端 ID」：

![Image 42](https://mmbiz.qpic.cn/mmbiz_png/aicUgIKATbcEgSlUHYMp4HsggicZECog6Fcv2zeN7vyTskEtw88o9lfmiaW1mOhTnAoet8WbJkYc0o1MqCY3H4GOQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=42)

![Image 43](https://mmbiz.qpic.cn/mmbiz_png/aicUgIKATbcEgSlUHYMp4HsggicZECog6FgsRiaiaGtT34oxGoH5xTxjQjjcbxyXPPxhBVfXMnIZ1fzxvEpl6diabkA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=43)

![Image 44](https://mmbiz.qpic.cn/mmbiz_png/aicUgIKATbcEgSlUHYMp4HsggicZECog6FZ1EX7P6hWOSXyT1uqsTJJTyOn3glDv86RNY2kCUst7R3ia6SPqkzCvg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=44)

![Image 45](https://mmbiz.qpic.cn/mmbiz_png/aicUgIKATbcEgSlUHYMp4HsggicZECog6FpV1W1RlSxfRC7uHLcFVCU6vAwYdQtyKRm59w2B5jRU0KUNADMVCmibw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=45)

![Image 46](https://mmbiz.qpic.cn/mmbiz_png/aicUgIKATbcEgSlUHYMp4HsggicZECog6FG2FOpABoIeunnfZoGwO5cLV73KKytzibVpqLq0pEyS5VTc2qFtYT1lg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=46)

![Image 47](https://mmbiz.qpic.cn/mmbiz_png/aicUgIKATbcEgSlUHYMp4HsggicZECog6F0qJib65fZss18fh4bibHdeCuY38z695I6lslSyMZHC0nicibRJG2P4m6vA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=47)

![Image 48](https://mmbiz.qpic.cn/mmbiz_png/aicUgIKATbcEgSlUHYMp4HsggicZECog6FtolgNxQaF3C2xcCUahibV5UyCRTIw5km6NZDHdmQicoM95wNhOa1rNIw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=48)

![Image 49](https://mmbiz.qpic.cn/mmbiz_png/aicUgIKATbcEgSlUHYMp4HsggicZECog6F9W50TCibwH6iarqSwzYvcNtxB6LKzxWXYegnpBe3NtWyLX2D4GTBI49A/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=49)

![Image 50](https://mmbiz.qpic.cn/mmbiz_png/aicUgIKATbcEgSlUHYMp4HsggicZECog6FjZLQTdakpic94Q3dERKNDVoEfiaLUzcRyIc2RJj4I7kWVpbJHzDrnkKw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=50)

2、创建「OAUTH客户端」：

![Image 51](https://mmbiz.qpic.cn/mmbiz_png/aicUgIKATbcEgSlUHYMp4HsggicZECog6Fic0hzJbYzicdArZJIVOpvNlDia1nH1rlah2qPzklaTsiana6EvLb8ia5Qww/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=51)

需要在「上传到YouTube」节点的「Credential to connect with」处创建凭证，如果有，点击右边的笔图标编辑也可：

![Image 52](https://mmbiz.qpic.cn/mmbiz_png/aicUgIKATbcEgSlUHYMp4HsggicZECog6Fwf8pv0DcoDntib6cuwibhMr3pHiadKCzD8B1dfsMgyXa6qLONiciaAmf40A/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=52)

![Image 53](https://mmbiz.qpic.cn/mmbiz_png/aicUgIKATbcEgSlUHYMp4HsggicZECog6FFrlmosZGSR3TOEy0ibqyUPXBsxp7p2RUdq020f4W1gcCx4mdVCyDo0w/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=53)

复制「OAuth Redirect URL」，返回「创建 OAuth 客户端 ID」，在「已获授权的重定向 URI」输入框输入复制的「OAuth Redirect URL」：

![Image 54](https://mmbiz.qpic.cn/mmbiz_png/aicUgIKATbcEgSlUHYMp4HsggicZECog6FDrszNTOgIuvMWyheiapianronU8csEvleTicxQfXlPGlLjHYS5cToNb0g/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=54)

![Image 55](https://mmbiz.qpic.cn/mmbiz_png/aicUgIKATbcEgSlUHYMp4HsggicZECog6FtLD4t9YOS9NPTXNwic8vGYZFbvhylH4RHx1Gp8cRQfvNhnqicXiadFoZA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=55)

复制自己的客户端 ID和客户端密钥填写到n8n的YouTube凭证输入框：

![Image 56](https://mmbiz.qpic.cn/mmbiz_png/aicUgIKATbcEgSlUHYMp4HsggicZECog6FYkZIAwpa9hzHXHCdU4nGVqjEIzibEoGTt33QdYj5tMrkw8DK7GsibuGg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=56)

填好后先不要点击「Sign in with Google」，因为我们还没发布应用。

![Image 57](https://mmbiz.qpic.cn/mmbiz_png/aicUgIKATbcEgSlUHYMp4HsggicZECog6FYiasicr8P1ufKuL92zf7gk2QBnO5uxDuDRk4SmKvcgSQzpfgBHXtRpHg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=57)

![Image 58](https://mmbiz.qpic.cn/mmbiz_png/aicUgIKATbcEgSlUHYMp4HsggicZECog6FFbDdOeDYiaPufuqIWS2pAEWiavE8icssxWwibRicTJoibGmCQibibl5bdciamHg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=58)

没发布应用就会出现403 access denied错误，这是一个隐藏的坑点，我在这里琢磨了好几个小时😭。

点击「目标对象」，然后点击页面的发布应用：

![Image 59](https://mmbiz.qpic.cn/mmbiz_png/aicUgIKATbcEgSlUHYMp4HsggicZECog6FAsZtyWTgOy4au5bTzNSBNNfEiaOx30KbL4lAqaT3Czk5Z7W4h2lOsJA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=59)

![Image 60](https://mmbiz.qpic.cn/mmbiz_png/aicUgIKATbcEgSlUHYMp4HsggicZECog6FPxtdcpb5XfBiaictuj4cuWE9gnRl7s9PBgy1RVlBx0pWRem4jET2JcvA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=60)

![Image 61](https://mmbiz.qpic.cn/mmbiz_png/aicUgIKATbcEgSlUHYMp4HsggicZECog6F4yrticEs7Ufx0Hn0Xw3Hh4aj7jnMWZWgicfVSMxiaPq7G1CCsmLQK0ulA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=61)

返回n8n点击「Sign in with Google」：

![Image 62](https://mmbiz.qpic.cn/mmbiz_png/aicUgIKATbcEgSlUHYMp4HsggicZECog6FS42WIyge9PNRGru4lB59X032OlQQZpBn6fIChF6N2gml1fZ7fv1AAw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=62)

![Image 63](https://mmbiz.qpic.cn/mmbiz_png/aicUgIKATbcEgSlUHYMp4HsggicZECog6Fg2MkAWpZicUKJibO3hAd9c8m6BpXacVnw5N92g3pd3ITYgKqLMUUcAkw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=63)

![Image 64](https://mmbiz.qpic.cn/mmbiz_png/aicUgIKATbcEgSlUHYMp4HsggicZECog6FUMV4sQHbgrlou9XfhLTHicic8lUdusHicZWS3ac8dibUTB2CtUsQplVp3w/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=64)

![Image 65](https://mmbiz.qpic.cn/mmbiz_png/aicUgIKATbcEgSlUHYMp4HsggicZECog6FYHhtiar1cPnpr3icok9dZ0XDsgo4ud9zvno0DnYyfRnUibqJLibtbgYo7Q/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=65)

![Image 66](https://mmbiz.qpic.cn/mmbiz_png/aicUgIKATbcEgSlUHYMp4HsggicZECog6FaWyyWBicezPXgecKAEowLUjnrZqdm8WVj7h7tkrRPjAX2ZB49bibUH8Q/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=66)

![Image 67](https://mmbiz.qpic.cn/mmbiz_png/aicUgIKATbcEgSlUHYMp4HsggicZECog6F2ycBTl70ibYJDIod5oSWJAMxrWvR0iaTk9fy2AVjaUiaNUv0w9xjNWVTw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=67)

![Image 68](https://mmbiz.qpic.cn/mmbiz_png/aicUgIKATbcEgSlUHYMp4HsggicZECog6FRCNQnxuF8C34RjiaVFw7hTuZBctWZicsIqDPqBEBkI7MYcaF4aLFDuaQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=68)

因为我解析了域名，所以要修改地址为我解析的域名再访问：

![Image 69](https://mmbiz.qpic.cn/mmbiz_png/aicUgIKATbcEgSlUHYMp4HsggicZECog6FsP8PiaODSIug4qyEOQffmu9TeHtAYybRqYfaB7KPcmAXkwDiaFtl9Fuw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=69)

返回YouTube凭证设置：

![Image 70](https://mmbiz.qpic.cn/mmbiz_png/aicUgIKATbcEgSlUHYMp4HsggicZECog6FSPs9QV5xKFrnAl9P7jexXqR0TK4e4UWI1KMejqGoqviaYsOjnD79uxg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=70)

账号连接成功。

### 3.4、第四步：测试运行

1、在工作流左下角的Chat窗口输入视频主题，记得要修改「AI生成视频信息」、「生成视频（Sora-2）」两个节点的令牌哦：

![Image](https://mmbiz.qpic.cn/mmbiz_gif/aicUgIKATbcEgSlUHYMp4HsggicZECog6FLmWiadfQaoIAB20OosGoPAD0A0maiaE9YFUX8CRJbriaIibLXibYMSfrXeg/640?wx_fmt=gif&from=appmsg#imgIndex=71)

执行完成没报错👍。

2、检查 YouTube 频道是否上传成功：

![Image 71](https://mmbiz.qpic.cn/mmbiz_png/aicUgIKATbcEgSlUHYMp4HsggicZECog6FKDceRI5cSDscAciabkpt3M0m5kWehggwuI5gicaX9sAEev4hTdicI4NibQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=72)

发布的视频播放数有高有低高的有1000+(之前用Sora2生成的视频手动发布的有破2w播放)，低的也有0，

---

## 四、常见问题与坑点

1、问题：OAuth Redirect URL 不能使用 localhost ⚠️ 高频坑点

- 现象：点击「Sign in with Google」后授权失败

- 原因：Google 不允许 localhost 作为 OAuth 回调地址，会出现地址无法访问的情况

- 解决方案：

- 

    - ngrok、frp等工具将本地 n8n 暴露到公网（临时方案）

- 

    - 我使用的是 clawcloud 部署 + 域名解析

    - 也可以用其他云服务商的海外服务器部署（阿里云、腾讯云等）

- 

    - 方案1：使用公网域名部署 n8n（推荐）

    - 方案2：使用反向代理工具

2、问题：Google 应用未发布导致授权失败（⚠️ 重要坑点）

- 现象：授权时提示权限不足或无法访问

- 原因：应用处于测试状态，未发布

- 解决：访问 https://console.cloud.google.com/auth/audience?project=你的项目名称 发布应用

如果不发布应用，会导致授权失败或权限不足

3、问题：API 返回 401 错误

- 检查 API 密钥是否正确

- 确认格式为 Bearer 密钥（注意空格）

4、问题：YouTube 上传失败

- 重新授权 YouTube 凭证

- 确认 Google Cloud 项目已启用 YouTube Data API v3

- 检查 OAuth 重定向 URI 是否正确

- 确认使用的是 OAuth2（不是 Service Account服务账号）

5、问题：视频生成超时

- 增加「生成视频(Sora-2)」节点的 timeout 值

- 当前设置为 600000ms（10分钟），可根据需要调整，如调整为900秒

- 增加重试机制

---

## 五、项目总结

### 5.1、值得做这个项目吗？

如果你的目标是 学习技术 ✅ 值得做。

- 这是一个非常实用的 n8n 自动化入门项目，可以让我们快速理解工作流编排的核心逻辑。

- 可以学会并掌握 API 集成、AI 内容生成、自动化上传 等实用技能。

- 同时还能体验 Claude、Sora-2 等AI工具的协作方式，了解完整的 AI 工具链工作原理。

如果你的目标是 通过它赚钱 ❌ 不建议。

- AI 生成内容流量不稳定，平台更喜欢原创、有质量的内容。

- 投入产出比偏低：生成容易，吸引用户难。

- 原创性有限，大量发布甚至可能被算法判定为“低原创内容”。

AI 生成的视频原创性有限，发多了可能会被平台检测出来。真正能长久运营的账号，仍然离不开内容质量。

所以，把这个项目当成技术实践与效率工具，而不是流量机器。

它能让你少花时间在机械操作上，多花时间在创意上。




### 5.2、我的真实感受

收获：

- ✅ 掌握了多项新技术（n8n、API、AI 视频生成）

- ✅ 明显减少了重复劳动，提高创作效率

- ✅ 能快速验证不同视频创意和风格

- ✅ 整个搭建过程挺有意思的

局限：

- ⚠️ 视频质量与播放表现不稳定，依赖提示词质量

- ⚠️ 成本虽然不高，但积累起来也不少

- ⚠️ AI 生成的内容缺乏个性和深度

- ⚠️ 不适合大规模或商业化内容生产




### 5.3、给想尝试的朋友的建议

1、把它当作学习项目，不要期望太高的收益

2、先解决部署问题：

- 新手建议用 n8n Cloud，也可以用ClawCloud部署，避免折腾部署

- 自托管的话，必须配好公网域名和 SSL

- localhost 是无法完成 YouTube OAuth 授权的

3、YouTube 凭证配置要仔细：

- 这是最容易卡住的地方

- 一定要发布 Google 应用

- OAuth Redirect URL 要填对

4、先小规模测试，生成几个视频看看效果

5、关注学习过程，而不是结果

6、如果想认真做 YouTube，还是要做原创内容




## 六、交流群

![Image 72](https://mmbiz.qpic.cn/mmbiz_png/aicUgIKATbcEgSlUHYMp4HsggicZECog6Fb2Cuo8L4ZQZ96fiaMtVKdxGiaCpd2VjuuJ4hticpMIy1pGBUSNyybz6Gg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=73)

添加微信加入交流群，记得打招呼的时候备注「进群」哦




你学会了吗？赶紧去搭建一个，解放你的双手！




👉 如果你在搭建过程中遇到任何问题，欢迎在评论区留言交流！




觉得有用，点个「赞」+「在看」，转发给小伙伴吧！

