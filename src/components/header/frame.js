import React from "react";
import intl from "react-intl-universal";
import "./index.css";
import { Select } from "antd";
import { connect } from "dva";
import { useState } from "react";
import { sendMSGtoController } from "service/network";
import { useEffect } from "react";

const { Option } = Select;

const mapStateToProps = state => {
  return {
    currentRobot: state.index.robotStatus.currentRobot,
    currentCoordinate: state.index.robotStatus.currentCoordinate
  };
};

function Frame(props) {
  const [frame, setFrame] = useState("Joint");
  useEffect(() => {
    switch (props.currentCoordinate) {
      case 0:
        setFrame("Joint");
        break;
      case 1:
        setFrame("XYZ");
        break;
      case 2:
        setFrame("Tool");
        break;
      case 3:
        setFrame("User");
        break;
      default:
        console.error("接收到错误坐标系", props.currentCoordinate);
        break;
    }
  }, [props.currentCoordinate]);
  const handleChangemode = value => {
    switch (value) {
      case "Joint":
        let jointData = {
          robot: props.currentRobot,
          coord: 0
        };
        sendMSGtoController("COORD_MODE_SET", jointData);
        break;
      case "XYZ":
        let xyzData = {
          robot: props.currentRobot,
          coord: 1
        };
        sendMSGtoController("COORD_MODE_SET", xyzData);
        break;
      case "Tool":
        let toolData = {
          robot: props.currentRobot,
          coord: 2
        };
        sendMSGtoController("COORD_MODE_SET", toolData);
        break;
      case "User":
        let userData = {
          robot: props.currentRobot,
          coord: 3
        };
        sendMSGtoController("COORD_MODE_SET", userData);
        break;
      default:
        break;
    }
  };
  return (
    <div>
      <Select
        value={frame}
        onChange={handleChangemode}
        showArrow={false}
        dropdownMatchSelectWidth={false}
        className="frame"
      >
        <Option value="Joint">{intl.get("关节")}</Option>
        <Option value="XYZ">{intl.get("直角")}</Option>
        <Option value="Tool">{intl.get("工具")}</Option>
        <Option value="User">{intl.get("用户")}</Option>
      </Select>
    </div>
  );
}
export default connect(mapStateToProps)(Frame);
