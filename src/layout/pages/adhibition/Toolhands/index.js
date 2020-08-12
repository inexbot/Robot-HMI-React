import React, { useState, useEffect } from "react";
import { Button, Col, Input, Select, Row } from "antd";
import intl from "react-intl-universal";
import ConTitle from "../../../../components/title";
import { connect } from "dva";
import { sendMSGtoController } from "service/network";
import "./index.css";

const mapStateToProps = (state)=>{
  return{
    currentTool: state.index.robotStatus.currentTool,
    // Toohands: state.index.Toohands.value,
  }
}

function Toolhands(props) {
  const [ isDisabled, setIsDisabled ] = useState(true);
  const [ buttonCharacter1, setButtonCharacter1 ] = useState("修改");
  const [ buttonType1, setButtonType1 ] = useState("primary");
  const [ handsValue, setHandsValue ] = useState(props.currentTool);

  const { Option } = Select;
  useEffect(()=>{
    sendMSGtoController("TOOLPARAMETER_INQUIRE",{toolNum:handsValue})
  },[handsValue])
  

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
  const selectChange= (value) => {
    setHandsValue(value)
  }
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
                  onChange = { selectChange }
                >
                  <Option key='1' value={0}>{intl.get("无")}</Option>
                  <Option key='2' value={1}>{intl.get("工具手")}1</Option>
                  <Option key='3' value={2}>{intl.get("工具手")}2</Option>
                  <Option key='4' value={3}>{intl.get("工具手")}3</Option>
                  <Option key='5' value={4}>{intl.get("工具手")}4</Option>
                  <Option key='6' value={5}>{intl.get("工具手")}5</Option>
                  <Option key='7' value={6}>{intl.get("工具手")}6</Option>
                  <Option key='8' value={7}>{intl.get("工具手")}7</Option>
                  <Option key='9' value={8}>{intl.get("工具手")}8</Option>
                  <Option key='10' value={9}>{intl.get("工具手")}9</Option>
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
                <tbody>
                  <tr key='1' align="center">
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
                  <tr key='2' align="center">
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
                  <tr key='3' align="center">
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
                  <tr key='4' align="center">
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
                  <tr key='5' align="center">
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
                  <tr key='6' align="center">
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
                </tbody>
              </table>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
export default connect(mapStateToProps)(Toolhands);
