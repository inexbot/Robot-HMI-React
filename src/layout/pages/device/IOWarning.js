import React, { useState } from "react";
import { PageHeader, Button, Input, Col, Row, Switch, Select, Tabs, Pagination } from "antd";
import { router } from "dva";
import intl from "react-intl-universal";
// import "./user.css";
import { connect } from "dva";
const { TabPane } = Tabs;


const mapStateToProps = state => {
    return {
        currentRobot: state.index.robotStatus.currentRobot,
    };
};

const { Option } = Select;


function IOWarning(props) {
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
            <div className="con_title">
                <Row>
                    <Col span={18}>
                        <PageHeader
                            title={intl.get("复位点")}
                            subTitle={intl.get("复位点设置")}
                        />
                    </Col>
                    <Col span={6} className="ret">
                        <Button>
                            <router.Link to="/">{intl.get("返回工程")}</router.Link>
                        </Button>
                    </Col>
                </Row>
            </div>
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
            <div className="IOWarning">
                <Tabs defaultActiveKey="1">
                    <TabPane tab="IO板1" key="1">
                        <table>
                            <thead>
                                <tr>
                                    <th>{intl.get("端口")}</th>
                                    <th>{intl.get("消息")}</th>
                                    <th>{intl.get("参数")}</th>
                                    <th>{intl.get("使能")}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr align="center">
                                    <td>1-1</td>
                                    <td><Input disabled={isDisabled} /></td>
                                    <td>
                                        <Select disabled={isDisabled} defaultValue="0">
                                            <Option value="0">0</Option>
                                            <Option value="1">1</Option>
                                        </Select>
                                    </td>
                                    <td>
                                        <Switch checkedChildren="开" unCheckedChildren="关" disabled={isDisabled} style={{ width: 40 }} defaultChecked />
                                    </td>
                                </tr>
                                <tr align="center">
                                    <td>1-2</td>
                                    <td><Input disabled={isDisabled} /></td>
                                    <td>
                                        <Select disabled={isDisabled} defaultValue="0">
                                            <Option value="0">0</Option>
                                            <Option value="1">1</Option>
                                        </Select>
                                    </td>
                                    <td>
                                        <Switch checkedChildren="开" unCheckedChildren="关" disabled={isDisabled} style={{ width: 40 }} defaultChecked />
                                    </td>
                                </tr>
                                <tr align="center">
                                    <td>1-3</td>
                                    <td><Input disabled={isDisabled} /></td>
                                    <td>
                                        <Select disabled={isDisabled} defaultValue="0">
                                            <Option value="0">0</Option>
                                            <Option value="1">1</Option>
                                        </Select>
                                    </td>
                                    <td>
                                        <Switch checkedChildren="开" unCheckedChildren="关" disabled={isDisabled} style={{ width: 40 }} defaultChecked />
                                    </td>
                                </tr>
                                <tr align="center">
                                    <td>1-4</td>
                                    <td><Input disabled={isDisabled} /></td>
                                    <td>
                                        <Select disabled={isDisabled} defaultValue="0">
                                            <Option value="0">0</Option>
                                            <Option value="1">1</Option>
                                        </Select>
                                    </td>
                                    <td>
                                        <Switch checkedChildren="开" unCheckedChildren="关" disabled={isDisabled} style={{ width: 40 }} defaultChecked />
                                    </td>
                                </tr>
                                <tr align="center">
                                    <td>1-5</td>
                                    <td><Input disabled={isDisabled} /></td>
                                    <td>
                                        <Select disabled={isDisabled} defaultValue="0">
                                            <Option value="0">0</Option>
                                            <Option value="1">1</Option>
                                        </Select>
                                    </td>
                                    <td>
                                        <Switch checkedChildren="开" unCheckedChildren="关" disabled={isDisabled} style={{ width: 40 }} defaultChecked />
                                    </td>
                                </tr>
                                <tr align="center">
                                    <td>1-6</td>
                                    <td><Input disabled={isDisabled} /></td>
                                    <td>
                                        <Select disabled={isDisabled} defaultValue="0">
                                            <Option value="0">0</Option>
                                            <Option value="1">1</Option>
                                        </Select>
                                    </td>
                                    <td>
                                        <Switch checkedChildren="开" unCheckedChildren="关" disabled={isDisabled} style={{ width: 40 }} defaultChecked />
                                    </td>
                                </tr>
                                <tr align="center">
                                    <td>1-7</td>
                                    <td><Input disabled={isDisabled} /></td>
                                    <td>
                                        <Select disabled={isDisabled} defaultValue="0">
                                            <Option value="0">0</Option>
                                            <Option value="1">1</Option>
                                        </Select>
                                    </td>
                                    <td>
                                        <Switch checkedChildren="开" unCheckedChildren="关" disabled={isDisabled} style={{ width: 40 }} defaultChecked />
                                    </td>
                                </tr>
                                <tr align="center">
                                    <td>1-8</td>
                                    <td><Input disabled={isDisabled} /></td>
                                    <td>
                                        <Select disabled={isDisabled} defaultValue="0">
                                            <Option value="0">0</Option>
                                            <Option value="1">1</Option>
                                        </Select>
                                    </td>
                                    <td>
                                        <Switch checkedChildren="开" unCheckedChildren="关" disabled={isDisabled} style={{ width: 40 }} defaultChecked />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <Pagination defaultCurrent={1} total={20} style={{ textAlign: "right" ,marginRight:"10%",marginTop:10}} />
                    </TabPane>
                    <TabPane tab="IO板2" key="2">
                    </TabPane>
                </Tabs>
            </div>
        </div >
    );
}
export default connect(mapStateToProps)(IOWarning)