/*
 * 修改指令的入口，在这里决定右侧页面显示的是哪个文件
 */
import React, { useEffect } from "react";
import Movj from "../Instruct/movj";
import Movl from "../Instruct/movl";
import Movc from "../Instruct/movc";
import MovcA from "../Instruct/movca";
import Movs from "../Instruct/movs";
import Changes from "../Instruct/changes"
import { connect } from "dva";

const mapStateToProps = (state) => {
  return {
    currentRobot: state.index.robotStatus.currentRobot,
    currentCoordinate: state.index.robotStatus.currentCoordinate,
    programSeletedRow: state.App.programSeletedRow
  };
};

function ChangeInstructValue(props) {
  console.log(props)
  let name;
  if (props.insertOrChange === "change") {
    name = props.changeName;

  } else if (props.insertOrChange === "insert") {
    name = props.insertName;

  }

  if(props.programSeletedRow.length <= 1 ){
    switch (name) {
      case "MOVJ":
        return (
          <Movj
            row={props.row}
            form={props.form}
            insertOrChange={props.insertOrChange}
            setClose={props.setClose}
          />
        );
      case "MOVL":
        return (
          <Movl
            row={props.row}
            form={props.form}
            insertOrChange={props.insertOrChange}
            setClose={props.setClose}
          />
        );
      case "MOVC":
        return (
          <Movc
            row={props.row}
            form={props.form}
            insertOrChange={props.insertOrChange}
            setClose={props.setClose}
          />
        );
      case "MOVCA":
        return (
          <MovcA
            row={props.row}
            form={props.form}
            insertOrChange={props.insertOrChange}
            setClose={props.setClose}
          />
        );
      case "MOVS":
        return (
          <Movs
            row={props.row}
            form={props.form}
            insertOrChange={props.insertOrChange}
            setClose={props.setClose}
          />
        );
      default:
        return (
          <div>
            指令行{props.row}，指令名{props.name}没有修改界面
          </div>
        );
    }

  }else{
    console.log(props)
    let nums = props.programSeletedRow.map((index)=>{
      return index
    })
    console.log(nums)
    return (
      <Changes
        row={nums}
        form={props.form}
        insertOrChange={props.insertOrChange}
        setClose={props.setClose}
      />
    );
  }
  // console.log(props.changeName)
  // useEffect(() => {
  //   let getCurrentPosition = setInterval(() => {

  //   }, 1000);
  //   return () => {
  //     clearInterval(getCurrentPosition);
  //   };
  // }, []);
  console.log(name)
  console.log(props.programSeletedRow)

}
export default connect(mapStateToProps)(ChangeInstructValue);

export const instructType = [
  {
    name: "运动控制",
    list: [
      "MOVJ",
      "MOVL",
      "MOVC",
      "MOVCA",
      "IMOVE",
      "MOVS",
      "MOVABS",
      "MOVJEXT",
      "MOVLEXT",
      "MOVCEXT",
      "MOVJSYNC",
      "MOVLSYNC",
      "MOVCSYNC",
      "MOVCASYNC",
      "MOVCOMM",
      "SPEED",
    ],
  },
  {
    name: "输入输出",
    list: ["DIN", "DOUT", "AIN", "AOUT", "PULSEOUT", "READOUT"],
  },
  {
    name: "条件控制",
    list: [
      "Delay",
      "Call",
      "IF",
      "ELSEIF",
      "ELSE",
      "Wait",
      "WHILE",
      "LABEL",
      "JUMP",
      "UNTIL",
      "CraftLine",
      "CmdNote",
      "PosReachable",
      "ClkStart",
      "ClkStop",
      "ClkReset",
    ],
  },
  { name: "变量", list: ["SetInt", "SetDouble", "SetBool", "ForceSet"] },
  {
    name: "运算",
    list: [
      "Add",
      "Sub",
      "Mul",
      "Div",
      "Mod",
      "Sin",
      "Cos",
      "Atan",
      "LogicalOp",
    ],
  },
  { name: "坐标切换", list: ["SwitchTool", "SwitchUser", "TransUserCoord"] },
  {
    name: "网络通讯",
    list: [
      "SendMsg",
      "ParseMsg",
      "ReadComm",
      "OpenMsg",
      "CloseMsg",
      "PrintMsg",
      "MsgConnSt",
    ],
  },
  {
    name: "位置变量",
    list: [
      "SetUserFrame",
      "SetToolFrame",
      "ReadPos",
      "PosAdd",
      "PosSub",
      "PosSet",
      "CopyPos",
    ],
  },
  {
    name: "程序控制",
    list: [
      "TaskRun",
      "TaskStop",
      "ProPause",
      "ProContinue",
      "ProStop",
      "ProRestart",
    ],
  },
  {
    name: "视觉命令",
    list: [
      "VinsionStart",
      "VisionTrg",
      "VisionPosNum",
      "VisionPos",
      "VisionClear",
      "VisionEnd",
    ],
  },
  {
    name: "传送带控制",
    list: [
      "ConveyorStart",
      "ConveyorEnd",
      "ConveyorCheckPos",
      "ConveyorCheckEnd",
    ],
  },
  {
    name: "焊接工艺",
    list: [
      "ArcStart",
      "ArcEnd",
      "ArcSet",
      "WvStart",
      "WvEnd",
      "Cil",
      "TigWeldStart",
      "TigWeldEnd",
      "FeedWire",
      "SearchInitialize",
      "SearchMeasure",
      "SearchCorr",
      "SearchCancelCorr",
      "SearchCalbr",
      "SearchEnd",
      "LaserTrackStart",
      "LaserTrackEnd",
    ],
  },
];
