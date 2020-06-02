import React, { useState, useEffect } from "react";
import { Table, Button, notification, ConfigProvider, Select, Divider,Input, Modal} from "antd";
import { connect } from "dva";


const mapStateToProps = (state) => {
    return {
      dataSoure: state.index.conveyor.data,
      conveyorNum: state.index.conveyor.conveyorNum
    };
  };


  function Disern(props){
    const [showSave, setShowSave ] = useState(false)
    const [showemptyModal, setShowemptyModal] = useState(false);
    const [showcopyModal, setshowcopyModal] = useState(false);
  
    const { Option } = Select;
    const conveyorNumchildren = [];
    for (let i = 1; i <10; i++) {
      conveyorNumchildren.push(
        <Option key={i}>{  i}</Option>
      );
    } 
    
    console.log(props.conveyorNum)
    const handleChange =(value) => {
      console.log(`Selected: ${value}`);
    }
  
    const columns = [
      {title: "参数",dataIndex: "name", },
      {title: "值", dataIndex: "money", },
      {title: "单位", dataIndex: "address",}
    ];
    const data = [
      { key: "1", name:"工件检测信号",  money: <Select  ></Select>, address: "视觉/IO/全局变量", },
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
            columns={columns}
            dataSource={data }
          />
        </div>
        <Modal
        title="提示"
        style={{ top: 100 }}
        visible={showemptyModal}
        onOk={() => setShowemptyModal(false)}
        onCancel={() => setShowemptyModal(false)}
      >
        <p style={{ fontSize: "30px" }}>确定要清空 工艺号1的参数吗？</p>
        <p style={{ color: "red", fontSize: "30px" }}>
          谨慎操作，一旦清空，无法恢复!
        </p>
      </Modal>
      <Modal
        title="提示"
        style={{ top: 100 }}
        visible={showcopyModal}
        onOk={() => setshowcopyModal(false)}
        onCancel={() => setshowcopyModal(false)}
      >
        <p style={{ fontSize: "30px" }}>确定要将当前工艺参数复制到</p>
        <p style={{ fontSize: "30px" }}>
          {" "}
          <div>
            工艺号:
            <Select
              defaultValue="1"
              onChange={handleChange}
              style={{ width: 200 }}
            >
              {conveyorNumchildren}
            </Select>
          </div>
        </p>
      </Modal>
        {showSave ? <div  style={{ display:"inline" }}> <Button style = {{ width:"100px",height:"50px",marginLeft:"25%" }} >保存</Button>
        <Button style = {{ width:"100px",height:"50px"}} onClick={()=>{
          setShowSave(false)
        }}>取消</Button></div> : <Button  style = {{ width:"100px",height:"50px",marginLeft:"25%" }} onClick = {()=>{
          setShowSave(true)
        }} >修改</Button> }
        <Button
        style={{ width: "100px", height: "50px", marginLeft: `${showSave?"28" :"34"}%` }}
        onClick={() => {
          setShowemptyModal(true);
        }}
        >
          清空参数
        </Button>
        <Button style={{ width: "100px", height: "50px" }} onClick={() => {
          setshowcopyModal(true)
        }}>
          复制参数
        </Button>
  
        </div>
    )
  }

  export default connect(mapStateToProps)(Disern)