import React, { useEffect } from "react";
import { renderPosOption, newPos } from "./renderPos";
import { Form, Input, Select } from "antd";
import { connect } from "dva";
import { sendMSGtoServer } from "service/network";
const { Option } = Select;
const mapStateToProps = (state) => {
  return {
    program: state.index.program,
    currentPos: state.index.robotStatus.pos,
  };
};
const insertDefaultValue = {
  POS: "new",
  V: 40,
  PL: 5,
  ACC: 10,
  DEC: 10,
  SPIN: 0,
};

function MovcA(props) {

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
      // console.log(props.program.instruct[props.row])
      para = props.program.instruct[props.row].para;
    } else {
      para = insertDefaultValue;
    }
    props.form.setFieldsValue({
      POS: para.POS,
      V: para.V,
      PL: para.PL,
      ACC: para.ACC,
      DEC: para.DEC,
      SPIN: para.SPIN,
    });
  }, [props.row, props.insertOrChange, props.form,props.program.instruct]);
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
    console.log(value);
    if (props.insertOrChange === "change") {
      let sendData = {
        line: parseInt(props.row),
        modifystate: 1,
        name: "MOVCA",
        postype: posType,
        posname: posName,
        POS: pos,
        V: parseFloat(value.V),
        ACC: parseFloat(value.ACC),
        DEC: parseFloat(value.DEC),
        PL: parseInt(value.PL),
        SPIN: parseInt(value.SPIN),
      };
      sendMSGtoServer("INSERT_COMMAND", sendData);
      props.setClose();
      return;
    } else {
      let sendInsert = {
        line: parseInt(props.row + 1),
        modifystate: 0,
        name: "MOVCA",
        postype: posType,
        posname: posName,
        POS: pos,
        V: parseFloat(value.V),
        ACC: parseFloat(value.ACC),
        DEC: parseFloat(value.DEC),
        PL: parseInt(value.PL),
        SPIN: parseInt(value.SPIN),
      };
      sendMSGtoServer("INSERT_COMMAND", sendInsert);
      props.setClose();
      console.log(sendInsert)
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
        name="SPIN"
        label="SPIN"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select style={{ width: 200 }}>
          <Option value={0}>0</Option>
          <Option value={1}>1</Option>
          <Option value={2}>2</Option>
        </Select>
      </Form.Item>
    </Form>
  );
}
export default connect(mapStateToProps)(MovcA);


alls:[
  {cmd:{axis:0,coord:'RF',logout:false,posidname:"",posidtype:0,positionId:4653062,type:89,varname:"D004"},pos:6,time:"2020.07.23 10:40:26"},
  {cmd:{axis:0,coord:'RF',logout:false,posidname:"P$GI006",posidtype:1,positionId:0,type:89,varname:"GD004"},pos:5,time:"2020.07.23 10:40:12"},
  {cmd:{axis:0,coord:'RF',logout:false,posidname:"G$GI019",posidtype:1,positionId:0,type:89,varname:"GD009"},pos:7,time:"2020.07.23 10:40:37"},
  {cmd:{axis:0,coord:'RF',logout:false,posidname:"G$I004",posidtype:1,positionId:0,type:89,varname:"GD002"},pos:8,time:"2020.07.23 10:40:59"}
]
