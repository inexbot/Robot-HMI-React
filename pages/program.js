/*
 * 程序界面
 * 引入了ProgramComponent组件，右下方的插入指令等
 */
import React, { useState, useEffect } from "react";
import intl from "react-intl-universal";
import { Button, notification, ConfigProvider } from "antd";
import VirtualTable from "components/table";
import { connect } from "umi";
import { renderInstruct } from "./Program_instruct_header/index";
import ConTitle from "components/title";
import ProgramComponent from "components/project/programcomponent";
import RunModeComponent from "components/project/runmodecomponent";
import "./main_interface/Project/index.css";

// 从全局的状态获取当前机器人状态
const mapStateToProps = (state) => {
  return {
    currentRobot: state.index.robotStatus.currentRobot,
    operaMode: state.index.robotStatus.operaMode,
    robot1OpenedProgram: state.index.robotStatus.robot1OpenedProgram,
    robot2OpenedProgram: state.index.robotStatus.robot2OpenedProgram,
    robot3OpenedProgram: state.index.robotStatus.robot3OpenedProgram,
    robot4OpenedProgram: state.index.robotStatus.robot4OpenedProgram,
    program: state.index.program,
    programBoth: state.App.programBoth,
    List: state.App.programSeletedRow,
    newprogram: state.App.newprogram,
    programallButton: state.App.allButton
  };
};

// 空状态
const customizeRenderEmpty = () => (
  <div style={{ textAlign: "center" }}>
    <p>空程序，请插入指令</p>
  </div>
);

// 工程界面组件

function Program(props) {
  const [selectedRow, setSelectedRow] = useState(0);
  const [dataSourceMain, setDataSourceMain] = useState([]);
  const [moreBtn, setMoreBtn] = useState(false);
  const [forbid, setForbid] = useState(false);
  const [allList, setAllList] = useState(0);
  const [rowSelection, ] = useState(null);
  const [headButtonDisplay, setHeadButtonDisplay] = useState("inline");
  let agai = false
  const selectAll = () => {
    setAllList(1);
    props.programallButton.push({b:2})
    setAllButton(
      <Button disabled={moreBtn} onClick={callSelectAll}>
        关闭全选
      </Button>
    );
  };
  
  const selectMore = () => {
    setMoreBtn(true);
    setAllList(0);
    setForbid(!forbid);
    setMoreButton(<Button onClick={cancelSelectMore}>单选</Button>);
  };

  const cancelSelectMore = () => {
    setMoreBtn(false);
    setAllList(0);
    setForbid(!forbid);
    setMoreButton(<Button onClick={selectMore}>多选</Button>);
  };
  const callSelectAll = () => {
    setAllList(0);
    props.programallButton.splice(1)
    setAllButton(
      <Button disabled={moreBtn} onClick={selectAll}>
        全选
      </Button>
    );
  };
  const agaiMore = () => {
    // setAgai(true);
    agai = true
    setAgaiButton(
      <Button disabled={moreBtn} onClick={cancelagaiMore}>
        反选
      </Button>
    );
  };
  const cancelagaiMore = () => {
    agai = false
    // setAgai(false);
    setAgaiButton(
      <Button disabled={moreBtn} onClick={agaiMore}>
        反选
      </Button>
    );
  };
  
  const [agaiButton, setAgaiButton] = useState(
    <Button disabled={moreBtn} onClick={agaiMore}>
      反选
    </Button>
  );
  const [allButton, setAllButton] = useState(
    <Button disabled={moreBtn} onClick={selectAll}>
      全选
    </Button>
  );
  const [moreButton, setMoreButton] = useState(
    <Button onClick={selectMore}>多选</Button>
  );
  useEffect(() => {
    props.List.splice(0);
  }, [moreBtn, props.List]);
  // 用来构建标签页
  const columns = [
    {
      dataIndex: "order",
      key: "order",
      className: "pro_id",
      
    },
    {
      title: (
        <div style={{ display: "flex", alignItems: "center" }}>
          指令名{moreButton}{" "}
          {moreBtn ? (
            <div style={{ display: "flex" }}>
              {" "}
              {allButton} {agaiButton}{" "}
            </div>
          ) : (
            ""
          )}{" "}
        </div>
      ),
      dataIndex: "name",
      key: "name",
      className: "pro_tit",
      render: (text) => (
        <div className="instructName" type={{ color: "FF00FF" }}>
          {text}
        </div>
      ),
    
    },
    {
      title: intl.get("参数"),
      dataIndex: "para",
      key: "para",
    },
    
  ];
  useEffect(() => {
    setSelectedRow(1);
  }, []);

  useEffect(() => {
    if (props.program.success === false) {
      notification.error({
        message: `打开文件失败！`,
        description: `打开文件${props.program.name}失败！原因可能为解析失败`,
      });
      return;
    } else {
      let instruct = props.program.instruct;
      let keyOfInstruct = 1;
      // 标签页内表格的表头
      let dataSource = [];
      if (instruct === undefined ) {
        dataSource = [];
      } else {
        instruct.map((value, index) => {
          if (index === 0) {
          } else {
            if (instruct.length === 0) {
              return value;
            } else {
              if (value === null) {
                if (allList === 0) {
                  dataSource.push({
                    key: keyOfInstruct,
                    order: keyOfInstruct,
                    name: "未解析指令",
                    para: "未解析指令",
                    insName: "未解析指令",
                    select: false,
                    allList: allList,
                    moreBtn: moreBtn,
                    agaiBtn: agai,
                  });
                } else {
                  dataSource.push({
                    key: keyOfInstruct,
                    order: keyOfInstruct,
                    name: "未解析指令",
                    para: "未解析指令",
                    insName: "未解析指令",
                    select: true,
                    allList: allList,
                    moreBtn: moreBtn,
                    agaiBtn: agai,
                  });
                }
              } else {
                if (allList === 0) {
                  dataSource.push({
                    key: keyOfInstruct,
                    order: keyOfInstruct,
                    name: intl.get(value.name),
                    para: renderInstruct(value.name, value.para),
                    insName: value.name,
                    select: false,
                    allList: allList,
                    moreBtn: moreBtn,
                    agaiBtn: agai,
                    paras: value.para,
                  });
                } else {
                  dataSource.push({
                    key: keyOfInstruct,
                    order: keyOfInstruct,
                    name: intl.get(value.name),
                    para: renderInstruct(value.name, value.para),
                    insName: value.name,
                    select: true,
                    allList: allList,
                    moreBtn: moreBtn,
                    agaiBtn: agai,
                    paras: value.para,
                  });
                }
                keyOfInstruct = keyOfInstruct + 1;
                return value;
              }
            }
          }
          return dataSource
        });
        // 把过滤出来的数据存入dataSourceMain
        setDataSourceMain(dataSource)
      }
    }
  }, [props.program, allList, moreBtn, moreButton,agai]);

  
  const [aComponent, setAComponent] = useState();
  useEffect(() => {
    let comp = (
      <ProgramComponent
        selectedName={0}
        selectedRow={selectedRow}
        multiSelection={[]}
        isBulk={0}
      />
    );
    if (props.operaMode === 2) {
      setAComponent(<RunModeComponent />);
      setHeadButtonDisplay("none");
    } else {
      setAComponent(comp);
      setHeadButtonDisplay("inline");
    }
  }, [props.operaMode,dataSourceMain,selectedRow]);

  return (
    <div>
      {/* 主界面 */}
      <ConTitle
        title={`${intl.get("程序")} ${props.program.name}`}
        subtitle={intl.get(" ")}
        buttonLink="/Project"
        buttonStyle={{ display: headButtonDisplay }}
      />
      {aComponent}
      <ConfigProvider renderEmpty={customizeRenderEmpty}>
        <VirtualTable
          columns={columns}
          dataSource={dataSourceMain}
          rowSelection={rowSelection}
          className="Program_table"
          scroll={{
            y: window.screen.height * 0.5,
          }}
        />
      </ConfigProvider>
    </div>
  );
}

export default connect(mapStateToProps)(Program);
