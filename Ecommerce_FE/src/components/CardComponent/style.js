import { Card } from "antd";
import styled from "styled-components";

export const WrapperCardStyple = styled(Card)`
    width: 250px;
    & img {
        height: 200px;
        width: 200px;
    }
    position: relative;
`;
export const StyleNameProduct = styled.div`
    font-weight: 400;
    font-size: 20px;
    color: rgb(56, 56, 61);
`;

export const WrapperReportText = styled.div`
    font-size: 11px;
    display: flex;
    align-items: center;
    color: rgb(128, 128, 137);
    margin: 8px 0;
`;

export const WrapperPriceText = styled.div`
    font-size: 16px;
    font-weight: 500;
    color: rgb(255, 66, 78);
`;

export const WrapperDiscountPriceText = styled.span`
    font-size: 12px;

    color: rgb(255, 66, 78);
`;

export const WrapperStyleTextSell = styled.span`
    color: rgb(120, 120, 120);
    font-size: 15px;
    font-height: 500;
`;
