---

title: n8n实战教程2：定时通过大模型发送n8n实战教程内容到邮箱
date: 2025-10-04
tags: ["n8n", "工作流", "自动化", "教程", "入门", "上手", "保姆", "喂饭", "实战", "案例", "工作流自动化"]
category: 自动化工具
---


# n8n实战教程2：定时通过大模型发送n8n实战教程内容到邮箱

Original 花很花 [花解AI焦虑](javascript:void(0);)*2025年10月04日 09:40* *江西*

![Image](https://mmbiz.qpic.cn/mmbiz_png/d6xN6SAdALXgzcJCcqWtiasHuwJrMtvHLJMjuAC0UhVdI39GIlPEtD1dzmDhqcm9EBxGQW3QISl4H6pAg6P3l7w/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=0)

设计「定时通过大模型发送 n8n 实战教程到邮箱」工作流，初衷是通过 n8n 自动化与大模型结合，解决技术学习中信息碎片化、入门门槛高及知识分发低效的痛点，让用户高效获取结构化实战内容；愿景则是升级为个性化学习模式，探索低代码与 AI 的协同边界，最终实现技术普惠，让更多人轻松掌握自动化工具价值。

### **步骤 1：创建Schedule Trigger 定时触发器**

作用：设定工作流的执行时间（如每天 9:00 发送）。

1. 打开 n8n 控制台，新建工作流，拖拽左侧「Schedule Trigger」节点到画布。

2. 双击节点配置：

3. 

    - **Trigger On：选择 Custom（自定义时间）。**

- **Cron Expression：输入定时表达式（例如 0 9 * * *表示每天 9:00，可借助 Cron 生成器 生成）。**

- 其他参数默认（时区默认 UTC，需根据实际时区调整）。

![Image 1](https://mmbiz.qpic.cn/mmbiz_png/d6xN6SAdALXgzcJCcqWtiasHuwJrMtvHLgyKvpfnyFVt11wQLP7tQNQ6p0ATmn4xOSNfhpHtK6jhjm574svuJUQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=1)

### **步骤 2：添加Al Agent节点（以 DeepSeek 为例）**

作用：调用大模型生成内容（如每日教程、资讯等）。

1. 拖拽「**Al Agent**」节点到画布，连接到「Schedule Trigger」节点。

2. Chat Model 添加DeepSeek Chat Model DeepSeek 聊天模型

3. 

    ### 配置「DeepSeek Chat Model」节点

    双击该节点，进入参数配置：

    - **API 凭证：**

- 

    - 点击「Credentials」下拉框 → 选择「Create New」→ 选择「DeepSeek API Key」类型。

    - 在「API Key」字段输入你的 **DeepSeek 官方 API 密钥**（需从 DeepSeek 平台获取）。

- **模型选择：**

- 

    - 在「Model」下拉框选择 `deepseek-chat`（或 DeepSeek 支持的其他聊天模型，如 `deepseek-llm-7b-chat` 等）。

- **可选参数（按需调整）：**

- 

    - `Temperature：控制生成随机性（默认 0.7，越低越稳定）。`

- `Max Tokens：限制生成文本长度（默认 2000，可根据需求调整）。`

![Image 2](https://mmbiz.qpic.cn/mmbiz_png/d6xN6SAdALUcKdiav2CQYTRcMCIQTIJfBLnRdhOYnzV1UZsVlia6zqTLe8G0ia4UNrdO0dn3Jn9MIWWXcUNY8OLlQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=2)

### 配置「AI Agent」节点

双击该节点，进入参数配置：

- **Chat Model 关联：确保「Chat Model」端口已连接到「DeepSeek Chat Model」节点（截图中虚线连接需确认配置生效）。**

- **提示词（Prompt）设置：在「Prompt」输入框中填写引导生成的指令，例如： 你是n8n 自动化领域的专家，请生成一篇最新的 n8n 实战教程，要求内容具体、可操作，包含步骤和场景示例，字数不超过 500 字。**``

- **Memory（记忆）：若只需单次生成（无需上下文关联），可保持「Memory」为 None（默认值）。**

- **Tools（工具）：若无需调用外部工具（如网络搜索），可保持「Tools」为空，让模型纯生成文本。**

### **步骤 3：配置邮件发送节点（Send Email）**

作用：将生成的内容发送到指定邮箱。

1. 拖拽「Send Email」节点到画布，连接到「Set」节点（或直接连接到「HTTP Request」节点）。

2. 配置邮件参数：

3. 

    - 单邮箱：直接输入（如 `xxx@example.com`）。

    - 多邮箱：用英文逗号分隔（如 `a@test.com, b@test.com`）。

1. 

    - `SMTP Host`

        ：`smtp.qq.com`（QQ 邮箱示例，其他邮箱需对应修改）。

    - `SMTP Port`

        ：`465`（SSL 端口）。

    - `SMTP User`

        ：发件人邮箱（如 `xxx@qq.com`）。

    - `SMTP Password`

        ：邮箱 SMTP 授权码（非登录密码，在邮箱设置中获取）。

1. 

    - **Credential to connect with**

        ：点击「Create New」→ 选择「SMTP」，填写：

    - **From Email**

        ：发件人邮箱（与 SMTP 账号一致）。

    - **To Email：**

- **Subject：邮件主题（如 每日n8n教程）**

- **Email Format：Text（纯文本）。**

- **Text（邮件正文，支持自定义开头结尾）：**

![Image 3](https://mmbiz.qpic.cn/mmbiz_png/d6xN6SAdALUcKdiav2CQYTRcMCIQTIJfBz5ks2dkUbkPwIQWmgC1FSHK4VdOLkCTwfn86oic4DB0cLzEuqjq65DA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=3)

![Image 4](https://mmbiz.qpic.cn/mmbiz_png/d6xN6SAdALUcKdiav2CQYTRcMCIQTIJfBHm9YOkeGHmdo40MdrsEm1WfYqdO51Y7yGgyso7UNNOsRejp7V7XQSQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=4)










