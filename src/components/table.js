import React, { useState, useEffect, useRef } from "react";
import { VariableSizeGrid as Grid } from "react-window";
import ResizeObserver from "rc-resize-observer";
import classNames from "classnames";
import { Table } from "antd";
import "./table.css";

export default function VirtualTable(props) {
  const [ dataList, setDataList ] = useState([])
  const { columns, scroll, className } = props;
  const [ addls, setAddls] = useState(-1)
  const [ addnum, setAddnum ] = useState(0)
  const [tableWidth, setTableWidth] = useState(0);
  const widthColumnCount = columns.filter(({ width }) => !width).length;
  const mergedColumns = columns.map((column) => {
    if (column.width) {
      return column;
    }

    return { ...column, width: Math.floor(tableWidth / widthColumnCount) };
  });

  // console.log(mergedColumns)
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
    setDataList(rawData)
    ref.current = connectObject;
    // let apt = rawData.map((index,item)=>{
    //   console.log(index,item)
    // })
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
          let styleod = { background:"#e6f7ff" }
          let stylesh = { lineHeight:"100px",...style }
          let stylebd = {
            ...style,
            ...styleod,
            ...stylesh
          }
          return (
            <div 
              className={classNames(`virtual-table-cell${rawData[rowIndex].order}`)}
              style =  {  rawData[rowIndex].select?  stylebd : stylesh}
              onClick={(e)=>{
                // console.log(props)
                // console.log(rawData)
                if(rawData[0].moreBtn == false){
                  // console.log('ssssssss')
                  // rawData[rowIndex].select = 
                  rawData.map((item,index)=>{
                    item.select = false
                  })
                  rawData[rowIndex].select = !rawData[rowIndex].select
                  setAddnum(addnum+1)
                } else{
                  // if(rawData[0].agaiBtn == )
                 rawData[rowIndex].select = !rawData[rowIndex].select
                 setAddnum(addnum+1)
                }
                // console.log(rawData[rowIndex][mergedColumns[columnIndex].dataIndex])
                // console.log(rawData[rowIndex],style)
                // setAddls(rawData[rowIndex].order)
                // console.log(rawData[rowIndex].select)
                // console.log(rawData[rowIndex].allList)
                // rawData[rowIndex].select = !rawData[rowIndex].select
                // setAddnum(addnum+1)
                // console.log(e.target.style,'111')
                // setRawDatas(!rawDatas)
                // console.log( rawData[rowIndex])
                // console.log(addls,rawData[rowIndex].order)
                // console.log(e.target)
                // console.log(apt)
                // console.log(rawData)
              }}
              >
              {rawData[rowIndex][mergedColumns[columnIndex].dataIndex]}
              {/* <td> */}
              {/* {rawData[rowIndex][mergedColumns[columnIndex].dataIndex]} */}
              {/* {rawData[rowIndex].order}
              </td>
              <td> { rawData[rowIndex].name } </td>
              <td> { rawData[rowIndex].para } </td> */}
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
        onHeaderRow={ (column) => {
          // console.log(column)
          // console.log(column[1].title.props.children[3].props.children)
          return {
            onClick: () => {
              // console.log( column[1].title.props.children[2].props)
              // console.log(props)
              // column[1].title.props.children[2].props.onClick=()=>{
              //   console.log('sss')
              // }
              // console.log(column[1].title.props.children[2])
              if(column[1].title.props.children[3].props.children === '反选'){
                // console.log('haha')
                // console.log(rawData)
                console.log(dataList)
                dataList.map((item,index)=>{
                  // console.log(item)
                  item.select = !item.select
                  // console.log(item.select)
                  setAddnum(addnum+1)
                })
                // console.log(dataList)
              }
              // if(column[1].title.props.children[1].props.children == '全选'){
              //   dataList.map((item,index)=>{
              //     // console.log(item)
              //     item.select = true
              //     setAddnum(addnum+1)
              //   })
              // }else{
              //   dataList.map((item,index)=>{
              //     // console.log(item)
              //     item.select = false
              //     setAddnum(addnum+1)
              //   })
              // }
            }, // 点击表头行
            
          };
        }}
      />
    </ResizeObserver>
  );
} // Usage
