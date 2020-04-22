import React, { useState } from "react";
import { Button, Col, Input, Select, Row } from "antd";
import intl from "react-intl-universal";
import ConTitle from "components/title";
import "./toolhands.css";

const { Option } = Select;

function Toolhands(props) {
  const [isDisabled, setIsDisabled] = useState(true);
  const [buttonCharacter1, setButtonCharacter1] = useState("修改");
  const [buttonType1, setButtonType1] = useState("primary");
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
  return (
    <div>
      {/* 头部 */}
      <ConTitle title={intl.get("工具手")} subtitle={intl.get("工具手设置")} />
      {/* 悬浮按钮 */}
      <div className="hoverButton1">
        <Button type={buttonType1} shape="circle" size="large" onClick={change}>
          {buttonCharacter1}
        </Button>
      </div>

      <div className="linkButton">
        <Button type="dashed">{intl.get("7点标定")}</Button>
        <Button type="dashed">{intl.get("20点标定")}</Button>
      </div>

      {/* 主要内容 */}
      <div className="Toolhands">
        <Row style={{width:"100%"}}>
          <Col span={20} offset={2}>
            <div style={{ paddingBottom: 10 }}>
              <div>
                <span>{intl.get("选择工具手")}:</span>
                <Select
                  defaultValue="无"
                  style={{ width: 200, margin: 20 }}
                  disabled={isDisabled}
                >
                  <Option value="tool0">{intl.get("无")}</Option>
                  <Option value="tool1">{intl.get("工具手")}1</Option>
                  <Option value="tool2">{intl.get("工具手")}2</Option>
                  <Option value="tool3">{intl.get("工具手")}3</Option>
                  <Option value="tool4">{intl.get("工具手")}4</Option>
                  <Option value="tool5">{intl.get("工具手")}5</Option>
                  <Option value="tool6">{intl.get("工具手")}6</Option>
                  <Option value="tool7">{intl.get("工具手")}7</Option>
                  <Option value="tool8">{intl.get("工具手")}8</Option>
                  <Option value="tool9">{intl.get("工具手")}9</Option>
                </Select>
              </div>
              <p>
                <Button
                  style={{ width: 160 }}
                  type="primary"
                  disabled={isDisabled}
                >
                  {intl.get("选中")}
                </Button>
              </p>
            </div>
            <div className="tooltab">
              <table>
                <tr align="center">
                  <td>X{intl.get("轴方向偏移")}</td>
                  <td>
                    <Input
                      style={{ width: "180px" }}
                      defaultValue="0"
                      disabled={isDisabled}
                    />
                  </td>
                  <td>mm</td>
                </tr>
                <tr align="center">
                  <td>Y{intl.get("轴方向偏移")}</td>
                  <td>
                    <Input
                      style={{ width: "180px" }}
                      defaultValue="0"
                      disabled={isDisabled}
                    />
                  </td>
                  <td>mm</td>
                </tr>
                <tr align="center">
                  <td>Z{intl.get("轴方向偏移")}</td>
                  <td>
                    <Input
                      style={{ width: "180px" }}
                      defaultValue="0"
                      disabled={isDisabled}
                    />
                  </td>
                  <td>mm</td>
                </tr>
                <tr align="center">
                  <td>{intl.get("绕A轴旋转")}</td>
                  <td>
                    <Input
                      style={{ width: "180px" }}
                      defaultValue="0"
                      disabled={isDisabled}
                    />
                  </td>
                  <td>mm</td>
                </tr>
                <tr align="center">
                  <td>{intl.get("绕B轴旋转")}</td>
                  <td>
                    <Input
                      style={{ width: "180px" }}
                      defaultValue="0"
                      disabled={isDisabled}
                    />
                  </td>
                  <td>mm</td>
                </tr>
                <tr align="center">
                  <td>{intl.get("绕C轴旋转")}</td>
                  <td>
                    <Input
                      style={{ width: "180px" }}
                      defaultValue="0"
                      disabled={isDisabled}
                    />
                  </td>
                  <td>mm</td>
                </tr>
              </table>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
export default Toolhands;
