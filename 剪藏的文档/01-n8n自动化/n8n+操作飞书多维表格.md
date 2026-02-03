---

title: n8n 操作飞书多维表格
date: 2025-09-07
tags: ["n8n", "工作流", "自动化", "飞书", "工作流自动化"]
category: 自动化工具
---


# n8n 操作飞书多维表格

Original AI X-Talk [AI X-Talk](javascript:void(0);)*2025年09月07日 09:14* *福建*

n8n 工作流，工作过程中会产生中间或者结果数据，亦或者需要外接数据供工作流使用，这时候就需要外接数据库。

外接数据库的选择有很多，如：Mysql、Redis、Postgre 等。

多维表格也是数据存储的选择之一，多维表格免费使用且能快速接入到n8n中。




多维表格的操作，支持直接搭建 Http Request 节点的方式进行访问，例如：




![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/V9YU4icHiaEo2iaOc10ibh76j5SdW2pvaNF6feZDl4rWTNKoAicbkw7XBwlXFdAt3h5SByPkAOeOP0twX1Oa15ialWGg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=0)





但是直接使用 Http Request 节点比较繁琐，所以可以直接使用社区提供的节点，主要是两个节点库

1、n8n-nodes-feishu-lite
2、n8n-nodes-feishu-lark（对n8n-nodes-feishu-lite 的二次封装 ）

(可以只安装其中一个，或者都安装)

> 社区节点安装入口：左下角 ... -> Settings -> Community nodes -> install -> 输入节点

![Image 1](https://mmbiz.qpic.cn/sz_mmbiz_png/V9YU4icHiaEo2iaOc10ibh76j5SdW2pvaNF6Je4biaP9cB0bRTIacFU9lMbD38pzoRGKU9yM1ZTO8u0KxtjlItEKvibA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=1)




![Image](https://mmbiz.qpic.cn/sz_mmbiz_gif/V9YU4icHiaEo2iaOc10ibh76j5SdW2pvaNF6mcZTxkXIVCxd3N0dibtClkg5uFesJ9UNjJoZnObTLxWH3kaLTkcRNVQ/640?wx_fmt=gif&from=appmsg#imgIndex=2)

一、飞书开放平台创建应用并申请权限


![Image 1](https://mmbiz.qpic.cn/sz_mmbiz_gif/V9YU4icHiaEo2iaOc10ibh76j5SdW2pvaNF65gDSicibtZY2lFiapRibukmP700djVfCEOqoAZhCkib5ibRBoDxqibCico8boA/640?wx_fmt=gif&from=appmsg#imgIndex=3)

> 个人飞书用户 API 的主动调用次数为1个月10000次，基本够用。

升级企业版可以无限次数。

1.1、创建应用


应用创建入口：


![Image 2](https://mmbiz.qpic.cn/sz_mmbiz_png/V9YU4icHiaEo2iaOc10ibh76j5SdW2pvaNF6oxiakoH6E9fy8ud2E9FDC8pzIjMTCtUdZc9lqjK3ZbVCgYzlsiajx3AA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=4)




1.2、开通多维表格的相关权限





进入应用界面找到开发配置 -> 权限管理 -> 开通权限 -> 搜索“多维表格” -> 勾选多维表格相关权限




![Image 3](https://mmbiz.qpic.cn/sz_mmbiz_png/V9YU4icHiaEo2iaOc10ibh76j5SdW2pvaNF67sPN0k0Vdzy73h9KamticVbia9icg8tWeWYFh4gGHrEPlgoAYUzxA5vAw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=5)




1.3、发布应用


勾选完相关权限后，发布应用版本，发布完后，应用才真正具有相关API权限。

![Image 4](https://mmbiz.qpic.cn/sz_mmbiz_png/V9YU4icHiaEo2iaOc10ibh76j5SdW2pvaNF6OuXmclcSIluD36cpplzExmTukvJwAWSJBGUrQMUc1KjUdtEozkuIvw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=6)




1.4、飞书应用凭证等信息


使用 API 的方式调用飞书接口操作多维表格，需要得到飞书应用相关的 APPId和密钥，这是调用 API 的认证信息。该信息在 “基础信息 -> 凭证与基础信息” 中。例如下图：

![Image 5](https://mmbiz.qpic.cn/sz_mmbiz_png/V9YU4icHiaEo2iaOc10ibh76j5SdW2pvaNF6TRZVgUibjZYmIBnL2icj2cLjF5HqEkTK2yAlU7X8ZUicy890dt3iaLBsbg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=7)





![Image 2](https://mmbiz.qpic.cn/sz_mmbiz_gif/V9YU4icHiaEo2iaOc10ibh76j5SdW2pvaNF6mcZTxkXIVCxd3N0dibtClkg5uFesJ9UNjJoZnObTLxWH3kaLTkcRNVQ/640?wx_fmt=gif&from=appmsg#imgIndex=8)

二、多维表格创建


![Image 3](https://mmbiz.qpic.cn/sz_mmbiz_gif/V9YU4icHiaEo2iaOc10ibh76j5SdW2pvaNF65gDSicibtZY2lFiapRibukmP700djVfCEOqoAZhCkib5ibRBoDxqibCico8boA/640?wx_fmt=gif&from=appmsg#imgIndex=9)

# 

多维表格相当于数据库，用来存储数据。所以需要先创建多维表格。

2.1、多维表格创建


进入飞书文档，我的云盘，在**我的文件夹**中创建对应的多维表格（也可以在创建新的文件夹进行归类）

![Image 6](https://mmbiz.qpic.cn/sz_mmbiz_png/V9YU4icHiaEo2iaOc10ibh76j5SdW2pvaNF6bvcYI2xrFgibGZ5dXZYzGicRmNSNKI666pHfw10OLj3UVPUZe6KIicV0g/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=10)





创建后打开多维表格，需要关注多维表格的两个参数，这两个参数是 API 调用多维表格的必要参数，这两个参数从对应的 URL 链接中获取。

![Image 7](https://mmbiz.qpic.cn/sz_mmbiz_png/V9YU4icHiaEo2iaOc10ibh76j5SdW2pvaNF66WT2doZMVSfwYo86B9tBgiaq4PiblAVfia7RlJsW117nFpibicWdnpLVImA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=11)





假设URL链接为： 

> https://bpiyi62mh5.feishu.cn/base/1111111111?table=xxxxxxxxxxx&view=vewhpyBJXJ

参数 token值: 1111111111

参数 表格ID值: xxxxxxxxxxx

这两个值将在后续的 n8n 节点中发挥作用，他们的作用就是唯一锚定要操作的多维表格。

![Image 4](https://mmbiz.qpic.cn/sz_mmbiz_gif/V9YU4icHiaEo2iaOc10ibh76j5SdW2pvaNF6mcZTxkXIVCxd3N0dibtClkg5uFesJ9UNjJoZnObTLxWH3kaLTkcRNVQ/640?wx_fmt=gif&from=appmsg#imgIndex=12)

三、n8n 飞书节点操作多维表格


![Image 5](https://mmbiz.qpic.cn/sz_mmbiz_gif/V9YU4icHiaEo2iaOc10ibh76j5SdW2pvaNF65gDSicibtZY2lFiapRibukmP700djVfCEOqoAZhCkib5ibRBoDxqibCico8boA/640?wx_fmt=gif&from=appmsg#imgIndex=13)

# 

具体工作流程忽略，主要操作多维表格，演示多维表格的数据插入和查询，其余的操作相同。

演示的多维表格字段为：（具体场景自行调整）

![Image 8](https://mmbiz.qpic.cn/sz_mmbiz_png/V9YU4icHiaEo2iaOc10ibh76j5SdW2pvaNF6DsVLrrSlvibYEP1S0IQ2VS5pItRTyVMRbIewT7uBoFXKwicD0icPAu9xw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=14)


编辑

> Feishu Node 的操作，需要飞书开放平台创建的应用的凭证，即：AppId 和 AppSecret 。

每个 Feishu Node 都需要配置，配置信息如下：

![Image 9](https://mmbiz.qpic.cn/sz_mmbiz_png/V9YU4icHiaEo2iaOc10ibh76j5SdW2pvaNF6euQUb160ibPd7NIpS3Wrs1TSU5OamoQRLWbeWOaT2Zv0Y5WyYBQk0Gw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=15)





3.1、插入数据


搜索feishu节点，选择，并勾选**多维表格-新增记录**

![Image 10](https://mmbiz.qpic.cn/sz_mmbiz_png/V9YU4icHiaEo2iaOc10ibh76j5SdW2pvaNF6ucAVJhjY4O9LzGwroffNBmxA0jYTZ48wnxK0VO1JibE1YODbb9uwbNg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=16)





点击 Feishu Node 进行配置，配置信息如下：


![Image 11](https://mmbiz.qpic.cn/sz_mmbiz_png/V9YU4icHiaEo2iaOc10ibh76j5SdW2pvaNF6nTwHKTDw5ISQVs1cc5lotJbe2XOTCuyZoYW9VgnTHz8K6MGFBJdJKQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=17)





点击执行 Execute step ，进入多维表格插件是否插入数据

![Image 12](https://mmbiz.qpic.cn/sz_mmbiz_png/V9YU4icHiaEo2iaOc10ibh76j5SdW2pvaNF6S1uRlYS8SZS5nQSicDaQlkNx47sudeib9OOImnZibMbPDKUMwaqXQyFHA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=18)




3.2、查询数据


数据的查询同“插入数据"，同样选择 ‘Feishu Node' ，然后选择：查询记录。

![Image 13](https://mmbiz.qpic.cn/sz_mmbiz_png/V9YU4icHiaEo2iaOc10ibh76j5SdW2pvaNF6wPwLl8JwU2UIEGP5WiauCujR4Pd6XBYm1gylNpxc8UEcicFsSx4Jf5Kw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=19)





点击 Feishu Node 进行配置，配置信息同”插入数据" ,唯一不同的是请求参数。

具体查询参数，参照飞书API文档。

![Image 14](https://mmbiz.qpic.cn/sz_mmbiz_png/V9YU4icHiaEo2iaOc10ibh76j5SdW2pvaNF6legFtsn7rbooic7M6cqSqDzVItPaXicMKRntjgYfLVVm8B6x8zBUC6Cg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=20)





点击执行 Execute step，查看数据结果，对照多维表格。

![Image 15](https://mmbiz.qpic.cn/sz_mmbiz_png/V9YU4icHiaEo2iaOc10ibh76j5SdW2pvaNF6Kp98CbjkrqONksE3XhP4YE7ZGCHGFSrXticJYgQo1ht0dHZOL0frR2Q/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=21)




