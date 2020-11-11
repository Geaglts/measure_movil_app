import React from "react";
import { ScrollView, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { Contenido } from "./Componentes";

import {
    PRIMER_COLOR_GRADIENTE,
    SEGUNDO_COLOR_GRADIENTE,
} from "./LocalVariables";

import { styles } from "./styles";

const index = ({ children }) => {
    return (
        <LinearGradient
            colors={[PRIMER_COLOR_GRADIENTE, SEGUNDO_COLOR_GRADIENTE]}
            style={{ ...styles.container }}
        >
            <Contenido>
                <ScrollView
                    style={{ ...styles.scroll_container }}
                    contentContainerStyle={{ ...styles.scroll_content }}
                >
                    <View style={{ ...styles.contenido_view }}>{children}</View>
                </ScrollView>
            </Contenido>
        </LinearGradient>
    );
};

export default index;
