# n8n节点JSON文件生成说明

## 📁 目录结构

```
D:\workspace\n8n-nodes\
├── README.md                               # 本文件
├── 1.n8n美文收集自动化工作流方案.md        # 完整技术方案（主文档）
├── 2.QUICKSTART.md                         # 快速开始指南
├── 3.workflow-guide.md                     # 工作流导入指南
├── example-partial-workflow.json           # 节点JSON格式示例
├── 实施记录-20251228-001.md                # 实施记录（已验证配置）
└── 实施记录-YYYYMMDD-序号.md               # 后续实施记录（按时间顺序）
```

---

## ⚠️ 重要提示（2025-12-28）

### 已验证配置

**强烈建议使用已验证的配置实施**，不要直接使用本文档中的理论配置。

**实施状态**:
- ✅ 节点00-06: 已验证成功
- ⚠️ 节点07: binary数据问题待修复
- 🔄 节点08-36: 待实施

**详细文档**: **`实施记录-20251228-001.md`**

### 关键变化

1. **级别配置**: 已移除"小学生美文"，保留4个级别（初中、高中、大学、成人）
2. **数据传递**: 使用Merge节点方案（节点04A + 04B + 04C）
3. **文件路径**: 所有文件直接放在级别目录根目录，**无articles子目录**
4. **Binary问题**: Code节点无法返回binary字段（n8n版本限制）

---

## 🎯 如何使用节点配置

### 方式1: 手动创建节点（推荐用于理解流程）

由于n8n的节点包含很多UI布局信息，直接导入单个JSON文件可能不够直观。我们建议您：

1. **在n8n中手动创建节点**
2. **参考下方的节点配置清单**，逐个配置节点
3. **按照连接图连接节点**

### 方式2: 使用完整工作流JSON（最简单）

我们提供了一个完整工作流的JSON文件，您可以直接导入使用。

---

## 📋 节点配置清单

### 节点00: 定时触发器

**节点类型**: Cron Trigger
**配置**:
```yaml
Name: 定时触发器
Node: n8n-nodes-base.cronTrigger
Cron Expression: 0 9 * * *
```

**说明**: 每天早上9点触发工作流

---

### 节点01: 读取总索引

**节点类型**: AWS S3
**配置**:
```yaml
Name: 读取总索引
Operation: Download
Bucket Name: cherrystudio
Key: 美文总索引.md
Credentials: 您的R2凭证
```

---

### 节点02: LLM分析索引

**节点类型**: OpenAI Model (或您的LLM)
**配置**:
```yaml
Name: LLM分析索引
Model: gpt-4 (或您的模型)
Prompt: |
  分析以下美文总索引内容，提取：
  1. 各文件夹现有文章数量和标题
  2. 已收录作家名单和作品分布
  3. 题材覆盖情况
  4. 潜在重复风险作品

  总索引内容：
  {{ $binary.data }}

  请以JSON格式返回分析结果。
```

---

### 节点03: 选择收录级别

**节点类型**: Code
**配置**:
```javascript
const levels = [
  {
    key: '初中生美文',
    name: '初中生美文',
    snippetFile: '初中生美文/初中生美文精选100篇.md',
    indexFile: '初中生美文/美文收集索引.md',
    templateFile: '初中生美文/美文赏析与教学通用模版.md'
  },
  {
    key: '高中生美文',
    name: '高中生美文',
    snippetFile: '高中生美文/高中生美文精选100篇.md',
    indexFile: '高中生美文/美文收集索引.md',
    templateFile: '高中生美文/美文赏析与教学通用模版.md'
  },
  {
    key: '大学生美文',
    name: '大学生美文',
    snippetFile: '大学生美文/经典散文片段.md',
    indexFile: '大学生美文/美文收集索引.md',
    templateFile: '大学生美文/美文赏析与研究通用模版.md'
  },
  {
    key: '成人美文',
    name: '成人美文',
    snippetFile: '成人美文/经典散文片段.md',
    indexFile: '成人美文/美文收集索引.md',
    templateFile: '成人美文/美文赏析与人生通用模版.md'
  }
];

const today = new Date().getDay();
const selected = levels[today % 4];  // 4个级别轮换

return {
  json: selected
};
```

**输出**: 选中的级别配置信息（包含snippetFile, indexFile, templateFile）

---

### 节点04: LLM生成片段

**节点类型**: OpenAI Model
**配置**:
```yaml
Name: LLM生成片段
Model: gpt-4
Prompt: |
  任务：收集1篇{{ $json.name }}的散文片段

  要求：
  1. 作家范围：近现代中文散文大家
  2. 片段长度：150-300字
  3. 开头Emoji：添加2-3个主题相关Emoji
  4. 正文穿插：每2-3句话插入1个相关Emoji
  5. 避免重复现有作品

  输出格式：
  ## N. {作品名} - {作者}

  🌸📖🌿

  {片段正文，含Emoji穿插}

  **来源**：{书籍/期刊名}
  **主题**：{主题词}
  **特色**：{风格特点}

  请返回JSON格式：
  {
    "sequence": N,
    "title": "作品名",
    "author": "作者",
    "emojis": "🌸📖🌿",
    "content": "片段正文",
    "source": "来源",
    "theme": "主题",
    "feature": "特色"
  }
```

---

### 节点05: 读取片段文件

**节点类型**: AWS S3
**配置**:
```yaml
Name: 读取片段文件
Operation: Download
Bucket Name: cherrystudio
Key: {{ $('选择收录级别').item.json.snippetFile }}
```

---

### 节点06: 更新片段内容

**节点类型**: Code
**配置**:
```javascript
const existingContent = Buffer.from($binary.data, 'base64').toString('utf-8');
const newSnippet = $input.first().json;

const matches = existingContent.match(/## (\d+)\./g);
const lastNumber = matches ? parseInt(matches.pop().match(/\d+/)[0]) : 0;
const nextNumber = lastNumber + 1;

const snippetText = `
## ${nextNumber}. ${newSnippet.title} - ${newSnippet.author}

${newSnippet.emojis}

${newSnippet.content}

**来源**：${newSnippet.source}
**主题**：${newSnippet.theme}
**特色**：${newSnippet.feature}

`;

const updatedContent = existingContent + snippetText;

return {
  binary: {
    data: Buffer.from(updatedContent).toString('base64')
  },
  json: {
    sequence: nextNumber,
    filename: `${nextNumber}.${newSnippet.title}-${newSnippet.author}.md`,
    s3Key: `${$('选择收录级别').item.json.key}/${nextNumber}.${newSnippet.title}-${newSnippet.author}.md`,  // 直接放在级别目录根目录
    snippetData: newSnippet
  }
};
```

**说明**: 完整文章直接放在级别目录根目录，无articles子目录

---

### 节点07: 上传片段文件

**节点类型**: AWS S3
**配置**:
```yaml
Name: 上传片段文件
Operation: Upload
Bucket Name: cherrystudio
Key: {{ $('选择收录级别').item.json.snippetFile }}
Data: {{ $binary.data }}
```

---

### 节点08: 读取级别索引

**节点类型**: AWS S3
**配置**:
```yaml
Name: 读取级别索引
Operation: Download
Bucket Name: cherrystudio
Key: {{ $('选择收录级别').item.json.indexFile }}
```

---

### 节点09: LLM更新索引

**节点类型**: OpenAI Model
**配置**:
```yaml
Name: LLM更新索引
Model: gpt-4
Prompt: |
  任务：更新美文收集索引

  现有索引内容：
  {{ $binary.data }}

  新增片段信息：
  - 序号：{{ $('更新片段内容').item.json.sequence }}
  - 文件名：{{ $('更新片段内容').item.json.filename }}
  - 作品名：{{ $('更新片段内容').item.json.snippetData.title }}
  - 作者：{{ $('更新片段内容').item.json.snippetData.author }}
  - 主题：{{ $('更新片段内容').item.json.snippetData.theme }}

  要求：
  1. 更新总计篇数
  2. 更新已完成篇数
  3. 更新最后更新日期为今天：{{ $now.format('YYYY-MM-DD') }}
  4. 在片段列表中添加新片段信息
  5. 保持原有格式不变

  请返回完整的更新后索引内容。
```

---

### 节点10: 上传索引

**节点类型**: AWS S3
**配置**:
```yaml
Name: 上传索引
Operation: Upload
Bucket Name: cherrystudio
Key: {{ $('选择收录级别').item.json.indexFile }}
Data: {{ $text }}
```

---

### 节点11: LLM搜索原文

**节点类型**: OpenAI Model
**配置**:
```yaml
Name: LLM搜索原文
Model: gpt-4
Prompt: |
  任务：搜索散文完整版原文并验证

  作品信息：
  - 作品名：{{ $('更新片段内容').item.json.snippetData.title }}
  - 作者：{{ $('更新片段内容').item.json.snippetData.author }}

  执行三步验证法：
  1. 搜索完整版关键词（作品名+作者+完整版/全文）
  2. 搜索"课文与原文区别"（检查是否存在删改）
  3. 版本验证（对比字数、结构、特征）

  请返回JSON格式：
  {
    "title": "作品名",
    "author": "作者",
    "isComplete": true/false,
    "wordCount": 完整版字数,
    "verificationSteps": ["搜索结果1", "课文对比结果", "版本验证结论"],
    "fullTextContent": "完整原文",
    "sourceUrl": "来源链接",
    "risks": ["发现的潜在问题"]
  }

  铁律：如果发现是删减版，isComplete必须设为false，并说明风险。
```

---

### 节点12: 版本检查

**节点类型**: IF
**配置**:
```yaml
Name: 版本检查
Condition: {{ $json.isComplete === true }}
True Output: 继续到节点14
False Output: 转到节点13
```

---

### 节点13: 记录验证失败

**节点类型**: AWS S3
**配置**:
```yaml
Name: 记录验证失败
Operation: Upload
Bucket Name: cherrystudio
Key: logs/{{ $now.format('YYYY-MM-DD') }}-verification-failed.md
Data: |
  # 原文验证失败报告

  **日期**：{{ $now.format('YYYY-MM-DD HH:mm:ss') }}
  **作品**：{{ $('更新片段内容').item.json.snippetData.title }}
  **作者**：{{ $('更新片段内容').item.json.snippetData.author }}
  **失败原因**：未找到完整版原文或发现删减痕迹

  **验证步骤**：
  {{ $json.verificationSteps.join('\n') }}

  **风险说明**：
  {{ $json.risks.join('\n') }}

  铁律：宁可不收录，也不收录删减版。工作流终止。
```

**操作**: Stop Workflow

---

### 节点14: 读取模版

**节点类型**: AWS S3
**配置**:
```yaml
Name: 读取模版
Operation: Download
Bucket Name: cherrystudio
Key: {{ $('选择收录级别').item.json.templateFile }}
```

**说明**: 模版文件已在各级别文件夹下

---

### 节点15: LLM格式化文章

**节点类型**: OpenAI Model
**配置**:
```yaml
Name: LLM格式化文章
Model: gpt-4
Prompt: |
  任务：按照模版格式化完整文章

  模版内容：
  {{ $binary.data }}

  原文内容：
  {{ $('LLM搜索原文').item.json.fullTextContent }}

  作品信息：
  - 序号：{{ $('更新片段内容').item.json.sequence }}
  - 作品名：{{ $('更新片段内容').item.json.snippetData.title }}
  - 作者：{{ $('更新片段内容').item.json.snippetData.author }}
  - 版本来源：{{ $('LLM搜索原文').item.json.sourceUrl }}

  格式化要求：
  1. YAML元数据：title, source, created(今天), tags
  2. H1标题：Emoji + 完整版标注 + 作品名
  3. H3作者署名
  4. 📖原文正文：开头2-3个主题Emoji，H3+Emoji分段，每2-3句话穿插1个相关Emoji
  5. 🌟美文赏析（3个子板块）
  6. 🎭朗读指导（2个子板块）
  7. 🌈小练笔（步骤式）
  8. 📚知识小卡片

  ⚠️ 关键规则：
  - {{...}}占位符必须替换为实际内容
  - **开头的操作指南不得出现在正文中
  - Emoji必须与内容高度贴合

  请返回完整的Markdown格式文章内容。
```

---

### 节点16: 生成文件名

**节点类型**: Code
**配置**:
```javascript
const snippetData = $('更新片段内容').item.json.snippetData;
const sequence = $('更新片段内容').item.json.sequence;
const levelKey = $('选择收录级别').item.json.key;

const filename = `${sequence}.${snippetData.title}-${snippetData.author}.md`;
const s3Key = `${levelKey}/${filename}`;  // 直接放在级别目录根目录

return { json: { filename, s3Key } };
```

**说明**: 完整文章路径为 `级别目录/序号.作品名-作者.md`，无articles子目录

---

### 节点17: 上传文章

**节点类型**: AWS S3
**配置**:
```yaml
Name: 上传文章
Operation: Upload
Bucket Name: cherrystudio
Key: {{ $json.s3Key }}
Data: {{ $text }}
```

---

### 节点18-21: 去重检查节点

(参考主文档中的配置)

---

### 节点22-27: 建立链接节点

(参考主文档中的配置)

---

### 节点28-30: 质量检查节点

(参考主文档中的配置)

---

### 节点31-36: 总索引更新和日志节点

(参考主文档中的配置)

---

## 🔗 节点连接顺序

```
00 → 01 → 02 → 03 → 04 → 05 → 06 → 07 → 08 → 09 → 10
                                          → 11 → 12 (IF)
                                              ├→ True → 14 → 15 → 16 → 17
                                              └→ False → 13 (STOP)
                                                          → 18 → 19 → 20 (SWITCH)
                                                              ├→ proceed → 22 → 23 → 24 → 25 → 26 → 27
                                                              └→ stop → 21 (STOP)
                                                                           → 28 → 29 (IF)
                                                                               ├→ True → 30 → 31
                                                                               └→ False → 31
                                                                                        → 32 → 33 → 34 → 35 → 36
```

---

## 💡 重要提示

### 1. 文件路径规范

所有完整文章直接放在级别目录根目录：
- ✅ 正确: `成人美文/24.桃花心木-林清玄.md`
- ❌ 错误: `成人美文/articles/24.桃花心木-林清玄.md`

### 2. 凭证配置

所有AWS S3节点都需要配置：
- **Bucket Name**: `cherrystudio`
- **Custom Endpoint**: `https://<ACCOUNT_ID>.r2.cloudflarestorage.com`
- **Credentials**: 您的R2 API Token

### 3. 表达式语法

n8n使用特殊的表达式语法：
- `{{ $json.property }}` - 访问当前节点的JSON数据
- `{{ $binary.data }}` - 访问二进制数据
- `$('节点名').item.json.property` - 访问其他节点的数据
- `{{ $now.format('YYYY-MM-DD') }}` - 日期格式化

### 4. 节点命名

节点名称在表达式中会被引用，请确保：
- 使用中文命名（如示例）
- 或者使用英文命名后修改表达式中的引用

### 5. 测试建议

建议按顺序测试每个Step：
1. 先测试Step 0（节点00-03）
2. 确认无误后测试Step 1（节点04-07）
3. 依此类推

---

## 📞 遇到问题？

1. **查看完整文档**: `n8n美文收集自动化工作流方案.md`
2. **检查凭证**: 确认R2凭证配置正确
3. **查看日志**: 在R2的logs目录查看执行日志
4. **手动测试**: 先手动执行工作流，观察每步结果

---

**最后更新**: 2025-12-28
**版本**: 2.1.0（基于已验证配置）
**实施状态**: 节点00-06已验证成功
**详细记录**: `实施记录-20251228-001.md`
