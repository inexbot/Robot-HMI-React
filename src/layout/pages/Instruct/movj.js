import React, { useEffect } from "react";
import { renderPosOption, newPos } from "./renderPos";
import { Form, Input, Select, Button } from "antd";
import { connect } from "dva";
import { sendMSGtoServer } from "service/network";

const mapStateToProps = (state) => {
  return {
    program: state.index.program,
    currentPos: state.index.robotStatus.pos,
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
  const posSum = props.program.var.position;
  useEffect(() => {
    let para;
    if (props.insertOrChange === "change") {
      para = props.program.instruct[props.row - 1].para;
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
        pos: props.row,
        POS: value.POS,
        VJ: value.VJ,
        PL: value.PL,
        ACC: value.ACC,
        DEC: value.DEC,
      };
      return;
    } else {
      let sendInsert = {
        line: props.row,
        name: "MOVJ",
        postype: posType,
        posname: posName,
        POS: pos,
        VJ: value.VJ,
        ACC: value.ACC,
        DEC: value.DEC,
        PL: value.PL,
      };
      sendMSGtoServer("INSERT_COMMAND", sendInsert);
    }
  };
  return (
    <Form
      form={props.form}
      name='control-hooks'
      layout='inline'
      onFinish={onFinish}>
      <Form.Item
        name='POS'
        label='POS'
        rules={[
          {
            required: true,
          },
        ]}>
        <Select style={{ width: 200 }}>{renderPosOption(posSum)}</Select>
      </Form.Item>
      <Form.Item
        name='VJ'
        label='VJ'
        rules={[
          {
            required: true,
          },
        ]}>
        <Input style={{ width: 200 }} />
      </Form.Item>
      <Form.Item
        name='PL'
        label='PL'
        rules={[
          {
            required: true,
          },
        ]}>
        <Input style={{ width: 200 }} />
      </Form.Item>
      <Form.Item
        name='ACC'
        label='ACC'
        rules={[
          {
            required: true,
          },
        ]}>
        <Input style={{ width: 200 }} />
      </Form.Item>
      <Form.Item
        name='DEC'
        label='DEC'
        rules={[
          {
            required: true,
          },
        ]}>
        <Input style={{ width: 200 }} />
      </Form.Item>
    </Form>
  );
}
export default connect(mapStateToProps)(Movj);
