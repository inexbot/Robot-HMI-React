import React from "react";
import { Input, Button, Form, InputNumber } from "antd";
import { connect } from "dva";

// 从全局的状态获取当前机器人状态
const mapStateToProps = (state) => {
  return {
    currentRobot: state.index.robotStatus.currentRobot,
    robot1OpenedProgram: state.App.robot1OpenedProgram,
    robot2OpenedProgram: state.App.robot2OpenedProgram,
    robot3OpenedProgram: state.App.robot3OpenedProgram,
    robot4OpenedProgram: state.App.robot4OpenedProgram,
    program: state.index.program,
  };
};
// 工程界面组件

function DragPlayback(props) {
  return(
    <div className="quick-control-state">
      <h1>拖拽回放</h1>
      <div className="leftstate-content">
      <Form>
    <Form.Item name="jiange" label="采样间隔">
        <InputNumber />
    </Form.Item>
    <Form.Item name="maxSum" label="采样点数">
        <InputNumber />
    </Form.Item>
    <Button>开始</Button>
    <Button>回放</Button>
    <Form.Item name="fileName" label="生成文件名">
        <Input />
    </Form.Item>
    <Button>插入</Button>
      </Form></div></div>
  )
}
export default connect(mapStateToProps)(DragPlayback);
