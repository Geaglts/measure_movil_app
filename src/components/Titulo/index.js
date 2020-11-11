import React from "react";
import { Text } from "react-native";
import { COLOR } from "./LocalVariables";
import { styles } from "./styles";

const index = ({ children, color }) => {
    return (
        <Text style={{ color: color || COLOR, ...styles.text }}>
            {children}
        </Text>
    );
};

export default index;
