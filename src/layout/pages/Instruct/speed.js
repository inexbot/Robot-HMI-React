import React, { useEffect } from "react";
import { newPos } from "./renderPos";
import { Form, Input, message} from "antd";
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
  speed:5.5,
};

function Speed(props) {
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
          speed: 0,
        }
        props.form.setFieldsValue({
          speed: para.speed,
        });
      }else if(props.programSeletedRow.length ===1){
        para = props.programSeletedRow[0].paras;
        props.form.setFieldsValue({
          speed: para.speed,
        });
      }else if(props.programSeletedRow.length ===0){
        message.error("请选择指令进行修改")
      }
    } else {
      para = insertDefaultValue;
      props.form.setFieldsValue({
        speed: para.speed
      });
    }

  }, [props.row, props.insertOrChange, props.form, props.programSeletedRow]);
  
  const onFinish = (value) => {
    let posType;
    let posName;
    if (value.POS === "new") {
      posType = 0;
      posName = newPos(posSum);
    } else {
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
          speed: parseInt(value.speed)
        }
        sendMSGtoServer("AMEND_COMMAND", sendData);
        props.setClose();
      }else{ 
        let sendData = {
          line: parseInt(props.programSeletedRow[0].order),
          modifystate: 1,
          name: "SPEED",
          postype: posType,
          posname: posName,
          speed: parseFloat(value.speed),
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
        name: "SPEED",
        postype: posType,
        posname: posName,
        speed: parseFloat(value.speed),
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
      <Form.Item
        name="speed"
        label="speed"
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
export default connect(mapStateToProps)(Speed);
