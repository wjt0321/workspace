# 测试驱动记忆模板 (Test-Driven Memory Template)

此文档用于构建“可执行的记忆”。我们将过去的错误案例转化为测试用例，确保错误永不复发。
旨在通过代码来固化经验，而非仅靠文档。

## 框架结构 (Framework Structure)

### 1. 机制说明
*   每当修复一个 Bug，必须尝试编写一个对应的**回归测试脚本**。
*   测试脚本应存放在 `tests/regression/` 目录下（需创建）。
*   测试应自动化运行，并能明确报告 Pass/Fail。

### 2. 测试清单 (Test Inventory)

#### TDM-[序号]: [测试标题]
*   **对应错误**: [描述之前遇到的 Bug 或逻辑错误]
*   **测试脚本**: `tests/regression/test_xxx.py`
*   **断言逻辑**:
    1.  [步骤1]
    2.  [步骤2]
    3.  断言 [结果] 应为 [预期值]。

---
*(示例)*
#### TDM-001: 边界值验证
*   **对应错误**: 输入为 0 时导致除以零错误。
*   **测试脚本**: `tests/regression/test_math.py`
*   **断言逻辑**:
    1.  调用 `calculate(0)`。
    2.  断言应抛出 `ValueError` 或返回 `None`，而不是崩溃。
