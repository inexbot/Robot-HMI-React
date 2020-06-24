import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  notification,
  ConfigProvider,
  Select,
  Divider,
  Input,
  Modal
} from "antd";
import { connect } from "dva";
import { useHistory } from 'react-router-dom';
import "./IO_longPattern-module.less"
import { sendMSGtoController} from "service/network";

const mapStateToProps = (state) => {
  return{
    longStatus:state.index.IO_longPattern.longStatus
  }
};

function IO_longPattern(props){
  const [SeleValue, setSeleValue] = useState(1)
  
  const { Option } = Select;
  const handleSizeChange = e => {
    setSeleValue(e)
    let dataList = {
      robot:Number(SeleValue)
    }
    sendMSGtoController("RESERVE_EXE_STATE_INQUIRE",dataList)
  };

  const conveyorNumchildren = [];
  for (let i = 1; i <5; i++) {
    conveyorNumchildren.push(
      <Option key={i}>{ "机器人"+i}</Option>
    );
  } 

  console.log(props.longStatus)
  useEffect(()=>{
    sendMSGtoController("REMOTE_CONNECT_INQUIRE",'')
  },[])

  useEffect(()=>{
    
  },[SeleValue])

  const columns = [
    {title: "IO程序",dataIndex: "name",align:"center" ,},
    {title: "工位", dataIndex: "station",align:"center" },
    {title: "程序名", dataIndex: "programName",align:"center"},
    {title: "运行次数", dataIndex: "operationNum",align:"center"},
    {title: "运行总数", dataIndex: "operationNums",align:"center"},
    {title: "状态", dataIndex: "status",align:"center"},
  ];

  const data = [
    { key: "1", name:"当前运行",  station: '', programName: "无",operationNum:"",operationNums:"",status:"" },
    { key: "2", name:"队列1",  station: '', programName: "无",operationNum:"",operationNums:"",status:"" },
    { key: "3", name:"队列2",  station: '', programName: "无",operationNum:"",operationNums:"",status:"" },
    { key: "4", name:"队列3",  station: '', programName: "无",operationNum:"",operationNums:"",status:"" },
    { key: "5", name:"队列4",  station: '', programName: "无",operationNum:"",operationNums:"",status:"" },
    { key: "6", name:"队列5",  station: '', programName: "无",operationNum:"",operationNums:"",status:"" },
    { key: "7", name:"队列6",  station: '', programName: "无",operationNum:"",operationNums:"",status:"" },
    { key: "8", name:"队列7",  station: '', programName: "无",operationNum:"",operationNums:"",status:"" },
    { key: "9", name:"队列8",  station: '', programName: "无",operationNum:"",operationNums:"",status:"" },
    { key: "10", name:"队列9",  station: '', programName: "无",operationNum:"",operationNums:"",status:"" },
    { key: "11", name:"队列10",  station: '', programName: "无",operationNum:"",operationNums:"",status:"" },
  ];

  return(
    <div>
      <p className = "headertext">
        远程模式
      </p>
      <div className = "header-hint">
        <div>
            <Select defaultValue={"机器人"+SeleValue}
              onChange={(value)=>{handleSizeChange(value)}}
              style={{ width:"150px",marginTop:"24px",marginLeft:"20%" }} >
              {conveyorNumchildren}
            </Select>
        </div>
        <div className="header-hint-r">
          <p>Modbus:  <span style={{ marginLeft:"25px" }}>{props.longStatus.ModbusConnect==0?"未连接":"已连接"}</span> </p>
          <p>I/O模块: <span style={{ marginLeft:"30px" }}>{props.longStatus.ExternIOConnect==0?"未连接":"已连接"}</span> </p>
        </div>
      </div>
      <Table
      bordered={true}
      size = {"small"}
      pagination={false}
      columns={columns}
      
      dataSource={data }>

      </Table>
    </div>
  )
}

export default connect(mapStateToProps)(IO_longPattern)