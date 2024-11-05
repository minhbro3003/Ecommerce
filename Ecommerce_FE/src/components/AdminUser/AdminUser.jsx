import React from "react";
import { WrapperHeader } from "./style";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import TableComponent from "../TableComponent/TableComponent";

const AdminUser = () => {
    return (
        <div>
            <WrapperHeader>Quản lý người dùng</WrapperHeader>
            <div style={{ margin: "15px 0" }}>
                <Button
                    style={{
                        height: "150px",
                        width: "150px",
                        borderRadius: "6px",
                        borderStyle: "dashed",
                        marginBottom: "15px",
                    }}
                >
                    <PlusOutlined style={{ fontSize: "60px" }} />
                </Button>
                <div>
                    <TableComponent />
                </div>
            </div>
        </div>
    );
};

export default AdminUser;
