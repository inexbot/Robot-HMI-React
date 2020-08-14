import React,{ useEffect, useState } from "react";
import ConTitle from "components/title";
import { Table, Button } from "antd";
import "./index.css"
import { useHistory } from "react-router-dom"

function SevenTdema() {
  const [ mainTables, setMainTables ] = useState('');
  const [ mainColumns, setMainColumns ] = useState('');
  const history = useHistory()

  // 渲染表格
  useEffect(()=>{
    let tables = [];
    let columns = [];
    columns.push(
      { title:'已标原点', dataIndex:'origin',align:'center' },
      { title:'已标X值', dataIndex:'xvalue',align:'center' },
      { title:'已标Y值', dataIndex:'yvalue',align:'center' },
    );
    for(let i = 0; i < 6; i++){
      tables.push(
        { key:{i}, origin:i+1, xvalue:i+1, yvalue:i+1  },
      )
    };
    setMainTables(tables);
    setMainColumns(columns);
  },[])

  return(
    <div >
      {/* 头部 */}
      <ConTitle
        title="标定用户坐标"
        subtitle="用户坐标2"
      />
      {/* 主要内容 */}
      <div className="Usercoo" style={{ display:'block' }}>
        <div style={{width:'50%',display:'flex',flexDirection:'column',justifyContent:'center',float:'left',marginLeft:'10%'}}>
           <span style={{ display:'flex',justifyContent:'center',fontSize:'20px' }}>相关数据</span>
          <Table
            dataSource={mainTables}
            columns={mainColumns}
            pagination={false}
            style={{ background:'#fff' }}
          />
        </div>
        <div style={{ width:'30%',display:'flex',flexDirection:'column',justifyContent:'center',float:'left'}}>
          <span  style={{ display:'flex',justifyContent:'center',fontSize:'20px'  }}>演示图片</span>
        </div>
        <div style={{ marginLeft:'7%',width:'50%',marginTop:'20px'  }}>
          <Button type='primary' style={{ marginLeft:'20%' }}> 标记原点 </Button>
          <Button type='primary' style={{ marginLeft:'40px' }}> 标记X值 </Button>
          <Button type='primary' style={{ marginLeft:'40px' }}> 标记Y值 </Button>
        </div>
        <div style={{ marginLeft:'7%',width:'50%',marginTop:'20px' }}>
          <Button type='primary' style={{ marginLeft:'22%' }}> 计算 </Button>
        </div>
        <div className="hoverButton1">
          <Button
           size="large"
           type="primary"
           shape="circle"
           style={{
             border: "none",
             fontSize:"14px"
           }}
           onClick={()=>{
            history.push('/Usercoo')
           }}
          >
            返回
          </Button>
        </div>
      </div>
    </div>
  )
}

export default SevenTdema;