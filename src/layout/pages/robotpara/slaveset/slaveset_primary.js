import React from "react";
import { Select, Col, Input, Tabs, Row } from "antd";
import { connect } from "dva";
import { servoAmount } from "./slaveset_header";
import { useState } from "react";

const { TabPane } = Tabs;
const { Option } = Select;

const mapStateToProps = (state) => {
  return {
    robotAmount: state.index.robotStatus.robotAmount,
    isDisabled: state.Slave_Set.isDisabled,
    buttoncharacter: state.Slave_Set.buttoncharacter,
    buttontype: state.Slave_Set.buttontype,
  };
};

function SlaveSetPrimary(props) {
  const [state, setState] = useState({
    primaryRobotActiveKey: "robot1",
    primaryJointActiveKey: "J1",
  });
  const servoSelectOption = (servoAmount) => {
    const options = [];
    for (let i = 0; i < servoAmount.length; i++) {
      options.push(<Option key={i + 1}>{"伺服-" + (i + 1)}</Option>);
    }
    return options;
  };

  const changePrimary = (value) => {
    var activeRobot = state.primaryRobotActiveKey;
    var activeJoint = state.primaryJointActiveKey;
    var primary1 = activeRobot + activeJoint + "Primary1";
    var primary2 = activeRobot + activeJoint + "Primary2";
    switch (value) {
      case "0":
        document.getElementById(primary1).style.display = "none";
        document.getElementById(primary2).style.display = "none";
        break;
      case "1":
        document.getElementById(primary1).style.display = "block";
        document.getElementById(primary2).style.display = "none";
        break;
      case "2":
        document.getElementById(primary1).style.display = "block";
        document.getElementById(primary2).style.display = "block";
        break;
      default:
        document.getElementById(primary1).style.display = "none";
        document.getElementById(primary2).style.display = "none";
        break;
    }
  };
  // 每个面板的主要内容
  const primaryTabsContent = (robot, joint) => {
    return (
      <TabPane tab={joint} key={joint}>
        <div style={{ margin: 20 }}>
          <span className="p1">从动轴个数</span>
          <Select
            defaultValue="2"
            onChange={changePrimary.bind(this)}
            disabled={props.isDisabled}
            className="table_btn"
          >
            <Option value="0">0</Option>
            <Option value="1">1</Option>
            <Option value="2">2</Option>
          </Select>
        </div>
        <div>
          <Row>
            <Col span={12} className="slaveset1">
              <table id={robot + joint + "Primary1"}>
                <tr className="table_head">
                  <th colspan="2">从动轴1</th>
                </tr>
                <tr>
                  <td>伺服序号</td>
                  <td>
                    <Select
                      defaultValue="13"
                      disabled={props.isDisabled}
                      className="table_btn2"
                    >
                      {servoSelectOption(servoAmount)}
                    </Select>
                  </td>
                </tr>
                <tr>
                  <td>减速比</td>
                  <td>
                    <Input disabled={props.isDisabled} className="table_btn2" />
                  </td>
                </tr>
                <tr>
                  <td>编码器位数</td>
                  <td>
                    <Input disabled={props.isDisabled} className="table_btn2" />
                  </td>
                </tr>
                <tr>
                  <td>相对主电机方向</td>
                  <td>
                    <Select
                      defaultValue="1"
                      disabled={props.isDisabled}
                      className="table_btn2"
                    >
                      <Option value="1">相同</Option>
                      <Option value="-1">相反</Option>
                    </Select>
                  </td>
                </tr>
              </table>
            </Col>
            <Col span={12} className="slaveset1">
              <table id={robot + joint + "Primary2"}>
                <tr className="table_head">
                  <th colspan="2">从动轴2</th>
                </tr>
                <tr>
                  <td>伺服序号</td>
                  <td>
                    <Select
                      defaultValue="13"
                      disabled={props.isDisabled}
                      className="table_btn2"
                    >
                      {servoSelectOption(servoAmount)}
                    </Select>
                  </td>
                </tr>
                <tr>
                  <td>减速比</td>
                  <td>
                    <Input disabled={props.isDisabled} className="table_btn2" />
                  </td>
                </tr>
                <tr>
                  <td>编码器位数</td>
                  <td>
                    <Input disabled={props.isDisabled} className="table_btn2" />
                  </td>
                </tr>
                <tr>
                  <td>相对主电机方向</td>
                  <td>
                    <Select
                      defaultValue="1"
                      disabled={props.isDisabled}
                      className="table_btn2"
                    >
                      <Option value="1">相同</Option>
                      <Option value="-1">相反</Option>
                    </Select>
                  </td>
                </tr>
              </table>
            </Col>
          </Row>
        </div>
      </TabPane>
    );
  };
  const renderTabs = () => {
    var robotAmount = props.robotAmount;
    if (robotAmount === 1) {
      return (
        <div>
          <div>
            <p style={{ fontSize: 20, width: 120, fontWeight: 500 }}>机器人</p>
          </div>
          <Tabs
            activeKey={state.primaryRobotActiveKey}
            onChange={(key) => {
              setState({ primaryRobotActiveKey: key });
            }}
          >
            <TabPane tab="机器人1" key="robot1">
              <Tabs
                activeKey={state.primaryJointActiveKey}
                size="small"
                onChange={(key) => {
                  setState({ primaryJointActiveKey: key });
                }}
              >
                {primaryTabsContent("robot1", "J1")}
                {primaryTabsContent("robot1", "J2")}
                {primaryTabsContent("robot1", "J3")}
                {primaryTabsContent("robot1", "J4")}
                {primaryTabsContent("robot1", "J5")}
                {primaryTabsContent("robot1", "J6")}
                {primaryTabsContent("robot1", "J7")}
                {primaryTabsContent("robot1", "O1")}
                {primaryTabsContent("robot1", "O2")}
                {primaryTabsContent("robot1", "O3")}
                {primaryTabsContent("robot1", "O4")}
                {primaryTabsContent("robot1", "O5")}
              </Tabs>
            </TabPane>
          </Tabs>
        </div>
      );
    } else if (robotAmount === 2) {
      return (
        <Tabs
          activeKey={state.primaryRobotActiveKey}
          onChange={(key) => {
            setState({ primaryRobotActiveKey: key });
          }}
        >
          <TabPane tab="机器人1" key="robot1">
            <Tabs
              activeKey={state.primaryJointActiveKey}
              size="small"
              onChange={(key) => {
                setState({ primaryJointActiveKey: key });
              }}
            >
              {primaryTabsContent("robot1", "J1")}
              {primaryTabsContent("robot1", "J2")}
              {primaryTabsContent("robot1", "J3")}
              {primaryTabsContent("robot1", "J4")}
              {primaryTabsContent("robot1", "J5")}
              {primaryTabsContent("robot1", "J6")}
              {primaryTabsContent("robot1", "J7")}
              {primaryTabsContent("robot1", "O1")}
              {primaryTabsContent("robot1", "O2")}
              {primaryTabsContent("robot1", "O3")}
              {primaryTabsContent("robot1", "O4")}
              {primaryTabsContent("robot1", "O5")}
            </Tabs>
          </TabPane>
          <TabPane tab="机器人2" key="robot2">
            <Tabs
              activeKey={state.primaryJointActiveKey}
              size="small"
              onChange={(key) => {
                setState({ primaryJointActiveKey: key });
              }}
            >
              {primaryTabsContent("robot2", "J1")}
              {primaryTabsContent("robot2", "J2")}
              {primaryTabsContent("robot2", "J3")}
              {primaryTabsContent("robot2", "J4")}
              {primaryTabsContent("robot2", "J5")}
              {primaryTabsContent("robot2", "J6")}
              {primaryTabsContent("robot2", "J7")}
              {primaryTabsContent("robot2", "O1")}
              {primaryTabsContent("robot2", "O2")}
              {primaryTabsContent("robot2", "O3")}
              {primaryTabsContent("robot2", "O4")}
              {primaryTabsContent("robot2", "O5")}
            </Tabs>
          </TabPane>
        </Tabs>
      );
    } else if (robotAmount === 3) {
      return (
        <Tabs
          activeKey={state.primaryRobotActiveKey}
          onChange={(key) => {
            setState({ primaryRobotActiveKey: key });
          }}
        >
          <TabPane tab="机器人1" key="robot1">
            <Tabs
              activeKey={state.primaryJointActiveKey}
              size="small"
              onChange={(key) => {
                setState({ primaryJointActiveKey: key });
              }}
            >
              {primaryTabsContent("robot1", "J1")}
              {primaryTabsContent("robot1", "J2")}
              {primaryTabsContent("robot1", "J3")}
              {primaryTabsContent("robot1", "J4")}
              {primaryTabsContent("robot1", "J5")}
              {primaryTabsContent("robot1", "J6")}
              {primaryTabsContent("robot1", "J7")}
              {primaryTabsContent("robot1", "O1")}
              {primaryTabsContent("robot1", "O2")}
              {primaryTabsContent("robot1", "O3")}
              {primaryTabsContent("robot1", "O4")}
              {primaryTabsContent("robot1", "O5")}
            </Tabs>
          </TabPane>
          <TabPane tab="机器人2" key="robot2">
            <Tabs
              activeKey={state.primaryJointActiveKey}
              size="small"
              onChange={(key) => {
                setState({ primaryJointActiveKey: key });
              }}
            >
              {primaryTabsContent("robot2", "J1")}
              {primaryTabsContent("robot2", "J2")}
              {primaryTabsContent("robot2", "J3")}
              {primaryTabsContent("robot2", "J4")}
              {primaryTabsContent("robot2", "J5")}
              {primaryTabsContent("robot2", "J6")}
              {primaryTabsContent("robot2", "J7")}
              {primaryTabsContent("robot2", "O1")}
              {primaryTabsContent("robot2", "O2")}
              {primaryTabsContent("robot2", "O3")}
              {primaryTabsContent("robot2", "O4")}
              {primaryTabsContent("robot2", "O5")}
            </Tabs>
          </TabPane>
          <TabPane tab="机器人3" key="robot3">
            <Tabs
              activeKey={state.primaryJointActiveKey}
              size="small"
              onChange={(key) => {
                setState({ primaryJointActiveKey: key });
              }}
            >
              {primaryTabsContent("robot3", "J1")}
              {primaryTabsContent("robot3", "J2")}
              {primaryTabsContent("robot3", "J3")}
              {primaryTabsContent("robot3", "J4")}
              {primaryTabsContent("robot3", "J5")}
              {primaryTabsContent("robot3", "J6")}
              {primaryTabsContent("robot3", "J7")}
              {primaryTabsContent("robot3", "O1")}
              {primaryTabsContent("robot3", "O2")}
              {primaryTabsContent("robot3", "O3")}
              {primaryTabsContent("robot3", "O4")}
              {primaryTabsContent("robot3", "O5")}
            </Tabs>
          </TabPane>
        </Tabs>
      );
    } else if (robotAmount === 4) {
      return (
        <Tabs
          activeKey={state.primaryRobotActiveKey}
          onChange={(key) => {
            setState({ primaryRobotActiveKey: key });
          }}
        >
          <TabPane tab="机器人1" key="robot1">
            <Tabs
              activeKey={state.primaryJointActiveKey}
              size="small"
              onChange={(key) => {
                setState({ primaryJointActiveKey: key });
              }}
            >
              {primaryTabsContent("robot1", "J1")}
              {primaryTabsContent("robot1", "J2")}
              {primaryTabsContent("robot1", "J3")}
              {primaryTabsContent("robot1", "J4")}
              {primaryTabsContent("robot1", "J5")}
              {primaryTabsContent("robot1", "J6")}
              {primaryTabsContent("robot1", "J7")}
              {primaryTabsContent("robot1", "O1")}
              {primaryTabsContent("robot1", "O2")}
              {primaryTabsContent("robot1", "O3")}
              {primaryTabsContent("robot1", "O4")}
              {primaryTabsContent("robot1", "O5")}
            </Tabs>
          </TabPane>
          <TabPane tab="机器人2" key="robot2">
            <Tabs
              activeKey={state.primaryJointActiveKey}
              size="small"
              onChange={(key) => {
                setState({ primaryJointActiveKey: key });
              }}
            >
              {primaryTabsContent("robot2", "J1")}
              {primaryTabsContent("robot2", "J2")}
              {primaryTabsContent("robot2", "J3")}
              {primaryTabsContent("robot2", "J4")}
              {primaryTabsContent("robot2", "J5")}
              {primaryTabsContent("robot2", "J6")}
              {primaryTabsContent("robot2", "J7")}
              {primaryTabsContent("robot2", "O1")}
              {primaryTabsContent("robot2", "O2")}
              {primaryTabsContent("robot2", "O3")}
              {primaryTabsContent("robot2", "O4")}
              {primaryTabsContent("robot2", "O5")}
            </Tabs>
          </TabPane>
          <TabPane tab="机器人3" key="robot3">
            <Tabs
              activeKey={state.primaryJointActiveKey}
              size="small"
              onChange={(key) => {
                setState({ primaryJointActiveKey: key });
              }}
            >
              {primaryTabsContent("robot3", "J1")}
              {primaryTabsContent("robot3", "J2")}
              {primaryTabsContent("robot3", "J3")}
              {primaryTabsContent("robot3", "J4")}
              {primaryTabsContent("robot3", "J5")}
              {primaryTabsContent("robot3", "J6")}
              {primaryTabsContent("robot3", "J7")}
              {primaryTabsContent("robot3", "O1")}
              {primaryTabsContent("robot3", "O2")}
              {primaryTabsContent("robot3", "O3")}
              {primaryTabsContent("robot3", "O4")}
              {primaryTabsContent("robot3", "O5")}
            </Tabs>
          </TabPane>
          <TabPane tab="机器人4" key="robot4">
            <Tabs
              activeKey={state.primaryJointActiveKey}
              size="small"
              onChange={(key) => {
                setState({ primaryJointActiveKey: key });
              }}
            >
              {primaryTabsContent("robot4", "J1")}
              {primaryTabsContent("robot4", "J2")}
              {primaryTabsContent("robot4", "J3")}
              {primaryTabsContent("robot4", "J4")}
              {primaryTabsContent("robot4", "J5")}
              {primaryTabsContent("robot4", "J6")}
              {primaryTabsContent("robot4", "J7")}
              {primaryTabsContent("robot4", "O1")}
              {primaryTabsContent("robot4", "O2")}
              {primaryTabsContent("robot4", "O3")}
              {primaryTabsContent("robot4", "O4")}
              {primaryTabsContent("robot4", "O5")}
            </Tabs>
          </TabPane>
        </Tabs>
      );
    }
  };
  return <div>{renderTabs()}</div>;
}

export default connect(mapStateToProps)(SlaveSetPrimary);
