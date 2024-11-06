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
    } = props;

    return (
        <WrapperCardStyple
            hoverable
            bodyStyle={{ padding: "10px" }}
            cover={
                <img
                    alt="example"
                    src="https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lvmvvz44l2cded.webp"
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
                    top: -1,
                    left: -1,
                    borderTopLeftRadius: "3px",
                }}
            />
            <StyleNameProduct>{name}</StyleNameProduct>
            <WrapperReportText>
                <span style={{ marginRight: "4px" }}>
                    <span>{rating}</span>{" "}
                    <StarFilled style={{ fontSize: "12px", color: "yellow" }} />
                </span>

                <WrapperStyleTextSell> | Da ban {selled}</WrapperStyleTextSell>
            </WrapperReportText>
            <WrapperPriceText>
                <span style={{ marginRight: "8px" }}>{price}</span>
                <WrapperDiscountPriceText>{discount}%</WrapperDiscountPriceText>
            </WrapperPriceText>
        </WrapperCardStyple>
    );
};

export default CardComponent;
