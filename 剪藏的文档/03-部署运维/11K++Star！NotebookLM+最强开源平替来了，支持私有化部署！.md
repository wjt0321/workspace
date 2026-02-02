---

title: 11K+ Star！NotebookLM 最强开源平替来了，支持私有化部署！
date: 2025-12-09
tags: ["部署", "安装", "搭建", "运维"]
category: 部署运维
---


# 11K+ Star！NotebookLM 最强开源平替来了，支持私有化部署！

Original 痕小子 [开源星探](javascript:void(0);)*2025年12月9日 07:05* *湖北*



在小说阅读器中沉浸阅读

 

说实话，**NotebookLM** 是真的好用。

把文档一丢，直接问问题、追溯引用、梳理知识、生成PPT，非常方便且符合人类思维。

但用久了，几乎所有人都会卡在同一个问题上：数据隐私。

只要是云端 NotebookLM，本质上就绕不开这个问题。

直到最近，我在 GitHub 上发现了一个非常狠的项目 — **SurfSense**。

![Image](https://mmbiz.qpic.cn/mmbiz_png/NjA8gwicXyeI5roS17NIETJwam4E1p6sEJXEicBon74ibs9Fe2hxyvMq9HDBqmXqiceU7RssfpKaAEXlxDDb2rw5FQ/640?wx_fmt=png&from=appmsg#imgIndex=0)

![Image 1](https://mmbiz.qpic.cn/mmbiz_png/NjA8gwicXyeI5roS17NIETJwam4E1p6sEKibtlcqumPkLibGX3L5cjTspXS1mP1LQsWAlIll10nrQeCxMvE1Dbn1w/640?wx_fmt=png&from=appmsg#imgIndex=1)

这是一个可以私有化部署的 NotebookLM 开源平替，而且完成度已经非常高。

目前虽然还没跟上 NotebookLM 最新的生成 PPT 功能，但在核心的“多模态 RAG”和“AI 播客生成“上，它已经做得相当成熟。

最重要的是，代码在你手里，数据在你硬盘里，谁也拿不走。

你可以把它理解为：Perplexity（精准搜索）+ NotebookLM（深度理解与播客）+ 私有知识库的结合体。

![Image 2](https://mmbiz.qpic.cn/mmbiz_png/NjA8gwicXyeI5roS17NIETJwam4E1p6sEJUF0vW9E3XhIHvUuOa5RKnIkaoS3SN9gEu71w5Ykny0MIMPXrhb5Eg/640?wx_fmt=png&from=appmsg#imgIndex=2)

#### 主要功能

- • **支持多种文件格式**：支持上传PDF/Word/PPT/MP3/JPG等50+种文件格式。

- • **内置强大搜索功能**：支持语义级搜索，可快速查找已经保存的所有内容信息。

- • **自然语言对话**：与已保存内容对话。

- • **引用答案**：像 Perplexity 一样获得带引用的答案。

- • **本地 LLM 支持**：完美支持 Ollama 本地大语言模型。

- • **博客功能**：可20秒内为你生成一段3分钟左右的音频。

- • **支持外部数据源接入**：不只局限于本地文件，还支持连接外部数据源。

- • **先进的 RAG 技术**：支持 100+ 种大语言模型，6000+ 种嵌入模型。

#### 快速上手

SurfSense 提供三种入门方式：在线/Docker/自定义部署。

1、SurfSense Cloud

地址：https://www.surfsense.com

无需任何设置即可试用 SurfSense。

2、Docker 安装

通过容器化所有依赖项，轻松启动和运行 SurfSense。

- • 包含 pgAdmin，通过 Web UI 进行数据库管理

- • 支持通过 .env 文件自定义环境变量

- • 灵活的部署选项（完整堆栈或仅核心服务）

- • 无需在环境之间手动编辑配置文件

详细安装指南可参考官方文档：

https://www.surfsense.com/docs/docker-installation

3、自定义部署

通过源码手动安装，部署各项服务，适合对设置有更多控制或需要自定义部署的用户。

#### 界面展示

研究助手

![Image 3](https://mmbiz.qpic.cn/mmbiz_png/NjA8gwicXyeI5roS17NIETJwam4E1p6sEh9Y1tV7tOylgPGOqFpW4bmfJ3o13gfc4sSXsLDSngG6Gz3B9lHnWmw/640?wx_fmt=png&from=appmsg#imgIndex=3)

搜索空间

![Image 4](https://mmbiz.qpic.cn/mmbiz_png/NjA8gwicXyeI5roS17NIETJwam4E1p6sERgN2ZQS2XStpF46tLqYDYLrLNWsxREP79qiaRibibIsRuxbAkTHd4Mhnw/640?wx_fmt=png&from=appmsg#imgIndex=4)

管理文档

![Image 5](https://mmbiz.qpic.cn/mmbiz_png/NjA8gwicXyeI5roS17NIETJwam4E1p6sEPFzxicfGeYJWia4ibeNQFmcvoZwau3qjN1puLQ7PbVC25sicTpgKmlEAFQ/640?wx_fmt=png&from=appmsg#imgIndex=5)

博客助手

![Image 6](https://mmbiz.qpic.cn/mmbiz_png/NjA8gwicXyeI5roS17NIETJwam4E1p6sEzTjcOUXTV4ia42jDYiamdSbB4R4GZHb6DyFiaM6XrSW5B8uxpdHSTQ2iaw/640?wx_fmt=png&from=appmsg#imgIndex=6)

对话助手

![Image 7](https://mmbiz.qpic.cn/mmbiz_png/NjA8gwicXyeI5roS17NIETJwam4E1p6sECKpPicG1e0vkklbhAxgibhA1FJJysXC5A8AmbsiaYjmPIicgYUm1PYQL0A/640?wx_fmt=png&from=appmsg#imgIndex=7)

#### 写在最后

SurfSense 最新的 PPT 自动生成能力，暂时还没有。

但除此之外，在知识管理 & 问答维度，功能已经完全够用，私有化也是硬优势，整体可控、可扩展、可定制。

NotebookLM 很好，但真正能落地到企业和长期使用的，还会是这种自托管、开源、可控的方案。

GitHub：https://github.com/MODSetter/SurfSense

![Image](https://mmbiz.qpic.cn/mmbiz_gif/NjA8gwicXyeKqAjyn8A3ob9xT4DDY8DB3JCvIaM6JKWXFsgCxznXicJhpRYJ5MIPb9xvgGA4WYhPagIKorlScib0Q/640?wx_fmt=gif#imgIndex=8)

如果本文对您有帮助，也请帮忙点个 赞👍 + 在看 哈！❤️

**在看你就赞赞我！**

![Image 1](https://mmbiz.qpic.cn/mmbiz_gif/NjA8gwicXyeLZdEkueqhds4y07sImrPvibkDIsnVCibl5ibS6jSiccRh6RtH8ZqBPBWSib0kn7Ep6mP5YPJCJkraJ3kw/640?wx_fmt=gif#imgIndex=9)

 

