---

title: 开源 3 天就 7000 Star！这个复刻 Manus 工作流的 GitHub 项目火了。
date: 2026-01-12
tags: ["n8n", "工作流自动化"]
category: 自动化工具
---


# 开源 3 天就 7000 Star！这个复刻 Manus 工作流的 GitHub 项目火了。

Original 逛逛 [逛逛GitHub](javascript:void(0);)*2026年1月12日 15:58* *北京*



在小说阅读器中沉浸阅读

这个叫 planning-with-files 的开源项目非常之火，现在搞 Agent 的开发者一定要仔细学习一下。

开源几天就六七千的 Star 了。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/ePw3ZeGRrux2n9GTAv9q6qPSl8NQBALWnXvkqhAJI2BauoJlicv4ibxg8B1e4Duq3jIzQx43WnamfWFBVOIaaXjw/640?wx_fmt=png&from=appmsg#imgIndex=0)

他教你使用 Claude Code Skill 实现 Manus 类似的上下文工程。

![Image 1](https://mmbiz.qpic.cn/sz_mmbiz_png/ePw3ZeGRrux2n9GTAv9q6qPSl8NQBALWuibIYsTTQ7chbKZaKB2YkmKowNicV2QWSd5REEIcfH6fnEx6JSibN3zjQ/640?wx_fmt=png&from=appmsg#imgIndex=1)



01

**Manus 的上下文工程原则**

![Image 2](https://mmbiz.qpic.cn/sz_mmbiz_png/ePw3ZeGRrux2n9GTAv9q6qPSl8NQBALWFhib7a5qlTbdwicLqmUo81uAXLeaqsTibwGfQIgzGrlf7pEqGBARpVYsQ/640?wx_fmt=png&from=appmsg#imgIndex=3)



之前 Manus 公布过自己产品在实践的上下文工程原则，我根据自己的记忆来简单总结一下，简单而言就是：

① 文件即单一真理来源

打破 AI 的记忆主要依赖对话历史的传统做法，信任文件。主要是因为对话历史是线性的、嘈杂的，且包含大量过时的纠错信息。

而文件是经过整理的、当前的「最新状态」。

AI 每次行动前，应该主要读取这些文件，而不是回溯几千行的聊天记录。这确保了 AI 永远基于当前最准确的状态行动。

② 状态显式化

如果你用过 Manus ，会发现他有一个 ToDo 文件，明确记录着：[x] 步骤1、[ ] 步骤2。这被称为外部化记忆。

即使此时你关闭终端、重启电脑，AI 再次启动时读取文件，立刻就能知道进度条在哪里，实现了完美的可恢复性。

![Image 3](https://mmbiz.qpic.cn/sz_mmbiz_png/ePw3ZeGRrux2n9GTAv9q6qPSl8NQBALWTNS7wWZc8If6ibLjDxkIhmvupkwHEF5n9ntCx8icBrqUABWLgONbmWgg/640?wx_fmt=png&from=appmsg#imgIndex=5)

③ 上下文窗口极简主义 

不把所有相关文件、所有历史对话都丢给 AI，只喂给 AI 当前步骤必要的信息。

上下文越长，AI 的注意力越分散。

通过将信息拆分到 notes.md、plan.md 和 output.md，AI 在执行某一步时，只需要读取相关的片段，保持大脑清醒，Token 消耗也更少。

④ 思考与行动分离

不让 AI 在一次回复中同时进行思考、规划和写代码，而是让 AI 先想，再做。

强制 AI 先在一个 Notes 上写下它的调研结果、架构思路，确认无误后，再去修改正式的代码文件。

这避免了 AI 写到一半发现思路错了导致代码库被污染的情况。

⑤ 围绕 KV-Cache 进行设计

由于 Agent 任务通常呈现长输入、短输出的特征，如果不能有效利用 KV-Cache，成本和延迟将无法承受。

![Image 4](https://mmbiz.qpic.cn/sz_mmbiz_png/ePw3ZeGRrux2n9GTAv9q6qPSl8NQBALWlmvIuwRSeVMIbH3muwpCDccBDJ8sUkyYyq8rmT9wiawf94C4TVrt9xQ/640?wx_fmt=png&from=appmsg#imgIndex=6)

所有的 Prompt 设计都要为缓存命中率让路。

要保持前缀稳定，不能在 System Prompt 或前置上下文中放入动态内容，这会导致后续所有缓存失效。

只追加不修改： 历史交互记录一旦生成，就不要再去修剪或改写。

确定性序列化： JSON 对象的 Key 排序必须固定，确保相同的状态永远生成完全相同的字符串。

⑥ 掩码而非移除工具

随着 Agent 能力增强，工具库会变得巨大。一种直觉的做法是动态移除当前不需要的工具描述以节省 Token，但这被 Manus 视为错误。

 动态移除工具会破坏 KV-Cache，因为工具定义通常在 System Prompt 中，且会导致模型在看到历史记录中调用了不存在的工具时产生困惑。

![Image 5](https://mmbiz.qpic.cn/sz_mmbiz_png/ePw3ZeGRrux2n9GTAv9q6qPSl8NQBALWskYVyjUJQoB3pvxfhib43NfQIgCKpHdUgXoQvfuDfqjnecr0L46vbMw/640?wx_fmt=png&from=appmsg#imgIndex=7)

保留所有工具定义，始终将完整工具集留在 Context 中。

在解码阶段（Decoding），通过修改 Logits（概率分布）来屏蔽当前不合法的工具。

例如，强制模型只能选择“回复用户”而不能调用“浏览器”，是通过在底层屏蔽 Token 实现的，而不是修改 Prompt。

![Image 6](https://mmbiz.qpic.cn/sz_mmbiz_png/ePw3ZeGRrux2n9GTAv9q6qPSl8NQBALW4KhPUlibvdt2j3y9iauIFOiam6buUM0UGGIhpyQ2f9fCcF2lbtfW5RPYg/640?wx_fmt=png&from=appmsg#imgIndex=8)



```Plain Text
博客地址：https://manus.im/zh-cn/blog/Context-Engineering-for-AI-Agents-Lessons-from-Building-Manus
```

上面就是 Manus 分享的上下文工程的实践，有一个核心的观点就是：


对话流（Chat）只适合短暂的指令交互，而文件系统（FileSystem）才是智能体（Agent）长期记忆和复杂推理的最佳载体。

02

**项目简介**

说回开源项目 planning-with-files，它的核心理念也是：使用文件进行规划。

![Image 7](https://mmbiz.qpic.cn/sz_mmbiz_png/ePw3ZeGRrux2n9GTAv9q6qPSl8NQBALWKJeKoZ6Q9QHhAsDK8VE5OqNkPeCibbVKpcGCHQsFs1OaWobJ61MOK2w/640?wx_fmt=png&from=appmsg#imgIndex=10)

```Plain Text
开源地址：https://github.com/OthmanAdi/planning-with-files
```

安装这个 Skill 后，Claude 会自动维护三个核心文件，这也是它被称为 Manus 风格 工作流的原因）：

① task_plan.md

记录当前任务的目标、拆解的步骤、已完成的进度、下一步要做什么。

好处：AI 每做一步之前，都会先读这个文件，确保自己不迷路。

② notes.md

存放调研资料、中间代码片段、临时的想法或长文本。

能够保持对话窗口干净，避免因为塞入太多无关细节而把 AI 搞晕。

③ [deliverable].md 

最终生成的代码、文章或报告。这是纯净的输出结果，不包含思考过程。

![Image 8](https://mmbiz.qpic.cn/sz_mmbiz_png/ePw3ZeGRrux2n9GTAv9q6qPSl8NQBALWEDeKWJXIydmFhMLpffcEoHxIKmQfJ1u8dfu4xy8d5BYU9SqG9xazibQ/640?wx_fmt=png&from=appmsg#imgIndex=11)

说白了，这个开源项目就是一个给 AI 安装外挂大脑的插件。

它通过强制 AI 使用本地文件来记录进度和思考，解决了大模型聊久了就忘事，这种上下文丢失获目标漂移的痛点

如何使用

这个项目本质上是一个 Claude Code Skill，你需要先安装 Claude Code，然后通过命令安装此 Skill。

```Plain Text
/plugin marketplace add OthmanAdi/planning-with-files
/plugin install planning-with-files@planning-with-files
```

在 Claude Code 中，当你要求它规划一下这个任务或者提到 planning 时，它就会自动创建 task_plan.md 并进入这种高智商工作模式。

04

**点击下方卡片，关注逛逛 GitHub**

这个公众号历史发布过很多有趣的开源项目，如果你懒得翻文章一个个找，你直接关注微信公众号：逛逛 GitHub ，后台对话聊天就行了：

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/ePw3ZeGRrux2sRxwJzmfe1lK8ic33XvtVPsIPCMV7hjicmScibtxIZ1NsjXxNoVNMb3zLy32Al7PSpfbVAtrACYqQ/640?wx_fmt=png&from=appmsg&wxfrom=5&wx_lazy=1&wx_co=1&tp=webp#imgIndex=11)

