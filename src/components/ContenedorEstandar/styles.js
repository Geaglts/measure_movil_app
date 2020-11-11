import { StyleSheet } from "react-native";

import { MARGEN, CENTER_CONTENT } from "./LocalVariables";

export const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        position: "absolute",
        ...CENTER_CONTENT,
    },
    contenido: {
        width: `${100 - MARGEN}%`,
        height: `${100 - MARGEN}%`,
        backgroundColor: "#fff",
        borderRadius: 10,
        ...CENTER_CONTENT,
    },
    scroll_container: {
        width: "100%",
    },
    scroll_content: {
        flexGrow: 1,
    },
    contenido_view: {
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
});
