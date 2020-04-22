import React from "react";
import intl from "react-intl-universal";
import "./index.css";
import { Select } from "antd";

const { Option } = Select;

function handleChangemode(value) {
  console.log(`selected ${value}`);
}

function Program(props) {
  return (
    <div>
      <Select
        defaultValue="Stop"
        onChange={handleChangemode}
        showArrow={false}
        className="pro"
      >
        <Option value="Run">{intl.get("程序运行")}</Option>
        <Option value="Stop">{intl.get("程序停止")}</Option>
        <Option value="Pause">{intl.get("程序暂停")}</Option>
      </Select>
    </div>
  );
}
export default Program;
