import React from "react";
import {
    StyleNameProduct,
    WrapperCardStyple,
    WrapperDiscountPriceText,
    WrapperPriceText,
    WrapperReportText,
    WrapperStyleTextSell,
} from "./style";
import { StarFilled } from "@ant-design/icons";
import logo from "../../assets/images/image.png";
import { useNavigate } from "react-router";

const CardComponent = (props) => {
    const {
        countInStock,
        description,
        image,
        name,
        price,
        rating,
        type,
        discount,
        selled,
        id,
    } = props;

    const navigate = useNavigate();
    const handleDetailsProduct = (id) => {
        navigate(`/product-details/${id}`);
        console.log("Product ID:", id);
    };

    return (
        <WrapperCardStyple
            hoverable
            cover={
                <img
                    alt="product"
                    src={image}
                    onClick={() => handleDetailsProduct(id)}
                />
            }
        >
            <img
                alt="logo"
                src={logo}
                style={{
                    width: "68px",
                    height: "14px",
                    position: "absolute",
                    top: 1,
                    left: 1,
                    borderTopLeftRadius: "3px",
                }}
            />
            <StyleNameProduct>{name}</StyleNameProduct>
            <WrapperReportText>
                <span style={{ marginRight: "4px" }}>
                    <span>{rating}</span>{" "}
                </span>

                <WrapperStyleTextSell>
                    | Đã bán {countInStock}
                </WrapperStyleTextSell>
            </WrapperReportText>
            <WrapperPriceText>
                <span style={{ marginRight: "8px" }}>
                    {price.toLocaleString()}
                </span>
                <WrapperDiscountPriceText>
                    - {discount}%
                </WrapperDiscountPriceText>
            </WrapperPriceText>
        </WrapperCardStyple>
    );
};

export default CardComponent;
