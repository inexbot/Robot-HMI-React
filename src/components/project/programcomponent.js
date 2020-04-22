import React,{useState} from "react";
import { Row, Col,Button,Drawer,Form} from "antd";
import { connect } from "dva";
import {
  PlusOutlined,
  EditOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import ChangeInstructValue from "layout/pages/program_changevalue_header";
import { sendMSGtoServer } from "service/network";
import { changevalue } from "service/network";
import "./programcomponent.css";

const mapStateToProps = (state) => {
  return {
    program: state.index.program,
  };
};
function ProgramComponent(props) {
  const [insertOrChange, setInsertOrChange] = useState("insert");
  const [changeVisible, setChangeVisible] = useState(false);
  const [form] = Form.useForm();
  const selectedName = props.selectedName;
  const selectedRow = props.selectedRow;
  const onClose = () => {
    setChangeVisible(false);
  };
  const onFinish = () => {
    form.submit();
  };
  const changevalue = () => {
    setInsertOrChange("change");
    setChangeVisible(true);
  };
  const deleteCommand = () => {
    let deleteData = {
      line: selectedRow,
    };
    sendMSGtoServer("DELETE_COMMAND", deleteData);
  };
  return (
    <div className="programcomponent">
      <Row style={{ width: "100%" }}>
        <Col span={6} offset={3}>
          <PlusOutlined className="icon" />
        </Col>
        <Col span={6}>
          <EditOutlined className="icon" onClick={changevalue}/>
        </Col>
        <Col span={6}>
          <EllipsisOutlined className="icon" />
        </Col>
      </Row>
      <Drawer
        title='指令'
        width={720}
        onClose={onClose}
        visible={changeVisible}
        bodyStyle={{ paddingBottom: 80 }}
        destroyOnClose={true}
        closable={false}
        footer={
          <div
            style={{
              textAlign: "left",
            }}>
            <Button onClick={onClose} style={{ marginRight: 8 }}>
              关闭
            </Button>
            <Button onClick={onFinish} style={{ marginRight: 8 }}>
              保存
            </Button>
          </div>
        }>
        <ChangeInstructValue
          name={selectedName}
          row={selectedRow}
          form={form}
          insertOrChange={insertOrChange}
        />
      </Drawer>
    </div>
  );
}
export default connect(mapStateToProps)(ProgramComponent);
