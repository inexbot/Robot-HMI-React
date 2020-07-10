import React, { useEffect } from "react";
import { Select, Col, Input, Tabs, Row, Table } from "antd";
import { connect } from "dva";
import { servoAmount } from "./slaveset_header";
import { useState } from "react";
import './slaveset.module.less'
import { sendMSGtoController } from "service/network";

const { TabPane } = Tabs;
const { Option } = Select;

const mapStateToProps = (state) => {
  return {
    axis: state.index.slaveSertCommit.axis,
    Robot: state.index.slaveSertCommit.robot
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
  const [ axisNum, setaxisNum ] = useState(0)
  const [ SalveRobotAxle, setSalveRobotAxle ] = useState(props.axis)
  const [ RobotSelect, setRobotSelect ] = useState(props.Robot.sum)

  const servoSelectOption = (servoAmount) => {
    const options = [];
    for (let i = 0; i < servoAmount.length; i++) {
      options.push(<Option key={i + 1}>{"伺服-" + (i + 1)}</Option>);
    }
    return options;
  };
  // console.log(SalveRobotAxle)

  const RobotNumChildren = [];
  //定义从动轴1的表格
  const OneColumns = [
    {title: "从动轴1", colSpan: 2 ,dataIndex: "name",align:"center" ,},
    {title: "", colSpan: 0 ,dataIndex: "valas",align:"left" ,}
  ]
  const OneDate = [
    { key:"1", name:'伺服序号', valas: <Select defaultValue='虚拟伺服'><Option value={0}>虚拟伺服</Option></Select> },
    { key:"2", name:'减速比', valas: <Input/> },
    { key:"3", name:'编码器位数', valas: <Input/> },
    { key:"4", name:'相对主电机方向', valas: <Select defaultValue={1}><Option key='1' value={0}>1</Option><Option key='2' value={1}>-1</Option></Select> }
  ]
  //定义从动轴2的表格
  const TwoColumns = [
    {title: "从动轴2", colSpan: 2  ,dataIndex: "name",align:"center" ,},
    {title: "", colSpan: 0  ,dataIndex: "valas",align:"left" ,}
  ]
  const TwoDate = [
    { key:"1", name:'伺服序号', valas: <Select defaultValue={'虚拟伺服'}><Option value={0}>虚拟伺服</Option></Select> },
    { key:"2", name:'减速比', valas: <Input/> },
    { key:"3", name:'编码器位数', valas: <Input/> },
    { key:"4", name:'相对主电机方向', valas: <Select defaultValue={1}><Option key='1' value={0}></Option><Option key='2' value={1}>-1</Option></Select> }
  ]
  // },[axisNum])

  useEffect(()=>{
    const RobotTyleNum = [];
    const axisTypeNum = [];
    // console.log(RobotNum)
    for(let j = 0; j < SalveRobotAxle[RobotNum].axis.length; j++){
      RobotTyleNum.push(
        <TabPane tab={`J${j+1}`} key={j+1} style={{  }} >
          <div style={{ }}>
            从动轴个数
            <Select
              defaultValue={axisNum}
              style={{ width: 100 , marginLeft:'40px'}}
              onChange={(value)=>{ setaxisNum(Number(value)) }}
            >
              <Option key='1' value={0}>0</Option>
              <Option key='2' value={1}>1</Option>
              <Option key='3' value={2}>2</Option>
            </Select>
          </div>
          <div style={{ display:'flex', }}>
            <Table 
              bordered = { true }
              columns = { OneColumns }
              dataSource = { OneDate }
              pagination={false}
              style={ axisNum == 0? { width:'40%', marginTop:'20px', opacity:'0' } : { width:'40%', marginTop:'20px', opacity:'1' } }
              size="small"
            >
            </Table>
            <Table 
              bordered = { true }
              columns = { TwoColumns }
              dataSource = { TwoDate }
              pagination={false}
              style={ axisNum == 2? { width:'40%', marginTop:'20px', marginLeft:'10%', opacity:'1' } : { width:'40%', marginTop:'20px', marginLeft:'10%', opacity:'0' }}
              size="small"
            >
            </Table>
          </div>
        </TabPane>
      )
    }
    for(let k = 0; k < SalveRobotAxle[RobotNum].sync.length; k++ ){
      axisTypeNum.push(
        <TabPane tab={`O${k+1}`} key={SalveRobotAxle[RobotNum].axis.length+k+1} style={{ display:'flex' }} >
          <div>
            从动轴个数
            <Select
              defaultValue={axisNum}
              style={{ width: 100 }}
              onChange={(value)=>{ setaxisNum(Number(value)) }}
            >
              <Option value={0}>0</Option>
              <Option value={1}>1</Option>
              <Option value={2}>2</Option>
            </Select>
          </div>

        </TabPane>
      )
    }
    setRobotTyleNumChildren(RobotTyleNum)
    setaxisNumChildren(axisTypeNum)
  },[RobotNum,axisNum])



  for(let i = 0; i < RobotSelect; i++){
    RobotNumChildren.push(
      <TabPane tab={`机器人${i+1}`} key={i+1}  >
        <Tabs defaultActiveKey="1" tabBarGutter={0}  tabBarStyle={ RobotNum == i ? { display:'block' } : { display:'none' }} >
          {RobotTyleNumChildren}
          {axisNumChildren}
        </Tabs>
      </TabPane>
    )
  }

  return (
    <div >
      <Tabs defaultActiveKey="1" onChange={(key)=>{
        setRobotNum(Number(key-1))
        console.log(key)
      }} tabBarExtraContent >
        {RobotNumChildren}
      </Tabs>
    </div>
  )

}

export default connect(mapStateToProps)(SlaveSetPrimary);
