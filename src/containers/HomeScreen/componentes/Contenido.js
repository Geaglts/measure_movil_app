import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";

import { shadow } from "../../../constants/styles";

export default function Contenido(props) {
    return (
        <View style={{ ...styles.content, ...shadow }}>
            <ScrollView style={{ ...styles.scroll }}>
                <View style={{ ...styles.scrollContent }}>
                    {props.children}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    content: {
        position: "absolute",
        backgroundColor: "#fff",
        width: "90%",
        height: "80%",
        borderRadius: 10,
        paddingVertical: 5,
        bottom: "3.1%",
    },
    scroll: {
        width: "100%",
    },
    scrollContent: {
        justifyContent: "center",
        alignItems: "center",
    },
});
