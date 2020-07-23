import React, { useEffect, useState } from "react";
import { Tabs } from "antd"
import { connect } from "dva";
import  styles  from "./index.module.css"

const mapStateToProps = (state) => {
    return {

    }
}

function GlobalLocation(props){
  const [ Pragrameter, setPragrameter ] = useState('')
  const [ ShowBack, setShowBack ] = useState(0)
  const { TabPane } = Tabs;
  const callback = (key) => {
      console.log(key)
  }
  useEffect(()=>{
    let gnum = [];
    let deStyle = { height:'7%',display:'flex', justifyContent:'center',alignItems:'center',width:'100%' };
    let gdStyle = { height:'7%',display:'flex', justifyContent:'center',alignItems:'center',width:'100%',borderRadius:'5px', background:'#1890ff'}
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
  console.log(styles.tabpanels)
  return(
    <div>
      <Tabs defaultActiveKey="1" onChange={callback} style={{ height:'50%' }} >
        <TabPane tab="机器人" key="1" >
          <div className={styles.aaaaaaaaa}>
            <div  style={{ width:'100px', height:'500px', overflowX:'hidden', background:'white' }}>
              {Pragrameter}
            </div>
            <div>
              注释
            </div>
          </div>
        </TabPane>
      </Tabs>
    </div>
  )
}

export default connect(mapStateToProps)(GlobalLocation)