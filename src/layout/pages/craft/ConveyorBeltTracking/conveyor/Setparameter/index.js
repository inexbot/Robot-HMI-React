import React, { useState, useEffect } from "react";
import intl from "react-intl-universal";
import ConTitle from "components/title";
import {
  Table,
  Button,
  notification,
  ConfigProvider,
  Select,
  Steps,
  message,
} from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { connect } from "dva";
import asyncComponents from "../../../../../../AsyncComponents";
import {
  HashRouter,
  NavLink,
  Route,
  Switch,
  useHistory,
  useLocation,
} from "react-router-dom";
import "./index.css";
import { sendMSGtoController } from "service/network";

const Basic = asyncComponents(() => import("../Basic"));
const Discern = asyncComponents(() => import("../Discern"));
const Conveyorsign = asyncComponents(() => import("../Conveyorsign"));
const Sensorsign = asyncComponents(() => import("../Sensorsign"));
const SensorOne = asyncComponents(() => import("../SensorOne"));
const SensorTwo = asyncComponents(() => import("../SensorTwo"));
const SensorThree = asyncComponents(() => import("../SensorThree"));

const Setsite = asyncComponents(() => import("../Setsite"));
const ConveyorOne = asyncComponents(() => import("../ConveyorOne"));
const ConveyorTwo = asyncComponents(() => import("../ConveyorTwo"));
const ConveyorThree = asyncComponents(() => import("../ConveyorThree"));
const ConveyorFour = asyncComponents(() => import("../ConveyorFour"));

const mapStateToProps = (state) => {
  return {
    currentRobot: state.index.robotStatus.currentRobot,
  };
};

function Setparameter(props) {
  const { Option } = Select;
  let history = useHistory();
  const { Step } = Steps;
  const [current, setCurrent] = useState(0);

  const onChange = current => {
    console.log(current)
    setCurrent(current)
    if(current == 0){
      history.push("/setparameter/basic")
    }else if(current == 1){
      history.push("/setparameter/discern")
    }else if(current == 2){
      history.push("/setparameter/conveyorsign")
    }else if(current == 3){
      history.push("/setparameter/sensorsign")
    }else if(current == 4){
      history.push("/setparameter/setsite")
    }
  } 

  const steps = [
    { title: "基本信息", path: "/setparameter/basic" },
    { title: "识别参数", path: "/setparameter/discern" },
    { title: "传送带标定", path: "/setparameter/conveyorsign" },
    { title: "传感器标定", path: "/setparameter/sensorsign" },
    { title: "位置设置", path: "/setparameter/setsite" },
  ];

  const [conveyorNum, setConveyorNum] = useState();
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };

  const conveyorNumchildren = [];
  for (let i = 1; i < 10; i++) {
    conveyorNumchildren.push(<Option key={i}>{i}</Option>);
  }

  const handleSizeChange = (e) => {
    setConveyorNum(e.target.value);
  };

  const handleChange = (value) => {
    let dataList = {
      robot: props.currentRobot,
      conveyorID: Number(value),
    };
    sendMSGtoController("TRACK_CONVEYOR_CONVEYORPARAM_INQUIRE", dataList);
  };


  return (
    <div>
      {/* 头部 */}
      <ConTitle
        title={intl.get("传送带参数")}
        subtitle={intl.get("传送带参数")}
      />
      {/* 悬浮按钮 */}
      <div className="hoverButton1"></div>

      {/* 选择工艺号 */}
      <div style={{ marginLeft: "25%" }}>
        工艺号:
        <Select
          size={conveyorNum}
          defaultValue="请选择工艺号"
          onChange={handleChange}
          style={{ width: 200 }}
        >
          {conveyorNumchildren}
        </Select>
      </div>

      {/* 使用hash路由来控制 */}
      <div >
      <HashRouter >
        <Route path="/setparameter/basic" component={Basic}></Route>
        <Route path="/setparameter/discern" component={Discern}></Route>
        <Route  path="/setparameter/conveyorsign" component={Conveyorsign}></Route>
        <Route  path="/setparameter/conveyorone" component={ConveyorOne}></Route>
        <Route  path="/setparameter/conveyortwo" component={ConveyorTwo}></Route>
        <Route  path="/setparameter/conveyorthree" component={ConveyorThree}></Route>
        <Route  path="/setparameter/conveyorfour" component={ConveyorFour}></Route>
        <Route path="/setparameter/sensorsign" component={Sensorsign}></Route>
        <Route path="/setparameter/sensorone" component={SensorOne}></Route>
        <Route path="/setparameter/sensortwo" component={SensorTwo}></Route>
        <Route path="/setparameter/sensorthree" component={SensorThree}></Route>
        <Route path="/setparameter/setsite" component={Setsite}></Route>
        
        <Switch>
          <Route exact path='/setparameter' component={Basic}></Route>
        </Switch>
        <Steps current={current} onChange={onChange} style={{ marginTop:"10px"}}>
          <Step title="基本信息"  />
          <Step title="识别参数" />
          <Step title="传送带标定" />
          <Step title="传感器标定"  />
          <Step title="位置设置"  />
        </Steps>

      </HashRouter>

      </div>
    </div>
  );
}

export default connect(mapStateToProps)(Setparameter);
