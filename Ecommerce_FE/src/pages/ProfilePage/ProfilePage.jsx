import React, { useState } from "react";
import {
    WrapperContentProfile,
    WrapperHeader,
    WrapperInput,
    WrapperLable,
} from "./style";
import InputFormComponent from "../../components/InputFormComponent/InputFormComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

const ProfilePage = () => {
    const [email, setEmail] = useState("");
    const handleOnChangeEmail = () => {};
    const handldUpdate = () => {};

    return (
        <div style={{ width: "1270px", margin: "0 auto", height: "500px" }}>
            <WrapperHeader>Thông tin người dùng</WrapperHeader>
            <WrapperContentProfile>
                <WrapperInput>
                    <WrapperLable htmlFor="email">Email</WrapperLable>
                    <InputFormComponent
                        style={{ width: "300px" }}
                        placeholder="Họ và tên"
                        id="email"
                        value={email}
                        onChange={handleOnChangeEmail}
                    />
                    <ButtonComponent
                        onClick={handldUpdate}
                        size={40}
                        styleButton={{
                            background: "rgb(255, 66, 78)",
                            color: "white",
                            margin: "10px 0",
                            width: "fit-content",
                            height: "40px",
                        }}
                        textButton="Cập nhật"
                    ></ButtonComponent>
                </WrapperInput>
                <WrapperInput>
                    <WrapperLable htmlFor="email">Email</WrapperLable>
                    <InputFormComponent
                        style={{ width: "300px" }}
                        placeholder="Họ và tên"
                        id="email"
                        value={email}
                        onChange={handleOnChangeEmail}
                    />
                    <ButtonComponent
                        onClick={handldUpdate}
                        size={40}
                        styleButton={{
                            background: "rgb(255, 66, 78)",
                            color: "white",
                            margin: "10px 0 10px",
                            width: "fit-content",
                            height: "40px",
                        }}
                        textButton="Cập nhật"
                    ></ButtonComponent>
                </WrapperInput>
                <WrapperInput>
                    <WrapperLable htmlFor="email">Email</WrapperLable>
                    <InputFormComponent
                        style={{ width: "300px" }}
                        placeholder="Họ và tên"
                        id="email"
                        value={email}
                        onChange={handleOnChangeEmail}
                    />
                    <ButtonComponent
                        onClick={handldUpdate}
                        size={40}
                        styleButton={{
                            background: "rgb(255, 66, 78)",
                            color: "white",
                            margin: "10px 0 10px",
                            width: "fit-content",
                            height: "40px",
                        }}
                        textButton="Cập nhật"
                    ></ButtonComponent>
                </WrapperInput>
            </WrapperContentProfile>
        </div>
    );
};

export default ProfilePage;
