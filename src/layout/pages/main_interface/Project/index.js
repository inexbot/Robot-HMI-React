/*
 * 工程界面
 * 引入了ProjectComponent组件，右下方的新建等按钮
 */
import React, { useState, useEffect } from "react";
import {
  Table,
  Tabs,
  ConfigProvider,
  Modal,
  Button,
  Input,
  Tooltip,
  message,
} from "antd";
import { EditOutlined, DeleteOutlined, CopyOutlined } from "@ant-design/icons";
import { connect } from "dva";
import { sendMSGtoServer } from "service/network";
import ProjectComponent from "components/project/projectcomponent";
import intl from "react-intl-universal";
import ConTitle from "components/title";
import "./index.css";

const { confirm } = Modal;
const { TabPane } = Tabs;
// 从全局的状态获取当前机器人状态
const mapStateToProps = (state) => {
  return {
    currentRobot: state.index.robotStatus.currentRobot,
    project: state.index.project,
  };
};
const customizeRenderEmpty = () => (
  <div style={{ textAlign: "center" }}>
    <p>无程序，请新建</p>
  </div>
);
// 工程界面组件
function Project(props) {
  const [onshow, setOnshow] = useState(1);
  const [bkid, setBkid] = useState(-1);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [rowSelection, setRowSelectrion] = useState(null);
  const [isBulk, setIsBulk] = useState(0);
  // 初始化组件后做的
  const [tabPanel, setTabPanel] = useState("");
  const handleOkDeleteMultiProgram = () => {
    let deleteData = {
      robot: props.currentRobot,
      isbulk: isBulk,
      jobname: selectedProgram,
    };
    sendMSGtoServer("DELETE_PROGRAM", deleteData);
    cancelSelectMore();
    Modal.destroyAll();
  };
  const handleCancelDeleteMultiProgram = () => {
    Modal.destroyAll();
  };
  const modalConfigDeleteMultiProgram = {
    title: "确认",
    onOk: handleOkDeleteMultiProgram,
    onCancel: handleCancelDeleteMultiProgram,
    destroyOnClose: true,
    content: (
      <div>
        <p>是否确认删除程序</p>
      </div>
    ),
  };
  const deleteMultiProgram = () => {
    confirm(modalConfigDeleteMultiProgram);
  };
  const handleCancelDeleteSingleProgram = () => {
    Modal.destroyAll();
  };
  useEffect(() => {
    sendMSGtoServer("Project", { robot: props.currentRobot });
  }, [props.currentRobot]);
  const rows = {
    onSelect: (record, selected, selectedRows) => {
      let name = [];
      selectedRows.map((value) => {
        name.push(value.name);
        return value;
      });
      setSelectedProgram(name);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      let name = [];
      selectedRows.map((value) => {
        name.push(value.name);
        return value;
      });
      setSelectedProgram(name);
    },
  };

  const cancelSelectMore = () => {
    setRowSelectrion();
    setIsBulk(0);
    setMoreButton(<Button onClick={selectMore}>多选</Button>);
  };
  //确认修改
  const selectMore = () => {
    setRowSelectrion(rows);
    setIsBulk(1);
    setMoreButton(<Button onClick={cancelSelectMore}>取消多选</Button>);
  };


  const [moreButton, setMoreButton] = useState(
    <Button onClick={selectMore}>多选</Button>
  );

  useEffect(() => {
    let tabs = [];
    let keyOfTabs = 1;
    // 对接收到的数据进行第一次遍历，用来获取标签页标签名
    const columns = [
      {
        title: (
          <div>
            {intl.get("程序名")}
            {moreButton}
          </div>
        ),
        dataIndex: "name",
        key: "name",
      },
      {
        title: intl.get("修改时间"),
        dataIndex: "date",
        key: "date",
      },
      {
        title: "更多操作",
        dataIndex: "more",
        key: "more",
      },
    ];
    if (props.project === undefined || props.project.length === 0) {
      setTabPanel(
        <TabPane tab={"无工程"} key="0">
          <Table columns={columns} key="0" />
        </TabPane>
      );
      return;
    }

    let programName = "";
    const changeName = (e) => {
      programName = e.target.value;
      props.project.map((item) => {
        item.program.map((item) => {
          if (programName + ".JBR" === item.name) {
            message.error("此程序名已存在");
            return item;
          } else {
            return item;
          }
        });
        return item;
      });
    };

    const handleOkDeleteSingleProgram = (name) => {
      let deleteData = {
        robot: props.currentRobot,
        isbulk: isBulk,
        jobname: [name],
      };
      sendMSGtoServer("DELETE_PROGRAM", deleteData);
      // cancelSelectMore();
      Modal.destroyAll();
    };
    const deleteSingleProgram = (name) => {
      confirm({
        title: "确认",
        onOk: handleOkDeleteSingleProgram.bind(this, name),
        onCancel: handleCancelDeleteSingleProgram,
        destroyOnClose: true,
        content: (
          <div>
            <p>是否确认删除程序</p>
            <p>{name}</p>
          </div>
        ),
      });
    };
  
    //点击修改弹出模态框
    const showamendName = (name) => {
      confirm({
        title: "请修改所选的程序名:",
        content: <Input allowClear placeholder={name} onChange={changeName} />,
        onOk() {
          let dataList = {
            robot: props.currentRobot,
            oldjobName: name,
            newjobName: programName + ".JBR",
          };
          sendMSGtoServer("AMENDWORK_COMMAND", dataList);
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    };

    props.project.map((value) => {
      let dataSource = [];
      let keyOfTable = 1;
      let tabName = value.name;
      // 对接收到的数据进行第二次遍历，用来获取各个标签页内表格的数据
      value.program.map((value) => {
        dataSource.push({
          key: keyOfTable,
          name: value.name,
          date: value.date,
          more: (
            <div>
              <Tooltip placement="topLeft" title={"复制此条程序"}>
                <CopyOutlined
                  onClick={() => {
                    let newProgramName = "";
                    confirm({
                      title: "对新程序进行命名:",
                      content: (
                        <Input
                          allowClear
                          onChange={(e) => {
                            newProgramName = e.target.value;
                            props.project.map((item, index) => {
                              item.program.map((item, index) => {
                                if (newProgramName + ".JBR" === item.name) {
                                  message.error("此程序名已存在");
                                  return item;
                                } else {
                                  return item;
                                }
                              });
                              return item;
                            });
                          }}
                        />
                      ),
                      onOk() {
                        let dataList = {
                          robot: props.currentRobot,
                          oldjobName: value.name,
                          newjobName: newProgramName + ".JBR",
                        };
                        sendMSGtoServer("COPYPROGRAM_COMMAND", dataList);
                      },
                      onCancel() {
                        console.log("Cancel");
                      },
                    });
                  }}
                  style={{ fontSize: 20, paddingRight: 17 }}
                />
              </Tooltip>
              <Tooltip placement="topLeft" title={"重命名"}>
                <EditOutlined
                  onClick={showamendName.bind(this, value.name)}
                  style={{ fontSize: 20, paddingRight: 17 }}
                />
              </Tooltip>
              <Tooltip placement="topLeft" title={"删除此程序"}>
                <DeleteOutlined
                  onClick={deleteSingleProgram.bind(this, value.name)}
                  style={{ fontSize: 20 }}
                />
              </Tooltip>
            </div>
          ),
          tabName: tabName,
        });
        keyOfTable = keyOfTable + 1;
        return value;
      });
      tabs.push(
        <TabPane tab={value.name} key={keyOfTabs}>
          <Table
            rowClassName={(record, index) => {
              return index === bkid ? "ant-table-row-selected" : "";
            }}
            dataSource={dataSource}
            rowSelection={rowSelection}
            pagination={{ defaultPageSize: (window.screen.height * 0.9) / 100 }}
            height={100}
            columns={columns}
            onRow={(record, index) => {
              return {
                // 点击表格每一行后的回调
                onClick: () => {
                  setSelectedProject(record.tabName);
                  setSelectedProgram([record.name]);
                  setOnshow(onshow + 1);
                  setBkid(index);
                  // console.log(window.screen.height);
                },
              };
            }}
          />
        </TabPane>
      );
      keyOfTabs = keyOfTabs + 1;
      return value;
    });
    setTabPanel(tabs);
  }, [props.project, rowSelection, selectedProgram,bkid,onshow,isBulk,moreButton,props.currentRobot]);
  useEffect((value) => {
    if (props.project === undefined) {
    } else {

    }
  });
  const deleteMoreButton = () => {
    if (isBulk === 0) {
      return (
        <ProjectComponent
          style={{ background: "red" }}
          currentRobot={props.currentRobot}
          selectedProject={selectedProject}
          selectedProgram={selectedProgram}
          selectMore={selectMore}
        />
      );
    } else {
      return (
        <div
          style={{
            position: "absolute",
            top: "65%",
            left: "86%",
            zIndex: "10",
            display: "flex",
            flexDirection: "column-reverse",
            height: "130px",
            justifyContent: "space-around",
          }}
          className="hoverButton2"
        >
          <Button shape="circle" size="large" onClick={deleteMultiProgram}>
            删除
          </Button>
        </div>
      );
    }
  };
  return (
    <div>
      {/* 主界面 */}
      <ConTitle
        title={intl.get("工程")}
        subtitle={intl.get(" ")}
        buttonStyle={{ display: "none" }}
      />
      {deleteMoreButton()}
      <ConfigProvider renderEmpty={customizeRenderEmpty}>
        <Tabs tabPosition="left" className="Pro_table">
          {tabPanel}
        </Tabs>
      </ConfigProvider>
    </div>
  );
}
export default connect(mapStateToProps)(Project);
