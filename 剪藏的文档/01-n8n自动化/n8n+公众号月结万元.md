---

title: 准备工作：所需工具和账号
date: 2026-01-26
tags: ["n8n", "工作流", "自动化", "工作流自动化"]
category: 自动化工具
---


每天花3小时写文章，1小时找配图，半小时排版发布？作为公众号运营者，你是否也被这些重复性工作折磨得筋疲力尽？

今天教你用n8n搭建一套完整的**公众号运营自动化工作流**，实现从AI写文、智能配图到自动发布的全流程自动化。一键触发，坐等文章发布，让你从繁琐的运营工作中彻底解放！

# 准备工作：所需工具和账号

在开始搭建之前，我们需要准备以下工具和账号：

# 必备工具清单

- **n8n平台**：工作流自动化核心工具

- **DeepSeek API**：用于AI文章生成

- **豆包模型API**：用于AI配图生成

- **微信公众号**：内容发布平台

- **微信公众号开发者账号**：获取API权限

# 账号申请步骤

1. 1. **注册n8n账号**：访问 n8n.cloud 注册免费账号,本案例使用云端部署

2. 2. **安装微信公众号社区节点**：在n8n中安装「n8n-nodes-wechat-offiaccount」社区节点

3. 3. **申请DeepSeek API Key**：在DeepSeek官网申请API密钥

4. 4. **申请火山方舟API Key**：

    - 访问火山方舟官网（ark.cn）注册账号

    - 在控制台中开通「文生图」服务

    - 选择「豆包-SeedreamV3.0」模型并开通

    - 获取API Key用于Bearer Token认证

    - 模型ID：doubao-seedream-3-0-t2i-250415

1. 5. **开通微信公众号开发者权限**：在公众号后台申请开发者权限

2. 6. **获取公众号AppID和AppSecret**：用于WeChat节点配置

# 第一步：搭建AI写文模块

# 1.1 配置工作流触发器

首先在n8n中创建一个新的工作流，添加Form Trigger节点作为工作流的起始点来接收用户输入：

**Form Trigger节点配置详细步骤：**

1. 1. **添加节点**：在工作流画布中点击"+"按钮，搜索并添加「Form Trigger」节点

2. 2. **配置表单字段**：

    - 双击Form Trigger节点打开配置面板

    - 在「Form Fields」部分点击「Add Field」

    - 选择「Text Input」字段类型

    - 设置字段Name符为：`topic`

    - 设置占位符文本为：`请输入要创作的文章主题`

    - 勾选「Required」选项，确保必填

1. 3. **配置表单设置**：

    - 设置表单标题：`公众号文章生成`

    - 设置成功页面消息：`文章生成中，请稍候...`

![640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1](https://mmbiz.qpic.cn/sz_mmbiz_png/1bRSmBnBR4nGPnunbhyztLdA3927EaYpbz7UfRjlIq8lS9CrNpgWBjpyoGWrVAKADIVLo1vIEkVonaaUhNbBNQ/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1)

> 💡 使用说明：配置完成后，Form Trigger会生成一个专用的表单URL，用户通过访问这个URL填写文章主题并提交，即可触发整个工作流开始执行。

# 1.2 创建AI Agent节点

接下来添加AI Agent节点用于调用DeepSeek进行文章生成：

**节点配置步骤：**

1. 1. 在工作流中添加「AI Agent」节点

2. 2. 选择「DeepSeek」作为AI服务提供商

3. 3. 配置DeepSeek凭据（API Key）

4. 4. 设置模型参数和提示词

![640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1](https://mmbiz.qpic.cn/sz_mmbiz_png/1bRSmBnBR4nGPnunbhyztLdA3927EaYpuniczLn3ibu9sV4F0IzjtUZWjZ9J6QPdiaA0tqlicBKd96bfvcHPenZWeQ/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1)

# 1.3 处理AI生成内容

添加Code节点处理AI Agent返回的内容，提取文章标题和正文：

![640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1](https://mmbiz.qpic.cn/sz_mmbiz_png/1bRSmBnBR4nGPnunbhyztLdA3927EaYpavY5E72gfQL8iaTqmcyK1uLkAx5BzEbpnJKcHYqhtUiaX1Dm4BM1An1Q/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1)

# 第二步：AI配图模块设置

# 2.1 提交图像生成任务

添加HTTP Request节点调用豆包模型进行图像生成：

**节点配置步骤：**

1. 1. 添加新的「HTTP Request」节点

2. 2. 配置豆包模型API调用（基于火山方舟）

3. 3. 设置图像生成参数

4. 4. 配置提示词和样式

![640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1](https://mmbiz.qpic.cn/sz_mmbiz_png/1bRSmBnBR4nGPnunbhyztLdA3927EaYptXTsyxOEF47a3JqiaGuZIGGCWmLdJGezp1GIAx6dAHPgrhmcJgywfgQ/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1)

**配置JSON示例：**

```
{  "method":"POST","url":"https://ark.cn-beijing.volces.com/api/v3/images/generations","headers":{    "Content-Type":"application/json",    "Authorization":"Bearer 你的火山方舟API_Key"},"body":{    "model":"doubao-seedream-3-0-t2i-250415",    "prompt":"为微信公众号文章《{{$json.title}}》创作一张专业配图。风格：简洁现代，科技感，适合社交媒体传播。色调：蓝白主题，高质量",    "response_format":"b64_json",    "size":"1280x720",    "seed":-1,    "guidance_scale":2.5,    "watermark":false}}
```

# 2.2 处理图像结果

添加Code节点处理返回的图像数据：

![640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1](https://mmbiz.qpic.cn/sz_mmbiz_png/1bRSmBnBR4nGPnunbhyztLdA3927EaYpAv3MUp5nhRI23W6VEdXRKmlt46DicVAUSHUg6yVH0Z8673XWhxwnhcw/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1)

# 2.3 图像数据转换

添加Code节点将Base64图像数据转换为可用格式：

![640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1](https://mmbiz.qpic.cn/sz_mmbiz_png/1bRSmBnBR4nGPnunbhyztLdA3927EaYpy5C2SLjSPFFiaePsSpUVwXwEiahyPHFZFzApibwMF92nsHiaI23IfQicymg/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1)

# 2.4 图片下载转换

使用n8n内置的Convert to File节点将Base64图像数据转换为binary格式：

![640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1](https://mmbiz.qpic.cn/sz_mmbiz_png/1bRSmBnBR4nGPnunbhyztLdA3927EaYpNdiazQ1v7GeCns0ch4RR0XJKNoicXZHnfDp82gJpzyytjhIkdOiajibIOA/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1)

**节点配置参数：**

- **节点类型**：Convert to File

- **操作**：Base64 to File

- **Base64数据**：`imageBase64`

- **MIME类型**：`image/png`

- **输出属性名**：`imageData`

> ✨ 优势说明：使用Convert to File节点比自定义Code更简洁，n8n会自动处理Base64解码和binary格式转换，减少出错概率。

# 第三步：公众号发布模块

# 3.1 安装微信公众号社区节点

在n8n中安装微信公众号社区节点，简化配置流程：

1. 1. 进入n8n设置页面

2. 2. 点击「Community Nodes」

3. 3. 搜索并安装「n8n-nodes-wechat-offiaccount」

4. 4. 重启n8n服务

# 3.2 配置微信公众号凭据

在凭据管理中创建微信公众号凭据：

![640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1](https://mmbiz.qpic.cn/sz_mmbiz_png/1bRSmBnBR4nGPnunbhyztLdA3927EaYpRGkwjsndFQ38icBQwWCqwaH9Gj4ibMjwBfia24FROvD3TxZlwSHPFzh7A/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1)

![640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1](https://mmbiz.qpic.cn/sz_mmbiz_png/1bRSmBnBR4nGPnunbhyztLdA3927EaYplzhJXcfonJv4c9Kf9MF8MlzMgNXhbC1yolia00XDlB3GwVAX4QUrsrQ/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1)

**凭据配置参数：**

- **凭据类型**：WeChat Official Account API

- **App ID**：你的微信公众号AppID

- **App Secret**：你的微信公众号AppSecret

- **凭据名称**：WeChat_Official_Account

> ⚠️ 重要提醒：IP白名单设置

    在使用微信公众号API之前，请确保将n8n服务器的IP地址添加到微信公众号后台的IP白名单中：

    1. 1. 登录微信公众平台 → 开发 → 基本配置

    2. 2. 在「IP白名单」中添加你的n8n服务器IP地址

    3. 3. 如果使用云服务器，请添加服务器的公网IP

    4. 4. 本地开发时，可以使用内网穿透工具获取公网IP

    未设置IP白名单将导致API调用失败，返回错误码40164。

# 3.3 上传图片素材

使用WeChat节点上传生成的配图：

![640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1](https://mmbiz.qpic.cn/sz_mmbiz_png/1bRSmBnBR4nGPnunbhyztLdA3927EaYpKy5xCm4ruAibyWOzf3XQnICLuicK0kRRVYcXj7wdYjn1sYaictmiby7cLw/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1)

**节点配置参数：**

- **操作**：Upload Media

- **媒体类型**：Image

- **文件数据**：`imageData`

# 3.4 创建并发布图文消息

使用WeChat节点创建图文消息并发布：

![640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1](https://mmbiz.qpic.cn/sz_mmbiz_png/1bRSmBnBR4nGPnunbhyztLdA3927EaYpAVej8IzH4KZem3OzN0Fib7ibamIMHgDZhJ7PRglyxVsOArIDKtfDOAKQ/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1)

**JSON配置格式：**

```
[    {        "article_type":"news",        "title":{{ $('处理AI生成内容').item.json.title.toJsonString() }},        "author":"AI助手",        "content":{{ $('处理AI生成内容').item.json.content.toJsonString() }},        "thumb_media_id":{{ $json.media_id.toJsonString() }},        "show_cover_pic":1,        "need_open_comment":1,        "only_fans_can_comment":0,        "auto_publish":false,        "publish_time":"immediate"    }]
```

**参数说明：**

- `article_type`: 文章类型，设置为"news"表示图文消息

- `title`: 文章标题，使用toJsonString()方法确保JSON格式正确

- `author`: 文章作者信息

- `content`: 文章正文内容，使用toJsonString()方法处理特殊字符

- `thumb_media_id`: 封面图片的媒体ID，来自上传图片素材步骤

- `show_cover_pic`: 是否显示封面图片（1=显示，0=不显示）

- `need_open_comment`: 是否开启评论功能（1=开启，0=关闭）

- `only_fans_can_comment`: 评论权限（1=仅粉丝，0=所有人）

- `auto_publish`: 自动发布设置（false=创建草稿，true=立即发布）

- `publish_time`: 发布时间（"immediate"=立即发布）

# 第四步：工作流整合和测试

# 4.1 节点连接配置

按照以下顺序连接各个节点：

1. 1. **Form Trigger** → **AI Agent**（文章生成）

2. 2. **AI Agent**（文章生成）→ **内容处理Code**

3. 3. **内容处理Code** → **HTTP Request**（豆包模型图像生成）

4. 4. **HTTP Request**（豆包模型图像生成）→ **图像数据转换Code**

5. 5. **图像数据转换Code** → **Convert to File**（Base64转换）

6. 6. **Convert to File**（Base64转换）→ **WeChat**（上传图片素材）

7. 7. **WeChat**（上传图片素材）→ **WeChat**（创建并发布图文消息）

> 🔗 连接提示：确保每个节点的输出数据格式与下一个节点的输入要求匹配。

# 4.2 错误处理机制

为关键节点添加错误处理：

```
// 在Code节点中添加错误处理try {// 主要逻辑代码const result = processData(items[0].json);return { json: result };} catch (error) {// 错误处理console.error('处理失败:', error.message);return {    json: {      error: true,      message: error.message,      timestamp: newDate().toISOString()    }  };}
```

# 4.3 工作流测试

完成配置后，进行完整测试：

**测试步骤：**

1. 1. **单节点测试**：逐个测试每个节点的功能

2. 2. **端到端测试**：输入测试主题，验证整个流程

3. 3. **异常情况测试**：测试网络异常、API限制等情况

4. 4. **性能测试**：测试工作流的执行时间和稳定性

> ⚠️ 测试建议：建议先使用简单的测试主题进行调试，确保每个环节都能正常工作后再进行复杂内容的生成。

# 高级优化技巧

# 5.1 内容质量控制

添加内容审核节点，确保生成内容符合要求：

```
// 内容质量检查function validateContent(content) {  const checks = {    minLength: content.length >= 800,    hasTitle: content.includes('#'),    hasStructure: content.includes('##'),    noSensitiveWords: !containsSensitiveWords(content)  };    return Object.values(checks).every(check => check);}
```

# 5.2 定时发布功能

使用Cron Trigger节点实现定时发布：

**Cron配置示例：**

```
{  "parameters":{    "rule":{      "interval":[        {          "field":"cronExpression",          "expression":"0 9 * * 1,3,5"        }      ]    }}}
```

> 📅 时间说明：上述配置表示每周一、三、五的上午9点自动触发工作流。

# 5.3 多平台同步发布

扩展工作流支持同时发布到多个平台：

**支持平台：**

- 🔥 **微信公众号**

- 📚 **知乎专栏**

- 📰 **今日头条**

- 🌸 **小红书**

> 💡 扩展提示：可以通过添加并行分支，同时向多个平台发布内容，实现真正的一键多发。

# 🔧 FAQ 常见问题解答

# Q1: DeepSeek API调用失败怎么办？

**解决方案：**

- ✅ 检查API Key是否正确配置

- ✅ 确认账户余额是否充足

- ✅ 验证网络连接是否正常

- ✅ 建议添加重试机制和备用API

# Q2: 微信公众号API权限不足？

**解决方案：**

- ✅ 确保公众号已完成认证

- ✅ 开通开发者权限

- ⚠️ 个人订阅号功能有限，建议使用企业服务号

# Q3: 生成的配图不符合要求？

**优化建议：**

- 🎨 优化prompt描述，添加更具体的风格要求

- 🔧 检查火山方舟API Key配置

- ⚙️ 调整图片尺寸（size）参数

- 🎯 调整引导强度（guidance_scale）

- 🎲 设置固定随机种子（seed）获得一致效果

# Q4: 工作流执行时间过长？

**性能优化：**

- ⚡ 火山方舟API采用同步返回，已大幅缩短生成时间

- 🔄 优化API调用顺序

- 🚀 使用并行处理提升效率

- 💾 添加缓存机制减少重复调用

# 📚 推荐阅读

- 🔗 [告别重复劳动！用Dify工作流打造营销文案自动化神器，效率提升80%](https://mp.weixin.qq.com/s?__biz=MzkzMzc2MjAwOQ%3D%3D&mid=2247484173&idx=1&sn=1b96a85a0e58c6cc9c7c211160cfa1c5&scene=21#wechat_redirect)

- 🤖 [N8N+Dify 打造智能新闻定时推送:零代码实现多平台热点自动化](https://mp.weixin.qq.com/s?__biz=MzkzMzc2MjAwOQ%3D%3D&mid=2247484311&idx=1&sn=589b0ac355553d1c20985a99c3920634&scene=21#wechat_redirect)

- 🛠️ [Dify、n8n、Coze、FastGPT、RAGFlow、Make：六款AI工具，到底该怎么选？](https://mp.weixin.qq.com/s?__biz=MzkzMzc2MjAwOQ%3D%3D&mid=2247484284&idx=1&sn=2a85cbfa5ceb2072acd96debc7616218&scene=21#wechat_redirect)

# 🎯 总结

通过本教程，我们成功搭建了一套完整的公众号运营自动化工作流。使用n8n社区节点的优势让整个配置过程更加简单高效：

# ✨ 核心收益

✅ **节省90%的内容创作时间**✅ **实现24小时自动化运营**✅ **保证内容输出的稳定性**✅ **简化配置流程，降低技术门槛**✅ **支持可视化操作，减少出错概率**

# 🚀 核心优势

- **🔧 社区节点集成**：无需复杂的API调用配置

- **👁️ 可视化界面**：直观的节点配置方式

- **⚡ 一键部署**：快速搭建完整工作流

# 💡 重要提醒

> 记住：自动化只是工具，内容质量和用户价值才是公众号成功的关键。建议在使用自动化工具的同时，保持对内容的人工审核和优化。

# 🎬 开始行动

**现在就开始吧！** 用技术的力量让你的公众号运营更高效，把更多时间投入到战略思考和用户互动上。

**立即体验**：关注公众号发消息「公众号工作流」，获取完整 JSON文件 一键导入n8n。

想了解更多AI工具和技术趋势？关注我，每周为你带来最新的AI资讯和实用教程！

