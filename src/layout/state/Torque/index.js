import React, { useEffect } from "react";
import echarts from 'echarts/lib/echarts';
import { connect } from "dva";
import { sendMSGtoController } from "service/network";

const mapStateToProps = (state)=>{
  return{
    MotorTorque: state.index.mainState.MotorTorque,
    currentRobot: state.index.robotStatus.currentRobot,
  }
}

function Torque( props ) {
  // 实时获取数据
  useEffect(()=>{
    let inquireTorque = setInterval(() => {
      sendMSGtoController("CURRENTTORQ_INQUIR",{robot:props.currentRobot})
    }, 500);
    return()=>{
      clearInterval(inquireTorque)
    }
  },[props.currentRobot])
  // 渲染柱状图
  useEffect(() => {
    var seriesLabel = {
      normal: {
          show: true,
          textBorderColor: '#333',
          textBorderWidth: 2
      }
    }
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById("charts7"));
    // 绘制图表
    myChart.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
      },
      legend: {
          data: ['扭矩(%)', '最大扭矩(%)']
      },
      grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
      },
      xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
      },
      yAxis: {
          type: 'category',
          data: ['01', 'j6', 'j5', 'j4', 'j3', 'j2', 'j1']
      },
      series: [
        {
            name: '扭矩(%)',
            type: 'bar',
            data: [props.MotorTorque.torq[6],props.MotorTorque.torq[5],props.MotorTorque.torq[4],
              props.MotorTorque.torq[3],props.MotorTorque.torq[2],props.MotorTorque.torq[1],props.MotorTorque.torq[0],
            ],
            label: seriesLabel,
        },
        {
            name: '最大扭矩(%)',
            type: 'bar',
            data: [props.MotorTorque.maxTorq[6],props.MotorTorque.maxTorq[5],props.MotorTorque.maxTorq[4],
              props.MotorTorque.maxTorq[3],props.MotorTorque.maxTorq[2],props.MotorTorque.maxTorq[1],props.MotorTorque.maxTorq[0]
            ],
            label: seriesLabel,
        }
      ]
    });
  }, [props.MotorTorque]);
  return (
    <div className="quick-control-state">
      <h1>电机扭矩</h1>
      <div className="leftstate-content" id="charts7"></div>
    </div>
  );
}
export default connect(mapStateToProps)(Torque) ;
