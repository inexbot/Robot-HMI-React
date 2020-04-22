import React from "react";
import { connect } from "dva";
import intl from "react-intl-universal";
import "./index.css";
import { Select } from "antd";
import { useState } from "react";
import { sendMSGtoController } from "service/network";
import { useEffect } from "react";

const { Option } = Select;

const mapStateToProps = state => {
  return {
    currentRobot: state.index.robotStatus.currentRobot,
    currentUser: state.index.robotStatus.currentUser
  };
};

function User(props) {
  const [user, setUser] = useState("User1");
  useEffect(() => {
    switch (props.currentUser) {
      case 0:
        setUser("User0");
        break;
      case 1:
        setUser("User1");
        break;
      case 2:
        setUser("User2");
        break;
      case 3:
        setUser("User3");
        break;
      case 4:
        setUser("User4");
        break;
      case 5:
        setUser("User5");
        break;
      case 6:
        setUser("User6");
        break;
      case 7:
        setUser("User7");
        break;
      case 8:
        setUser("User8");
        break;
      case 9:
        setUser("User9");
        break;
      default:
        console.log("接收到错误用户坐标", props.currentUser);
        break;
    }
  }, [props.currentUser]);

  const handleChangemode = value => {
    switch (value) {
      case "User0":
        let userData0 = {
          robot: props.currentRobot,
          userNum: 0
        };
        sendMSGtoController("USERCOORDINATE_SWITCH", userData0);
        break;
      case "User1":
        let userData1 = {
          robot: props.currentRobot,
          userNum: 1
        };
        sendMSGtoController("USERCOORDINATE_SWITCH", userData1);
        break;
      case "User2":
        let userData2 = {
          robot: props.currentRobot,
          userNum: 2
        };
        sendMSGtoController("USERCOORDINATE_SWITCH", userData2);
        break;
      case "User3":
        let userData3 = {
          robot: props.currentRobot,
          userNum: 3
        };
        sendMSGtoController("USERCOORDINATE_SWITCH", userData3);
        break;
      case "User4":
        let userData4 = {
          robot: props.currentRobot,
          userNum: 4
        };
        sendMSGtoController("USERCOORDINATE_SWITCH", userData4);
        break;
      case "User5":
        let userData5 = {
          robot: props.currentRobot,
          userNum: 5
        };
        sendMSGtoController("USERCOORDINATE_SWITCH", userData5);
        break;
      case "User6":
        let userData6 = {
          robot: props.currentRobot,
          userNum: 6
        };
        sendMSGtoController("USERCOORDINATE_SWITCH", userData6);
        break;
      case "User7":
        let userData7 = {
          robot: props.currentRobot,
          userNum: 7
        };
        sendMSGtoController("USERCOORDINATE_SWITCH", userData7);
        break;
      case "User8":
        let userData8 = {
          robot: props.currentRobot,
          userNum: 8
        };
        sendMSGtoController("USERCOORDINATE_SWITCH", userData8);
        break;
      case "User9":
        let userData9 = {
          robot: props.currentRobot,
          userNum: 9
        };
        sendMSGtoController("USERCOORDINATE_SWITCH", userData9);
        break;
      default:
        break;
    }
  };
  return (
    <div>
      <Select
        value={user}
        onChange={handleChangemode}
        showArrow={false}
        dropdownMatchSelectWidth={false}
        className="user"
      >
        <Option value="User0">{intl.get("无用户")}</Option>
        <Option value="User1">{intl.get("用户")}1</Option>
        <Option value="User2">{intl.get("用户")}2</Option>
        <Option value="User3">{intl.get("用户")}3</Option>
        <Option value="User4">{intl.get("用户")}4</Option>
        <Option value="User5">{intl.get("用户")}5</Option>
        <Option value="User6">{intl.get("用户")}6</Option>
        <Option value="User7">{intl.get("用户")}7</Option>
        <Option value="User8">{intl.get("用户")}8</Option>
        <Option value="User9">{intl.get("用户")}9</Option>
      </Select>
    </div>
  );
}

export default connect(mapStateToProps)(User);
