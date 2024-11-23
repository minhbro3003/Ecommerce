// import { Button, Card, Checkbox, Table } from "antd";
// import React, { useState } from "react";
// import { DeleteOutlined } from "@ant-design/icons";
// import { useSelector } from "react-redux";

// const OrderPage = () => {
//     const order = useSelector((state) => state.order);
//     const [cartData, setCartData] = useState([
//         {
//             key: "1",
//             image: "https://photo.znews.vn/w660/Uploaded/mdf_eioxrd/2021_07_06/2.jpg", // Replace with actual image URLs
//             name: "Name sản phẩm Name sản phẩm Name sản phẩm",
//             price: 2030000,
//             discountedPrice: 1030000,
//             quantity: 10,
//             total: 1212,
//         },
//     ]);

//     const handleQuantityChange = (record, increment) => {
//         const updatedData = cartData.map((item) => {
//             if (item.key === record.key) {
//                 const newQuantity = Math.max(1, item.quantity + increment); // Không cho phép số lượng < 1
//                 const newTotal = newQuantity * item.discountedPrice;
//                 return { ...item, quantity: newQuantity, total: newTotal };
//             }
//             return item;
//         });
//         setCartData(updatedData);
//     };

//     const columns = [
//         {
//             title: (
//                 <Checkbox>
//                     {" "}
//                     Tất cả ({order?.orderItems?.length} sản phẩm){" "}
//                 </Checkbox>
//             ),
//             dataIndex: "image",
//             render: (_, record) => (
//                 <Checkbox>
//                     <img
//                         src={record.image}
//                         alt="product"
//                         style={{ width: 50, height: 50 }}
//                     />
//                 </Checkbox>
//             ),
//         },
//         {
//             title: "Tên sản phẩm",
//             dataIndex: "name",
//         },
//         {
//             title: "Đơn giá",
//             dataIndex: "price",
//             render: (_, record) => (
//                 <>
//                     <span
//                         style={{
//                             textDecoration: "line-through",
//                             marginRight: 8,
//                         }}
//                     >
//                         {record.price}
//                     </span>
//                     <span>{record.discountedPrice}</span>
//                 </>
//             ),
//         },
//         {
//             title: "Số lượng",
//             dataIndex: "quantity",
//             render: (_, record) => (
//                 <div
//                     style={{
//                         display: "flex",
//                         justifyContent: "center",
//                         gap: "8px",
//                         alignItems: "center",
//                     }}
//                 >
//                     <Button
//                         size="small"
//                         onClick={() => handleQuantityChange(record, -1)}
//                     >
//                         -
//                     </Button>
//                     <span
//                         style={{
//                             border: "1px solid #ccc",
//                             borderRadius: "5px",
//                             width: "25px",
//                             textAlign: "center",
//                             backgroundColor: "white",
//                         }}
//                     >
//                         {record.quantity}
//                     </span>
//                     <Button
//                         size="small"
//                         onClick={() => handleQuantityChange(record, 1)}
//                     >
//                         +
//                     </Button>
//                 </div>
//             ),
//         },
//         {
//             title: "Thành tiền",
//             dataIndex: "total",
//             render: (total) => <span style={{ color: "red" }}>{total}</span>,
//         },
//         {
//             title: "🗑️",
//             dataIndex: "action",
//             render: (_, record) => (
//                 <DeleteOutlined
//                     style={{
//                         color: "black",
//                         fontSize: "17px",
//                         cursor: "pointer",
//                     }}
//                     onClick={() =>
//                         setCartData(
//                             cartData.filter((item) => item.key !== record.key)
//                         )
//                     }
//                 />
//             ),
//         },
//     ];

//     const calculateSummary = () => {
//         const subTotal = cartData.reduce((acc, item) => acc + item.total, 0);
//         return {
//             subTotal,
//             discount: 0,
//             tax: 0,
//             shipping: 0,
//             total: subTotal,
//         };
//     };

//     const summary = calculateSummary();
//     return (
//         <div style={{ marginTop: "90px", padding: "0 120px" }}>
//             <h4>Giỏ hàng</h4>
//             <div style={{ display: "flex", gap: 24, padding: 24 }}>
//                 {/* Left Section - Table */}
//                 <div style={{ flex: 3 }}>
//                     <Table
//                         columns={columns}
//                         dataSource={cartData}
//                         pagination={false}
//                         summary={() => (
//                             <Table.Summary>
//                                 <Table.Summary.Row>
//                                     <Table.Summary.Cell
//                                         colSpan={4}
//                                         style={{ textAlign: "right" }}
//                                     >
//                                         Tổng cộng
//                                     </Table.Summary.Cell>
//                                     <Table.Summary.Cell>
//                                         <span
//                                             style={{
//                                                 color: "red",
//                                                 fontWeight: "bold",
//                                             }}
//                                         >
//                                             {summary.subTotal}
//                                         </span>
//                                     </Table.Summary.Cell>
//                                 </Table.Summary.Row>
//                             </Table.Summary>
//                         )}
//                     />
//                 </div>

//                 {/* Right Section - Summary */}
//                 <Card style={{ flex: 1 }}>
//                     <p>Tạm tính: {summary.subTotal}</p>
//                     <p>Giảm giá: {summary.discount}</p>
//                     <p>Thuế: {summary.tax}</p>
//                     <p>Phí giao hàng: {summary.shipping}</p>
//                     <h3 style={{ marginTop: 16, fontSize: 18 }}>
//                         Tổng tiền:{" "}
//                         <span style={{ color: "red", fontWeight: "bold" }}>
//                             {summary.total}
//                         </span>
//                     </h3>
//                     <Button
//                         type="primary"
//                         style={{ marginTop: 16, width: "100%" }}
//                     >
//                         Mua hàng
//                     </Button>
//                 </Card>
//             </div>
//         </div>
//     );
// };

// export default OrderPage;

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Button, Card, Checkbox, Table } from "antd";
// import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
// import { decreaseAmount, increaseAmount } from "../../redux/slides/orderSlide";
// const OrderPage = () => {
//     const order = useSelector((state) => state.order);
//     const [cartData, setCartData] = useState([]);
//     const dispatch = useDispatch();

//     // Đồng bộ `cartData` với dữ liệu từ Redux khi order thay đổi
//     useEffect(() => {
//         if (order?.orderItems) {
//             const formattedData = order.orderItems.map((item, index) => ({
//                 key: String(index + 1),
//                 ...item,
//             }));
//             setCartData(formattedData);
//         }
//     }, [order]);

//     const handleQuantityChange = (record, increment) => {
//         const updatedData = cartData.map((item) => {
//             if (item.key === record.key) {
//                 const newQuantity = Math.max(1, item.amount + increment);
//                 const newTotal = newQuantity * item.discount;
//                 return { ...item, amount: newQuantity, total: newTotal };
//             }
//             return item;
//         });
//         setCartData(updatedData);
//     };

//     const handleChangeCount = (type, idProduct) => {
//         if (type === "increase") {
//             dispatch(increaseAmount({ idProduct }));
//         } else {
//             dispatch(decreaseAmount({ idProduct }));
//         }
//     };

//     const columns = [
//         {
//             title: <Checkbox>Tất cả ({cartData.length} sản phẩm)</Checkbox>,
//             dataIndex: "image",
//             render: (_, record) => (
//                 <Checkbox>
//                     <img
//                         src={record.image}
//                         alt="product"
//                         style={{ width: 50, height: 50 }}
//                     />
//                 </Checkbox>
//             ),
//         },
//         {
//             title: "Tên sản phẩm",
//             dataIndex: "name",
//         },
//         {
//             title: "Đơn giá",
//             dataIndex: "price",
//             render: (_, record) => (
//                 <>
//                     <span
//                         style={{
//                             textDecoration: "line-through",
//                             marginRight: 8,
//                         }}
//                     >
//                         {record.price}
//                     </span>
//                     <span>{record.discount}</span>
//                 </>
//             ),
//         },
//         {
//             title: "Số lượng",
//             dataIndex: "amount",
//             render: (_, record) => (
//                 <div
//                     style={{
//                         display: "flex",
//                         justifyContent: "center",
//                         gap: "6px",
//                         alignItems: "center",
//                     }}
//                 >
//                     <Button
//                         size="small"
//                         onClick={() =>
//                             handleQuantityChange(record, -1, "decrease")
//                         }
//                     >
//                         <MinusOutlined />
//                     </Button>
//                     <span
//                         style={{
//                             border: "1px solid #ccc",
//                             borderRadius: "5px",
//                             width: "30px",
//                             textAlign: "center",
//                             backgroundColor: "white",
//                         }}
//                     >
//                         {record.amount}
//                     </span>
//                     <Button
//                         size="small"
//                         onClick={() =>
//                             handleQuantityChange(record, 1, "increase")
//                         }
//                     >
//                         <PlusOutlined />
//                     </Button>
//                 </div>
//             ),
//         },
//         {
//             title: "Thành tiền",
//             dataIndex: "total",
//             render: (total) => <span style={{ color: "red" }}>{total}</span>,
//         },
//         {
//             title: "🗑️",
//             dataIndex: "action",
//             render: (_, record) => (
//                 <DeleteOutlined
//                     style={{
//                         color: "black",
//                         fontSize: "17px",
//                         cursor: "pointer",
//                     }}
//                     onClick={() =>
//                         setCartData(
//                             cartData.filter((item) => item.key !== record.key)
//                         )
//                     }
//                 />
//             ),
//         },
//     ];

//     const calculateSummary = () => {
//         const subTotal = cartData.reduce((acc, item) => acc + item.total, 0);
//         return {
//             subTotal,
//             discount: 0,
//             tax: 0,
//             shipping: 0,
//             total: subTotal,
//         };
//     };

//     const summary = calculateSummary();

//     return (
//         <div style={{ marginTop: "90px", padding: "0 120px" }}>
//             <h4>Giỏ hàng</h4>
//             <div style={{ display: "flex", gap: 24, padding: 24 }}>
//                 <div style={{ flex: 3 }}>
//                     <Table
//                         columns={columns}
//                         dataSource={cartData}
//                         pagination={false}
//                         summary={() => (
//                             <Table.Summary>
//                                 <Table.Summary.Row>
//                                     <Table.Summary.Cell
//                                         colSpan={4}
//                                         style={{ textAlign: "right" }}
//                                     >
//                                         Tổng cộng
//                                     </Table.Summary.Cell>
//                                     <Table.Summary.Cell>
//                                         <span
//                                             style={{
//                                                 color: "red",
//                                                 fontWeight: "bold",
//                                             }}
//                                         >
//                                             {summary.subTotal.toLocaleString()}
//                                         </span>
//                                     </Table.Summary.Cell>
//                                 </Table.Summary.Row>
//                             </Table.Summary>
//                         )}
//                     />
//                 </div>
//                 <Card style={{ flex: 1 }}>
//                     <p>Tạm tính: {summary.subTotal.toLocaleString()}</p>
//                     <p>Giảm giá: {summary.discount}</p>
//                     <p>Thuế: {summary.tax}</p>
//                     <p>Phí giao hàng: {summary.shipping}</p>
//                     <h3 style={{ marginTop: 16, fontSize: 18 }}>
//                         Tổng tiền:{" "}
//                         <span style={{ color: "red", fontWeight: "bold" }}>
//                             {summary.total.toLocaleString()}
//                         </span>
//                     </h3>
//                     <Button
//                         type="primary"
//                         style={{ marginTop: 16, width: "100%" }}
//                     >
//                         Mua hàng
//                     </Button>
//                 </Card>
//             </div>
//         </div>
//     );
// };

// export default OrderPage;

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Card, Checkbox, Table } from "antd";
import { DeleteOutlined, LineOutlined, PlusOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import {
    increaseAmount,
    decreaseAmount,
    removeOrderProduct,
    removeAllOrderProduct,
} from "../../redux/slides/orderSlide";
import { convertPrice } from "../../utils";

const OrderPage = () => {
    const dispatch = useDispatch();
    const order = useSelector((state) => state.order.orderItems);
    const [listChecked, setListChecked] = useState([]);

    const cartData = order?.map((item) => ({
        key: item.product,
        image: item.image,
        name: item.name,
        price: item.price,
        discount: item.discount,
        quantity: item.amount,
        total: item.amount * item.price * (1 - item.discount / 100),
    }));
    const onChangeProduct = (e) => {
        if (listChecked.includes(e.target.value)) {
            const newListChecked = listChecked.filter(
                (item) => item !== e.target.value
            );
            setListChecked(newListChecked);
        } else {
            setListChecked([...listChecked, e.target.value]);
        }
    };

    console.log(`listChecked:`, listChecked);
    const handleOnChangeCheckAllProducts = (e) => {
        if (e.target.checked) {
            const newListChecked = cartData.map((item) => item.key); // Lấy tất cả key từ cartData
            setListChecked(newListChecked);
        } else {
            setListChecked([]);
        }
    };

    const handleQuantityChange = (record, increment) => {
        if (increment === 1) {
            dispatch(increaseAmount({ idProduct: record.key }));
        } else {
            dispatch(decreaseAmount({ idProduct: record.key }));
        }
    };

    const handleRemoveProduct = (record) => {
        dispatch(removeOrderProduct({ idProduct: record.key }));
    };

    const handleRemoveAllOrder = () => {
        if (listChecked?.length > 1) {
            dispatch(removeAllOrderProduct({ listChecked }));
        }
    };
    const columns = [
        {
            title: (
                <Checkbox
                    onChange={handleOnChangeCheckAllProducts}
                    checked={listChecked?.length === cartData?.length}
                >
                    Tất cả ({cartData?.length}) sản phẩm
                </Checkbox>
            ),
            dataIndex: "image",
            render: (_, record) => (
                <>
                    <Checkbox
                        onChange={onChangeProduct}
                        value={record?.key}
                        checked={listChecked.includes(record.key)}
                    ></Checkbox>
                    <img
                        src={record.image}
                        alt="product"
                        style={{ width: 50, height: 50, marginLeft: "10px" }}
                    />
                </>
            ),
            width: "21%",
        },
        { title: "Tên sản phẩm", dataIndex: "name", width: "25%" },
        {
            title: "Đơn giá",
            dataIndex: "price",
            render: (_, record) => {
                const discountPrice =
                    record.price * (1 - record.discount / 100); // Tính giá sau giảm
                return (
                    <>
                        <span
                            style={{
                                textDecoration: "line-through",
                                marginRight: 8,
                                color: "#b8b8b8",
                            }}
                        >
                            {convertPrice(record.price)}
                        </span>
                        <span>{convertPrice(discountPrice)}</span>
                    </>
                );
            },
        },

        {
            title: "Số lượng",
            dataIndex: "quantity",
            render: (_, record) => (
                <div
                    style={{
                        display: "flex",
                        gap: 5,
                    }}
                >
                    <Button
                        size="small"
                        disabled={record.quantity === 1}
                        onClick={() => handleQuantityChange(record, -1)}
                    >
                        <LineOutlined />
                    </Button>
                    <span
                        style={{
                            border: "1px solid #ccc",
                            width: "25px",
                            textAlign: "center",
                            borderRadius: "4px",
                        }}
                    >
                        {record.quantity}
                    </span>
                    <Button
                        size="small"
                        onClick={() => handleQuantityChange(record, 1)}
                    >
                        <PlusOutlined />
                    </Button>
                </div>
            ),
        },
        {
            title: "Thành tiền",
            dataIndex: "total",
            render: (total) => (
                <span style={{ color: "red" }}>{convertPrice(total)}</span>
            ),
        },
        {
            title: (
                <Tooltip title="Xóa tất cả">
                    <DeleteOutlined
                        onClick={handleRemoveAllOrder}
                        style={{
                            color: "red",
                            fontSize: "17px",
                            cursor: "pointer",
                        }}
                    />
                </Tooltip>
            ),
            dataIndex: "action",
            render: (_, record) => (
                <DeleteOutlined
                    style={{ color: "black", cursor: "pointer" }}
                    onClick={() => handleRemoveProduct(record)}
                />
            ),
        },
    ];

    const calculateSummary = () => {
        const selectedProducts = cartData.filter((item) =>
            listChecked.includes(item.key)
        );

        if (selectedProducts.length === 0) {
            return {
                subTotal: 0,
                discount: 0,
                tax: 0,
                shipping: 0,
                total: 0,
            };
        }

        const subTotal = selectedProducts.reduce(
            (acc, item) => acc + item.total,
            0
        );
        const discountProduct = selectedProducts.reduce(
            (acc, item) =>
                acc + item.price * (item.discount / 100) * item.quantity,
            0
        );
        const shippingFee = subTotal > 10000000 ? 10000 : 20000;

        return {
            subTotal,
            discount: discountProduct,
            tax: 0,
            shipping: shippingFee,
            total: subTotal - discountProduct + shippingFee,
        };
    };

    const summary = calculateSummary();

    return (
        <div style={{ margin: "80px 0", padding: "0 120px" }}>
            <h4>Giỏ hàng</h4>
            <div style={{ display: "flex", gap: 24 }}>
                <div style={{ flex: 3 }}>
                    <Table
                        columns={columns}
                        dataSource={cartData}
                        pagination={false}
                        summary={() => (
                            <Table.Summary>
                                <Table.Summary.Row>
                                    <Table.Summary.Cell
                                        colSpan={4}
                                        style={{ textAlign: "right" }}
                                    >
                                        Tổng cộng
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell>
                                        <span
                                            style={{
                                                color: "red",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            {convertPrice(summary.subTotal)} VND
                                        </span>
                                    </Table.Summary.Cell>
                                </Table.Summary.Row>
                            </Table.Summary>
                        )}
                    />
                </div>
                <Card style={{ flex: 1 }}>
                    <p>Tạm tính: {convertPrice(summary.subTotal)} VND</p>
                    <p>Giảm giá: {convertPrice(summary.discount)} VND</p>
                    <p>Thuế: 0</p>
                    <p>Phí giao hàng: {convertPrice(summary.shipping)} VND</p>
                    <hr />
                    <h3>
                        Tổng tiền:{" "}
                        <span style={{ color: "red" }}>
                            {convertPrice(summary.total)} VND
                        </span>
                    </h3>
                    <Button
                        style={{
                            width: "100%",
                            backgroundColor: "red",
                            color: "white",
                            borderColor: "red",
                            marginTop: "20px",
                        }}
                        disabled={listChecked.length === 0}
                    >
                        Mua hàng
                    </Button>
                </Card>
            </div>
        </div>
    );
};

export default OrderPage;
