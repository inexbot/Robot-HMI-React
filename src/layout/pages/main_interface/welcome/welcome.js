import React from "react";
import { PageHeader, Button, Input, Select, Form } from "antd";
import { router } from "dva";
import { connect } from "dva";
import intl from "react-intl-universal";
import "./welcome.css";

const { Option } = Select;
const mapStateToProps = (state) => {
  return {
    currentAuthority: state.App.currentAuthority,
  };
};

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
const onFinish = (values) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

function Welcome(props) {
  const changeLanguage = (value) => {
    localStorage.setItem("lang", value);
    window.location.reload();
  };
  const changeAuthority = (value) => {
    this.props.dispatch({
      type: "App/changeAuthority",
      data: {
        currentAuthority: value,
      },
    });
  };

  return (
    <div>
      {/* 头部 */}
      <div className="con_title">
        <PageHeader
          title={intl.get("欢迎使用")}
          subTitle={intl.get("纳博特科技")}
        />
      </div>
      {/* <ConTitle title={intl.get("欢迎使用")} subtitle={intl.get("纳博特科技")}/> */}

      {/* 主要内容 */}
      <Form
        {...layout}
        name="basic"
        initialValues={{
          language: localStorage.getItem("lang"),
          authority: "操作工",
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item label="选择语言" name="language" className="login">
          <Select onChange={changeLanguage}>
            <Option value="zh-CN">中文/Chinese</Option>
            <Option value="en-US">英文/English</Option>
          </Select>
        </Form.Item>

        <Form.Item label="切换权限" name="authority" className="login">
          <Select onChange={changeAuthority}>
            <Option value="操作工">{intl.get("操作工")}</Option>
            <Option value="技术员">{intl.get("技术员")}</Option>
            <Option value="管理员">{intl.get("管理员")}</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="密  码"
          name="password"
          // rules={[{ required: true, message: 'Please input your password!' }]}
          className="login"
        >
          <Input type="password" />
        </Form.Item>

        <Form.Item {...tailLayout} className="login">
          <Button type="primary" htmlType="submit">
            <router.Link to="/Project">进入</router.Link>
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
export default connect(mapStateToProps)(Welcome);
//  Authority;
