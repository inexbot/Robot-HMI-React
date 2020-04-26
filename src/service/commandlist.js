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
  DELETE_COMMAND: 0x1121,
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
  /* 切换机器人
  data:{
    "mode":0,			//0：单机模式，1：多机模式
    "robot":1				//机器人号
  } */
  ROBOT_SWITCH: 0x5001,
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
};
