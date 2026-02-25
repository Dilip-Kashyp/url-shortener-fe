import React from 'react';
import { Input as AntdInput } from 'antd';

interface InputProps {
    inputProps: React.ComponentProps<typeof AntdInput>;
    type: string;
}

const { Search, Password } = AntdInput;


const Input: React.FC<InputProps> = ({inputProps, type, ...rest}) => {
    const combinedProps = { ...inputProps, ...rest };
    switch (type) {
        case "search":
            return <Search {...combinedProps} />;
        case "password":
            return <Password {...combinedProps} />;
        default:
            return <AntdInput {...combinedProps} />;
    }
};

export default Input;