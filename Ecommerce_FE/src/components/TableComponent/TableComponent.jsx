import { Table } from "antd";
import React, { useState } from "react";
import Loading from "../LoadingComponent/Loading";

const TableComponent = (props) => {
    const {
        selectionType = "checkbox",
        data = [],
        isLoading = false,
        columns = [],
        pagination = {
            pageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ["5", "10", "20", "50"],
        },
        handleDeleteManyProduct,
    } = props;
    const [rowSelectedKeys, setRowSelecteKeys] = useState([]);

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setRowSelecteKeys(selectedRowKeys);
        },
    };

    const handleDeleteAll = () => {
        handleDeleteManyProduct(rowSelectedKeys);
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

            <Table
                rowSelection={{
                    type: selectionType,
                    ...rowSelection,
                }}
                columns={columns}
                dataSource={data}
                pagination={pagination}
                {...props}
            />
        </Loading>
    );
};

export default TableComponent;
