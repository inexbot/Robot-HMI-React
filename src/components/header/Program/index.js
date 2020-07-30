import React, { useState, useEffect } from "react";
import intl from "react-intl-universal";
import "../Index/index.css";
import { Select } from "antd";
import { connect } from "dva";
import { sendMSGtoController } from "service/network";

const { Option } = Select;

const mapStateToProps = (state) => {
  return {
    operaMode: state.index.robotStatus.operaMode,
    currentRobot: state.index.robotStatus.currentRobot,
    robot1CurrentProgram: state.index.robotStatus.robot1CurrentProgram,
    robot2CurrentProgram: state.index.robotStatus.robot2CurrentProgram,
    robot3CurrentProgram: state.index.robotStatus.robot3CurrentProgram,
    robot4CurrentProgram: state.index.robotStatus.robot4CurrentProgram,
  };
};
function Program(props) {
  const [programState, setprogramState ] = useState("Stop");
  const [pName, setPName] = useState("");
  const [pSuffixname, setPSuffixname] = useState("");
  useEffect(() => {
    let robot = props.currentRobot;
    let programName = props[`robot${robot}CurrentProgram`];
    if (programName !== "") {
      let indexOfDot = programName.indexOf(".");
      let name = programName.substring(0, indexOfDot);
      let suffixname = programName.substring(indexOfDot);
      setPName(name);
      setPSuffixname(suffixname);
    } else {
      return;
    }
  }, [
    props.currentRobot,
    props.robot1CurrentProgram,
    props.robot2CurrentProgram,
    props.robot3CurrentProgram,
    props.robot4CurrentProgram,
    props
  ]);

  // useEffect(()=>{

  // },[programState])
  const sendProgram = (value) => {
    switch (value) {
      case "Run":
        let pData = {
          robot: props.currentRobot,
          jobname: pName,
          suffixname: pSuffixname,
          line: 1,
          conntinueRun: 0,
        };
        sendMSGtoController("JOBSEND_DONE", pData);
        setprogramState('Run')
        break;
      case "Stop":
        let sData = {
          robot: props.currentRobot,
          type:1,
        };
        sendMSGtoController("STOP_JOB_RUN", sData);
        setprogramState('Stop')
        break;
      case "Pause":
        let psData = {
          robot: props.currentRobot,
          type:0,
        };
        sendMSGtoController("STOP_JOB_RUN", psData);
        setprogramState('Pause')
        break;
      default:
        break;
    }
  };
  return (
    <div>
      <Select
        defaultValue='Stop'
        onChange={sendProgram}
        value={programState}
        showArrow={false}
        className='pro'>
        <Option value='Run'>{intl.get("程序运行")}</Option>
        <Option value='Stop'>{intl.get("程序停止")}</Option>
        <Option value='Pause'>{intl.get("程序暂停")}</Option>
      </Select>
    </div>
  );
}
export default connect(mapStateToProps)(Program);
