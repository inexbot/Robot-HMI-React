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

  const mapStateToProps = (state) => {
    return{
      
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
    const [ethernetway, setEthernetway] = useState(true)
    const [conditiontime, setConditiontime] = useState(true)

    const { Option } = Select;
    const cameraNumchildren = [];
    let history = useHistory();
    for (let i = 1; i <10; i++) {
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

    const handleChange =(value) => {
      // setCopycraftNum(Number(value))
      console.log(value)
    }
    const discernChange = (checked) => {
      console.log(`switch to ${checked}`);
    }

    useEffect(()=>{
      if(triggermbtn1==true){
        setClientway(false)
      }else if(triggermbtn1==false){
        setClientway(true)
      }
      
      if(triggermbtn2==true){
        setEthernetway(false)
      }else if(triggermbtn2==false){
        setEthernetway(true)
      }

      if(triggermbtn4==true){
        setConditiontime(false)
      }else if(triggermbtn4==false){
        setConditiontime(true)
      }
    },[triggermbtn1,triggermbtn2,triggermbtn3,triggermbtn4])

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
                  defaultValue="1"
                  style={{ width: 200 }}
                >
                  {cameraNumchildren}
              </Select>
            </div>
            <div>
            <span>类型:</span>
              <Select
                  disabled={allIpt}
                  defaultValue="customize"
                  style={{ width: 200 }}
                >
                  {"customize"}
              </Select>
            </div>
          </div>
          <div className="parameter-usercoordinates">
            <p className="parameter-topltext">
              用户坐标系
            </p>
            <span>用户坐标编号</span>
            <Select disabled={allIpt} defaultValue="不使用" onChange={handleChange} style={{ width: 200 }} >
                {userNumchildren}
            </Select>
          </div>
        </div>
        <div className="parameter-content">
          <div className="parameter-content-l">  
            <div className="parameter-networkparam">
              <p className="parameter-content-ltext"> 网络参数 </p>
              <div className="parameter-content-ltop">
                {clientorsave?
                   <div >
                     相机ip:
                   <Input disabled={allIpt}   style={{ width: 100,marginLeft:"14px" }} />
                   </div> :     
                  <div >
                    控制器ip:
                  <Select disabled="false" defaultValue=""  style={{ width: 100 }} >
                  </Select></div>}
              </div>

              <div className="parameter-content-lcenter">
                <div>
                 <span>端口数:</span>
                 <Select disabled={allIpt} defaultValue="1" onChange={showclientnumChange} style={{ width: 100,marginLeft:"14px"}} >
                   {portNumchildren}
                 </Select>
                 </div>
                 <div>
                 <span>相机:</span>
                 <Select disabled={allIpt} defaultValue="服务端" onChange={showclientorsave} style={{ width: 100,marginLeft:"15px" }} >
                   {cameratypeNumchildren}
                 </Select>
                 </div>
              </div>
              <div className="parameter-content-lbtm">
                  <div>
                  端口1:
                  <Input disabled={allIpt}  style={{ width:"100px",marginLeft:"20px"  }}/>
                  </div>
                  <div>
                  端口2:
                  <Input disabled={clientNum}  style={{ width:"100px",marginLeft:"8px"  }}/>
                  </div>
              </div>
            </div>
            <div className="parameter-connectparam">
              <p className="parameter-connectparam-ltext"> 连接参数</p>
              <div className="parameter-connectparam-ltop">
                <div>
                  帧头:
                  <Input disabled={allIpt}  style={{ width:"100px",marginLeft:"15px"  }}/>
                </div>
                <div>
                  成功发送标志符:
                  <Input disabled={allIpt}  style={{ width:"28%" }}/>
                </div>
              </div>
              <div className="parameter-connectparam-lttop">
                <div>
                  分隔符:
                  <Input disabled={allIpt}  style={{ width:"100px" }}/>
                </div>
                <div>
                  失败发送标志符:
                  <Input disabled={allIpt}  style={{ width:"37%" }}/>
                </div>
              </div>
              <div className="parameter-connectparam-lcneter">
                <div>
                  结束符:
                  <Input disabled={allIpt}  style={{ width:"100px" }}/>
                </div>
                <div>
                  超时时间:
                  <Input disabled={allIpt}  style={{ width:"30%",marginLeft:"40px" }}/>s
                </div>
              </div>
              <div className="parameter-connectparam-lbtm">
                <div>
                  仅识别一个目标
                  <Switch disabled={allIpt} defaultChecked onChange={discernChange} />
                </div>
                <div>
                  发送高度信息:
                  <Switch disabled={allIpt} defaultChecked onChange={discernChange} />
                </div>
              </div>
            </div>
          </div>
          <div className="parameter-content-r">  
            <div className="parameter-content-rtop">
              <p className="parameter-content-rtoptext"> 触发方式 </p>
              
              <div className="parameter-content-rtop-t">
                <Radio disabled={allIpt} checked={triggermbtn1} onClick={(e)=>{
                  setTriggerbtn1(!triggermbtn1)
                  if(e.target.checked==true){
                    setTriggerbtn2(false)
                  }
                }} >I/O</Radio>
                I/O端口:
                <Select disabled={clientway} defaultValue="无" onChange={handleChange} style={{ width: 100,marginLeft:"16px" }} >
                    "无"
                </Select>
              </div>
              <div className="parameter-content-rtop-b">
                <Radio disabled={allIpt}  checked={triggermbtn2} onClick={(e)=>{
                  setTriggerbtn2(!triggermbtn2)
                  if(e.target.checked==true){
                    setTriggerbtn1(false)
                  }
                }}>Ethernet</Radio>
                发送:
                <Input disabled={ethernetway}  style={{ width:"100px" }}/>
              </div>
            </div>
            <div className="parameter-content-rcenter">
              <p className="parameter-content-rcentertext"> 触发条件 </p>
              <div className="parameter-content-rcenter-t">
                <Radio disabled={allIpt}  checked={triggermbtn3} onClick={(e)=>{
                  setTriggerbtn3(!triggermbtn3)
                  if(e.target.checked==true){
                    setTriggerbtn4(false)
                  }
                }} >单次触发</Radio>
              </div>
              <div className="parameter-content-rcenter-b">
                <Radio disabled={allIpt}  checked={triggermbtn4} onClick={(e)=>{
                  setTriggerbtn4(!triggermbtn4)
                  if(e.target.checked==true){
                    setTriggerbtn3(false)
                  }
                   }} >持续触发</Radio>
                间隔时间:
                <Input disabled={conditiontime} style={{ width:"100px" }} />ms
              </div>
            </div>
            <div className="parameter-content-rbtm">
              <p className="parameter-content-rbtmtext"> 弧度/角度 </p>
              <div className="parameter-content-rbtmcenter">
                弧度/角度转换:
                <Select disabled={allIpt} defaultValue="不使用" onChange={handleChange} style={{ width: 100 }} >
                    {userNumchildren}
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