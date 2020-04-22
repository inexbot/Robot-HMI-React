import React, { useState, useEffect } from "react";
import { Table, Tabs } from "antd";
import { MoreOutlined} from '@ant-design/icons';
import { connect, router } from "dva";
import { sendMSGtoServer } from "service/network";
import ProjectComponent from "components/project/projectcomponent"
import intl from "react-intl-universal";
import ConTitle from "components/title";
import "./Project.css";
import ProjectMore from "components/project/projectmore";

const { TabPane } = Tabs;
// 从全局的状态获取当前机器人状态
const mapStateToProps = (state) => {
  return {
    currentRobot: state.index.robotStatus.currentRobot,
    project: state.index.project,
  };
};
// 工程界面组件
function Project(props) {
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [moreDisplay,setMoreDisplay] = useState("none");
  // 初始化组件后做的
  const [tabPanel, setTabPanel] = useState("");
  useEffect(() => {
    sendMSGtoServer("Project", { robot: props.currentRobot });
  }, [props.currentRobot]);
  const showMore = () =>{
    setMoreDisplay("block");
  }
  useEffect(() => {
    const columns = [
      {
        title: intl.get("程序名"),
        dataIndex: "name",
        key: "name",
      },
      {
        title: intl.get("修改时间"),
        dataIndex: "date",
        key: "date",
      },
      {
        title:"更多操作",
        dataIndex:"more",
        key:"more",
      }
    ];
    let tabs = [];
    let keyOfTabs = 1;
    // 对接收到的数据进行第一次遍历，用来获取标签页标签名
    if (props.project === undefined) {
      setTabPanel(
        <TabPane tab={"无工程"}>
          <Table columns={columns} key="0" />
        </TabPane>
      );
    }
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
          more:<MoreOutlined onClick={showMore}/>,
          tabName: tabName,
        });
        keyOfTable = keyOfTable + 1;
        return value;
      });
      tabs.push(
        <TabPane tab={value.name} key={keyOfTabs}>
          <Table
            dataSource={dataSource}
            columns={columns}
            onRow={(record) => {
              return {
                // 点击表格每一行后的回调
                onClick: () => {
                  setSelectedProject(record.tabName);
                  setSelectedProgram(record.name);
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
  }, [props.project]);
  const moreBlur = () =>{
    setMoreDisplay("none")
  }
  return (
    <div>
      {/* 主界面 */}
      <ConTitle
        title={intl.get("工程")}
        subtitle={intl.get(" ")}
        buttonStyle={{display:"none"}}
      />
      <ProjectComponent currentRobot={props.currentRobot} selectedProject={selectedProject} selectedProgram={selectedProgram} />
      <ProjectMore currentRobot={props.currentRobot} selectedProject={selectedProject} selectedProgram={selectedProgram} moreDisplay={moreDisplay} moreBlur={moreBlur}/>
      <Tabs tabPosition="left" className="Pro_table">
        {tabPanel}
      </Tabs>
    </div>
  );
}
export default connect(mapStateToProps)(Project);
