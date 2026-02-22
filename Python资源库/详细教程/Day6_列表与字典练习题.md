---
title: Day 6：列表与字典练习题
tags: [python, 列表, 字典, 数据结构]
aliases: ["Day6"]
date: 2026-02-22
---

# Day 6: 列表与字典练习题

> 相关链接：[[Day5_函数基础详解]] | [[Day7_Week1周度复盘与测验]] | [[Python学习大纲]]

## 🎯 今日目标
掌握Python最常用的两种数据结构——列表和字典，为AI学习中的数据处理打基础。

## 📺 最新视频资源推荐（2025-2026版）

### 主推资源：黑马程序员2026版Python基础教程
- **链接**：https://python.itheima.com/
- **内容**：Python基础编程阶段包含列表、元组、字典等数据容器的详细讲解
- **特点**：2026年最新课程，零基础友好，配套实战项目
- **建议**：重点学习第六章“数据容器”相关章节

### 备选资源1：国家高等教育智慧教育平台
- **链接**：https://higher.smartedu.cn/course/62f6d5471fdc0303f43a988c
- **内容**：Python语言基础 - 列表、元组、字典、集合
- **特点**：官方权威平台，2026年2月10日最新更新，系统全面
- **建议**：作为系统学习参考，巩固理论基础

### 备选资源2：小甲鱼《零基础入门学习Python》第三版
- **链接**：https://ilovefishc.com/assets/videos/python-new.html
- **内容**：第五章列表、第九章字典专门讲解
- **特点**：趣味性强，案例丰富，2026年1月更新
- **建议**：辅助理解，通过有趣案例加深记忆

## 📚 知识回顾

### 列表（List）核心特性
- **有序**：元素有固定顺序，可通过索引访问（索引从0开始）
- **可变**：可修改、添加、删除元素（内存地址不变，内容可变）
- **可重复**：允许包含重复元素
- **异构性**：元素可以是不同数据类型

### 字典（Dict）核心特性
- **键值对**：每个键（key）对应一个值（value）
- **键唯一性**：字典中的键必须是唯一的，重复键会覆盖前一个
- **无序性**：Python 3.7+ 中按插入顺序存储，但逻辑上视为无序
- **高效查找**：基于哈希表实现，查找速度接近O(1)

### 常用方法快速回顾

```python
# 列表常用方法示例
fruits = ["苹果", "香蕉", "橙子"]
fruits.append("葡萄")        # 末尾添加元素
fruits.insert(1, "西瓜")     # 指定位置插入
fruits.remove("香蕉")        # 删除指定元素
fruits.pop(2)               # 删除并返回指定索引元素
fruits[0] = "草莓"           # 修改元素
sliced = fruits[1:3]        # 切片操作

# 字典常用方法示例
student = {"name": "张三", "age": 18}
student["gender"] = "男"     # 添加/修改键值对
age = student.get("age")     # 安全获取值
keys = student.keys()        # 获取所有键
values = student.values()    # 获取所有值
items = student.items()      # 获取所有键值对
student.pop("age")           # 删除指定键值对
```

## 🧠 渐进式练习题

### 题目1：列表基本操作与切片
**任务**：创建一个购物清单，完成以下操作：
1. 初始清单：["苹果", "牛奶", "面包"]
2. 在末尾添加"鸡蛋"
3. 在第二个位置插入"香蕉"
4. 删除"牛奶"
5. 修改第一个元素为"红苹果"
6. 使用切片获取前两个元素
7. 使用切片获取最后两个元素（使用负索引）

```python
# 题目1答案（每行代码都有详细中文注释）
# 1. 创建初始购物清单
shopping_list = ["苹果", "牛奶", "面包"]  # 定义一个包含三个字符串的列表
print("初始清单:", shopping_list)         # 打印初始清单

# 2. 在末尾添加"鸡蛋"
shopping_list.append("鸡蛋")              # append()方法在列表末尾添加新元素
print("添加鸡蛋后:", shopping_list)       # 打印当前清单

# 3. 在第二个位置插入"香蕉"
shopping_list.insert(1, "香蕉")           # insert(位置索引, 元素)在指定位置插入元素
print("插入香蕉后:", shopping_list)       # 打印当前清单

# 4. 删除"牛奶"
shopping_list.remove("牛奶")              # remove(元素值)删除列表中第一个匹配的元素
print("删除牛奶后:", shopping_list)       # 打印当前清单

# 5. 修改第一个元素为"红苹果"
shopping_list[0] = "红苹果"               # 通过索引直接赋值来修改列表元素
print("修改苹果后:", shopping_list)       # 打印当前清单

# 6. 使用切片获取前两个元素
first_two = shopping_list[0:2]            # 切片[start:end]获取索引0到1的元素（不含2）
print("前两个元素:", first_two)           # 打印切片结果

# 7. 使用切片获取最后两个元素（使用负索引）
last_two = shopping_list[-2:]             # 切片[-2:]从倒数第二个到最后一个元素
print("最后两个元素:", last_two)          # 打印切片结果

# 列表可变性验证：修改后原列表确实变化
print("最终完整列表:", shopping_list)    # 验证列表确实被修改
```

### 题目2：列表推导式应用
**任务**：使用列表推导式完成以下操作：
1. 生成1-10的平方列表
2. 从1-20中筛选出所有偶数
3. 将字符串列表["apple", "banana", "cherry"]转换为大写
4. 生成一个3x3的二维列表，每个元素为其行列索引之和

```python
# 题目2答案（每行代码都有详细中文注释）
# 1. 生成1-10的平方列表
squares = [x**2 for x in range(1, 11)]   # 列表推导式：遍历1-10，计算每个数的平方
print("1-10的平方:", squares)            # 打印结果：[1, 4, 9, 16, 25, 36, 49, 64, 81, 100]

# 2. 从1-20中筛选出所有偶数
even_numbers = [x for x in range(1, 21) if x % 2 == 0]  # 添加if条件筛选偶数
print("1-20的偶数:", even_numbers)        # 打印结果：[2, 4, 6, 8, 10, 12, 14, 16, 18, 20]

# 3. 将字符串列表转换为大写
fruits = ["apple", "banana", "cherry"]
uppercase_fruits = [fruit.upper() for fruit in fruits]  # 对每个元素调用upper()方法
print("大写水果:", uppercase_fruits)      # 打印结果：['APPLE', 'BANANA', 'CHERRY']

# 4. 生成3x3二维列表，元素为行列索引之和
matrix = [[i + j for j in range(3)] for i in range(3)]  # 嵌套列表推导式
print("3x3矩阵:")
for row in matrix:                      # 逐行打印矩阵，便于查看
    print(row)                          # 输出：[[0, 1, 2], [1, 2, 3], [2, 3, 4]]
```

### 题目3：字典基本操作与哈希表原理
**任务**：创建一个学生信息字典，完成以下操作：
1. 初始字典：{"name": "李四", "age": 20, "major": "计算机科学"}
2. 添加新键值对："gender": "男"
3. 修改age为21
4. 使用get()方法安全获取"score"（不存在返回"暂无成绩"）
5. 删除"major"键值对
6. 遍历字典的所有键、所有值、所有键值对

```python
# 题目3答案（每行代码都有详细中文注释）
# 1. 创建初始学生信息字典
student = {"name": "李四", "age": 20, "major": "计算机科学"}
print("初始学生信息:", student)

# 2. 添加新键值对："gender": "男"
student["gender"] = "男"                 # 直接赋值，键不存在时自动添加
print("添加性别后:", student)

# 3. 修改age为21
student["age"] = 21                      # 直接赋值，键存在时修改对应值
print("修改年龄后:", student)

# 4. 使用get()方法安全获取"score"（不存在返回"暂无成绩"）
# 字典的哈希表原理：通过键的哈希值快速定位值，时间复杂度接近O(1)
# 键必须是不可变类型（字符串、数字、元组），因为哈希值需要稳定
score = student.get("score", "暂无成绩")  # get(键, 默认值)安全获取，避免KeyError
print("成绩查询:", score)                # 输出：暂无成绩

# 5. 删除"major"键值对
deleted_value = student.pop("major")     # pop(键)删除并返回值
print(f"删除的专业: {deleted_value}")     # 打印被删除的值
print("删除专业后:", student)

# 6. 遍历字典的所有键、所有值、所有键值对
print("\n字典遍历演示:")
print("所有键:", list(student.keys()))   # keys()返回所有键的可迭代对象
print("所有值:", list(student.values())) # values()返回所有值的可迭代对象
print("所有键值对:", list(student.items())) # items()返回(键, 值)元组的可迭代对象

# 键唯一性验证：重复键会覆盖前一个值
student["name"] = "王五"                  # 修改已存在的键，值被覆盖
print("修改姓名后:", student)             # 验证"李四"被"王五"覆盖
```

### 题目4：字典推导式与嵌套结构
**任务**：处理嵌套数据结构，完成以下操作：
1. 使用字典推导式将数字1-5映射为其平方
2. 创建学生成绩嵌套字典：学生姓名作为键，值包含语文、数学、英语成绩
3. 计算每个学生的平均分
4. 找出所有科目都及格（≥60）的学生

```python
# 题目4答案（每行代码都有详细中文注释）
# 1. 使用字典推导式将数字1-5映射为其平方
squares_dict = {x: x**2 for x in range(1, 6)}  # 键: 数字，值: 平方
print("数字平方字典:", squares_dict)       # 输出：{1: 1, 2: 4, 3: 9, 4: 16, 5: 25}

# 2. 创建学生成绩嵌套字典
students_scores = {
    "张三": {"语文": 85, "数学": 92, "英语": 78},
    "李四": {"语文": 72, "数学": 88, "英语": 95},
    "王五": {"语文": 58, "数学": 61, "英语": 67},
    "赵六": {"语文": 90, "数学": 87, "英语": 83}
}
print("学生成绩字典:")
for name, scores in students_scores.items():
    print(f"  {name}: {scores}")

# 3. 计算每个学生的平均分
print("\n学生平均分:")
for name, scores in students_scores.items():
    average = sum(scores.values()) / len(scores)  # sum()求和，len()获取科目数
    print(f"  {name}: {average:.1f}分")           # 格式化保留一位小数

# 4. 找出所有科目都及格（≥60）的学生
print("\n所有科目都及格的学生:")
all_pass_students = []
for name, scores in students_scores.items():
    # all()函数判断所有成绩是否都≥60
    if all(score >= 60 for score in scores.values()):
        all_pass_students.append(name)

if all_pass_students:
    print("  ", ", ".join(all_pass_students))
else:
    print("  暂无")

# 嵌套结构访问示例：获取张三的数学成绩
zhangsan_math = students_scores["张三"]["数学"]  # 两层索引访问
print(f"张三的数学成绩: {zhangsan_math}分")
```

### 题目5：综合应用 - 简易学生管理系统
**任务**：结合列表和字典实现一个简易学生管理系统：
1. 使用列表存储所有学生（每个学生是一个字典）
2. 实现添加学生功能（输入姓名、年龄、专业）
3. 实现删除学生功能（根据姓名）
4. 实现查询学生功能（根据姓名）
5. 实现显示所有学生功能

```python
# 题目5答案（每行代码都有详细中文注释）
# 1. 初始化学生列表（空列表，用于存储学生字典）
students = []  # 主数据结构：列表中的每个元素是一个学生字典

def add_student():
    """添加学生函数：收集信息并添加到列表"""
    print("\n--- 添加学生 ---")
    name = input("请输入学生姓名: ")
    age = int(input("请输入学生年龄: "))
    major = input("请输入学生专业: ")
    
    # 创建学生字典（键值对结构存储单个学生信息）
    student = {
        "name": name,
        "age": age,
        "major": major
    }
    
    # 将学生字典添加到列表中（列表维护所有学生）
    students.append(student)
    print(f"学生 {name} 添加成功！")

def delete_student():
    """删除学生函数：根据姓名删除"""
    print("\n--- 删除学生 ---")
    name = input("请输入要删除的学生姓名: ")
    
    # 遍历学生列表，查找匹配姓名的学生
    found = False
    for student in students:
        if student["name"] == name:  # 通过字典键访问值进行比较
            students.remove(student)  # 从列表中移除该字典
            print(f"学生 {name} 删除成功！")
            found = True
            break
    
    if not found:
        print(f"未找到学生 {name}")

def search_student():
    """查询学生函数：根据姓名查询"""
    print("\n--- 查询学生 ---")
    name = input("请输入要查询的学生姓名: ")
    
    # 遍历学生列表，查找匹配姓名的学生
    found = False
    for student in students:
        if student["name"] == name:
            print(f"姓名: {student['name']}")
            print(f"年龄: {student['age']}")
            print(f"专业: {student['major']}")
            found = True
            break
    
    if not found:
        print(f"未找到学生 {name}")

def show_all_students():
    """显示所有学生函数"""
    print("\n--- 所有学生信息 ---")
    if len(students) == 0:
        print("暂无学生信息")
        return
    
    # 遍历学生列表，按格式显示每个学生信息
    for i, student in enumerate(students, 1):  # enumerate从1开始计数
        print(f"学生{i}:")
        print(f"  姓名: {student['name']}")
        print(f"  年龄: {student['age']}")
        print(f"  专业: {student['major']}")
        print()  # 空行分隔

def main_menu():
    """主菜单函数：显示选项并调用对应功能"""
    while True:
        print("\n=== 简易学生管理系统 ===")
        print("1. 添加学生")
        print("2. 删除学生")
        print("3. 查询学生")
        print("4. 显示所有学生")
        print("5. 退出系统")
        
        choice = input("请选择操作 (1-5): ")
        
        if choice == "1":
            add_student()
        elif choice == "2":
            delete_student()
        elif choice == "3":
            search_student()
        elif choice == "4":
            show_all_students()
        elif choice == "5":
            print("感谢使用学生管理系统！")
            break
        else:
            print("输入错误，请重新输入！")

# 程序入口
if __name__ == "__main__":
    print("欢迎使用简易学生管理系统！")
    print("数据结构说明:")
    print("  - students: 列表，存储所有学生")
    print("  - 每个学生: 字典，包含name、age、major等键值对")
    main_menu()

# 数据结构优势总结：
# 1. 列表：有序存储，便于遍历和批量操作
# 2. 字典：键值对结构，通过姓名快速查找（哈希表O(1)复杂度）
# 3. 组合使用：列表管理多个对象，字典描述单个对象的多个属性
```

## 📝 学习卡片

### 3个核心收获
1. **列表的有序可变性**：列表通过索引快速访问元素，支持增删改查和切片操作，是处理有序数据的首选结构。
2. **字典的键值映射**：字典基于哈希表实现，通过唯一键快速查找对应值，适合存储关联数据和配置信息。
3. **推导式的高效生成**：列表和字典推导式能用一行代码生成复杂数据结构，代码更简洁、执行更高效。

### 1个疑问收集
- 在处理嵌套字典时（如`students_scores["张三"]["数学"]`），如果第一层键不存在会直接报错。如何安全地访问多层嵌套结构而不引发异常？是否有类似`get()`方法的链式调用方式？

### 1个感悟
今天通过实际案例深刻体会到，选择合适的数据结构能极大简化代码逻辑。列表适合顺序处理，字典适合快速查找，二者结合能构建出既清晰又高效的程序结构。数据结构不仅是存储工具，更是解决问题的思维框架。

## 🚀 明日预告
明天将进行Week 1的周度复盘与测验，检验本周所学知识，为进入第二周学习做好准备。

---
**温馨提示**：完成所有练习题后，尝试自己设计一个小项目（如通讯录管理、图书借阅系统），巩固列表和字典的使用。代码注释不仅能帮助他人理解，更是自己理清思路的好方法！