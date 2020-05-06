import React, { useState } from "react";
import { Button, Col, Tabs, Card, Row } from "antd";
import { router } from "dva";
import { connect } from "dva";
import intl from "react-intl-universal";
import ConTitle from "../../../../components/title";
import "./outercalibrate.css";

const { TabPane } = Tabs;

const mapStateToProps = (state) => {
  return {
    robotAmount: state.index.robotStatus.robotAmount,
    outerActivedRobot: state.index.robotStatus.outerActivedRobot,
    outerActivedOuter: state.index.robotStatus.outerActivedOuter,
    robot1OuterAmount: state.index.robotStatus.robot1OuterAmount,
    robot2OuterAmount: state.index.robotStatus.robot2OuterAmount,
    robot3OuterAmount: state.index.robotStatus.robot3OuterAmount,
    robot4OuterAmount: state.index.robotStatus.robot4OuterAmount,
  };
};

function OuterCalibrate(props) {
  const [isDisabled, setIsDisabled] = useState(true);
  const [buttonCharacter, setButtonCharacter] = useState("修改");
  const [buttonType, setButtonType] = useState("primary");
  const change = () => {
    if (isDisabled === true) {
      setIsDisabled(false);
      setButtonCharacter("保存");
      setButtonType("dashed");
    } else {
      setIsDisabled(true);
      setButtonCharacter("修改");
      setButtonType("primary");
    }
  };
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
        <div>
          <Row>
            <Col span={13} offset={2}>
              <table>
                <tbody>
                  <tr>
                    <td>{intl.get("外部轴1类型")}</td>
                    <td>{intl.get("双轴翻转台")}</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>{intl.get("外部轴2类型")}</td>
                    <td>{intl.get("双轴翻转台")}</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>{intl.get("外部轴3类型")}</td>
                    <td>{intl.get("地轨")}</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>{intl.get("外部轴1标定状态")}</td>
                    <td>{intl.get("已标定")}</td>
                    <td>
                      <Button disabled={isDisabled} type="primary">
                        <router.Link to="/OuterCalibrate/turning">
                          {intl.get("标 定")}
                        </router.Link>
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td>{intl.get("外部轴2标定状态")}</td>
                    <td>{intl.get("已标定")}</td>
                    <td>
                      <Button disabled={isDisabled} type="primary">
                        <router.Link to="/OuterCalibrate/turning">
                          {intl.get("标 定")}
                        </router.Link>
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td>{intl.get("外部轴1标定状态")}</td>
                    <td>{intl.get("已标定")}</td>
                    <td>
                      <Button disabled={isDisabled} type="primary">
                        <router.Link to="/OuterCalibrate/turning">
                          {intl.get("标 定")}
                        </router.Link>
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Col>
            <Col span={8}>
              <Card title={intl.get("注意")}>
                <p>
                  {intl.get(
                    "当前每台机器人仅支持1个地轨，且仅支持设置为外部轴1或外部轴3。"
                  )}
                </p>
                <p>
                  {intl.get(
                    "当前仅支持一个双轴翻转台或一个单轴旋转台或一个单轴翻转台。"
                  )}
                </p>
                <p>
                  {intl.get(
                    "当有3个外部轴时，仅可设置为一个双轴翻转台和一个地轨。"
                  )}
                </p>
              </Card>
            </Col>
          </Row>
        </div>
      </TabPane>
    );
  };

  const rendertabs = () => {
    var robotAmount = props.robotAmount;
    if (robotAmount === 1) {
      return (
        <Tabs
          activeKey={props.outerActivedRobot}
          onChange={(key) => {
            this.props.dispatch({
              type: "index/changeOuterActivedRobot",
              data: {
                outerActivedRobot: key,
              },
            });
          }}
        >
          {tabsContent("robot1")}
        </Tabs>
      );
    } else if (robotAmount === 2) {
      return (
        <Tabs
          activeKey={props.outerActivedRobot}
          onChange={(key) => {
            props.dispatch({
              type: "index/changeOuterActivedRobot",
              data: {
                outerActivedRobot: key,
              },
            });
          }}
        >
          {tabsContent("robot1")}
          {tabsContent("robot2")}
        </Tabs>
      );
    } else if (robotAmount === 3) {
      return (
        <Tabs
          activeKey={props.outerActivedRobot}
          onChange={(key) => {
            props.dispatch({
              type: "index/changeOuterActivedRobot",
              data: {
                outerActivedRobot: key,
              },
            });
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
          activeKey={props.outerActivedRobot}
          onChange={(key) => {
            props.dispatch({
              type: "index/changeOuterActivedRobot",
              data: {
                outerActivedRobot: key,
              },
            });
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
      {/* 头部 */}
      <ConTitle
        title={intl.get("外部轴标定")}
        subtitle={intl.get("在这里对外部轴，包括变位机、地轨等进行标定")}
      />
      {/* 悬浮按钮 */}
      <div className="hoverButton1">
        <Button type={buttonType} shape="circle" size="large" onClick={change}>
          {buttonCharacter}
        </Button>
      </div>
      {/* 主要内容 */}
      <div className="outerCalibrate">{rendertabs()}</div>
    </div>
  );
}

export default connect(mapStateToProps)(OuterCalibrate);
