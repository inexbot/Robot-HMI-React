
export default {
    namespace: "Backup",

    state:{
        showUploading:false,
    },
    
    reducers: {
        changeShowUploading(state, action) {
          let _state = JSON.parse(JSON.stringify(state));
          console.log(_state,action,"这里是changeShowUploading")
          _state.showUploading = action.data.showUploading;
          return _state;
        },
      },
}
