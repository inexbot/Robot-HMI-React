import React, { useState, useEffect, useRef } from "react";
import { VariableSizeGrid as Grid } from "react-window";
import ResizeObserver from "rc-resize-observer";
import classNames from "classnames";
import { Table } from "antd";
import "./table.css";

export default function VirtualTable(props) {
  const { columns, scroll, className } = props;
  const [tableWidth, setTableWidth] = useState(0);
  const widthColumnCount = columns.filter(({ width }) => !width).length;
  const mergedColumns = columns.map((column) => {
    if (column.width) {
      return column;
    }

    return { ...column, width: Math.floor(tableWidth / widthColumnCount) };
  });
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

  const renderVirtualList = (rawData, { scrollbarSize, ref, onScroll }) => {
    ref.current = connectObject;
    return (
      <Grid
        ref={gridRef}
        className='virtual-grid'
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
        }}>
        {({ columnIndex, rowIndex, style }) => {
          return (
            <div
              className={classNames("virtual-table-cell", {
                "virtual-table-cell-last":
                  columnIndex === mergedColumns.length - 1,
              })}
              style = { style }
              >
              {rawData[rowIndex][mergedColumns[columnIndex].dataIndex]}
            </div>
          );
        }}
      </Grid>
    );
  };
  const resetVirtualGrid = () => {
    gridRef.current.resetAfterIndices({
      columnIndex: 0,
      shouldForceUpdate: false,
    });
  };

  useEffect(() => resetVirtualGrid, []);
  useEffect(() => resetVirtualGrid, [tableWidth]);
  return (
    <ResizeObserver
      onResize={({ width }) => {
        setTableWidth(width);
      }}>
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
      />
    </ResizeObserver>
  );
} // Usage
