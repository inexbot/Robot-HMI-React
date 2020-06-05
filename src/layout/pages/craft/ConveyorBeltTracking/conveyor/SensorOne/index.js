import React, { useState, useEffect } from "react";
import { Table, Button, notification, ConfigProvider, Select, Divider, Input } from "antd";
import { connect } from "dva";
import "./index.css"
import { sendMSGtoController } from "service/network";
import { useHistory } from 'react-router-dom';

const mapStateToProps = (state) => {
    return {
      dataSoures: state.index.conveyor.Basicdata,
      dataSoure: state.index.conveyor.SensorOne,
      List: state.index.conveyor.SensorTwo,
    };
  };

  function SensorOne(props){
    let history = useHistory();
    console.log(props)
    useEffect(()=>{
      let dataList = {
        robot:1,
        conveyorID:props.dataSoures.conveyorID
      }
      sendMSGtoController("TRACK_CONVEYOR_SENSORPOS_CALIBRATION_INQUIRE",dataList)
    },[props.dataSoures.conveyorID])

    const columns = [
      {title: "参数",dataIndex: "name", },
      {title: "值", dataIndex: "money", },
      {title: "单位", dataIndex: "address", },
    ];
    console.log("12",props.dataSoure.sensorCalibration)
    const data = [
      { key: "1", name:"传感器编码器数值",  money: <Input disabled value={props.dataSoure.sensorCalibration.IO_encodorValue} />, address:"线"},
      { key: "2", name: "标定点编码器数值", money:<Input disabled value={props.dataSoure.sensorCalibration.calib_encodorValue} />, address:"线"},
      { key: "3", name: "标定点X", money: <Input disabled value={props.dataSoure.sensorCalibration.calib_X} />, address:"mm"},
      { key: "3", name: "标定点Y", money: <Input disabled value={props.dataSoure.sensorCalibration.calib_Y} />, address:"mm"}
    ];

    return(
      <div className="backconnect" style = {{ height:document.body.clientHeight  * 0.68 }}>
        
        <div className="connect" style={{ marginLeft:"0" }}>
        <p style={{ fontSize:"18px",margin:"0" }}>1.准备一个带有尖端的工件，放置在传送带工作时的宽度处，并在机器人法兰上安装一个尖锥;</p>
        <p style={{ fontSize:"18px",margin:"0"  }}>2.移动传送带，使工件移动经过传感器位置，触发IO，然后继续移动传送带，将工件移动到机器人的运动范围内的标定点，将机器人移动到工件处，使尖对准尖;</p>
        <p style={{ fontSize:"18px",margin:"0"  }}>3.点击标定按钮;</p>
          <Table
            pagination={false}
            columns={columns}
            dataSource={data }
          />
        </div>
        <div style={{ position:"absolute",left:"50%",top:"23%" }}>
          <img src="../images/sensorsign.png" style={{ width:"400px" }} />
        </div>
          <Button  style = {{ width:"100px",height:"50px", }} onClick = {() =>{
              let dataList = {
                robot:1,
                conveyorID:props.dataSoures.conveyorID
              }
              sendMSGtoController("TRACK_CONVEYOR_SENSORPOS_CALIBRATION_CANCEL",dataList)
              history.push('/setparameter/sensorsign');
          }}>取消标定</Button>
          <Button type="primary" shape="round"  style = {{ width:"100px",height:"50px",marginLeft:"12%" }} onClick = {() =>{
              let dataList = {
                robot:1,
                conveyorID:props.dataSoures.conveyorID
              }
              sendMSGtoController("TRACK_CONVEYOR_SENSORPOS_CALIBRATE",dataList)
          }}>标定</Button>
          <Button danger type="primary" shape="round" style = {{ width:"100px",height:"50px", }} onClick = {() =>{
              let dataList = {
                robot:1,
                conveyorID:props.dataSoures.conveyorID,
                type:0
              }
              sendMSGtoController("TRACK_CONVEYOR_SENSORPOS_CALIBRATION_CLEAR",dataList)
          }}>清除标定线</Button>
          <Button style = {{ width:"100px",height:"50px",marginLeft:"16%" }} onClick = { ()=>{
              history.push('/setparameter/sensortwo');
          }}>下一步 </Button>
         
      </div>
    )
  }

  export default connect(mapStateToProps)(SensorOne)