import React, { useEffect } from "react";
import { renderPosOption, newPos } from "./renderPos";
import { Form, Input, Select } from "antd";
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
  VJ: 40,
  PL: 5,
  ACC: 10,
  DEC: 10,
};

function Movj(props) {
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
  useEffect(() => {
    let para;
    if (props.insertOrChange === "change") {
      para = props.program.instruct[props.row].para;
    } else {
      para = insertDefaultValue;
    }
    props.form.setFieldsValue({
      POS: para.POS,
      VJ: para.VJ,
      PL: para.PL,
      ACC: para.ACC,
      DEC: para.DEC,
    });
  }, [props.row, props.insertOrChange, props.form]);
  const onFinish = (value) => {
    let pos;
    let posType;
    let posName;
    if (value.POS === "new") {
      pos = props.currentPos;
      posType = 0;
      posName = newPos(posSum);
    } else {
      pos = value.POS;
      posType = 1;
      posName = null;
    }
    if (props.insertOrChange === "change") {
      let sendData = {
        line: parseInt(props.row),
        modifystate: 1,
        name: "MOVJ",
        postype: posType,
        posname: posName,
        POS: pos,
        VJ: parseFloat(value.VJ),
        ACC: parseFloat(value.ACC),
        DEC: parseFloat(value.DEC),
        PL: parseInt(value.PL),
      };
      sendMSGtoServer("INSERT_COMMAND", sendData);
      props.setClose();
      return;
    } else {
      console.log(props)
       let num = 1
       console.log(props.programSeletedRow.length)
      if( props.programSeletedRow.length == 0 ){
        num = props.program.instruct.length + 1
        // console.log(num)
      }else{
        console.log(props.selectmodalnum)
        if(props.selectmodalnum.length == 2){
          num = 1
        }else{
          num =  props.programSeletedRow[0].key + 1
        }

      }
      console.log(num)
      let sendInsert = {
        line: parseInt(props.row + num),
        modifystate: 0,
        name: "MOVJ",
        postype: posType,
        posname: posName,
        POS: pos,
        VJ: parseFloat(value.VJ),
        ACC: parseFloat(value.ACC),
        DEC: parseFloat(value.DEC),
        PL: parseInt(value.PL),
      };
      sendMSGtoServer("INSERT_COMMAND", sendInsert);
      props.setClose();
    }
  };
  console.log(props.form)
  return (
    <Form
      form={props.form}
      name="control-hooks"
      layout="inline"
      onFinish={onFinish}
    >
      <Form.Item
        name="POS"
        label="POS"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select style={{ width: 200 }}>{renderPosOption(posSum)}</Select>
      </Form.Item>
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
    </Form>
  );
}
export default connect(mapStateToProps)(Movj);
