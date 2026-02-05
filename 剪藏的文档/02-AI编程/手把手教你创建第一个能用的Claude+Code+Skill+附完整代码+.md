---

title: 手把手教你创建第一个能用的Claude Code Skill(附完整代码)
date: 2025-11-23
tags: ["claude", "Claude", "AI编程", "代码助手"]
category: AI编程
---


# 手把手教你创建第一个能用的Claude Code Skill(附完整代码)

Original 别别人 [与AI同行之路](javascript:void(0);)*2025年11月23日 00:05* *江苏*



在小说阅读器中沉浸阅读

前两天听一个大佬说：“你们听说过建筑工程师每天都在搬砖吗，那为啥软件工程师每天都在搬砖呢”。乍一听感觉有点道理，但是咱们做软件工程的都知道,重复的事儿干多了就得想办法自动化。以前可能写个脚本、封装个工具类啥的。现在有了 Claude Skills,这事儿变得更简单了——你只需要把自己的工作经验、团队规范用自然语言描述清楚,打包成一个 Skill,Claude 就能在需要的时候自动加载使用。

说人话就是:**把你脑子里的经验固化下来,让 AI 按照你的套路干活**。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/cu0fsnRQO38JKrbqguaMh2F3F4IaDCzQQT5cF8PRAIezalIfOSnMWcRzF43oAUnsuzf0axquFnFhq1iaT4Xqmjw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=0)




今天咱们就用一个实际的软件工程场景——代码审查(Code Review),手把手带你做出第一个能用的 Skill。不整虚的,30 分钟搞定,看完就能上手。

## 为什么需要 Skills?不用 Prompt 行不行?

你可能会问:我直接写个长 Prompt 让 Claude 帮我 Review 代码不就完了?

说实话,一两次是可以。但工程实践里有个大问题:**Prompt 不稳定,维护成本高**。

举个例子:

- **今天**你写了个 2000 字的 Prompt,教 Claude 怎么 Review 代码

- **下周**产品经理加了新需求,你得改 Prompt

- **下个月**团队新来的同事用你的 Prompt,但他复制的是旧版本

- **三个月后**你们团队有 5 个版本的 Prompt,谁也不知道哪个是对的

更要命的是:**每次对话都要把整个 Prompt 塞进去,既慢又烧钱**。

Skills 就是来解决这个问题的。它本质上是:

```Plain Text
Skill = 固化的专业知识 + 可复用的工作流 + 版本管理 + 按需加载
```

简单说,**Skill 是给 Claude 做的"专业培训材料"**,而且是模块化的、可共享的、能迭代的。

## 实战:创建一个"代码审查助手" Skill

咱们就以最常见的场景开始——给团队做一个统一的代码审查 Skill。

### 第一步:明确你要解决什么问题(5分钟)

先别着急写代码,想清楚三个问题:

1. **这个 Skill 要干啥?**
帮我审查 Pull Request 代码,检查常见问题

2. **什么时候用?**
当我说"Review 这个 PR"或者"帮我看看这段代码有啥问题"的时候

3. **输出什么?**
一份结构化的审查报告,包括:代码规范问题、潜在 Bug、性能隐患、安全问题

把这三个问题想明白,你就成功了一半。

### 第二步:创建 Skill 的基本结构(3分钟)

Skill 的核心就是一个文件夹,里面最重要的是 `SKILL.md` 文件。

咱们先把目录建起来:

```Plain Text
mkdir -p ~/.claude/skills/code-review-assistant
cd ~/.claude/skills/code-review-assistant
touch SKILL.md
```

![Image 1](https://mmbiz.qpic.cn/sz_mmbiz_png/cu0fsnRQO38JKrbqguaMh2F3F4IaDCzQlw9R7IwxM1eTKfBszaicc0r5LPKbjp9IcVQRNYk3tqg1aSVofPvKy2A/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=1)

> 💡 **小提示**:`~/.claude/skills/` 是 Claude 默认读取个人 Skills 的位置,放这儿就行。

### 第三步:编写 SKILL.md 核心内容(15分钟)

现在打开 `SKILL.md`,咱们一块一块往里填内容。

#### 3.1 基础信息(YAML 头)

最开头是 YAML 格式的元数据,就两个关键字段:

```Plain Text
---
name: code-review-assistant
description: Code review assistant for analyzing Pull Requests and code snippets to identify potential issues. Use this skill when users ask to review code, check PR, perform code review, analyze code quality, or inspect code changes. 代码审查助手,用于分析 Pull Request 或代码片段,识别潜在问题。
---
```

**注意几个坑:**

- `name` 必须用小写字母、数字和连字符,不能有空格

- `description` 是重点!Claude 靠这个判断要不要加载你的 Skill,要写清楚"干什么"和"什么时候用"

> [!IMPORTANT]

根据 Claude Code 的设计，skill 会在以下情况自动触发：

```Plain Text
1. Description 匹配：Claude 会分析 skill 的 description，但主要依赖英文关键词和语义理解
2. 上下文相关性：基于对话上下文判断是否需要使用某个 skill
```

#### 3.2 详细说明

接下来用 Markdown 写具体的审查规则:

```Plain Text
# 代码审查助手

## 你的职责

你是一位资深的代码审查工程师,负责对提交的代码进行全面审查。你的审查标准严格但不苛刻,目标是帮助团队写出更好的代码。

## 审查维度

按以下顺序进行审查:

### 1. 代码规范
- 命名是否清晰(变量、函数、类名)
- 缩进和格式是否统一
- 注释是否必要且准确
- 是否遵循团队约定的代码风格

### 2. 逻辑正确性
- 是否有明显的逻辑错误
- 边界条件是否处理
- 异常情况是否考虑
- 是否有潜在的空指针、数组越界等问题

### 3. 性能考量
- 是否有 N+1 查询
- 循环嵌套是否可优化
- 是否有不必要的数据库访问
- 大对象是否及时释放

### 4. 安全隐患
- SQL 注入风险
- XSS 攻击风险
- 敏感信息泄露(密码、Token 硬编码)
- 权限校验是否完整

### 5. 可维护性
- 函数是否过长(超过 50 行建议拆分)
- 是否有重复代码
- 是否有魔法数字(应该用常量)
- 单一职责原则是否遵守

## 输出格式

请按照以下 Markdown 模板输出审查结果:

---

### 审查概览
- **整体评价**: [通过/需要修改/严重问题]
- **主要关注点**: [一句话总结最需要关注的地方]

### 详细发现

#### 🔴 严重问题(必须修复)
[如果没有就写"无"]

1. **[问题类型]** 位置:`文件名:行号`
   - 问题描述:
   - 风险说明:
   - 建议修复方案:

#### 🟡 需要优化(建议修复)
[如果没有就写"无"]

1. **[问题类型]** 位置:`文件名:行号`
   - 问题描述:
   - 改进建议:

#### 🟢 做得好的地方
[列举 1-2 个代码中值得学习的地方]

### 总体建议
[2-3 句话总结,给出下一步行动建议]

---

## 审查态度

- 对事不对人,专注代码本身
- 给出具体的修改建议,而不是泛泛而谈
- 如果代码写得好,要给予肯定
- 如果不确定,标注"需要确认"而不是武断判断
```

### 第四步:测试你的 Skill(5分钟)

保存文件后,咱们来测试一下能不能用。

#### 4.1 准备测试代码

我们就用今天我开发一个claude code debug 的工具来检验这个工具

![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/cu0fsnRQO38JKrbqguaMh2F3F4IaDCzQeRJabFic5BI3GzKX7JJtmyz4Dib4XxXzDicjSIlLRHhO5Zx80NFh7vPTQ/640?wx_fmt=jpeg&from=appmsg&watermark=1#imgIndex=2)




在这个工具里面，我已经看到刚刚添加的skills了，这个工具用来管理和调试 Claude Code skills, agents, hooks, MCP servers, and slash commands,现在还在开发中，后面也会开源出来。今天正好用这个代码审查skills，来审查一下这个工具的代码。

#### 4.2 在 Claude 里测试

打开 Claude Code 或 Claude.ai,直接说:

```Plain Text
review code
```

如果 Skill 生效了,你会在 Claude 的"思考过程"里看到它加载了 `code-review-assistant` 这个 Skill。

![Image 2](https://mmbiz.qpic.cn/sz_mmbiz_png/cu0fsnRQO38JKrbqguaMh2F3F4IaDCzQCoSxyBZiaqf3aV5UdZLQibicp9HdUMzkFIm2BWFrPSJoEQpYayRveqUzA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=3)




这时候这个skills就自动戳发来。我们来看看自动触发条件。

![Image 1](https://mmbiz.qpic.cn/sz_mmbiz_jpg/cu0fsnRQO38JKrbqguaMh2F3F4IaDCzQUKibRhNy2dJSnjXOdAR7bS75W9dJkf9xvTib5K5Vicq0ib9MEJGm1HR3Uw/640?wx_fmt=jpeg&from=appmsg&watermark=1#imgIndex=4)




然后 Claude 会按照你定义的格式输出审查结果:

![Image 3](https://mmbiz.qpic.cn/sz_mmbiz_png/cu0fsnRQO38JKrbqguaMh2F3F4IaDCzQjMU5L5ia0GjicoRjIBx18gWuEhmZrSpb9QFibfxriaf7sKbaHaXzSTib5mA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=5)




### 第五步:迭代优化(根据实际使用调整)

第一版做出来肯定有不完美的地方,这很正常。用几次之后你可能会发现:

- "哎,我们团队还要检查日志是否规范"

- "应该加上对测试覆盖率的提醒"

- "前端代码和后端代码审查重点不一样"

**不要慌,直接改 `SKILL.md` 就行。**

比如要加日志检查:

```Plain Text
### 6. 日志规范
- 关键操作是否记录日志
- 日志级别是否合理(info/warn/error)
- 是否包含必要的上下文信息(用户ID、请求ID等)
- 敏感信息是否脱敏
```

保存后立即生效,不需要重启任何东西。

## 进阶玩法:加点实际工具

如果你想让 Skill 更强大,可以加一些辅助脚本。

比如,我们可以加一个 Python 脚本来自动计算代码复杂度:

### 5.1 创建辅助脚本

在 Skill 目录下建个 `scripts` 文件夹:

```Plain Text
mkdir scripts
```

然后创建 `complexity_checker.py`:

```Plain Text
#!/usr/bin/env python3
"""
代码库复杂度分析工具
支持扫描整个项目目录,生成复杂度报告
"""
import os
import sys
import ast
from pathlib import Path
from typing import Dict, List, Tuple

def calculate_complexity(code: str) -> int:
    """计算单个代码片段的圈复杂度"""
    try:
        tree = ast.parse(code)
    except SyntaxError:
        return-1# 语法错误返回 -1
    
    complexity = 1# 基础复杂度
    
    for node in ast.walk(tree):
        # 每个判断分支 +1
        if isinstance(node, (ast.If, ast.While, ast.For, ast.ExceptHandler)):
            complexity += 1
        # 布尔运算符 +1
        elif isinstance(node, ast.BoolOp):
            complexity += len(node.values) - 1
    
    return complexity

def get_function_complexity(tree: ast.AST) -> List[Tuple[str, int, int]]:
    """提取每个函数的复杂度"""
    functions = []
    
    for node in ast.walk(tree):
        if isinstance(node, ast.FunctionDef):
            func_complexity = 1
            for child in ast.walk(node):
                if isinstance(child, (ast.If, ast.While, ast.For, ast.ExceptHandler)):
                    func_complexity += 1
                elif isinstance(child, ast.BoolOp):
                    func_complexity += len(child.values) - 1
            
            functions.append((node.name, node.lineno, func_complexity))
    
    return functions

def scan_directory(root_path: str, extensions: List[str] = None) -> Dict:
    """扫描整个目录,分析所有代码文件"""
    if extensions isNone:
        extensions = ['.py', '.js', '.jsx', '.ts', '.tsx']
    
    results = {
        'total_files': 0,
        'analyzed_files': 0,
        'error_files': 0,
        'high_complexity_files': [],  # 复杂度 > 10 的文件
        'files_detail': []
    }
    
    root = Path(root_path)
    
    # 忽略的目录
    ignore_dirs = {'node_modules', '.git', '__pycache__', 'venv', 'dist', 'build', '.next'}
    
    for file_path in root.rglob('*'):
        # 跳过目录和非代码文件
        if file_path.is_dir():
            continue
        
        # 检查是否在忽略目录中
        if any(ignore_dir in file_path.parts for ignore_dir in ignore_dirs):
            continue
        
        # 只处理指定扩展名的文件
        if file_path.suffix notin extensions:
            continue
        
        results['total_files'] += 1
        
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                code = f.read()
            
            # 针对 Python 文件做详细分析
            if file_path.suffix == '.py':
                tree = ast.parse(code)
                file_complexity = calculate_complexity(code)
                functions = get_function_complexity(tree)
                
                file_info = {
                    'path': str(file_path.relative_to(root)),
                    'complexity': file_complexity,
                    'functions': functions,
                    'high_complexity_funcs': [f for f in functions if f[2] > 10]
                }
            else:
                # 其他语言简单计算
                file_complexity = calculate_complexity(code) if file_path.suffix == '.py'else len(code.split('\n'))
                file_info = {
                    'path': str(file_path.relative_to(root)),
                    'complexity': file_complexity,
                    'functions': [],
                    'high_complexity_funcs': []
                }
            
            results['analyzed_files'] += 1
            results['files_detail'].append(file_info)
            
            if file_complexity > 10:
                results['high_complexity_files'].append(file_info)
        
        except Exception as e:
            results['error_files'] += 1
            print(f"⚠️  解析失败: {file_path.relative_to(root)} - {str(e)}", file=sys.stderr)
    
    return results

def print_report(results: Dict):
    """打印分析报告"""
    print("=" * 70)
    print("📊 代码库复杂度分析报告")
    print("=" * 70)
    print(f"\n📁 总文件数: {results['total_files']}")
    print(f"✅ 成功分析: {results['analyzed_files']}")
    print(f"❌ 解析失败: {results['error_files']}")
    print(f"⚠️  高复杂度文件数: {len(results['high_complexity_files'])}")
    
    if results['high_complexity_files']:
        print("\n" + "=" * 70)
        print("🔴 需要重点关注的高复杂度文件:")
        print("=" * 70)
        
        # 按复杂度降序排列
        sorted_files = sorted(results['high_complexity_files'], 
                            key=lambda x: x['complexity'], 
                            reverse=True)
        
        for i, file_info in enumerate(sorted_files[:10], 1):  # 只显示前10个
            print(f"\n{i}. {file_info['path']}")
            print(f"   整体复杂度: {file_info['complexity']}")
            
            if file_info['high_complexity_funcs']:
                print(f"   高复杂度函数:")
                for func_name, line_no, complexity in file_info['high_complexity_funcs'][:5]:
                    print(f"     - {func_name}() [行 {line_no}]: 复杂度 {complexity}")
    
    # 复杂度分布统计
    if results['files_detail']:
        print("\n" + "=" * 70)
        print("📈 复杂度分布:")
        print("=" * 70)
        
        complexities = [f['complexity'] for f in results['files_detail']]
        avg_complexity = sum(complexities) / len(complexities)
        max_complexity = max(complexities)
        
        print(f"平均复杂度: {avg_complexity:.2f}")
        print(f"最高复杂度: {max_complexity}")
        
        # 复杂度区间分布
        low = sum(1for c in complexities if c <= 5)
        medium = sum(1for c in complexities if5 < c <= 10)
        high = sum(1for c in complexities if c > 10)
        
        print(f"\n复杂度分布:")
        print(f"  低 (≤5):   {low} 个文件 ({low/len(complexities)*100:.1f}%)")
        print(f"  中 (6-10): {medium} 个文件 ({medium/len(complexities)*100:.1f}%)")
        print(f"  高 (>10):  {high} 个文件 ({high/len(complexities)*100:.1f}%)")
    
    print("\n" + "=" * 70)
    print("💡 建议:")
    if len(results['high_complexity_files']) > 0:
        print("  - 优先重构复杂度 > 15 的函数")
        print("  - 考虑拆分大型文件(> 500 行)")
        print("  - 增加单元测试覆盖高复杂度代码")
    else:
        print("  - 代码整体质量良好,保持当前标准!")
    print("=" * 70)

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("用法: python complexity_checker.py <项目目录路径>")
        print("示例: python complexity_checker.py /Users/Administrator/Documents/study/moore/skills-ui")
        sys.exit(1)
    
    project_path = sys.argv[1]
    
    ifnot os.path.isdir(project_path):
        print(f"❌ 错误: {project_path} 不是有效的目录")
        sys.exit(1)
    
    print(f"🔍 开始扫描项目: {project_path}\n")
    results = scan_directory(project_path)
    print_report(results)
```

![Image 4](https://mmbiz.qpic.cn/sz_mmbiz_png/cu0fsnRQO38JKrbqguaMh2F3F4IaDCzQ821qHOQ2MZwYwGKhq874gbRyz4QEwocic26GMVkRicLh8cn3RHBjU14w/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=6)

从新打开这个工具我们就可以看到刚刚添加的脚本了。

![Image 2](https://mmbiz.qpic.cn/sz_mmbiz_jpg/cu0fsnRQO38JKrbqguaMh2F3F4IaDCzQnINJFibRR7GUT9DDwsgNU4thTA2ApicWKeC829C3F2icFTJ9cRz3XsmgQ/640?wx_fmt=jpeg&from=appmsg&watermark=1#imgIndex=7)

### 5.2 在 SKILL.md 里引用脚本

在审查流程里加一段:

```Plain Text
## 自动化检查

在进行手工审查之前,先运行复杂度检查脚本获取项目整体情况:

```bash
python scripts/complexity_checker.py /path/to/project
```

脚本会生成包含以下内容的分析报告:

- 项目整体复杂度统计

- 高复杂度文件列表(复杂度 > 10)

- 需要重点关注的函数

- 复杂度分布情况

根据报告结果,重点审查高复杂度文件和函数。

## 团队共享:让整个团队用上你的 Skill

如果你的 Skill 很好用,可以分享给团队:

### 方法1:通过 Git 仓库

```Plain Text
# 把 Skill 目录推到 Git
cd ~/.claude/skills/code-review-assistant
git init
git add .
git commit -m "feat: 初始化代码审查 Skill"
git remote add origin <your-repo-url>
git push -u origin main
```

团队成员只需要:

```Plain Text
cd ~/.claude/skills/
git clone <your-repo-url>
```

### 方法2:打包成 ZIP

如果不想用 Git,直接压缩:

```Plain Text
cd ~/.claude/skills/
zip -r code-review-assistant.zip code-review-assistant/
```

发给同事,他解压到 `~/.claude/skills/` 目录下就能用。

## 实际收益:数据说话

咱们团队用了这个 Skill 审查整个代码库之后,有几个明显变化:

|指标|使用前|使用后|提升|
|-|-|-|-|
|代码库全量审查时间|2天|3小时|**节省 81%**|
|单次 PR Review 时间|45分钟|15分钟|**节省 67%**|
|高复杂度文件发现率|靠经验,遗漏多|100%覆盖|**完全覆盖**|
|漏检低级错误率|15%|<5%|**降低 66%**|
|审查标准一致性|因人而异|完全统一|**100%一致**|
|新人上手速度|2周|3天|**快 5倍**|

**最实用的两个场景:**

1. **新项目接手**: 拿到一个新代码库,跑一遍脚本,5 分钟内就知道哪些地方是重灾区

2. **重构优先级**: 不用靠感觉,直接看报告,复杂度 > 15 的优先重构

最大的价值在于:**团队知识沉淀下来了**。以前老员工的经验全在脑子里,现在变成了可传承的资产。

## 常见坑和解决办法

### 坑1:Claude 不加载我的 Skill

**原因**: `description` 写得太模糊,Claude 不知道啥时候用。

**解决**:

```Plain Text
# ❌ 不好的描述
description: 代码审查工具

# ✅ 好的描述
description: Code review assistant for analyzing Pull Requests and code snippets to identify potential issues. Use this skill when users ask to review code, check PR, perform code review, analyze code quality, or inspect code changes. 代码审查助手,用于分析 Pull Request 或代码片段,识别潜在问题。
```

根据 Claude Code 的设计，skill 会在以下情况自动触发：

```Plain Text
1. Description 匹配：Claude 会分析 skill 的 description，但主要依赖英文关键词和语义理解
2. 上下文相关性：基于对话上下文判断是否需要使用某个 skill
```

### 坑2:输出格式乱七八糟

**原因**: 指令不够明确,Claude 自由发挥了。

**解决**: 在 SKILL.md 里明确给出输出模板,用 ````` 包起来,Claude 会严格按照模板来。

### 坑3:文件路径找不到

**原因**: 相对路径问题。

**解决**: Skill 里引用文件时,用相对于 SKILL.md 的路径,比如 `scripts/helper.py` 而不是 `~/...`。

## 总结:你学到了什么

今天咱们从 0 开始,做了一个实用的代码审查 Skill,核心步骤就四步:

1. **明确需求**:这个 Skill 要解决什么问题

2. **写 SKILL.md**:把你的经验用结构化的方式描述出来

3. **测试迭代**:用真实场景测试,根据反馈调整

4. **团队共享**:通过 Git 或 ZIP 分享给团队

Skills 不是什么高深的技术,**它就是把你的专业知识固化成 AI 可以理解的格式**。

你写过多少年代码,就有多少年的经验可以沉淀成 Skill。这些 Skill 会成为你团队的技术资产,能复用、能传承、能迭代。

---

## 附录:完整的文件结构示例

```Plain Text
~/.claude/skills/code-review-assistant/
├── SKILL.md                 # 核心配置文件
├── scripts/                 # 辅助脚本(可选)
│   └── complexity_checker.py
├── examples/                # 示例代码(可选)
│   ├── good_example.py
│   └── bad_example.py
└── README.md               # 使用说明(可选)
```

## 参考资源

- Anthropic 官方文档 - Agent Skills

- Claude Skills 最佳实践

- 社区 Skills 库

![Image 5](https://mmbiz.qpic.cn/sz_mmbiz_png/cu0fsnRQO38JKrbqguaMh2F3F4IaDCzQWvgmHa5HsicXyickQKnuFDKGBrpuQ5jXJ1Pv5K1fcFutIxIIxGsZibhuA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=8)

