import React, { useState } from "react";
import {
  Table,
  Button,
  Select,
  Input,
  Modal,
} from "antd";
import { connect } from "dva";
import { sendMSGtoController } from "service/network";
import { useHistory } from "react-router-dom";
import "./index.css";

const mapStateToProps = (state) => {
  return {
    currentRobot: state.index.robotStatus.currentRobot,
    dataSoure: state.index.conveyor.Basicdata,
  };
};

function Conveyorsign(props) {
  const [copycraftNum, setCopycraftNum] = useState(1);
  const [showSave, setShowSave] = useState(false);
  const [showemptyModal, setShowemptyModal] = useState(false);
  const [showcopyModal, setshowcopyModal] = useState(false);

  const { Option } = Select;
  const conveyorNumchildren = [];
  for (let i = 1; i < 10; i++) {
    conveyorNumchildren.push(<Option key={i}>{i}</Option>);
  }
  let history = useHistory();
  const handleChange = (value) => {
    setCopycraftNum(Number(value));
  };

  const columns = [
    { title: "参数", dataIndex: "name" },
    { title: "值", dataIndex: "money" },
  ];
  const data = [
    { key: "1", name: "x", money: <Input disabled /> },
    { key: "2", name: "y", money: <Input disabled /> },
    { key: "3", name: "z", money: <Input disabled /> },
    { key: "4", name: "A", money: <Input disabled /> },
    { key: "5", name: "B", money: <Input disabled /> },
    { key: "6", name: "C", money: <Input disabled /> },
  ];

  return (
    <div
      className="backconnect"
      style={{ height: document.body.clientHeight * 0.674 }}
    >
      <div className="hoverButton1">
        {showSave ? (
          <span style={{ display: "inline" }}>
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
                // window.location.href = "#/setparameter/conveyorone"
                history.push("/setparameter/conveyorone");
              }}
            >
              {" "}
              开始标定{" "}
            </Button>
          </span>
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
      <div className="connect">
        <Table
          size={"middle"}
          pagination={false}
          columns={columns}
          dataSource={data}
          title={() => `传送带坐标系  用户坐标系4`}
        />
      </div>
      <Modal
        title="提示"
        style={{ top: 100 }}
        visible={showemptyModal}
        onOk={() => {
          setShowemptyModal(false);
          let dataList = {
            robot: props.currentRobot,
            conveyorID: props.dataSoure.conveyorID,
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
            srcConveyorID: props.dataSoure.conveyorID,
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
      <div style={{textAlign:"center"}}>
        <Button
          type="primary"
          danger
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
            margin:"10px 0 0 20px"
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

export default connect(mapStateToProps)(Conveyorsign);
