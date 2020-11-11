import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function VistaPrevia({ cliente, ...props }) {
    let { name, mainPhone } = cliente;

    return (
        <TouchableOpacity activeOpacity={0.5} onPress={props.onSubmit}>
            <Text style={{ ...styles.texto }}>{name}</Text>
            <Text style={{ ...styles.numero }}>
                {mainPhone ? mainPhone.phone : "No disponible"}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    texto: {
        color: "#2ba6ff",
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 12,
    },
    numero: { color: "#2ba6ff", fontSize: 26, textAlign: "center" },
});
