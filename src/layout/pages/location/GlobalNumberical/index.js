import React, { useEffect, useState, useCallback } from "react";
import { Tabs, Button, Input, Table, Pagination, message } from "antd"
import { connect } from "dva";
import "./index.module.css";
import { sendMSGtoController } from "service/network";

const mapStateToProps = (state) => {
  return {
    currentRobot: state.index.robotStatus.currentRobot,
    GlobalNumbericalObj: state.index.location.GlobalNumbericalObj
  }
}

function GlobalNumberical(props){
  const [ GlobalNumbericalObj, setGlobalNumbericalObj ] = useState(props.GlobalNumbericalObj);
  const [ IntColumns, setIntColumns ] = useState('');
  const [ IntDatas, setIntDatas ] = useState('');
  const [ IntSizeNum, setIntSizeNum ] = useState(10);
  const [ BjIndex, setBjIndex ] = useState(-1);
  const [ valueChange, setValueChange] = useState(true);
  const [ ShowAllIpt, setShouAllIpt ] = useState(true)
  const [ VarbalType, setVarbalType ] = useState(2);
  const [ yelowSum, setyelowSum ] = useState(0);
  const [ SumTypeName, setSumTypeName ] = useState('');
  const [ SumNumber, setSumNumber ] = useState('');
  const [ SumAnno, setSumAnno ] = useState(''); 

  const { TabPane } = Tabs;

  useEffect(()=>{
    setGlobalNumbericalObj(props.GlobalNumbericalObj)
  },[props.GlobalNumbericalObj]);
  // 点击整数型表格的变量名使之变颜色
  const nameChangeBj = useCallback((value,TypeName)=>{
    setSumTypeName(TypeName)
    if( BjIndex === value ){
      console.log(BjIndex,value)
    }else{
      if( ShowAllIpt === false ){
      }else{
        setValueChange(true);
        setShouAllIpt(true);
        setBjIndex(value);
      }
    }
  },[BjIndex,ShowAllIpt])
  // 修改数值输入框内容
  const IptChangeValue = useCallback((e,i,TypeName)=>{
    setSumTypeName(TypeName)
    setSumNumber(Number(e.target.value))
    let Data = GlobalNumbericalObj;
    if(i<11){
      let smData = Data[i-1];
      smData.varValue = String(e.target.value);
      Data.splice([i-1],1,smData)
      setGlobalNumbericalObj([...Data])
    }else{
      let smData = Data[i-(IntSizeNum-10)-1];
      smData.varValue = String(e.target.value);
      Data.splice([i-(IntSizeNum-10)-1],1,smData)
      setGlobalNumbericalObj([...Data])
    }
  },[GlobalNumbericalObj,IntSizeNum])
  // 修改注释输入框内容
  const IptChangeAnno = useCallback((e,i,TypeName)=>{
    setSumAnno(e.target.value)
    let Data = GlobalNumbericalObj;
    if(i<11){
      let smData = Data[i-1];
      smData.varNote = String(e.target.value);
      Data.splice([i-1],1,smData)
      setGlobalNumbericalObj([...Data])
    }else{
      let smData = Data[i-(IntSizeNum-10)-1];
      smData.varNote = String(e.target.value);
      Data.splice([i-(IntSizeNum-10)-1],1,smData)
      setGlobalNumbericalObj([...Data])
    }
  },[GlobalNumbericalObj,IntSizeNum])

  useEffect(()=>{
    let varName = [];
    if( VarbalType === 2 ){
      for(let i = IntSizeNum-9; i <= IntSizeNum; i++ ){
        if( i < 10 ){
          varName.push(`GI00${i}`)
        }else if( i < 100 ){
          varName.push(`GI0${i}`)
        }else{
          varName.push(`GI${i}`)
        }
      }
    }else if( VarbalType === 3 ){
      for(let i = IntSizeNum-9; i <= IntSizeNum; i++ ){
        if( i < 10 ){
          varName.push(`GD00${i}`)
        }else if( i < 100 ){
          varName.push(`GD0${i}`)
        }else{
          varName.push(`GD${i}`)
        }
      }
    }else if( VarbalType === 1 ){
      for(let i = IntSizeNum-9; i <= IntSizeNum; i++ ){
        if( i < 10 ){
          varName.push(`GB00${i}`)
        }else if( i < 100 ){
          varName.push(`GB0${i}`)
        }else{
          varName.push(`GB${i}`)
        }
      }
    }
    let inquireGlobal = setInterval(() => {
      sendMSGtoController("GLOBAL_VARIANT_INQUIRE",{ varName:varName[yelowSum],varType:VarbalType })
      setyelowSum(yelowSum+1)
    },300);
    if( yelowSum > 9 ){
      clearInterval(inquireGlobal)
    }
    return () => {
      clearInterval(inquireGlobal)
    }

  },[VarbalType,IntSizeNum,yelowSum])

  // 表格的渲染
  useEffect(()=>{
    let columns = [];
    columns.push(
      { title:'变量名', dataIndex:'name',align:'center' },
      { title:'数值', dataIndex:'value',align:'center' },
      { title:'注释', dataIndex:'annotation',align:'center' },
    );
    setIntColumns(columns);
  },[])

  useEffect(()=>{
    let datas = [];
    let YLstyle = { background:'rgb(243, 108, 33)',border:'none',width:'100%' };
    let GRstyle ={ background:'rgb(69, 185, 124)',border:'none',width:'100%' }
    for(let i = IntSizeNum-9; i <=IntSizeNum; i++){
      let TypeName = ''
      if( i < 10 ){
        if( VarbalType === 2 ){
          TypeName = `GI00${i}`
        }else if( VarbalType === 3 ){
          TypeName = `GD00${i}`
        }else{
          TypeName = `GB00${i}`
        }
      }else if( i<100 ){
        if( VarbalType === 2 ){
          TypeName = `GI0${i}`
        }else if( VarbalType === 3 ){
          TypeName = `GD0${i}`
        }else{
          TypeName = `GB0${i}`
        }
      }else{
        if( VarbalType === 2 ){
          TypeName = `GI${i}`
        }else if( VarbalType === 3 ){
          TypeName = `GD${i}`
        }else{
          TypeName = `GB${i}`
        }
      }
      datas.push(
      { key:i,
        name:<Button type='primary' style={BjIndex === i?GRstyle:YLstyle} onClick={ nameChangeBj.bind(null,i,TypeName) }>{TypeName}</Button>,
        value:<Input value={i<11?VarbalType===1?Number(GlobalNumbericalObj[i-1].varValue):String(GlobalNumbericalObj[i-1].varValue)
          :VarbalType===1?Number(GlobalNumbericalObj[(i+9)%10].varValue):String(GlobalNumbericalObj[i-(IntSizeNum-10)-1].varValue)}
        style={{ borderTop:'none',borderLeft:'none',borderRight:'none' }}  disabled={ ShowAllIpt === true? true: BjIndex === i? false : true }
        onChange={(e)=>{IptChangeValue(e,i,TypeName)}}
        />,
        annotation:<Input value={i<11?GlobalNumbericalObj[i-1].varNote:GlobalNumbericalObj[i-(IntSizeNum-10)-1].varNote}
        style={{ borderTop:'none',borderLeft:'none',borderRight:'none' }}  disabled={ ShowAllIpt === true? true: BjIndex === i? false : true }
        onChange={(e)=>{IptChangeAnno(e,i,TypeName)}}
        /> }
      )
    }
    setIntDatas(datas);
  },[GlobalNumbericalObj,IntSizeNum,BjIndex,ShowAllIpt,nameChangeBj,VarbalType,IptChangeValue,IptChangeAnno,props.GlobalNumbericalObj])

  const callback = (key) => {
    setyelowSum(0)
    setVarbalType(Number(key))
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
                  console.log('点击了修改',BjIndex)
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
          <div className="hoverButton2">
            <Button size="large" shape="circle" type="primary"
              style={{ color:"#ff4d4f" ,border: "1px #ff4d4f dashed",background:"#ffffff",boxShadow:"0 1px 8px rgba(200, 200, 200, 0.6)" }}
              onClick={() => {
                console.log('点击了清除')
                setSumNumber(0);
                setSumAnno('');
                let Data = GlobalNumbericalObj;
                if(BjIndex<11){
                  let smData = Data[BjIndex-1];
                  smData.varValue = 0;
                  smData.varNote = '0';
                  Data.splice([BjIndex-1],1,smData)
                  console.log(Data)
                  setGlobalNumbericalObj([...Data])
                }else{
                  let smData = Data[BjIndex-(IntSizeNum-10)-1];
                  smData.varValue = 0;
                  smData.varNote = '0';
                  Data.splice([BjIndex-(IntSizeNum-10)-1],1,smData)
                  setGlobalNumbericalObj([...Data])
                }
              }}
            >
              清除
            </Button>
          </div>
          <div className="hoverButton3">
            <Button size="large" shape="circle" onClick={(e) => {
                setValueChange(true);
                setShouAllIpt(true);
              }}
              type="primary"
              style={{ background: "#45b97c", border: "none" }}
            >
              取消
            </Button>
          </div>
          <div className="hoverButton1">
            <Button size="large" shape="circle" onClick={(e) => {
                setValueChange(true);
                setShouAllIpt(true);
                console.log('点击了保存')
                let DataList = {
                  varName:SumTypeName,
                  varNote:String(SumAnno),
                  varType:VarbalType,
                  varValue:SumNumber,
                }
                sendMSGtoController("GLOBAL_VARIANT_SET",DataList)
              }}
              type="primary"
              style={{ background: "#45b97c", border: "none" }}
            >
              保存
            </Button>
          </div>
        </div>
      )}
    <Tabs defaultActiveKey="2" onChange={callback}>
      <TabPane tab="整数型" key="2">
      </TabPane>
      <TabPane tab="实数型" key="3">
      </TabPane>
      <TabPane tab="布尔型" key="1">
      </TabPane>
    </Tabs>
    <div>
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
        pageSizeOptions={[10]}
        showQuickJumper={true}
        total={990}
        onChange={( page)=>{
          if( valueChange === false ){

          }else{
            setIntSizeNum(page*10)
            setyelowSum(0)
            setValueChange(true);
            setShouAllIpt(true);
          }

        }}
      />
    </div>
  </div>
  )
}

export default connect(mapStateToProps)(GlobalNumberical)