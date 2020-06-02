export const CommandList = {
  myLove: `偶然的一个机缘中诞生了啤酒\n就像偶然的一个机缘中我发现了你\n\n——木心 《加拿大魁北克有一家餐厅》`,
  webSite: `http://www.inexbot.com`,
  // 机器人状态
  /* 伺服状态设置
  data:{
    robot:1,  //1,2,3,4表示机器人1,2,3,4
    status:0  //0:停止，1：就绪，2：错误，3：运行
  } */
  SERVO_STATUS_SET: 0x2001,
  CURRENT_ROBOT_SERVO_STATE_INQUIRE: 0x2002, // 获取当前机器人的伺服状态
  /* 设置操作模式
  data:{
    "mode":0  //0示教，1远程，2运行
  } */
  OPERATION_MODE_SET: 0x2101,
  CURRENT_OPERATION_MODE_INQUIRE: 0x2102, // 获取当前机器人的操作模式
  /* 设置坐标系
  data:{
    robot:1, //机器人号
    coord:0  //0关节，1直角，2工具，3用户
  } */

  COORD_MODE_SET: 0x2201,
  /* 上电
  data:{
    deadman:1 //0:伺服下电，1：伺服上电
  } */
  DEADMAN_STATUS_SET: 0x2301,
  DEADMAN_STATUS_INQUIRE: 0x2302, // 获取上电状态
  CURRENT_ROBOT_COORD_INQUIRE: 0x2202, // 获取当前机器人坐标系
  Project: 0x1111, // 获取工程界面的数据
  openProgram: 0x1113,
  /* 删除指令
  data:{
    line:12
  } */
  COPYPROGRAM_COMMAND:0x1117,//复制程序
  AMENDWORK_COMMAND:0X1118,//修改作业文件名
  AMEND_COMMAND:0x1124,//批量修改
  // {
  //   "selectlines":[2,5,11,12,20]   //选中那些行
  //   "VJ":10,
  //   "ACC":10,
  //   "DEC":10,
  //   "PL":1,
  //   }
  DELETE_COMMAND: 0x1121,
  MOVE_COMMAND:0x1122,//移动
  COPY_COMMAND: 0x1123,// 批量复制
  CheckState: 0x1000, // 查询Server端的启动状态
  JOG_OPERATION_MOVE: 0x2901, // 点动开始
  JOG_OPERATION_STOP: 0x2902, // 点动结束
  CONTROLLER_IP_INQUIRE: 0x4302, // 获取控制器IP
  CONTROLLER_ID_INQUIRE: 0x5052, // 获取控制器ID
  ROBOT_ENCRYPT_INQUIRE: 0x2e0b, // 获取机器人加密状态
  ROBOT_AMOUNT_INQUIRE: 0x2e05, // 获取机器人总数
  /* 新建程序
  data:{
    "robot":1
    "jobname":"abc.JBR"   //作业文件名
  } */
  NEW_PROGRAM: 0x1115,
  /* 删除程序
  data:{
    "robot":1
    "isbulk":0, // 0单个，1批量删除
    "jobname":["abc.JBR"]   //作业文件名
  } */
  DELETE_PROGRAM: 0x1116,
  /*插入指令Or修改指令
  data:{
    line:1,
    modifystate:0 //0插入 1修改
    name:"MOVJ",
    POS:P001 || [0,0,12,12,12,12,12,12,0,0,0,0,0,0],
    VJ:10,
    ACC:11,
    DEC:12,
    PL:1
  } */
  INSERT_COMMAND: 0x1120,
  /* 运行程序
  data:{
    "robot":1				//1：表示机器人1，2：表示机器人2
    "jobname":"Q1",
    suffixname:".JBR"
    "line":1,
    "continueRun":0 //1:继续运行,0:不继续运行
  } */
  JOBSEND_DONE: 0x2501,
  /* 停止运行的程序
  data:{
    "robot":1
  }   */

  STOP_JOB_RUN: 0x2503,
  /* 切换机器人
  data:{
    "mode":0,			//0：单机模式，1：多机模式
    "robot":1				//机器人号
  } */
  ROBOT_SWITCH: 0x5001,
  /* 设置运行次数
  data:{
      "robot":1,			//机器人号
      "index":1				//总循环次数，0：表示无限循环 
  } */
  CYCLE_INDEX_SET: 0x5011,
  /* 查询运行次数
  data:{
    "robot":1				//机器人号
  }  */
  CYCLE_COUNT_INQUIRE: 0x5012,
  CURRENT_ROBOT_INQUIRE: 0x5002, // 获取当前机器人
  CURRENT_ROBOT_TYPE_INQUIRE: 0x2e02, // 获取当前机器人的类型
  CURRENT_ROBOT_RUNNING_STATE_INQUIRE: 0x3d02, // 获取当前机器人程序的运行状态
  /* 设置速度
  data:{
    "robot":1,			//1，2，3，4表示机器人1，2，3，4
    "speed":5				//速度值，101代表0.1°微动档，102代表0.01°微动档
  } */
  SPEED_SET: 0x2601,
  CURRENT_ROBOT_SPEED_INQUIRE: 0x2602, // 获取当前机器人的速度
  /* 切换用户坐标号
  data:{
    "robot":1,		//1，2，3，4表示机器人1，2，3，4
    "userNum":1
  } */
  USERCOORDINATE_SWITCH: 0x3c0a,
  CURRENT_ROBOT_USER_INQUIRE: 0x3c0b, // 获取当前机器人的用户坐标号
  /* 切换工具手
  data:{
    "robot":1,			//1，2，3，4表示机器人1，2，3，4
    "curToolNum":2
  } */
  TOOLNUMBER_SWITCH: 0x380a,
  CURRENT_ROBOT_TOOL_INQUIRE: 0x380b, // 获取当前机器人的工具手
  CURRENT_ROBOT_FB_INQUIRE: 0x2405, // 获取当前机器人单步运行的顺序
  CURRENT_ROBOT_ENCODER_STATE_INQUIRE: 0x3305, // 获取当前机器人编码器的低压状态
  IO_CONFIG_INQUIRE: 0x2f22, // 获取IO配置信息
  DIN_NAME_INQUIRE: 0x2f48, // 获取数字输入端口的注释名
  DOUT_NAME_INQUIRE: 0x2f4b, // 获取数字输出端口的注释名
  AIN_NAME_INQUIRE: 0x2f4e, // 获取模拟输入端口的注释名
  AOUT_NAME_INQUIRE: 0x2f51, // 获取模拟输出端口的注释名
  CURRENTPOS_INQUIRE: 0x2a02, // 获取机器人当前位置
  // 机器人参数
  /* 设置DH参数
  data:{
    "Link":
        [
        "axis1":
            {
            "a":50,
            "d":321.5
            },
        "axis2":
            {
            "a":270
            },
        "axis3":
            {
            "a":70
            },
        "axis4":
            {
            "d":299
            },
        "axis5":
            {
            "theta":90
            },
        "axis6":
            {
            "d":78.5
            }
        ],
    "CoupleCoe":
        {
        "Couple_Coe_4_5":0.0,
        "Couple_Coe_4_6":0.0,
        "Couple_Coe_5_6":0.0
        }
    } */
  DHPARAMETER_SET: 0x3a01,
  FAULT_RESET: 0x3201,
  DHPARAMETER_INQUIRE: 0x3a02, // 获取DH参数
  JOINTPARAMETER_SET: 0x3b01,
  JOINTPARAMETER_INQUIRE: 0x3b02,
  SLAVETYPE_LIST_INQUIRE: 0x2e0e,

  UPGRADE_COMMAND: 0x2111,// 升级系统


  //传送带跟踪
    //设置传送带参数
    SET_THE_CONVEYOR_PARAMETERS:0x4801,
    // {
    //   "robot":1,
    //   "conveyorID":1,
    //   "conveyor":
    //   {
    //   "maxEncoderVal":60000,    //double
    //   "minEncoderVal": -60000,
    //   "encoderDirection": 1,      //1：正向；-1：反向
    //   "encoderResolution":44.33,  //double
    //   "userCoord":1             	//1~9
    //   "checkSpeed":1      //传送带停止，机器人：0-立即结束；1-继续运行
    //   },
    //   "compensation":
    //   {
    //   "time":10,
    //   "encoderVal":0
    //   }
    //   }

    //查询传送带参数
    TRACK_CONVEYOR_CONVEYORPARAM_INQUIRE:0x4802,
    // {
    //   "robot":1,
    //   "conveyorID":1  工艺号
    // }

    //返回传送带参数
    TRACK_CONVEYOR_CONVEYORPARAM_RESPOND:0x4803,
    // {
    //   "robot":1,
    //   "conveyorID":1,
    //   "conveyor":
    //   {
    //   "maxEncoderVal":60000,    
    //   "minEncoderVal": -60000,
    //   "encoderDirection": 1,      //1：正向；-1：反向
    //   "encoderResolution":44.33,   //double
    //   "encoderValue":333221123,  //double
    //   "speed":100,        //double
    //   "userCoord":1，       	//1~9
    //   "checkSpeed":1      //传送带停止，机器人：0-立即结束；1-继续运行
    //   },
    //   "compensation":
    //   {
    //   "time":10,
    //   "encoderVal":0
    //   }
    // }

    // 设置工件识别参数
    TRACK_CONVEYOR_POSCHECKPARAM_SET:0x4804,
    // {
    //   "robot":1,
    //   "conveyorID":1,
    //   "detectSrc":
    //   {
    //   "type":0,    //0-视觉；1-IO；2-全局变量
    //   "visionID":1,
    //   "DI_capturePos":0,
    //   "globalVar":"GA001"
    //   },
    //   "identification":
    //   {
    //   "type":0,    //0-视觉；1-传感器
    //   "communication":0    //0-以太网；1-Modbus
    //   "sensorTrg":1     //0-低电平触发， 1-高电平触发
    //   }
    // }

    //查询工件识别参数
    TRACK_CONVEYOR_POSCHECKPARAM_INQUIRE:0x4805,
    // {
    //   "robot":1,	
    //   "conveyorID":1 // 工艺号
    // }

    // 返回工件识别参数
    TRACK_CONVEYOR_POSCHECKPARAM_RESPOND:0x4806,
    //数据与4804是一致的
    // {
    //   "robot":1,
    //   "conveyorID":1,
    //   "detectSrc":
    //   {
    //   "type":0,    //0-视觉；1-IO；2-全局变量
    //   "visionID":1,
    //   "DI_capturePos":0,
    //   "globalVar":"GA001"
    //   },
    //   "identification":
    //   {
    //   "type":0,    //0-视觉；1-传感器
    //   "communication":0    //0-以太网；1-Modbus
    //   "sensorTrg":1     //0-低电平触发， 1-高电平触发
    //   }
    // }
  
    // 实时查询编码器值和传送带速度
    TRACK_CONVEYOR_REALTIME_INQUIRE:0x4807,
    // {
    //   "robot":1,
    //   "conveyorID":1
    // }

    // 响应实时查询
    TRACK_CONVEYOR_REALTIME_RESPOND:0x4808,
    // {
    //   "robot":1,
    //   "conveyorID":1,
    //   "conveyor":
    //   {
    //   "encoderValue":333221123,  //uint
    //   "speed":100.0,  //double
    //   }
    // }  


  // 传送带坐标系标定
    // 计算用户坐标系
    TRACK_CONVEYOR_USERCOORD_CALCULATE:0x4810,
    // {
    //   "robot":1,	
    //   "conveyorID":1
    // }

    // 标定取坐标
    TRACK_CONVEYOR_USERCOORD_CALIBRATION:0x4811,
    // {
    //   "robot":1,
    //   "conveyorID":1,
    //   "posNum":1  //1,2,3
    // }

    // 查询已标定的点坐标
    RACK_CONVEYOR_CALIBRATION_INQUIRE:0x4812,
    // {
    //   "robot":1,	
    //   "conveyorID":1,
    //   "posNum":1
    // }

    // 返回标定的点坐标
    TRACK_CONVEYOR_CALIBRATION_RESPOND:0x4813,
    // {
    //   "posNum":1
    //   "posX":1.0,	
    //   "posY":1.0,
    //   "encodorValue":1
    // }

    // 清空标定值
    TRACK_CONVEYOR_CALIBRATION_CLEAR:0x4814,
    // {
    //   "robot":1,
    //   "conveyorID":1,
    //   "posNum":1
    // } 返回0x4813

    // 取消标定
    TRACK_CONVEYOR_CALIBRATION_CANCEL:0x4815,
    // {
    //   "robot":1,
    //   "conveyorID":1
    // }

  // 传感器位置标定
    // 传感器位置查询
    TRACK_CONVEYOR_SENSORPOS_INQUIRE:0x4816,
    // { 
    //   "robot":1,
    //   "conveyorID":1
    //   }

    // 响应传感器位置查询
    TRACK_CONVEYOR_SENSORPOS_RESPOND:0x4817,
    // { 
    //   "robot":1,
    //   "conveyorID":1,
    //   "sensorPos":
    //   {
    //   "X":1.0,	 
    //   "Y":1.0
    //   }
    // }

    // 传感器位置开始标定及参数查询
    TRACK_CONVEYOR_SENSORPOS_CALIBRATION_INQUIRE:0x4818,
    // { 
    //   "robot":1,
    //   "conveyorID":1,
    // }

    // 响应传感器位置标定参数查询
    TRACK_CONVEYOR_SENSORPOS_CALIBRATION_RESPOND:0x4819,
    // { 
    //   "robot":1,
    //   "conveyorID":1,
    //   "sensorCalibration":
    //   {
    //   "IO_encodorValue":1,
    //   "calib_encodorValue":1,
    //   "calib_X":1.0,	 
    //   "calib_Y":1.0
    //   }
    // }

    // 传感器位置参数标定
    TRACK_CONVEYOR_SENSORPOS_CALIBRATE:0x481A,
    // { 
    //   "robot":1,
    //   "conveyorID":1
    // }

    // 响应传感器位置参数标定
    // 返回 0x4819

    // 传感器跟踪抓取姿态参数查询
    TRACK_CONVEYOR_SENSOR_GRABGESTURE_INQUIRE:0x481C,
    // { 
    //   "robot":1,
    //   "conveyorID":1
    // }

    // 响应传感器跟踪抓取姿态查询
    TRACK_CONVEYOR_SENSOR_GRABGESTURE_RESPOND:0x481D,
    // { 
    //   "robot":1,
    //   "conveyorID":1,
    //   "grabGesture":
    //   {
    //   "Z":1,
    //   "A":1,
    //   "B":1,
    //   "C":1
    //   }
    // }

    // 传感器跟踪抓取姿态标定
    TRACK_CONVEYOR_SENSOR_GRABGESTURE_CALIBRATE:0x481E,
    // { 
    //   "robot":1,
    //   "conveyorID":1
    // }

    // 响应传感器跟踪抓取姿态标定
    // 返回 0x481D

    // 清空标定值
    TRACK_CONVEYOR_SENSORPOS_CALIBRATION_CLEAR:0x4820,
    // { 
    //   "robot":1,
    //   "conveyorID":1,
    //   "type":0        //0-清空传感器位置标定参数；1-清空抓取姿态参数
    //   }   // 若type为0：返回0x4819；若type为1：返回0x481D

    // 取消标定
    TRACK_CONVEYOR_SENSORPOS_CALIBRATION_CANCEL:0x4821,
    // {
    //   "robot":1,
    //   "conveyorID":1
    // }

    // 计算传感器位置
    TRACK_CONVEYOR_SENSORPOS_CALCULATE:0x4822  ,
    // { 
    //   "robot":1,
    //   "conveyorID":1
    //   }  不返回，回哪个界面，查询哪个界面。

    // 设置传送带跟踪位置参数
    TRACK_CONVEYOR_POSITION_SET:0x4830,
    // { 
    //   "robot":1, 
    //   "conveyorID":1,
    //   "position":
    //   {
    //   "trackStartXPoint":123.123
    //   "trackRangeXMax":213.213
    //   "trackRangeYMin":132.132
    //   "trackRangeYMax":321.321
    //   "trackRangeZMin":231.231
    //   "trackRangeZMax":312.312
    //   "receLatestPos":123.321
    //   "grabheight":111.111
    //   }
    // }

    // 查询传送带跟踪位置参数
    TRACK_CONVEYOR_POSITION_INQUIRE:0x4831,
    // {
    //   "robot":1,	
    //   "conveyorID":1
    // }

    // 返回传送带跟踪位置参数
    TRACK_CONVEYOR_POSITION_RESPOND:0x4832,
    // data：同0x4150

    // 标定位置
    TRACK_CONVEYOR_POSITION_CALIBRATION:0x4833,
    // {
    //   "robot":1, 
    //   "conveyorID":1,
    //   "type":1   //1,2,3,4..7
    // }

    // 返回标定位置
    TRACK_CONVEYOR_POSITION_CALIBRATION_RESPOND:0x4834,
    // {
    //   "robot":1, 
    //   "conveyorID":1,
    //   "type":1,
    //   "value":2.33，
    //   "pos":2.33
    // }

    // 运动到指定的位置
    TRACK_CONVEYOR_POSITION_TO_MOVE:0x4837,
    // {
    //   "robot":1, 
    //   "conveyorID":1,
    //   "type":1   //1,2,3,4..7
    // }

    // 复制传送带参数
    TRACK_CONVEYOR_PARAM_COPY:0x4835,
    // {
    //   "robot":1,
    //   "srcConveyorID":1,
    //   "dstConveyorID":2
    // }

    //清空传送带参数
    TRACK_CONVEYOR_PARAM_CLEAR:0x4836,
    // {
    //   "robot":1,
    //   "conveyorID":1
    // }
};
