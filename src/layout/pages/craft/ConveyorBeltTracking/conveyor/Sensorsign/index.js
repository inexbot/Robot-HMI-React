import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  notification,
  ConfigProvider,
  Select,
  Divider,
  Input,
  Modal,
} from "antd";
import { connect } from "dva";
import "./index.css";
import { sendMSGtoController } from "service/network";
import { useHistory } from 'react-router-dom';


const mapStateToProps = (state) => {
  return {
    currentRobot: state.index.robotStatus.currentRobot,
    dataSoures: state.index.conveyor.Basicdata,
    dataSoure: state.index.conveyor.Sensorsign
  };
};

function Sensorsign(props) {
  let history = useHistory();
  const [copycraftNum, setCopycraftNum] = useState(1)
  const [showSave, setShowSave] = useState(false);
  const [showemptyModal, setShowemptyModal] = useState(false);
  const [showcopyModal, setshowcopyModal] = useState(false);

  const { Option } = Select;
  const columns = [
    { title: "参数", dataIndex: "name" },
    { title: "值", dataIndex: "money" },
    { title: "单位", dataIndex: "address" },
  ];

  const conveyorNumchildren = [];
  for (let i = 1; i <10; i++) {
    conveyorNumchildren.push(
      <Option key={i}>{  i}</Option>
    );
  } 
  
  useEffect(()=>{
    let dataList = {
      robot:props.currentRobot,
      conveyorID:props.dataSoures.conveyorID
    }
    sendMSGtoController("TRACK_CONVEYOR_SENSORPOS_INQUIRE",dataList)
  },[props.dataSoures.conveyorID])

  const handleChange =(value) => {
    setCopycraftNum(Number(value))
  }

  const data = [
    { key: "1",   name: "传感器在传送带坐标系X轴的位置", money: <Input disabled value={props.dataSoure.sensorPos.X}  />, address: "mm", },
    { key: "2",   name: "传感器在传送带坐标系Y轴的位置", money: <Input disabled value={props.dataSoure.sensorPos.Y}  />, address: "mm", },
  ];
  return (
    <div
      className="backconnect"
      style={{ height: document.body.clientHeight * 0.674 }}
    >
      <div className="connect">
        <Table pagination={false} columns={columns} dataSource={data} />
      </div>
      <Modal
        title="提示"
        style={{ top: 100 }}
        visible={showemptyModal}
        onOk={() => { 
          setShowemptyModal(false)
          let dataList = {
            robot:props.currentRobot,
            conveyorID:props.dataSoures.conveyorID
          }
          sendMSGtoController("TRACK_CONVEYOR_PARAM_CLEAR",dataList)
        }}
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
        onOk={() => {setshowcopyModal(false) 
          let dataList = {
            robot:props.currentRobot,
            srcConveyorID:props.dataSoures.conveyorID,
            dstConveyorID:copycraftNum
          }
          sendMSGtoController("TRACK_CONVEYOR_PARAM_COPY",dataList)
        }}
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
      {showSave ? (
        <div style={{ display:"inline" }}>
          {" "}
          <Button style={{ width: "100px", height: "50px", marginLeft: "17%" }}>
            保存
          </Button>
          <Button
            style={{ width: "100px", height: "50px" }}
            onClick={() => {
              setShowSave(false);
            }}
          >
            取消
          </Button>
          <Button
            style={{ width: "100px", height: "50px" }}
            onClick={() => {

              history.push('/setparameter/sensorOne');
            }}
          >
            开始标定
          </Button>
        </div>
      ) : (
        <Button
          style={{ width: "100px", height: "50px", marginLeft: "17%" }}
          onClick={() => {
            setShowSave(true);
          }}
        >
          修改
        </Button>
      )}
      <Button
        type="primary"
        danger
        style={{ width: "100px", height: "50px", marginLeft: `${showSave?"23" :"34"}%` }}
        onClick={() => {
          setShowemptyModal(true);
        }}
      >
        清空参数
      </Button>
      <Button type="primary" style={{ width: "100px", height: "50px" }} onClick={() => {
        setshowcopyModal(true)
      }}>
        复制参数
      </Button>
    </div>
  );
}

export default connect(mapStateToProps)(Sensorsign);
