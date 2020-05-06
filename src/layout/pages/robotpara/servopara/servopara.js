import React, { useState } from "react";
import { Button, Table, Tabs, Col, Row } from "antd";
import { dataSource, columns } from "../servopara_header/servopara_header";
import ConTitle from "../../../../components/title";
import intl from "react-intl-universal";
import "./servopara.css";
const { TabPane } = Tabs;

function ServoPara(props) {
  const [isDisabled, setIsDisabled] = useState(true);
  const [buttonCharacter1, setButtonCharacter1] = useState("修改");
  const [buttonType1, setButtonType1] = useState("primary");
  const change = () => {
    if (isDisabled === true) {
      setIsDisabled(false);
      setButtonCharacter1("保存");
      setButtonType1("dashed");
    } else {
      setIsDisabled(true);
      setButtonCharacter1("修改");
      setButtonType1("primary");
    }
  };
  const tabsContent = (Joint) => {
    return (
      <TabPane tab={Joint} key={Joint}>
        <Row>
          <Col span={20} offset={2}>
            <div>
              <div className="servopara1">
                <p>{intl.get("伺服型号")}</p>
                <p>CoolDriver RC</p>
              </div>
              <Table
                dataSource={dataSource}
                columns={columns}
                pagination={false}
              />
            </div>
          </Col>
        </Row>
      </TabPane>
    );
  };
  return (
    <div>
      {/* 头部 */}
      <ConTitle
        title={intl.get("伺服参数")}
        subtitle={intl.get("查看与修改伺服的内部参数")}
      />
      {/* 悬浮按钮 */}
      <div className="hoverButton1">
        <Button type={buttonType1} shape="circle" size="large" onClick={change}>
          {buttonCharacter1}
        </Button>
      </div>
      {/* 主要内容 */}
      <div className="servopara">
        <Row>
          <Col span={20}>
            <Tabs defaultActiveKey="J1" style={{ padding: 10 }}>
              {tabsContent("J1")}
              {tabsContent("J2")}
              {tabsContent("J3")}
              {tabsContent("J4")}
              {tabsContent("J5")}
              {tabsContent("J6")}
              {tabsContent("J7")}
              {tabsContent("O1")}
              {tabsContent("O2")}
              {tabsContent("O3")}
              {tabsContent("O4")}
              {tabsContent("O5")}
            </Tabs>
          </Col>
        </Row>
      </div>
    </div>
  );
}
export default ServoPara;
