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
import "./placedebug.module.less"

  const mapStateToProps = (state) => {
    return{
      
    }
  };

  function Scope(props) {
    const [valueChange, setValueChange] = useState(true)

    const { Option } = Select;
    const cameraNumchildren = [];
    const conveyorNumchildren = [];
    let history = useHistory();
    for (let i = 1; i <10; i++) {
      cameraNumchildren.push(
        <Option key={i}>{i}</Option>
      );
      conveyorNumchildren.push(
        <Option key={i}>{i}</Option>
      )

    } 

    const cameracolumns = [
      {title: "原始点位",dataIndex: "site", },
      {title: "X", dataIndex: "Xvalue", },
      {title: "Y", dataIndex: "Yvalue", },
      {title: "Z", dataIndex: "Zvalue", },
      {title: "角度", dataIndex: "angle", },
    ];
    const cameradata = [
      { key: "1", site:<Button  type="primary" style={{ width:"50%",height:"100%",background:"#f36c21",border:"none" }}>原1</Button>,  Xvalue: '', Yvalue: '',Zvalue: '',angle: '',},
      { key: "2", site:<Button  type="primary" style={{ width:"50%",height:"100%",background:"#f36c21",border:"none" }}>原2</Button>,  Xvalue: '', Yvalue: '',Zvalue: '',angle: '',},
      { key: "3", site:<Button  type="primary" style={{ width:"50%",height:"100%",background:"#f36c21",border:"none" }}>原3</Button>,  Xvalue: '', Yvalue: '',Zvalue: '',angle: '',},
      { key: "4", site:<Button  type="primary" style={{ width:"50%",height:"100%",background:"#f36c21",border:"none" }}>原4</Button>,  Xvalue: '', Yvalue: '',Zvalue: '',angle: '',},
      { key: "5", site:<Button  type="primary" style={{ width:"50%",height:"100%",background:"#f36c21",border:"none" }}>原5</Button>,  Xvalue: '', Yvalue: '',Zvalue: '',angle: '',},
      { key: "6", site:<Button  type="primary" style={{ width:"50%",height:"100%",background:"#f36c21",border:"none" }}>原6</Button>,  Xvalue: '', Yvalue: '',Zvalue: '',angle: '',},
      { key: "7", site:<Button  type="primary" style={{ width:"50%",height:"100%",background:"#f36c21",border:"none" }}>原7</Button>,  Xvalue: '', Yvalue: '',Zvalue: '',angle: '',},
      { key: "8", site:<Button  type="primary" style={{ width:"50%",height:"100%",background:"#f36c21",border:"none" }}>原8</Button>,  Xvalue: '', Yvalue: '',Zvalue: '',angle: '',},
      { key: "9", site:<Button  type="primary" style={{ width:"50%",height:"100%",background:"#f36c21",border:"none" }}>原9</Button>,  Xvalue: '', Yvalue: '',Zvalue: '',angle: '',},
      { key: "10", site:<Button  type="primary"  style={{ width:"50%",height:"100%",background:"#f36c21",border:"none" }}>原10</Button>,  Xvalue: '', Yvalue: '',Zvalue: '',angle: '',},
    ];

    const conveyorcolumns = [
      {title: "偏移后点位",dataIndex: "site", },
      {title: "X", dataIndex: "Xvalue", },
      {title: "Y", dataIndex: "Yvalue", },
      {title: "Z", dataIndex: "Zvalue", },
      {title: "角度", dataIndex: "angle", },
    ];
    const conveyordata = [
      { key: "1", site:<Button type="primary" style={{ width:"50%",height:"100%",background:"#f36c21",border:"none" }}>偏1</Button>,  Xvalue: '', Yvalue: '',Zvalue: '',angle: '',},
      { key: "2", site:<Button type="primary" style={{ width:"50%",height:"100%",background:"#f36c21",border:"none" }}>偏2</Button>,  Xvalue: '', Yvalue: '',Zvalue: '',angle: '',},
      { key: "3", site:<Button type="primary" style={{ width:"50%",height:"100%",background:"#f36c21",border:"none" }}>偏3</Button>,  Xvalue: '', Yvalue: '',Zvalue: '',angle: '',},
      { key: "4", site:<Button type="primary" style={{ width:"50%",height:"100%",background:"#f36c21",border:"none" }}>偏4</Button>,  Xvalue: '', Yvalue: '',Zvalue: '',angle: '',},
      { key: "5", site:<Button type="primary" style={{ width:"50%",height:"100%",background:"#f36c21",border:"none" }}>偏5</Button>,  Xvalue: '', Yvalue: '',Zvalue: '',angle: '',},
      { key: "6", site:<Button type="primary" style={{ width:"50%",height:"100%",background:"#f36c21",border:"none" }}>偏6</Button>,  Xvalue: '', Yvalue: '',Zvalue: '',angle: '',},
      { key: "7", site:<Button type="primary" style={{ width:"50%",height:"100%",background:"#f36c21",border:"none" }}>偏7</Button>,  Xvalue: '', Yvalue: '',Zvalue: '',angle: '',},
      { key: "8", site:<Button type="primary" style={{ width:"50%",height:"100%",background:"#f36c21",border:"none" }}>偏8</Button>,  Xvalue: '', Yvalue: '',Zvalue: '',angle: '',},
      { key: "9", site:<Button type="primary" style={{ width:"50%",height:"100%",background:"#f36c21",border:"none" }}>偏9</Button>,  Xvalue: '', Yvalue: '',Zvalue: '',angle: '',},
      { key: "10", site:<Button  type="primary"  style={{ width:"50%",height:"100%",background:"#f36c21",border:"none" }}>偏10</Button>,  Xvalue: '', Yvalue: '',Zvalue: '',angle: '',},
    ];

    return(
      <div style={{ background:"#fff",marginTop:"-30px",zIndex:"2",position:"relative",width:"100%",height:"1000px",overflowY:"hidden"  }}>
        <div className="placedebug-content-t">
          <div>
          <span>工艺号</span>
          <Select
            defaultValue="1"
            style={{ width: 200 }}
            >
            {cameraNumchildren}
          </Select>
          </div>
          <div>
          <span>传送带工艺号</span>
          <Select
            defaultValue="1"
            style={{ width: 200 }}
            >
            {cameraNumchildren}
          </Select>
          </div>
        </div>
        <div className="placedebug-content-c">
          <div className="placedebug-content-cl">
            <Table
              size="small"
              pagination={false}
              columns={cameracolumns}
              dataSource={cameradata }
            />
          </div>
          <div className="placedebug-content-cr">
            <Table
              size="small"
              pagination={false}
              columns={conveyorcolumns}
              dataSource={conveyordata }
            />
          </div>
        </div>
        <div className="placedebug-content-b">
          <Button type="primary" style={{ width:"100px",height:"40px", }} onClick={()=>{ history.push("/vision") }}>返回</Button>
          <Button type="primary" style={{ width:"100px",height:"40px",background:"#f36c21",border:"none" }}>拍照</Button>
          <Button type="primary" style={{ width:"100px",height:"40px",background:"#f36c21",border:"none" }}>计算偏移</Button>
          <Button type="primary" style={{ width:"100px",height:"40px",background:"#f36c21",border:"none" }}>移动至此</Button>
          <Button type="primary" danger style={{ width:"100px",height:"40px" }}>清除</Button>
        </div>
      </div>
    )
  }

  export default connect(mapStateToProps)(Scope)