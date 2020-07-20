import React, { useState } from "react";
import {
  Button,
  Input,
  Col,
  Row,
  Switch,
  Form,
  Select,
} from "antd";
import { connect } from "dva";
import intl from "react-intl-universal";
import ConTitle from "../../../../components/title";
import "./index.css";

const mapStateToProps = (state) => {
  return {
    currentRobot: state.index.robotStatus.currentRobot,
  };
};

const { Option } = Select;

function InterferenceRegion(props) {
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
      <ConTitle title={intl.get("复位点")} subtitle={intl.get("复位点设置")}/>
      {/* 悬浮按钮 */}
      <div className="hoverButton1">
        <Button type={buttontype} shape="circle" size="large" onClick={change}>
          {buttoncharacter}
        </Button>
      </div>
      {/* 主要内容 */}
      <div className="interferenceRegion">
        <Row>
          <Col span={16}>
            <p style={{ height: 20 }}> </p>
            <table>
              <thead>
                <tr>
                  <th>{intl.get("参数")}</th>
                  <th>{intl.get("值")}</th>
                  <th>{intl.get("操作")}</th>
                </tr>
              </thead>
              <tbody>
                <tr align="center">
                  <td>X{intl.get("轴最大值")}</td>
                  <td>
                    <Input disabled={isDisabled} />
                  </td>
                  <td>
                    <Button disabled={isDisabled}>标记</Button>
                  </td>
                </tr>
                <tr align="center">
                  <td>X{intl.get("轴最小值")}</td>
                  <td>
                    <Input disabled={isDisabled} />
                  </td>
                  <td>
                    <Button disabled={isDisabled}>标记</Button>
                  </td>
                </tr>
                <tr align="center">
                  <td>Y{intl.get("轴最大值")}</td>
                  <td>
                    <Input disabled={isDisabled} />
                  </td>
                  <td>
                    <Button disabled={isDisabled}>标记</Button>
                  </td>
                </tr>
                <tr align="center">
                  <td>Y{intl.get("轴最小值")}</td>
                  <td>
                    <Input disabled={isDisabled} />
                  </td>
                  <td>
                    <Button disabled={isDisabled}>标记</Button>
                  </td>
                </tr>
                <tr align="center">
                  <td>Z{intl.get("轴最大值")}</td>
                  <td>
                    <Input disabled={isDisabled} />
                  </td>
                  <td>
                    <Button disabled={isDisabled}>标记</Button>
                  </td>
                </tr>
                <tr align="center">
                  <td>Z{intl.get("轴最小值")}</td>
                  <td>
                    <Input disabled={isDisabled} />
                  </td>
                  <td>
                    <Button disabled={isDisabled}>标记</Button>
                  </td>
                </tr>
                <tr align="center">
                  <td>{intl.get("输出IO")}</td>
                  <td>
                    <Input disabled={isDisabled} />
                  </td>
                  <td>
                    <Button disabled={isDisabled}>标记</Button>
                  </td>
                </tr>
              </tbody>
            </table>
            <p className="annotation">
              {intl.get("*进入干涉区后，输出IO（单位：mm）")}
            </p>
          </Col>
          <Col span={7}>
          <p style={{ height: 20 }}> </p>
            <div>
              <Form.Item
                name="preRobot"
                className="user1"
                label={intl.get("工艺号")}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select disabled={isDisabled}>
                  <Option value="Tool1">{intl.get("工具手")}1</Option>
                  <Option value="Tool2">{intl.get("工具手")}2</Option>
                  <Option value="Tool3">{intl.get("工具手")}3</Option>
                  <Option value="Tool4">{intl.get("工具手")}4</Option>
                  <Option value="Tool5">{intl.get("工具手")}5</Option>
                  <Option value="Tool6">{intl.get("工具手")}6</Option>
                </Select>
              </Form.Item>
            </div>
            <div>
              <Form.Item
                name="preRobot"
                label={intl.get("干涉区使能")}
                className="user1"
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
          </Col>
        </Row>
      </div>
    </div>
  );
}
export default connect(mapStateToProps)(InterferenceRegion);
