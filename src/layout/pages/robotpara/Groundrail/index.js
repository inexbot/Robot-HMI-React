import React, { useState } from "react";
import { Button, Skeleton, Col, Input, Select } from "antd";
import { router } from "dva";
import { connect } from "dva";
import intl from "react-intl-universal";
import ConTitle from "../../../../components/title";
import "./index.css";

const { Option } = Select;

const mapStateToProps = (state) => {
  return {
    robotAmount: state.index.robotStatus.robotAmount,
    outerActivedRobot: state.index.robotStatus.outerActivedRobot,
    outerActivedOuter: state.index.robotStatus.outerActivedOuter,
  };
};

function GroundRail(props) {
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
        title={intl.get("地轨标定")}
        subtitle={intl.get("在这里对地轨等进行标定")}
      />
      {/* 悬浮按钮 */}
      <div className="hoverButton">
        <Button type="dashed" shape="circle" size="large" onClick={change}>
          <router.Link to="/OuterCalibrate/">{intl.get("返回")}</router.Link>
        </Button>
        <Button type={buttonType} shape="circle" size="large" onClick={change}>
          {buttonCharacter}
        </Button>
      </div>
      {/* 主要内容 */}
      <div className="groundRail">
        <Col span={16}>
          <div className="groundRail1">
            <p>{intl.get("地轨方向")}</p>
            <Select
              defaultValue="X+"
              disabled={isDisabled}
              style={{ width: 200 }}
            >
              <Option value="X+">X+</Option>
              <Option value="X-">X-</Option>
              <Option value="Y+">Y+</Option>
              <Option value="Y-">Y-</Option>
              <Option value="Z+">Z+</Option>
              <Option value="Z-">Z-</Option>
            </Select>
          </div>
          <div className="groundRail1">
            <p>{intl.get("齿轮齿条比")}</p>
            <Input style={{ width: 200 }} />
          </div>
        </Col>
        <Col span={8}>
          <p>这里是图</p>
          <Skeleton />
        </Col>
      </div>
    </div>
  );
}
export default connect(mapStateToProps)(GroundRail);
