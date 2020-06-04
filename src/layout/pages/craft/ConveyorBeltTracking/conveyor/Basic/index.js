import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  notification,
  ConfigProvider,
  Select,
  Divider,
  Input,
  Modal
} from "antd";
import { connect } from "dva";
import "./index.css";
import { sendMSGtoController } from "service/network";

const mapStateToProps = (state) => {
  return{
    dataSoure: state.index.conveyor.Basicdata,
  }
};

function Basic(props) {

  const [copycraftNum, setCopycraftNum] = useState(1)
  const [showSave, setShowSave ] = useState(false)
  const [showemptyModal, setShowemptyModal] = useState(false);
  const [showcopyModal, setshowcopyModal] = useState(false);
  const [Iptdsb, setIptdsb ] = useState(true)
  const [minEncoderVal, setMinEncoderVal] = useState(props.dataSoure.conveyor.minEncoderVal)
  const [encoderValue, setEncoderValue] = useState(props.dataSoure.conveyor.encoderValue)
  const [maxEncoderVal, setMaxEncoderVal] = useState(props.dataSoure.conveyor.maxEncoderVal)
  const [encoderResolution, setEncoderResolution] = useState(props.dataSoure.conveyor.encoderResolution)
  const [encoderDirection, setEncoderDirection] = useState(props.dataSoure.conveyor.encoderDirection)
  const [speed, setSpeed] = useState(props.dataSoure.conveyor.speed)
  const [userCoord, setUserCoord] = useState(props.dataSoure.conveyor.userCoord)
  const [checkSpeed, setCheckSpeed] = useState(props.dataSoure.conveyor.checkSpeed)
  const [time, setTime] = useState(props.dataSoure.compensation.time)
  const [encoderVal, setEncoderVal] = useState(props.dataSoure.compensation.encoderVal)

  useEffect(()=>{
    setMinEncoderVal(props.dataSoure.conveyor.minEncoderVal)
    setEncoderValue(props.dataSoure.conveyor.encoderValue)
    setMaxEncoderVal(props.dataSoure.conveyor.maxEncoderVal)
    setEncoderResolution(props.dataSoure.conveyor.encoderResolution)
    setEncoderDirection(props.dataSoure.conveyor.encoderDirection)
    setSpeed(props.dataSoure.conveyor.speed)
    setUserCoord(props.dataSoure.conveyor.userCoord)
    setCheckSpeed(props.dataSoure.conveyor.checkSpeed)
    setTime(props.dataSoure.compensation.time)
    setEncoderVal(props.dataSoure.compensation.encoderVal)
  },[props.dataSoure.conveyor,showemptyModal])
  const { Option } = Select;
  const conveyorNumchildren = [];
  for (let i = 1; i <10; i++) {
    conveyorNumchildren.push(
      <Option key={i}>{ i}</Option>
    );
  } 

  const handleChange =(value) => {
    setCopycraftNum(Number(value))
  }
    const encoderDirectionNumchildren = [];
    for (let i = -1; i <2; i++) {
      if(i!=0){
        encoderDirectionNumchildren.push(
          <Option key={i}>{i==1?"正向":"反向"}</Option>
        );
      }
    }
    const checkSpeedNumchildren = [];
    for (let i = 0; i <2; i++) {
      checkSpeedNumchildren.push(
        <Option key={i}>{i==0?"机器人立即结束":"机器人继续运行"}</Option>
      );
    }
    const userCoordNumchildren = [];
    for (let i = 1; i <10; i++) {
      userCoordNumchildren.push(
        <Option key={i}>{i}</Option>
      );
    }

  
    const columns = [
      {title: "参数",dataIndex: "name", },
      {title: "值", dataIndex: "money", },
      {title: "单位", dataIndex: "address",}
    ];
    const data = [
      { key: "1", name:"编码器值",  money: <Input disabled = { Iptdsb } value={encoderValue} onChange={(e)=>{setEncoderValue(e.target.value)}} />, address: "线", },
      { key: "2", name: "编码器计数最小值", money:<Input disabled = { Iptdsb } value={minEncoderVal} onChange={(e)=>{ setMinEncoderVal(e.target.value) }} />, address: "线", },
      { key: "3", name: "编码器计数最大值", money: <Input disabled = { Iptdsb } value={maxEncoderVal} onChange={(e)=>{setMaxEncoderVal(e.target.value)}}  />, address: "线", },
      { key: "4", name: "编码器分辨率", money: <Input disabled = { Iptdsb } value={encoderResolution} onChange={(e)=>{setEncoderResolution(e.target.value)}}  />, address: "线/毫米", },
      { key: "5", name: "编码器方向", money: <Select  disabled = { Iptdsb } defaultValue={encoderDirection==1?"正向":"反向"}onChange={(e)=>{ setEncoderDirection(e) }} >{encoderDirectionNumchildren}</Select>, address: "", },
      { key: "6", name: "当前传送带速度", money: <Input disabled = { Iptdsb } value={speed}  onChange={(e)=>{setSpeed(e.target.value)}} />, address: "毫米/秒",},
      { key: "7", name: "用户坐标系", money: <Select  disabled  = { Iptdsb } defaultValue={userCoord} onChange={(e)=>{ setUserCoord(e) }} >{userCoordNumchildren}</Select>, address: "用户坐标编号", },
      { key: "8", name: "传送带停止处理",  money: <Select  disabled = { Iptdsb } defaultValue={checkSpeed==0?"机器人立即结束":"机器人继续运行"} onChange = {(e)=>{ setCheckSpeed(e) }}>{checkSpeedNumchildren}</Select>, address: "", },
    ];
    const twoColumns = [
      {title: "参数",dataIndex: "name", },
      {title: "值", dataIndex: "money", },
      {title: "单位", dataIndex: "address",}
    ];
    const twoData = [
      { key: "1", name:"时间",  money: <Input disabled = { Iptdsb } value={time} onChange={(e)=>{setTime(e.target.value)}} />, address: "ms", },
      { key: "2", name: "编码器值", money:<Input disabled = { Iptdsb } value={encoderVal} onChange={(e)=>{setEncoderVal(e.target.value)}} />, address: "线", },
    ]
  
  return (           
    <div className = "backconnect" style={{ height:document.body.clientHeight  * 0.68  }} >
      <div className="connect" >
        <Table
          scroll={{
            y: window.screen.height * 0.3,
          }}
          pagination={false}
          size = {"small"}
          columns={columns}
          dataSource={data }
          title={() => "传送带参数："}
        />
      </div>
      <div className="connect">
        <Table
            pagination={false}
            size = {"small"}
            columns={twoColumns}
            dataSource={twoData }
            title={() => "补偿参数："}
          />
      </div>
      <Modal
        title="提示"
        style={{ top: 100 }}
        visible={showemptyModal}
        onOk={() => {setShowemptyModal(false)
          let dataList = {
            robot:1,
            conveyorID:props.dataSoure.conveyorID
          }
          sendMSGtoController("TRACK_CONVEYOR_PARAM_CLEAR",dataList)
          sendMSGtoController("TRACK_CONVEYOR_CONVEYORPARAM_INQUIRE",dataList)
        }}
        onCancel={() => setShowemptyModal(false)}
      >
        <p style={{ fontSize: "30px" }}>确定要清空 工艺号1的参数吗？</p>
        <p style={{ color: "red", fontSize: "30px" }}>
          谨慎操作，一旦清空，无法恢复!
        </p>
      </Modal>
      <Modal
        title="提示"
        style={{ top: 100 }}
        visible={showcopyModal}
        onOk={() => { setshowcopyModal(false) 
          let dataList = {
            robot:1,
            srcConveyorID:props.dataSoure.conveyorID,
            dstConveyorID:copycraftNum
          }
          sendMSGtoController("TRACK_CONVEYOR_PARAM_COPY",dataList)
        }}
        onCancel={() => setshowcopyModal(false)}
      >
        <p style={{ fontSize: "30px" }}>确定要将当前工艺参数复制到</p>
        <p style={{ fontSize: "30px" }}>
          {" "}
          <div>
            工艺号:
            <Select
              defaultValue={copycraftNum}
              onChange={handleChange}
              style={{ width: 200 }}
            >
              {conveyorNumchildren}
            </Select>
          </div>
        </p>
      </Modal>
      {showSave ? <div  style={{ display:"inline" }}> <Button style = {{ width:"100px",height:"50px",marginLeft:"25%" }} onClick={()=>{
        let dataList = {
          robot:1,
          conveyorID:Number(props.dataSoure.conveyorID),
          conveyor:{
            maxEncoderVal:Number(maxEncoderVal),
            minEncoderVal:Number(minEncoderVal),
            encoderDirection:Number(encoderDirection),
            encoderResolution:Number(encoderResolution),
            userCoord:Number(userCoord),
            checkSpeed:Number(checkSpeed),
          },
          compensation:{
            time:Number(time),
            encoderVal:Number(encoderVal),
          }
        }
        sendMSGtoController("SET_THE_CONVEYOR_PARAMETERS",dataList)
      }} >保存</Button>
      <Button style = {{ width:"100px",height:"50px"}} onClick={()=>{
        setShowSave(false)
        setIptdsb(true)
      }}>取消</Button></div> : <Button  style = {{ width:"100px",height:"50px",marginLeft:"25%" }} onClick = {()=>{
        setShowSave(true)
        setIptdsb(false)
      }} >修改</Button> }
       <Button
       type="primary"
        danger 
        style={{ width: "100px", height: "50px", marginLeft: `${showSave?"28" :"34"}%`  }}
        onClick={() => {
          setShowemptyModal(true);
        }}
      >
        清空参数
      </Button>
      <Button type="primary" style={{ width: "100px", height: "50px" }} onClick={() => {
        setshowcopyModal(true)
      }}>
        复制参数
      </Button>

    </div >
  );
}

export default connect(mapStateToProps)(Basic);