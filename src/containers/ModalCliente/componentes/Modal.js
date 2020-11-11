import React from "react";
import { StyleSheet, View } from "react-native";

import { center_component } from "../../../constants/styles";

export default function VistaDelModal({ children, ...props }) {
    return (
        <View style={{ ...center_component }}>
            <View style={{ ...styles.contenido }}>{children}</View>
        </View>
    );
}

const styles = StyleSheet.create({
    contenido: {
        backgroundColor: "white",
        borderRadius: 20,
        height: "93%",
        width: "90%",
        justifyContent: "center",
        alignItems: "center",
    },
});
