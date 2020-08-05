import React, { useEffect, useState, useCallback } from "react";
import { connect } from "dva";
import { Tabs, Table, Switch  } from "antd";
import { sendMSGtoController } from "service/network";

const mapStateToProps = (state) => {
  return {
    currentRobot: state.index.robotStatus.currentRobot,
  };
};

function Imexport(props){
  const [ DataSourceOne, setDataSourceOne ] = useState('');
  const [ DataSourceTwo, setDataSourceTwo ] = useState('');
  const [ Columns, setColumns ] = useState('');
  const [ KeySum, setKeySum ] = useState(1);

  const { TabPane } = Tabs;

  // 点击标签页
  const callback = (key) =>{
    console.log(key)
    setKeySum(Number(key))
  }
  // 获取数据
  useEffect(()=>{
    
  })
  const onChange = useCallback((checked)=>{
    console.log(checked)
  },[])

  // 渲染表格
  useEffect(()=>{
    let columns = [];
    columns.push(
      { title:'端口', dataIndex:'name',align:'center' },
      { title:'类型', dataIndex:'type',align:'center' },
      { title:'当前值', dataIndex:'value',align:'center' }
    );
    setColumns(columns);
  },[])
  useEffect(()=>{
    let Onedata = [];
    let Twodata = [];
    let Name = '';
    let Type = '';
    for(let i = 0; i < 16; i++){
      if( KeySum === 1 ){
        Name = `DIN[${i+1}]`;
        Type = 'Bit';
      }else if( KeySum === 2 ){
        Name = `DOUT[${i+1}]`;
        Type = 'Bit';
      }else if( KeySum === 3 ){
        Name = `AIN[${i+1}]`;
        Type = 'V';
      }else{
        Name = `AOUT[${i+1}]`;
        Type = 'V';
      }
      if(i < 8 ){
        if( KeySum === 2 ){
          Onedata.push(
            {key:`${i+1}`, name:Name, type:Type, value:(<Switch defaultChecked={false} onChange={onChange} />) }
          )
        }else{
          Onedata.push(
              {key:`${i+1}`, name:Name, type:Type, value:'0' }
            )
        }
      }else{
        if( KeySum === 2 ){
          Twodata.push(
            {key:`${i+1}`, name:Name, type:Type, value:(<Switch defaultChecked={false} onChange={onChange} />) }
          )
        }else{
          Twodata.push(
            {key:`${i+1}`, name:Name, type:Type, value:'0' }
          )
        }
      }
    };
    setDataSourceOne(Onedata);
    setDataSourceTwo(Twodata);
  },[KeySum,onChange])
  return(
    <div>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="数字输入" key="1" />
        <TabPane tab="数字输出" key="2" />
        <TabPane tab="模拟输入" key="3" />
        <TabPane tab="模拟输出" key="4" />
      </Tabs>
      <div style={{ display:'flex' }}>
        <Table 
          columns={Columns}
          dataSource={DataSourceOne}
          style={{ width:'50%' }}
          pagination={false}
        />
        <Table 
          columns={Columns}
          dataSource={DataSourceTwo}
          style={{ width:'50%' }}
          pagination={false}
        />
      </div>
    </div>
  )
}

export default connect(mapStateToProps)(Imexport);