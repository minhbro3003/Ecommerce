import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
// import HeaderComponent from "./components/HeaderComponent/HeaderComponent";
import DefaultComponent from "./components/DefaultComponent/DefaultComponent";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function App() {
    //     useEffect(() => {
    //         fetchApi();
    //     }, []);

    // console.log(
    //     "process.env.REACT_APP_API_URL_BACKEND",
    //     process.env.REACT_APP_API_URL_BACKEND
    // );
    // const fetchApi = async () => {
    //     const res = await axios.get(
    //         `${process.env.REACT_APP_API_URL_BACKEND}/api/product/get-all-product`
    //     );
    //     // console.log("res", res);
    //     return res.data;
    // };

    // // Queries
    // const query = useQuery({ queryKey: ["todos"], queryFn: fetchApi });
    // console.log(" query", query);

    return (
        <div>
            <Router>
                <Routes>
                    {routes.map((route) => {
                        const Page = route.page;
                        const Layout = route.isShowHeader
                            ? DefaultComponent
                            : Fragment;
                        return (
                            <Route
                                key={route.path}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </Router>
        </div>
    );
}
