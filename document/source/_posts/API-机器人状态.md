---
title: API-机器人状态
date: 2020-03-30 14:31:56
tags: [API, 说明, 二次开发]
---

机器人状态包含如下内容

- 机器人总数
- 当前的操作模式（示教/运行/远程）
- 当前操作机器人
- 当前机器人类型
- 是否为多机模式
- 当前机器人伺服状态
- 是否在上电（示教模式按下 Deadman）
- 当前机器人运行状态（运行模式的程序运行状态）
- 当前机器人手动操作速度
- 当前机器人自动运行速度
- 当前机器人使用的用户坐标系序号
- 当前机器人使用的工具坐标系序号
- 当前机器人使用的坐标系
- 当前机器人单步运行的顺序（正序/倒叙）
- 当前机器人的姿态形式（弧度/角度）
- 当前机器人的位置
- 当前机器人在姿态为角度下的位置

## 获取

### 机器人总数

#### 发送

命令字: **ROBOT_AMOUNT_INQUIRE**
数据: ""

#### 界面获取

models: **robotStatus.robotAmount**
类型: int

### 当前的操作模式（示教/运行/远程）

#### 发送

命令字: **CURRENT_OPERATION_MODE_INQUIRE**
数据: ""

#### 界面获取

models: **robotStatus.operaMode**
类型: int
注释: 0-示教,1-远程,2-运行

### 当前操作机器人

#### 发送

命令字: **CURRENT_ROBOT_INQUIRE**
数据: ""

#### 界面获取

models: **robotStatus.currentRobot**
类型: int
注释: 无

### 当前机器人类型

#### 发送

命令字: **CURRENT_ROBOT_TYPE_INQUIRE**
数据:
{
robot:1 //机器人序号
}

#### 界面获取

models: **robotStatus.currentRobotType**
类型: int
注释: 各数字对应机器人如下

1. R_NULL = 0,
2. R_GENERAL_6S = 1,
3. R_SCARA = 2,
4. R_FOURAXIS_PALLET = 3,
5. R_FOURAXIS = 4,
6. R_GENERAL_1S = 5,
7. R_GENERAL_5S = 6,
8. R_GENERAL_6S_1 = 7,
9. R_SCARA_TWOAXIS = 8,
10. R_SCARA_THREEAXIS = 9,
11. R_THREE_CARTESIAN_COORDINATE = 10,
12. R_THREE_CARTESIAN_COORDINATE_1 = 11,
13. R_FOUR_CARTESIAN_COORDINATE = 12,

### 是否为多机模式

models: **robotStatus.multiRobotMode**
类型: int
注释: 0-单机模式,1-多机模式

### 当前机器人伺服状态

#### 发送

命令字: **CURRENT_ROBOT_SERVO_STATE_INQUIRE**
数据:
{
robot:1 //机器人序号
}

#### 界面获取

models: **robotStatus.currentRobotServoState**
类型: int
注释: 0-停止,1-就绪,2-错误,3-运行

### 是否在上电（示教模式按下 Deadman）

#### 发送

命令字: **DEADMAN_STATUS_INQUIRE**
数据: ""

#### 界面获取

models: **robotStatus.currentRobotServoState**
类型: int
注释: 0-停止,1-就绪,2-错误,3-运行

### 当前机器人运行状态（运行模式的程序运行状态）

#### 发送

命令字: **CURRENT_ROBOT_RUNNING_STATE_INQUIRE**
数据:
{
robot:1 // 机器人序号
}

#### 界面获取

models: **robotStatus.currentRobotServoState**
类型: int
注释: 0-停止,1-就绪,2-错误,3-运行

### 当前机器人手动操作速度

#### 发送

命令字: **CURRENT_ROBOT_SPEED_INQUIRE**
数据:
{
robot:1 // 机器人序号
}
注释：在示教模式获取的为手动操作速度，在其它模式获取的为运行速度。

#### 界面获取

models: **robotStatus.handleSpeed**
类型: int
注释: 数值是百分比

### 当前机器人自动运行速度

#### 发送

命令字: **CURRENT_ROBOT_SPEED_INQUIRE**
数据:
{
robot:1 // 机器人序号
}
注释：在示教模式获取的为手动操作速度，在其它模式获取的为运行速度。

#### 界面获取

models: **robotStatus.runningSpeed**
类型: int
注释: 数值是百分比

### 当前机器人使用的用户坐标系序号

#### 发送

命令字: **CURRENT_ROBOT_USER_INQUIRE**
数据:
{
robot:1 // 机器人序号
}

#### 界面获取

models: **robotStatus.currentUser**
类型: int
注释: 1-9 是用户坐标 1-9,0 代表无用户坐标

### 当前机器人使用的工具坐标系序号

#### 发送

命令字: **CURRENT_ROBOT_TOOL_INQUIRE**
数据:
{
robot:1 // 机器人序号
}

#### 界面获取

models: **robotStatus.currentTool**
类型: int
注释: 1-9 是工具坐标 1-9,0 代表无工具

### 当前机器人使用的坐标系

#### 发送

命令字: **CURRENT_ROBOT_COORD_INQUIRE**
数据:
{
robot:1 // 机器人序号
}

#### 界面获取

models: **robotStatus.currentCoordinate**
类型: int
注释: 0-关节,1-直角,2-工具,3-用户

### 当前机器人单步运行的顺序（正序/倒叙）

#### 发送

命令字: **CURRENT_ROBOT_FB_INQUIRE**
数据: ""

#### 界面获取

models: **robotStatus.currentForwardOrBackward**
类型: bool
注释: true-倒叙,false-正序

### 当前机器人的姿态形式（弧度/角度）

models: **robotStatus.deg**
类型: int
注释: 0-弧度,1-弧度

### 当前机器人的位置

#### 发送

命令字: **CURRENTPOS_INQUIRE**
数据:
{
"robot":1, //1，2，3，4 表示机器人 1，2，3，4
"coord":1 //坐标模式
}

#### 界面获取

models: **robotStatus.pos**
类型: array
注释: [1 轴,2 轴,3 轴,4 轴,5 轴,6 轴,7 轴]根据当前坐标系为对应的数值。

### 当前机器人在姿态为角度下的位置

models: **robotStatus.posDeg**
类型: array
注释: [1 轴,2 轴,3 轴,4 轴,5 轴,6 轴,7 轴]根据当前坐标系为对应的数值。

## 设置

### 切换当前的操作模式（示教/运行/远程）

命令字: **OPERATION_MODE_SET**
数据:
{
"mode":0 //0 示教，1 远程，2 运行
}

### 切换当前操作的机器人

命令字: **ROBOT_SWITCH**
数据:
{
"mode":0, //0：单机模式，1：多机模式
"robot":1 //机器人号
}

### 切换伺服状态

命令字: **SERVO_STATUS_SET**
数据:
{
robot:1, //1,2,3,4 表示机器人 1,2,3,4
status:0 //0:停止，1：就绪
}

### 示教模式上电和下电

命令字: **DEADMAN_STATUS_SET**
数据:
{
deadman:1 //0:伺服下电，1：伺服上电
}

### 设置速度

命令字: **SPEED_SET**
数据:
{
robot:1, // 机器人号
speed:50 // 速度（百分比）
}
注释: 在示教模式下设置，则设置的为手动速度。在其它模式设置，则设置自动运行速度。

### 设置用户坐标序号

命令字: **USERCOORDINATE_SWITCH**
数据:
{
robot:1, // 机器人号
userNum:5 // 用户坐标序号,0 表示无
}

### TOOLNUMBER_SWITCH

命令字: **TOOLNUMBER_SWITCH**
数据:
{
robot:1, // 机器人号
curToolNum:5 // 工具序号,0 表示无
}

### 切换坐标系

命令字: **TOOLNUMBER_SWITCH**
数据:
{
robot:1, //机器人号
coord:0 //0 关节，1 直角，2 工具，3 用户
}
