import React, { useState, useEffect } from "react";
import { Row, Col,Button,Drawer,Form } from "antd";
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
const instructType = [
  { name: "运动控制", list: ["MOVJ", "MOVL", "MOVC"] },
  { name: "条件控制", list: ["IF", "ELSE"] },
  { name: "变量", list: ["xx", "aa"] },
];
function ProgramComponent(props) {
  const [insertOrChange, setInsertOrChange] = useState("insert");
  const [changeVisible, setChangeVisible] = useState(false);
  const [instructList, setInstructList] = useState();
  const [type, setType] = useState(0);
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
  useEffect(() => {
    let rightList = [];
    let ins = instructType[type].list;
    ins.map((value) => {
      rightList.push(<p>{value}</p>);
    });
    setInstructList(rightList); 
  }, [type]);
  const changeType = (type) => {
    setType(type);
  };

  const renderType = () => {
    let leftList = [];
    instructType.map((value, index) => {
      leftList.push(<p onClick={changeType.bind(this, index)}>{value.name}</p>);
    });
    return leftList;
  };
  return (
    <div className="programcomponent">
      <div className="progadd">
        <Row>
          <Col span={7} className="progaddLeft">
            {renderType()}
          </Col>
          <Col span={17} className="progaddRight">
            {instructList}
          </Col>
        </Row>
      </div>
      <div className="progmore">
        <Row>
          <Col span={6}>111</Col>
          <Col span={6}>22</Col>
          <Col span={6}>33</Col>
        </Row>
      </div>
      <div className="progicon">
        <Row>
          <Col span={6} offset={3}>
            <PlusOutlined className="icon" />
          </Col>
          <Col span={6}>
            <EditOutlined className="icon" />
          </Col>
          <Col span={6}>
            <EllipsisOutlined className="icon" />
          </Col>
        </Row>
      </div>
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
