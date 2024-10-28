import React from "react";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import CardComponent from "../../components/CardComponent/CardComponent";
import { Col, Pagination, Row } from "antd";
import { WrapperNavbar, WrapperProducts } from "./style";

const TypeProductPage = () => {
    const onChange = () => {};
    return (
        <div
            style={{
                padding: "0 120px",
                background: "#efefef",
                marginTop: "60px",
            }}
        >
            <Row
                style={{
                    flexWrap: "nowrap",
                    paddingTop: "30px",
                }}
            >
                <WrapperNavbar span={4}>
                    <NavbarComponent />
                </WrapperNavbar>
                <Col span={20}>
                    <WrapperProducts>
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                    </WrapperProducts>
                    <Pagination
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            margin: "30px 0 50px",
                        }}
                        defaultCurrent={2}
                        total={100}
                        onChange={onChange}
                    />
                </Col>
            </Row>
        </div>
    );
};

export default TypeProductPage;
