import React, { useEffect, useState, useCallback } from "react";
import { connect } from "dva";
import { Tabs, Table, Switch  } from "antd";
import { sendMSGtoController } from "service/network";

const mapStateToProps = (state) => {
  return {
    currentRobot: state.index.robotStatus.currentRobot,
    Imexport: state.index.mainState.Imexport,
  };
};

function Imexport(props){
  const [ DataSourceOne, setDataSourceOne ] = useState('');
  const [ DataSourceTwo, setDataSourceTwo ] = useState('');
  const [ Columns, setColumns ] = useState('');
  const [ KeySum, setKeySum ] = useState(1);
  const [ nowValue, setnowValue ] = useState(props.Imexport.status)

  const { TabPane } = Tabs;

  // 点击标签页
  const callback = (key) =>{
    setKeySum(Number(key))

  }
  // 更新数据
  useEffect(()=>{
    setnowValue(props.Imexport.status)
  },[props.Imexport.status])
  const onChange = useCallback((i,checked)=>{
    let DataList = { 
      port:i+1,
      status:Number(checked),
    }
    sendMSGtoController("GPIO_DOUT_SET",DataList)
  },[])

  // 获取数据
  useEffect(()=>{
    if( KeySum === 1 ){
      sendMSGtoController("GPIO_DIN_INQUIRE",'')
    }else if( KeySum === 2 ){
      sendMSGtoController("GPIO_DOUT_INQUIRE",'')
    }else if( KeySum === 3 ){
      sendMSGtoController("ANALOG_IN_INQUIRE",'')
    }else if( KeySum === 4 ){
      sendMSGtoController("ANALOG_OUT_INQUIRE",'')
    }
  },[KeySum])

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
            {key:`${i+1}`, name:Name, type:Type, value:(<Switch defaultChecked={nowValue[i]} onChange={onChange.bind(null,i)} />) }
          )
        }else{
          Onedata.push(
              {key:`${i+1}`, name:Name, type:Type, value:nowValue[i] }
            )
        }
      }else{
        if( KeySum === 2 ){
          Twodata.push(
            {key:`${i+1}`, name:Name, type:Type, value:(<Switch defaultChecked={nowValue[i]} onChange={onChange.bind(null,i)} />) }
          )
        }else{
          Twodata.push(
            {key:`${i+1}`, name:Name, type:Type, value:nowValue[i] }
          )
        }
      }
    };
    setDataSourceOne(Onedata);
    setDataSourceTwo(Twodata);
  },[KeySum,onChange,nowValue])
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