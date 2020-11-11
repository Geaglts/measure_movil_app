import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { COLOR, BACKGROUND_COLOR, TEXT_SIZE_ESTANDAR } from "./LocalVariables";
import { styles } from "./styles";

const index = ({ bg, tcolor, onSubmit, tzise, label, containerStyles }) => {
    return (
        <TouchableOpacity
            style={{
                ...styles.contenedor,
                backgroundColor: bg || "#2a2a2a",
                ...containerStyles,
            }}
            activeOpacity={0.5}
            onPress={onSubmit}
        >
            <Text
                style={{
                    ...styles.texto,
                    color: tcolor || COLOR,
                    fontSize: tzise || TEXT_SIZE_ESTANDAR,
                }}
            >
                {label}
            </Text>
        </TouchableOpacity>
    );
};

export default index;
