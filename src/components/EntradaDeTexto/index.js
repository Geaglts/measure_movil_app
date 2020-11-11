import React from "react";

import { TextInput } from "react-native";
import {
    STANDARD_PLACEHOLDER,
    STANDARD_PLACEHOLDER_COLOR,
    COLOR,
} from "./LocalVariables";

import { styleInput as styleI } from "./styles";

const index = ({
    placeholder,
    onChangeText,
    value,
    color,
    styleInput,
    phcolor,
}) => {
    return (
        <TextInput
            placeholder={
                placeholder
                    ? String(placeholder).toLowerCase()
                    : STANDARD_PLACEHOLDER
            }
            placeholderTextColor={phcolor || STANDARD_PLACEHOLDER_COLOR}
            style={{
                ...styleI(styleInput),
                borderBottomColor: color ? color : COLOR,
                color: color ? color : COLOR,
            }}
            onChangeText={onChangeText}
            value={value}
        />
    );
};

export default index;
