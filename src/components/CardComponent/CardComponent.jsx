import React from "react";
import {
    StyleNameProduct,
    WrapperCardStyple,
    WrapperDiscountPriceText,
    WrapperPriceText,
    WrapperReportText,
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

                <span> | Da ban 100</span>
            </WrapperReportText>
            <WrapperPriceText>
                2.000.000
                <WrapperDiscountPriceText>-5%</WrapperDiscountPriceText>
            </WrapperPriceText>
        </WrapperCardStyple>
    );
};

export default CardComponent;
