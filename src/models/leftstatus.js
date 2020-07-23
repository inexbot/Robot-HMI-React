export default {
  namespace: "LeftStatus",

  state: {
    currentState: null,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      // eslint-disable-line
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      // eslint-disable-line
      yield put({ type: "save" });
    },
  },

  reducers: {
    changeLeftState(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      console.log(action.data)
      _state.currentState = action.data;
      return _state;
    },
  },
};
