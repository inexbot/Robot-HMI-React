import {config} from "config.js"
export const paraIndex = [
  {
    index: "应用参数",
    className: "paraFrameApplication",
    paras: [
      {
        type: "para",
        name: "工具手参数",
        link: "/Toolhands",
        authority: "技术员",
        modeDisplay:config.modeDisplay["工具手参数"]
      },
      {
        type: "para",
        name: "用户坐标参数",
        link: "/Usercoo",
        authority: "技术员",
        modeDisplay:config.modeDisplay["用户坐标参数"]
      },
      {
        type: "subIndex",
        subIndex: "远程程序",
        authority: "管理员",
        modeDisplay:config.modeDisplay["远程程序"],
        paras: [
          {
            type: "para",
            name: "IO预约",
            link: "/Remotepro",
            authority: "管理员",
            modeDisplay:config.modeDisplay["IO预约"],
          },
          // {
          //   type: "para",
          //   name: "Modbus程序",
          //   link: "/ModbusPro",
          //   authority: "管理员",
          //   modeDisplay:config.modeDisplay["Modbus程序"],
          // }
        ]
      },
      {
        type: "para",
        name: "复位点",
        link: "/User",
        authority: "管理员",
        modeDisplay:config.modeDisplay["复位点"]
      },
      {
        type: "para",
        name: "自启动程序",
        link: "/AutoLoadPro",
        authority: "管理员",
        modeDisplay:config.modeDisplay["自启动程序"]
      },
      {
        type: "para",
        name: "机器人范围",
        link: "/RobotRange",
        authority: "技术员",
        modeDisplay:config.modeDisplay["机器人范围"]
      },
      {
        type: "para",
        name: "干涉区",
        link: "/InterferenceRegion",
        authority: "技术员",
        modeDisplay:config.modeDisplay["干涉区"]
      },
      {
        type: "para",
        name: "动力学",
        link: "/Dynamic",
        authority: "管理员",
        modeDisplay:config.modeDisplay["动力学"]
      }
    ]
  },
  {
    index: "外设参数",
    className: "paraFrameOuter",
    paras: [
      {
        type: "subIndex",
        subIndex: "IO",
        authority: "技术员",
        modeDisplay:config.modeDisplay["IO"],
        paras: [
          {
            type: "para",
            name: "远程模式",
            link: "/IORemote",
            authority: "管理员",
            modeDisplay:config.modeDisplay["远程模式"],
          },
          {
            type: "para",
            name: "状态提示",
            link: "/IOStatusHint",
            authority: "技术员",
            modeDisplay:config.modeDisplay["状态提示"],
          },
          // {
          //   type: "para",
          //   name: "安全设置",
          //   link: "/IOSafe",
          //   authority: "管理员",
          //   modeDisplay:config.modeDisplay["安全设置"],
          // },
          {
            type: "para",
            name: "IO复位",
            link: "/IOReset",
            authority: "技术员",
            modeDisplay:config.modeDisplay["IO复位"],
          },
          {
            type: "para",
            name: "报警信息",
            link: "/IOWarning",
            authority: "技术员",
            modeDisplay:config.modeDisplay["报警信息"],
          },
          {
            type: "para",
            name: "IO配置",
            link: "/IOSet",
            authority: "管理员",
            modeDisplay:config.modeDisplay["IO配置"]
          }
        ]
      },
      {
        type: "para",
        name: "视觉参数",
        link: "/vision",
        authority: "技术员",
        modeDisplay:config.modeDisplay["视觉参数"]
      },
      {
        type: "para",
        name: "传送带参数",
        link: "/setparameter",
        authority: "技术员",
        modeDisplay:config.modeDisplay["传送带参数"]
      },
      // {
      //   type: "para",
      //   name: "通讯设置",
      //   link: "/ConnectionSet",
      //   authority: "管理员",
      //   modeDisplay:config.modeDisplay["通讯设置"]
      // },
      // {
      //   type: "para",
      //   name: "数据传输",
      //   link: "/DataTrans",
      //   authority: "管理员",
      //   modeDisplay:config.modeDisplay["数据传输"]
      // }
    ]
  },
  {
    index: "机构参数",
    className: "ParaFrameMachine",
    paras: [
      {
        type: "para",
        name: "关节参数",
        link: "/Jointpara",
        authority: "管理员",
        modeDisplay:config.modeDisplay["关节参数"]
      },
      {
        type: "para",
        name: "DH参数",
        link: "/DHPara",
        authority: "管理员",
        modeDisplay:config.modeDisplay["DH参数"]
      },
      {
        type: "para",
        name: "零点设置",
        link: "/ZeroSet",
        authority: "技术员",
        modeDisplay:config.modeDisplay["零点设置"]
      },
      {
        type: "para",
        name: "线速度",
        link: "/LinearVel",
        authority: "技术员",
        modeDisplay:config.modeDisplay["线速度"]
      },
      {
        type: "para",
        name: "点动速度",
        link: "/JogSpeed",
        authority: "技术员",
        modeDisplay:config.modeDisplay["点动速度"]
      },
      {
        type: "para",
        name: "运动参数",
        link: "/RunningPara",
        authority: "管理员",
        modeDisplay:config.modeDisplay["运动参数"]
      },
      {
        type: "para",
        name: "安全配置",
        link: "/SafeConfig",
        authority: "管理员",
        modeDisplay:config.modeDisplay["安全配置"]
      },
      {
        type: "para",
        name: "外部轴标定",
        link: "/OuterCalibrate",
        authority: "技术员",
        modeDisplay:config.modeDisplay["外部轴标定"]
      },
      {
        type: "para",
        name: "从站配置",
        link: "/SlaveSet",
        authority: "管理员",
        modeDisplay:config.modeDisplay["从站配置"]
      },
      {
        type: "para",
        name: "伺服参数",
        link: "/ServoPara",
        authority: "管理员",
        modeDisplay:config.modeDisplay["伺服参数"]
      }
    ]
  },
  {
    index: "系统参数",
    className: "ParaFrameSys",
    paras: [
      // {
      //   type: "para",
      //   name: "版本升级",
      //   link: "/Update",
      //   authority: "管理员",
      //   modeDisplay:config.modeDisplay["版本升级"]
      // },
      // {
      //   type: "para",
      //   name: "配置向导",
      //   link: "/ConfigureWizard",
      //   authority: "管理员",
      //   modeDisplay:config.modeDisplay["配置向导"]
      // },
      {
        type: "para",
        name: "语言切换",
        link: "/Language",
        authority: "技术员",
        modeDisplay:config.modeDisplay["语言切换"]
      },
      // {
      //   type: "para",
      //   name: "修改配置",
      //   link: "/Configure",
      //   authority: "管理员",
      //   modeDisplay:config.modeDisplay["修改配置"]
      // },
      // {
      //   type: "para",
      //   name: "清空程序",
      //   link: "/ClearPro",
      //   authority: "管理员",
      //   modeDisplay:config.modeDisplay["清空程序"]
      // },
      {
        type: "para",
        name: "校准屏幕",
        link: "/CaliScreen",
        authority: "管理员",
        modeDisplay:config.modeDisplay["校准屏幕"]
      },
      {
        type: "para",
        name: "恢复与备份",
        link: "/Backup",
        authority: "技术员",
        modeDisplay:config.modeDisplay["恢复与备份"]
      },
      {
        type: "para",
        name: "控制器密钥",
        link: "/Encryption",
        authority: "厂家",
        modeDisplay:config.modeDisplay["控制器密钥"]
      },
      // {
      //   type: "para",
      //   name: "恢复出厂设置",
      //   link: "/Restore",
      //   authority: "管理员",
      //   modeDisplay:config.modeDisplay["恢复出厂设置"]
      // }
    ]
  }
];
