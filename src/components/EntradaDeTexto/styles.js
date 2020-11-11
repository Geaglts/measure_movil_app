import { StyleSheet } from "react-native";

import { PORCENTAJE, COLOR } from "./LocalVariables";

export const styles = StyleSheet.create({
    textInput: {
        fontSize: 26,
        width: PORCENTAJE(90),
        padding: 5,
        textAlign: "center",
        fontWeight: "bold",
    },
    underline: {
        backgroundColor: "#efefef",
        paddingVertical: 10,
        borderBottomColor: COLOR,
        borderBottomWidth: 5,
    },
    border: { borderBottomColor: COLOR, borderBottomWidth: 5 },
    bigFont: {
        fontSize: 26,
    },
    grayType: {
        width: "80%",
        height: 50,
        textAlign: "center",
        textAlignVertical: "center",
        color: "#2a2a2a",
        backgroundColor: "#efefef",
        fontSize: 20,
        borderRadius: 3,
        fontWeight: "bold",
    },
});

//underline style
export const styleInput = (style) => {
    switch (String(style).trim().toLowerCase()) {
        case "underline":
            return {
                ...styles.textInput,
                ...styles.underline,
                ...styles.border,
            };
        case "big-font":
            return {
                ...styles.textInput,
                ...styles.bigFont,
            };
        case "gray-input":
            return {
                ...styles.grayType,
            };
        default:
            return styles.textInput;
    }
};
