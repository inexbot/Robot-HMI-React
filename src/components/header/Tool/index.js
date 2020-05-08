import React from "react";
import { connect } from "dva";
import intl from "react-intl-universal";
import "../Index/index.css";
import { Select } from "antd";
import { useState } from "react";
import { sendMSGtoController } from "service/network";
import { useEffect } from "react";

const { Option } = Select;

const mapStateToProps = state => {
  return {
    currentRobot: state.index.robotStatus.currentRobot,
    currentTool: state.index.robotStatus.currentTool
  };
};

function Tool(props) {
  const [tool, setTool] = useState("Tool1");
  useEffect(() => {
      switch(props.currentTool){
          case 0:
              setTool("Tool0");
              break;
          case 1:
              setTool("Tool1");
              break;
          case 2:
              setTool("Tool2");
              break;
          case 3:
              setTool("Tool3");
              break;
          case 4:
              setTool("Tool4");
              break;
          case 5:
              setTool("Tool5");
              break;
          case 6:
              setTool("Tool6");
              break;
          case 7:
              setTool("Tool7");
              break;
          case 8:
              setTool("Tool8");
              break;
          case 9:
              setTool("Tool9");
              break;
          default:
              console.log("接收到错误工具坐标",props.currentTool)
              break;
      }
  }, [props.currentTool]);

  const handleChangemode = value => {
    switch (value) {
      case "Tool0":
        let toolData0 = {
          robot: props.currentRobot,
          curToolNum: 0
        };
        sendMSGtoController("TOOLNUMBER_SWITCH", toolData0);
        break;
      case "Tool1":
        let toolData1 = {
          robot: props.currentRobot,
          curToolNum: 1
        };
        sendMSGtoController("TOOLNUMBER_SWITCH", toolData1);
        break;
      case "Tool2":
        let toolData2 = {
          robot: props.currentRobot,
          curToolNum: 2
        };
        sendMSGtoController("TOOLNUMBER_SWITCH", toolData2);
        break;
      case "Tool3":
        let toolData3 = {
          robot: props.currentRobot,
          curToolNum: 3
        };
        sendMSGtoController("TOOLNUMBER_SWITCH", toolData3);
        break;
      case "Tool4":
        let toolData4 = {
          robot: props.currentRobot,
          curToolNum: 4
        };
        sendMSGtoController("TOOLNUMBER_SWITCH", toolData4);
        break;
      case "Tool5":
        let toolData5 = {
          robot: props.currentRobot,
          curToolNum: 5
        };
        sendMSGtoController("TOOLNUMBER_SWITCH", toolData5);
        break;
      case "Tool6":
        let toolData6 = {
          robot: props.currentRobot,
          curToolNum: 6
        };
        sendMSGtoController("TOOLNUMBER_SWITCH", toolData6);
        break;
      case "Tool7":
        let toolData7 = {
          robot: props.currentRobot,
          curToolNum: 7
        };
        sendMSGtoController("TOOLNUMBER_SWITCH", toolData7);
        break;
      case "Tool8":
        let toolData8 = {
          robot: props.currentRobot,
          curToolNum: 8
        };
        sendMSGtoController("TOOLNUMBER_SWITCH", toolData8);
        break;
      case "Tool9":
        let toolData9 = {
          robot: props.currentRobot,
          curToolNum: 9
        };
        sendMSGtoController("TOOLNUMBER_SWITCH", toolData9);
        break;
        default:
          break;
    }
  };
  return (
    <div>
      <Select
        value={tool}
        onChange={handleChangemode}
        showArrow={false}
        dropdownMatchSelectWidth={false}
        className="Tool"
      >
        <Option value="Tool0">{intl.get("无工具")}</Option>
        <Option value="Tool1">{intl.get("工具")}1</Option>
        <Option value="Tool2">{intl.get("工具")}2</Option>
        <Option value="Tool3">{intl.get("工具")}3</Option>
        <Option value="Tool4">{intl.get("工具")}4</Option>
        <Option value="Tool5">{intl.get("工具")}5</Option>
        <Option value="Tool6">{intl.get("工具")}6</Option>
        <Option value="Tool7">{intl.get("工具")}7</Option>
        <Option value="Tool8">{intl.get("工具")}8</Option>
        <Option value="Tool9">{intl.get("工具")}9</Option>
      </Select>
    </div>
  );
}

export default connect(mapStateToProps)(Tool);
