---

title: n8n全新Gemini节点(2025)，六大能力重塑视频工作流
date: 2025-08-03
tags: ["n8n", "工作流", "自动化", "视频", "短视频", "YouTube", "工作流自动化"]
category: 自动化工具
---


# n8n全新Gemini节点(2025)，六大能力重塑视频工作流

Original 潮人林生 [相对宇宙X](javascript:void(0);)*2025年08月03日 13:50* *广东*

整个中文网络都没有人提到n8n在2025年7月升级推出的新Gemini节点？那我必须好好说一说了：n8n在七月中旬发布的1.103.0版包含了很多更新， 比如特别吸睛的Agent套娃特性，可以在一个Agent节点底下再成一串 Agent葡萄，给了大模型更多自主的空间但也更加不可控了，算是一把双刃剑吧，所以更让我关注的是全新的Gemini节点。

n8n新版Gemini Node亮点

![Image](https://mmbiz.qpic.cn/mmbiz_png/8d8ZEW9VW7Z4x0mFEVUoKnaB9QZPFkib5tBibtuozd8FznNW5QtTmEoc88sX06LpDrr1pL7vCqVxxvkMtkbtmYZQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=0)

与2024年推出的旧版本Gemini Chat节点相比，新节点不仅优化了性能和易用性，更重要的是释放了Gemini在多模态方面统治级别的综合能力，n8n官方文档是这样介绍该节点能力的：

```Plain Text
Audio音频：
- 分析音频：接收音频并回答音频相关问题
- 转录录音：将音频转录成文本
Document文件：
- 分析文档：接收文档并回答有关它们的问题
File文件：
- 上传文件：将文件上传到Google GeminiAPI为下一步动作准备。
Image图像：
- 分析图像：接收图像并回答图像相关问题。
- 生成图像：从文本提示创建图像。
Text文字：
- 向模型发送消息：使用Gemini生成文本。
Video视频：
- 分析视频：接收视频并回答视频相关问题。
- 生成视频：从文本提示创建视频。
- 下载视频：使用URL从Google Gemini API下载生成的视频。
```

可以看到，新版节点已经封装了Gemini六大能力，结合谷歌的文档、网盘和邮件等全家桶生态，n8n多模态工作流真的可以达到一个新的高度。

n8n官网示例，无须注册直接复制得到

之前网上大多数所谓视频拆解教程，都只是基于视频字幕或音频，直接传入视频进行解析，目前能做到免费高效的，唯有Gemini。而且n8n这个新版已经帮用户预制好了分析、生成和下载视频的节点，在添加节点面板直接搜索gemini即可拖拽使用了：

![Image 1](https://mmbiz.qpic.cn/mmbiz_png/8d8ZEW9VW7Z4x0mFEVUoKnaB9QZPFkib5kiaR8ZBfz62vciaW1nMlRzicsOj156vhZZvoyqPj59X7bEfBrUUrINo9Q/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=1)

Gemini在n8n的授权极其简单，直接访问https://aistudio.google.com/apikey点击创建apikey再拿去n8n粘贴就行了，比接入谷歌文档、网盘等全家桶要容易太多（全家桶接入有困难的朋友点击本文末“阅读原文”可以看到逐步教学）

如果你只是想直接从本机系统上传一个视频文件启动分析工作流，或者体验文生视频等简单流程，那么只需要复制n8n官网的示例工作流即可：

```Plain Text
https://n8n.io/integrations/google-gemini
```

![Image 2](https://mmbiz.qpic.cn/mmbiz_png/8d8ZEW9VW7YiaYB40NXGgibyhVkeQQTiaWV8iahJIzYicPJujezh8rcFgQA4AMtKjk9rfLuy5an1CEm4eMYbyCxObNg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=2)

官网示例，点击复制直接拷走

实战：用n8n新Gemini节点批量拆解短视频分镜

接下来就是展示我已经搭建好的基于新版Gemini节点的批量油管短视频分镜拆解工作流：

![Image 3](https://mmbiz.qpic.cn/mmbiz_png/8d8ZEW9VW7YiaYB40NXGgibyhVkeQQTiaWVsvqXVI5ma13UMbliaBGlajFBOZrz60R12V0RSFySdSZTTM1dOto5aKw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=3)

第一步：借助一个开源项目metube，通过自行部署这个项目，可以将油管视频保存到服务器，只需找个deepseek、kimi类的聊天大模型给你一个“一键docker安装ghcr.io/alexta69/metube（要使用cookies，域名用xxx.xx）的脚本”即可，注意你需要先准备一个海外的vps和域名，购买或者申请免费的甲骨文vps，后续我也有文章专门讲解vps，感兴趣的请关注。

第二步：将多个链接存放到谷歌表格，并在n8n用谷歌表格节点读取并把没有分析过的视频url

![Image 4](https://mmbiz.qpic.cn/mmbiz_png/8d8ZEW9VW7YiaYB40NXGgibyhVkeQQTiaWVFYVmUxrMwweNWeAxlXISt3u6lKQIKOwM1wNUE77Cae4q1zqWOdJkmA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=4)

第三步：通过gemini analyze video节点拆解视频分镜

![Image 5](https://mmbiz.qpic.cn/mmbiz_png/8d8ZEW9VW7YiaYB40NXGgibyhVkeQQTiaWVB5XY7sWRc13uR0ia4ibhvoibiajzaXB3nGmxoP6qnyyuxYRMASXDvsib7ng/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=5)

第四步：回写分析结果到谷歌表格，拖拽结果到列字段即可

![Image 6](https://mmbiz.qpic.cn/mmbiz_png/8d8ZEW9VW7YiaYB40NXGgibyhVkeQQTiaWV66fOE0XFjoygNKBNGJbpNicGNaRrxXGvySicXOkhfTIyJh2unVMbPEjA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=6)

总结

有了n8n原生支持的2025版Gemini节点，再也不需要那些自行搭建Gemini CLI api的高难度操作了。特别是视频分析功能，结合n8n和谷歌其他服务（文档、网盘、邮箱等），可以有很多玩法，比如将目标视频或文章转成播客，比如将目标视频用分镜生成分镜脚本，分析爆红ASMR生成提示词并用Veo3生成仿品，甚至紧盯某个博主更新就马上分析拆解推送通知，等等。如果对这方面感兴趣请关注我，后续会有更多分享。

