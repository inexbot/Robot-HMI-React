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
import { sendMSGtoController} from "service/network";

  const mapStateToProps = (state) => {
    return{
      ScopeList:state.index.vision.ScopeList,
      ScopePos:state.index.robotStatus.pos
    }
  };

  function Scopesign(props) {
    const [valueChange, setValueChange] = useState(true)

    const [VisionMaxX,setVisionMaxX] = useState(props.ScopeList.maxX)
    const [VisionMaxY,setVisionMaxY] = useState(props.ScopeList.maxY)
    const [VisionMaxZ,setVisionMaxZ] = useState(props.ScopeList.maxZ)
    const [VisionMinX,setVisionMinX] = useState(props.ScopeList.minX)
    const [VisionMinY,setVisionMinY] = useState(props.ScopeList.minY)
    const [VisionMinZ,setVisionMinZ] = useState(props.ScopeList.minZ)

    const [VisionXsign,setVisionXsign] = useState('')
    const [VisionYsign,setVisionYsign] = useState('')
    const [VisionZsign,setVisionZsign] = useState('')

    console.log(props.history.location.query.a)
    let history = useHistory()  
    const columns = [
      {title: "坐标轴",dataIndex: "name", },
      {title: "最大值", dataIndex: "maxvalue", },
      {title: "最小值", dataIndex: "minvalue", },
      {title: "标定值", dataIndex: "signvalue", },
    ];
    const data = [
      { key: "1", name:"X",  maxvalue: <Input disabled value={VisionMaxX} />, minvalue:<Input disabled value={VisionMinX} />,signvalue:<Input disabled value={VisionXsign} />},
      { key: "2", name: "Y",  maxvalue: <Input disabled value={ VisionMaxY} />, minvalue:<Input disabled value={VisionMinY} />,signvalue:<Input disabled value={VisionYsign} />},
      { key: "3", name: "Z",  maxvalue: <Input disabled value={ VisionMaxZ} />, minvalue:<Input disabled value={VisionMinZ} />,signvalue:<Input disabled  value={VisionZsign}/>}
    ];

    // 修改视觉范围参数

    useEffect(()=>{
      let gainSet =  setInterval(() => {
        let dataList = {
          robot:1,
          coord:-1,
        }
        sendMSGtoController("CURRENTPOS_INQUIRE",dataList)
      },500);
      return () =>{
        clearInterval(gainSet)
      }
    },[])

    useEffect(()=>{

    },[])

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
              <Button type="primary" style={{  background:"#f36c21",border:"none" }} onClick={()=>{setVisionXsign("MX:"+props.ScopePos[0])
              setVisionMaxX(props.ScopePos[0])}}>标定MX</Button>
              <Button type="primary" style={{  background:"#f36c21",border:"none" }} onClick={()=>{setVisionYsign("MY:"+props.ScopePos[1])
              setVisionMaxY(props.ScopePos[1])}} >标定MY</Button>
              <Button type="primary" style={{  background:"#f36c21",border:"none" }} onClick={()=>{setVisionZsign("MZ:"+props.ScopePos[2])
              setVisionMaxZ(props.ScopePos[2])}} >标定MZ</Button>
              <Button type="primary" style={{  background:"#f36c21",border:"none" }} onClick={()=>{setVisionXsign("mX:"+props.ScopePos[3])
              setVisionMinX(props.ScopePos[3])} }>标定mX</Button>
              <Button type="primary" style={{  background:"#f36c21",border:"none" }} onClick={()=>{setVisionYsign("mY:"+props.ScopePos[4])
              setVisionMinY(props.ScopePos[4])}} >标定mY</Button>
              <Button type="primary" style={{  background:"#f36c21",border:"none" }} onClick={()=>{setVisionZsign("mZ:"+props.ScopePos[5])
              setVisionMinZ(props.ScopePos[5])} }>标定mZ</Button>
              <Button type="primary" style={{  background:"#45b97c",border:"none" }} onClick={()=>{
                let dataList = {
                  robot:1,
                  visionNum:props.history.location.query.a,
                  visionRange:{
                    maxX:String(VisionMaxX),
                    maxY:String(VisionMaxY),
                    maxZ:String(VisionMaxZ),
                    minX:String(VisionMinX),
                    minY:String(VisionMinY),
                    minZ:String(VisionMinZ),
                  }
                }
                sendMSGtoController("VISION_RANGE_SET",dataList)
              }} >标定完成</Button>
            </div>

            <div style={{ marginLeft:"70%" }}>
              <Button type="primary" size="large" style={{  background:"#009ad6" }} onClick={()=>{
                history.push("/vision/scope")
              }}>返回</Button>
            </div>
      </div>
    )
  }

  export default connect(mapStateToProps)(Scopesign)