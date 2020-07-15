import React,{ useState,useEffect } from "react";
import { Button, Input, Tabs, Select, Modal, Table, Pagination } from "antd";
import intl from "react-intl-universal";
import { connect } from "dva";
import ConTitle from "components/title";
import { sendMSGtoServer ,sendMSGtoController } from "service/network";
import styles from "./index.module.less";

const mapStateToProps = (state) => {
  return {
    project:state.index.project,
    currentRobot: state.index.robotStatus.currentRobot,
    remotepro: state.index.remotepro.IOproce,
    Moproce:state.index.remotepro.Moproce
  };
};

const { TabPane } = Tabs;
const { Option } = Select;

function Remotepro(props) {
  // 定义模态框是否显示的变量
  const [ IOvisible, setIOVisible] = useState(false);
  const [ Modbusvisible, setModbusvisible ] = useState(false)

  const [ MudbusColumns, setMudbusColumns] = useState('')
  const [ Mudbusdatas, setMudbusdatas ] = useState('')
  const [ ProjectColumns, setProjectColumns ] = useState('')
  const [ Projectdatas, setProjectdatas ] = useState('')
  const [ PageNum, setPageNum ] = useState(1)
  const [ showSave, setShowSave ] = useState(false)
  const [ SelectNum, setSelectNum ] = useState(0)
  const [ Selectprocedure, setSelectprocedure ] = useState('')
  const [ Showallipt, setShowallipt ] = useState(true)
  const [ ModbusSelectNum, setModbusSelectNum ] =useState(0)
  const [bkid, setBkid] = useState(-1);
  // 定义输入框的数据使用非受控组件
  const [ Times1,setTimes1 ] = useState(props.remotepro.jobFile[0].times)
  const [ Times2,setTimes2 ] = useState(props.remotepro.jobFile[1].times)
  const [ Times3,setTimes3 ] = useState(props.remotepro.jobFile[2].times)
  const [ Times4,setTimes4 ] = useState(props.remotepro.jobFile[3].times)
  const [ Times5,setTimes5 ] = useState(props.remotepro.jobFile[4].times)
  const [ Times6,setTimes6 ] = useState(props.remotepro.jobFile[5].times)
  const [ Times7,setTimes7 ] = useState(props.remotepro.jobFile[6].times)
  const [ Times8,setTimes8 ] = useState(props.remotepro.jobFile[7].times)
  const [ Times9,setTimes9 ] = useState(props.remotepro.jobFile[8].times)
  const [ Times10,setTimes10 ] = useState(props.remotepro.jobFile[9].times)
  // 渲染IO程序的表头
  let IOcolumn = [
    { title:"程序号", dataIndex:"procedurenum" ,align:'center' },
    { title:"已选程序", dataIndex:"procedure" ,align:'center' },
    { title:"运行次数", dataIndex:"nums",align:'center'  },
    { title:"操作", dataIndex:"operation",width:200 ,align:'center' }
  ];


  // 渲染IO程序的表格内容
  let IOdata = [
    { key:'1', procedurenum:'程序1',procedure:props.remotepro.jobFile[0].name===''?'未设置':props.remotepro.jobFile[0].name,nums:<Input disabled={ Showallipt } value={Times1} style={{ width: 200, height:"30px" }} onChange={(e)=>{ setTimes1(e.target.value)   }} />,
    operation:( <div style={{ display:"flex",justifyContent:"space-around" }}><Button  disabled={ Showallipt }  style={{ height:"30px" }} onClick = {()=>{ setIOVisible(true) ;setSelectNum(0) }}>选择程序</Button>  <Button disabled={ Showallipt } style={{ height:"30px" }} onClick={()=>{ unselect(0)}}>取消选择</Button> </div> )  },
    { key:'2', procedurenum:'程序2',procedure:props.remotepro.jobFile[1].name===''?'未设置':props.remotepro.jobFile[1].name,nums:<Input disabled={ Showallipt } value={Times2} style={{ width: 200, height:"30px" }} onChange={(e)=>{ setTimes2(e.target.value)  }} />,
    operation:( <div style={{ display:"flex",justifyContent:"space-around" }}><Button disabled={ Showallipt } style={{ height:"30px" }} onClick = {()=>{ setIOVisible(true) ;setSelectNum(1)  }}>选择程序</Button>  <Button disabled={ Showallipt } style={{ height:"30px" }} onClick={()=>{ unselect(1)}} >取消选择</Button> </div> )  },
    { key:'3', procedurenum:'程序3',procedure:props.remotepro.jobFile[2].name===''?'未设置':props.remotepro.jobFile[2].name,nums:<Input disabled={ Showallipt } value={Times3} style={{ width: 200, height:"30px" }} onChange={(e)=>{ setTimes3(e.target.value)  }} />,
    operation:( <div style={{ display:"flex",justifyContent:"space-around" }}><Button disabled={ Showallipt } style={{ height:"30px" }} onClick = {()=>{ setIOVisible(true) ;setSelectNum(2) }}>选择程序</Button>  <Button disabled={ Showallipt } style={{ height:"30px" }} onClick={()=>{ unselect(2)}} >取消选择</Button> </div> )  },
    { key:'4', procedurenum:'程序4',procedure:props.remotepro.jobFile[3].name===''?'未设置':props.remotepro.jobFile[3].name,nums:<Input disabled={ Showallipt } value={Times4} style={{ width: 200, height:"30px" }} onChange={(e)=>{ setTimes4(e.target.value)  }} />,
    operation:( <div style={{ display:"flex",justifyContent:"space-around" }}><Button disabled={ Showallipt } style={{ height:"30px" }} onClick = {()=>{ setIOVisible(true) ;setSelectNum(3)  }}>选择程序</Button>  <Button disabled={ Showallipt } style={{ height:"30px" }} onClick={()=>{ unselect(3)}} >取消选择</Button> </div> )  },
    { key:'5', procedurenum:'程序5',procedure:props.remotepro.jobFile[4].name===''?'未设置':props.remotepro.jobFile[4].name,nums:<Input disabled={ Showallipt } value={Times5} style={{ width: 200, height:"30px" }} onChange={(e)=>{ setTimes5(e.target.value)  }} />,
    operation:( <div style={{ display:"flex",justifyContent:"space-around" }}><Button disabled={ Showallipt } style={{ height:"30px" }} onClick = {()=>{ setIOVisible(true) ;setSelectNum(4)  }}>选择程序</Button>  <Button disabled={ Showallipt } style={{ height:"30px" }} onClick={()=>{ unselect(4)}} >取消选择</Button> </div> )  },
    { key:'6', procedurenum:'程序6',procedure:props.remotepro.jobFile[5].name===''?'未设置':props.remotepro.jobFile[5].name,nums:<Input disabled={ Showallipt } value={Times6} style={{ width: 200, height:"30px" }} onChange={(e)=>{ setTimes6(e.target.value)  }} />,
    operation:( <div style={{ display:"flex",justifyContent:"space-around" }}><Button disabled={ Showallipt } style={{ height:"30px" }} onClick = {()=>{ setIOVisible(true) ;setSelectNum(5)  }}>选择程序</Button>  <Button disabled={ Showallipt } style={{ height:"30px" }} onClick={()=>{ unselect(5)}} >取消选择</Button> </div> )  },
    { key:'7', procedurenum:'程序7',procedure:props.remotepro.jobFile[6].name===''?'未设置':props.remotepro.jobFile[6].name,nums:<Input disabled={ Showallipt } value={Times7} style={{ width: 200, height:"30px" }} onChange={(e)=>{ setTimes7(e.target.value)  }} />,
    operation:( <div style={{ display:"flex",justifyContent:"space-around" }}><Button disabled={ Showallipt } style={{ height:"30px" }} onClick = {()=>{ setIOVisible(true) ;setSelectNum(6)  }}>选择程序</Button>  <Button disabled={ Showallipt } style={{ height:"30px" }} onClick={()=>{ unselect(6)}} >取消选择</Button> </div> )  },
    { key:'8', procedurenum:'程序8',procedure:props.remotepro.jobFile[7].name===''?'未设置':props.remotepro.jobFile[7].name,nums:<Input disabled={ Showallipt } value={Times8} style={{ width: 200, height:"30px" }} onChange={(e)=>{ setTimes8(e.target.value)  }} />,
    operation:( <div style={{ display:"flex",justifyContent:"space-around" }}><Button disabled={ Showallipt } style={{ height:"30px" }} onClick = {()=>{ setIOVisible(true) ;setSelectNum(6)  }}>选择程序</Button>  <Button disabled={ Showallipt } style={{ height:"30px" }} onClick={()=>{ unselect(7)}} >取消选择</Button> </div> )  },
    { key:'9', procedurenum:'程序9',procedure:props.remotepro.jobFile[8].name===''?'未设置':props.remotepro.jobFile[8].name,nums:<Input disabled={ Showallipt } value={Times9} style={{ width: 200, height:"30px" }} onChange={(e)=>{ setTimes9(e.target.value)  }} />,
    operation:( <div style={{ display:"flex",justifyContent:"space-around" }}><Button disabled={ Showallipt } style={{ height:"30px" }} onClick = {()=>{ setIOVisible(true) ;setSelectNum(7)  }}>选择程序</Button>  <Button disabled={ Showallipt } style={{ height:"30px" }} onClick={()=>{ unselect(8)}} >取消选择</Button> </div> )  },
    { key:'10', procedurenum:'程序10',procedure:props.remotepro.jobFile[9].name===''?'未设置':props.remotepro.jobFile[9].name,nums:<Input disabled={ Showallipt } value={Times10} style={{ width: 200, height:"30px" }} onChange={(e)=>{ setTimes10(e.target.value) }} />,
    operation:( <div style={{ display:"flex",justifyContent:"space-around" }}><Button disabled={ Showallipt } style={{ height:"30px" }} onClick = {()=>{ setIOVisible(true) ;setSelectNum(9)}}>选择程序</Button>  <Button disabled={ Showallipt } style={{ height:"30px" }} onClick={()=>{ unselect(9)}} >取消选择</Button> </div> )  },
  ];

  // 使用useEffect来渲染Modbus页面的表格
  useEffect(()=>{
    let Mudata = [];
    let MuColumns = [];
    // 渲染MOodbus页面的表头
    MuColumns.push(
      { title:"程序号", dataIndex:"procedurenum" ,align:'center' },
      { title:"已选程序", dataIndex:"procedure",align:'center'  },
      { title:"操作", dataIndex:"operation",width:200 ,align:'center' }
    )
    // 使用循环来渲染Modbus的表格内容
    props.Moproce.jobnamelist.map((v,i)=>{
      Mudata.push(
        {key:i ,procedurenum:props.Moproce.startprogramid+i, procedure:v===''?'未设置':v, operation:<Button  disabled={ Showallipt } style={{ height:"30px" }} onClick={()=>{setModbusvisible(true) ;setModbusSelectNum(props.Moproce.startprogramid+i) ;setSelectNum(i)}}  >选择程序</Button> },
      )
      return Mudata;
    })
    setMudbusColumns(MuColumns)
    setMudbusdatas(Mudata)
  },[props.Moproce,Showallipt])
  // 获取程序(测试使用)
  useEffect(() => {
    sendMSGtoServer("Project", { robot: props.currentRobot });
  }, [props.currentRobot]);
  // Modbus页面页数发生改变时获取数据
  useEffect(()=>{
    let DataList = ''
    if( PageNum===1 ){
      DataList = {
        robot:props.currentRobot,
        startprogramid:PageNum,
        num:10
      }
    }else{
      DataList = {
        robot:props.currentRobot,
        startprogramid:(PageNum-1)*10+1,
        num:10
      }
    }
    sendMSGtoController("EXTERN_PROGRAM_INQUIRE",DataList)
  },[PageNum,props.currentRobot])
  // 查询IO程序
  useEffect(()=>{
    sendMSGtoController("REMOTE_JOBFILE_INQUIRE",{ robot: props.currentRobot })
  },[props.currentRobot])
  // 数据改变后更改输入框内的值
  useEffect(()=>{
    setTimes1(props.remotepro.jobFile[0].times)
    setTimes2(props.remotepro.jobFile[1].times)
    setTimes3(props.remotepro.jobFile[2].times)
    setTimes4(props.remotepro.jobFile[3].times)
    setTimes5(props.remotepro.jobFile[4].times)
    setTimes6(props.remotepro.jobFile[5].times)
    setTimes7(props.remotepro.jobFile[6].times)
    setTimes8(props.remotepro.jobFile[7].times)
    setTimes9(props.remotepro.jobFile[8].times)
    setTimes10(props.remotepro.jobFile[9].times)
  },[props.remotepro])

  //点击取消选择的回调
  const unselect = ( unSelectNum ) =>{
    props.dispatch({
      type:'index/unSelectIOprocedure',
      data:{
        unSelectNum,
      }
    })
  }

  //IO程序点击模态框确认的回调
  const thideModal = ( ) => {
    props.dispatch({
      type:'index/setIOSelectprocedure',
      data:{
        SelectNum,
        Selectprocedure
      }
    })
    setIOVisible(false)
  }
  //IO点击模态框取消的回调
  const hideModal = ( ) => {
    setIOVisible(false)
  }
  // Modbus程序点击模态框确认的回调
  const ModbusthideModal = () =>{
    props.dispatch({
      type:'index/setModbusSelectprocedure',
      data:{
        SelectNum,
        Selectprocedure
      }
    })
    let DataList = {
      robot:props.currentRobot,
      programid:ModbusSelectNum,
      jobname:Selectprocedure.name
    }
    sendMSGtoController('EXTERN_PROGRAM_SET',DataList)
    setModbusvisible(false)
  }
  // Modbus程序点击模态框取消的回调
  const ModbushideModal = ( ) => {
    setModbusvisible(false)
  }

  // 选择程序模态框的内容
  useEffect(()=>{
    let ProjectColumn = [];
    let Projectdata = [];
    ProjectColumn.push(
      { title:"程序名", dataIndex:"projectname",align:'center' },
      { title:"修改时间", dataIndex:"settime" ,align:'center'},
    )
    props.project[0].program.map((v,i)=>{
      Projectdata.push(
        { key:i, projectname:v.name, settime:v.date }
      )
      return Projectdata;
    })
    setProjectColumns(ProjectColumn)
    setProjectdatas(Projectdata)
  },[props.project])
  return (
    <div >
      {/* 头部 */}
      <ConTitle title={intl.get("远程程序")} subtitle={intl.get("远程程序设置")}/>
      {/* 悬浮按钮 */}
      <div className='hoverButton1'>
        {showSave ? (
          <Button size="large" type="primary" shape="circle"
            style={{
              border: "1px #0AA8EB dashed",
              background:"#ffffff",
              color:"#0AA8EB",
              boxShadow:"0px 1px 8px rgba(10, 168, 235, 0.6)"
            }}
            onClick={() => {
              let DataList = {
                robot:props.currentRobot,
                jobFile:[
                    { name:props.remotepro.jobFile[0].name, times:Number(Times1)},
                    { name:props.remotepro.jobFile[1].name, times:Number(Times2)},
                    { name:props.remotepro.jobFile[2].name, times:Number(Times3)},
                    { name:props.remotepro.jobFile[3].name, times:Number(Times4)},
                    { name:props.remotepro.jobFile[4].name, times:Number(Times5)},
                    { name:props.remotepro.jobFile[5].name, times:Number(Times6)},
                    { name:props.remotepro.jobFile[6].name, times:Number(Times7)},
                    { name:props.remotepro.jobFile[7].name, times:Number(Times8)},
                    { name:props.remotepro.jobFile[8].name, times:Number(Times9)},
                    { name:props.remotepro.jobFile[9].name, times:Number(Times10)},
                ],
                remoteDefaultSpeed:props.remotepro.remoteDefaultSpeed
              }
              sendMSGtoController('REMOTE_JOBFILE_SET',DataList)
              setShowSave(false);
              setShowallipt(true)
            }}
          > 
          保存
          </Button>
          ) : (
            <Button size="large" type="primary" shape="circle"
              style={{
                border: "none",
              }}
              onClick={() => {
                setShowSave(true);
                setShowallipt(false)
              }}
            >
              修改
            </Button>
          )}
        </div>
      {/* 主要内容 */}
      <div className={styles.Remotepro}>
        <Tabs defaultActiveKey="1" style={{ background: "white" }}>
          <TabPane tab="IO程序" key="1">
            {/* IO表格 */}
          <Table
            pagination={false}
            size={"small"}
            columns={IOcolumn}
            dataSource={IOdata}
          />
          </TabPane>
          <TabPane tab="Modbus程序" key="2">
            <div style={{ textAlign: "center",marginTop:'-12px',marginBottom:"3px"}}>
              <span style={{ marginRight: 15 }}>{intl.get("选择机器人")}:</span>
              {/* Modbus的机器人选择器 */}
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="机器人1"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 }
              >
                <Option value="r1">{intl.get("机器人")}1</Option>
                <Option value="r2">{intl.get("机器人")}2</Option>
                <Option value="r3">{intl.get("机器人")}3</Option>
                <Option value="r4">{intl.get("机器人")}4</Option>
              </Select>
            </div>
              {/* Modbus表格 */}
              <Table
                pagination={false}
                size={"small"}
                columns={MudbusColumns}
                dataSource={Mudbusdatas}
              />
              {/* 分页器 */}
            <Pagination defaultCurrent={PageNum} total={300} showQuickJumper pageSizeOptions={['10']}  onChange={(page,pageSize)=>{
              setPageNum(page)
            }} />
          </TabPane>
        </Tabs>
      </div>
      {/* IO选择程序模态框 */}
      <Modal
         title="请选择程序"
         visible={IOvisible}
         onOk={thideModal}
         onCancel={hideModal}
         okText="确认"
         cancelText="取消"
      >
        {/* 模态框内容 */}
        <Table
          pagination={false}
          columns={ProjectColumns}
          dataSource={Projectdatas}
          scroll={ {y:window.screen.height * 0.3} } 
          size={'middle'}
          rowClassName={(record, index) => {
            /* 根据点击的是哪一行来改变颜色 */
            return index === bkid ? "ant-table-row-selected" : "";
          }}
          onRow={(record,index) => {
            return {
              onClick: event => {
                setSelectprocedure({name:record.projectname , times:1})
                setBkid(index)
              }
            }
          }}
        />
      </Modal>
      {/* Modbus选择程序模态框 */}
      <Modal
         title="请选择程序"
         visible={Modbusvisible}
         onOk={ModbusthideModal}
         onCancel={ModbushideModal}
         okText="确认"
         cancelText="取消"
      >
        {/* 模态框内容 */}
        <Table
          pagination={false}
          columns={ProjectColumns}
          dataSource={Projectdatas}
          scroll={ {y:window.screen.height * 0.3 }}
          rowClassName={(record, index) => {
            /* 根据点击的是哪一行来改变颜色 */
            return index === bkid ? "ant-table-row-selected" : "";
          }}
          onRow={(record , index) => {
            return {
              onClick:( event ) => {
                setSelectprocedure({name:record.projectname })
                setBkid(index)
              }
            }
          }}
        />
      </Modal>
    </div>
  );
}
export default connect(mapStateToProps)(Remotepro);