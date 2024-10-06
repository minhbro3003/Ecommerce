import { Button, Input } from "antd";
import React from "react";
import { SearchOutlined } from "@ant-design/icons";
const ButtonInputSearch = (props) => {
    const { size, placeholder, textButton, bordered, backgroundColor } = props;
    return (
        <div style={{ display: "flex", backgroundColor: backgroundColor }}>
            <Input size={size} placeholder={placeholder} />
            <Button
                style={{ background: "#4257ce", color: "#fff", border: "none" }}
                size={size}
                bordered={bordered}
                icon={<SearchOutlined />}
            >
                {textButton}
            </Button>
        </div>
    );
};

export default ButtonInputSearch;
