import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  notification,
  ConfigProvider,
  Select,
  Divider,
  Input,
  Modal
} from "antd";
import { connect } from "dva";
import { useHistory } from 'react-router-dom';

  const mapStateToProps = (state) => {
    return{
      
    }
  };

  function Place(props) {
    const [valueChange, setValueChange] = useState(true)

    const { Option } = Select;
    const cameraNumchildren = [];
    let history = useHistory();
    for (let i = 1; i <10; i++) {
      cameraNumchildren.push(
        <Option key={i}>{  i}</Option>
      );
    } 
    
    const columns = [
      {title: "参数",dataIndex: "name", },
      {title: "值", dataIndex: "money", },
      {title: "注释", dataIndex: "address", },
    ];
    const data = [
      { key: "1", name:"MX",  money: <Input disabled={valueChange} value={1} />, address:"X轴最大值（mm）（不填写则表示无限制）"},
      { key: "2", name: "mX", money:<Input disabled={valueChange} value={1} />, address:"X轴最小值（mm）（不填写则表示无限制）"},
      { key: "3", name: "MY", money: <Input disabled={valueChange} value={1} />, address:"Y轴最大值（mm）（不填写则表示无限制）"},
      { key: "4", name: "mY", money: <Input disabled={valueChange} value={1} />, address:"Y轴最小值（mm）（不填写则表示无限制）"},
      { key: "5", name: "MZ", money: <Input disabled={valueChange} value={1} />, address:"Z轴最大值（mm）（不填写则表示无限制）"},
      { key: "6", name: "mZ", money: <Input disabled={valueChange} value={1} />, address:"Z轴最小值（mm）（不填写则表示无限制）"}
    ];


    return(
      <div style={{ background:"#fff",marginTop:"-30px",zIndex:"2",position:"relative",width:"100%",height:"1000px",overflowY:"hidden"  }}>
          <div style={{ marginLeft:"20%" }}>
              <span> 工艺号: </span>
              <Select
                  defaultValue="1"
                  style={{ width: 200 }}
                >
                  {cameraNumchildren}
              </Select>
            </div>
            <div className="center">
              <Table
                pagination={false}
                columns={columns}
                dataSource={data }
              />
            </div>
            {valueChange? 
              <div style={{ marginLeft:"20%" }}>
                <Button  onClick={()=>{ setValueChange(false) }}>修改</Button>
                <Button style={{ marginLeft:"1%" }} onClick={()=>{ setValueChange(false) }}>清除</Button>
              </div>:
              <div style={{ marginLeft:"20%" }}>
                <Button  onClick={()=>{ setValueChange(true) }}>保存</Button>
                <Button style={{ marginLeft:"1%" }} onClick={()=>{ setValueChange(true) }}>取消</Button>
              </div>
            }
            <div style={{ marginLeft:"70%" }}>
              <Button type="primary" style={{  background:"#009ad6" }} onClick={()=>{
                history.push("/vision")
              }}>返回</Button>
              <Button type="primary" style={{ background:"#009ad6",marginLeft:"1px" }} onClick={()=>{
                history.push("/vision")
              }}>范围标定</Button>
            </div>
      </div>
    )
  }

  export default connect(mapStateToProps)(Place)