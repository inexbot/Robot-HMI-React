import React, { useState } from "react";
import { PageHeader, Button, Col, Row, Select, Tabs } from "antd";
import { router } from "dva";
import intl from "react-intl-universal";
import "./index.css";
import { connect } from "dva";
const { TabPane } = Tabs;

const mapStateToProps = (state) => {
  return {
    currentRobot: state.index.robotStatus.currentRobot,
  };
};

const { Option } = Select;

function Ioremote(props) {
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
  return (
    <div>
      {/* 头部 */}
      <div className="con_title">
        <Row>
          <Col span={18}>
            <PageHeader
              title={intl.get("远程控制")}
              subTitle={intl.get("远程控制设置")}
            />
          </Col>
          <Col span={6} className="ret">
            <Button>
              <router.Link to="/">{intl.get("返回工程")}</router.Link>
            </Button>
          </Col>
        </Row>
      </div>
      {/* 悬浮按钮 */}
      <div className="hoverButton1">
        <Button type={buttontype} shape="circle" size="large" onClick={change}>
          {buttoncharacter}
        </Button>
      </div>
      {/* 主要内容 */}
      <div className="ioremote">
        <Tabs defaultActiveKey="1" style={{ background: "white" }}>
          <TabPane tab={intl.get("机器人1")} key="1">
            <table>
              <thead>
                <tr>
                  <th>{intl.get("功能")}</th>
                  <th>{intl.get("DIN序号")}</th>
                  <th>{intl.get("参数")}</th>
                  <th>{intl.get("备注")}</th>
                </tr>
              </thead>
              <tbody>
                <tr align="center">
                  <td>{intl.get("启动")}</td>
                  <td>
                    <Select defaultValue={intl.get("无")} disabled={isDisabled}>
                      <Option>{intl.get("无")}</Option>
                    </Select>
                  </td>
                  <td>
                    <Select defaultValue="0" disabled={isDisabled}>
                      <Option value="0">0</Option>
                      <Option value="1">1</Option>
                    </Select>
                  </td>
                  <td>{intl.get("机器人1启动")}</td>
                </tr>
                <tr align="center">
                  <td>{intl.get("停止")}</td>
                  <td>
                    <Select defaultValue={intl.get("无")} disabled={isDisabled}>
                      <Option>{intl.get("无")}</Option>
                    </Select>
                  </td>
                  <td>
                    <Select defaultValue="0" disabled={isDisabled}>
                      <Option value="0">0</Option>
                      <Option value="1">1</Option>
                    </Select>
                  </td>
                  <td>{intl.get("机器人1停止")}</td>
                </tr>
                <tr align="center">
                  <td>{intl.get("暂停")}</td>
                  <td>
                    <Select defaultValue={intl.get("无")} disabled={isDisabled}>
                      <Option>{intl.get("无")}</Option>
                    </Select>
                  </td>
                  <td>
                    <Select defaultValue="0" disabled={isDisabled}>
                      <Option value="0">0</Option>
                      <Option value="1">1</Option>
                    </Select>
                  </td>
                  <td>{intl.get("机器人1暂停")}</td>
                </tr>
                <tr align="center">
                  <td>{intl.get("清除报警")}</td>
                  <td>
                    <Select defaultValue={intl.get("无")} disabled={isDisabled}>
                      <Option>{intl.get("无")}</Option>
                    </Select>
                  </td>
                  <td>
                    <Select defaultValue="0" disabled={isDisabled}>
                      <Option value="0">0</Option>
                      <Option value="1">1</Option>
                    </Select>
                  </td>
                  <td>{intl.get("清除机器人1伺服错误")}</td>
                </tr>
                <tr align="center">
                  <td>{intl.get("预约即启动")}</td>
                  <td>
                    <Select defaultValue={intl.get("无")} disabled={isDisabled}>
                      <Option>{intl.get("无")}</Option>
                    </Select>
                  </td>
                  <td>
                    <Select defaultValue="0" disabled={isDisabled}>
                      <Option value="0">0</Option>
                      <Option value="1">1</Option>
                    </Select>
                  </td>
                  <td>{intl.get("预约IO后将自动启运行")}</td>
                </tr>
                <tr align="center">
                  <td>{intl.get("I/O程序")}1</td>
                  <td>
                    <Select defaultValue={intl.get("无")} disabled={isDisabled}>
                      <Option>{intl.get("无")}</Option>
                    </Select>
                  </td>
                  <td>
                    <Select defaultValue="0" disabled={isDisabled}>
                      <Option value="0">0</Option>
                      <Option value="1">1</Option>
                    </Select>
                  </td>
                  <td>{intl.get("设置程序")}</td>
                </tr>
                <tr align="center">
                  <td>{intl.get("I/O程序")}2</td>
                  <td>
                    <Select defaultValue={intl.get("无")} disabled={isDisabled}>
                      <Option>{intl.get("无")}</Option>
                    </Select>
                  </td>
                  <td>
                    <Select defaultValue="0" disabled={isDisabled}>
                      <Option value="0">0</Option>
                      <Option value="1">1</Option>
                    </Select>
                  </td>
                  <td>{intl.get("设置程序")}</td>
                </tr>
                <tr align="center">
                  <td>{intl.get("I/O程序")}3</td>
                  <td>
                    <Select defaultValue={intl.get("无")} disabled={isDisabled}>
                      <Option>{intl.get("无")}</Option>
                    </Select>
                  </td>
                  <td>
                    <Select defaultValue="0" disabled={isDisabled}>
                      <Option value="0">0</Option>
                      <Option value="1">1</Option>
                    </Select>
                  </td>
                  <td>{intl.get("设置程序")}</td>
                </tr>
                <tr align="center">
                  <td>{intl.get("I/O程序")}4</td>
                  <td>
                    <Select defaultValue={intl.get("无")} disabled={isDisabled}>
                      <Option>{intl.get("无")}</Option>
                    </Select>
                  </td>
                  <td>
                    <Select defaultValue="0" disabled={isDisabled}>
                      <Option value="0">0</Option>
                      <Option value="1">1</Option>
                    </Select>
                  </td>
                  <td>{intl.get("设置程序")}</td>
                </tr>
              </tbody>
            </table>
          </TabPane>
          <TabPane tab="机器人2" key="2">
            222
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}
export default connect(mapStateToProps)(Ioremote);
