---
title: Day 8：文件操作基础
tags: [python, 文件操作, IO, 读写]
aliases: ["Day8"]
date: 2026-02-22
---

# Day 8：文件操作基础

> 相关链接：[[Day7_Week1周度复盘与测验]] | [[Day9_异常处理机制]] | [[Python学习大纲]]

欢迎来到Python学习的第八天！今天我们将学习Python文件操作的核心知识，掌握如何读写文本文件和二进制文件，为后续的数据处理和分析打下坚实基础。文件操作是连接程序与外部数据的关键桥梁，也是AI数据预处理的重要环节。

## 第一部分：最新视频教程推荐

为了让你直观地学习文件操作的核心概念，我为你筛选了2025-2026年发布的最新Python文件操作视频教程。这些教程都采用最新的Python版本，讲解风格通俗易懂，特别适合零基础学员。

### 1. 黑马程序员 - Python文件操作完整指南（2026版第85-90集）
- **链接**：https://www.bilibili.com/video/BV1bM4y1U7zR（文件操作章节）
- **重点内容**：第85-90集系统讲解文件编码、open()函数参数详解、读写模式对比、with语句优势、常见错误处理
- **适合人群**：喜欢动手实操、希望掌握完整文件操作流程的学员
- **核心特点**：
  - 采用Python 3.13+最新语法特性，贴近实际工作场景
  - 每集15-20分钟，适合每天1小时学习节奏
  - 配套练习丰富，包括日志记录器、数据统计等实用案例
  - 突出强调编码问题和路径处理等新手易错点

### 2. 莫烦Python - 交互式文件管理教程（2025最新版）
- **链接**：https://mofanpy.com/tutorials/python-basic/interactive-python/read-write-file
- **学习方式**：交互式学习网站，边学边练，即时查看代码效果
- **适合人群**：喜欢互动式学习、希望即时看到代码运行结果的学员
- **核心特点**：
  - 每个知识点都有可运行的代码示例，可直接在浏览器中编辑
  - 涵盖文件读取、写入、追加、二进制操作等完整内容
  - 界面简洁直观，学习路径清晰，支持在线调试
  - 结合实际项目案例，如文件批量处理、数据转换等

### 3. 国家高等教育智慧教育平台 - Python文件与异常处理
- **链接**：https://higher.smartedu.cn/course/62354cfa9906eace048e5ea1（文件操作模块）
- **重点内容**：系统讲解文件操作原理、异常处理机制、大文件处理技巧
- **适合人群**：希望建立完整知识体系、从底层理解文件操作的学员
- **核心特点**：
  - 国家级精品课程，累计超过600万学习者
  - 提供16个实战案例和大量练习题，覆盖文本和二进制文件
  - 课程设计循序渐进，从基础到高级完整覆盖
  - 配套学习社区支持，解答学习过程中的疑问

### 学习建议
- **今日首选**：建议先观看黑马程序人的第85-86集（约30分钟），理解文件操作的基本流程和核心概念
- **互动练习**：学习过程中可使用莫烦Python的交互式网站进行实操，即时验证代码效果
- **系统巩固**：完成今日练习题后，可参考国家高等教育平台的相关案例进行扩展学习

## 第二部分：核心概念详解

### 1. 文件操作三步曲：打开→操作→关闭

文件操作遵循一个固定的流程，就像你去图书馆借书一样：

```python
# 第一步：打开文件（建立程序与文件的连接）
file = open("data.txt", "r", encoding="utf-8")  # 打开名为data.txt的文件，只读模式，UTF-8编码

# 第二步：操作文件（读取或写入内容）
content = file.read()  # 读取文件的全部内容
print(content)         # 打印读取到的内容

# 第三步：关闭文件（断开连接，释放系统资源）
file.close()           # 关闭文件，让其他程序可以访问这个文件
```

### 2. 文件打开模式详解

`open()`函数的第二个参数决定了对文件的操作权限，常用模式如下：

| 模式 | 含义 | 文件不存在时 | 指针位置 | 特点与适用场景 |
|------|------|--------------|----------|----------------|
| **r** | 只读 | 报错(FileNotFoundError) | 文件开头 | 默认模式，仅用于读取已有文件 |
| **w** | 写入 | 创建新文件 | 文件开头 | **清空原内容**，从头开始写入 |
| **a** | 追加 | 创建新文件 | 文件末尾 | 保留原内容，在末尾添加新内容 |
| **rb** | 二进制只读 | 报错 | 文件开头 | 读取图片、音频等非文本文件 |
| **wb** | 二进制写入 | 创建新文件 | 文件开头 | 写入二进制数据，会清空原内容 |
| **ab** | 二进制追加 | 创建新文件 | 文件末尾 | 在二进制文件末尾添加数据 |

### 3. 更安全的方式：with语句自动管理

使用`with`语句可以自动关闭文件，即使代码发生异常也能确保文件被正确关闭，这是Python文件操作的最佳实践：

```python
# with语句：自动管理文件关闭，无需手动调用close()
with open("data.txt", "r", encoding="utf-8") as file:  # 冒号后缩进为操作块
    content = file.read()  # 读取文件内容
    print(content)         # 打印内容
    
# 代码块结束后，文件已自动关闭，无需手动close()
# 此时再操作file会报错：ValueError: I/O operation on closed file.
```

### 4. 文件读取方法对比

根据文件大小和读取需求，Python提供了多种读取方法：

```python
# 方法1：read() - 读取整个文件（适合小文件）
with open("small.txt", "r", encoding="utf-8") as f:
    all_content = f.read()  # 读取全部内容到一个字符串中
    print(f"文件大小：{len(all_content)}字符")

# 方法2：readline() - 逐行读取（适合查看部分内容）
with open("medium.txt", "r", encoding="utf-8") as f:
    first_line = f.readline()  # 只读取第一行
    print(f"第一行内容：{first_line.strip()}")  # strip()去除换行符

# 方法3：readlines() - 读取所有行到列表
with open("medium.txt", "r", encoding="utf-8") as f:
    all_lines = f.readlines()  # 返回列表，每行是一个元素
    print(f"文件共有{len(all_lines)}行")
    for line in all_lines:
        print(f"行内容：{line.strip()}")

# 方法4：直接遍历文件对象（大文件首选，最省内存）
with open("large.log", "r", encoding="utf-8") as f:
    line_count = 0
    for line in f:  # 逐行读取，内存占用恒定
        line_count += 1
        if "ERROR" in line:  # 只处理包含ERROR的行
            print(f"第{line_count}行发现错误：{line.strip()}")
    print(f"文件共有{line_count}行")
```

### 5. 文件写入与追加

写入文件时需要注意模式选择和换行符处理：

```python
# 写入模式（w）：会清空原内容，从头开始写
with open("output.txt", "w", encoding="utf-8") as f:
    f.write("这是第一行内容\n")        # 手动添加换行符\n
    f.write("这是第二行内容\n")
    f.write("今日学习时间：2026-02-15 09:07\n")

# 追加模式（a）：在文件末尾添加新内容，不改变原有内容
with open("log.txt", "a", encoding="utf-8") as f:
    import datetime
    current_time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    f.write(f"[{current_time}] 用户登录系统\n")  # 记录带时间戳的日志

# 批量写入：writelines()方法
lines = ["Python文件操作\n", "核心概念详解\n", "with语句自动管理\n"]
with open("notes.txt", "w", encoding="utf-8") as f:
    f.writelines(lines)  # 一次性写入多行，注意列表元素需包含换行符
```

### 6. 路径处理：跨平台兼容

手动拼接路径在不同操作系统上容易出错，推荐使用`os.path`模块：

```python
import os  # 导入操作系统模块

# 获取当前工作目录
current_dir = os.getcwd()  # 返回当前Python脚本所在的目录
print(f"当前工作目录：{current_dir}")

# 安全拼接路径（自动适配Windows的\和Linux/Mac的/）
file_path = os.path.join(current_dir, "data", "logs", "app.log")
print(f"文件完整路径：{file_path}")

# 检查文件是否存在
if os.path.exists(file_path):
    print("文件存在，可以进行操作")
else:
    print("文件不存在，请检查路径或创建文件")

# 获取文件大小（字节）
if os.path.isfile(file_path):  # 确认是文件而不是目录
    size = os.path.getsize(file_path)
    print(f"文件大小：{size}字节 ({size/1024:.2f}KB)")
```

### 7. 常见错误与处理

文件操作中常见的错误及其解决方法：

```python
import os

file_path = "data.txt"

# 错误1：文件不存在（FileNotFoundError）
try:
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
except FileNotFoundError:
    print(f"错误：找不到文件 {file_path}")
    print("解决方案：检查文件路径是否正确，或先创建文件")

# 错误2：编码错误（UnicodeDecodeError）
try:
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
except UnicodeDecodeError:
    print("错误：文件编码格式不正确")
    print("解决方案：尝试其他编码，如 encoding='gbk' 或 encoding='utf-8-sig'")

# 错误3：权限错误（PermissionError）
try:
    with open("C:/Windows/system32/config.txt", "w") as f:
        f.write("test")
except PermissionError:
    print("错误：没有权限写入该目录")
    print("解决方案：更换到用户有权限的目录，如当前工作目录")

# 错误4：忘记关闭文件导致资源泄露
# 错误做法：手动打开后忘记关闭
file = open("test.txt", "w")
file.write("重要数据")
# 如果程序在这里崩溃或忘记写file.close()，文件可能未正确保存

# 正确做法：始终使用with语句
with open("test.txt", "w") as file:
    file.write("自动保存的数据")
# 离开with块后文件自动关闭，数据已写入磁盘
```

## 第三部分：渐进式练习题

### 练习1：基础文件统计
**任务**：读取一个文本文件，统计文件的总行数、总字符数和总单词数。

```python
# 练习1答案：基础文件统计
def file_statistics(filename):
    """
    统计文本文件的行数、字符数和单词数
    
    参数：
        filename: 要统计的文件路径
    
    返回：
        包含统计结果的字典
    """
    line_count = 0          # 初始化行数计数器
    char_count = 0          # 初始化字符数计数器
    word_count = 0          # 初始化单词数计数器
    
    try:
        with open(filename, "r", encoding="utf-8") as f:  # 安全打开文件
            for line in f:  # 逐行读取文件
                line_count += 1           # 每读一行，行数加1
                char_count += len(line)   # 累加该行的字符数
                words = line.strip().split()  # 去除首尾空格后按空格分割成单词列表
                word_count += len(words)      # 累加该行的单词数
                
        print(f"文件 {filename} 的统计结果：")
        print(f"  总行数：{line_count}")
        print(f"  总字符数：{char_count}")
        print(f"  总单词数：{word_count}")
        
        return {
            "lines": line_count,
            "chars": char_count,
            "words": word_count
        }
        
    except FileNotFoundError:
        print(f"错误：找不到文件 {filename}")
        return None
    except Exception as e:
        print(f"读取文件时发生错误：{e}")
        return None

# 使用示例：假设当前目录下有 sample.txt 文件
# file_statistics("sample.txt")
```

### 练习2：简易日志记录器
**任务**：创建一个日志记录函数，每次调用时在日志文件末尾追加带时间戳的日志信息。

```python
# 练习2答案：简易日志记录器
import datetime  # 导入日期时间模块

def log_message(filename, message, log_level="INFO"):
    """
    在日志文件中追加带时间戳的日志信息
    
    参数：
        filename: 日志文件路径
        message: 要记录的日志信息
        log_level: 日志级别，默认为"INFO"
    
    返回：
        布尔值，表示日志记录是否成功
    """
    try:
        current_time = datetime.datetime.now()  # 获取当前时间
        time_str = current_time.strftime("%Y-%m-%d %H:%M:%S")  # 格式化为字符串
        
        # 以追加模式打开日志文件
        with open(filename, "a", encoding="utf-8") as f:
            log_entry = f"[{time_str}] [{log_level}] {message}\n"  # 构建日志条目
            f.write(log_entry)  # 写入日志文件
            
        print(f"日志记录成功：{log_entry.strip()}")
        return True
        
    except Exception as e:
        print(f"记录日志时发生错误：{e}")
        return False

# 使用示例：
# log_message("app.log", "用户登录系统", "INFO")
# log_message("app.log", "文件读取失败", "ERROR")
```

### 练习3：CSV数据提取器
**任务**：读取一个CSV文件（逗号分隔），提取指定列的数据并保存到新文件中。

```python
# 练习3答案：CSV数据提取器
def extract_csv_column(input_file, output_file, column_index):
    """
    从CSV文件中提取指定列的数据并保存到新文件
    
    参数：
        input_file: 输入CSV文件路径
        output_file: 输出文件路径
        column_index: 要提取的列索引（从0开始）
    
    返回：
        提取的数据列表，如果失败返回None
    """
    extracted_data = []  # 初始化存储提取数据的列表
    
    try:
        # 第一步：读取输入文件并提取指定列
        with open(input_file, "r", encoding="utf-8") as f_in:
            for line_num, line in enumerate(f_in, 1):  # 从1开始计数行号
                line = line.strip()  # 去除首尾空白字符
                if line:  # 跳过空行
                    parts = line.split(",")  # 按逗号分割行内容
                    if column_index < len(parts):  # 确保列索引有效
                        extracted_data.append(parts[column_index])  # 添加提取的数据
                    else:
                        print(f"警告：第{line_num}行列数不足，跳过")
                        
        # 第二步：将提取的数据写入输出文件
        with open(output_file, "w", encoding="utf-8") as f_out:
            for item in extracted_data:
                f_out.write(f"{item}\n")  # 每个数据单独一行
                
        print(f"数据提取完成！")
        print(f"  输入文件：{input_file}")
        print(f"  输出文件：{output_file}")
        print(f"  提取列索引：{column_index}")
        print(f"  提取数据条数：{len(extracted_data)}")
        
        return extracted_data
        
    except FileNotFoundError:
        print(f"错误：找不到输入文件 {input_file}")
        return None
    except Exception as e:
        print(f"提取数据时发生错误：{e}")
        return None

# 使用示例：假设有 data.csv 文件，格式为"姓名,年龄,城市"
# extract_csv_column("data.csv", "names.txt", 0)  # 提取姓名列
# extract_csv_column("data.csv", "ages.txt", 1)   # 提取年龄列
```

### 练习4：二进制文件拷贝器
**任务**：实现一个函数，能够将任意二进制文件（如图片、PDF等）完整拷贝到新位置。

```python
# 练习4答案：二进制文件拷贝器
def copy_binary_file(source_file, destination_file, chunk_size=1024):
    """
    拷贝二进制文件（支持大文件分块拷贝）
    
    参数：
        source_file: 源文件路径
        destination_file: 目标文件路径
        chunk_size: 每次读取的块大小（字节），默认为1024
    
    返回：
        布尔值，表示拷贝是否成功
    """
    try:
        # 第一步：检查源文件是否存在
        if not os.path.exists(source_file):
            print(f"错误：源文件不存在 {source_file}")
            return False
            
        # 第二步：获取源文件大小
        file_size = os.path.getsize(source_file)
        print(f"开始拷贝文件：{source_file}")
        print(f"文件大小：{file_size}字节 ({file_size/1024/1024:.2f}MB)")
        
        # 第三步：分块读取和写入（避免一次性加载大文件到内存）
        with open(source_file, "rb") as src:  # 二进制只读模式打开源文件
            with open(destination_file, "wb") as dst:  # 二进制写入模式打开目标文件
                copied_bytes = 0  # 已拷贝字节数计数器
                
                while True:
                    # 读取一块数据
                    chunk = src.read(chunk_size)  # 读取指定大小的字节数据
                    if not chunk:  # 如果读取不到数据，说明已到达文件末尾
                        break
                        
                    # 写入到目标文件
                    dst.write(chunk)  # 将读取的数据块写入目标文件
                    copied_bytes += len(chunk)  # 更新已拷贝字节数
                    
                    # 显示进度（每拷贝1MB显示一次）
                    if copied_bytes % (1024 * 1024) < chunk_size:
                        progress = (copied_bytes / file_size) * 100
                        print(f"  进度：{progress:.1f}% ({copied_bytes}/{file_size}字节)")
                        
        print(f"文件拷贝成功！")
        print(f"  源文件：{source_file}")
        print(f"  目标文件：{destination_file}")
        print(f"  总字节数：{copied_bytes}")
        
        return True
        
    except Exception as e:
        print(f"拷贝文件时发生错误：{e}")
        return False

# 使用示例：
# copy_binary_file("original.jpg", "copy.jpg")
# copy_binary_file("large.pdf", "backup.pdf", chunk_size=4096)  # 使用4KB块大小
```

### 练习5：思考题：文本文件 vs 二进制文件
**问题**：
1. 文本文件和二进制文件在计算机底层存储上有何本质区别？
2. 在什么情况下应该使用二进制模式打开文件？
3. Python处理文本文件和二进制文件时，API使用上有何不同？

**答案要点**：
1. **存储本质**：
   - 文本文件：存储的是字符编码（如UTF-8、GBK等），内容是经过编码的文本，人类可读
   - 二进制文件：存储的是原始字节数据（0和1），没有编码过程，计算机直接理解

2. **使用场景**：
   - 二进制模式：处理图片(.jpg, .png)、音频(.mp3, .wav)、视频(.mp4)、PDF、可执行程序(.exe)、压缩包(.zip)等非文本文件
   - 文本模式：处理.txt、.csv、.json、.html、.py等文本格式文件

3. **API差异**：
   - 文本模式：需要指定`encoding`参数，读写的是字符串
   - 二进制模式：不能指定`encoding`，读写的是字节(bytes)对象
   - 示例对比：
     ```python
     # 文本文件操作
     with open("text.txt", "r", encoding="utf-8") as f:
         content = f.read()  # 返回字符串
     
     # 二进制文件操作  
     with open("image.jpg", "rb") as f:
         data = f.read()  # 返回字节对象
     ```

## 第四部分：学习卡片

### 1. 核心收获（今日学习要点总结）

1. **文件操作核心流程**：牢记"打开→操作→关闭"三步曲，使用`with`语句确保文件正确关闭
2. **模式选择关键**：
   - `r`：读取已有文件
   - `w`：创建新文件或清空重写（**慎用，会覆盖原内容**）
   - `a`：在文件末尾追加内容（推荐日常使用）
   - `b`：处理二进制文件时添加此标志
3. **读取方法适用场景**：
   - `read()`：小文件一次性读取
   - `readline()`：需要按行处理部分内容
   - `readlines()`：需要所有行数据的列表
   - 直接遍历：大文件处理，最省内存
4. **路径处理最佳实践**：使用`os.path.join()`跨平台兼容，避免手动拼接路径分隔符
5. **错误处理要点**：使用`try-except`捕获常见文件操作异常，提供友好的错误提示

### 2. 疑问收集（记录学习中遇到的困惑）

请在学习过程中记录以下方面的疑问：

1. **编码问题**：在处理不同编码格式文件时，如何自动检测文件编码？
2. **路径处理**：相对路径和绝对路径在不同场景下的选择依据是什么？
3. **大文件处理**：处理超大文件（GB级别）时，除了分块读取还有哪些优化策略？
4. **二进制操作**：如何处理结构化二进制数据（如读取特定格式的图片元数据）？
5. **并发访问**：多个程序同时读写同一个文件时，如何避免数据冲突？

### 3. 感悟引导（连接理论与实际应用）

**思考题**：文件操作在AI学习中有哪些重要应用场景？

**引导思路**：
1. **数据准备**：AI模型训练需要大量的数据，这些数据通常存储在文件中。文件操作技能可以帮助你：
   - 读取和清洗原始数据（如文本、图像、音频文件）
   - 将处理后的数据保存为模型可读的格式（如CSV、JSON、TFRecord）

2. **模型保存与加载**：训练好的AI模型需要保存到文件中，以便后续使用：
   - 保存模型权重和结构
   - 从文件中加载预训练模型进行推理或继续训练

3. **日志记录**：AI训练过程中需要记录训练进度、损失函数变化等信息：
   - 记录训练日志便于分析和调试
   - 保存实验结果和性能指标

4. **配置文件**：AI项目通常有大量参数需要配置：
   - 从配置文件中读取超参数（学习率、批次大小等）
   - 保存实验配置便于复现结果

**今日行动建议**：
1. 按照视频教程完成Python环境中的文件操作练习
2. 尝试创建自己的日志记录器，记录今天的学习过程
3. 思考如何将今天学到的文件操作技能应用到你的第一个Python小项目中

**明日预告**：明天我们将学习Python异常处理机制，掌握如何让程序更加健壮，优雅地处理各种错误情况。