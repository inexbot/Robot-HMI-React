import React, { useState } from "react";
import { PageHeader, Button, Col, Row, Select, Input } from "antd";
import { router as Router } from "dva";
import intl from "react-intl-universal";
import "./ioset.css";
import { connect } from "dva";

const mapStateToProps = (state) => {
    return {
        currentRobot: state.index.robotStatus.currentRobot,
    };
};

const { Option } = Select;

function IOSet(props) {
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
                            <Router.Link to="/">{intl.get("返回工程")}</Router.Link>
                        </Button>
                    </Col>
                </Row>
            </div>
            {/* 悬浮按钮 */}
            <div className="hoverButton1">
                <Button type={buttontype} shape="circle" size="large" onClick={change}>
                    {buttoncharacter}
                </Button>
            </div>
            {/* 主要内容 */}
            <div className="IOSet">
                <p style={{ height: 20 }}></p>
                <Row>
                    <Col span={10} offset={2}>
                        <div>
                            <p>
                                <span>
                                    {intl.get("当前IO板数量")} ：
                                </span>
                                1
                            </p>
                            <Row>
                                <Col span={11} className="card">
                                    <img src="../../../images/card.png" style={{ width: "100%" }} alt="" />
                                    <span>{intl.get("io板")}1</span>
                                </Col>
                                <Col span={11} offset={1} className="card">
                                    <img src="../../../images/card.png" style={{ width: "100%" }} alt="" />
                                    <span>{intl.get("io板")}2</span>
                                </Col>
                            </Row>
                        </div>
                        <div style={{ marginTop: 20 }}>
                            <p>
                                <span>
                                    {intl.get("虚拟IO数量")} ：
                                </span>
                                <Select disabled={isDisabled} defaultValue="0" style={{ width: 200 }}>
                                    <Option value="0">{intl.get("无")}</Option>
                                    <Option value="1">1</Option>
                                    <Option value="2">2</Option>
                                </Select>
                            </p>
                            <Row>
                                <Col span={11} className="card">
                                    <img src="../../../images/card2.png" style={{ width: "100%" }} alt="" />
                                    <span>{intl.get("虚拟io板")}1</span>
                                </Col>
                                <Col span={11} offset={1} className="card">
                                    <img src="../../../images/card2.png" style={{ width: "100%" }} alt="" />
                                    <span>{intl.get("虚拟io板")}2</span>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col span={10} offset={1}>
                        <div>
                            <div>
                                {intl.get("串口模拟IO参数")}
                                <br />
                                <span className="annotation">{intl.get("*若EtherCAT IO板有模拟IO，则该串口模拟IO将无效。")}</span>
                            </div>
                            <div className="line">
                                <p className="p1">
                                {intl.get("类型")} ：
                                </p>
                                <Select disabled={isDisabled} defaultValue="1" style={{ width: 200 }}>
                                    <Option value="1">{intl.get("DAC模拟IO板")}</Option>
                                    <Option value="2">{intl.get("格控模拟IO板")}</Option>
                                </Select>
                            </div>
                            <div className="line">
                                <p className="p1">
                                {intl.get("波特率")} ：
                                </p>
                                <Input type="text" style={{ width: 200 }} disabled={isDisabled} />
                            </div>
                            <div className="line">
                                <p className="p1">
                                {intl.get("端口")} ：
                                </p>
                                <Input type="text" style={{ width: 200 }} disabled={isDisabled} />
                            </div>

                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
}
export default connect(mapStateToProps)(IOSet);
