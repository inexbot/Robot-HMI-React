import { Button, Select } from "antd";
import React, { useState } from "react";
import intl from "react-intl-universal";
import ConTitle from "components/title";

const { Option } = Select;

function Language() {
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
  const changeLanguage = (value) => {
    localStorage.setItem("lang", value);
    window.location.reload();
  };

  return (
    <div>
      {/* 头部 */}
      <ConTitle title={intl.get("语言切换")} subtitle={intl.get("切换语言")} />
      {/* 悬浮按钮 */}
      <div className="hoverButton1">
        <Button type={buttonType1} shape="circle" size="large" onClick={change}>
          {buttonCharacter1}
        </Button>
      </div>

      {/* 主要内容 */}
      <div className="Language">
        <div style={{ paddingBottom: 10 }}>
          <p>
            <span>{intl.get("选择语言")}:</span>
            <Select
              defaultValue={localStorage.getItem("lang")}
              style={{ width: 200, padding: 20 }}
              disabled={isDisabled}
              onChange={changeLanguage}
            >
              <Option value="zh-CN">中文/Chinese</Option>
              <Option value="en-US">英文/English</Option>
            </Select>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Language;
