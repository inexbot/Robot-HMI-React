export const IOParameter = {
  IOMain: {
    robot1DinAmount: "16",
    robot2DinAmount: "16",
    robot3DinAmount: "16",
    robot4DinAmount: "16",
    robot1DoutAmount: "16",
    robot2DoutAmount: "16",
    robot3DoutAmount: "16",
    robot4DoutAmount: "16",
    robot1AinAmount: "16",
    robot2AinAmount: "16",
    robot3AinAmount: "16",
    robot4AinAmount: "16",
    robot1AoutAmount: "16",
    robot2AoutAmount: "16",
    robot3AoutAmount: "16",
    robot4AoutAmount: "16",
  },
  IOStatusHint: {
    startUp: 2,
    teachOut: 0,
    runOut: 0,
    remoteOut: 0,
    outPut: [
      {
        faultIsFickler: 1, //报错指示灯是否闪烁 0:不闪 1：闪
        fault: 4, //报错提示
        running: 3, //运行状态
        IOenable: 3, //IO使能状态
        quickStopOut1: 5, //紧急停止输出信号1
        quickStopOut2: 7, //紧急停止输出信号2
        program1: 8, //io程序1预约输出
        program2: 9, //io程序2预约输出
        program3: 6, //io程序3预约输出
        program4: 2, //io程序4预约输出
        program5: 3, //io程序5预约输出
        program6: 3, //io程序5预约输出
        program7: 3, //io程序5预约输出
        program8: 3, //io程序5预约输出
        program9: 3, //io程序5预约输出
        program10: 3, //io程序5预约输出
      },
      {
        faultIsFickler: 0, //报错指示灯是否闪烁 0:不闪 1：闪
        fault: 0, //报错提示
        running: 0, //运行状态
        IOenable: 0, //IO使能状态
        quickStopOut1: 0, //紧急停止输出信号1
        quickStopOut2: 0, //紧急停止输出信号2
        program1: 0, //io程序1预约输出
        program2: 0, //io程序2预约输出
        program3: 0, //io程序3预约输出
        program4: 0, //io程序4预约输出
        program5: 3, //io程序5预约输出
        program6: 3, //io程序5预约输出
        program7: 3, //io程序5预约输出
        program8: 3, //io程序5预约输出
        program9: 3, //io程序5预约输出
        program10: 3, //io程序5预约输出
      },
      {
        faultIsFickler: 0, //报错指示灯是否闪烁 0:不闪 1：闪
        fault: 0, //报错提示
        running: 0, //运行状态
        IOenable: 0, //IO使能状态
        quickStopOut1: 0, //紧急停止输出信号1
        quickStopOut2: 0, //紧急停止输出信号2
        program1: 0, //io程序1预约输出
        program2: 0, //io程序2预约输出
        program3: 0, //io程序3预约输出
        program4: 0, //io程序4预约输出
        program5: 3, //io程序5预约输出
        program6: 3, //io程序5预约输出
        program7: 3, //io程序5预约输出
        program8: 3, //io程序5预约输出
        program9: 3, //io程序5预约输出
        program10: 3, //io程序5预约输出
      },
      {
        faultIsFickler: 0, //报错指示灯是否闪烁 0:不闪 1：闪
        fault: 0, //报错提示
        running: 0, //运行状态
        IOenable: 0, //IO使能状态
        quickStopOut1: 0, //紧急停止输出信号1
        quickStopOut2: 0, //紧急停止输出信号2
        program1: 0, //io程序1预约输出
        program2: 0, //io程序2预约输出
        program3: 0, //io程序3预约输出
        program4: 0, //io程序4预约输出
        program5: 3, //io程序5预约输出
        program6: 3, //io程序5预约输出
        program7: 3, //io程序5预约输出
        program8: 3, //io程序5预约输出
        program9: 3, //io程序5预约输出
        program10: 3, //io程序5预约输出
      },
    ],
  },
  IORemotePara: {
    robot1: {
      inPort: {
        start: 4,
        stop: 2,
        pause: 1,
        faultPause: 5,
        reserveRun: 6,
      },
      inValue: {
        start: 1,
        stop: 0,
        pause: 1,
        faultPause: 0,
        reserveRun: "1",
      },
      program: [
        {
          job: 1,
          name: "",
          port: 10,
          value: 1,
        },
        {
          job: 2,
          name: "",
          port: 10,
          value: 1,
        },
        {
          job: 3,
          name: "",
          port: 10,
          value: 1,
        },
        {
          job: 4,
          name: "",
          port: 10,
          value: 1,
        },
        {
          job: 5,
          name: "",
          port: 10,
          value: 1,
        },
        {
          job: 6,
          name: "",
          port: 10,
          value: 1,
        },
        {
          job: 7,
          name: "",
          port: 10,
          value: 1,
        },
        {
          job: 8,
          name: "",
          port: 10,
          value: 1,
        },
        {
          job: 9,
          name: "",
          port: 10,
          value: 1,
        },
        {
          job: 10,
          name: "",
          port: 10,
          value: 1,
        },
      ],
    },
    robot2: {
      inPort: {
        start: 4,
        stop: 2,
        pause: 1,
        faultPause: 5,
        reserveRun: 6,
      },
      inValue: {
        start: 1,
        stop: 0,
        pause: 1,
        faultPause: 0,
        reserveRun: 1,
      },
      program: [
        {
          job: 1,
          name: "",
          port: 10,
          value: 1,
        },
        {
          job: 2,
          name: "",
          port: 10,
          value: 1,
        },
        {
          job: 3,
          name: "",
          port: 10,
          value: 1,
        },
        {
          job: 4,
          name: "",
          port: 10,
          value: 1,
        },
        {
          job: 5,
          name: "",
          port: 10,
          value: 1,
        },
        {
          job: 6,
          name: "",
          port: 10,
          value: 1,
        },
        {
          job: 7,
          name: "",
          port: 10,
          value: 1,
        },
        {
          job: 8,
          name: "",
          port: 10,
          value: 1,
        },
        {
          job: 9,
          name: "",
          port: 10,
          value: 1,
        },
        {
          job: 10,
          name: "",
          port: 10,
          value: 1,
        },
      ],
    },
    robot3: {
      inPort: {
        start: 4,
        stop: 2,
        pause: 1,
        faultPause: 5,
        reserveRun: 6,
      },
      inValue: {
        start: 1,
        stop: 0,
        pause: 1,
        faultPause: 0,
        reserveRun: 1,
      },
      program: [
        {
          job: 1,
          name: "",
          port: 10,
          value: 1,
        },
        {
          job: 2,
          name: "",
          port: 10,
          value: 1,
        },
        {
          job: 3,
          name: "",
          port: 10,
          value: 1,
        },
        {
          job: 4,
          name: "",
          port: 10,
          value: 1,
        },
        {
          job: 5,
          name: "",
          port: 10,
          value: 1,
        },
        {
          job: 6,
          name: "",
          port: 10,
          value: 1,
        },
        {
          job: 7,
          name: "",
          port: 10,
          value: 1,
        },
        {
          job: 8,
          name: "",
          port: 10,
          value: 1,
        },
        {
          job: 9,
          name: "",
          port: 10,
          value: 1,
        },
        {
          job: 10,
          name: "",
          port: 10,
          value: 1,
        },
      ],
    },
    robot4: {
      inPort: {
        start: 4,
        stop: 2,
        pause: 1,
        faultPause: 5,
        reserveRun: 6,
      },
      inValue: {
        start: 1,
        stop: 0,
        pause: 1,
        faultPause: 0,
        reserveRun: 1,
      },
      program: [
        {
          job: 1,
          name: "",
          port: 10,
          value: 1,
        },
        {
          job: 2,
          name: "",
          port: 10,
          value: 1,
        },
        {
          job: 3,
          name: "",
          port: 10,
          value: 1,
        },
        {
          job: 4,
          name: "",
          port: 10,
          value: 1,
        },
        {
          job: 5,
          name: "",
          port: 10,
          value: 1,
        },
        {
          job: 6,
          name: "",
          port: 10,
          value: 1,
        },
        {
          job: 7,
          name: "",
          port: 10,
          value: 1,
        },
        {
          job: 8,
          name: "",
          port: 10,
          value: 1,
        },
        {
          job: 9,
          name: "",
          port: 10,
          value: 1,
        },
        {
          job: 10,
          name: "",
          port: 10,
          value: 1,
        },
      ],
    },
  },
};
