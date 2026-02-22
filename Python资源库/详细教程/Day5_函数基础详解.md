---
title: Day 5：函数基础详解
tags: [python, 函数, 参数, 返回值, 作用域]
aliases: ["Day5"]
date: 2026-02-22
---

# Day 5：函数基础详解

> 相关链接：[[Day4_循环结构练习题]] | [[Day6_列表与字典练习题]] | [[Python学习大纲]]

欢迎来到Python学习的第五天！今天我们将深入探讨Python编程中最重要的概念之一——**函数**。函数是代码复用和模块化编程的基石，也是后续学习AI相关知识的必备工具。在AI中，神经网络层、损失函数、优化器等核心组件都是通过函数实现的。

## 第一部分：最新视频教程推荐

为了让学习更加直观高效，我为你筛选了2025-2026年发布的Python函数最新教程。这些资源都采用最新的Python版本和教学理念，专门为零基础学员设计。

### 1. 黑马程序员2026版Python基础入门 - 第5章函数详解（2月最新更新）
- **链接**：https://www.bilibili.com/video/BV1qW4y1a7fU/?spm_id_from=333.337.search-card.all.click&vd_source=221bd3df84fbf4761d963cdf7d4f37fa
- **重点内容**：第5章"Python函数"完整体系：
  - 函数定义与调用：def关键字、函数名、参数列表、冒号
  - 参数传递：位置参数、关键字参数、默认参数的实际应用
  - 返回值：return语句、多返回值（元组）、None类型
  - 函数作用域：局部变量、全局变量、global关键字
  - 实战案例：ATM模拟系统完整实现
- **适合人群**：喜欢动手实践、希望快速掌握实际编程技能的学员
- **核心特点**：
  - 2026年2月3日最新更新，语法习惯最前沿
  - 图文并茂，每个概念都有可视化解释
  - 代码示例丰富，可直接复制运行
  - 课后作业设计合理，渐进式提升能力

### 2. 莫烦Python2025交互式函数教程 - 从零到精通
- **链接**：https://mofanpy.com/tutorials/python-basic/basic/
- **学习方式**：交互式学习网站，可边学边练
- **重点内容**：
  - 函数定义与调用：交互式代码编辑器
  - 参数类型详解：位置参数、默认参数、可变参数
  - lambda匿名函数：简洁语法与应用场景
  - 高阶函数：map、filter、reduce的实战应用
- **适合人群**：喜欢互动式学习、希望即时看到代码效果的学员
- **核心特点**：
  - 每个知识点都有可运行的代码示例
  - 支持在线编辑和运行Python代码
  - 界面简洁，学习路径清晰
  - 实时反馈，错误即时修正

### 3. 国家高等教育智慧教育平台 - Python语言程序设计 第7周（2026最新版）
- **链接**：https://higher.smartedu.cn/course/66d39c2b711dc30c348ee6f0#week7
- **重点内容**：第7周"函数与模块"专题，系统讲解：
  - 函数的定义与调用：def关键字与缩进规则
  - 参数传递机制：值传递与引用传递的区别
  - 函数的返回值：return语句的执行逻辑
  - 变量的作用域：局部变量与全局变量的生命周期
- **适合人群**：希望建立系统知识体系、理解计算机科学思维的学员
- **核心特点**：
  - 国家级一流课程，累计超过550万学习者验证
  - 理论讲解透彻，案例经典实用
  - 配套大量练习题和测试题，巩固学习效果
  - 课程微信群支持，学习氛围浓厚

### 今日学习路径建议

1. **主攻资源**：先看黑马程序员第5章前3节（约25分钟），动手编写示例代码
2. **交互练习**：使用莫烦Python网站完成函数定义和参数练习
3. **系统深化**：有时间可观看国家高等教育平台第7周相关内容，建立理论框架
4. **核心重点**：今天要彻底掌握函数定义、参数传递、返回值和作用域，这是AI学习中函数式编程的基础

## 第二部分：函数系统讲解（详细注释版）

### 2.1 函数是什么？为什么需要函数？

想象一下生活中的场景：你要做一杯咖啡，每次都需要执行"磨豆、冲泡、加奶、加糖"这四个步骤。如果你每天都这样做，就会重复很多次相同的操作。

在编程中，函数就像是**预先包装好的一系列操作**：
- **可重复使用**：一次定义，多次调用
- **功能明确**：每个函数都有特定的任务
- **参数灵活**：可以根据不同输入产生不同输出

```python
# ========== 为什么需要函数？ ==========
# 没有函数的情况：重复编写相同逻辑的代码

# 计算1-100的和
sum1 = 0
for i in range(1, 101):
    sum1 += i
print(f"1-100的和：{sum1}")

# 计算200-300的和  
sum2 = 0
for i in range(200, 301):
    sum2 += i
print(f"200-300的和：{sum2}")

# 计算500-600的和
sum3 = 0
for i in range(500, 601):
    sum3 += i
print(f"500-600的和：{sum3}")

# 问题：代码重复，修改时需要改多个地方，容易出错
# 解决方案：使用函数封装相同的逻辑
```

### 2.2 函数的定义与调用

函数定义的基本语法：

```python
# ========== 函数定义与调用 ==========

# 定义函数：使用def关键字，后面跟函数名和括号
def calculate_sum(start, end):
    """
    计算从start到end的所有整数的和
    
    参数：
    start -- 起始数字
    end -- 结束数字
    
    返回：
    从start到end的所有整数的和
    """
    # 函数体：实现具体功能的代码（必须缩进）
    total = 0  # 定义一个局部变量total，用于累加
    for i in range(start, end + 1):  # 循环从start到end
        total += i  # 累加到total变量中
    return total  # 使用return语句返回结果

# 调用函数：使用函数名加括号，传入实际参数
result1 = calculate_sum(1, 100)  # 调用函数，传入1和100作为参数
print(f"1-100的和：{result1}")  # 输出：1-100的和：5050

result2 = calculate_sum(200, 300)  # 再次调用同一个函数，传入不同参数
print(f"200-300的和：{result2}")  # 输出：200-300的和：25250

# 函数调用的关键点：
# 1. 必须先定义后调用（函数定义在上，调用在下）
# 2. 参数数量和顺序必须与定义一致
# 3. 函数名要见名知意，提高代码可读性
```

### 2.3 函数参数详解

Python函数支持多种参数传递方式，让函数更加灵活：

```python
# ========== 函数参数详解 ==========

# 1. 位置参数：按顺序传递，必须一一对应
def greet_person(name, age, city):
    """
    向指定的人打招呼
    
    参数：
    name -- 姓名（字符串）
    age -- 年龄（整数）
    city -- 城市（字符串）
    """
    print(f"你好，{name}！你今年{age}岁，来自{city}。")

# 正确调用：按照name、age、city的顺序传递
greet_person("小明", 25, "北京")  # 输出：你好，小明！你今年25岁，来自北京。

# 错误调用：顺序不对会导致逻辑错误
# greet_person("北京", "小明", 25)  # 这会把城市当作名字，名字当作年龄

# 2. 关键字参数：通过参数名指定，顺序无关
greet_person(city="上海", name="小红", age=30)  # 使用关键字参数，顺序任意
# 输出：你好，小红！你今年30岁，来自上海。

# 3. 默认参数：为参数设置默认值，调用时可省略
def calculate_interest(principal, rate=0.05, years=1):
    """
    计算复利利息
    
    参数：
    principal -- 本金（必须提供）
    rate -- 年利率，默认5%（可选）
    years -- 存款年限，默认1年（可选）
    
    返回：
    最终金额
    """
    # 复利公式：A = P(1 + r)^n
    amount = principal * (1 + rate) ** years
    return amount

# 只提供必须参数，使用默认利率和年限
result1 = calculate_interest(1000)  # 使用默认rate=0.05, years=1
print(f"1000元存1年（5%利率）：{result1:.2f}元")  # 输出：1050.00元

# 提供部分参数，覆盖默认值
result2 = calculate_interest(1000, rate=0.03)  # 覆盖rate，使用默认years
print(f"1000元存1年（3%利率）：{result2:.2f}元")  # 输出：1030.00元

# 提供所有参数，完全覆盖默认值
result3 = calculate_interest(1000, rate=0.06, years=3)  # 覆盖所有默认值
print(f"1000元存3年（6%利率）：{result3:.2f}元")  # 输出：1191.02元

# 重要规则：默认参数必须放在位置参数后面
# def wrong_function(a=1, b):  # 错误！默认参数不能在位置参数前面
#     pass
```

### 2.4 函数返回值详解

函数通过return语句向调用者返回结果：

```python
# ========== 函数返回值详解 ==========

# 1. 无返回值函数：执行操作但不返回数据
def print_welcome():
    """打印欢迎信息，没有返回值"""
    print("欢迎学习Python函数！")
    print("函数是编程的核心工具")
    # 函数结束，没有return语句，默认返回None

result = print_welcome()  # 调用函数
print(f"无返回值函数的返回结果：{result}")  # 输出：None
print(f"返回值的类型：{type(result)}")  # 输出：<class 'NoneType'>

# 2. 单返回值函数：返回一个数据
def square(number):
    """计算一个数的平方"""
    result = number * number  # 计算平方
    return result  # 返回计算结果

num_squared = square(5)  # 调用函数，接收返回值
print(f"5的平方是：{num_squared}")  # 输出：25

# 3. 多返回值函数：返回多个数据（实际上是元组）
def calculate_circle(radius):
    """计算圆的面积和周长"""
    import math  # 导入math模块用于数学计算
    
    area = math.pi * radius ** 2  # 面积公式：πr²
    circumference = 2 * math.pi * radius  # 周长公式：2πr
    
    return area, circumference  # 返回两个值（实际上是元组）

# 接收多个返回值
circle_area, circle_circumference = calculate_circle(3)
print(f"半径为3的圆：")
print(f"  面积：{circle_area:.2f}")  # 输出：28.27
print(f"  周长：{circle_circumference:.2f}")  # 输出：18.85

# 也可以将多个返回值当作一个元组接收
circle_info = calculate_circle(5)
print(f"半径为5的圆信息（元组）：{circle_info}")
print(f"元组第一个元素（面积）：{circle_info[0]:.2f}")

# 4. return语句的特性：立即结束函数
def test_return():
    """演示return语句的特性"""
    print("这行会执行")  # 这行会执行
    return "返回值"  # 遇到return，函数立即结束
    print("这行不会执行")  # 这行永远不会执行
    
result = test_return()
print(f"函数返回值：{result}")  # 输出：返回值
```

### 2.5 函数作用域详解

作用域决定了变量在何处可以被访问：

```python
# ========== 函数作用域详解 ==========

# 1. 局部变量：在函数内部定义，只在函数内部有效
def calculate_discount(price, discount_rate=0.1):
    """计算折扣后的价格"""
    # discounted_price是局部变量，只能在函数内部访问
    discounted_price = price * (1 - discount_rate)
    return discounted_price

final_price = calculate_discount(100)  # 调用函数
print(f"折扣后价格：{final_price}")  # 输出：90.0

# 错误尝试：在函数外部访问局部变量
# print(discounted_price)  # NameError: name 'discounted_price' is not defined

# 2. 全局变量：在函数外部定义，全局范围有效
global_counter = 0  # 这是一个全局变量

def increment_counter():
    """增加计数器"""
    global global_counter  # 使用global关键字声明要修改全局变量
    global_counter += 1  # 修改全局变量
    print(f"函数内部：计数器 = {global_counter}")

# 调用函数
increment_counter()  # 输出：函数内部：计数器 = 1
increment_counter()  # 输出：函数内部：计数器 = 2

# 在函数外部访问全局变量
print(f"函数外部：计数器 = {global_counter}")  # 输出：函数外部：计数器 = 2

# 3. 局部变量与全局变量同名时的规则
x = 10  # 全局变量x

def test_scope():
    """测试作用域规则"""
    x = 20  # 局部变量x，与全局变量同名
    print(f"函数内部x = {x}")  # 输出：20，使用的是局部变量

test_scope()
print(f"函数外部x = {x}")  # 输出：10，全局变量没有改变

# 4. 不使用global关键字修改全局变量会创建新的局部变量
def wrong_increment():
    """错误的方式：没有使用global关键字"""
    # 这里创建了一个新的局部变量global_counter，而不是修改全局变量
    global_counter = 100
    print(f"错误方式：局部变量 = {global_counter}")

global_counter = 0
wrong_increment()  # 输出：错误方式：局部变量 = 100
print(f"全局变量仍然 = {global_counter}")  # 输出：全局变量仍然 = 0
```

### 2.6 实际应用示例

现在通过4个不同场景的示例，展示函数在实际编程中的应用：

#### 示例1：计算器函数（基础数学运算）

```python
# ========== 示例1：计算器函数 ==========

def simple_calculator(num1, num2, operation="add"):
    """
    简单的四则运算计算器
    
    参数：
    num1 -- 第一个数字
    num2 -- 第二个数字
    operation -- 运算类型："add"（加）、"subtract"（减）、"multiply"（乘）、"divide"（除）
    
    返回：
    运算结果
    """
    if operation == "add":
        return num1 + num2  # 加法
    elif operation == "subtract":
        return num1 - num2  # 减法
    elif operation == "multiply":
        return num1 * num2  # 乘法
    elif operation == "divide":
        if num2 != 0:  # 检查除数是否为零
            return num1 / num2  # 除法
        else:
            return "错误：除数不能为零"
    else:
        return "错误：无效的运算类型"

# 测试计算器函数
print("计算器函数测试：")
print(f"5 + 3 = {simple_calculator(5, 3, 'add')}")  # 输出：8
print(f"10 - 4 = {simple_calculator(10, 4, 'subtract')}")  # 输出：6
print(f"6 × 7 = {simple_calculator(6, 7, 'multiply')}")  # 输出：42
print(f"8 ÷ 2 = {simple_calculator(8, 2, 'divide')}")  # 输出：4.0
print(f"5 ÷ 0 = {simple_calculator(5, 0, 'divide')}")  # 输出：错误：除数不能为零
```

#### 示例2：字符串处理函数（文本处理）

```python
# ========== 示例2：字符串处理函数 ==========

def text_processor(text, action="count_words"):
    """
    处理文本字符串
    
    参数：
    text -- 要处理的文本
    action -- 处理方式："count_words"（统计单词数）、"reverse"（反转字符串）、
              "uppercase"（转大写）、"lowercase"（转小写）
    
    返回：
    处理后的结果
    """
    if action == "count_words":
        # 分割字符串并统计单词数
        words = text.split()  # 默认按空格分割
        return len(words)  # 返回单词数量
    elif action == "reverse":
        # 反转字符串
        return text[::-1]  # Python切片技巧：从头到尾，步长为-1
    elif action == "uppercase":
        # 转换为大写
        return text.upper()  # 使用字符串的upper()方法
    elif action == "lowercase":
        # 转换为小写
        return text.lower()  # 使用字符串的lower()方法
    else:
        return "错误：无效的处理方式"

# 测试文本处理函数
sample_text = "Python programming is fun and powerful"
print("\n文本处理函数测试：")
print(f"原始文本：{sample_text}")
print(f"单词数：{text_processor(sample_text, 'count_words')}")  # 输出：6
print(f"反转文本：{text_processor(sample_text, 'reverse')}")
print(f"大写文本：{text_processor(sample_text, 'uppercase')}")
print(f"小写文本：{text_processor(sample_text, 'lowercase')}")
```

#### 示例3：简单AI激活函数模拟（AI基础）

```python
# ========== 示例3：AI激活函数模拟 ==========

def activation_function(x, func_type="relu"):
    """
    模拟神经网络中的激活函数
    
    参数：
    x -- 输入值
    func_type -- 激活函数类型："relu"（线性整流）、"sigmoid"（S型函数）、
                 "tanh"（双曲正切）、"leaky_relu"（带泄露的ReLU）
    
    返回：
    激活后的值
    """
    if func_type == "relu":
        # ReLU：负数为0，正数不变
        return max(0, x)  # 返回x和0中的较大值
    elif func_type == "sigmoid":
        # Sigmoid：将值映射到0-1之间
        import math  # 导入数学模块
        if x >= 0:  # 数值稳定性处理
            return 1 / (1 + math.exp(-x))
        else:
            return math.exp(x) / (1 + math.exp(x))
    elif func_type == "tanh":
        # Tanh：将值映射到-1到1之间
        import math
        return math.tanh(x)  # 使用math库的tanh函数
    elif func_type == "leaky_relu":
        # Leaky ReLU：负数有小的斜率
        return x if x > 0 else 0.01 * x  # 负数为0.01倍
    else:
        return "错误：无效的激活函数类型"

# 测试激活函数
print("\nAI激活函数测试：")
test_values = [-2, -1, 0, 1, 2]
print("输入值：", test_values)

for func in ["relu", "sigmoid", "tanh", "leaky_relu"]:
    results = [activation_function(val, func) for val in test_values]
    print(f"{func:10s}：{results}")
```

#### 示例4：数据清洗函数（数据处理）

```python
# ========== 示例4：数据清洗函数 ==========

def clean_data(data_list, operation="remove_duplicates"):
    """
    清洗数据列表
    
    参数：
    data_list -- 原始数据列表
    operation -- 清洗操作："remove_duplicates"（去重）、"sort_asc"（升序排序）、
                 "sort_desc"（降序排序）、"filter_numbers"（只保留数字）
    
    返回：
    清洗后的数据列表
    """
    if operation == "remove_duplicates":
        # 去除重复元素（保持原始顺序）
        cleaned = []  # 创建空列表存储结果
        for item in data_list:  # 遍历原始列表
            if item not in cleaned:  # 如果元素不在结果列表中
                cleaned.append(item)  # 添加到结果列表
        return cleaned
    elif operation == "sort_asc":
        # 升序排序
        return sorted(data_list)  # 使用sorted函数排序
    elif operation == "sort_desc":
        # 降序排序
        return sorted(data_list, reverse=True)  # 降序排序
    elif operation == "filter_numbers":
        # 只保留数字类型
        return [item for item in data_list if isinstance(item, (int, float))]
    else:
        return "错误：无效的清洗操作"

# 测试数据清洗函数
print("\n数据清洗函数测试：")
raw_data = [5, 2, 8, 2, 5, "hello", 3.14, "world", 8, 1]

print(f"原始数据：{raw_data}")
print(f"去重后：{clean_data(raw_data, 'remove_duplicates')}")
print(f"升序排序：{clean_data(raw_data, 'sort_asc')}")
print(f"降序排序：{clean_data(raw_data, 'sort_desc')}")
print(f"只保留数字：{clean_data(raw_data, 'filter_numbers')}")
```

### 2.7 函数文档字符串（Docstring）

良好的文档字符串让代码更易理解和维护：

```python
# ========== 函数文档字符串示例 ==========

def calculate_statistics(numbers):
    """
    计算一组数字的统计信息
    
    这个函数接受一个数字列表，返回包含最小值、最大值、
    平均值和总和的字典。对于空列表，返回None。
    
    参数：
    numbers -- 数字列表（可包含整数或浮点数）
    
    返回：
    dict -- 包含以下键的字典：
        "min"：最小值
        "max"：最大值  
        "mean"：平均值
        "sum"：总和
    如果输入列表为空，返回None
    
    异常：
    如果输入不是列表或包含非数字元素，会抛出TypeError
    
    示例：
    >>> calculate_statistics([1, 2, 3, 4, 5])
    {'min': 1, 'max': 5, 'mean': 3.0, 'sum': 15}
    >>> calculate_statistics([])
    None
    """
    if not numbers:  # 处理空列表情况
        return None
    
    # 检查所有元素都是数字
    for num in numbers:
        if not isinstance(num, (int, float)):
            raise TypeError("列表中的元素必须是数字类型")
    
    # 计算统计信息
    stats = {
        "min": min(numbers),  # 最小值
        "max": max(numbers),  # 最大值
        "sum": sum(numbers),  # 总和
        "mean": sum(numbers) / len(numbers)  # 平均值
    }
    
    return stats

# 查看函数的文档字符串
print("函数的文档字符串：")
print(calculate_statistics.__doc__)

# 测试函数
test_numbers = [10, 20, 30, 40, 50]
result = calculate_statistics(test_numbers)
print(f"\n测试结果：{result}")
```

## 第三部分：学习卡片

### 3个核心收获

1. **函数定义与调用**：掌握了使用`def`关键字定义函数的基本语法，理解了函数名、参数列表、函数体和返回值的各个组成部分。学会了通过`函数名(参数)`的方式调用函数，并理解了函数必须先定义后调用的原则。

2. **参数传递机制**：深入理解了位置参数、关键字参数和默认参数的区别和应用场景。学会了根据实际需求选择合适的参数传递方式，并掌握了默认参数必须放在位置参数后面的重要规则。

3. **作用域与返回值**：明确了局部变量和全局变量的作用范围，掌握了使用`global`关键字修改全局变量的方法。理解了`return`语句的功能和特性，学会了处理单返回值和多返回值的情况。

### 1个疑问收集

在学习函数的过程中，我对以下概念还不太清楚：

- **可变参数（*args和**kwargs）**的详细用法和实际应用场景是什么？
- 函数内部的变量修改如何影响外部变量？什么时候需要使用`global`或`nonlocal`关键字？
- 函数作为一等公民在Python中意味着什么？函数可以作为参数传递和返回值返回的具体应用有哪些？

### 1个感悟

通过今天的学习，我深刻体会到函数是编程中实现**代码复用**和**模块化设计**的核心工具。就像生活中的工具包，一次封装可以多次使用，大大提高了编程效率。特别是在AI学习中，理解函数的概念对于后续学习神经网络、损失函数等高级概念至关重要。今天的练习让我感受到，将复杂问题分解为多个小函数，不仅让代码更清晰，也让调试和维护变得更加容易。