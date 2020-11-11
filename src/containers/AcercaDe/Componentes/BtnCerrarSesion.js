import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { deleteToken } from "../../../../token";
import { AUTH_LOADING } from "../../../navigations/NameScreens";

export default function BtnCerrarSesion({ navigation }) {
    let { navigate } = navigation;

    const cerrarSesion = async () => {
        try {
            await deleteToken();
            navigate(AUTH_LOADING);
        } catch (error) {
            console.log("BtnCerrarSesion => f(cerrarSesion)");
        }
    };

    return (
        <View style={{ ...styles.container }}>
            <TouchableOpacity
                activeOpacity={0.3}
                style={{ ...styles.link }}
                onPress={cerrarSesion}
            >
                <Text style={{ ...styles.texto_link }}>Cerrar sesion</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "55%",
        alignItems: "center",
        justifyContent: "flex-end",
        marginBottom: 25,
    },
    texto_link: {
        fontSize: 23,
        textTransform: "capitalize",
        fontWeight: "bold",
        color: "#2ba6ff",
    },
});
