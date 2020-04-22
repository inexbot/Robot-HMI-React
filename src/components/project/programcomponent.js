import React, { useState, useEffect } from "react";
import { Row, Col, Button, Drawer, Form, Modal } from "antd";
import { connect } from "dva";
import {
  PlusOutlined,
  EditOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import ChangeInstructValue, {
  instructType,
} from "layout/pages/program_changevalue_header";
import { sendMSGtoServer } from "service/network";
import { changevalue } from "service/network";
import "./programcomponent.css";
const { confirm } = Modal;
const mapStateToProps = (state) => {
  return {
    program: state.index.program,
  };
};

function ProgramComponent(props) {
  const [insertOrChange, setInsertOrChange] = useState("insert");
  const [changeVisible, setChangeVisible] = useState(false);
  const [instructList, setInstructList] = useState();
  const [type, setType] = useState(0);
  const [insertName, setInsertName] = useState();
  const [form] = Form.useForm();
  const selectedName = props.selectedName;
  const selectedRow = props.selectedRow;
  useEffect(() => {
    let rightList = [];
    let ins = instructType[type].list;
    ins.map((value) => {
      rightList.push(
        <p onClick={insertCommand.bind(this, value)} key={value}>
          {value}
        </p>
      );
    });
    setInstructList(rightList);
  }, [type]);
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
  const handleCancelDeleteCommand = () => {
    Modal.destroyAll();
  };
  const handleOkDeleteCommand = () => {
    let deleteData = {
      line: selectedRow,
    };
    sendMSGtoServer("DELETE_COMMAND", deleteData);
    Modal.destroyAll();
  };
  const modalConfigDeleteCommand = {
    title: "确认",
    onOk: handleOkDeleteCommand,
    onCancel: handleCancelDeleteCommand,
    destroyOnClose: true,
    content: (
      <div>
        <p>是否确认删除第{selectedRow}指令</p>
        <p>{selectedName}</p>
      </div>
    ),
  };
  const showModalDeleteCommand = () => {
    confirm(modalConfigDeleteCommand);
  };

  const changeType = (type) => {
    setType(type);
  };

  const renderType = () => {
    let leftList = [];
    instructType.map((value, index) => {
      leftList.push(
        <p onClick={changeType.bind(this, index)} key={value.name}>
          {value.name}
        </p>
      );
    });
    return leftList;
  };
  const insertCommand = (value) => {
    setInsertOrChange("insert");
    setInsertName(value);
    setChangeVisible(true);
  };
  return (
    <div className='progcomponent'>
      <div className='progadd'>
        <Row>
          <Col span={8} className='progaddLeft'>
            {renderType()}
          </Col>
          <Col span={16} className='progaddRight'>
            {instructList}
          </Col>
        </Row>
      </div>
      <div className='progmore'>
        <Row>
          <Col span={6} onClick={showModalDeleteCommand}>
            删除
          </Col>
          <Col span={6}>22</Col>
          <Col span={6}>33</Col>
        </Row>
      </div>
      <div className='progicon'>
        <Row>
          <Col span={6} offset={3}>
            <PlusOutlined className='icon' />
          </Col>
          <Col span={6}>
            <EditOutlined className='icon' onClick={changevalue} />
          </Col>
          <Col span={6}>
            <EllipsisOutlined className='icon' />
          </Col>
        </Row>
      </div>
      <Drawer
        title={`指令`}
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
              {() => {
                if (insertOrChange === "change") {
                  return "保存";
                } else {
                  return "插入";
                }
              }}
            </Button>
          </div>
        }>
        <ChangeInstructValue
          changeName={selectedName}
          row={selectedRow}
          form={form}
          insertName={insertName}
          insertOrChange={insertOrChange}
        />
      </Drawer>
    </div>
  );
}
export default connect(mapStateToProps)(ProgramComponent);
