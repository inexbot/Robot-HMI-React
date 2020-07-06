import React, { useEffect } from "react";
import { Select, Col, Input, Tabs, Row } from "antd";
import { connect } from "dva";
import { servoAmount } from "./slaveset_header";
import { useState } from "react";

const { TabPane } = Tabs;
const { Option } = Select;

const mapStateToProps = (state) => {
  return {

    axis: state.index.slaveSertCommit.axis,
  };
};

function SlaveSetPrimary(props) {
  const [ state, setState] = useState({
    primaryRobotActiveKey: "robot1",
    primaryJointActiveKey: "J1",
  });
  const [ RobotNum, setRobotNum ] = useState(0)
  const [ RobotTyleNumChildren, setRobotTyleNumChildren ] = useState('')
  const [ axisNumChildren, setaxisNumChildren ] = useState('')
  const callback = (key) =>{
    console.log(key)
    setRobotNum(Number(key-1))
    console.log('sss')
    // setRobotNum()
  }

  const[ SalveRobotAxle, setSalveRobotAxle ] = useState(props.axis)

  const servoSelectOption = (servoAmount) => {
    const options = [];
    for (let i = 0; i < servoAmount.length; i++) {
      options.push(<Option key={i + 1}>{"伺服-" + (i + 1)}</Option>);
    }
    return options;
  };
  console.log(SalveRobotAxle)

  const RobotNumChildren = [];
  // for(let i = 0; i < SalveRobotAxle.length; i++){
  //   // console.log(SalveRobotAxle[i].axis.length,SalveRobotAxle[i].sync.length)
  //   console.log(i)
  //   for(let j = 0; j < SalveRobotAxle[0].axis.length; j++){
  //     RobotTyleNumChildren.splice(0,RobotTyleNumChildren.length)
  //     RobotTyleNumChildren.push(
  //       <TabPane tab={`J${j+1}`} key={j+1} style={{ display:'flex',with:'20px' }}>
  //         这里是J{j+1}
  //       </TabPane>
  //     )
  //   }
  //   for(let k = 0; k < SalveRobotAxle[i].sync.length; k++ ){
  //     RobotTyleNumChildren.splice(0,RobotTyleNumChildren.length)
  //     axisNumChildren.push(
  //       <TabPane tab={`O${k+1}`} key={SalveRobotAxle[i].axis.length+k+1} style={{ display:'flex',with:'20px' }}>
  //       这里是O{k+1}
  //       </TabPane>
  //     )
  //   }
  // }

  useEffect(()=>{
    const RobotTyleNum = [];
    const axisNum = [];
    console.log(RobotNum)
    for(let j = 0; j < SalveRobotAxle[RobotNum].axis.length; j++){
      RobotTyleNum.push(
        <TabPane tab={`J${j+1}`} key={j+1} style={{ display:'flex',with:'20px' }}>
          这里是J{j+1}
        </TabPane>
      )
    }
    for(let k = 0; k < SalveRobotAxle[RobotNum].sync.length; k++ ){
      axisNum.push(
        <TabPane tab={`O${k+1}`} key={SalveRobotAxle[RobotNum].axis.length+k+1} style={{ display:'flex',with:'20px' }}>
        这里是O{k+1}
        </TabPane>
      )
    }
    setRobotTyleNumChildren(RobotTyleNum)
    setaxisNumChildren(axisNum)
  },[RobotNum])

  for(let i = 0; i < SalveRobotAxle.length; i++){
    RobotNumChildren.push(
      <TabPane tab={`机器人${i+1}`} key={i+1} style={{ display:'flex' }}>
        <Tabs defaultActiveKey="1" >
          {RobotTyleNumChildren}
          {axisNumChildren}
        </Tabs>
      </TabPane>
    )
  }

  return (
    <div>
      <Tabs defaultActiveKey="1" onChange={callback}>
        {RobotNumChildren}
      </Tabs>
    </div>
  )

}

export default connect(mapStateToProps)(SlaveSetPrimary);
