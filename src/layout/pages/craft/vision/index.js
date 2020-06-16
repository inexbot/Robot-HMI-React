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
      return(
              <div>
                  <HashRouter  >
                      <NavLink exact activeClassName="selected"  to="/vision/parameter">
                        <Button>
                          视觉参数设置
                        </Button>
                      </NavLink>
                      <NavLink exact activeClassName="selected" to="/vision/scope">
                        <Button>
                          视觉范围设置
                        </Button>
                      </NavLink>
                      <NavLink exact activeClassName="selected"  to="/vision/place">
                        <Button>
                          视觉位置参数
                        </Button>
                      </NavLink>
                      <NavLink exact activeClassName="selected"  to="/vision/placedebug">
                        <Button>
                          位置调试
                        </Button>
                      </NavLink>

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