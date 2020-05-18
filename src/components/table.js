import React, { useState, useEffect, useRef } from "react";
import { VariableSizeGrid as Grid } from "react-window";
import ResizeObserver from "rc-resize-observer";
import classNames from "classnames";
import { Table } from "antd";
import { connect } from "dva";
import "./table.css";

const mapStateToProps = (state) => {
  return {
    List: state.App.programSeletedRow,
    pargram: state.index.program,
    programBoth: state.App.programBoth,
    programList: state.App.programList,
  };
};

function VirtualTable(props) {
  const [dataList, setDataList] = useState([]);
  const { columns, scroll, className } = props;
  const [addls, setAddls] = useState(-1);

  const [addnum, setAddnum] = useState(0);
  const [tableWidth, setTableWidth] = useState(0);
  const widthColumnCount = columns.filter(({ width }) => !width).length;
  const mergedColumns = columns.map((column) => {
    if (column.width) {
      return column;
    }

    return { ...column, width: Math.floor(tableWidth / widthColumnCount) };
  });
  useEffect(() => {
    props.programList.splice(0);
    props.programList.push(...props.dataSource);
  });
  // console.log(props)
  // console.log(VirtualTable)
  // console.log(props.programBoth)
  const gridRef = useRef();
  const [connectObject] = useState(() => {
    const obj = {};
    Object.defineProperty(obj, "scrollLeft", {
      get: () => null,
      set: (scrollLeft) => {
        if (gridRef.current) {
          gridRef.current.scrollTo({
            scrollLeft,
          });
        }
      },
    });
    return obj;
  });
  console.log(gridRef);

  const customizeRenderEmpty = () => (
    <div style={{ textAlign: "center" }}>
      <p>空程序，请插入指令</p>
    </div>
  );

  const renderVirtualList = (rawData, { scrollbarSize, ref, onScroll }) => {
    console.log(rawData);
    if (props.pargram.instruct == undefined) {
      rawData.splice(0);
    }
    setDataList(rawData);
    ref.current = connectObject;
    return (
      <Grid
        ref={gridRef}
        className="virtual-grid"
        columnCount={mergedColumns.length}
        columnWidth={(index) => {
          const { width } = mergedColumns[index];
          return index === mergedColumns.length - 1
            ? width - scrollbarSize - 1
            : width;
        }}
        height={scroll.y}
        rowCount={rawData.length}
        rowHeight={() => 100}
        width={tableWidth}
        onScroll={({ scrollLeft }) => {
          onScroll({
            scrollLeft,
          });
        }}
      >
        {({ columnIndex, rowIndex, style }) => {
          let styleod = { background: "#e6f7ff" };
          let stylesh = { lineHeight: "100px", ...style };
          let stylebd = {
            ...style,
            ...styleod,
            ...stylesh,
          };
          return (
            <div
              className={classNames(
                `virtual-table-cell${rawData[rowIndex].order}`
              )}
              //根据select来显示选中时候的样式
              style={rawData[rowIndex].select ? stylebd : stylesh}
              onClick={(e) => {
                //点击每一行
                if (rawData[0].moreBtn == false) {
                  rawData.map((item, index) => {
                    item.select = false;
                  });
                  rawData[rowIndex].select = !rawData[rowIndex].select;
                  setAddnum(addnum + 1);
                  // console.log(props)
                  // console.log(rawData)
                  props.List.splice(0);
                  props.dataSource.map((item, index) => {
                    if (item.select) {
                      props.List.push(item);
                    }
                  });
                } else if (rawData[0].moreBtn == true) {
                  rawData[rowIndex].select = !rawData[rowIndex].select;
                  setAddnum(addnum + 1);
                  props.List.splice(0);
                  props.dataSource.map((item, index) => {
                    if (item.select == true) {
                      // console.log(item)
                      // item = {name:item.insName,para:item.paras}
                      props.List.push(item);
                    }
                  });
                }
              }}
            >
              {rawData[rowIndex][mergedColumns[columnIndex].dataIndex]}
            </div>
          );
        }}
      </Grid>
    );
  };
  const resetVirtualGrid = () => {
    //对服务器返回的列表数据进行显示
    if (gridRef.current === undefined || null) {
    } else {
      gridRef.current.resetAfterIndices({
        columnIndex: 0,
        shouldForceUpdate: false,
      });
    }
  };

  useEffect(() => resetVirtualGrid, []);
  useEffect(() => resetVirtualGrid, [tableWidth]);
  return (
    <ResizeObserver
      onResize={({ width }) => {
        setTableWidth(width);
      }}
    >
      <Table
        dataSource={props.dataSource}
        scroll={props.scroll}
        className={classNames(className, "virtual-table")}
        columns={mergedColumns}
        pagination={false}
        components={{
          body: renderVirtualList,
        }}
        onRow={props.onRow}
        onHeaderRow={(column) => {
          return {
            onClick: () => {
              // console.log(props.List)
              // 点击表头行

              if (column[1].title.props.children[3] == "") {
                setAddnum(addnum + 1);
              } else if (column[1].title.props.children[3].props) {
                dataList.map((item, index) => {
                  item.select = !item.select;
                  setAddnum(addnum + 1);
                });
                // console.log(props.dataSource)
                props.List.splice(0);
                props.dataSource.map((item, index) => {
                  if (item.select == true) {
                    // item = {name:item.insName,para:item.paras}
                    props.List.push(item);
                  }
                });
              }
              // console.log(props.List)
              // console.log(props.List)
            },
          };
        }}
      />
    </ResizeObserver>
  );
} // Usage

export default connect(mapStateToProps)(VirtualTable);
