import React, { useState } from "react";
import intl from "react-intl-universal";
import { Tabs, Button, Upload, message } from "antd";
import ConTitle from "components/title";
import { sendMSGtoServer } from "service/network";
import { UploadOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;

function RecoverAndBackup() {
  const [version, setVersion] = useState("20.02.04.11");
  const [udiskState, setUdiskState] = useState("未插入");
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleUpload = () => {
    const formData = new FormData();
    console.log(fileList)
    fileList.forEach((file) => {
      console.log(file)
      formData.append("file", file);
    }); 
    setUploading(true);
    console.log(formData,fileList)
    if(fileList[0].type != "application/x-zip-compressed"){
      message.error("请选择正确的zip类型文件")
      setUploading(false)
    }else{
      let sendData = {
        rbot:1,
        name:fileList[0].name,
        size:fileList[0].size
      }
      sendMSGtoServer("UPGRADE_COMMAND",sendData)
    }
    return;
  };
  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList)
    },
    
    beforeUpload: (file) => {
      setFileList([...fileList, file]) 
      return false;
    },
    fileList,
    
  };
  const updateSystem = () => {
    return;
  };
  const exportJobs = () => {
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
        <Tabs defaultActiveKey="1" style={{ background: "white" }}>
          <TabPane tab="升级系统" key="1">
            <p>当前软件版本：{version}</p>
            <div>
              <Upload {...props}>
                <Button>
                  <UploadOutlined /> 上传文件
                </Button>
              </Upload>
              <Button
                type="primary"
                onClick={handleUpload}
                disabled={fileList.length === 0}
                loading={uploading}
                style={{ marginTop: 16 }}
              >
                {uploading ? "Uploading" : "Start Upload"}
              </Button>
            </div>
          </TabPane>
          <TabPane tab="程序" key="2">
            <Button onClick={exportJobs}>导出程序</Button>
            <div>
              <Upload {...props}>
                <Button>
                  <UploadOutlined /> 导入程序
                </Button>
              </Upload>
              <Button
                type="primary"
                onClick={handleUpload}
                disabled={fileList.length === 0}
                loading={uploading}
                style={{ marginTop: 16 }}
              >
                {uploading ? "Uploading" : "Start Upload"}
              </Button>
            </div>
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
export default RecoverAndBackup;
