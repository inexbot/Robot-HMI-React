import React, { useState } from "react";
import { Button, Input, Col, Row, Switch, Radio, Form, Select } from "antd";
import { connect } from "dva";
import intl from "react-intl-universal";
import ConTitle from "components/title";
import "./user.css";

const mapStateToProps = state => {
  return {
    currentRobot: state.index.robotStatus.currentRobot,
  };
};

const { Option } = Select;

function User(props) {
  const [isDisabled, setIsDisabled] = useState(true);
  const [buttoncharacter, setButtonCharacter] = useState(intl.get("修改"));
  const [buttontype, setButtontype] = useState("primary");
  const change = () => {
    if (isDisabled === true) {
      setIsDisabled(false);
      setButtonCharacter(intl.get("保存"));
      setButtontype("dashed");
    }
    else {
      setIsDisabled(true);
      setButtonCharacter(intl.get("修改"));
      setButtontype("primary");
    }
  }
  return (
    <div>
      {/* 头部 */}
      <ConTitle title={intl.get("复位点")} subtitle={intl.get("复位点设置")}/>
      {/* 悬浮按钮 */}
      <div className="hoverButton1">
        <Button
          type={buttontype}
          shape="circle"
          size="large"
          onClick={change}
        >
          {buttoncharacter}
        </Button>
      </div>
      {/* 主要内容 */}
      <div className="User">
        <Row>
          <Col span={16} >
            <table>
              <thead>
                <tr>
                  <th>{intl.get("轴/外部轴")}</th>
                  <th>{intl.get("复位点位置")}</th>
                  <th>{intl.get("当前位置")}</th>
                  <th>{intl.get("安全点范围")}</th>
                </tr>
              </thead>
              <tbody>
                <tr align="center">
                  <td>S</td>
                  <td>123456.7895456</td>
                  <td>123456.7895456</td>
                  <td><Input disabled={isDisabled} /></td>
                </tr>
                <tr align="center">
                  <td>L</td>
                  <td>123456.7895456</td>
                  <td>123456.7895456</td>
                  <td><Input disabled={isDisabled} /></td>
                </tr>
                <tr align="center">
                  <td>U</td>
                  <td>123456.7895456</td>
                  <td>123456.7895456</td>
                  <td><Input disabled={isDisabled} /></td>
                </tr>
                <tr align="center">
                  <td>R</td>
                  <td>0</td>
                  <td>0</td>
                  <td><Input disabled={isDisabled} /></td>
                </tr>
                <tr align="center">
                  <td>B</td>
                  <td>0</td>
                  <td>0</td>
                  <td><Input disabled={isDisabled} /></td>
                </tr>
                <tr align="center">
                  <td>T</td>
                  <td>0</td>
                  <td>0</td>
                  <td><Input disabled={isDisabled} /></td>
                </tr>
                <tr align="center">
                  <td>O1（{intl.get("外部轴")}）</td>
                  <td>0</td>
                  <td>0</td>
                  <td><Input disabled={isDisabled} /></td>
                </tr>
                <tr align="center">
                  <td>O2（{intl.get("外部轴")}）</td>
                  <td>0</td>
                  <td>0</td>
                  <td><Input disabled={isDisabled} /></td>
                </tr>
                <tr align="center">
                  <td>O3（{intl.get("外部轴")}）</td>
                  <td>0</td>
                  <td>0</td>
                  <td><Input disabled={isDisabled} /></td>
                </tr>
              </tbody>
            </table>
          </Col>
          <Col span={8} style={{paddingLeft:10}}>
            <div className="user2">
              <p className="p1" style={{ paddingTop: 10 }}>{intl.get("复位点")}：</p>
              <Radio.Group defaultValue="1" buttonStyle="solid">
                <Radio.Button value="1" disabled={isDisabled}>1</Radio.Button>
                <Radio.Button value="2" disabled={isDisabled}>2</Radio.Button>
                <Radio.Button value="3" disabled={isDisabled}>3</Radio.Button>
                <Radio.Button value="4" disabled={isDisabled}>4</Radio.Button>
                <Radio.Button value="5" disabled={isDisabled}>5</Radio.Button>
              </Radio.Group>
            </div>
            <div>
              <Form.Item
                name="preRobot"
                label={intl.get("安全使能")}
                className="user1"
                rules={[
                  {
                    required: true
                  }
                ]}
              >
                <Switch checkedChildren="开" unCheckedChildren="关" style={{ width: 40 }} defaultChecked disabled={isDisabled} />
              </Form.Item>
            </div>
            <div>
              <Form.Item
                name="preRobot"
                label={intl.get("参数")}
                className="user1"
                rules={[
                  {
                    required: true
                  }
                ]}
              >
                <Select disabled={isDisabled} >
                  <Option value="tool1">工具手1</Option>
                  <Option value="tool2">工具手2</Option>
                  <Option value="tool3">工具手3</Option>
                  <Option value="tool4">工具手4</Option>
                  <Option value="tool5">工具手5</Option>
                  <Option value="tool6">工具手6</Option>
                </Select>
              </Form.Item>
            </div>
            <div>
              <Form.Item
                name="preRobot"
                className="user1"
                label={intl.get("开始DIN")}
                rules={[
                  {
                    required: true
                  }
                ]}
              >
                <Select disabled={isDisabled} >
                  <Option value="D001">D001</Option>
                  <Option value="D002">D002</Option>
                  <Option value="D003">D003</Option>
                  <Option value="D004">D004</Option>
                  <Option value="D005">D005</Option>
                  <Option value="D006">D006</Option>
                </Select>
              </Form.Item>
            </div>
            <div>
              <Form.Item
                name="preRobot"
                className="user1"
                label={intl.get("结束DOUT")}
                rules={[
                  {
                    required: true
                  }
                ]}
              >
                <Select disabled={isDisabled} >
                  <Option value="D001">D001</Option>
                  <Option value="D002">D002</Option>
                  <Option value="D003">D003</Option>
                  <Option value="D004">D004</Option>
                  <Option value="D005">D005</Option>
                  <Option value="D006">D006</Option>
                </Select>
              </Form.Item>
            </div>
          </Col>
        </Row>
      </div>
    </div >
  );
}
export default connect(mapStateToProps)(User)