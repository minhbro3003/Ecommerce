import { Row, Col } from "antd";
import React from "react";
import {
    WrapperHeader,
    WrapperHeaderAccount,
    WrapperTextHeader,
    WrapperTextHeaderSmall,
} from "./style";
import Search from "antd/es/transfer/search";
import {
    UserOutlined,
    CaretDownOutlined,
    ShoppingCartOutlined,
} from "@ant-design/icons";
const HeaderComponent = () => {
    return (
        <div>
            <WrapperHeader gutter={16}>
                <Col span={6}>
                    <WrapperTextHeader>SHOP</WrapperTextHeader>
                </Col>
                <Col span={12}>
                    <Search
                        placeholder="input search text"
                        enterButton="Search"
                        size="large"
                        loading
                    />
                </Col>
                <Col span={6} style={{ display: "flex", gap: "15px" }}>
                    <WrapperHeaderAccount>
                        <UserOutlined style={{ fontSize: "30px" }} />
                        <div>
                            <WrapperTextHeaderSmall>
                                Đăng nhập/ Đăng ký
                            </WrapperTextHeaderSmall>
                            <div>
                                <WrapperTextHeaderSmall>
                                    Tài khoản
                                </WrapperTextHeaderSmall>
                                <CaretDownOutlined />
                            </div>
                        </div>
                    </WrapperHeaderAccount>
                    <div>
                        <ShoppingCartOutlined
                            style={{ fontSize: "30px", color: "#fff" }}
                        />
                        <WrapperTextHeaderSmall>
                            Giỏ hàng
                        </WrapperTextHeaderSmall>
                    </div>
                </Col>
            </WrapperHeader>
        </div>
    );
};

export default HeaderComponent;
