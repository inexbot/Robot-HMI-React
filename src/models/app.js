export default {
  namespace: "App",

  state: {
    currentAuthority: "操作工",
    paraFrameDisplay: "close",
    programSeletedRow:[],
    programBoth:false,
    programList:[],
    deleteList:false
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
    changeSeletedRow(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.currentAuthority = action.data;
      return _state;
    }
  },
};
