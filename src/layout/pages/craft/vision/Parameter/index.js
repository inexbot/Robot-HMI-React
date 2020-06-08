import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  notification,
  ConfigProvider,
  Select,
  Divider,
  Input,
  Modal,
  Switch
} from "antd";
import { connect } from "dva";
import "./index.css";


  const mapStateToProps = (state) => {
    return{
      
    }
  };

  function Parameter(props) {

    const { Option } = Select;
    const cameraNumchildren = [];
    for (let i = 1; i <10; i++) {
      cameraNumchildren.push(
        <Option key={i}>{  i}</Option>
      );
    } 
    const userNumchildren = []
    for (let i = 0; i<10; i++) {
      userNumchildren.push(
        <Option key={i}>{ i==0?"不使用":i }</Option>
      );
    }




    const handleChange =(value) => {
      // setCopycraftNum(Number(value))
      console.log(value)
    }
    const discernChange = (checked) => {
      console.log(`switch to ${checked}`);
    }
 

    return(
      <div style={{ background:"#fff",marginTop:"-30px",zIndex:"2",position:"relative",width:"100%" }}>
        <div className="top">
          <div className="camera">
            <p className="toptext">
              相机选择
            </p>
            <span> 工艺号: </span>
            <Select
                defaultValue="1"
                onChange={handleChange}
                style={{ width: 200 }}
              >
                {cameraNumchildren}
            </Select>
            <span>类型:</span>
            <Select
                defaultValue="customize"
                onChange={handleChange}
                style={{ width: 200 }}
              >
                {"customize"}
            </Select>
          </div>
          <div className="usercoordinates">
            <p className="topltext">
              用户坐标系
            </p>
            <span>用户坐标编号</span>
            <Select defaultValue="不使用" onChange={handleChange} style={{ width: 200 }} >
                {userNumchildren}
            </Select>
          </div>
        </div>
        <div className="content">
          <div className="content-l">  
            <div className="networkparam">
              <p className="content-ltext"> 网络参数 </p>
              <div className="content-ltop"> 控制器ip :
                <Select defaultValue="不使用" onChange={handleChange} style={{ width: 200 }} >
                    {userNumchildren}
                </Select>
              </div>
              <div className="content-lcenter">
                 端口数:
                 <Select defaultValue="不使用" onChange={handleChange} style={{ width: 200 }} >
                   {userNumchildren}
                 </Select>
                 相机:
                 <Select defaultValue="不使用" onChange={handleChange} style={{ width: 200 }} >
                   {userNumchildren}
                 </Select>
              </div>
              <div className="content-lbtm">
                  端口1:
                  <Select defaultValue="不使用" onChange={handleChange} style={{ width: 200 }} >
                    {userNumchildren}
                  </Select>
                  端口2:
                  <Select defaultValue="不使用" onChange={handleChange} style={{ width: 200 }} >
                    {userNumchildren}
                  </Select>
              </div>
            </div>
            <div className="connectparam">
              <p className="connectparam-ltext"> 连接参数</p>
              <div className="connectparam-ltop">
                帧头:
                <Select defaultValue="不使用" onChange={handleChange} style={{ width: 100 }} >
                    {userNumchildren}
                </Select>
                成功发送标志符:
                <Select defaultValue="不使用" onChange={handleChange} style={{ width: 100 }} >
                    {userNumchildren}
                </Select>
              </div>
              <div className="connectparam-lttop">
                分隔符:
                <Select defaultValue="不使用" onChange={handleChange} style={{ width: 100 }} >
                    {userNumchildren}
                </Select>
                失败发送标志符:
                <Select defaultValue="不使用" onChange={handleChange} style={{ width: 100 }} >
                    {userNumchildren}
                </Select>
              </div>
              <div className="connectparam-lcneter">
                结束符:
                <Select defaultValue="不使用" onChange={handleChange} style={{ width: 100 }} >
                    {userNumchildren}
                </Select>
                超时时间:
                <Select defaultValue="不使用" onChange={handleChange} style={{ width: 100 }} >
                    {userNumchildren}
                </Select>s
              </div>
              <div className="connectparam-lbtm">
                仅识别一个目标
                <Switch defaultChecked onChange={discernChange} />
                发送高度信息:
                <Switch defaultChecked onChange={discernChange} />
              </div>
            </div>
          </div>
          <div className="content-r">  
            <div className="content-rtop">
              <p className="content-rtoptext"> 触发方式 </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  export default connect(mapStateToProps)(Parameter)