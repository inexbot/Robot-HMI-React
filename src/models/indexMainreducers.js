
import {
  sendMSGtoController,
} from "service/network";
import { notification, message as showMessage, Button , message } from "antd";

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
export const indexMainreducers = {
    reducers:{
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
          // console.log(_state.robotStatus.pos, action.data.pos)
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
        // 获取基本信息的参数
        inquireBasicdata(state, action) {
          let _state = JSON.parse(JSON.stringify(state))
          _state.conveyor.Basicdata = action.data
          return _state
        },
        // 设置基本信息的参数
        changeBasic(state, action) {
          let _state = JSON.parse(JSON.stringify(state))
          _state.conveyor.Basicdata = action.data
          return _state
        },
        // 获取识别参数的参数
        inquireDiscernData(state, action) {
          let _state = JSON.parse(JSON.stringify(state))
          console.log(action.data,_state)
          _state.conveyor.DiscernData = action.data
          return _state
        },
        // 获取位置设置的参数
        inquireSetsite(state, action){
          let _state = JSON.parse(JSON.stringify(state))
          _state.conveyor.Setsite = action.data
          return _state
        },
        // 点击标记获取的参数
        inquiredemarcate(state, action){
          let _state = JSON.parse(JSON.stringify(state))
          let Num = 0
          for( let key in _state.conveyor.Setsite.position){
            Num++
            if(Num == action.data.type){
              _state.conveyor.Setsite.position[key] = action.data.value
              return _state
            }
          }
        },
        // 清空传送带参数
        moveSetsite(state, action){
          let _state = JSON.parse(JSON.stringify(state))
          return _state
        },
        // 标定取坐标
        inquireDiscernOne(state, action){
          let _state = JSON.parse(JSON.stringify(state))
          if(action.data.posNum == 1){
            _state.conveyor.Conveyorsign.ConveyorOne = action.data
          }else if(action.data.posNum == 2){
            _state.conveyor.Conveyorsign.ConveyorTwo = action.data
          }else if(action.data.posNum == 3){
            _state.conveyor.Conveyorsign.ConveyorThree = action.data
          }
          return _state
        },
        // 传感器位置查询
        inquireSensorsign(state, action){
          let _state = JSON.parse(JSON.stringify(state))
          console.log( _state.conveyor)
          _state.conveyor.Sensorsign = action.data
          console.log("121",_state)
          return _state
        },
        // 传感器位置参数标定
        inquireSensorsignOne(state, action){
          let _state = JSON.parse(JSON.stringify(state))
          console.log("123")
          _state.conveyor.SensorOne = action.data
          return _state
        },
        // 传感器跟踪抓取姿态参数查询
        inquireSensorsignTwo(state, action){
          let _state = JSON.parse(JSON.stringify(state))
          console.log(_state,action.data)
          _state.conveyor.SensorTwo = action.data
          return _state
        },
        // 响应传感器位置标定参数查询
        realtimeencodervalue(state, action){
          let _state = JSON.parse(JSON.stringify(state))
          _state.conveyor.Basicdata.conveyor.encoderValue = action.data.conveyor.encoderValue
          return _state
        },
        // 视觉参数查询
        inquireparameterdata(state, action){
          let _state = JSON.parse(JSON.stringify(state))
          _state.vision.parameterList = action.data
          return _state
        },
        // 视觉位置参数查询
        inquirePlacedata(state, action){
          let _state = JSON.parse(JSON.stringify(state))
          _state.vision.PlaceList = action.data
          return _state
        },
        // 位置调试查询
        inquirePlacedebugdata(state, action){
          let _state = JSON.parse(JSON.stringify(state))
          if(action.data.excursion == undefined || action.data.currentPos == undefined ){
            message.warning('此工艺号和传送带工艺号查询到的数据为空');
          }else{
            _state.vision.PlacedebugList = action.data
          }
          return _state
        }, 
        // 视觉范围查询
        inquireScopedata(state, action){
          let _state = JSON.parse(JSON.stringify(state))
          console.log(_state.vision.ScopeList,action)
          _state.vision.ScopeList = action.data
          return _state
        },
        // 标定抓取姿态
        inquireScopedatumPointdata(state, action){
          let _state = JSON.parse(JSON.stringify(state))
          _state.vision.PlaceList.position.datumPoint = action.data.datumPoint
          return _state
        },
        // 获取机器人从动轴
        inquirerobotAxle(state, action){
          let _state = JSON.parse(JSON.stringify(state)) 
          // console.log(_state.slaveSertCommit.robotAxle,action.data,"这里是获取机器人从动轴")
          _state.slaveSertCommit.robotAxle = action.data
          return _state
        },
        // 获取ENI文件名
        inquirerobotENIname(state, action){
          let _state = JSON.parse(JSON.stringify(state)) 
          _state.slaveSertCommit.ENIname = action.data
          return _state
        },
        // 查询远程模式预约执行状态
        inquireIOlongPattern(state, action){
          let _state = JSON.parse(JSON.stringify(state)) 
          _state.IO_longPattern.longPattern = action.data
          return _state
        } ,
        // 查询远程模式连接状态
        inquirelongPactternstatus(state, action){
          let _state = JSON.parse(JSON.stringify(state)) 
          _state.IO_longPattern.longStatus = action.data
          return _state
        }
        
    }
}