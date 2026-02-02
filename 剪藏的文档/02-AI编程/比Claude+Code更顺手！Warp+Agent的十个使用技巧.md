---

title: 比Claude Code更顺手！Warp Agent的十个使用技巧
date: 2025-12-08
tags: ["claude", "Claude", "AI编程", "代码助手"]
category: AI编程
---


# 比Claude Code更顺手！Warp Agent的十个使用技巧

Original node [字节笔记本](javascript:void(0);)*2025年12月8日 17:41* *湖北* *标题已修改*



在小说阅读器中沉浸阅读

如果你被Claude Code 的封号搞烦了，被Cursor的IP限制弄无语了，那么推荐使用Warp。

Warp目前来说依然是国内用户能够顺畅使用全球顶级模型Agent最方便的方式，基本上所有顶级模型模型都可以使用。

而且如果你使用体验下来之后发现它的模型能力都非常的强，很多其他的产品里面官方接口都掺了水，Warp的AI转发都还比较的真。

它的功能非常的强大，也非常的多，这里主要讲一下它特别好用的Agent的功能，下面是Warp的Agent日常使用的技巧。

![add0f05a-94eb-4](https://mmbiz.qpic.cn/sz_mmbiz_png/4HWyricuhgQdExLoQgyExdjuEWKniblydoBTqotaU8Suc73xGOpY7dDphoQpicSJGDwkgyUF7MxtkvWTiasyeg60icA/640?wx_fmt=png&watermark=1#imgIndex=0)

有同学会问Warp Agent和Claude Code区别，其实CC大部分能做，但是集成度没有Warp Agent好，而且最新版本直接集成了编辑器功能，图形界面和可控性还有玩法比Claude Code更多，CC是手动档，要用好还得有大量的基础知识做支撑。

Warp Agent更象是自动档，上手就可以干。

Warp下载和注册地址：

https://link.bytenote.net/warp

**1.上下文自动整理**

Claude Code长对话会导致响应变慢、质量下降，Warp 会自动检测话题转换并建议分割。

![efc5a00d-b883-4](https://mmbiz.qpic.cn/sz_mmbiz_png/4HWyricuhgQdExLoQgyExdjuEWKniblydoqFCKibcLBszE8DPR3byib3Wmzoe3rzLCO7MXuNm4F2VngBciaZJ8oSyjQ/640?wx_fmt=png&watermark=1#imgIndex=1)

快捷键：`CMD + SHIFT + N` 开新对话。

**2.多fork路径**

想尝试不同方案又不想污染原对话？

用 `CMD + Y` 打开对话菜单，fork 当前对话。

![dfc23c75-e25c-4](https://mmbiz.qpic.cn/sz_mmbiz_png/4HWyricuhgQdExLoQgyExdjuEWKniblydomBaLXfvaDY4ntXtZeJb1PqicwpFDmedOmiaB3hicXTl7J8b3wWJuoCG2Q/640?wx_fmt=png&watermark=1#imgIndex=2)

两个分支各自独立，可并行探，而在Claude Code你得会玩Git。

3.多Agent Profile

在 `Settings > AI > Agents > Profiles` 创建多个配置文件。

![d848172e-5693-4](https://mmbiz.qpic.cn/sz_mmbiz_png/4HWyricuhgQdExLoQgyExdjuEWKniblydof1Tfl8gGshxQAFI9t3RC64D6WbLiaibZ1jAPs01z8KaPNMXNxfUXbpPg/640?wx_fmt=png&watermark=1#imgIndex=3)

比如日常开发用 "Safe & cautious"，快速原型用 "YOLO mode"。每个 Profile 可独立设置模型、权限、自主级别。

**4.更灵活的选项控制**

权限相关的，我在设置项里面把 `ls`、`grep`、`find` 等只读命令加入 allowlist 自动执行，`rm`、`curl`、`wget` 等危险命令放 denylist 强制确认。

对于MCP或者使用的模型都可以单独指定。

![c37101ba-313c-4](https://mmbiz.qpic.cn/sz_mmbiz_png/4HWyricuhgQdExLoQgyExdjuEWKniblydollp9vjWjrIIwjQFIiaqW1Y0oX4dUAtbaGMia7AYAsPbVJBkd0AlAsqiag/640?wx_fmt=png&watermark=1#imgIndex=4)

**5.用 @ 符号精准附加上下文**

用`@file` 引用文件、`@folder` 引用目录大家都可以。

Warp的选项更多。

![ee5171c4-178e-4](https://mmbiz.qpic.cn/sz_mmbiz_png/4HWyricuhgQdExLoQgyExdjuEWKniblydocRWGEbMDEXTu898VEUCI9XFH69EQht62VS1dWk5P0ibtlkDhiaP6mPAQ/640?wx_fmt=png&watermark=1#imgIndex=5)

`@symbol` 引用代码符号、`@plans` 引用已保存计划。

比手动复制粘贴更高效，Agent 理解更准确。

**6.用 /plan 命令处理复杂任务**

输入 `/plan` 让 Agent 生成结构化计划，可编辑、有版本历史、支持分段执行。

计划自动保存到 Warp Drive，可导出 Markdown 分享给团队。

**7.自动压缩**

Universal Input 模式下有上下文窗口指示器。

接近上限时变红，超出后 Warp 自动总结。

主动在任务切换时开新对话，避免上下文溢出影响质量。

**8.用 Auto 模式让 Warp 智能选模型**

我一定都使用的是Auto模型，省 credits。

![b63bd373-da39-4](https://mmbiz.qpic.cn/sz_mmbiz_png/4HWyricuhgQdExLoQgyExdjuEWKniblydoTHsPXwnGa3UU8c6YmIEr35WKxwx81LpiasBQKConzD0n7KD5BDkW8YA/640?wx_fmt=png&watermark=1#imgIndex=6)

Warp 会根据任务类型动态选择最合适的模型。

**9.多 Agent 并行，用管理面板统一监控**

可在不同 pane/tab 同时运行多个 Agent。

![837ba3ac-d463-4](https://mmbiz.qpic.cn/sz_mmbiz_png/4HWyricuhgQdExLoQgyExdjuEWKniblydooY63lt6wWVdJ312Lic18O1826yrNqLjKglnoJt1zqvK5PvtBs2opkhQ/640?wx_fmt=png&watermark=1#imgIndex=7)

右上角 Agent Management Panel 集中查看所有 Agent 状态，快速跳转到需要输入的对话。

而且每次完成之后都会进行进程的通知，这个时候需要你打开桌面的通知功能就可以。

**10.启用 Web Search 获取实时信息**

在 Agent Profile 中开启 "Call web tools"，Agent 可自动搜索最新文档、版本号、错误解决方案。

搜索结果可展开查看来源，便于验证准确性。

Warp下载和注册地址：

https://link.bytenote.net/warp

