import React, { useState, useEffect } from "react";
import { Table, Button, notification, ConfigProvider, Select, Divider,Input, Modal} from "antd";
import { connect } from "dva";


const mapStateToProps = (state) => {
    return {
      
    };
  };

  function Setsite(props){
    const [showSave, setShowSave ] = useState(false)
    const [showemptyModal, setShowemptyModal] = useState(false);
    const [showcopyModal, setshowcopyModal] = useState(false);
  
    const { Option } = Select;
    const conveyorNumchildren = [];
    for (let i = 1; i <10; i++) {
      conveyorNumchildren.push(
        <Option key={i}>{  i}</Option>
      );
    } 
    
  
    const handleChange =(value) => {
      console.log(`Selected: ${value}`);
    }
  
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
            columns={columns}
            dataSource={data }
          />
        </div>
        <div style={{ position:"absolute",left:"50%",top:"20%" }}>
          <img src="../images/setsite.png" style={{ width:"400px" }} />
        </div>
        <Modal
          title="提示"
          style={{ top: 100 }}
          visible={showemptyModal}
          onOk={() => setShowemptyModal(false)}
          onCancel={() => setShowemptyModal(false)}
        >
          <p style={{ fontSize: "30px" }}>确定要清空 工艺号1的参数吗？</p>
          <p style={{ color: "red", fontSize: "30px" }}>
            谨慎操作，一旦清空，无法恢复!
          </p>
        </Modal>
        <Modal
          title="提示"
          style={{ top: 100 }}
          visible={showcopyModal}
          onOk={() => setshowcopyModal(false)}
          onCancel={() => setshowcopyModal(false)}
        >
          <p style={{ fontSize: "30px" }}>确定要将当前工艺参数复制到</p>
          <p style={{ fontSize: "30px" }}>
            {" "}
            <div>
              工艺号:
              <Select
                defaultValue="1"
                onChange={handleChange}
                style={{ width: 200 }}
              >
                {conveyorNumchildren}
              </Select>
            </div>
          </p>
        </Modal>
        {showSave ? <div style={{ display:"inline" }}> <Button style = {{ width:"100px",height:"50px", }} >保存</Button>
        <Button style = {{ width:"100px",height:"50px"}} onClick={()=>{
          setShowSave(false)
        }}>取消</Button></div> : <Button  style = {{ width:"100px",height:"50px", }} onClick = {()=>{
          setShowSave(true)
        }} >修改</Button> }
        <Button
        style={{ width: "100px", height: "50px", marginLeft: `${showSave?"28" :"34"}%`  }}
        onClick={() => {
          setShowemptyModal(true);
        }}
        >
          清空参数
        </Button>
        <Button style={{ width: "100px", height: "50px" }} onClick={() => {
          setshowcopyModal(true)
        }}>
          复制参数
        </Button>
  
      </div>
    )
  }

  export default connect(mapStateToProps)(Setsite)