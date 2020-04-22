import React from "react";
import dva from "dva";
import "./index.css";
import Router from "./router";
import * as serviceWorker from './serviceWorker';

// 1. Initialize
const app = dva();
// 引入robotpara这个model，这个model主要用来控制layout/pages/robotpara中几个页面的状态，后期应该用单个model来保存所有页面的状态
app.model(require("./models/slave_set").default);
app.model(require("./models/app").default);
app.model(require("./models/main").default);
app.model(require("./models/leftstatus").default);

// 4. Router
app.router(()=><Router />);

// 5. Start
app.start("#root");

serviceWorker.register();