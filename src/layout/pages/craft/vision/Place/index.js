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
import { sendMSGtoController} from "service/network";

  const mapStateToProps = (state) => {
    return{
      PlaceList: state.index.vision.PlaceList
    }
  };

  function Place(props) {
    const [showSave, setShowSave] = useState(false)
    const [allIpt, setAllIpt] = useState(true)
    const [PlaceNum, setPlaceNum] = useState(1)

    const [VisionDatumPoint, setVisionDatumPoint] = useState(props.PlaceList.position.datumPoint)
    const [VisionCameraPoint, setVisionCameraPoint] = useState(props.PlaceList.position.cameraPoint)
    const [VisionXexcursion, setVisionXexcursion] = useState(props.PlaceList.position.excursion.Xexcursion)
    const [VisionYexcursion, setVisionYexcursion] = useState(props.PlaceList.position.excursion.Yexcursion)
    const [VisionZexcursion, setVisionZexcursion] = useState(props.PlaceList.position.excursion.Zexcursion)
    const [VisionAngle, setVisionAngle] = useState(props.PlaceList.position.excursion.angle)
    const [VisionScale, setVisionScale] = useState(props.PlaceList.position.scale)
    const [VisionAngleDirection, setVisionAngleDirection] = useState(props.PlaceList.position.angleDirection)
    const [VisionCameraPoint2,setVisionCameraPoint2 ] = useState(props.PlaceList.position.cameraPoint[2])
    const [VisionSampleData, setVisionSampleData] = useState(props.PlaceList.position.sampleData)

    useEffect(()=>{
      let dataList = {
        robot:1,
        visionNum:PlaceNum
      }
      sendMSGtoController("VISION_POS_PARAMETER_INQUIRE",dataList)
    },[PlaceNum])

    useEffect(()=>{
      setVisionDatumPoint(props.PlaceList.position.datumPoint)
      setVisionCameraPoint(props.PlaceList.position.cameraPoint)
      setVisionXexcursion(props.PlaceList.position.excursion.Xexcursion)
      setVisionYexcursion(props.PlaceList.position.excursion.Yexcursion)
      setVisionZexcursion(props.PlaceList.position.excursion.Zexcursion)
      setVisionAngle(props.PlaceList.position.excursion.angle)
      setVisionScale(props.PlaceList.position.scale)
      setVisionAngleDirection(props.PlaceList.position.angleDirection)
      setVisionCameraPoint2(props.PlaceList.position.cameraPoint[2])
      setVisionSampleData(props.PlaceList.position.sampleData)
    },[props.PlaceList])

    const { Option } = Select;
    const cameraNumchildren = [];
    let history = useHistory();
    for (let i = 0; i <9; i++) {
      cameraNumchildren.push(
        <Option key={i}>{  i}</Option>
      );
    } 

    const DirectionNumchildren = [];
    for (let i = -1; i <2; i++) {
      if(i != 0){
        DirectionNumchildren.push(
          <Option key={i}>{ i ==-1?"负方向":"正方向"}</Option>
        );
      }
    } 

    const hanldChange = (value) =>{
      setPlaceNum(Number(value))
      console.log(value)
    }

    console.log(props.PlaceList)

    const standardcolumns = [
      {title: "基准点",dataIndex: "name", },
      {title: "值", dataIndex: "value", },
    ];
    const standarddata = [
      { key: "1", name:"X值",  value: <Input disabled value={VisionDatumPoint[0]}  style={{ width:"100px" }} />},
      { key: "1", name:"Y值",  value: <Input disabled value={VisionDatumPoint[1]}   style={{ width:"100px" }} />},
      { key: "1", name:"Z值",  value: <Input disabled value={VisionDatumPoint[2]}   style={{ width:"100px" }} />},
      { key: "1", name:"A值",  value: <Input disabled value={VisionDatumPoint[3]}   style={{ width:"100px" }} />},
      { key: "1", name:"B值",  value: <Input disabled value={VisionDatumPoint[4]}   style={{ width:"100px" }} />},
      { key: "1", name:"C值",  value: <Input disabled value={VisionDatumPoint[5]}  style={{ width:"100px" }} />},
    ];

    const cameracolums = [
      {title: "相机坐标",dataIndex: "name", },
      {title: "值", dataIndex: "value", },
    ]

    const cameradata = [
      { key: "1", name:"X",  value: <Input value={VisionCameraPoint[0]}  disabled style={{ width:"100px" }} />},
      { key: "1", name:"Y",  value: <Input value={VisionCameraPoint[1]}  disabled style={{ width:"100px" }} />},
      { key: "1", name:"高度",  value: <Input value={VisionCameraPoint2} onChange={(e)=>{setVisionCameraPoint2(e.target.value) 
        console.log(e.target.value)}} disabled={allIpt}  style={{ width:"100px" }} />},
      { key: "1", name:"角度",  value: <Input value={VisionCameraPoint[3]} disabled style={{ width:"100px" }} />},
    ]

    return(
      <div style={{ background:"#fff",marginTop:"-30px",zIndex:"2",position:"relative",width:"100%",height:"1000px",overflowY:"hidden" }}>
        <div className="place-content-l">
          <div style={{ marginLeft:"20%",marginTop:"5%" }}>
                <span> 工艺号: </span>
                <Select
                    defaultValue={PlaceNum}
                    style={{ width: "100px" }}
                    onChange={hanldChange}
                  >
                    {cameraNumchildren}
                </Select>
          </div>
          <div className="place-content-lc">
            <p>偏移补偿 </p>
            <div>X轴偏移 <Input disabled={allIpt}  value={VisionXexcursion} onChange={(e)=>{setVisionXexcursion(e.target.value)}} style={{ width:"50%",marginLeft:"8px" }} />mn</div>
            <div>Y轴偏移 <Input disabled={allIpt}  value={VisionYexcursion} onChange={(e)=>{setVisionYexcursion(e.target.value)}} style={{ width:"50%",marginLeft:"8px" }} />mn</div>
            <div>Z轴偏移 <Input disabled={allIpt}  value={VisionZexcursion} onChange={(e)=>{setVisionZexcursion(e.target.value)}} style={{ width:"50%",marginLeft:"8px"}} />mn</div>
            <div>角度偏移 <Input disabled={allIpt} value={VisionAngle} onChange={(e)=>{setVisionAngle(e.target.value)}}  style={{ width:"50%" }} /></div>
            <div>比例系数 <Input disabled={allIpt} value={VisionScale} onChange={(e)=>{setVisionScale(e.target.value)}}   style={{ width:"50%" }}/></div>
            { allIpt?   <div>角度方向 <Input disabled={allIpt} value={VisionAngleDirection == -1?"负方向":"正方向"}   style={{ width:"50%" }}/></div>:
            <div>
              角度方向
              <Select
                defaultValue={VisionAngleDirection == -1?"负方向":"正方向"}
                style={{ width: "50%",marginLeft:"4px" }}
                onChange={(value)=>{setVisionAngleDirection(Number(value))}}
              >
                {DirectionNumchildren}
              </Select>
            </div>
            }
          
          </div>
          <div className="place-content-lb">
            <p>示例格式:{VisionSampleData}</p>
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
            <Button type="primary" disabled={allIpt} style={{ background:"#f36c21",border:"none" }} onClick={()=>{
              let dataList = {
                robot:1,
                visionNum:PlaceNum
              }
              sendMSGtoController("VISION_GESTURE_CALIBRATION_SET",dataList)
            }}>标定抓取姿态</Button>
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
            <Button type="primary" disabled={allIpt} style={{ background:"#f36c21",border:"none" }} onClick={()=>{
              let dataList = {
                robot:1,
                visionNum:PlaceNum,
              }
              sendMSGtoController("VISION_TRY_TAKE_PICTURE",dataList)
            }} >试拍照</Button>
            <Button type="primary" disabled={allIpt} style={{ background:"#f36c21",border:"none" }}>运行到该点</Button>
          </div>
          <div className="place-moreBtn">
            <Button size="large" type="primary" style={{ background:"#009ad6" }} onClick={ ()=>{
              history.push('/vision')
            } }>返回</Button>
            {showSave?  
            <Button size="large" type="primary" style={{ background:"#45b97c",marginLeft:"2px",border:"none"  }} onClick={ ()=>{
              let dataList = {
                robot:1,
                visionNum:PlaceNum,
                position:{
                  datumPoint:VisionDatumPoint,
                  cameraPoint:[VisionCameraPoint[0],VisionCameraPoint[1],Number(VisionCameraPoint2),VisionCameraPoint[3]],
                  excursion:{
                    Xexcursion:Number(VisionXexcursion),
                    Yexcursion:Number(VisionYexcursion),
                    Zexcursion:Number(VisionZexcursion),
                    angle:Number(VisionAngle)
                    },
                  scale:Number(VisionScale),
                  angleDirection:VisionAngleDirection,
                }
              }
              sendMSGtoController("VISION_POS_PARAMETER_SET",dataList)
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