import React, { useState, useEffect } from "react";
import intl from "react-intl-universal";
import { Tabs, Button, Upload, message } from "antd";
import ConTitle from "components/title";
import { connect } from "dva";
import { sendMSGtoController , sendMSGtoServer } from "service/network";
import { UploadOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;

const mapStateToProps = (state) => {
  return{
    currentRobot: state.index.robotStatus.currentRobot,
    showUploading: state.index.Backup.showUploading,
    Uploading: state.index.Backup.Uploading,

  }
};

function RecoverAndBackup (props) {
  const [ version, setVersion] = useState("20.02.04.11");
  const [ udiskState, setUdiskState] = useState("未插入");
  const [ fileList, setFileList] = useState([]);
  const [ uploading, setUploading] = useState(props.showUploading);
  const [ WhetherUp, setWhetherUp ] = useState(props.Uploading)
  const [ FormDatas, setFormDatas ] = useState('')
  
  var totalPieces;
  var bytesPerPiece = 1048574;
  useEffect(()=>{
    let dataList = {
      version:"v1.0-rc1-67-gf34dae7"
    }
    // sendMSGtoController("VERSIONNUM_INQUIRE",dataList)
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
    console.log(fileList[0])

    // 转化base64字符串上传
    setFormDatas(formData)
    var reader = new FileReader(); // 实例化文件读取对象
    reader.readAsDataURL(fileList[0]); // 将文件读取为 DataURL,也就是base64编码
    reader.onload = function(ev) { // 文件读取成功完成时触发
        var dataURL = ev.target.result; // 获得文件读取成功后的DataURL,也就是base64编码
        setFormDatas(dataURL)
        // console.log(dataURL + dataURL)
    }

    
    // // setUploading(true);
    // props.dispatch({
    //   type: "index/changeShowUploading",
    //   data: { showUploading:true },
    // });
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


    // 分包直接发送文件
    // var blob = document.getElementById("file").files[0];
    // console.log(blob)
    // var start = 0;
    // var end;
    // var index = 0;
    // var filesize = blob.size;
    // var filename = blob.name;
    // // 文件切片的总数
    // totalPieces = Math.ceil(filesize / bytesPerPiece);
    // console.log(totalPieces)
    // while ( start < filesize ){
    //   console.log(start,filesize)
    //   end = start + bytesPerPiece;
    //   if(end > filesize) {
    //     end = filesize;
    //   }
    //   var chunk = blob.slice(start,end);//切割文件  
    //   var sliceIndex= blob.name + index;
    //   var formData = new FormData();
    //   formData.append("file", chunk, filename);
    //   sendMSGtoServer('UPLOADING_UPGRADE_SYSTEM',formData)
    //   console.log(formData)
    //   start = end;
    //   index++;
    // }

  };
  // useEffect(()=>{
  //   if( WhetherUp != 'no' ){
  //     let DataList = {
  //       finish:false,
  //       sendData:FormDatas
  //     }
  //     sendMSGtoServer('UPLOADING_UPGRADE_SYSTEM',DataList)
  //   }
  // },[WhetherUp])

  // const Upload = () =>{
  //   console.log(fileList[0])
    
  // }

  var reader = null;  //读取操作对象
  var step = 1024 * 1024 * 2;  //每次读取文件大小 ,字节数
  var cuLoaded = 0; //当前已经读取总数
  var file = null; //当前读取的文件对象
  var total = 0;        //记录当前文件总字节数
  useEffect(()=>{
    // let appls = []
    if( props.Uploading == 'yes' ){

      // 使用ArrayBuffer发送
      // file = fileList[0];
      // total = file.size;
      // console.info("文件大小：" + file.size);
      // bindReader()

      // // 绑定reader
      // const bindReader = () =>{
      //   bindReader = 0;
      //   reader = new FileReader();
      //   // 读取一段成功
      //   reader.onload = function (e) {
      //     console.info('读取总数：' + e.loaded);
      //     // 继续读取
      //     loadSuccess(e.loaded);
      //   }
      //   // 开始读取
      //   readBlob()
      // }

      // // 读取文件成功处理
      // const loadSuccess = (loaded) =>{
      //   var blob = reader.result;

      // }

      // 使用字符串的方式来分包上传文件
      if( FormDatas != '' ){
        var start = 0;
        var end;
        var index = 0;
        totalPieces = Math.ceil(FormDatas.length / bytesPerPiece);
        console.log(totalPieces)
        while( start < FormDatas.length ){
          console.log(start,FormDatas.length)
          end = start + bytesPerPiece;
          let dataList = FormDatas.slice( start, end )
          console.log(dataList.length)

          sendMSGtoServer("UPLOADING_UPGRADE_SYSTEM",dataList)
          // appls.push(dataList)
          start = end ;
          index++;
        }
        if( start >= FormDatas.length ){
          sendMSGtoServer("UPLOADING_UPGRADE_SYSTEM",{ finish : true })
        }
        // console.log(typeof(FormDatas))
        // console.log(FormDatas.length)
        // console.log(FormDatas.toString())

        // console.log(dataList)
        
      //   // for(let i = 1;i <= FormDatas.length/2097152; i++ ){
      //   //   console.log(i)
      //   // }
      }
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
      <input type="file" name="file" id="file" />
      <button id="upload" onClick={handleUpload}>upload</button>
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
              <Upload {...inquireVersionNum}>
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
              <Upload {...inquireVersionNum}>
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
export default connect(mapStateToProps)(RecoverAndBackup);