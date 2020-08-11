import React, { useEffect, useState, useCallback } from "react";
import { Tabs, Input, Table, Button } from "antd";
import { connect } from "dva";
import  styles  from "./index.module.css";
import { sendMSGtoController } from "service/network";

const mapStateToProps = (state) => {
    return {
      currentRobot: state.index.robotStatus.currentRobot,
      GlobalLocationObj: state.index.location.GlobalLocationObj,
      robotStatus: state.index.robotStatus,
    }
}

function GlobalLocation(props){
  const [ valueChange, setValueChange] = useState(true);
  const [ Pragrameter, setPragrameter ] = useState('');
  const [ ShowBack, setShowBack ] = useState(1);
  const [ VarDatas, setVarDatas ] = useState('');
  const [ VarColumns, setVarColumns ] = useState('');
  const [ NowTable, setNowTable ] = useState('');
  const [ ShowAllIpt, setShouAllIpt ] = useState(true);
  const [ NowloaNum, setNowloaNum ] = useState(1);
  const [ TitAnno, setTitAnno ] = useState('');
  const [ PostValue1, setPostValue1 ] = useState(props.GlobalLocationObj.posValue[7]);
  const [ PostValue2, setPostValue2 ] = useState(props.GlobalLocationObj.posValue[8]);
  const [ PostValue3, setPostValue3 ] = useState(props.GlobalLocationObj.posValue[9]);
  const [ PostValue4, setPostValue4 ] = useState(props.GlobalLocationObj.posValue[10]);
  const [ PostValue5, setPostValue5 ] = useState(props.GlobalLocationObj.posValue[11]);
  const [ PostValue6, setPostValue6 ] = useState(props.GlobalLocationObj.posValue[12]);
  const [ locationPos, setlocationPos ] = useState(props.robotStatus.pos);
  const [ variable, setvariable ] = useState('G001')
  const { TabPane } = Tabs;

  useEffect(()=>{
    setTitAnno(props.GlobalLocationObj.note)
  },[props.GlobalLocationObj])
  useEffect(()=>{
    setPostValue1(props.GlobalLocationObj.posValue[7]);
    setPostValue2(props.GlobalLocationObj.posValue[8]);
    setPostValue3(props.GlobalLocationObj.posValue[9]);
    setPostValue4(props.GlobalLocationObj.posValue[10]);
    setPostValue5(props.GlobalLocationObj.posValue[11]);
    setPostValue6(props.GlobalLocationObj.posValue[12]);
  },[props.GlobalLocationObj,NowloaNum])
  useEffect(()=>{
    setlocationPos(props.robotStatus.pos)
  },[props.robotStatus])
  // 点击变量时候获取变量的参数
  useEffect(()=>{
    let name = '';
    if( ShowBack < 10 ){
      name = `G00${ShowBack}`
    }else if( ShowBack < 100 ){
      name = `G0${ShowBack}`
    }else{
      name = `G${ShowBack}`
    }
    setvariable(name)
    let dataList = {
      posName:name,
      robot:props.currentRobot
    }
    sendMSGtoController("GLOBAL_POSITION_INQUIRE",dataList)
  },[ShowBack,props.currentRobot])

  // 获取关节,直角，工具，用户参数
  useEffect(()=>{
    let dataList = {
      coord:NowloaNum-1,
      robot:props.currentRobot
    }
    sendMSGtoController("CURRENTPOS_INQUIRE",dataList)
  },[props.currentRobot,NowloaNum])

  // 点击选择框内容的回调函数
  const callback = useCallback((key) => {
    setNowloaNum(Number(key))
  },[])
  // 渲染左边的选择框
  useEffect(()=>{
    let gnum = [];
    // 定义两种样式，如果点击了哪个元素就使用带有颜色的样式
    let deStyle = { height:'7%',display:'flex', justifyContent:'center',alignItems:'center',width:'100%' };
    let gdStyle = { height:'7%',display:'flex', justifyContent:'center',alignItems:'center',width:'100%',borderRadius:'5px', background:'#1890ff'}
    // 使用循环来渲染子元素
    for(let i = 1; i<1000; i++){
      if(i<10){
        gnum.push(<div key={i} style={ ShowBack===i? gdStyle:deStyle } onClick = {()=>{ setShowBack(i) }} > G00{i}</div>)
      }else if(i>=10 && i<100 ){
        gnum.push(<div key={i} style={ ShowBack===i? gdStyle:deStyle } onClick = {()=>{ setShowBack(i) }}> G0{i}</div>)
      }else if(i>=100 && i<1000){
        gnum.push(<div key={i} style={ ShowBack===i? gdStyle:deStyle } onClick = {()=>{ setShowBack(i) }}> G{i}</div>)
      }
    }
    setPragrameter(gnum)
  },[ShowBack])

  // 渲染变量位置表格
  useEffect(()=>{
    let VarColumn = [];
    VarColumn.push(
      { key:'name', title:'变量名', dataIndex:'name', colSpan:0,width:50 },
      { ket:'value', title:'值', dataIndex:'value', colSpan:0 , }
    );
    setVarColumns(VarColumn)
  },[ShowAllIpt])  
  useEffect(()=>{
    let VarData = [];
    let Name = [];
    if(props.GlobalLocationObj.posValue[0] === 0){
      Name = ['J1','J2','J3','J4','J5','J6'];
    }else if(props.GlobalLocationObj.posValue[0] === 1){
      Name = ['X','Y','Z','A','B','C'];
    }else if(props.GlobalLocationObj.posValue[0] ===2){
      Name = ['TX','TY','TZ','TA','TB','TC'];
    }else{
      Name = ['UX','UY','UZ','UA','UB','UC'];
    }
    VarData.push(
      { key:'1', name:Name[0], value:<Input disabled={ShowAllIpt} value={PostValue1} onChange={(e)=>{ setPostValue1(e.target.value) }} /> },
      { key:'2', name:Name[1], value:<Input disabled={ShowAllIpt} value={PostValue2} onChange={(e)=>{ setPostValue2(e.target.value) }} /> },
      { key:'3', name:Name[2], value:<Input disabled={ShowAllIpt} value={PostValue3} onChange={(e)=>{ setPostValue3(e.target.value) }} /> },
      { key:'4', name:Name[3], value:<Input disabled={ShowAllIpt} value={PostValue4} onChange={(e)=>{ setPostValue4(e.target.value) }} /> },
      { key:'5', name:Name[4], value:<Input disabled={ShowAllIpt} value={PostValue5} onChange={(e)=>{ setPostValue5(e.target.value) }} /> },
      { key:'6', name:Name[5], value:<Input disabled={ShowAllIpt} value={PostValue6} onChange={(e)=>{ setPostValue6(e.target.value) }} /> },
    )
    setVarDatas(VarData);
  },[PostValue1,PostValue2,PostValue3,PostValue4,PostValue5,PostValue6,ShowAllIpt,props.GlobalLocationObj.posValue])

  // 渲染当前位置表格
  useEffect(()=>{
    let NowData = [];
    let NowColumn = [];
    let Name = [];
    if(NowloaNum === 1){
      Name = ['J1','J2','J3','J4','J5','J6'];
    }else if(NowloaNum === 2){
      Name = ['X','Y','Z','A','B','C'];
    }else if(NowloaNum ===3){
      Name = ['TX','TY','TZ','TA','TB','TC'];
    }else{
      Name = ['UX','UY','UZ','UA','UB','UC'];
    }
    NowColumn.push(
      { key:'name', title:'变量名', dataIndex:'name', colSpan:0,width:50 },
      { ket:'value', title:'值', dataIndex:'value', colSpan:0 , }
    );
    NowData.push(
      { key:'1', name:Name[0], value:locationPos[0] },
      { key:'2', name:Name[1], value:locationPos[1] },
      { key:'3', name:Name[2], value:locationPos[2] },
      { key:'4', name:Name[3], value:locationPos[3] },
      { key:'5', name:Name[4], value:locationPos[4] },
      { key:'6', name:Name[5], value:locationPos[5] },
    );
    setNowTable(
      <Table
        columns={NowColumn}
        dataSource={NowData}
        pagination={false}
        bordered={true}
        title={() => '当前位置'}
        size='middle'
      />
    )
  },[NowloaNum,locationPos,])

  return(
    <div>
      {/* 悬浮按钮 */}
      {valueChange ? (
        <div style={{ marginLeft: "20%" }}>
          <div className="hoverButton1">
            <Button size="large" shape="circle" onClick={() => {
                setValueChange(false);
                setShouAllIpt(false);
              }}
              type="primary"
            >
              修改
            </Button>
          </div>
        </div>
      ) : (
        <div style={{ marginLeft: "20%" }}>
          <div className="hoverButton2">
            <Button size="large" shape="circle" type="primary"
              style={{ color:"#ff4d4f" ,border: "1px #ff4d4f dashed",background:"#ffffff",boxShadow:"0 1px 8px rgba(200, 200, 200, 0.6)" }}
              onClick={() => {
                setPostValue1(0)
                setPostValue2(0)
                setPostValue3(0)
                setPostValue4(0)
                setPostValue5(0)
                setPostValue6(0)
              }}
            >
              清除
            </Button>
          </div>
          <div className="hoverButton1">
            <Button size="large" shape="circle" onClick={(e) => {
                setValueChange(true);
                setShouAllIpt(true);
                let dataList = {
                  robot:props.currentRobot,
                  posName:variable,
                  coord:NowloaNum-1,
                  pos:[NowloaNum-1,0,0,0,0,0,0,PostValue1,PostValue2,PostValue3,PostValue4,PostValue5,PostValue6,0],
                  note:TitAnno,
                }
                sendMSGtoController("GLOBAL_POSITION_SET",dataList)
              }}
              type="primary"
              style={{ background: "#45b97c", border: "none" }}
            >
              保存
            </Button>

          </div>
        </div>
      )}
      <Tabs defaultActiveKey="1" style={{ height:'50%' }} >
        <TabPane tab="机器人" key="1" >
          <div className={styles.tab_panels}>
            <div  style={{ width:'100px', height:'550px', overflowX:'hidden', background:'white' }}>
              {Pragrameter}
            </div>
            <div style={{ width:'100%' }}>
              <div style={{ display:'flex'}}>
                <p style={{ width:'5%',marginTop:'10px',marginLeft:'20px' }}>注释:</p><Input disabled={ ShowAllIpt === true? true : false} value={TitAnno} onChange={(e)=>{
                  setTitAnno(e.target.value)
                }}
                 style={{ height:'40px' }} placeholder="" />
              </div>
              <div style={{ display:'flex',background:'white' }}>
                <div style={{ width:'50%',height:'450px',}}>
                  <Table
                    style={{ width:'80%',marginLeft:'10%'}}
                    columns={VarColumns}
                    dataSource={VarDatas}
                    pagination={false}
                    bordered={true}
                    title={() => '变量位置'}
                    size='middle'
                  />
                  <Button style={{ border:'none',marginLeft:'35%',marginTop:'13px'}} type='primary' onClick={()=>{
                    let dataList = {
                      RobotPos:{
                        robot:props.currentRobot,
                        key:4653057,
                        ctype:71,
                        data:[NowloaNum-1,0,0,0,0,0,0,PostValue1,PostValue2,PostValue3,PostValue4,PostValue5,PostValue6,0],
                      }
                    }
                    sendMSGtoController("GO_POSITION",dataList)
                  }}>机器人运动至此</Button>
                </div>
                <div style={{ width:'50%',background:'white' }}>
                  <Tabs defaultActiveKey={NowloaNum} onChange={callback} tabBarGutter={1} centered={true}>
                    <TabPane tab='关节' key={1}>
                      {NowTable}
                    </TabPane>
                    <TabPane tab='直角' key={2}>
                      {NowTable}
                    </TabPane>
                    <TabPane tab='工具' key={3}>
                      {NowTable}
                    </TabPane>
                    <TabPane tab='用户' key={4}>
                      {NowTable}
                    </TabPane>
                  </Tabs>
                  <Button style={{ border:'none',marginLeft:'40%'}} type='primary' disabled={ShowAllIpt} onClick = {()=>{
                    props.dispatch({
                      type:'index/writelocation',
                      data:[NowloaNum-1,0,0,0,0,0,0,locationPos[0],locationPos[1],locationPos[2],locationPos[3],locationPos[4],locationPos[5],0],
                    })
                  }} >写入当前位置</Button>
                </div>
              </div>
            </div>
          </div>
        </TabPane>
      </Tabs>
    </div>
  )
}

export default connect(mapStateToProps)(GlobalLocation)