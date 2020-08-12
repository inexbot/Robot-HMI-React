import React, { useState } from "react";
import { PageHeader, Button, Col, Row, Switch, Form, Select, Tabs } from "antd";
import { router } from "dva";
import intl from "react-intl-universal";
// import "./user.css";
import { connect } from "dva";
const { TabPane } = Tabs;

const mapStateToProps = (state) => {
  return {
    currentRobot: state.index.robotStatus.currentRobot,
  };
};

const { Option } = Select;

function IOReset(props) {
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
              title={intl.get("IO设置")}
              subTitle={intl.get("IO设置")}
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
      <div className="IOReset">
        <Tabs defaultActiveKey="1">
          <TabPane tab="IO复位" key="1">
            <div>
              <Row>
                <Col span={6} offset={3}>
                  <Select disabled={isDisabled} defaultValue="IO板1">
                    <Option value="IO板1">IO板1</Option>
                  </Select>
                </Col>
                <Col span={6}>
                  <Select disabled={isDisabled} defaultValue="R001">
                    <Option value="R001">{intl.get("机器人1")}</Option>
                  </Select>
                </Col>
                <Col span={6}>
                  <Form>
                    <Form.Item
                      name="preRobot"
                      label={intl.get("碰撞示教")}
                      className="dynamic2"
                      valuePropName='checked'
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Switch
                        checkedChildren="开"
                        unCheckedChildren="关"
                        disabled={isDisabled}
                        style={{ width: 40 }}
                        defaultChecked
                      />
                    </Form.Item>
                  </Form>
                </Col>
              </Row>
            </div>
            <Row>
              <Col span={12}>
                <table>
                  <thead>
                    <tr>
                      <th>{intl.get("IO端口")}</th>
                      <th>{intl.get("复位值")}</th>
                      <th>{intl.get("是否复位")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr align="center">
                      <td>1-1</td>
                      <td>
                        <Select disabled={isDisabled} defaultValue="0">
                          <Option value="0">0</Option>
                          <Option value="1">1</Option>
                        </Select>
                      </td>
                      <td>
                        <Switch
                          checkedChildren="开"
                          unCheckedChildren="关"
                          disabled={isDisabled}
                          style={{ width: 40 }}
                          defaultChecked
                        />
                      </td>
                    </tr>
                    <tr align="center">
                      <td>1-2</td>
                      <td>
                        <Select disabled={isDisabled} defaultValue="0">
                          <Option value="0">0</Option>
                          <Option value="1">1</Option>
                        </Select>
                      </td>
                      <td>
                        <Switch
                          checkedChildren="开"
                          unCheckedChildren="关"
                          disabled={isDisabled}
                          style={{ width: 40 }}
                          defaultChecked
                        />
                      </td>
                    </tr>
                    <tr align="center">
                      <td>1-3</td>
                      <td>
                        <Select disabled={isDisabled} defaultValue="0">
                          <Option value="0">0</Option>
                          <Option value="1">1</Option>
                        </Select>
                      </td>
                      <td>
                        <Switch
                          checkedChildren="开"
                          unCheckedChildren="关"
                          disabled={isDisabled}
                          style={{ width: 40 }}
                          defaultChecked
                        />
                      </td>
                    </tr>
                    <tr align="center">
                      <td>1-4</td>
                      <td>
                        <Select disabled={isDisabled} defaultValue="0">
                          <Option value="0">0</Option>
                          <Option value="1">1</Option>
                        </Select>
                      </td>
                      <td>
                        <Switch
                          checkedChildren="开"
                          unCheckedChildren="关"
                          disabled={isDisabled}
                          style={{ width: 40 }}
                          defaultChecked
                        />
                      </td>
                    </tr>
                    <tr align="center">
                      <td>1-5</td>
                      <td>
                        <Select disabled={isDisabled} defaultValue="0">
                          <Option value="0">0</Option>
                          <Option value="1">1</Option>
                        </Select>
                      </td>
                      <td>
                        <Switch
                          checkedChildren="开"
                          unCheckedChildren="关"
                          disabled={isDisabled}
                          style={{ width: 40 }}
                          defaultChecked
                        />
                      </td>
                    </tr>
                    <tr align="center">
                      <td>1-6</td>
                      <td>
                        <Select disabled={isDisabled} defaultValue="0">
                          <Option value="0">0</Option>
                          <Option value="1">1</Option>
                        </Select>
                      </td>
                      <td>
                        <Switch
                          checkedChildren="开"
                          unCheckedChildren="关"
                          disabled={isDisabled}
                          style={{ width: 40 }}
                          defaultChecked
                        />
                      </td>
                    </tr>
                    <tr align="center">
                      <td>1-7</td>
                      <td>
                        <Select disabled={isDisabled} defaultValue="0">
                          <Option value="0">0</Option>
                          <Option value="1">1</Option>
                        </Select>
                      </td>
                      <td>
                        <Switch
                          checkedChildren="开"
                          unCheckedChildren="关"
                          disabled={isDisabled}
                          style={{ width: 40 }}
                          defaultChecked
                        />
                      </td>
                    </tr>
                    <tr align="center">
                      <td>1-8</td>
                      <td>
                        <Select disabled={isDisabled} defaultValue="0">
                          <Option value="0">0</Option>
                          <Option value="1">1</Option>
                        </Select>
                      </td>
                      <td>
                        <Switch
                          checkedChildren="开"
                          unCheckedChildren="关"
                          disabled={isDisabled}
                          style={{ width: 40 }}
                          defaultChecked
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Col>
              <Col span={12}>
                <table>
                  <thead>
                    <tr>
                      <th>{intl.get("IO端口")}</th>
                      <th>{intl.get("复位值")}</th>
                      <th>{intl.get("是否复位")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr align="center">
                      <td>1-9</td>
                      <td>
                        <Select disabled={isDisabled} defaultValue="0">
                          <Option value="0">0</Option>
                          <Option value="1">1</Option>
                        </Select>
                      </td>
                      <td>
                        <Switch
                          checkedChildren="开"
                          unCheckedChildren="关"
                          disabled={isDisabled}
                          style={{ width: 40 }}
                          defaultChecked
                        />
                      </td>
                    </tr>
                    <tr align="center">
                      <td>1-10</td>
                      <td>
                        <Select disabled={isDisabled} defaultValue="0">
                          <Option value="0">0</Option>
                          <Option value="1">1</Option>
                        </Select>
                      </td>
                      <td>
                        <Switch
                          checkedChildren="开"
                          unCheckedChildren="关"
                          disabled={isDisabled}
                          style={{ width: 40 }}
                          defaultChecked
                        />
                      </td>
                    </tr>
                    <tr align="center">
                      <td>1-11</td>
                      <td>
                        <Select disabled={isDisabled} defaultValue="0">
                          <Option value="0">0</Option>
                          <Option value="1">1</Option>
                        </Select>
                      </td>
                      <td>
                        <Switch
                          checkedChildren="开"
                          unCheckedChildren="关"
                          disabled={isDisabled}
                          style={{ width: 40 }}
                          defaultChecked
                        />
                      </td>
                    </tr>
                    <tr align="center">
                      <td>1-12</td>
                      <td>
                        <Select disabled={isDisabled} defaultValue="0">
                          <Option value="0">0</Option>
                          <Option value="1">1</Option>
                        </Select>
                      </td>
                      <td>
                        <Switch
                          checkedChildren="开"
                          unCheckedChildren="关"
                          disabled={isDisabled}
                          style={{ width: 40 }}
                          defaultChecked
                        />
                      </td>
                    </tr>
                    <tr align="center">
                      <td>1-13</td>
                      <td>
                        <Select disabled={isDisabled} defaultValue="0">
                          <Option value="0">0</Option>
                          <Option value="1">1</Option>
                        </Select>
                      </td>
                      <td>
                        <Switch
                          checkedChildren="开"
                          unCheckedChildren="关"
                          disabled={isDisabled}
                          style={{ width: 40 }}
                          defaultChecked
                        />
                      </td>
                    </tr>
                    <tr align="center">
                      <td>1-14</td>
                      <td>
                        <Select disabled={isDisabled} defaultValue="0">
                          <Option value="0">0</Option>
                          <Option value="1">1</Option>
                        </Select>
                      </td>
                      <td>
                        <Switch
                          checkedChildren="开"
                          unCheckedChildren="关"
                          disabled={isDisabled}
                          style={{ width: 40 }}
                          defaultChecked
                        />
                      </td>
                    </tr>
                    <tr align="center">
                      <td>1-15</td>
                      <td>
                        <Select disabled={isDisabled} defaultValue="0">
                          <Option value="0">0</Option>
                          <Option value="1">1</Option>
                        </Select>
                      </td>
                      <td>
                        <Switch
                          checkedChildren="开"
                          unCheckedChildren="关"
                          disabled={isDisabled}
                          style={{ width: 40 }}
                          defaultChecked
                        />
                      </td>
                    </tr>
                    <tr align="center">
                      <td>1-16</td>
                      <td>
                        <Select disabled={isDisabled} defaultValue="0">
                          <Option value="0">0</Option>
                          <Option value="1">1</Option>
                        </Select>
                      </td>
                      <td>
                        <Switch
                          checkedChildren="开"
                          unCheckedChildren="关"
                          disabled={isDisabled}
                          style={{ width: 40 }}
                          defaultChecked
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Col>
            </Row>
          </TabPane>
          <TabPane tab="切模式停止" key="2"></TabPane>
          <TabPane tab="程序报错停止" key="3"></TabPane>
        </Tabs>
      </div>
    </div>
  );
}
export default connect(mapStateToProps)(IOReset);
