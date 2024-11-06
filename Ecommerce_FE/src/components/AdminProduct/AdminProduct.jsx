import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Space } from "antd";
import {
    DeleteOutlined,
    EditOutlined,
    PlusOutlined,
    SearchOutlined,
} from "@ant-design/icons";
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
import ModalComponent from "../ModalComponent/ModalComponent";

const AdminProduct = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rowSelected, setRowSelected] = useState("");
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const user = useSelector((state) => state?.user);
    const [isModalDelete, setIsModalDelete] = useState(false);
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);

    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef(null);

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

    //create product
    const mutationCreate = useMutationHooks((data) => {
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
        const res = ProductService.updateProduct(id, token, { ...rests });
        return res;
    });

    //delete product
    const mutationDelete = useMutationHooks((data) => {
        const { id, token } = data;
        const res = ProductService.deleteProduct(id, token);
        return res;
    });

    const getAllProducts = async () => {
        const res = await ProductService.getAllProduct();
        // console.log("res: ", res);
        return res;
    };

    const [form] = Form.useForm();

    const { data, isSuccess, isError } = mutationCreate;

    //update product
    const {
        data: dataUpdated,
        isLoading: isLoadingUpdated,
        isSuccess: isSuccessUpdated,
        isError: isErrorUpdated,
    } = mutationUpdate;

    //delete product
    const {
        data: dataDeleted,
        isLoading: isLoadingDeleted,
        isSuccess: isSuccessDeleted,
        isError: isErrorDeleted,
    } = mutationDelete;
    // console.log("data", data);
    const queryProduct = useQuery({
        queryKey: ["products"],
        queryFn: getAllProducts,
    });
    const { isLoading: isLoadingProducts, data: products = [] } = queryProduct;

    // console.log("product: ", products);

    //crete product
    useEffect(() => {
        if (isSuccess && data?.status === "OK") {
            message.success("Tạo sản phẩm thành công!");
            handleCancel();
            mutationCreate.reset();
        } else if (isError) {
            message.error("Tạo sản phẩm thất bại!");
        }
    }, [isSuccess]);

    //delete product
    useEffect(() => {
        if (isSuccessDeleted && dataDeleted?.status === "OK") {
            message.success("Xóa sản phẩm thành công!");
            handleCancelDelete();
        } else if (isErrorDeleted) {
            message.error("Xóa sản phẩm thất bại!");
        }
    }, [isSuccessDeleted]);

    //update product
    useEffect(() => {
        if (isSuccessUpdated && dataUpdated?.status === "OK") {
            message.success("Cập nhật thành công!");
            handleCloseDrawer();
            mutationUpdate.reset();
        } else if (isErrorUpdated) {
            message.error("Cập nhật thất bại!");
        }
    }, [isSuccessUpdated, isErrorUpdated]);

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

    //create product
    const onFinish = () => {
        mutationCreate.mutate(stateProduct, {
            onSettled: () => {
                queryProduct.refetch();
            },
        });
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
            setIsLoadingUpdate(true);
            fetchGetDetailsProduct(rowSelected);
        }
    }, [rowSelected]);

    const handleDetailsProduct = () => {
        setIsOpenDrawer(true);
    };

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

    //delete product
    const handleCancelDelete = () => {
        setIsModalDelete(false);
        // console.log("handleDeteleProduct", rowSelected);
    };

    //delete product
    const handleDeleteProduct = () => {
        mutationDelete.mutate(
            { id: rowSelected, token: user?.access_token },
            {
                onSettled: () => {
                    queryProduct.refetch();
                },
            }
        );
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
                    onClick={() => setIsModalDelete(true)}
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

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText("");
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
            close,
        }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <InputComponent
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() =>
                        handleSearch(selectedKeys, confirm, dataIndex)
                    }
                    style={{
                        marginBottom: 8,
                        display: "block",
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() =>
                            handleSearch(selectedKeys, confirm, dataIndex)
                        }
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() =>
                            clearFilters && handleReset(clearFilters)
                        }
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? "#1677ff" : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        // render: (text) =>
        //     searchedColumn === dataIndex ? (
        //         <Highlighter
        //             highlightStyle={{
        //                 backgroundColor: "#ffc069",
        //                 padding: 0,
        //             }}
        //             searchWords={[searchText]}
        //             autoEscape
        //             textToHighlight={text ? text.toString() : ""}
        //         />
        //     ) : (
        //         text
        //     ),
    });

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            // render: (text) => <a>{text}</a>,
            sorter: (a, b) => a.name.length - b.name.length,
            ...getColumnSearchProps("name"),
        },
        {
            title: "Price",
            dataIndex: "price",
            sorter: (a, b) => a.price - b.price,
            filters: [
                {
                    text: ">= 10.000.000",
                    value: ">=",
                },
                {
                    text: "<=  10.000.000",
                    value: "<=",
                },
            ],
            onFilter: (value, record) => {
                if (value === ">=") {
                    return record.price >= 10000000;
                }
                return record.price <= 10000000;
            },
            width: "20%",
        },
        {
            title: "Rating",
            dataIndex: "rating",
            sorter: (a, b) => a.rating - b.rating,
            filters: [
                {
                    text: ">= 5",
                    value: ">=",
                },
                {
                    text: "<= 5",
                    value: "<=",
                },
            ],
            onFilter: (value, record) => {
                if (value === ">=") {
                    return record.rating >= 5;
                }
                return record.rating <= 5;
            },
            width: "20%",
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
        mutationUpdate.mutate(
            {
                id: rowSelected,
                token: user?.access_token,
                ...values,
            },
            {
                onSettled: () => {
                    queryProduct.refetch();
                },
            }
        );
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
                <ModalComponent
                    title="Tạo sản phẩm"
                    open={isModalOpen}
                    onCancel={handleCancel}
                    footer={null}
                >
                    <Form
                        form={form} //không nhớ các trường vừa nhập
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
                </ModalComponent>
                <DrawerComponent
                    title="Chi tiết sản phẩm"
                    isOpen={isOpenDrawer}
                    onClose={() => setIsOpenDrawer(false)}
                    width="60%"
                >
                    <Loading isLoading={isLoadingUpdate}>
                        <Form
                            form={form} //không nhớ các trường vừa nhập
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

                <ModalComponent
                    title="Xóa sản phẩm"
                    open={isModalDelete}
                    onOk={handleDeleteProduct}
                    onCancel={handleCancelDelete}
                >
                    <div>Bạn có muốn xóa sản phẩm không!</div>
                </ModalComponent>
            </div>
        </div>
    );
};

export default AdminProduct;
