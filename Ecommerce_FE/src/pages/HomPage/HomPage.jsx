import React, { useState } from "react";
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
import { StarFilled } from "@ant-design/icons";
import CardComponent from "../../components/CardComponent/CardComponent";
import { useQuery } from "@tanstack/react-query";
import * as ProductService from "../../services/ProductService";
import { useSelector } from "react-redux";
import Loading from "../../components/LoadingComponent/Loading";
import { useDebounce } from "../../hooks/useDebounce";

const HomPage = () => {
    const searchProduct = useSelector((state) => state?.product?.search);
    const searchDebounce = useDebounce(searchProduct, 1000);
    const [limit, setLimit] = useState(5);
    const [loading, setIsLoading] = useState(false);

    const arr = ["TV", "Tu Lanh", "Laptop"];

    const fetchProductAll = async (context) => {
        const search = context?.queryKey && context?.queryKey[2];
        const limit = context?.queryKey && context?.queryKey[1];
        console.log("context", context);
        const res = await ProductService.getAllProduct(search, limit);
        return res;
    };

    const {
        isLoading,
        data: products,
        isPreviousData,
    } = useQuery({
        queryKey: ["products", limit, searchDebounce],
        queryFn: fetchProductAll,

        retry: 3,
        retryDelay: 1000,
    });
    // console.log("isPreviousData: ", products);

    const renderStars = (num) => {
        const stars = [];
        for (let i = 0; i < num; i++) {
            stars.push(
                <StarFilled key={i} style={{ color: "rgb(255, 196, 0)" }} />
            );
        }
        return stars;
    };
    return (
        <Loading isLoading={isLoading || loading}>
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
                                    rating={renderStars(p?.rating)}
                                    type={p.type}
                                    discount={p.discount}
                                    selled={p.selled}
                                    id={p._id}
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
                                margin: "15px",
                            }}
                            disabled={
                                products?.total === products?.data?.length
                            }
                            onClick={() => {
                                setLimit((prev) => prev + 5);
                            }}
                        />
                    </div>
                </div>
            </div>
        </Loading>
    );
};

export default HomPage;
