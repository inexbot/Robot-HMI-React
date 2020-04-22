export const mapStateToProps = state => {
  return {
    robotAmount: state.index.robotStatus.robotAmount,
    currentRobot: state.index.robotStatus.currentRobot,
    robot1DinAmount: state.index.IOParameter.IOMain.robot1DinAmount,
    robot2DinAmount: state.index.IOParameter.IOMain.robot2DinAmount,
    robot3DinAmount: state.index.IOParameter.IOMain.robot3DinAmount,
    robot4DinAmount: state.index.IOParameter.IOMain.robot4DinAmount,
    robot1: {
      inPort: {
        start: state.index.IOParameter.IORemotePara.robot1.inPort.start,
        stop: state.index.IOParameter.IORemotePara.robot1.inPort.stop,
        pause: state.index.IOParameter.IORemotePara.robot1.inPort.pause,
        faultPause: state.index.IOParameter.IORemotePara.robot1.inPort.faultPause,
        reserveRun: state.index.IOParameter.IORemotePara.robot1.inPort.reserveRun,
      },
      inValue: {
        start: state.index.IOParameter.IORemotePara.robot1.inValue.start,
        stop: state.index.IOParameter.IORemotePara.robot1.inValue.stop,
        pause: state.index.IOParameter.IORemotePara.robot1.inValue.pause,
        faultPause: state.index.IOParameter.IORemotePara.robot1.inValue.faultPause,
        reserveRun: state.index.IOParameter.IORemotePara.robot1.inValue.reserveRun
      },
      program: state.index.IOParameter.IORemotePara.robot1.program
    },
    robot2: {
      inPort: {
        start: state.index.IOParameter.IORemotePara.robot1.inPort.start,
        stop: state.index.IOParameter.IORemotePara.robot1.inPort.stop,
        pause: state.index.IOParameter.IORemotePara.robot1.inPort.pause,
        faultPause: state.index.IOParameter.IORemotePara.robot1.inPort.faultPause,
        reserveRun: state.index.IOParameter.IORemotePara.robot1.inPort.reserveRun
      },
      inValue: {
        start: state.index.IOParameter.IORemotePara.robot1.inValue.start,
        stop: state.index.IOParameter.IORemotePara.robot1.inValue.stop,
        pause: state.index.IOParameter.IORemotePara.robot1.inValue.pause,
        faultPause: state.index.IOParameter.IORemotePara.robot1.inValue.faultPause,
        reserveRun: state.index.IOParameter.IORemotePara.robot1.inValue.reserveRun
      },
      program: state.index.IOParameter.IORemotePara.robot1.program
    },
    robot3: {
      inPort: {
        start: state.index.IOParameter.IORemotePara.robot1.inPort.start,
        stop: state.index.IOParameter.IORemotePara.robot1.inPort.stop,
        pause: state.index.IOParameter.IORemotePara.robot1.inPort.pause,
        faultPause: state.index.IOParameter.IORemotePara.robot1.inPort.faultPause,
        reserveRun: state.index.IOParameter.IORemotePara.robot1.inPort.reserveRun
      },
      inValue: {
        start: state.index.IOParameter.IORemotePara.robot1.inValue.start,
        stop: state.index.IOParameter.IORemotePara.robot1.inValue.stop,
        pause: state.index.IOParameter.IORemotePara.robot1.inValue.pause,
        faultPause: state.index.IOParameter.IORemotePara.robot1.inValue.faultPause,
        reserveRun: state.index.IOParameter.IORemotePara.robot1.inValue.reserveRun
      },
      program: state.index.IOParameter.IORemotePara.robot1.program
    },
    robot4: {
      inPort: {
        start: state.index.IOParameter.IORemotePara.robot1.inPort.start,
        stop: state.index.IOParameter.IORemotePara.robot1.inPort.stop,
        pause: state.index.IOParameter.IORemotePara.robot1.inPort.pause,
        faultPause: state.index.IOParameter.IORemotePara.robot1.inPort.faultPause,
        reserveRun: state.index.IOParameter.IORemotePara.robot1.inPort.reserveRun
      },
      inValue: {
        start: state.index.IOParameter.IORemotePara.robot1.inValue.start,
        stop: state.index.IOParameter.IORemotePara.robot1.inValue.stop,
        pause: state.index.IOParameter.IORemotePara.robot1.inValue.pause,
        faultPause: state.index.IOParameter.IORemotePara.robot1.inValue.faultPause,
        reserveRun: state.index.IOParameter.IORemotePara.robot1.inValue.reserveRun
      },
      program: state.index.IOParameter.IORemotePara.robot1.program
    }
  };
};


