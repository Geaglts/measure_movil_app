import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function Contenedor(props) {
    return (
        <LinearGradient
            colors={["#c7efcf", "#d6d1b1"]}
            style={{ ...styles.container }}
        >
            {props.children}
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        alignItems: "center",
        width: "100%",
        height: "100%",
    },
});
