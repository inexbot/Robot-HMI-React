/*
 * 主路由文件，增加页面跳转在这里
 */
import React from "react";
import { router as RouterDom } from "dva";
import asyncComponents from "./AsyncComponents";
import { connect } from "dva";

import Dhpara from "./layout/pages/robotpara/Dhpara";
// const Dhpara =  asyncComponents( () => import ( "./layout/pages/robotpara/Dhpara" ));

const App = asyncComponents(() => import("./App"));
// 主界面
const Welcome = asyncComponents(() =>
  import("./layout/pages/main_interface/Welcome")
);
const Project = asyncComponents(() =>
  import("./layout/pages/main_interface/Project")
);
// 角色选择界面
const Authority = asyncComponents(() =>
  import("./layout/pages/role_choices/authority")
);
// 应用参数
const Toolhands = asyncComponents(() =>
  import("./layout/pages/adhibition/Toolhands")
);
const Usercoo = asyncComponents(() =>
  import("./layout/pages/adhibition/Usercoo")
);
const Remotepro = asyncComponents(() =>
  import("./layout/pages/adhibition/Remotepro")
);
const User = asyncComponents(() => import("./layout/pages/adhibition/User"));
const AutoLoadPro = asyncComponents(() =>
  import("./layout/pages/adhibition/AutoLoadPro")
);
const RobotRange = asyncComponents(() =>
  import("./layout/pages/adhibition/RobotRange")
);
const InterferenceRegion = asyncComponents(() =>
  import("./layout/pages/adhibition/InterferenceRegion")
);
const Dynamic = asyncComponents(() =>
  import("./layout/pages/adhibition/Dynamic")
);

// 外设参数
const IORemote = asyncComponents(() =>
  import("./layout/pages/device/Ioremote")
);
const IOStatusHint = asyncComponents(() =>
  import("./layout/pages/device/Iostatushint")
);
const IOReset = asyncComponents(() => import("./layout/pages/device/IOReset"));
const IOWarning = asyncComponents(() =>
  import("./layout/pages/device/IOWarning")
);
const IOSet = asyncComponents(() => import("./layout/pages/device/Ioset"));
const VisionPara = asyncComponents(() =>
  import("./layout/pages/device/visionpara")
);
const ConveyorPara = asyncComponents(() =>
  import("./layout/pages/device/ConveyorPara")
);

// 机器人参数
const Jointpara = asyncComponents(() =>
  import("./layout/pages/robotpara/Jointpara")
);

const Zeropara = asyncComponents(() =>
  import("./layout/pages/robotpara/Zeropara")
);
const LinearVel = asyncComponents(() =>
  import("./layout/pages/robotpara/Linearvel")
);
const JogSpeed = asyncComponents(() =>
  import("./layout/pages/robotpara/Jopspeed")
);
const RunningPara = asyncComponents(() =>
  import("./layout/pages/robotpara/Runningpara")
);
const SafeConfig = asyncComponents(() =>
  import("./layout/pages/robotpara/Safeconfig")
);
const OuterCalibrate = asyncComponents(() =>
  import("./layout/pages/robotpara/Outercalibrate")
);
const GroundRail = asyncComponents(() =>
  import("./layout/pages/robotpara/Groundrail")
);
const Turning = asyncComponents(() =>
  import("./layout/pages/robotpara/Turning")
);
const SlaveSet = asyncComponents(() =>
  import("./layout/pages/robotpara/Slaveset/slaveset")
);
const ServoPara = asyncComponents(() =>
  import("./layout/pages/robotpara/Servopara")
);
const TeachLayout = asyncComponents(() => import("./layout/pages/Teachlayout"));
// 系统参数
const Language = asyncComponents(() =>
  import("./layout/pages/system/Language")
);
const RecoverAndBackup = asyncComponents(() =>
  import("./layout/pages/system/RecoverAndBackup")
);
const Program = asyncComponents(() => import("./layout/pages/program"));
// 工艺页面
const Setparameter = asyncComponents(() => import("./layout/pages/craft/ConveyorBeltTracking/conveyor/Setparameter"))
const Vision = asyncComponents(() => import("./layout/pages/craft/vision"))

const mapStateToProps = (state) => {
  return {
    currentRobot: state.index.robotStatus.currentRobot,
    robot1OpenedProgram: state.index.robotStatus.robot1OpenedProgram,
    robot2OpenedProgram: state.index.robotStatus.robot2OpenedProgram,
    robot3OpenedProgram: state.index.robotStatus.robot3OpenedProgram,
    robot4OpenedProgram: state.index.robotStatus.robot4OpenedProgram,
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
        <RouterDom.Route path="/interferenceRegion" component={InterferenceRegion} />
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
        <RouterDom.Route path="/Backup" component={RecoverAndBackup} />
        {/* 工艺页面 */}
          {/* 跳转到传送带参数页面 */}
        <RouterDom.Route path="/setparameter" component={Setparameter} />
          {/* 跳转到视觉参数页面 */}
        <RouterDom.Route path="/vision" component={Vision} />
      </RouterDom.Switch>
    </App>
  );
}
export default connect(mapStateToProps)(Router);
