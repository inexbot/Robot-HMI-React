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
import "./place.module.less"

  const mapStateToProps = (state) => {
    return{
      
    }
  };

  function Place(props) {
    const [showSave, setShowSave] = useState(false)
    const [allIpt, setAllIpt] = useState(true)

    const { Option } = Select;
    const cameraNumchildren = [];
    let history = useHistory();
    for (let i = 1; i <10; i++) {
      cameraNumchildren.push(
        <Option key={i}>{  i}</Option>
      );
    } 

    const standardcolumns = [
      {title: "基准点",dataIndex: "name", },
      {title: "值", dataIndex: "value", },
    ];
    const standarddata = [
      { key: "1", name:"X值",  value: <Input disabled style={{ width:"100px" }} />},
      { key: "1", name:"Y值",  value: <Input disabled style={{ width:"100px" }} />},
      { key: "1", name:"Z值",  value: <Input disabled style={{ width:"100px" }} />},
      { key: "1", name:"A值",  value: <Input disabled style={{ width:"100px" }} />},
      { key: "1", name:"B值",  value: <Input disabled style={{ width:"100px" }} />},
      { key: "1", name:"C值",  value: <Input disabled style={{ width:"100px" }} />},
    ];

    const cameracolums = [
      {title: "相机坐标",dataIndex: "name", },
      {title: "值", dataIndex: "value", },
    ]

    const cameradata = [
      { key: "1", name:"X",  value: <Input disabled style={{ width:"100px" }} />},
      { key: "1", name:"Y",  value: <Input disabled style={{ width:"100px" }} />},
      { key: "1", name:"高度",  value: <Input disabled={allIpt}  style={{ width:"100px" }} />},
      { key: "1", name:"角度",  value: <Input disabled style={{ width:"100px" }} />},
    ]

    return(
      <div style={{ background:"#fff",marginTop:"-30px",zIndex:"2",position:"relative",width:"100%",height:"1000px",overflowY:"hidden" }}>
        <div className="place-content-l">
          <div style={{ marginLeft:"20%",marginTop:"5%" }}>
                <span> 工艺号: </span>
                <Select
                    defaultValue="1"
                    style={{ width: "100px" }}
                  >
                    {cameraNumchildren}
                </Select>
          </div>
          <div className="place-content-lc">
            <p>偏移补偿 </p>
            <div>X轴偏移 <Input disabled={allIpt} style={{ width:"50%",marginLeft:"8px" }} />mn</div>
            <div>Y轴偏移 <Input disabled={allIpt} style={{ width:"50%",marginLeft:"8px" }} />mn</div>
            <div>Z轴偏移 <Input disabled={allIpt} style={{ width:"50%",marginLeft:"8px"}} />mn</div>
            <div>角度偏移 <Input disabled={allIpt} style={{ width:"50%" }} /></div>
            <div>比例系数 <Input disabled={allIpt}  style={{ width:"50%" }}/></div>
            <div>角度方向 <Input disabled={allIpt}  style={{ width:"50%" }}/></div>
          </div>
          <div className="place-content-lb">
            <p>示例格式</p>
            <p>接受数据</p>
          </div>
        </div>  
        <div className="place-content-c">
          <div className="place-content-ct">
            <p>机器人抓取时的姿态</p>
            <p>(坐标系都是直角坐标系)</p>
          </div>
          <div className="place-content-cc">
            <Table
              pagination={false}
              columns={standardcolumns}
              dataSource={standarddata }
            />
          </div>
          <div className="place-content-cb">
            <Button type="primary" disabled={allIpt} style={{ background:"#f36c21",border:"none" }}>标定抓取姿态</Button>
            <Button type="primary" disabled={allIpt} style={{ background:"#f36c21",border:"none" }}>运行到基准点</Button>
          </div>
        </div>
        <div className="place-content-r">
          <div className="place-content-rt">
            高度可手写
          </div>
          <div className="place-content-rc">
          <Table
              pagination={false}
              columns={cameracolums}
              dataSource={cameradata }
            />
          </div>
          <div className="place-content-rb">
            <Button type="primary" disabled={allIpt} style={{ background:"#f36c21",border:"none" }}>试拍照</Button>
            <Button type="primary" disabled={allIpt} style={{ background:"#f36c21",border:"none" }}>运行到该点</Button>
          </div>
          <div className="place-moreBtn">
            <Button size="large" type="primary" style={{ background:"#009ad6" }} onClick={ ()=>{
              history.push('/vision')
            } }>返回</Button>
            {showSave?
             <Button size="large" type="primary" style={{ background:"#45b97c",marginLeft:"2px",border:"none"  }} onClick={ ()=>{
              setShowSave(false)
              setAllIpt(true)
            } }>保存</Button> :
             <Button size="large" type="primary" style={{ background:"#f36c21",marginLeft:"2px",border:"none" }} onClick={ ()=>{ 
              setShowSave(true)
              setAllIpt(false)
            } }>修改</Button>}
               
          </div>
        </div>
      </div>
    )
  }

  export default connect(mapStateToProps)(Place)