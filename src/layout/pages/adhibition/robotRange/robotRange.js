import React, { useState } from "react";
import { Button, Input} from "antd";
import { connect } from "dva";
import intl from "react-intl-universal";
import ConTitle from "../../../../components/title";
import "./robotRange.css";

const mapStateToProps = (state) => {
  return {
    currentRobot: state.index.robotStatus.currentRobot,
  };
};

function RobotRange(props) {
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
      <ConTitle title={intl.get("机器人范围")} subtitle={intl.get("机器人范围设置")}/>
      {/* 悬浮按钮 */}
      <div className="hoverButton1">
        <Button type={buttontype} shape="circle" size="large" onClick={change}>
          {buttoncharacter}
        </Button>
      </div>
      {/* 主要内容 */}
      <div className="robotRange">
        <p style={{ height: 20 }}> </p>
        <table>
          <thead>
            <tr>
              <th>{intl.get("参数")}</th>
              <th>{intl.get("值")}</th>
              <th>{intl.get("操作")}</th>
            </tr>
          </thead>
          <tbody>
            <tr align="center">
              <td>X{intl.get("轴最大值")}</td>
              <td>
                <Input disabled={isDisabled} />
              </td>
              <td>
                <Button disabled={isDisabled}>标记</Button>
              </td>
            </tr>
            <tr align="center">
              <td>X{intl.get("轴最小值")}</td>
              <td>
                <Input disabled={isDisabled} />
              </td>
              <td>
                <Button disabled={isDisabled}>标记</Button>
              </td>
            </tr>
            <tr align="center">
              <td>Y{intl.get("轴最大值")}</td>
              <td>
                <Input disabled={isDisabled} />
              </td>
              <td>
                <Button disabled={isDisabled}>标记</Button>
              </td>
            </tr>
            <tr align="center">
              <td>Y{intl.get("轴最小值")}</td>
              <td>
                <Input disabled={isDisabled} />
              </td>
              <td>
                <Button disabled={isDisabled}>标记</Button>
              </td>
            </tr>
            <tr align="center">
              <td>Z{intl.get("轴最大值")}</td>
              <td>
                <Input disabled={isDisabled} />
              </td>
              <td>
                <Button disabled={isDisabled}>标记</Button>
              </td>
            </tr>
            <tr align="center">
              <td>Z{intl.get("轴最小值")}</td>
              <td>
                <Input disabled={isDisabled} />
              </td>
              <td>
                <Button disabled={isDisabled}>标记</Button>
              </td>
            </tr>
          </tbody>
        </table>
        <p className="annotation">
          {intl.get("*不填写则表示无限制（单位：mm）")}
        </p>
      </div>
    </div>
  );
}
export default connect(mapStateToProps)(RobotRange);
