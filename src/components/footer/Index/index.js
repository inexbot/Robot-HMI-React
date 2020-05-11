import React, { useState } from "react";
import intl from "react-intl-universal";
import { ContainerOutlined } from "@ant-design/icons";
import { Button, Row, Col, Modal, Select, Form, Input } from "antd";
import { connect } from "dva";
import "./index.css";
import State from "../State";
import Var from "../Var";
import Craft from "../Craft";
import { config } from "config.js";
import { router } from "dva";
import { useEffect } from "react";
const { Option } = Select;

const mapStateToProps = (state) => {
  return {
    currentAuthority: state.App.currentAuthority,
    paraFrameDisplay: state.App.paraFrameDisplay,
    operaMode: state.index.robotStatus.operaMode,
    currentRobot: state.index.robotStatus.currentRobot,
    robot1OpenedProgram: state.index.robotStatus.robot1OpenedProgram,
    robot2OpenedProgram: state.index.robotStatus.robot2OpenedProgram,
    robot3OpenedProgram: state.index.robotStatus.robot3OpenedProgram,
    robot4OpenedProgram: state.index.robotStatus.robot4OpenedProgram,
  };
};

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

function destroyAll() {
  Modal.destroyAll();
}

const { confirm } = Modal;

function Footer(props) {
  const [form] = Form.useForm();
  const [display, setDisplay] = useState("inline");
  const [Pp, setPp] = useState("/Project");
  const [modeDisplay, setModeDisplay] = useState();

  const displayFrame = () => {
    let paraFrameDisplay = props.paraFrameDisplay;
    switch (paraFrameDisplay) {
      case "close":
        props.dispatch({
          type: "App/changeParaFrameDisplay",
          data: "open",
        });
        break;
      case "open":
        props.dispatch({
          type: "App/changeParaFrameDisplay",
          data: "close",
        });
        break;
      default:
        props.dispatch({
          type: "App/changeParaFrameDisplay",
          data: "close",
        });
        break;
    }
  };
  useEffect(() => {
    let currentRobot = props.currentRobot;
    let programOpened = props[`robot${currentRobot}OpenedProgram`];
    if (programOpened === true) {
      setPp("/Program");
    } else {
      setPp("/Project");
    }
  }, [
    props.currentRobot,
    props.robot1OpenedProgram,
    props.robot2OpenedProgram,
    props.robot3OpenedProgram,
    props.robot4OpenedProgram,
  ]);
  useEffect(() => {
    if (props.operaMode === 2) {
      setModeDisplay("none");
    } else {
      setModeDisplay();
    }
  }, [props.operaMode]);
  useEffect(() => {
    let authority = props.currentAuthority;
    authority === "操作工" ? setDisplay("none") : setDisplay("inline");
  }, [props.currentAuthority]);

  const showModal = () => {
    confirm(modalConfig);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onFinish = (values) => {
    props.dispatch({
      type: "App/changeAuthority",
      data: {
        currentAuthority: values.username,
      },
    });
    destroyAll();
  };
  const handleOk = (e) => {
    form.submit();
  };
  const handleCancel = (e) => {
    destroyAll();
  };
  const modalConfig = {
    title: "权限选择",
    onOk: handleOk,
    onCancel: handleCancel,
    destroyOnClose: true,
    content: (
      <Form
        {...layout}
        name='basic'
        form={form}
        initialValues={{
          username: "操作工",
          password: "123",
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}>
        <Form.Item
          label='权限'
          name='username'
          rules={[{ required: true, message: "Please input your username!" }]}>
          <Select>
            <Option value='操作工'>{intl.get("操作工")}</Option>
            <Option value='技术员'>{intl.get("技术员")}</Option>
            <Option value='管理员'>{intl.get("管理员")}</Option>
          </Select>
        </Form.Item>

        <Form.Item label='密码' name='password' rules={[{ required: true }]}>
          <Input.Password className='log_btn' />
        </Form.Item>
      </Form>
    ),
  };

  return (
    <div className='footer-index'>
      {/* 角色切换弹框 */}
      <Row>
        <Col span='20'>
          {/* 状态按钮 */}
          <State />
          {/* 变量按钮 */}
          <div style={{ display: display }}>
            <Var />
          </div>
          {/* 程序按钮，Link组件将按钮包起来用于路由到主程序界面 */}
          <router.Link to={Pp}>
            <Button icon={<ContainerOutlined />}>{intl.get("程序")}</Button>
          </router.Link>
          <router.Link
            to='/TeachLayout'
            style={{ display: config.modeDisplay["示教按钮"] || modeDisplay }}>
            <Button icon={<ContainerOutlined />}>{intl.get("示教")}</Button>
          </router.Link>
          {/* 工艺按钮 */}
          <div style={{ display: config.modeDisplay["工艺按钮"] || display }}>
            <Craft />
          </div>
        </Col>
        {/* 右下角的菜单按钮 */}
        <Col span='2' className='footer-menu' onClick={showModal}>
          <img src={require("../../../images/Authority.png")} alt='' />
          {intl.get(props.currentAuthority)}
        </Col>
        <Col
          span='2'
          className='footer-menu'
          onClick={displayFrame}
          style={{ display: modeDisplay || display }}>
          <img src={require("../../../images/menu.png")} alt='' />
        </Col>
      </Row>
    </div>
  );
}

export default connect(mapStateToProps)(Footer);
