import React, { useState, useEffect } from "react";
import { connect } from "dva";
import { Form, Input, Button, Select, Skeleton, Col, Popover, Row } from "antd";
import { sendMSGtoController } from "../../../../service/network";
import intl from "react-intl-universal";
import ConTitle from "../../../../components/title";
import "./dhpara.css";

const mapStateToProps = (state) => {
  return {
    dhPara: state.index.robotParameter.dhPara,
  };
};

const { Option } = Select;

function Dhpara(props) {
  // 定义修改按钮的状态
  const [button1State, setButton1State] = useState({
    // 修改按钮显示的字
    buttoncharacter: intl.get("修改"),
    // 修改按钮的样式
    buttontype: "primary",
  });
  const [button2State, setButton2State] = useState({
    // 问题按钮显示的字
    buttoncharacter: intl.get("问题"),
    // 问题按钮的样式
    buttontype: "default",
  });
  // 用来设置所有输入框与下拉框是否可用的状态
  const [isDisabled, setIsDisabled] = useState(true);
  const [form] = Form.useForm();
  // 按下修改按钮后切换状态
  const changeButton1State = () => {
    if (button1State.buttontype === "primary") {
      setButton1State({
        buttoncharacter: intl.get("保存"),
        buttontype: "dashed",
        htmlType: "button",
      });
      setIsDisabled(false);
    } else {
      form.submit();
    }
  };
  // 问题窗口中显示的内容
  const quesUp = () => {
    if (button2State.buttoncharacter === "问题")
      setButton2State({
        buttoncharacter: intl.get("关闭"),
        buttontype: "dashed",
      });
    else
      setButton2State({
        buttoncharacter: intl.get("问题"),
        buttontype: "default",
      });
  };
  // 表单信息验证正确后执行的
  const onFinish = (values) => {
    let dhPara = {
      upsideDown: values.upsideDown,
      // 字符串转换为数字后发给控制器，用parseFloat
      Link: [
        {
          a: parseFloat(values.L6),
          d: parseFloat(values.L1),
        },
        {
          a: parseFloat(values.L2),
          d: parseFloat(values.L7),
        },
        {
          a: parseFloat(values.L3),
        },
        {
          d: parseFloat(values.L4),
        },
        {
          theta: parseFloat(values.five),
        },
        {
          d: parseFloat(values.L5),
        },
      ],
      CoupleCoe: {
        Couple_Coe_1_2: parseFloat(values.Couple_Coe_1_2),
        Couple_Coe_2_3: parseFloat(values.Couple_Coe_2_3),
        Couple_Coe_3_2: parseFloat(values.Couple_Coe_3_2),
        Couple_Coe_3_4: parseFloat(values.Couple_Coe_3_4),
        Couple_Coe_4_5: parseFloat(values.Couple_Coe_4_5),
        Couple_Coe_4_6: parseFloat(values.Couple_Coe_4_6),
        Couple_Coe_5_6: parseFloat(values.Couple_Coe_5_6),
      },
    };
    sendMSGtoController("DHPARAMETER_SET", dhPara);
    // 发送成功后再将按钮设置为修改状态
    setButton1State({
      buttoncharacter: intl.get("修改"),
      buttontype: "primary",
    });
    setIsDisabled(true);
  };
  // 表单验证失败后回调
  const onFinishFailed = (values) => {
    console.log(values, "失败");
  };
  // 初始化界面后执行的操作
  useEffect(() => {
    sendMSGtoController("DHPARAMETER_INQUIRE", "");
  }, []);
  useEffect(() => {
    form.setFieldsValue({
      L1: props.dhPara.Link[0].d,
      L2: props.dhPara.Link[1].a,
      L3: props.dhPara.Link[2].a,
      L4: props.dhPara.Link[3].d,
      L5: props.dhPara.Link[5].d,
      L6: props.dhPara.Link[0].a,
      L7: props.dhPara.Link[2].d,
      five: props.dhPara.Link[4].theta,
      Couple_Coe_1_2: props.dhPara.CoupleCoe.Couple_Coe_1_2,
      Couple_Coe_2_3: props.dhPara.CoupleCoe.Couple_Coe_2_3,
      Couple_Coe_3_2: props.dhPara.CoupleCoe.Couple_Coe_3_2,
      Couple_Coe_3_4: props.dhPara.CoupleCoe.Couple_Coe_3_4,
      Couple_Coe_4_5: props.dhPara.CoupleCoe.Couple_Coe_4_5,
      Couple_Coe_4_6: props.dhPara.CoupleCoe.Couple_Coe_4_6,
      Couple_Coe_5_6: props.dhPara.CoupleCoe.Couple_Coe_5_6,
      upsideDown: props.dhPara.upsideDown,
      preRobot: "Customize",
    });
  }, [props.dhPara, form]);

  return (
    <div>
      {/* 头部 */}
      <ConTitle
        title={intl.get("DH参数")}
        subtitle={intl.get("机器人DH参数设置")}
      />
      {/* 里面的内容 */}
      <Form
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="inline"
        className="Dhpara"
      >
        {/* 悬浮按钮 */}
        <div className="hoverButton1">
          <Button
            type={button1State.buttontype}
            shape="circle"
            size="large"
            onClick={changeButton1State}
          >
            {button1State.buttoncharacter}
          </Button>
        </div>
        <Popover placement="left" title="11" content="22" trigger="click">
          <div className="hoverButton2">
            <Button
              type={button2State.buttontype}
              shape="circle"
              size="large"
              onClick={quesUp}
            >
              {button2State.buttoncharacter}
            </Button>
          </div>
        </Popover>
        {/* <Form.Item {...tailLayout}>

        </Form.Item> */}
        {/* 主要参数内容 */}
        <Row>
          <Col span={8}>
            <div>
              <Skeleton active />
            </div>
            <Form.Item
              name="preRobot"
              label={intl.get("预置机器人")}
              className="Dhpara_hei"
              rules={[
                {
                  required: true,
                },
              ]}
              help={intl.get("preRobotHelp")}
            >
              <Select disabled={isDisabled}>
                <Option value="Customize">自定义</Option>
                <Option value="Lj604">联匠604</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="upsideDown"
              className="Dhpara_hei"
              label={intl.get("安装方式")}
              rules={[
                {
                  required: true,
                },
              ]}
              help={intl.get("正装还是倒装")}
            >
              <Select disabled={isDisabled}>
                <Option value={true}>{intl.get("正装")}</Option>
                <Option value={false}>{intl.get("倒装")}</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={16} style={{ marginTop: 20 }}>
            <Row>
              <Col span={10}>
                <Form.Item
                  name="L1"
                  label="L1"
                  className="Dhpara_hei"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input disabled={isDisabled} />
                </Form.Item>

                <Form.Item
                  name="L2"
                  label="L2"
                  className="Dhpara_hei"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input disabled={isDisabled} />
                </Form.Item>
                <Form.Item
                  name="L3"
                  label="L3"
                  className="Dhpara_hei"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input disabled={isDisabled} />
                </Form.Item>
                <Form.Item
                  name="L4"
                  label="L4"
                  className="Dhpara_hei"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input disabled={isDisabled} />
                </Form.Item>
                <Form.Item
                  name="L5"
                  label="L5"
                  className="Dhpara_hei"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input disabled={isDisabled} />
                </Form.Item>
                <Form.Item
                  name="L6"
                  label="L6"
                  className="Dhpara_hei"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input disabled={isDisabled} />
                </Form.Item>
                <Form.Item
                  name="L7"
                  label="L7"
                  className="Dhpara_hei"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input disabled={isDisabled} />
                </Form.Item>
              </Col>

              <Col span={14}>
                <Form.Item
                  name="Couple_Coe_1_2"
                  label="Couple_Coe_1_2"
                  className="Dhpara_hei"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input disabled={isDisabled} />
                </Form.Item>
                <Form.Item
                  name="Couple_Coe_2_3"
                  label="Couple_Coe_2_3"
                  className="Dhpara_hei"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input disabled={isDisabled} />
                </Form.Item>
                <Form.Item
                  name="Couple_Coe_3_2"
                  label="Couple_Coe_3_2"
                  className="Dhpara_hei"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input disabled={isDisabled} />
                </Form.Item>
                <Form.Item
                  name="Couple_Coe_3_4"
                  label="Couple_Coe_3_4"
                  className="Dhpara_hei"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input disabled={isDisabled} />
                </Form.Item>
                <Form.Item
                  name="Couple_Coe_4_5"
                  label="Couple_Coe_4_5"
                  className="Dhpara_hei"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input disabled={isDisabled} />
                </Form.Item>
                <Form.Item
                  name="Couple_Coe_4_6"
                  label="Couple_Coe_4_6"
                  className="Dhpara_hei"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input disabled={isDisabled} />
                </Form.Item>
                <Form.Item
                  name="Couple_Coe_5_6"
                  label="Couple_Coe_5_6"
                  className="Dhpara_hei"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input disabled={isDisabled} />
                </Form.Item>
                <Form.Item
                  name="five"
                  label={intl.get("5轴角度")}
                  className="Dhpara_hei Dh_lab"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                  help={intl.get("0度还是90度")}
                >
                  <Select disabled={isDisabled}>
                    <Option value="0">{intl.get("0度")}</Option>
                    <Option value="90">{intl.get("90度")}</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
export default connect(mapStateToProps)(Dhpara);
