import React, { useState, useEffect } from "react";
import { router as Router } from "dva";
import intl from "react-intl-universal";
import Header from "./components/header";
import Footer from "./components/footer";
import RightButton from "./components/rightbutton";
import LeftState from "./components/leftstate";
import ParaFrame from "./components/paraframe";
import Log from "./components/log";
import { connect } from "dva";
import "./App.css";
import { sendMSGtoServer } from "service/network";

// locale data
const locales = {
  "en-US": require("./locales/en-US.json"),
  "zh-CN": require("./locales/zh-CN.json"),
  null: require("./locales/zh-CN.json"),
};
// import Menu from "./components/Menu";

const mapStateToProps = (state) => {
  return {
    paraFrameDisplay: state.App.paraFrameDisplay,
    operaMode: state.index.robotStatus.operaMode,
  };
};

function App(props) {
  const [initDone, setInitDone] = useState(false);
  useEffect(() => {
    loadLocales();
  }, []);

  const loadLocales = () => {
    // react-intl-universal 是单例模式, 只应该实例化一次
    intl
      .init({
        currentLocale: localStorage.getItem("lang") || "zh-CN", // TODO: determine locale here
        locales,
      })
      .then(() => {
        setInitDone(true);
      });
  };
  const showParaFrame = () => {
    switch (props.paraFrameDisplay) {
      case "open":
        return <ParaFrame />;
      case "close":
        return null;
      default:
        break;
    }
  };
  return (
    initDone && (
      <Router.HashRouter>
        <div className='App'>
          {/* 顶部状态栏，加载Header组件，src/component/header/index.js */}
          <div className='header'>
            <Header />
          </div>
          {/* 中间区域，分成3个模块 */}
          <div className='middle'>
            {/* 第一个模块，左侧状态分屏界面，加载LeftState组件，src/component/leftstate/index.js */}
            <div
              className='leftstate'
              id='leftframe'
              style={{ display: "none" }}>
              <LeftState />
            </div>
            {/* 第二个模块，中间的日志条和主要内容区，通过路由router.js文件来加载 */}
            <div className='logandcontent'>
              <div className='log'>
                <Log />
              </div>
              <div className='content'>{props.children}</div>
            </div>
            {/* 第三个模块，右侧的按钮，加载RightButton组件，src/component/rightbutton/index.js */}
            <div className='rightbutton'>
              <RightButton />
            </div>
          </div>
          {/* 底部按钮栏，加载Footer组件，src/component/footer/index.js */}
          <div className='footer'>
            <Footer />
          </div>
          {/* 按下右下角按钮后弹出的窗口，src/component/paraframe/index.js */}
          <div id='aparaframe'>{showParaFrame()}</div>
        </div>
      </Router.HashRouter>
    )
  );
}

export default connect(mapStateToProps)(App);
