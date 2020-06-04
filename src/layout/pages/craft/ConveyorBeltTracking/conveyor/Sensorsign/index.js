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


const mapStateToProps = (state) => {
  return {
    dataSoure: state.index.conveyor.Basicdata,
  };
};

function Sensorsign(props) {
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
  

  const handleChange =(value) => {
    setCopycraftNum(Number(value))
  }

  const data = [
    {
      key: "1",
      name: "传感器在传送带坐标系X轴的位置",
      money: <Input />,
      address: "mm",
    },
    {
      key: "2",
      name: "传感器在传送带坐标系Y轴的位置",
      money: <Input />,
      address: "mm",
    },
  ];
  return (
    <div
      className="backconnect"
      style={{ height: document.body.clientHeight * 0.68 }}
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
            robot:1,
            conveyorID:props.dataSoure.conveyorID
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
            robot:1,
            srcConveyorID:props.dataSoure.conveyorID,
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
          <Button style={{ width: "100px", height: "50px", marginLeft: "25%" }}>
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
              window.location.href = "#/setparameter/sensorOne";
            }}
          >
            开始标定
          </Button>
        </div>
      ) : (
        <Button
          style={{ width: "100px", height: "50px", marginLeft: "25%" }}
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
