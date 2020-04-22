import React from "react";
import intl from "react-intl-universal";
import "./index.css";
import { Select } from "antd";
import { connect } from "dva";
import { useState } from "react";
import { useEffect } from "react";
import { sendMSGtoController } from "service/network";

const { Option } = Select;

const mapStateToProps = (state) => {
  return {
    currentRobot: state.index.robotStatus.currentRobot,
    robotAmount: state.index.robotStatus.robotAmount,
    multiRobotMode: state.index.robotStatus.multiRobotMode,
  };
};

function Robot(props) {
  const [robot, setRobot] = useState("Robot1");
  const [option, setOption] = useState([
    <Option value="Robot1" key="1">{intl.get("机器人1")}</Option>,
  ]);
  useEffect(() => {
    switch (props.robotAmount) {
      case 1:
        setOption([<Option value="Robot1" key="1">{intl.get("机器人1")}</Option>]);
        break;
      case 2:
        setOption([
          <Option value="Robot1" key="1">{intl.get("机器人1")}</Option>,
          <Option value="Robot2" key="2">{intl.get("机器人2")}</Option>,
        ]);
        break;
      case 3:
        setOption([
          <Option value="Robot1" key="1">{intl.get("机器人1")}</Option>,
          <Option value="Robot2" key="2">{intl.get("机器人2")}</Option>,
          <Option value="Robot3" key="3">{intl.get("机器人3")}</Option>,
        ]);
        break;
      case 4:
        setOption([
          <Option value="Robot1" key="1">{intl.get("机器人1")}</Option>,
          <Option value="Robot2" key="2">{intl.get("机器人2")}</Option>,
          <Option value="Robot3" key="3">{intl.get("机器人3")}</Option>,
          <Option value="Robot4" key="4">{intl.get("机器人4")}</Option>,
        ]);
        break;
      default:
        break;
    }
  }, [props.robotAmount]);
  useEffect(() => {
    switch (props.currentRobot) {
      case 1:
        setRobot("Robot1");
        break;
      case 2:
        setRobot("Robot2");
        break;
      case 3:
        setRobot("Robot3");
        break;
      case 4:
        setRobot("Robot4");
        break;
      default:
        break;
    }
  }, [props.currentRobot]);
  const handleChangemode = (value) => {
    switch (value) {
      case "Robot1":
        let robotData1 = {
          mode: props.multiRobotMode,
          robot: 1,
        };
        sendMSGtoController("ROBOT_SWITCH", robotData1);
        break;
      case "Robot2":
        let robotData2 = {
          mode: props.multiRobotMode,
          robot: 2,
        };
        sendMSGtoController("ROBOT_SWITCH", robotData2);
        break;
      case "Robot3":
        let robotData3 = {
          mode: props.multiRobotMode,
          robot: 3,
        };
        sendMSGtoController("ROBOT_SWITCH", robotData3);
        break;
      case "Robot4":
        let robotData4 = {
          mode: props.multiRobotMode,
          robot: 4,
        };
        sendMSGtoController("ROBOT_SWITCH", robotData4);
        break;
      default:
        break;
    }
  };
  return (
    <div>
      <Select
        value={robot}
        onChange={handleChangemode}
        showArrow={false}
        dropdownMatchSelectWidth={false}
        className="robot"
      >
        {option}
      </Select>
    </div>
  );
}
export default connect(mapStateToProps)(Robot);
