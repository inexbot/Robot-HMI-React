import React from "react";
import "./index.css";
import { connect } from "dva";
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import QuickControl from "../../layout/state/Quickontrol";
import Servo from "../../layout/state/Servo";
import System from "../../layout/state/System";
import Produce from "../../layout/state/Produce";
import Welding from "../../layout/state/Welding";
import Overproof from "../../layout/state/Overproof";
import Rotation from "../../layout/state/Rotation";
import IOFunction from "../../layout/state/Iofunction";
import IO from "../../layout/state/Io";
import Position from "../../layout/state/Position";
import Jog from "layout/state/Jog";
import DragPlayback from "layout/state/Dragplayback";
import LocalPosition from "layout/state/Localposition";
import Torque from "../../layout/state/Torque";
const mapStateToProps = (state) => {
  return {
    currentState: state.LeftStatus.currentState,
  };
};

function LeftState(props) {
  const renderState = () => {
    let state = props.currentState;
    switch (state) {
      case "Position":
        return <Position />;
      case "System":
        return <System />;
      case "IO":
        return <IO />;
      case "IOFunction":
        return <IOFunction />;
      case "Rotation":
        return <Rotation />;
      case "Overproof":
        return <Overproof />;
      case "Torque":
        return <Torque />;
      case "Welding":
        return <Welding />;
      case "Produce":
        return <Produce />;
      case "Servo":
        return <Servo />;
      case "QuickControl":
        return <QuickControl />;
      case "Jog":
        return <Jog />;
      case "DragPlayback":
        return <DragPlayback />;
      case "LocalPosition":
        return <LocalPosition />;
      default:
        return null;
    }
  };

  return (
    <div className="leftstate-index">
      {/* 用来加载左侧界面的容器，切换加载在src/component/footer/state.js中 */}
      <div id="hidebutton">
        <img
          src={require("../../images/hide.png")}
          alt=""
          onClick={function () {
            document.getElementById("leftframe").style.display = "none";
            clearInterval();
            props.dispatch({
              type: "LeftStatus/changeLeftState",
              data: null,
            });
          }}
          className="leftbtm"
        ></img>
      </div>
      <div id="leftindex">{renderState()}</div>
      {/* 每一个界面中固定会有的将当前窗口隐藏并卸载的按钮 */}
    </div>
  );
}

export default connect(mapStateToProps)(LeftState);
