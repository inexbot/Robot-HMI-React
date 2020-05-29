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
import { connect } from "dva";
import asyncComponents from "../../../../../../AsyncComponents";
import { HashRouter, NavLink, Route, Switch } from "react-router-dom";
import "./index.css";


const Basic = asyncComponents(() => import("../Basic"))
const Discern = asyncComponents(() => import("../Discern"))
const Conveyorsign = asyncComponents(() => import("../Conveyorsign"))
const Sensorsign = asyncComponents(() => import("../Sensorsign"))
const Setsite = asyncComponents(() => import("../Setsite"))

const mapStateToProps = (state) => {
  return {
    
  };
};

function Setparameter() {
  const { Option } = Select;

  const { Step } = Steps;
  const [current, setCurrent] = useState(0);

  const steps = [
    {
      title: "基本信息",
      path: "/setparameter/basic",
    },
    {
      title: "识别参数",
      path: "/setparameter/discern",
    },
    {
      title: "传送带标定",
      path: "/setparameter/conveyorsign",
    },
    {
      title: "传感器标定",
      path: "/setparameter/sensorsign",
    },
    {
      title: "位置设置",
      path: "/setparameter/setsite",
    },
  ];
  const [pathrouter, setPathrouter] = useState();
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
      <Option key={i}>{  i}</Option>
    );
  }

  const handleSizeChange = e => {
    setConveyorNum( e.target.value );
  };

  const handleChange =(value) => {
    console.log(`Selected: ${value}`);
  }
  return (
    <div>
      {/* 选择工艺号 */}
      <div style = {{marginLeft:'25%'}}>
        工艺号: 
        <Select
          size={conveyorNum}
          defaultValue="1"
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
        <Route
          path="/setparameter/conveyorsign"
          component={Conveyorsign}
        ></Route>
        <Route path="/setparameter/sensorsign" component={Sensorsign}></Route>
        <Route path="/setparameter/setsite" component={Setsite}></Route>
        <Switch>
          <Route exact path='/setparameter' component={Basic}></Route>
        </Switch>
          
        <NavLink exact activeClassName="selected" className="nav" to="/setparameter/basic">
          <Button type="primary" style={{ width:"20%",height:"40px" }}  onClick={() => {setCurrent(0);}}>
            基本信息
          </Button>
        </NavLink>
        <NavLink exact activeClassName="selected" className="nav" to="/setparameter/discern">
          <Button type="primary" style={{ width:"20%",height:"40px" }} onClick={() => { setCurrent(1);}}>
            识别参数
          </Button>
        </NavLink>
        <NavLink exact activeClassName="selected" className="nav"  to="/setparameter/conveyorsign">
          <Button type="primary" style={{ width:"20%",height:"40px" }} onClick={() => {setCurrent(2);}}>
            传送带标定
          </Button>
        </NavLink>
        <NavLink exact activeClassName="selected" className="nav" to="/setparameter/sensorsign">
          <Button type="primary" style={{ width:"20%",height:"40px" }} onClick={() => {setCurrent(3);}}>
            传感器标定
          </Button>
        </NavLink>
        <NavLink exact activeClassName="selected" className="nav" to="/setparameter/setsite">
          <Button type="primary" style={{ width:"20%",height:"40px" }} onClick={() => {setCurrent(4);}}>
            位置设置
          </Button>
        </NavLink>
      </HashRouter>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(Setparameter);
