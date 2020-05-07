import React, { useEffect, useState } from "react";
// import { Button } from 'antd';
import { connect, router as Router } from "dva";
import {
  ApiFilled,
  SyncOutlined,
  CloseOutlined,
  WarningOutlined,
  Loading3QuartersOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import "./index.css";
import Mode from "../Mode";
import Servo from "../Servo";
import Program from "../Program";
import Tool from "../Tool";
import User from "../User";
import Robot from "../Robot";
import Frame from "../Frame";
import HandleSpeed from "../Handlespeed/handlespeed";
import Runspeed from "../Runspeed";
// import { Menu, Icon } from 'antd'11;

const mapStateToProps = (state) => {
  return {
    currentAuthority: state.App.currentAuthority,
    opened: state.index.opened,
    serverInit: state.index.serverInit,
  };
};
function Header(props) {
  const [connectIcon, setConnectIcon] = useState(
    <SyncOutlined
      spin
      // style={{ color: "white", margin: "10px", fontSize: "20px" }}
    />
  );
  const [serverIcon, setServerIcon] = useState(
    <Loading3QuartersOutlined
      spin
      // style={{ color: "white", margin: "10px", fontSize: "20px" }}
    />
  );
  const history = Router.useHistory();
  useEffect(() => {
    if (props.operaMode === 2) {
      history.push("/Program");
    }
  }, [props.operaMode]);
  useEffect(() => {
    switch (props.opened) {
      case -1:
        setConnectIcon(
          <SyncOutlined
            spin
            // style={{ color: "white", margin: "10px", fontSize: "20px" }}
          />
        );
        break;
      case 0:
        setConnectIcon(
          <CloseOutlined
          // style={{ color: "red", margin: "10px", fontSize: "20px" }}
          />
        );
        setServerIcon(
          <CloseOutlined
          // style={{ color: "red", margin: "10px", fontSize: "20px" }}
          />
        );
        break;
      case 1:
        setConnectIcon(
          <ApiFilled
          // style={{ color: "white", margin: "10px", fontSize: "20px" }}
          />
        );
        break;
      case 2:
        setConnectIcon(
          <WarningOutlined
          // style={{ color: "red", margin: "10px", fontSize: "20px" }}
          />
        );
        break;
      default:
        break;
    }
  }, [props.opened]);
  useEffect(() => {
    switch (props.serverInit) {
      case 0:
        setServerIcon(
          <Loading3QuartersOutlined
            spin
            style={{ color: "white", margin: "10px", fontSize: "20px" }}
          />
        );
        break;
      case 1:
        setServerIcon(
          <CheckOutlined
            style={{ color: "white", margin: "10px", fontSize: "20px" }}
          />
        );
        break;
      default:
        break;
    }
  }, [props.serverInit]);
  return (
    <div className='header-index'>
      {/* 最左边的两个状态提示图标，用来提示当前控制器连接状态和外部设备的网络状态 */}
      <div className='header-device-state'>
        {connectIcon}
        {serverIcon}
      </div>
      <div className='header-right'>
        {/* 坐标系状态header/frame.js */}
        <div className='b' id='header-frame'>
          <Frame />
        </div>
        {/* 当前机器人header/robot.js */}
        <div className='b' id='header-robot'>
          <Robot />
        </div>
        {/* 用户坐标系header/user.js */}
        <div className='b' id='header-user'>
          <User />
        </div>
        {/* 工具坐标系header/tool.js */}
        <div className='b' id='header-tool'>
          <Tool />
        </div>
        {/* 运行速度header/runspeed.js */}
        <div className='b' id='run-speed'>
          <Runspeed />
        </div>
        {/* 手动速度header/handlespeed.js */}
        <div className='b' id='handle-speed'>
          <HandleSpeed />
        </div>
        {/* 程序运行状态header/program.js */}
        <div id='header-pro-state'>
          <Program />
        </div>
        {/* 伺服状态header/servo.js */}
        <div className='b' id='header-servo-state'>
          <Servo />
        </div>
        {/* 当前模式切换和手动、手轮等操作模式切换header/mode.js */}
        <div className='b' id='header-mode'>
          <Mode />
        </div>
        {/* <Sj1 text1={nav1.text1} text2={nav1.text2} text3={nav1.text3} />  */}
      </div>
    </div>
  );
}
export default connect(mapStateToProps)(Header);
