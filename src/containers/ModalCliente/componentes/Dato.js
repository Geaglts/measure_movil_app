import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Dato({ label, valor, btnLabel, callback, ...props }) {
    return (
        <View style={{ ...styles.contenedor }}>
            {btnLabel ? (
                <TouchableOpacity
                    style={{ ...styles.boton }}
                    onPress={callback}
                >
                    <Text style={{ ...styles.texto_boton }}>{btnLabel}</Text>
                </TouchableOpacity>
            ) : null}
            <Text style={{ ...styles.cabecera }}>{label}</Text>
            {valor ? <Text style={{ ...styles.valor }}>{valor}</Text> : null}
            {props.children}
        </View>
    );
}

const styles = StyleSheet.create({
    contenedor: {
        width: "90%",
        justifyContent: "center",
        alignItems: "center",
    },
    cabecera: {
        textTransform: "capitalize",
        fontSize: 30,
        fontWeight: "bold",
        color: "#2ba6ff",
    },
    valor: {
        fontSize: 26,
        color: "#2a2a2a",
        marginBottom: 15,
    },
    boton: {
        position: "absolute",
        right: 0,
        top: 10.5,
    },
    texto_boton: {
        fontSize: 18,
        fontWeight: "700",
        textTransform: "uppercase",
    },
});
