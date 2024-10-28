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

const CardComponent = () => {
    return (
        <WrapperCardStyple
            hoverable
            style={{ width: 200 }}
            bodyStyle={{ padding: "10px" }}
            cover={
                <img
                    alt="example"
                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
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
            <StyleNameProduct>Iphone</StyleNameProduct>
            <WrapperReportText>
                <span style={{ marginRight: "4px" }}>
                    <span>4.9</span>{" "}
                    <StarFilled style={{ fontSize: "12px", color: "yellow" }} />
                </span>

                <WrapperStyleTextSell> | Da ban 100</WrapperStyleTextSell>
            </WrapperReportText>
            <WrapperPriceText>
                <span style={{ marginRight: "8px" }}>2.000.000</span>
                <WrapperDiscountPriceText>-5%</WrapperDiscountPriceText>
            </WrapperPriceText>
        </WrapperCardStyple>
    );
};

export default CardComponent;
