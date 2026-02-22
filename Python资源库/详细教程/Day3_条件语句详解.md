---
title: Day 3：条件语句详解
tags: [python, 条件语句, if-elif-else, 逻辑判断]
aliases: ["Day3"]
date: 2026-02-22
---

# Day 3：条件语句详解

> 相关链接：[[Day2_变量与数据类型练习题]] | [[Day4_循环结构练习题]] | [[Python学习大纲]]

欢迎来到Python学习的第三天！今天我们将深入探讨Python的**条件语句**，这是让程序具备“思考能力”的核心工具。通过if、elif、else的组合，你的程序可以根据不同情况做出不同的响应，就像人类做决策一样。

## 第一部分：最新视频教程推荐

为了让学习更加直观高效，我为你筛选了2025-2026年发布的Python条件语句最新教程。这些资源都采用最新的Python版本和教学理念，专门为零基础学员设计。

### 1. 国家高等教育智慧教育平台 - Python语言程序设计 第4周（2026最新版）
- **链接**：https://higher.smartedu.cn/course/66d39c2b711dc30c348ee6f0#week4
- **重点内容**：第4周“程序的控制结构”专题，系统讲解：
  - 程序的分支结构（if单分支、if-else双分支、if-elif-else多分支）
  - 实例5：身体质量指数BMI计算与分类
  - 条件表达式与布尔逻辑的深入理解
- **适合人群**：希望建立系统知识体系、理解计算机科学思维的学员
- **核心特点**：
  - 国家级一流课程，累计超过550万学习者验证
  - 理论讲解透彻，案例经典实用
  - 配套大量练习题和测试题，巩固学习效果
  - 课程微信群支持，学习氛围浓厚

### 2. 黑马程序员2026版Python基础入门 - 第3章判断语句（2月最新更新）
- **链接**：https://blog.csdn.net/2401_83646191/article/details/141721390
- **重点内容**：第3章“Python判断语句”完整体系：
  - 布尔类型和比较运算符（==、!=、>、<、>=、<=）
  - if语句基本格式、if-else组合、if-elif-else多条件判断
  - 判断语句的嵌套应用
  - 实战案例：猜数字游戏完整实现
- **适合人群**：喜欢动手实践、希望快速掌握实际编程技能的学员
- **核心特点**：
  - 2026年2月3日最新更新，语法习惯最前沿
  - 图文并茂，每个概念都有可视化解释
  - 代码示例丰富，可直接复制运行
  - 课后作业设计合理，渐进式提升能力

### 3. 老徐《2分钟学python》 - 条件判断语句if else与elif用法详解（2025精华版）
- **链接**：https://www.iesdouyin.com/share/video/7502283717630233882
- **时长**：约5分钟，浓缩核心要点
- **特点**：
  - 用生活化比喻解释编程概念（“如果下雨就带伞”）
  - 快速演示if-elif-else的执行顺序
  - 特别适合碎片时间复习巩固
- **学习建议**：先看黑马程序员的系统讲解，再用老徐的视频快速回顾核心逻辑

### 今日学习路径建议
1. **主攻资源**：先看黑马程序员第3章前2节（约20分钟），动手编写示例代码
2. **系统深化**：有时间可观看国家高等教育平台第4周相关内容，建立理论框架
3. **快速回顾**：完成练习前看老徐的短视频，确保理解执行顺序
4. **核心重点**：今天要彻底掌握多分支条件判断的逻辑流程，这是AI学习中决策树、分类算法的基础

## 第二部分：条件语句系统讲解（详细注释版）

条件语句让程序能够根据不同的条件执行不同的代码块。想象一下生活中的决策：如果下雨，就带伞；否则，就不带。Python用if、elif、else来实现这种逻辑。

### 2.1 布尔表达式和比较运算符

在Python中，条件判断的结果总是**布尔值**：True（真）或False（假）。比较运算符用于比较两个值的关系，返回布尔值。

```python
# ========== 比较运算符示例 ==========
# 比较运算符用于比较两个值，返回True或False

# 等于：检查两个值是否相等
print(5 == 5)       # True，因为5等于5
print("hello" == "hello")  # True，两个字符串完全相同
print(10 == 20)     # False，因为10不等于20

# 不等于：检查两个值是否不相等
print(5 != 3)       # True，因为5不等于3
print("Python" != "python")  # True，大小写不同，字符串不等

# 大于：检查左边的值是否大于右边的值
print(10 > 5)       # True，10大于5
print(3 > 10)       # False，3不大于10

# 小于：检查左边的值是否小于右边的值
print(5 < 10)       # True，5小于10
print(15 < 8)       # False，15不小于8

# 大于等于：检查左边的值是否大于或等于右边的值
print(10 >= 10)     # True，10等于10，满足"等于"条件
print(15 >= 10)     # True，15大于10，满足"大于"条件
print(8 >= 10)      # False，8既不大于也不等于10

# 小于等于：检查左边的值是否小于或等于右边的值
print(5 <= 5)       # True，5等于5
print(3 <= 7)       # True，3小于7
print(12 <= 8)      # False，12既不小于也不等于8

# 实际应用：比较变量值
age = 25
height = 1.75
print(age >= 18)    # True，25大于等于18，表示已成年
print(height < 1.80) # True，1.75小于1.80

# 字符串比较：按字典顺序比较
print("apple" < "banana")   # True，a在b前面
print("cat" > "dog")        # False，c在d前面

# 注意：Python区分大小写
print("Python" == "python")  # False，'P'和'p'是不同的字符
```

### 2.2 逻辑运算符：and、or、not

当需要组合多个条件时，使用逻辑运算符。这是构建复杂决策逻辑的基础。

```python
# ========== 逻辑运算符示例 ==========
# 逻辑运算符用于组合多个布尔条件

# and（与）：两个条件都为True时，结果为True
print(True and True)     # True，两个都为真
print(True and False)    # False，有一个为假
print(False and False)   # False，两个都为假

# 实际应用：同时满足多个条件
age = 20
has_id = True
can_enter_bar = (age >= 18) and has_id
print(f"可以进入酒吧吗？{can_enter_bar}")  # True，年龄达标且有身份证

# or（或）：至少一个条件为True时，结果为True
print(True or True)      # True，至少一个为真
print(True or False)     # True，有一个为真
print(False or False)    # False，两个都为假

# 实际应用：满足任一条件即可
is_student = True
is_senior = False
can_get_discount = is_student or is_senior
print(f"可以获得折扣吗？{can_get_discount}")  # True，因为是学生

# not（非）：取反操作，True变False，False变True
print(not True)          # False，真变假
print(not False)         # True，假变真

# 实际应用：判断相反情况
is_raining = False
can_go_out = not is_raining
print(f"可以出门吗？{can_go_out}")  # True，因为没下雨

# 组合使用：复杂的逻辑判断
score = 85
attendance_rate = 0.92
# 条件：成绩≥80且出勤率≥0.9，或者成绩≥90
is_excellent = (score >= 80 and attendance_rate >= 0.9) or score >= 90
print(f"是否优秀？{is_excellent}")  # True，满足第一个条件

# 短路特性（重要！）
# and运算：如果第一个条件为False，不再计算第二个条件
# or运算：如果第一个条件为True，不再计算第二个条件
x = 0
# 下面这行代码不会出错，因为x != 0为False，and运算直接返回False，不计算10/x
result = (x != 0) and (10/x > 1)
print(f"短路特性示例结果：{result}")  # False，避免了除零错误

# 应用：提供默认值
user_input = input("请输入姓名（直接回车表示匿名）：") or "匿名用户"
print(f"欢迎，{user_input}！")  # 如果用户直接回车，user_input就是"匿名用户"
```

### 2.3 if语句基础：单分支结构

最简单的条件判断：如果条件成立，就执行某些操作。

```python
# ========== if单分支结构示例 ==========
# 语法：if 条件: → 缩进代码块

# 示例1：检查年龄是否成年
age = 20

if age >= 18:  # 条件：年龄是否大于等于18
    # 如果条件成立，执行下面的缩进代码块
    print("您已成年，可以独立签署合同。")
    print("欢迎进入成人世界！")
# 如果条件不成立，跳过整个缩进代码块

# 注意：print()在if外面，无论条件是否成立都会执行
print("年龄检查完毕。")

# 示例2：检查数字是否为正数
number = -5

if number > 0:  # 条件：数字是否大于0
    print(f"{number}是一个正数")
    
# 因为-5不大于0，所以if代码块不会执行，直接跳过
print("数字检查完成。")

# 示例3：用户输入验证
user_score = int(input("请输入考试分数："))

if user_score >= 60:  # 条件：分数是否≥60
    print("恭喜！你及格了！")
    print("可以进入下一阶段学习。")
    
print("分数验证流程结束。")

# 示例4：简单游戏逻辑
health = 100
damage = 30

if health > 0:  # 条件：生命值是否大于0
    health = health - damage  # 扣血
    print(f"受到{damage}点伤害！剩余生命值：{health}")
    
print("战斗回合结束。")
```

### 2.4 if-else语句：双分支结构

当有两种互斥的情况时，使用if-else结构。

```python
# ========== if-else双分支结构示例 ==========
# 语法：if 条件: → 代码块A else: → 代码块B

# 示例1：判断数字奇偶性
number = 7

if number % 2 == 0:  # 条件：数字除以2的余数是否为0
    # 条件成立：余数为0，是偶数
    print(f"{number}是偶数")
else:
    # 条件不成立：余数不为0，是奇数
    print(f"{number}是奇数")

# 示例2：判断闰年
year = 2024

# 闰年规则：能被4整除但不能被100整除，或者能被400整除
if (year % 4 == 0 and year % 100 != 0) or (year % 400 == 0):
    print(f"{year}年是闰年")
else:
    print(f"{year}年不是闰年")

# 示例3：用户登录验证
username = input("请输入用户名：")
password = input("请输入密码：")

# 假设正确的用户名是"admin"，密码是"123456"
if username == "admin" and password == "123456":
    print("登录成功！欢迎回来，管理员。")
else:
    print("用户名或密码错误！请重试。")

# 示例4：考试成绩评级（简化版）
score = 75

if score >= 60:
    print("考试通过")
else:
    print("考试未通过，需要补考")

print("评级完成。")
```

### 2.5 if-elif-else语句：多分支结构

当有多个互斥条件需要依次判断时，使用if-elif-else结构。

```python
# ========== if-elif-else多分支结构示例 ==========
# 语法：if 条件1: → 代码块1 elif 条件2: → 代码块2 ... else: → 代码块N

# 示例1：成绩等级判断（经典案例）
score = 85

if score >= 90:
    # 如果分数≥90，执行这里
    print("优秀")
elif score >= 80:
    # 如果90>分数≥80，执行这里（因为上一个条件不成立）
    print("良好")
elif score >= 70:
    # 如果80>分数≥70，执行这里
    print("中等")
elif score >= 60:
    # 如果70>分数≥60，执行这里
    print("及格")
else:
    # 如果所有条件都不成立（分数<60），执行这里
    print("不及格")

# 关键理解：条件判断是互斥且有序的！
# 一旦某个条件成立，就执行对应的代码块，然后跳出整个判断结构

# 示例2：简单计算器
num1 = float(input("请输入第一个数字："))
operator = input("请输入运算符(+, -, *, /)：")
num2 = float(input("请输入第二个数字："))

if operator == "+":
    result = num1 + num2
    print(f"{num1} + {num2} = {result}")
elif operator == "-":
    result = num1 - num2
    print(f"{num1} - {num2} = {result}")
elif operator == "*":
    result = num1 * num2
    print(f"{num1} * {num2} = {result}")
elif operator == "/":
    if num2 != 0:  # 避免除零错误
        result = num1 / num2
        print(f"{num1} / {num2} = {result}")
    else:
        print("错误：除数不能为零！")
else:
    print("不支持该运算符")

# 示例3：根据温度建议着装
temperature = float(input("请输入当前温度（摄氏度）："))

if temperature >= 30:
    print("天气炎热，建议穿短袖、短裤，注意防晒")
elif temperature >= 20:
    print("天气温暖，建议穿长袖T恤或薄外套")
elif temperature >= 10:
    print("天气凉爽，建议穿外套或薄毛衣")
elif temperature >= 0:
    print("天气寒冷，建议穿厚外套、毛衣")
else:
    print("天气严寒，建议穿羽绒服、保暖内衣，注意防寒")

# 示例4：会员等级判断
vip_level = int(input("请输入您的会员等级(1-5)："))

if vip_level == 5:
    print("尊贵的钻石会员！享受8折优惠，专属客服")
elif vip_level == 4:
    print("黄金会员！享受85折优惠，优先配送")
elif vip_level == 3:
    print("白银会员！享受9折优惠")
elif vip_level == 2:
    print("青铜会员！享受95折优惠")
elif vip_level == 1:
    print("普通会员！享受98折优惠")
else:
    print("请输入1-5之间的数字！")
```

### 2.6 嵌套条件语句

在条件内部再包含条件判断，实现更复杂的逻辑层次。

```python
# ========== 嵌套条件语句示例 ==========
# 语法：if 外部条件: → if 内部条件: → 代码块

# 示例1：多重安全检查
age = 25
has_id = True
has_money = False

if age >= 18:  # 第一层：年龄检查
    print("年龄符合要求")
    
    if has_id:  # 第二层：身份证检查
        print("身份证检查通过")
        
        if has_money:  # 第三层：资金检查
            print("所有条件满足，可以进入网吧")
        else:
            print("钱不够，不能进入")
    else:
        print("没有身份证，不能进入")
else:
    print("年龄不符合要求，不能进入")

# 示例2：三角形类型判断（综合应用）
a = float(input("请输入三角形第一条边长："))
b = float(input("请输入三角形第二条边长："))
c = float(input("请输入三角形第三条边长："))

# 首先判断是否能构成三角形
if a + b > c and a + c > b and b + c > a:
    print("这三条边可以构成三角形")
    
    # 再判断是什么类型的三角形
    if a == b == c:
        print("这是一个等边三角形（三条边都相等）")
    elif a == b or a == c or b == c:
        print("这是一个等腰三角形（有两条边相等）")
    elif a*a + b*b == c*c or a*a + c*c == b*b or b*b + c*c == a*a:
        print("这是一个直角三角形（满足勾股定理）")
    else:
        print("这是一个普通三角形（不等边也不特殊）")
else:
    print("这三条边不能构成三角形（任意两边之和必须大于第三边）")

# 示例3：考试成绩综合评估
score = float(input("请输入考试成绩："))

if score >= 0 and score <= 100:  # 第一层：分数有效性检查
    if score >= 60:  # 第二层：是否及格
        if score >= 90:  # 第三层：是否优秀
            print("优秀！继续保持！")
        elif score >= 80:
            print("良好！有很大进步空间。")
        else:
            print("及格！需要更加努力。")
    else:
        print("不及格！需要认真复习。")
else:
    print("输入错误！分数必须在0-100之间。")

# 示例4：购物优惠计算（实际业务场景）
total_price = float(input("请输入购物总金额："))
is_vip = input("您是VIP会员吗？(y/n)：").lower() == 'y'

if total_price > 0:
    if is_vip:
        if total_price >= 1000:
            final_price = total_price * 0.7  # VIP满1000打7折
            print(f"VIP专属优惠！7折后价格：{final_price:.2f}元")
        elif total_price >= 500:
            final_price = total_price * 0.8  # VIP满500打8折
            print(f"VIP专属优惠！8折后价格：{final_price:.2f}元")
        else:
            final_price = total_price * 0.9  # VIP普通9折
            print(f"VIP专属优惠！9折后价格：{final_price:.2f}元")
    else:
        if total_price >= 1000:
            final_price = total_price * 0.8  # 普通用户满1000打8折
            print(f"满1000优惠！8折后价格：{final_price:.2f}元")
        elif total_price >= 500:
            final_price = total_price * 0.9  # 普通用户满500打9折
            print(f"满500优惠！9折后价格：{final_price:.2f}元")
        else:
            final_price = total_price  # 无优惠
            print(f"总金额：{final_price:.2f}元")
else:
    print("金额无效！")
```

### 2.7 三元运算符（条件表达式）

对于简单的二选一赋值场景，可以使用更简洁的三元运算符。

```python
# ========== 三元运算符示例 ==========
# 语法：值1 if 条件 else 值2
# 含义：如果条件成立，返回"值1"；否则返回"值2"

# 示例1：找出两个数中的最大值
a = 10
b = 20
max_num = a if a > b else b  # 如果a>b，max_num=a；否则max_num=b
print(f"最大值是：{max_num}")

# 等价于：
if a > b:
    max_num = a
else:
    max_num = b

# 示例2：判断数字奇偶性（简洁版）
num = 7
result = "偶数" if num % 2 == 0 else "奇数"
print(f"{num}是{result}")

# 示例3：根据年龄判断是否成年
age = 17
status = "成年" if age >= 18 else "未成年"
print(f"年龄{age}岁，属于{status}")

# 示例4：成绩是否及格
score = 85
result = "及格" if score >= 60 else "不及格"
print(f"分数{score}分，{result}")

# 三元运算符可以嵌套，但会降低可读性，不建议过度使用
# 示例：判断成绩等级（简化嵌套）
score = 75
grade = "优秀" if score >= 90 else "良好" if score >= 80 else "及格" if score >= 60 else "不及格"
print(f"分数{score}分，等级：{grade}")
```

## 第三部分：实战练习题

请按照顺序完成以下练习题，从基础到进阶逐步提升。每个练习都有详细的要求，确保你理解每一步的目标。

### 📝 练习前准备
1. 打开Python编辑器（VS Code、IDLE等）
2. 新建文件`day3_practice.py`
3. 将下面的代码复制到文件中，逐个完成练习

### 练习1：基础条件判断（掌握if-else结构）

**要求**：
1. 编写程序，让用户输入一个整数
2. 判断这个数是正数、负数还是零
3. 输出对应的判断结果

```python
# ====== 练习1：你的代码写在这里 ======
print("=== 练习1：数字性质判断 ===")

# 1. 获取用户输入
num = int(input("请输入一个整数："))

# 2. 判断数字性质
if num > 0:
    # 如果大于0，是正数
    print(f"{num}是一个正数")
elif num < 0:
    # 如果小于0，是负数
    print(f"{num}是一个负数")
else:
    # 既不是正数也不是负数，就是0
    print(f"{num}是零")

print("判断完成！")
```

### 练习2：成绩等级判断（掌握多分支逻辑）

**要求**：
1. 让用户输入一个0-100之间的分数
2. 根据分数判断等级：
   - 90分以上：优秀
   - 80-89分：良好
   - 70-79分：中等
   - 60-69分：及格
   - 60分以下：不及格
3. 输出分数和对应的等级

```python
# ====== 练习2：你的代码写在这里 ======
print("=== 练习2：成绩等级判断 ===")

# 1. 获取用户输入，并验证范围
score = int(input("请输入考试成绩（0-100）："))

# 2. 判断等级
if score >= 90:
    grade = "优秀"
elif score >= 80:
    grade = "良好"
elif score >= 70:
    grade = "中等"
elif score >= 60:
    grade = "及格"
else:
    grade = "不及格"

# 3. 输出结果
print(f"你的成绩是{score}分，等级：{grade}")

# 4. 附加建议（选做）
if grade == "优秀":
    print("太棒了！继续保持！")
elif grade == "不及格":
    print("别灰心，认真复习，下次一定可以！")
else:
    print("有进步空间，继续加油！")
```

### 练习3：闰年判断器（掌握复杂逻辑组合）

**要求**：
1. 编写程序判断输入的年份是否为闰年
2. 闰年规则：
   - 能被4整除但不能被100整除，或者
   - 能被400整除
3. 输出判断结果，并解释原因

```python
# ====== 练习3：你的代码写在这里 ======
print("=== 练习3：闰年判断器 ===")

# 1. 获取用户输入
year = int(input("请输入年份："))

# 2. 判断是否为闰年
# 注意：要同时考虑两种规则
if (year % 4 == 0 and year % 100 != 0) or (year % 400 == 0):
    # 条件成立，是闰年
    is_leap = True
    reason = ""
    
    # 判断具体是哪种规则满足
    if year % 400 == 0:
        reason = "能被400整除"
    elif year % 100 != 0:
        reason = "能被4整除但不能被100整除"
else:
    # 条件不成立，不是闰年
    is_leap = False
    reason = "不满足闰年的任一条件"

# 3. 输出结果
if is_leap:
    print(f"{year}年是闰年（{reason}）")
else:
    print(f"{year}年不是闰年（{reason}）")

# 4. 附加信息：下一年的闰年情况（选做）
next_year = year + 1
if (next_year % 4 == 0 and next_year % 100 != 0) or (next_year % 400 == 0):
    print(f"有趣的是，{next_year}年是闰年！")
```

### 练习4：简易计算器（综合应用）

**要求**：
1. 让用户输入两个数字和一个运算符（+、-、*、/）
2. 根据运算符执行相应的计算
3. 特别注意：除法要检查除数是否为0
4. 输出计算过程和结果

```python
# ====== 练习4：你的代码写在这里 ======
print("=== 练习4：简易计算器 ===")

# 1. 获取用户输入
num1 = float(input("请输入第一个数字："))
operator = input("请输入运算符（+、-、*、/）：")
num2 = float(input("请输入第二个数字："))

# 2. 根据运算符执行计算
if operator == "+":
    # 加法
    result = num1 + num2
    print(f"{num1} + {num2} = {result}")
    
elif operator == "-":
    # 减法
    result = num1 - num2
    print(f"{num1} - {num2} = {result}")
    
elif operator == "*":
    # 乘法
    result = num1 * num2
    print(f"{num1} * {num2} = {result}")
    
elif operator == "/":
    # 除法：需要检查除数是否为0
    if num2 != 0:
        # 除数不为0，正常计算
        result = num1 / num2
        print(f"{num1} / {num2} = {result}")
    else:
        # 除数为0，给出错误提示
        print("错误：除数不能为零！")
        result = None  # 表示没有有效结果
        
else:
    # 不支持的运算符
    print(f"错误：不支持运算符 '{operator}'")
    result = None

# 3. 如果有有效结果，显示更多信息（选做）
if result is not None:
    print(f"计算结果：{result}")
    # 判断结果的性质
    if result > 0:
        print("结果是一个正数")
    elif result < 0:
        print("结果是一个负数")
    else:
        print("结果是零")
```

### 练习5：会员折扣系统（嵌套条件实战）

**要求**：
1. 询问用户是否为VIP会员
2. 输入购物金额
3. 根据VIP等级和金额计算折扣：
   - 非VIP：无折扣
   - VIP1级：满500打9折
   - VIP2级：满500打8.5折，满1000打8折
   - VIP3级：满500打8折，满1000打7折
4. 输出原价、折扣信息、最终价格

```python
# ====== 练习5：你的代码写在这里 ======
print("=== 练习5：会员折扣系统 ===")

# 1. 获取用户信息
is_vip = input("您是VIP会员吗？(y/n)：").lower() == 'y'
total_price = float(input("请输入购物总金额："))

# 2. 根据会员状态计算折扣
if is_vip:
    # 是VIP会员，进一步询问等级
    vip_level = int(input("请输入您的VIP等级（1-3）："))
    
    if vip_level == 1:
        # VIP1级：满500打9折
        if total_price >= 500:
            discount = 0.9
            reason = "VIP1级满500享9折"
        else:
            discount = 1.0  # 无折扣
            reason = "VIP1级但未满500元"
            
    elif vip_level == 2:
        # VIP2级：满500打8.5折，满1000打8折
        if total_price >= 1000:
            discount = 0.8
            reason = "VIP2级满1000享8折"
        elif total_price >= 500:
            discount = 0.85
            reason = "VIP2级满500享8.5折"
        else:
            discount = 1.0
            reason = "VIP2级但未满500元"
            
    elif vip_level == 3:
        # VIP3级：满500打8折，满1000打7折
        if total_price >= 1000:
            discount = 0.7
            reason = "VIP3级满1000享7折"
        elif total_price >= 500:
            discount = 0.8
            reason = "VIP3级满500享8折"
        else:
            discount = 1.0
            reason = "VIP3级但未满500元"
            
    else:
        # 无效的VIP等级
        print("错误：VIP等级必须是1-3之间的数字！")
        discount = 1.0
        reason = "无效等级，无折扣"
        
else:
    # 非VIP会员，无折扣
    discount = 1.0
    reason = "非VIP会员，无折扣"

# 3. 计算最终价格
final_price = total_price * discount
saving = total_price - final_price  # 节省的金额

# 4. 输出详细账单
print("\\n" + "="*50)
print("购物结算单")
print("="*50)
print(f"商品原价：{total_price:.2f}元")
print(f"折扣信息：{reason}")
print(f"折扣系数：{discount}")
print(f"节省金额：{saving:.2f}元")
print(f"最终支付：{final_price:.2f}元")
print("="*50)
```

## 第四部分：今日学习卡片

### 🎯 3个核心收获

1. **条件语句的完整体系**：
   - 掌握了从单分支（if）、双分支（if-else）到多分支（if-elif-else）的完整语法
   - 理解了条件判断的互斥性和顺序执行逻辑
   - 学会了嵌套条件语句的构建方法，能够处理多层决策场景

2. **布尔逻辑的深度应用**：
   - 熟练使用比较运算符（==、!=、>、<、>=、<=）构建条件表达式
   - 掌握了逻辑运算符（and、or、not）的组合使用和短路特性
   - 能够将复杂的生活决策逻辑转化为程序中的条件判断

3. **实际问题的编程解决**：
   - 能够根据具体需求设计合理的条件判断结构
   - 掌握了常见业务场景（成绩评级、闰年判断、折扣计算）的编程实现
   - 学会了通过代码注释提升可读性和可维护性

### ❓ 1个疑问收集（请在学习过程中记录）

**请思考并记录以下问题，明天我们一起探讨**：
1. 在if-elif-else结构中，如果多个条件同时成立，会发生什么？为什么？
2. 嵌套条件语句的缩进层级有什么规律？如果缩进出错会导致什么后果？
3. 在实际编程中，什么情况下应该使用嵌套条件，什么情况下应该使用多个独立的if语句？
4. 你还有什么其他关于条件语句的困惑？请在练习中记录下来。

### 💭 1个感悟

**请分享今天的编程体验和思考**：
1. 当你成功编写出第一个条件判断程序时，有什么感受？
2. 在完成练习题的过程中，哪个逻辑让你觉得最有挑战性？你是如何解决的？
3. 你认为条件语句在未来的AI学习中会扮演什么角色？为什么？
4. 对于明天要学习的循环结构，你有什么初步的期待或疑问？

## 第五部分：拓展思考（选做）

### 思考题1：逻辑运算符的优先级
```python
# 猜猜下面这些表达式的结果是什么？然后运行验证
print(True or False and False)   # 结果1
print((True or False) and False) # 结果2
print(not True or False)         # 结果3
print(not (True or False))       # 结果4

# 重要规则：
# 1. not的优先级最高
# 2. and的优先级高于or
# 3. 使用括号可以改变优先级
```

### 思考题2：条件语句的优化
```python
# 下面这段代码可以如何优化？
score = 85
if score >= 90:
    print("优秀")
elif score >= 80 and score < 90:
    print("良好")
elif score >= 70 and score < 80:
    print("中等")
elif score >= 60 and score < 70:
    print("及格")
else:
    print("不及格")

# 提示：elif后面的条件中，score < 90是必要的吗？为什么？
```

### 思考题3：实际应用联想
1. 你平时使用的APP或网站中，哪些功能用到了条件判断？试着列举3个例子。
2. 如果让你设计一个简单的天气APP，需要哪些条件判断逻辑？
3. 结合今天学的条件语句，你能想到什么可以自动化的日常决策？

## 第六部分：明日预告

**Day 4 主题：循环结构（while循环与for循环）**

明天你将学习：
- `while`循环：当条件满足时重复执行代码块
- `for`循环：遍历序列中的每个元素
- 循环控制：`break`（终止循环）和`continue`（跳过本次循环）
- 实际应用：批量处理数据、重复任务自动化、游戏循环等

**今日学习建议**：
1. 至少完成练习1-3，确保掌握基础条件判断
2. 尝试完成练习4-5，挑战更复杂的业务逻辑
3. 记录练习中出现的错误和解决方法，这是宝贵的经验
4. 思考一下：你生活中的哪些重复性任务可以用循环来简化？

**学习提示**：
- 条件语句是编程的"决策大脑"，理解越深，编程能力越强
- 多写注释，不仅帮助自己理解，也方便他人阅读
- 遇到复杂逻辑时，先画流程图，再写代码，事半功倍

祝学习顺利！明天我们将进入更精彩的循环世界！ 🚀

---

**学习时间**：建议今天投入1小时
- 15分钟：观看视频教程
- 30分钟：学习代码示例和完成练习
- 15分钟：总结反思和记录学习卡片

**重要提醒**：如果在条件判断的逻辑理解上有任何困惑，请务必记录下来。这是从"写代码"到"设计程序"的关键一步。