import React, { useState, useEffect } from "react";
import { Table, Button, notification, ConfigProvider, Select, Divider,Input} from "antd";
import { connect } from "dva";


const mapStateToProps = (state) => {
    return {
    };
  };


  function Disern(props){
    const [showSave, setShowSave ] = useState(false)

    const columns = [
      {title: "参数",dataIndex: "name", },
      {title: "值", dataIndex: "money", },
      {title: "单位", dataIndex: "address",}
    ];
    const data = [
      { key: "1", name:"工件检测信号",  money: <Input  />, address: "视觉/IO/全局变量", },
      { key: "2", name: "信号源参数", money:<Input  />, address: "视觉工艺号/IO端口号/变量", },
      { key: "3", name: "工件识别方式", money: <Input  />, address: "视觉/传感器", },
      { key: "4", name: "视觉通讯方式", money: <Input  />, address: "以太网/Modbus", },
      { key: "5", name: "传感器触发方式", money: <Input  />, address: "", },
    ];
    return(
      <div className="backconnect" style = {{ height:document.body.clientHeight  * 0.68 }}>
        <div className="connect">
          <Table
            scroll={{
              y: window.screen.height * 0.9,
            }}
            pagination={false}
            size = {"small"}
            columns={columns}
            dataSource={data }
          />
        </div>
        {showSave ? <div> <Button style = {{ width:"100px",height:"50px",marginLeft:"25%" }} >保存</Button>
        <Button style = {{ width:"100px",height:"50px"}} onClick={()=>{
          setShowSave(false)
        }}>取消</Button></div> : <Button  style = {{ width:"100px",height:"50px",marginLeft:"25%" }} onClick = {()=>{
          setShowSave(true)
        }} >修改</Button> }
      </div>
    )
  }

  export default connect(mapStateToProps)(Disern)