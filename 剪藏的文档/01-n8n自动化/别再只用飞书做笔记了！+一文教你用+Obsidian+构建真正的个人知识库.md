---

title: 别再只用飞书做笔记了！ 一文教你用 Obsidian 构建真正的个人知识库
date: 2025-11-28
tags: ["飞书", "n8n", "工作流自动化"]
category: 办公协作
---


# 别再只用飞书做笔记了！ 一文教你用 Obsidian 构建真正的个人知识库

Original 陈序员大康 [陈序员大康AI](javascript:void(0);)*2025年11月28日 15:21* *福建*



在小说阅读器中沉浸阅读

在没有接触Obsidian之前，我一直使用飞书作为我的写文章和记录的工具，也挺好用的，就是笔记太零散，而且如果要让笔记作为知识库被AI直接使用，还需要一系列操作，比如向量化什么的。 又或者说，我只是想让豆包帮我修改我的文章，我得先复制到豆包，然后再复制回来，非常的不方便。 于是我就准备找个更适合的工具，在网络一通搜索，发现许多大佬都在推荐使用Obsidian。 一通体验之后：这真的是最适合个人打造知识库的绝佳工具

## Obsidian是什么？为什么选择 Obsidian

Obsidian是一款基于Markdown语法编辑的笔记软件，它有以下特点：

- 数据主权：所有笔记都是本地 Markdown 文件，开放、可迁移、无锁定风险。

- 双向链接与图谱：像搭乐高一样把知识相互关联，形成可视化知识网络，利于复盘与“串联学习”。

- 插件生态强：从日记、任务管理到学术引用、代码片段，应有尽有，可按需扩展。

- 纯文本友好：Markdown 可版本化、可 Git 管理、可与任意编辑器协作，长期可靠。

- 跨平台与性能：Windows / macOS / Linux 均可，启动快、文件管理直观。

- 收费情况：软件的使用完全免费

一句话：Obsidian 是“把你的知识资产掌握在自己手里”的最佳载体。

接下来，我将详细分享Obsidian从安装到使用完整的步骤，以及使用过程的一些技巧分享，让你通过这一篇内容就能掌握Obsidian的使用

## 安装与基础配置

- 下载与安装：前往官网 https://obsidian.md 下载对应平台安装包，完成安装。

- 创建库：首次启动选择“创建新的库”，例如命名为 obsidian，选择一个本地文件夹作为库根目录。

- 基础设置建议：

    ![Image](https://mmbiz.qpic.cn/mmbiz_png/g6hYyF67xN0SOzY3N65Ir0954ShphicDOlpmAribqricEVx8vXr3ToAtPF93TCrI9icHCLJnqRJNfD1vU9D20bRIFw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=0)

- 

    - 启用“文件与链接”里的“自动更新内部链接”，防止重命名后链接失效。

    - 主题与外观按喜好调整，建议保持简洁、暗色更护眼。

- 

    - 打开“社区插件”，启用“第三方插件”，后续我们需要安装许多辅助插件来更方便的使用。

## 技巧1：配置辅助工具栏

obsidian是使用Markdown语法来排版的，如果我们不是很熟悉Markdown语法就不好排版，因此我们需要一个类似于其他编辑器一样的工具栏辅助会更方便一些

![Image 1](https://mmbiz.qpic.cn/mmbiz_png/g6hYyF67xN0SOzY3N65Ir0954ShphicDOdA96UkuiaSTUE0x8SuENyibeRuIDmLfvqSwM44oicJu1SgUU6dzPIEzNA/640?wx_fmt=png&from=appmsg#imgIndex=1)

像这样的工具栏默认是不存在的，我们需要安装第三方插件来扩展 我们之前已经打开了第三方插件，现在我们点击这个插件市场打开

![Image 2](https://mmbiz.qpic.cn/mmbiz_png/g6hYyF67xN0SOzY3N65Ir0954ShphicDOSvpPf7kGbzNYEWhkW6KI8NqMxD4HUN30mqehlULKU3mmfTk1avs6Lg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=2)

然后我们在这里搜索一下 Editing Toolbar 找到以下工具进行安装，我这里是已经安装好了

![Image 3](https://mmbiz.qpic.cn/mmbiz_png/g6hYyF67xN0SOzY3N65Ir0954ShphicDO6ibBMNS5SYjMcOvNM5gAJuOFIE1picibrZ3NIkDLRXeB3Lj21xeCB1LJA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=3)

安装成功之后需要回到插件页面，在这里启用一下回到笔记页面，就能看到工具栏了

![Image 4](https://mmbiz.qpic.cn/mmbiz_png/g6hYyF67xN0SOzY3N65Ir0954ShphicDO41D0hAeWbryEWaOXmVhPLHCKtssibBE9aXuZP0KXrbnYE09rhIbZoibA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=4)

ps：安装插件最好要挂梯子或开加速器，否则很慢，且容易失败

## 技巧2：配置html预览工具

有些时候我们可能需要将笔记发布到其他平台，比如说飞书，因为我可能需要分享给别人，这时候如果我们之间复制内容粘贴，你会发现，粘贴到编辑器上的内容要么样式丢失、要么图片丢失了，比如下面这个加粗的没有体现，而是变成了Markdown原字符串

![Image 5](https://mmbiz.qpic.cn/mmbiz_png/g6hYyF67xN0SOzY3N65Ir0954ShphicDOcz6EbBspq9zicYvpRfkIxH8ZYmJDfR239Ajo9LkGH4WM0Kjn1txKb8w/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=5)

为了解决这个问题，我们需要用到一个插件，插件安装跟前面一样

![Image 6](https://mmbiz.qpic.cn/mmbiz_png/g6hYyF67xN0SOzY3N65Ir0954ShphicDOYrPR6MSFdTQBYJGno9icgjer3ECQ9Sfw67vRkvbYz6dq5Auz5JkJ2VQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=6)

安装好之后，我们在写完笔记之后找到右上角的按钮，选择”以html形式预览“

![Image 7](https://mmbiz.qpic.cn/mmbiz_png/g6hYyF67xN0SOzY3N65Ir0954ShphicDOg8PvIK60iaUGjYpGkxd9jW4U5YLRB7fwqrT2OT8hK11z1NNgnhicy7OA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=7)

然后，就能看到html预览页面了，这个时候我们选择“复制内容到平台”就能轻易的将内容包括格式复制飞书上了

![Image 8](https://mmbiz.qpic.cn/mmbiz_png/g6hYyF67xN0SOzY3N65Ir0954ShphicDOCcVcTLNkOb0wZiaXiasZCEHY7iaaee4iafZ9F4rOgSj8m6GVHuejsLdxeg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=8)

对了，我找到了个飞书同步插件，不过配置麻烦些，后面单独写一篇分享

## 技巧3：配置自动保存图片

有时候我们会从其他地方，比如飞书或者知乎等平台直接拷贝一些内容到Obsidian的时候，图片链接会是原平台的，如果原图片失效，就会导致我们笔记里的图片缺失，因此我们需要一个插件，可以自动将远程图片保存到本地，这样我们Obsidian中的笔记图片永远不会缺失了。 找到以下这个插件安装

![Image 9](https://mmbiz.qpic.cn/mmbiz_png/g6hYyF67xN0SOzY3N65Ir0954ShphicDOFuG4X0ncjjXxz5nGqr78zmSiavATxic6kaZFS6tETBObC0l1T9zicODew/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=9)

然后按照如图配置一下这个选项，这个选项是设定图片保存的路径

![Image 10](https://mmbiz.qpic.cn/mmbiz_png/g6hYyF67xN0SOzY3N65Ir0954ShphicDOCST53df0m4oDnFkjwBpJolxicOSoEjCoJ4TjExsNlRhuZvxtkXPsNlw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=10)

不设置也可以，会保存在根目录，设置之后的话会统一放到一个_resources下，然后对应文章的图片放到对应文章命名的文件下，如图：

![Image 11](https://mmbiz.qpic.cn/mmbiz_png/g6hYyF67xN0SOzY3N65Ir0954ShphicDOuYP2mQzVuzs7tfyHenAHU5wTKLZibIiaLRuCiaFAicRR493rZrZxnkMUIw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=11)

## 技巧4：使用TRAE辅助写作

其实其他AI编程工具也可以哈，只是我目前在用TRAE，而且这个对大多数人门槛不高。 为什么使用TRAE来创作？ 通过前面的介绍，我们知道，Obsidian是一个Markdown编写的笔记，而Markdown对AI天然友好。这样我们可以直接使用TRAE来写笔记，一方面，写完直接就在Obsidian中，另一方面，TRAE可以直接将Obsidian中的笔记当做我们的知识库,通过这样的搭配，AI将更懂我们，写的内容也更符合我们的要求。 大家到TRAE官网 国内版： https://www.trae.cn 国外版： https://www.trae.ai 直接下载软件安装,如果需要使用国外大模型gpt5、gemini3等等，建议安装国外版，不过在登录的时候需要梯子。

安装完成后，我们直接在 TRAE 中打开 Obsidian 所在的文件夹

![Image 12](https://mmbiz.qpic.cn/mmbiz_png/g6hYyF67xN0SOzY3N65Ir0954ShphicDOT583ZtbRro8HotNoM9b8Sy6CaDpibBvyZicofbyINqoPaLD7ImWHqDqg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=12)

选择Obsidian笔记所在文件夹，也就是我们首次创建仓库时选择的文件夹，也就是我们笔记所在的文件夹。然后我们就能看到笔记就加载进来了

![Image 13](https://mmbiz.qpic.cn/mmbiz_png/g6hYyF67xN0SOzY3N65Ir0954ShphicDOEO3SkEJUibGicCu3GgJ8RcSszZBosvsH7XR3JGVYib1PAVxTKYynW3micg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=13)

这个时候我们直接在右下角输入要求就可以创作了，记得要将智能体选择为Builder模式 ，如果需要Mcp扩展功能，可以选择Mcp

![Image 14](https://mmbiz.qpic.cn/mmbiz_png/g6hYyF67xN0SOzY3N65Ir0954ShphicDOoqxTR9DQEBtSichorJX2jSQa1fQgGiarqjic8SujD14icG7NAGq1ymJweA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=14)

在输入框输入[#之后](javascript:;)，我们通过选择特定的文件、或者文件夹，就能够将里面的内容作为知识库喂给大模型了，相当方便，当然了我们也可以指定某个文件，让它润化和修改。

![Image 15](https://mmbiz.qpic.cn/mmbiz_png/g6hYyF67xN0SOzY3N65Ir0954ShphicDOClSsl9SfYIQflMCDuhNpEiaQ9iaECDsJIIRYWGNU0RQOtyLavwIibQz9Q/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=15)

刚开始如果你一篇文章都没有，在要求大模型写的时候，需要告诉它生成Markdown文件和使用Markdown语法，到后面因为文件夹里已经有这样的文件，大模型就知道规律了。 因为TRAE和Obsidian其实是共用笔记文件的，因此在TRAE中写好之后，打开Obsidian就能看到笔记效果，如果AI写的不满意，可以直接在TRAE中让修改。

所写即所得，不像我们使用其他AI工具写，写完还要复制到笔记中，还有可能存在格式混乱的问题。简直不要太方便！

## 进阶技巧：以Api或Mcp的方式使用Obsidian

对大多数人来说，上面使用trae的方式已经是够用了，但是由于Obsidian没有云端只有本地文件，倘若我们换了一台电脑，或者说想在n8n、coze工作流之类的工作流中使用我们的文档内容，在不做特殊配置的情况下，就无法实现。

为了更灵活的使用我们的Obsidian，因此我们需要将Obsidian变成Api接口让其可以在工作流中调用。 不过打造Api有门槛，需要将本地的Obsidian配置成公网可访问，因此，要么你使用服务器安装Obsidian，要么你需要给自己电脑设置内网穿透。 （如果你是我的星球成员，我可以给我提供一个免费的内网穿透工具，有需要的呼我） 如果满足以上条件，我们开始配置!

### 1、安装Api插件

找到这个# Local REST API 插件安装，这个插件会将Obsidian的功能转化为Api接口

![Image 16](https://mmbiz.qpic.cn/mmbiz_png/g6hYyF67xN0SOzY3N65Ir0954ShphicDOjpW1ve8tv76o1lTPOxWh99gq5cic5XRL9GHLPrmoZg9cFzhgjgIYoIg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=16)

安装完成之后，启用，然后按照以下配置，那个127.0.0.1的两个网址，就是Api地址了，如果你只需要在当前电脑使用，现在就可以使用了，具体的接口参数，可以查看这个文档 https://coddingtonbear.github.io/obsidian-local-rest-api/

![Image 17](https://mmbiz.qpic.cn/mmbiz_png/g6hYyF67xN0SOzY3N65Ir0954ShphicDOxlHEoq4DHbR6ibbuqibxAnPYHAu2ZkSOUDwKibGeza9uMZfI8TibAVCfeQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=17)

如果你需要在coze或者n8n或者别的电脑使用，就需要把，两个接口做内网穿透，那么n8n和coze中就可以通过http 请求节点来请求接口了。

### 2、集成到MCP中

使用Api的方式还需要了解接口的请求，对于一点也不懂程序的人来说还是偏麻烦的，更为简便的方式是将Api集成到MCP中，只要是支持MCP工具调用的工具都可以使用，这里我还是使用Trae来做示例。 首先，我们修改以下的配置内容，把中文介绍处，替换成你自的配置；

```Plain Text
{
  "mcpServers": {
    "obsidian-mcp-server": {
      "command": "npx",
      "args": ["obsidian-mcp-server"],
      "env": {
        "OBSIDIAN_API_KEY": "这里填写第一步插件里的Apikey",
        "OBSIDIAN_BASE_URL": "这里填写你内网穿透之后的接口访问地址http://abc.kanglan.vip:27123",
        "OBSIDIAN_VERIFY_SSL": "false",
        "OBSIDIAN_ENABLE_CACHE": "true"
      },
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

然后我们打开trae工具，添加新的MCP工具

![Image 18](https://mmbiz.qpic.cn/mmbiz_png/g6hYyF67xN0SOzY3N65Ir0954ShphicDOfHia7WeL8lJFaxddbGEjTQB5x3kC4uBKNuPNJDGPLrdcLsgzu6gN3kQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=18)

我们选择手动添加，然后把前面修改好的代码复制进来，点击确认，等待安装完毕

![Image 19](https://mmbiz.qpic.cn/mmbiz_png/g6hYyF67xN0SOzY3N65Ir0954ShphicDOwvmC4Jt8huEghWzus2nu3ia0bQmEmvHibwmaLIrKkgKLltjI2ayhx2aA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=19)

当看到出现这个打勾状态，就说明安装成功了

![Image 20](https://mmbiz.qpic.cn/mmbiz_png/g6hYyF67xN0SOzY3N65Ir0954ShphicDOPbz8zypkU2Q8MlGriaKnqNPcnTN85nAMaVIKpib8gGibQFk3VBcia5MlaQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=20)

我们回到trae的聊天窗口，测试一下，可以看到成功查询到了数据。

![Image 21](https://mmbiz.qpic.cn/mmbiz_png/g6hYyF67xN0SOzY3N65Ir0954ShphicDO95JH3y0Ue9qeLNiazjtbWzibNHicchcF7vuohhwJicuYS1OQRAOFgZU9eg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=21)

这里我想说一下，虽然MCP的方式更灵活，除非是工作流使用。如果只是平常创作写内容，个人感觉还是直接使用技巧4的方法，直接打开仓库更稳定便捷。

好了，今天的分享就到这里了，又是一篇干货满满的内容，如果对你有帮助，请给我个鼓励吧！

未来已来，只是尚未流行。当大部分人还在为知识碎片化和信息过载而焦虑时，一小撮聪明人已经开始用 AI 和自动化，悄悄地构建自己的第二大脑。

如果你也想成为后者，我们为你提供了两个选择：

1. 加入“核心圈”，成为实战派

如果你渴望系统性地掌握这套方法，获取更多关于 AI 写作、个人知识库打造的独家技巧和实战案例，欢迎加入我的 “AI+自动化”知识星球。这里是我倾力打造的实战基地，我会将所有最新的 AI 玩法和独家工作流在这里首发。你不仅能获取所有核心资料，还能在星球向我提问，获得指导，让你学习少走弯路。

点击下方进入我的公众号，发送“进个球”，即可领取专属优惠券，抢先加入！




![Image](https://mmbiz.qpic.cn/mmbiz_jpg/g6hYyF67xN0SOzY3N65Ir0954ShphicDOccs3DSexLoicEax97HR6cg89jNUq6r9RWiaKklUWb4yX1vNmUzExzj0w/640?wx_fmt=jpeg&from=appmsg&watermark=1#imgIndex=22)

2. 进入“交流群”，跟同行互动

如果你还想先感受一下氛围，也欢迎加入我的免费“AI+自动化”交流群，与大家一起互动、学习，零距离感受 AI 赋能的魅力。

在公众号发送“进群”，即可加入我们。




推荐阅读

[“无人运营”时代来临？我用n8n+Rpa实现了从选题到发布的自动化闭环](https://mp.weixin.qq.com/s?__biz=Mzg5NzczNjE0NQ==&mid=2247486575&idx=1&sn=219645713813f1f4b605a559781eefba&scene=21#wechat_redirect)

[藏不住了！n8n+RPA自动化选题流程，帮我突破内容生产瓶颈](https://mp.weixin.qq.com/s?__biz=Mzg5NzczNjE0NQ==&mid=2247486520&idx=1&sn=64fb5499dc65a61179e31bd6cebff9c6&scene=21#wechat_redirect)

[AI自动化必看！n8n 隐藏技能 Data Tables，替代飞书表格太香了](https://mp.weixin.qq.com/s?__biz=Mzg5NzczNjE0NQ==&mid=2247486485&idx=1&sn=dd577bbed94c5e74edd8f208d48da7b8&scene=21#wechat_redirect)

[AI+RPA 怎么落地？我将用它从零到一打造小红书全自动运营账号，带你掌握 AI 自动化](https://mp.weixin.qq.com/s?__biz=Mzg5NzczNjE0NQ==&mid=2247486471&idx=1&sn=ee7c980a34c91575f189b612f6bf59a6&scene=21#wechat_redirect)

