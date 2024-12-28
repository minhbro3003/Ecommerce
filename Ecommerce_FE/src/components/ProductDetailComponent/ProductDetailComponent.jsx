import { Col, Row, Image, Input } from "antd";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import imageproduct from "../../assets/images/test1.jpeg";
import imageproductSmall from "../../assets/images/test2.jpg";
import {
    WrapperAddressProduct,
    WrapperBtQualityProduct,
    WrapperDiscountPriceText,
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
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { addOrderProduct } from "../../redux/slides/orderSlide";
import { convertPrice } from "../../utils";

const ProductDetailComponent = ({ idProduct }) => {
    const [numberProduct, setNumberProduct] = useState(1);
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    console.log("user", user);
    const onChangeNumber = (value) => {
        const num = parseInt(value, 10);
        if (!isNaN(num)) {
            setNumberProduct(num);
        }
    };
    console.log("location: ", location);
    const handleChangeCount = (type) => {
        if (type === "increase") {
            setNumberProduct(numberProduct + 1);
        } else {
            setNumberProduct(numberProduct > 1 ? numberProduct - 1 : 1);
        }
    };

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

    const handleAddOrderProduct = () => {
        if (!user?.id) {
            navigate("/sign-in", { state: location?.pathname });
        } else {
            dispatch(
                addOrderProduct({
                    orderItem: {
                        name: productDetails?.name,
                        amount: numberProduct,
                        discount: productDetails?.discount,
                        countInStock: productDetails?.countInStock,
                        image: productDetails?.image,
                        price: productDetails?.price,
                        product: productDetails?._id,
                    },
                })
            );
        }
    };
    console.log("productDetails", productDetails, user);

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
                                    style={{
                                        height: "64px",
                                        width: "64px",
                                        objectFit: "cover",
                                        borderRadius: "4px",
                                    }}
                                />
                            </Col>
                            <Col span={4}>
                                <Image
                                    src={imageproductSmall}
                                    alt="image small"
                                    preview={false}
                                    style={{
                                        height: "64px",
                                        width: "64px",
                                        objectFit: "cover",
                                        borderRadius: "4px",
                                    }}
                                />
                            </Col>
                            <Col span={4}>
                                <Image
                                    src={imageproductSmall}
                                    alt="image small"
                                    preview={false}
                                    style={{
                                        height: "64px",
                                        width: "64px",
                                        objectFit: "cover",
                                        borderRadius: "4px",
                                    }}
                                />
                            </Col>
                            <Col span={4}>
                                <Image
                                    src={imageproductSmall}
                                    alt="image small"
                                    preview={false}
                                    style={{
                                        height: "64px",
                                        width: "64px",
                                        objectFit: "cover",
                                        borderRadius: "4px",
                                    }}
                                />
                            </Col>
                            <Col span={4}>
                                <Image
                                    src={imageproductSmall}
                                    alt="image small"
                                    preview={false}
                                    style={{
                                        height: "64px",
                                        width: "64px",
                                        objectFit: "cover",
                                        borderRadius: "4px",
                                    }}
                                />
                            </Col>
                            <Col span={4}>
                                <Image
                                    src={imageproductSmall}
                                    alt="image small"
                                    preview={false}
                                    style={{
                                        height: "64px",
                                        width: "64px",
                                        objectFit: "cover",
                                        borderRadius: "4px",
                                    }}
                                />
                            </Col>
                        </Row>
                    </Col>
                    <Col span={14} style={{ padding: "15px" }}>
                        <WrapperStyleNameProduct>
                            {productDetails?.name}
                        </WrapperStyleNameProduct>
                        <div>
                            {renderStars(productDetails?.rating)}
                            <WrapperStyleTextSell>
                                | Đã bán {productDetails?.selled}+
                            </WrapperStyleTextSell>
                        </div>
                        <WrapperPriceProduct>
                            <WrapperPriceTextProduct>
                                {productDetails?.price ? (
                                    <>
                                        {convertPrice(
                                            productDetails.price -
                                                (productDetails.discount
                                                    ? (productDetails.price *
                                                          productDetails.discount) /
                                                      100
                                                    : 0)
                                        )}
                                        {productDetails?.discount > 0 && (
                                            <>
                                                <span
                                                    style={{
                                                        fontSize: "14px",
                                                        backgroundColor:
                                                            "#f5f5fa",
                                                        borderRadius: "8px",
                                                        color: "rgb(145 143 143)",
                                                        marginLeft: "5px",
                                                    }}
                                                >
                                                    {productDetails?.discount}%
                                                </span>
                                                <span
                                                    style={{
                                                        padding: "0 10px",
                                                        color: "#808089",
                                                        textDecorationLine:
                                                            "line-through",
                                                        fontSize: "16px",
                                                    }}
                                                >
                                                    {convertPrice(
                                                        productDetails.price
                                                    )}
                                                </span>
                                            </>
                                        )}
                                    </>
                                ) : (
                                    // Hiển thị trạng thái tải dữ liệu
                                    <>
                                        <Loading
                                            isLoading={isLoading}
                                        ></Loading>
                                        {productDetails?.price}
                                    </>
                                )}
                            </WrapperPriceTextProduct>
                        </WrapperPriceProduct>
                        <WrapperAddressProduct>
                            <span
                                style={{
                                    fontSize: "18px",
                                }}
                            >
                                Giao đến{" "}
                            </span>
                            <span
                                style={{
                                    fontWeight: "400px",
                                }}
                                className="address"
                            >
                                {user?.address}
                            </span>
                            -
                            <span className="change-address"> Đổi địa chỉ</span>
                        </WrapperAddressProduct>
                        <WrapperQualityProduct>
                            <div>Số lượng</div>
                            <WrapperBtQualityProduct>
                                <button
                                    style={{
                                        border: "none",
                                        background: "transparent",
                                        cursor: "pointer",
                                    }}
                                    onClick={() =>
                                        handleChangeCount("decrease")
                                    }
                                    disabled={numberProduct <= 1}
                                >
                                    <MinusOutlined
                                        style={{
                                            border: "1px solid #ccc",
                                            borderRadius: "4px",
                                            padding: "4px",
                                            fontSize: "25px",
                                            backgroundColor:
                                                numberProduct > 1
                                                    ? "inherit"
                                                    : "#d9d9d9",
                                        }}
                                    />
                                </button>

                                <Input
                                    style={{
                                        width: "45px",
                                        margin: "0 10px",
                                        height: "37px",
                                        fontSize: "18px",
                                        textAlign: "center",
                                        // color: "#000",
                                    }}
                                    onChange={onChangeNumber}
                                    value={numberProduct}
                                    // defaultValue={1}
                                />
                                <button
                                    style={{
                                        border: "none",
                                        background: "transparent",
                                        cursor: "pointer",
                                    }}
                                    onClick={() =>
                                        handleChangeCount("increase")
                                    }
                                >
                                    <PlusOutlined
                                        style={{
                                            border: "1px solid #ccc",
                                            borderRadius: "4px",
                                            padding: "4px",
                                            fontSize: "25px",
                                        }}
                                    />
                                </button>
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
                                    onClick={handleAddOrderProduct}
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
