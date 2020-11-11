import React from "react";
import { StyleSheet, View, TextInput } from "react-native";

import { shadow } from "../../../constants/styles";

export default function SearchBar(props) {
    return (
        <View style={{ ...styles.container }}>
            <TextInput
                style={{ ...styles.text_input, ...shadow }}
                placeholder={props.placeholder}
                placeholderTextColor="#cacaca"
                onChangeText={props.onChangeText}
                value={props.value}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: "center",
        marginTop: 46,
        marginBottom: 10,
        zIndex: 1,
        elevation: 9,
    },
    text_input: {
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: 22,
        fontWeight: "bold",
        backgroundColor: "#ffffff",
        borderRadius: 50,
        width: "90%",
        paddingVertical: 8,
        paddingHorizontal: 20,
        color: "#2ba6ff",
    },
});
