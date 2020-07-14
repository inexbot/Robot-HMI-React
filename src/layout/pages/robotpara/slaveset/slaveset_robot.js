import React, { useEffect } from "react";
import { Col, Tabs, Select, Row, Table, Input } from "antd";
import { connect } from "dva";
import './slaveset.module.less'
import { servoAmount } from "./slaveset_header";
import { useState } from "react";
import { sendMSGtoController } from "service/network";
const { Option } = Select;
const { TabPane } = Tabs;

const mapStateToProps = (state) => {
  return {
    robotAxle: state.index.slaveSertCommit.axis,
    Robot: state.index.slaveSertCommit.robot,
    isDisabled: state.Slave_Set.isDisabled,
  };
};

function SlaveSetRobot(props) {
  const [ RobotServo, setRobotServo] = useState("虚拟伺服")
  const [ RobotNum, setRobotNum ] = useState(props.Robot.sum)
  const [ RobotType, setRobotType ] = useState(props.Robot.robot[0].robotType)
  const [ RobotTypeNum, setRobotTypeNum ] = useState(6)
  const [ RobotAxisNum, setRobotAxisNum ] = useState(1)
  const [ RobotAxisGroupNum1, setRobotAxisGroupNum1 ] = useState(0)
  const [ RobotAxisGroupNum2, setRobotAxisGroupNum2 ] = useState(0)
  const [ RobotAxisGroupNum3, setRobotAxisGroupNum3 ] = useState(0)
  const [ TypeColumns, setTypeColumns ] = useState('')
  const [ TypeDatas, setTypeDatas ] = useState('')
  const [ AxisColumns, setAxisColumns ] = useState('')
  const [ AxisDatas, setAxisDatas ] = useState('')



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
  console.log(RobotNum)
  
  useEffect(()=>{
    
  },[])
  // 
  useEffect(()=>{
    setRobotNum(props.Robot.sum)
    console.log(props.Robot.sum)
  },[props.Robot])

  

  const RobotTypeList = []
  // 使用循环来循环出机器人及其内容
  for(let i = 0; i < RobotNum; i++){
    RobotTypeList.push(
      <TabPane tab={`机器人${i+1}`} key={i+1} style={{ display:'flex' }}>
        <div style={{ width:'50%' }}>
          <div>
            机器人类型:
            <Select
              defaultValue={RobotType}
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
          <div>
            外部轴组数:
            <Select
              defaultValue={RobotAxisNum}
              disabled={props.isDisabled}
              onChange = {(value)=>{ 
                switch ( value ){
                  case 0 :
                    setRobotAxisNum(0)
                  break;
                  case 1 :
                    setRobotAxisNum(1)
                  break;
                  case 2 :
                    setRobotAxisNum(2)
                  break;
                  case 3 :
                    setRobotAxisNum(3)
                  break;
                  default:

                }
              }}
              style={{ width: '40%',marginLeft:'15%' }}
            >
              <Option key="1" value={0}>无</Option>
              <Option key="2" value={1}>1</Option>
              <Option key="3" value={2}>2</Option>
              <Option key="4" value={3}>3</Option>
            </Select>
          </div>
          <Table
            style={{ marginTop:'10px' }}
            rowClassName='Axistable'
            columns = { AxisColumns }
            dataSource = { AxisDatas }
            pagination={false}
            size="small"
            expandable= {{ 
              expandRowByClick:false
             }}
          >
          </Table>
        </div>
      </TabPane>
    )
  }
  // 机器人类型
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
        { key:`${i+1}`, name:`${i+1}轴`, servo:
            <Select style={{ width:'100%' }} disabled={props.isDisabled} defaultValue='虚拟伺服' ><Option key={i+1} value={i+1}>虚拟伺服</Option></Select> },
      )
    }
    setTypeColumns(TypeColumn)
    setTypeDatas(TypeData)
    console.log(TypeColumn,TypeData)
  },[RobotTypeNum])

  // 从动轴组数
  useEffect(()=>{
    let AxisColumn = [];
    let AxisData = [];
    AxisColumn.push(
      { title:'外部轴', dataIndex:'name', colSpan:0 },
      { title:'伺服', dataIndex:'servo', colSpan:0 }
    )
    // 根据外部轴组数变量来循环出来要显示的表格内容
    for( let i = 0; i < RobotAxisNum; i++ ){
      AxisData.push(
        { key:`${i+1}`,  name:`组${i+1}`,servo: 
          <Select key={i+1} disabled={props.isDisabled} style={{ width:'100%' }} defaultValue={1} onChange={(value)=>{
            console.log(value)
            if( i==0 ){
              setRobotAxisGroupNum1(value)
            }else if( i==1 ){
              setRobotAxisGroupNum2(value)
            }else if( i==2 ){
              setRobotAxisGroupNum3(value)
            }
          }} > 
            <Option key='1' value={1} >单轴旋转台</Option>
            <Option key='2' value={2} >双轴旋转台</Option>
            <Option key='5' value={3} >地轨</Option>
          </Select>,
          // 表格子内容使用三元运算符来判断
          children: i == 0? RobotAxisGroupNum1 == 1?[ {
              key:`${i+1}`,
              name:`轴`,
              servo:
              <Select defaultValue='虚拟伺服' ><Option value={0}>虚拟伺服</Option></Select>
            },
          ] : RobotAxisGroupNum1 == 2? [
            {
              key:`${(i+1)}`,
              name:`轴1`,
              servo:
              <Select defaultValue='虚拟伺服'><Option value={0}>虚拟伺服</Option></Select>
            },
            {
              key:`${(i+2)}`,
              name:`轴2`,
              servo:
              <Select defaultValue='虚拟伺服'><Option value={0}>虚拟伺服</Option></Select>
            }
          ] : [
            {
              key:`${(i+1)}`,
              name:`轴`,
              servo:
              <Select defaultValue='虚拟伺服'><Option value={0}>虚拟伺服</Option></Select>
            }
          ]: i==1? RobotAxisGroupNum2 == 1?[ {
            key:`${i+1}`,
            name:`轴`,
            servo:
            <Select defaultValue='虚拟伺服'><Option value={0}>虚拟伺服</Option></Select>
          },
        ] : RobotAxisGroupNum2 == 2? [
          {
            key:`${(i+1)}`,
            name:`轴1`,
            servo:
            <Select defaultValue='虚拟伺服'><Option value={0}>虚拟伺服</Option></Select>
          },
          {
            key:`${(i+2)}`,
            name:`轴2`,
            servo:
            <Select defaultValue='虚拟伺服'><Option value={0}>虚拟伺服</Option></Select>
          }
        ] : [
          {
            key:`${(i+1)}`,
            name:`轴`,
            servo:
            <Select defaultValue='虚拟伺服'><Option value={0}>虚拟伺服</Option></Select>
          }
        ]: RobotAxisGroupNum3 == 1?[ {
          key:`${i+1}`,
          name:`轴`,
          servo:
          <Select defaultValue='虚拟伺服'><Option value={0}>虚拟伺服</Option></Select>
        },
        ] : RobotAxisGroupNum3 == 2? [
          {
            key:`${(i+1)}`,
            name:`轴1`,
            servo:
            <Select defaultValue='虚拟伺服'><Option value={0}>虚拟伺服</Option></Select>
          },
          {
            key:`${(i+2)}`,
            name:`轴2`,
            servo:
            <Select defaultValue='虚拟伺服'><Option value={0}>虚拟伺服</Option></Select>
          }
        ] : [
          {
            key:`${(i+1)}`,
            name:`轴`,
            servo:
            <Select defaultValue='虚拟伺服'><Option value={0}>虚拟伺服</Option></Select>
          }
        ]
         },
      )
    }
    setAxisColumns(AxisColumn)
    setAxisDatas(AxisData)
  },[RobotAxisNum,RobotAxisGroupNum1,RobotAxisGroupNum2,RobotAxisGroupNum3])

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
              value = { RobotNum }
              disabled={props.isDisabled}
              onChange = {(value)=>{ setRobotNum(Number(value));  console.log(value)}}
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
            {RobotTypeList}
          </Tabs>
        </div>
      </div>
    </div>
  );
}
export default connect(mapStateToProps)(SlaveSetRobot);
