/* 
 * 主路由文件，增加页面跳转在这里
 */
import React from "react";
import { router as RouterDom } from "dva";

import App from "./App";
// 主界面
import Welcome from "./layout/pages/welcome";
import Project from "./layout/pages/Project";
// 角色选择界面
import Authority from "./layout/pages/authority";
// 应用参数
import Toolhands from "./layout/pages/toolhands";
import Usercoo from "./layout/pages/usercoo";
import Remotepro from "./layout/pages/remotepro";
import User from "./layout/pages/user";
import AutoLoadPro from "./layout/pages/autoLoadPro";
import RobotRange from "./layout/pages/robotRange";
import InterferenceRegion from "./layout/pages/interferenceRegion";
import Dynamic from "./layout/pages/dynamic";

// 外设参数
import IORemote from "./layout/pages/device/ioremote";
import IOStatusHint from "./layout/pages/device/iostatushint";
import IOReset from "./layout/pages/device/IOReset";
import IOWarning from "./layout/pages/device/IOWarning";
import IOSet from "./layout/pages/device/IOSet";
import VisionPara from "./layout/pages/device/visionpara";
import ConveyorPara from "./layout/pages/device/conveyorPara";


// 机器人参数
import Jointpara from "./layout/pages/robotpara/jointpara";
import Dhpara from "./layout/pages/robotpara/dhpara";
import Zeropara from "./layout/pages/robotpara/zeropara";
import LinearVel from "./layout/pages/robotpara/linearvel";
import JogSpeed from "./layout/pages/robotpara/jogspeed";
import RunningPara from "./layout/pages/robotpara/runningpara";
import SafeConfig from "./layout/pages/robotpara/safeconfig";
import OuterCalibrate from "./layout/pages/robotpara/outercalibrate/outercalibrate";
import GroundRail from "./layout/pages/robotpara/outercalibrate/groundrail";
import Turning from "./layout/pages/robotpara/outercalibrate/turning";
import SlaveSet from "./layout/pages/robotpara/slaveset/slaveset";
import ServoPara from "./layout/pages/robotpara/servopara";
import TeachLayout from "./layout/pages/teachlayout";
// 系统参数
import Language from "./layout/pages/system/language";
import { connect } from "dva";
import Program from "./layout/pages/program";

const mapStateToProps = (state) => {
  return {
    currentRobot: state.index.robotStatus.currentRobot,
    robot1OpenedProgram: state.App.robot1OpenedProgram,
    robot2OpenedProgram: state.App.robot2OpenedProgram,
    robot3OpenedProgram: state.App.robot3OpenedProgram,
    robot4OpenedProgram: state.App.robot4OpenedProgram,
  };
};
function Router(props) {
  return (
    <App>
      {/* 添加路由的界面，path是地址，对应Link的to，component对应主界面要跳转到的页面 */}
      <RouterDom.Switch>
        {/* 主界面 */}
        <RouterDom.Route path="/Project" exact component={Project} />
        <RouterDom.Route path="/Program" exact component={Program} />
        <RouterDom.Route path="/" exact component={Welcome} />
        {/* 角色设置 */}
        <RouterDom.Route path="/Authority" component={Authority} />
        {/* 应用参数 */}
        <RouterDom.Route path="/toolhands" component={Toolhands} />
        <RouterDom.Route path="/usercoo" component={Usercoo} />
        <RouterDom.Route path="/remotepro" component={Remotepro} />
        <RouterDom.Route path="/user" component={User} />
        <RouterDom.Route path="/autoLoadPro" component={AutoLoadPro} />
        <RouterDom.Route path="/robotRange" component={RobotRange} />
        <RouterDom.Route
          path="/interferenceRegion"
          component={InterferenceRegion}
        />
        <RouterDom.Route path="/dynamic" component={Dynamic} />
        {/* 外设参数 */}
        <RouterDom.Route path="/IORemote" component={IORemote} />
        <RouterDom.Route path="/IOStatusHint" component={IOStatusHint} />
        <RouterDom.Route path="/IOReset" component={IOReset} />
        <RouterDom.Route path="/IOWarning" component={IOWarning} />
        <RouterDom.Route path="/IOSet" component={IOSet} />
        <RouterDom.Route path="/visionpara" component={VisionPara} />
        <RouterDom.Route path="/conveyorPara" component={ConveyorPara} />

        {/* 机构参数 */}
        <RouterDom.Route path="/Jointpara" component={Jointpara} />
        <RouterDom.Route path="/Dhpara" component={Dhpara} />
        <RouterDom.Route path="/ZeroSet" component={Zeropara} />
        <RouterDom.Route path="/LinearVel" component={LinearVel} />
        <RouterDom.Route path="/JogSpeed" component={JogSpeed} />
        <RouterDom.Route path="/SafeConfig" component={SafeConfig} />
        <RouterDom.Route path="/RunningPara" component={RunningPara} />
        <RouterDom.Route path="/TeachLayout" component={TeachLayout} />
        <RouterDom.Route
          path="/OuterCalibrate"
          exact
          component={OuterCalibrate}
        />
        <RouterDom.Route path="/OuterCalibrate/turning" component={Turning} />
        <RouterDom.Route
          path="/OuterCalibrate/groundrail"
          component={GroundRail}
        />
        <RouterDom.Route path="/SlaveSet" component={SlaveSet} />
        <RouterDom.Route path="/ServoPara" component={ServoPara} />
        {/* 系统参数 */}
        <RouterDom.Route path="/Language" component={Language} />
      </RouterDom.Switch>
    </App>
  );
}
export default connect(mapStateToProps)(Router);
