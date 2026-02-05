---

title: 只动嘴不动手！Cursor + n8n + MCP，我的自动化工作流竟然“自己长出来了”？
date: 2025-12-13
tags: ["n8n", "工作流", "自动化", "cursor", "Cursor", "工作流自动化"]
category: 自动化工具
---


# 只动嘴不动手！Cursor + n8n + MCP，我的自动化工作流竟然“自己长出来了”？

Original 大刘 [大刘AI编程](javascript:void(0);)*2025年12月13日 08:30* *北京*



在小说阅读器中沉浸阅读

大家好，我是大刘，一个热衷于用技术偷懒的博主。

今年AI 编程圈子有个概念火得一塌糊涂——**MCP**（Model Context Protocol，模型上下文协议）。

很多小白朋友问我：“强哥，这玩意儿到底是干啥的？听着好高大上，跟我有关系吗？”

我这么跟你说吧：

以前，你在 Cursor 里写代码，AI 就像个“被锁在房间里的天才军师”。它懂天文地理，代码写得贼溜，但它没有手，没法帮你去外面拿东西，也没法帮你按开关。

它只能把代码写给你，让你自己去跑。

而 MCP，就是给这个军师发了一个万能对讲机。

而 n8n，就是在这个房间外面的全能机械臂。

今天这篇文章，我要手把手教你如何用最简单、最原生的方式，把这三者连起来。

读完这篇，你就能在 Cursor 里打行字，直接指挥 n8n 帮你自动发邮件、查比特币价格、甚至管理你的飞书文档。不用写复杂的脚本，**配置完就能用**！

---

## 第一部分：整体思路——我们要造个什么“怪物”？

在开始动手之前，我们先得搞清楚我们到底在折腾什么。

简单来说，我们要搭建一个“超级自动化铁三角”：

1. 大脑（Cursor）：这是我们的指挥中心。我们在对话框里输入自然语言（比如：“帮我建个工作流”）。

2. 神经（MCP 协议）：这是 Anthropic（Claude 的母公司）搞出来的开放标准。它的作用就是让 Cursor 能听懂外部工具的语言，不用我们再去写复杂的 API 对接代码。

3. 手脚（n8n）：这是一个强大的工作流自动化工具。它能连接几千种服务（谷歌文档、飞书、Notion、数据库等）。

**我们的目标效果是**：

你在 Cursor 里打字说：“帮我写个查询城市天气预报任务。”

Cursor 思考一下，通过 MCP 指挥 n8n，咻的一下，你的 n8n 界面里就自动生成好了这个工作流，并且已经跑起来了。

是不是听起来很科幻？但其实实现它，**只需要改一段配置代码**。

---

## 第二部分： 实操教学——最优雅的配置方案

很多网上的教程会让你下载源码、编译、甚至写各种中间脚本来解决兼容性问题。

太麻烦了！那是给专家看的，不是给我们小白看的。

经过我的反复测试，我找到了一个官方原生的、无需写代码的完美配置方案。只要你电脑上有 Cursor 和 n8n（不管是 Docker 还是本地安装），复制粘贴就能搞定。

### 1. 准备工作

- **Cursor**：请提前安装好 Cursor。

- **n8n**：确保你的 n8n 正在运行（通常地址是 `http://localhost:5678`）。

- **Node.js**：电脑上要有 Node 环境（这就不用多说了吧，搞编程的基础）。

### 2. 获取 n8n 的“钥匙”

Cursor 想指挥 n8n，得先拿到通行证。

1. 打开你的 n8n 面板。

2. 点击左下角的 Settings (设置) -> n8n API。

3. 点击 Create API Key。

4. 复制这个密钥（Key），保存好，千万别发给别人！

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/k2Ww3N7tDA2icvZSumV6TJ7ZFmG8kaLPx91v8qh8YKRnPB0THyVE4piavAlFKRWHQ7OL1Flvnc5rm9gO4BpoFdicw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=0)

### 3. 在 Cursor 中一键配置（核心步骤）

这是最关键的一步，请仔细看：

1. 打开 Cursor，点击右上角的齿轮图标，进入 Settings。

2. 找到 **Tools & MCP**。

3. 点击 **+ Add New MCP Server**。

![Image 1](https://mmbiz.qpic.cn/sz_mmbiz_png/k2Ww3N7tDA2icvZSumV6TJ7ZFmG8kaLPxwFlcq7DFTdwoF6qnTF4gm4mc7qwn7icWFHx5ibVlEHaabibicF5d6SlbAg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=1)

请把下面这段代码，**完整地复制**到你的 `mcpServers` 配置里：

> **注意**：

    1. `N8N_API_URL` 可以填你本地的，也可以填你云上 n8n 地址。

    2. **切记**将刚才复制的 `n8n key` 替换到下面的代码中。

```Plain Text
    "n8n": {
      "command": "npx",
      "args": [
        "-y",
        "n8n-mcp"
      ],
      "env": {
        "MCP_MODE": "stdio",
        "LOG_LEVEL": "error",
        "DISABLE_CONSOLE_OUTPUT": "true",
        "N8N_API_URL": "http://localhost:5678",
        "N8N_API_KEY": "这里填你刚才复制的n8n_API_Key"
      }
    }
```

**大刘划重点**：为什么要加 `DISABLE_CONSOLE_OUTPUT`？因为 n8n 启动时喜欢打印字符画 Logo，Cursor 读不懂字符画会报错。加了这个参数就是让 n8n “闭嘴干活”，这样就完美解决了所有报错问题！

---

## 第三部分：实战演示——AI 真的能控制 n8n 吗？

绿灯亮了只是第一步，能不能干活才是硬道理。

在Cursor中打开一个新建的目录。

### 测试 1：查家底

我在 Cursor 的 Auto（那个 AI 对话框）里输入了这样一段话：

> 请连接 n8n mcp，列出我现有的所有工作流名称和 ID

接下来发生的几秒钟，唰唰的就把我本地 n8n 中所有工作流呈现出来，证明我们的 Cursor 通过 MCP 成功对接了本地的 n8n 服务：

![Image 2](https://mmbiz.qpic.cn/sz_mmbiz_png/k2Ww3N7tDA2icvZSumV6TJ7ZFmG8kaLPxicV10zTicW2cV7XP80faQZTbepDKGZ59z5cMXZGw4pKPA9ic7bv4JRnOA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=2)

### 测试 2：Hello Cursor

接下来让他创建一个实用一点的工作流，在 Cursor 中输入：

```Plain Text
请帮我创建一个工作流，名称叫“Hello Cursor”,实现一个能查询北京天气预报的工作流
```

![Image 3](https://mmbiz.qpic.cn/sz_mmbiz_png/k2Ww3N7tDA2icvZSumV6TJ7ZFmG8kaLPxYA7SibysCHhqNgp3F8aAsdfdfJX1FLn3lT3MMbBW5hC7ibXDHwTWjJxw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=3)

打开 n8n 浏览器，列表里真的多了一个 `Hello Cursor` 的工作流，点进去，节点连得整整齐齐，参数填得一个不差。

这意味着什么？

这意味着以后你不需要再手动去拖拽那些复杂的节点了。你只需要告诉 Cursor 你想要什么，它就能直接在你的系统里生成出来。

这就是 MCP 的魅力，它打破了软件之间的“生殖隔离”。

### 测试 3：进阶玩法（从乙方变甲方）

为了测试它的极限，我决定做一个更复杂的任务：**查询全球城市天气**。

我和 Cursor 进行了几轮对话，这是最终生成的工作流：

![Image 4](https://mmbiz.qpic.cn/sz_mmbiz_png/k2Ww3N7tDA2icvZSumV6TJ7ZFmG8kaLPxQUTauSWELV26PksqTtdS6OBgibtJOFuKFErwDasIIklcZpHVGh21Maw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=4)

这个工作流能接收城市名，调用 wttr.in 接口，返回格式化的中文天气预报文本。

我们在终端调用一下试试：

```Plain Text
curl -G "http://localhost:5678/webhook/weather" --data-urlencode "city=天津"
```

效果那是杠杠的：

![Image 5](https://mmbiz.qpic.cn/sz_mmbiz_png/k2Ww3N7tDA2icvZSumV6TJ7ZFmG8kaLPxF5AkLeMibvuWqEd4kpjAS1KiaGykM6gmkx0QkCMRbltNDkuXx4pvibubw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=5)

**关键来了！在整个过程中，我说了些什么？**

1. "添加数据格式化功能，方便用户查看。"

2. "要求实现：用户可以通过命令行触发查询某地的天气，工作流返回用户格式化的输出。"

3. "支持用户输入中文城市名。"

4. "为什么输入中文城市名，工作流没有反应？" —— （Cursor 居然帮我排查出 Webhook 不识别中文，并建议加 `--data-urlencode`，太贴心了）

5. "我发现中文城市转英文列表中没有黄山市，为什么我也能查询黄山市的天气？" —— （Cursor 甚至还能给我解释代码逻辑）

几轮对话就完成了一个能查询全球城市天气的工作流。在这过程中，我的角色发生了巨大的转变：

1. **我只负责提需求**：如何实现是 Cursor 的事。我可以要求它提供几个方案，最终由我决策。过去我是亲自在 n8n 上连线的“乙方”，现在我是发号施令的“甲方”。

2. **遇到报错直接甩给它**：遇到问题，我只需要将报错信息和现象发给 Cursor，它负责修。

3. **不懂就问**：遇到不懂的代码逻辑，直接问 Cursor，它就是最了解这个项目的专家，不用我再去翻文档，上网查。

---

## 总结与思考

今天这通折腾，打通了**AI Agent（智能体）** 落地的最后一公里。

- **对于小白来说**：这可能有点硬核，但只要你按我的“原生配置代码”走，一定能配通。这不仅仅是配置一个工具，这是在搭建你未来的“**数字员工指挥部**”。

- **对于开发者来说**：MCP 协议是未来的大趋势。今天的 n8n 只是一个开始，未来你的数据库、你的服务器、你的飞书钉钉，都可以通过这种方式接入 Cursor。

---

## 🎁 粉丝福利

这就想上手试试？别急，为了让你少走弯路，大刘已经把文中演示的全球天气查询工作流 JSON 打包好了。

不用你自己费劲教 AI，直接导入就能跑！

👉 关注公众号 **「大刘AI编程」** ，后台回复关键词 **mcp**，立刻免费获取，一键起飞！

如果你在配置过程中卡住了（比如路径不对、脚本报错），或者想解锁 Cursor + MCP 的更多高阶玩法（比如怎么让 AI 帮你自动写公众号？😏）。

👇 **欢迎在评论区留言，或直接扫码加我好友。**

我是大刘，一个热衷于把复杂技术讲简单的技术博主。把你的报错发给我，我帮你一起填坑！

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/k2Ww3N7tDA2GQxia9tqYTqXbLs70IP0xECx0GoLTxmPlm7OHzLLX7X6reyeuotUaVStDLtU6iaf7rAmcPmtAp2YQ/640?wx_fmt=png&from=appmsg&watermark=1&wxfrom=5&wx_lazy=1&tp=webp#imgIndex=29)

更多文章:

[【n8n实战】用魔法打败魔法：让 n8n 自己备份自己到GitHub上，这波操作稳了](https://mp.weixin.qq.com/s?__biz=MzE5ODA5MjY4NA==&mid=2247486021&idx=1&sn=06ef69662986a758b34fedf156c7d023&scene=21#wechat_redirect)

[野心大一点！全栈实战：后端 n8n + 前端 React，手把手带你开发可无限扩展的 AI SaaS](https://mp.weixin.qq.com/s?__biz=MzE5ODA5MjY4NA==&mid=2247485968&idx=1&sn=760e0c40188601590c61c932d69e8531&scene=21#wechat_redirect)

[会提问比写代码更重要？Gemini + Antigravity 实战：带你把“想法”变成“产品”](https://mp.weixin.qq.com/s?__biz=MzE5ODA5MjY4NA==&mid=2247485955&idx=1&sn=afa8ccae147f259551217b1ddbbcb76f&scene=21#wechat_redirect)

[无需购买域名和机器！Docker + Ngrok 完美部署 n8n，让你的自动化工作流随时待命](https://mp.weixin.qq.com/s?__biz=MzE5ODA5MjY4NA==&mid=2247485950&idx=1&sn=a193281820fb1c988485c2af15f5d128&scene=21#wechat_redirect)

[打造私人情报官系列（六）还没醒，定制的 AI 日报就推送到飞书了？揭秘我的自动化工作流迭代之路（附源码）](https://mp.weixin.qq.com/s?__biz=MzE5ODA5MjY4NA==&mid=2247485924&idx=1&sn=d6c866797a0871dd08ced91dbf6e3be7&scene=21#wechat_redirect)

[打造私人情报官系列（五）Notion 归档+千人千面，这才是自动化终局！](https://mp.weixin.qq.com/s?__biz=MzE5ODA5MjY4NA==&mid=2247485909&idx=1&sn=2442a137ae521d1532a90d17402f1dff&scene=21#wechat_redirect)

[打造私人情报官系列（三）：免费送源码！n8n + 国产 AI 打造“狂热”辣评人，支持退订 + 深度阅读](https://mp.weixin.qq.com/s?__biz=MzE5ODA5MjY4NA==&mid=2247485845&idx=1&sn=6cb06418f657d0561a95fc68279fbd41&scene=21#wechat_redirect)

*[打造私人情报官系列（二）：我的 AI 日报信息官现在支持“自助订阅”了](https://mp.weixin.qq.com/s?__biz=MzE5ODA5MjY4NA==&mid=2247485833&idx=1&sn=f22363de5b819c8a95b3f66935948efc&scene=21#wechat_redirect)*

*[打造私人情报官系列：从零开始：我如何用 n8n 把 3 个网站的内容，清洗、分类、打包塞进一封邮件？](https://mp.weixin.qq.com/s?__biz=MzE5ODA5MjY4NA==&mid=2247485809&idx=1&sn=49a7140173257f4047d5ecc3a885c7f0&scene=21#wechat_redirect)*

[n8n 保姆级教程（八）用 n8n +Gemini+ 智谱GLM，把你的飞书机器人变成“神笔马良”--绘画大师](https://mp.weixin.qq.com/s?__biz=MzE5ODA5MjY4NA==&mid=2247485783&idx=1&sn=598543d95c290dec0472ba1dbc776a12&scene=21#wechat_redirect)

[n8n 保姆级教程（七）：拒绝收藏夹吃灰！用多维表格给飞书机器人装了个“永久大脑”，自动归档！](https://mp.weixin.qq.com/s?__biz=MzE5ODA5MjY4NA==&mid=2247485750&idx=1&sn=c671a1b933f5b1f34c47e5fb0ea05780&scene=21#wechat_redirect)

[n8n 保姆级教程（六）：我给飞书机器人装了“天眼”，自动生成精美知识卡片！](https://mp.weixin.qq.com/s?__biz=MzE5ODA5MjY4NA==&mid=2247485711&idx=1&sn=40faf82cedbcb19e0fbd29f810b54a71&scene=21#wechat_redirect)

[n8n 保姆级教程（五）：n8n AI Agent 实战--如何让飞书机器人自主搜索、精准算数](https://mp.weixin.qq.com/s?__biz=MzE5ODA5MjY4NA==&mid=2247485658&idx=1&sn=8944b6e3aae7a15041d2acdaaba6b670&scene=21#wechat_redirect)

[n8n 保姆级教程（四）：飞书 AI 助理的“最强大脑”：零代码用 n8n + 智谱 GLM-4 实现有记忆、高稳定！](https://mp.weixin.qq.com/s?__biz=MzE5ODA5MjY4NA==&mid=2247485626&idx=1&sn=2e8182e930868cc1aff59c6115c57512&scene=21#wechat_redirect)

[n8n 保姆级教程（三）：零代码！手把手教你用 n8n + 飞书，打造你的第一个“自动化助理”系列](https://mp.weixin.qq.com/s?__biz=MzE5ODA5MjY4NA==&mid=2247485502&idx=1&sn=072bfa137772f85bde69a1803db8261d&scene=21#wechat_redirect)

[n8n 保姆级教程（二）：从 'Hello World' 到 7x24 小时博客监控机器人](https://mp.weixin.qq.com/s?__biz=MzE5ODA5MjY4NA==&mid=2247485412&idx=1&sn=891aa7ed88149739f250b19eeb7e970d&scene=21#wechat_redirect)

[n8n 保姆级教程（一）：告别繁琐，用 Docker 帮你 5 分钟“装好” n8n](https://mp.weixin.qq.com/s?__biz=MzE5ODA5MjY4NA==&mid=2247485361&idx=1&sn=9a56aae23ffda01bdbc97de67bfbeff0&scene=21#wechat_redirect)




