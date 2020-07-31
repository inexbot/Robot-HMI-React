import React, { useEffect } from "react";
import { RrenderPosOption, RnewPos } from "./renderPos";
import { Form, Input, Select, message} from "antd";
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
const insertDefaultValue = {
  POS: "new",
  V: 40,
  PL: 5,
  ACC: 10,
  DEC: 10,
  TIME: 0,
};

function Samov(props) {
  const x = () => {
    if (
      props.program.var !== undefined &&
      props.program.var.position !== undefined
    ) {
      return props.program.var.position;
    } else {
      return [];
    }
  };
  const posSum = x();
  //把指令的数据传送到抽屉里输入框
  useEffect(() => {
    let para;
    if (props.insertOrChange === "change") {
      if(props.programSeletedRow.length  > 1){
        para = {
          V: 0,
          PL: 0,
          ACC: 0,
          DEC: 0,
          TIME: 0,
        }
        props.form.setFieldsValue({
          POS: para.POS,
          V: para.V,
          PL: para.PL,
          ACC: para.ACC,
          DEC: para.DEC,
          TIME :para.TIME,
        });

      }else if(props.programSeletedRow.length ===1){
        para = props.programSeletedRow[0].paras;
        props.form.setFieldsValue({
          POS: para.POS,
          V: para.V,
          PL: para.PL,
          ACC: para.ACC,
          DEC: para.DEC,
          TIME :para.TIME,
        });
      }else if(props.programSeletedRow.length ===0){
        message.error("请选择指令进行修改")
      }
    } else {
      para = insertDefaultValue;
      props.form.setFieldsValue({
        POS: para.POS,
        V: para.V,
        PL: para.PL,
        ACC: para.ACC,
        DEC: para.DEC,
        TIME :para.TIME,
      });
    }
  }, [props.row, props.insertOrChange, props.form, props.programSeletedRow]);
  
  const onFinish = (value) => {
    let pos;
    let posType;
    let posName;
    if (value.POS === "new") {
      pos = props.currentPos;
      posType = 0;
      posName = RnewPos(posSum);
    } else {
      pos = value.POS;
      posType = 1;
      posName = null;
    }
    if (props.insertOrChange === "change") {
      if( props.programSeletedRow.length >= 2){
        let nums = props.programSeletedRow.map((index)=>{
          return index.order
        })
        let sendData = {
          selectlines:nums,
          V: parseFloat(value.V),
          ACC: parseFloat(value.ACC),
          DEC: parseFloat(value.DEC),
          PL: parseInt(value.PL),
          TIME: parseInt(value.TIME)
        }
        sendMSGtoServer("AMEND_COMMAND", sendData);
        props.setClose();
      }else{ 
        let sendData = {
          line: parseInt(props.programSeletedRow[0].order),
          modifystate: 1,
          name: "SAMOV",
          postype: posType,
          posname: posName,
          POS: pos,
          V: parseFloat(value.V),
          ACC: parseFloat(value.ACC),
          DEC: parseFloat(value.DEC),
          PL: parseInt(value.PL),
          TIME: parseInt(value.TIME)
        };
        sendMSGtoServer("INSERT_COMMAND", sendData);
        props.setClose();
      }
      
      
    } else {
      console.log(props.programSeletedRow.length,props.selectmodalnum,props.program.instruct)
      //根据num来判断插入的是哪一行
       let num = 1
      if( props.programSeletedRow.length === 0 ){
        props.selectmodalnum.splice(1)
        if(props.program.instruct === undefined){
          num = 1
        }else{
          num = props.program.instruct.length 
        }
      }else{
        if(props.selectmodalnum.length === 2){
          num = 1
          props.selectmodalnum.splice(1)
        }else{
          num =  props.programSeletedRow[0].key + 1
        }
      }
      let sendInsert = {
        line: parseInt(num),
        modifystate: 0,
        name: "SAMOV",
        postype: posType,
        posname: posName,
        POS: pos,
        V: parseFloat(value.V),
        ACC: parseFloat(value.ACC),
        DEC: parseFloat(value.DEC),
        PL: parseInt(value.PL),
        TIME: parseInt(value.TIME)
      };
      sendMSGtoServer("INSERT_COMMAND", sendInsert);
      props.setClose();
    }
  };
  return (
    <Form
      form={props.form}
      name="control-hooks"
      layout="inline"
      onFinish={onFinish}
    >
       {props.programSeletedRow.length > 1 ? " " : <Form.Item
        name="POS"
        label="POS"
        rules={[
          {
            required: true,
          },
        ]}
      >
       <Select style={{ width: 200 }}>{RrenderPosOption(posSum)}</Select>
      </Form.Item>} 
      <Form.Item
        name="B"
        label="B"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input style={{ width: 200 }} />
      </Form.Item>
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
      <Form.Item
        name="TIME"
        label="TIME"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input style={{ width: 200 }} />
      </Form.Item>
    </Form>
  );
}
export default connect(mapStateToProps)(Samov);
