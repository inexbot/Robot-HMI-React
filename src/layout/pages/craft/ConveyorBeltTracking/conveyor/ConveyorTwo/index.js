import React, { useState, useEffect } from "react";
import { Table, Button, notification, ConfigProvider, Select, Divider, Input } from "antd";
import { connect } from "dva";
import "./index.css"
import { sendMSGtoController } from "service/network";
import { useHistory } from 'react-router-dom';

  const mapStateToProps = (state) => {
    return {
      currentRobot: state.index.robotStatus.currentRobot,
      dataSoures:state.index.conveyor.Basicdata,
      dataSoure:state.index.conveyor.Conveyorsign.ConveyorTwo
    };
  };
  
  function ConveyorsignTwo(props){
  let history = useHistory();
  const columns = [
    {title: "参数",dataIndex: "name", },
    {title: "值", dataIndex: "money", },
    {title: "单位", dataIndex: "address", },
  ];
  const data = [
    { key: "1", name:"x",  money: <Input disabled  value={props.dataSoure.posX} />, address:"mm"},
    { key: "2", name: "y", money:<Input disabled  value={props.dataSoure.posY} />, address:"mm"},
    { key: "3", name: "编码器数值", money: <Input disabled  value={props.dataSoure.encodorValue} />, address:"线"}
  ];
  return(
    <div className="backconnect" style = {{ height:document.body.clientHeight  * 0.68 }}>
      
      <div className="connect" style={{ marginLeft:"0", width:"50%",  }}>
      <p style={{ fontSize:"26px" }}>继续移动传送带，尽量远离上一点并在机器人的运动范围内,移动机器人到工件处，令机器人末梢尖端对准工件尖端，点击标定按钮</p>
        <Table
          pagination={false}
          size = {"small"}
          columns={columns}
          dataSource={data }
        />
      </div>
      <div style={{ position:"absolute",left:"50%",top:"23%" }}>
          <img src="../images/conveyorsign.png" style={{ width:"400px" }} />
        </div>
        <Button style = {{ width:"100px",height:"50px", }} onClick = {() =>{
          let dataList = {
            robot:props.currentRobot,
            conveyorID:props.dataSoures.conveyorID,
          }
          sendMSGtoController("TRACK_CONVEYOR_CALIBRATION_CANCEL",dataList)
          history.push('/setparameter/conveyorsign');
        }}>取消标定</Button>
        <Button type="primary" shape="round"  style = {{ width:"100px",height:"50px",marginLeft:"12%" }} onClick = {() =>{
          let dataList = {
            robot:props.currentRobot,
            conveyorID:props.dataSoures.conveyorID,
            posNum:2,
          }
          sendMSGtoController("TRACK_CONVEYOR_USERCOORD_CALIBRATION",dataList)
          sendMSGtoController("RACK_CONVEYOR_CALIBRATION_INQUIRE",dataList)
        }}>标定</Button>
        <Button type="primary" danger shape="round" style = {{ width:"100px",height:"50px", }} onClick = {() =>{
          let dataList = {
            robot:props.currentRobot,
            conveyorID:props.dataSoures.conveyorID,
            posNum:3,
          }
          sendMSGtoController("TRACK_CONVEYOR_CALIBRATION_CLEAR",dataList)
        }}>清除标定线</Button>
        <Button style = {{ width:"100px",height:"50px",marginLeft:"11%" }} onClick = { ()=>{
            history.push('/setparameter/conveyorone');
        }}>上一步 </Button>
        <Button style = {{ width:"100px",height:"50px" }} onClick = { ()=>{
            history.push('/setparameter/conveyorthree');
        }}>下一步 </Button>
       
    </div>
  )
  }

  export default connect(mapStateToProps)(ConveyorsignTwo)