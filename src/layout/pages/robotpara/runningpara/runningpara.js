import React, { useState } from "react";
import { Button, Select, Input } from "antd";
import intl from "react-intl-universal";
import ConTitle from "../../../../components/title";
import "./runningpara.css";
const { Option } = Select;

function RunningPara(props) {
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
      <ConTitle title={intl.get("运动参数")} subtitle={intl.get("机器人运动参数设置")}/>
      {/* 悬浮按钮 */}
      <div className="hoverButton1">
        <Button type={buttonType1} shape="circle" size="large" onClick={change}>
          {buttonCharacter1}
        </Button>
      </div>
      {/* 主要内容 */}
      <div className="runningpara">
        <div className="runningpara1">
          <p className="p1">{intl.get("关节轴点动加速度")}</p>
          <Select defaultValue="S" style={{ width: 200 }} disabled={isDisabled}>
            <Option value="S">{intl.get("S型插补")}</Option>
            <Option value="T">{intl.get("梯形插补")}</Option>
          </Select>
          <p className="p2">{intl.get("度")}/s²</p>
        </div>
        <div className="runningpara1">
          <p className="p1">{intl.get("远程模式速度")}</p>
          <Select defaultValue="1" style={{ width: 200 }} disabled={isDisabled}>
            <Option value="1">1</Option>
            <Option value="5">5</Option>
            <Option value="10">10</Option>
            <Option value="20">20</Option>
            <Option value="30">30</Option>
            <Option value="40">40</Option>
            <Option value="50">50</Option>
            <Option value="60">60</Option>
            <Option value="70">70</Option>
            <Option value="80">80</Option>
            <Option value="90">90</Option>
            <Option value="100">100</Option>
          </Select>
          <p className="p2">{intl.get("百分比")}</p>
        </div>
        <div className="runningpara1">
          <p className="p1">{intl.get("绝对位置分辨率")}</p>
          <Input style={{ width: 200 }} disabled={isDisabled} />
          <p className="p2">{intl.get("度")}（0.1-0.0001）</p>
        </div>
        <div className="runningpara1">
          <p className="p1">{intl.get("运行延时时间")}</p>
          <Input style={{ width: 200 }} disabled={isDisabled} />
          <p className="p2">{intl.get("毫秒")}（500-5000）</p>
        </div>
        <div className="runningpara1">
          <p className="p1">{intl.get("暂停时间")}</p>
          <Input style={{ width: 200 }} disabled={isDisabled} />
          <p className="p2">{intl.get("毫秒")}（500-5000）</p>
        </div>
        <div className="runningpara1">
          <p className="p1">{intl.get("双机协作模式")}</p>
          <Select
            defaultValue="Close"
            style={{ width: 200 }}
            disabled={isDisabled}
          >
            <Option value="Open">{intl.get("开")}</Option>
            <Option value="Close">{intl.get("关")}</Option>
          </Select>
          <p className="p2">{intl.get("双机协作模式开关")}</p>
        </div>
      </div>
    </div>
  );
}
export default RunningPara;
