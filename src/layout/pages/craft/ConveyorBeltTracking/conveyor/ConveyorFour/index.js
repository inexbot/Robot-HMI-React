import React, { useState, useEffect } from "react";
import { Table, Button, notification, ConfigProvider, Select, Divider, Input } from "antd";
import { connect } from "dva";
import { sendMSGtoController } from "service/network";
import { useHistory } from 'react-router-dom';

const mapStateToProps = (state) => {
    return {
      currentRobot: state.index.robotStatus.currentRobot,
      dataSoure: state.index.conveyor.Basicdata,
    };
  };

  function ConveyorsignFour(props){
    let history = useHistory();
    return(
      <div className="backconnect" style = {{ height:document.body.clientHeight  * 0.68 }}>
        <div className="connect" style={{  width:"50%", width:"50%", marginLeft:"25%"  }} >
        <p style={{ fontSize:"26px" }}>上抬机器人一段距离，点击计算按钮。</p>
        </div>
          <Button  style = {{ width:"100px",height:"50px",marginLeft:"25%" }} onClick = {() =>{
              let dataList = {
                robot:props.currentRobot,
                conveyorID:props.dataSoure.conveyorID,
              }
              sendMSGtoController("TRACK_CONVEYOR_CALIBRATION_CANCEL",dataList)
              history.push('/setparameter/conveyorsign');
          }}>取消标定</Button>
          <Button style = {{ width:"100px",height:"50px",marginLeft:"34%" }} onClick = { ()=>{
              history.push('/setparameter/conveyorThree');
          }}>上一步 </Button>
          <Button style = {{ width:"100px",height:"50px" }} onClick = { ()=>{
             let dataList = {
               robot:props.currentRobot,
               conveyorID:props.dataSoure.conveyorID
             }
              sendMSGtoController("TRACK_CONVEYOR_USERCOORD_CALIBRATION",dataList)
              history.push('/setparameter/conveyorsign');
          }}>计算 </Button>
         
      </div>
    )
  }

  export default connect(mapStateToProps)(ConveyorsignFour)