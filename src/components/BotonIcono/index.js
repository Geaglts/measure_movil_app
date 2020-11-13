import React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function BotonIcono({ children, ...props }) {
    let { iconoArgs, label, action, ...rest } = props;

    /**
     * Argumentos de los componentes
     */
    let botonArgs = {
        onPress: action,
        style: styles.contenedor_boton,
    };

    return (
        <TouchableOpacity {...botonArgs}>
            <View {...rest}>
                {children}
                <Feather {...iconoArgs} />
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    contenedor_boton: {
        flexDirection: "row",
    },
    label: { fontSize: 22, fontWeight: "bold", marginRight: 5 },
});
