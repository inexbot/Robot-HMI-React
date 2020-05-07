import React from "react";
import { connect } from "dva";
import {
  Button,
  Col,
  Input,
  Tabs,
  Row,
  Form,
  Select,
  Switch,
} from "antd";
import intl from "react-intl-universal";
import ConTitle from "../../../../components/title";
import "./index.css";

const { TabPane } = Tabs;
const { Option } = Select;

const mapStateToProps = (state) => {
  return {
    currentRobot: state.index.robotStatus.currentRobot,
  };
};

function Dynami(props) {
  return (
    <div>
      {/* 头部 */}
      <ConTitle
        title={intl.get("动力学")}
        subtitle={intl.get("动力学参数设置")}
      />

      {/* 主要内容 */}
      <div className="dynamic">
        <Tabs defaultActiveKey="1" style={{ background: "white" }}>
          <TabPane tab="动力学参数" key="1">
            <div className="dynamic1">
              <Form>
                <Form.Item
                  name="当前使用方法"
                  label={intl.get("当前使用方法")}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Select>
                    <Option value="bianshi">{intl.get("辨识")}</Option>
                    <Option value="shoutian">{intl.get("手填")}</Option>
                  </Select>
                </Form.Item>
                <Button type="primary">进入辨识</Button>
              </Form>
            </div>
          </TabPane>
          <TabPane tab="NP参数" key="2">
            <Row>
              <Col span={10} offset={3}>
                <Form>
                  <Form.Item
                    name="L1"
                    label={intl.get("碰撞检测阈值R1")}
                    className="Dhpara_hei"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    name="L2"
                    label={intl.get("碰撞检测阈值R2")}
                    className="Dhpara_hei"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="L3"
                    label={intl.get("碰撞检测阈值R3")}
                    className="Dhpara_hei"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="L4"
                    label={intl.get("碰撞检测阈值R4")}
                    className="Dhpara_hei"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="L5"
                    label={intl.get("碰撞检测阈值R5")}
                    className="Dhpara_hei"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="L6"
                    label={intl.get("碰撞检测阈值R6")}
                    className="Dhpara_hei"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Form>
              </Col>
              <Col span={10} offset={1}>
                <Form.Item
                  name="preRobot"
                  label={intl.get("拖动示教")}
                  className="dynamic2"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Switch
                    checkedChildren="开"
                    unCheckedChildren="关"
                    style={{ width: 40 }}
                    defaultChecked
                  />
                </Form.Item>
                <Form.Item
                  name="preRobot"
                  label={intl.get("碰撞示教")}
                  className="dynamic2"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Switch
                    checkedChildren="开"
                    unCheckedChildren="关"
                    style={{ width: 40 }}
                    defaultChecked
                  />
                </Form.Item>
                <Button type="primary" style={{ margin: 20 }}>
                  {intl.get("碰撞清除")}
                </Button>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(Dynami);
