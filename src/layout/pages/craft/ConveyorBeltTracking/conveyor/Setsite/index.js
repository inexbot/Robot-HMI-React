import React, { useState, useEffect } from "react";
import { Table, Button, notification, ConfigProvider, Select, Divider,Input } from "antd";
import { connect } from "dva";


const mapStateToProps = (state) => {
    return {
      
    };
  };

  function Setsite(props){
    const [showSave, setShowSave ] = useState(false)

    const columns = [
      {title: "参数",dataIndex: "name", },
      {title: "值", dataIndex: "money", },
      {title: "单位", dataIndex: "address",},
      {title: "移动", dataIndex:"move"}
    ];
    const data = [
      { key: "1", name: "跟踪开始X点",  money: <Input  />, address:<Button>标记</Button>,move:<Button>至此</Button> },
      { key: "1", name: "跟踪范围X最大",  money: <Input  />, address:<Button>标记</Button>,move:<Button>至此</Button> },
      { key: "1", name: "跟踪范围Y最小",  money: <Input  />, address:<Button>标记</Button>,move:<Button>至此</Button> },
      { key: "1", name: "跟踪范围Y最大",  money: <Input  />, address:<Button>标记</Button>,move:<Button>至此</Button> },
      { key: "1", name: "跟踪范围Z最小",  money: <Input  />, address:<Button>标记</Button>,move:<Button>至此</Button> },
      { key: "1", name: "跟踪范围Z最大",  money: <Input  />, address:<Button>标记</Button>,move:<Button>至此</Button> },
      { key: "1", name: "最迟接收位置",  money: <Input  />, address:<Button>标记</Button>,move:<Button>至此</Button> },
    ];
    return(
      <div className="backconnect" style = {{ height:document.body.clientHeight  * 0.68,marginLeft:"0" }}>
        <div style = {{ width:"50%" }}>
          <Table
            pagination={false}
            size = {"small"}
            columns={columns}
            dataSource={data }
          />
        </div>
        <div style={{ position:"absolute",left:"50%",top:"20%" }}>
          <img src="../images/aaaaaa.png" style={{ width:"400px" }} />
        </div>
        {showSave ? <div> <Button style = {{ width:"100px",height:"50px", }} >保存</Button>
        <Button style = {{ width:"100px",height:"50px"}} onClick={()=>{
          setShowSave(false)
        }}>取消</Button></div> : <Button  style = {{ width:"100px",height:"50px", }} onClick = {()=>{
          setShowSave(true)
        }} >修改</Button> }
      </div>
    )
  }

  export default connect(mapStateToProps)(Setsite)