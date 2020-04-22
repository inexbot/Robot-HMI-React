import React from "react";
import intl from "react-intl-universal";
import { Menu, Dropdown, Slider, Row, Col, InputNumber } from "antd";
import "./index.css";
import { connect } from "dva";
import { useState } from "react";
import { useEffect } from "react";
import { sendMSGtoController } from "service/network";

const mapStateToProps = state => {
  return {
    currentRobot: state.index.robotStatus.currentRobot,
    handleSpeed: state.index.robotStatus.handleSpeed
  };
};

function HandleSpeed(props) {
  const [inputValue, setInputValue] = useState(1);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setInputValue(props.handleSpeed);
  }, [props.handleSpeed]);

  const handleMenuClick = e => {
    if (e.key === "3") {
      setVisible(false);
    }
  };

  const handleVisibleChange = flag => {
    setVisible(flag);
  };

  const onChange = value => {
    let speedData = {
      robot: props.currentRobot,
      speed: value
    };
    sendMSGtoController("SPEED_SET", speedData);
  };
  const menu = (
    <Menu onClick={handleMenuClick} style={{width:240}}>
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
      className="handle"
    >
      <button className="ant-dropdown-link">
        {intl.get("手动速度")} {inputValue}%
      </button>
    </Dropdown>
  );
}

export default connect(mapStateToProps)(HandleSpeed);
