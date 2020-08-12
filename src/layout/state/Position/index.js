import React, { useEffect, useState } from "react";
import { Select, Button } from "antd";
import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/bar";
import 'echarts/lib/component/dataset';
import 'echarts/lib/component/title';
import { connect } from "dva";
import { sendMSGtoController } from "service/network";

const mapStateToProps = (state) => {
  return{
    currentRobot: state.index.robotStatus.currentRobot,
    GlobalLocationObj: state.index.location.GlobalLocationObj,
    robotStatus: state.index.robotStatus,
  }
}

function Position(props) {
  const [ NowloaNum, setNowloaNum ] = useState(0);
  const [ NowType, setNowType ] = useState(['J1','J2','J3','J4','J5','J6'])
  const { Option } = Select;
  // 当前位置返回的数据
  //  let acc = {coord:0,deg:0,pos:[0.0,0.0,0.0,0.0,0.0,0.0,0.0],posDeg:[0.0,0.0,0.0,0.0,0.0,0.0,0.0],robot:1}
  console.log(NowloaNum)
  // 获取关节,直角，工具，用户参数
  useEffect(()=>{
    let dataList = {
      coord:NowloaNum,
      robot:props.currentRobot
    }
    sendMSGtoController("CURRENTPOS_INQUIRE",dataList)
    let TimeSert = setInterval(() => {
      sendMSGtoController("CURRENTPOS_INQUIRE",dataList)
    }, 600);
    return ()=>{
      clearInterval(TimeSert)
    }
  },[props.currentRobot,NowloaNum])

  useEffect(()=>{
    if( NowloaNum === 0 ){
      setNowType(['J1','J2','J3','J4','J5','J6'])
    }else if( NowloaNum === 1 ){
      setNowType(['X','Y','Z','A','B','C'])
    }else if( NowloaNum === 2 ){
      setNowType(['TX','TY','TZ','TA','TB','TC'])
    }else{
      setNowType(['UX','UY','UZ','UA','UB','UC'])
    }
  },[NowloaNum])

  useEffect(() => {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById("charts4"));
    var canvas = document.createElement('canvas');
    // 绘制图表
    var good = setInterval(() => {
      console.log("预置点位");
    }, 2000);
    myChart.setOption({
      backgroundColor: {
        type: 'pattern',
        image: canvas,
        repeat: 'repeat'
      },
      // 上边三个颜色提示
      legend: {
        data: ['关节值', '当前值','量距值']
      },
      grid: [{
        top:30,
        bottom: '50%',
        left: 10,
        containLabel: true
      }, {
        top: '52%',
        bottom: 0,
        left: 10,
        containLabel: true
      }],
      xAxis: [{
        type: 'value',
        splitLine: {
          show: false
        }
      }, {
        type: 'value',
        gridIndex: 1,
        splitLine: {
            show: false
        }
      }],
      yAxis: [{
        type: 'category',
        data: [ 'J1','J2','J3','J4','J5','J6','O1' ],
        axisLabel: {
            interval: 0,
            rotate: 30
        },
        splitLine: {
            show: true
        }
      }, {
        gridIndex: 1,
        type: 'category',
        data: [ NowType[0],NowType[1],NowType[2],NowType[3],NowType[4],NowType[5],'O1' ],
        axisLabel: {
            interval: 0,
            rotate: 30
        },
        splitLine: {
            show: true
        }
      }],
      series: [{
        name:'关节值',
        type: 'bar',
        stack: 'chart',
        z: 3,
        label: {
          normal: {
            show: true,
            textBorderWidth: 2
        }
        },
        data:[ props.GlobalLocationObj.posValue[7],props.GlobalLocationObj.posValue[8],props.GlobalLocationObj.posValue[9],props.GlobalLocationObj.posValue[10],
          props.GlobalLocationObj.posValue[11],props.GlobalLocationObj.posValue[12],0]
        },  {
          name:'当前值',
          type: 'bar',
          stack: 'component',
          xAxisIndex: 1,
          yAxisIndex: 1,
          z: 3,
          label: {
            normal: {
              show: true,
              textBorderWidth: 2
            }
          },
          data:[props.robotStatus.pos[0],props.robotStatus.pos[1],props.robotStatus.pos[2],props.robotStatus.pos[3],props.robotStatus.pos[4],props.robotStatus.pos[5],0]
        },  {
          name:'量距值',
          type: 'bar',
          stack: 'component',
          xAxisIndex: 1,
          yAxisIndex: 1,
          z: 3,
          label: {
            normal: {
              show: true,
              textBorderWidth: 2
          }
        },
        data: [0,0,0,0,0,0,0]
      }]
    });
    return () => {
      clearInterval(good);
    };
  }, [props.robotStatus.pos,props.GlobalLocationObj,NowType]);

  return (
    <div className="quick-control-state">
      <div style={{ display:'flex',alignItems:'center',justifyContent:'space-around' }}>
        <h1 style={{ margin:0,padding:0 }}>当前机器坐标</h1>
        <h3 style={{ margin:0,padding:0 }}>当前机器人：{props.currentRobot}</h3>
      </div>
      <div style={{ display:'flex',alignItems:'center',justifyContent:'space-around' }}>
        坐标系：
        <Select value={NowloaNum} style={{ width:90,margin:' 5px 0 5px -20px' }} onChange={(value)=>{ setNowloaNum(value) }}>
          <Option value={0}>关节</Option>
          <Option value={1}>直角</Option>
          <Option value={2}>工具</Option>
          <Option value={3}>用户</Option>
        </Select>
        <Button type='primary'>
          检测量距
        </Button>
      </div>
      <div className="leftstate-content" id="charts4"></div>
    </div>
  );
}
export default connect(mapStateToProps)(Position);
