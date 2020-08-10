import React, { useEffect } from "react";
import echarts from 'echarts/lib/echarts';
function Rotation() {
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
            data: [10, 50, 40, 30, 20, 10,20],
            label: seriesLabel,
        },
        {
            name: '最大转速(转/min)',
            type: 'bar',
            data: [60, 40, 9, 5, 30, 20,20],
            label: seriesLabel,
        }
      ]
    });
  }, []);
  return (
    <div className="quick-control-state">
      <h1>电机转速</h1>
      <div className="leftstate-content" id="charts7"></div>
    </div>
  );
}
export default Rotation;
