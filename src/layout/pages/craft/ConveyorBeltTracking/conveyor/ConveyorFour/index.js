import React, { useState, useEffect } from "react";
import { Table, Button, notification, ConfigProvider, Select, Divider, Input } from "antd";
import { connect } from "dva";


const mapStateToProps = (state) => {
    return {
    };
  };

  function ConveyorsignFour(props){

    return(
      <div className="backconnect" style = {{ height:document.body.clientHeight  * 0.68 }}>
        <div className="connect" >
        <p style={{ fontSize:"26px" }}>上抬机器人一段距离，点击计算按钮。</p>
        </div>
          <Button style = {{ width:"100px",height:"50px",marginLeft:"25%" }} onClick = {() =>{
              window.location.href = "#/setparameter/conveyorsign"
          }}>取消标定</Button>
          <Button style = {{ width:"100px",height:"50px",marginLeft:"34%" }} onClick = { ()=>{
              window.location.href = "#/setparameter/conveyorThree"
          }}>上一步 </Button>
          <Button style = {{ width:"100px",height:"50px" }} onClick = { ()=>{
              window.location.href = "#/setparameter/conveyorsign"
          }}>计算 </Button>
         
      </div>
    )
  }

  export default connect(mapStateToProps)(ConveyorsignFour)