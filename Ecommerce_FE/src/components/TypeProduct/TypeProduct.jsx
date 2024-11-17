import React from "react";
import { useNavigate } from "react-router";

const TypeProduct = ({ name }) => {
    const navigate = useNavigate();
    const handleeNavigateType = (type) => {
        navigate(`/product/${type}`, { state: type });
    };
    return (
        <div
            style={{ padding: "0 10px", cursor: "pointer" }}
            onClick={() => handleeNavigateType(name)}
        >
            <>{name}</>
        </div>
    );
};

export default TypeProduct;
