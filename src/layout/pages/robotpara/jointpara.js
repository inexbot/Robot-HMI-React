import React, { useState, useEffect } from "react";
import { connect } from "dva";
import { sendMSGtoController } from "service/network";
import { Button, Tabs, Input, Popover, Form } from "antd";
import intl from "react-intl-universal";
import ConTitle from "components/title";
import "./jointpara.css";

const { TabPane } = Tabs;

const mapStateToProps = (state) => {
  return {
    jointPara: state.index.robotParameter.jointPara,
    currentRobotType: state.index.robotStatus.currentRobotType,
    currentRobot: state.index.robotStatus.currentRobot,
  };
};

function Jointpara(props) {
  const [isDisabled, setIsDisabled] = useState(true);
  const [buttoncharacter1, setButtoncharacter1] = useState(intl.get("修改"));
  const [buttoncharacter2, setButtoncharacter2] = useState(intl.get("演示"));
  const [buttoncharacter3, setButtoncharacter3] = useState(intl.get("问题"));
  const [buttontype1, setButtontype1] = useState("primary");
  const [buttontype2, setButtontype2] = useState("default");
  const [buttontype3, setButtontype3] = useState("default");
  const [sum, setSum] = useState(4);
  const [tabs, setTabs] = useState([]);
  const [form] = Form.useForm();
  const text1 = <span>{intl.get("问题")}</span>;
  const content1 = (
    <div>
      <img src='/public/images/demo.png' width={400} height={300} alt=''></img>
    </div>
  );

  const text2 = <span>{intl.get("问题")}</span>;
  const content2 = (
    <div>
      <p>{intl.get("当前可能出现的问题")}</p>
    </div>
  );
  const change = () => {
    if (isDisabled === true) {
      setIsDisabled(false);
      setButtoncharacter1(intl.get("保存"));
      setButtontype1("dashed");
    } else {
      form.submit();
    }
  };

  const demoUp = () => {
    if (buttoncharacter2 === intl.get("演示")) {
      setButtoncharacter2(intl.get("关闭"));
      setButtontype2("dashed");
    } else {
      setButtoncharacter2(intl.get("演示"));
      setButtontype2("default");
    }
  };

  const quesUp = () => {
    if (buttoncharacter3 === intl.get("问题")) {
      setButtoncharacter3(intl.get("关闭"));
      setButtontype3("dashed");
    } else {
      setButtoncharacter3(intl.get("问题"));
      setButtontype3("default");
    }
  };
  const sendInquire = (sum) => {
    for (let i = 1; i <= sum; i++) {
      let sendData = {
        AxisNum: i,
      };
      sendMSGtoController("JOINTPARAMETER_INQUIRE", sendData);
    }
  };
  /*
   *  根据机器人类型判断轴个数
   */
  useEffect(() => {
    switch (props.currentRobotType) {
      case 1:
        setSum(6);
        break;
      case 2:
        setSum(4);
        break;
      case 3:
        setSum(4);
        break;
      case 4:
        setSum(4);
        break;
      case 5:
        setSum(1);
        break;
      case 6:
        setSum(5);
        break;
      case 7:
        setSum(6);
        break;
      case 8:
        setSum(2);
        break;
      case 9:
        setSum(3);
        break;
      case 10:
        setSum(3);
        break;
      case 11:
        setSum(3);
        break;
      case 12:
        setSum(4);
        break;
      default:
        break;
    }
  }, [props.currentRobotType]);
  /*
   *  发送获取参数的事儿
   */
  useEffect(() => {
    sendInquire(sum);
  }, [sum, props.currentRobot]);
  /*
   *  渲染TabPane内容
   */
  useEffect(() => {
    const setTab = (SUM) => {
      let renderTabs = [];
      for (let i = 1; i <= SUM; i++) {
        renderTabs.push(
          <TabPane tab={`J${i}`} key={i} forceRender={true}>
            {content(i)}
          </TabPane>
        );
      }
      setTabs(renderTabs);
    };
    setTab(sum);
  }, [sum, isDisabled]);
  /*
   *  自动将获取的参数填入
   */
  useEffect(() => {
    let para = props.jointPara;
    for (let i = 1; i <= sum; i++) {
      form.setFieldsValue({
        ["joint" + i + "AxisDirection"]: para["axis" + i].AxisDirection,
        ["joint" + i + "DeRatedVel"]: para["axis" + i].DeRatedVel,
        ["joint" + i + "Direction"]: para["axis" + i].Direction,
        ["joint" + i + "EncoderResolution"]: para["axis" + i].EncoderResolution,
        ["joint" + i + "MaxAcc"]: para["axis" + i].MaxAcc,
        ["joint" + i + "MaxDeRotSpeed"]: para["axis" + i].MaxDeRotSpeed,
        ["joint" + i + "MaxDecel"]: para["axis" + i].MaxDecel,
        ["joint" + i + "MaxRotSpeed"]: para["axis" + i].MaxRotSpeed,
        ["joint" + i + "NegSWLimit"]: para["axis" + i].NegSWLimit,
        ["joint" + i + "PosSWLimit"]: para["axis" + i].PosSWLimit,
        ["joint" + i + "RatedDeRotSpeed"]: para["axis" + i].RatedDeRotSpeed,
        ["joint" + i + "RatedRotSpeed"]: para["axis" + i].RatedRotSpeed,
        ["joint" + i + "RatedVel"]: para["axis" + i].RatedVel,
        ["joint" + i + "ReducRatio"]: para["axis" + i].ReducRatio,
      });
    }
  }, [props.jointPara, sum, form]);
  /*
   *  点击确定后的回调
   */
  const onFinish = (values) => {
    for (let i = 1; i <= sum; i++) {
      let jointPara = {
        Joint: {
          AxisNum: i,
          PosSWLimit: parseFloat(values[`joint${i}PosSWLimit`]),
          NegSWLimit: parseFloat(values[`joint${i}NegSWLimit`]),
          RatedVel: parseFloat(values[`joint${i}RatedVel`]),
          DeRatedVel: parseFloat(values[`joint${i}DeRatedVel`]),
          MaxRotSpeed: parseFloat(values[`joint${i}MaxRotSpeed`]),
          MaxDeRotSpeed: parseFloat(values[`joint${i}MaxDeRotSpeed`]),
          MaxAcc: parseFloat(values[`joint${i}MaxAcc`]),
          MaxDecel: parseFloat(values[`joint${i}MaxDecel`]),
          ReducRatio: parseFloat(values[`joint${i}ReducRatio`]),
          Direction: parseFloat(values[`joint${i}Direction`]),
          EncoderResolution: parseFloat(values[`joint${i}EncoderResolution`]),
          RatedRotSpeed: parseFloat(values[`joint${i}RatedRotSpeed`]),
          RatedDeRotSpeed: parseFloat(values[`joint${i}RatedDeRotSpeed`]),
          AxisDirection: parseFloat(values[`joint${i}AxisDirection`]),
        },
      };
      console.log(jointPara);
      sendMSGtoController("JOINTPARAMETER_SET", jointPara);
    }
    setIsDisabled(true);
    setButtoncharacter1(intl.get("修改"));
    setButtontype1("primary");
  };
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 5 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
    },
  };
  const content = (joint) => {
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td>
                <Form.Item
                  name={`joint${joint}PosSWLimit`}
                  label={intl.get("正限位")}
                  help={intl.get("关节参数/正限位说明")}>
                  <Input disabled={isDisabled} />
                </Form.Item>
              </td>
              <td></td>
              <td>
                <Form.Item
                  name={`joint${joint}NegSWLimit`}
                  label={intl.get("反限位")}
                  help={intl.get("关节参数/反限位说明")}>
                  <Input disabled={isDisabled} />
                </Form.Item>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      // <Row>
      //   <Col span={11} offset={1}>
      //     <Form.Item
      //       name={`joint${joint}PosSWLimit`}
      //       label={intl.get("正限位")}
      //       help={intl.get("关节参数/正限位说明")}
      //     >
      //       <Input disabled={isDisabled} style={{ width: "180px" }} />
      //     </Form.Item>
      //     <Form.Item
      //       name={`joint${joint}ReducRatio`}
      //       label={intl.get("减速比")}
      //       help={intl.get("关节参数/减速比说明")}
      //     >
      //       <Input disabled={isDisabled} style={{ width: "180px" }} />
      //     </Form.Item>
      //     <Form.Item
      //       name={`joint${joint}RatedRotSpeed`}
      //       label={intl.get("额定正转速")}
      //       help={intl.get("关节参数/额定正转速说明")}
      //     >
      //       <Input style={{ width: "180px" }} disabled={isDisabled} />
      //     </Form.Item>
      //     <Form.Item
      //       name={`joint${joint}MaxRotSpeed`}
      //       label={intl.get("最大正转速")}
      //       help={intl.get("关节参数/最大正转速说明")}
      //     >
      //       <Input style={{ width: "180px" }} disabled={isDisabled} />
      //     </Form.Item>
      //     <Form.Item
      //       name={`joint${joint}RatedVel`}
      //       label={intl.get("额定正速度")}
      //       help={intl.get("关节参数/额定正速度说明")}
      //     >
      //       <Input style={{ width: "180px" }} disabled={isDisabled} />
      //     </Form.Item>
      //     <Form.Item
      //       name={`joint${joint}MaxAcc`}
      //       label={intl.get("最大加速度")}
      //       help={intl.get("关节参数/最大加速度说明")}
      //     >
      //       <Input style={{ width: "180px" }} disabled={isDisabled} />
      //     </Form.Item>
      //     <Form.Item
      //       name={`joint${joint}Direction`}
      //       label={intl.get("模型方向")}
      //       help={intl.get("关节参数/模型方向说明")}
      //     >
      //       <Select style={{ width: "180px" }} disabled={isDisabled}>
      //         <Option value={1}>1</Option>
      //         <Option value={-1}>-1</Option>
      //       </Select>
      //     </Form.Item>
      //   </Col>
      //   <Col span={12}>
      //     <Form.Item
      //       name={`joint${joint}NegSWLimit`}
      //       label={intl.get("反限位")}
      //       help={intl.get("关节参数/反限位说明")}
      //     >
      //       <Input style={{ width: "180px" }} disabled={isDisabled} />
      //     </Form.Item>
      //     <Form.Item
      //       name={`joint${joint}EncoderResolution`}
      //       label={intl.get("编码器位数")}
      //       help={intl.get("关节参数/编码器位数说明")}
      //     >
      //       <Input style={{ width: "180px" }} disabled={isDisabled} />
      //     </Form.Item>
      //     <Form.Item
      //       name={`joint${joint}RatedDeRotSpeed`}
      //       label={intl.get("额定反转速")}
      //       help={intl.get("关节参数/额定反转速说明")}
      //     >
      //       <Input style={{ width: "180px" }} disabled={isDisabled} />
      //     </Form.Item>
      //     <Form.Item
      //       name={`joint${joint}MaxDeRotSpeed`}
      //       label={intl.get("最大反转速")}
      //       help={intl.get("关节参数/最大反转速说明")}
      //     >
      //       <Input style={{ width: "180px" }} disabled={isDisabled} />
      //     </Form.Item>
      //     <Form.Item
      //       name={`joint${joint}DeRatedVel`}
      //       label={intl.get("额定反速度")}
      //       help={intl.get("关节参数/额定反速度说明")}
      //     >
      //       <Input style={{ width: "180px" }} disabled={isDisabled} />
      //     </Form.Item>
      //     <Form.Item
      //       name={`joint${joint}MaxDecel`}
      //       label={intl.get("最大减速度")}
      //       help={intl.get("关节参数/最大减速度说明")}
      //     >
      //       <Input style={{ width: "180px" }} disabled={isDisabled} />
      //     </Form.Item>
      //     <Form.Item
      //       name={`joint${joint}AxisDirection`}
      //       label={intl.get("关节实际方向")}
      //       help={intl.get("关节参数/关节实际方向说明")}
      //     >
      //       <Select style={{ width: "180px" }} disabled={isDisabled}>
      //         <Option value={1}>1</Option>
      //         <Option value={-1}>-1</Option>
      //       </Select>
      //     </Form.Item>
      //   </Col>
      // </Row>
    );
  };
  return (
    <div>
      {/* 头部 */}
      <ConTitle
        title={intl.get("关节参数")}
        subtitle={intl.get("机器人关节参数设置")}
      />
      {/* 悬浮按钮 */}
      <div className='hoverButton1'>
        <Button type={buttontype1} shape='circle' size='large' onClick={change}>
          {buttoncharacter1}
        </Button>
      </div>

      <Popover
        placement='left'
        title={text1}
        content={content1}
        trigger='click'>
        <div className='hoverButton2'>
          <Button
            type={buttontype2}
            shape='circle'
            size='large'
            onClick={demoUp}>
            {buttoncharacter2}
          </Button>
        </div>
      </Popover>
      <Popover
        placement='left'
        title={text2}
        content={content2}
        trigger='click'>
        <div className='hoverButton3'>
          <Button
            type={buttontype3}
            shape='circle'
            size='large'
            onClick={quesUp}>
            {buttoncharacter3}
          </Button>
        </div>
      </Popover>

      {/* 主要内容 */}
      <div className='Jointpara'>
        <Form form={form} {...formItemLayout} onFinish={onFinish}>
          <Tabs defaultActiveKey='1' style={{ background: "white" }}>
            {tabs}
          </Tabs>
        </Form>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(Jointpara);
