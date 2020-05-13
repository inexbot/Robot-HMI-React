/*
 * 程序界面
 * 引入了ProgramComponent组件，右下方的插入指令等
 */
import React, { useState, useEffect } from "react";
import intl from "react-intl-universal";
import { Table, Button, notification, ConfigProvider,Select } from "antd";
import VirtualTable from "../../components/table";
import { connect } from "dva";
import { renderInstruct } from "./Program_instruct_header/index";
import ConTitle from "../../components/title";
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
  const [allList, setAllList] = useState(0)
  const [rowSelection, setRowSelection] = useState(null);
  const [headButtonDisplay, setHeadButtonDisplay] = useState("inline");
  const [isBulk, setIsBulk] = useState(0);
  const { Option } = Select;
  console.log(props.program.instruct)
  const children = []
  for (let i =1; i < props.program.instruct.length; i++) {
    children.push(<div style = {{ margin:'0',padding:'0' }} key={i.toString(36) + i}>{i}</div>);
  }
  // const selectMore = () => {
  //   // console.log(dataSourceMain,props)
  //   setMoreButton(<Button onClick={cancelSelectMore}>取消多选</Button>);
  // };
  // const cancelSelectMore = () => {
  //   setMoreButton(<Button onClick={selectMore}>多选</Button>);
  // };
  const selectAll = () => {
    setAllList(1)
    setAllButton(<Button onClick={callSelectAll}>全不选</Button>)
  }

  const callSelectAll = () => {
    setAllList(0)
    setAllButton(<Button onClick={selectAll}>全选</Button>);
  };

const handleChange =(value)  =>{
    console.log(`selected ${value}`);
  }



  // const [moreButton, setMoreButton] = useState(
  //   <Button onClick={selectMore}>多选</Button>
  // );
  const [allButton, setAllButton] = useState(
    <Button onClick = {selectAll} >全选</Button>
  )

  const [placebtn, setPlacebtn] = useState(
    <Select
    mode="multiple"
    style={{ width: '70%',overflow:'scroll',height:'70px',position:'absolute',overflow:'hidden',margin:'0',padding:'0'}}
    placeholder="请选择"
    defaultValue={[ ]}
    onChange={handleChange}
  >
    {children}
  </Select>,
  )

  // 用来构建标签页
  const columns = [
    {
      dataIndex: "order",
      key: "order",
      className: "pro_id",
    },
    {
    title: <div>指令名{allButton}{placebtn}</div>,
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
      let keyOfInstruct = 0;
      // 标签页内表格的表头
      let dataSource = [];
      if (instruct === undefined) {
        dataSource = [];
      } else {
        // 遍历获取指令数据
        instruct.map((value, index) => {
          if (instruct.length === 0) {
            return value;
          } else {
            if (value === null) { 
              if(allList === 0){
                dataSource.push({
                  key: keyOfInstruct,
                  order: keyOfInstruct,
                  name: "未解析指令",
                  para: "未解析指令",
                  insName: "未解析指令",
                  select: false,
                  allList:allList
                });
              }else{
                dataSource.push({
                  key: keyOfInstruct,
                  order: keyOfInstruct,
                  name: "未解析指令",
                  para: "未解析指令",
                  insName: "未解析指令",
                  select: false,
                  allList:allList
                });
              }

            } else {
              if(allList === 0 ){
                dataSource.push({
                  key: keyOfInstruct,
                  order: keyOfInstruct,
                  name: intl.get(value.name),
                  para: renderInstruct(value.name, value.para),
                  insName: value.name,
                  select:false,
                  allList:allList
                });
              }else{
                dataSource.push({
                  key: keyOfInstruct,
                  order: keyOfInstruct,
                  name: intl.get(value.name),
                  para: renderInstruct(value.name, value.para),
                  insName: value.name,
                  select: true,
                  allList:allList
                });
              }

            }
            keyOfInstruct = keyOfInstruct + 1;
            return value;
          }

        });
        setDataSourceMain(dataSource)
      }

    }
  }, [props.program,allList]);
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
      setHeadButtonDisplay("none");
    } else {
      setAComponent(comp);
      setHeadButtonDisplay("inline");
    }
  }, [props.operaMode]);


  return (
    <div>
      {/* 主界面 */}
      <ConTitle
        title={`${intl.get("程序")} ${props.program.name}`}
        subtitle={intl.get(" ")}
        buttonLink='/Project'
        buttonStyle={{ display: headButtonDisplay }}
      />
      {aComponent}
      <ConfigProvider renderEmpty={customizeRenderEmpty}>
        <VirtualTable
          columns={columns}
          dataSource={dataSourceMain}
          rowSelection={rowSelection}
          className='Program_table'
          scroll={{
            y: window.screen.height*0.5,
          }}
          // onRow={(record,index) => {
          //   return {
          //     // 点击表格每一行后的回调
          //     onClick: (event) => {
          //       setSelectedRow(record.order);
          //       setMultiSelection([record.order]);
          //       setSelectedName(record.insName);
          //       console.log(index)
          //     },
          //   };
          // }}
        />
        {/* <Table
          dataSource={dataSourceMain}
          columns={columns}
          rowSelection={rowSelection}
          className='Program_table'
          //   scroll={
          //   {y:"500px"}
          // }
          // scroll={ {y: 100} }
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
        /> */}
      </ConfigProvider>
    </div>
  );
  
}

export default connect(mapStateToProps)(Program);