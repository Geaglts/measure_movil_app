import React from "react";
import { StyleSheet, Text } from "react-native";

export default function Error({ error }) {
    return <Text style={styles.error_text}>{error}</Text>;
}

const styles = StyleSheet.create({
    error_text: {
        color: "red",
        fontSize: 18,
        textAlign: "center",
        margin: 10,
        textTransform: "capitalize",
    },
});
