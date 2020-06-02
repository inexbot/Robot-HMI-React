import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  notification,
  ConfigProvider,
  Select,
  Divider,
  Input,
} from "antd";
import { connect } from "dva";

const mapStateToProps = (state) => {
  return {};
};

function ConveyorsignThree(props) {
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
      <p style={{ fontSize:"26px" }}>移动工件使其相对上一点在传送带Y轴正方向有一定位移，并在机器人的运动范围内，移动机器人，使机器人末梢尖对准工件的尖端，点击标定按钮</p>
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
            window.location.href = "#/setparameter/conveyortwo"
        }}>上一步 </Button>
        <Button style = {{ width:"100px",height:"50px" }} onClick = { ()=>{
            window.location.href = "#/setparameter/conveyorfour"
        }}>下一步 </Button>
       
    </div>
  )
}

export default connect(mapStateToProps)(ConveyorsignThree);
