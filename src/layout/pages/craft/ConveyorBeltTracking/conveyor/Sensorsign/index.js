import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Select,
  Input,
  Modal,
} from "antd";
import { connect } from "dva";
import "./index.css";
import { sendMSGtoController } from "service/network";
import { useHistory } from "react-router-dom";

const mapStateToProps = (state) => {
  return {
    currentRobot: state.index.robotStatus.currentRobot,
    dataSoures: state.index.conveyor.Basicdata,
    dataSoure: state.index.conveyor.Sensorsign,
  };
};

function Sensorsign(props) {
  let history = useHistory();
  const [copycraftNum, setCopycraftNum] = useState(1);
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
  for (let i = 1; i < 10; i++) {
    conveyorNumchildren.push(<Option key={i}>{i}</Option>);
  }

  useEffect(() => {
    let dataList = {
      robot: props.currentRobot,
      conveyorID: props.dataSoures.conveyorID,
    };
    sendMSGtoController("TRACK_CONVEYOR_SENSORPOS_INQUIRE", dataList);
  }, [props.dataSoures.conveyorID,props.currentRobot,]);

  const handleChange = (value) => {
    setCopycraftNum(Number(value));
  };

  const data = [
    {
      key: "1",
      name: "传感器在传送带坐标系X轴的位置",
      money: <Input disabled value={props.dataSoure.sensorPos.X} />,
      address: "mm",
    },
    {
      key: "2",
      name: "传感器在传送带坐标系Y轴的位置",
      money: <Input disabled value={props.dataSoure.sensorPos.Y} />,
      address: "mm",
    },
  ];
  return (
    <div
      className="backconnect"
      style={{ height: document.body.clientHeight * 0.674 }}
    >
      {/* 悬浮按钮 */}
      <div className="hoverButton1">
        {showSave ? (
          <div style={{ display: "inline" }}>
            {" "}
            <Button
              style={{ right: "-120px" }}
              shape="circle"
              size="large"
              type="primary"
            >
              保存
            </Button>
            <Button
              style={{
                top: "-80px",
                right: "-60px",
                border: "1px dashed rgb(10, 168, 235)",
                background: "rgb(255, 255, 255)",
                color: "rgb(10, 168, 235)",
                boxShadow: "rgba(10, 168, 235, 0.6) 0px 1px 8px",
              }}
              shape="circle"
              size="large"
              onClick={() => {
                setShowSave(false);
              }}
            >
              取消
            </Button>
            <Button
              style={{
                top: "-160px",
                border: "1px dashed rgb(10, 168, 235)",
                background: "rgb(255, 255, 255)",
                color: "rgb(10, 168, 235)",
                boxShadow: "rgba(10, 168, 235, 0.6) 0px 1px 8px",
              }}
              shape="circle"
              size="large"
              onClick={() => {
                history.push("/setparameter/sensorOne");
              }}
            >
              开始标定
            </Button>
          </div>
        ) : (
          <Button
            shape="circle"
            size="large"
            type="primary"
            onClick={() => {
              setShowSave(true);
            }}
          >
            修改
          </Button>
        )}
      </div>
      <div className="connect" style={{marginTop:10}}>
        <Table pagination={false} columns={columns} dataSource={data} />
      </div>
      <Modal
        title="提示"
        style={{ top: 100 }}
        visible={showemptyModal}
        onOk={() => {
          setShowemptyModal(false);
          let dataList = {
            robot: props.currentRobot,
            conveyorID: props.dataSoures.conveyorID,
          };
          sendMSGtoController("TRACK_CONVEYOR_PARAM_CLEAR", dataList);
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
        onOk={() => {
          setshowcopyModal(false);
          let dataList = {
            robot: props.currentRobot,
            srcConveyorID: props.dataSoures.conveyorID,
            dstConveyorID: copycraftNum,
          };
          sendMSGtoController("TRACK_CONVEYOR_PARAM_COPY", dataList);
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
      <div style={{ textAlign: "center" }}>
        <Button
          type="danger"
          style={{
            width: "100px",
            height: "40px",
          }}
          onClick={() => {
            setShowemptyModal(true);
          }}
        >
          清空参数
        </Button>
        <Button
          type="primary"
          style={{
            width: "100px",
            height: "40px",
            margin: "10px 0 0 20px",
          }}
          onClick={() => {
            setshowcopyModal(true);
          }}
        >
          复制参数
        </Button>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(Sensorsign);
