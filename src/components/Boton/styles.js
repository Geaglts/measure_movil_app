import { StyleSheet } from "react-native";

import { PADDING_ESTANDAR } from "./LocalVariables";

export const styles = StyleSheet.create({
    contenedor: {
        paddingHorizontal: PADDING_ESTANDAR / 2.35,
        paddingVertical: PADDING_ESTANDAR / 4,
        borderRadius: 50,
    },
    texto: {
        fontWeight: "bold",
        textTransform: "uppercase",
        letterSpacing: 1,
    },
});
