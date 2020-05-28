import React, { useState, useEffect } from "react";
import { Table, Button, notification, ConfigProvider, Select } from "antd";
import { connect } from "dva";


const mapStateToProps = (state) => {
    return {
      currentRobot: state.index.robotStatus.currentRobot,
      operaMode: state.index.robotStatus.operaMode,
      robot1OpenedProgram: state.index.robotStatus.robot1OpenedProgram,
      robot2OpenedProgram: state.index.robotStatus.robot2OpenedProgram,
      robot3OpenedProgram: state.index.robotStatus.robot3OpenedProgram,
      robot4OpenedProgram: state.index.robotStatus.robot4OpenedProgram,
      program: state.index.program,
      programBoth: state.App.programBoth,
      List: state.App.programSeletedRow,
      newprogram: state.App.newprogram,
      programallButton: state.App.allButton
    };
  };
  

function Setparameter(){
    const [List, setList] = useEffect("haha")
    return(
        <div>
            {List}
        </div>
    )
}

export default connect(mapStateToProps)(Setparameter);