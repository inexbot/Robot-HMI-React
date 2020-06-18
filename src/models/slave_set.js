export default {
  namespace: "Slave_Set",

  state: {
    isDisabled: true,
    buttoncharacter: "修改",
    buttontype: "primary",
  },

  // subscriptions: {
  //   setup({ dispatch, history }) {
  //     // eslint-disable-line
  //   },
  // },

  // effects: {
  //   *fetch({ payload }, { call, put }) {
  //     // eslint-disable-line
  //     yield put({ type: "save" });
  //   },
  // },

  reducers: {
    changeDisabled(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.isDisabled = action.data.isDisabled;
      _state.buttoncharacter = action.data.buttoncharacter;
      _state.buttontype = action.data.buttontype;
      return _state;
    },
  },
};
