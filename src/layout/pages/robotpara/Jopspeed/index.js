import React, { useState } from "react";
import { Button, Input, Tabs } from "antd";
import intl from "react-intl-universal";
import ConTitle from "../../../../components/title";
import "./index.css";

const { TabPane } = Tabs;

function JogSpeed(props) {
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

  return (
    <div>
      {/* 头部 */}
      <ConTitle
        title={intl.get("点动速度")}
        subtitle={intl.get("机器人点动速度设置")}
      />
      {/* 悬浮按钮 */}
      <div className="hoverButton1">
        <Button type={buttonType1} shape="circle" size="large" onClick={change}>
          {buttonCharacter1}
        </Button>
      </div>
      {/* 主要内容 */}
      <div className="jogspeed">
        <Tabs defaultActiveKey="1">
          <TabPane tab={intl.get("关节")} key="1" className="jog_tab">
            <Tabs
              defaultActiveKey="1"
              tabPosition="top"
              style={{ height: 220, maxWidth: "88vw",margin:"0 auto" }}
            >
              <TabPane tab="J1" key="1">
                <div className="jogspeed1">
                  <p className="p1">{intl.get("关节轴最大点动速度")}</p>
                  <Input style={{ width: 200 }} disabled={isDisabled} />
                  <p className="p2">{intl.get("度")}/s</p>
                </div>
                <div className="jogspeed1">
                  <p className="p1">{intl.get("关节轴点动加速度")}</p>
                  <Input style={{ width: 200 }} disabled={isDisabled} />
                  <p className="p2">{intl.get("度")}/s²</p>
                </div>
              </TabPane>
              <TabPane tab="J2" key="2">
                <div className="jogspeed1">
                  <p className="p1">{intl.get("关节轴最大点动速度")}</p>
                  <Input style={{ width: 200 }} disabled={isDisabled} />
                  <p className="p2">{intl.get("度")}/s</p>
                </div>
                <div className="jogspeed1">
                  <p className="p1">{intl.get("关节轴点动加速度")}</p>
                  <Input style={{ width: 200 }} disabled={isDisabled} />
                  <p className="p2">{intl.get("度")}/s²</p>
                </div>
              </TabPane>
              <TabPane tab="J3" key="3">
                <div className="jogspeed1">
                  <p className="p1">{intl.get("关节轴最大点动速度")}</p>
                  <Input style={{ width: 200 }} disabled={isDisabled} />
                  <p className="p2">{intl.get("度")}/s</p>
                </div>
                <div className="jogspeed1">
                  <p className="p1">{intl.get("关节轴点动加速度")}</p>
                  <Input style={{ width: 200 }} disabled={isDisabled} />
                  <p className="p2">{intl.get("度")}/s²</p>
                </div>
              </TabPane>
              <TabPane tab="J4" key="4">
                <div className="jogspeed1">
                  <p className="p1">{intl.get("关节轴最大点动速度")}</p>
                  <Input style={{ width: 200 }} disabled={isDisabled} />
                  <p className="p2">{intl.get("度")}/s</p>
                </div>
                <div className="jogspeed1">
                  <p className="p1">{intl.get("关节轴点动加速度")}</p>
                  <Input style={{ width: 200 }} disabled={isDisabled} />
                  <p className="p2">{intl.get("度")}/s²</p>
                </div>
              </TabPane>
              <TabPane tab="J5" key="5">
                <div className="jogspeed1">
                  <p className="p1">{intl.get("关节轴最大点动速度")}</p>
                  <Input style={{ width: 200 }} disabled={isDisabled} />
                  <p className="p2">{intl.get("度")}/s</p>
                </div>
                <div className="jogspeed1">
                  <p className="p1">{intl.get("关节轴点动加速度")}</p>
                  <Input style={{ width: 200 }} disabled={isDisabled} />
                  <p className="p2">{intl.get("度")}/s²</p>
                </div>
              </TabPane>
              <TabPane tab="J6" key="6">
                <div className="jogspeed1">
                  <p className="p1">{intl.get("关节轴最大点动速度")}</p>
                  <Input style={{ width: 200 }} disabled={isDisabled} />
                  <p className="p2">{intl.get("度")}/s</p>
                </div>
                <div className="jogspeed1">
                  <p className="p1">{intl.get("关节轴点动加速度")}</p>
                  <Input style={{ width: 200 }} disabled={isDisabled} />
                  <p className="p2">{intl.get("度")}/s²</p>
                </div>
              </TabPane>
              {/* <TabPane tab="J7" key="7">
                <div className="jogspeed1">
                  <p className="p1">{intl.get("关节轴最大点动速度")}</p>
                  <Input style={{ width: 200 }} disabled={isDisabled} />
                  <p className="p2">{intl.get("度")}/s</p>
                </div>
                <div className="jogspeed1">
                  <p className="p1">{intl.get("关节轴点动加速度")}</p>
                  <Input style={{ width: 200 }} disabled={isDisabled} />
                  <p className="p2">{intl.get("度")}/s²</p>
                </div>
              </TabPane>
              <TabPane tab="O1" key="8">
                <div className="jogspeed1">
                  <p className="p1">{intl.get("关节轴最大点动速度")}</p>
                  <Input style={{ width: 200 }} disabled={isDisabled} />
                  <p className="p2">{intl.get("度")}/s</p>
                </div>
                <div className="jogspeed1">
                  <p className="p1">{intl.get("关节轴点动加速度")}</p>
                  <Input style={{ width: 200 }} disabled={isDisabled} />
                  <p className="p2">{intl.get("度")}/s²</p>
                </div>
              </TabPane>
              <TabPane tab="O2" key="9">
                <div className="jogspeed1">
                  <p className="p1">{intl.get("关节轴最大点动速度")}</p>
                  <Input style={{ width: 200 }} disabled={isDisabled} />
                  <p className="p2">{intl.get("度")}/s</p>
                </div>
                <div className="jogspeed1">
                  <p className="p1">{intl.get("关节轴点动加速度")}</p>
                  <Input style={{ width: 200 }} disabled={isDisabled} />
                  <p className="p2">{intl.get("度")}/s²</p>
                </div>
              </TabPane>
              <TabPane tab="O3" key="10">
                <div className="jogspeed1">
                  <p className="p1">{intl.get("关节轴最大点动速度")}</p>
                  <Input style={{ width: 200 }} disabled={isDisabled} />
                  <p className="p2">{intl.get("度")}/s</p>
                </div>
                <div className="jogspeed1">
                  <p className="p1">{intl.get("关节轴点动加速度")}</p>
                  <Input style={{ width: 200 }} disabled={isDisabled} />
                  <p className="p2">{intl.get("度")}/s²</p>
                </div>
              </TabPane>
              <TabPane tab="O4" key="11">
                <div className="jogspeed1">
                  <p className="p1">{intl.get("关节轴最大点动速度")}</p>
                  <Input style={{ width: 200 }} disabled={isDisabled} />
                  <p>{intl.get("度")}/s</p>
                </div>
                <div className="jogspeed1">
                  <p className="p1">{intl.get("关节轴点动加速度")}</p>
                  <Input style={{ width: 200 }} disabled={isDisabled} />
                  <p className="p2">{intl.get("度")}/s²</p>
                </div>
              </TabPane>
              <TabPane tab="O5" key="12">
                <div className="jogspeed1">
                  <p className="p1">{intl.get("关节轴最大点动速度")}</p>
                  <Input style={{ width: 200 }} disabled={isDisabled} />
                  <p className="p2">{intl.get("度")}/s</p>
                </div>
                <div className="jogspeed1">
                  <p className="p1">{intl.get("关节轴点动加速度")}</p>
                  <Input style={{ width: 200 }} disabled={isDisabled} />
                  <p className="p2">{intl.get("度")}/s²</p>
                </div>
              </TabPane> */}
            </Tabs>
          </TabPane>
          <TabPane tab="直角" key="2">
            <div className="jogspeed1">
              <p className="p1">{intl.get("直线最大点动速度")}</p>
              <Input disabled={isDisabled} />
              <p className="p2">mm/s</p>
            </div>
            <div className="jogspeed1">
              <p className="p1">{intl.get("直线点动加速度")}</p>
              <Input disabled={isDisabled} />
              <p className="p2">mm/s²</p>
            </div>
          </TabPane>
        </Tabs>
        <div className="jogspeed2">
          <p className="p1">{intl.get("点动灵敏度")}</p>
          <Input disabled={isDisabled} style={{width:200}}/>
          <p className="p2">{intl.get("默认值0.001")}</p>
        </div>
      </div>
    </div>
  );
}
export default JogSpeed;
