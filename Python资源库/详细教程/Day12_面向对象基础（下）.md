---
title: Day 12：面向对象基础（下）
tags: [python, 面向对象, 继承, 多态, 魔法方法]
aliases: ["Day12"]
date: 2026-02-22
---

# Day 12：面向对象基础（下）

> 相关链接：[[Day11_面向对象基础（上）]] | [[Day13_综合项目实战]] | [[Python学习大纲]]

欢迎来到Python学习的第十二天！昨天我们学习了面向对象编程的基础——类与对象、属性和方法。今天我们将深入探讨面向对象编程的三大核心特性：继承、多态，以及Python中强大的特殊方法（魔法方法）。掌握这些高级特性，你才能真正写出可复用、可扩展的Python代码，为构建复杂AI系统奠定坚实基础。

## 第一部分：最新视频教程推荐

为了让你直观地学习面向对象高级特性，我为你筛选了2025-2026年发布的最新Python面向对象高级教程。这些教程重点讲解继承、多态和特殊方法，采用最新Python语法，讲解风格通俗易懂，特别适合零基础学员。

### 1. 黑马程序员 - 面向对象编程高级特性（2026版第十章）
- **链接**：https://www.bilibili.com/video/BV1qW4y1a7fU/（第10章继承与多态部分）
- **重点内容**：系统讲解单继承、方法重写、super()函数、多继承、菱形继承问题、方法解析顺序（MRO）、多态原理与实现
- **适合人群**：希望系统掌握OOP高级特性，理解Python多继承机制的学员
- **核心特点**：
  - 采用Python 3.13+最新语法特性，贴近实际项目开发场景
  - 每集20-25分钟，知识点分解细致，配合丰富商业案例（如电商系统、支付系统）
  - 突出强调继承的"is-a"关系语义，避免滥用多继承
  - 涵盖MRO算法原理、super()调用链等高级话题解析

### 2. 小甲鱼《零基础入门学习Python》 - OOP高级特性（2026版第23章）
- **链接**：https://www.bilibili.com/tutorials/py-oop-advanced
- **重点内容**：继承体系设计、方法重写实战、多态应用场景、特殊方法（__str__、__len__等）详解
- **适合人群**：喜欢趣味案例教学，希望通过生动故事理解抽象概念的学员
- **核心特点**：
  - 教学风格幽默风趣，将复杂OOP概念转化为动物王国、游戏角色等生动案例
  - 通过警犬工作系统、水果计价系统等实际项目演示多态的强大之处
  - 配套课后练习丰富，支持在线提交和即时反馈
  - 社区学习氛围浓厚，有大量学习伙伴互相交流OOP高级特性困惑

### 3. 莫烦Python - 高级面向对象编程技巧（2025最新版）
- **链接**：https://mofanpy.com/tutorials/python-basic/interactive-python/oop-advanced
- **学习方式**：交互式学习网站，边学边练，即时查看代码效果
- **适合人群**：喜欢互动式学习，希望即时验证继承、多态概念的学员
- **核心特点**：
  - 每个高级OOP概念都有可运行的代码示例，可直接在浏览器中编辑调试
  - 涵盖多继承MRO、特殊方法重载、鸭子类型、抽象基类等完整内容
  - 界面简洁直观，支持在线调试复杂继承体系的对象行为
  - 通过向量运算类、支付策略模式等高级案例演示OOP设计思想

### 学习建议
- **今日首选**：建议先观看黑马程序人的第十章前四集（约80分钟），系统理解继承、方法重写、super()和多态的核心概念
- **互动练习**：学习过程中可使用莫烦Python的交互式网站进行实操，即时验证复杂继承体系的MRO顺序和特殊方法效果
- **巩固拓展**：完成今日练习题后，可参考小甲鱼的警犬工作系统案例进行趣味练习，深入理解多态在实际项目中的应用价值

## 第二部分：核心概念详解

### 1. 继承：代码的"基因传承"

继承是面向对象编程最强大的特性之一，它允许我们基于已有的类创建新类，从而实现代码复用。继承体现了"is-a"关系：如果类B继承自类A，那么"B是A的一种"。

#### 单继承基础语法

```python
# 父类（基类/超类）
class Animal:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def eat(self):
        print(f"{self.name}正在吃东西...")
    
    def sleep(self):
        print(f"{self.name}正在睡觉...")

# 子类（派生类）继承Animal
class Dog(Animal):  # 注意：Dog类名后的括号中写父类名
    def __init__(self, name, age, breed):
        # 调用父类的构造方法初始化共有属性
        super().__init__(name, age)  # 使用super()函数调用父类方法
        # 添加子类独有的属性
        self.breed = breed
        self.tricks = []  # 狗狗会的技能列表
    
    # 子类新增方法
    def bark(self):
        print(f"{self.name}：汪汪！")
    
    def learn_trick(self, trick_name):
        self.tricks.append(trick_name)
        print(f"{self.name}学会了新技能：{trick_name}")
    
    # 重写父类方法（Override）
    def eat(self):
        print(f"{self.name}正在啃骨头...")  # 狗吃骨头，不同于一般动物

# 创建子类对象
my_dog = Dog("旺财", 3, "金毛")
print(f"狗狗名字：{my_dog.name}")      # 继承自父类的属性
print(f"狗狗年龄：{my_dog.age}岁")      # 继承自父类的属性
print(f"狗狗品种：{my_dog.breed}")      # 子类独有的属性

my_dog.eat()    # 输出：旺财正在啃骨头...（调用重写后的方法）
my_dog.sleep()  # 输出：旺财正在睡觉...（调用继承的方法）
my_dog.bark()   # 输出：旺财：汪汪！（调用子类新增方法）
```

#### super()函数详解

`super()`函数是Python中调用父类方法的标准方式，它有两大优势：

1. **避免硬编码父类名**：如果父类名改变，使用`super()`的代码无需修改
2. **正确处理多继承**：`super()`会按照MRO顺序调用父类方法，避免重复调用

```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
        print(f"Person初始化完成：{self.name}")
    
    def introduce(self):
        return f"我是{self.name}，今年{self.age}岁"

class Student(Person):
    def __init__(self, name, age, student_id):
        # 调用父类Person的__init__方法
        super().__init__(name, age)
        self.student_id = student_id
        print(f"Student初始化完成，学号：{self.student_id}")
    
    # 重写父类方法，并扩展功能
    def introduce(self):
        # 先调用父类的introduce方法获取基础信息
        base_info = super().introduce()
        # 在基础信息上添加学生特有信息
        return f"{base_info}，我的学号是{self.student_id}"

# 创建学生对象
student = Student("张三", 20, "2023001")
print(student.introduce())  # 输出：我是张三，今年20岁，我的学号是2023001
```

### 2. 方法重写（Override）：定制化行为

方法重写是子类重新定义父类已有方法的行为，以满足子类的特殊需求。重写时，子类方法的名称和参数列表必须与父类方法相同。

```python
class Shape:
    def __init__(self, color):
        self.color = color
    
    def area(self):
        """计算面积（父类定义抽象接口）"""
        raise NotImplementedError("子类必须实现area方法")
    
    def describe(self):
        return f"这是一个{self.color}的图形"

class Rectangle(Shape):
    def __init__(self, color, width, height):
        super().__init__(color)
        self.width = width
        self.height = height
    
    # 重写area方法，实现矩形面积计算
    def area(self):
        return self.width * self.height
    
    # 重写describe方法，添加矩形特有信息
    def describe(self):
        base_description = super().describe()
        return f"{base_description}，矩形（宽{self.width}，高{self.height}）"

class Circle(Shape):
    def __init__(self, color, radius):
        super().__init__(color)
        self.radius = radius
    
    # 重写area方法，实现圆形面积计算
    def area(self):
        import math
        return math.pi * self.radius ** 2
    
    # 重写describe方法，添加圆形特有信息
    def describe(self):
        base_description = super().describe()
        return f"{base_description}，圆形（半径{self.radius}）"

# 创建不同形状对象
rect = Rectangle("红色", 5, 3)
circle = Circle("蓝色", 4)

print(rect.describe())    # 输出：这是一个红色的图形，矩形（宽5，高3）
print(f"矩形面积：{rect.area()}")  # 输出：矩形面积：15

print(circle.describe())  # 输出：这是一个蓝色的图形，圆形（半径4）
print(f"圆形面积：{circle.area():.2f}")  # 输出：圆形面积：50.27
```

### 3. 多继承：融合多方"血脉"

Python支持多继承，即一个子类可以同时继承多个父类。多继承功能强大，但也容易引发"菱形继承"问题，需要谨慎使用。

```python
class Flyable:
    def fly(self):
        print(f"{self.name}正在飞行 ✈️")
    
    def land(self):
        print(f"{self.name}安全着陆")

class Swimmable:
    def swim(self):
        print(f"{self.name}正在游泳 🏊")
    
    def dive(self):
        print(f"{self.name}潜入水中")

class Runnable:
    def run(self):
        print(f"{self.name}正在奔跑 🏃")
    
    def jump(self):
        print(f"{self.name}跳了起来")

# 多继承：水陆空三栖机器人
class Transformer(Flyable, Swimmable, Runnable):
    def __init__(self, name):
        self.name = name
        self.mode = "机器人形态"  # 默认形态
    
    def transform(self, new_mode):
        self.mode = new_mode
        print(f"{self.name}变形为：{self.mode}")
    
    def display_abilities(self):
        print(f"\n{self.name}的能力展示：")
        print(f"当前形态：{self.mode}")
        self.fly()
        self.swim()
        self.run()

# 创建变形金刚对象
optimus = Transformer("擎天柱")
optimus.display_abilities()
optimus.transform("战斗机形态")
optimus.display_abilities()
```

#### 方法解析顺序（MRO）与菱形继承

多继承可能引发菱形继承问题（多个父类继承自同一基类）。Python使用C3算法确定方法解析顺序（MRO），可通过`__mro__`属性查看。

```python
class A:
    def show(self):
        print("A")

class B(A):
    def show(self):
        print("B")

class C(A):
    def show(self):
        print("C")

class D(B, C):
    pass

# 查看MRO顺序
print("D类的MRO顺序：", D.__mro__)
# 输出：(<class '__main__.D'>, <class '__main__.B'>, <class '__main__.C'>, <class '__main__.A'>, <class 'object'>)

d = D()
d.show()  # 输出：B（按照MRO顺序查找）
```

**MRO规则**：
1. 子类优先于父类
2. 同一层级的父类按继承顺序排序
3. 保留父类的MRO顺序

### 4. 多态：同一接口，不同实现

多态是面向对象编程的核心思想之一，它允许不同类的对象对同一消息做出不同的响应。在Python中，多态通过"鸭子类型"实现：如果一个对象走路像鸭子、叫声像鸭子，那么它就可以被当作鸭子使用。

```python
# 定义统一接口（通过抽象类）
from abc import ABC, abstractmethod

class Payment(ABC):
    """支付接口（抽象基类）"""
    @abstractmethod
    def pay(self, amount):
        """支付方法，子类必须实现"""
        pass
    
    @abstractmethod
    def refund(self, amount):
        """退款方法，子类必须实现"""
        pass

# 具体支付方式实现
class Alipay(Payment):
    def pay(self, amount):
        print(f"支付宝支付成功：¥{amount}")
        return f"支付宝交易号：AL{hash(str(amount))}"
    
    def refund(self, amount):
        print(f"支付宝退款成功：¥{amount}")
        return f"支付宝退款单号：REF{hash(str(amount))}"

class WechatPay(Payment):
    def pay(self, amount):
        print(f"微信支付成功：¥{amount}")
        return f"微信交易号：WX{hash(str(amount))}"
    
    def refund(self, amount):
        print(f"微信退款成功：¥{amount}")
        return f"微信退款单号：REF{hash(str(amount))}"

class BankCard(Payment):
    def pay(self, amount):
        print(f"银行卡支付成功：¥{amount}")
        return f"银行卡交易号：BK{hash(str(amount))}"
    
    def refund(self, amount):
        print(f"银行卡退款成功：¥{amount}")
        return f"银行卡退款单号：REF{hash(str(amount))}"

# 支付中心（统一接口调用）
class PaymentCenter:
    def process_payment(self, payment_method, amount):
        """处理支付，不关心具体支付方式"""
        print(f"开始处理支付，金额：¥{amount}")
        transaction_id = payment_method.pay(amount)
        print(f"支付处理完成，交易ID：{transaction_id}")
        return transaction_id
    
    def process_refund(self, payment_method, amount):
        """处理退款，不关心具体支付方式"""
        print(f"开始处理退款，金额：¥{amount}")
        refund_id = payment_method.refund(amount)
        print(f"退款处理完成，退款ID：{refund_id}")
        return refund_id

# 使用多态处理不同支付方式
center = PaymentCenter()

# 创建不同支付方式对象
alipay = Alipay()
wechat = WechatPay()
bankcard = BankCard()

# 统一接口调用，不同实现效果
print("=== 支付宝支付 ===")
center.process_payment(alipay, 199.99)

print("\n=== 微信支付 ===")
center.process_payment(wechat, 88.50)

print("\n=== 银行卡支付 ===")
center.process_payment(bankcard, 500.00)

# 多态的强大之处：新增支付方式无需修改PaymentCenter代码
class CryptoPayment(Payment):
    def pay(self, amount):
        print(f"加密货币支付成功：¥{amount} (BTC)")
        return f"区块链交易哈希：{hash(str(amount) + 'crypto')}"
    
    def refund(self, amount):
        print(f"加密货币退款成功：¥{amount}")
        return f"区块链退款哈希：{hash(str(amount) + 'refund')}"

print("\n=== 新增加密货币支付（无需修改PaymentCenter）===")
crypto = CryptoPayment()
center.process_payment(crypto, 1000.00)
```

**鸭子类型的实际应用**：

```python
# 鸭子类型示例：文件类接口
class File:
    def read(self):
        return "文件内容"
    
    def write(self, content):
        print(f"写入内容：{content}")

class NetworkStream:
    def read(self):
        return "网络数据流"
    
    def write(self, content):
        print(f"发送数据：{content}")

class DatabaseConnection:
    def read(self):
        return "数据库查询结果"
    
    def write(self, content):
        print(f"存入数据库：{content}")

# 统一处理函数，不关心具体类型
def process_data_source(source):
    """处理数据源，只要它有read()和write()方法"""
    data = source.read()
    print(f"读取数据：{data}")
    source.write(f"处理后的数据：{data.upper()}")

# 可以处理不同类型的对象
file = File()
stream = NetworkStream()
db = DatabaseConnection()

print("处理文件：")
process_data_source(file)

print("\n处理网络流：")
process_data_source(stream)

print("\n处理数据库：")
process_data_source(db)
```

### 5. 特殊方法（魔法方法）：自定义对象行为

Python的特殊方法（魔法方法）以双下划线开头和结尾，如`__str__`、`__len__`、`__add__`等。它们允许我们自定义类的行为，使自定义类型表现得像内置类型。

#### __str__() 与 __repr__()

```python
class Student:
    def __init__(self, name, student_id, score):
        self.name = name
        self.student_id = student_id
        self.score = score
    
    def __str__(self):
        """用户友好的字符串表示，用于print()和str()"""
        return f"学生：{self.name}（学号：{self.student_id}，成绩：{self.score}分）"
    
    def __repr__(self):
        """开发者友好的字符串表示，用于调试和repr()"""
        return f"Student('{self.name}', '{self.student_id}', {self.score})"

# 创建学生对象
stu = Student("李华", "2023001", 92.5)

print(str(stu))    # 输出：学生：李华（学号：2023001，成绩：92.5分）
print(repr(stu))   # 输出：Student('李华', '2023001', 92.5)

# 交互式环境中直接输入变量名会调用__repr__
# >>> stu
# Student('李华', '2023001', 92.5)
```

**两者区别**：
- `__str__()`：面向用户，追求可读性和友好性
- `__repr__()`：面向开发者，追求准确性和可调试性，应尽量返回能重建对象的表达式

#### __len__() 与 __getitem__()

```python
class Playlist:
    def __init__(self, name):
        self.name = name
        self.songs = []
    
    def add_song(self, song):
        self.songs.append(song)
        print(f"添加歌曲：{song}")
    
    def __len__(self):
        """返回播放列表中的歌曲数量"""
        return len(self.songs)
    
    def __getitem__(self, index):
        """支持索引访问和切片"""
        if isinstance(index, slice):
            # 切片操作
            return self.songs[index.start:index.stop:index.step]
        else:
            # 索引访问
            return self.songs[index]
    
    def __str__(self):
        song_list = "\n".join([f"{i+1}. {song}" for i, song in enumerate(self.songs)])
        return f"播放列表《{self.name}》\n{song_list}"

# 创建播放列表
my_playlist = Playlist("学习专用")
my_playlist.add_song("安静 - 周杰伦")
my_playlist.add_song("夜的钢琴曲 - 石进")
my_playlist.add_song("卡农 - 帕赫贝尔")
my_playlist.add_song("天空之城 - 久石让")

print(my_playlist)
print(f"播放列表长度：{len(my_playlist)}首")  # 输出：4首

# 支持索引访问
print(f"第一首歌：{my_playlist[0]}")  # 输出：安静 - 周杰伦

# 支持切片
print(f"前两首歌：{my_playlist[0:2]}")  # 输出：['安静 - 周杰伦', '夜的钢琴曲 - 石进']

# 支持for循环（因为实现了__getitem__）
print("\n播放列表内容：")
for song in my_playlist:
    print(f"  - {song}")
```

#### 其他常用特殊方法

```python
class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def __add__(self, other):
        """重载 + 运算符：向量加法"""
        if isinstance(other, Vector):
            return Vector(self.x + other.x, self.y + other.y)
        else:
            raise TypeError("只能与Vector类型相加")
    
    def __sub__(self, other):
        """重载 - 运算符：向量减法"""
        return Vector(self.x - other.x, self.y - other.y)
    
    def __mul__(self, scalar):
        """重载 * 运算符：向量数乘"""
        return Vector(self.x * scalar, self.y * scalar)
    
    def __eq__(self, other):
        """重载 == 运算符：向量相等比较"""
        if isinstance(other, Vector):
            return self.x == other.x and self.y == other.y
        return False
    
    def __str__(self):
        return f"Vector({self.x}, {self.y})"
    
    def __repr__(self):
        return f"Vector({self.x}, {self.y})"

# 向量运算示例
v1 = Vector(2, 3)
v2 = Vector(4, 5)

print(f"v1 = {v1}")
print(f"v2 = {v2}")
print(f"v1 + v2 = {v1 + v2}")  # 输出：Vector(6, 8)
print(f"v2 - v1 = {v2 - v1}")  # 输出：Vector(2, 2)
print(f"v1 * 3 = {v1 * 3}")    # 输出：Vector(6, 9)
print(f"v1 == v2: {v1 == v2}") # 输出：False
```

### 6. 属性访问控制：保护数据安全

Python通过命名约定实现属性访问控制，虽然没有严格意义上的私有属性，但通过约定可以有效保护数据。

```python
class BankAccount:
    def __init__(self, account_holder, initial_balance=0):
        # 公开属性：账户持有人姓名
        self.account_holder = account_holder
        
        # 保护属性（单下划线开头）：建议外部不要直接访问
        self._balance = initial_balance  # 余额（保护属性）
        self._transaction_count = 0      # 交易次数（保护属性）
        
        # 私有属性（双下划线开头）：Python会进行名称改写
        self.__account_number = self.__generate_account_number()
        
        print(f"账户创建成功！户主：{self.account_holder}，账号：{self.__account_number}")
    
    def __generate_account_number(self):
        """私有方法：生成唯一的账户号码"""
        import random
        return f"6228{random.randint(100000000, 999999999)}"
    
    # 属性装饰器：提供受控的访问接口
    @property
    def balance(self):
        """获取余额（只读属性）"""
        return self._balance
    
    @property
    def transaction_count(self):
        """获取交易次数（只读属性）"""
        return self._transaction_count
    
    def deposit(self, amount):
        """存款方法"""
        if amount <= 0:
            print("存款金额必须大于0！")
            return False
        
        self._balance += amount
        self._transaction_count += 1
        print(f"存款成功！当前余额：¥{self._balance}")
        return True
    
    def withdraw(self, amount):
        """取款方法"""
        if amount <= 0:
            print("取款金额必须大于0！")
            return False
        
        if amount > self._balance:
            print(f"余额不足！当前余额：¥{self._balance}")
            return False
        
        self._balance -= amount
        self._transaction_count += 1
        print(f"取款成功！当前余额：¥{self._balance}")
        return True
    
    def transfer(self, target_account, amount):
        """转账方法"""
        if not isinstance(target_account, BankAccount):
            print("目标账户无效！")
            return False
        
        print(f"\n开始转账：")
        print(f"从：{self.account_holder}（{self.__account_number}）")
        print(f"到：{target_account.account_holder}（{target_account.__account_number}）")
        print(f"金额：¥{amount}")
        
        # 检查余额
        if amount > self._balance:
            print(f"错误：余额不足！当前余额：¥{self._balance}")
            return False
        
        # 执行转账
        if self.withdraw(amount):
            target_account.deposit(amount)
            print(f"转账成功！")
            return True
        
        return False

# 使用银行账户
account1 = BankAccount("张三", 1000)
account2 = BankAccount("李四", 500)

# 通过属性访问器获取余额（安全）
print(f"张三余额：¥{account1.balance}")
print(f"交易次数：{account1.transaction_count}")

# 尝试直接访问私有属性（会被Python名称改写）
try:
    print(account1.__account_number)  # 会报错：AttributeError
except AttributeError as e:
    print(f"无法直接访问私有属性：{e}")

# 实际名称（可通过名称改写后的名称访问，但不推荐）
print(f"实际属性名：{account1._BankAccount__account_number}")

# 进行转账
account1.transfer(account2, 300)
print(f"转账后张三余额：¥{account1.balance}")
print(f"转账后李四余额：¥{account2.balance}")
```

**访问控制总结**：
1. **公开属性**：无下划线开头，如`name`，可以任意访问
2. **保护属性**：单下划线开头，如`_balance`，约定外部不直接访问，但Python不阻止
3. **私有属性**：双下划线开头，如`__account_number`，Python会进行名称改写（name mangling），外部不能直接访问
4. **属性装饰器**：使用`@property`创建安全的访问接口

## 第三部分：渐进式练习题

### 练习1：基础继承与多态

**任务**：创建一个`Vehicle`（交通工具）父类和两个子类`Car`（汽车）和`Bicycle`（自行车），实现以下功能：

1. `Vehicle`类包含属性：`brand`（品牌）、`max_speed`（最高速度）、`current_speed`（当前速度，默认0）
2. `Vehicle`类包含方法：
   - `__init__(self, brand, max_speed)`：初始化交通工具
   - `accelerate(self, increment)`：加速，但不能超过最高速度
   - `brake(self, decrement)`：减速，但不能低于0
   - `display_info(self)`：显示交通工具信息
3. `Car`类继承`Vehicle`，新增属性：`fuel_capacity`（油箱容量，单位升）
4. `Bicycle`类继承`Vehicle`，新增属性：`has_basket`（是否有车篮，布尔值）
5. 在子类中重写`display_info()`方法，添加各自特有的信息

**要求**：创建汽车和自行车对象，进行加速、减速操作，并显示信息。

```python
# 练习1答案：基础继承与多态
class Vehicle:
    def __init__(self, brand, max_speed):
        self.brand = brand
        self.max_speed = max_speed
        self.current_speed = 0
        print(f"{self.brand}交通工具创建成功，最高速度：{max_speed}km/h")
    
    def accelerate(self, increment):
        if increment <= 0:
            print("加速增量必须大于0！")
            return False
        
        new_speed = self.current_speed + increment
        if new_speed > self.max_speed:
            print(f"警告：超过最高速度！将速度设置为最高速度{self.max_speed}km/h")
            self.current_speed = self.max_speed
        else:
            self.current_speed = new_speed
        
        print(f"{self.brand}加速到{self.current_speed}km/h")
        return True
    
    def brake(self, decrement):
        if decrement <= 0:
            print("减速量必须大于0！")
            return False
        
        new_speed = self.current_speed - decrement
        if new_speed < 0:
            print(f"警告：速度不能为负！将速度设置为0km/h")
            self.current_speed = 0
        else:
            self.current_speed = new_speed
        
        print(f"{self.brand}减速到{self.current_speed}km/h")
        return True
    
    def display_info(self):
        print(f"\n交通工具信息：")
        print(f"  品牌：{self.brand}")
        print(f"  最高速度：{self.max_speed}km/h")
        print(f"  当前速度：{self.current_speed}km/h")


class Car(Vehicle):
    def __init__(self, brand, max_speed, fuel_capacity):
        super().__init__(brand, max_speed)
        self.fuel_capacity = fuel_capacity
        self.current_fuel = fuel_capacity  # 默认满油
    
    def display_info(self):
        super().display_info()
        print(f"  油箱容量：{self.fuel_capacity}升")
        print(f"  当前油量：{self.current_fuel}升")
    
    def refuel(self, amount):
        if amount <= 0:
            print("加油量必须大于0！")
            return False
        
        if self.current_fuel + amount > self.fuel_capacity:
            print(f"加油{amount}升超过油箱容量！")
            return False
        
        self.current_fuel += amount
        print(f"加油成功！当前油量：{self.current_fuel}升")
        return True


class Bicycle(Vehicle):
    def __init__(self, brand, max_speed, has_basket):
        super().__init__(brand, max_speed)
        self.has_basket = has_basket
        self.gear = 1  # 默认1档
    
    def display_info(self):
        super().display_info()
        basket_status = "有" if self.has_basket else "无"
        print(f"  车篮：{basket_status}")
        print(f"  当前档位：第{self.gear}档")
    
    def change_gear(self, new_gear):
        if new_gear < 1 or new_gear > 6:
            print("自行车档位应在1-6之间！")
            return False
        
        self.gear = new_gear
        print(f"换挡成功！当前档位：第{self.gear}档")
        return True


# 创建并测试交通工具
print("=== 练习1：基础继承与多态 ===")

# 创建汽车对象
my_car = Car("特斯拉", 250, 60)
my_car.accelerate(100)
my_car.accelerate(200)  # 超过最高速度
my_car.brake(80)
my_car.display_info()
my_car.refuel(20)

print("\n" + "="*50)

# 创建自行车对象
my_bike = Bicycle("捷安特", 40, True)
my_bike.accelerate(30)
my_bike.brake(10)
my_bike.change_gear(3)
my_bike.display_info()
```

### 练习2：多继承与MRO

**任务**：设计一个多继承体系，包含以下类：

1. `Worker`（工人）类：有`work()`方法，打印"正在工作..."
2. `Student`（学生）类：有`study()`方法，打印"正在学习..."
3. `PartTimeWorker`（兼职工作者）类：同时继承`Worker`和`Student`
4. 添加`Intern`（实习生）类：继承`PartTimeWorker`，新增`report()`方法
5. 为每个类添加`__init__`方法，记录对象的创建信息
6. 使用`__mro__`属性查看类的方法解析顺序

**要求**：创建实习生对象，调用所有方法，并分析MRO顺序。

```python
# 练习2答案：多继承与MRO
class Worker:
    def __init__(self, name, job_title):
        self.name = name
        self.job_title = job_title
        print(f"工人{self.name}创建成功，职位：{self.job_title}")
    
    def work(self):
        print(f"{self.name}（{self.job_title}）正在工作...")
    
    def take_break(self):
        print(f"{self.name}正在休息...")


class Student:
    def __init__(self, name, school):
        self.name = name
        self.school = school
        print(f"学生{self.name}创建成功，学校：{self.school}")
    
    def study(self):
        print(f"{self.name}正在{self.school}学习...")
    
    def take_exam(self):
        print(f"{self.name}正在参加考试...")


class PartTimeWorker(Worker, Student):
    def __init__(self, name, job_title, school, hours_per_week):
        # 注意：由于多继承，需要明确调用哪个父类的__init__
        Worker.__init__(self, name, job_title)
        Student.__init__(self, name, school)
        
        self.hours_per_week = hours_per_week
        self.salary_per_hour = 25  # 默认时薪25元
        
        print(f"兼职工作者{self.name}创建成功")
        print(f"  工作：{self.job_title}")
        print(f"  学校：{self.school}")
        print(f"  每周工作：{self.hours_per_week}小时")
    
    def calculate_salary(self):
        weekly_salary = self.hours_per_week * self.salary_per_hour
        print(f"{self.name}周薪：¥{weekly_salary}")
        return weekly_salary
    
    def display_schedule(self):
        print(f"{self.name}的日程安排：")
        print(f"  - 工作日：工作{self.hours_per_week/5:.1f}小时/天")
        print(f"  - 周末：学习")


class Intern(PartTimeWorker):
    def __init__(self, name, job_title, school, hours_per_week, supervisor):
        super().__init__(name, job_title, school, hours_per_week)
        self.supervisor = supervisor
        self.mentor = None
        self.internship_duration = 3  # 默认3个月
        
        print(f"实习生{self.name}创建成功")
        print(f"  导师：{self.supervisor}")
    
    def report(self):
        print(f"\n实习生{self.name}工作汇报：")
        print(f"  职位：{self.job_title}")
        print(f"  学校：{self.school}")
        print(f"  工作时长：{self.hours_per_week}小时/周")
        print(f"  导师：{self.supervisor}")
        print(f"  实习期：{self.internship_duration}个月")
    
    def assign_mentor(self, mentor_name):
        self.mentor = mentor_name
        print(f"为实习生{self.name}分配导师：{mentor_name}")
    
    def extend_internship(self, additional_months):
        self.internship_duration += additional_months
        print(f"实习生{self.name}实习期延长{additional_months}个月，总时长：{self.internship_duration}个月")


# 创建并测试多继承体系
print("=== 练习2：多继承与MRO ===")

# 创建实习生对象
intern = Intern("张三", "软件开发实习生", "清华大学", 20, "李四技术总监")

# 调用各个方法
intern.work()          # 从Worker继承
intern.study()         # 从Student继承
intern.take_break()    # 从Worker继承
intern.take_exam()    # 从Student继承
intern.calculate_salary()  # 从PartTimeWorker继承
intern.report()        # Intern自己的方法
intern.assign_mentor("王五高级工程师")
intern.extend_internship(2)

# 查看MRO顺序
print("\n" + "="*50)
print("各个类的方法解析顺序（MRO）：")
print(f"Intern类的MRO：{Intern.__mro__}")
print(f"PartTimeWorker类的MRO：{PartTimeWorker.__mro__}")
print(f"Worker类的MRO：{Worker.__mro__}")
print(f"Student类的MRO：{Student.__mro__}")

# 分析MRO顺序
print("\nMRO分析：")
print("1. Intern继承自PartTimeWorker")
print("2. PartTimeWorker继承自Worker和Student（Worker在前）")
print("3. 因此Intern调用方法的顺序为：Intern → PartTimeWorker → Worker → Student → object")
print("4. 当调用继承的方法时，Python会按照这个顺序查找")
```

### 练习3：特殊方法实战

**任务**：创建一个`BookCollection`（书籍收藏）类，实现以下特殊方法：

1. `__init__(self, name)`：初始化收藏夹，包含收藏夹名称和空的书列表
2. `__len__(self)`：返回收藏夹中的书籍数量
3. `__getitem__(self, index)`：支持索引访问和切片操作
4. `__str__(self)`：返回用户友好的字符串表示
5. `__repr__(self)`：返回开发者友好的字符串表示
6. `__contains__(self, book)`：支持`in`操作符检查书籍是否存在
7. `__add__(self, other)`：支持两个收藏夹合并

同时实现以下常规方法：
- `add_book(self, title, author, year)`：添加书籍
- `remove_book(self, title)`：移除书籍
- `search_by_author(self, author)`：按作者搜索书籍
- `sort_by_year(self)`：按出版年份排序

**要求**：创建书籍收藏夹对象，测试所有特殊方法和常规方法。

```python
# 练习3答案：特殊方法实战
class BookCollection:
    def __init__(self, name):
        self.name = name
        self.books = []  # 存储(标题, 作者, 年份)元组
        print(f"书籍收藏夹《{self.name}》创建成功")
    
    def add_book(self, title, author, year):
        """添加书籍到收藏夹"""
        book = (title, author, year)
        self.books.append(book)
        print(f"添加书籍：《{title}》- {author} ({year}年)")
        return True
    
    def remove_book(self, title):
        """从收藏夹移除书籍"""
        removed = False
        for i, (book_title, author, year) in enumerate(self.books):
            if book_title == title:
                del self.books[i]
                print(f"移除书籍：《{title}》")
                removed = True
                break
        
        if not removed:
            print(f"未找到书籍：《{title}》")
        
        return removed
    
    def search_by_author(self, author):
        """按作者搜索书籍"""
        results = []
        for title, book_author, year in self.books:
            if book_author == author:
                results.append((title, book_author, year))
        
        return results
    
    def sort_by_year(self):
        """按出版年份排序"""
        self.books.sort(key=lambda book: book[2])
        print(f"已按出版年份排序收藏夹《{self.name}》")
        return self.books
    
    # ========== 特殊方法实现 ==========
    
    def __len__(self):
        """返回收藏夹中的书籍数量"""
        return len(self.books)
    
    def __getitem__(self, index):
        """支持索引访问和切片"""
        if isinstance(index, slice):
            # 切片操作：返回新的BookCollection对象
            sliced = BookCollection(f"{self.name} (切片)")
            sliced.books = self.books[index]
            return sliced
        else:
            # 索引访问：返回单个书籍
            return self.books[index]
    
    def __str__(self):
        """用户友好的字符串表示"""
        if len(self.books) == 0:
            return f"书籍收藏夹《{self.name}》是空的"
        
        book_list = "\n".join([f"{i+1}. 《{title}》- {author} ({year}年)" 
                              for i, (title, author, year) in enumerate(self.books)])
        return f"书籍收藏夹《{self.name}》共有{len(self.books)}本书：\n{book_list}"
    
    def __repr__(self):
        """开发者友好的字符串表示"""
        book_repr = ", ".join([f"('{title}', '{author}', {year})" 
                              for title, author, year in self.books])
        return f"BookCollection('{self.name}', books=[{book_repr}])"
    
    def __contains__(self, book_title):
        """支持in操作符检查书籍是否存在"""
        for title, author, year in self.books:
            if title == book_title:
                return True
        return False
    
    def __add__(self, other):
        """合并两个收藏夹"""
        if not isinstance(other, BookCollection):
            raise TypeError("只能与BookCollection类型合并")
        
        # 创建新的收藏夹
        new_name = f"{self.name}+{other.name}"
        new_collection = BookCollection(new_name)
        
        # 合并书籍（避免重复）
        all_books = self.books.copy()
        for book in other.books:
            if book not in all_books:
                all_books.append(book)
        
        new_collection.books = all_books
        print(f"合并收藏夹：{self.name} + {other.name} → {new_name}")
        return new_collection
    
    def display_statistics(self):
        """显示收藏夹统计信息"""
        if len(self.books) == 0:
            print("收藏夹为空")
            return
        
        # 计算各种统计
        unique_authors = set(author for _, author, _ in self.books)
        earliest_year = min(year for _, _, year in self.books)
        latest_year = max(year for _, _, year in self.books)
        
        print(f"\n收藏夹《{self.name}》统计信息：")
        print(f"  书籍总数：{len(self.books)}本")
        print(f"  作者数量：{len(unique_authors)}位")
        print(f"  出版年份范围：{earliest_year}年 - {latest_year}年")
        print(f"  平均出版年份：{sum(year for _, _, year in self.books)/len(self.books):.1f}年")


# 创建并测试书籍收藏夹
print("=== 练习3：特殊方法实战 ===")

# 创建第一个收藏夹
my_collection = BookCollection("编程书籍")
my_collection.add_book("Python编程从入门到实践", "埃里克·马瑟斯", 2016)
my_collection.add_book("流畅的Python", "Luciano Ramalho", 2015)
my_collection.add_book("Python核心编程", "Wesley Chun", 2006)

# 测试特殊方法
print("\n--- 测试特殊方法 ---")
print(f"收藏夹长度：{len(my_collection)}")  # 调用__len__
print(f"第一本书：{my_collection[0]}")    # 调用__getitem__
print(f"收藏夹中有'流畅的Python'吗：{'流畅的Python' in my_collection}")  # 调用__contains__

# 测试切片
print(f"\n前两本书（切片）：{my_collection[0:2]}")
sliced = my_collection[1:3]
print(f"切片收藏夹：{sliced}")

# 测试字符串表示
print(f"\n字符串表示（用户友好）：")
print(my_collection)  # 调用__str__

print(f"\n开发表示（调试用）：")
print(repr(my_collection))  # 调用__repr__

# 测试常规方法
print("\n--- 测试常规方法 ---")
search_results = my_collection.search_by_author("埃里克·马瑟斯")
print(f"按作者搜索：{search_results}")

my_collection.sort_by_year()
print(f"排序后的收藏夹：")
print(my_collection)

my_collection.remove_book("Python核心编程")
print(f"移除后的收藏夹：")
print(my_collection)

my_collection.display_statistics()

# 测试合并操作
print("\n--- 测试收藏夹合并 ---")
other_collection = BookCollection("算法书籍")
other_collection.add_book("算法导论", "Thomas H. Cormen", 2009)
other_collection.add_book("算法", "Robert Sedgewick", 2011)

combined = my_collection + other_collection
print(f"合并后的收藏夹：")
print(combined)
combined.display_statistics()
```

### 练习4：综合项目实战 - 员工管理系统

**任务**：设计一个完整的员工管理系统，包含以下类：

1. `Employee`（员工）基类：
   - 属性：`name`（姓名）、`employee_id`（工号）、`base_salary`（基本工资）
   - 方法：`calculate_salary()`（计算工资，默认返回基本工资）

2. `Manager`（经理）类：继承`Employee`
   - 新增属性：`bonus`（奖金）
   - 重写`calculate_salary()`：基本工资 + 奖金

3. `Developer`（开发人员）类：继承`Employee`
   - 新增属性：`overtime_hours`（加班小时数）、`overtime_rate`（加班费率）
   - 重写`calculate_salary()`：基本工资 + 加班小时数 × 加班费率

4. `SalesPerson`（销售人员）类：继承`Employee`
   - 新增属性：`sales_amount`（销售额）、`commission_rate`（佣金比例）
   - 重写`calculate_salary()`：基本工资 + 销售额 × 佣金比例

5. `Department`（部门）类：
   - 管理多个员工，支持添加、删除、查询员工
   - 计算部门总工资
   - 按员工类型统计人数

**要求**：创建部门，添加不同类型员工，计算工资，并展示统计信息。

```python
# 练习4答案：综合项目实战 - 员工管理系统
class Employee:
    def __init__(self, name, employee_id, base_salary):
        self.name = name
        self.employee_id = employee_id
        self.base_salary = base_salary
        print(f"员工创建：{self.name}（工号：{self.employee_id}）")
    
    def calculate_salary(self):
        """计算工资（基类方法，子类应重写）"""
        return self.base_salary
    
    def display_info(self):
        """显示员工信息"""
        print(f"\n员工信息：")
        print(f"  姓名：{self.name}")
        print(f"  工号：{self.employee_id}")
        print(f"  基本工资：¥{self.base_salary}")
        print(f"  实发工资：¥{self.calculate_salary():.2f}")
    
    def __str__(self):
        return f"员工：{self.name}（{self.employee_id}）"


class Manager(Employee):
    def __init__(self, name, employee_id, base_salary, bonus):
        super().__init__(name, employee_id, base_salary)
        self.bonus = bonus
        print(f"经理创建：奖金¥{bonus}")
    
    def calculate_salary(self):
        """经理工资 = 基本工资 + 奖金"""
        return self.base_salary + self.bonus
    
    def __str__(self):
        return f"经理：{self.name}（{self.employee_id}）"


class Developer(Employee):
    def __init__(self, name, employee_id, base_salary, overtime_hours=0, overtime_rate=50):
        super().__init__(name, employee_id, base_salary)
        self.overtime_hours = overtime_hours
        self.overtime_rate = overtime_rate
        print(f"开发人员创建：加班{overtime_hours}小时，费率¥{overtime_rate}/小时")
    
    def calculate_salary(self):
        """开发人员工资 = 基本工资 + 加班费"""
        overtime_pay = self.overtime_hours * self.overtime_rate
        return self.base_salary + overtime_pay
    
    def add_overtime(self, hours):
        """添加加班小时数"""
        if hours <= 0:
            print("加班小时数必须大于0！")
            return False
        
        self.overtime_hours += hours
        print(f"{self.name}添加加班{hours}小时，总加班：{self.overtime_hours}小时")
        return True
    
    def __str__(self):
        return f"开发人员：{self.name}（{self.employee_id}）"


class SalesPerson(Employee):
    def __init__(self, name, employee_id, base_salary, sales_amount=0, commission_rate=0.05):
        super().__init__(name, employee_id, base_salary)
        self.sales_amount = sales_amount
        self.commission_rate = commission_rate
        print(f"销售人员创建：销售额¥{sales_amount}，佣金比例{commission_rate*100}%")
    
    def calculate_salary(self):
        """销售人员工资 = 基本工资 + 销售额 × 佣金比例"""
        commission = self.sales_amount * self.commission_rate
        return self.base_salary + commission
    
    def add_sales(self, amount):
        """添加销售额"""
        if amount <= 0:
            print("销售额必须大于0！")
            return False
        
        self.sales_amount += amount
        print(f"{self.name}添加销售额¥{amount}，总销售额：¥{self.sales_amount}")
        return True
    
    def __str__(self):
        return f"销售人员：{self.name}（{self.employee_id}）"


class Department:
    def __init__(self, name):
        self.name = name
        self.employees = []  # 存储员工对象
        print(f"部门创建：《{self.name}》")
    
    def add_employee(self, employee):
        """添加员工"""
        if not isinstance(employee, Employee):
            print("只能添加Employee类型对象！")
            return False
        
        self.employees.append(employee)
        print(f"部门《{self.name}》添加员工：{employee.name}")
        return True
    
    def remove_employee(self, employee_id):
        """移除员工"""
        removed = False
        for i, employee in enumerate(self.employees):
            if employee.employee_id == employee_id:
                removed_employee = self.employees.pop(i)
                print(f"部门《{self.name}》移除员工：{removed_employee.name}")
                removed = True
                break
        
        if not removed:
            print(f"未找到工号为{employee_id}的员工")
        
        return removed
    
    def find_employee(self, employee_id):
        """查找员工"""
        for employee in self.employees:
            if employee.employee_id == employee_id:
                return employee
        return None
    
    def calculate_total_salary(self):
        """计算部门总工资"""
        total = sum(employee.calculate_salary() for employee in self.employees)
        print(f"部门《{self.name}》总工资：¥{total:.2f}")
        return total
    
    def get_employee_statistics(self):
        """获取员工统计信息"""
        stats = {
            "manager": 0,
            "developer": 0,
            "salesperson": 0,
            "total": len(self.employees)
        }
        
        for employee in self.employees:
            if isinstance(employee, Manager):
                stats["manager"] += 1
            elif isinstance(employee, Developer):
                stats["developer"] += 1
            elif isinstance(employee, SalesPerson):
                stats["salesperson"] += 1
        
        return stats
    
    def display_department_info(self):
        """显示部门信息"""
        print(f"\n{'='*60}")
        print(f"部门：《{self.name}》")
        print(f"{'='*60}")
        
        if len(self.employees) == 0:
            print("部门暂无员工")
            return
        
        # 显示员工列表
        print(f"员工列表（共{len(self.employees)}人）：")
        for i, employee in enumerate(self.employees, 1):
            salary = employee.calculate_salary()
            if isinstance(employee, Manager):
                emp_type = "经理"
            elif isinstance(employee, Developer):
                emp_type = "开发人员"
            elif isinstance(employee, SalesPerson):
                emp_type = "销售人员"
            else:
                emp_type = "普通员工"
            
            print(f"{i:2d}. {employee.name:10s}（{employee.employee_id}）- {emp_type:6s} 工资：¥{salary:8.2f}")
        
        # 显示统计信息
        stats = self.get_employee_statistics()
        print(f"\n部门统计：")
        print(f"  经理人数：{stats['manager']}人")
        print(f"  开发人员人数：{stats['developer']}人")
        print(f"  销售人员人数：{stats['salesperson']}人")
        print(f"  员工总数：{stats['total']}人")
        
        # 计算总工资
        total = self.calculate_total_salary()
        avg = total / len(self.employees) if len(self.employees) > 0 else 0
        print(f"  平均工资：¥{avg:.2f}")
    
    def __str__(self):
        return f"部门：《{self.name}》（员工数：{len(self.employees)}）"


# 创建并测试员工管理系统
print("=== 练习4：综合项目实战 - 员工管理系统 ===")

# 创建部门
tech_dept = Department("技术研发部")

# 创建不同类型的员工
manager = Manager("张总", "M001", 20000, 5000)
developer1 = Developer("李工", "D001", 15000, 10, 60)
developer2 = Developer("王工", "D002", 14000, 5, 60)
salesperson = SalesPerson("赵销售", "S001", 12000, 200000, 0.06)

# 添加员工到部门
tech_dept.add_employee(manager)
tech_dept.add_employee(developer1)
tech_dept.add_employee(developer2)
tech_dept.add_employee(salesperson)

# 显示部门信息
tech_dept.display_department_info()

# 测试员工操作
print("\n--- 测试员工操作 ---")
print("\n经理信息：")
manager.display_info()

print("\n开发人员1信息：")
developer1.display_info()
developer1.add_overtime(5)
print(f"增加加班后工资：¥{developer1.calculate_salary():.2f}")

print("\n销售人员信息：")
salesperson.display_info()
salesperson.add_sales(100000)
print(f"增加销售额后工资：¥{salesperson.calculate_salary():.2f}")

# 更新部门信息
print("\n--- 更新后的部门信息 ---")
tech_dept.display_department_info()

# 测试员工查找和移除
print("\n--- 测试员工查找和移除 ---")
found = tech_dept.find_employee("D001")
if found:
    print(f"找到员工：{found.name}")

tech_dept.remove_employee("S001")
tech_dept.display_department_info()
```

## 第四部分：学习卡片

### 1. 核心收获（今日学习要点总结）

1. **继承的本质**：继承体现了"is-a"关系，允许子类复用父类的属性和方法，是实现代码复用的核心机制
   - 单继承：一个子类继承一个父类，是最常用的继承方式
   - `super()`函数：安全调用父类方法，避免硬编码父类名，正确处理多继承MRO

2. **方法重写**：子类可以重新定义父类已有方法，实现定制化行为
   - 重写时方法名和参数列表必须与父类方法相同
   - 通过`super().方法名()`可以在重写时复用父类逻辑

3. **多继承机制**：Python支持一个类继承多个父类，但需要谨慎使用
   - 菱形继承问题：多个父类继承自同一基类时可能引发方法调用歧义
   - MRO（方法解析顺序）：Python使用C3算法确定方法调用顺序，可通过`__mro__`属性查看

4. **多态思想**：同一接口可以有不同实现，使代码更加灵活和可扩展
   - 鸭子类型：Python的多态实现方式，不依赖继承关系，只关注对象是否有相应方法
   - 抽象基类：通过`abc`模块定义接口，强制子类实现特定方法

5. **特殊方法（魔法方法）**：以双下划线开头和结尾，用于自定义类的行为
   - `__str__()`：用户友好的字符串表示，用于`print()`和`str()`
   - `__repr__()`：开发者友好的字符串表示，用于调试和`repr()`
   - `__len__()`：定义对象的长度，支持`len()`函数
   - `__getitem__()`：支持索引访问和切片操作
   - `__add__()`、`__sub__()`等：重载运算符，使自定义类型支持原生语法

6. **属性访问控制**：通过命名约定保护数据安全
   - 公开属性：无下划线开头
   - 保护属性：单下划线开头，约定外部不直接访问
   - 私有属性：双下划线开头，Python进行名称改写
   - `@property`装饰器：创建安全的属性访问接口

### 2. 疑问收集（记录学习中遇到的困惑）

请在学习过程中记录以下方面的疑问：

1. **继承设计**：在实际项目中，如何判断何时使用继承？继承层次应该设计多深才算合理？

2. **多继承冲突**：当多个父类有同名方法时，如何确定调用哪个？如何避免多继承带来的复杂性？

3. **super()机制**：`super()`是如何根据MRO顺序确定调用哪个父类方法的？在多继承中`super()`的行为是怎样的？

4. **特殊方法性能**：重写特殊方法（如`__getitem__`）是否会影响性能？与普通方法调用有何区别？

5. **鸭子类型边界**：鸭子类型虽然灵活，但如何确保类型安全？在没有接口约束的情况下，如何防止运行时错误？

6. **属性装饰器**：`@property`、`@setter`、`@deleter`三个装饰器如何协同工作？它们与普通getter/setter方法有何优劣？

7. **实际应用场景**：在AI项目中，哪些部分最适合使用继承和多态？如何设计一个可扩展的AI系统架构？

### 3. 感悟引导（连接理论与实际应用）

**思考题**：面向对象高级特性（继承、多态、特殊方法）如何帮助你构建更健壮、可扩展的AI系统？

**引导思路**：

1. **模块化AI系统设计**：通过继承构建分层的AI组件体系
   - 基础模型类：定义通用的训练、评估、保存接口
   - 特定算法类：继承基础类，实现CNN、RNN、Transformer等具体算法
   - 应用模型类：在特定算法基础上，添加领域特定逻辑

2. **多态实现灵活的AI策略**：通过鸭子类型支持多种AI算法切换
   - 统一预测接口：不同模型实现相同的`predict()`方法
   - 策略模式：将算法封装为对象，运行时动态替换
   - 插件架构：通过接口约定，支持第三方模型接入

3. **特殊方法增强AI对象表现力**：使自定义AI类型表现得像内置类型
   - `__len__()`：返回数据集大小或模型参数数量
   - `__getitem__()`：支持数据集的索引访问和切片
   - `__call__()`：将模型对象当作函数调用，实现预测功能

4. **AI项目实践建议**：
   - 从简单继承体系开始：先设计基础数据加载类和模型类
   - 逐步引入多态：通过统一接口支持不同模型的训练和预测
   - 合理使用特殊方法：让AI组件更符合Python习惯用法
   - 学习开源框架：研究TensorFlow、PyTorch等框架的面向对象设计

**今日行动建议**：
1. 按照视频教程完成面向对象高级特性的概念学习
2. 动手实现今天练习中的所有代码示例，特别是综合项目实战
3. 尝试将之前编写的某个数据处理脚本重构为使用继承和多态的类体系
4. 思考在未来的AI项目中如何应用面向对象高级特性构建可扩展系统

**明日预告**：明天我们将进入Week 2的综合项目实战日，通过一个完整的项目整合文件操作、异常处理、模块管理和面向对象编程等所有本周学习内容，为Week 2的周度复盘做好准备。