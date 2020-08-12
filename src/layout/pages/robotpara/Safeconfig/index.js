import React, { useState, useEffect } from "react";
import { connect } from "dva";
// import { sendMSGtoController } from "service/network";
import {
  Button,
  Tabs,
  Input,
  Form,
  Select,
  Card,
  Switch,
  Row,
  Col,
  Slider,
  InputNumber,
} from "antd";
import intl from "react-intl-universal";
import ConTitle from "components/title";
import "../Jointpara/index.css";
const { Option } = Select;
const { TabPane } = Tabs;

const mapStateToProps = (state) => {
  return {
    jointPara: state.index.robotParameter.jointPara,
    currentRobotType: state.index.robotStatus.currentRobotType,
    currentRobot: state.index.robotStatus.currentRobot,
  };
};

function SafeConfig(props) {
  const [isDisabled, setIsDisabled] = useState(true);
  const [buttonCharacter1, setButtonCharacter1] = useState("修改");
  const [buttonType1, setButtonType1] = useState("primary");
  const [disabled1, setDisabled1] = useState(true);
  const [disabled2, setDisabled2] = useState(true);
  const [inputValue1, setInputValue1] = useState(1);
  const [inputValue2, setInputValue2] = useState(1);
  const change = () => {
    if (isDisabled === true) {
      setIsDisabled(false);
      setButtonCharacter1("保存");
      setButtonType1("dashed");
    } else {
      setIsDisabled(true);
      setButtonCharacter1("修改");
      setButtonType1("primary");
    }
  };
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      forceInput: 11,
    });
  }, [form]);
  const switch1 = (checked) => {
    if (checked === true) {
      setDisabled1(false);
    } else {
      setDisabled1(true);
    }
  };
  const switch2 = (checked) => {
    if (checked === true) {
      setDisabled2(false);
    } else {
      setDisabled2(true);
    }
  };
  const onChange1 = (value) => {
    setInputValue1(value);
  };
  const onChange2 = (value) => {
    setInputValue2(value);
  };
  return (
    <div>
      {/* 头部 */}
      <ConTitle
        title={intl.get("安全配置")}
        subtitle="协作机器人安全配置"
      />
      {/* 悬浮按钮 */}
      <div className="hoverButton1">
        <Button type={buttonType1} shape="circle" size="large" onClick={change}>
          {buttonCharacter1}
        </Button>
      </div>
      {/* 主要内容 */}
      <div className="jogspeed">
        <Form form={form}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="缩减模式" key="1" className="jog_tab">
              <div>
                <Card title={`第一级减速设置`}>
                  <Row>
                    <Col span={12}>
                      <Form.Item name="switch1" label="启用" valuePropName='checked'>
                        <Switch onClick={switch1} />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item name="Dout1" label="生效输出Dout">
                        <Select style={{ width: "200px" }} disabled={disabled1}>
                          <Option value="Dout1-1">Dout1-1</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={12}>
                      <Form.Item name="Input1" label="输入DIN">
                        <Select style={{ width: "200px" }} disabled={disabled1}>
                          <Option value="DIN1-1">DIN1-1</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="maxSpeed1"
                        label="空间最大速度"
                        help="mm/s"
                      >
                        <Input
                          style={{ width: "200px" }}
                          disabled={disabled1}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Card>
                <Card title={`第二级减速设置`}>
                  <Row>
                    <Col span={12}>
                      <Form.Item name="switch2" label="启用" valuePropName='checked'>
                        <Switch onClick={switch2} disabled={disabled1} />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item name="Dout2" label="生效输出Dout">
                        <Select style={{ width: "200px" }} disabled={disabled2}>
                          <Option value="Dout1-2">Dout1-2</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={12}>
                      <Form.Item name="Input2" label="输入DIN">
                        <Select style={{ width: "200px" }} disabled={disabled2}>
                          <Option value="DIN1-2">DIN1-2</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="maxSpeed2"
                        label="空间最大速度"
                        help="mm/s"
                      >
                        <Input
                          style={{ width: "200px" }}
                          disabled={disabled2}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Card>
              </div>
            </TabPane>
            <TabPane tab="碰撞检测" key="2">
              <div style={{ height: "450px", overflow: "scroll" }}>
                <Card title="运动碰撞检测">
                  <Form.Item name="touch1switch" label="开关" valuePropName='checked'>
                    <Switch />
                  </Form.Item>

                  <Row>
                    <Col span={12}>
                      <Form.Item name="sensiticity1" label="灵敏度">
                        <Slider
                          min={1}
                          max={100}
                          onChange={onChange1}
                          value={
                            typeof inputValue1 === "number" ? inputValue1 : 0
                          }
                        />
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                      <Form.Item name="sensiticity1">
                        <InputNumber
                          style={{ marginLeft: 16 }}
                          value={inputValue1}
                          onChange={onChange1}
                          max={100}
                          min={1}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Card>
                <Card title="点动碰撞检测">
                  <Form.Item name="touch2switch" label="开关" valuePropName='checked'>
                    <Switch />
                  </Form.Item>
                  <Row>
                    <Col span={12}>
                      <Form.Item name="sensiticity2" label="灵敏度">
                        <Slider
                          min={1}
                          max={100}
                          onChange={onChange2}
                          value={
                            typeof inputValue2 === "number" ? inputValue2 : 0
                          }
                        />
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                      <Form.Item name="sensiticity2">
                        <InputNumber
                          style={{ marginLeft: 16 }}
                          value={inputValue2}
                          onChange={onChange2}
                          max={100}
                          min={1}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Card>
                <Card title="碰撞回退与自恢复">
                  <Row>
                    <Col span={12}>
                      <Form.Item name="backSwitch" label="碰撞回退开关" valuePropName='checked'>
                        <Switch />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="backTime"
                        label="碰撞回退缓存时间"
                        help="25ms~500ms"
                      >
                        <InputNumber />
                      </Form.Item>
                      <Form.Item name="backStatus" label="碰撞后电机状态">
                        <Select style={{ width: "200px" }}>
                          <Option value="on">使能</Option>
                          <Option value="off">下电</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={12}>
                      <Form.Item name="recoverSwitch" label="碰撞自恢复开关" valuePropName='checked'>
                        <Switch />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="recoverTime"
                        label="碰撞后自恢复时间"
                        help="1~5s"
                      >
                        <InputNumber />
                      </Form.Item>
                    </Col>
                  </Row>
                </Card>
              </div>
            </TabPane>
          </Tabs>
        </Form>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(SafeConfig);
