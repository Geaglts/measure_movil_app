import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        position: "absolute",
        alignItems: "center",
        width: "100%",
        height: "100%",
    },
    inputContent: {
        width: "100%",
        alignItems: "center",
        marginTop: 46,
        marginBottom: 10,
        zIndex: 1,
        elevation: 9,
    },
    content: {
        position: "absolute",
        backgroundColor: "#fff",
        width: "90%",
        height: "80%",
        borderRadius: 10,
        paddingVertical: 5,
        bottom: "3.1%",
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
    },
    scroll: {
        width: "100%",
    },
    scrollContent: {
        justifyContent: "center",
        alignItems: "center",
    },
    cardContainer: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 5,
        marginVertical: 10,
    },
});
