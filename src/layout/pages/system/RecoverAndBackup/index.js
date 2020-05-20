import React, { useState } from "react";
import intl from "react-intl-universal"
import { Tabs, Button } from "antd";
import ConTitle from "components/title";

const { TabPane } = Tabs;

function RecoverAndBackup() {
  const [version, setVersion] = useState("20.02.04.11");
  const [udiskState, setUdiskState] = useState("未插入");
  const updateSystem = () => {
    return;
  };
  const exportJobs = () => {
    return;
  };
  const importJobs = () => {
    return;
  };
  const exportParameter = () => {
    return;
  };
  const importParameter = () => {
    return;
  };
  const backupSystem = () => {
    return;
  };
  const recoverSystem = () => {
    return;
  };
  return (
    <div>
      {/* 头部 */}
      <ConTitle
        title={intl.get("恢复与备份")}
        subtitle={intl.get("恢复与备份小标题")}
      />
      {/* 主要内容 */}
      <div className="recoverandbackup">
        <p>U盘状态：{udiskState}</p>
        <Tabs defaultActiveKey="1" style={{background:"white"}}>
          <TabPane tab="升级系统" key="1">
            <p>当前软件版本：{version}</p>
            <Button onClick={updateSystem}>升级系统</Button>
          </TabPane>
          <TabPane tab="程序" key="2">
            <Button onClick={exportJobs}>导出程序</Button>
            <Button onClick={importJobs}>导入程序</Button>
          </TabPane>
          <TabPane tab="参数" key="3">
            <Button onClick={exportParameter}>导出参数</Button>
            <Button onClick={importParameter}>导入参数</Button>
          </TabPane>
          <TabPane tab="系统" key="4">
            <Button onClick={backupSystem}>备份系统</Button>
            <Button onClick={recoverSystem}>恢复系统</Button>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}
export default RecoverAndBackup