---
title: Day 11：面向对象基础（上）
tags: [python, 面向对象, OOP, 类, 对象]
aliases: ["Day11"]
date: 2026-02-22
---

# Day 11：面向对象基础（上）

> 相关链接：[[Day10_模块与包管理]] | [[Day12_面向对象基础（下）]] | [[Python学习大纲]]

欢迎来到Python学习的第十一天！今天我们将开启面向对象编程（OOP）的学习之旅。面向对象编程是Python的核心范式，也是现代软件开发的重要思想。掌握OOP，你才能真正理解Python的"灵魂"，并为后续构建复杂AI项目打下坚实基础。

## 第一部分：最新视频教程推荐

为了让你直观地学习面向对象编程的核心概念，我为你筛选了2025-2026年发布的最新Python面向对象编程视频教程。这些教程都采用最新的Python版本，讲解风格通俗易懂，特别适合零基础学员。

### 1. 黑马程序员 - 面向对象编程完整指南（2026版第九章）
- **链接**：https://www.bilibili.com/video/BV1qW4y1a7fU/（第9章OOP部分）
- **重点内容**：系统讲解类与对象概念、属性分类、方法定义、构造函数、实例化过程、封装原理
- **适合人群**：喜欢系统化学习、希望掌握完整OOP流程的学员
- **核心特点**：
  - 采用Python 3.13+最新语法特性，贴近实际项目开发场景
  - 每集15-20分钟，知识点分解细致，配合丰富生活化案例
  - 突出强调从现实世界到程序世界的抽象过程
  - 涵盖self理解、属性分类、方法设计等关键难点解析

### 2. 莫烦Python - 交互式面向对象编程教程（2025最新版）
- **链接**：https://mofanpy.com/tutorials/python-basic/interactive-python/class
- **学习方式**：交互式学习网站，边学边练，即时查看代码效果
- **适合人群**：喜欢互动式学习、希望即时验证类与对象概念的学员
- **核心特点**：
  - 每个OOP概念都有可运行的代码示例，可直接在浏览器中编辑调试
  - 涵盖类定义、对象创建、属性初始化、方法调用等完整内容
  - 界面简洁直观，支持在线调试类和对象的行为
  - 通过文件管理系统案例演示OOP的实际应用价值

### 3. 小甲鱼《零基础入门学习Python》 - 面向对象章节（2026版第18章）
- **链接**：https://www.bilibili.com/tutorials/py-oop-basic
- **重点内容**：类与对象概念讲解、self参数深入解析、属性方法详解、OOP思维转变
- **适合人群**：希望从趣味案例中学习、喜欢故事化教学风格的学员
- **核心特点**：
  - 教学风格幽默风趣，将抽象OOP概念转化为生动动物世界案例
  - 通过汽车类、手机类等生活化案例演示OOP设计思想
  - 配套课后练习丰富，支持在线提交和即时反馈
  - 社区学习氛围浓厚，有大量学习伙伴互相交流OOP困惑

### 学习建议
- **今日首选**：建议先观看黑马程序人的第九章前三集（约45分钟），理解类与对象的基本概念和关系
- **互动练习**：学习过程中可使用莫烦Python的交互式网站进行实操，即时验证类和对象的创建与使用
- **巩固拓展**：完成今日练习题后，可参考小甲鱼的案例进行趣味练习，加深对OOP思维转变的理解

## 第二部分：核心概念详解

### 1. 从现实世界到程序世界的抽象

面向对象编程的核心思想是**将现实世界的事物抽象为程序中的对象**。我们先通过一个生活化的类比来理解：

**现实世界**：你家的特斯拉汽车
- **属性**（特征）：品牌=特斯拉，颜色=红色，电量=80%
- **行为**（功能）：启动引擎，加速行驶，充电

**程序世界**：对应为Car类的实例对象
- **类**：汽车的设计图纸（模板）
- **对象**：根据设计图纸制造的汽车（具体实例）

这种抽象过程让程序逻辑更贴近人类思维，提高代码的可读性和可维护性。

### 2. 类（Class）：对象的蓝图

类是对象的模板，定义了对象的属性和方法。在Python中，使用`class`关键字定义类：

```python
# 定义一个最简单的空类
class Car:           # 类名使用PascalCase命名规范（每个单词首字母大写）
    pass            # pass表示暂时什么也不做，只是一个占位符

# 根据类创建对象（实例化）
my_car = Car()      # 通过类名加括号创建对象
your_car = Car()    # 可以创建多个不同的对象

print(type(my_car))  # 输出：<class '__main__.Car'>，表示这是一个Car类的对象
print(my_car is your_car)  # 输出：False，它们是内存中两个独立的对象
```

**类名命名规范**：
- 使用**PascalCase**（大驼峰命名法）：每个单词首字母大写，无下划线
- 如：`Car`, `Student`, `BankAccount`
- 这是Python社区的通用约定，帮助其他开发者快速识别类的定义

### 3. 属性：对象的特征

属性分为两类：**实例属性**和**类属性**。理解这两者的区别是掌握OOP的重要一步：

```python
class Student:
    # 类属性：所有对象共享的公共特征
    school = "清华大学"  # 这个学校名称对所有学生都一样
    
    def __init__(self, name, age):
        # __init__是构造方法，创建对象时自动调用
        # self代表当前正在创建的对象本身
        
        # 实例属性：每个对象独有的特征
        self.name = name  # 每个学生有自己的名字
        self.age = age    # 每个学生有自己的年龄
        self.grade = "大一"  # 可以设置默认值

# 创建学生对象
student1 = Student("张三", 20)  # 传入姓名和年龄参数
student2 = Student("李四", 21)

# 访问属性
print(f"学生1的姓名：{student1.name}")      # 输出：张三
print(f"学生2的学校：{student2.school}")    # 输出：清华大学
print(f"学校名称：{Student.school}")         # 输出：清华大学（通过类直接访问类属性）

# 修改属性
student1.name = "张明"  # 修改实例属性
print(f"修改后的姓名：{student1.name}")  # 输出：张明
```

**属性分类对比**：

| 属性类型 | 定义位置 | 归属 | 作用范围 | 访问方式 |
|---------|---------|------|----------|---------|
| **类属性** | 类内部、方法外 | 类本身 | 所有实例共享 | `类名.属性` 或 `对象.属性` |
| **实例属性** | `__init__`方法内 | 具体实例 | 仅当前实例独有 | 仅`对象.属性` |

**重要提醒**：如果通过`对象.类属性 = 新值`赋值，并不会修改类本身的类属性，而是为这个对象创建一个同名的实例属性。后续该对象访问此属性时，会优先读取自己的实例属性。

### 4. 方法：对象的行为

方法是定义在类中的函数，用于描述对象的行为。在Python中，方法分为实例方法、类方法和静态方法。今天我们重点学习最常用的**实例方法**：

```python
class Dog:
    def __init__(self, name, breed):
        # 初始化实例属性
        self.name = name
        self.breed = breed
        self.energy = 100  # 默认能量值
    
    # 实例方法：描述狗的行为
    def bark(self):
        # self代表当前调用方法的狗对象
        print(f"{self.name}说：汪汪！")
    
    def eat(self, food_amount):
        # 方法可以修改对象的状态
        self.energy += food_amount * 10
        print(f"{self.name}吃了食物，能量增加到{self.energy}")
    
    def run(self, distance):
        # 方法可以根据参数改变对象状态
        energy_cost = distance * 5
        if self.energy >= energy_cost:
            self.energy -= energy_cost
            print(f"{self.name}跑了{distance}米，剩余能量{self.energy}")
        else:
            print(f"{self.name}太累了，需要先吃东西！")

# 创建狗对象
dog1 = Dog("旺财", "金毛")
dog2 = Dog("小白", "柯基")

# 调用方法
dog1.bark()          # 输出：旺财说：汪汪！
dog2.bark()          # 输出：小白说：汪汪！

dog1.eat(3)          # 输出：旺财吃了食物，能量增加到130
dog1.run(10)         # 输出：旺财跑了10米，剩余能量80
```

**self参数的核心作用**：
1. **区分不同对象**：一个类可以创建多个对象，`self`能明确当前操作的是哪个对象
2. **访问对象成员**：在类内部通过`self.属性名`访问属性，通过`self.方法名()`调用其他方法
3. **Python自动传递**：调用方法时，Python会自动将对象本身作为第一个参数传递给`self`，我们只需要传递其他参数

**方法 vs 函数**：
- **方法**：定义在类中，第一个参数必须是`self`，通过对象调用
- **函数**：独立定义，无`self`参数，直接调用
- 本质区别在于上下文：方法操作的是对象的数据，函数操作的是传入的参数

### 5. 构造函数：对象的初始化

`__init__()`方法被称为**构造函数**（构造方法），它有几个关键特点：

```python
class BankAccount:
    def __init__(self, account_holder, initial_balance=0):
        """
        构造函数：初始化银行账户对象
        
        参数：
        - account_holder: 账户持有人姓名（必需）
        - initial_balance: 初始余额，默认为0（可选）
        """
        # 双下划线开头表示私有属性（私有化）
        self.__account_holder = account_holder  # 私有属性，外部不能直接访问
        self.__balance = initial_balance
        self.__account_number = self.__generate_account_number()
        
        print(f"账户创建成功！")
        print(f"户主：{self.__account_holder}")
        print(f"账户：{self.__account_number}")
        print(f"余额：{self.__balance}元")
    
    def __generate_account_number(self):
        # 私有方法：生成唯一的账户号码
        import random
        return f"6228{random.randint(100000000, 999999999)}"
    
    def deposit(self, amount):
        """存款方法"""
        if amount > 0:
            self.__balance += amount
            print(f"存款成功！当前余额：{self.__balance}元")
        else:
            print("存款金额必须大于0！")
    
    def withdraw(self, amount):
        """取款方法"""
        if amount > 0 and amount <= self.__balance:
            self.__balance -= amount
            print(f"取款成功！当前余额：{self.__balance}元")
        else:
            print("取款金额无效或余额不足！")
    
    def get_balance(self):
        """获取余额（公共接口）"""
        return self.__balance

# 创建账户对象
account1 = BankAccount("张三", 1000)  # 输出创建信息
account2 = BankAccount("李四")        # 使用默认余额0

# 操作账户
account1.deposit(500)    # 输出：存款成功！当前余额：1500元
account1.withdraw(200)   # 输出：取款成功！当前余额：1300元
print(f"账户余额：{account1.get_balance()}元")  # 输出：1300
```

**__init__()方法的特点**：
1. **自动调用**：创建对象时自动执行，无需手动调用
2. **初始化对象**：设置对象的初始状态和属性
3. **接受参数**：可以定义参数，在创建对象时传入
4. **只能有一个**：一个类只能有一个`__init__`方法（不能重载）
5. **前后双下划线**：注意是双下划线`__init__`，不是`_init_`或`init`

### 6. 实例化过程：一步步解析对象创建

当你执行`obj = ClassName(args)`时，Python背后发生了什么？

```python
class Person:
    def __init__(self, name, age):
        print(f"步骤2：构造函数被调用，self指向新创建的对象")
        self.name = name
        self.age = age
    
    def introduce(self):
        print(f"你好，我是{self.name}，今年{self.age}岁")

# 步骤分解：
print("步骤1：创建对象内存空间")
p = Person("王五", 25)  # Python执行的操作：
# 1. 在内存中分配空间创建一个新的Person对象
# 2. 自动将这个新对象的引用传递给__init__方法的self参数
# 3. 执行__init__方法中的代码，初始化对象属性
# 4. 返回创建好的对象，赋值给变量p

print("步骤3：对象创建完成，可以使用")
p.introduce()  # 输出：你好，我是王五，今年25岁
```

**完整实例化流程**：
1. **内存分配**：Python在内存中为对象分配空间
2. **对象创建**：创建一个该类的实例对象
3. **构造函数调用**：自动调用`__init__()`方法，将新对象作为`self`参数
4. **属性初始化**：执行构造函数中的代码，设置对象属性
5. **对象返回**：构造函数执行完毕，返回创建好的对象
6. **变量绑定**：将对象引用赋值给变量

### 7. 面向对象 vs 面向过程：思维转变

理解两种编程范式的区别，能帮助你更好地掌握OOP：

```python
# ========== 面向过程方式 ==========
# 处理学生数据的函数集合

def create_student_process(name, age):
    """创建学生数据"""
    student = {
        "name": name,
        "age": age,
        "grade": "大一"
    }
    return student

def study_process(student, hours):
    """学习函数"""
    student["grade"] = f"大二（学习{hours}小时）"
    return student

def introduce_process(student):
    """自我介绍函数"""
    print(f"面向过程：我是{student['name']}，{student['age']}岁，{student['grade']}")

# 使用面向过程方式
student_data = create_student_process("张三", 20)
student_data = study_process(student_data, 10)
introduce_process(student_data)  # 输出：面向过程：我是张三，20岁，大二（学习10小时）

# ========== 面向对象方式 ==========
# 学生类封装数据和行为

class StudentOOP:
    def __init__(self, name, age):
        self.name = name
        self.age = age
        self.grade = "大一"
    
    def study(self, hours):
        """学习方法：修改对象自身的状态"""
        self.grade = f"大二（学习{hours}小时）"
    
    def introduce(self):
        """自我介绍方法：使用对象自身的数据"""
        print(f"面向对象：我是{self.name}，{self.age}岁，{self.grade}")

# 使用面向对象方式
student_obj = StudentOOP("李四", 21)
student_obj.study(15)  # 直接操作对象，不需要传递和返回数据
student_obj.introduce()  # 输出：面向对象：我是李四，21岁，大二（学习15小时）
```

**两种范式的核心区别**：

| 方面 | 面向过程 | 面向对象 |
|------|---------|---------|
| **关注点** | 步骤和过程 | 对象和交互 |
| **数据状态** | 数据和操作分离 | 数据和操作封装在一起 |
| **代码复用** | 函数复用 | 类和继承复用 |
| **扩展性** | 修改函数逻辑 | 添加新类或扩展现有类 |
| **适合场景** | 简单脚本、数据处理 | 复杂系统、GUI、游戏、大型项目 |

## 第三部分：渐进式练习题

### 练习1：基础类定义与对象创建

**任务**：定义一个`Book`类，包含以下属性和方法：
- 属性：`title`（书名）、`author`（作者）、`pages`（页数）、`current_page`（当前阅读页，默认0）
- 方法：
  - `__init__(self, title, author, pages)`：初始化书本信息
  - `read(self, pages_to_read)`：阅读指定页数，更新当前页
  - `get_progress(self)`：返回阅读进度百分比
  - `bookmark(self)`：在控制台输出当前页作为书签

**要求**：创建两本不同的书，进行阅读操作，并查看进度。

```python
# 练习1答案：Book类定义与使用
class Book:
    def __init__(self, title, author, pages):
        """初始化书本信息"""
        self.title = title
        self.author = author
        self.pages = pages
        self.current_page = 0  # 默认从第0页开始
    
    def read(self, pages_to_read):
        """阅读指定页数"""
        if pages_to_read <= 0:
            print("阅读页数必须大于0！")
            return
        
        # 计算阅读后的页数
        new_page = self.current_page + pages_to_read
        
        # 检查是否超过总页数
        if new_page > self.pages:
            print(f"警告：本书只有{self.pages}页，已读到最后一页")
            self.current_page = self.pages
        else:
            self.current_page = new_page
        
        print(f"《{self.title}》已阅读{self.current_page}/{self.pages}页")
    
    def get_progress(self):
        """获取阅读进度"""
        if self.pages == 0:
            return 0
        return (self.current_page / self.pages) * 100
    
    def bookmark(self):
        """添加书签"""
        print(f"【书签】《{self.title}》当前阅读位置：第{self.current_page}页")

# 创建书本对象
book1 = Book("Python编程从入门到实践", "埃里克·马瑟斯", 459)
book2 = Book("机器学习实战", "Peter Harrington", 384)

# 进行阅读操作
print("=== 练习1：书本阅读操作 ===")
book1.read(50)  # 阅读50页
book1.read(30)  # 再阅读30页
book1.bookmark()  # 添加书签

book2.read(100)  # 阅读100页
book2.bookmark()  # 添加书签

# 查看进度
print(f"\n《{book1.title}》阅读进度：{book1.get_progress():.1f}%")
print(f"《{book2.title}》阅读进度：{book2.get_progress():.1f}%")
```

### 练习2：银行账户管理系统

**任务**：设计一个完整的`BankAccount`类，支持以下功能：
1. 开户：需要账户名和初始存款（默认0）
2. 存款：增加余额
3. 取款：减少余额（需检查余额是否充足）
4. 查询：返回当前余额
5. 转账：向另一个账户转账（需检查余额和账户有效性）
6. 显示账户信息：显示账户名、账户号、余额

**要求**：创建两个账户，进行存款、取款、转账等操作，验证所有功能。

```python
# 练习2答案：银行账户管理系统
import random

class BankAccount:
    def __init__(self, account_holder, initial_balance=0):
        """初始化银行账户"""
        self.account_holder = account_holder
        self.__balance = initial_balance  # 私有属性，外部不能直接修改
        self.account_number = self.__generate_account_number()
        
        print(f"账户创建成功！")
        print(f"户主：{self.account_holder}")
        print(f"账号：{self.account_number}")
        print(f"余额：{self.__balance}元")
        print("-" * 30)
    
    def __generate_account_number(self):
        """生成唯一账户号（私有方法）"""
        return f"6228{random.randint(100000000, 999999999)}"
    
    def deposit(self, amount):
        """存款"""
        if amount <= 0:
            print("存款金额必须大于0！")
            return False
        
        self.__balance += amount
        print(f"{self.account_holder}存款{amount}元成功！")
        self.show_balance()
        return True
    
    def withdraw(self, amount):
        """取款"""
        if amount <= 0:
            print("取款金额必须大于0！")
            return False
        
        if amount > self.__balance:
            print(f"余额不足！当前余额{self.__balance}元，无法取款{amount}元")
            return False
        
        self.__balance -= amount
        print(f"{self.account_holder}取款{amount}元成功！")
        self.show_balance()
        return True
    
    def transfer(self, target_account, amount):
        """向其他账户转账"""
        print(f"\n开始转账操作：")
        print(f"从：{self.account_holder}（{self.account_number}）")
        print(f"到：{target_account.account_holder}（{target_account.account_number}）")
        print(f"金额：{amount}元")
        
        # 检查目标账户有效性
        if not isinstance(target_account, BankAccount):
            print("错误：目标账户无效！")
            return False
        
        # 检查转账金额
        if amount <= 0:
            print("错误：转账金额必须大于0！")
            return False
        
        # 检查余额是否足够
        if amount > self.__balance:
            print(f"错误：余额不足！当前余额{self.__balance}元")
            return False
        
        # 执行转账
        self.__balance -= amount
        # 这里简化处理，实际中需要调用目标账户的存款方法
        target_account.__balance += amount
        
        print(f"转账成功！")
        print(f"您的余额：{self.__balance}元")
        print(f"对方余额：{target_account.__balance}元")
        return True
    
    def show_balance(self):
        """显示余额"""
        print(f"{self.account_holder}当前余额：{self.__balance}元")
        return self.__balance
    
    def show_account_info(self):
        """显示完整账户信息"""
        print("\n" + "=" * 40)
        print(f"账户信息")
        print("=" * 40)
        print(f"户主姓名：{self.account_holder}")
        print(f"账户号码：{self.account_number}")
        print(f"当前余额：{self.__balance}元")
        print("=" * 40)

# 创建账户并进行操作
print("=== 练习2：银行账户管理系统 ===")

# 创建两个账户
account1 = BankAccount("张三", 1000)
account2 = BankAccount("李四", 500)

# 存款操作
account1.deposit(500)
account2.deposit(300)

# 取款操作
account1.withdraw(200)
account2.withdraw(800)  # 这个应该失败，余额不足

# 转账操作
account1.transfer(account2, 300)

# 显示账户信息
account1.show_account_info()
account2.show_account_info()
```

### 练习3：游戏角色系统

**任务**：设计一个`GameCharacter`类，表示游戏中的角色，包含以下功能：
1. 属性：`name`（角色名）、`health`（生命值）、`attack_power`（攻击力）、`level`（等级，默认1）
2. 方法：
   - `__init__(self, name, health, attack_power)`：初始化角色
   - `attack(self, target)`：攻击目标角色，减少目标生命值
   - `take_damage(self, damage)`：受到伤害，减少自身生命值
   - `heal(self, amount)`：恢复生命值
   - `level_up(self)`：升级，提高生命值和攻击力
   - `is_alive(self)`：检查是否存活
   - `display_status(self)`：显示角色状态

**要求**：创建两个角色，进行战斗模拟，包括攻击、升级、治疗等操作。

```python
# 练习3答案：游戏角色系统
class GameCharacter:
    def __init__(self, name, health=100, attack_power=10):
        """初始化游戏角色"""
        self.name = name
        self.max_health = health
        self.health = health
        self.attack_power = attack_power
        self.level = 1
        print(f"角色【{self.name}】创建成功！生命值：{self.health}，攻击力：{self.attack_power}")
    
    def attack(self, target):
        """攻击目标角色"""
        if not target.is_alive():
            print(f"{target.name}已经倒下，无法攻击！")
            return False
        
        print(f"【{self.name}】攻击【{target.name}】，造成{self.attack_power}点伤害！")
        target.take_damage(self.attack_power)
        return True
    
    def take_damage(self, damage):
        """受到伤害"""
        if damage <= 0:
            return
        
        self.health -= damage
        if self.health < 0:
            self.health = 0
        
        print(f"【{self.name}】受到{damage}点伤害，剩余生命：{self.health}/{self.max_health}")
        
        if not self.is_alive():
            print(f"【{self.name}】已倒下！")
    
    def heal(self, amount):
        """恢复生命值"""
        if amount <= 0:
            print("治疗量必须大于0！")
            return False
        
        old_health = self.health
        self.health += amount
        
        # 不能超过最大生命值
        if self.health > self.max_health:
            self.health = self.max_health
        
        actual_heal = self.health - old_health
        print(f"【{self.name}】恢复{actual_heal}点生命，当前生命：{self.health}/{self.max_health}")
        return True
    
    def level_up(self):
        """升级角色"""
        self.level += 1
        self.max_health += 20
        self.health = self.max_health  # 升级时恢复全部生命
        self.attack_power += 5
        
        print(f"✨【{self.name}】升级到{self.level}级！")
        print(f"   最大生命：{self.max_health} (+20)")
        print(f"   攻击力：{self.attack_power} (+5)")
        print(f"   生命值已完全恢复！")
    
    def is_alive(self):
        """检查是否存活"""
        return self.health > 0
    
    def display_status(self):
        """显示角色状态"""
        status = "存活" if self.is_alive() else "阵亡"
        print(f"\n角色：{self.name}")
        print(f"等级：{self.level}")
        print(f"状态：{status}")
        print(f"生命值：{self.health}/{self.max_health}")
        print(f"攻击力：{self.attack_power}")
        print("-" * 30)

# 游戏战斗模拟
print("=== 练习3：游戏角色战斗模拟 ===")

# 创建两个角色
warrior = GameCharacter("战士亚瑟", health=150, attack_power=15)
mage = GameCharacter("法师梅林", health=80, attack_power=25)

# 显示初始状态
warrior.display_status()
mage.display_status()

# 第一轮战斗
print("\n=== 第一轮战斗开始 ===")
warrior.attack(mage)  # 战士攻击法师
mage.attack(warrior)  # 法师攻击战士

# 法师治疗自己
print("\n=== 法师进行治疗 ===")
mage.heal(30)

# 战士升级
print("\n=== 战士升级 ===")
warrior.level_up()

# 第二轮战斗
print("\n=== 第二轮战斗开始 ===")
warrior.attack(mage)
mage.attack(warrior)

# 显示最终状态
print("\n=== 战斗结束，最终状态 ===")
warrior.display_status()
mage.display_status()
```

### 练习4：过程式与面向对象对比

**任务**：使用面向过程方式和面向对象方式分别实现一个简单的学生成绩管理系统，对比两者的实现差异。

**系统功能**：
1. 添加学生：姓名、学号、成绩
2. 查询学生：按学号查询
3. 更新成绩：修改学生成绩
4. 计算平均分：计算所有学生的平均成绩

```python
# 练习4答案：过程式与面向对象对比
print("=== 练习4：过程式 vs 面向对象对比 ===")

# ========== 面向过程方式实现 ==========
print("\n1. 面向过程方式实现：")

# 全局数据结构（数据与操作分离）
students_list = []  # 存储学生数据的列表

def add_student_proc(name, student_id, score):
    """添加学生"""
    student = {
        "name": name,
        "id": student_id,
        "score": score
    }
    students_list.append(student)
    print(f"添加学生：{name}（学号：{student_id}，成绩：{score}）")

def find_student_proc(student_id):
    """查找学生"""
    for student in students_list:
        if student["id"] == student_id:
            return student
    return None

def update_score_proc(student_id, new_score):
    """更新成绩"""
    student = find_student_proc(student_id)
    if student:
        old_score = student["score"]
        student["score"] = new_score
        print(f"更新成绩：{student['name']}，{old_score} → {new_score}")
        return True
    else:
        print(f"找不到学号为{student_id}的学生")
        return False

def calculate_average_proc():
    """计算平均分"""
    if not students_list:
        return 0
    
    total = sum(student["score"] for student in students_list)
    average = total / len(students_list)
    print(f"平均分：{average:.1f}")
    return average

# 使用面向过程方式
add_student_proc("张三", "2023001", 85)
add_student_proc("李四", "2023002", 92)
add_student_proc("王五", "2023003", 78)

find_result = find_student_proc("2023002")
if find_result:
    print(f"查询结果：{find_result['name']}，成绩：{find_result['score']}")

update_score_proc("2023001", 90)
calculate_average_proc()

# ========== 面向对象方式实现 ==========
print("\n" + "="*50)
print("2. 面向对象方式实现：")

class Student:
    def __init__(self, name, student_id, score):
        """初始化学生对象"""
        self.name = name
        self.id = student_id
        self.score = score
    
    def update_score(self, new_score):
        """更新成绩"""
        old_score = self.score
        self.score = new_score
        print(f"更新成绩：{self.name}，{old_score} → {new_score}")
    
    def display_info(self):
        """显示学生信息"""
        return f"{self.name}（学号：{self.id}，成绩：{self.score}）"

class StudentManager:
    def __init__(self):
        """初始化学生管理器"""
        self.students = {}  # 使用字典存储，key为学号
    
    def add_student(self, name, student_id, score):
        """添加学生"""
        student = Student(name, student_id, score)
        self.students[student_id] = student
        print(f"添加学生：{name}（学号：{student_id}，成绩：{score}）")
    
    def find_student(self, student_id):
        """查找学生"""
        return self.students.get(student_id)
    
    def update_score(self, student_id, new_score):
        """更新成绩"""
        student = self.find_student(student_id)
        if student:
            student.update_score(new_score)
            return True
        else:
            print(f"找不到学号为{student_id}的学生")
            return False
    
    def calculate_average(self):
        """计算平均分"""
        if not self.students:
            return 0
        
        total = sum(student.score for student in self.students.values())
        average = total / len(self.students)
        print(f"平均分：{average:.1f}")
        return average
    
    def display_all_students(self):
        """显示所有学生"""
        print("\n所有学生信息：")
        for student_id, student in self.students.items():
            print(f"  {student.display_info()}")

# 使用面向对象方式
manager = StudentManager()

manager.add_student("张三", "2023001", 85)
manager.add_student("李四", "2023002", 92)
manager.add_student("王五", "2023003", 78)

found_student = manager.find_student("2023002")
if found_student:
    print(f"查询结果：{found_student.name}，成绩：{found_student.score}")

manager.update_score("2023001", 90)
manager.calculate_average()
manager.display_all_students()

# ========== 对比分析 ==========
print("\n" + "="*50)
print("对比分析总结：")

print("""
【面向过程方式的优缺点】
优点：
1. 简单直接，适合小型脚本和数据处理
2. 逻辑清晰，按步骤执行
3. 调试相对容易

缺点：
1. 数据和操作分离，状态管理复杂
2. 代码复用性差
3. 扩展困难，添加新功能需要修改多处
4. 不适合大型项目

【面向对象方式的优缺点】
优点：
1. 数据与操作封装，状态管理简单
2. 代码复用性高（通过继承）
3. 扩展容易，添加新类即可
4. 适合大型复杂项目
5. 更贴近现实世界思维

缺点：
1. 学习曲线较陡
2. 简单问题可能过度设计
3. 性能开销稍大（通常可忽略）

【学习建议】
1. 从小项目开始实践OOP思维
2. 理解类与对象的关系是关键
3. 掌握封装、继承、多态三大特性
4. 在实际项目中体会OOP的优势
""")
```

## 第四部分：学习卡片

### 1. 核心收获（今日学习要点总结）

1. **面向对象编程思想**：将现实世界的事物抽象为程序中的对象，包含属性（特征）和方法（行为）

2. **类与对象的关系**：
   - **类**：对象的模板或蓝图，使用`class`关键字定义
   - **对象**：类的具体实例，通过`类名()`创建
   - 一个类可以创建多个独立的对象

3. **属性分类**：
   - **类属性**：类级别的特征，所有对象共享
   - **实例属性**：对象独有的特征，在`__init__`中初始化
   - 重要区别：类属性通过`类名.属性`访问，实例属性通过`对象.属性`访问

4. **方法定义与使用**：
   - **实例方法**：第一个参数必须是`self`，代表当前对象
   - `self`的作用：访问对象属性，调用其他方法
   - 方法调用：Python自动传递`self`参数

5. **构造函数__init__()**：
   - 对象创建时自动调用
   - 用于初始化对象属性
   - 可以接受参数设置初始状态

6. **实例化过程**：内存分配 → 对象创建 → 构造函数调用 → 属性初始化 → 对象返回

7. **面向对象 vs 面向过程**：
   - 面向过程：关注步骤和过程，数据与操作分离
   - 面向对象：关注对象和交互，数据与操作封装
   - OOP适合复杂系统，扩展性和维护性更好

### 2. 疑问收集（记录学习中遇到的困惑）

请在学习过程中记录以下方面的疑问：

1. **self理解**：`self`参数什么时候需要写？为什么在方法内部访问属性要加`self`前缀？

2. **属性访问**：什么时候用类属性，什么时候用实例属性？它们会互相影响吗？

3. **方法设计**：一个类的方法应该设计多少？如何划分方法的职责？

4. **对象关系**：多个对象之间如何通信和交互？对象之间应该有怎样的关系？

5. **命名规范**：除了PascalCase类名，还有哪些OOP命名约定需要遵守？

6. **私有属性**：为什么需要私有属性和方法？它们如何实现数据封装？

7. **实际应用**：在AI项目中，哪些部分适合用面向对象思想设计？

### 3. 感悟引导（连接理论与实际应用）

**思考题**：面向对象编程如何帮助你在AI项目中构建更健壮、可扩展的系统？

**引导思路**：

1. **模块化设计**：面向对象允许你将复杂AI系统拆分为多个独立的类
   - 数据预处理类：封装数据清洗、特征工程逻辑
   - 模型类：封装模型定义、训练、保存功能
   - 评估类：封装评估指标计算和可视化

2. **代码复用**：通过继承和多态，复用已有代码
   - 基础模型类：定义通用训练和评估接口
   - 具体模型类：继承基础类，实现特定算法
   - 避免重复代码，提高开发效率

3. **状态管理**：面向对象简化了复杂状态的管理
   - 模型状态：训练进度、参数、评估结果
   - 实验状态：配置、超参数、实验结果
   - 数据状态：原始数据、处理后的数据、特征

4. **团队协作**：面向对象促进团队协作开发
   - 清晰接口：类的方法定义了明确的输入输出
   - 分工明确：不同开发者负责不同类的实现
   - 易于集成：通过对象交互组合功能

5. **AI项目实践建议**：
   - 从简单类开始：先设计数据加载类和基础模型类
   - 逐步扩展：添加预处理类、评估类、可视化类
   - 实践重构：将已有脚本重构为面向对象结构
   - 学习开源：研究TensorFlow、PyTorch等框架的OOP设计

**今日行动建议**：
1. 按照视频教程完成面向对象基础的概念学习
2. 动手实现今天练习中的所有代码示例
3. 尝试将之前编写的某个数据处理脚本重构为类
4. 思考在未来的AI项目中如何应用面向对象思想

**明日预告**：明天我们将继续学习面向对象基础（下），深入理解继承、多态和封装三大特性，掌握如何构建更复杂的对象关系，为实际项目开发做好准备。