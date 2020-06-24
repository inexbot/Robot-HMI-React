import React, { useState, useEffect } from "react";
import intl from "react-intl-universal";
import ConTitle from "components/title";
import {
  Table,
  Button,
  notification,
  ConfigProvider,
  Select,
  Divider,
  Input,
  Modal,
} from "antd";
import { connect } from "dva";
import { useHistory } from "react-router-dom";
import "./placedebug.module.less";
import { sendMSGtoController } from "service/network";

const mapStateToProps = (state) => {
  return {
    currentRobot: state.index.robotStatus.currentRobot,
    PlacedebugList: state.index.vision.PlacedebugList,
  };
};

function Scope(props) {
  console.log(props.PlacedebugList);
  const [valueChange, setValueChange] = useState(true);
  const [VisionOriginPos, setVisionOriginPos] = useState(
    props.PlacedebugList.originPos
  );
  const [VisionCurrentPos, setVisionCurrentPos] = useState(
    props.PlacedebugList.currentPos
  );
  const [PlacedebugNum, setPlacedebugNum] = useState(1);
  const [PlacedebugConveyorNum, setPlacedebugConveyorNum] = useState(1);
  const [PitchOn, setPitchOn] = useState(-1);
  const { Option } = Select;
  const cameraNumchildren = [];
  const conveyorNumchildren = [];
  let history = useHistory();
  for (let i = 0; i < 9; i++) {
    cameraNumchildren.push(<Option key={i}>{i}</Option>);
    conveyorNumchildren.push(<Option key={i}>{i}</Option>);
  }

  useEffect(() => {
    let dataList = {
      robot: props.currentRobot,
      visionNum: Number(PlacedebugNum),
      conveyorNum: Number(PlacedebugConveyorNum),
    };
    sendMSGtoController("VISION_DEBUGGING_POS_INQUIRE", dataList);
  }, [PlacedebugNum, PlacedebugConveyorNum]);

  useEffect(() => {
    setVisionOriginPos(props.PlacedebugList.originPos);
    setVisionCurrentPos(props.PlacedebugList.currentPos);
  }, [props.PlacedebugList]);

  const cameracolumns = [
    { title: "原始点位", dataIndex: "site" },
    { title: "原始X", dataIndex: "Xvalue" },
    { title: "原始Y", dataIndex: "Yvalue" },
    { title: "原始Z", dataIndex: "Zvalue" },
    { title: "原始角度", dataIndex: "angle" },
  ];

  const cameradata = [];
  const conveyorcolumns = [
    { title: "偏移后点位", dataIndex: "site" },
    { title: "偏移X", dataIndex: "Xvalue" },
    { title: "偏移Y", dataIndex: "Yvalue" },
    { title: "偏移Z", dataIndex: "Zvalue" },
    { title: "偏移角度", dataIndex: "angle" },
  ];
  const conveyordata = [];
  for (let i = 0; i < 10; i++) {
    cameradata.push({
      key: `${i + 1}`,
      site: (
        <Button
          type="primary"
          style={
            PitchOn == i
              ? {
                  width: "50%",
                  height: "100%",
                  background: "#45b97c",
                  border: "none",
                }
              : {
                  width: "50%",
                  height: "100%",
                  background: "#f36c21",
                  border: "none",
                }
          }
          onClick={() => {
            console.log(PitchOn);
            if (PitchOn < 0) {
              setPitchOn(i);
            } else if (PitchOn == i) {
              setPitchOn(-1);
            } else {
              setPitchOn(i);
            }
          }}
        >
          原{i + 1}
        </Button>
      ),
      Xvalue: VisionOriginPos[i].X,
      Yvalue: VisionOriginPos[i].Y,
      Zvalue: VisionOriginPos[i].Z,
      angle: VisionOriginPos[i].angle,
    });
    conveyordata.push({
      key: `${i + 1}`,
      site: (
        <Button
          type="primary"
          style={
            PitchOn == i + 10
              ? {
                  width: "50%",
                  height: "100%",
                  background: "#45b97c",
                  border: "none",
                }
              : {
                  width: "50%",
                  height: "100%",
                  background: "#f36c21",
                  border: "none",
                }
          }
          onClick={() => {
            if (PitchOn < 0) {
              setPitchOn(i + 10);
            } else if (PitchOn == i + 10) {
              setPitchOn(-1);
            } else {
              setPitchOn(i + 10);
            }
          }}
        >
          偏{i + 1}
        </Button>
      ),
      Xvalue: VisionCurrentPos[i].X,
      Yvalue: VisionCurrentPos[i].Y,
      Zvalue: VisionCurrentPos[i].Z,
      angle: VisionCurrentPos[i].angle,
    });
  }

  return (
    <div style={{ marginTop:"-31px" }}>
      {/* 头部 */}
      <ConTitle
        title={intl.get("位置调试")}
        subtitle={intl.get("位置调试参数")}
      />
      {/* 悬浮按钮 */}
      <div className="hoverButton1"></div>

      <div className="Placebug" style={{ marginTop:"45px",height:"65vh",padding:14 }}>
        <div className="placedebug-content-t">
          <div>
            <span>工艺号:</span>
            <Select
              defaultValue={PlacedebugNum}
              style={{ width: 200,margin:"0 0 10px 10px"}}
              onChange={(value) => {
                setPlacedebugNum(Number(value));
              }}
            >
              {cameraNumchildren}
            </Select>
          </div>
          <div>
            <span>传送带工艺号:</span>
            <Select
              defaultValue={PlacedebugConveyorNum}
              style={{ width: 200,margin:"0 0 10px 10px" }}
              onChange={(value) => {
                setPlacedebugConveyorNum(Number(value));
              }}
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
              dataSource={cameradata}
            />
          </div>
          <div className="placedebug-content-cr">
            <Table
              size="small"
              pagination={false}
              columns={conveyorcolumns}
              dataSource={conveyordata}
            />
          </div>
        </div>
        <div className="placedebug-content-b">
          <Button
            type="primary"
            style={{
              width: "100px",
              height: "40px",
              border: "none",
            }}
            onClick={() => {
              let dataList = {
                robot: props.currentRobot,
                visionNum: Number(PlacedebugNum),
              };
              sendMSGtoController("VISION_DEBUGGING_TAKE_PICTURE", dataList);
            }}
          >
            拍照
          </Button>
          <Button
            type="primary"
            style={{
              width: "100px",
              height: "40px",
              border: "none",
            }}
            onClick={() => {
              let dataList = {
                robot: props.currentRobot,
                visionNum: Number(PlacedebugNum),
              };
              sendMSGtoController("VISION_DEBUGGING_CALCULATE", dataList);
            }}
          >
            计算偏移
          </Button>
          <Button
            type="primary"
            style={{
              width: "100px",
              height: "40px",
              border: "none",
            }}
            onClick={() => {
              let dataList = {
                robot: props.currentRobot,
                visionNum: Number(PlacedebugNum),
                type: 0,
              };
              if (PitchOn >= 0) {
                dataList.type = 1;
                dataList.visionNum = 1;
                dataList.posNum = PitchOn + 1;
              }
              sendMSGtoController("VISION_DEBUGGING_POS_MOVE", dataList);
            }}
          >
            移动至此
          </Button>
          <Button
            type="primary"
            danger
            style={{ width: "100px", height: "40px" }}
            onClick={() => {
              let dataList = {
                robot: props.currentRobot,
                visionNum: Number(PlacedebugNum),
                conveyorNum: Number(PlacedebugConveyorNum),
              };
              sendMSGtoController("ISION_DEBUGGING_POS_CLEAR", dataList);
            }}
          >
            清除
          </Button>
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(Scope);
