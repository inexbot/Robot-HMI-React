import React, { useState, useEffect } from "react";
import { Table, Button, notification, ConfigProvider, Select, Divider,Input, Modal} from "antd";
import { connect } from "dva";
import { sendMSGtoController } from "service/network";


const mapStateToProps = (state) => {
    return {
      dataSoure: state.index.conveyor.DiscernData,
      conveyorNum: state.index.conveyor.conveyorNum,
      dataSoures:state.index.conveyor.Basicdata
    };
  };

  function Disern(props){

    const [copycraftNum, setCopycraftNum] = useState(1)
    const [showSave, setShowSave ] = useState(false)
    const [showemptyModal, setShowemptyModal] = useState(false);
    const [showcopyModal, setshowcopyModal] = useState(false);
    const [Iptdsb, setIptdsb ] = useState(true)
    const [DisernconveyorID, setDisernConveyorID] = useState(props.dataSoure.conveyorID)
    const [Diserntype, setDiserntype] = useState(props.dataSoure.detectSrc.type)
    const [DisernvisionID, setDisernvisionID] = useState(props.dataSoure.detectSrc.visionID)
    const [DisernDI_capturePos, setDisernDI_capturePos] = useState(props.dataSoure.detectSrc.DI_capturePos)
    const [DisernglobalVar, setDisernglobalVar] = useState(props.dataSoure.detectSrc.globalVar)
    const [Disernidentype, setDisernidentype] = useState(props.dataSoure.identification.type)
    const [Disernidencommunication, setDisernidencommunication] = useState(props.dataSoure.identification.communication)
    const [DisernidensensorTrg, setDisernidensensorTrg] = useState(props.dataSoure.identification.sensorTrg)
    const [signalSource, setSignalSource] = useState('')
    const { Option } = Select;


    useEffect(()=>{
      let dataList = {
        robot:1,
        conveyorID:props.dataSoures.conveyorID
      }
      sendMSGtoController("TRACK_CONVEYOR_POSCHECKPARAM_RESPOND",dataList)
    },[props.dataSoures.conveyorID])
  

    const conveyorNumchildren = [];
    for (let i = 1; i <10; i++) {
      conveyorNumchildren.push(
        <Option key={i}>{  i}</Option>
      );
    } 
    const detectionNumchildren = [];
    for (let i = 0; i <=2; i++) {
      detectionNumchildren.push(
        <Option key={i}>{ i==0?"视觉": i==1?"数字IO":"全局变量"  }</Option>
      );
    } 
    const visinoIDrNumchildren = [];
    for(let i = 1; i<10; i++){
      visinoIDrNumchildren.push(
        <Option key={i}>{ i }</Option>
      );
    }
    const DI_capturePosNumchildren = [];
    DI_capturePosNumchildren.push(
        <Option key="1">无</Option>
    );
    const globalVarNumchildren = [];
    for(let i = 1; i<991; i++){
      globalVarNumchildren.push(
        <Option key={i}>{ i<=9? "GB00"+i : i<=99?"GB0"+i : "GB"+i }</Option>
      );
    }
    const identificationNumchildren = [];
    for(let i = 0; i<2; i++){
      identificationNumchildren.push(
        <Option key={i}>{ i==0?"视觉":"传感器" }</Option>
      );
    }
    const sensorTrgNumchildren = [];
    for(let i = 0; i<2; i++){
      sensorTrgNumchildren.push(
        <Option key={i}>{ i==0?"低电平触发":"高电平触发" }</Option>
      );
    }
    const communicationNumchildren = [];
    for(let i = 0; i<2; i++){
      communicationNumchildren.push(
        <Option key={i}>{ i==0?"以太网":"Modbus" }</Option>
      );
    }
    
    // console.log(props.conveyorNum)
    const handleChange =(value) => {
      setCopycraftNum(Number(value))
    }
  
    const columns = [
      {title: "参数",dataIndex: "name", },
      {title: "值", dataIndex: "money", },
      {title: "单位", dataIndex: "address",}
    ];
    const data = [
      { key: "1", name:"工件检测信号", money: <Select  disabled = { Iptdsb } style={{ width:"200px" }} onChange={(value)=>{setDiserntype(value)}} defaultValue={Diserntype==0?"视觉": Diserntype==1?"数字IO":"全局变量"} >{detectionNumchildren}</Select>, address: "视觉/IO/全局变量", },
      { key: "2", name: "信号源参数", money:<Select  disabled = { Iptdsb } style={{ width:"200px" }} onChange={(value)=>{setSignalSource(value)}} defaultValue={Diserntype==0?DisernvisionID:Diserntype==1?DisernDI_capturePos :DisernglobalVar } >{Diserntype==0?visinoIDrNumchildren:Diserntype==1?DI_capturePosNumchildren :globalVarNumchildren}</Select>, address: "视觉工艺号/IO端口号/变量", },
      { key: "3", name: "工件识别方式", money: <Select  disabled = { Iptdsb } style={{ width:"200px" }} onChange={(value)=>{setDisernidentype(value)}} defaultValue={Disernidentype==0?"视觉":"传感器" } >{identificationNumchildren}</Select>, address: "视觉/传感器", },
      { key: "4", name: "视觉通讯方式", money:<Select  disabled = { Iptdsb } style={{ width:"200px" }} onChange={(value)=>{setDisernidencommunication(value)}} defaultValue={Disernidencommunication==0?"以太网":"Modbus" } >{communicationNumchildren}</Select>, address: "以太网/Modbus", },
      { key: "5", name: "传感器触发方式", money: <Select disabled = { Iptdsb }  style={{ width:"200px" }} onChange={(value)=>{setDisernidensensorTrg(value)}} defaultValue={DisernidensensorTrg==0?"低电平触发":"高电平触发"} >{sensorTrgNumchildren}</Select>, address: "", },
    ];
    
    return(
      <div className="backconnect" style = {{ height:document.body.clientHeight  * 0.68 }}>
        <div className="connect">
          <Table
            scroll={{
              y: window.screen.height * 0.9,
            }}
            pagination={false}
            columns={columns}
            dataSource={data }
          />
        </div>
        <Modal
        title="提示"
        style={{ top: 100 }}
        visible={showemptyModal}
        onOk={() => {
          setShowemptyModal(false)
          let dataList = {
            robot:1,
            conveyorID:props.dataSoure.conveyorID
          }
          sendMSGtoController("TRACK_CONVEYOR_PARAM_CLEAR",dataList)
        }
          
        }
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
        onOk={() => {setshowcopyModal(false) 
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
              defaultValue="1"
              onChange={handleChange}
              style={{ width: 200 }}
            >
              {conveyorNumchildren}
            </Select>
          </div>
        </p>
      </Modal>
        {showSave ? <div  style={{ display:"inline" }}> <Button style = {{ width:"100px",height:"50px",marginLeft:"25%" }} onClick = {()=>{
          let dataList = {}
          if(Diserntype == 0){
            dataList = {
              robot:1,
              conveyorID:DisernconveyorID,
              detectSrc:{
                type:Number(Diserntype),
                visinoID:Number(signalSource),
              },
              identification:{
                type:Number(Disernidentype),
                communication:Number(Disernidencommunication),
                sensorTrg:Number(DisernidensensorTrg)
              }
            }
          }else if(Diserntype == 1){
            dataList = {
              robot:1,
              conveyorID:DisernconveyorID,
              detectSrc:{
                type:Number(Diserntype),
                DI_capturePos:0,
              },
              identification:{
                type:Number(Disernidentype),
                communication:Number(Disernidencommunication),
                sensorTrg:Number(DisernidensensorTrg)
              }
            }
          }else if(Diserntype == 2){
            dataList = {
              robot:1,
              conveyorID:DisernconveyorID,
              detectSrc:{
                type:Number(Diserntype),
                globalVar:Number(signalSource)<=9? "GB00"+signalSource : Number(signalSource)<=99?"GB0"+signalSource : "GB"+signalSource ,
              },
              identification:{
                type:Number(Disernidentype),
                communication:Number(Disernidencommunication),
                sensorTrg:Number(DisernidensensorTrg)
              }
            }
          }
          sendMSGtoController("TRACK_CONVEYOR_POSCHECKPARAM_SET",dataList)
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
        style={{ width: "100px", height: "50px", marginLeft: `${showSave?"28" :"34"}%` }}
        onClick={() => {
          setShowemptyModal(true);
        }}
        >
          清空参数
        </Button>
        <Button style={{ width: "100px", height: "50px" }} onClick={() => {
          setshowcopyModal(true)
        }}>
          复制参数
        </Button>
  
        </div>
    )
  }

  export default connect(mapStateToProps)(Disern)