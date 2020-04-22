import React, { useEffect } from "react";
import { Form, Input } from "antd";
import { connect } from "dva";

const mapStateToProps = state => {
  return {
    program: state.index.program
  };
};

function Movl(props) {
  const parameter = props.program.instruct[props.row - 1].para;
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      L1: parameter.V
    });
  }, [parameter,form]);

  return (
    <Form form={form} name="control-hooks" layout="inline">
      <Form.Item
        name="L1"
        label="L1"
        rules={[
          {
            required: true
          }
        ]}
      >
        <Input style={{ width: 200 }} />
      </Form.Item>
    </Form>
  );
}
export default connect(mapStateToProps)(Movl);
