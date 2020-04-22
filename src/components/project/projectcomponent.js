import React, { useState, useEffect } from "react";
import { Button, Modal, Input, Form, Select } from "antd";
import { router, connect } from "dva";
import { sendMSGtoServer } from "service/network";
const { confirm } = Modal;
const { Option } = Select;
const mapStateToProps = (state) => {
  return {
    project: state.index.project,
  };
};
function destroyAll() {
  Modal.destroyAll();
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
function ProjectComponent(props) {
  const history = router.useHistory();
  const [openDisabled, setOpenDisabled] = useState(true);
  const currentRobot = props.currentRobot;
  const selectedProject = props.selectedProject;
  const selectedProgram = props.selectedProgram;
  const [form] = Form.useForm();

  useEffect(() => {
    if (selectedProgram === null) {
      setOpenDisabled(true);
    } else {
      setOpenDisabled(false);
    }
  }, [selectedProgram]);

  const openProgram = () => {
    let robot = currentRobot;
    let Robot = "";
    switch (robot) {
      case 1:
        Robot = "Robot1";
        break;
      case 2:
        Robot = "Robot2";
        break;
      case 3:
        Robot = "Robot3";
        break;
      case 4:
        Robot = "Robot4";
        break;
      default:
        return;
    }
    const openprogram = {
      robot: currentRobot,
      project: selectedProject,
      jobname: selectedProgram,
    };
    sendMSGtoServer("openProgram", openprogram);
    let type = "App/change" + Robot + "OpenedProgram";
    let dataName = "robot" + robot + "OpenedProgram";
    props.dispatch({
      type: type,
      data: {
        [dataName]: true,
      },
    });
    history.push("/Program");
  };
  const showModal = () => {
    confirm(modalConfig);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onFinish = (values) => {
    let newProgram = {
      robot: currentRobot,
      jobname: `${values.programName}.${values.programType}`,
    };
    sendMSGtoServer("NEW_PROGRAM", newProgram);
    destroyAll();
    history.push("/Program");
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
        name="basic"
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="程序名"
          name="programName"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="程序类型"
          name="programType"
          rules={[{ required: true }]}
        >
          <Select>
            <Option value="JBR">主程序</Option>
            <Option value="JBP">后台程序</Option>
          </Select>
        </Form.Item>
      </Form>
    ),
  };

  return (
    <div>
      <Button shape="circle" onClick={showModal}>
        新建
      </Button>
      <Button shape="circle" onClick={openProgram} disabled={openDisabled}>
        打开
      </Button>
    </div>
  );
}
export default connect(mapStateToProps)(ProjectComponent);
