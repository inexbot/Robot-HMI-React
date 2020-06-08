import React, { useState, useEffect } from "react";
import { Table, Button, notification, ConfigProvider, Select, Divider, Input } from "antd";
import { connect } from "dva";
import "./index.css"
import { sendMSGtoController } from "service/network";
import { useHistory } from 'react-router-dom';

const mapStateToProps = (state) => {
    return {
      dataSoures: state.index.conveyor.Basicdata
    };
  };

  function SensorTwo(props){
    let history = useHistory();

    return(
      <div className="backconnect" style = {{ height:document.body.clientHeight  * 0.68 }}>
        
        <div className="connect" style={{  width:"50%", marginLeft:"25%"  }}>
        <p style={{ fontSize:"26px",margin:"0" }}>请点击计算按钮，完成标定</p>
        </div>
          <Button style = {{ width:"100px",height:"50px",marginLeft:"25%" }} onClick = {() =>{
              let dataList = {
                robot:1,
                conveyorID:props.dataSoures.conveyorID
              }
              sendMSGtoController("TRACK_CONVEYOR_SENSORPOS_CALIBRATION_CANCEL",dataList)
              history.push('/setparameter/sensorsign');
          }}>取消标定</Button>
          <Button style = {{ width:"100px",height:"50px",marginLeft:"16%" }} onClick = { ()=>{
              history.push('/setparameter/sensortwo');
          }}>上一步 </Button>
          <Button style = {{ width:"100px",height:"50px" }} onClick = { ()=>{
              let dataList = {
                robot:1,
                conveyorID:props.dataSoures.conveyorID
              }
              sendMSGtoController("TRACK_CONVEYOR_SENSORPOS_CALCULATE",dataList)

              history.push('/setparameter/sensorsign');
          }}>计算 </Button>
         
      </div>
    )
  }

  export default connect(mapStateToProps)(SensorTwo)