import React, { useState } from "react";
import { Button } from "antd";
import { router } from "dva";
import { connect } from "dva";
import intl from "react-intl-universal";
import ConTitle from "../../../../components/title";

const mapStateToProps = (state) => {
  return {
    robotAmount: state.RobotPara.robotAmount,
    outerActivedRobot: state.RobotPara.outerActivedRobot,
    outerActivedOuter: state.RobotPara.outerActivedOuter,
  };
};

function Turning(props) {
  const [isDisabled, setIsDisabled] = useState(true);
  const [buttonCharacter, setButtonCharacter] = useState("修改");
  const [buttonType, setButtonType] = useState("primary");
  const change = () => {
    if (isDisabled === true) {
      setIsDisabled(false);
      setButtonCharacter("保存");
      setButtonType("dashed");
    } else {
      setIsDisabled(true);
      setButtonCharacter("修改");
      setButtonType("primary");
    }
  };
  return (
    <div>
      {/* 头部 */}
      <ConTitle
        title={intl.get("变位机标定")}
        subtitle={intl.get("变位机标定")}
      />
      {/* 悬浮按钮 */}
      <div className="hoverButton1">
        <Button type={buttonType} shape="circle" size="large" onClick={change}>
          {buttonCharacter}
        </Button>
      </div>
      <div className="hoverButton2">
        <Button type="dashed" shape="circle" size="large">
          <router.Link to="/OuterCalibrate/">{intl.get("返回")}</router.Link>
        </Button>
      </div>
      {/* 主要内容 */}
      <div>还没想出来怎么做</div>
    </div>
  );
}
export default connect(mapStateToProps)(Turning);
