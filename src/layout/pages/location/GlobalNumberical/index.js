import React, { useEffect } from "react";
import { Tabs } from "antd"
import { connect } from "dva";

const mapStateToProps = (state) => {
    return {

    }
}

function GlobalNumberical(props){
//   const [ IntColumns, setIntColumns ] = ('');
//   const [ IntDatas, setIntDatas ] = ('');
  const { TabPane } = Tabs;
  // 整数型表格的渲染
  useEffect(()=>{
    // let columns = [];
    // let datas = [];
    
  },[])
  // 实数型表格的渲染
  useEffect(()=>{
  
  },[])
  // 布尔型表格的渲染
  useEffect(()=>{
    
  },[])
  const callback = (key) => {
    console.log(key);
  }
  return(
    <div>
    <Tabs defaultActiveKey="1" onChange={callback}>
      <TabPane tab="整数型" key="1">
        这里是整数型
      </TabPane>
      <TabPane tab="实数型" key="2">
        这里是整数型
      </TabPane>
      <TabPane tab="布尔型" key="3">
        这里是整数型
      </TabPane>
    </Tabs>
    </div>
  )
}

export default connect(mapStateToProps)(GlobalNumberical)