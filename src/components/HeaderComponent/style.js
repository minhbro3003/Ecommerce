import { Row } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled(Row)`
    padding: 10px 120px;
    background-color: #00a0ff;
    align-items: center;
`;

export const WrapperTextHeader = styled.span`
    color: white;
    font-size: 24px;
    font-weight: bold;
`;

export const WrapperHeaderAccount = styled.div`
    display: flex;
    align-items: center;
    color: #fff;
    gap: 10px;
    font-size: 12px;
`;

export const WrapperTextHeaderSmall = styled.span`
    color: #fff;
    gap: 10px;
    font-size: 12px;
`;
