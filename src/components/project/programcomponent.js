/*
 * 程序界面右下方的“插入指令，修改指令”等功能的组件
 * 引入ChangeInstructValue、instructType两个方法和变量
 */
import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Button, Drawer, Form, Modal } from "antd";
import { connect } from "dva";
import {
  PlusOutlined,
  EditOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import ChangeInstructValue, {
  instructType,
} from "layout/pages/Program_changevalue_header/index";
import { sendMSGtoServer } from "service/network";
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
  const addClass = useRef();
  const moreClass = useRef();
  useEffect(() => {
    let rightList = [];
    let ins = instructType[type].list;
    ins.map((value) => {
      rightList.push(
        <p onClick={insertCommand.bind(this, value)} key={value}>
          {value}
        </p>
      );
      return value;
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
      isbulk: props.isBulk,
      selectlines: props.multiSelection,
    };
    sendMSGtoServer("DELETE_COMMAND", deleteData);
    Modal.destroyAll();
  };
  const showModalDeleteCommand = () => {
    moreClass.current.style.display = "none";
    let hang = props.multiSelection.map((value) => {
      return value - 1;
    });
    confirm({
      title: "确认",
      onOk: handleOkDeleteCommand,
      onCancel: handleCancelDeleteCommand,
      destroyOnClose: true,
      content: (
        <div>
          <p>是否确认删除第{hang.join("、")}行指令</p>
        </div>
      ),
    });
  };
  const handleAddButton = () => {
    if (addClass.current.style.display === "none") {
      addClass.current.style.display = "block";
      moreClass.current.style.display = "none";
    } else {
      addClass.current.style.display = "none";
    }
  };
  const handleMoreButton = () => {
    if (moreClass.current.style.display === "none") {
      moreClass.current.style.display = "block";
      addClass.current.style.display = "none";
    } else {
      moreClass.current.style.display = "none";
    }
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
      return value;
    });
    return leftList;
  };
  const insertCommand = (value) => {
    setInsertOrChange("insert");
    setInsertName(value);
    setChangeVisible(true);
    moreClass.current.style.display = "none";
    addClass.current.style.display = "none";
  };
  const renderSaveOrInsert = () => {
    return insertOrChange === "change" ? "保存" : "插入";
  };
  return (
    <div className='progcomponent'>
      <div className='progadd' ref={addClass} style={{ display: "none" }}>
        <Row>
          <Col span={8} className='progaddLeft'>
            {renderType()}
          </Col>
          <Col span={16} className='progaddRight'>
            {instructList}
          </Col>
        </Row>
      </div>
      <div className='progmore' ref={moreClass} style={{ display: "none" }}>
        <Row>
          <Col span={8} offset={3}>
            <Button className="proMoreBtn" size="large" onClick={showModalDeleteCommand}> 删除 </Button>
          </Col>
          <Col span={8} offset={2}>
            <Button className="proMoreBtn" size="large">移动</Button>
          </Col>
        </Row>
        <Row>
          <Col span={8} offset={3}>
          <Button className="proMoreBtn" size="large">复制</Button>
          </Col>
          <Col span={8} offset={2}>
          <Button className="proMoreBtn" size="large">粘贴</Button>
          </Col>
        </Row>
      </div>
      <div className='progicon'>
        <Row>
          <Col span={6} offset={3}>
            <PlusOutlined className='icon' onClick={handleAddButton} />
          </Col>
          <Col span={6}>
            <EditOutlined className='icon' onClick={changevalue} />
          </Col>
          <Col span={6}>
            <EllipsisOutlined className='icon' onClick={handleMoreButton} />
          </Col>
        </Row>
      </div>
      <Drawer
        title={`指令`}
        width={500}
        onClose={onClose}
        visible={changeVisible}
        bodyStyle={{ paddingBottom: 80 }}
        destroyOnClose={true}
        closable={false}
        footer={
          <div
            style={{
              textAlign: "left",
              paddingLeft:50,
            }}>
            <Button onClick={onClose} style={{ marginRight: 50 }}>
              关闭
            </Button>
            <Button onClick={onFinish} type="primary" style={{ marginRight: 8 }}>
              {renderSaveOrInsert()}
            </Button>
          </div>
        }>
        <ChangeInstructValue
          changeName={props.selectedName}
          row={props.selectedRow}
          form={form}
          insertName={insertName}
          insertOrChange={insertOrChange}
          setClose={onClose}
        />
      </Drawer>
    </div>
  );
}
export default connect(mapStateToProps)(ProgramComponent);
