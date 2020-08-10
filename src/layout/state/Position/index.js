import React, { useEffect, useState } from "react";
import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/bar";

function Position() {
  const [series, setseries] = useState([
    320,
    302,
    301,
    334,
    390,
    330,
    320,
    302,
    301,
    334,
    390,
    330
  ]);
  // 当前位置返回的数据
  //  let acc = {coord:0,deg:0,pos:[0.0,0.0,0.0,0.0,0.0,0.0,0.0],posDeg:[0.0,0.0,0.0,0.0,0.0,0.0,0.0],robot:1}
 
  useEffect(() => {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById("charts4"));
    // 绘制图表
    var good = setInterval(() => {
      console.log("预置点位");
    }, 2000);
    myChart.setOption({
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        data: ["实际扭矩", "实际最大扭矩"]
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
      },
      xAxis: {
        type: "value"
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
          "O6"
        ]
      },
      series: [
        {
          name: "实际扭矩",
          type: "bar",
          stack: "总量",
          label: {
            show: true,
            position: "insideRight"
          },
          data: series
        },
        {
          name: "实际最大扭矩",
          type: "bar",
          stack: "总量",
          label: {
            show: true,
            position: "insideRight"
          },
          data: [120, 132, 101, 134, 90, 230, 120, 132, 101, 134, 90, 230]
        }
      ]
    });
    return () => {
      clearInterval(good);
    };
  }, [series]);

  return (
    <div className="quick-control-state">
      <h1>当前位置</h1>
      <div className="leftstate-content" id="charts4"></div>
      <button
        onClick={() => {
          setseries([11, 22, 33, 334, 66, 55, 44, 302, 77, 88, 99, 10]);
        }}
      >
        dsdsds
      </button>
    </div>
  );
}
export default Position;
