import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import TableComponent from "../TableComponent/TableComponent";
import { WrapperHeader } from "./style";
import InputComponent from "../InputComponent/InputComponent";
import { WrapperUploadFile } from "../../pages/ProfilePage/style";
import { getBase64 } from "../../utils";
import * as ProductService from "../../services/ProductService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as message from "../../components/Message/Message";
import TextArea from "antd/es/input/TextArea";
import { useQuery } from "@tanstack/react-query";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import Loading from "../LoadingComponent/Loading";
import { useSelector } from "react-redux";

const AdminProduct = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rowSelected, setRowSelected] = useState("");
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const user = useSelector((state) => state?.user);
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);

    const [stateProduct, setStateProduct] = useState({
        name: "",
        type: "",
        countInStock: "",
        price: "",
        rating: "",
        description: "",
        image: "",
    });

    const [stateProductDetails, setStateProductDetails] = useState({
        name: "",
        type: "",
        countInStock: "",
        price: "",
        rating: "",
        description: "",
        image: "",
    });

    const mutation = useMutationHooks((data) => {
        const { name, type, countInStock, price, rating, description, image } =
            data;
        const res = ProductService.createProduct({
            name,
            type,
            countInStock,
            price,
            rating,
            description,
            image,
        });
        return res;
    });

    //update  product
    const mutationUpdate = useMutationHooks((data) => {
        console.log("data Updat:", data);
        const { id, token, ...rests } = data;
        const res = ProductService.updateProduct(id, token, rests);
        return res;
    });

    const getAllProducts = async () => {
        const res = await ProductService.getAllProduct();
        console.log("res: ", res);
        return res;
    };

    const [form] = Form.useForm();

    const { data, isSuccess, isError } = mutation;
    //update product
    const {
        data: dataUpdated,
        isLoading: isLoadingUpdated,
        isSuccess: isSuccessUpdated,
        isError: isErrorUpdated,
    } = mutationUpdate;
    // console.log("data", data);

    const { isLoading: isLoadingProducts, data: products = [] } = useQuery({
        queryKey: ["products"],
        queryFn: getAllProducts,
    });
    // console.log("product: ", products);

    useEffect(() => {
        if (isSuccess && data?.status === "OK") {
            message.success();
            handleCancel();
        } else if (isError) {
            message.error();
        }
    }, [isSuccess]);

    //update product
    useEffect(() => {
        if (isSuccessUpdated && dataUpdated?.status === "OK") {
            message.success();
            handleCloseDrawer();
        } else if (isErrorUpdated) {
            message.error();
        }
    }, [isSuccessUpdated]);

    const handleCancel = () => {
        setIsModalOpen(false);
        setStateProduct({
            name: "",
            type: "",
            countInStock: "",
            price: "",
            rating: "",
            description: "",
            image: "",
        });
        form.resetFields();
    };
    //update product
    const handleCloseDrawer = () => {
        setIsOpenDrawer(false);
        setStateProductDetails({
            name: "",
            type: "",
            countInStock: "",
            price: "",
            rating: "",
            description: "",
            image: "",
        });
        form.resetFields();
    };

    const onFinish = () => {
        mutation.mutate(stateProduct);
        // console.log("finished", stateProduct);
    };

    const handleOnChange = (e) => {
        setStateProduct({
            ...stateProduct,
            [e.target.name]: e.target.value,
        });
        console.log("e.target", e.target.name, e.target.value);
    };

    const handleOnChangeImage = async ({ fileList }) => {
        const file = fileList[0];
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateProduct({
            ...stateProduct,
            image: file.preview,
        });
    };

    //get details of product
    const handleOnChangeDetails = (e) => {
        setStateProductDetails({
            ...stateProductDetails,
            [e.target.name]: e.target.value,
        });
        // console.log("e.target", e.target.name, e.target.value);
    };

    console.log("state - product:", stateProductDetails);
    //details of product
    useEffect(() => {
        // if (stateProductDetails) {
        form.setFieldsValue(stateProductDetails);
        // }
    }, [form, stateProductDetails]);
    //details of product
    useEffect(() => {
        if (rowSelected) {
            fetchGetDetailsProduct(rowSelected);
        }
    }, [rowSelected]);

    //get image product details
    const handleOnChangeImageDetails = async ({ fileList }) => {
        const file = fileList[0];
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateProductDetails({
            ...stateProductDetails,
            image: file.preview,
        });
    };

    //details of product
    const fetchGetDetailsProduct = async (rowSelected) => {
        const res = await ProductService.getDetailsProduct(rowSelected);
        console.log("Fetched Product Details:", res); // Log the response
        if (res?.data) {
            setStateProductDetails({
                name: res?.data?.name,
                type: res?.data?.type,
                countInStock: res?.data?.countInStock,
                price: res?.data?.price,
                rating: res?.data?.rating,
                description: res?.data?.description,
                image: res?.data?.image,
            });
        }
        setIsLoadingUpdate(false);
    };

    const handleDetailsProduct = () => {
        if (rowSelected) {
            setIsLoadingUpdate(true);
            fetchGetDetailsProduct(rowSelected);
            setIsOpenDrawer(true);
        }

        console.log("rowSelected", rowSelected);
    };

    const handleDeteleProduct = () => {
        console.log("handleDeteleProduct", rowSelected);
    };

    const renderAction = () => {
        return (
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <DeleteOutlined
                    style={{
                        color: "red",
                        fontSize: "20px",
                        cursor: "pointer",
                    }}
                    onClick={handleDeteleProduct}
                />
                <EditOutlined
                    style={{
                        color: "orange",
                        fontSize: "20px",
                        cursor: "pointer",
                    }}
                    onClick={handleDetailsProduct}
                />
            </div>
        );
    };

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            render: (text) => <a>{text}</a>,
        },
        {
            title: "Price",
            dataIndex: "price",
        },
        {
            title: "Rating",
            dataIndex: "rating",
        },
        {
            title: "Type",
            dataIndex: "type",
        },
        {
            title: "Action",
            dataIndex: "action",
            render: renderAction,
        },
    ];

    const dataTable =
        products?.data?.length &&
        products?.data?.map((p) => {
            return { ...p, key: p._id };
        });

    const onUpdateProduct = (values) => {
        console.log("Updating product with values: ", values);
        mutationUpdate.mutate({
            id: rowSelected,
            token: user?.access_token,
            stateProductDetails: values,
        });
    };
    return (
        <div>
            <WrapperHeader>Quản lý sản phẩm</WrapperHeader>
            <div style={{ margin: "15px 0" }}>
                <Button
                    style={{
                        height: "150px",
                        width: "150px",
                        borderRadius: "6px",
                        borderStyle: "dashed",
                        marginBottom: "15px",
                    }}
                    onClick={() => setIsModalOpen(true)}
                >
                    <PlusOutlined style={{ fontSize: "60px" }} />
                </Button>
                <div>
                    <TableComponent
                        columns={columns}
                        isLoading={isLoadingProducts}
                        data={dataTable}
                        onRow={(record, rowIndex) => {
                            return {
                                onClick: (event) => {
                                    setRowSelected(record._id);
                                },
                            };
                        }}
                    />
                </div>
                <Modal
                    title="Tạo sản phẩm"
                    open={isModalOpen}
                    onCancel={handleCancel}
                    footer={null}
                >
                    <Form
                        name="createProduct"
                        labelCol={{
                            span: 10,
                        }}
                        wrapperCol={{
                            span: 14,
                        }}
                        style={{
                            maxWidth: 600,
                        }}
                        onFinish={onFinish}
                        autoComplete="on"
                        form={form} //không nhớ các trường vừa nhập
                        // initialValues={{
                        //     remember: true,
                        // }}

                        // onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            label="Name"
                            name="Name"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your name!",
                                },
                            ]}
                        >
                            <InputComponent
                                value={stateProduct.name}
                                onChange={handleOnChange}
                                name="name"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Type"
                            name="Type"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your type!",
                                },
                            ]}
                        >
                            <InputComponent
                                value={stateProduct.type}
                                onChange={handleOnChange}
                                name="type"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Count In Stock"
                            name="CountInStock"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "Please input your count in stock!",
                                },
                            ]}
                        >
                            <InputComponent
                                value={stateProduct.countInStock}
                                onChange={handleOnChange}
                                name="countInStock"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Price"
                            name="Price"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your price!",
                                },
                            ]}
                        >
                            <InputComponent
                                value={stateProduct.price}
                                onChange={handleOnChange}
                                name="price"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Rating"
                            name="Rating"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your rating!",
                                },
                            ]}
                        >
                            <InputComponent
                                value={stateProduct.rating}
                                onChange={handleOnChange}
                                name="rating"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Description"
                            name="Description"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your description!",
                                },
                            ]}
                        >
                            <TextArea
                                rows={4}
                                value={stateProduct.description}
                                onChange={handleOnChange}
                                name="description"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Image"
                            name="image"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your image!",
                                },
                            ]}
                        >
                            <WrapperUploadFile
                                onChange={handleOnChangeImage}
                                maxCount={1}
                            >
                                <Button>Select File</Button>
                                {stateProduct?.image && (
                                    <img
                                        src={stateProduct?.image}
                                        style={{
                                            height: "64px",
                                            width: "64px",
                                            borderRadius: "15%",
                                            objectFit: "cover",
                                            marginLeft: "10px",
                                        }}
                                        alt="image"
                                    />
                                )}
                            </WrapperUploadFile>
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
                <DrawerComponent
                    title="Chi tiết sản phẩm"
                    isOpen={isOpenDrawer}
                    onClose={() => setIsOpenDrawer(false)}
                    width="60%"
                >
                    <Loading isLoading={isLoadingUpdate}>
                        <Form
                            name="productDetails"
                            labelCol={{
                                span: 10,
                            }}
                            wrapperCol={{
                                span: 14,
                            }}
                            style={{
                                maxWidth: 600,
                            }}
                            onFinish={onUpdateProduct}
                            autoComplete="on"
                            form={form} //không nhớ các trường vừa nhập
                        >
                            <Form.Item
                                label="Name"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your name!",
                                    },
                                ]}
                            >
                                <InputComponent
                                    value={stateProductDetails.name}
                                    onChange={handleOnChangeDetails}
                                    name="name"
                                    // disabled
                                />
                            </Form.Item>

                            <Form.Item
                                label="Type"
                                name="type"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your type!",
                                    },
                                ]}
                            >
                                <InputComponent
                                    value={stateProductDetails.type}
                                    onChange={handleOnChangeDetails}
                                    name="type"
                                />
                            </Form.Item>

                            <Form.Item
                                label="Count In Stock"
                                name="countInStock"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Please input your count in stock!",
                                    },
                                ]}
                            >
                                <InputComponent
                                    value={stateProductDetails.countInStock}
                                    onChange={handleOnChangeDetails}
                                    name="countInStock"
                                />
                            </Form.Item>

                            <Form.Item
                                label="Price"
                                name="price"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your price!",
                                    },
                                ]}
                            >
                                <InputComponent
                                    value={stateProductDetails.price}
                                    onChange={handleOnChangeDetails}
                                    name="price"
                                />
                            </Form.Item>

                            <Form.Item
                                label="Rating"
                                name="rating"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your rating!",
                                    },
                                ]}
                            >
                                <InputComponent
                                    value={stateProductDetails.rating}
                                    onChange={handleOnChangeDetails}
                                    name="rating"
                                />
                            </Form.Item>

                            <Form.Item
                                label="Description"
                                name="description"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Please input your description!",
                                    },
                                ]}
                            >
                                <TextArea
                                    rows={4}
                                    value={stateProductDetails.description}
                                    onChange={handleOnChangeDetails}
                                    name="description"
                                />
                            </Form.Item>

                            <Form.Item
                                label="Image"
                                name="image"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your image!",
                                    },
                                ]}
                            >
                                <WrapperUploadFile
                                    onChange={handleOnChangeImageDetails}
                                    maxCount={1}
                                >
                                    <Button>Select File</Button>
                                    {stateProductDetails?.image && (
                                        <img
                                            src={stateProductDetails?.image}
                                            style={{
                                                height: "64px",
                                                width: "64px",
                                                borderRadius: "15%",
                                                objectFit: "cover",
                                                marginLeft: "10px",
                                            }}
                                            alt="image product"
                                        />
                                    )}
                                </WrapperUploadFile>
                            </Form.Item>

                            <Form.Item
                                wrapperCol={{
                                    offset: 8,
                                    span: 16,
                                }}
                            >
                                <Button type="primary" htmlType="submit">
                                    Apply
                                </Button>
                            </Form.Item>
                        </Form>
                    </Loading>
                </DrawerComponent>
            </div>
        </div>
    );
};

export default AdminProduct;
