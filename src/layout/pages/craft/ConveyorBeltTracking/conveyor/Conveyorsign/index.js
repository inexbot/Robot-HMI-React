import React, { useState, useEffect } from "react";
import { Table, Button, notification, ConfigProvider, Select, Divider, Input } from "antd";
import { connect } from "dva";


const mapStateToProps = (state) => {
    return {
    };
  };


  function Conveyorsign(props){
    const [showSave, setShowSave ] = useState(false)

    const columns = [
      {title: "参数",dataIndex: "name", },
      {title: "值", dataIndex: "money", },
    ];
    const data = [
      { key: "1", name:"x",  money: <Input  />, },
      { key: "2", name: "y", money:<Input  />, },
      { key: "3", name: "z", money: <Input  />,},
      { key: "4", name: "A", money: <Input  />, },
      { key: "5", name: "B", money: <Input  />,},
      { key: "6", name: "C", money: <Input  />,},
    ];
    return(
      <div className="backconnect" style = {{ height:document.body.clientHeight  * 0.68 }}>
        <div className="connect">
          <Table
            pagination={false}
            size = {"small"}
            columns={columns}
            dataSource={data }
            title={() => `传送带坐标系  用户坐标系4` }
          />
        </div>
        {showSave ? <div> <Button style = {{ width:"100px",height:"50px",marginLeft:"25%" }} >保存</Button>
        <Button style = {{ width:"100px",height:"50px"}} onClick={()=>{
          setShowSave(false)
        }}>取消</Button></div> : <Button  style = {{ width:"100px",height:"50px",marginLeft:"25%" }} onClick = {()=>{
          setShowSave(true)
        }} >修改</Button> }
      </div>
    )
  }

  export default connect(mapStateToProps)(Conveyorsign)