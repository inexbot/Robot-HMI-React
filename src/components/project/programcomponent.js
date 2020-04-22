import React from "react";
import { Row, Col } from "antd";
import { connect } from "dva";
import {
  PlusOutlined,
  EditOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { sendMSGtoServer } from "service/network";
import { changevalue } from "service/network";
import "./programcomponent.css";

const mapStateToProps = (state) => {
  return {
    program: state.index.program,
  };
};
function ProgramComponent(props) {
  

  return (
    <div className="programcomponent">
      <Row style={{ width: "100%" }}>
        <Col span={6} offset={3}>
          <PlusOutlined className="icon" />
        </Col>
        <Col span={6}>
          <EditOutlined className="icon" />
        </Col>
        <Col span={6}>
          <EllipsisOutlined className="icon" />
        </Col>
      </Row>
    </div>
  );
}
export default connect(mapStateToProps)(ProgramComponent);
