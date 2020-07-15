import React from "react";
import {
  Table,
  Button,
  Input,
} from "antd";
import { connect } from "dva";
import "./index.css";
import { sendMSGtoController } from "service/network";
import { useHistory } from "react-router-dom";

const mapStateToProps = (state) => {
  return {
    currentRobot: state.index.robotStatus.currentRobot,
    dataSoures: state.index.conveyor.Basicdata,
    dataSoure: state.index.conveyor.Conveyorsign.ConveyorOne,
  };
};

function ConveyorsignOne(props) {
  const columns = [
    { title: "参数", dataIndex: "name" },
    { title: "值", dataIndex: "money" },
    { title: "单位", dataIndex: "address" },
  ];
  const data = [
    {
      key: "1",
      name: "x",
      money: <Input disabled value={props.dataSoure.posX} />,
      address: "mm",
    },
    {
      key: "2",
      name: "y",
      money: <Input disabled value={props.dataSoure.posY} />,
      address: "mm",
    },
    {
      key: "3",
      name: "编码器数值",
      money: <Input disabled value={props.dataSoure.encodorValue} />,
      address: "线",
    },
  ];
  let history = useHistory();
  return (
    <div className="backconnect">
      <div style={{ display: "flex" }}>
        <div className="connect" style={{ marginLeft: "0", width: "50%" }}>
          <p
            style={{
              fontSize: "14px",
              backgroundColor: "#fffbe6",
              border: "1px solid #ffe58f",
              padding: "15px 10px",
              borderRadius: "5px",
              marginTop: 10,
            }}
          >
            <strong style={{fontSize: "18px"}}>步骤一</strong><br />
            移动传送带，使工件移动到机器人的运动范围内，移动机器人到工件处，使机器人末梢的尖端对准工件的尖端，点击标定。
          </p>
          <Table
            pagination={false}
            size={"small"}
            columns={columns}
            dataSource={data}
          />
        </div>
        <div>
          <img
            src="../images/conveyorsign.png"
            style={{ width: "400px", margin: "10px 0 0 20px " }}
            alt="图片"
          />
        </div>
      </div>
      <div style={{paddingTop:20,textAlign:"center"}}>
        <Button
          style={{ width: "100px", height: "40px" }}
          onClick={() => {
            let dataList = {
              robot: props.currentRobot,
              conveyorID: props.dataSoures.conveyorID,
            };
            sendMSGtoController("TRACK_CONVEYOR_CALIBRATION_CANCEL", dataList);
            history.push("/setparameter/conveyorsign");
          }}
        >
          取消标定
        </Button>
        <Button
          type="primary"
          shape="round"
          style={{ width: "100px", height: "40px", marginLeft: "12%" }}
          onClick={() => {
            let dataList = {
              robot: props.currentRobot,
              conveyorID: props.dataSoures.conveyorID,
              posNum: 1,
            };
            sendMSGtoController(
              "TRACK_CONVEYOR_USERCOORD_CALIBRATION",
              dataList
            );
            sendMSGtoController("RACK_CONVEYOR_CALIBRATION_INQUIRE", dataList);
          }}
        >
          标定
        </Button>
        <Button
          type="primary"
          danger
          shape="round"
          style={{ width: "100px", height: "40px", marginLeft: "2%" }}
          onClick={() => {
            let dataList = {
              robot: props.currentRobot,
              conveyorID: props.dataSoures.conveyorID,
              posNum: 3,
            };
            sendMSGtoController("TRACK_CONVEYOR_CALIBRATION_CLEAR", dataList);
          }}
        >
          清除标定线
        </Button>
        <Button
          style={{ width: "100px", height: "40px", marginLeft: "16%" }}
          onClick={() => {
            history.push("/setparameter/conveyortwo");
          }}
        >
          下一步{" "}
        </Button>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(ConveyorsignOne);
