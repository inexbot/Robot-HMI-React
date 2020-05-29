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
import "./index.css";

const mapStateToProps = (state) => {
  return{
    dataSoure: state.index.conveyor.data
  }
};

function Basic(props) {
  const [showSave, setShowSave ] = useState(false)
  const columns = [
    {title: "参数",dataIndex: "name", },
    {title: "值", dataIndex: "money", },
    {title: "单位", dataIndex: "address",}
  ];
  const data = [
    { key: "1", name:"编码器值",  money: <Input  />, address: "线", },
    { key: "2", name: "编码器计数最小值", money:<Input  />, address: "线", },
    { key: "3", name: "编码器计数最大值", money: <Input  />, address: "线", },
    { key: "4", name: "编码器分辨率", money: <Input  />, address: "线/毫米", },
    { key: "5", name: "编码器方向", money: <Input  />, address: "", },
    { key: "6", name: "当前传送带速度", money: <Input  />, address: "毫米/秒",},
    { key: "7", name: "用户坐标系", money: <Input  />, address: "用户坐标编号", },
    { key: "8", name: "传送带停止处理",  money: <Input  />, address: "", },
  ];
  const twoColumns = [
    {title: "参数",dataIndex: "name", },
    {title: "值", dataIndex: "money", },
    {title: "单位", dataIndex: "address",}
  ];
  const twoData = [
    { key: "1", name:"时间",  money: <Input  />, address: "ms", },
    { key: "2", name: "编码器值", money:<Input  />, address: "线", },
  ]
  return (
    <div className = "backconnect" style={{ height:document.body.clientHeight  * 0.68  }} >
      <div className="connect" >
        <Table
          scroll={{
            y: window.screen.height * 0.3,
          }}
          pagination={false}
          size = {"small"}
          columns={columns}
          dataSource={data }
          title={() => "传送带参数："}
        />
      </div>
      <div className="connect">
        <Table
            pagination={false}
            size = {"small"}
            columns={twoColumns}
            dataSource={twoData }
            title={() => "补偿参数："}
          />
      </div>
      {showSave ? <div> <Button style = {{ width:"100px",height:"50px",marginLeft:"25%" }} >保存</Button>
      <Button style = {{ width:"100px",height:"50px"}} onClick={()=>{
        setShowSave(false)
      }}>取消</Button></div> : <Button  style = {{ width:"100px",height:"50px",marginLeft:"25%" }} onClick = {()=>{
        setShowSave(true)
      }} >修改</Button> }


    </div >
  );
}

export default connect(mapStateToProps)(Basic);