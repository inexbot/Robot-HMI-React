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
import intl from "react-intl-universal";
import ConTitle from "components/title";
import "./IO_longPattern-module.less"
import { sendMSGtoController} from "service/network";

const mapStateToProps = (state) => {
  return{
    longStatus:state.index.IO_longPattern.longStatus,
    longPattern:state.index.IO_longPattern.longPattern
  }
};

function IO_longPattern(props){
  // 定义变量代表机器人
  const [SeleValue, setSeleValue] = useState(1)
  const { Option } = Select;

  // 切换机器人查询预约执行状态
  const handleSizeChange = e => {
    setSeleValue(e)
    let dataList = {
      robot:Number(e)
    }
    sendMSGtoController("RESERVE_EXE_STATE_INQUIRE",dataList)
  };

  // 选择机器人的子元素
  const conveyorNumchildren = [];
  for (let i = 1; i <5; i++) {
    conveyorNumchildren.push(
      <Option key={i}>{ "机器人"+i}</Option>
    );
  } 
  console.log(props.longPattern.current.station)
  // 跳转到当前页面获取数据
  useEffect(()=>{
    // 使用定时器一秒获取一次
    let inquireConnect = setInterval(()=>{
      sendMSGtoController("REMOTE_CONNECT_INQUIRE",'')
      sendMSGtoController("RESERVE_EXE_STATE_INQUIRE",{robot:Number(SeleValue)})
    },1000)
    return () =>{
      clearInterval(inquireConnect)
    }
  },[SeleValue])
  // 定义columns
  const columns = [
    {title: "IO程序",dataIndex: "name",align:"center" ,},
    {title: "工位", dataIndex: "station",align:"center" },
    {title: "程序名", dataIndex: "programName",align:"center"},
    {title: "运行次数", dataIndex: "operationNum",align:"center"},
    {title: "运行总数", dataIndex: "operationNums",align:"center"},
    {title: "状态", dataIndex: "status",align:"center"},
  ];
  // 定义data
  const data = []
  if( props.longPattern.current == undefined ){
    data.push(
      {station:'',name:"无",times:'',count:'',status:5}
    )
  }else{
    data.push(
      { key: "1", name:"当前运行",  station: props.longPattern.current.station, programName: props.longPattern.current.name,operationNum:props.longPattern.current.times,operationNums:props.longPattern.current.count,
      status:props.longPattern.current.status ==0?"无预约": props.longPattern.current.status ==1?"预约中":props.longPattern.current.status ==2?"运行中":props.longPattern.current.status ==3?"已预约":props.longPattern.current.status==4?"程序暂停":''  },
    )
  }

  // 使用循环把数据放到data里
  for(let i = 0; i<10; i++){
    data.push(
      { key: `${i+2}`, name:`队列${i+1}`,  station:props.longPattern.queue[i].station, programName: props.longPattern.queue[i].name,operationNum:props.longPattern.queue[i].times,operationNums:props.longPattern.queue[i].count,
      status:props.longPattern.queue[i].status ==0?"无预约": props.longPattern.queue[i].status ==1?"预约中":props.longPattern.queue[i].status ==2?"运行中":props.longPattern.queue[i].status ==3?"已预约":props.longPattern.queue[i].status==4?"程序暂停":''  },
    )
  }

  return(
    <div className="IO_long">

      {/* 头部 */}
      <ConTitle title={intl.get("远程模式")}/>
      <div className = "header-hint">
        <div>
          {/* 机器人选择器 */}
          <Select defaultValue={"机器人"+SeleValue}
            onChange={(value)=>{handleSizeChange(value)}}
            style={{ width:"150px",marginTop:"24px",marginLeft:"20%" }} >
            {conveyorNumchildren}
          </Select>
        </div>
        <div className="header-hint-r">
          {/* 使用三元运算符来判断获Modbus和IO模块的连接状态 */}
          <p>Modbus:  <span style={{ marginLeft:"25px" }}>{props.longStatus.ModbusConnect==0?"未连接":"已连接"}</span> </p>
          <p>I/O模块: <span style={{ marginLeft:"30px" }}>{props.longStatus.ExternIOConnect==0?"未连接":"已连接"}</span> </p>
        </div>
      </div>
      {/* 表格 */}
      <Table
      style={{ width:"90%",marginLeft:"3%" }}
      bordered={true}
      size = {"small"}
      pagination={false}
      columns={columns}
      dataSource={data }>
      </Table>
        {/* 悬浮按钮 */}
        <div className="hoverButton1">
          <Button
           size="large"
           type="primary"
           shape="circle"
           style={{
             border: "none",
             fontSize:"14px"
           }}
          >
            查看程序
          </Button>
        </div>
    </div>
  )
}

export default connect(mapStateToProps)(IO_longPattern)