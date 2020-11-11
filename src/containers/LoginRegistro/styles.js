import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    imagen: {
        width: "80%",
        height: 150,
        resizeMode: "contain",
        marginBottom: 15,
    },
    titulo: {
        fontSize: 23,
        fontWeight: "bold",
        color: "#2ba6ff",
        textTransform: "capitalize",
        letterSpacing: 1,
    },
    input: {
        margin: 10,
        backgroundColor: "#fafafa",
        height: 45,
        width: "90%",
        borderRadius: 30,
        textAlign: "center",
        fontSize: 22,
        fontWeight: "bold",
        color: "#4a4a4a",
    },
    keyboard_avoiding: {
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
});
