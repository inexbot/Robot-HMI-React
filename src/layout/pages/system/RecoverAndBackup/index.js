import React, { useState, useEffect } from "react";
import intl from "react-intl-universal";
import { Tabs, Button, Upload } from "antd";
import ConTitle from "components/title";
import { connect } from "dva";
import { UploadOutlined } from "@ant-design/icons";
import { sendMSGtoServer, sendMSGtoController } from "service/network";
import "./index.css";

const { TabPane } = Tabs;

const mapStateToProps = (state) => {
  return{
    currentRobot: state.index.robotStatus.currentRobot,
    showUploading: state.index.Backup.showUploading,
    Uploading: state.index.Backup.Uploading,

  }
};

function RecoverAndBackup (props) {
  const [ version ] = useState("20.02.04.11");
  const [ udiskState ] = useState("未插入");
  const [ fileList, setFileList] = useState([]);
  const [ uploading, setUploading] = useState(props.showUploading);
  const [ , setWhetherUp ] = useState(props.Uploading)
  const [ FormDatas, setFormDatas ] = useState('')
  
  // var totalPieces;
  // // first 2045
  // var bytesPerPiece = 2731 ;
  useEffect(()=>{
    let dataList = {
      version:"v1.0-rc1-67-gf34dae7"
    }
    sendMSGtoController("VERSIONNUM_INQUIRE",dataList)
  },[])
  // console.log(props)

  useEffect(()=>{
    setWhetherUp(props.Uploading)
  },[props.Uploading])

  useEffect(()=>{ 
    setUploading(props.showUploading)
  },[props.showUploading])

  const handleUpload = () => {
    const formData = new FormData();
    
    fileList.forEach((file) => {
      // console.log(file)
      formData.append("file", file);
    }); 
    // console.log(fileList[0])
    //   var reader = new FileReader();
    // console.log(fileList[0])
    // reader.readAsArrayBuffer(fileList[0]);//安字节读取文件并存储至二进制缓存区

    // reader.onload = function (e) {
    //   let result = e.target.result;
    //   let blob = new Blob([result])
    //   console.log(blob)
    // }

    // setFormDatas(formData)
    // 转化base64字符串上传
    var reader = new FileReader(); // 实例化文件读取对象
    reader.readAsDataURL(fileList[0]); // 将文件读取为 DataURL,也就是base64编码
    reader.onload = function(ev) { // 文件读取成功完成时触发
        var dataURL = this.result; // 获得文件读取成功后的DataURL,也就是base64编码
        setFormDatas(dataURL)
        var startNum = dataURL.indexOf('base64,');
        startNum = startNum*1+7;
        var baseStr = dataURL.slice(startNum);
        console.log(baseStr);
        console.log(dataURL)
    }

    // // setUploading(true);
    props.dispatch({
      type: "index/changeShowUploading",
      data: { showUploading:true },
    });
    // // console.log(formData,fileList)
    // // if(fileList[0].type != "application/x-zip-compressed"){
    // //   message.error("请选择正确的zip类型文件")
    // //   // setUploading(false)
    // //   props.dispatch({
    // //     type: "index/changeShowUploading",
    // //     data: { showUploading:false },
    // //   });
    // // }else{\
    // console.log(fileList[0])
      let sendData = {
        rbot:props.currentRobot,
        name:fileList[0].name,
        size:fileList[0].size
      }
      sendMSGtoServer("INQUIRE_UPGRADE_SYSTEM",sendData)
    // }
    return;

  };

  useEffect(()=>{
    // let appls = []
    if( props.Uploading === 'no' ){

      // 使用字符串的方式来分包上传文件
      // if( FormDatas != '' ){
      //   var start = 0;
      //   var end;
      //   var index = 0;
      //   totalPieces = Math.ceil(FormDatas.length / bytesPerPiece);
      //   // console.log(totalPieces)
      //   while( start < FormDatas.length ){
      //     // console.log(start,FormDatas.length)
      //     end = start + bytesPerPiece;
      //     let dataList = FormDatas.slice( start, end )
      //     console.log(dataList.length)
      //     sendMSGtoServer("UPLOADING_UPGRADE_SYSTEM",dataList)
      //     // appls.push(dataList)
      //     start = end ;
      //     index++;
      //   }
      //   if( start >= FormDatas.length ){
      //     sendMSGtoServer("UPLOADING_UPGRADE_SYSTEM",{ finish : true })
      //     props.dispatch({
      //       type: "index/changeShowUploading",
      //       data: { showUploading:false },
      //     });
      //     message.success('文件上传成功');
      //   }
      //   // console.log(typeof(FormDatas))
      //   // console.log(FormDatas.length)
      //   // console.log(FormDatas.toString())

      // //   // console.log(dataList)
        
      // // //   // for(let i = 1;i <= FormDatas.length/2097152; i++ ){
      // // //   //   console.log(i)
      // // //   // }
      // }
      // sendMSGtoServer("UPLOADING_UPGRADE_SYSTEM",FormDatas)

    }
    // console.log(appls)
    // console.log(JSON.parse(JSON.stringify(appls[0]+appls[1]+appls[2])))
  },[FormDatas,props.Uploading])

  // 获取当前版本号
  const inquireVersionNum = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList)
      props.dispatch({
        type: "index/changeShowUploading",
        data: { showUploading:false },
      });
    },
    
    beforeUpload: (file) => {
      setFileList([...fileList, file]) 
      return false;
    },
    fileList,

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
        subtitle="恢复与备份小标题"
      />
      {/* 主要内容 */}
      <div className="recoverandbackup">
        <p style={{paddingTop:10}}></p>
        <p style={{marginLeft:40}}>U盘状态：{udiskState}</p>
        <Tabs defaultActiveKey="1" style={{ background: "white" }}>
          <TabPane tab="升级系统" key="1">
            <p>当前软件版本：{version}</p>
            <div>
              <Upload {...inquireVersionNum}>
                <Button className="back-btn" type="primary">
                  <UploadOutlined /> 选择文件
                </Button>
              </Upload>
              <Button
                type="primary"
                onClick={handleUpload}
                disabled={fileList.length === 0}
                loading={uploading}
                style={{ marginTop: 16 }}
                className="back-btn"
              >
                {uploading ? "上传中,请勿做其它操作" : "点击上传"}
              </Button>
            </div>
          </TabPane>
          <TabPane tab="程序" key="2">
            <Button onClick={exportJobs} className="back-btn">导出程序</Button>
            <div style={{paddingTop:20}}>
              <Upload {...inquireVersionNum}>
                <Button className="back-btn">
                  <UploadOutlined /> 导入程序
                </Button>
              </Upload>
              <Button
                type="primary"
                onClick={handleUpload}
                disabled={fileList.length === 0}
                loading={uploading}
                style={{ marginTop: 16 }}
                className="back-btn"
              >
                {uploading ? "Uploading" : "Start Upload"}
              </Button>
            </div>
          </TabPane>
          <TabPane tab="参数" key="3" style={{display:"flex",flexDirection:"column",textAlign:"center"}}>
            <div><Button onClick={exportParameter} className="back-btn">导出参数</Button></div>
            <div style={{paddingTop:20}}><Button onClick={importParameter} className="back-btn">导入参数</Button></div>
          </TabPane>
          <TabPane tab="系统" key="4" style={{display:"flex",flexDirection:"column",textAlign:"center"}}>
            <div><Button onClick={backupSystem} className="back-btn">备份系统</Button></div>
            <div style={{paddingTop:20}}><Button onClick={recoverSystem} className="back-btn">恢复系统</Button></div>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}
export default connect(mapStateToProps)(RecoverAndBackup);