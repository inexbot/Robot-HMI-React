import React, { useEffect, useState, useCallback } from "react";
import { Tabs, Button, Input, Table, Pagination, message } from "antd"
import { connect } from "dva";
import "./index.module.css";

const mapStateToProps = (state) => {
  return {
    
  }
}

function GlobalNumberical(props){
  const [ IntColumns, setIntColumns ] = useState('');
  const [ IntDatas, setIntDatas ] = useState('');
  const [ ReaColumns, setReaColumns ] = useState('');
  const [ ReaDatas, setReaDatas ] = useState('');
  const [ BolColumns, setBolColumns ] = useState('');
  const [ BolDatas, setBolDatas ] = useState('');
  const [ IntSizeNum, setIntSizeNum ] = useState(10);
  const [ ReaSizeNum, setReaSizeNum ] = useState(10);
  const [ BolSizeNum, setBolSizeNum ] = useState(10);
  const [ BjIndex, setBjIndex ] = useState(-1);
  const [ valueChange, setValueChange] = useState(true);
  const [ ShowAllIpt, setShouAllIpt ] = useState(true)
  const { TabPane } = Tabs;

  // 点击整数型表格的变量名使之变颜色
  const nameChangeBj = useCallback((value)=>{
    if( BjIndex === value ){
    }else{
      setValueChange(true);
      setShouAllIpt(true);
      setBjIndex(value)
    }
  },[BjIndex])

  // 整数型表格的渲染
  useEffect(()=>{
    let columns = [];
    let datas = [];
    let YLstyle = { background:'rgb(243, 108, 33)',border:'none',width:'100%' };
    let GRstyle ={ background:'rgb(69, 185, 124)',border:'none',width:'100%' }
    columns.push(
      { title:'变量名', dataIndex:'name',align:'center' },
      { title:'数值', dataIndex:'value',align:'center' },
      { title:'注释', dataIndex:'annotation',align:'center' },
    );
    for(let i = IntSizeNum-9; i <=IntSizeNum; i++){
      datas.push(
      { key:i,
        name:i<10?<Button type='primary' style={BjIndex === i?GRstyle:YLstyle} onClick={ nameChangeBj.bind(null,i) }>GI00{i}</Button>
        :i<100?<Button type='primary' style={BjIndex === i?GRstyle:YLstyle} onClick={ nameChangeBj.bind(null,i) }>GI0{i}</Button>
        :<Button type='primary' style={BjIndex === i?GRstyle:YLstyle} onClick={ nameChangeBj.bind(null,i) }>GI{i}</Button>,
        value:<Input style={{ borderTop:'none',borderLeft:'none',borderRight:'none' }}   disabled={ ShowAllIpt === true? true: BjIndex === i? false : true }/>,
        annotation:<Input style={{ borderTop:'none',borderLeft:'none',borderRight:'none' }}   disabled={ ShowAllIpt === true? true: BjIndex === i? false : true } /> }
      )
    }
    setIntColumns(columns);
    setIntDatas(datas);
  },[IntSizeNum,BjIndex,ShowAllIpt,nameChangeBj])
  // 实数型表格的渲染
  useEffect(()=>{
    let columns = [];
    let datas = [];
    let YLstyle = { background:'rgb(243, 108, 33)',border:'none',width:'100%' };
    let GRstyle ={ background:'rgb(69, 185, 124)',border:'none',width:'100%' }
    columns.push(
      { title:'变量名', dataIndex:'name',align:'center' },
      { title:'数值', dataIndex:'value',align:'center' },
      { title:'注释', dataIndex:'annotation',align:'center' },
    );
    for(let i = ReaSizeNum-9; i <=ReaSizeNum; i++){
      datas.push(
      { key:i,
        name:i<10?<Button type='primary' style={BjIndex === i?GRstyle:YLstyle} onClick={ nameChangeBj.bind(null,i) }>GD00{i}</Button>
        :i<100?<Button type='primary' style={BjIndex === i?GRstyle:YLstyle} onClick={ nameChangeBj.bind(null,i) }>GD0{i}</Button>
        :<Button type='primary' style={BjIndex === i?GRstyle:YLstyle} onClick={ nameChangeBj.bind(null,i) }>GD{i}</Button>,
        value:<Input value={ 0 } style={{ borderTop:'none',borderLeft:'none',borderRight:'none'}} disabled={ ShowAllIpt === true? true: BjIndex === i? false : true } />,
        annotation:<Input style={{ borderTop:'none',borderLeft:'none',borderRight:'none' }} value='这里是注释' disabled={ ShowAllIpt === true? true: BjIndex === i? false : true } /> }
      )
    }
    setReaColumns(columns);
    setReaDatas(datas);
  },[ReaSizeNum,BjIndex,ShowAllIpt,nameChangeBj])
  // 布尔型表格的渲染
  useEffect(()=>{
    let columns = [];
    let datas = [];
    // 定义两个变量的样式
    let YLstyle = { background:'rgb(243, 108, 33)',border:'none',width:'100%' };
    let GRstyle ={ background:'rgb(69, 185, 124)',border:'none',width:'100%' }
    columns.push(
      { title:'变量名', dataIndex:'name',align:'center' },
      { title:'数值', dataIndex:'value',align:'center' },
      { title:'注释', dataIndex:'annotation',align:'center' },
    );
    for(let i = BolSizeNum-9; i <=BolSizeNum; i++){
      datas.push(
      { key:i,
        name:i<10?<Button type='primary' style={BjIndex === i?GRstyle:YLstyle} onClick={ nameChangeBj.bind(null,i) }>GB00{i}</Button>
        :i<100?<Button type='primary' style={BjIndex === i?GRstyle:YLstyle} onClick={ nameChangeBj.bind(null,i) }>GB0{i}</Button>
        :<Button type='primary' style={BjIndex === i?GRstyle:YLstyle} onClick={ nameChangeBj.bind(null,i) }>GB{i}</Button>,
        value:<Input value={ 0 } style={{ borderTop:'none',borderLeft:'none',borderRight:'none' }} disabled={ ShowAllIpt === true? true: BjIndex === i? false : true } />,
        annotation:<Input style={{ borderTop:'none',borderLeft:'none',borderRight:'none' }} value='这里是注释' disabled={ ShowAllIpt === true? true: BjIndex === i? false : true } /> }
      )
    }
    setBolColumns(columns);
    setBolDatas(datas);
  },[BolSizeNum,BjIndex,ShowAllIpt,nameChangeBj])
  const callback = (key) => {
    console.log(key);
    setValueChange(true);
    setShouAllIpt(true);
  }
  return(
    <div>
            {/* 悬浮按钮 */}
            {valueChange ? (
        <div style={{ marginLeft: "20%" }}>
          <div className="hoverButton1">
            <Button size="large" shape="circle" onClick={() => {
                if( BjIndex === -1 ){
                  message.error('请选择想要修改的变量')
                }else{
                  setValueChange(false);
                  setShouAllIpt(false);
                  console.log('点击了修改')
                }
              }}
              type="primary"
            >
              修改
            </Button>
          </div>
        </div>
      ) : (
        <div style={{ marginLeft: "20%" }}>
          <div className="hoverButton3">
            <Button size="large" shape="circle" type="primary"
              style={{ color:"#ff4d4f" ,border: "1px #ff4d4f dashed",background:"#ffffff",boxShadow:"0 1px 8px rgba(200, 200, 200, 0.6)" }}
              onClick={() => {
                console.log('点击了清除')
              }}
            >
              清除
            </Button>
          </div>
          <div className="hoverButton2">
            <Button size="large" shape="circle" onClick={(e) => {
                setValueChange(true);
                setShouAllIpt(true);
                console.log('点击了取消')
              }}
              type="primary"
              style={{ border: "none" }}
            >
              取消
            </Button>
          </div>
          <div className="hoverButton1">
            <Button size="large" shape="circle" onClick={(e) => {
                setValueChange(true);
                setShouAllIpt(true);
                console.log('点击了保存')
              }}
              type="primary"
              style={{ background: "#45b97c", border: "none" }}
            >
              保存
            </Button>
          </div>
        </div>
      )}
    <Tabs defaultActiveKey="1" onChange={callback}>
      <TabPane tab="整数型" key="1">
        <Table
          columns={IntColumns}
          dataSource={IntDatas}
          pagination={false}
          size='small'
          style={{ marginTop:'-10px' }}
        />
        <Pagination
          current={IntSizeNum/10}
          pageSize={10}
          showQuickJumper={true}
          total={990}
          onChange={( page)=>{
            setIntSizeNum(page*10)
          }}
          />
      </TabPane>
      <TabPane tab="实数型" key="2">
      <Table
          columns={ReaColumns}
          dataSource={ReaDatas}
          pagination={false}
          size='small'
          style={{ marginTop:'-10px' }}
        />
        <Pagination
          current={ReaSizeNum/10}
          pageSize={10}
          showQuickJumper={true}
          total={990}
          onChange={( page)=>{
            setReaSizeNum(page*10)
          }}
          />
      </TabPane>
      <TabPane tab="布尔型" key="3">
      <Table
          columns={BolColumns}
          dataSource={BolDatas}
          pagination={false}
          size='small'
          style={{ marginTop:'-10px' }}
        />
        <Pagination
          current={BolSizeNum/10}
          pageSize={10}
          showQuickJumper={true}
          total={990}
          onChange={( page)=>{
            setBolSizeNum(page*10)
          }}
          />
      </TabPane>
    </Tabs>
    </div>
  )
}

export default connect(mapStateToProps)(GlobalNumberical)