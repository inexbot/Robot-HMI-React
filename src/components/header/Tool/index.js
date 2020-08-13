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

  const handChange = (curToo) =>{
    let toolData = {
      robot: props.currentRobot,
      curToolNum: curToo
    };
    if( curToo === 0 ){
      sendMSGtoController("TOOLNUMBER_SWITCH", toolData);
    }else{
      sendMSGtoController("TOOLNUMBER_SWITCH", toolData);
      sendMSGtoController("TOOLPARAMETER_INQUIRE",{toolNum:curToo})
    }

  }

  const handleChangemode = value => {
    console.log(value)
    switch (value) {
      case "Tool0":
        handChange(0)
        break;
      case "Tool1":
        handChange(1)
        break;
      case "Tool2":
        handChange(2)
        break;
      case "Tool3":
        handChange(3)
        break;
      case "Tool4":
        handChange(4)
        break;
      case "Tool5":
        handChange(5)
        break;
      case "Tool6":
        handChange(6)
        break;
      case "Tool7":
        handChange(7)
        break;
      case "Tool8":
        handChange(8)
        break;
      case "Tool9":
        handChange(9)
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
