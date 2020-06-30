import React from "react";
import {
  ws,
  sendMSGtoServer,
  comeMessage,
  IP,
  PORT,
  sendMSGtoController,
} from "service/network";
import { notification, message as showMessage, Button , message } from "antd";
import { controllerConfig } from "./default/controllerconfig";
import { robotStatus } from "./default/robotstatus";
import { robotParameter } from "./default/robotParameter";
import { IOParameter } from "./default/ioparameter";
import { project, program } from "./default/project";
import { robotEncrypt } from "./default/robotencrypt";
import { IOConfig } from "./default/ioconfig";
import { IOName } from "./default/ioname";
import { conveyor } from "./default/conveyor";
import { vision } from "./default/vision"
import { slaveSertCommit } from "./default/slaveSetCommit"
import { indexMainreducers } from "./indexMainreducers"
import { IO_longPattern } from "./default/IO_longPattern"
import { remotepro } from "./default/remotepro"
 
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
    conveyor,
    vision,
    slaveSertCommit,
    IO_longPattern,
    remotepro
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
          case "4801":
            dispatch({
              type:"changeBasic",
              data:dataString,
            })
            break;
          case "4803":
            dispatch({
              type:"inquireBasicdata",
              data:dataString,
            });
            break;
          case "4806":
            dispatch({
              type:"inquireDiscernData",
              data:dataString,
            });
            break;
          case  "4808":
            dispatch({
              type:"realtimeencodervalue",
              data:dataString,
            })
          case "4813":
            dispatch({
              type:"inquireDiscernOne",
              data:dataString,
            });
            break;
          case "4817":
            dispatch({
              type:"inquireSensorsign",
              data:dataString
            });
            break;
          case "4819":
            dispatch({
              type:"inquireSensorsignOne",
              data:dataString
            });
            break;
          case "481d":
            dispatch({
              type:"inquireSensorsignTwo",
              data:dataString
            });
            break;
          case "4832":
            dispatch({
              type:"inquireSetsite",
              data:dataString,
            });
            break;
          case "4834":
            dispatch({
              type:"inquiredemarcate",
              data:dataString
            });
            break;
          case "4837":
            dispatch({
              type:"moveSetsite",
              data:dataString
            });
            break;
          case "4103":
            dispatch({
              type:"inquireparameterdata",
              data:dataString
            })
            break;
          case "4106":
            dispatch({
              type:"inquirePlacedata",
              data:dataString
            })
            break;
          case "4108":
            dispatch({
              type:"inquirePlacedebugdata",
              data:dataString
            })
            break;
          case "3f06":
            dispatch({
              type:"inquireScopedata",
              data:dataString
            })
            break;
          case "4111":
            dispatch({
              type:"inquireScopedatumPointdata",
              data:dataString
            })
            break;
          case "2112":
            dispatch({
              type:"inquireUpgradeSystem",
              data:dataString
            })
            break;
          case "2e16":
            dispatch({
              type:"inquirerobotAxle",
              data:dataString
            })
            break;
          case "2e1c":
            dispatch({
              type:"inquirerobotENIname",
              data:dataString
            })
            break;
          case "2f1c":
            dispatch({
              type:"inquireIOlongPattern",
              data:dataString
            })
            break;
          case "5033":
            dispatch({
              type:"inquirelongPactternstatus",
              data:dataString
            })
            break;
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
  reducers:indexMainreducers.reducers
};
