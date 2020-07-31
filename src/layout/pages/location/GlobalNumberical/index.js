import React, { useEffect, useState } from "react";
import { Tabs, Button, Input, Table, Pagination } from "antd"
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
  const [ PageSizeNum, setPageSizeNum ] = useState(10);
  const [ BjIndex, setBjIndex ] = useState(-1);
  const [valueChange, setValueChange] = useState(true);
  const [ ShowAllIpt, setShouAllIpt ] = useState(true)
  // const [  ]
  const { TabPane } = Tabs;

  // 点击整数型表格的变量名使之变颜色
  const nameChangeBj = (value) => {
    setBjIndex(value)
  }

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
    for(let i = PageSizeNum-9; i <=PageSizeNum; i++){
      datas.push(
      { key:i,
        name:i<10?<Button type='primary' style={BjIndex === i?GRstyle:YLstyle} onClick={ nameChangeBj.bind(null,i) }>GI00{i}</Button>
        :i<100?<Button type='primary' style={BjIndex === i?GRstyle:YLstyle} onClick={ nameChangeBj.bind(null,i) }>GI0{i}</Button>
        :<Button type='primary' style={BjIndex === i?GRstyle:YLstyle} onClick={ nameChangeBj.bind(null,i) }>GI{i}</Button>,
        value:<Input value={ 0 } style={{ border:'none' }}  disabled={ShowAllIpt}/>,
        annotation:<Input style={{ border:'none' }} value='这里是注释' disabled={ShowAllIpt} /> }
      )
    }
    setIntColumns(columns);
    setIntDatas(datas);
  },[PageSizeNum,BjIndex,ShowAllIpt])
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
    for(let i = PageSizeNum-9; i <=PageSizeNum; i++){
      datas.push(
      { key:i,
        name:i<10?<Button type='primary' style={BjIndex === i?GRstyle:YLstyle} onClick={ nameChangeBj.bind(null,i) }>GD00{i}</Button>
        :i<100?<Button type='primary' style={BjIndex === i?GRstyle:YLstyle} onClick={ nameChangeBj.bind(null,i) }>GD0{i}</Button>
        :<Button type='primary' style={BjIndex === i?GRstyle:YLstyle} onClick={ nameChangeBj.bind(null,i) }>GD{i}</Button>,
        value:<Input value={ 0 } style={{ border:'none' }} disabled={ShowAllIpt} />,
        annotation:<Input style={{ border:'none' }} value='这里是注释' disabled={ShowAllIpt} /> }
      )
    }
    setReaColumns(columns);
    setReaDatas(datas);
  },[PageSizeNum,BjIndex,ShowAllIpt])
  // 布尔型表格的渲染
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
    for(let i = PageSizeNum-9; i <=PageSizeNum; i++){
      datas.push(
      { key:i,
        name:i<10?<Button type='primary' style={BjIndex === i?GRstyle:YLstyle} onClick={ nameChangeBj.bind(null,i) }>GB00{i}</Button>
        :i<100?<Button type='primary' style={BjIndex === i?GRstyle:YLstyle} onClick={ nameChangeBj.bind(null,i) }>GB0{i}</Button>
        :<Button type='primary' style={BjIndex === i?GRstyle:YLstyle} onClick={ nameChangeBj.bind(null,i) }>GB{i}</Button>,
        value:<Input value={ 0 } style={{ border:'none' }} disabled={ShowAllIpt} />,
        annotation:<Input style={{ border:'none' }} value='这里是注释' disabled={ShowAllIpt} /> }
      )
    }
    setBolColumns(columns);
    setBolDatas(datas);
  },[PageSizeNum,BjIndex,ShowAllIpt])
  const callback = (key) => {
    console.log(key);
  }
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
          current={PageSizeNum/10}
          pageSize={10}
          showQuickJumper={true}
          total={990}
          onChange={( page)=>{
            setPageSizeNum(page*10)
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
          current={PageSizeNum/10}
          pageSize={10}
          showQuickJumper={true}
          total={990}
          onChange={( page)=>{
            setPageSizeNum(page*10)
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
          current={PageSizeNum/10}
          pageSize={10}
          showQuickJumper={true}
          total={990}
          onChange={( page)=>{
            setPageSizeNum(page*10)
          }}
          />
      </TabPane>
    </Tabs>
    </div>
  )
}

export default connect(mapStateToProps)(GlobalNumberical)