import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { shadow } from "../../../constants/styles";

export default ({ onSubmit }) => {
    return (
        <TouchableOpacity
            style={{
                ...styles.container,
                ...shadow,
                elevation: 9,
            }}
            activeOpacity={0.6}
            onPress={onSubmit}
        >
            <LinearGradient
                colors={["#2bffed", "#2ba6ff"]}
                style={styles.content}
            >
                <Text style={{ ...styles.text }}>+</Text>
            </LinearGradient>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 14,
        right: 14,
        zIndex: 1,
    },
    content: {
        backgroundColor: "#2ba6ff",
        justifyContent: "center",
        alignItems: "center",
        height: 60,
        width: 60,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: "#fff",
    },
    text: { fontSize: 42, fontWeight: "bold", color: "white" },
});
