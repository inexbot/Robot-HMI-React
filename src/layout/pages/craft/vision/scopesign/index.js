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
import "./scopesign.module.less"

  const mapStateToProps = (state) => {
    return{
      
    }
  };

  function Scopesign(props) {
    const [valueChange, setValueChange] = useState(true)

    let history = useHistory()
    const columns = [
      {title: "坐标轴",dataIndex: "name", },
      {title: "最大值", dataIndex: "maxvalue", },
      {title: "最小值", dataIndex: "minvalue", },
      {title: "标定值", dataIndex: "signvalue", },
    ];
    const data = [
      { key: "1", name:"X",  maxvalue: <Input disabled  />, minvalue:<Input disabled  />,signvalue:<Input disabled  />},
      { key: "2", name: "Y",  maxvalue: <Input disabled  />, minvalue:<Input disabled  />,signvalue:<Input disabled  />},
      { key: "3", name: "Z",  maxvalue: <Input disabled  />, minvalue:<Input disabled  />,signvalue:<Input disabled  />}
    ];


    return(
      <div style={{ background:"#fff",marginTop:"-30px",zIndex:"2",position:"relative",width:"100%",height:"1000px",overflowY:"hidden"  }}>
            <div className="scopesign-center">
              <Table
                pagination={false}
                columns={columns}
                dataSource={data }
              />
            </div>
            <div className="scopesign-demarcaed">
              <Button type="primary" style={{  background:"#f36c21",border:"none" }}>标定MX</Button>
              <Button type="primary" style={{  background:"#f36c21",border:"none" }}>标定MY</Button>
              <Button type="primary" style={{  background:"#f36c21",border:"none" }}>标定MZ</Button>
              <Button type="primary" style={{  background:"#f36c21",border:"none" }}>标定mX</Button>
              <Button type="primary" style={{  background:"#f36c21",border:"none" }}>标定mY</Button>
              <Button type="primary" style={{  background:"#f36c21",border:"none" }}>标定mZ</Button>
              <Button type="primary" style={{  background:"#45b97c",border:"none" }}>标定完成</Button>
            </div>

            <div style={{ marginLeft:"70%" }}>
              <Button type="primary" size="large" style={{  background:"#009ad6" }} onClick={()=>{
                history.push("/vision")
              }}>返回</Button>
            </div>
      </div>
    )
  }

  export default connect(mapStateToProps)(Scopesign)