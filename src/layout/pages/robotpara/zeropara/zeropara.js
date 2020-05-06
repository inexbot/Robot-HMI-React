import React, { useState } from "react";
import { Button, Skeleton, Col, Input, Tabs, Row } from "antd";
import ConTitle from "../../../../components/title";
import intl from "react-intl-universal";
import "./zeropara.css";
const { TabPane } = Tabs;

function Zeropara(props) {
  const [isDisabled, setIsDisabled] = useState(true);
  const [buttonCharacter1, setButtonCharacter1] = useState(intl.get("修改"));
  const [buttonType1, setButtonType1] = useState("primary");
  const [buttonCharacter2, setButtonCharacter2] = useState(
    intl.get("清编码器")
  );
  const [buttonType2, setButtonType2] = useState("primary");
  const change = () => {
    if (buttonCharacter1 === "修改") {
      setButtonCharacter1(intl.get("保存"));
      setButtonType1("dashed");
      setIsDisabled(false);
    } else {
      setButtonCharacter1(intl.get("修改"));
      setButtonType1("primary");
      setIsDisabled(true);
    }
  };
  const clearencode = () => {
    if (buttonCharacter2 === "清编码器") {
      setButtonCharacter2(intl.get("返回"));
      setButtonType2("dashed");
    } else {
      setButtonCharacter2(intl.get("清编码器"));
      setButtonType2("primary");
    }
  };
  return (
    <div>
      {/* 头部 */}
      <ConTitle title={intl.get("零点设置")} subtitle={intl.get("机器人零点设置")}/>
      {/* 悬浮按钮 */}
      <div className="hoverButton1">
        <Button type={buttonType1} shape="circle" size="large" onClick={change}>
          {buttonCharacter1}
        </Button>
      </div>

      <div className="hoverButton2">
        <Button
          type={buttonType2}
          shape="circle"
          size="large"
          onClick={clearencode}
        >
          {buttonCharacter2}
        </Button>
      </div>
      {/* 主要内容 */}
      <div className="Zeropara">
        <Tabs defaultActiveKey="1" style={{ background: "white" }}>
          <TabPane tab="零点标定" key="1">
            <Row>
              <Col span={10} offset={2}>
                <div>
                  <table>
                    <thead>
                      <tr>
                        <th>{intl.get("轴")}</th>
                        <th>{intl.get("当前位置")}</th>
                        <th>{intl.get("操作")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr align="center">
                        <td>J1</td>
                        <td>222</td>
                        <td>
                          <Button size="small" disabled={isDisabled}>
                            {intl.get("标记零点")}
                          </Button>
                        </td>
                      </tr>
                      <tr align="center">
                        <td>J2</td>
                        <td>222</td>
                        <td>
                          <Button size="small" disabled={isDisabled}>
                            {intl.get("标记零点")}
                          </Button>
                        </td>
                      </tr>
                      <tr align="center">
                        <td>J3</td>
                        <td>222</td>
                        <td>
                          <Button size="small" disabled={isDisabled}>
                            {intl.get("标记零点")}
                          </Button>
                        </td>
                      </tr>
                      <tr align="center">
                        <td>J4</td>
                        <td>222</td>
                        <td>
                          <Button size="small" disabled={isDisabled}>
                            {intl.get("标记零点")}
                          </Button>
                        </td>
                      </tr>
                      <tr align="center">
                        <td>J5</td>
                        <td>222</td>
                        <td>
                          <Button size="small" disabled={isDisabled}>
                            {intl.get("标记零点")}
                          </Button>
                        </td>
                      </tr>
                      <tr align="center">
                        <td>J6</td>
                        <td>222</td>
                        <td>
                          <Button size="small" disabled={isDisabled}>
                            {intl.get("标记零点")}
                          </Button>
                        </td>
                      </tr>
                      <tr align="center">
                        <td>J7</td>
                        <td>222</td>
                        <td>
                          <Button size="small" disabled={isDisabled}>
                            {intl.get("标记零点")}
                          </Button>
                        </td>
                      </tr>
                      <tr align="center">
                        <td>O1</td>
                        <td>222</td>
                        <td>
                          <Button size="small" disabled={isDisabled}>
                            {intl.get("标记零点")}
                          </Button>
                        </td>
                      </tr>
                      <tr align="center">
                        <td>O2</td>
                        <td>222</td>
                        <td>
                          <Button size="small" disabled={isDisabled}>
                            {intl.get("标记零点")}
                          </Button>
                        </td>
                      </tr>
                      <tr align="center">
                        <td>O3</td>
                        <td>222</td>
                        <td>
                          <Button size="small" disabled={isDisabled}>
                            {intl.get("标记零点")}
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Col>
              <Col span={10} offset={1}>
                <div>
                  <Skeleton active />
                  <Button
                    className="zero_btn"
                    type="primary"
                    size="large"
                    disabled={isDisabled}
                  >
                    {intl.get("全部设为零点")}
                  </Button>
                  <Button
                    className="zero_btn"
                    size="large"
                    disabled={isDisabled}
                  >
                    {intl.get("移至零点")}
                  </Button>
                </div>
              </Col>
            </Row>
          </TabPane>
          <TabPane tab="零点偏移" key="2">
            <Row>
              <Col span={10} offset={2}>
                <div>
                  <table>
                    <thead>
                      <tr>
                        <th>{intl.get("轴")}</th>
                        <th>{intl.get("当前位置")}</th>
                        <th>{intl.get("操作")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr align="center">
                        <td>J1</td>
                        <td>
                          <Input className="zero_input" disabled={isDisabled} />
                        </td>
                        <td>
                          <Button size="small" disabled={isDisabled}>
                            {intl.get("应用偏移")}
                          </Button>
                        </td>
                      </tr>
                      <tr align="center">
                        <td>J2</td>
                        <td>
                          <Input className="zero_input" disabled={isDisabled} />
                        </td>
                        <td>
                          <Button size="small" disabled={isDisabled}>
                            {intl.get("应用偏移")}
                          </Button>
                        </td>
                      </tr>
                      <tr align="center">
                        <td>J3</td>
                        <td>
                          <Input className="zero_input" disabled={isDisabled} />
                        </td>
                        <td>
                          <Button size="small" disabled={isDisabled}>
                            {intl.get("应用偏移")}
                          </Button>
                        </td>
                      </tr>
                      <tr align="center">
                        <td>J4</td>
                        <td>
                          <Input className="zero_input" disabled={isDisabled} />
                        </td>
                        <td>
                          <Button size="small" disabled={isDisabled}>
                            {intl.get("应用偏移")}
                          </Button>
                        </td>
                      </tr>
                      <tr align="center">
                        <td>J5</td>
                        <td>
                          <Input className="zero_input" disabled={isDisabled} />
                        </td>
                        <td>
                          <Button size="small" disabled={isDisabled}>
                            {intl.get("应用偏移")}
                          </Button>
                        </td>
                      </tr>
                      <tr align="center">
                        <td>J6</td>
                        <td>
                          <Input className="zero_input" disabled={isDisabled} />
                        </td>
                        <td>
                          <Button size="small" disabled={isDisabled}>
                            {intl.get("应用偏移")}
                          </Button>
                        </td>
                      </tr>
                      <tr align="center">
                        <td>J7</td>
                        <td>
                          <Input className="zero_input" disabled={isDisabled} />
                        </td>
                        <td>
                          <Button size="small" disabled={isDisabled}>
                            {intl.get("应用偏移")}
                          </Button>
                        </td>
                      </tr>
                      <tr align="center">
                        <td>O1</td>
                        <td>
                          <Input className="zero_input" disabled={isDisabled} />
                        </td>
                        <td>
                          <Button size="small" disabled={isDisabled}>
                            {intl.get("应用偏移")}
                          </Button>
                        </td>
                      </tr>
                      <tr align="center">
                        <td>O2</td>
                        <td>
                          <Input className="zero_input" disabled={isDisabled} />
                        </td>
                        <td>
                          <Button size="small" disabled={isDisabled}>
                            {intl.get("应用偏移")}
                          </Button>
                        </td>
                      </tr>
                      <tr align="center">
                        <td>O3</td>
                        <td>
                          <Input className="zero_input" disabled={isDisabled} />
                        </td>
                        <td>
                          <Button size="small" disabled={isDisabled}>
                            {intl.get("应用偏移")}
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Col>
              <Col span={10} offset={1}>
                <div>
                  <Skeleton active />
                  <Button
                    className="zero_btn"
                    size="large"
                    disabled={isDisabled}
                  >
                    {intl.get("全部应用")}
                  </Button>
                  <Button
                    className="zero_btn"
                    size="large"
                    disabled={isDisabled}
                  >
                    {intl.get("移至零点")}
                  </Button>
                </div>
              </Col>
            </Row>
          </TabPane>
          <TabPane tab="清多圈值" key="3">
            <Row>
              <Col span={10} offset={2}>
                <div>
                  <table style={{margin: "0 auto"}}>
                    <thead>
                      <tr>
                        <th>{intl.get("轴")}</th>
                        <th>{intl.get("当前位置")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr align="center">
                        <td>J2</td>
                        <td>333</td>
                      </tr>
                      <tr align="center">
                        <td>J3</td>
                        <td>333</td>
                      </tr>
                      <tr align="center">
                        <td>J4</td>
                        <td>333</td>
                      </tr>
                      <tr align="center">
                        <td>J5</td>
                        <td>333</td>
                      </tr>
                      <tr align="center">
                        <td>J6</td>
                        <td>333</td>
                      </tr>
                      <tr align="center">
                        <td>J7</td>
                        <td>333</td>
                      </tr>
                      <tr align="center">
                        <td>O1</td>
                        <td>333</td>
                      </tr>
                      <tr align="center">
                        <td>O2</td>
                        <td>333</td>
                      </tr>
                      <tr align="center">
                        <td>O3</td>
                        <td>333</td>
                      </tr>
                      <tr align="center">
                        <td>O4</td>
                        <td>333</td>
                      </tr>
                      <tr align="center">
                        <td>O5</td>
                        <td>333</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Col>
              <Col span={10} offset={1}>
                <div>
                  <p>
                    {intl.get(
                      "请务必谨慎操作，该操作会导致机器人编码器值被清零，导致原厂保存零点数据清零。可能会导致以下问题："
                    )}
                  </p>
                  <p>1.{intl.get("机器人丢失精度；")}</p>
                  <p>2.{intl.get("机器人无法正常运行；")}</p>
                  <p>3.{intl.get("曾经建立的点位无法运动。")}</p>
                  <Button
                    className="zero_btn"
                    size="large"
                    disabled={isDisabled}
                  >
                    {intl.get("清空所有轴多圈值")}
                  </Button>
                </div>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}
export default Zeropara;
