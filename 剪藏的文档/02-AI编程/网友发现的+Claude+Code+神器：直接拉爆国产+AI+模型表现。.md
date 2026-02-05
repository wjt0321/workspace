---

title: 网友发现的 Claude Code 神器：直接拉爆国产 AI 模型表现。
date: 2025-10-15
tags: ["claude", "Claude", "AI", "人工智能", "智能体", "Agent", "AI编程", "代码助手"]
category: AI编程
---


# 网友发现的 Claude Code 神器：直接拉爆国产 AI 模型表现。

Original 逛逛 [逛逛GitHub](javascript:void(0);)*2025年10月15日 15:10* *北京*

逛 GitHub 的时候，发现了一个叫 ZCF 的开源工具。

它能一键完成 Claude Code 的环境设置，支持中英文等多语言切换，还预置了调教好的系统提示词，自动配置常用的 MCP 和工作流，相当省事儿。

更牛的是，有网友实侧 ZCF + Claude Code + 智谱 GLM 模型，这个搭配能把 GLM 的性能拉满，使用 ZCF 调教后性能可以比肩 sonnet4。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/ePw3ZeGRruytY0rS6ocz6MpIwmYKbuiaPSNN3593TWAsc55PnW0lxKROoZZZ3iczVrmrq6pSDB8DYkwtmL7TOPaw/640?wx_fmt=png#imgIndex=0)

想见恨晚，Claude Code 新手小白快去尝试一下，它会让你写代码更流程，不需要关心各种恶心的配置，

大幅度降低使用门槛，让你的效率起飞。

![Image 1](https://mmbiz.qpic.cn/sz_mmbiz_png/ePw3ZeGRruytY0rS6ocz6MpIwmYKbuiaPicWUB1NENicU6tGbUxGo3spoH6TbY5zd6ibnwIQVMkEpagcm7xHpXPJpw/640?wx_fmt=png#imgIndex=1)



### 

ZCF 是 Zero-Config Code Flow 的缩写，由 LINUX DO 社区大佬开源，社区帖子已经获得 18K 的浏览量和 1200 多人点赞。

![Image 2](https://mmbiz.qpic.cn/sz_mmbiz_png/ePw3ZeGRruytY0rS6ocz6MpIwmYKbuiaP47YUPsf8BtiaPtIkANd6picqaQlGFszpTCHElrOAAK0LiazXA0hibUYBvg/640?wx_fmt=png#imgIndex=3)

ZCF 开源没多长时间，已经在 GitHub 上获得 2K 的 Star。

如果你是 Claude Code 小白，不知道如何武装你的 Claude Code，建议直接使用 ZCF 进行初始化配置。

中文环境、各种工作流、MCP 工具、配置 API 等，通过很简洁的引导帮你完成配置，不需要记复杂晦涩的命令。

![效果图](https://mmbiz.qpic.cn/sz_mmbiz_jpg/ePw3ZeGRruytY0rS6ocz6MpIwmYKbuiaPUm3Pc4Lb00hUmgzcd4v19nia5OW8nGBfuYaRO8QV5oAcVpnOEydrCIg/640?wx_fmt=jpeg#imgIndex=4)



而且开源项目的作者参考了社区中分享的优质 AI 编程提示词，塞进了 ZCF，作为系统级提示词，可以最大限度发挥 AI 的性能。

![Image 3](https://mmbiz.qpic.cn/sz_mmbiz_png/ePw3ZeGRruytY0rS6ocz6MpIwmYKbuiaPTBkM4DkYOHoJWCqdsMp6xfPflNf3RYIvKKdteJ1KQawbNAOg3Kg9Mg/640?wx_fmt=png#imgIndex=6)

![Image 4](https://mmbiz.qpic.cn/sz_mmbiz_png/ePw3ZeGRruytY0rS6ocz6MpIwmYKbuiaPtOScdepuUNMGAjLEwUDJlia9BvkuvQYyQ0F80XaVESfGzQqZIvgfgVg/640?wx_fmt=png#imgIndex=7)

![Image 5](https://mmbiz.qpic.cn/sz_mmbiz_png/ePw3ZeGRruytY0rS6ocz6MpIwmYKbuiaP8OVGUNiaChdJXVo0tyIgO4yhAxZOicrJ0W7PSheMwajSADichibhxzib6xw/640?wx_fmt=png#imgIndex=8)

而且智谱 GLM 在工具调用准确性上表现很棒、很稳定，指令遵循的性能是最好的。

如果在 Prompt 工程做得好的情况下，GLM 的表现会非常惊艳，性能比肩 Claude Sonnet，但成本是 Claude Sonnet 的 1/7 。

![Image 6](https://mmbiz.qpic.cn/sz_mmbiz_png/ePw3ZeGRruytY0rS6ocz6MpIwmYKbuiaPINkL4kQoyia5ou5833vsVHJ2yicdUIMGvB5xzicqegb2TmFaxvy9ax6Wg/640?wx_fmt=png#imgIndex=9)

### 

下面教你如何一步步安装 ZCF 并接入智谱的 GLM 模型，把 GLM 的性能拉满。

使用 MacOS 系统举例，打开你的终端，直接输入：npx zcf 命令。

![Image 7](https://mmbiz.qpic.cn/sz_mmbiz_png/ePw3ZeGRruytY0rS6ocz6MpIwmYKbuiaPdHxNhQeuqnI2RxiaIaYmM232XjwJ634sWlgpcyiao7lsJrAUD20BBFjw/640?wx_fmt=png#imgIndex=10)

可以看到，上面就是 ZCF 所有的功能了，如果第一次用。直接输入 1 完成完整初始化就好了。

它会引导你一步步的配置，如果发现你没安装过 Claude Code 会先帮你安装好。

2.1 配置语言 &  模型 API 

![Image 8](https://mmbiz.qpic.cn/sz_mmbiz_png/ePw3ZeGRruytY0rS6ocz6MpIwmYKbuiaPsmT2qZAt4bVapqhGfJCyo8gadicfxibWG67Rcm28ib5BHkg8UyoaJKEcQ/640?wx_fmt=png#imgIndex=11)



然后配置 AI 输出的语言：简体中文。

然后带你进行 API 的配置，这个时候，你可以前往智谱的开放平台，去申请一个 API Key：

```Plain Text
地址：https://bigmodel.cn/usercenter/proj-mgmt/apikeys
```

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/ePw3ZeGRruz5jMBUYJkXb9jRQyqgyFuvIqRNJ62kibk8Iem0BM2uMULvtNUkaghp6l6W2RA6fndBAOApctzhCSA/640?wx_fmt=png#imgIndex=13)

如果没有 token 可用，可以使用下面这个我的专属链接订阅套餐，第一次购买 5 折，而且应邀再减 10%。

```Plain Text
 链接：https://www.bigmodel.cn/claude-code?ic=UX7NF0VZ4S
```

获取到 API Key 后，你可以在 ZCF 终端里面选择 API 认证方式, 使用 Auth Token (OAuth 认证):

```Plain Text
输入 API URL：https://open.bigmodel.cn/api/anthropic
输入 API Key：就是刚刚生成的，粘贴进去就好。
```

2.2 安装工作流

配置完大模型 API，你就要去配置最核心的工作流类型了，这是 ZCF 的精髓：

![Image 9](https://mmbiz.qpic.cn/sz_mmbiz_png/ePw3ZeGRruytY0rS6ocz6MpIwmYKbuiaPpCljk79JcfSL9yrz86ZMs29UwePDWDUmib3OdzicJZAcZMJAZmSb9sOg/640?wx_fmt=png#imgIndex=14)

可以看到，目前 ZCF 支持 5 大核心工作流：

① 通用工具（层级目录初始化 + 通用 agents）

**这个是一个基础配置**，为后续使用 ZCF + Claude Code + GLM 开发提供标准化环境与基础智能支持。

② 六步工作流（workflow）

装了这个后，你只需要在你任务前加一个 /workflow 指令。

就会给你的任务输出多套方案，每一步会询问你的意见，可随时修改方案，掌控力 Max。

③ 功能规划和 UX 设计（feat + planner + ui-ux-designer）

**新功能开发的时候，使用这个工作流就比较靠谱。**

`装了后，你只需要输入 /feat <任务描述> ，开始新功能开发就不会一股脑的直接输出代码，而是 planner` 分析需求制定实现计划，再交给 `ui-ux-designer` 根据计划产出设计稿，最后一步步实施。

④ Git 命令

这个不用多少，把高频 Git 操作封装进去了，你可以使用 /git-commit、/git-rollback 等指令管理你的 AI 生成内容的版本。

⑤ BMAD-Method 扩展安装器

```Plain Text
这个是企业级敏捷开发工作流，企业级的工作流系统，提供：完整的专业 AI 代理团队（PO、PM、架构师、开发、QA 等）
```

```Plain Text
太重了，我没用过这个，有用过的老铁评论区说下感受。
```

2.3 配置风格

你可以安装 AI 助手的提示词风格，是专业严谨的工程师，还是暴躁的技术小哥都行。

我选的是工程师专业版。

![Image 10](https://mmbiz.qpic.cn/sz_mmbiz_png/ePw3ZeGRruytY0rS6ocz6MpIwmYKbuiaPg1X4pTnWsf4efdXT1Y8ZcCR5cTKevztmjVhXN3wibJrbE847q38pFgw/640?wx_fmt=png#imgIndex=15)

2.4 配置 MCP

接下来会问你是不是需要安装 MCP，这些默认预置的 MCP 都是老朋友了。感兴趣去翻翻我之前的文章，都是神器。

![Image 11](https://mmbiz.qpic.cn/sz_mmbiz_png/ePw3ZeGRruytY0rS6ocz6MpIwmYKbuiaPwzKmNuUcoNW2oDOv9fgQKZibPyxVUia36243Jedne0rbCxps7XiaEA1hw/640?wx_fmt=png#imgIndex=16)

最后还会带你安装 CCometixLine 状态栏工具，监控 token 使用情况、Git 状态信息等。

你可以再配置一下默认的模型，推荐国产 AI 模型 GLM 4.6。

至此，你就完成了所有的配置，

2.5 配置完成，打开 Claude

然后打开 Claude 你就会发现下面显示了当前的模型、文件目录、token 使用量的状态栏。

![Image 12](https://mmbiz.qpic.cn/sz_mmbiz_png/ePw3ZeGRruytY0rS6ocz6MpIwmYKbuiaP9emlAYLULaJicuOA9UQtXicDKmYHBgKqZfJgzYOpwlXEr7mp45QYlebQ/640?wx_fmt=png#imgIndex=17)

而且输入命令 /zcf 会发现很多新的命令，每一个命令是干嘛的都有标注。

![Image 13](https://mmbiz.qpic.cn/sz_mmbiz_png/ePw3ZeGRruzfZia3s3geOhWuEiciajic02VBfLh3NkTnC8sqBwiamqbBmeTsnibMWxF0C6arLzAJaXVx13jFOaK4zQyw/640?wx_fmt=png&from=appmsg#imgIndex=18)

### 

接下来，我分别使用如下条件，输入这个提示词：请总结《思考快与慢》书籍的核心内容，生成一个美漫风格的长图卡片。

- GLM 4.6 + ZCF + Claude Code

- GLM 4.6 + Claude Code（无 ZCF 加持）

- Claude Sonnet 4

- Claude Sonnet 4.5

先来看 GLM 4.6 + Claude Code（无 ZCF 加持的效果）：



已关注



Follow

Replay Share Like

Close

**观看更多**

更多







*退出全屏*



*切换到竖屏全屏退出全屏*

逛逛GitHub已关注



Share Video

，时长00:07

0/0

00:00/00:07

切换到横屏模式

继续播放

[ ]

进度条，百分之0



[Play](javascript:;)

00:00

/

00:07

00:07

[倍速](javascript:;)

*全屏*

倍速播放中

[0.5倍 ](javascript:;)[0.75倍 ](javascript:;)[1.0倍 ](javascript:;)[1.5倍 ](javascript:;)[2.0倍](javascript:;)

[超清 ](javascript:;)[流畅](javascript:;)

![http://mmbiz.qpic.cn/sz_mmbiz_jpg/ePw3ZeGRruzfZia3s3geOhWuEiciajic02VBbP1diaPtXvFTsWcn9a7QBS4mU5lTFmxJ7dOSnvP4MZqtJc1WqXYTr7w/0?wx_fmt=jpeg&wxfrom=16](网友发现的+Claude+Code+神器：直接拉爆国产+AI+模型表现。+73954d98-dec1-4e05-9968-69b9639f6810/Your+browser+do.jpg)



继续观看

网友发现的 Claude Code 神器：直接拉爆国产 AI 模型表现。

观看更多

转载

,

网友发现的 Claude Code 神器：直接拉爆国产 AI 模型表现。



逛逛GitHub已关注

Share点赞Wow

Added to Top Stories[Enter comment](javascript:;)



[Video Details](javascript:;)

再是 Claude Sonnet 4：



已关注



Follow

Replay Share Like

Close

**观看更多**

更多







*退出全屏*



*切换到竖屏全屏退出全屏*

逛逛GitHub已关注



Share Video

，时长00:06

0/0

00:00/00:06

切换到横屏模式

继续播放

[ ]

进度条，百分之0



[Play](javascript:;)

00:00

/

00:06

00:06

[倍速](javascript:;)

*全屏*

倍速播放中

[0.5倍 ](javascript:;)[0.75倍 ](javascript:;)[1.0倍 ](javascript:;)[1.5倍 ](javascript:;)[2.0倍](javascript:;)

[超清 ](javascript:;)[流畅](javascript:;)

![http://mmbiz.qpic.cn/sz_mmbiz_jpg/ePw3ZeGRruzfZia3s3geOhWuEiciajic02VBmxEofuHFMKhG640icXHgRyxbEwFmJEKb9ovSJicvGqqmlB86z7CYQVIQ/0?wx_fmt=jpeg&wxfrom=16](网友发现的+Claude+Code+神器：直接拉爆国产+AI+模型表现。+73954d98-dec1-4e05-9968-69b9639f6810/Your+browser+do 1.jpg)



继续观看

网友发现的 Claude Code 神器：直接拉爆国产 AI 模型表现。

观看更多

转载

,

网友发现的 Claude Code 神器：直接拉爆国产 AI 模型表现。



逛逛GitHub已关注

Share点赞Wow

Added to Top Stories[Enter comment](javascript:;)



[Video Details](javascript:;)

Claude Sonnet 4.5：



已关注



Follow

Replay Share Like

Close

**观看更多**

更多







*退出全屏*



*切换到竖屏全屏退出全屏*

逛逛GitHub已关注



Share Video

，时长00:06

0/0

00:00/00:06

切换到横屏模式

继续播放

[ ]

进度条，百分之0



[Play](javascript:;)

00:00

/

00:06

00:06

[倍速](javascript:;)

*全屏*

倍速播放中

[0.5倍 ](javascript:;)[0.75倍 ](javascript:;)[1.0倍 ](javascript:;)[1.5倍 ](javascript:;)[2.0倍](javascript:;)

[超清 ](javascript:;)[流畅](javascript:;)

![http://mmbiz.qpic.cn/sz_mmbiz_jpg/ePw3ZeGRruzfZia3s3geOhWuEiciajic02VBjNw9WOGibLO60T0BDXUibWmcMf6XTtZZl6ZUzIctQ2sLicHmIr75uc7qg/0?wx_fmt=jpeg&wxfrom=16](网友发现的+Claude+Code+神器：直接拉爆国产+AI+模型表现。+73954d98-dec1-4e05-9968-69b9639f6810/Your+browser+do 2.jpg)



继续观看

网友发现的 Claude Code 神器：直接拉爆国产 AI 模型表现。

观看更多

转载

,

网友发现的 Claude Code 神器：直接拉爆国产 AI 模型表现。



逛逛GitHub已关注

Share点赞Wow

Added to Top Stories[Enter comment](javascript:;)



[Video Details](javascript:;)

GLM 4.6 + ZCF + Claude Code：



已关注



Follow

Replay Share Like

Close

**观看更多**

更多







*退出全屏*



*切换到竖屏全屏退出全屏*

逛逛GitHub已关注



Share Video

，时长00:17

0/0

00:00/00:17

切换到横屏模式

继续播放

[ ]

进度条，百分之0



[Play](javascript:;)

00:00

/

00:17

00:17

[倍速](javascript:;)

*全屏*

倍速播放中

[0.5倍 ](javascript:;)[0.75倍 ](javascript:;)[1.0倍 ](javascript:;)[1.5倍 ](javascript:;)[2.0倍](javascript:;)

[超清 ](javascript:;)[流畅](javascript:;)

![http://mmbiz.qpic.cn/sz_mmbiz_jpg/ePw3ZeGRruzfZia3s3geOhWuEiciajic02VBOe4eX0JG6iawaEXc7c89a9kalX4GXYZxSt0pU1WW5dHwGehpqWGcyZA/0?wx_fmt=jpeg&wxfrom=16](网友发现的+Claude+Code+神器：直接拉爆国产+AI+模型表现。+73954d98-dec1-4e05-9968-69b9639f6810/Your+browser+do 3.jpg)



继续观看

网友发现的 Claude Code 神器：直接拉爆国产 AI 模型表现。

观看更多

转载

,

网友发现的 Claude Code 神器：直接拉爆国产 AI 模型表现。



逛逛GitHub已关注

Share点赞Wow

Added to Top Stories[Enter comment](javascript:;)



[Video Details](javascript:;)

我输入的提示词都是一样的，可以看到不管是从动效、色彩搭配、内容丰富度，ZCF 加持后的 GLM 看起来更是那么一回事儿。

还有很多 Case 后面在陆续试试，有新的发现在告诉大家，先把这个开源项目分享出来。

ZCF 再配合智谱最近推的 GLM 编程套餐，基本上我愿意称之为最强组合，基本上再也不用担心 Token 的消耗，爽用了。

![Image 14](https://mmbiz.qpic.cn/sz_mmbiz_png/ePw3ZeGRruzfZia3s3geOhWuEiciajic02VB7eVf14LsttBFyq9S9v9TCT3A5HeUU41ZWgkPbBWtj97ibQNbzFpaOsQ/640?wx_fmt=png&from=appmsg#imgIndex=19)

```Plain Text
开源地址：https://github.com/UfoMiao/zcf
智谱套餐：https://zhipuaishengchan.datasink.sensorsdata.cn/t/mh
```

04

**点击下方卡片，关注逛逛 GitHub**

这个公众号历史发布过很多有趣的开源项目，如果你懒得翻文章一个个找，你直接关注微信公众号：逛逛 GitHub ，后台对话聊天就行了：

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/ePw3ZeGRrux2sRxwJzmfe1lK8ic33XvtVPsIPCMV7hjicmScibtxIZ1NsjXxNoVNMb3zLy32Al7PSpfbVAtrACYqQ/640?wx_fmt=png&from=appmsg&wxfrom=5&wx_lazy=1&wx_co=1&tp=webp#imgIndex=11)

