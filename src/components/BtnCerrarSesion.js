import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

export default function BtnCerrarSesion({ navigation, label, ...rest }) {
    return (
        <TouchableOpacity activeOpacity={0.3} {...rest}>
            <Text style={styles.texto_link}>Cerrar sesion</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    texto_link: {
        fontSize: 23,
        textTransform: "capitalize",
        fontWeight: "bold",
        color: "#F0B67F",
    },
});
