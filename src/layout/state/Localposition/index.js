import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { connect } from "dva";
import { posName } from "layout/pages/Instruct/renderPos";

const mapStateToProps = (state) => {
  return {
    program: state.index.program,
  };
};

function LocalPosition(props) {
  const [dataSource, setDataSource] = useState([]);
  const columns = [
    {
      title: "变量名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "坐标系",
      dataIndex: "coord",
      key: "coord",
    },
    {
      title: "值",
      dataIndex: "value",
      key: "value",
    },
  ];
  useEffect(() => {
    let a;
    if (
      props.program.var !== undefined &&
      props.program.var.position !== undefined
    ) {
      a = props.program.var.position;
    } else {
      a = [];
    }
    let b = [];
    let num = 0;
    a.map((value) => {
      let c;
      switch (value[0]) {
        case 0:
          c = "关节";
          break;
        case 1:
          c = "直线";
          break;
        case 2:
          c = "工具";
          break;
        case 3:
          c = "用户";
          break;
        default:
          break;
      }
      let d = value.slice(2);
      console.log(d);
      let e = d.join(",");
      let name = posName(num);
      b.push({
        key: num,
        name: name,
        coord: c,
        value: e,
      });
      num = num + 1;
      return value;
    });
    setDataSource(b);
  }, [props.program.var]);
  return <Table columns={columns} dataSource={dataSource} />;
}
export default connect(mapStateToProps)(LocalPosition);
