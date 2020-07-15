import React from "react";
import {
  Button,
} from "antd";
import { connect } from "dva";
import "./index.css";
import { sendMSGtoController } from "service/network";
import { useHistory } from "react-router-dom";

const mapStateToProps = (state) => {
  return {
    currentRobot: state.index.robotStatus.currentRobot,
    dataSoures: state.index.conveyor.Basicdata,
  };
};

function SensorTwo(props) {
  let history = useHistory();

  return (
    <div
      className="backconnect"
      style={{ height: document.body.clientHeight * 0.68 }}
    >
      <div className="connect" style={{ width: "50%", marginLeft: "25%" }}>
        <div
          style={{
            fontSize: "14px",
            backgroundColor: "#fffbe6",
            border: "1px solid #ffe58f",
            padding: "8px 10px",
            borderRadius: "5px",
            marginTop: 10,
          }}
        ><strong style={{fontSize: "18px"}}>步骤三</strong><br />
          <p>请点击计算按钮，完成标定</p>
        </div>
      </div>
      <div style={{marginTop:10,textAlign:"center"}}>
      <Button
        style={{ width: "100px", height: "40px"}}
        onClick={() => {
          let dataList = {
            robot: props.currentRobot,
            conveyorID: props.dataSoures.conveyorID,
          };
          sendMSGtoController(
            "TRACK_CONVEYOR_SENSORPOS_CALIBRATION_CANCEL",
            dataList
          );
          history.push("/setparameter/sensorsign");
        }}
      >
        取消标定
      </Button>
      <Button
        style={{ width: "100px", height: "40px", marginLeft: "16%" }}
        onClick={() => {
          history.push("/setparameter/sensortwo");
        }}
      >
        上一步{" "}
      </Button>
      <Button
        style={{ width: "100px", height: "40px", marginLeft: "2%"  }}
        type="primary"
        onClick={() => {
          let dataList = {
            robot: props.currentRobot,
            conveyorID: props.dataSoures.conveyorID,
          };
          sendMSGtoController("TRACK_CONVEYOR_SENSORPOS_CALCULATE", dataList);

          history.push("/setparameter/sensorsign");
        }}
      >
        计算{" "}
      </Button>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(SensorTwo);
