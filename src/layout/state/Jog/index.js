import React, { useState, useEffect } from "react";
import { Button, Form, Input } from "antd";
import { connect } from "dva";
import "./index.css";
import { sendMSGtoController } from "service/network";

// 从全局的状态获取当前机器人状态
const mapStateToProps = (state) => {
  return {
    currentRobot: state.index.robotStatus.currentRobot,
    currentCoordinate: state.index.robotStatus.currentCoordinate,
    currentRobotServoState: state.index.robotStatus.currentRobotServoState,
    deadmanState: state.index.robotStatus.deadmanState,
    pos: state.index.robotStatus.pos,
  };
};
// 工程界面组件
let initTime;
function handleOnMouseDown(axis, direction) {
  let jogData = {
    axis: axis,
    direction: direction,
  };
  initTime = setInterval(() => {
    sendMSGtoController("JOG_OPERATION_MOVE", jogData);
  }, 200);
}
function handleOnMouseUp(axis) {
  let stopJog = {
    axis: axis,
  };
  clearInterval(initTime);
  sendMSGtoController("JOG_OPERATION_STOP", stopJog);
}

function Jog(props) {
  const [deadman, setDeadman] = useState("上电");
  const [axis, setAxis] = useState([
    "J1",
    "J2",
    "J3",
    "J4",
    "J5",
    "J6",
    "J7",
    "O1",
    "O2",
    "O3",
  ]);
  const [form] = Form.useForm();
  useEffect(() => {
    let sendInquire;
    sendInquire = setInterval(() => {
      let data = {
        robot: props.currentRobot,
        coord: props.currentCoordinate,
      };
      sendMSGtoController("CURRENTPOS_INQUIRE", data);
    }, 500);
    return () => {
      clearInterval(sendInquire);
    };
  }, [props.currentCoordinate, props.currentRobot]);

  useEffect(() => {
    switch (props.currentCoordinate) {
      case 0:
        setAxis(["J1", "J2", "J3", "J4", "J5", "J6", "J7", "O1", "O2", "O3"]);
        break;
      case 1:
        setAxis(["X", "Y", "Z", "A", "B", "C", "θ", "O1", "O2", "O3"]);
        break;
      case 2:
        setAxis(["TX", "TY", "TZ", "TA", "TB", "TC", "Tθ", "O1", "O2", "O3"]);
        break;
      case 3:
        setAxis(["UX", "UY", "UZ", "UA", "UB", "UC", "Uθ", "O1", "O2", "O3"]);
        break;
      default:
        break;
    }
  }, [props.currentCoordinate]);

  useEffect(() => {
    form.setFieldsValue({
      axis1: props.pos[0],
      axis2: props.pos[1],
      axis3: props.pos[2],
      axis4: props.pos[3],
      axis5: props.pos[4],
      axis6: props.pos[5],
      axis7: props.pos[6],
    });
  }, [form, props.pos]);
  // 用来构建标签页
  const sendDeadman = () => {
    if (deadman === "上电") {
      let deadmanData = {
        deadman: 1,
      };
      sendMSGtoController("DEADMAN_STATUS_SET", deadmanData);
      setDeadman("下电");
    } else if (deadman === "下电") {
      let deadmanData1 = {
        deadman: 0,
      };
      sendMSGtoController("DEADMAN_STATUS_SET", deadmanData1);
      setDeadman("上电");
    }
  };
  const sendFaultReset = () => {
    let data = {
      robot: props.currentRobot,
    };
    sendMSGtoController("FAULT_RESET", data);
  };
  return (
    <div className="quick-control-state">
      <div className="leftstate-content">
        <Button onClick={sendDeadman}>{deadman}</Button>
        <Button onClick={sendFaultReset}>伺服清错</Button>
        <Form form={form}>
          <h3>{axis[0]}</h3>
          <div className="jogGroup">
            <Button
              onTouchStart={handleOnMouseDown.bind(this, 1, -1)}
              onTouchEnd={handleOnMouseUp.bind(this, 1)}
              onTouchMove={handleOnMouseUp.bind(this, 1)}
            >
              -
            </Button>
            <Form.Item name="axis1">
              <Input disabled={true} />
            </Form.Item>
            <Button
              onTouchStart={handleOnMouseDown.bind(this, 1, 1)}
              onTouchEnd={handleOnMouseUp.bind(this, 1)}
              onTouchMove={handleOnMouseUp.bind(this, 1)}
            >
              +
            </Button>
          </div>
          <h3>{axis[1]}</h3>
          <div className="jogGroup">
            <Button
              onTouchStart={handleOnMouseDown.bind(this, 2, -1)}
              onTouchEnd={handleOnMouseUp.bind(this, 2)}
              onTouchMove={handleOnMouseUp.bind(this, 2)}
            >
              -
            </Button>
            <Form.Item name="axis2">
              <Input disabled={true} />
            </Form.Item>
            <Button
              onTouchStart={handleOnMouseDown.bind(this, 2, 1)}
              onTouchEnd={handleOnMouseUp.bind(this, 2)}
              onTouchMove={handleOnMouseUp.bind(this, 2)}
            >
              +
            </Button>
          </div>
          <h3>{axis[2]}</h3>
          <div className="jogGroup">
            <Button
              onTouchStart={handleOnMouseDown.bind(this, 3, -1)}
              onTouchEnd={handleOnMouseUp.bind(this, 3)}
              onTouchMove={handleOnMouseUp.bind(this, 3)}
            >
              -
            </Button>
            <Form.Item name="axis3">
              <Input disabled={true} />
            </Form.Item>
            <Button
              onTouchStart={handleOnMouseDown.bind(this, 3, 1)}
              onTouchEnd={handleOnMouseUp.bind(this, 3)}
              onTouchMove={handleOnMouseUp.bind(this, 3)}
            >
              +
            </Button>
          </div>
          <h3>{axis[3]}</h3>
          <div className="jogGroup">
            <Button
              onTouchStart={handleOnMouseDown.bind(this, 4, -1)}
              onTouchEnd={handleOnMouseUp.bind(this, 4)}
              onTouchMove={handleOnMouseUp.bind(this, 4)}
            >
              -
            </Button>
            <Form.Item name="axis4">
              <Input disabled={true} />
            </Form.Item>
            <Button
              onTouchStart={handleOnMouseDown.bind(this, 4, 1)}
              onTouchEnd={handleOnMouseUp.bind(this, 4)}
              onTouchMove={handleOnMouseUp.bind(this, 4)}
            >
              +
            </Button>
          </div>
          <h3>{axis[4]}</h3>
          <div className="jogGroup">
            <Button
              onTouchStart={handleOnMouseDown.bind(this, 5, -1)}
              onTouchEnd={handleOnMouseUp.bind(this, 5)}
              onTouchMove={handleOnMouseUp.bind(this, 5)}
            >
              -
            </Button>
            <Form.Item name="axis5">
              <Input disabled={true} />
            </Form.Item>
            <Button
              onTouchStart={handleOnMouseDown.bind(this, 5, 1)}
              onTouchEnd={handleOnMouseUp.bind(this, 5)}
              onTouchMove={handleOnMouseUp.bind(this, 5)}
            >
              +
            </Button>
          </div>

          <h3>{axis[5]}</h3>
          <div className="jogGroup">
            <Button
              onTouchStart={handleOnMouseDown.bind(this, 6, -1)}
              onTouchEnd={handleOnMouseUp.bind(this, 6)}
              onTouchMove={handleOnMouseUp.bind(this, 6)}
            >
              -
            </Button>
            <Form.Item name="axis6">
              <Input disabled={true} />
            </Form.Item>
            <Button
              onTouchStart={handleOnMouseDown.bind(this, 6, 1)}
              onTouchEnd={handleOnMouseUp.bind(this, 6)}
              onTouchMove={handleOnMouseUp.bind(this, 6)}
            >
              +
            </Button>
          </div>

          <h3>{axis[6]}</h3>
          <div className="jogGroup">
            <Button
              onTouchStart={handleOnMouseDown.bind(this, 7, -1)}
              onTouchEnd={handleOnMouseUp.bind(this, 7)}
              onTouchMove={handleOnMouseUp.bind(this, 7)}
            >
              -
            </Button>
            <Form.Item name="axis7">
              <Input disabled={true} />
            </Form.Item>
            <Button
              onTouchStart={handleOnMouseDown.bind(this, 7, 1)}
              onTouchEnd={handleOnMouseUp.bind(this, 7)}
              onTouchMove={handleOnMouseUp.bind(this, 7)}
            >
              +
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
export default connect(mapStateToProps)(Jog);
