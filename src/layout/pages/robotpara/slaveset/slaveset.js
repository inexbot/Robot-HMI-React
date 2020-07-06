import React, { useEffect, useState } from "react";
import { SwapLeftOutlined, SwapRightOutlined } from "@ant-design/icons";
import { Button, Col, Select, Alert, Row, Input } from "antd";
import { servoAmount, ENIname, ENIstate } from "./slaveset_header";
import { sendMSGtoController } from "service/network";
import { connect } from "dva";
import SlaveSetRobot from "./slaveset_robot";
import SlaveSetPrimary from "./slaveset_primary";
import ConTitle from "components/title";
import intl from "react-intl-universal";
import  "./slaveset.less";

const { Option } = Select;

// dva所用到的，将所有model/robotpara.js中的state作为该类的props
const mapStateToProps = (state) => {
  return {
    isDisabled: state.Slave_Set.isDisabled,
    buttoncharacter: state.Slave_Set.buttoncharacter,
    buttontype: state.Slave_Set.buttontype,
    robotAxle: state.index.slaveSertCommit.axis,
    ENIname: state.index.slaveSertCommit.ENIname,
  };
};

function SlaveSet(props) {
  const [ SlaveENIname, setSlaveENIname ] = useState(props.ENIname)
  const [state, setState] = useState({
    page: "robot",
    RPbuttontype: "dashed",
    RPbuttoncharacter: "从动轴",
    icon: <SwapRightOutlined />,
  });
  // const[ SalveRobotAxle, setSalveRobotAxle ] = useState(props.robotAxle)
  useEffect(() => {
    sendMSGtoController("SLAVETYPE_LIST_INQUIRE","");
    // sendMSGtoController("DRIVENSHAFT_INQUIRE","");
    sendMSGtoController("ENINAME_INQUIRE","");
  }, []);

  useEffect(()=>{
    setSlaveENIname(props.ENIname)
  },[props.ENIname])


  // 修改按钮的回调函数
  const change = () => {
    // console.log(props.dispatch())
    console.log(props)
    if (props.isDisabled === true) {
      props.dispatch({
        type: "Slave_Set/changeDisabled",
        data: {
          isDisabled: false,
          buttoncharacter: "保存",
          buttontype: "dashed",
        },
      });
    } else {
      props.dispatch({
        type: "Slave_Set/changeDisabled",
        data: {
          isDisabled: true,
          buttoncharacter: "修改",
          buttontype: "primary",
        },
      });
    }
  };

  // 用来动态加载右边的主要页面
  const pages = () => {
    if (state.page === "robot") {
      return <SlaveSetRobot />;
    } else {
      return <SlaveSetPrimary />;
    }
  };
  // 切换右侧界面，下面圆圈图标的回调函数
  const changeRP = () => {
    if (state.RPbuttoncharacter === "机器人") {
      setState({
        page: "robot",
        RPbuttoncharacter: "从动轴",
        icon: <SwapRightOutlined />,
        
      });
    }
    if (state.RPbuttoncharacter === "从动轴") {
      setState({
        page: "primary",
        RPbuttoncharacter: "机器人",
        icon: <SwapLeftOutlined />,
      });
    }
  };
  // 生成左边伺服表格
  const servoTable = (servoAmount) => {
    const tables = [];
    for (let i = 0; i < servoAmount.length; i++) {
      tables.push(
        <tr key={String(i)}>
          <td key="1">{i + 1}</td>
          <td key="2">{servoAmount[i]}</td>
        </tr>
      );
    }
    return tables;
  };

  return (
    
    <div>
      {/* 头部 */}
      <ConTitle
        title={intl.get("从站配置")}
        subtitle={intl.get("配置伺服、IO等EtherCAT从站设备")}
      />
      {/* 悬浮按钮 */}
      <div className='linkButton'>
        <Button
          type={state.RPbuttontype}
          onClick={changeRP.bind(this)}
          icon={state.icon}
        >
          {state.RPbuttoncharacter}
        </Button>
      </div>
      {/* 
        <div className="hoverButton2">
        <Switch checkedChildren="机器人" unCheckedChildren="从动轴" defaultChecked />
        </div> */}

      <div className='hoverButton1'>
        <Button
          type={props.buttontype}
          shape="circle"
          size="large"
          onClick={change.bind(this)}
        >
          {props.buttoncharacter}
        </Button>
      </div>
      {/* 主要内容 */}
      <div className='slaveset'>
        <Row>
          <Col span={6} className='slave_l'>
            <div className='slaveset1' style={{ paddingBottom: 15 }}>
              <span className='p1'>{intl.get("通讯周期")}</span>
              <span>
                <Select
                  defaultValue="1"
                  style={{ width: 80 }}
                  disabled={props.isDisabled}
                >
                  <Option value="1">1</Option>
                  <Option value="2">2</Option>
                  <Option value="4">4</Option>
                  <Option value="8">8</Option>
                </Select>
              </span>
              <span className='p1'>ms</span>
            </div>
            <p>{intl.get("需要的ENI文件名")}：</p>
            <Alert message={SlaveENIname.ENIName} type="info" />
            <p style={{ paddingTop: 6 }}>{SlaveENIname.isHaveENI == -1? " 未识别到ENI，未连接伺服  " : "已识别到ENI，已连接伺服"}</p>
            <div  className='slaveset-table'>
              <table border="2" >
                <tbody >
                  <tr >
                    <th >{intl.get("型号")}</th>
                    <th >{intl.get("伺服型号")}</th>
                  </tr>
                </tbody>
                <tbody>
                  {servoTable(servoAmount)}
                </tbody>
              </table>
            </div>
          </Col>
          <Col span={18} style={{ paddingLeft: 20, marginTop: 10 }}>
            {/* 通过调用上面的pages()函数来动态加载 */}
            <div id='slaveset'>{pages()}</div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
// 要用dva比如将上面的mapStateToProps与类名connect
export default connect(mapStateToProps)(SlaveSet);
