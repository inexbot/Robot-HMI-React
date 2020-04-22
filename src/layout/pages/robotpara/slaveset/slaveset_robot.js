import React from "react";
import { Col, Tabs, Select, Row } from "antd";
import { connect } from "dva";
import "./slaveset.css";
import { servoAmount } from "./slaveset_header";
import { useState } from "react";
const { Option } = Select;
const { TabPane } = Tabs;

const mapStateToProps = (state) => {
  return {
    robotAmount: state.index.robotStatus.robotAmount,
    isDisabled: state.Slave_Set.isDisabled,
    buttoncharacter: state.Slave_Set.buttoncharacter,
    buttontype: state.Slave_Set.buttontype,
    robot1OuterAmount: state.index.robotStatus.robot1OuterAmount,
    robot2OuterAmount: state.index.robotStatus.robot2OuterAmount,
    robot3OuterAmount: state.index.robotStatus.robot3OuterAmount,
    robot4OuterAmount: state.index.robotStatus.robot4OuterAmount,
  };
};

function SlaveSetRobot(props) {
  const [state, setState] = useState({
    robotActiveKey: "robot1",
    primaryRobotActiveKey: "robot1",
    primaryJointActiveKey: "Joint1",
    robot1Disabled: false,
    robot2Disabled: true,
    robot3Disabled: true,
    robot4Disabled: true,
  });
  // 伺服选择下拉框的内容生成
  const servoSelectOption = (servoAmount) => {
    const options = [];
    for (let i = 0; i < servoAmount.length; i++) {
      options.push(<Option key={i + 1}>{"伺服-" + (i + 1)}</Option>);
    }
    return options;
  };
  // 切换机器人数量下拉框的回调函数
  const changeRobotAmount = (value) => {
    props.dispatch({
      type: "index/changeRobotAmount",
      data: {
        robotAmount: value,
      },
    });
  };
  // 切换机器人类型下拉框的回调函数
  const changeRobotType = (value) => {
    var activeRobot = state.robotActiveKey;
    switch (value) {
      case "1":
        document.getElementById(activeRobot + "Joint1").style.display =
          "table-row";
        document.getElementById(activeRobot + "Joint2").style.display =
          "table-row";
        document.getElementById(activeRobot + "Joint3").style.display =
          "table-row";
        document.getElementById(activeRobot + "Joint4").style.display =
          "table-row";
        document.getElementById(activeRobot + "Joint5").style.display =
          "table-row";
        document.getElementById(activeRobot + "Joint6").style.display =
          "table-row";
        document.getElementById(activeRobot + "Joint7").style.display = "none";
        break;
      case "2":
        document.getElementById(activeRobot + "Joint1").style.display =
          "table-row";
        document.getElementById(activeRobot + "Joint2").style.display =
          "table-row";
        document.getElementById(activeRobot + "Joint3").style.display =
          "table-row";
        document.getElementById(activeRobot + "Joint4").style.display =
          "table-row";
        document.getElementById(activeRobot + "Joint5").style.display =
          "table-row";
        document.getElementById(activeRobot + "Joint6").style.display =
          "table-row";
        document.getElementById(activeRobot + "Joint7").style.display =
          "table-row";
        break;
      default:
        document.getElementById(activeRobot + "Joint1").style.display =
          "table-row";
        document.getElementById(activeRobot + "Joint2").style.display =
          "table-row";
        document.getElementById(activeRobot + "Joint3").style.display =
          "table-row";
        document.getElementById(activeRobot + "Joint4").style.display =
          "table-row";
        document.getElementById(activeRobot + "Joint5").style.display =
          "table-row";
        document.getElementById(activeRobot + "Joint6").style.display =
          "table-row";
        document.getElementById(activeRobot + "Joint7").style.display = "none";
        break;
    }
  };
  // 切换机器人外部轴个数的回调函数
  const changeRobotOuter = (value) => {
    var activeRobot = state.robotActiveKey;
    props.dispatch({
      type: "index/changeRobotOuterAmount",
      data: {
        activedRobot: activeRobot,
        outerAmount: value,
      },
    });
    switch (value) {
      case "0":
        document.getElementById(activeRobot + "Outer1").style.display = "none";
        document.getElementById(activeRobot + "Outer2").style.display = "none";
        document.getElementById(activeRobot + "Outer3").style.display = "none";
        break;
      case "1":
        document.getElementById(activeRobot + "Outer1").style.display =
          "table-row";
        document.getElementById(activeRobot + "Outer2").style.display = "none";
        document.getElementById(activeRobot + "Outer3").style.display = "none";
        break;
      case "2":
        document.getElementById(activeRobot + "Outer1").style.display =
          "table-row";
        document.getElementById(activeRobot + "Outer2").style.display =
          "table-row";
        document.getElementById(activeRobot + "Outer3").style.display = "none";
        break;
      case "3":
        document.getElementById(activeRobot + "Outer1").style.display =
          "table-row";
        document.getElementById(activeRobot + "Outer2").style.display =
          "table-row";
        document.getElementById(activeRobot + "Outer3").style.display =
          "table-row";
        break;
      default:
        document.getElementById(activeRobot + "Outer1").style.display = "none";
        document.getElementById(activeRobot + "Outer2").style.display = "none";
        document.getElementById(activeRobot + "Outer3").style.display = "none";
        break;
    }
  };

  const changeRobotOuter1 = (value) => {
    var activeRobot = state.robotActiveKey;
    switch (value) {
      case "1":
        document.getElementById(activeRobot + "Outer1Joint1").style.display =
          "table-row";
        document.getElementById(activeRobot + "Outer1Joint2").style.display =
          "none";
        break;
      case "2":
        document.getElementById(activeRobot + "Outer1Joint1").style.display =
          "table-row";
        document.getElementById(activeRobot + "Outer1Joint2").style.display =
          "none";
        break;
      case "3":
        document.getElementById(activeRobot + "Outer1Joint1").style.display =
          "table-row";
        document.getElementById(activeRobot + "Outer1Joint2").style.display =
          "table-row";
        break;
      case "4":
        document.getElementById(activeRobot + "Outer1Joint1").style.display =
          "table-row";
        document.getElementById(activeRobot + "Outer1Joint2").style.display =
          "none";
        break;
      default:
        document.getElementById(activeRobot + "Outer1Joint1").style.display =
          "table-row";
        document.getElementById(activeRobot + "Outer1Joint2").style.display =
          "none";
        break;
    }
  };
  const changeRobotOuter2 = (value) => {
    var activeRobot = state.robotActiveKey;
    switch (value) {
      case "1":
        document.getElementById(activeRobot + "Outer2Joint1").style.display =
          "table-row";
        document.getElementById(activeRobot + "Outer2Joint2").style.display =
          "none";
        break;
      case "2":
        document.getElementById(activeRobot + "Outer2Joint1").style.display =
          "table-row";
        document.getElementById(activeRobot + "Outer2Joint2").style.display =
          "none";
        break;
      case "3":
        document.getElementById(activeRobot + "Outer2Joint1").style.display =
          "table-row";
        document.getElementById(activeRobot + "Outer2Joint2").style.display =
          "table-row";
        break;
      case "4":
        document.getElementById(activeRobot + "Outer2Joint1").style.display =
          "table-row";
        document.getElementById(activeRobot + "Outer2Joint2").style.display =
          "none";
        break;
      default:
        document.getElementById(activeRobot + "Outer2Joint1").style.display =
          "table-row";
        document.getElementById(activeRobot + "Outer2Joint2").style.display =
          "none";
        break;
    }
  };
  // tabs的内容
  const tabsContent = (robot) => {
    var robotName;
    if (robot === "robot1") {
      robotName = "机器人1";
    } else if (robot === "robot2") {
      robotName = "机器人2";
    } else if (robot === "robot3") {
      robotName = "机器人3";
    } else if (robot === "robot4") {
      robotName = "机器人4";
    }

    return (
      <TabPane tab={robotName} key={robot}>
        <Row>
          <Col span={12}>
            <div className="slaveset1" style={{paddingBottom:15}}>
              <span className="p1">机器人类型</span>
              <Select
                defaultValue="2"
                onChange={(value) => changeRobotType(value)}
                disabled={props.isDisabled}
                className="table_btn"
              >
                <Option value="1">6轴</Option>
                <Option value="2">7轴</Option>
              </Select>
            </div>
            <div className="slaveset1">
              <table>
                <tr className="table_head">
                  <th>机器人</th>
                  <th>伺服</th>
                </tr>
                <tr id={robot + "Joint1"}>
                  <td>轴1</td>
                  <td>
                    <Select
                      defaultValue="1"
                      disabled={props.isDisabled}
                      className="table_btn"
                    >
                      {servoSelectOption(servoAmount)}
                    </Select>
                  </td>
                </tr>
                <tr id={robot + "Joint2"}>
                  <td>轴2</td>
                  <td>
                    <Select
                      defaultValue="2"
                      disabled={props.isDisabled}
                      className="table_btn"
                    >
                      {servoSelectOption(servoAmount)}
                    </Select>
                  </td>
                </tr>
                <tr id={robot + "Joint3"}>
                  <td>轴3</td>
                  <td>
                    <Select
                      defaultValue="3"
                      disabled={props.isDisabled}
                      className="table_btn"
                    >
                      {servoSelectOption(servoAmount)}
                    </Select>
                  </td>
                </tr>
                <tr id={robot + "Joint4"}>
                  <td>轴4</td>
                  <td>
                    <Select
                      defaultValue="4"
                      disabled={props.isDisabled}
                      className="table_btn"
                    >
                      {servoSelectOption(servoAmount)}
                    </Select>
                  </td>
                </tr>
                <tr id={robot + "Joint5"}>
                  <td>轴5</td>
                  <td>
                    <Select
                      defaultValue="5"
                      disabled={props.isDisabled}
                      className="table_btn"
                    >
                      {servoSelectOption(servoAmount)}
                    </Select>
                  </td>
                </tr>
                <tr id={robot + "Joint6"}>
                  <td>轴6</td>
                  <td>
                    <Select
                      defaultValue="6"
                      disabled={props.isDisabled}
                      className="table_btn"
                    >
                      {servoSelectOption(servoAmount)}
                    </Select>
                  </td>
                </tr>
                <tr id={robot + "Joint7"}>
                  <td>轴7</td>
                  <td>
                    <Select
                      defaultValue="7"
                      disabled={props.isDisabled}
                      className="table_btn"
                    >
                      {servoSelectOption(servoAmount)}
                    </Select>
                  </td>
                </tr>
              </table>
            </div>
          </Col>
          <Col span={12}>
            <div className="slaveset1" style={{paddingBottom:15}}>
              <span className="p1">外部轴组数</span>
              <Select
                defaultValue={props[robot + "OuterAmount"]}
                onChange={(value) => changeRobotOuter(value)}
                disabled={props.isDisabled}
                className="table_btn"
              >
                <Option value="0">0</Option>
                <Option value="1">1</Option>
                <Option value="2">2</Option>
                <Option value="3">3</Option>
              </Select>
            </div>
            <div className="slaveset1">
              <table id={robot + "Outer1"}>
                <tr className="table_head">
                  <th>组1</th>
                  <th>
                    <Select
                      defaultValue="3"
                      onChange={(value) => changeRobotOuter1(value)}
                      disabled={props.isDisabled}
                      className="table_btn"
                    >
                      <Option value="1">单轴旋转台</Option>
                      <Option value="2">单轴翻转台</Option>
                      <Option value="3">双轴翻转台</Option>
                      <Option value="4">地轨</Option>
                    </Select>
                  </th>
                </tr>
                <tr id={robot + "Outer1Joint1"}>
                  <td>轴1</td>
                  <td>
                    <Select
                      defaultValue="8"
                      disabled={props.isDisabled}
                      className="table_btn"
                    >
                      {servoSelectOption(servoAmount)}
                    </Select>
                  </td>
                </tr>
                <tr id={robot + "Outer1Joint2"}>
                  <td>轴2</td>
                  <td>
                    <Select
                      defaultValue="9"
                      disabled={props.isDisabled}
                      className="table_btn"
                    >
                      {servoSelectOption(servoAmount)}
                    </Select>
                  </td>
                </tr>
              </table>
            </div>
            <div className="slaveset1">
              <table id={robot + "Outer2"}>
                <tr className="table_head">
                  <th>组2</th>
                  <th>
                    <Select
                      defaultValue="3"
                      onChange={(value) => changeRobotOuter2(value)}
                      disabled={props.isDisabled}
                      className="table_btn"
                    >
                      <Option value="1">单轴旋转台</Option>
                      <Option value="2">单轴翻转台</Option>
                      <Option value="3">双轴翻转台</Option>
                      <Option value="4">地轨</Option>
                    </Select>
                  </th>
                </tr>
                <tr id={robot + "Outer2Joint1"}>
                  <td>轴1</td>
                  <td>
                    <Select
                      defaultValue="10"
                      disabled={props.isDisabled}
                      className="table_btn"
                    >
                      {servoSelectOption(servoAmount)}
                    </Select>
                  </td>
                </tr>
                <tr id={robot + "Outer2Joint2"}>
                  <td>轴2</td>
                  <td>
                    <Select
                      defaultValue="11"
                      disabled={props.isDisabled}
                      className="table_btn"
                    >
                      {servoSelectOption(servoAmount)}
                    </Select>
                  </td>
                </tr>
              </table>
            </div>
            <div className="slaveset1">
              <table id={robot + "Outer3"}>
                <tr className="table_head">
                  <th>组3</th>
                  <th>
                    <Select
                      defaultValue="4"
                      disabled={true}
                      className="table_btn"
                    >
                      <Option value="1">单轴旋转台</Option>
                      <Option value="2">单轴翻转台</Option>
                      <Option value="3">双轴翻转台</Option>
                      <Option value="4">地轨</Option>
                    </Select>
                  </th>
                </tr>
                <tr id={robot + "Outer3Joint1"}>
                  <td>轴</td>
                  <td>
                    <Select
                      defaultValue="12"
                      disabled={props.isDisabled}
                      className="table_btn"
                    >
                      {servoSelectOption(servoAmount)}
                    </Select>
                  </td>
                </tr>
              </table>
            </div>
          </Col>
        </Row>
      </TabPane>
    );
  };
  const rendertabs = () => {
    var robotAmount = props.robotAmount;
    if (robotAmount === 1) {
      return (
        <Tabs
          activeKey={state.robotActiveKey}
          onChange={(key) => {
            setState({ robotActiveKey: key });
          }}
        >
          {tabsContent("robot1")}
        </Tabs>
      );
    } else if (robotAmount === 2) {
      return (
        <Tabs
          activeKey={state.robotActiveKey}
          onChange={(key) => {
            setState({ robotActiveKey: key });
          }}
        >
          {tabsContent("robot1")}
          {tabsContent("robot2")}
        </Tabs>
      );
    } else if (robotAmount === 3) {
      return (
        <Tabs
          activeKey={state.robotActiveKey}
          onChange={(key) => {
            setState({ robotActiveKey: key });
          }}
        >
          {tabsContent("robot1")}
          {tabsContent("robot2")}
          {tabsContent("robot3")}
        </Tabs>
      );
    } else if (robotAmount === 4) {
      return (
        <Tabs
          activeKey={state.robotActiveKey}
          onChange={(key) => {
            setState({ robotActiveKey: key });
          }}
        >
          {tabsContent("robot1")}
          {tabsContent("robot2")}
          {tabsContent("robot3")}
          {tabsContent("robot4")}
        </Tabs>
      );
    }
  };
  return (
    <div>
      <div className="slaveset1">
        <div style={{ fontSize: 20, width: 120, fontWeight: 500 ,float:"left"}}>从动轴</div>
        <div>
          <span className="p1">机器人数目</span>
          <span>
            <Select
              defaultValue={props.robotAmount}
              onChange={(value) => changeRobotAmount(value)}
              disabled={props.isDisabled}
              style={{ width: 80 }}
            >
              <Option value="1">1</Option>
              <Option value="2">2</Option>
              <Option value="3">3</Option>
              <Option value="4">4</Option>
            </Select>
          </span>
        </div>
      </div>
      {rendertabs()}
    </div>
  );
}
export default connect(mapStateToProps)(SlaveSetRobot);
