import React from "react";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import {
    WrapperButtonMore,
    WrapperProducts,
    WrapperTypeProduct,
} from "./style";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import slider1 from "../../assets/images/slide1.webp";
import slider2 from "../../assets/images/slide2.webp";
import slider3 from "../../assets/images/slide3.webp";
import CardComponent from "../../components/CardComponent/CardComponent";
import { useQuery } from "@tanstack/react-query";
import * as ProductService from "../../services/ProductService";

const HomPage = () => {
    const arr = ["TV", "Tu Lanh", "Laptop"];

    const fetchProductAll = async () => {
        const res = await ProductService.getAllProduct();
        console.log("res", res);
        return res;
    };
    const { isLoading, data: products } = useQuery({
        queryKey: ["products"],
        queryFn: fetchProductAll,
        retry: 3,
        retryDelay: 1000,
    });
    console.log("data: ", products);
    return (
        <div style={{ marginTop: "60px" }}>
            <div style={{ padding: "0 120px" }}>
                <WrapperTypeProduct>
                    {arr.map((item) => {
                        return <TypeProduct name={item} key={item} />;
                    })}
                </WrapperTypeProduct>
            </div>
            <div
                style={{
                    backgroundColor: "#efefef",
                    padding: "0 120px",
                    height: "1500px",
                    width: "100%",
                }}
            >
                <SliderComponent arrImages={[slider1, slider2, slider3]} />
                <WrapperProducts>
                    {products?.data?.map((p) => {
                        return (
                            <CardComponent
                                key={p._id}
                                countInStock={p.countInStock}
                                description={p.description}
                                image={p.image}
                                name={p.name}
                                price={p.price}
                                rating={p.rating}
                                type={p.type}
                                discount={p.discount}
                                selled={p.selled}
                            />
                        );
                    })}
                </WrapperProducts>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                    }}
                >
                    <WrapperButtonMore
                        textButton="Xem them"
                        type="outline"
                        style={{
                            border: "1px solid  rgb(11, 116, 229)",
                            color: "rgb(11, 116, 229)",
                            width: "240px",
                            height: "38px",
                            borderRadius: "4px",
                            marginTop: "15px",
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default HomPage;
