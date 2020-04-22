---
title: API使用方式
date: 2020-03-30 13:56:21
tags: [API, 说明, 二次开发]
---

## API 形式

收发数据采用 WebSocket，页面间采用 Dva(数据交互框架)，根据 Dva 的设计理念，我们将 WebSocket 使用 Dva 的 Models 进行了封装。所以界面获取数据仅需 Models 即可。

## API 的展现形式

在 API 手册或文章中，我们将以以下形式描述我们的 API。

### 数据的发送

以改变当前使用的坐标系为例，我们会如下描写。

```text
改变当前坐标系
命令字："DEADMAN_STATUS_SET"
数据：
{
robot: 1,  // 机器人号
coord: 0   // 坐标系，0-关节，1-直角，2-工具，3-用户
}
```

实际使用示例如下：

```javascript
import { sendMSGtoController } from "service/network";

let data = {
  robot: 1,
  coord: 0
};
sendMSGtoController("DEADMAN_STATUS_SET", data);
```

### 数据的获取

以获取当前机器人总数为例，我们会如下描写。

```text
获取机器人总数

发送
  命令字: ROBOT_AMOUNT_INQUIRE
  数据:""
界面获取
  models: robotStatus.robotAmount
  类型：int
  注释：无
```

实际使用示例如下：

```javascript
import { useEffect } from "react";
import { connect } from "dva";
import { sendMSGtoController } from "service/network";

const mapStateToProps = state => {
  return {
    /* 将models中的数据对应的组件的props */
    amount: state.index.robotStatus.robotAmount
  };
};

/* 界面的函数 */
function Name(props) {
  /* 使用React的Hooks,useEffect()方法,在组件加载时执行获取数据。 */
  useEffect(() => {
    /* sendMSGtoController(命令字,数据) */
    sendMSGtoController("ROBOT_AMOUNT_INQUIRE", "");
  }, []);
  return (
    <div>
      <p>当前机器人总数为{props.amount}</p>
    </div>
  );
}

export default connect(mapStateToProps)(Name);
```
