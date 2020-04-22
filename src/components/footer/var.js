import React from "react";
import intl from "react-intl-universal";
import "./var.css";
import { ProjectOutlined } from "@ant-design/icons";
import { Button, Menu, Dropdown } from "antd";
import { connect } from "dva";

const mapStateToProps = (state) => {
  return {
    currentState: state.LeftStatus.currentState,
  };
};

function Var(props) {
  const changeLeft = (state) => {
    props.dispatch({
      type: "LeftStatus/changeLeftState",
      data: state,
    });
  };
  const mountLeft = (value) => {
    let key = value.key;
    document.getElementById("leftframe").style.display = "block";
    switch (key) {
      case "0":
        changeLeft("position");
        break;
      case "1":
        changeLeft("value");
        break;
      case "2":
        changeLeft("globalPosition");
        break;
      case "3":
        changeLeft("globalValue");
        break;
      default:
        return null;
    }
  };
  const menu = (
    <Menu onClick={mountLeft}>
      <Menu.Item key="0">
        <p>{intl.get("局部位置")}</p>
      </Menu.Item>
      <Menu.Item key="1">
        <p>{intl.get("局部数值")}</p>
      </Menu.Item>
      <Menu.Item key="2">
        <p>{intl.get("全局位置")}</p>
      </Menu.Item>
      <Menu.Item key="3">
        <p>{intl.get("全局数值")}</p>
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={menu} trigger={["click"]} placement={"topCenter"}>
      <Button icon={<ProjectOutlined />} className="ant-dropdown-link">
        {intl.get("变量")}
      </Button>
    </Dropdown>
  );
}
export default connect(mapStateToProps)(Var);
