import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import { connect } from "dva";
import {
  PlusOutlined,
  EditOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { sendMSGtoServer } from "service/network";
import { changevalue } from "service/network";
import "./programcomponent.css";

const mapStateToProps = (state) => {
  return {
    program: state.index.program,
  };
};
const instructType = [
  { name: "运动控制", list: ["MOVJ", "MOVL", "MOVC","MOVCA","IMOVE", "MOVS", "MOVABS","MOVJEXT","MOVLEXT", "MOVCEXT","MOVJSYNC","MOVLSYNC", "MOVCSYNC", "MOVCASYNC","MOVCOMM","SPEED"] },
  { name: "输入输出", list: ["DIN", "DOUT","AIN", "AOUT","PULSEOUT", "READOUT"] },
  { name: "条件控制", list: ["Delay", "Call", "IF","ELSEIF","ELSE", "Wait", "WHILE","LABEL","JUMP", "UNTIL","CraftLine","CmdNote", "PosReachable", "ClkStart","ClkStop","ClkReset"] },
  { name: "变量", list: ["SetInt", "SetDouble", "SetBool","ForceSet"] },
  { name: "运算", list: ["Add", "Sub", "Mul","Div","Mod", "Sin", "Cos","Atan","LogicalOp"] },
  { name: "坐标切换", list: ["SwitchTool", "SwitchUser", "TransUserCoord"] },
  { name: "网络通讯", list: ["SendMsg", "ParseMsg", "ReadComm","OpenMsg","CloseMsg", "PrintMsg", "MsgConnSt"] },
  { name: "位置变量", list: ["SetUserFrame", "SetToolFrame", "ReadPos","PosAdd","PosSub", "PosSet", "CopyPos"] },
  { name: "程序控制", list: ["TaskRun", "TaskStop", "ProPause","ProContinue","ProStop", "ProRestart"] },
  { name: "视觉命令", list: ["VinsionStart", "VisionTrg", "VisionPosNum","VisionPos","VisionClear", "VisionEnd"] },
  { name: "传送带控制", list: ["ConveyorStart", "ConveyorEnd", "ConveyorCheckPos","ConveyorCheckEnd"] },
  { name: "焊接工艺", list: ["ArcStart", "ArcEnd", "ArcSet","WvStart","WvEnd", "Cil", "TigWeldStart","TigWeldEnd","FeedWire", "SearchInitialize","SearchMeasure","SearchCorr", "SearchCancelCorr", "SearchCalbr","SearchEnd","LaserTrackStart","LaserTrackEnd"] },
];
function ProgramComponent(props) {
  const [instructList, setInstructList] = useState();
  const [type, setType] = useState(0);
  useEffect(() => {
    let rightList = [];
    let ins = instructType[type].list;
    ins.map((value) => {
      rightList.push(<p>{value}</p>);
    });
    setInstructList(rightList); 
  }, [type]);
  const changeType = (type) => {
    setType(type);
  };

  const renderType = () => {
    let leftList = [];
    instructType.map((value, index) => {
      leftList.push(<p onClick={changeType.bind(this, index)}>{value.name}</p>);
    });
    return leftList;
  };
  return (
    <div className="progcomponent">
      <div className="progadd">
        <Row>
          <Col span={8} className="progaddLeft">
            {renderType()}
          </Col>
          <Col span={16} className="progaddRight">
            {instructList}
          </Col>
        </Row>
      </div>
      <div className="progmore">
        <Row>
          <Col span={6}>111</Col>
          <Col span={6}>22</Col>
          <Col span={6}>33</Col>
        </Row>
      </div>
      <div className="progicon">
        <Row>
          <Col span={6} offset={3}>
            <PlusOutlined className="icon" />
          </Col>
          <Col span={6}>
            <EditOutlined className="icon" />
          </Col>
          <Col span={6}>
            <EllipsisOutlined className="icon" />
          </Col>
        </Row>
      </div>
    </div>
  );
}
export default connect(mapStateToProps)(ProgramComponent);
