import React from "react";
import intl from "react-intl-universal";
import "./index.css";
import { ProjectOutlined } from "@ant-design/icons";
import { Button, Menu, Dropdown } from "antd";
import { connect } from "dva";
import { useHistory } from "react-router-dom";

const mapStateToProps = (state) => {
  return {
    currentState: state.LeftStatus.currentState,
  };
};

function Var(props) {
  let history = useHistory();
  const changeLeft = (state) => {
    props.dispatch({
      type: "LeftStatus/changeLeftState",
      data: state,
    });
  };
  const mountLeft = (value) => {
    let key = value.key;
    switch (key) {
      case "0":
        changeLeft("LocalPosition");
        document.getElementById("leftframe").style.display = "block";
        break;
      case "1":
        changeLeft("value");
        document.getElementById("leftframe").style.display = "block";
        break;
      case "2":
        history.push('/GlobalLocation')
        break;
      case "3":
        history.push('/GlobalNumberical')
        break;
      default:
        return null;
    }
  };
  const menu = (
    <Menu onClick={mountLeft}>
      {/* <Menu.Item key="0">
        <p>{intl.get("局部位置")}</p>
      </Menu.Item>
      <Menu.Item key="1">
        <p>{intl.get("局部数值")}</p>
      </Menu.Item> */}
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
