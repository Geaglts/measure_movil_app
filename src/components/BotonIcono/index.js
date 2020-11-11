import React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function BotonIcono({
    callback,
    iconName,
    sizeIcon,
    colorIcon,
    label,
    ...props
}) {
    return (
        <View {...props}>
            <TouchableOpacity
                onPress={callback}
                style={{ ...styles.margin, ...styles.contenedor_boton }}
            >
                {label ? (
                    <Text
                        style={{
                            ...styles.label,
                            color: colorIcon || "#2ba6ff",
                        }}
                    >
                        {label}
                    </Text>
                ) : null}
                <Feather
                    name={iconName || ""}
                    size={sizeIcon || 30}
                    color={colorIcon || "#2ba6ff"}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    contenedor_boton: {
        flexDirection: "row",
    },
    margin: {
        marginTop: 5,
    },
    label: { fontSize: 22, fontWeight: "bold", marginRight: 5 },
});
