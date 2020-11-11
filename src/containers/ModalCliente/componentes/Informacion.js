import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { center_component } from "../../../constants/styles";

export default function Informacion({ cliente, children, ...props }) {
    return (
        <View style={{ ...center_component, ...styles.contenedor }}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    contenedor: {
        position: "relative",
        height: "86%",
        width: "100%",
    },
});
