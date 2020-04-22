import React from "react";
import { Input } from "antd";
export const dataSource = [
    {
        key: "1",
        para: "电机转子位置补偿角",
        value: <Input />,
        reference: "11.1",
        unit: "mm"
    },
    {
        key: "2",
        para: "功率回路设定",
        value: <Input />,
        reference: "11.1",
        unit: "mm"
    },
    {
        key: "3",
        para: "电机额定功率",
        value: <Input />,
        reference: "11.1",
        unit: "mm"
    },
    {
        key: "4",
        para: "电机电压等级",
        value: <Input />,
        reference: "11.1",
        unit: "mm"
    },
];
export const columns = [
    {
        title: "参数名",
        dataIndex: "para",
        key: "para",
    },
    {
        title: "值",
        dataIndex: "value",
        key: "value",
    },
    {
        title: "参考值",
        dataIndex: "reference",
        key: "reference",
    },
    {
        title: "参考值",
        dataIndex: "unit",
        key: "unit",
    },
];