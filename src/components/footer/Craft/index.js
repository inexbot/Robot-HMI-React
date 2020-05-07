import React from "react";
import intl from "react-intl-universal";
import "./index.css";
import { BulbOutlined } from "@ant-design/icons";
import { Button, Menu, Dropdown } from "antd";

function Craft() {
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <p>工艺参数</p>
      </Menu.Item>
      <Menu.Item key="1">
        <p>生成文件</p>
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={menu} trigger={["click"]} placement={"topCenter"}>
      <Button icon={<BulbOutlined />} className="ant-dropdown-link">
        {intl.get("工艺")}
      </Button>
    </Dropdown>
  );
}

export default Craft;
