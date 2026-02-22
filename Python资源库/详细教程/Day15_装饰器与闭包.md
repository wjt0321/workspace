---
title: Day 15：装饰器与闭包
tags: [python, 装饰器, 闭包, 高级特性]
aliases: ["Day15"]
date: 2026-02-22
---

# Day 15：Python高级特性Ⅰ——装饰器与闭包

> 相关链接：[[Day14_Week2周度复盘与测验]] | [[Python学习大纲]]

欢迎来到Python学习的第十五天！今天我们将深入学习Python的两个高级特性：闭包和装饰器。这两个概念是函数式编程的核心，也是编写优雅、可复用代码的关键。掌握它们，你将能够大幅提升代码的模块化水平和可维护性。

## 第一部分：最新视频教程推荐

为了让你直观地学习闭包和装饰器的核心概念，我为你筛选了2025-2026年发布的最新Python闭包与装饰器视频教程。这些教程都采用最新的Python版本，讲解风格通俗易懂，特别适合零基础学员。

### 1. 黑马程序员 - Python高级语法：闭包与装饰器实战（2026版）
- **链接**：https://www.bilibili.com/video/BV1Gu411Q7JV（第12章：闭包与装饰器）
- **重点内容**：系统讲解闭包的概念、作用、创建方法；装饰器的定义、使用场景、基本语法和进阶技巧
- **适合人群**：喜欢系统化学习、希望掌握完整闭包与装饰器流程的学员
- **核心特点**：
  - 采用Python 3.13+最新语法特性，贴近实际项目开发场景
  - 每集15-20分钟，知识点分解细致，配合丰富的编程案例
  - 突出强调闭包的“记忆功能”和装饰器的“无侵入增强”特性
  - 涵盖带参数装饰器、类装饰器、多装饰器叠加等高级用法

### 2. 小甲鱼《零基础入门学习Python》 - 闭包与装饰器章节（2026版第12章）
- **链接**：https://www.bilibili.com/video/BV19U4y1d79C（第12章：函数进阶）
- **重点内容**：嵌套函数与闭包原理、装饰器语法糖、lambda表达式结合装饰器使用
- **适合人群**：希望从趣味案例中学习、喜欢故事化教学风格的学员
- **核心特点**：
  - 教学风格幽默风趣，将抽象的闭包概念转化为生动的游戏存档案例
  - 通过“计时器”、“权限验证”、“缓存”等实际应用场景展示装饰器的强大功能
  - 配套课后练习丰富，支持在线提交和即时反馈
  - 社区学习氛围浓厚，有大量学习伙伴互相交流装饰器使用心得

### 3. 莫烦Python - 交互式装饰器教程（2025最新版）
- **链接**：https://mofanpy.com/tutorials/python-basic/interactive-python/class（装饰器部分）
- **学习方式**：交互式学习网站，边学边练，即时查看代码效果
- **适合人群**：喜欢互动式学习、希望即时验证装饰器工作原理的学员
- **核心特点**：
  - 每个装饰器概念都有可运行的代码示例，可直接在浏览器中编辑调试
  - 涵盖无参装饰器、带参装饰器、类装饰器等完整内容
  - 界面简洁直观，支持在线调试装饰器的执行流程
  - 通过日志记录、性能计时等案例演示装饰器的实际应用价值

### 学习建议
- **今日首选**：建议先观看黑马程序人的第12章前三集（约45分钟），理解闭包的基本概念和装饰器的核心原理
- **互动练习**：学习过程中可使用莫烦Python的交互式网站进行实操，即时验证闭包和装饰器的创建与使用
- **巩固拓展**：完成今日练习题后，可参考小甲鱼的案例进行趣味练习，加深对装饰器在实际项目中应用的理解

## 第二部分：核心概念详解

### 1. 闭包：函数的“记忆”功能

闭包（Closure）是Python中一个非常重要的概念。简单来说，闭包是指在一个外部函数中定义一个内部函数，并且这个内部函数可以访问外部函数的变量，即使外部函数已经执行完毕。

**闭包的三要素**：
1. 存在嵌套函数（外部函数包含内部函数）
2. 内部函数引用了外部函数的变量
3. 外部函数返回内部函数

**闭包的作用**：
- **数据封装**：将数据和操作封装在一起，实现信息隐藏
- **状态保持**：函数具有"记忆"功能，可以记住上次调用的状态
- **工厂函数**：根据参数生成不同功能的函数

**示例代码**：
```python
# 简单闭包示例
def outer(msg):
    # 外部函数变量
    def inner():
        # 内部函数引用外部变量
        print(f"收到消息：{msg}")
    return inner  # 返回内部函数

# 创建闭包
closure_func = outer("你好，Python！")
closure_func()  # 输出：收到消息：你好，Python！
```

**实用闭包：计算器工厂**
```python
def make_calculator(operation):
    """根据操作符生成不同的计算器函数"""
    if operation == "add":
        def calculator(a, b):
            return a + b
    elif operation == "multiply":
        def calculator(a, b):
            return a * b
    elif operation == "power":
        def calculator(a, b):
            return a ** b
    else:
        def calculator(a, b):
            return "未知操作"
    
    return calculator

# 创建不同的计算器
add_calc = make_calculator("add")
mul_calc = make_calculator("multiply")
power_calc = make_calculator("power")

print(add_calc(3, 4))      # 输出：7
print(mul_calc(3, 4))      # 输出：12
print(power_calc(3, 4))    # 输出：81
```

### 2. 装饰器：不修改原代码的功能增强

装饰器（Decorator）是Python中最优雅的设计模式之一。它的核心思想是：在不修改原函数代码的前提下，为函数添加新的功能。

**装饰器的本质**：
- 装饰器本质上是一个高阶函数
- 它接收一个函数作为参数，返回一个新的函数
- 新函数在调用原函数前后执行额外操作

**装饰器的使用场景**：
- 日志记录
- 性能测试（计时）
- 权限验证
- 缓存结果
- 事务管理
- 输入验证

**基础装饰器示例**：
```python
def my_decorator(func):
    def wrapper():
        print("函数调用前执行")
        func()  # 调用原函数
        print("函数调用后执行")
    return wrapper

@my_decorator
def say_hello():
    print("Hello, Python!")

say_hello()
# 输出：
# 函数调用前执行
# Hello, Python!
# 函数调用后执行
```

**带参数的装饰器**：
```python
def repeat(num_times):
    """装饰器工厂：根据参数生成不同的装饰器"""
    def decorator(func):
        def wrapper(*args, **kwargs):
            for _ in range(num_times):
                result = func(*args, **kwargs)
            return result
        return wrapper
    return decorator

@repeat(num_times=3)
def greet(name):
    print(f"Hello, {name}!")

greet("Alice")
# 输出：
# Hello, Alice!
# Hello, Alice!
# Hello, Alice!
```

## 第三部分：动手练习题

请完成以下练习题，巩固闭包和装饰器的使用。每道题都有预期输出和提示。

### 练习题1：闭包计数器
创建一个闭包函数`make_counter()`，它返回一个计数函数，每次调用计数函数时，计数器加1并返回当前计数值。

```python
# 你的代码
def make_counter():
    # 请在此完成代码

# 测试代码
counter = make_counter()
print(counter())  # 预期输出：1
print(counter())  # 预期输出：2
print(counter())  # 预期输出：3

counter2 = make_counter()
print(counter2()) # 预期输出：1
print(counter())  # 预期输出：4
```

**提示**：
- 在外部函数中定义一个变量用于存储计数值
- 在内部函数中修改这个变量（需要使用`nonlocal`关键字）
- 外部函数返回内部函数

### 练习题2：装饰器计时器
创建一个装饰器`timer_decorator`，它能够记录被装饰函数的执行时间，并打印出来。

```python
import time

# 你的装饰器代码
def timer_decorator(func):
    # 请在此完成代码

@timer_decorator
def slow_function():
    time.sleep(2)
    print("函数执行完成")

@timer_decorator
def fast_function():
    time.sleep(0.5)
    print("快速函数执行完成")

# 测试代码
slow_function()
fast_function()
```

**预期输出类似**：
```
函数执行完成
slow_function 执行耗时：2.0001 秒
快速函数执行完成
fast_function 执行耗时：0.5001 秒
```

**提示**：
- 使用`time.time()`获取当前时间
- 在调用原函数前后分别记录时间
- 计算时间差并打印
- 使用`func.__name__`获取函数名

### 练习题3：权限验证装饰器
创建一个带参数的装饰器`require_role`，它根据用户角色验证权限。只有拥有指定角色的用户才能调用被装饰函数。

```python
# 你的装饰器代码
def require_role(required_role):
    # 请在此完成代码

# 模拟用户信息
current_user = {
    "name": "张三",
    "role": "admin",  # 当前用户角色为admin
    "is_login": True
}

@require_role("admin")
def delete_user(user_id):
    print(f"管理员正在删除用户：{user_id}")

@require_role("super_admin")
def reset_system():
    print("系统重置中...")

# 测试代码
delete_user(1001)  # 应该正常执行
reset_system()     # 应该抛出异常或提示无权限
```

**预期输出**：
```
管理员正在删除用户：1001
PermissionError: 用户张三无权限执行此操作（需要super_admin权限）
```

**提示**：
- 装饰器需要三层嵌套：工厂函数 → 装饰器 → 包装函数
- 在包装函数中检查`current_user["role"]`是否等于`required_role`
- 如果不匹配，抛出`PermissionError`异常

### 练习题4：缓存装饰器
创建一个装饰器`cache_decorator`，用于缓存函数的计算结果。当相同参数再次调用时，直接返回缓存结果，避免重复计算。

```python
# 你的装饰器代码
def cache_decorator(func):
    # 请在此完成代码

@cache_decorator
def expensive_calculation(n):
    print(f"计算 {n} 的平方...")
    return n * n

# 测试代码
print(expensive_calculation(5))  # 第一次计算，应该打印"计算 5 的平方..."
print(expensive_calculation(5))  # 第二次相同参数，应该直接返回结果，不打印计算信息
print(expensive_calculation(10)) # 新参数，重新计算
print(expensive_calculation(10)) # 相同参数，直接返回缓存
```

**预期输出**：
```
计算 5 的平方...
25
25
计算 10 的平方...
100
100
```

**提示**：
- 使用字典作为缓存存储：`cache = {}`
- 以参数为键，结果为值存储到缓存中
- 调用前先检查参数是否在缓存中

### 练习题5：装饰器链
创建两个装饰器`log_decorator`和`uppercase_decorator`，将它们应用到同一个函数上，观察执行顺序。

```python
# 你的装饰器代码
def log_decorator(func):
    # 请在此完成代码

def uppercase_decorator(func):
    # 请在此完成代码

@log_decorator
@uppercase_decorator
def get_message(name):
    return f"Hello, {name}!"

# 测试代码
result = get_message("Python")
print(result)
```

**预期输出**：
```
调用函数：get_message
HELLO, PYTHON!
```

**提示**：
- `log_decorator`：在函数调用前后打印日志信息
- `uppercase_decorator`：将函数返回值转换为大写
- 注意装饰器的应用顺序：从下往上

## 第四部分：常见问题解答

### 问题1：什么是闭包？它有什么实际用途？
**回答**：闭包是在嵌套函数中，内部函数引用了外部函数的变量，且外部函数返回内部函数。闭包的实际用途包括：
- **工厂函数**：根据参数生成不同功能的函数
- **状态保持**：函数可以记住上次调用的状态（如计数器）
- **数据封装**：将数据和操作封装在一起，实现信息隐藏
- **回调函数**：在事件驱动编程中保存状态

### 问题2：装饰器中的`*args`和`**kwargs`有什么作用？
**回答**：`*args`和`**kwargs`是Python的可变参数机制，在装饰器中用于：
- `*args`：接收任意数量的位置参数
- `**kwargs`：接收任意数量的关键字参数
- 这样设计可以使装饰器兼容任意参数的函数，确保装饰器的通用性

### 问题3：多个装饰器的执行顺序是怎样的？
**回答**：多个装饰器应用于同一函数时，执行顺序是**从下往上**（离函数定义最近的先应用）。例如：
```python
@decorator1
@decorator2
def my_func():
    pass
```
等价于：
```python
my_func = decorator1(decorator2(my_func))
```

### 问题4：为什么要在装饰器中使用`functools.wraps`？
**回答**：使用`functools.wraps`可以保留原函数的元信息，包括：
- 函数名（`__name__`）
- 文档字符串（`__doc__`）
- 函数签名等
如果不使用`wraps`，被装饰后的函数会丢失这些信息，给调试和文档生成带来困难。

### 问题5：闭包和装饰器有什么区别？
**回答**：
- **闭包**：是一种函数嵌套结构，内部函数可以访问外部函数的变量，用于封装数据和状态
- **装饰器**：是一种设计模式，使用闭包实现，用于在不修改原函数代码的前提下增强函数功能
- 关系：装饰器是闭包的一种高级应用，所有装饰器都基于闭包实现

## 第五部分：扩展学习建议

### 1. 进阶主题推荐
- **类装饰器**：学习使用类实现装饰器，管理更复杂的状态
- **装饰器工厂**：深入学习带参数的装饰器实现原理
- **装饰器库**：探索Python标准库中的装饰器，如`@property`、`@classmethod`、`@staticmethod`等
- **元装饰器**：了解装饰器的高级用法和设计模式

### 2. 实际项目应用
- **Web框架**：学习Flask、Django等框架中的装饰器使用
- **API开发**：实践权限验证、日志记录、缓存等装饰器应用
- **测试框架**：了解pytest等测试框架中的装饰器使用

### 3. 学习资源推荐
- **官方文档**：Python官方文档中的装饰器章节
- **进阶书籍**：《流畅的Python》、《Python Cookbook》等
- **开源项目**：阅读优秀的开源项目代码，学习装饰器的实际应用

### 4. 下一步学习计划
完成今天的学习后，你已经掌握了Python的两个核心高级特性。在接下来的学习中，你将：
- Day 16：学习生成器与迭代器，掌握高效处理大数据流的方法
- Day 17：开始AI基础学习，从NumPy数据处理入门
- 后续：逐步深入学习Pandas、Matplotlib和机器学习等AI核心技术

---

**今日学习目标检查**：
- [ ] 理解闭包的概念和作用
- [ ] 掌握装饰器的基本使用方法
- [ ] 完成至少3道练习题
- [ ] 了解装饰器的实际应用场景

祝你学习顺利！如果在学习过程中遇到问题，可以参考视频教程或查阅相关文档。