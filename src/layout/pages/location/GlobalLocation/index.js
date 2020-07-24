import React, { useEffect, useState } from "react";
import { Tabs, Input, Table, Button } from "antd"
import { connect } from "dva";
import  styles  from "./index.module.css"

const mapStateToProps = (state) => {
    return {

    }
}

function GlobalLocation(props){
  const [valueChange, setValueChange] = useState(true);
  const [ Pragrameter, setPragrameter ] = useState('');
  const [ ShowBack, setShowBack ] = useState(0);
  const [ VarDatas, setVarDatas ] = useState('');
  const [ VarColumns, setVarColumns ] = useState('');
  const [ NowTable, setNowTable ] = useState('')
  const [ ShowAllIpt, setShouAllIpt ] = useState(true)
  const { TabPane } = Tabs;

  // 点击选择框内容的回调函数
  const callback = (key) => {
      console.log(key)
  }
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
    let VarData = [];
    let VarColumn = [];
    VarColumn.push(
      { key:'name', title:'变量名', dataIndex:'name', colSpan:0,width:50 },
      { ket:'value', title:'值', dataIndex:'value', colSpan:0 , }
    );
    VarData.push(
      { key:'1', name:'S', value:<Input disabled={ShowAllIpt} value={0} /> },
      { key:'2', name:'L', value:<Input disabled={ShowAllIpt} value={0} /> },
      { key:'3', name:'U', value:<Input disabled={ShowAllIpt} value={0} /> },
      { key:'4', name:'R', value:<Input disabled={ShowAllIpt} value={0} /> },
      { key:'5', name:'B', value:<Input disabled={ShowAllIpt} value={0} /> },
      { key:'6', name:'T', value:<Input disabled={ShowAllIpt} value={0} /> },
      { key:'7', name:'ψ', value:<Input disabled={ShowAllIpt} value={0} /> },
    )
    setVarDatas(VarData);
    setVarColumns(VarColumn)
  },[ShowAllIpt])  

  // 渲染当前位置表格
  useEffect(()=>{
    let NowData = [];
    let NowColumn = [];
    NowColumn.push(
      { key:'name', title:'变量名', dataIndex:'name', colSpan:0,width:50 },
      { ket:'value', title:'值', dataIndex:'value', colSpan:0 , }
    );
    NowData.push(
      { key:'1', name:'S', value:'' },
      { key:'2', name:'L', value:'' },
      { key:'3', name:'U', value:'' },
      { key:'4', name:'R', value:'' },
      { key:'5', name:'B', value:'' },
      { key:'6', name:'T', value:'' },
      { key:'7', name:'ψ', value:'' },
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
  },[])

  return(
    <div>
      {/* 悬浮按钮 */}
      {valueChange ? (
        <div style={{ marginLeft: "20%" }}>
          <div className="hoverButton2">
            <Button size="large" shape="circle" type="primary"
              style={{ color:"#ff4d4f" ,border: "1px #ff4d4f dashed",background:"#ffffff",boxShadow:"0 1px 8px rgba(200, 200, 200, 0.6)" }}
              onClick={() => {

              }}
            >
              清除
            </Button>
          </div>
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

              }}
            >
              清除
            </Button>
          </div>
          <div className="hoverButton1">
            <Button size="large" shape="circle" onClick={(e) => {
                setValueChange(true);
                setShouAllIpt(true);
              }}
              type="primary"
              style={{ background: "#45b97c", border: "none" }}
            >
              保存
            </Button>

          </div>
        </div>
      )}
      <Tabs defaultActiveKey="1" onChange={callback} style={{ height:'50%' }} >
        <TabPane tab="机器人" key="1" >
          <div className={styles.tab_panels}>
            <div  style={{ width:'100px', height:'550px', overflowX:'hidden', background:'white' }}>
              {Pragrameter}
            </div>
            <div style={{ width:'100%' }}>
              <div style={{ display:'flex'}}>
                <p style={{ width:'5%',marginTop:'10px',marginLeft:'20px' }}>注释:</p><Input style={{ height:'40px' }} placeholder="Basic usage" />
              </div>
              <div style={{ display:'flex' }}>
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
                  <Button style={{ border:'none',marginLeft:'35%'}} type='primary'>机器人运动至此</Button>
                </div>
                <div style={{ width:'50%' }}>
                  <Tabs defaultActiveKey="1" onChange={callback} tabBarGutter={1} centered={true}>
                    <TabPane tab='关节' key='1'>
                      {NowTable}
                    </TabPane>
                    <TabPane tab='直角' key='2'>
                      {NowTable}
                    </TabPane>
                    <TabPane tab='工具' key='3'>
                      {NowTable}
                    </TabPane>
                    <TabPane tab='用户' key='4'>
                      {NowTable}
                    </TabPane>
                  </Tabs>
                  <Button style={{ border:'none',marginLeft:'40%'}} type='primary'>写入当前位置</Button>
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