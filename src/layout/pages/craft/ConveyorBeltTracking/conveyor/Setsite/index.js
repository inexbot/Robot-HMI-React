import React, { useState, useEffect } from "react";
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
import { sendMSGtoController } from "service/network";

const mapStateToProps = (state) => {
  return {
    currentRobot: state.index.robotStatus.currentRobot,
    dataSoure: state.index.conveyor.Basicdata,
    Setsite: state.index.conveyor.Setsite,
  };
};

function Setsite(props) {
  const [copycraftNum, setCopycraftNum] = useState(1);
  const [showSave, setShowSave] = useState(false);
  const [showemptyModal, setShowemptyModal] = useState(false);
  const [showcopyModal, setshowcopyModal] = useState(false);
  const [Iptdsb, setIptdsb] = useState(true);
  const [trackStartXPoint, setTrackStartXPoint] = useState(
    props.Setsite.position.trackStartXPoint
  );
  const [trackRangeXMax, setTrackRangeXMax] = useState(
    props.Setsite.position.trackRangeXMax
  );
  const [trackRangeYMin, setTrackRangeYMin] = useState(
    props.Setsite.position.trackRangeYMin
  );
  const [trackRangeYMax, setTrackRangeYMax] = useState(
    props.Setsite.position.trackRangeYMax
  );
  const [trackRangeZMin, setTrackRangeZMin] = useState(
    props.Setsite.position.trackRangeZMin
  );
  const [trackRangeZMax, setTrackRangeZMax] = useState(
    props.Setsite.position.trackRangeZMax
  );
  const [grabheight, setGrabheight] = useState(
    props.Setsite.position.grabheight
  );

  useEffect(() => {
    setTrackStartXPoint(props.Setsite.position.trackStartXPoint);
    setTrackRangeXMax(props.Setsite.position.trackRangeXMax);
    setTrackRangeYMin(props.Setsite.position.trackRangeYMin);
    setTrackRangeYMax(props.Setsite.position.trackRangeYMax);
    setTrackRangeZMin(props.Setsite.position.trackRangeZMin);
    setTrackRangeZMax(props.Setsite.position.trackRangeZMax);
    setGrabheight(props.Setsite.position.grabheight);
  }, [props.Setsite.conveyorID]);

  const { Option } = Select;
  const conveyorNumchildren = [];
  for (let i = 1; i < 10; i++) {
    conveyorNumchildren.push(<Option key={i}>{i}</Option>);
  }
  useEffect(() => {
    let dataList = {
      robot: props.currentRobot,
      conveyorID: props.dataSoure.conveyorID,
    };
    sendMSGtoController("TRACK_CONVEYOR_POSITION_INQUIRE", dataList);
  }, [props.dataSoure.conveyorID]);

  const handleChange = (value) => {
    setCopycraftNum(Number(value));
  };

  const sendinquiredemarcate = (value) => {
    let dataList = {
      robot: props.currentRobot,
      conveyorID: props.dataSoure.conveyorID,
      type: value,
    };
    sendMSGtoController("TRACK_CONVEYOR_POSITION_CALIBRATION", dataList);
  };

  const sendmoveSetsite = (value) => {
    let dataList = {
      robot: props.currentRobot,
      conveyorID: props.dataSoure.conveyorID,
      type: value,
    };
    sendMSGtoController("TRACK_CONVEYOR_POSITION_TO_MOVE", dataList);
  };

  const columns = [
    { title: "参数", dataIndex: "name" },
    { title: "值", dataIndex: "money" },
    { title: "单位", dataIndex: "address" },
    { title: "移动", dataIndex: "move" },
  ];
  const data = [
    {
      key: "1",
      name: "跟踪开始X点",
      money: (
        <Input
          disabled={Iptdsb}
          value={trackStartXPoint}
          onChange={(e) => {
            setTrackStartXPoint(e.target.value);
          }}
        />
      ),
      address: (
        <Button disabled={Iptdsb} onClick={sendinquiredemarcate.bind(null, 1)}>
          标记
        </Button>
      ),
      move: <Button onClick={sendmoveSetsite.bind(null, 1)}>至此</Button>,
    },
    {
      key: "1",
      name: "跟踪范围X最大",
      money: (
        <Input
          disabled={Iptdsb}
          value={trackRangeXMax}
          onChange={(e) => {
            setTrackRangeXMax(e.target.value);
          }}
        />
      ),
      address: (
        <Button disabled={Iptdsb} onClick={sendinquiredemarcate.bind(null, 2)}>
          标记
        </Button>
      ),
      move: <Button onClick={sendmoveSetsite.bind(null, 2)}>至此</Button>,
    },
    {
      key: "1",
      name: "跟踪范围Y最小",
      money: (
        <Input
          disabled={Iptdsb}
          value={trackRangeYMin}
          onChange={(e) => {
            setTrackRangeYMin(e.target.value);
          }}
        />
      ),
      address: (
        <Button disabled={Iptdsb} onClick={sendinquiredemarcate.bind(null, 3)}>
          标记
        </Button>
      ),
      move: <Button onClick={sendmoveSetsite.bind(null, 3)}>至此</Button>,
    },
    {
      key: "1",
      name: "跟踪范围Y最大",
      money: (
        <Input
          disabled={Iptdsb}
          value={trackRangeYMax}
          onChange={(e) => {
            setTrackRangeYMax(e.target.value);
          }}
        />
      ),
      address: (
        <Button disabled={Iptdsb} onClick={sendinquiredemarcate.bind(null, 4)}>
          {" "}
          标记
        </Button>
      ),
      move: <Button onClick={sendmoveSetsite.bind(null, 4)}>至此</Button>,
    },
    {
      key: "1",
      name: "跟踪范围Z最小",
      money: (
        <Input
          disabled={Iptdsb}
          value={trackRangeZMin}
          onChange={(e) => {
            setTrackRangeZMin(e.target.value);
          }}
        />
      ),
      address: (
        <Button disabled={Iptdsb} onClick={sendinquiredemarcate.bind(null, 5)}>
          标记
        </Button>
      ),
      move: <Button onClick={sendmoveSetsite.bind(null, 5)}>至此</Button>,
    },
    {
      key: "1",
      name: "跟踪范围Z最大",
      money: (
        <Input
          disabled={Iptdsb}
          value={trackRangeZMax}
          onChange={(e) => {
            setTrackRangeZMax(e.target.value);
          }}
        />
      ),
      address: (
        <Button disabled={Iptdsb} onClick={sendinquiredemarcate.bind(null, 6)}>
          标记
        </Button>
      ),
      move: <Button onClick={sendmoveSetsite.bind(null, 6)}>至此</Button>,
    },
    {
      key: "1",
      name: "最迟接收位置",
      money: (
        <Input
          disabled={Iptdsb}
          value={grabheight}
          onChange={(e) => {
            setGrabheight(e.target.value);
          }}
        />
      ),
      address: (
        <Button disabled={Iptdsb} onClick={sendinquiredemarcate.bind(null, 7)}>
          标记
        </Button>
      ),
      move: <Button onClick={sendmoveSetsite.bind(null, 7)}>至此</Button>,
    },
  ];
  return (
    <div
      className="backconnect"
      style={{ height: document.body.clientHeight * 0.674, marginLeft: "0" }}
    >
      {/* 悬浮按钮 */}
      <div className="hoverButton1">
        {showSave ? (
          <div style={{ display: "inline" }}>
            {" "}
            <Button
              style={{ right: "-60px" }}
              shape="circle"
              size="large"
              type="primary"
              onClick={() => {
                let dataList = {
                  robot: props.currentRobot,
                  conveyorID: props.dataSoure.conveyorID,
                  position: {
                    trackStartXPoint: Number(trackStartXPoint),
                    trackRangeXMax: Number(trackRangeXMax),
                    trackRangeYMin: Number(trackRangeYMin),
                    trackRangeYMax: Number(trackRangeYMax),
                    trackRangeZMin: Number(trackRangeZMin),
                    trackRangeZMax: Number(trackRangeZMax),
                    grabheight: Number(grabheight),
                  },
                };
                sendMSGtoController("TRACK_CONVEYOR_POSITION_SET", dataList);
              }}
            >
              保存
            </Button>
            <Button
              style={{
                top: "-80px",
                border: "1px dashed rgb(10, 168, 235)",
                background: "rgb(255, 255, 255)",
                color: "rgb(10, 168, 235)",
                boxShadow: "rgba(10, 168, 235, 0.6) 0px 1px 8px",
              }}
              shape="circle"
              size="large"
              onClick={() => {
                setShowSave(false);
                setIptdsb(true);
              }}
            >
              取消
            </Button>
          </div>
        ) : (
          <Button
            shape="circle"
            size="large"
            type="primary"
            onClick={() => {
              setShowSave(true);
              setIptdsb(false);
            }}
          >
            修改
          </Button>
        )}
      </div>

      <div style={{ width: "55%" }}>
        <Table
          size={"small"}
          pagination={false}
          columns={columns}
          dataSource={data}
        />
      </div>
      <div style={{ position: "absolute", left: "53%", top: "26%" }}>
        <img src="../images/setsite.png" style={{ width: "370px" }} />
      </div>
      <Modal
        title="提示"
        style={{ top: 100 }}
        visible={showemptyModal}
        onOk={() => {
          setShowemptyModal(false);
          let dataList = {
            robot: props.currentRobot,
            conveyorID: props.dataSoure.conveyorID,
          };
          sendMSGtoController("TRACK_CONVEYOR_PARAM_CLEAR", dataList);
        }}
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
        onOk={() => {
          setshowcopyModal(false);
          let dataList = {
            robot: props.currentRobot,
            srcConveyorID: props.dataSoure.conveyorID,
            dstConveyorID: copycraftNum,
          };
          sendMSGtoController("TRACK_CONVEYOR_PARAM_COPY", dataList);
        }}
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
      <Button
        type="primary"
        danger
        style={{
          width: "100px",
          height: "50px",
          marginLeft: `${showSave ? "28" : "34"}%`,
        }}
        onClick={() => {
          setShowemptyModal(true);
        }}
      >
        清空参数
      </Button>
      <Button
        type="primary"
        style={{ width: "100px", height: "50px" }}
        onClick={() => {
          setshowcopyModal(true);
        }}
      >
        复制参数
      </Button>
    </div>
  );
}

export default connect(mapStateToProps)(Setsite);
