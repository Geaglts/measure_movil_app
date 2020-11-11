import React from "react";
import { Text, TouchableOpacity } from "react-native";

export default function Button({ label, text, ...rest }) {
    return (
        <TouchableOpacity {...rest}>
            <Text {...text}>{label}</Text>
        </TouchableOpacity>
    );
}
