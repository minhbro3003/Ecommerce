import { Col, Row, Image, Input } from "antd";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import imageproduct from "../../assets/images/test1.jpeg";
import imageproductSmall from "../../assets/images/test2.jpg";
import {
    WrapperAddressProduct,
    WrapperBtQualityProduct,
    WrapperPriceProduct,
    WrapperPriceTextProduct,
    WrapperQualityProduct,
    WrapperStyleNameProduct,
} from "./style";
import { MinusOutlined, PlusOutlined, StarFilled } from "@ant-design/icons";
import { WrapperStyleTextSell } from "../CardComponent/style";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import * as ProductService from "../../services/ProductService";
import Loading from "../../components/LoadingComponent/Loading";

const ProductDetailComponent = ({ idProduct }) => {
    //details of product
    const fetchGetDetailsProduct = async (context) => {
        const id = context?.queryKey && context?.queryKey[1];
        // console.log("id", id);
        const res = await ProductService.getDetailsProduct(id);
        return res.data;
    };

    const { isLoading, data: productDetails } = useQuery({
        queryKey: ["product-details", idProduct],
        queryFn: fetchGetDetailsProduct,
        enabled: !!idProduct,
    });
    console.log("product details", productDetails);

    const renderStars = (num) => {
        const stars = [];
        for (let i = 0; i < num; i++) {
            stars.push(
                <StarFilled key={i} style={{ color: "rgb(255, 196, 0)" }} />
            );
        }
        return stars;
    };

    return (
        <Loading isLoading={isLoading}>
            <div>
                <Row
                    style={{
                        backgroundColor: "#fff",
                        marginTop: "15px",
                        borderRadius: "10px",
                    }}
                >
                    <Col
                        span={10}
                        style={{
                            borderRight: "1px solid #e5e5e5",
                            padding: "10px",
                        }}
                    >
                        <Image
                            src={productDetails?.image}
                            alt="image product"
                            preview={false}
                        />
                        <Row
                            style={{
                                paddingTop: "16px",
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <Col span={4}>
                                <Image
                                    src={imageproductSmall}
                                    alt="image small"
                                    preview={false}
                                    style={{ height: "64px", width: "64px" }}
                                />
                            </Col>
                            <Col span={4}>
                                <Image
                                    src={imageproductSmall}
                                    alt="image small"
                                    preview={false}
                                    style={{ height: "64px", width: "64px" }}
                                />
                            </Col>
                            <Col span={4}>
                                <Image
                                    src={imageproductSmall}
                                    alt="image small"
                                    preview={false}
                                    style={{ height: "64px", width: "64px" }}
                                />
                            </Col>
                            <Col span={4}>
                                <Image
                                    src={imageproductSmall}
                                    alt="image small"
                                    preview={false}
                                    style={{ height: "64px", width: "64px" }}
                                />
                            </Col>
                            <Col span={4}>
                                <Image
                                    src={imageproductSmall}
                                    alt="image small"
                                    preview={false}
                                    style={{ height: "64px", width: "64px" }}
                                />
                            </Col>
                            <Col span={4}>
                                <Image
                                    src={imageproductSmall}
                                    alt="image small"
                                    preview={false}
                                    style={{ height: "64px", width: "64px" }}
                                />
                            </Col>
                        </Row>
                    </Col>
                    <Col span={14} style={{ padding: "10px" }}>
                        <WrapperStyleNameProduct>
                            {productDetails?.name}
                        </WrapperStyleNameProduct>
                        <div>
                            {renderStars(productDetails?.rating)}
                            <WrapperStyleTextSell>
                                | Đã bán {productDetails?.countInStock}+
                            </WrapperStyleTextSell>
                        </div>
                        <WrapperPriceProduct>
                            <WrapperPriceTextProduct>
                                {productDetails?.price.toLocaleString()}
                            </WrapperPriceTextProduct>
                        </WrapperPriceProduct>
                        <WrapperAddressProduct>
                            <span>Giao đến </span>
                            <span className="address">
                                Q. Hoàn Kiếm, P. Hàng Trống, Hà Nội
                            </span>
                            -<span className="change-address">Đổi địa chỉ</span>
                        </WrapperAddressProduct>
                        <WrapperQualityProduct>
                            <div>Số lượng</div>
                            <WrapperBtQualityProduct>
                                <MinusOutlined
                                    style={{
                                        border: "1px solid #ccc",
                                        borderRadius: "4px",
                                        padding: "4px",
                                        fontSize: "20px",
                                    }}
                                />
                                <Input
                                    style={{
                                        width: "30px",
                                        margin: "0 10px",
                                        height: "30px",
                                    }}
                                />

                                <PlusOutlined
                                    style={{
                                        border: "1px solid #ccc",
                                        borderRadius: "4px",
                                        padding: "4px",
                                        fontSize: "20px",
                                    }}
                                />
                            </WrapperBtQualityProduct>
                            <div>
                                <ButtonComponent
                                    size={40}
                                    style={{
                                        background: "rgb(255, 66, 78)",
                                        color: "white",
                                        marginTop: "20px",
                                        width: "200px",
                                        height: "48px",
                                    }}
                                    textButton="Chọn mua"
                                ></ButtonComponent>
                                <ButtonComponent
                                    size={40}
                                    style={{
                                        background: "white",
                                        color: "blue",
                                        marginTop: "20px",
                                        marginLeft: "20px",
                                        width: "200px",
                                        height: "48px",
                                    }}
                                    textButton="Mua trước trả sau "
                                ></ButtonComponent>
                            </div>
                        </WrapperQualityProduct>
                    </Col>
                </Row>
            </div>
        </Loading>
    );
};

export default ProductDetailComponent;
