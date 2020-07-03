import React from "react";
import { Select, Col, Input, Tabs, Row } from "antd";
import { connect } from "dva";
import { servoAmount } from "./slaveset_header";
import { useState } from "react";

const { TabPane } = Tabs;
const { Option } = Select;

const mapStateToProps = (state) => {
  return {

    robotAxle: state.index.slaveSertCommit.robotAxle,
  };
};

function SlaveSetPrimary(props) {
  const [state, setState] = useState({
    primaryRobotActiveKey: "robot1",
    primaryJointActiveKey: "J1",
  });

  const[ SalveRobotAxle, setSalveRobotAxle ] = useState(props.robotAxle)

  const servoSelectOption = (servoAmount) => {
    const options = [];
    for (let i = 0; i < servoAmount.length; i++) {
      options.push(<Option key={i + 1}>{"伺服-" + (i + 1)}</Option>);
    }
    return options;
  };
  return (
    <div>
      这里是从动轴
    </div>
  )

}

export default connect(mapStateToProps)(SlaveSetPrimary);
