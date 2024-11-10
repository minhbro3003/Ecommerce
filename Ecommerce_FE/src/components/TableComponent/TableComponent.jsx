import { Table } from "antd";
import React, { useMemo, useState } from "react";
import Loading from "../LoadingComponent/Loading";
// import { Excel } from "antd-table-saveas-excel";
import * as XLSX from "xlsx";

const TableComponent = (props) => {
    const {
        selectionType = "checkbox",
        data: dataSource = [],
        isLoading = false,
        columns = [],
        pagination = {
            pageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ["5", "10", "20", "50"],
        },
        handleDeleteMany,
    } = props;
    const [rowSelectedKeys, setRowSelecteKeys] = useState([]);
    const newColumnsExport = useMemo(() => {
        const arr = columns?.filter((col) => col.dataIndex !== "action");
        return arr;
    }, [columns]);
    console.log("new columns export", newColumnsExport);

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setRowSelecteKeys(selectedRowKeys);
        },
    };

    const handleDeleteAll = () => {
        handleDeleteMany(rowSelectedKeys);
    };

    // const handleExportExcel = () => {
    //     const excel = new Excel();
    //     excel
    //         .addSheet("test")
    //         .addColumns(newColumnsExport)
    //         .addDataSource(dataSource, {
    //             str2Percent: true,
    //         })
    //         .saveAs("Excel.xlsx");
    // };

    const handleExportExcel = () => {
        // Lọc các cột hiển thị trên bảng (các cột có dataIndex)
        const visibleColumns = columns.filter((col) => col.dataIndex);

        // Lấy danh sách các dataIndex cần xuất ra
        const columnsToExport = visibleColumns.map((col) => col.dataIndex);

        // Lọc dữ liệu (dataSource) chỉ lấy các trường có dataIndex trong visibleColumns
        const filteredDataSource = dataSource.map((row) => {
            const filteredRow = {};
            columnsToExport.forEach((dataIndex) => {
                if (row.hasOwnProperty(dataIndex)) {
                    filteredRow[dataIndex] = row[dataIndex];
                }
            });
            return filteredRow;
        });

        // Chuyển đổi dữ liệu thành sheet Excel
        const ws = XLSX.utils.json_to_sheet(filteredDataSource);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

        // Xuất file Excel
        XLSX.writeFile(wb, "Excel.xlsx");
    };

    return (
        <Loading isLoading={isLoading}>
            {rowSelectedKeys.length > 0 && (
                <div
                    style={{
                        background: "#395F18",
                        color: "#FEF6C7",
                        fontWeight: "bold",
                        padding: "10px",
                        cursor: "pointer",
                    }}
                    onClick={handleDeleteAll}
                >
                    Xóa tất cả
                </div>
            )}
            <button onClick={handleExportExcel}>Export excel</button>
            <Table
                rowSelection={{
                    type: selectionType,
                    ...rowSelection,
                }}
                columns={columns}
                dataSource={dataSource}
                pagination={pagination}
                {...props}
            />
        </Loading>
    );
};

export default TableComponent;
