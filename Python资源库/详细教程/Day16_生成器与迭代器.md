---
title: Day 16：Python高级特性Ⅱ——生成器与迭代器
tags: [python, 生成器, 迭代器, 高级特性]
aliases: ["Day16"]
date: 2026-03-01
---

# Day 16：Python高级特性Ⅱ——生成器与迭代器

欢迎来到Python学习的第十六天！今天我们将深入学习Python中处理大数据流的两个核心工具：迭代器和生成器。它们是实现惰性计算、节省内存的关键技术，尤其在AI和大数据处理中应用广泛。

## 第一部分：最新视频教程推荐

为了让你直观地学习迭代器和生成器的核心概念，我为你筛选了2025-2026年发布的最新Python迭代器与生成器视频教程。这些教程都采用最新的Python版本，讲解风格通俗易懂，特别适合零基础学员。

### 1. 黑马程序员 - Python高阶编程：迭代器与生成器深度解析（2026版）
- **链接**：https://www.bilibili.com/video/BV1oszYBQEDJ（全600集第45-48章：迭代器与生成器部分）
- **重点内容**：系统讲解迭代器协议（`__iter__`、`__next__`）、可迭代对象与迭代器的区别、生成器函数与yield关键字、生成器表达式、高级应用场景
- **适合人群**：喜欢系统化学习、希望掌握完整迭代器与生成器体系的学员
- **核心特点**：
  - 采用Python 3.13+最新语法特性，贴近实际项目开发场景
  - 深入讲解迭代器协议原理，手写自定义迭代器类
  - 对比生成器函数与生成器表达式的使用场景
  - 涵盖`send()`、`throw()`、`close()`等高级方法
  - 包含大文件处理、数据管道等实战案例

### 2. B站生成器专题教程 - Python生成器从入门到实战（2026最新版）
- **链接**：https://www.bilibili.com/video/BV1KS4y1D7Qb/?spm_id_from=333.337.search-card.all.click&vd_source=3584c42f6e82296a4bf2bcd0e20f9b79
- **重点内容**：生成器本质解析、yield关键字深度理解、生成器状态保存机制、调试技巧与常见陷阱
- **适合人群**：希望直观理解生成器工作原理、喜欢案例驱动学习的学员
- **核心特点**：
  - 视频解析工具辅助，精准切割核心模块（4个核心模块带时间戳）
  - 抽象概念可视化，配有逻辑导图+代码锚点
  - 在线实操环境，免配置调试yield暂停逻辑
  - 实战踩坑指南，处理生成器耗尽异常等常见问题

### 3. 莫烦Python - 交互式迭代器与生成器教程（2025最新版）
- **链接**：https://mofanpy.com/tutorials/python-basic/interactive-python/iterator-generator
- **学习方式**：交互式学习网站，边学边练，即时查看代码效果
- **适合人群**：喜欢互动式学习、希望即时验证迭代器和生成器工作原理的学员
- **核心特点**：
  - 每个概念都有可运行的代码示例，可直接在浏览器中编辑调试
  - 涵盖迭代器协议、生成器函数、生成器表达式完整内容
  - 通过斐波那契数列、文件读取等案例展示实际应用价值
  - 界面简洁直观，支持在线调试执行流程

### 学习建议
- **今日首选**：建议先观看黑马程序人的第45章（迭代器基础），理解迭代器协议和可迭代对象的区别
- **互动练习**：学习过程中可使用莫烦Python的交互式网站进行实操，即时验证迭代器和生成器的创建与使用
- **巩固拓展**：完成今日练习题后，可参考B站生成器专题教程的案例进行深入练习，掌握大文件处理等高级应用

## 第二部分：核心概念详解

### 1. 可迭代对象、迭代器与迭代器协议

**可迭代对象（Iterable）**：
- 定义：任何可以用`for`循环遍历的对象
- 特点：实现了`__iter__()`方法，或实现了`__getitem__()`方法
- 常见类型：列表、字符串、元组、字典、集合、文件对象等

**迭代器（Iterator）**：
- 定义：实现了迭代器协议的对象，可以记住遍历位置
- 特点：同时实现`__iter__()`和`__next__()`方法
- 核心能力：惰性计算，按需生成数据，节省内存

**迭代器协议（Iterator Protocol）**：
- `__iter__()`：返回迭代器对象本身
- `__next__()`：返回下一个元素，无元素时抛出`StopIteration`异常

**示例代码**：
```python
# 可迭代对象：列表
my_list = [1, 2, 3]
print(hasattr(my_list, '__iter__'))  # True：列表是可迭代对象

# 将可迭代对象转换为迭代器
my_iterator = iter(my_list)
print(type(my_iterator))  # <class 'list_iterator'>

# 使用next()获取元素
print(next(my_iterator))  # 1
print(next(my_iterator))  # 2
print(next(my_iterator))  # 3
# print(next(my_iterator))  # 抛出StopIteration异常
```

### 2. 生成器：简化版的迭代器

**生成器函数**：
- 使用`yield`关键字替代`return`
- 调用时不立即执行，返回生成器对象
- 每次调用`next()`执行到下一个`yield`暂停

**生成器表达式**：
- 类似列表推导式，但使用圆括号`()`
- 惰性计算，不立即生成所有元素

**示例代码**：
```python
# 生成器函数：斐波那契数列
def fibonacci_generator(n):
    """生成前n个斐波那契数"""
    a, b = 0, 1
    count = 0
    while count < n:
        yield a
        a, b = b, a + b
        count += 1

# 使用生成器
fib_gen = fibonacci_generator(5)
for num in fib_gen:
    print(num, end=' ')  # 输出：0 1 1 2 3

# 生成器表达式
squares = (x**2 for x in range(5))
print(list(squares))  # 输出：[0, 1, 4, 9, 16]
```

### 3. 迭代器 vs 生成器：核心区别与适用场景

| 特性 | 迭代器 | 生成器 |
|------|--------|--------|
| 定义方式 | 手动实现`__iter__()`和`__next__()` | 使用`yield`关键字或生成器表达式 |
| 代码复杂度 | 相对繁琐，需管理状态 | 简洁，自动保存状态 |
| 创建成本 | 需要定义完整类 | 函数或表达式即可 |
| 性能特点 | 相同内存效率，可能略快 | 相同内存效率，创建更方便 |
| 适用场景 | 复杂状态管理、多方法需求 | 简单到中等复杂度迭代逻辑 |

**关键要点**：
- 所有生成器都是迭代器，但迭代器不一定是生成器
- 生成器是创建迭代器的语法糖，大幅简化代码
- 对于简单迭代需求，优先使用生成器

### 4. 高级应用：惰性计算的优势

**内存效率对比**：
```python
import sys

# 列表推导式：一次性生成所有数据
list_data = [x*2 for x in range(1000000)]
print(f"列表占用内存：{sys.getsizeof(list_data):,} bytes")  # 约8.4MB

# 生成器表达式：按需生成数据
gen_data = (x*2 for x in range(1000000))
print(f"生成器占用内存：{sys.getsizeof(gen_data):,} bytes")  # 约128 bytes
```

**大文件处理**：
```python
def read_large_file(file_path):
    """逐行读取大文件，节省内存"""
    with open(file_path, 'r', encoding='utf-8') as f:
        for line in f:
            yield line.strip()

# 处理GB级文件
for line in read_large_file('huge_data.log'):
    process_line(line)  # 每次只处理一行，内存占用恒定
```

## 第三部分：动手练习题

请完成以下练习题，巩固迭代器和生成器的使用。每道题都有预期输出和提示。

### 练习题1：自定义迭代器类
创建一个自定义迭代器类`EvenNumbers`，用于生成指定范围内的偶数。

```python
# 你的代码
class EvenNumbers:
    """生成指定范围内偶数的迭代器"""
    def __init__(self, start, end):
        # 请在此完成初始化代码
    
    def __iter__(self):
        # 请在此完成代码
    
    def __next__(self):
        # 请在此完成代码

# 测试代码
even_iter = EvenNumbers(10, 20)
print(list(even_iter))  # 预期输出：[10, 12, 14, 16, 18, 20]

# 测试边界情况
small_iter = EvenNumbers(1, 5)
print(list(small_iter))  # 预期输出：[2, 4]
```

**提示**：
- 初始化时需要调整起始位置到第一个偶数
- `__next__()`方法中需要检查是否超出范围
- 每次返回当前值后，递增2准备下次返回

### 练习题2：生成器函数实现无限序列
创建一个生成器函数`infinite_counter()`，生成无限递增的自然数序列，但可以通过参数限制生成的个数。

```python
# 你的生成器函数代码
def infinite_counter(limit=None):
    """生成无限自然数序列，可选限制个数"""
    # 请在此完成代码

# 测试代码
# 生成前5个自然数
counter = infinite_counter(5)
print(list(counter))  # 预期输出：[1, 2, 3, 4, 5]

# 生成无限序列（取前10个）
import itertools
inf_counter = infinite_counter()
first_10 = list(itertools.islice(inf_counter, 10))
print(first_10)  # 预期输出：[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

**提示**：
- 使用`while True`循环实现无限序列
- 在`yield`后递增计数器
- 如果提供了`limit`参数，计数达到限制后使用`return`结束生成器

### 练习题3：生成器表达式转换
使用生成器表达式将以下列表处理功能改写为惰性计算版本。

```python
# 原始代码：立即计算所有结果
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# 传统方法：筛选偶数并计算平方
result_list = []
for num in numbers:
    if num % 2 == 0:
        result_list.append(num ** 2)
print(result_list)  # 输出：[4, 16, 36, 64, 100]

# 你的任务：使用生成器表达式实现相同功能
# 请在此完成生成器表达式
even_squares_gen = # 你的生成器表达式

# 测试代码
print(list(even_squares_gen))  # 预期输出：[4, 16, 36, 64, 100]
```

**提示**：
- 生成器表达式语法：`(expression for item in iterable if condition)`
- 可以嵌套多个条件和表达式

### 练习题4：生成器管道处理
创建一个数据处理管道，使用多个生成器函数处理数据流：过滤 → 转换 → 聚合。

```python
# 你的生成器函数代码
def filter_numbers(numbers, min_value=0):
    """过滤小于最小值的数字"""
    # 请在此完成代码

def square_numbers(numbers):
    """对数字进行平方计算"""
    # 请在此完成代码

def limit_results(numbers, max_count=5):
    """限制结果数量"""
    # 请在此完成代码

# 测试代码：构建完整管道
data_stream = [-2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# 管道：过滤负数 → 平方 → 限制5个结果
pipeline = limit_results(
    square_numbers(
        filter_numbers(data_stream, min_value=0)
    ),
    max_count=5
)

print(list(pipeline))  # 预期输出：[0, 1, 4, 9, 16]
```

**提示**：
- 每个生成器函数都使用`yield`产生数据
- 注意处理边界条件和参数传递
- 管道可以组合任意多个生成器

### 练习题5：迭代器的高级应用
创建一个迭代器类`FibonacciIterator`，实现斐波那契数列，并支持重置功能。

```python
# 你的迭代器类代码
class FibonacciIterator:
    """斐波那契数列迭代器，支持重置"""
    def __init__(self, max_count=10):
        # 请在此完成初始化代码
    
    def __iter__(self):
        # 请在此完成代码
    
    def __next__(self):
        # 请在此完成代码
    
    def reset(self):
        """重置迭代器状态"""
        # 请在此完成代码

# 测试代码
fib_iter = FibonacciIterator(5)

# 第一次遍历
print("第一次遍历：", list(fib_iter))  # 预期输出：[0, 1, 1, 2, 3]

# 重置后第二次遍历
fib_iter.reset()
print("重置后遍历：", list(fib_iter))  # 预期输出：[0, 1, 1, 2, 3]
```

**提示**：
- 斐波那契数列：F₀=0, F₁=1, F₂=1, F₃=2, F₄=3...
- `reset()`方法需要恢复初始状态
- 注意处理迭代器耗尽后的重置逻辑

## 第四部分：常见问题解答

### 问题1：可迭代对象和迭代器有什么区别？
**回答**：可迭代对象是实现了`__iter__()`方法的对象，可以被`for`循环遍历。迭代器是实现了`__iter__()`和`__next__()`方法的对象，可以记住遍历位置。所有迭代器都是可迭代对象，但可迭代对象不一定是迭代器。

### 问题2：生成器只能遍历一次吗？为什么？
**回答**：是的，生成器只能遍历一次。因为生成器维护一个内部状态指针，指向当前`yield`的位置。遍历完成后，指针到达末尾，再次调用`next()`会抛出`StopIteration`异常。如果需要重新遍历，必须重新创建生成器对象。

### 问题3：yield和return有什么区别？
**回答**：
- `return`：立即结束函数执行，返回一个值
- `yield`：暂停函数执行，返回一个值，下次调用时从暂停处继续执行
- `return`在生成器中用于终止生成，会抛出`StopIteration`异常
- 一个生成器函数可以有多个`yield`，但只能有一个`return`（或不写）

### 问题4：什么时候用列表推导式，什么时候用生成器表达式？
**回答**：
- **列表推导式**：当需要立即访问所有数据、需要多次遍历、需要随机访问或切片操作时
- **生成器表达式**：当处理大量数据、内存敏感、只需要遍历一次、数据量可能无限时
- 简单原则：小数据用列表推导式，大数据用生成器表达式

### 问题5：生成器的send()方法有什么用途？
**回答**：`send()`方法用于向生成器内部发送数据，作为上一次`yield`表达式的返回值。这实现了生成器与调用方的双向通信。首次调用`send()`需要传入`None`（或先调用`next()`）来启动生成器。

## 第五部分：扩展学习建议

### 1. 进阶主题推荐
- **itertools模块**：学习Python标准库中的高级迭代器工具
- **yield from语法**：掌握生成器委托，简化嵌套生成器代码
- **异步生成器**：了解Python 3.6+的异步生成器特性
- **协程与asyncio**：深入学习Python的异步编程模型

### 2. 实际项目应用
- **数据流处理**：使用生成器处理实时数据流（如日志分析、传感器数据）
- **大文件解析**：应用生成器逐行或逐块处理大型CSV、JSON文件
- **机器学习管道**：构建数据预处理和特征工程的数据管道
- **Web框架中间件**：学习Django、Flask中基于生成器的中间件机制

### 3. 学习资源推荐
- **官方文档**：Python官方文档中的迭代器和生成器章节
- **进阶书籍**：《流畅的Python》第14-17章
- **开源项目**：阅读requests、pandas等库中迭代器和生成器的应用
- **在线课程**：Coursera、edX上的Python高级编程课程

### 4. 下一步学习计划
完成今天的学习后，你已经掌握了Python处理大数据流的核心技术。在接下来的学习中，你将：
- [[Day17_NumPy入门|Day 17]]：开始AI基础学习，从NumPy数据处理入门
- [[Day18_Pandas数据分析|Day 18]]：深入学习Pandas数据分析
- [[Day19_数据可视化Matplotlib|Day 19]]：掌握Matplotlib数据可视化
- [[Day20_机器学习入门|Day 20]]：机器学习入门基础
- [[Day21_Week3周度复盘与测验|Day 21]]：Week 3周度复盘与综合测验

---

**今日学习目标检查**：
- [ ] 理解可迭代对象、迭代器和迭代器协议的区别
- [ ] 掌握生成器函数和生成器表达式的创建方法
- [ ] 了解迭代器与生成器的适用场景和性能特点
- [ ] 完成至少4道练习题
- [ ] 掌握生成器在大数据处理中的应用

祝你学习顺利！如果在学习过程中遇到问题，可以参考视频教程或查阅相关文档。