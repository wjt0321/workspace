---
title: Godot Engine 完整入门教程
description: 基于官方文档的 Godot 游戏引擎入门指南
tags: [godot, gamedev, tutorial, gdscript]
created: 2026-02-19
author: Godot 官方文档整理
---

# 🎮 Godot Engine 完整入门教程

> 从零开始学习 Godot 游戏引擎，掌握 2D/3D 游戏开发的核心技能

---

## 📑 目录

- [第一章：Godot 引擎介绍](#第一章godot-引擎介绍)
- [第二章：核心概念](#第二章核心概念)
- [第三章：GDScript 编程基础](#第三章gdscript-编程基础)
- [第四章：第一个场景实践](#第四章第一个场景实践)
- [第五章：脚本编程入门](#第五章脚本编程入门)
- [第六章：信号与通信](#第六章信号与通信)
- [第七章：内置类型详解](#第七章内置类型详解)
- [第八章：实用注解](#第八章实用注解)
- [第九章：学习资源与下一步](#第九章学习资源与下一步)

---

## 🚀 第一章：Godot 引擎介绍

### 🎯 什么是 Godot？

Godot 是一款**免费开源**的 2D/3D 游戏引擎，专为游戏开发者打造。🎨

### ✨ 核心特性

| 特性 | 描述 |
|------|------|
| 🆓 **完全免费** | MIT 许可证，无版权费用，商业使用无忧 |
| 🔓 **开源** | 源代码完全开放，社区驱动开发 |
| 🌐 **跨平台** | 支持 Linux, macOS, Windows, Android, iOS, Web, 主机 |
| 🎮 **2D/3D** | 统一的 2D 和 3D 游戏开发体验 |
| 📦 **轻量级** | 引擎体积小，下载快速 |
| 🔧 **内置工具** | 动画、物理、UI、着色器等一应俱全 |

### 🏆 为什么选择 Godot？

- **社区活跃** 👥：全球开发者共同贡献，文档丰富
- **学习曲线平缓** 📚：直观的节点系统，易于上手
- **GDScript 友好** 🐍：类 Python 语法，简洁优雅
- **节点系统强大** 🌳：灵活的树形结构，复用性强

---

## 🧩 第二章：核心概念

### 📦 节点（Nodes）

**节点**是 Godot 游戏的基本构建块，构成了游戏世界的每一个元素。🔨

每个节点都具有：
- 🏷️ **名称**：节点的唯一标识
- ⚙️ **属性**：定义节点的行为和外观
- 📞 **回调函数**：响应游戏事件的函数
- 🌿 **子节点**：形成树形结构

#### 常见节点类型

| 节点类型 | 用途 | 图标 |
|---------|------|------|
| `Node2D` | 2D 游戏的基础节点 | ⭕ |
| `Node3D` | 3D 游戏的基础节点 | 🔷 |
| `Sprite2D` | 显示 2D 图像 | 🖼️ |
| `Label` | 显示文本 | 📝 |
| `CharacterBody2D` | 2D 角色控制器 | 🏃 |
| `Camera2D` | 2D 摄像机 | 📷 |

### 🌲 场景（Scenes）

**场景**是节点的树形结构，可以保存为文件并重复使用。🎬

场景的特点：
- 💾 **可保存**：保存为 `.tscn` 文件
- 🔄 **可实例化**：在运行时动态创建
- 🧬 **可继承**：基于现有场景创建变体
- 🎭 **组件化**：每个场景是一个独立功能单元

### 🌍 场景树（Scene Tree）

场景树是游戏中所有节点的层级组织结构：

```
Scene Tree (根)
├── 🎮 主场景
│   ├── 🏃 玩家角色
│   │   ├── 🖼️ 精灵
│   │   └── 📷 摄像机
│   ├── 🌳 环境
│   │   ├── 🏔️ 地形
│   │   └── ☁️ 天空
│   └── 🎵 背景音乐
└── 🖥️ UI 层
    ├── ❤️ 血条
    └── 💰 分数
```

### 🔄 节点与场景的关系

```gdscript
# 场景是节点的容器，可以实例化使用
var enemy_scene = preload("res://Enemy.tscn")
var enemy = enemy_scene.instantiate()
add_child(enemy)  # 添加到场景树
```

---

## 🐍 第三章：GDScript 编程基础

### 📝 语言概述

GDScript 是 Godot 的专属脚本语言，设计灵感来自 Python：

- 🐍 **类 Python 语法**：缩进敏感，简洁优雅
- ⚡ **高性能**：编译为字节码，执行效率高
- 🔗 **深度集成**：与引擎 API 无缝衔接
- 📖 **类型可选**：支持静态类型检查

### 📊 变量与常量

#### 变量声明

```gdscript
# 动态类型（自动推断）
var a = 5
var name = "Godot"
var is_active = true

# 静态类型（推荐）
var health: int = 100
var speed: float = 10.5
var player_name: String = "Player1"
var target: Node2D

# 常量
const MAX_HEALTH = 100
const PI = 3.14159
const GAME_VERSION = "1.0.0"
```

#### 枚举

```gdscript
# 基本枚举
enum State {IDLE, WALK, RUN, JUMP}

# 带值的枚举
enum UnitType {
    UNIT_NEUTRAL = 0,
    UNIT_ENEMY = 1,
    UNIT_ALLY = 2
}

# 使用枚举
var current_state: State = State.IDLE
```

### 🔧 函数

```gdscript
# 基本函数
func my_function():
    print("Hello from function!")

# 带参数
func move(speed: float, direction: Vector2):
    position += direction * speed

# 带返回值
func calculate_damage(base: int, multiplier: float) -> int:
    return int(base * multiplier)

# 默认参数
func spawn_enemy(type: String = "goblin", count: int = 1):
    for i in range(count):
        print("Spawning ", type)
```

### 🔄 控制流

#### 条件语句

```gdscript
# if/elif/else
if health <= 0:
    die()
elif health < 25:
    warn_low_health()
else:
    regenerate()

# 三元运算符
var status = "alive" if health > 0 else "dead"

# match（类似 switch）
match current_state:
    State.IDLE:
        play_idle_animation()
    State.WALK:
        play_walk_animation()
    State.RUN:
        play_run_animation()
    _:
        print("Unknown state")
```

#### 循环

```gdscript
# for 循环
for i in range(10):
    print(i)  # 0-9

# 遍历数组
for enemy in enemies:
    enemy.take_damage(10)

# 遍历字典
for key in player_stats:
    print(key, ": ", player_stats[key])

# while 循环
while health > 0:
    regenerate()
    await get_tree().create_timer(1.0).timeout

# break 和 continue
for i in range(100):
    if i == 50:
        break  # 退出循环
    if i % 2 == 0:
        continue  # 跳过偶数
    print(i)
```

### 🏛️ 类与继承

```gdscript
# 继承自 CharacterBody2D
extends CharacterBody2D

# 类名（用于全局访问）
class_name Player

# 类变量
@export var speed: float = 300.0
@export var jump_velocity: float = -400.0

# 构造函数（可选）
func _init():
    print("Player created!")

# 虚函数重写
func _ready():
    super._ready()  # 调用父类方法
    print("Player ready!")
```

---

## 🎬 第四章：第一个场景实践

### 🎯 创建 Hello World 场景

让我们创建你的第一个 Godot 场景！🚀

#### 步骤 1：创建新场景

1. 打开 Godot 编辑器
2. 点击 **场景 -> 新建场景** (Ctrl+N)
3. 选择 **其他节点** -> 搜索 **Label**

#### 步骤 2：设置 Label 属性

在检查器面板中修改：

| 属性 | 值 | 说明 |
|------|-----|------|
| Text | Hello World! | 显示的文本 |
| Horizontal Alignment | Center | 水平居中 |
| Vertical Alignment | Center | 垂直居中 |
| Theme Overrides/Font Size | 64 | 字体大小 |

#### 步骤 3：运行场景

```gdscript
# 可选：添加脚本让文字动起来
extends Label

func _process(delta):
    # 让文字左右摇摆
    position.x = 400 + sin(Time.get_time_dict_from_system()["second"]) * 50
```

#### 快捷键

| 操作 | 快捷键 | 说明 |
|------|--------|------|
| 运行当前场景 | F6 | 测试当前场景 |
| 运行项目 | F5 | 运行主场景 |
| 停止 | F8 | 停止运行 |
| 保存场景 | Ctrl+S | 保存当前场景 |

### 🏠 设置主场景

1. 运行项目时（F5），Godot 会提示设置主场景
2. 选择你保存的场景文件（`.tscn`）
3. 也可以在 **项目 -> 项目设置 -> 应用 -> 运行** 中修改

---

## 💻 第五章：脚本编程入门

### 🔄 生命周期函数

Godot 提供了多个回调函数，在特定时机自动调用：

```gdscript
extends Node2D

# 节点初始化时调用（进入场景树）
func _ready():
    print("节点已准备好！")
    setup_player()

# 每帧调用（渲染帧）
func _process(delta):
    # delta: 上一帧到当前帧的时间（秒）
    rotate(rotation_speed * delta)

# 每物理帧调用（固定频率）
func _physics_process(delta):
    # 适合处理物理相关的逻辑
    velocity.y += gravity * delta
    move_and_slide()

# 节点被移除时调用
func _exit_tree():
    print("节点被移除！")
```

#### 函数对比

| 函数 | 调用频率 | 用途 |
|------|----------|------|
| `_ready()` | 一次 | 初始化设置 |
| `_process(delta)` | 每渲染帧 | 动画、UI 更新 |
| `_physics_process(delta)` | 固定频率（默认 60fps） | 物理、移动 |
| `_input(event)` | 有输入时 | 处理输入事件 |

### 🔍 节点引用

```gdscript
extends Node2D

# 方式 1：使用 $ 符号（节点路径）
@onready var player = $Player
@onready var health_bar = $UI/HealthBar

# 方式 2：使用 % 符号（唯一名称）
@onready var camera = %PlayerCamera

# 方式 3：使用 get_node()
var enemy = get_node("Enemies/Goblin")

# 方式 4：使用 find_child()（递归搜索）
var button = find_child("StartButton")

func _ready():
    # 修改引用的节点
    player.position = Vector2(100, 100)
    health_bar.value = 100
```

### 🎮 输入处理

```gdscript
extends CharacterBody2D

@export var speed: float = 300.0

func _physics_process(delta):
    var direction = Vector2.ZERO
    
    # 检查按键状态
    if Input.is_action_pressed("ui_left"):
        direction.x -= 1
    if Input.is_action_pressed("ui_right"):
        direction.x += 1
    if Input.is_action_pressed("ui_up"):
        direction.y -= 1
    if Input.is_action_pressed("ui_down"):
        direction.y += 1
    
    # 归一化防止斜向移动过快
    direction = direction.normalized()
    
    # 应用移动
    velocity = direction * speed
    move_and_slide()

# 输入事件回调
func _input(event):
    if event.is_action_pressed("ui_accept"):
        jump()
    if event.is_action_released("ui_cancel"):
        pause_game()
```

#### 输入映射配置

在 **项目 -> 项目设置 -> 输入映射** 中自定义：

| 动作名称 | 默认按键 | 用途 |
|----------|----------|------|
| `ui_left` | ← 或 A | 向左移动 |
| `ui_right` | → 或 D | 向右移动 |
| `ui_up` | ↑ 或 W | 向上移动 |
| `ui_down` | ↓ 或 S | 向下移动 |
| `ui_accept` | Enter 或 Space | 确认/跳跃 |
| `ui_cancel` | Escape | 取消/暂停 |

---

## 📡 第六章：信号与通信

### 🔔 什么是信号？

**信号**是 Godot 的观察者模式实现，用于节点间的松耦合通信。📨

### 📝 定义与发射信号

```gdscript
extends CharacterBody2D
class_name Player

# 定义信号
signal health_changed(old_value, new_value)
signal died
signal item_collected(item_name: String, quantity: int)

var health: int = 100:
    set(value):
        var old_health = health
        health = clamp(value, 0, max_health)
        # 发射信号
        health_changed.emit(old_health, health)
        if health <= 0:
            died.emit()

func take_damage(amount: int):
    health -= amount

func heal(amount: int):
    health += amount
```

### 🔗 连接信号

```gdscript
extends Node2D

@onready var player = $Player
@onready var health_bar = $UI/HealthBar

func _ready():
    # 方式 1：使用 connect() 方法
    player.health_changed.connect(_on_player_health_changed)
    player.died.connect(_on_player_died)
    
    # 方式 2：使用 Callable
    player.item_collected.connect(func(item, qty): 
        print("Got ", qty, "x ", item)
    )

func _on_player_health_changed(old_value: int, new_value: int):
    health_bar.value = new_value
    print("Health: ", old_value, " -> ", new_value)

func _on_player_died():
    print("Game Over!")
    show_game_over_screen()
```

### ⏳ 使用 await 等待信号

```gdscript
extends Node2D

func start_dialogue():
    # 显示对话框
    var dialog = $DialogBox
    dialog.show()
    
    # 等待用户点击继续按钮
    await $ContinueButton.button_up
    
    # 继续执行
    dialog.next_line()
    
    # 等待对话结束信号
    await dialog.dialogue_finished
    
    # 关闭对话框
    dialog.hide()
    start_gameplay()

# 等待时间
func spawn_with_delay():
    await get_tree().create_timer(2.0).timeout
    spawn_enemy()

# 等待下一帧
func wait_next_frame():
    await get_tree().process_frame
    print("下一帧执行")
```

### 🎯 信号使用最佳实践

| 场景 | 推荐做法 |
|------|----------|
| 玩家受伤更新 UI | 使用信号通知 UI 更新 |
| 敌人死亡生成掉落物 | 敌人发射信号，掉落管理器接收 |
| 关卡完成 | 关卡发射信号，游戏管理器处理 |
| 按钮点击 | 内置 `pressed` 信号 |

---

## 📦 第七章：内置类型详解

### 📐 向量类型

```gdscript
# Vector2 - 2D 向量
var position = Vector2(100, 200)
var direction = Vector2.RIGHT  # (1, 0)
var velocity = Vector2.ZERO    # (0, 0)

# 向量运算
var new_pos = position + velocity * delta
var distance = position.distance_to(target_pos)
var normalized = direction.normalized()
var length = velocity.length()

# 常用常量
Vector2.ZERO    # (0, 0)
Vector2.ONE     # (1, 1)
Vector2.RIGHT   # (1, 0)
Vector2.LEFT    # (-1, 0)
Vector2.UP      # (0, -1)
Vector2.DOWN    # (0, 1)

# Vector3 - 3D 向量
var pos_3d = Vector3(1, 2, 3)
var forward = Vector3.FORWARD
```

### 📚 数组与字典

```gdscript
# Array - 动态数组
var inventory: Array[String] = ["sword", "shield", "potion"]
inventory.append("key")           # 添加元素
inventory.remove_at(0)            # 删除索引 0
inventory.erase("shield")         # 删除指定值
var first = inventory[0]          # 访问元素
var count = inventory.size()      # 获取大小

# 数组遍历
for item in inventory:
    print(item)

# 带索引遍历
for i in range(inventory.size()):
    print(i, ": ", inventory[i])

# Dictionary - 字典
var player_stats = {
    "name": "Hero",
    "level": 10,
    "health": 100,
    "mana": 50
}

# 访问和修改
player_stats["health"] = 120
player_stats.experience = 1000  # 另一种访问方式

# 检查键
if player_stats.has("mana"):
    print("Has mana!")

# 遍历字典
for key in player_stats:
    print(key, ": ", player_stats[key])

for key in player_stats.keys():
    print(key)

for value in player_stats.values():
    print(value)

for key in player_stats:
    var value = player_stats[key]
    print(key, ": ", value)
```

### 🎨 其他常用类型

```gdscript
# Color - 颜色
var red = Color.RED
var custom = Color(1.0, 0.5, 0.0)  # RGB
var with_alpha = Color(1, 0, 0, 0.5)  # RGBA

# Rect2 - 矩形
var rect = Rect2(Vector2(10, 10), Vector2(100, 50))
var contains = rect.has_point(Vector2(50, 30))

# Transform2D - 2D 变换
var transform = Transform2D()
transform = transform.translated(Vector2(100, 0))
transform = transform.rotated(PI / 4)

# String - 字符串
var text = "Hello, Godot!"
var upper = text.to_upper()
var contains_word = text.contains("Godot")
var replaced = text.replace("Godot", "World")
```

### 📊 类型对比表

| 类型 | 用途 | 示例 |
|------|------|------|
| `Vector2` | 2D 位置/方向 | `Vector2(100, 200)` |
| `Vector3` | 3D 位置/方向 | `Vector3(1, 2, 3)` |
| `Array` | 有序集合 | `[1, 2, 3]` |
| `Dictionary` | 键值对 | `{"key": "value"}` |
| `Color` | 颜色值 | `Color.RED` |
| `Rect2` | 2D 矩形 | `Rect2(0, 0, 100, 100)` |
| `String` | 文本 | `"Hello"` |
| `Transform2D` | 2D 变换矩阵 | `Transform2D()` |

---

## 🏷️ 第八章：实用注解

### 🎨 常用注解

```gdscript
extends Node2D

# @export - 在编辑器中显示并编辑
@export var speed: float = 100.0
@export var player_name: String = "Player"
@export var texture: Texture2D
@export_enum("Easy", "Normal", "Hard") var difficulty: String = "Normal"
@export_range(0, 100) var health: int = 100
@export_multiline var description: String
@export_color_no_alpha var player_color: Color

# @onready - 在 _ready() 中自动初始化
@onready var sprite = $Sprite2D
@onready var animation_player = $AnimationPlayer

# @tool - 在编辑器中运行脚本
@tool
extends EditorScript

func _run():
    print("在编辑器中执行！")
```

### 📋 注解速查表

| 注解 | 用途 | 示例 |
|------|------|------|
| `@export` | 导出变量到编辑器 | `@export var health: int` |
| `@export_range` | 导出带范围的数值 | `@export_range(0, 100) var value` |
| `@export_enum` | 导出枚举选择 | `@export_enum("A", "B") var choice` |
| `@export_multiline` | 导出多行文本 | `@export_multiline var text` |
| `@export_file` | 导出文件选择 | `@export_file var path` |
| `@onready` | 延迟初始化 | `@onready var node = $Path` |
| `@tool` | 编辑器脚本 | `@tool extends Node` |
| `@icon` | 自定义节点图标 | `@icon("res://icon.svg")` |

### 💡 使用示例

```gdscript
@tool
@icon("res://player_icon.svg")
class_name Player
extends CharacterBody2D

# 可在编辑器中调整的属性
@export_group("Movement")
@export var speed: float = 300.0
@export var jump_force: float = -400.0
@export_range(0.1, 1.0) var acceleration: float = 0.5

@export_group("Visuals")
@export var sprite_color: Color = Color.WHITE
@export_file("*.png") var portrait_path: String

# 自动获取节点引用
@onready var sprite = $Sprite2D
@onready var collision = $CollisionShape2D

func _ready():
    # @onready 变量在这里已经初始化
    sprite.modulate = sprite_color
```

---

## 📚 第九章：学习资源与下一步

### 🎓 推荐学习路径

```
初学者
├── 1️⃣ 完成官方文档 "Getting Started" 教程
├── 2️⃣ 制作简单的 2D 游戏（如 Flappy Bird）
├── 3️⃣ 学习 GDScript 高级特性
├── 4️⃣ 尝试 3D 游戏开发
└── 5️⃣ 参与开源项目或 Game Jam
```

### 🔗 官方资源

| 资源 | 链接 | 说明 |
|------|------|------|
| 📖 官方文档 | [docs.godotengine.org](https://docs.godotengine.org) | 最权威的学习资料 |
| 🎬 官方教程 | YouTube - Godot Engine | 视频教程 |
| 💬 社区论坛 | [godotforums.org](https://godotforums.org) | 提问交流 |
| 🐙 GitHub | [github.com/godotengine](https://github.com/godotengine) | 源码和 Issues |

### 🛠️ 推荐工具

- **Godot 版本**: 4.x（最新稳定版）
- **代码编辑器**: 内置编辑器 / VS Code + Godot Tools 插件
- **版本控制**: Git + GitHub/GitLab
- **美术资源**: Aseprite（像素画）、Blender（3D 模型）

### 🎯 练习项目建议

1. **🎮 2D 平台跳跃** - 学习物理移动、动画、关卡设计
2. **🚀 太空射击** - 学习实例化、碰撞、粒子效果
3. **🧩 益智游戏** - 学习网格系统、游戏状态管理
4. **🏰 RPG 原型** - 学习对话系统、任务系统、存档
5. **🌐 多人游戏** - 学习网络同步、RPC 调用

### 💡 最佳实践

- ✅ 使用 **场景** 组织代码，保持模块化
- ✅ 善用 **信号** 解耦节点间的通信
- ✅ 为变量添加 **类型注解**，提高代码可读性
- ✅ 使用 **@export** 让设计可调参数暴露给编辑器
- ✅ 遵循 **命名规范**：snake_case 用于变量和函数，PascalCase 用于类名

---

## 🎉 结语

恭喜你完成了 Godot Engine 的入门学习！🎊

Godot 是一个功能强大且不断发展的游戏引擎，社区活跃，文档完善。记住：

> **最好的学习方式是动手实践** 🛠️

开始你的第一个游戏项目吧，遇到问题随时查阅官方文档或社区求助。祝你游戏开发之旅愉快！🚀

---

*本教程基于 Godot 官方文档整理，最后更新于 2026-02-19*
