import React,{ useState } from "react";
import {
  Button,
  Col,
  Input,
  Tabs,
  Row,
  Popover,
  Select,
} from "antd";
import intl from "react-intl-universal";
import ConTitle from "components/title";
import "./remotepro.css";

const { TabPane } = Tabs;
const { Option } = Select;

function Remotepro(props) {
  const [buttonCharacter1, setButtonCharacter1] = useState(
    intl.get("零点偏移")
  );
  const [buttonType1, setButtonType1] = useState("primary");
  const [buttonCharacter2, setButtonCharacter2] = useState(
    intl.get("清编码器")
  );
  const [buttonType2, setButtonType2] = useState("primary");
  const [buttonCharacter3, setButtonCharacter3] = useState(intl.get("关闭"));
  const [buttonType3, setButtonType3] = useState("dashed");
  const [visible, setVisible] = useState(true);

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onBlur = () => {
    console.log("blur");
  };
  const onFocus = () => {
    console.log("focus");
  };
  const onSearch = (val) => {
    console.log("search:", val);
  };

  const change = () => {
    if (buttonCharacter1 === "零点偏移") {
      setButtonCharacter1(intl.get("返回"));
      setButtonType1("dashed");
    } else {
      setButtonCharacter1(intl.get("零点偏移"));
      setButtonType1("primary");
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
  const annotation = () => {
    if (buttonCharacter3 === "注意") {
      setButtonCharacter3(intl.get("关闭"));
      setButtonType3("dashed");
      setVisible(true);
    } else {
      setButtonCharacter3(intl.get("注意"));
      setButtonType3("dashed");
      setVisible(false);
    }
  };

  return (
    <div>
      {/* 头部 */}
      <ConTitle title={intl.get("远程程序")} subtitle={intl.get("远程程序设置")}/>
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

      <Popover
        placement="left"
        content={"*运行次数参考为0，表示循环运行。"}
        trigger="click"
        visible={visible}
      >
        <div className="hoverButton3">
          <Button
            type={buttonType3}
            shape="circle"
            size="large"
            onClick={annotation}
          >
            {buttonCharacter3}
          </Button>
        </div>
      </Popover>

      {/* 主要内容 */}
      <div className="Remotepro">
        <Tabs defaultActiveKey="1" style={{ background: "white" }}>
          <TabPane tab="IO程序" key="1">
            <Row>
              <Col span={20} offset={2}>
                <div>
                  <table>
                    <thead>
                      <tr>
                        <th>{intl.get("程序号")}</th>
                        <th>{intl.get("已选程序")}</th>
                        <th>{intl.get("运行次数")}</th>
                        <th>{intl.get("操作")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr align="center">
                        <td>{intl.get("程序")}1</td>
                        <td>{intl.get("未设置")}</td>
                        <td>
                          <Input style={{ width: 200 }} placeholder="0" />
                        </td>
                        <td>
                          <Button size="small">{intl.get("选择程序")}</Button>
                        </td>
                      </tr>
                      <tr align="center">
                        <td>{intl.get("程序")}2</td>
                        <td>{intl.get("未设置")}</td>
                        <td>
                          <Input style={{ width: 200 }} placeholder="0" />
                        </td>
                        <td>
                          <Button size="small">{intl.get("选择程序")}</Button>
                        </td>
                      </tr>
                      <tr align="center">
                        <td>{intl.get("程序")}3</td>
                        <td>{intl.get("未设置")}</td>
                        <td>
                          <Input style={{ width: 200 }} placeholder="0" />
                        </td>
                        <td>
                          <Button size="small">{intl.get("选择程序")}</Button>
                        </td>
                      </tr>
                      <tr align="center">
                        <td>{intl.get("程序")}4</td>
                        <td>{intl.get("未设置")}</td>
                        <td>
                          <Input style={{ width: 200 }} placeholder="0" />
                        </td>
                        <td>
                          <Button size="small">{intl.get("选择程序")}</Button>
                        </td>
                      </tr>
                      <tr align="center">
                        <td>{intl.get("程序")}5</td>
                        <td>{intl.get("未设置")}</td>
                        <td>
                          <Input style={{ width: 200 }} placeholder="0" />
                        </td>
                        <td>
                          <Button size="small">{intl.get("选择程序")}</Button>
                        </td>
                      </tr>
                      <tr align="center">
                        <td>{intl.get("程序")}6</td>
                        <td>{intl.get("未设置")}</td>
                        <td>
                          <Input style={{ width: 200 }} placeholder="0" />
                        </td>
                        <td>
                          <Button size="small">{intl.get("选择程序")}</Button>
                        </td>
                      </tr>
                      <tr align="center">
                        <td>{intl.get("程序")}7</td>
                        <td>{intl.get("未设置")}</td>
                        <td>
                          <Input style={{ width: 200 }} placeholder="0" />
                        </td>
                        <td>
                          <Button size="small">{intl.get("选择程序")}</Button>
                        </td>
                      </tr>
                      <tr align="center">
                        <td>{intl.get("程序")}8</td>
                        <td>{intl.get("未设置")}</td>
                        <td>
                          <Input style={{ width: 200 }} placeholder="0" />
                        </td>
                        <td>
                          <Button size="small">{intl.get("标记零点")}</Button>
                        </td>
                      </tr>
                      <tr align="center">
                        <td>{intl.get("程序")}9</td>
                        <td>{intl.get("未设置")}</td>
                        <td>
                          <Input style={{ width: 200 }} placeholder="0" />
                        </td>
                        <td>
                          <Button size="small">{intl.get("标记零点")}</Button>
                        </td>
                      </tr>
                      <tr align="center">
                        <td>{intl.get("程序")}10</td>
                        <td>{intl.get("未设置")}</td>
                        <td>
                          <Input style={{ width: 200 }} placeholder="0" />
                        </td>
                        <td>
                          <Button size="small">{intl.get("标记零点")}</Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Col>
            </Row>
          </TabPane>
          <TabPane tab="Modbus程序" key="2">
            <div style={{ textAlign: "center", margin: 10 }}>
              <span style={{ marginRight: 15 }}>{intl.get("选择机器人")}:</span>
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="机器人1"
                optionFilterProp="children"
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                onSearch={onSearch}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                <Option value="r1">{intl.get("机器人")}1</Option>
                <Option value="r2">{intl.get("机器人")}2</Option>
                <Option value="r3">{intl.get("机器人")}3</Option>
                <Option value="r4">{intl.get("机器人")}4</Option>
                <Option value="r5">{intl.get("机器人")}5</Option>
                <Option value="r6">{intl.get("机器人")}6</Option>
                <Option value="r7">{intl.get("机器人")}7</Option>
                <Option value="r8">{intl.get("机器人")}8</Option>
                <Option value="r9">{intl.get("机器人")}9</Option>
                <Option value="r10">{intl.get("机器人")}10</Option>
              </Select>
            </div>
            <Row>
              <Col span={20} offset={2}>
                <div>
                  <table>
                    <thead>
                      <tr>
                        <th>{intl.get("程序号")}</th>
                        <th>{intl.get("已选程序")}</th>
                        <th>{intl.get("操作")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr align="center">
                        <td>{intl.get("程序")}1</td>
                        <td>{intl.get("未设置")}</td>
                        <td>
                          <Button size="small">{intl.get("选择程序")}</Button>
                        </td>
                      </tr>
                      <tr align="center">
                        <td>{intl.get("程序")}2</td>
                        <td>{intl.get("未设置")}</td>
                        <td>
                          <Button size="small">{intl.get("选择程序")}</Button>
                        </td>
                      </tr>
                      <tr align="center">
                        <td>{intl.get("程序")}3</td>
                        <td>{intl.get("未设置")}</td>
                        <td>
                          <Button size="small">{intl.get("选择程序")}</Button>
                        </td>
                      </tr>
                      <tr align="center">
                        <td>{intl.get("程序")}4</td>
                        <td>{intl.get("未设置")}</td>
                        <td>
                          <Button size="small">{intl.get("选择程序")}</Button>
                        </td>
                      </tr>
                      <tr align="center">
                        <td>{intl.get("程序")}5</td>
                        <td>{intl.get("未设置")}</td>
                        <td>
                          <Button size="small">{intl.get("选择程序")}</Button>
                        </td>
                      </tr>
                      <tr align="center">
                        <td>{intl.get("程序")}6</td>
                        <td>{intl.get("未设置")}</td>
                        <td>
                          <Button size="small">{intl.get("选择程序")}</Button>
                        </td>
                      </tr>
                      <tr align="center">
                        <td>{intl.get("程序")}7</td>
                        <td>{intl.get("未设置")}</td>
                        <td>
                          <Button size="small">{intl.get("选择程序")}</Button>
                        </td>
                      </tr>
                      <tr align="center">
                        <td>{intl.get("程序")}8</td>
                        <td>{intl.get("未设置")}</td>
                        <td>
                          <Button size="small">{intl.get("标记零点")}</Button>
                        </td>
                      </tr>
                      <tr align="center">
                        <td>{intl.get("程序")}9</td>
                        <td>{intl.get("未设置")}</td>
                        <td>
                          <Button size="small">{intl.get("标记零点")}</Button>
                        </td>
                      </tr>
                      <tr align="center">
                        <td>{intl.get("程序")}10</td>
                        <td>{intl.get("未设置")}</td>
                        <td>
                          <Button size="small">{intl.get("标记零点")}</Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}
export default Remotepro;
