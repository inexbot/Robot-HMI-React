import React, { useEffect } from "react";
import echarts from 'echarts/lib/echarts';
import { connect } from "dva"
import { sendMSGtoController } from "service/network";

const mapStateToProps = (state) =>{
  return{
    MotorSpeed: state.index.mainState.MotorSpeed,
    currentRobot: state.index.robotStatus.currentRobot,
  }
}

function Rotation(props) {
  // 实时获取数据
  useEffect(()=>{
    let inquireTorque = setInterval(() => {
      sendMSGtoController("CURRENTVEL_INQUIRE",{robot:props.currentRobot})
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
          data: ['转速(转/min)', '最大转速(转/min)']
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
            name: '转速(转/min)',
            type: 'bar',
            data: [props.MotorSpeed.vel[6],props.MotorSpeed.vel[5],props.MotorSpeed.vel[4],
              props.MotorSpeed.vel[3],props.MotorSpeed.vel[2],props.MotorSpeed.vel[1],props.MotorSpeed.vel[0],
            ],
            label: seriesLabel,
        },
        {
            name: '最大转速(转/min)',
            type: 'bar',
            data: [props.MotorSpeed.maxVel[6],props.MotorSpeed.maxVel[5],props.MotorSpeed.maxVel[4],
              props.MotorSpeed.maxVel[3],props.MotorSpeed.maxVel[2],props.MotorSpeed.maxVel[1],props.MotorSpeed.maxVel[0]
            ],
            label: seriesLabel,
        }
      ]
    });
  }, [props.MotorSpeed]);
  return (
    <div className="quick-control-state">
      <h1>电机转速</h1>
      <div className="leftstate-content" id="charts7"></div>
    </div>
  );
}
export default connect(mapStateToProps)(Rotation);