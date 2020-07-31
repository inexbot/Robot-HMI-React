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


export function ErenderPosOption(sum) {
  let posSum = sum.length;
  let Options = [
    <Option value="new" key="new">
      新建
    </Option>,
  ];
  for (let i = 1; i <= posSum; i++) {
    if (i < 10) {
      Options.push(
        <Option value={`E00${i}`} key={`E00${i}`}>
          E00{i}
        </Option>
      );
    } else if (i >= 10 && i < 100) {
      Options.push(
        <Option value={`E0${i}`} key={`E0${i}`}>
          E0{i}
        </Option>
      );
    } else if (i > 100) {
      Options.push(
        <Option value={`E${i}`} key={`E${i}`}>
          E{i}
        </Option>
      );
    }
  }
  return Options;
}

export function EnewPos(sum) {
  let pS = sum.length + 1;
  let posName;
  if (pS < 10) {
    posName = `E00${pS}`;
  } else if (pS >= 10 && pS < 100) {
    posName = `E0${pS}`;
  } else if (pS > 100) {
    posName = `E${pS}`;
  }
  return posName;
}

export function EposName(num) {
  let pS = num + 1;
  let posName;
  if (pS < 10) {
    posName = `E00${pS}`;
  } else if (pS >= 10 && pS < 100) {
    posName = `E0${pS}`;
  } else if (pS > 100) {
    posName = `E${pS}`;
  }
  return posName;
}

export function RrenderPosOption(sum) {
  let posSum = sum.length;
  let Options = [
    <Option value="new" key="new">
      新建
    </Option>,
  ];
  for (let i = 1; i <= posSum; i++) {
    if (i < 10) {
      Options.push(
        <Option value={`R00${i}`} key={`R00${i}`}>
          R00{i}
        </Option>
      );
    } else if (i >= 10 && i < 100) {
      Options.push(
        <Option value={`R0${i}`} key={`R0${i}`}>
          R0{i}
        </Option>
      );
    } else if (i > 100) {
      Options.push(
        <Option value={`R${i}`} key={`R${i}`}>
          R{i}
        </Option>
      );
    }
  }
  return Options;
}

export function RnewPos(sum) {
  let pS = sum.length + 1;
  let posName;
  if (pS < 10) {
    posName = `R00${pS}`;
  } else if (pS >= 10 && pS < 100) {
    posName = `R0${pS}`;
  } else if (pS > 100) {
    posName = `R${pS}`;
  }
  return posName;
}

export function RposName(num) {
  let pS = num + 1;
  let posName;
  if (pS < 10) {
    posName = `R00${pS}`;
  } else if (pS >= 10 && pS < 100) {
    posName = `E0${pS}`;
  } else if (pS > 100) {
    posName = `R${pS}`;
  }
  return posName;
}

// export function 
