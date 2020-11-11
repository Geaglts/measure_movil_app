import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Link({ isLogin, ...props }) {
    return (
        <TouchableOpacity style={{ ...styles.link_container }} {...props}>
            <Text style={{ ...styles.link_text }}>
                {isLogin ? "Crear una cuenta" : "Ya tengo una cuenta"}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    link_container: {
        marginTop: 25,
    },
    link_text: {
        color: "#2ba6ff",
        fontSize: 18,
        textDecorationLine: "underline",
    },
});
