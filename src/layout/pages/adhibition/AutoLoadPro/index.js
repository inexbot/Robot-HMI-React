import React, { useState } from "react";
import { connect } from "dva";
import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Input,
  Col,
  Row,
  Switch,
  Form,
  Upload,
} from "antd";
import intl from "react-intl-universal";
import ConTitle from "../../../../components/title";
import "./index.css";


const mapStateToProps = (state) => {
  return {
    currentRobot: state.index.robotStatus.currentRobot,
  };
};

function AutoLoadPro(props) {
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
      <ConTitle title={intl.get("程序自启动")} subtitle={intl.get("程序自启动设置")}/>
      {/* 悬浮按钮 */}
      <div className="hoverButton1">
        <Button type={buttontype} shape="circle" size="large" onClick={change}>
          {buttoncharacter}
        </Button>
      </div>
      {/* 主要内容 */}
      <div className="autoLoadpro">
        <Row>
          <Col span={10} className="autoLoad">
            <Form>
              <div>
                <Form.Item
                  name="preRobot"
                  label={intl.get("安全使能")}
                  className="autoLoad_hei"
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
                    style={{ width: 40 }}
                    defaultChecked
                    disabled={isDisabled}
                  />
                </Form.Item>
              </div>
              <div>
                <Form.Item
                  name="L1"
                  label={intl.get("运行速度")}
                  className="autoLoad_hei"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input disabled={isDisabled} />
                </Form.Item>
              </div>
              <div>
                <Form.Item
                  name="L2"
                  label={intl.get("运行次数")}
                  className="autoLoad_hei"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input disabled={isDisabled} />
                </Form.Item>
              </div>
              <div>
                <Form.Item
                  name="L3"
                  label={intl.get("运行程序")}
                  className="autoLoad_hei"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <p>未设置</p>
                </Form.Item>
                
              </div>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col span={2} offset={9}>
            <Button disabled={isDisabled}>取消</Button>
          </Col>
          <Col span={3} offset={1}>
            <Upload>
              <Button type="primary" disabled={isDisabled}>
                <UploadOutlined /> 选择程序
              </Button>
            </Upload>
          </Col>
        </Row>
      </div>
    </div>
  );
}
export default connect(mapStateToProps)(AutoLoadPro);
