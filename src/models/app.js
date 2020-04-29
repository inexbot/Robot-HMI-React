export default {
  namespace: "App",

  state: {
    currentAuthority: "操作工",
    paraFrameDisplay: "close",
  },

  subscriptions: {},

  effects: {
    *fetch({ payload }, { call, put }) {
      // eslint-disable-line
      yield put({ type: "save" });
    },
  },

  reducers: {
    changeAuthority(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.currentAuthority = action.data.currentAuthority;
      return _state;
    },
    changeParaFrameDisplay(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.paraFrameDisplay = action.data;
      return _state;
    },
    changeRobot1OpenedProgram(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.robot1OpenedProgram = action.data.robot1OpenedProgram;
      return _state;
    },
    changeRobot1CurrentProgram(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.robot1CurrentProgram = action.data.robot1CurrentProgram;
      return _state;
    },
    changeRobot2OpenedProgram(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.robot2OpenedProgram = action.data.robot2OpenedProgram;
      return _state;
    },
    changeRobot2CurrentProgram(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.robot2CurrentProgram = action.data.robot2CurrentProgram;
      return _state;
    },
    changeRobot3OpenedProgram(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.robot3OpenedProgram = action.data.robot3OpenedProgram;
      return _state;
    },
    changeRobot3CurrentProgram(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.robot3CurrentProgram = action.data.robot3CurrentProgram;
      return _state;
    },
    changeRobot4OpenedProgram(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.robot4OpenedProgram = action.data.robot4OpenedProgram;
      return _state;
    },
    changeRobot4CurrentProgram(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.robot4CurrentProgram = action.data.robot4CurrentProgram;
      return _state;
    },
  },
};
