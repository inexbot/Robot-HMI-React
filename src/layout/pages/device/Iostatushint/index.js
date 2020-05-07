import React, { useState } from "react";
import { PageHeader, Button, Col, Row, Select } from "antd";
import { router } from "dva";
import intl from "react-intl-universal";
import "../Ioremote/index.css";
import { connect } from "dva";

const mapStateToProps = state => {
  return {
    currentRobot: state.index.robotStatus.currentRobot,
  };
};

const { Option } = Select;

function Iostatushint(props) {
  const [isDisabled, setIsDisabled] = useState(true);
  const [buttoncharacter, setButtonCharacter] = useState(intl.get("修改"));
  const [buttontype, setButtontype] = useState("primary");
  const change = () => {
    if (isDisabled === true) {
      setIsDisabled(false);
      setButtonCharacter(intl.get("保存"));
      setButtontype("dashed");
    }
    else {
      setIsDisabled(true);
      setButtonCharacter(intl.get("修改"));
      setButtontype("primary");
    }
  }
  return (
    <div>
      {/* 头部 */}
      <div className="con_title">
        <Row>
          <Col span={18}>
            <PageHeader
              title={intl.get("状态提示")}
              subTitle={intl.get("状态提示设置")}
            />
          </Col>
          <Col span={6} className="ret">
            <Button>
              <router.Link to="/">{intl.get("返回工程")}</router.Link>
            </Button>
          </Col>
        </Row>
      </div>
      {/* 悬浮按钮 */}
      <div className="hoverButton1">
        <Button
          type={buttontype}
          shape="circle"
          size="large"
          onClick={change}
        >
          {buttoncharacter}
        </Button>
      </div>
      {/* 主要内容 */}
      <div className="iostatushint">
        <p style={{ height: 10 }}></p>
        <table>
          <thead>
            <tr>
              <th>{intl.get("输出端口")}</th>
              <th>{intl.get("功能")}</th>
              <th>{intl.get("输出值")}</th>
            </tr>
          </thead>
          <tbody>
            <tr align="center">
              <td>1-1</td>
              <td>
                <Select defaultValue="无" disabled={isDisabled}>
                  <Option Value="0">无</Option>
                  <Option Value="1">开机提醒</Option>
                  <Option Value="2">IO程序1已预约</Option>
                  <Option Value="3">IO程序2已预约</Option>
                  <Option Value="4">IO程序3已预约</Option>
                  <Option Value="5">IO程序4已预约</Option>
                  <Option Value="6">IO程序5已预约</Option>
                  <Option Value="7">IO程序6已预约</Option>
                  <Option Value="8">IO程序7已预约</Option>
                  <Option Value="9">IO程序8已预约</Option>
                  <Option Value="10">IO程序9已预约</Option>
                  <Option Value="11">IO程序10已预约</Option>
                  <Option Value="12">自动运行状态</Option>
                  <Option Value="13">备份错误报警</Option>
                  <Option Value="14">程序运行中</Option>
                </Select>
              </td>
              <td>
                <Select defaultValue="0" disabled={isDisabled} >
                  <Option value="0">0</Option>
                  <Option value="1">1</Option>
                </Select>
              </td>
            </tr>
            <tr align="center">
              <td>1-2</td>
              <td>
                <Select defaultValue="无" disabled={isDisabled}>
                  <Option Value="0">无</Option>
                  <Option Value="1">开机提醒</Option>
                  <Option Value="2">IO程序1已预约</Option>
                  <Option Value="3">IO程序2已预约</Option>
                  <Option Value="4">IO程序3已预约</Option>
                  <Option Value="5">IO程序4已预约</Option>
                  <Option Value="6">IO程序5已预约</Option>
                  <Option Value="7">IO程序6已预约</Option>
                  <Option Value="8">IO程序7已预约</Option>
                  <Option Value="9">IO程序8已预约</Option>
                  <Option Value="10">IO程序9已预约</Option>
                  <Option Value="11">IO程序10已预约</Option>
                  <Option Value="12">自动运行状态</Option>
                  <Option Value="13">备份错误报警</Option>
                  <Option Value="14">程序运行中</Option>
                </Select>
              </td>
              <td>
                <Select defaultValue="0" disabled={isDisabled} >
                  <Option value="0">0</Option>
                  <Option value="1">1</Option>
                </Select>
              </td>
            </tr>
            <tr align="center">
              <td>1-3</td>
              <td>
                <Select defaultValue="无" disabled={isDisabled}>
                  <Option Value="0">无</Option>
                  <Option Value="1">开机提醒</Option>
                  <Option Value="2">IO程序1已预约</Option>
                  <Option Value="3">IO程序2已预约</Option>
                  <Option Value="4">IO程序3已预约</Option>
                  <Option Value="5">IO程序4已预约</Option>
                  <Option Value="6">IO程序5已预约</Option>
                  <Option Value="7">IO程序6已预约</Option>
                  <Option Value="8">IO程序7已预约</Option>
                  <Option Value="9">IO程序8已预约</Option>
                  <Option Value="10">IO程序9已预约</Option>
                  <Option Value="11">IO程序10已预约</Option>
                  <Option Value="12">自动运行状态</Option>
                  <Option Value="13">备份错误报警</Option>
                  <Option Value="14">程序运行中</Option>
                </Select>
              </td>
              <td>
                <Select defaultValue="0" disabled={isDisabled} >
                  <Option value="0">0</Option>
                  <Option value="1">1</Option>
                </Select>
              </td>
            </tr>
            <tr align="center">
              <td>1-4</td>
              <td>
                <Select defaultValue="无" disabled={isDisabled}>
                  <Option Value="0">无</Option>
                  <Option Value="1">开机提醒</Option>
                  <Option Value="2">IO程序1已预约</Option>
                  <Option Value="3">IO程序2已预约</Option>
                  <Option Value="4">IO程序3已预约</Option>
                  <Option Value="5">IO程序4已预约</Option>
                  <Option Value="6">IO程序5已预约</Option>
                  <Option Value="7">IO程序6已预约</Option>
                  <Option Value="8">IO程序7已预约</Option>
                  <Option Value="9">IO程序8已预约</Option>
                  <Option Value="10">IO程序9已预约</Option>
                  <Option Value="11">IO程序10已预约</Option>
                  <Option Value="12">自动运行状态</Option>
                  <Option Value="13">备份错误报警</Option>
                  <Option Value="14">程序运行中</Option>
                </Select>
              </td>
              <td>
                <Select defaultValue="0" disabled={isDisabled} >
                  <Option value="0">0</Option>
                  <Option value="1">1</Option>
                </Select>
              </td>
            </tr>
            <tr align="center">
              <td>1-5</td>
              <td>
                <Select defaultValue="无" disabled={isDisabled}>
                  <Option Value="0">无</Option>
                  <Option Value="1">开机提醒</Option>
                  <Option Value="2">IO程序1已预约</Option>
                  <Option Value="3">IO程序2已预约</Option>
                  <Option Value="4">IO程序3已预约</Option>
                  <Option Value="5">IO程序4已预约</Option>
                  <Option Value="6">IO程序5已预约</Option>
                  <Option Value="7">IO程序6已预约</Option>
                  <Option Value="8">IO程序7已预约</Option>
                  <Option Value="9">IO程序8已预约</Option>
                  <Option Value="10">IO程序9已预约</Option>
                  <Option Value="11">IO程序10已预约</Option>
                  <Option Value="12">自动运行状态</Option>
                  <Option Value="13">备份错误报警</Option>
                  <Option Value="14">程序运行中</Option>
                </Select>
              </td>
              <td>
                <Select defaultValue="0" disabled={isDisabled} >
                  <Option value="0">0</Option>
                  <Option value="1">1</Option>
                </Select>
              </td>
            </tr>
            <tr align="center">
              <td>1-6</td>
              <td>
                <Select defaultValue="无" disabled={isDisabled}>
                  <Option Value="0">无</Option>
                  <Option Value="1">开机提醒</Option>
                  <Option Value="2">IO程序1已预约</Option>
                  <Option Value="3">IO程序2已预约</Option>
                  <Option Value="4">IO程序3已预约</Option>
                  <Option Value="5">IO程序4已预约</Option>
                  <Option Value="6">IO程序5已预约</Option>
                  <Option Value="7">IO程序6已预约</Option>
                  <Option Value="8">IO程序7已预约</Option>
                  <Option Value="9">IO程序8已预约</Option>
                  <Option Value="10">IO程序9已预约</Option>
                  <Option Value="11">IO程序10已预约</Option>
                  <Option Value="12">自动运行状态</Option>
                  <Option Value="13">备份错误报警</Option>
                  <Option Value="14">程序运行中</Option>
                </Select>
              </td>
              <td>
                <Select defaultValue="0" disabled={isDisabled} >
                  <Option value="0">0</Option>
                  <Option value="1">1</Option>
                </Select>
              </td>
            </tr>
            <tr align="center">
              <td>1-7</td>
              <td>
                <Select defaultValue="无" disabled={isDisabled}>
                  <Option Value="0">无</Option>
                  <Option Value="1">开机提醒</Option>
                  <Option Value="2">IO程序1已预约</Option>
                  <Option Value="3">IO程序2已预约</Option>
                  <Option Value="4">IO程序3已预约</Option>
                  <Option Value="5">IO程序4已预约</Option>
                  <Option Value="6">IO程序5已预约</Option>
                  <Option Value="7">IO程序6已预约</Option>
                  <Option Value="8">IO程序7已预约</Option>
                  <Option Value="9">IO程序8已预约</Option>
                  <Option Value="10">IO程序9已预约</Option>
                  <Option Value="11">IO程序10已预约</Option>
                  <Option Value="12">自动运行状态</Option>
                  <Option Value="13">备份错误报警</Option>
                  <Option Value="14">程序运行中</Option>
                </Select>
              </td>
              <td>
                <Select defaultValue="0" disabled={isDisabled} >
                  <Option value="0">0</Option>
                  <Option value="1">1</Option>
                </Select>
              </td>
            </tr>
            <tr align="center">
              <td>1-8</td>
              <td>
                <Select defaultValue="无" disabled={isDisabled}>
                  <Option Value="0">无</Option>
                  <Option Value="1">开机提醒</Option>
                  <Option Value="2">IO程序1已预约</Option>
                  <Option Value="3">IO程序2已预约</Option>
                  <Option Value="4">IO程序3已预约</Option>
                  <Option Value="5">IO程序4已预约</Option>
                  <Option Value="6">IO程序5已预约</Option>
                  <Option Value="7">IO程序6已预约</Option>
                  <Option Value="8">IO程序7已预约</Option>
                  <Option Value="9">IO程序8已预约</Option>
                  <Option Value="10">IO程序9已预约</Option>
                  <Option Value="11">IO程序10已预约</Option>
                  <Option Value="12">自动运行状态</Option>
                  <Option Value="13">备份错误报警</Option>
                  <Option Value="14">程序运行中</Option>
                </Select>
              </td>
              <td>
                <Select defaultValue="0" disabled={isDisabled} >
                  <Option value="0">0</Option>
                  <Option value="1">1</Option>
                </Select>
              </td>
            </tr>
            <tr align="center">
              <td>1-9</td>
              <td>
                <Select defaultValue="无" disabled={isDisabled}>
                  <Option Value="0">无</Option>
                  <Option Value="1">开机提醒</Option>
                  <Option Value="2">IO程序1已预约</Option>
                  <Option Value="3">IO程序2已预约</Option>
                  <Option Value="4">IO程序3已预约</Option>
                  <Option Value="5">IO程序4已预约</Option>
                  <Option Value="6">IO程序5已预约</Option>
                  <Option Value="7">IO程序6已预约</Option>
                  <Option Value="8">IO程序7已预约</Option>
                  <Option Value="9">IO程序8已预约</Option>
                  <Option Value="10">IO程序9已预约</Option>
                  <Option Value="11">IO程序10已预约</Option>
                  <Option Value="12">自动运行状态</Option>
                  <Option Value="13">备份错误报警</Option>
                  <Option Value="14">程序运行中</Option>
                </Select>
              </td>
              <td>
                <Select defaultValue="0" disabled={isDisabled} >
                  <Option value="0">0</Option>
                  <Option value="1">1</Option>
                </Select>
              </td>
            </tr>
            <tr align="center">
              <td>1-10</td>
              <td>
                <Select defaultValue="无" disabled={isDisabled}>
                  <Option Value="0">无</Option>
                  <Option Value="1">开机提醒</Option>
                  <Option Value="2">IO程序1已预约</Option>
                  <Option Value="3">IO程序2已预约</Option>
                  <Option Value="4">IO程序3已预约</Option>
                  <Option Value="5">IO程序4已预约</Option>
                  <Option Value="6">IO程序5已预约</Option>
                  <Option Value="7">IO程序6已预约</Option>
                  <Option Value="8">IO程序7已预约</Option>
                  <Option Value="9">IO程序8已预约</Option>
                  <Option Value="10">IO程序9已预约</Option>
                  <Option Value="11">IO程序10已预约</Option>
                  <Option Value="12">自动运行状态</Option>
                  <Option Value="13">备份错误报警</Option>
                  <Option Value="14">程序运行中</Option>
                </Select>
              </td>
              <td>
                <Select defaultValue="0" disabled={isDisabled} >
                  <Option value="0">0</Option>
                  <Option value="1">1</Option>
                </Select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div >
  );
}
export default connect(mapStateToProps)(Iostatushint)