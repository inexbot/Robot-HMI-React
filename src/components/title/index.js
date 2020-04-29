import React, { useState, useEffect } from "react";
import intl from "react-intl-universal";
import { router as Router, connect } from "dva";
import { Button, Row, Col, PageHeader } from "antd";
import "./index.css";
const mapStateToProps = (state) => {
  return {
    currentRobot: state.index.robotStatus.currentRobot,
    robot1OpenedProgram: state.index.robotStatus.robot1OpenedProgram,
    robot2OpenedProgram: state.index.robotStatus.robot2OpenedProgram,
    robot3OpenedProgram: state.index.robotStatus.robot3OpenedProgram,
    robot4OpenedProgram: state.index.robotStatus.robot4OpenedProgram,
  };
};

function ConTitle(props) {
  const [Pp, setPp] = useState("/Project");
  useEffect(() => {
    let openedProgram = "robot" + props.currentRobot + "OpenedProgram";
    let status = props[openedProgram];
    status === true ? setPp("/Program") : setPp("/Project");
  }, [props]);
  return (
    // 引入需要的按钮
    <div className="con_title">
      <Row>
        <Col span={20}>
          <PageHeader title={props.title} subTitle={props.subtitle} />
        </Col>
        <Col span={4} className="ret">
          <Button onClick={props.buttonOnClick} style={props.buttonStyle}>
            <Router.Link to={props.buttonLink || Pp}>
              {props.buttonName || intl.get("返回工程")}
            </Router.Link>
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default connect(mapStateToProps)(ConTitle);
