import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Card, Checkbox, Form, Table } from "antd";
import { DeleteOutlined, LineOutlined, PlusOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import {
    increaseAmount,
    decreaseAmount,
    removeOrderProduct,
    removeAllOrderProduct,
} from "../../redux/slides/orderSlide";
import { convertPrice } from "../../utils";
import ModalComponent from "../../components/ModalComponent/ModalComponent";
import InputComponent from "../../components/InputComponent/InputComponent";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as UserSevice from "../../services/UserSevice";
import Loading from "../../components/LoadingComponent/Loading";
import { useNavigate } from "react-router";

const OrderPage = () => {
    const dispatch = useDispatch();
    const order = useSelector((state) => state.order.orderItems);
    const user = useSelector((state) => state.user);
    const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false);
    const [listChecked, setListChecked] = useState([]);
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [stateUserDetails, setStateUserDetails] = useState({
        name: "",
        phone: "",
        city: "",
        address: "",
    });

    const cartData = order?.map((item) => ({
        key: item.product,
        image: item.image,
        name: item.name,
        price: item.price,
        discount: item.discount,
        quantity: item.amount,
        total: item.amount * item.price * (1 - item.discount / 100),
    }));

    useEffect(() => {
        if (isOpenModalUpdateInfo) {
            setStateUserDetails({
                name: user?.name,
                phone: user?.phone,
                address: user?.address,
                city: user?.city,
            });
        }
    }, [isOpenModalUpdateInfo]);

    useEffect(() => {
        form.setFieldsValue(stateUserDetails);
    }, [form, stateUserDetails]);

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

    const handleChangeAddress = () => {
        setIsOpenModalUpdateInfo(true);
    };

    // console.log(`listChecked:`, listChecked);
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

    const handleOnChangeDetails = (e) => {
        setStateUserDetails({
            ...stateUserDetails,
            [e.target.name]: e.target.value,
        });
    };

    const handleAddCard = () => {
        console.log("user: ", user);
        if (!user?.phone || !user?.address || !user?.name || !user?.city) {
            setIsOpenModalUpdateInfo(true);
        } else {
            navigate("/payment");
        }
    };

    const handleCancelUpdateInfo = () => {
        setStateUserDetails({
            name: "",
            phone: "",
            address: "",
            city: "",
        });
        form.resetFields();
        setIsOpenModalUpdateInfo(false);
    };

    //update  user
    const mutationUpdate = useMutationHooks((data) => {
        // console.log("data Updat:", data);
        const { id, token, ...rests } = data;
        const res = UserSevice.updateUser(id, { ...rests }, token);
        return res;
    });

    const { isLoading, data } = mutationUpdate;

    const handleUpdateInfoUser = () => {
        const { name, phone, address, city } = stateUserDetails;
        if (phone && address && name && city) {
            mutationUpdate.mutate(
                {
                    id: user?.id,
                    token: user?.access_token,
                    ...stateUserDetails,
                },
                {
                    onSuccess: () => {
                        setIsOpenModalUpdateInfo(false);
                    },
                }
            );
        }
        // console.log("stataUpdateInfo", stateUserDetails);
    };
    console.log("data: ", data);

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
                    <div>
                        <span>Địa chỉ: </span>
                        <span
                            style={{ fontWeight: "bold" }}
                        >{`${user?.address} ${user?.city}`}</span>
                        <span
                            onClick={handleChangeAddress}
                            style={{ color: "blue", cursor: "pointer" }}
                        >
                            Thay đổi
                        </span>
                    </div>
                    <hr />
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
                    <Tooltip title="Vui lòng chọn sản phẩm trước khi mua!">
                        <Button
                            style={{
                                width: "100%",
                                backgroundColor: "red",
                                color: "white",
                                borderColor: "red",
                                marginTop: "20px",
                            }}
                            onClick={() => handleAddCard()}
                            disabled={listChecked.length === 0}
                        >
                            Mua hàng
                        </Button>
                    </Tooltip>
                </Card>
            </div>
            <ModalComponent
                forceRender
                title="Cập nhập thông tin giao hàng"
                open={isOpenModalUpdateInfo}
                onOk={handleUpdateInfoUser}
                onCancel={handleCancelUpdateInfo}
            >
                {/* <Loading isLoading={isLoading}> */}
                <Form
                    form={form}
                    name="userDetails"
                    labelCol={{
                        span: 6,
                    }}
                    wrapperCol={{
                        span: 14,
                    }}
                    style={{
                        maxWidth: 500,
                        marginTop: 30,
                    }}
                    // onFinish={onUpdateUser}
                    autoComplete="on"
                >
                    <Form.Item
                        label="Full Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Please input your name!",
                            },
                        ]}
                    >
                        <InputComponent
                            value={stateUserDetails.name}
                            onChange={handleOnChangeDetails}
                            name="name"
                            // disabled
                        />
                    </Form.Item>

                    <Form.Item
                        label="Phone"
                        name="phone"
                        rules={[
                            {
                                required: true,
                                message: "Please input your phone!",
                            },
                        ]}
                    >
                        <InputComponent
                            value={stateUserDetails.phone}
                            onChange={handleOnChangeDetails}
                            name="phone"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Address"
                        name="address"
                        rules={[
                            {
                                required: true,
                                message: "Please input your address!",
                            },
                        ]}
                    >
                        <InputComponent
                            value={stateUserDetails.address}
                            onChange={handleOnChangeDetails}
                            name="address"
                        />
                    </Form.Item>

                    <Form.Item
                        label="City"
                        name="city"
                        rules={[
                            {
                                required: true,
                                message: "Please input your city!",
                            },
                        ]}
                    >
                        <InputComponent
                            value={stateUserDetails.email}
                            onChange={handleOnChangeDetails}
                            name="city"
                        />
                    </Form.Item>
                </Form>
                {/* </Loading> */}
            </ModalComponent>
        </div>
    );
};

export default OrderPage;
