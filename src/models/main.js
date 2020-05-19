import React from "react";
import {
  ws,
  sendMSGtoServer,
  comeMessage,
  IP,
  PORT,
  sendMSGtoController,
} from "service/network";
import { notification, message as showMessage, Button } from "antd";
import { controllerConfig } from "./default/controllerconfig";
import { robotStatus } from "./default/robotstatus";
import { robotParameter } from "./default/robotParameter";
import { IOParameter } from "./default/ioparameter";
import { project, program } from "./default/project";
import { robotEncrypt } from "./default/robotencrypt";
import { IOConfig } from "./default/ioconfig";
import { IOName } from "./default/ioname";

const Setting = {
  inquireFailedRetryTime: 1000,
};

/* 初始化机器人时发送查询服务端初始化信息 */
function sendCheckServerState() {
  sendMSGtoServer("CheckState", "");
}
/* 接收到服务端初始化信息后做处理 */

 
function receiveCheckServerState(state) {
  /* 如果已经初始化完成，则往下执行 */
  if (state === true) {
    showMessage.destroy();
    showMessage.loading("服务端初始化完成");
    sendMSGtoController("CONTROLLER_IP_INQUIRE", "");
    sendMSGtoController("CONTROLLER_ID_INQUIRE", "");
    sendMSGtoController("ROBOT_ENCRYPT_INQUIRE", "");
    sendMSGtoController("ROBOT_AMOUNT_INQUIRE", "");
    sendMSGtoController("CURRENT_ROBOT_INQUIRE", "");
    sendMSGtoController("IO_CONFIG_INQUIRE", "");
    sendMSGtoController("DIN_NAME_INQUIRE", "");
    sendMSGtoController("DOUT_NAME_INQUIRE", "");
    sendMSGtoController("AIN_NAME_INQUIRE", "");
    sendMSGtoController("CURRENT_OPERATION_MODE_INQUIRE", "");
    sendMSGtoController("AOUT_NAME_INQUIRE", "");
  } else if (state === false) {
    /* 如果没有初始化完成，则1秒后重新查询 */
    showMessage.destroy();
    showMessage.loading("正在等待服务端初始化");
    setTimeout(() => {
      sendCheckServerState();
    }, Setting.inquireFailedRetryTime);
  }
}
/* 接收到当前机器人后发的 */
function sendCheckCurrentRobotState(robot) {
  let curRobot = {
    robot: robot,
  };
  sendMSGtoController("CURRENT_ROBOT_TYPE_INQUIRE", curRobot);
  sendMSGtoController("CURRENT_ROBOT_SERVO_STATE_INQUIRE", curRobot);
  sendMSGtoController("CURRENT_ROBOT_RUNNING_STATE_INQUIRE", curRobot);
  sendMSGtoController("CURRENT_ROBOT_SPEED_INQUIRE", curRobot);
  sendMSGtoController("CURRENT_ROBOT_USER_INQUIRE", curRobot);
  sendMSGtoController("CURRENT_ROBOT_TOOL_INQUIRE", curRobot);
  sendMSGtoController("CURRENT_ROBOT_COORD_INQUIRE", curRobot);
  sendMSGtoController("CURRENT_ROBOT_FB_INQUIRE", "");
  sendMSGtoController("CURRENT_ROBOT_ENCODER_STATE_INQUIRE", curRobot);
}

export default {
  namespace: "index",

  state: {
    opened: -1,
    serverInit: 0,
    controllerConfig,
    robotStatus,
    project,
    program,
    robotParameter,
    IOParameter,
    robotEncrypt,
    IOConfig,
    IOName,
  },

  subscriptions: {
    /* 开机初始化 */
    onOpen({ dispatch }) {
      ws.onopen = () => {
        showMessage.destroy();
        showMessage.success(`连接${IP}:${PORT}成功`, 1);
        sendCheckServerState();
        dispatch({
          type: "onOpen",
          data: 1,
        });
      };
    },
    onClose({ dispatch }) {
      ws.onclose = () => {
        console.log("网络中断");
        const args = {
          message: "连接已断开！",
          description: (
            <div>
              <p>连接已断开，是否重试？</p>
              <Button
                onClick={() => {
                  window.location.reload();
                }}
              >
                重试
              </Button>
            </div>
          ),
          duration: 0,
        };
        showMessage.destroy();
        notification.error(args);
        dispatch({
          type: "onClose",
          data: 0,
        });
      };
    },
    onError({ dispatch }) {
      ws.onerror = (err) => {
        dispatch({
          type: "onError",
          data: 2,
        });
      };
    },
    /* 对接收到的所有数据通过命令字分别分配对应的aciton */
    Websocket({ dispatch }) {
      var data = "";
      ws.onmessage = async (message) => {
        data = await comeMessage(message);
        let command;
        command = data[0];
        let dataString;
        if (data[1] === undefined) {
          showMessage.error(`接收到空数据，命令字为${command}`);
          return;
        }
        if (data[1] === "") {
          dataString = "";
        } else {
          dataString = JSON.parse(data[1]);
        }
        /* 命令字 */
        console.group("接收到控制器数据");
        console.log("命令字", command);
        console.log("数据", dataString);
        
        console.groupEnd();
        switch (command) {
          case "4303":
            dispatch({
              type: "receiveControllerIP",
              data: dataString,
            });
            break;
          case "5053":
            dispatch({
              type: "receiveControllerID",
              data: dataString,
            });
            break;
          case "2e0c":
            dispatch({
              type: "receiveRobotEncrypt",
              data: dataString,
            });
            break;
          case "2e06":
            dispatch({
              type: "receiveRobotAmount",
              data: dataString,
            });
            break;
          case "2103":
            dispatch({
              type: "receiveSetModeSuccess",
              data: dataString,
            });
            break;
          case "5003":
            dispatch({
              type: "receiveCurrentRobot",
              data: dataString,
            });
            break;
          case "2e03":
            dispatch({
              type: "receiveCurrentRobotType",
              data: dataString,
            });
            break;
          case "2303":
            dispatch({
              type: "receiveDeadmanState",
              data: dataString,
            });
            break;
          case "2003":
            dispatch({
              type: "receiveRobotServoState",
              data: dataString,
            });
            break;
          case "3d03":
            dispatch({
              type: "receiveRobotRunningState",
              data: dataString,
            });
            break;
          case "2603":
            dispatch({
              type: "receiveRobotSpeed",
              data: dataString,
            });
            break;
          case "3c0c":
            dispatch({
              type: "receiveCurrentUser",
              data: dataString,
            });
            break;
          case "380c":
            dispatch({
              type: "receiveCurrentTool",
              data: dataString,
            });
            break;
          case "2203":
            dispatch({
              type: "receiveCurrentCoordinate",
              data: dataString,
            });
            break;
          case "2406":
            dispatch({
              type: "receiveCurrentForwardOrBackward",
              data: dataString,
            });
            break;
          case "3306":
            dispatch({
              type: "receiveServoEncoderUnderVoltageState",
              data: dataString,
            });
            break;
          case "5013":
            dispatch({
              type: "receiveCycleCountRespond",
              data: dataString,
            });
            break;
          case "2f23":
            dispatch({
              type: "receiveIOConfig",
              data: dataString,
            });
            break;
          case "2f49":
            dispatch({
              type: "receiveDinName",
              data: dataString,
            });
            break;
          case "2f4c":
            dispatch({
              type: "receiveDoutName",
              data: dataString,
            });
            break;
          case "2f4f":
            dispatch({
              type: "receiveAinName",
              data: dataString,
            });
            break;
          case "2f52":
            dispatch({
              type: "receiveAoutName",
              data: dataString,
            });
            break;
          case "2a03":
            dispatch({
              type: "receiveCurrentPos",
              data: dataString,
            });
            break;
          case "3a03":
            dispatch({
              type: "receiveDhPara",
              data: dataString,
            });
            break;
          case "3b03":
            dispatch({
              type: "receiveJointPara",
              data: dataString,
            });
            break;
          case "1112":
            dispatch({
              type: "receiveProjectData",
              data: dataString,
            });
            break;
          case "1114":
            dispatch({
              type: "receiveProgram",
              data: dataString,
            });
            break;
          case "2e0f":
            dispatch({
              type: "receiveSlaveTypeList",
              data: dataString,
            });
            break;
          // 接收到报错信息
          case "2b03":
            if (dataString.data === "unInitFinish") {
              receiveCheckServerState(false);
              dispatch({
                type: "serverInit",
                data: 0,
              });
              break;
            } else if (dataString.data === "initFinish") {
              receiveCheckServerState(true);
              dispatch({
                type: "serverInit",
                data: 1,
              });
              break;
            }

            console.error(dataString.data);
            notification.error({
              message: "报错！",
              description: dataString.data,
              duration: 0,
            });
            break;
          // 如果命令字没有查询到
          default:
            showMessage.error("接收到错误信息");
            console.error(
              `数据格式异常。\n 完整信息：${message} \n 命令字：${command} \n 数据：${dataString}`
            );
        }
      };
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      // eslint-disable-line
      yield put({ type: "save" });
    },
  },
  /* 处理程序 */
  reducers: {
    /* 网络连接状态 */
    onOpen(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.opened = action.data;
      return _state;
    },
    onClose(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.opened = action.data;
      return _state;
    },
    onError(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.opened = action.data;
      return _state;
    },
    serverInit(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.serverInit = action.data;
      return _state;
    },
    /* 初始化机器人参数 */
    initRobot(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.project = action.data.project;
      return _state;
    },
    /* 接收控制器IP */
    receiveControllerIP(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.controllerConfig.num = action.data.num;
      _state.controllerConfig.network = action.data.network;
      return _state;
    },
    /* 接收控制器ID */
    receiveControllerID(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.controllerConfig.controllerID = action.data.controllerID;
      return _state;
    },
    /* 接收控制器的机器人加密信息 */
    receiveRobotEncrypt(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.robotEncrypt = action.data;
      return _state;
    },
    /* 接收机器人总数 */
    receiveRobotAmount(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.robotStatus.robotAmount = action.data.sum;
      return _state;
    },
    /* 接收当前是哪个机器人 */
    receiveCurrentRobot(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.robotStatus.currentRobot = action.data.robot;
      _state.robotStatus.multiRobotMode = action.data.mode;
      sendCheckCurrentRobotState(_state.robotStatus.currentRobot);
      return _state;
    },
    /* 接收当前机器人的类型 */
    receiveCurrentRobotType(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.robotStatus.currentRobotType = action.data.type;
      return _state;
    },
    /* 接收机器人伺服状态 */
    receiveRobotServoState(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.robotStatus.multiRobotMode = action.data.mode;
      if (action.data.robot === _state.robotStatus.currentRobot) {
        _state.robotStatus.currentRobotServoState = action.data.status;
      }
      if (action.data.status === 2) {
        showMessage.error(`机器人${action.data.robot}伺服报错！`);
      }
      return _state;
    },
    /* 接收程序运行状态 */
    receiveRobotRunningState(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      if (action.data.robot === _state.robotStatus.currentRobot) {
        _state.robotStatus.currentRobotRunningState = action.data.status;
      }
      return _state;
    },
    /* 接收机器人的速度 */
    receiveRobotSpeed(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      let speed = action.data.speed;
      let robot = action.data.robot;
      if (robot === _state.robotStatus.currentRobot) {
        if (_state.robotStatus.operaMode === 0) {
          _state.robotStatus.handleSpeed = speed;
        } else {
          _state.robotStatus.runningSpeed = speed;
        }
      } else {
        showMessage.info(`机器人${robot}的速度为${speed}`);
      }
      return _state;
    },
    /* 接收当前机器人的用户坐标系 */
    receiveCurrentUser(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      let robot = action.data.robot;
      let user = action.data.curUserNum;
      if (_state.robotStatus.currentRobot === robot) {
        _state.robotStatus.currentUser = user;
      } else {
        showMessage.info(`机器人${robot}的用户坐标切换为${user}`);
      }
      return _state;
    },
    /* 接收当前机器人的工具坐标系 */
    receiveCurrentTool(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      let robot = action.data.robot;
      let tool = action.data.curToolNum;
      if (_state.robotStatus.currentRobot === robot) {
        _state.robotStatus.currentTool = tool;
      } else {
        showMessage.info(`机器人${robot}的用户坐标切换为${tool}`);
      }
      return _state;
    },
    /* 接收当前机器人的坐标系 */
    receiveCurrentCoordinate(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      let robot = action.data.robot;
      let coord = action.data.coord;
      if (_state.robotStatus.currentRobot === robot) {
        _state.robotStatus.currentCoordinate = coord;
      } else {
        showMessage.info(`机器人${robot}的坐标系切换为${coord}`);
      }
      return _state;
    },
    /* 接收当前机器人正序运行还是倒序运行 */
    receiveCurrentForwardOrBackward(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.robotStatus.currentForwardOrBackward = action.data.switch;
      return _state;
    },
    /* 接收伺服编码低压报警 */
    receiveServoEncoderUnderVoltageState(state, action) {
      if (action.data.encoderUndervoltage === true) {
        notification.error({
          message: `编码器低压报警！`,
          description: `机器人${action.data.robot}编码器低压报警！`,
          duration: 0,
        });
      }
      return state;
    },
    /* 接收运行次数 */
    receiveCycleCountRespond(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.robotStatus.count = action.data.count;
      _state.robotStatus.index = action.data.index;
      return _state;
    },
    /* 设置上电返回 */
    receiveDeadmanState(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.robotStatus.deadmanState = action.data.deadman;
      return _state;
    },
    /* 设置模式成功 */
    receiveSetModeSuccess(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.robotStatus.operaMode = action.data.mode;
      return _state;
    },
    /* 接收IO的配置信息 */
    receiveIOConfig(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.IOConfig = action.data;
      return _state;
    },
    /* 接收各个IO端口的注释名 */
    receiveDinName(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.IOName.dinName = action.data.name;
      return _state;
    },
    receiveDoutName(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.IOName.doutName = action.data.name;
      return _state;
    },
    receiveAinName(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.IOName.ainName = action.data.name;
      return _state;
    },
    receiveAoutName(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.IOName.aoutName = action.data.name;
      return _state;
    },
    /* 接收工程界面的程序名、工程名等信息 */
    receiveProjectData(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.project = action.data.project;
      return _state;
    },
    /* 接收程序界面的指令信息 */
    receiveProgram(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      let currentRobot = _state.robotStatus.currentRobot;
      _state.program = action.data.program;
      _state.robotStatus[`robot${currentRobot}OpenedProgram`] = true;
      _state.robotStatus[`robot${currentRobot}CurrentProgram`] =
        action.data.program.name;
      console.log(_state);
      return _state;
    },
    /* 接收当前位置 */
    receiveCurrentPos(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.robotStatus.pos = action.data.pos;
      _state.robotStatus.posDeg = action.data.posDeg;
      return _state;
    },
    /* 接收DH参数 */
    receiveDhPara(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.robotParameter.dhPara = action.data;
      return _state;
    },
    /* 接收关节参数 */
    receiveJointPara(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      switch (action.data.Joint.AxisNum) {
        case 1:
          _state.robotParameter.jointPara.axis1 = action.data.Joint;
          break;
        case 2:
          _state.robotParameter.jointPara.axis2 = action.data.Joint;
          break;
        case 3:
          _state.robotParameter.jointPara.axis3 = action.data.Joint;
          break;
        case 4:
          _state.robotParameter.jointPara.axis4 = action.data.Joint;
          break;
        case 5:
          _state.robotParameter.jointPara.axis5 = action.data.Joint;
          break;
        case 6:
          _state.robotParameter.jointPara.axis6 = action.data.Joint;
          break;
        case 7:
          _state.robotParameter.jointPara.axis7 = action.data.Joint;
          break;
        default:
          break;
      }
      return _state;
    },
    /* 接收从站列表 */
    receiveSlaveTypeList(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      /* _state.robotParameter.dhPara = action.data; */
      return _state;
    },
    /* 改变机器人总数 */
    changeRobotAmount(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.robotStatus.robotAmount = action.data.robotAmount;
      return _state;
    },
    /* 改变当前选中的机器人 */
    changeOuterActivedRobot(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.robotStatus.outerActivedRobot = action.data.outerActivedRobot;
      return _state;
    },
    /* 改变当前选中的外部轴 */
    changeOuterActivedOuter(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.robotStatus.outerActivedOuter = action.data.outerActivedOuter;
      return _state;
    },
    /* 改变选中的机器人的外部轴总数 */
    changeRobotOuterAmount(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      let activedRobot = action.data.activedRobot;
      _state.robotStatus[activedRobot + "OuterAmount"] =
        action.data.outerAmount;
      return _state;
    },
  },
};
