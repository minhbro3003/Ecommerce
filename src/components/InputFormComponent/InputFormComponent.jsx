import { Input } from "antd";
import React, { useState } from "react";
import { WrapperInputStyle } from "./style";

const InputFormComponent = (props) => {
    const [valueInput, setValueInput] = useState("");
    const { placeholder = "Nhap text", ...rests } = props;
    return (
        <div>
            <WrapperInputStyle
                placeholder={placeholder}
                value={valueInput}
                {...rests}
            />
        </div>
    );
};

export default InputFormComponent;
