---
layout: page # 必须
title: 项目进展
date: 2020-03-25 15:05:13
description: 3月25日更新
reward: false # 禁用打赏，可选，默认开启
---

@card{

@timeline{

##### 2020

@item{

###### 4 月 3 日

在arm64成功运行
startx 启动时要加--ignore-gpu-blacklist和--use-gl=egl参数

}

@item{

###### 4 月 1 日

关节参数界面做好
根据机器人类型动态渲染界面

}

@item{

###### 3 月 31 日

权限切换
根据权限切换控件的显示实现

}

@item{

###### 3 月 30 日

机器人状态相关的API写好

}

@item{

###### 3 月 27 日

实际控制伺服的点动做好。

}

@item{

###### 3 月 26 日

开机流程做好
`src/models/main`

}

@item{

###### 3 月 25 日

1.点动做好，在`src/layout/state/jog.js`;
2.开机获取控制器数据的机制做好，在`src/models/main.js`，但是和 server 端的通讯有点问题，一次发送几条消息，有可能会有几条收不到;
3.服务端接收不到消息的问题解决，服务端改用QWebsocket。

}

@item{

###### 3 月 12 日

1.Dva 和 websocket 的统一，通过 `models/network` 中的 `subscriptions` 对 websocket 进行订阅；
2.通过 `models/default` 中的文件，给各个界面的参数默认值，通过 `props` 传送给界面；
3.websocket 接收到 Server 端的数据后，仅需要通过 `action` 对 `default` 中的数据进行更改便可直接同步到界面。

}

}

## 下面要做的

1. 程序打开，解析指令，修改movj、movl、movc等指令；
2. 几个状态查看界面。

}
