export const indexMainDispatch =  {

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
                // case "4113":
                //   dispatch({
                //     type:"inquireScope"
                //   })
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
}