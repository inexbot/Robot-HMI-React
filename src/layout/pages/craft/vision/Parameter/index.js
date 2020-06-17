import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  notification,
  ConfigProvider,
  Select,
  Divider,
  Input,
  Modal,
  Switch,
  Radio
} from "antd";
import { connect } from "dva";
import { useHistory } from 'react-router-dom';
import "./parameter.module.less"
import { sendMSGtoController} from "service/network";

  const mapStateToProps = (state) => {
    return{
      parameterList:state.index.vision.parameterList
    }
  };

  function Parameter(props) {

    const [triggermbtn1, setTriggerbtn1] = useState(true)
    const [triggermbtn2, setTriggerbtn2] = useState(false)
    const [triggermbtn3, setTriggerbtn3] = useState(true)
    const [triggermbtn4, setTriggerbtn4] = useState(false)
    const [allIpt, setAllIpt] = useState(true)
    const [showSave, setShowSave] = useState(false)
    const [clientorsave, setClientorsave] = useState(false)
    const [clientNum, setClientNum] = useState(true)
    const [clientway, setClientway] = useState(true)
    const [ethernetway, setEthernetway] = useState(false)
    const [conditiontime, setConditiontime] = useState(false)
 
    // 使用受控组件来写输入框的数据
    const [VisionCurrentName, setVisionCurrentName] = useState(props.parameterList.cameraList.currentName)
    const [VisionServer, setVisionServer] = useState(props.parameterList.socket.server)
    const [VisionIp, setVisionIp] = useState(props.parameterList.socket.IP)
    const [VisionPortNum, setVisionPortNum] = useState(props.parameterList.socket.portNum)
    const [VisionPortOne, setVisionPortOne] = useState(props.parameterList.socket.portOne)
    const [VisionPortTwo, setVisionPortTwo] = useState(props.parameterList.socket.portTwo)
    const [VisionEndMark, setVisionEndMark] = useState(props.parameterList.protocol.endMark)
    const [VisionSinleTarget, setVisionSinleTarget] = useState(props.parameterList.protocol.singleTarget)
    const [VisionHeight, setVisionHeight] = useState(props.parameterList.protocol.height)
    const [VisionFrameHeader, setVisionFrameHeader] = useState(props.parameterList.protocol.frameHeader)
    const [VisionSeparator, setVisionSeparator] = useState(props.parameterList.protocol.separator)
    const [VisionFailFlag, setVisionFailFlag] = useState(props.parameterList.protocol.failFlag)
    const [VisionSuccessFlag, setVisionSuccessFlag] = useState(props.parameterList.protocol.successFlag)
    const [VisionTimeOut, setVisionTimeOut] = useState(props.parameterList.protocol.timeOut)
    const [VisionAngleUnit, setVisionAngleUnit] = useState(props.parameterList.protocol.angleUnit)
    const [VisionUserCoordNum, setVisionUserCoordNum] = useState(props.parameterList.userCoordNum)
    const [VisionTriggerMode, setVisionTriggerMode] = useState(props.parameterList.trigger.triggerMode)
    const [VisionTriggerStr, setVisionTriggerStr] = useState(props.parameterList.trigger.triggerStr)
    const [VisionIOPort, setVisionIOPort] = useState(props.parameterList.trigger.IOPort)
    const [VisionTriggerOnce, setVisionTriggerOnce] = useState(props.parameterList.trigger.triggerOnce)
    const [VisionIntervals, setVisionIntervals] = useState(props.parameterList.trigger.intervals)

    const [copycraftNum, setCopycraftNum] = useState(1)


    // 查询视觉参数

    const sendinquireparameterdata = () =>{

    } 
    // 改变数据
    useEffect(()=>{
      // sendinquireparameterdata()
      let dataList = {
        robot:1,
        visionNum:copycraftNum
      }
      sendMSGtoController("VISION_PARAMETER_INQUIRE" ,dataList)
    },[copycraftNum])

    useEffect(()=>{

      setVisionServer(props.parameterList.socket.server)
      setVisionIp(props.parameterList.socket.IP)
      setVisionPortNum(props.parameterList.socket.portNum)
      setVisionPortOne(props.parameterList.socket.portOne)
      setVisionPortTwo(props.parameterList.socket.portTwo)
      setVisionEndMark(props.parameterList.protocol.endMark)
      setVisionSinleTarget(props.parameterList.protocol.singleTarget)
      setVisionHeight(props.parameterList.protocol.height)
      setVisionFrameHeader(props.parameterList.protocol.frameHeader)
      setVisionSeparator(props.parameterList.protocol.separator)
      setVisionFailFlag(props.parameterList.protocol.failFlag)
      setVisionSuccessFlag(props.parameterList.protocol.successFlag)
      setVisionTimeOut(props.parameterList.protocol.timeOut)
      setVisionAngleUnit(props.parameterList.protocol.angleUnit)
      setVisionUserCoordNum(props.parameterList.userCoordNum)
      setVisionTriggerMode(props.parameterList.trigger.triggerMode)
      setVisionTriggerStr(props.parameterList.trigger.triggerStr)
      setVisionIOPort(props.parameterList.trigger.IOPort)
      setVisionTriggerOnce(props.parameterList.trigger.triggerOnce)
      setVisionIntervals(props.parameterList.trigger.intervals)
      setVisionCurrentName(props.parameterList.cameraList.currentName)

      setTriggerbtn1(props.parameterList.trigger.triggerMode==1? true : false)
      setTriggerbtn2(props.parameterList.trigger.triggerMode==2? true : false)
      setTriggerbtn3(props.parameterList.trigger.triggerOnce? true : false)
      setTriggerbtn4(props.parameterList.trigger.triggerOnce? false : true)

      // setEthernetway(props.parameterList.trigger.triggerMode==1? true : false)
      // setConditiontime(props.parameterList.trigger.triggerOnce? true : false)

      
    },[props.parameterList])

    const { Option } = Select;
    const cameraNumchildren = [];
    let history = useHistory();
    for (let i = 0; i <9; i++) {
      cameraNumchildren.push(
        <Option key={i}>{  i}</Option>
      );
    } 
    const userNumchildren = []
    for (let i = 0; i<10; i++) {
      userNumchildren.push(
        <Option key={i}>{ i==0?"不使用":i }</Option>
      );
    }

    const cameratypeNumchildren = []
    for (let i = 0; i<2; i++) {
      cameratypeNumchildren.push(
        <Option key={i}>{ i==0?"客户端": "服务端" }</Option>
      );
    }

    const portNumchildren = []
    for (let i = 1; i<3; i++) {
      portNumchildren.push(
        <Option key={i}> {i}</Option>
      );
    }

    const angleUnitNumchildren = []
    for (let i = 0;i<2;i++){
      angleUnitNumchildren.push(
        <Option key={i}> {i == 0? "角度" : "弧度"}</Option>
      )
    }

    const handleChange =(value) => {
      setCopycraftNum(Number(value))
      console.log(value)
    }
    const heightChange = (checked) => {
      console.log(`switch to ${checked}`);
      setVisionHeight(!VisionHeight)
    }

    const singleTargetChange = (checked) => {
      console.log(`switch to ${checked}`);

      setVisionSinleTarget(!VisionSinleTarget)
    }


    useEffect(()=>{

      if(triggermbtn1==true  ){
        setClientway(false)
      }else if(triggermbtn1==false ){
        setClientway(true)
      }
      
      if(triggermbtn2==true ){
        setEthernetway(false)
      }else if(triggermbtn2==false ){
        setEthernetway(true)
      }

      if(triggermbtn4==true  ){
        setConditiontime(false)
      }else if(triggermbtn4==false ){
        setConditiontime(true)
      }
    },[triggermbtn1,triggermbtn2,triggermbtn3,triggermbtn4,VisionTriggerOnce])

    const showclientorsave = (value)=>{
      // console.log(value)
      if(value==0){
        setClientorsave(true)
      }else if(value==1){
        setClientorsave(false)
      }
    }

    const showclientnumChange = (value) =>{
      if(value==1){
        setClientNum(true)
      }else if(value==2){
        setClientNum(false)
      }
    }
    console.log(props.parameterList)
    return( 
      <div style={{ background:"#fff",marginTop:"-30px",zIndex:"2",position:"relative",width:"100%" ,overflowY:"hidden"}}>
        <div className="parameter-top">
          <div className="parameter-camera">
            <p className="parameter-toptext">
              相机选择
            </p>
            <div>
              <span> 工艺号: </span>
              <Select
                  onChange={handleChange}
                  defaultValue="1"
                  style={{ width: 200 }}
                >
                  {cameraNumchildren}
              </Select>
            </div>
            <div>
            <span>类型:</span>
              {allIpt == true?  <Input  disabled={allIpt} value={VisionCurrentName}  style={{ width: 200 }}></Input>:
                <Select disabled={allIpt} defaultValue="customize" style={{ width: 200 }} >
                  {"customize"}
                </Select>  
              }

            </div>
          </div>
          <div className="parameter-usercoordinates">
            <p className="parameter-topltext">
              用户坐标系
            </p>
            <span>用户坐标编号</span>
            {allIpt? <Input disabled={allIpt} value={VisionUserCoordNum} style={{ width: 200 }}/>:
              <Select disabled={allIpt} defaultValue={VisionUserCoordNum} onChange={(value)=>{ setVisionUserCoordNum(value) }} style={{ width: 200 }} >
                {userNumchildren}
              </Select>
            }
            
          </div>
        </div>
        <div className="parameter-content">
          <div className="parameter-content-l">  
            <div className="parameter-networkparam">
              <p className="parameter-content-ltext"> 网络参数 </p>
              <div className="parameter-content-ltop">
                {clientorsave?
                  <div >
                    控制器ip:
                    <Select disabled="false" defaultValue=""  style={{ width: 100 }} >
                  </Select></div> :
                  <div >
                    相机ip:
                    <Input disabled={allIpt} value={ VisionIp }  style={{ width: 150,marginLeft:"14px" }} onChange={(e)=>{
                      setVisionIp(e.target.value)
                    }} />
                  </div> 
                }
              </div>

              <div className="parameter-content-lcenter">
                <div>
                 <span>端口数:</span>
                 {allIpt?
                  <Input  disabled={allIpt} value={VisionPortNum } style={{ width: 100,marginLeft:"14px" }}/> :
                  <Select disabled={allIpt} defaultValue={ VisionPortNum } onChange={(value)=>{setVisionPortNum(value)
                   showclientnumChange(value)}} style={{ width: 100,marginLeft:"14px"}} >
                  {portNumchildren}
                  </Select> 
                  }
                 </div>
                 <div>
                 <span>相机:</span>
                 {allIpt?
                 <Input  disabled={allIpt} value={VisionServer==true? "客户端" : "服务端"} style={{ width: 100,marginLeft:"15px" }}/>:
                  <Select disabled={allIpt} defaultValue={ VisionServer==true? "客户端" : "服务端" } onChange={(value)=>{setVisionServer(value)}} style={{ width: 100,marginLeft:"15px" }} >
                  {cameratypeNumchildren}
                  </Select> }
                 
                 </div>
              </div>
              <div className="parameter-content-lbtm">
                  <div>
                  端口1:
                  <Input disabled={allIpt} value={VisionPortOne} style={{ width:"100px",marginLeft:"20px"  }} onChange={(e)=>{
                    setVisionPortOne(e.target.value)
                  }} />
                  </div>
                  <div>
                  端口2:
                  <Input disabled={clientNum} value={VisionPortTwo} style={{ width:"100px",marginLeft:"8px" }} onChange={(e)=>{
                    setVisionPortTwo(e.target.value)
                  }} />
                  </div>
              </div>
            </div>
            <div className="parameter-connectparam">
              <p className="parameter-connectparam-ltext"> 连接参数</p>
              <div className="parameter-connectparam-ltop">
                <div>
                  帧头:
                  <Input disabled={allIpt} value={VisionFrameHeader} style={{ width:"100px",marginLeft:"15px"  }} onChange={(e)=>{setVisionFrameHeader(e.target.value)}}/>
                </div>
                <div>
                  成功发送标志符:
                  <Input disabled={allIpt} value={VisionSuccessFlag}  style={{ width:"28%" }} onChange={(e)=>{setVisionSuccessFlag(e.target.value)}}/>
                </div>
              </div>
              <div className="parameter-connectparam-lttop">
                <div>
                  分隔符:
                  <Input disabled={allIpt} value={VisionSeparator}  style={{ width:"100px" }} onChange={(e)=>{setVisionSeparator(e.target.value)}}/>
                </div>
                <div>
                  失败发送标志符:
                  <Input disabled={allIpt} value={VisionFailFlag}  style={{ width:"37%" }} onChange={(e)=>{setVisionFailFlag(e.target.value)}}/>
                </div>
              </div>
              <div className="parameter-connectparam-lcneter">
                <div>
                  结束符:
                  <Input disabled={allIpt} value={VisionEndMark}  style={{ width:"100px" }} onChange={(e)=>{
                    // console.log(e.target.value)
                    setVisionEndMark(e.target.value)
                  }}/>
                </div>
                <div>
                  超时时间:
                  <Input disabled={allIpt} value={ VisionTimeOut }  style={{ width:"30%",marginLeft:"40px" }} onChange={(e)=>{setVisionTimeOut(e.target.value)}} />s
                </div>
              </div>
              <div className="parameter-connectparam-lbtm">
                <div>
                  仅识别一个目标
                  <Switch disabled={allIpt} checked={VisionSinleTarget} onChange={singleTargetChange} />
                </div>
                <div>
                  发送高度信息:
                  <Switch disabled={allIpt} checked={VisionHeight} onChange={heightChange} />
                </div>
              </div>
            </div>
          </div>
          <div className="parameter-content-r">  
            <div className="parameter-content-rtop">
              <p className="parameter-content-rtoptext"> 触发方式 </p>
              
              <div className="parameter-content-rtop-t">
                <Radio disabled={allIpt} checked={triggermbtn1} onClick={(e)=>{
                  console.log(e.target.checked)
                  if(triggermbtn1){

                  }else if(triggermbtn1==false){
                    setTriggerbtn1(true)
                  }
                  if(e.target.checked==true){
                    setTriggerbtn2(false)
                    setVisionTriggerMode(1)
                  }
                }} >I/O</Radio>
                I/O端口:
                <Select disabled={clientway} defaultValue="无"  style={{ width: 100,marginLeft:"16px" }} >
                    "无"
                </Select>
              </div>
              <div className="parameter-content-rtop-b">
                <Radio disabled={allIpt}  checked={triggermbtn2} onClick={(e)=>{
                  console.log(e.target.checked)
                  if(triggermbtn2){

                  }else if(triggermbtn2==false){
                    setTriggerbtn2(true)
                  }
                  if(e.target.checked==true){
                    setTriggerbtn1(false)
                    setVisionTriggerMode(2)
                  }
                }}>Ethernet</Radio>
                发送:
                <Input disabled={ethernetway} value={ VisionTriggerStr}  style={{ width:"100px" }} onChange={(e)=>{setVisionTriggerStr(e.target.value)}} />
              </div>
            </div>
            <div className="parameter-content-rcenter">
              <p className="parameter-content-rcentertext"> 触发条件 </p>
              <div className="parameter-content-rcenter-t">
                <Radio disabled={allIpt}  checked={triggermbtn3} onClick={(e)=>{
                  console.log(e.target.checked)
                  if(triggermbtn3){
                  }else if(triggermbtn3==false){
                    setTriggerbtn3(true)
                  }
                  if(e.target.checked==true){
                    setTriggerbtn4(false)
                    setVisionTriggerOnce(true)
                  }
                }} >单次触发</Radio>
              </div>
              <div className="parameter-content-rcenter-b">
                <Radio disabled={allIpt}  checked={triggermbtn4 } onClick={(e)=>{
                  console.log(e.target.checked)
                  if(triggermbtn4){

                  }else if(triggermbtn4==false){
                    setTriggerbtn4(true)
                  }
                  if(e.target.checked==true){
                    setTriggerbtn3(false)
                    setVisionTriggerOnce(false)
                  }
                   }} >持续触发</Radio>
                间隔时间:
                <Input disabled={conditiontime}  value={VisionIntervals} style={{ width:"100px" }}  onChange={(e)=>{setVisionIntervals(e.target.value)}}  />ms
              </div>
            </div>
            <div className="parameter-content-rbtm">
              <p className="parameter-content-rbtmtext"> 弧度/角度 </p>
              <div className="parameter-content-rbtmcenter">
                弧度/角度转换:
                <Select disabled={allIpt} defaultValue={ VisionAngleUnit==0?"角度":"弧度" } onChange={(value)=>{setVisionAngleUnit(value)}} style={{ width: 100 }} >
                    {angleUnitNumchildren}
                </Select>
              </div>
            </div>
            <div className="parameter-content-rBtn">
              <Button size="large" type="primary" style={{ background:"#009ad6" }} onClick={ ()=>{
                history.push('/vision')
              } }>返回</Button>
              {showSave?
               <Button size="large" type="primary" style={{ background:"#45b97c",marginLeft:"2px",border:"none"  }} onClick={ ()=>{
                setAllIpt(true)
                setShowSave(false)
                let dataList = {
                  robot:1,
                  visionNum:copycraftNum,
                  cameraType:"customize",
                  vision:{
                    socket:{
                      IP:VisionIp,
                      portOne:Number(VisionPortOne),
                      server:Number(VisionServer),
                      portTwo:Number(VisionPortTwo),
                      portNum:Number(VisionPortNum)
                    },
                    protocol:{
                      endMark:  VisionEndMark,
                      singleTarget:VisionSinleTarget,
                      height:VisionHeight,
                      frameHeader:VisionFrameHeader,
                      separator:VisionSeparator,
                      failFlag:VisionFailFlag,
                      successFlag:VisionSuccessFlag,
                      timeOut:Number(VisionTimeOut),
                      angleUnit:0,
                      // Number(angleUnitNumchildren == null? 0:angleUnitNumchildren ),
                    },
                    trigger:{
                       triggerMode:Number(VisionTriggerMode),
                       triggerStr:VisionTriggerStr,
                       IOPort:Number(VisionIOPort),
                       triggerOnce:VisionTriggerOnce,
                       intervals:VisionIntervals
                    },
                    userCoordNum:Number(VisionUserCoordNum),
                  }
                }

                sendMSGtoController("VISION_PARAMETER_SET",dataList)
                console.log(dataList)
              } }>保存</Button> :
               <Button size="large" type="primary" style={{ background:"#f36c21",marginLeft:"2px",border:"none" }} onClick={ ()=>{ 
                setAllIpt(false)
                setShowSave(true)
              } }>修改</Button>}
             
            </div>
          </div>
        </div>
      </div>
    )
  }

  export default connect(mapStateToProps)(Parameter)