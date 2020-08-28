/*
 * 修改指令的入口，在这里决定右侧页面显示的是哪个文件
 */
import React from "react";
import Movj from "components/Instruct/movj"
import Movl from "components/Instruct/movl";
import Movc from "components/Instruct/movc";
import MovcA from "components/Instruct/movca";
import Movs from "components/Instruct/movs";
import Imov from "components/Instruct/imov";
import MovcaDouble from "components/Instruct/movcadouble";
import MovcDouble from "components/Instruct/movcdouble";
import Movcext from "components/Instruct/movcext";
import MovjDouble from "components/Instruct/movjdouble";
import Movjext from "components/Instruct/movjext";
import MovlDouble from "components/Instruct/movldouble";
import Movlext from "components/Instruct/movlext";
import Samov from "components/Instruct/samov";
import Speed from "components/Instruct/speed";

import Changes from "components/Instruct/changes"
import { connect } from "umi";

const mapStateToProps = (state) => {
  return {
    currentRobot: state.index.robotStatus.currentRobot,
    currentCoordinate: state.index.robotStatus.currentCoordinate,
    programSeletedRow: state.App.programSeletedRow
  };
};

function ChangeInstructValue(props) {
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
      case "IMOV":
        return (
          <Imov
            row={props.row}
            form={props.form}
            insertOrChange={props.insertOrChange}
            setClose={props.setClose}
          />
        );
      case "MOVCADOUBLE":
        return (
          <MovcaDouble
            row={props.row}
            form={props.form}
            insertOrChange={props.insertOrChange}
            setClose={props.setClose}
          />
        );
      case "MOVCDOUBLE":
        return (
          <MovcDouble
            row={props.row}
            form={props.form}
            insertOrChange={props.insertOrChange}
            setClose={props.setClose}
          />
        );
      case "MOVCEXT":
        return (
          <Movcext
            row={props.row}
            form={props.form}
            insertOrChange={props.insertOrChange}
            setClose={props.setClose}
          />
        );
      case "MOVJDOUBLE":
        return (
          <MovjDouble
            row={props.row}
            form={props.form}
            insertOrChange={props.insertOrChange}
            setClose={props.setClose}
          />
        );
      case "MOVJEXT":
        return (
          <Movjext
            row={props.row}
            form={props.form}
            insertOrChange={props.insertOrChange}
            setClose={props.setClose}
          />
        );
      case "MOVLDOUBLE":
        return (
          <MovlDouble
            row={props.row}
            form={props.form}
            insertOrChange={props.insertOrChange}
            setClose={props.setClose}
          />
        );
      case "MOVLEXT":
        return (
          <Movlext
            row={props.row}
            form={props.form}
            insertOrChange={props.insertOrChange}
            setClose={props.setClose}
          />
        );
      case "SAMOV":
        return (
          <Samov
            row={props.row}
            form={props.form}
            insertOrChange={props.insertOrChange}
            setClose={props.setClose}
          />
        );
      case "SPEED":
        return (
          <Speed
            row={props.row}
            form={props.form}
            insertOrChange={props.insertOrChange}
            setClose={props.setClose}
          />
        )
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
  // console.log(name)
  // console.log(props.programSeletedRow)

}
export default connect(mapStateToProps)(ChangeInstructValue);

export const instructType = [
  {
    name: "运动控制类",
    list: [
      "MOVJ",
      "MOVL",
      "MOVC",
      "MOVCA",
      "MOVS",
      "IMOV",
      "MOVJEXT",
      "MOVLEXT",
      "MOVCEXT",
      "SPEED",
      "SAMOV",
      "MOVJDOUBLE",
      "MOVLDOUBLE",
      "MOVCDOUBLE",
      "MOVCADOUBLE",
      "EXTMOV",
      "GEARIN",
    ],
  },
  {
    name: "输入输出类",
    list: ["DIN", "DOUT", "AIN", "AOUT", "PULSEOUT", "READOUT"],
  },
  { name: "定时器类", 
    list: [ "TIMER" ]
  },
  {
    name: "运算类",
    list: [
      "ADD",
      "SUB",
      "MUL",
      "DIV",
      "MOD",
      "SIN",
      "COS",
      "ATAN",
      "LogicalOp",
    ],
  },
  {
    name: "条件控制类",
    list: [
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
      "Readlinear",
    ],
  },
  { name: "变量类", list: ["SetInt", "SetDouble", "SetBool", "ForceSet"] },

  { name: "坐标切换类", list: ["SwitchTool", "SwitchUser", "TransUserCoord"] },
  {
    name: "网络通讯类",
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
    name: "位置变量类",
    list: [
      "UseRframeSet",
      "ToolFrameSet",
      "ReadPos",
      "PosAdd",
      "PosSub",
      "PosSet",
      "CopyPos",
      "PosAddAll",
      "PosSubAll",
      "PosSetAll",
      "ToffSetStart",
      "ToffSetEnd",
    ],
  },
  {
    name: "程序控制类",
    list: [
      "PthreadStart",
      "PthreadEnd",
      "PauSerun",
      "ConTinuerun",
      "StopRun",
      "RestartRun",
    ],
  },
  { 
    name:'码垛控制类',
    list: [
      "PalStart",
      "Palgripper",
      "palenter",
      "palshift",
      "Palreal",
      "Palclear",
      "PalEnd",
    ]
  },
  { 
    name:'焊接控制类',
    list: [
      "ArcStart",
      "ArcEnd",
      "Arcset",
      "WvStart",
      "Wvoff",
      "Cil",
      "TigwelDon",
      "TiGwelDoff",
      "SearchDynamic",
      "SearchCalc",
      "SearchEnd",
      "SearchOffSet",
      "SearchOffsetEnd",
      "SearchInitalize",
      "SearchMeasure",
      "SearchCorr",
      "SearchCancelCorr",
      "SearchCalbr",
      "SearchOff",
      "ArcTrackStart",
      "ArctrackEnd",
    ]
  },
  {
    name: "视觉命令类",
    list: [
      "VinsionRun",
      "VisionTrg",
      "VisionPosNum",
      "VisionPos",
      "VisionClear",
      "VisionEnd",
    ],
  },
  {
    name:"激光类",
    list:[
      "LaserStart",
      "LaserEnd",
      "LaserCircle",
    ]
  },
  {
    name: "传送带类",
    list: [
      "ConveyorStart",
      "ConveyorEnd",
      "ConveyorCheckPos",
      "ConveyorCheckEnd",
    ],
  },
  {
    name:"喷涂工艺类",
    list:[
      "SprayStart",
      "SprayEnd",
      "SparyChange",
      "SprayMove",
      "SprayPose",
    ]
  },
  {
    name:"打磨工艺类",
    list:[
      "PolishEdge",
      "PolishConTinue",
      "PolishEnd",
    ]
  },
  {
    name:'电批类',
    list:[ "Screw" ]
  },
  // {
  //   name: "焊接工艺",
  //   list: [
  //     "ArcStart",
  //     "ArcEnd",
  //     "ArcSet",
  //     "WvStart",
  //     "WvEnd",
  //     "Cil",
  //     "TigWeldStart",
  //     "TigWeldEnd",
  //     "FeedWire",
  //     "SearchInitialize",
  //     "SearchMeasure",
  //     "SearchCorr",
  //     "SearchCancelCorr",
  //     "SearchCalbr",
  //     "SearchEnd",
  //     "LaserTrackStart",
  //     "LaserTrackEnd",
  //   ],
  // },
];