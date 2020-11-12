import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Link({ label, ...rest }) {
    return (
        <TouchableOpacity {...rest}>
            <Text style={styles.link_text}>{label}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    link_text: {
        color: "#2ba6ff",
        fontSize: 18,
        textDecorationLine: "underline",
    },
});
