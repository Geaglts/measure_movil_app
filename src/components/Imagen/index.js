import React from "react";
import { StyleSheet, Image } from "react-native";

export default function Imagen({ ...props }) {
    return <Image {...props} style={{ ...styles.imagen }} />;
}

const styles = StyleSheet.create({
    imagen: {
        width: "80%",
        height: 150,
        resizeMode: "contain",
        marginBottom: 15,
    },
});
