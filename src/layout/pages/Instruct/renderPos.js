import React from "react";
import { Select } from "antd";

const { Option } = Select;
export function renderPosOption(sum) {
  let posSum = sum.length;
  let Options = [
    <Option value="new" key="new">
      新建
    </Option>,
  ];
  for (let i = 1; i <= posSum; i++) {
    if (i < 10) {
      Options.push(
        <Option value={`P00${i}`} key={`P00${i}`}>
          P00{i}
        </Option>
      );
    } else if (i >= 10 && i < 100) {
      Options.push(
        <Option value={`P0${i}`} key={`P0${i}`}>
          P0{i}
        </Option>
      );
    } else if (i > 100) {
      Options.push(
        <Option value={`P${i}`} key={`P${i}`}>
          P{i}
        </Option>
      );
    }
  }
  return Options;
}

export function newPos(sum) {
  let posSum = sum.length + 1;
  let posName;
  if (posSum < 10) {
    posName = `P00${posSum}`;
  } else if (posSum >= 10 && posSum < 100) {
    posName = `P0${posSum}`;
  } else if (posSum > 100) {
    posName = `P${posSum}`;
  }
  return posName;
}
