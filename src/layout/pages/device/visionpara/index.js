import React, { useState } from "react";
import { Button, Col, Row, Steps, message } from "antd";
import { connect } from "dva";
import intl from "react-intl-universal";
import Basic from "../VisionparaCon/index";
import ConTitle from "components/title";
import "../Ioset/index.css";

const mapStateToProps = (state) => {
    return {
        currentRobot: state.index.robotStatus.currentRobot,
    };
};

const { Step } = Steps;


function VisionPara(props) {
    const [isDisabled, setIsDisabled] = useState(true);
    const [buttoncharacter, setButtonCharacter] = useState(intl.get("修改"));
    const [buttontype, setButtontype] = useState("primary");
    const [current, setCurrent] = useState(0);

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


    const steps = [
        {
            title: 'First',
            content: <Basic />,
        },
        {
            title: 'Second',
            content: 'Second-content',
        },
        {
            title: 'Last',
            content: 'Last-content',
        },
    ];

    const next = () => {
        const currentNext = current + 1;
        setCurrent(currentNext)
    }

    const prev = () => {
        const currentPrev = current - 1;
        setCurrent(currentPrev)
    }

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
            <div className="visionpara">
                <Row>
                    <Col span={20} offset={2}>
                        <p style={{ marginTop: 20 }}></p>
                        <div>
                            <Steps current={current}>
                                {steps.map(item => (
                                    <Step key={item.title} title={item.title} />
                                ))}
                            </Steps>
                            <div className="steps-content">{steps[current].content}</div>
                            <div className="steps-action">
                                {current < steps.length - 1 && (
                                    <Button type="primary" onClick={() => next()}>
                                        Next
                                    </Button>
                                )}
                                {current === steps.length - 1 && (
                                    <Button type="primary" onClick={() => message.success('Processing complete!')}>
                                        Done
                                    </Button>
                                )}
                                {current > 0 && (
                                    <Button style={{ margin: 8 }} onClick={() => prev()}>
                                        Previous
                                    </Button>
                                )}
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
}
export default connect(mapStateToProps)(VisionPara);
