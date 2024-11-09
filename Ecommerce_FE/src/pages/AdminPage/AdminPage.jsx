import { Menu } from "antd";
import React, { useState } from "react";
import { SettingOutlined, UserOutlined } from "@ant-design/icons";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import AdminUser from "../../components/AdminUser/AdminUser";
import AdminProduct from "../../components/AdminProduct/AdminProduct";

const AdminPage = () => {
    const items = [
        {
            key: "user",
            icon: <UserOutlined />,
            label: "Người dùng",
        },
        {
            key: "product",
            icon: <SettingOutlined />,
            label: "Sản phẩm",
        },
    ];

    const [keySelected, setKeySelected] = useState("");

    const renderPage = (key) => {
        switch (key) {
            case "user":
                return <AdminUser />;
            case "product":
                return <AdminProduct />;
            default:
                return <></>;
        }
    };
    const handleOnClick = ({ key }) => {
        setKeySelected(key);
    };
    console.log("keySelected", keySelected);

    return (
        <>
            <HeaderComponent isHidenSearch isHidenCart />
            <div style={{ display: "flex" }}>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={["231"]}
                    style={{
                        width: 256,
                        boxShadow: "3px -1px 2px #ccc",
                        position: "fixed",
                        top: "50px",
                        height: "100%",
                        overflowY: "auto",
                    }}
                    items={items}
                    onClick={handleOnClick}
                />
                <div
                    style={{
                        flex: 1,
                        padding: "15px",
                        marginLeft: "256px",
                        marginTop: "60px",
                    }}
                >
                    {renderPage(keySelected)}
                </div>
            </div>
        </>
    );
};

export default AdminPage;
