import React, { useState, useEffect, useCallback } from "react";
import { Button, Col, Input, Select, Row,message } from "antd";
import intl from "react-intl-universal";
import ConTitle from "../../../../components/title";
import { connect } from "dva";
import { sendMSGtoController} from "service/network";
import "./index.css";
import { useHistory } from "react-router-dom";

const mapStateToProps = (state)=>{
  return{
    currentTool: state.index.robotStatus.currentTool,
    currentRobot: state.index.robotStatus.currentRobot,
    Toohands: state.index.Toohands.value,
  }
}

function Toolhands(props) {
  const [ isDisabled, setIsDisabled ] = useState(true);
  const [ buttonType1, setButtonType1 ] = useState(true);
  const [ handsValue, setHandsValue ] = useState(props.currentTool);
  const [ Toohands, setToohands ] = useState(props.Toohands)
  const [ bdBody, setBdBody ] = useState('');
  const [ handsSelect, setHandsSelect ] = useState('')

  const { Option } = Select;
  const history = useHistory();
  // 切换工具手
  const selectChange = useCallback((value) => {
    setHandsValue(value)
    sendMSGtoController("TOOLNUMBER_SWITCH",{curToolNum:handsValue,robot:props.currentRobot})
  },[handsValue,props.currentRobot])
  // 渲染选择框
  useEffect(()=>{
    setHandsSelect(
      <div>
        <span>{intl.get("选择工具手")}:</span>
        <Select
          value={handsValue}
          style={{ width: 200, margin: 20 }}
          onChange = { selectChange }
        >
          <Option key='1' value={0}>无工具手</Option>
          <Option key='2' value={1}>{intl.get("工具手")}1</Option>
          <Option key='3' value={2}>{intl.get("工具手")}2</Option>
          <Option key='4' value={3}>{intl.get("工具手")}3</Option>
          <Option key='5' value={4}>{intl.get("工具手")}4</Option>
          <Option key='6' value={5}>{intl.get("工具手")}5</Option>
          <Option key='7' value={6}>{intl.get("工具手")}6</Option>
          <Option key='8' value={7}>{intl.get("工具手")}7</Option>
          <Option key='9' value={8}>{intl.get("工具手")}8</Option>
          <Option key='10' value={9}>{intl.get("工具手")}9</Option>
        </Select>
      </div>
    )
  },[isDisabled,handsValue,selectChange])

  // 实时更新工具手
  useEffect(()=>{
    setHandsValue(props.currentTool)
  },[props.currentTool])

  // 实时刷新数据
  useEffect(()=>{
    setToohands(props.Toohands)
  },[props.Toohands])

  // 选中工具手
  const selecthands = () =>{
    sendMSGtoController("TOOLPARAMETER_INQUIRE",{toolNum:handsValue})
  }
  // 修改输入框内容
  const IptValueChange = useCallback((e,el)=>{
    let Data = Toohands;
    Data.tool[el] = e.target.value;
    setToohands({...Data})
  },[Toohands])

  // 点击标定
  const demarInstr = (el) =>{
    console.log(el)
    console.log(handsValue)
    if(handsValue === 0){
      message.error('请切换到无工具手状态')
    }else{
      if(el === '7'){
        console.log('点击了7点标定')

      }else{
        console.log('点击了20点标定')
      }
    }

  };
  // 渲染表格
  useEffect(()=>{
    setBdBody(
      <div className="tooltab">
        <table>
          <tbody>
            <tr key='1' align="center">
              <td>X{intl.get("轴方向偏移")}</td>
              <td>
                <Input
                  style={{ width: "180px" }}
                  value={Toohands.tool.x}
                  disabled={isDisabled}
                  onChange={(e)=>{ IptValueChange(e,'x') }}
                />
              </td>
              <td>mm</td>
            </tr>
            <tr key='2' align="center">
              <td>Y{intl.get("轴方向偏移")}</td>
              <td>
                <Input
                  style={{ width: "180px" }}
                  value={Toohands.tool.y}
                  disabled={isDisabled}
                  onChange={(e)=>{ IptValueChange(e,'y') }}
                />
              </td>
              <td>mm</td>
            </tr>
            <tr key='3' align="center">
              <td>Z{intl.get("轴方向偏移")}</td>
              <td>
                <Input
                  style={{ width: "180px" }}
                  value={Toohands.tool.z}
                  disabled={isDisabled}
                  onChange={(e)=>{ IptValueChange(e,'z') }}
                />
              </td>
              <td>mm</td>
            </tr>
            <tr key='4' align="center">
              <td>{intl.get("绕A轴旋转")}</td>
              <td>
                <Input
                  style={{ width: "180px" }}
                  value={Toohands.tool.A}
                  disabled={isDisabled}
                  onChange={(e)=>{ IptValueChange(e,'A') }}
                />
              </td>
              <td>mm</td>
            </tr>
            <tr key='5' align="center">
              <td>{intl.get("绕B轴旋转")}</td>
              <td>
                <Input
                  style={{ width: "180px" }}
                  value={Toohands.tool.B}
                  disabled={isDisabled}
                  onChange={(e)=>{ IptValueChange(e,'B') }}
                />
              </td>
              <td>mm</td>
            </tr>
            <tr key='6' align="center">
              <td>{intl.get("绕C轴旋转")}</td>
              <td>
                <Input
                  style={{ width: "180px" }}
                  value={Toohands.tool.C}
                  disabled={isDisabled}
                  onChange={(e)=>{ IptValueChange(e,'C') }}
                />
              </td>
              <td>mm</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  },[isDisabled,Toohands,IptValueChange,props.currentTool])
  return (
    <div>
      {/* 头部 */}
      <ConTitle title={intl.get("工具手")} subtitle={intl.get("工具手设置")} />
      {/* 悬浮按钮 */}
      {buttonType1 === true?
        <div className="hoverButton1">
          <Button
           size="large"
           type="primary"
           shape="circle"
           style={{
             border: "none",
             fontSize:"14px"
           }}
           onClick={()=>{
            setButtonType1(false)
            setIsDisabled(false);
           }}
          >
            修改
          </Button>
        </div>
        :<div><div className="hoverButton1">
          <Button
           size="large"
           type="primary"
           shape="circle"
           style={{
             border: "none",
             fontSize:"14px"
           }}
           onClick={()=>{
            setButtonType1(true)
            setIsDisabled(true);
            let DataList = {
              toolNum:handsValue,
              tool:{
                note:Toohands.tool.note,
                x:Number(Toohands.tool.x),
                y:Number(Toohands.tool.y),
                z:Number(Toohands.tool.z),
                A:Number(Toohands.tool.A),
                B:Number(Toohands.tool.B),
                C:Number(Toohands.tool.C),
              }
            };
            sendMSGtoController("TOOLPARAMETER_SET",DataList)
           }}
          >
            保存
          </Button>
        </div>
        <div className="hoverButton2">
          <Button
           size="large"
           type="primary"
           shape="circle"
           style={{
             border: "none",
             fontSize:"14px"
           }}
           onClick={()=>{
            setButtonType1(true)
            setIsDisabled(true);
           }}
          >
            取消
          </Button>
        </div>
        </div>
      }
      <div className="linkButton">
        <Button type="dashed" onClick={()=>{demarInstr('7')}}>{intl.get("7点标定")}</Button>
        <Button type="dashed" onClick={()=>{demarInstr('20')}}>{intl.get("20点标定")}</Button>
      </div>

      {/* 主要内容 */}
      <div className="Toolhands">
        <Row style={{width:"100%"}}>
          <Col span={20} offset={2}>
            <div style={{ paddingBottom: 10 }}>
              {handsSelect}
              <p>
                <Button
                  style={{ width: 160 }}
                  type="primary"
                  onClick={selecthands}
                >
                  {intl.get("选中")}
                </Button>
              </p>
            </div>
            {bdBody}
          </Col>
        </Row>
      </div>
    </div>
  );
}
export default connect(mapStateToProps)(Toolhands);
