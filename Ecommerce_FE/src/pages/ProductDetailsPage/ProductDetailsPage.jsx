import React from "react";
import ProductDetailComponent from "../../components/ProductDetailComponent/ProductDetailComponent";
import { useParams } from "react-router";

const ProductDetailsPage = () => {
    const { id } = useParams();
    console.log("param", id);
    return (
        <div style={{ height: "100vh", width: "100%" }}>
            <div
                style={{
                    marginTop: "60px",
                    padding: "0 120px",
                    backgroundColor: "#efefef",
                    // height: "400px",
                }}
            >
                <h2 style={{ paddingTop: "15px" }}>Chi tiết sản phẩm </h2>
                <ProductDetailComponent idProduct={id} />
            </div>
        </div>
    );
};

export default ProductDetailsPage;
