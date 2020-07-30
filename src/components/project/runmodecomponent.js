/*
 * 程序界面右下方的“插入指令，修改指令”等功能的组件
 * 引入ChangeInstructValue、instructType两个方法和变量
 */
import React, { useState, useEffect} from "react";
import { Button, Input, Form } from "antd";
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
  const [ count, setCount] = useState(0);
  const [ form] = Form.useForm();
  const [ OpNum, setOpNum ] = useState(0)
  useEffect(() => {
    setCount(props.count);
  }, [props.count]);
  useEffect(() => {
    form.setFieldsValue({
      index: props.index,
    });
  }, [props.index,form]);
  const changeIndex = (value) => {
    console.log(value)
    let indexData = {
      robot: props.currentRobot,
      index: value.index,
    };
    sendMSGtoController("CYCLE_INDEX_SET", indexData);
  };
  const setTime = (value) => {
    setOpNum( value )
    let indexData = {
      robot: props.currentRobot,
      index: value,
    };
    sendMSGtoController("CYCLE_INDEX_SET", indexData);
  };
  const OpChange = () => {
    let indexData = {
      robot: props.currentRobot,
      index: Number(OpNum),
    };
    sendMSGtoController("CYCLE_INDEX_SET", indexData);
  }

  return (
    <div className='progcomponent'>
      <div className='progmore'>
        <Form form={form} onFinish={changeIndex}>
          <span style={{ marginLeft:"20%" }}>运行次数</span>
          <Form.Item name='index' label={`${count}/`}>
            <Input value={ OpNum } style={{ }} onChange={( e )=>{ setOpNum(e.target.value) }} />
            <Button onClick={OpChange} type='primary' >设置</Button>
          </Form.Item>

          <br />
          <div style={{ display:'flex',justifyContent:'space-around' }} >
            <Button type='primary' onClick={setTime.bind(this, 1)}>单次运行</Button>
            <Button type='primary' onClick={setTime.bind(this, 0)}>循环运行</Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
export default connect(mapStateToProps)(RunModeComponent);
