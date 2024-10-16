import React, { useState } from "react";
import {
    WrapperContainerLeft,
    WrapperContainerRight,
    WrapperTextLight,
} from "../SignInPage/style";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";

import InputFormComponent from "../../components/InputFormComponent/InputFormComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { Image } from "antd";
import imageLogo from "../../assets/images/login.png";

const SignUpPage = () => {
    const [{ isShowPassword, setIsShowPassword }] = useState(false);
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#ccc",
                height: "100vh",
            }}
        >
            <div
                style={{
                    width: "800px",
                    height: "445px",
                    borderRadius: "20px",
                    background: "#fff",

                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <WrapperContainerLeft>
                    <h1>Xin chao</h1>
                    <p>Đăng nhập hoặc tạo tài khoản</p>
                    <InputFormComponent
                        style={{ marginBottom: "10px" }}
                        placeholder="abc@gmail.com"
                    />
                    {/* <InputFormComponent
                        style={{ marginBottom: "10px" }}
                        placeholder="password"
                    />
                    <InputFormComponent placeholder="comfirm password" /> */}
                    <div style={{ position: "relative" }}>
                        <span
                            style={{
                                zIndex: 10,
                                position: "absolute",
                                top: "4px",
                                right: "8px",
                            }}
                        >
                            {isShowPassword ? (
                                <EyeFilled />
                            ) : (
                                <EyeInvisibleFilled />
                            )}
                        </span>
                        <InputFormComponent
                            style={{ marginBottom: "10px" }}
                            placeholder="password"
                            type={isShowPassword ? "text" : "password"}
                        />
                    </div>
                    <div style={{ position: "relative" }}>
                        <span
                            style={{
                                zIndex: 10,
                                position: "absolute",
                                top: "4px",
                                right: "8px",
                            }}
                        >
                            {isShowPassword ? (
                                <EyeFilled />
                            ) : (
                                <EyeInvisibleFilled />
                            )}
                        </span>
                        <InputFormComponent
                            placeholder="comfirm password"
                            type={isShowPassword ? "text" : "password"}
                        />
                    </div>
                    <ButtonComponent
                        size={40}
                        style={{
                            background: "rgb(255, 66, 78)",
                            color: "white",
                            margin: "20px 0 20px",
                            width: "100%",
                            height: "40px",
                        }}
                        textButton="Đăng nhập"
                        bordered={false}
                    ></ButtonComponent>

                    <p>
                        Bạn đã có tài khoản?{" "}
                        <WrapperTextLight>Đăng ký</WrapperTextLight>
                    </p>
                </WrapperContainerLeft>

                <WrapperContainerRight>
                    <Image
                        src={imageLogo}
                        preview={false}
                        alt="logo"
                        height="203px"
                        width="203px"
                    />
                    <strong>
                        <WrapperTextLight>Mua sắm tại Tiki</WrapperTextLight>
                    </strong>
                </WrapperContainerRight>
            </div>
        </div>
    );
};

export default SignUpPage;
