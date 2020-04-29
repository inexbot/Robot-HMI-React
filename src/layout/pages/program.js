/*
 * 程序界面
 * 引入了ProgramComponent组件，右下方的插入指令等
 */
import React, { useState, useEffect } from "react";
import intl from "react-intl-universal";
import { Table, Button, notification, ConfigProvider } from "antd";
// import VirtualTable from "components/table";
import { connect } from "dva";
import { renderInstruct } from "./program_instruct_header";
import ConTitle from "components/title";
import ProgramComponent from "components/project/programcomponent";
import RunModeComponent from "components/project/runmodecomponent";
import "./Project.css";

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
  const [selectedName, setSelectedName] = useState(0);
  const [multiSelection, setMultiSelection] = useState([]);
  const [dataSourceMain, setDataSourceMain] = useState([]);
  const [rowSelection, setRowSelection] = useState(null);
  const [headButtonDisplay,setHeadButtonDisplay] = useState("inline")
  const [isBulk, setIsBulk] = useState(0);
  const rows = {
    onSelect: (record, selected, selectedRows) => {
      let order = [];
      selectedRows.map((value) => {
        order.push(value.order);
        return value;
      });
      setMultiSelection(order);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      let order = [];
      selectedRows.map((value) => {
        order.push(value.order);
        return value;
      });
      setMultiSelection(order);
    },
  };

  const selectMore = () => {
    setRowSelection(rows);
    setIsBulk(1);
    setMoreButton(<Button onClick={cancelSelectMore}>取消多选</Button>);
  };
  const cancelSelectMore = () => {
    setRowSelection();
    setIsBulk(0);
    setMoreButton(<Button onClick={selectMore}>多选</Button>);
  };

  const [moreButton, setMoreButton] = useState(
    <Button onClick={selectMore}>多选</Button>
  );
  // 用来构建标签页
  const columns = [
    {
      dataIndex: "order",
      key: "order",
      className: "pro_id",
    },
    {
      title: <div>指令名{moreButton}</div>,
      dataIndex: "name",
      key: "name",
      className: "pro_tit",
      render: (text) => (
        <div className='instructName' type={{ color: "FF00FF" }}>
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
      if (instruct === undefined) {
        dataSource = [];
      } else {
        // 遍历获取指令数据
        instruct.map((value, index) => {
          if (index === 0) {
            return value;
          } else {
            if (value === null) {
              dataSource.push({
                key: keyOfInstruct,
                order: keyOfInstruct,
                name: "未解析指令",
                para: "未解析指令",
                insName: "未解析指令",
              });
            } else {
              dataSource.push({
                key: keyOfInstruct,
                order: keyOfInstruct,
                name: intl.get(value.name),
                para: renderInstruct(value.name, value.para),
                insName: value.name,
              });
            }
            keyOfInstruct = keyOfInstruct + 1;
            return value;
          }
        });
      }
      setDataSourceMain(dataSource);
    }
  }, [props.program]);
  let comp = (
    <ProgramComponent
      selectedName={selectedName}
      selectedRow={selectedRow}
      multiSelection={multiSelection}
      isBulk={isBulk}
    />
  );
  const [aComponent, setAComponent] = useState();
  useEffect(() => {
    if (props.operaMode === 2) {
      setAComponent(<RunModeComponent />);
      setHeadButtonDisplay("none")
    } else {
      setAComponent(comp);
      setHeadButtonDisplay("inline")
    }
  }, [props.operaMode]);
  return (
    <div>
      {/* 主界面 */}
      <ConTitle
        title={`${intl.get("程序")} ${props.program.name}`}
        subtitle={intl.get(" ")}
        buttonLink='/Project'
        buttonStyle={{display:headButtonDisplay}}
      />
      {aComponent}
      <ConfigProvider renderEmpty={customizeRenderEmpty}>
        {/* <VirtualTable
          columns={columns}
          dataSource={dataSourceMain}
          rowSelection={rowSelection}
          scroll={{
            y: 500,
            x: "100px",
          }}
          onRow={(record) => {
            return {
              // 点击表格每一行后的回调
              onClick: (event) => {
                setSelectedRow(record.order);
                setMultiSelection([record.order+1]);
                setSelectedName(record.insName);
              },
            };
          }}
        /> */}
        <Table
          dataSource={dataSourceMain}
          columns={columns}
          rowSelection={rowSelection}
          className='Program_table'
          //   scroll={
          //   {y:"500px"}
          // }
          pagination={false}
          onRow={(record) => {
            return {
              // 点击表格每一行后的回调
              onClick: (event) => {
                setSelectedRow(record.order);
                setMultiSelection([record.order]);
                setSelectedName(record.insName);
              },
            };
          }}
        />
      </ConfigProvider>
    </div>
  );
}
export default connect(mapStateToProps)(Program);
