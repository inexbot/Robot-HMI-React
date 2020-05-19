import React, { useState, useEffect, useRef } from "react";
import { Button, Input, Col, Row, Form, Checkbox, Card } from "antd";
import { connect } from "dva";
import { sendMSGtoController } from "service/network";
import intl from "react-intl-universal";
import ConTitle from "components/title";
import "./index.css";

const mapStateToProps = (state) => {
  return {
    currentRobot: state.index.robotStatus.currentRobot,
    currentCoordinate: state.index.robotStatus.currentCoordinate,
    currentRobotServoState: state.index.robotStatus.currentRobotServoState,
    deadmanState: state.index.robotStatus.deadmanState,
    pos: state.index.robotStatus.pos,
  };
};

function TeachLayout(props) {
  const [isDisabled, setIsDisabled] = useState(true);
  const [buttoncharacter, setButtonCharacter] = useState(intl.get("修改"));
  const [buttontype, setButtontype] = useState("primary");
  const change = () => {
    if (isDisabled === true) {
      setIsDisabled(false);
      setButtonCharacter(intl.get("保存"));
      setButtontype("dashed");
    } else {
      setIsDisabled(true);
      setButtonCharacter(intl.get("修改"));
      setButtontype("primary");
    }
  };
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

  // 工程界面组件
  const initTime = useRef();
  function handleOnMouseDown(axis, direction) {
    let jogData = {
      axis: axis,
      direction: direction,
    };
    initTime.current = setInterval(() => {
      sendMSGtoController("JOG_OPERATION_MOVE", jogData);
    }, 200);
  }
  function handleOnMouseUp(axis) {
    let stopJog = {
      axis: axis,
    };
    clearInterval(initTime.current);
    sendMSGtoController("JOG_OPERATION_STOP", stopJog);
  }
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
  const mountLeft = (value) => {
    document.getElementById("leftframe").style.display = "block";
    document.getElementById("controlBtm").style.display = "none";
    props.dispatch({
      type: "LeftStatus/changeLeftState",
      data: "DragPlayback",
    });
  };
  return (
    <div>
      {/* 头部 */}
      <ConTitle
        title={intl.get("控制")}
        subtitle={intl.get("机器人控制操作")}
      />
      {/* 悬浮按钮 */}
      <div className="hoverButton1">
        <Button type={buttontype} shape="circle" size="large" onClick={change}>
          {buttoncharacter}
        </Button>
      </div>
      {/* 主要内容 */}
      <div className="teachlayout">
        <Form form={form}>
          <Row>
            <Col span={8} style={{ textAlign: "center" }} id="controlBtm">
              <Card style={{ margin: 10 }}>
                <Row>
                  <Col span={12}>
                    <img
                      src={require("../../../images/location-z+.png")}
                      alt=""
                      style={{ height: 70 }}
                    />
                  </Col>
                  <Col span={12}>
                    <img
                      src={require("../../../images/location-z-.png")}
                      alt=""
                    />
                  </Col>
                </Row>
                <Row style={{ width: "100%" }}>
                  <Row style={{ width: "100%" }}>
                    <Col span={24}>
                      <img
                        src={require("../../../images/location-x-.png")}
                        alt=""
                      />
                    </Col>
                  </Row>
                  <Row style={{ width: "100%", marginTop: -15 }}>
                    <Col span={10}>
                      <img
                        src={require("../../../images/location-y-.png")}
                        alt=""
                      />
                    </Col>
                    <Col span={10} offset={4}>
                      <img
                        src={require("../../../images/location-y+.png")}
                        alt=""
                      />
                    </Col>
                  </Row>
                  <Row style={{ width: "100%", marginTop: -30 }}>
                    <Col span={24}>
                      <img
                        src={require("../../../images/location-x+.png")}
                        alt=""
                      />
                    </Col>
                  </Row>
                </Row>
                <Row>
                  <Col span={12}>
                    <img
                      src={require("../../../images/posture-z-.png")}
                      alt=""
                      style={{ height: 70 }}
                    />
                  </Col>
                  <Col span={12}>
                    <img
                      src={require("../../../images/posture-z+.png")}
                      alt=""
                    />
                  </Col>
                </Row>
                <Row style={{ width: "100%" }}>
                  <Row style={{ width: "100%" }}>
                    <Col span={24}>
                      <img
                        src={require("../../../images/posture-x-.png")}
                        alt=""
                      />
                    </Col>
                  </Row>
                  <Row style={{ width: "100%", marginTop: -30 }}>
                    <Col span={10}>
                      <img
                        src={require("../../../images/posture-y-.png")}
                        alt=""
                      />
                    </Col>
                    <Col span={10} offset={4}>
                      <img
                        src={require("../../../images/posture-y+.png")}
                        alt=""
                      />
                    </Col>
                  </Row>
                  <Row style={{ width: "100%", marginTop: -30 }}>
                    <Col span={24}>
                      <img
                        src={require("../../../images/posture-x+.png")}
                        alt=""
                      />
                    </Col>
                  </Row>
                </Row>
              </Card>
            </Col>
            <Col gutter={{ xs: 24, sm: 24, md: 16, lg: 16 }}>
              <Row>
                <Col span={10} offset={1} style={{ marginTop: 20 }}>
                  <Row>
                    <Col span={10}>
                      <p>
                        <Button onClick={sendDeadman} style={{ width: "90%" }}>
                          {deadman}
                        </Button>
                      </p>
                      <p>
                        <Button
                          onClick={sendFaultReset}
                          style={{ width: "90%" }}
                        >
                          伺服清错
                        </Button>
                      </p>
                      <p>
                        <Button onClick={0} style={{ width: "90%" }}>
                          回零
                        </Button>
                      </p>
                    </Col>
                    <Col span={12} offset={1}>
                      <Card>
                        <p>
                          <Button
                            onClick={0}
                            type="primary"
                            style={{ width: "100%" }}
                          >
                            拖拽使能
                          </Button>
                        </p>
                        <p>
                          <Button
                            onClick={mountLeft}
                            type="primary"
                            style={{ width: "100%" }}
                          >
                            拖拽回放
                          </Button>
                        </p>
                      </Card>
                    </Col>
                  </Row>
                </Col>
                <Col span={12} offset={1}>
                  <p style={{ marginTop: "20px" }}>
                    <Checkbox>步进模式</Checkbox>
                  </p>
                  <Row>
                    <Col span={7}>位置步进</Col>
                    <Col span={17}>
                      <div className="jogGroup">
                        <Button
                          onMouseDown={handleOnMouseDown.bind(this, 1, -1)}
                          onMouseUp={handleOnMouseUp.bind(this, 1)}
                          onMouseLeave={handleOnMouseUp.bind(this, 1)}
                        >
                          -
                        </Button>
                        <Form.Item name="axis1">
                          <Input disabled={true} />
                        </Form.Item>
                        <Button
                          onMouseDown={handleOnMouseDown.bind(this, 1, 1)}
                          onMouseUp={handleOnMouseUp.bind(this, 1)}
                          onMouseLeave={handleOnMouseUp.bind(this, 1)}
                        >
                          +
                        </Button>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={7}>姿态步进</Col>
                    <Col span={17}>
                      <div className="jogGroup">
                        <Button
                          onMouseDown={handleOnMouseDown.bind(this, 1, -1)}
                          onMouseUp={handleOnMouseUp.bind(this, 1)}
                          onMouseLeave={handleOnMouseUp.bind(this, 1)}
                        >
                          -
                        </Button>
                        <Form.Item name="axis1">
                          <Input disabled={true} />
                        </Form.Item>
                        <Button
                          onMouseDown={handleOnMouseDown.bind(this, 1, 1)}
                          onMouseUp={handleOnMouseUp.bind(this, 1)}
                          onMouseLeave={handleOnMouseUp.bind(this, 1)}
                        >
                          +
                        </Button>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={7}>关节步进</Col>
                    <Col span={17}>
                      <div className="jogGroup">
                        <Button
                          onMouseDown={handleOnMouseDown.bind(this, 1, -1)}
                          onMouseUp={handleOnMouseUp.bind(this, 1)}
                          onMouseLeave={handleOnMouseUp.bind(this, 1)}
                        >
                          -
                        </Button>
                        <Form.Item name="axis1">
                          <Input disabled={true} />
                        </Form.Item>
                        <Button
                          onMouseDown={handleOnMouseDown.bind(this, 1, 1)}
                          onMouseUp={handleOnMouseUp.bind(this, 1)}
                          onMouseLeave={handleOnMouseUp.bind(this, 1)}
                        >
                          +
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col span={9} offset={1}>
                  <div className="teach1">
                    <p className="p1">X</p>
                    <Input disabled={isDisabled} />
                    <p className="p2">mm</p>
                  </div>
                  <div className="teach1">
                    <p className="p1">Y</p>
                    <Input disabled={isDisabled} />
                    <p className="p2">mm</p>
                  </div>
                  <div className="teach1">
                    <p className="p1">Y</p>
                    <Input disabled={isDisabled} />
                    <p className="p2">mm</p>
                  </div>
                  <div className="teach1">
                    <p className="p1">RX</p>
                    <Input disabled={isDisabled} />
                    <p className="p2"></p>
                  </div>
                  <div className="teach1">
                    <p className="p1">RY</p>
                    <Input disabled={isDisabled} />
                    <p className="p2"></p>
                  </div>
                  <div className="teach1">
                    <p className="p1">RZ</p>
                    <Input disabled={isDisabled} />
                    <p className="p2"></p>
                  </div>
                </Col>
                <Col span={13} offset={1}>
                  <div className="quick-control-state">
                    <div className="leftstate-content">
                      <Row>
                        <Col span={2}>
                          <h3>{axis[0]}</h3>
                        </Col>
                        <Col span={22}>
                          <div className="jogGroup">
                            <Button
                              onMouseDown={handleOnMouseDown.bind(this, 1, -1)}
                              onMouseUp={handleOnMouseUp.bind(this, 1)}
                              onMouseLeave={handleOnMouseUp.bind(this, 1)}
                            >
                              -
                            </Button>
                            <Form.Item name="axis1">
                              <Input disabled={true} />
                            </Form.Item>
                            <Button
                              onMouseDown={handleOnMouseDown.bind(this, 1, 1)}
                              onMouseUp={handleOnMouseUp.bind(this, 1)}
                              onMouseLeave={handleOnMouseUp.bind(this, 1)}
                            >
                              +
                            </Button>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={2}>
                          <h3>{axis[1]}</h3>
                        </Col>
                        <Col span={22}>
                          <div className="jogGroup">
                            <Button
                              onMouseDown={handleOnMouseDown.bind(this, 2, -1)}
                              onMouseUp={handleOnMouseUp.bind(this, 2)}
                              onMouseLeave={handleOnMouseUp.bind(this, 2)}
                            >
                              -
                            </Button>
                            <Form.Item name="axis2">
                              <Input disabled={true} />
                            </Form.Item>
                            <Button
                              onMouseDown={handleOnMouseDown.bind(this, 2, 1)}
                              onMouseUp={handleOnMouseUp.bind(this, 2)}
                              onMouseLeave={handleOnMouseUp.bind(this, 2)}
                            >
                              +
                            </Button>
                          </div>
                        </Col>
                      </Row>

                      <Row>
                        <Col span={2}>
                          <h3>{axis[2]}</h3>
                        </Col>
                        <Col span={22}>
                          <div className="jogGroup">
                            <Button
                              onMouseDown={handleOnMouseDown.bind(this, 3, -1)}
                              onMouseUp={handleOnMouseUp.bind(this, 3)}
                              onMouseLeave={handleOnMouseUp.bind(this, 3)}
                            >
                              -
                            </Button>
                            <Form.Item name="axis3">
                              <Input disabled={true} />
                            </Form.Item>
                            <Button
                              onMouseDown={handleOnMouseDown.bind(this, 3, 1)}
                              onMouseUp={handleOnMouseUp.bind(this, 3)}
                              onMouseLeave={handleOnMouseUp.bind(this, 3)}
                            >
                              +
                            </Button>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={2}>
                          <h3>{axis[3]}</h3>
                        </Col>
                        <Col span={22}>
                          <div className="jogGroup">
                            <Button
                              onMouseDown={handleOnMouseDown.bind(this, 4, -1)}
                              onMouseUp={handleOnMouseUp.bind(this, 4)}
                              onMouseLeave={handleOnMouseUp.bind(this, 4)}
                            >
                              -
                            </Button>
                            <Form.Item name="axis4">
                              <Input disabled={true} />
                            </Form.Item>
                            <Button
                              onMouseDown={handleOnMouseDown.bind(this, 4, 1)}
                              onMouseUp={handleOnMouseUp.bind(this, 4)}
                              onMouseLeave={handleOnMouseUp.bind(this, 4)}
                            >
                              +
                            </Button>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={2}>
                          <h3>{axis[4]}</h3>
                        </Col>
                        <Col span={22}>
                          <div className="jogGroup">
                            <Button
                              onMouseDown={handleOnMouseDown.bind(this, 5, -1)}
                              onMouseUp={handleOnMouseUp.bind(this, 5)}
                              onMouseLeave={handleOnMouseUp.bind(this, 5)}
                            >
                              -
                            </Button>
                            <Form.Item name="axis5">
                              <Input disabled={true} />
                            </Form.Item>
                            <Button
                              onMouseDown={handleOnMouseDown.bind(this, 5, 1)}
                              onMouseUp={handleOnMouseUp.bind(this, 5)}
                              onMouseLeave={handleOnMouseUp.bind(this, 5)}
                            >
                              +
                            </Button>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={2}>
                          <h3>{axis[5]}</h3>
                        </Col>
                        <Col span={22}>
                          <div className="jogGroup">
                            <Button
                              onMouseDown={handleOnMouseDown.bind(this, 6, -1)}
                              onMouseUp={handleOnMouseUp.bind(this, 6)}
                              onMouseLeave={handleOnMouseUp.bind(this, 6)}
                            >
                              -
                            </Button>
                            <Form.Item name="axis6">
                              <Input disabled={true} />
                            </Form.Item>
                            <Button
                              onMouseDown={handleOnMouseDown.bind(this, 6, 1)}
                              onMouseUp={handleOnMouseUp.bind(this, 6)}
                              onMouseLeave={handleOnMouseUp.bind(this, 6)}
                            >
                              +
                            </Button>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={2}>
                          <h3>{axis[6]}</h3>
                        </Col>
                        <Col span={22}>
                          <div className="jogGroup">
                            <Button
                              onMouseDown={handleOnMouseDown.bind(this, 7, -1)}
                              onMouseUp={handleOnMouseUp.bind(this, 7)}
                              onMouseLeave={handleOnMouseUp.bind(this, 7)}
                            >
                              -
                            </Button>
                            <Form.Item name="axis7">
                              <Input disabled={true} />
                            </Form.Item>
                            <Button
                              onMouseDown={handleOnMouseDown.bind(this, 7, 1)}
                              onMouseUp={handleOnMouseUp.bind(this, 7)}
                              onMouseLeave={handleOnMouseUp.bind(this, 7)}
                            >
                              +
                            </Button>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
}
export default connect(mapStateToProps)(TeachLayout);
