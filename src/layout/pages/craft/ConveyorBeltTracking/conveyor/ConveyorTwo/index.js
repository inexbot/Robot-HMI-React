import React, { useState, useEffect } from "react";
import { Table, Button, notification, ConfigProvider, Select, Divider, Input } from "antd";
import { connect } from "dva";
import "./index.css"

  const mapStateToProps = (state) => {
    return {
    };
  };
  
  function ConveyorsignTwo(props){
  const columns = [
    {title: "参数",dataIndex: "name", },
    {title: "值", dataIndex: "money", },
    {title: "单位", dataIndex: "address", },
  ];
  const data = [
    { key: "1", name:"x",  money: <Input  />, address:"mm"},
    { key: "2", name: "y", money:<Input  />, address:"mm"},
    { key: "3", name: "z", money: <Input  />, address:"mm"}
  ];

  return(
    <div className="backconnect" style = {{ height:document.body.clientHeight  * 0.68 }}>
      
      <div className="connect" style={{ marginLeft:"0" }}>
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
            window.location.href = "#/setparameter/conveyorsign"
        }}>取消标定</Button>
        <Button type="primary" shape="round"  style = {{ width:"100px",height:"50px",marginLeft:"12%" }} onClick = {() =>{
            
        }}>标定</Button>
        <Button type="primary" shape="round" style = {{ width:"100px",height:"50px", }} onClick = {() =>{
           
        }}>清除标定线</Button>
        <Button style = {{ width:"100px",height:"50px",marginLeft:"11%" }} onClick = { ()=>{
            window.location.href = "#/setparameter/conveyorOne"
        }}>上一步 </Button>
        <Button style = {{ width:"100px",height:"50px" }} onClick = { ()=>{
            window.location.href = "#/setparameter/conveyorThree"
        }}>下一步 </Button>
       
    </div>
  )
  }

  export default connect(mapStateToProps)(ConveyorsignTwo)