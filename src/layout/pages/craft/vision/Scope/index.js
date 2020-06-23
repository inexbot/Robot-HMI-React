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
import "./scope.module.less";
import { sendMSGtoController } from "service/network";

const mapStateToProps = (state) => {
  return {
    currentRobot: state.index.robotStatus.currentRobot,
    ScopeList: state.index.vision.ScopeList,
  };
};

function Scope(props) {
  const [valueChange, setValueChange] = useState(true);
  const [ScopeNum, setScopeNum] = useState(1);
  const [VisionMaxX, setVisionMaxX] = useState(props.ScopeList.maxX);
  const [VisionMaxY, setVisionMaxY] = useState(props.ScopeList.maxY);
  const [VisionMaxZ, setVisionMaxZ] = useState(props.ScopeList.maxZ);
  const [VisionMinX, setVisionMinX] = useState(props.ScopeList.minX);
  const [VisionMinY, setVisionMinY] = useState(props.ScopeList.minY);
  const [VisionMinZ, setVisionMinZ] = useState(props.ScopeList.minZ);

  const { Option } = Select;
  const cameraNumchildren = [];
  let history = useHistory();
  for (let i = 0; i < 9; i++) {
    cameraNumchildren.push(<Option key={i}>{i}</Option>);
  }

  useEffect(() => {
    let dataList = {
      robot: props.currentRobot,
      visionNum: Number(ScopeNum),
    };
    sendMSGtoController("VISION_RANGE_INQUIRE", dataList);
  }, [ScopeNum]);

  useEffect(() => {
    setVisionMaxX(props.ScopeList.maxX);
    setVisionMaxY(props.ScopeList.maxY);
    setVisionMaxZ(props.ScopeList.maxZ);
    setVisionMinX(props.ScopeList.minX);
    setVisionMinY(props.ScopeList.minY);
    setVisionMinZ(props.ScopeList.minZ);
  }, [props.ScopeList]);

  const columns = [
    { title: "参数", dataIndex: "name" },
    { title: "值", dataIndex: "money" },
    { title: "注释", dataIndex: "address" },
  ];
  const data = [
    {
      key: "1",
      name: "MX",
      money: (
        <Input
          disabled={valueChange}
          value={VisionMaxX}
          onChange={(e) => {
            setVisionMaxX(e.target.value);
          }}
        />
      ),
      address: "X轴最大值（mm）（不填写则表示无限制）",
    },
    {
      key: "2",
      name: "mX",
      money: (
        <Input
          disabled={valueChange}
          value={VisionMaxY}
          onChange={(e) => {
            setVisionMaxY(e.target.value);
          }}
        />
      ),
      address: "X轴最小值（mm）（不填写则表示无限制）",
    },
    {
      key: "3",
      name: "MY",
      money: (
        <Input
          disabled={valueChange}
          value={VisionMaxZ}
          onChange={(e) => {
            setVisionMaxZ(e.target.value);
          }}
        />
      ),
      address: "Y轴最大值（mm）（不填写则表示无限制）",
    },
    {
      key: "4",
      name: "mY",
      money: (
        <Input
          disabled={valueChange}
          value={VisionMinX}
          onChange={(e) => {
            setVisionMinX(e.target.value);
          }}
        />
      ),
      address: "Y轴最小值（mm）（不填写则表示无限制）",
    },
    {
      key: "5",
      name: "MZ",
      money: (
        <Input
          disabled={valueChange}
          value={VisionMinY}
          onChange={(e) => {
            setVisionMinY(e.target.value);
          }}
        />
      ),
      address: "Z轴最大值（mm）（不填写则表示无限制）",
    },
    {
      key: "6",
      name: "mZ",
      money: (
        <Input
          disabled={valueChange}
          value={VisionMinZ}
          onChange={(e) => {
            setVisionMinZ(e.target.value);
          }}
        />
      ),
      address: "Z轴最小值（mm）（不填写则表示无限制）",
    },
  ];

  return (
    <div style={{ marginTop: "-31px" }}>
      {/* 头部 */}
      <ConTitle
        title={intl.get("位置调试")}
        subtitle={intl.get("位置调试参数")}
      />
      {/* 悬浮按钮 */}
      {/* <div className=""> */}
      {valueChange ? (
        <div style={{ marginLeft: "20%" }}>
          <div className="hoverButton1">
            <Button
              size="large"
              shape="circle"
              onClick={() => {
                setValueChange(false);
              }}
              type="primary"
            >
              修改
            </Button>
          </div>
          <div className="hoverButton2">
            <Button
              size="large"
              shape="circle"
              type="primary"
              style={{ color:"#1890ff" ,border: "1px #1890ff dashed",background:"#ffffff",boxShadow:"0 1px 8px rgba(200, 200, 200, 0.6)" }}
              onClick={() => {
                setValueChange(false);
                setVisionMaxX("");
                setVisionMaxY("");
                setVisionMaxZ("");
                setVisionMinX("");
                setVisionMinY("");
                setVisionMinZ("");
              }}
            >
              清除
            </Button>
          </div>
        </div>
      ) : (
        <div style={{ marginLeft: "20%" }}>
          <div className="hoverButton1">
            <Button
              size="large"
              shape="circle"
              onClick={(e) => {
                setValueChange(true);
                let dataList = {
                  robot: props.currentRobot,
                  visionNum: Number(ScopeNum),
                  visionRange: {
                    maxX: String(VisionMaxX),
                    maxY: String(VisionMaxY),
                    maxZ: String(VisionMaxZ),
                    minX: String(VisionMinX),
                    minY: String(VisionMinY),
                    minZ: String(VisionMinZ),
                  },
                };
                console.log(dataList);
                sendMSGtoController("VISION_RANGE_SET", dataList);
              }}
              type="primary"
              style={{ background: "#45b97c", border: "none" }}
            >
              保存
            </Button>
          </div>
          <div className="hoverButton2">
            <Button
              size="large"
              shape="circle"
              style={{
                background: "#45b97c",
                color:"#45b97c" ,border: "1px #45b97c dashed",background:"#ffffff",boxShadow:"0 1px 8px rgba(200, 200, 200, 0.6)"
              }}
              onClick={() => {
                setValueChange(true);
              }}
              type="primary"
            >
              取消
            </Button>
          </div>
        </div>
      )}

      <div className="Scope" style={{ marginTop: "45px", height: "65vh" }}>
        <div style={{ textAlign: "center", margin: 10 }}>
          <p style={{ paddingTop: 10 }}></p>
          <span> 工艺号: </span>
          <Select
            defaultValue={ScopeNum}
            style={{ width: 200, marginLeft: 10 }}
            onChange={(value) => {
              setScopeNum(Number(value));
            }}
          >
            {cameraNumchildren}
          </Select>
        </div>
        <div className="scope-center">
          <Table
            pagination={false}
            columns={columns}
            dataSource={data}
            style={{
              width: "76%",
              margin: "0 auto",
              boxShadow: "0px 1px 8px #ddd",
            }}
          />
        </div>
        <div style={{ textAlign:"center",marginTop:10 }}>
          <Button
            size="large"
            type="primary"
            style={{ background: "#009ad6", marginLeft: "1px" }}
            onClick={() => {
              history.push({
                pathname: "/vision/scopesign",
                query: { a: Number(ScopeNum) },
              });
            }}
          >
            范围标定
          </Button>
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(Scope);
