import React, { useState } from "react";
import intl from "react-intl-universal";
import { Menu, Dropdown, Slider, Row, Col, InputNumber } from "antd";
import "../Index/index.css";

function Runspeed() {
  const [inputValue, setInputValue] = useState(1);
  const [visible, setVisible] = useState(false);
  const handleMenuClick = (e) => {
    if (e.key === "3") {
      setVisible(false);
    }
  };

  const handleVisibleChange = (flag) => {
    setVisible(flag);
  };

  const onChange = (value) => {
    setInputValue(value);
  };
  const menu = (
    <Menu onClick={handleMenuClick} style={{ width: 240 }}>
      <Menu.Item key="1">
        <Row>
          <Col span={12}>
            <Slider
              min={1}
              max={100}
              onChange={onChange}
              value={typeof inputValue === "number" ? inputValue : 0}
            />
          </Col>
          <Col span={4}>
            <InputNumber
              style={{ marginLeft: 16 }}
              value={inputValue}
              onChange={onChange}
              max={100}
              min={1}
            />
          </Col>
        </Row>
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown
      overlay={menu}
      onVisibleChange={handleVisibleChange}
      visible={visible}
      trigger={["click"]}
    >
      <button className="ant-dropdown-link">
        {intl.get("运行速度")} {inputValue.toString()}%
      </button>
    </Dropdown>
  );
}
export default Runspeed;
