import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  notification,
  ConfigProvider,
  Select,
  Steps,
  message,
} from "antd";
import {ArrowRightOutlined} from "@ant-design/icons"
import { connect } from "dva";
import asyncComponents from "../../../../../../AsyncComponents";
import { HashRouter, NavLink, Route, Switch, useHistory, useLocation} from "react-router-dom";
import "./index.css";
import { sendMSGtoController } from "service/network";


const Basic = asyncComponents(() => import("../Basic"))
const Discern = asyncComponents(() => import("../Discern"))
const Conveyorsign = asyncComponents(() => import("../Conveyorsign"))
const Sensorsign = asyncComponents(() => import("../Sensorsign"))
const SensorOne = asyncComponents(() => import("../SensorOne"))
const SensorTwo = asyncComponents(() => import("../SensorTwo"))
const SensorThree = asyncComponents(() => import("../SensorThree"))

const Setsite = asyncComponents(() => import("../Setsite"))
const ConveyorOne = asyncComponents(() => import("../ConveyorOne"))
const ConveyorTwo = asyncComponents(() => import("../ConveyorTwo"))
const ConveyorThree = asyncComponents(() => import("../ConveyorThree"))
const ConveyorFour = asyncComponents(() => import("../ConveyorFour"))

const mapStateToProps = (state) => {
  return {
    
  };
};

function Setparameter() {
  const { Option } = Select;

  const { Step } = Steps;
  const [current, setCurrent] = useState(0);

  const steps = [
    { title: "基本信息", path: "/setparameter/basic", },
    { title: "识别参数", path: "/setparameter/discern", },
    { title: "传送带标定", path: "/setparameter/conveyorsign", },
    { title: "传感器标定", path: "/setparameter/sensorsign", },
    { title: "位置设置", path: "/setparameter/setsite", },
  ];
  const [RouterBtn, setRouterBtn] = useState('');
  const [conveyorNum, setConveyorNum] = useState();
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };

  const conveyorNumchildren = [];
  for (let i = 1; i <10; i++) {
    conveyorNumchildren.push(
      <Option key={i}>{i}</Option>
    );
  }

  const handleSizeChange = e => {
    setConveyorNum( e.target.value );
  };

  const handleChange =(value) => {
    let dataList = {
      robot:1,
      conveyorID:Number(value),
    }
    sendMSGtoController("TRACK_CONVEYOR_CONVEYORPARAM_INQUIRE",dataList)

  }

  useEffect(()=>{
    switch(window.location.hash){
      case "#/setparameter/basic":
        setRouterBtn("basic")
        break;
      case "#/setparameter":
        setRouterBtn("basic")
        break;
      case "#/setparameter/discern":
        setRouterBtn("discern")
        break;
      case "#/setparameter/conveyorsign":
        setRouterBtn("conveyorsign")
        break;
      case "#/setparameter/sensorsign":
        setRouterBtn("sensorsign")
        break;
      case "#/setparameter/setsite":
        setRouterBtn("setsite")
        break;
    }
  })

  return (
    <div>
      {/* 选择工艺号 */}
      <div style = {{marginLeft:'25%'}}>
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
      {/* 进度条 */}
      <Steps current={current}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
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
          
        <NavLink exact activeClassName="selected" className="nav" to="/setparameter/basic">
          <Button type={ RouterBtn=="basic"? "primary":"" }  style={{ width:"15%",height:"30px" }}  onClick={() => {setCurrent(0);}}>
            基本信息
          </Button>
        </NavLink>
        <ArrowRightOutlined style = {{ width:"6%",fontSize:"30px",textAlign:"center" }} />
        <NavLink exact activeClassName="selected" className="nav" to="/setparameter/discern">
          <Button type={ RouterBtn=="discern"? "primary":"" } style={{ width:"15%",height:"30px" }} onClick={() => { setCurrent(1);}}>
            识别参数
          </Button>
        </NavLink>
        <ArrowRightOutlined style = {{ width:"6%",fontSize:"30px",textAlign:"center" }} />
        <NavLink exact activeClassName="selected" className="nav"  to="/setparameter/conveyorsign">
          <Button type={ RouterBtn=="conveyorsign"? "primary":"" } style={{ width:"15%",height:"30px" }} onClick={() => {setCurrent(2);}}>
            传送带标定
          </Button>
        </NavLink>
        <ArrowRightOutlined style = {{ width:"6%",fontSize:"30px",textAlign:"center" }} />
        <NavLink exact activeClassName="selected" className="nav" to="/setparameter/sensorsign">
          <Button type={ RouterBtn=="sensorsign"? "primary":"" } style={{ width:"15%",height:"30px" }} onClick={() => {setCurrent(3);}}>
            传感器标定
          </Button>
        </NavLink>
        <ArrowRightOutlined style = {{ width:"6%",fontSize:"30px",textAlign:"center" }} />
        <NavLink exact activeClassName="selected" className="nav" to="/setparameter/setsite">
          <Button type={ RouterBtn=="setsite"? "primary":"" } style={{ width:"15%",height:"30px" }} onClick={() => {setCurrent(4);}}>
            位置设置
          </Button>
        </NavLink>
      </HashRouter>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(Setparameter);
