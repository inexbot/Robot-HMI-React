import React, { useState, useEffect } from "react";
import { Button, Modal, Input, Form } from "antd";
import { router, connect } from "dva";
import { sendMSGtoServer } from "service/network";

const mapStateToProps = (state) => {
  return {
    project: state.index.project,
  };
};

function ProjectMore(props) {
  const currentRobot = props.currentRobot;
  const selectedProject = props.selectedProject;
  const selectedProgram = props.selectedProgram;
  const deleteProgram = ()=>{
      let deleteData = {
          robot:currentRobot,
          jobname:selectedProgram
      }
      sendMSGtoServer("DELETE_PROGRAM",deleteData);
  }

  return (
    <div style={{display:props.moreDisplay}} onMouseLeave={props.moreBlur}>
      <Button shape="circle" onClick={deleteProgram}>删除</Button>
    </div>
  );
}
export default connect(mapStateToProps)(ProjectMore);
