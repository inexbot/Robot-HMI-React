import React, { useState, useEffect } from "react";
import { Table, Button, notification, ConfigProvider, Select, Divider, Input } from "antd";
import { connect } from "dva";
import "./index.css"

const mapStateToProps = (state) => {
    return {
    };
  };

  function SensorTwo(props){

    const columns = [
      {title: "参数",dataIndex: "name", },
      {title: "值", dataIndex: "money", },
      {title: "单位", dataIndex: "address", },
    ];
    const data = [
      { key: "1", name:"Z",  money: <Input  />, address:"mm"},
      { key: "2", name: "A", money:<Input  />, address:"rad"},
      { key: "3", name: "B", money: <Input  />, address:"rad"},
      { key: "3", name: "C", money: <Input  />, address:"rad"}
    ];

    return(
      <div className="backconnect" style = {{ height:document.body.clientHeight  * 0.68 }}>
        
        <div className="connect" style={{ marginLeft:"0" }}>
        <p style={{ fontSize:"18px",margin:"0" }}>1.将标定锥与机器人尖型工具手拆下，换成实际工作的工件与夹爪;</p>
        <p style={{ fontSize:"18px",margin:"0"  }}>2.将机器人运动到实际抓取的高度与姿态，点击标定按钮;</p>
          <Table
            pagination={false}
            columns={columns}
            dataSource={data }
          />
        </div>
          <Button style = {{ width:"100px",height:"50px", }} onClick = {() =>{
              window.location.href = "#/setparameter/sensorsign"
          }}>取消标定</Button>
          <Button type="primary" shape="round"  style = {{ width:"100px",height:"50px",marginLeft:"12%" }} onClick = {() =>{
              
          }}>标定</Button>
          <Button danger type="primary" shape="round" style = {{ width:"100px",height:"50px", }} onClick = {() =>{
             
          }}>清除标定线</Button>
          <Button style = {{ width:"100px",height:"50px",marginLeft:"11%" }} onClick = { ()=>{
              window.location.href = "#/setparameter/sensorone"
          }}>上一步 </Button>
          <Button style = {{ width:"100px",height:"50px" }} onClick = { ()=>{
              window.location.href = "#/setparameter/sensorthree"
          }}>下一步 </Button>
         
      </div>
    )
  }

  export default connect(mapStateToProps)(SensorTwo)