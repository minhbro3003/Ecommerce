import { Badge, Col, Popover } from "antd";
import React, { useEffect, useState } from "react";
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
import { searchProduct } from "../../redux/slides/productSlide";

const HeaderComponent = ({ isHidenSearch = false, isHidenCart = false }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [userName, setUserName] = useState("");
    const [userAvartar, setUserAvartar] = useState("");
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const user = useSelector((state) => state.user);
    // console.log("user count: ", user);

    const handleNavigateLogin = () => {
        navigate("/sign-in");
    };

    const handleLogout = async () => {
        setLoading(true);
        navigate("/");
        await UserService.logoutUser();
        dispatch(resetUser());
        setLoading(false);
    };

    useEffect(() => {
        setLoading(true);
        setUserName(user?.name);
        setUserAvartar(user?.avartar);
        setLoading(false);
    }, [user?.name, user?.avartar]);

    const content = (
        <div>
            <WrapperContentPopup onClick={() => navigate("/profile-user")}>
                Thông tin người dùng
            </WrapperContentPopup>
            {user?.isAdmin && (
                <WrapperContentPopup onClick={() => navigate("/system/admin")}>
                    Quản lý hệ thống
                </WrapperContentPopup>
            )}
            <WrapperContentPopup onClick={handleLogout}>
                Đăng xuất
            </WrapperContentPopup>
        </div>
    );

    const onSearch = (e) => {
        setSearch(e.target.value);
        dispatch(searchProduct(e.target.value));
        // console.log("e", e.target.value);
    };

    // console.log("user: ", user.name.length);
    return (
        <div
            style={{
                width: "100%",
                background: "rgb(26, 148, 255",
            }}
        >
            <WrapperHeader
                style={{
                    justifyContent:
                        isHidenSearch && isHidenCart
                            ? "space-between"
                            : "unset",
                }}
            >
                <Col span={5}>
                    <WrapperTextHeader
                        onClick={() => navigate("/")}
                        style={{ cursor: "pointer" }}
                    >
                        SHOP
                    </WrapperTextHeader>
                </Col>
                {!isHidenSearch && (
                    <Col span={13}>
                        <ButtonInputSearch
                            placeholder="input search text"
                            textButton="Tìm kiếm"
                            size="large"
                            loading
                            onChange={onSearch}
                        />
                    </Col>
                )}

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
                            {userAvartar ? (
                                <img
                                    src={userAvartar}
                                    alt="avartar"
                                    style={{
                                        height: "30px",
                                        width: "30px",
                                        borderRadius: "50%",
                                        objectFit: "cover",
                                        border: "1px solid #fff",
                                    }}
                                />
                            ) : (
                                <UserOutlined style={{ fontSize: "30px" }} />
                            )}

                            {user?.access_token ? (
                                <>
                                    <Popover content={content} trigger="click">
                                        <div style={{ cursor: "pointer" }}>
                                            {userName?.length
                                                ? userName
                                                : user?.email}
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
                    {!isHidenCart && (
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
                    )}
                </Col>
            </WrapperHeader>
        </div>
    );
};

export default HeaderComponent;
