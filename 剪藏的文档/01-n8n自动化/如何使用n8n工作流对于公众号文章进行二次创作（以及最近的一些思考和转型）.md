---

title: 如何使用n8n工作流对于公众号文章进行二次创作（以及最近的一些思考和转型）
date: 2025-11-12
tags: ["n8n", "工作流", "自动化", "工作流自动化"]
category: 自动化工具
---


# 如何使用n8n工作流对于公众号文章进行二次创作（以及最近的一些思考和转型）

Original 阑梦清川 [阿川的AI笔记](javascript:void(0);)*2025年11月12日 20:53* *天津*

最近还有学习这个n8n相关的内容，昨天是学习的一个关于如何使用n8n工作流对于公众号文章进行二创的方法；

但是发现自己陷入了一个怪圈，不只是自己的学习，以及很多教程，其实都是为了写而写，为了设计而设计；

今天还是分享一些这个探索吧，但是后续可能就转换到其他的内容了，这个n8n告一段落了;

# 1.扣子工作流

这个里面需要调用coze的api内容，所以我们需要搭建这个coze的工作流的相关内容；

其实很简单，就是使用插件对于我们的公众号里面的文章进行处理即可；

![Image](https://mmbiz.qpic.cn/mmbiz_png/E0RzJtf1g8ANEsv00dbcMkqNfhjpPhLDN41qwvNZ7rXP6CCWhoWAQfrJdHss7t19uhrO0ea6cmGQibrjibAcsBkw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=0)

我们需要发布，不然在api调用那个页面是无法找到这个对应的ID的；

## 1.2工作流api获取

左侧找到这个api，选择这个工作流里面的执行工作流选项即可

![Image 1](https://mmbiz.qpic.cn/mmbiz_png/E0RzJtf1g8ANEsv00dbcMkqNfhjpPhLDeZ6IcFBh6V0IW6D9KHrUv0PEeuYeyCLOZcz3ZAA2dNmjZlN8Q5hr0A/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=1)

## 1.3执行工作流进行测试

发现这个输出的内容获取没问题，我们就可以去我们的n8n里面进行配置

![Image 2](https://mmbiz.qpic.cn/mmbiz_png/E0RzJtf1g8ANEsv00dbcMkqNfhjpPhLDOkxpJJ5jGWOXzsibd0ZOx3g2kh98TIznddS0EY3icQiaYwBvcTGvZLWQw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=2)

# 2.n8n搭建流程

## 2.1整体说明

- 左侧的这个就是输入链接

- 然后HTTP节点获取这个标题和内容

- code节点进行分割（因为我们的这个标题个内容分别需要进行仿写）

- agent调用大模型进行仿写

- 分叉：上面的负责文章，下面的负责封面

- 最后进行合并，写入到我们的草稿箱里面去

![Image 3](https://mmbiz.qpic.cn/mmbiz_png/E0RzJtf1g8ANEsv00dbcMkqNfhjpPhLDXy4vLVoDf9Bcwt6TwlbVVJ7KSws1mdqZ8SyTBvFPRBYl2vxy6UtJcQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=3)

## 2.2api调用

这个选择如下所示：

- URL可以在我们的coze的api配置里面获取

- Header auth就是在coze平台的api里面复制得到的

![Image 4](https://mmbiz.qpic.cn/mmbiz_png/E0RzJtf1g8ANEsv00dbcMkqNfhjpPhLD0JJiaUZVh9ZuvlgNwq8c0VRlr2MzxWkeLCtibPc3ZVTCh1tYyr2ZU2qA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=4)

## 2.3分割处理

- 主要还是把我们的这个标题和主体文章内容风格开

![Image 5](https://mmbiz.qpic.cn/mmbiz_png/E0RzJtf1g8ANEsv00dbcMkqNfhjpPhLDhWfQy9Pes6EIlAR7T3KQE5tDs4Gr5MhiaxUXibqhMb4U3UsmBEBnPibOw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=5)

## 2.4双路齐下

- 上面负责文章处理，下面负责封面的处理，调用的大模型都是可以进行更换的

![Image 6](https://mmbiz.qpic.cn/mmbiz_png/E0RzJtf1g8ANEsv00dbcMkqNfhjpPhLDic4NFJJ6vpWaibicjJ5F20tRVbalXWfm77ibeyDJzgAGZeoLpcvs7xWdEQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=6)

## 2.5发布草稿箱

这个需要配置我们的appID和secret，直接去我们的公众号后台配置即可

![Image 7](https://mmbiz.qpic.cn/mmbiz_png/E0RzJtf1g8ANEsv00dbcMkqNfhjpPhLDjLHXGnicjX9O4AhKV2RSWnzqJwe6yxYXUuE6dYkOeEnf4PcD0ib94QUQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=7)

## 2.6其他说明

社区节点：需要去我们的seetings里面进行下载

![Image 8](https://mmbiz.qpic.cn/mmbiz_png/E0RzJtf1g8ANEsv00dbcMkqNfhjpPhLDkiaCdGO3eh3LWpkZZjHIa5jg9UXVluvxq9Jnb3PRmgRNAgTxj3s7qLg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=8)

公众号配置：后台获取，其实这个微信节点，只要是涉及到写入到草稿箱，基本上都是需要这个相关的配置的信息的；

- 还有就是为什么我觉得N8n现在有点为了设计而设计，你说这个搭建工作流进行文章的仿写，非要使用这个工作流么，我最近使用Youmind感觉也是蛮不错的，而且这个仿写没有配图，实际上还是需要我们操作的

- 可以说我们接触的很多的n8n工作流都是玩具，都是demo级别的；

- 另外就是针对于我自己的电脑，每一次启动虚拟环境，docker运行，消耗大量的内存空间，虽然可以使用云端环境（之前推荐的n8n自动化实战课程提供了云端的运行次数），但是云端实际上无法使用这个微信节点，飞书节点这种社区节点

- 但是飞书多为表格，以及微信节点之类的，还是非常常用的把，所以基本上还是需要我们自己去本地部署的；

- 接下来可能会更新一些AI编程的内容，大家敬请期待，看这n8n关注的，如果你对于AI不感兴趣，可以取消关注了，感兴趣的可以留下来

