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
import { sendMSGtoController} from "service/network";

  const mapStateToProps = (state) => {
    return{
      PlacedebugList: state.index.vision.PlacedebugList
    }
  };

  function Scope(props) {
    console.log(props.PlacedebugList)
    const [valueChange, setValueChange] = useState(true)
    const [VisionOriginPos, setVisionOriginPos] = useState(props.PlacedebugList.originPos)
    const [VisionCurrentPos, setVisionCurrentPos] = useState(props.PlacedebugList.currentPos)
    const [PlacedebugNum, setPlacedebugNum] = useState(1)
    const [PlacedebugConveyorNum,setPlacedebugConveyorNum] = useState(1)
    const { Option } = Select;
    const cameraNumchildren = [];
    const conveyorNumchildren = [];
    let history = useHistory();
    for (let i = 0; i <9; i++) {
      cameraNumchildren.push(
        <Option key={i}>{i}</Option>
      );
      conveyorNumchildren.push(
        <Option key={i}>{i}</Option>
      )
    } 

    useEffect(()=>{
      let dataList = {
        robot:1,
        visionNum:Number(PlacedebugNum),
        conveyorNum:Number(PlacedebugConveyorNum),
      }
      // sendMSGtoController("VISION_DEBUGGING_POS_INQUIRE",dataList)
    },[PlacedebugNum,PlacedebugConveyorNum])
    
    useEffect(()=>{
      setVisionOriginPos(props.PlacedebugList.originPos)
      setVisionCurrentPos(props.PlacedebugList.currentPos)
    },[props.PlacedebugList])

    const cameracolumns = [
      {title: "原始点位",dataIndex: "site", },
      {title: "X", dataIndex: "Xvalue", },
      {title: "Y", dataIndex: "Yvalue", },
      {title: "Z", dataIndex: "Zvalue", },
      {title: "角度", dataIndex: "angle", },
    ];

    const cameradata = [
      { key: "1", site:<Button  type="primary" style={{ width:"50%",height:"100%",background:"#f36c21",border:"none" }}>原1</Button>,  Xvalue: VisionOriginPos[0].X, Yvalue:  VisionOriginPos[0].Y,Zvalue: VisionOriginPos[0].Z,angle: VisionOriginPos[0].angle,},
      { key: "2", site:<Button  type="primary" style={{ width:"50%",height:"100%",background:"#f36c21",border:"none" }}>原2</Button>,  Xvalue: VisionOriginPos[1].X, Yvalue:  VisionOriginPos[1].Y,Zvalue: VisionOriginPos[1].Z,angle: VisionOriginPos[1].angle,},
      { key: "3", site:<Button  type="primary" style={{ width:"50%",height:"100%",background:"#f36c21",border:"none" }}>原3</Button>,  Xvalue: VisionOriginPos[2].X, Yvalue:  VisionOriginPos[2].Y,Zvalue: VisionOriginPos[2].Z,angle: VisionOriginPos[2].angle,},
      { key: "4", site:<Button  type="primary" style={{ width:"50%",height:"100%",background:"#f36c21",border:"none" }}>原4</Button>,  Xvalue: VisionOriginPos[3].X, Yvalue:  VisionOriginPos[3].Y,Zvalue: VisionOriginPos[3].Z,angle: VisionOriginPos[3].angle,},
      { key: "5", site:<Button  type="primary" style={{ width:"50%",height:"100%",background:"#f36c21",border:"none" }}>原5</Button>,  Xvalue: VisionOriginPos[4].X, Yvalue:  VisionOriginPos[4].Y,Zvalue: VisionOriginPos[4].Z,angle: VisionOriginPos[4].angle,},
      { key: "6", site:<Button  type="primary" style={{ width:"50%",height:"100%",background:"#f36c21",border:"none" }}>原6</Button>,  Xvalue: VisionOriginPos[5].X, Yvalue:  VisionOriginPos[5].Y,Zvalue: VisionOriginPos[5].Z,angle: VisionOriginPos[5].angle,},
      { key: "7", site:<Button  type="primary" style={{ width:"50%",height:"100%",background:"#f36c21",border:"none" }}>原7</Button>,  Xvalue: VisionOriginPos[6].X, Yvalue:  VisionOriginPos[6].Y,Zvalue: VisionOriginPos[6].Z,angle: VisionOriginPos[6].angle,},
      { key: "8", site:<Button  type="primary" style={{ width:"50%",height:"100%",background:"#f36c21",border:"none" }}>原8</Button>,  Xvalue: VisionOriginPos[7].X, Yvalue:  VisionOriginPos[7].Y,Zvalue: VisionOriginPos[7].Z,angle: VisionOriginPos[7].angle,},
      { key: "9", site:<Button  type="primary" style={{ width:"50%",height:"100%",background:"#f36c21",border:"none" }}>原9</Button>,  Xvalue: VisionOriginPos[8].X, Yvalue:  VisionOriginPos[8].Y,Zvalue: VisionOriginPos[8].Z,angle: VisionOriginPos[8].angle,},
      { key: "10", site:<Button  type="primary"  style={{ width:"50%",height:"100%",background:"#f36c21",border:"none" }}>原10</Button>,  Xvalue: VisionOriginPos[9].X, Yvalue:  VisionOriginPos[9].Y,Zvalue: VisionOriginPos[0].Z,angle: VisionOriginPos[9].angle,},
    ];

    const conveyorcolumns = [
      {title: "偏移后点位",dataIndex: "site", },
      {title: "X", dataIndex: "Xvalue", },
      {title: "Y", dataIndex: "Yvalue", },
      {title: "Z", dataIndex: "Zvalue", },
      {title: "角度", dataIndex: "angle", },
    ];
    const conveyordata = [
      { key: "1", site:<Button type="primary" style={{ width:"50%",height:"100%",background:"#f36c21",border:"none" }}>偏1</Button>, Xvalue: VisionCurrentPos[0].X, Yvalue:  VisionCurrentPos[0].Y,Zvalue: VisionCurrentPos[0].Z,angle: VisionCurrentPos[0].angle,},
      { key: "2", site:<Button type="primary" style={{ width:"50%",height:"100%",background:"#f36c21",border:"none" }}>偏2</Button>, Xvalue: VisionCurrentPos[1].X, Yvalue:  VisionCurrentPos[1].Y,Zvalue: VisionCurrentPos[1].Z,angle: VisionCurrentPos[1].angle,},
      { key: "3", site:<Button type="primary" style={{ width:"50%",height:"100%",background:"#f36c21",border:"none" }}>偏3</Button>, Xvalue: VisionCurrentPos[2].X, Yvalue:  VisionCurrentPos[2].Y,Zvalue: VisionCurrentPos[2].Z,angle: VisionCurrentPos[2].angle,},
      { key: "4", site:<Button type="primary" style={{ width:"50%",height:"100%",background:"#f36c21",border:"none" }}>偏4</Button>, Xvalue: VisionCurrentPos[3].X, Yvalue:  VisionCurrentPos[3].Y,Zvalue: VisionCurrentPos[3].Z,angle: VisionCurrentPos[3].angle,},
      { key: "5", site:<Button type="primary" style={{ width:"50%",height:"100%",background:"#f36c21",border:"none" }}>偏5</Button>, Xvalue: VisionCurrentPos[4].X, Yvalue:  VisionCurrentPos[4].Y,Zvalue: VisionCurrentPos[4].Z,angle: VisionCurrentPos[4].angle,},
      { key: "6", site:<Button type="primary" style={{ width:"50%",height:"100%",background:"#f36c21",border:"none" }}>偏6</Button>, Xvalue: VisionCurrentPos[5].X, Yvalue:  VisionCurrentPos[5].Y,Zvalue: VisionCurrentPos[5].Z,angle: VisionCurrentPos[5].angle,},
      { key: "7", site:<Button type="primary" style={{ width:"50%",height:"100%",background:"#f36c21",border:"none" }}>偏7</Button>, Xvalue: VisionCurrentPos[6].X, Yvalue:  VisionCurrentPos[6].Y,Zvalue: VisionCurrentPos[6].Z,angle: VisionCurrentPos[6].angle,},
      { key: "8", site:<Button type="primary" style={{ width:"50%",height:"100%",background:"#f36c21",border:"none" }}>偏8</Button>, Xvalue: VisionCurrentPos[7].X, Yvalue:  VisionCurrentPos[7].Y,Zvalue: VisionCurrentPos[7].Z,angle: VisionCurrentPos[7].angle,},
      { key: "9", site:<Button type="primary" style={{ width:"50%",height:"100%",background:"#f36c21",border:"none" }}>偏9</Button>, Xvalue: VisionCurrentPos[8].X, Yvalue:  VisionCurrentPos[8].Y,Zvalue: VisionCurrentPos[8].Z,angle: VisionCurrentPos[8].angle,},
      { key: "10", site:<Button  type="primary"  style={{ width:"50%",height:"100%",background:"#f36c21",border:"none" }}>偏10</Button>, Xvalue: VisionCurrentPos[9].X, Yvalue:  VisionCurrentPos[9].Y,Zvalue: VisionCurrentPos[9].Z,angle: VisionCurrentPos[9].angle,},
    ];

    return(
      <div style={{ background:"#fff",marginTop:"-30px",zIndex:"2",position:"relative",width:"100%",height:"1000px",overflowY:"hidden"  }}>
        <div className="placedebug-content-t">
          <div>
          <span>工艺号</span>
          <Select
            defaultValue={PlacedebugNum}
            style={{ width: 200 }}
            onChange={(value)=>{ setPlacedebugNum(Number(value)) }}
            >
            {cameraNumchildren}
          </Select>
          </div>
          <div>
          <span>传送带工艺号</span>
          <Select
            defaultValue={PlacedebugConveyorNum}
            style={{ width: 200 }}
            onChange={(value)=>{ setPlacedebugConveyorNum(Number(value)) }}
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
          <Button type="primary" danger style={{ width:"100px",height:"40px" }} onClick={()=>{
            let dataList = {
              robot:1,
              visionNum:Number(PlacedebugNum)
            }
            sendMSGtoController("ISION_DEBUGGING_POS_CLEAR",dataList)
          }} >清除</Button>
        </div>
      </div>
    )
  }

  export default connect(mapStateToProps)(Scope)