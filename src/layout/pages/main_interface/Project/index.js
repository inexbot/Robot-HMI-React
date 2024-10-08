/*
 * 工程界面
 * 引入了ProjectComponent组件，右下方的新建等按钮
 */
import React, { useState, useEffect } from "react";
import { Table, Tabs, ConfigProvider, Modal, Button, Pagination} from "antd";
import { EditOutlined, DeleteOutlined, ManOutlined } from "@ant-design/icons";
import { connect } from "dva";
import { sendMSGtoServer } from "service/network";
import ProjectComponent from "components/project/projectcomponent";
import intl from "react-intl-universal";
import ConTitle from "components/title";
import "./index.css";
import { number } from "echarts/lib/export";
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
  const [pageNum, setPageNum] = useState(null)
  // const [page, setPage] = useState(null)
  // const [pageSize, setPagesize] = useState(1)
  const [onshow, setOnshow] = useState(1)
  const [bkid, setBkid] = useState(-1)
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
  const handleOkDeleteSingleProgram = (name) => {
    let deleteData = {
      robot: props.currentRobot,
      isbulk: isBulk,
      jobname: [name],
    };
    sendMSGtoServer("DELETE_PROGRAM", deleteData);
    cancelSelectMore();
    Modal.destroyAll();
  };
  const handleCancelDeleteSingleProgram = () => {
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

  const selectMore = () => {
    setRowSelectrion(rows);
    setIsBulk(1);
    setMoreButton(<Button onClick={cancelSelectMore}>取消多选</Button>);
  };
  const cancelSelectMore = () => {
    setRowSelectrion();
    setIsBulk(0);
    setMoreButton(<Button onClick={selectMore}>多选</Button>);
  };

  const [moreButton, setMoreButton] = useState(
    <Button onClick={selectMore}>多选</Button>
  );
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
  console.log(window.screen.height)
  useEffect(() => {
    let tabs = [];
    let keyOfTabs = 1;
    let page = '';
    let pageSize = 1;

    // 对接收到的数据进行第一次遍历，用来获取标签页标签名
    if (props.project === undefined || props.project.length === 0) {
      setTabPanel(
        <TabPane tab={"无工程"} key='0'>
          <Table columns={columns} key='0' />
        </TabPane>
      );
      return;
    }
    // console.log
    props.project.map((value) => {
      let dataSource = [];
      let keyOfTable = 1;
      let tabName = value.name;
      // console.log(value.name)
      // 对接收到的数据进行第二次遍历，用来获取各个标签页内表格的数据
      value.program.map((value) => {
        dataSource.push({
          key: keyOfTable,
          name: value.name,
          date: value.date,
          more: (
            <div>
              <EditOutlined onClick={selectMore} style={{fontSize:20,paddingRight:24}}/>
              <DeleteOutlined onClick={deleteSingleProgram.bind(this,value.name)} style={{fontSize:20}}/>
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
            rowClassName={(record,index)=>{
              return(index==bkid?'ant-table-row-selected':'tablewt')
            }}
            dataSource={dataSource}
            rowSelection={rowSelection}
            bordered
            scroll={{ y: window.screen.height*0.5 }}
            pagination={{ pageSize: 10 }}
            columns={columns}
            onRow={(record,index) => {
              return {
                // 点击表格每一行后的回调
                  onClick: () => {
                  setOnshow(onshow+1)
                  setBkid(index)
                  setSelectedProject(record.tabName);
                  setSelectedProgram([record.name]);
                },
              };
            }}
          />
          {/* <Pagination showQuickJumper defaultCurrent total={dataSource.length} pageSize={1}
           onChange={(page,pageSize)=>{
             setPageNum(pageNum+1)

          }} /> */}
        </TabPane>
      );
      keyOfTabs = keyOfTabs + 1;
      return value;
    });

    setTabPanel(tabs);
  }, [props.project,rowSelection,selectedProgram,pageNum]);
  useEffect((value)=>{
    let page = 0;
    let pageSize = 10
    let obj = ''
    obj = props.project[0].program.slice(page*10,page+pageSize-1)
  })
  const deleteMoreButton = () => {
    if (isBulk === 0) {
      return (
        <ProjectComponent
          currentRobot={props.currentRobot}
          selectedProject={selectedProject}
          selectedProgram={selectedProgram}
          selectMore={selectMore}
        />
      );
    } else {
      return (
        <div className='hoverButton2'>
          <Button shape='circle' size='large' onClick={deleteMultiProgram}>
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
        <Tabs tabPosition='left' className='Pro_table'>
          {tabPanel}
        </Tabs>
      </ConfigProvider>
    </div>
  );
}
export default connect(mapStateToProps)(Project);
