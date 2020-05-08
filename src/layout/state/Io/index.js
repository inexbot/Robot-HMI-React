import React from "react";
import echarts from "echarts/lib/echarts";
import { useEffect } from "react";
import "echarts/lib/chart/bar";
function IO() {
  useEffect(() => {
    var myChart = echarts.init(document.getElementById("charts2"));
    // 绘制图表
    myChart.setOption({
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      legend: {
        data: ["实际扭矩", "实际最大扭矩"],
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: {
        type: "value",
      },
      yAxis: {
        type: "category",
        data: [
          "J1",
          "J2",
          "J3",
          "J4",
          "J5",
          "J6",
          "J1",
          "O2",
          "O3",
          "O4",
          "O5",
          "O6",
        ],
      },
      series: [
        {
          name: "实际扭矩",
          type: "bar",
          stack: "总量",
          label: {
            show: true,
            position: "insideRight",
          },
          data: [320, 302, 301, 334, 390, 330, 320, 302, 301, 334, 390, 330],
        },
        {
          name: "实际最大扭矩",
          type: "bar",
          stack: "总量",
          label: {
            show: true,
            position: "insideRight",
          },
          data: [120, 132, 101, 134, 90, 230, 120, 132, 101, 134, 90, 230],
        },
      ],
    });
  }, []);
  return (
    <div className="quick-control-state">
      <h1>输入输出</h1>
      <div className="leftstate-content" id="charts2"></div>
    </div>
  );
}
export default IO;
