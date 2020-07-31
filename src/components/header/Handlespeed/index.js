import React,{ useEffect, useState } from "react";
import intl from "react-intl-universal";
import { Menu, Dropdown, Slider, Row, Col, InputNumber } from "antd";
import "../Index/index.css";
import { connect } from "dva";
import { sendMSGtoController } from "service/network";

const mapStateToProps = state => {
  return {
    currentRobot: state.index.robotStatus.currentRobot,
    handleSpeed: state.index.robotStatus.handleSpeed,
    operaMode: state.index.robotStatus.operaMode
  };
};

function HandleSpeed(props) {
  const [ visible, setVisible] = useState(false);
  const [ Vvalue, setVvalue ] = useState(1)

  useEffect(() => {
    setVvalue(props.handleSpeed);
  }, [props.handleSpeed]);

  useEffect(()=>{
    let dataList = {
      robot:props.currentRobot,
    }
    sendMSGtoController("CURRENT_ROBOT_SPEED_INQUIRE",dataList)
  },[props.currentRobot])

  const handleMenuClick = e => {
    if (e.key === "3") {
      setVisible(false);
    }
  };

  const handleVisibleChange = flag => {
    if(props.operaMode === 0){
      setVisible(flag);
    }
  };

  const SlionChange = value => {
    let speedData = {
      robot: props.currentRobot,
      speed: Vvalue
    };
    sendMSGtoController("SPEED_SET", speedData);
    props.dispatch({
      type:"index/sethandleSpeed",
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
      type:"index/sethandleSpeed",
      data:value
    })
  }
  const Vchanges = value => {
    setVvalue(value)
  }

  const menu = (
    <Menu onClick={handleMenuClick} style={{width:240}}>
      <Menu.Item key="1">
        <Row>
          <Col span={12}>
            <Slider
              min={1}
              max={100}
              onChange={Vchanges}
              onAfterChange={SlionChange}
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
      className="handle"
    >
      <button className="ant-dropdown-link">
        {intl.get("手动速度")} {Vvalue}%
      </button>
    </Dropdown>
  );
}

export default connect(mapStateToProps)(HandleSpeed);
