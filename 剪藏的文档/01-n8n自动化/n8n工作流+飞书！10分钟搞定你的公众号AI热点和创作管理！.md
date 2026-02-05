---

title: n8n工作流+飞书！10分钟搞定你的公众号AI热点和创作管理！
date: 2025-11-04
tags: ["n8n", "工作流", "自动化", "飞书", "AI", "人工智能", "智能体", "Agent", "工作流自动化"]
category: 自动化工具
---


# n8n工作流+飞书！10分钟搞定你的公众号AI热点和创作管理！

Original 拉克AI [拉克AI智能体](javascript:void(0);)*2025年11月4日 06:50* *江苏*

哈喽大家好，我是专注于n8n国内生态的应用拉克。

你是否每天为了获取公众号AI热点而头疼半天，想蹭个热点，半天憋不出一篇文章。

文章零零散散的草稿碎片到处都是，管理混乱不堪。

别急，n8n自动化工作流可以帮你解决上面的烦恼，而你要做的就是跟着我花10分钟搭建一个轻量级的工作流。

今天分享的工作流可以实现一键完成公众号AI热点获取，热点内容自主创作，并且自动上传至数据库实现自动化管理的功能。

完整的工作流入下：

![Image](https://mmbiz.qpic.cn/mmbiz_png/QOgibUb73gxhAtG2acuRSaJribCeKd0ehvHMoAKBKyl0yGTlws87IFAFXCklNW0ChhMONF6nmiazrZIgw8coEfK8A/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=0)

文章结尾领取详细的**工作流JSON文件**。

# 1、流程任务思路详解

工欲善其事必先利其器，想要把工作流搭建好，前提是要把任务进行很好的拆解有了好的思路，这个时候搭建工作流，就像搭积木一样简单了。

这个工作流的主要思路如下：

利用第三方的数据库获取公众号相关的AI热点新闻，提取其中的标题，内容和阅读量等重要信息。

其次将获取的信息作为输入，让大模型利用其自身的推理能力，对标题和内容进行进一步的创作。

最后进行必要的格式转化，然后上传至数据库。

# 2、工作流节点详解

这个章节详细讲解整个工作流的搭建及注意事项。

## 工作流触发及热点获取

这里主要有3个节点，主要包含一些基础配置和热点获取与拆解

- 工作流触发

直接选择手动触发即可，可根据需要进行定时运行。

- AI热点的获取

因为公众号没有开放官方的API接口，因此这里利用第三方数据库新榜的API来获取最新的AI热点详细配置如下。

```Plain Text
Method:Post
URL:https://api.newrank.cn/api/sync/weixin/data/hot/day_content

Header Parameters:
Content-Type=application/x-www-form-urlencoded;charset=utf-8
Key=这里填入你自己的新榜API密钥

Body Parameters:
type:科技
date:{{ $today.format('yyyy-MM-dd') }}
size:10
```

注意这里的size,如果你想一次性获取比较多的AI热点文章，将这里的10设定的高一些。

- 拆解

因为获取的是很多的数据组合在一起的数据组，因此需要将数据进行拆分，方便后续的处理。

这里用的是split out插件。

## 筛选与内容创作

这个章节主要是介绍如何对获取的AI热点做一些筛选，并根据筛选后的内容进行进一步的创作。

- 筛选(code)

由于前面的AI热点新闻是整个科技领域的，范围比较广泛，因此需要进一步对结果进行关键词筛选。

这里通过code代码来实现筛选，可以根据自己的业务在const key里进行关键词的设定与裁剪。

代码如下：

```Plain Text
/* 关键词过滤 */
const key = ['AI','GPT','AIGC','大模型','OpenAI','谷歌','百度','阿里','字节','ChatGPT','Agent','智能体','coze','n8n', 'manus','Deepseek','豆包','可灵','kimi','MCP','flowith'];
const txt = (String($input.item.json.data.title ??'') + String($input.item.json.content??'')).toLowerCase();

if (!key.some(k => txt.includes(k.toLowerCase()))) {
  return null;   // 丢弃
}
return {
  title:      $input.item.json.data.title,
 content:    $input.item.json.data.content,
  readnum:  Number($input.item.json.data.readNum  || 0) 
};
```

- 内容创作

到了这一步就是对前面获取的标题，内容等进行内容创作，这里使用智能体加大模型来进行编排。

大模型可以选择国内的deepseek，也可根据需要选用其他大模型。

![Image 1](https://mmbiz.qpic.cn/mmbiz_png/QOgibUb73gxhAtG2acuRSaJribCeKd0ehvdniaV9vo6dm8m40CoVrC9cYUV9bP3ozT5mN5ibHQic1iahCb61ALGgh9LQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=1)

为了保证文章内容的质量，我们需要优化提示词，这也是整个工作流最重要的一个节点。

这里的提示词有点长，需要的可以在文章结尾获取整个工作流。

为了输出格式的稳定，建议打开输出格式限制，代码如下：

```Plain Text
{
  "title": "为文章创作一个爆款标题",
  "content": "文章的内容"
}
```

## 格式转化与数据库管理

到了这一步主要的内容创作就结束了，这里主要是对输出的内容进行进一步的管理并且和数据库进行连接。

- 格式转化

这个节点的主要目的是将上个节点的内容进行格式转化，同时将后续的节点需要的信息进行汇总。

详细代码如下：

```Plain Text
return {
  AI_title:      ($input.item.json.output.title   ?? '').trim() || ' ',
  AI_content:    ($input.item.json.output.content                            ?.replace(/\n/g, '\\n')
              ?.replace(/\t/g, '\\t')
              ?.replace(/"/g, '\\"')  ?? '').trim() || ' ',
 content: $('筛选').item.json.content,
  title: $('筛选').item.json.title,
  ReadNum: $('筛选').item.json.readnum
};
```

注意了，这里有一个常见的问题点，很多粉丝都咨询过，就是前面节点的内容大概率会包含换行、引用等特殊字符，导致后续的json识别不了，因此这里需要转义操作，详见代码本身。

- 上传数据库

到了这一步需要将前面的汇总信息上传至数据库进行管理，方便后续的管理和创作。

这里用到的是国内的飞书平台，飞书的插件及设置详见另一篇文章：

[5 分钟闪电上手：n8n实现飞书0代码自动化保姆级图解，复制粘贴就能跑！](https://mp.weixin.qq.com/s?__biz=Mzk4ODE2NzMzNg==&mid=2247484357&idx=1&sn=75ee686e1ce0eb8f37cb64c34b8fe616&scene=21#wechat_redirect)

这里里的代码如下：

```Plain Text
{
"fields":{
 "原文标题": "{{ $json.title }}",
 "原文内容": {{ JSON.stringify($json.content )}},
 "阅读量": "{{ $json.ReadNum }}",
 "AI生成的标题": "{{ $json.AI_title }}",
 "AI生成的内容": {{ JSON.stringify( $json.AI_content )}}
  }
}
```

这里有另一个常见的卡点，内容本身可能不符合json的格式要求，因此需要进行强制转化一下，然后把最外面的双引号去掉。

因为json转化后的内容已经有了双引号，不去掉会重复，系统会报错。

## 运行调试和优化

到了这里整个工作流就搭建好了，熟练的话10分钟就差不多可以完成。

这是运行后的结果展示

![Image 2](https://mmbiz.qpic.cn/mmbiz_png/QOgibUb73gxhAtG2acuRSaJribCeKd0ehvSPXKEG4v3waMAbm7pmnCslQUINlPoGrWnfd2otx4KqMJ6zGqib5XmicQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=2)

快用这个工作流去把你那些零碎的热点和文章碎片都系统化的管理起来吧，搭建过程中有问题在文章底部留言告诉我。

文章底部留言板留言"**23**"获取工作流Json文件。

[#AI](javascript:;) [#n8n](javascript:;) [#公众号](javascript:;) [#工作流](javascript:;) [#deepseek](javascript:;)

另外我给大家准备了几份福利，记得**关注公众号**找我领取。




- 免费领取拉克在用的工作流模板，让你n8n入门更轻松。

- 加入智能体免费交流群，和更多的小伙伴一起探索智能体。

- 免费领取2000+份n8n工作流模板，各类经典应用全部掌握。

- 免费领取一份国内AI头部社区主理人倾力打造的AI赚钱100种方法图书。

也可以扫描以下二维码**添加好友**与我链接

![Image](https://mmbiz.qpic.cn/mmbiz_jpg/QOgibUb73gxhAtG2acuRSaJribCeKd0ehvxg1T4BucqsFr0M4icwLHIKLaf82K4raWpwV1uOibliasPVPzHzia5X9micA/640?wx_fmt=jpeg&from=appmsg&watermark=1#imgIndex=3)

