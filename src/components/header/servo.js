import React from "react";
import intl from "react-intl-universal";
import "./index.css";
import { Select } from "antd";
import { connect } from "dva";
import { sendMSGtoController } from "service/network";
import { useState } from "react";
import { useEffect } from "react";

const { Option } = Select;

const mapStateToProps = (state) => {
  return {
    currentRobot: state.index.robotStatus.currentRobot,
    currentRobotServoState: state.index.robotStatus.currentRobotServoState,
    deadmanState: state.index.robotStatus.deadmanState,
  };
};
function Servo(props) {
  const [servoState, setServoState] = useState("Stop");
  useEffect(() => {
    switch (props.currentRobotServoState) {
      case 0:
        setServoState("Stop");
        break;
      case 1:
        setServoState("Ready");
        break;
      case 3:
        setServoState("Run");
        break;
      case 2:
        setServoState("Stop");
        break;
      default:
        break;
    }
  }, [props.currentRobotServoState]);
  const handleChangemode = (value) => {
    switch (value) {
      case "Stop":
        let servoData1 = {
          robot: props.currentRobot,
          status: 0,
        };
        sendMSGtoController("SERVO_STATUS_SET", servoData1);
        break;
      case "Ready":
        let servoData2 = {
          robot: props.currentRobot,
          status: 1,
        };
        sendMSGtoController("SERVO_STATUS_SET", servoData2);
        break;
      default:
        break;
    }
  };
  return (
    <div>
      <Select
        value={servoState}
        onChange={handleChangemode}
        showArrow={false}
        className="servo"
      >
        <Option value="Stop">{intl.get("伺服停止")}</Option>
        <Option value="Ready">{intl.get("伺服就绪")}</Option>
        <Option value="Run">{intl.get("伺服运行")}</Option>
      </Select>
    </div>
  );
}
export default connect(mapStateToProps)(Servo);
