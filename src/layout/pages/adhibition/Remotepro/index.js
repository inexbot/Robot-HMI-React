import React,{ useState,useEffect } from "react";
import { Button, Col, Input, Tabs, Row, Popover, Select, Modal, Table, Pagination } from "antd";
import intl from "react-intl-universal";
import { connect } from "dva";
import ConTitle from "../../../../components/title";
import { sendMSGtoServer } from "service/network";
import "./index.module.less";

const { TabPane } = Tabs;
const { Option } = Select;

const mapStateToProps = (state) => {
  return {
    project:state.index.project,
    currentRobot: state.index.robotStatus.currentRobot,
    remotepro: state.index.remotepro.IOproce,
    Moproce:state.index.remotepro.Moproce
  };
};


function Remotepro(props) {

  const [visible, setVisible] = useState(false);

  const [ MudbusColumns, setMudbusColumns] = useState('')
  const [ Mudbusdatas, setMudbusdatas ] = useState('')

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
  // const [ propsls , setpropsls ] = useState(props.remotepro.jobFile[0].times)
  // 使用循环来渲染表格内容

  // for(let i = 1; i<11; i++){
  //   MudbusProce.push(
  //     <tr key={i} align="center">
  //       <td>{intl.get("程序")}{i}</td>
  //       <td>{intl.get("未设置")}</td>
  //       <td>
  //         <Button size="small">{intl.get("选择程序")}</Button>
  //       </td>
  //     </tr>
  //   )
  //   IOproce.push(
  //     <tr key={i} align="center">
  //     <td key='1'>{intl.get("程序")}{i}</td>
  //     <td key='2'>{intl.get("未设置")}</td>
  //     <td key='3'>
  //       <Input style={{ width: 200 }} placeholder="0" />
  //     </td>
  //     <td key='4' style={{ display:"flex",justifyContent:"space-around" }}>
  //       <Button size="small" onClick = {()=>{ setVisible(true) ;console.log(i) }}>{intl.get("选择程序")}</Button>
  //       <Button size="small">取消选择</Button>
  //     </td>
  //   </tr>
  //   )
  // }
  // console.log( props.remotepro.jobFile[])
  let IOcolumn = [
    { title:"程序号", dataIndex:"procedurenum" },
    { title:"已选程序", dataIndex:"procedure" },
    { title:"运行次数", dataIndex:"nums" },
    { title:"操作", dataIndex:"operation",width:200 }
  ];
  let IOdata = [
    { key:'1', procedurenum:'程序1',procedure:props.remotepro.jobFile[0].name,nums:<Input value={Times1} style={{ width: 200, height:"30px" }} onChange={(e)=>{ setTimes1(e.target.value)  }} />,
    operation:( <div style={{ display:"flex",justifyContent:"space-around" }}><Button style={{ height:"30px" }} onClick = {()=>{ setVisible(true) }}>选择程序</Button>  <Button style={{ height:"30px" }}>取消选择</Button> </div> )  },
    { key:'2', procedurenum:'程序2',procedure:props.remotepro.jobFile[1].name,nums:<Input value={Times2} style={{ width: 200, height:"30px" }} onChange={(e)=>{ setTimes2(e.target.value)  }} />,
    operation:( <div style={{ display:"flex",justifyContent:"space-around" }}><Button style={{ height:"30px" }} onClick = {()=>{ setVisible(true) }}>选择程序</Button>  <Button style={{ height:"30px" }}>取消选择</Button> </div> )  },
    { key:'3', procedurenum:'程序3',procedure:props.remotepro.jobFile[2].name,nums:<Input value={Times3} style={{ width: 200, height:"30px" }} onChange={(e)=>{ setTimes3(e.target.value)  }} />,
    operation:( <div style={{ display:"flex",justifyContent:"space-around" }}><Button style={{ height:"30px" }} onClick = {()=>{ setVisible(true) }}>选择程序</Button>  <Button style={{ height:"30px" }}>取消选择</Button> </div> )  },
    { key:'4', procedurenum:'程序4',procedure:props.remotepro.jobFile[3].name,nums:<Input value={Times4} style={{ width: 200, height:"30px" }} onChange={(e)=>{ setTimes4(e.target.value)  }} />,
    operation:( <div style={{ display:"flex",justifyContent:"space-around" }}><Button style={{ height:"30px" }} onClick = {()=>{ setVisible(true) }}>选择程序</Button>  <Button style={{ height:"30px" }}>取消选择</Button> </div> )  },
    { key:'5', procedurenum:'程序5',procedure:props.remotepro.jobFile[4].name,nums:<Input value={Times5} style={{ width: 200, height:"30px" }} onChange={(e)=>{ setTimes5(e.target.value)  }} />,
    operation:( <div style={{ display:"flex",justifyContent:"space-around" }}><Button style={{ height:"30px" }} onClick = {()=>{ setVisible(true) }}>选择程序</Button>  <Button style={{ height:"30px" }}>取消选择</Button> </div> )  },
    { key:'6', procedurenum:'程序6',procedure:props.remotepro.jobFile[5].name,nums:<Input value={Times6} style={{ width: 200, height:"30px" }} onChange={(e)=>{ setTimes6(e.target.value)  }} />,
    operation:( <div style={{ display:"flex",justifyContent:"space-around" }}><Button style={{ height:"30px" }} onClick = {()=>{ setVisible(true) }}>选择程序</Button>  <Button style={{ height:"30px" }}>取消选择</Button> </div> )  },
    { key:'7', procedurenum:'程序7',procedure:props.remotepro.jobFile[6].name,nums:<Input value={Times7} style={{ width: 200, height:"30px" }} onChange={(e)=>{ setTimes7(e.target.value)  }} />,
    operation:( <div style={{ display:"flex",justifyContent:"space-around" }}><Button style={{ height:"30px" }} onClick = {()=>{ setVisible(true) }}>选择程序</Button>  <Button style={{ height:"30px" }}>取消选择</Button> </div> )  },
    { key:'8', procedurenum:'程序8',procedure:props.remotepro.jobFile[7].name,nums:<Input value={Times8} style={{ width: 200, height:"30px" }} onChange={(e)=>{ setTimes8(e.target.value)  }} />,
    operation:( <div style={{ display:"flex",justifyContent:"space-around" }}><Button style={{ height:"30px" }} onClick = {()=>{ setVisible(true) }}>选择程序</Button>  <Button style={{ height:"30px" }}>取消选择</Button> </div> )  },
    { key:'9', procedurenum:'程序9',procedure:props.remotepro.jobFile[8].name,nums:<Input value={Times9} style={{ width: 200, height:"30px" }} onChange={(e)=>{ setTimes9(e.target.value)  }} />,
    operation:( <div style={{ display:"flex",justifyContent:"space-around" }}><Button style={{ height:"30px" }} onClick = {()=>{ setVisible(true) }}>选择程序</Button>  <Button style={{ height:"30px" }}>取消选择</Button> </div> )  },
    { key:'10', procedurenum:'程序10',procedure:props.remotepro.jobFile[9].name,nums:<Input value={Times10} style={{ width: 200, height:"30px" }} onChange={(e)=>{ setTimes10(e.target.value) }} />,
    operation:( <div style={{ display:"flex",justifyContent:"space-around" }}><Button style={{ height:"30px" }} onClick = {()=>{ setVisible(true) }}>选择程序</Button>  <Button style={{ height:"30px" }}>取消选择</Button> </div> )  },
  ];

  // console.log(props.Mudata)
  useEffect(()=>{
    let Mudata = [];
    let MuColumns = [];
    MuColumns.push(
      { title:"程序号", dataIndex:"procedurenum" },
      { title:"已选程序", dataIndex:"procedure" },
      { title:"操作", dataIndex:"operation",width:200 }
    )
    props.Moproce.jobnamelist.map((v,i)=>{
      console.log(v,i)
      Mudata.push(
        {procedurenum:i+1, procedure:v[i], operation:<Button style={{ height:"30px" }}>选择程序</Button> },
      )
    })
    setMudbusColumns(MuColumns)
    setMudbusdatas(Mudata)
  },[])

  useEffect(() => {
    sendMSGtoServer("Project", { robot: props.currentRobot });
  }, [props.currentRobot]);

  //点击模态框确认的回调
  const thideModal = ( ) => {
    setVisible(true)
  }
  //点击模态框取消的回调
  const hideModal = ( ) => {
    setVisible(false)
  }

  return (
    <div >
      {/* 头部 */}
      <ConTitle title={intl.get("远程程序")} subtitle={intl.get("远程程序设置")}/>
      {/* 悬浮按钮 */}
      <div className="hoverButton1">
      </div>
      {/* 主要内容 */}
      <div className="Remotepro">
        <Tabs defaultActiveKey="1" style={{ background: "white" }}>
          <TabPane tab="IO程序" key="1">
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
            {/* <Row>
              <Col span={20} offset={2}>
                <div>
                  <table>
                    <thead>
                      <tr key='1'>
                        <th>{intl.get("程序号")}</th>
                        <th>{intl.get("已选程序")}</th>
                        <th>{intl.get("操作")}</th>
                      </tr>
                      {MudbusProce}
                    </thead>
                  </table>
                </div>
              </Col>
            </Row> */}
            <Table
              pagination={false}
              size={"small"}
              columns={MudbusColumns}
              dataSource={Mudbusdatas}
            />
            <Pagination defaultCurrent={1} total={300} showQuickJumper pageSizeOptions={[10]} />
          </TabPane>
        </Tabs>
      </div>
      <Modal
         title="Modal"
         visible={visible}
         onOk={thideModal}
         onCancel={hideModal}
         okText="确认"
         cancelText="取消"
      >
          <p>Bla bla ...</p>
          <p>Bla bla ...</p>
          <p>Bla bla ...</p>
      </Modal>
    </div>
  );
}
export default connect(mapStateToProps)(Remotepro);
