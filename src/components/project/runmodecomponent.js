/*
 * 程序界面右下方的“插入指令，修改指令”等功能的组件
 * 引入ChangeInstructValue、instructType两个方法和变量
 */
import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Button, Input, Form, Modal } from "antd";
import { connect } from "dva";
import "./programcomponent.css";
import { sendMSGtoController } from "service/network";
const mapStateToProps = (state) => {
  return {
    count: state.index.robotStatus.count,
    index: state.index.robotStatus.index,
    currentRobot: state.index.robotStatus.currentRobot,
  };
};

function RunModeComponent(props) {
  const [count, setCount] = useState(0);
  const [form] = Form.useForm();
  useEffect(() => {
    setCount(props.count);
  }, [props.count]);
  useEffect(() => {
    form.setFieldsValue({
      index: props.index,
    });
  }, [props.index]);
  const changeIndex = (value) => {
    let indexData = {
      robot: props.currentRobot,
      index: value.index,
    };
    sendMSGtoController("CYCLE_INDEX_SET", indexData);
  };
  const setTime = (value) => {
    let indexData = {
      robot: props.currentRobot,
      index: value,
    };
    sendMSGtoController("CYCLE_INDEX_SET", indexData);
  };
  return (
    <div className='progcomponent'>
      <div className='progmore'>
        <Form form={form} onFinish={changeIndex}>
          运行次数
          <Form.Item name='index' label={`${count}/`}>
            <Input />
          </Form.Item>
          <Button>设置</Button>
          <br />
          <Button onClick={setTime.bind(this, 1)}>单次运行</Button>
          <Button onClick={setTime.bind(this, 0)}>循环运行</Button>
        </Form>
      </div>
    </div>
  );
}
export default connect(mapStateToProps)(RunModeComponent);
