import React, { useState } from "react";
import { Button, Input } from "antd";
import intl from "react-intl-universal";
import ConTitle from "../../../../components/title";
import "./index.css";

function LinearVel(props) {
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
      <ConTitle title={intl.get("线速度")} subtitle={intl.get("机器人线速度设置")}/>
      {/* 悬浮按钮 */}
      <div className="hoverButton1">
        <Button type={buttonType1} shape="circle" size="large" onClick={change}>
          {buttonCharacter1}
        </Button>
      </div>
      {/* 主要内容 */}
      <div className="linearvel">
        <div className="linearvel1">
          <p className="p1">{intl.get("最大速度")}</p>
          <Input style={{ width: 200 }} disabled={isDisabled} />
          <p className="p2">mm/s</p>
        </div>
        <div className="linearvel1">
          <p className="p1">{intl.get("最大加速度")}</p>
          <Input style={{ width: 200 }} disabled={isDisabled} />
          <p className="p2">{intl.get("倍数")}</p>
        </div>
        <div className="linearvel1">
          <p className="p1">{intl.get("最大减速度")}</p>
          <Input style={{ width: 200 }} disabled={isDisabled} />
          <p className="p2">{intl.get("倍数")}</p>
        </div>
        <div className="linearvel1">
          <p className="p1">{intl.get("最大加加速度")}</p>
          <Input style={{ width: 200 }} disabled={isDisabled} />
          <p className="p2">mm/s²</p>
        </div>
      </div>
    </div>
  );
}
export default LinearVel;
