import { Badge, Button, Col, Popover } from "antd";
import React, { useState } from "react";
import {
    WrapperContentPopup,
    WrapperHeader,
    WrapperHeaderAccount,
    WrapperTextHeader,
    WrapperTextHeaderSmall,
} from "./style";
import {
    UserOutlined,
    CaretDownOutlined,
    ShoppingCartOutlined,
} from "@ant-design/icons";
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from "../../services/UserSevice";
import { resetUser } from "../../redux/slides/useSlide";
import Loading from "../LoadingComponent/Loading";

const HeaderComponent = () => {
    const navigate = useNavigate();
    const dispath = useDispatch();
    const [loading, setLoading] = useState(false);
    const user = useSelector((state) => state.user);
    console.log("user count: ", user);

    const handleNavigateLogin = () => {
        navigate("/sign-in");
    };

    const handleLogout = async () => {
        setLoading(true);
        await UserService.logoutUser();
        dispath(resetUser());
        setLoading(false);
    };

    const content = (
        <div>
            <WrapperContentPopup onClick={handleLogout}>
                Đăng xuất
            </WrapperContentPopup>
            <WrapperContentPopup onClick={() => navigate("/profile-user")}>
                Thông tin người dùng
            </WrapperContentPopup>
        </div>
    );

    return (
        <div
            style={{
                width: "100%",
                background: "rgb(26, 148, 255",
            }}
        >
            <WrapperHeader>
                <Col span={5}>
                    <WrapperTextHeader>SHOP</WrapperTextHeader>
                </Col>
                <Col span={13}>
                    <ButtonInputSearch
                        placeholder="input search text"
                        textButton="Tìm kiếm"
                        size="large"
                        loading
                    />
                </Col>
                <Col
                    span={6}
                    style={{
                        display: "flex",
                        gap: "15px",
                        alignItems: "center",
                    }}
                >
                    <Loading isLoading={loading}>
                        <WrapperHeaderAccount>
                            <UserOutlined style={{ fontSize: "30px" }} />
                            {user?.access_token ? (
                                <>
                                    <Popover content={content} trigger="click">
                                        <div style={{ cursor: "pointer" }}>
                                            {user.name ||
                                                user.email ||
                                                user.email ||
                                                "User"}
                                        </div>
                                    </Popover>
                                </>
                            ) : (
                                <div
                                    onClick={handleNavigateLogin}
                                    style={{ cursor: "pointer" }}
                                >
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
                            )}
                        </WrapperHeaderAccount>
                    </Loading>
                    <div>
                        <Badge count={4} size="small">
                            <ShoppingCartOutlined
                                style={{ fontSize: "30px", color: "#fff" }}
                            />
                        </Badge>
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
