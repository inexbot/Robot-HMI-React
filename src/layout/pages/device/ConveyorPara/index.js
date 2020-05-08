import React from "react";
import { Tabs } from "antd";

const { TabPane } = Tabs;

function ConveyorPara(props) { 

  return (
    <Tabs defaultActiveKey="1" tabPosition="top" style={{ height: 220,width:1024 }}>
          {[...Array(30).keys()].map(i => (
            <TabPane tab={`Tab-${i}`} key={i}>
              Content of tab {i}
            </TabPane>
          ))}
        </Tabs>
  );
}

export default ConveyorPara;
