/*
 * 程序界面右下方的“插入指令，修改指令”等功能的组件
 * 引入ChangeInstructValue、instructType两个方法和变量
 */
import React, { useState, useEffect, useRef } from "react";
import {
  Row,
  Col,
  Button,
  Drawer,
  Form,
  Modal,
  message,
  InputNumber,
} from "antd";
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
    // VirtualTable: state.App.programSeletedRow,
    dataList: state.App.programSeletedRow,
    pargamList: state.App.programList,
    deleteList: state.App.deleteList,
    programSeletedRow: state.App.programSeletedRow,
    selectmodalnum: state.App.selectmodalnum,
  };
};

function ProgramComponent(props) {
  const [insertOrChange, setInsertOrChange] = useState("insert");
  const [changeVisible, setChangeVisible] = useState(false);
  const [showmodalCopy, setShowmodalCopy] = useState(false);
  const [Copynum, setCopynum] = useState(0)
  const [instructList, setInstructList] = useState();
  const [type, setType] = useState(0);
  const [ShowModal, setShowModal] = useState(false);
  const [insertName, setInsertName] = useState();
  const [form] = Form.useForm();
  const addClass = useRef();
  const moreClass = useRef();
  // console.log(props.pargamList,props.program,props.dataList)
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
    // console.log('sss')
  };
  const changevalue = () => {
    setInsertOrChange("change");
    setChangeVisible(true);
  };
  const handleCancelDeleteCommand = () => {
    Modal.destroyAll();
  };
  const handleOkDeleteCommand = () => {
    let selectlines = props.dataList.map((value) => {
      return value.order;
    });
    let isbulk = 0;
    if (props.dataList.length > 1) {
      isbulk = 1;
    } else {
      isbulk = 0;
    }
    let deleteData = {
      isbulk,
      selectlines,
    };
    // console.log(props.isBulk,props.multiSelection)

    sendMSGtoServer("DELETE_COMMAND", deleteData);
    props.programSeletedRow.splice(0)
    Modal.destroyAll();
  };
  const showModalDeleteCommand = () => {
    // console.log(props.deleteList)

    moreClass.current.style.display = "none";
    // console.log(props.dataList)

    let hang = props.dataList.map((value) => {
      // console.log(value)
      return value.order;
    });
    confirm({
      title: "确认",
      onOk: handleOkDeleteCommand,
      onCancel: handleCancelDeleteCommand,
      destroyOnClose: true,
      content: (
        <div>
          <p>
            是否确认删除第
            {props.programSeletedRow.length == 0 ? "1" : hang.join("、")}行指令
          </p>
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

  const copysuccess = () => {
    let hang = props.dataList.map((value) => {
      // console.log(value)
      return value.order;
    });
    message.success(`成功复制第${hang.join("、")}行指令`);
  };
  
  const copyerror = () => {
    message.error('请选择想要复制的指令')
  }

  const changePasteList = (value) => {
    setCopynum(value)
  };

  const pasteList = () => {
    setShowmodalCopy(true);
  };

  return (
    <div className="progcomponent">
      <div className="progadd" ref={addClass} style={{ display: "none" }}>
        <Row>
          <Col span={8} className="progaddLeft">
            {renderType()}
          </Col>
          <Col span={16} className="progaddRight">
            {instructList}
          </Col>
        </Row>
      </div>
      <div className="progmore" ref={moreClass} style={{ display: "none" }}>
        <Row>
          <Col span={8} offset={3}>
            <Button
              className="proMoreBtn"
              size="large"
              onClick={showModalDeleteCommand}
            >
              {" "}
              删除{" "}
            </Button>
          </Col>
          <Col span={8} offset={2}>
            <Button className="proMoreBtn" size="large">
              移动
            </Button>
          </Col>
        </Row>
        <Row>
          <Col span={8} offset={3}>
            <Button className="proMoreBtn" size="large" onClick={() =>{
              if(props.programSeletedRow.length == 0 ){
                copyerror()
              }else{
                copysuccess()
              }
            }}>
              复制
            </Button>
          </Col>
          <Col span={8} offset={2}>
            <Button className="proMoreBtn" size="large" onClick={pasteList}>
              粘贴
            </Button>
          </Col>
        </Row>
      </div>
      <Modal
       visible={showmodalCopy}
       //点击粘贴模态框的确定按钮
       onOk={ ()=>{
        let hang = props.dataList.map((value) => {
          return value.order;
        });
        console.log(hang)
        let copyData = {
          lineto:Copynum -1,
          selectlines:hang
        };
        sendMSGtoServer("COPY_COMMAND", copyData)
        props.programSeletedRow.splice(0)
        Modal.destroyAll();
        setShowmodalCopy(false)
       } }
       //点击粘贴模态框的取消按钮
       onCancel={ ()=>{
        setShowmodalCopy(false)
       }}
      > 请选择插入第几行:
        <InputNumber
          min={1}
          max={props.program.instruct.length}
          defaultValue={0}
          onChange={changePasteList}
        />
      </Modal>

      <div className="progicon">
        <Row>
          <Col span={6} offset={3}>
            <PlusOutlined className="icon" onClick={handleAddButton} />
          </Col>
          <Col span={6}>
            <EditOutlined className="icon" onClick={changevalue} />
          </Col>
          <Col span={6}>
            <EllipsisOutlined className="icon" onClick={handleMoreButton} />
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
              paddingLeft: 50,
            }}
          >
            <Modal
              onCancel={() => {
                setShowModal(false);
              }}
              visible={ShowModal}
              footer={null}
              centered={true}
              maskClosable={true}
            >
              <Button
                style={{ width: "400px", margin: "10px" }}
                onClick={() => {
                  props.selectmodalnum.splice(1);
                  props.selectmodalnum.push({ b: 2 });
                  onFinish();
                  setShowModal(false);
                  // props.selectmodalnum.splice(1)
                }}
              >
                插入到上一行
              </Button>
              <Button
                style={{ width: "400px", margin: "10px" }}
                onClick={() => {
                  props.selectmodalnum.splice(1);
                  onFinish();
                  setShowModal(false);
                }}
              >
                插入到下一行
              </Button>
            </Modal>

            <Button onClick={onClose} style={{ marginRight: 50 }}>
              关闭
            </Button>
            {/* 点击插入按钮 */}
            <Button
              onClick={() => {
                // console.log(props.programSeletedRow.length);
                if (props.programSeletedRow.length == 1) {
                  if (props.programSeletedRow[0].key == 1) {
                    // selectmodal();
                    // console.log("sss")
                    setShowModal(true);
                  } else {
                    onFinish();
                  }
                } else if (props.programSeletedRow.length == 0) {
                  // console.log('哈哈')
                  onFinish();
                }
              }}
              type="primary"
              style={{ marginRight: 8 }}
            >
              {renderSaveOrInsert()}
            </Button>
          </div>
        }
      >
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
