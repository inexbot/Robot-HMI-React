import React, { useState, useEffect } from "react";
import { Table, Button, notification, ConfigProvider, Select, Divider, Input } from "antd";
import { connect } from "dva";
import "./index.css"

const mapStateToProps = (state) => {
    return {
    };
  };

  function SensorTwo(props){


    return(
      <div className="backconnect" style = {{ height:document.body.clientHeight  * 0.68 }}>
        
        <div className="connect" >
        <p style={{ fontSize:"26px",margin:"0" }}>请点击计算按钮，完成标定</p>
        </div>
          <Button style = {{ width:"100px",height:"50px",marginLeft:"25%" }} onClick = {() =>{
              window.location.href = "#/setparameter/sensorsign"
          }}>取消标定</Button>
          <Button style = {{ width:"100px",height:"50px",marginLeft:"16%" }} onClick = { ()=>{
              window.location.href = "#/setparameter/sensorTwo"
          }}>上一步 </Button>
          <Button style = {{ width:"100px",height:"50px" }} onClick = { ()=>{
              window.location.href = "#/setparameter/sensorsign"
          }}>计算 </Button>
         
      </div>
    )
  }

  export default connect(mapStateToProps)(SensorTwo)