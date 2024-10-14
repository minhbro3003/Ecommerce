import React from "react";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import { WrapperButtonMore, WrapperTypeProduct } from "./style";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import slider1 from "../../assets/images/slide1.webp";
import slider2 from "../../assets/images/slide2.webp";
import slider3 from "../../assets/images/slide3.webp";
import CardComponent from "../../components/CardComponent/CardComponent";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

const HomPage = () => {
    const arr = ["TV", "Tu Lanh", "Laptop"];
    return (
        <>
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
                <div
                    style={{
                        marginTop: "20px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "25px",
                        flexWrap: "wrap",
                    }}
                >
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                </div>
                {/* <NavbarComponent /> */}
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
        </>
    );
};

export default HomPage;
