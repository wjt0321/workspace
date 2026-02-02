---

title: 国内大模型比肩Claude 4.5，只有Claude 8%的价格？【附配置教程】
date: 2025-11-07
tags: ["claude", "Claude", "教程", "入门", "上手", "保姆", "喂饭", "AI编程", "代码助手"]
category: AI编程
---


# 国内大模型比肩Claude 4.5，只有Claude 8%的价格？【附配置教程】

Original 阿飞 [阿飞AI实操日记](javascript:void(0);)*2025年11月7日 17:47* *河北*

点击上方卡片关注我👆

设置星标 让我们一起学 AI！

这两天国内的一款模型在海外 AI 圈子收到广泛的关注。

没错，就是 `MiniMax M2`

当时，看到官方发布并没有当回事，必经雷声大雨点小的情况太多了

再加上最近在完善关于 `Claude code AI 编程的小课`，也没时间去测试

但是这两天群里很多小伙伴想试试，问如何使用？如何在 `Claude code` 中配置？

今天就抽空写写吧。。（其实官方文档就有~）

## 1. 引言：MiniMax M2 的海外热度与背景

- 近期在海外 AI 圈子引发广泛关注的中国模型。

- 获得 OpenAI 和 OpenRouter 官方账号的推荐宣传。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/1ibLKxRDVt6ibY5VWB81Sco0ic2ALmTiaXI35sq7NYxqls0pcw6CoFY3zwr94AZu80a4qxSSuzT65SR6H6fl0Tlltw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=0)

- 海外用户从最初的半信半疑转变为积极推荐尝试。

![Image 1](https://mmbiz.qpic.cn/sz_mmbiz_png/1ibLKxRDVt6ibY5VWB81Sco0ic2ALmTiaXI3tnZb0SSWwTKbjriaccAaicT3bMIPKbhVqfzR7dEtoWTmj8oyve3mJ1MA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=1)

## 2. 基准测试表现

- 在全球权威的 "Benchmark" 发展中，MiniMax M2 总分排名全球第五。

- 排名第四的是长期领先的 Claude 4.5 Sonnet 模型。

![Image 2](https://mmbiz.qpic.cn/sz_mmbiz_png/1ibLKxRDVt6ibY5VWB81Sco0ic2ALmTiaXI3wsYnopP3ibIo2GK852ZUibt27orewkiaIkY6YPGpGB4RtJNHdnJfwtbGA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=2)

- 在各个 Benchmark 的子项得分均表现优秀：

- 

    - 领先于国内其他模型，甚至高于顶尖的海外模型，排名第一。

- 

    - 该指标重点考察：代码理解、错误修复、遵循项目规范的能力。

- 

    - 在 "SWE Benchmark" 指标中得分 6.12，是国内模型最高分。

    - 在 "信息搜索理解和分析" 能力指标中表现尤为突出：

![Image 3](https://mmbiz.qpic.cn/sz_mmbiz_png/1ibLKxRDVt6ibY5VWB81Sco0ic2ALmTiaXI38Nic6upnpYFS016STQLVOkALjIgXUuK8unuN4R4yZq5JK0fjH9lVuAQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=3)

## 3. 模型定位与定价策略

- 官方定位：**专为 Agent 应用和代码生成而生，旨在平衡价格、效果和速度。**

![Image 4](https://mmbiz.qpic.cn/sz_mmbiz_png/1ibLKxRDVt6ibY5VWB81Sco0ic2ALmTiaXI3t9MIicicVXzjQs7vbR7B3Gh275jsibIAJtG5n63IbowjNDmeiaOkE97wrA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=4)

- **价格优势显著**：

- 

    - 每百万 Token 的价格约为 Claude Sonnet 的 **8%**。

    - 推理速度比 Claude Sonnet **快一倍**。

- 开放生态：在 HuggingFace 上开源了完整的模型权重。

- 促销活动：在 11 月 7 日前提供免费使用的 API 和 Agent 服务。就算不免费价格也非常白菜价了

## 4. 在Claude code 中使用 MiniMax-M2

Claude code 的安装就不罗嗦了，前面的文章已经说过很多了

#### 4.1 配置 MiniMax API

1. 通过 `settings.json` 文件配置

首先获取 `MiniMax API key`

MiniMax 开发者平台地址：

https://platform.minimaxi.com/user-center/basic-information/interface-key

注册登录后，点击【获取API Key】

![Image 5](https://mmbiz.qpic.cn/sz_mmbiz_png/1ibLKxRDVt6ibY5VWB81Sco0ic2ALmTiaXI37sib0Jww5Yp4YzXEKILXJ2J6FL1E2UDhPshdCtcCWZEK3b8Pwg9xkrQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=5)

点击【创建新的密钥】，创建后要先复制保存，因为后面就复制不了

![Image 6](https://mmbiz.qpic.cn/sz_mmbiz_png/1ibLKxRDVt6ibY5VWB81Sco0ic2ALmTiaXI3redlMV7eX2pUj5txLyjqMyuxVcdb8JDOO4YxRNv4QDbjNZ1WeH5AUw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=6)

向 `settings.json` 文件中添加或创建 `env` 字段，将 `MINIMAX_API_KEY` 替换成你自己的key

```Plain Text
{
  "env": {
    "ANTHROPIC_BASE_URL": "https://api.minimaxi.com/anthropic",
    "ANTHROPIC_AUTH_TOKEN": "<MINIMAX_API_KEY>",
    "API_TIMEOUT_MS": "3000000",
    "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": 1,
    "ANTHROPIC_MODEL": "MiniMax-M2",
    "ANTHROPIC_SMALL_FAST_MODEL": "MiniMax-M2",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "MiniMax-M2",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "MiniMax-M2",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "MiniMax-M2"
  }
}
```

![Image 7](https://mmbiz.qpic.cn/sz_mmbiz_png/1ibLKxRDVt6ibY5VWB81Sco0ic2ALmTiaXI3hbkrSmmVfblWy7hjFBwbQsfa6sgVD7gtMUicnS3o8IfQcc7cCwlo5pg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=7)

保存 `settings.json` 文件后，在终端执行 `claude` 命令，可以看到模型已经切换到 `MiniMax-M2`

![Image 8](https://mmbiz.qpic.cn/sz_mmbiz_png/1ibLKxRDVt6ibY5VWB81Sco0ic2ALmTiaXI3hibAvDVffFlBwzCEzdwXu1gSTwAicVJd0p6TSKiabvNgOolP6QZPU6KSQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=8)

1. 在 Claude code for VS code 插件中配置

在 `VSCode` 中安装`Claude code for VS code` 插件后

点击【设置】

![Image 9](https://mmbiz.qpic.cn/sz_mmbiz_png/1ibLKxRDVt6ibY5VWB81Sco0ic2ALmTiaXI3o1JSX0QTJ0iaWYVTPn2fonF2ToOCOVCqM6lmrkTJG1HibzntCLCUg1ew/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=9)

将模型设置为 `MiniMax-M2`

![Image 10](https://mmbiz.qpic.cn/sz_mmbiz_png/1ibLKxRDVt6ibY5VWB81Sco0ic2ALmTiaXI3BTibbcMvicNYORpulLtjOxfGoML36iaZfYf9TBgXXcr7Zl5JulpSicLo0A/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=10)

点击【在 settings.json中编辑】

![Image 11](https://mmbiz.qpic.cn/sz_mmbiz_png/1ibLKxRDVt6ibY5VWB81Sco0ic2ALmTiaXI3FC5eJ5rxwic8KvYibHEVyH3at2TXGCyYdibTuCcJDWtE27tFyDdO5dubQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=11)

将 `claude-code.environmentVariables` 变量更改为以下设置

```Plain Text
"claudeCode.environmentVariables": [
        {
            "name": "ANTHROPIC_BASE_URL",
            "value": "https://api.minimaxi.com/anthropic"
        },
        {
            "name": "ANTHROPIC_AUTH_TOKEN",
            "value": "<MINIMAX_API_KEY>"
        },
        {
            "name": "API_TIMEOUT_MS",
            "value": "3000000"
        },
        {
            "name": "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC",
            "value": "1"
        },
        {
            "name": "ANTHROPIC_MODEL",
            "value": "MiniMax-M2"
        },
        {
            "name": "ANTHROPIC_SMALL_FAST_MODEL",
            "value": "MiniMax-M2"
        },
        {
            "name": "ANTHROPIC_DEFAULT_SONNET_MODEL",
            "value": "MiniMax-M2"
        },
        {
            "name": "ANTHROPIC_DEFAULT_OPUS_MODEL",
            "value": "MiniMax-M2"
        },
        {
            "name": "ANTHROPIC_DEFAULT_HAIKU_MODEL",
            "value": "MiniMax-M2"
        }
    ],
```

注意，`ANTHROPIC_AUTH_TOKEN` 的`value`替换成自己的key

![Image 12](https://mmbiz.qpic.cn/sz_mmbiz_png/1ibLKxRDVt6ibY5VWB81Sco0ic2ALmTiaXI39e1yNgZ6ZxTTThYZQIAPUCrdibxXDCaiaHy7H27yuAF3H7dUIOkiamTVA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=12)

OK，`MiniMax-M2` 在 `Claude code` 中就配置好了

关于在其它 AI 编程工具中的配置可以参考官方文档，这里就不赘述了！

官网文档：https://platform.minimaxi.com/docs/guides/text-ai-coding-tools

这里就不贴测评了，圈内很多大佬也都进行了测评。

效果吧~仁者见仁智者见智

# 💡推荐阅读

如果你也想使用 Claude，但是**不想支付高额的费用，不想承担封号风险**……

**推荐你试一下我们的AI CODE平台**

详细介绍及付费兑换，后台回复：**cc** 查看

或+v：**afly813** 咨询

![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/1ibLKxRDVt69NMf2XxxoqpgBtiaKibazwayxFO8IoIZcLleVBl9ZokmKWl3IQSX6fKticvHCugRx8uJEtkeDNKsLqw/640?wx_fmt=jpeg&watermark=1#imgIndex=13)

目前我们的 AI CODE 平台**同时支持 claude code 和 codex** 这两大顶级大模型，想体验最强最前沿的 AI 编程，冲就完事了！！🚀

[伙伴们，以后写代码，codex和claude都可以爽yy啦！！！](https://mp.weixin.qq.com/s?__biz=MzIyMTI1MTkyNQ==&mid=2649775523&idx=1&sn=967251557c7fe2e18238226bfe6be8f4&scene=21#wechat_redirect)

[让你的 Claude Code 效率飞起！你只差这个万能公式！！](https://mp.weixin.qq.com/s?__biz=MzIyMTI1MTkyNQ==&mid=2649775703&idx=1&sn=3f360a73211db04f598359467d95242a&scene=21#wechat_redirect)

[这才是 AI 编程的最强组合，VSCode + Claude Code 让写代码快到飞起！](https://mp.weixin.qq.com/s?__biz=MzIyMTI1MTkyNQ==&mid=2649775649&idx=2&sn=5ec861d44e776057a01b1542d8b61017&scene=21#wechat_redirect)

[【附提示词模板】10个 Claude code 高频提示词模板（可直接复制使用）!建议收藏！！](https://mp.weixin.qq.com/s?__biz=MzIyMTI1MTkyNQ==&mid=2649775721&idx=1&sn=43f7754dafdc2d6c792f6a29b47c3052&scene=21#wechat_redirect)

**喜欢的话❤，欢迎点赞、关注一波，后续会持续为大伙分享 工作流、 AI编程等实战干货，让我们一起学 AI！**

