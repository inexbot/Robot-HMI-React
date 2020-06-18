import React, { useState, useEffect } from "react";
import { Table, Button, notification, ConfigProvider, Select, Divider, Input } from "antd";
import { connect } from "dva";
import "./index.css"
import { sendMSGtoController } from "service/network";
import { useHistory } from 'react-router-dom';

const mapStateToProps = (state) => {
    return {
      currentRobot: state.index.robotStatus.currentRobot,
      dataSoures: state.index.conveyor.Basicdata,
      dataSoure: state.index.conveyor.SensorTwo
    };
  };

  function SensorTwo(props){
    let history = useHistory();

    useEffect(()=>{
      let dataList = {
        robot:props.currentRobot,
        conveyorID:props.dataSoures.conveyorID
      }
      sendMSGtoController("TRACK_CONVEYOR_SENSOR_GRABGESTURE_INQUIRE",dataList)
    },[props.dataSoures.conveyorID])
  
    const columns = [ 
      {title: "参数",dataIndex: "name", },
      {title: "值", dataIndex: "money", },
      {title: "单位", dataIndex: "address", },
    ];
    const data = [
      { key: "1", name:"Z",  money: <Input disabled value={props.dataSoure.grabGesture.Z} />, address:"mm"},
      { key: "2", name: "A", money:<Input disabled value={props.dataSoure.grabGesture.A} />, address:"rad"},
      { key: "3", name: "B", money: <Input disabled value={props.dataSoure.grabGesture.B} />, address:"rad"},
      { key: "3", name: "C", money: <Input disabled value={props.dataSoure.grabGesture.C} />, address:"rad"}
    ];

    return(
      <div className="backconnect" style = {{ height:document.body.clientHeight  * 0.68 }}>
        
        <div className="connect" style={{ marginLeft:"0",  }} >
        <p style={{ fontSize:"18px",margin:"0" }}>1.将标定锥与机器人尖型工具手拆下，换成实际工作的工件与夹爪;</p>
        <p style={{ fontSize:"18px",margin:"0"  }}>2.将机器人运动到实际抓取的高度与姿态，点击标定按钮;</p>
          <Table
            pagination={false}
            columns={columns}
            dataSource={data }
          />
        </div>
          <Button style = {{ width:"100px",height:"50px", }} onClick = {() =>{
              history.push('/setparameter/sensorsign');
          }}>取消标定</Button>
          <Button type="primary" shape="round"  style = {{ width:"100px",height:"50px",marginLeft:"12%" }} onClick = {() =>{
              let dataList = {
                robot:props.currentRobot,
                conveyorID:props.dataSoures.conveyorID
              }
              sendMSGtoController("TRACK_CONVEYOR_SENSOR_GRABGESTURE_CALIBRATE",dataList)
          }}>标定</Button>
          <Button danger type="primary" shape="round" style = {{ width:"100px",height:"50px", }} onClick = {() =>{
             let dataList = {
              robot:props.currentRobot,
              conveyorID:props.dataSoures.conveyorID,
              type:1
            }
            sendMSGtoController("TRACK_CONVEYOR_SENSORPOS_CALIBRATION_CLEAR",dataList)
          }}>清除标定线</Button>
          <Button style = {{ width:"100px",height:"50px",marginLeft:"11%" }} onClick = { ()=>{
              history.push('/setparameter/sensorone');
          }}>上一步 </Button>
          <Button style = {{ width:"100px",height:"50px" }} onClick = { ()=>{
              history.push('/setparameter/sensorthree');
          }}>下一步 </Button>
         
      </div>
    )
  }

  export default connect(mapStateToProps)(SensorTwo)