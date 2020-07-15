import React, { useState, useEffect } from "react";
import { PageHeader, Button, Col, Row, Select, Tabs, Table, Pagination  } from "antd";
import { router } from "dva";
import intl from "react-intl-universal";
import "./index.css";
import { connect } from "dva";
import { sendMSGtoController } from "service/network";
const { TabPane } = Tabs;

const mapStateToProps = (state) => {
  return {
    currentRobot: state.index.robotStatus.currentRobot,
    Ioremote: state.index.Ioremote
  };
};

const { Option } = Select;

function Ioremote(props) {
  const [ isDisabled, setIsDisabled] = useState(true);
  const [ buttoncharacter, setButtonCharacter] = useState(intl.get("修改"));
  const [ buttontype, setButtontype] = useState("primary");
  const [ RobotNum, setRobotNum ] = useState(props.currentRobot)
  const [ Robotpage, setRobotpage ] = useState(1)

  // 使用受控组件来控制页面选择框的内容
  const [ Robotport1, setRobotport1 ] = useState( props.Ioremote.inValue.start )
  const [ Robotport2, setRobotport2 ] = useState( props.Ioremote.inValue.stop )
  const [ Robotport3, setRobotport3 ] = useState( props.Ioremote.inValue.pause )
  const [ Robotport4, setRobotport4 ] = useState( props.Ioremote.inValue.faultReset )
  const [ Robotport5, setRobotport5 ] = useState( props.Ioremote.inValue.reserveIsStart )
  const [ Robotport6, setRobotport6 ] = useState( props.Ioremote.program[0].value )
  const [ Robotport7, setRobotport7 ] = useState( props.Ioremote.program[1].value )
  const [ Robotport8, setRobotport8 ] = useState( props.Ioremote.program[2].value )
  const [ Robotport9, setRobotport9 ] = useState( props.Ioremote.program[3].value )
  const [ Robotport10, setRobotport10 ] = useState( props.Ioremote.program[4].value )
  const [ Robotport11, setRobotport11 ] = useState( props.Ioremote.program[5].value )
  const [ Robotport12, setRobotport12 ] = useState( props.Ioremote.program[6].value )
  const [ Robotport13, setRobotport13 ] = useState( props.Ioremote.program[7].value )
  const [ Robotport14, setRobotport14 ] = useState( props.Ioremote.program[8].value )
  const [ Robotport15, setRobotport15 ] = useState( props.Ioremote.program[9].value )
  
  const change = () => {
    if (isDisabled === true) {
      setIsDisabled(false);
      setButtonCharacter(intl.get("保存"));
      setButtontype("dashed");
    } else {
      setIsDisabled(true);
      setButtonCharacter(intl.get("修改"));
      setButtontype("primary");
      sendMSGtoController('IO_CONTROL_SET',Robot)
    }
  };

  // 数据改变时刷新选择框内容
  useEffect(()=>{
    setRobotport1(props.Ioremote.inValue.start)
    setRobotport2(props.Ioremote.inValue.stop)
    setRobotport3(props.Ioremote.inValue.pause)
    setRobotport4(props.Ioremote.inValue.faultReset)
    setRobotport5(props.Ioremote.inValue.reserveIsStart)
    setRobotport6(props.Ioremote.program[0].value)
    setRobotport7(props.Ioremote.program[1].value)
    setRobotport8(props.Ioremote.program[2].value)
    setRobotport9(props.Ioremote.program[3].value)
    setRobotport10(props.Ioremote.program[4].value)
    setRobotport11(props.Ioremote.program[5].value)
    setRobotport12(props.Ioremote.program[6].value)
    setRobotport13(props.Ioremote.program[7].value)
    setRobotport14(props.Ioremote.program[8].value)
    setRobotport15(props.Ioremote.program[9].value)
  },[props.Ioremote])
  let setRobotportList = [
    setRobotport6,setRobotport7,setRobotport8,setRobotport9,setRobotport10,setRobotport11,setRobotport12,setRobotport13,setRobotport14,setRobotport15
  ]
  let RobotportList = [
    Robotport6,Robotport7,Robotport8,Robotport9,Robotport10,Robotport11,Robotport12,Robotport13,Robotport14,Robotport15
  ]

  const callback = (value) =>{
    setRobotNum(Number(value))
  }

  useEffect(()=>{
    let DataList = {
      robot:RobotNum
    }
    sendMSGtoController('IO_CONTROL_INQUIRE',DataList)
  },[RobotNum])
  const Robot = props.Ioremote

  // 定义两个机器人选项卡的表格内容
  const RobotData1 = [];
  const RobotData2 = [];
  const RobotColumn = [];
  RobotColumn.push(
    { title:'功能', dataIndex:'fun' },
    { title:'DIN序号', dataIndex:'DIN' },
    { title:'参数', dataIndex:'port' },
    { title:'备注', dataIndex:'remark' }
  )
  RobotData1.push(
    { key:'1', fun:'启动', DIN:<Select disabled={ isDisabled } value={ props.Ioremote.inPort.start===0?'无':'' } > <Option key='1' value={0} > 无 </Option> </Select>, port:<Select disabled={ isDisabled } value={ Robotport1===0?'0':'1' } onChange={( value )=>{ setRobotport1( Number(value)) ; Robot.inValue.start=Number(value)   } } > <Option key='1' value={0} > 0 </Option> <Option key='2' value={1} > 1 </Option> </Select>,remark:`机器人${RobotNum}启动` },
    { key:'2', fun:'停止', DIN:<Select disabled={ isDisabled } value={ props.Ioremote.inPort.stop===0?'无':'' } > <Option key='2' value={0} > 无 </Option> </Select>, port:<Select disabled={ isDisabled } value={ Robotport2===0?'0':'1' } onChange={(value)=>{ setRobotport2(Number(value)) ; Robot.inValue.stop=Number(value) }} > <Option key='2' value={0} > 0 </Option> <Option key='3' value={1} > 1 </Option> </Select>,remark:`机器人${RobotNum}停止` },
    { key:'3', fun:'暂停', DIN:<Select disabled={ isDisabled } value={ props.Ioremote.inPort.pause===0?'无':'' } > <Option key='3' value={0} > 无 </Option> </Select>, port:<Select disabled={ isDisabled } value={ Robotport3===0?'0':'1' } onChange={(value)=>{ setRobotport3(Number(value)) ; Robot.inValue.pause=Number(value) }} > <Option key='3' value={0} > 0 </Option> <Option key='4' value={1} > 1 </Option> </Select>,remark:`机器人${RobotNum}暂停` },
    { key:'4', fun:'清除报警', DIN:<Select disabled={ isDisabled } value={ props.Ioremote.inPort.faultReset===0?'无':'' } > <Option key='4' value={0} > 无 </Option> </Select>, port:<Select disabled={ isDisabled } value={ Robotport4===0?'0':'1' } onChange={(value)=>{ setRobotport4(Number(value)) ; Robot.inValue.faultReset=Number(value) }} > <Option key='4' value={0} > 0 </Option> <Option key='5' value={1} > 1 </Option> </Select>,remark:`清除机器人${RobotNum}伺服错误` },
    { key:'5', fun:'预约并启动', DIN:<Select disabled={ isDisabled } value='无' > <Option key='5' value={0} > 无 </Option> </Select>, port:<Select disabled={ isDisabled } value={ Robotport5===0?'0':'1' } onChange={(value)=>{ setRobotport5(Number(value)) ; Robot.inValue.reserveIsStart=Number(value) }} > <Option key='2' value={0} > 0 </Option> <Option key='5' value={1} > 1 </Option> </Select>,remark:`预约IO后将自动启动运行` },
  )
  for( let i = 0; i < 5; i++ ){
    RobotData1.push(
      { key:`${i+6}`, fun:`远程IO程序${i+1}`,DIN:<Select disabled={ isDisabled } value={ props.Ioremote.program[i].port===0?'无':'' } > <Option key={ i+6 } value={0} > 无 </Option> </Select>, port:<Select disabled={ isDisabled } value={ RobotportList[i]===0?'0':'1' } onChange={( value )=>{  setRobotportList[i](Number(value)) ;Robot.program[i].value = Number(value)  }} > <Option key={ i+7 } value={0} > 0 </Option> <Option key={ i+1 } value={1} > 1 </Option> </Select>,
       remark: props.Ioremote.program[i].name===""?'未设置':props.Ioremote.program[i].name  }
    )
  }
  for( let i = 5; i < 10; i++ ){
    RobotData2.push(
      { key:`${i+6}`, fun:`远程IO程序${i+1}`,DIN:<Select disabled={ isDisabled } value={ props.Ioremote.program[i].port===0?'无':'' } > <Option key={ i+6 } value={0} > 无 </Option> </Select>, port:<Select disabled={ isDisabled } value={ RobotportList[i]===0?'0':'1' } onChange={( value )=>{  setRobotportList[i](Number(value)) ;Robot.program[i].value = Number(value)  }} > <Option key={ i+7 } value={0} > 0 </Option> <Option key={ i+1 } value={1} > 1 </Option> </Select>,
       remark: props.Ioremote.program[i].name===""?'未设置':props.Ioremote.program[i].name  }
    )
  }

 
  return (
    <div>
      {/* 头部 */}
      <div className="con_title">
        <Row>
          <Col span={18}>
            <PageHeader
              title={intl.get("远程控制")}
              subTitle={intl.get("远程控制设置")}
            />
          </Col>
          <Col span={6} className="ret">
            <Button>
              <router.Link to="/">{intl.get("返回工程")}</router.Link>
            </Button>
          </Col>
        </Row>
      </div>
      {/* 悬浮按钮 */}
      <div className="hoverButton1">
        <Button type={buttontype} shape="circle" size="large" onClick={change}>
          {buttoncharacter}
        </Button>
      </div>
      {/* 主要内容 */}
      <div className="ioremote">
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab={`机器人1`} key='1' style={{ }}>
            <Table
              columns={RobotColumn}
              dataSource={Robotpage === 1?RobotData1:RobotData2 }
              pagination={false}
            >
            </Table>
            <Pagination style={{ float:'right',marginRight:'10%' }} defaultCurrent={1}  total={15} onChange = {( page,pageSize )=>{  setRobotpage(page) }} ></Pagination>
          </TabPane>
          <TabPane tab={`机器人2`} key='2' style={{  }}>
            <Table
              columns={RobotColumn}
              dataSource={Robotpage === 1?RobotData1:RobotData2 }
              pagination={false}
            >
            </Table>
            <Pagination style={{ float:'right',marginRight:'10%' }} defaultCurrent={1}  total={15} onChange = {( page,pageSize )=>{  setRobotpage(page) }} ></Pagination>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}
export default connect(mapStateToProps)(Ioremote);
