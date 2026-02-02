---

title: 昨天意外发现了一个开源项目，AI编程再也不用操心后端了，爽歪歪！
date: 2025-11-12
tags: ["AI", "人工智能", "智能体", "Agent", "AI编程", "代码助手"]
category: AI编程
---


# 昨天意外发现了一个开源项目，AI编程再也不用操心后端了，爽歪歪！

Original 轩辕之风 [轩辕的编程宇宙](javascript:void(0);)*2025年11月12日 16:52* *四川*

大家好，我是轩辕。

今年AI编程大火，很多AI编程工具争奇斗艳，但我发现了一个现象：

这些AI编程工具在演示的时候都是开发一个非常漂亮的前端页面，然后告诉你：你看，我们的AI编程好牛逼，多么炫酷的界面！

![Image](https://mmbiz.qpic.cn/mmbiz_jpg/jXQDbLkGBYXFG61DsXtlWtExiblLvXHSO6GYfd3KhMaehQmf32RCR9Ks17ML2AO7OArW3Pkhgs29fCMR2GIOXkg/640?wx_fmt=jpeg#imgIndex=0)

可是编程不是好看就行，它需要一套完整的业务，不仅要一套好看的皮，背后还需要后端业务的支持，否则就只是花瓶，中看不中用。

理论上AI也能写后端代码，但接下来你要面对的是:

- 部署数据库

- 配置环境、安装依赖

- 创建数据表、写SQL

- 部署后端服务、配置域名...

对于本来就是程序员的同学来说，问题不太大，但终归是麻烦了一些。

但对于本身就不是太懂编程的人来说，受到零基础上手AI编程的感召跳坑，结果就栽倒在这坑里爬不出来了···

## 为什么后端不能像前端一样简单?

说到这里，可能有人会想到`Supabase`——确实，它提供了现成的后端服务。但问题是:

- 配置还是需要手动操作

- AI工具不能直接调用它的能力

- 前后端开发流程被割裂了

重要的是，Supabase对国内互联网生态支持不是太好，比如与微信、钉钉、飞书这些平台的对接。

那能不能有一个方案，让AI编程工具从头到尾一气呵成?

**AI不只把前端写好，后端的服务、API、甚至数据库服务和数据库表也跟着自动准备好，拿来就能用，不需要我操任何心?**

带着这个想法，我发现了**AipexBase**。

![Image 1](https://mmbiz.qpic.cn/mmbiz_jpg/jXQDbLkGBYXFG61DsXtlWtExiblLvXHSOuj1ebnWAJgXryCJnM4JvpsbjfQicPasK2nvzXPIx2QjYFY8zuCfaj6w/640?wx_fmt=jpeg&from=appmsg#imgIndex=1)

AipexBase是一个BaaS(Backend as a Service)服务，它最舒服的地方在于——**通过MCP协议直接对接AI编程工具**。

什么意思呢?简单说就是:

**用你手头的AI编程工具，不仅能写代码，还能直接调用AipexBase的能力来创建数据库、部署后端服务！**

![Image](https://mmbiz.qpic.cn/mmbiz_png/jXQDbLkGBYXFG61DsXtlWtExiblLvXHSOzmtb8so0TibpVxVBBYibuscRLicFUq3iaMj4yKWTI5Hjqw5rqjelK7A6iaA/640?wx_fmt=png&from=appmsg#imgIndex=2)

它的工作机制是这样的:

- 在ClaudeCode等AI工具中配置好AipexBase的MCP服务

- 当AI需要后端能力时,自动调用AipexBase的API

- AipexBase在后台帮你创建数据表、生成接口、部署服务

- 你的前端代码直接就能调用这些后端能力

整个过程，你不需要登录服务器、不需要写部署脚本、甚至不需要知道数据库在哪里。

**AI说一声"我需要一个用户表"，AipexBase就给它造一个出来。**

![Image 1](https://mmbiz.qpic.cn/mmbiz_png/jXQDbLkGBYXFG61DsXtlWtExiblLvXHSO6zGV5Ljw9VibRyhabeEwIc1fy64TQoFibSXvokXxVUc4xnQI0VXUOcdg/640?wx_fmt=png&from=appmsg#imgIndex=3)

接下来我通过一个具体的案例给大家感受一下这个神奇的过程，因为我还是习惯Claude Code命令行工具，所以下面就用这个工具来演示，大家可以根据自己实际情况调整。

## ClaudeCode+AipexBase实操演示

先介绍一下我的一个产品需求：

> 我现在每天有很多事情要处理，要准备公众号文章、产品迭代开发、学习AI大模型技术、B站更新、知识星球运营等等事务，同时还有很多临时的突发的事情需要处理。

我需要一个产品来帮我管理这些事务，按照重要和紧急两个维度分成四个象限。

### 1、配置过程

在开始之前，需要先去AipexBase平台创建一个应用。

AipexBase目前已经开源了，大家可以下载后自己部署一套。我这里为了简单，直接使用了他们提供的一个测试地址。

点击右上角“添加应用”创建一个应用：

![Image 2](https://mmbiz.qpic.cn/mmbiz_png/jXQDbLkGBYXFG61DsXtlWtExiblLvXHSOpic2GicTchj94pXtYgIaFvM0wLfq5OY9MHrga2eJgXsFqicnuibuVOlPng/640?wx_fmt=png&from=appmsg#imgIndex=4)

创建之后，点击下面的“API秘钥”生成一个秘钥：

![Image 2](https://mmbiz.qpic.cn/mmbiz_jpg/jXQDbLkGBYXFG61DsXtlWtExiblLvXHSOT63YnfWiboMjc78cEoqjTUSZygCsCPa7vexUWQ5OjhgFugAxOadIWUA/640?wx_fmt=jpeg&from=appmsg#imgIndex=5)

另外顺便可以看一下数据表这里，目前刚刚创建的新应用，这里是空白的，等会AI就会调用MCP服务创建数据表，就能看到了。

![Image 3](https://mmbiz.qpic.cn/mmbiz_png/jXQDbLkGBYXFG61DsXtlWtExiblLvXHSOM9NdxibZFvwic7XFPZLzicv7ISrpSCgW1ficIn0wPfU6drYqfgm1Y8xNhw/640?wx_fmt=png&from=appmsg#imgIndex=6)

拿到刚刚生成的秘钥之后，然后在命令行下通过下面的命令，给Claude Code配置一个MCP服务：

> claude mcp add --transport sse baas-mcp-server http://124.71.176.202/mcp/sse?token=kf_api_***

这里的IP地址大家记得换成自己部署的AipexBase平台地址。然后把前面拿到的api_key换到这里的token后面的参数。

这条命令执行完成之后，执行`Claude`命令进入交互式环境，然后执行`/mcp`，

![Image 4](https://mmbiz.qpic.cn/mmbiz_png/jXQDbLkGBYXFG61DsXtlWtExiblLvXHSOtd0iaR3Hh59BGpKIIANFb5fTvtWiaOicsEqCY0OdJdLqW226SycdFe5Bg/640?wx_fmt=png&from=appmsg#imgIndex=7)

看到绿色对勾Connected，就表示MCP服务就绪啦！

### 2、开发体验

接下来就可以开始开发应用了！

先执行/baas-mcp-server，激活Aipex工作流，然后把我的产品提示词发给ClaudeCode：

![Image 5](https://mmbiz.qpic.cn/mmbiz_png/jXQDbLkGBYXFG61DsXtlWtExiblLvXHSOZaQXsiaicw8MicRcyGGrsBIAlGfoIJmqicdVm0a3yGzIgs3P9mMJhgd56A/640?wx_fmt=png&from=appmsg#imgIndex=8)

确认之后开始干活，几分钟之后，一切就绪。

咱们再去刚刚AipexBase平台看看，数据表建好了：

![Image 6](https://mmbiz.qpic.cn/mmbiz_png/jXQDbLkGBYXFG61DsXtlWtExiblLvXHSOucM1m2UXo3ZIbsOtqI3ouCTDSpzRCTGOm1S3tbWr8hbHibfecGay1ibA/640?wx_fmt=png&from=appmsg#imgIndex=9)

但是现在还没有数据，接下来，打开应用。

在VSCode里面打开Claude Code为我开发的应用，执行`npm install`和`npm run start`。

浏览器里就能看到这个应用了：

![Image 3](https://mmbiz.qpic.cn/mmbiz_jpg/jXQDbLkGBYXFG61DsXtlWtExiblLvXHSOcGA3FDD4CgTz3VTD1dJh9kBuDnNicEicJpEPztWg8M2gnxBeI01mF2uQ/640?wx_fmt=jpeg&from=appmsg#imgIndex=10)

这该死的蓝紫渐变色，我已经看到吐了🤪🤪🤪

来注册一下用户：

![Image 7](https://mmbiz.qpic.cn/mmbiz_png/jXQDbLkGBYXFG61DsXtlWtExiblLvXHSOmwYzHGA8lmrNbeC3LbcYiaIVQ2aofSyu0AZhAcGoYKa8SRL9tPOqfAg/640?wx_fmt=png&from=appmsg#imgIndex=11)

成功注册了，再看看AipexBase数据表，有记录了！

![Image 8](https://mmbiz.qpic.cn/mmbiz_png/jXQDbLkGBYXFG61DsXtlWtExiblLvXHSOmlxllsReic0mDU2EraVduePTrkNwoHWLoah4iawNsHc1icw84QHPc96icg/640?wx_fmt=png&from=appmsg#imgIndex=12)

接下来来登录一下，可以成功登录：

![Image 9](https://mmbiz.qpic.cn/mmbiz_png/jXQDbLkGBYXFG61DsXtlWtExiblLvXHSOLibG4jHttcpaMEic4C8yhzFHtImY1RjtAMibJfH7DDaNwJcic5pH4t90NA/640?wx_fmt=png&from=appmsg#imgIndex=13)

创建几个事务来看看：

![Image 10](https://mmbiz.qpic.cn/mmbiz_png/jXQDbLkGBYXFG61DsXtlWtExiblLvXHSOQElYyEWk0YJjicYv9o4PjNcMkwFcXERt0RxvnnicZib6AfFyg53CGB2sg/640?wx_fmt=png&from=appmsg#imgIndex=14)

已经初步具备我要的那个意思了，接下来就是打磨UI界面了。

你看，整个过程，我完全没有操心后端的事儿，后端服务在哪里，数据库怎么部署，库表怎么建，这些全部给我自动化了！

这才是AI全栈编程的魅力啊！

## 开源、免费，还能私有部署

到这里你可能要问了：我确实不用操心后端了，但数据给我存在哪里的，安不安全啊？

前面说了，**AipexBase是完全开源的**。

GitHub地址:

> https://github.com/kuafuai/aipexbase

这意味着，也完全可以把它部署在自己的服务器上，数据完全掌握在自己手里，不用担心数据隐私安全性问题。

对于企业用户来说，私有部署这个特性尤其重要——你不用担心数据安全问题，也不用担心服务商跑路。

## 使用心得和注意事项

玩了几天下来，我总结了一些经验:

**适合的场景:**

- 快速验证产品想法(MVP开发)

- 个人项目、小团队项目

- 不需要复杂架构的中小型应用

**需要注意的点:**

- 目前对于超复杂的业务逻辑，还是需要一定的人工干预

- 和AI沟通的时候，尽量描述清楚你的需求,这样AI调用AipexBase的效果会更好

## 写在最后

AI编程正在改变我们写代码的方式，但真正落地使用，还需要像AipexBase这样的工具来补齐最后一公里。

它不是万能的，但确实解决了一个真实的痛点。

如果你也经常用AI写代码，如果你也被后端部署折磨过，不妨试试AipexBase。

去GitHub上看看，跑个demo体验一下。如果觉得有用，给个Star鼓励一下开发团队吧~

> https://github.com/kuafuai/aipexbase

我是轩辕，咱们下期再见~

## 往期推荐

- [一个神奇的网站：在线版“Wireshark”！](https://mp.weixin.qq.com/s?__biz=MzIyNjMxOTY0NA==&mid=2247504004&idx=1&sn=64141adc69cc0d511aff67401c6d76c0&scene=21#wechat_redirect)

- [我用Claude Code开发了一个个人网站！](https://mp.weixin.qq.com/s?__biz=MzIyNjMxOTY0NA==&mid=2247503312&idx=1&sn=183247acd07878d510d46cc64ddd0a87&scene=21#wechat_redirect)

- [耗时两个月，我开发了一个半自动逆向分析VMProtect工具！](https://mp.weixin.qq.com/s?__biz=MzIyNjMxOTY0NA==&mid=2247503264&idx=1&sn=e9e32adad8714c98ac2715f7982b75d1&scene=21#wechat_redirect)

- [如何学习操作系统？](https://mp.weixin.qq.com/s?__biz=MzIyNjMxOTY0NA==&mid=2247491801&idx=1&sn=5654243b1b21dd63ad13fe97688637a2&scene=21#wechat_redirect)

- [如何学习计算机网络？](https://mp.weixin.qq.com/s?__biz=MzIyNjMxOTY0NA==&mid=2247490125&idx=1&sn=d8c478903dfe666f7d8df831c4e32008&scene=21#wechat_redirect)

- [如何学习C/C++编程？](https://mp.weixin.qq.com/s?__biz=MzIyNjMxOTY0NA==&mid=2247490759&idx=1&sn=de1e974bcbedb95838252c7cbe91f214&scene=21#wechat_redirect)

- [如何学习网络安全？](https://mp.weixin.qq.com/s?__biz=MzIyNjMxOTY0NA==&mid=2247486440&idx=1&sn=bd4949562817dc506294e6a3696dd5db&scene=21#wechat_redirect)

- [程序员赛道太卷，逆向工程师怎么样？](https://mp.weixin.qq.com/s?__biz=MzIyNjMxOTY0NA==&mid=2247500286&idx=1&sn=394d9893064030f695ef9bc7cf2c28c1&scene=21#wechat_redirect)

