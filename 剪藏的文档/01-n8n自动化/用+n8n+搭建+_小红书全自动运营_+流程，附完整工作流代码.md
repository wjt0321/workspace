---

title: 用 n8n 搭建 "小红书全自动运营" 流程，附完整工作流代码
date: 2025-11-10
tags: ["n8n", "工作流", "自动化", "工作流自动化"]
category: 自动化工具
---


# 用 n8n 搭建 "小红书全自动运营" 流程，附完整工作流代码

Original 智在点滴 [智在点滴](javascript:void(0);)*2025年11月10日 17:05* *上海*

**点击蓝字 关注我们**

![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/P5WCQnPUpeC9IhhvKvro5GQ4u9Zpxf2y3Kiayh5WPbEjUKsRm7ysQwfrlRJcSgKJbda25Sq82feVPcyHkYZLaeA/640?wx_fmt=jpeg&watermark=1#imgIndex=0)




**01**


****


****

写在前面




每天刷小红书找灵感、手动写文案、做卡片图、再手动发布？




运营党表示：重复工作真的累！




今天分享一个「黑科技操作」：

用 n8n 搭建全自动工作流，只要输入 1 个小红书链接，就能自动解析原内容、仿写新文案、生成卡片图，最后直接发布到你的小红书账号，全程不用手动干预！




下面一步步教你从零搭建：




![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/P5WCQnPUpeC9IhhvKvro5GQ4u9Zpxf2yjHLqufkvKx1bLm0hic4bLgsofElhyumodhqf7LKRUnpKMIU1Vm2lc0w/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=1)




上面这个，就是比较完整的n8n工作流，下面我们来操作一遍。




**02**


****


****

准备工作







## 一、搭建工作流前，我们要准备好3个前期准备工作：

## 

步骤1：使用Docker 部署 n8n

1，先安装「Docker Desktop」（官网下载，免费），安装完成后打开（桌面出现鲸鱼图标即启动成功）；

![Image 1](https://mmbiz.qpic.cn/sz_mmbiz_png/P5WCQnPUpeDKxiaicMJcoW0menzhkic9u0YGicpasYwBSXS2PyRqf1mPE6LGzY40ztC0rOUcFDP0eeQmfweokKpNKA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=2)

 2，打开 Windows PowerShell（Win 键搜索 “PowerShell”），复制粘贴以下命令，按回车执行

```Plain Text
docker run -it --rm --name n8n -p 5678:5678 -v n8n_data:/home/node/.n8n n8nio/n8n
```

3， 命令执行后，浏览器输入 http://localhost:5678，能看到 n8n 登录界面，说明部署成功！ 

![Image 2](https://mmbiz.qpic.cn/sz_mmbiz_png/P5WCQnPUpeDKxiaicMJcoW0menzhkic9u0Y0uw3hpv3LnU6ic2qxtU8SaMu3XmzTXHCFrjdhZ0Gyzyahibgapp5g3OQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=3)




部署这部分，可以看我之前的文章，有具体介绍

[教你本地部署安装N8N工作流，零基础教程](https://mp.weixin.qq.com/s?__biz=MzkwMTYxMzMwOQ==&mid=2247487110&idx=1&sn=8344f00759b92646b8f49122558d208e&scene=21#wechat_redirect)




步骤2：部署安装小红书MCP服务

这里，我用的是一个开源的git项目

```Plain Text
https://github.com/xpzouying/xiaohongshu-mcp
```




可以看到，这个项目支持小红书的内容发布、获取帖子详情等功能。我们要做的就是安装部署好这个mcp服务。




![Image 3](https://mmbiz.qpic.cn/sz_mmbiz_png/P5WCQnPUpeC9IhhvKvro5GQ4u9Zpxf2yCWaPlZnDwpCKdvKh7BXpibp8QHUEica6hq5viaiaPO2QEgqeSZeKeQ1jicA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=4)




1，安装 Git（若未安装）

- Windows/Mac：下载Git 官网客户端，默认安装即可；

- Linux（Ubuntu）：sudo apt-get install git；

- 验证：终端输入 git --version，显示版本号即为成功。

![Image 4](https://mmbiz.qpic.cn/sz_mmbiz_png/P5WCQnPUpeC9IhhvKvro5GQ4u9Zpxf2yunTfE75aBZIJObBNl0IiaiaCGM3eaMZFabVzLR3oBae8rnicT3dNk3pHw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=5)

2，克隆仓库到本地：

执行以下命令：

```Plain Text
# 克隆小红书-mcp仓库
git clone https://github.com/xpzouying/xiaohongshu-mcp.git
# 进入仓库目录（后续操作均在此目录下）
cd xiaohongshu-mcp
```

3，启动服务：

在目录（xiaohongshu-mcp）下，执行以下命令启动服务：

```Plain Text
npx @modelcontextprotocol/inspector
```

![Image 5](https://mmbiz.qpic.cn/sz_mmbiz_png/P5WCQnPUpeC9IhhvKvro5GQ4u9Zpxf2yC0YhKq7dyPLFkl0uMsLRa6nEHvykuhZ4t1wHoZHeWxPY7wFsPwkSMw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=6)

浏览器会自动打开mcp服务页面，此时，我们需要点击一下页面中的“connect”按钮。

![Image 6](https://mmbiz.qpic.cn/sz_mmbiz_png/P5WCQnPUpeC9IhhvKvro5GQ4u9Zpxf2yME3IJ2xvIIDPW6osZsbdrQQxZm6ibaVfSUFwdeYZDmMxSEH43V5aKsQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=7)

在Tool LIST中，我们可以看到各种功能，第一次使用的时候，需要登录，运行工具，获取二维码，然后用小红书APP扫码登录即可。

![Image 7](https://mmbiz.qpic.cn/sz_mmbiz_png/P5WCQnPUpeC9IhhvKvro5GQ4u9Zpxf2yzQiaSzaPkoDOYylX0dBHTAgDZHsV7icERSyEVZmzbbrozNXWLsOkeibGA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=8)

当然在这里，我们也可以快速地发布小红书内容。

![Image 8](https://mmbiz.qpic.cn/sz_mmbiz_png/P5WCQnPUpeC9IhhvKvro5GQ4u9Zpxf2yicDE7ulegkx4KRryg6Dk9jF9P5TUyiaiaBe3GDFqrek1OL90X7ocHhJcg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=9)

步骤3：在n8n中安装MCP节点

接下来，要想在n8n中使用这个小红书的服务，还需要在n8n中安装一个社区节点，




1，点击左侧菜单栏的「Settings」（齿轮图标）→ 选择「Community Nodes」选项卡。

![Image 9](https://mmbiz.qpic.cn/sz_mmbiz_png/P5WCQnPUpeC9IhhvKvro5GQ4u9Zpxf2y2PjkgOKGhx5boxbhhS7ZdDribjuQk5dQXlLTc7WfGP3KfbV6AHQNt6w/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=10)




2，点击页面中的「Install」按钮后，在页面中输入「n8n-nodes-mcp-client」，并点击「Install」按钮，等待安装即可。




![Image 10](https://mmbiz.qpic.cn/sz_mmbiz_png/P5WCQnPUpeC9IhhvKvro5GQ4u9Zpxf2yeTW37UZ0IIDuJqDvqnQz4mHR47h5XATuT84VfAEfYqGNsGwegbqpuA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=11)

**03**


****


****

进入正题，开始工作流搭建

### 一、整体流程框架

![Image 11](https://mmbiz.qpic.cn/sz_mmbiz_png/P5WCQnPUpeC9IhhvKvro5GQ4u9Zpxf2yibocts4fWLJGhPBLOvzrkha5YfnFcntUJOncqGxt48OjvJXgZcrsDqg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=12)

这个工作流的核心是：

输入小红书链接----获取关键信息----AI仿写----生成新的图片----发布内容

### 二、分步搭建（带节点配置细节）

## 节点1：触发节点

## 这里的作用是创建一个输入入口，让我们后续运行工作流的时候，可以有个地方输入小红书链接。

![Image 12](https://mmbiz.qpic.cn/sz_mmbiz_png/P5WCQnPUpeC9IhhvKvro5GQ4u9Zpxf2yP1XQ546QDPyFpjwQJeiaFrfsRqrGLClQRBB87Fo01HDbBOIj1mPo5jQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=13)

## 

## 点击运行后，会出现这样的页面

![Image 13](https://mmbiz.qpic.cn/sz_mmbiz_png/P5WCQnPUpeC9IhhvKvro5GQ4u9Zpxf2yFjVos5cLIPiceMqiaZOPNn62KuM8U4ZibMjzWBI9OMM4v999cso5RF9Iw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=14)

## 

我们需要输入我们的小红书链接，这个也很好找，就是我们在网页中打开任意一个小红书详情页面，把浏览器中的那一长串url地址复制，粘贴进来即可。




## 节点2：提取链接中的关键信息

## 因为我们的mcp服务，在获取详情时，会用到ID、以及token。

![Image 14](https://mmbiz.qpic.cn/sz_mmbiz_png/P5WCQnPUpeC9IhhvKvro5GQ4u9Zpxf2yPXwmRKKhdF4qL3x5XjwF3MdGrGX0bHobP4g7BJiamhlGicg88KoHva3Q/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=15)

## 

## 所以，我们要通过一个code节点，进行关键信息的提取，获取到ID、token。

![Image 15](https://mmbiz.qpic.cn/sz_mmbiz_png/P5WCQnPUpeC9IhhvKvro5GQ4u9Zpxf2yLicHnF5c5O2upiaUXo3LKcHBua26sERdTfmHPJxEojJNn0GGR9pIzxeQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=16)

这里使用到的代码，我贴出来，大家自取：

```Plain Text
// 从输入中获取小红书链接（假设上一节点的字段是“小红书笔记链接”）
const link = $input.first().json['小红书链接'];

let extractedId = null;
let extractedToken = null;
let errorMsg = null;

try {
    // 提取ID：匹配 explore/ 后的字符串（到 ? 为止）
    const idMatch = link.match(/explore\/([^?]+)/);
    if (idMatch && idMatch[1]) {
        extractedId = idMatch[1];
    }

    // 提取Token：匹配 xsec_token= 后的字符串（到 & 或结尾为止，并去除末尾的等号）
    const tokenMatch = link.match(/xsec_token=([^&]+)/);
    if (tokenMatch && tokenMatch[1]) {
        extractedToken = tokenMatch[1].trim().replace(/&$/, '').replace(/=$/, '');
    }
} catch (err) {
    errorMsg = `解析失败: ${err.message}`;
}

// n8n Code节点需要返回输出数组
return [
    {
        json: {
            ...$input.first().json,
            xiaohongshu_extracted: {
                originalLink: link,
                feed_id: extractedId,
                xsec_token: extractedToken,
                error: errorMsg
            }
        }
    }
];
```




## 节点3：获取小红书详情

## 

![Image 16](https://mmbiz.qpic.cn/sz_mmbiz_png/P5WCQnPUpeC9IhhvKvro5GQ4u9Zpxf2yQKQQ4zOgPBybYDympibUUJncRZc2XnlXsczLTljUcLpL0lCau2iadvLw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=17)

## 

## 在这里，我们需要搭建一个mcp服务节点。

## 拖入「MCP Client」中的“Execute a tool”节点,

![Image 17](https://mmbiz.qpic.cn/sz_mmbiz_png/P5WCQnPUpeC9IhhvKvro5GQ4u9Zpxf2yhw1oGC2dqEjPCNSNlfhJkMJg0hNoxxjiaxqw8pJM5xtFMYFI4gpTznQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=18)

## 在正式使用前，我们还要做一下配置，

## 输入URL：

```Plain Text
http://host.docker.internal:18060/mcp
```

## 即可自动调用我们前面部署的本地MCP服务

![Image 18](https://mmbiz.qpic.cn/sz_mmbiz_png/P5WCQnPUpeC9IhhvKvro5GQ4u9Zpxf2y2y90hDchT0m62eEYF3X5uP6VW6hA5BefmsJNiaFiaCpC0ynLcu4xR76A/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=19)

准备就绪后，我们获取帖子详情，

![Image 19](https://mmbiz.qpic.cn/sz_mmbiz_png/P5WCQnPUpeC9IhhvKvro5GQ4u9Zpxf2yrIicqpPVj6ticvppB7ibQoSnEVjWosbbzSovOBa8twCLXH8FsQF7THOicw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=20)

tool name ：输入 get_feed_detail

Tool Parameters：我们输入

```Plain Text
{
"feed_id":"{{ $json.xiaohongshu_extracted.feed_id }}",
  "xsec_token":"{{ $json.xiaohongshu_extracted.xsec_token }}"
} 
```

节点4：进一步处理信息

因为上一个节点拿到的信息太多太杂

所以，我现在进一步处理，因为只需要拿到帖子内容，以及标题

![Image 20](https://mmbiz.qpic.cn/sz_mmbiz_png/P5WCQnPUpeC9IhhvKvro5GQ4u9Zpxf2yaicGicr8GXiatqySdHReBica44NrSepHGzx4ngKoKudTlNpDbBspqsWV8A/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=21)

我用了一个code节点，进行处理。

节点5：AI处理，文章仿写

关键的来了，敲重点

这一步很重要，要对原始内容进行仿写

![Image 21](https://mmbiz.qpic.cn/sz_mmbiz_png/P5WCQnPUpeC9IhhvKvro5GQ4u9Zpxf2yeBk5h7KRhTPibno9593y2ibVcoMOu1uKB0yMhL1wPGsiboaUXpWkJw0dQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=22)

要用到一个叫做 AI  agent的节点

要输入Prompt (User Message)

```Plain Text
请模仿以下内容的格式和风格，创作一段全新的 Markdown 内容：
{{ $json.desc }}
要求：
- 保留原有的换行、表情符号；
- 原有的话题标签不要保留；
- 结构保持一致（标题、描述段落、列表项、位置不变）。
- 内容仿写，保持原有的内容大意即可
```

输入System Message：

`你是专业的 Markdown 内容仿写助手，需严格按照以下要求输出：1. 模仿输入内容的风格、结构、表情符号；2. 输出必须是完整的 Markdown 格式（包含标题、描述、列表、等）；3. 内容主题与“物流、航运、招聘”相关，保持原创性；4. 直接返回 Markdown 文本，不添加任何解释或额外内容。`




以上提示词，大家可以根据实际需要，自行调整修改

节点6：生图

这里我用的是一款免费的自动生图工具

![Image 22](https://mmbiz.qpic.cn/sz_mmbiz_png/P5WCQnPUpeC9IhhvKvro5GQ4u9Zpxf2ytZs80LleRjCyS1zQ0IAUKGr7daQUdujBe7CBJsgQqc1aB5B0IgQroQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=23)

大家浏览器输入官方网址

```Plain Text
https://md2card.cn
```

注册的时候，填写一下邀请码：88882026

因为这样，我跟你就都能拥有30个积分。可以免费生成30张图

在此，谢过啦！

![Image 23](https://mmbiz.qpic.cn/sz_mmbiz_png/P5WCQnPUpeC9IhhvKvro5GQ4u9Zpxf2yDspQ75Yl0jPbYePIV6cpDHITiaEalkTXHiaRTjUGVrNa1zky3kEhia6xA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=24)

配置生图节点，

![Image 24](https://mmbiz.qpic.cn/sz_mmbiz_png/P5WCQnPUpeC9IhhvKvro5GQ4u9Zpxf2yoqAHv0iaXfPjYvQ1XFwhbQEARPMf8mB55hNPGxKoWt1ALIMERku6Ojg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=25)

这里我们要拖入“http request”节点：

- **Method：选择 `POST`**

- **`url：输入https://md2card.cn/api/generate`**

head这里，

 name：输入x-api-key

value：输入实际的key（这个key在md2card中申请）

![Image 25](https://mmbiz.qpic.cn/sz_mmbiz_png/P5WCQnPUpeC9IhhvKvro5GQ4u9Zpxf2y2ut89hAL1x5X3GcrMA9h8ibc3DjUZkyx8Yn1BfTV17wfuGg8YSPUN8A/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=26)

body的配置，输入json：

{

  "markdown": {{ $json.output.markdown_content.toJsonString() }},

  "theme": "apple-notes",

  "width": 440,

  "height": 586,

  "splitMode": "noSplit",

  "mdxMode": false,

  "overHiddenMode": false,

  "weChatMode": false

} 

`即可完成配置，运行节点，就可以获得图片了`

节点7：发布内容

![Image 26](https://mmbiz.qpic.cn/sz_mmbiz_png/P5WCQnPUpeC9IhhvKvro5GQ4u9Zpxf2ybzUCvHHiaErWcL5CdEkgQIkxFo22Guu2w3fSN0PMmTTf81mGMu4gyVQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=27)

最后，就到了发布节点，

此时，我们需要把仿写的内容，标题，以及生成的图片链接，按照格式填好，点击发布，

就可以成功发布到小红书了。

配置节点如下：

先拖入mcp节点，再进行配置

Tool Name：填写publish_content




然后输入：

{  

"content": "{{ $json.content }}",  

"images": [    

"{{ $('Edit Fields1').item.json.image }}"  

],  

"title": "{{ $('Edit Fields').item.json.title }}"

}




至此，神功大成。




### 具体的n8n完整工作流，我放在云盘了，可私信获取。




后台回复“20251110”，快速获取链接。

好了，今天的分享就到这里。希望对你有用。

**既然看到这里了，如果觉得不错，随手点个赞、在看、转发三连吧，如果想第一时间收到推送，也可以给我个星标⭐～谢谢你看我的文章。**







— **完** —




**点这里👇关注我，记得标星哦～**




**一键三连「分享」、「点赞」和「在看」**

**科技前沿进展日日相见 ~** 

![图片](https://mmbiz.qpic.cn/mmbiz_svg/g9RQicMD01M0tYoRQT2cMQRmPS5ZDyrrfzeksiay90KaDzlGBH61icqHxmgFKfvfXtVuwTHV740CDLAaXU1LIfZyoJEpYKcRIiaE/640?wx_fmt=svg&wxfrom=5&wx_lazy=1&wx_co=1&tp=webp#imgIndex=25)

往期推荐

[手搓代码，实现微信自动回复：4个版本迭代，让代码替我谈恋爱！附完整代码](https://mp.weixin.qq.com/s?__biz=MzkwMTYxMzMwOQ==&mid=2247486966&idx=1&sn=3be28737e59dd024581b717f732b97bb&scene=21#wechat_redirect)

[一口吃掉一座城！这些“地标食盒”让家乡味高级感拉满！附提示词](https://mp.weixin.qq.com/s?__biz=MzkwMTYxMzMwOQ==&mid=2247486693&idx=1&sn=499b1601a2c4f93772757cff695d05d8&scene=21#wechat_redirect)

[整个活：我让deepseek给我写了一段代码，让我的word文档接入deepseek(零代码基础的教程)](https://mp.weixin.qq.com/s?__biz=MzkwMTYxMzMwOQ==&mid=2247486145&idx=1&sn=f70b742a4bf8ab5fe04fda60df9b7721&scene=21#wechat_redirect)

[从 “复杂劝退” 到 “新手友好”：我简化了 n8n 视频创作自动化流程，零付费也能上手！附完整工作流](https://mp.weixin.qq.com/s?__biz=MzkwMTYxMzMwOQ==&mid=2247487161&idx=1&sn=dff6c1ec5e46b9c59891dfb73c4e37b4&scene=21#wechat_redirect)

[一招教会你，优雅的观看VIP电影，并DIY做一个自动化工具](https://mp.weixin.qq.com/s?__biz=MzkwMTYxMzMwOQ==&mid=2247486876&idx=1&sn=f7d7747f76521d2a74d815359316daf3&scene=21#wechat_redirect)

