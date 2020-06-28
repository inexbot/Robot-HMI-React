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
import ConTitle from "../../../../components/title";
import "./index.css";

const { TabPane } = Tabs;
const { Option } = Select;

function Remotepro(props) {

  const [visible, setVisible] = useState(true);

  const [ IOproce, setIOproce ] = useState([])
  const [ MudbusProce, setMudbusProce] = useState([])
  // 使用循环来渲染表格内容
  for(let i = 1; i<11; i++){
    IOproce.push(
      <tr align="center">
      <td>{intl.get("程序")}{i}</td>
      <td>{intl.get("未设置")}</td>
      <td>
        <Input style={{ width: 200 }} placeholder="0" />
      </td>
      <td style={{ display:"flex",justifyContent:"space-around" }}>
        <Button size="small">{intl.get("选择程序")}</Button>
        <Button size="small">取消选择</Button>
      </td>
    </tr>
    )
    MudbusProce.push(
      <tr align="center">
        <td>{intl.get("程序")}{i}</td>
        <td>{intl.get("未设置")}</td>
        <td>
          <Button size="small">{intl.get("选择程序")}</Button>
        </td>
      </tr>
    )
  }

  return (
    <div>
      {/* 头部 */}
      <ConTitle title={intl.get("远程程序")} subtitle={intl.get("远程程序设置")}/>
      {/* 悬浮按钮 */}
      <div className="hoverButton1">

      </div>

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
                    {IOproce}
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
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                <Option value="r1">{intl.get("机器人")}1</Option>
                <Option value="r2">{intl.get("机器人")}2</Option>
                <Option value="r3">{intl.get("机器人")}3</Option>
                <Option value="r4">{intl.get("机器人")}4</Option>
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
                      {MudbusProce}
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
