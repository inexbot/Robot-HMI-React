/*
 * 用来渲染点位选项和新建点位的名字的
 */
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
  let pS = sum.length + 1;
  let posName;
  if (pS < 10) {
    posName = `P00${pS}`;
  } else if (pS >= 10 && pS < 100) {
    posName = `P0${pS}`;
  } else if (pS > 100) {
    posName = `P${pS}`;
  }
  return posName;
}

export function posName(num) {
  let pS = num + 1;
  let posName;
  if (pS < 10) {
    posName = `P00${pS}`;
  } else if (pS >= 10 && pS < 100) {
    posName = `P0${pS}`;
  } else if (pS > 100) {
    posName = `P${pS}`;
  }
  return posName;
}

// export function 
