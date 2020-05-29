import React, { useState, useEffect } from "react";
import { Table, Button, notification, ConfigProvider, Select, Divider ,Input} from "antd";
import { connect } from "dva";


const mapStateToProps = (state) => {
    return {
    };
  };

  function Sensorsign(props){
    const [showSave, setShowSave ] = useState(false)

    const columns = [
      {title: "参数",dataIndex: "name", },
      {title: "值", dataIndex: "money", },
      {title: "单位", dataIndex: "address",}
    ];
    const data = [
      { key: "1", name: "传感器在传送带坐标系X轴的位置",  money: <Input  />, address: "mm", },
      { key: "2", name: "传感器在传送带坐标系Y轴的位置", money:<Input  />, address: "mm", },
    ];
    return(
      <div className="backconnect" style = {{ height:document.body.clientHeight  * 0.68 }}>
        <div className="connect">
          <Table
            pagination={false}
            size = {"small"}
            columns={columns}
            dataSource={data }
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

  export default connect(mapStateToProps)(Sensorsign)