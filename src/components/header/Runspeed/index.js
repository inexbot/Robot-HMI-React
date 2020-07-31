import React, { useState,useEffect } from "react";
import intl from "react-intl-universal";
import { Menu, Dropdown, Slider, Row, Col, InputNumber } from "antd";
import "../Index/index.css";
import { connect } from "dva";
import { sendMSGtoController } from "service/network";


const mapStateToProps = state => {
  return {
    currentRobot: state.index.robotStatus.currentRobot,
    runningSpeed: state.index.robotStatus.runningSpeed,
    operaMode: state.index.robotStatus.operaMode
  };
};

function Runspeed(props) {
  const [visible, setVisible] = useState(false);
  const [ Vvalue, setVvalue ] = useState(1)

  useEffect(() => {
    setVvalue(props.runningSpeed);
  }, [props.runningSpeed]);
  const handleMenuClick = (e) => {
    if (e.key === "3") {
      setVisible(false);
    }
  };

  const handleVisibleChange = (flag) => {
    if(props.operaMode === 2){
      setVisible(flag);
    }else if( props.operaMode === 1 ){
      setVisible(flag);
    }else{
      
    }
  };

  const SlionChange = value => {
    let speedData = {
      robot: props.currentRobot,
      speed: Vvalue
    };
    sendMSGtoController("SPEED_SET", speedData);
    props.dispatch({
      type:"index/setrunningSpeed",
      data:Vvalue
    })
  };
  const IptChange = value => { 
    setVvalue(value)
    let speedData = {
      robot: props.currentRobot,
      speed: value
    };
    sendMSGtoController("SPEED_SET", speedData);
    props.dispatch({
      type:"index/setrunningSpeed",
      data:value
    })
  }
  const Vchanges = value => {
    setVvalue(value)
  }
  const menu = (
    <Menu onClick={handleMenuClick} style={{ width: 240 }}>
      <Menu.Item key="1">
        <Row>
          <Col span={12}>
            <Slider
              min={1}
              max={100}
              onChange={Vchanges}
              onAfterChange={SlionChange}
              // value={typeof inputValue === "number" ? inputValue : 0}
              value={Vvalue}
            />
          </Col>
          <Col span={4}>
            <InputNumber
              style={{ marginLeft: 16 }}
              value={Vvalue}
              onChange={IptChange}
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
        {intl.get("运行速度")} {Vvalue.toString()}%
      </button>
    </Dropdown>
  );
}
export default connect(mapStateToProps)(Runspeed);
