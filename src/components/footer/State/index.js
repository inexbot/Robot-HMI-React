import React from "react";
import intl from "react-intl-universal";
import "./index.css";
import { ControlOutlined } from "@ant-design/icons";
import { Button, Menu, Dropdown } from "antd";
import { connect } from "dva";
import { useHistory } from "react-router-dom";

const mapStateToProps = (state) => {
  return {
    currentState: state.LeftStatus.currentState,
  };
};

// 用来切换左侧的状态栏界面
function State(props) {
  let history = useHistory()
  const changeLeft = (state) => {
    props.dispatch({
      type: "LeftStatus/changeLeftState",
      data: state,
    });
  };
  const mountLeft = (value) => {
    let key = value.key;

    switch (key) {
      // case "0":
      //   changeLeft("System");
      //   break;
      // case "1":
      //   changeLeft("Produce");
      //   break;
      // case "2":
      //   changeLeft("Welding");
      //   break;
      // case "3":
      //   changeLeft("Overproof");
      //   break;
      case "4":
        changeLeft("Torque");
        document.getElementById("leftframe").style.display = "block";
        break;
      case "5":
        changeLeft("Rotation");
        document.getElementById("leftframe").style.display = "block";
        break;
      // case "6":
      //   changeLeft("IOFunction");
      //   break;
      // case "7":
      //   changeLeft("Servo");
      //   break;
      case "8":
        // changeLeft("IO");
        history.push('/Imexport')
        break;
      case "9":
        changeLeft("Position");
        document.getElementById("leftframe").style.display = "block";
        break;
      // case "10":
      //   changeLeft("Quickcontrol");
      //   break;
      case "11":
        changeLeft("Jog");
        document.getElementById("leftframe").style.display = "block";
        break;
      default:
        return null;
    }
  };

  const menu = (
    // 按下按钮后弹出来的菜单栏，在Menu.Item中添加项目，每一个项目要跳转的项需要在上面的switch中添加case
    <Menu onClick={mountLeft}>
      {/* <Menu.Item key="0">
        <p>{intl.get("系统状态")}</p>
      </Menu.Item>
      <Menu.Item key="1">
        <p>{intl.get("生产状态")}</p>
      </Menu.Item>
      <Menu.Item key="2">
        <p>{intl.get("焊接状态")}</p>
      </Menu.Item>
      <Menu.Item key="3">
        <p>{intl.get("位置超差")}</p>
      </Menu.Item> */}
      <Menu.Item key="4">
        <p>{intl.get("电机扭矩")}</p>
      </Menu.Item>
      <Menu.Item key="5">
        <p>{intl.get("电机转速")}</p>
      </Menu.Item>
      {/* <Menu.Item key="6">
        <p>{intl.get("IO功能状态")}</p>
      </Menu.Item>
      <Menu.Item key="7">
        <p>{intl.get("伺服状态")}</p>
      </Menu.Item> */}
      <Menu.Item key="8">
        <p>{intl.get("输入输出")}</p>
      </Menu.Item>
      <Menu.Item key="9">
        <p>{intl.get("当前位置")}</p>
      </Menu.Item>
      {/* <Menu.Item key="10">
        <p>{intl.get("快捷控制")}</p>
      </Menu.Item> */}
      <Menu.Item key="11">
        <p>{intl.get("点动")}</p>
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={menu} trigger={["click"]} placement={"topCenter"}>
      <Button icon={<ControlOutlined />} className="ant-dropdown-link">
        {intl.get("状态")}
      </Button>
    </Dropdown>
  );
}

export default connect(mapStateToProps)(State);
