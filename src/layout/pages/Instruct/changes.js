import React, { useEffect, useState } from "react";
import { Form, Input, Switch} from "antd";
import { connect } from "dva";
import { sendMSGtoServer } from "service/network";

const mapStateToProps = (state) => {
  return {
    program: state.index.program,
    currentPos: state.index.robotStatus.pos,
    programSeletedRow: state.App.programSeletedRow,
    selectmodalnum: state.App.selectmodalnum
  };
};

function Changes(props) {
  const [ Ipt1, setIpt1 ] = useState(false)
  const [ Ipt2, setIpt2 ] = useState(false)
  const [ Ipt3, setIpt3 ] = useState(false)
  const [ Ipt4, setIpt4 ] = useState(false)
  const [ Ipt5, setIpt5 ] = useState(false)

  // 把指令的数据传送到抽屉里的输入框
  useEffect(()=>{
    // let para;
    // para = {
    //   V: 0,
    //   VJ: 0,
    //   PL: 0,
    //   Acc: 0,
    //   DEC: 0,
    // }
    props.form.setFieldsValue({
      V: 0,
      POS: 0,
      VJ: 0,
      PL: 0,
      ACC: 0,
      DEC: 0,
    })
  },[props.form])
  const onFinish= (value) => {
    // let pos;
    // let posType;
    // let posName;
    // pos = value.POS;
    // posType = 1;
    // posName = null;
    let nums = props.programSeletedRow.map((index)=>{
        return index.order
    });
    let data1 = { V: Number(value.V) };
    let data2 = { VJ: Number(value.VJ) };
    let data3 = { PL: Number(value.PL) };
    let data4 = { ACC: Number(value.ACC) };
    let data5 = { DEC: Number(value.DEC) };
    if( Ipt1 === false ){
      data1 = ''
    }
    if( Ipt2 === false ){
      data2 = ''
    }
    if( Ipt3 === false ){
      data3 = ''
    }
    if( Ipt4 === false ){
      data4 = ''
    }
    if( Ipt5 === false ){
      data5 = ''
    }
    let sendData = {selectlines:nums, ...data1,...data2,...data3,...data4,...data5, }
    if( Ipt1===false && Ipt2===false && Ipt3===false && Ipt4===false && Ipt5===false ){
    }else{
      sendMSGtoServer("AMEND_COMMAND", sendData);
    }
    props.setClose();
  }
  // 使用按钮来控制参数是否修改  
  const onChange1 = (checked) =>{
    setIpt1(checked)
  }
  const onChange2 = (checked) =>{
    setIpt2(checked)
  }
  const onChange3 = (checked) =>{
    setIpt3(checked)
  }
  const onChange4 = (checked) =>{
    setIpt4(checked)
  }
  const onChange5 = (checked) =>{
    setIpt5(checked)
  }
  return (
    <Form
    form={props.form}
    name="control-hooks"
    layout="inline"
    onFinish={onFinish}
  >
    <Form.Item
      name="V"
      label="V"
      rules={[
        {
          required: true,
        },
      ]}
    >
      <Input style={{ width: 200 }} />
    </Form.Item>
    <div style={{ height:'62px',width:'50px',display:'flex', justifyContent:'center',alignItems:'center' }}>
      <Switch defaultChecked={false} onChange={onChange1} style={{ lineHeight:'320px' }} /> 
    </div>
    <Form.Item
      name="VJ"
      label="VJ"
      rules={[
        {
          required: true,
        },
      ]}
    >
      <Input style={{ width: 200 }} />
    </Form.Item>
    <div style={{ height:'62px',width:'50px',display:'flex', justifyContent:'center',alignItems:'center' }}>
      <Switch defaultChecked={false} onChange={onChange2} style={{ lineHeight:'320px' }} /> 
    </div>
    <Form.Item
      name="PL"
      label="PL"
      rules={[
        {
          required: true,
        },
      ]}
    >
      <Input style={{ width: 200 }} />
    </Form.Item>
    <div style={{ height:'62px',width:'50px',display:'flex', justifyContent:'center',alignItems:'center' }}>
      <Switch defaultChecked={false} onChange={onChange3} style={{ lineHeight:'320px' }} /> 
    </div>
    <Form.Item
      name="ACC"
      label="ACC"
      rules={[
        {
          required: true,
        },
      ]}
    >
      <Input style={{ width: 200 }} />
    </Form.Item>
    <div style={{ height:'62px',width:'50px',display:'flex', justifyContent:'center',alignItems:'center' }}>
      <Switch defaultChecked={false} onChange={onChange4} style={{ lineHeight:'320px' }} /> 
    </div>
    <Form.Item
      name="DEC"
      label="DEC"
      rules={[
        {
          required: true,
        },
      ]}
    >
      <Input style={{ width: 200 }} />
    </Form.Item>
    <div style={{ height:'62px',width:'50px',display:'flex', justifyContent:'center',alignItems:'center' }}>
      <Switch defaultChecked={false} onChange={onChange5} style={{ lineHeight:'320px' }} /> 
    </div>
  </Form>
  )
}
export default connect(mapStateToProps)(Changes)