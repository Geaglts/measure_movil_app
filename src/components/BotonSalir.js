import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function BotonSalir({ onSubmit }) {
    return (
        <View style={{ ...styles.contenedor }}>
            <TouchableOpacity
                style={{ ...styles.boton }}
                activeOpacity={0.5}
                onPress={onSubmit}
            >
                <Text style={{ ...styles.label }}>x</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    contenedor: {
        position: "absolute",
        top: 15,
        right: 15,
    },
    boton: {
        backgroundColor: "#2ba6ff",
        textAlignVertical: "center",
        height: 45,
        width: 45,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
    },
    label: {
        color: "white",
        fontWeight: "bold",
        fontSize: 36,
        marginBottom: 8,
        marginLeft: 1,
    },
});
