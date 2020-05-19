import React, { useState } from "react";
import { connect } from "dva";
import { Button, Select } from "antd";
import intl from "react-intl-universal";
import ConTitle from "components/title";

const { Option } = Select;
const mapStateToProps = (state) => {
  return {
    currentAuthority: state.App.currentAuthority,
  };
};

function Authority(props) {
  const [isDisabled, setIsDisabled] = useState(true);
  const [buttoncharacter1, setButtoncharacter1] = useState("修改");
  const [buttontype1, setButtontype1] = useState("primary");

  const change = () => {
    if (this.state.isDisabled === true) {
      setIsDisabled(false);
      setButtoncharacter1(intl.get("保存"));
      setButtontype1("dashed");
    } else {
      setIsDisabled(true);
      setButtoncharacter1(intl.get("修改"));
      setButtontype1("primary");
    }
  };

  const changeAuthority = (value) => {
    props.dispatch({
      type: "App/changeAuthority",
      data: {
        currentAuthority: value,
      },
    });
  };

  return (
    <div>
      {/* 头部 */}
      <ConTitle title={intl.get("角色选择")} subtitle={intl.get("切换权限")} />
      {/* 悬浮按钮 */}
      <div className="hoverButton1">
        <Button type={buttontype1} shape="circle" size="large" onClick={change}>
          {buttoncharacter1}
        </Button>
      </div>
      {/* 主要内容 */}
      <div className="Authority">
        <Select
          onChange={changeAuthority}
          defaultValue="操作工"
          disabled={isDisabled}
        >
          <Option value="操作工">{intl.get("操作工")}</Option>
          <Option value="技术员">{intl.get("技术员")}</Option>
          <Option value="管理员">{intl.get("管理员")}</Option>
        </Select>
      </div>
    </div>
  );
}
export default connect(mapStateToProps)(Authority);
