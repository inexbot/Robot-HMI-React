import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  notification,
  ConfigProvider,
  Select,
  Steps,
  message,
  Divider
} from "antd";
import { connect } from "dva";
import asyncComponents from "../../../../AsyncComponents";
import { HashRouter, NavLink, Route, Switch, useHistory, useLocation} from "react-router-dom";


const Parameter = asyncComponents(() => import("./Parameter"))
const Scope = asyncComponents(() => import("./Scope"))
const Placedebug = asyncComponents(() => import("./Placedebug"))
const Place = asyncComponents(() => import("./Place"))
const Scopesign = asyncComponents(() => import("./scopesign"))


const mapStateToProps = (state) => {
    return {
      
    };
  };
  
  function Vision(){
    const [ current, setCurrent ] = useState(0)

    const { Step } = Steps;
    let history = useHistory();

    const onChange = current => {
      console.log(current)
      setCurrent(current)
      if(current == 0){
        history.push("/vision/parameter")
      }else if(current == 1){
        history.push("/vision/scope")
      }else if(current == 2){
        history.push("/vision/place")
      }else if(current == 3){
        history.push("/vision/placedebug")
      }
    } 

    return(
            <div>
                <HashRouter  >
                     <Steps current={-1} onChange={onChange} style={{ position:"relative",top:"60px",zIndex:"2",width:"90%",margin:"0 auto" }}>
                       <Step title="视觉参数设置"  />
                       <Step title="视觉范围设置" />
                       <Step title="视觉位置设置" />
                       <Step title="位置调试"  />
                     </Steps>

                    <Route path="/vision/parameter" component={Parameter} ></Route>
                    <Route path="/vision/scope" component={Scope} ></Route>
                    <Route  path="/vision/place" component={Place} ></Route>
                    <Route  path="/vision/placedebug" component={Placedebug} ></Route>
                    <Route path="/vision/scopesign" component={Scopesign} ></Route>
                </HashRouter>
            </div>
    )
  }


  export default connect(mapStateToProps)(Vision);