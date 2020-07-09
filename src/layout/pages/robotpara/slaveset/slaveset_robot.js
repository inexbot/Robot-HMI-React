import React, { useEffect } from "react";
import { Col, Tabs, Select, Row, Table } from "antd";
import { connect } from "dva";
import "./slaveset.less";
import { servoAmount } from "./slaveset_header";
import { useState } from "react";
const { Option } = Select;
const { TabPane } = Tabs;

const mapStateToProps = (state) => {
  return {
    robotAxle: state.index.slaveSertCommit.axis,
  };
};

function SlaveSetRobot(props) {

  const [ RobotServo, setRobotServo] = useState("虚拟伺服")
  const [ SalveRobotAxle, setSalveRobotAxle ] = useState(props.robotAxle)
  const [ RobotNum, setRobotNum ] = useState(props.robotAxle.length)
  const [ RobotTypeNum, setRobotTypeNum ] = useState(6)
  const [ TypeColumns, setTypeColumns ] = useState('')
  const [ TypeDatas, setTypeDatas ] = useState('')

  console.log(SalveRobotAxle)
  // useEffect(()=>{
  //   setSalveRobotAxle(props.robotAxle)
  // },[props.robotAxle])

  // 伺服选择下拉框的内容生成
  const servoSelectOption = (servoAmount) => {
    const options = [];
    for (let i = 0; i < servoAmount.length; i++) {
      options.push(<Option key={i + 1}>{"伺服-" + (i + 1)}</Option>);
    }
    return options;
  };
  const callback = () =>{
    console.log('sss')
    // setRobotNum()
  }
  const RobotType = []

  for(let i = 0; i < RobotNum; i++){
    RobotType.push(
      <TabPane tab={`机器人${i+1}`} key={i+1} style={{ display:'flex' }}>
        <div style={{ width:'50%' }}>
          <div>
            机器人类型:
            <Select
              defaultValue={1}
              disabled={props.isDisabled}
              onChange = {(value)=>{ 
                switch ( value ){
                  case 0 :
                    setRobotTypeNum(0)
                    break;
                  case 'R_GENERAL_6S':
                    setRobotTypeNum(6)
                    break;
                  case 'R_SCARA':
                    setRobotTypeNum(4)
                    break;
                  case 'R_FOURAXIS_PALLET':
                    setRobotTypeNum(4)
                    break;
                  case 'R_FOURAXIS':
                    setRobotTypeNum(4)
                    break;
                  case 'R_GENERAL_1S':
                    setRobotTypeNum(1)
                    break;
                  case 'R_GENERAL_5S':
                    setRobotTypeNum(5)
                    break;
                  case 'R_GENERAL_6S_1':
                    setRobotTypeNum(6)
                    break;
                  case 'R_SCARA_TWOAXIS':
                    setRobotTypeNum(2)
                    break;
                  default:

                }
              }}
              style={{ width: '40%',marginLeft:'15%' }}
            >
              <Option key="1" value={0}>无</Option>
              <Option key="2" value={'R_GENERAL_6S'}>六轴</Option>
              <Option key="3" value={'R_SCARA'}>四轴SCARA</Option>
              <Option key="4" value={'R_FOURAXIS_PALLET'}>四轴码垛</Option>
              <Option key="5" value={'R_FOURAXIS'}>四轴</Option>
              <Option key="6" value={'R_GENERAL_1S'}>一轴</Option>
              <Option key="7" value={'R_GENERAL_5S'}>五轴</Option>
              <Option key="8" value={'R_GENERAL_6S_1'}>六轴异形一</Option>
              <Option key="9" value={'R_SCARA_TWOAXIS'}>二轴SCARA</Option>
              {/* <Option key="10" value={'R_SCARA_TWOAXIS'}>二轴SCARA</Option>
              <Option key="11" value={'R_SCARA_TWOAXIS'}>二轴SCARA</Option>
              <Option key="12" value={'R_SCARA_TWOAXIS'}>二轴SCARA</Option>
              <Option key="13" value={'R_SCARA_TWOAXIS'}>二轴SCARA</Option> */}
            </Select>
          </div>
          <Table
            style={{ marginTop:'10px' }}
            columns = { TypeColumns }
            dataSource = { TypeDatas }
            pagination={false}
            size="small"
          >
          </Table>
        </div>
        <div style={{ width:'50%'}}>
          bb
        </div>
      </TabPane>
    )
  }
  
  useEffect(()=>{
    let TypeColumn = [];
    let TypeData = [];
    TypeColumn.push(
      { title:'轴', dataIndex:'name' },
      { title:'伺服', dataIndex:'servo' }
    )
    console.log(RobotTypeNum)
    for( let i = 0; i < RobotTypeNum; i++){
      TypeData.push(
        { key:`${i+1}`, name:`${i+1}轴`, servo: <Select defaultValue='虚拟伺服' ><Option key={i+1} value={i+1}>虚拟伺服</Option></Select> }
      )
    }
    setTypeColumns(TypeColumn)
    setTypeDatas(TypeData)
    console.log(TypeColumn,TypeData)
  },[RobotTypeNum])
  // console.log(RobotTypeNum)
  useEffect(()=>{
    setSalveRobotAxle(props.robotAxle)
    setRobotNum(props.robotAxle.length)
  },props.robotAxle)

  // 机器人
  return (
    <div>
      <div className='slaveset1'>
        <div
          style={{ fontSize: 20, width: 120, fontWeight: 500, float: "left" }}
        >
          从动轴
        </div>
        <div>
          <span className='p1'>机器人数目</span>
          <span>
            <Select
              defaultValue={SalveRobotAxle.length}
              disabled={props.isDisabled}
              onChange = {(value)=>{ setRobotNum(Number(value)) }}
              style={{ width: 200 }}
            >
              <Option key="1" value="1">1</Option>
              <Option key="2" value="2">2</Option>
              <Option key="3" value="3">3</Option>
              <Option key="4" value="4">4</Option>
            </Select>
          </span>
        </div>
        <div>
          <Tabs defaultActiveKey="1" onChange={callback}>
            {RobotType}
          </Tabs>
        </div>
      </div>
    </div>
  );
}
export default connect(mapStateToProps)(SlaveSetRobot);
