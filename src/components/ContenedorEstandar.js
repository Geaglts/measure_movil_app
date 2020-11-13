import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import ChildrenWithProps from "../utils/ChildrenWithProps";
const GRADIENT_COLORS = ["#c7efcf", "#d6d1b1"];

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
    },
    contenido: {
        width: `90%`,
        height: `90%`,
        backgroundColor: "#fff",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
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

let gradientArgs = {
    colors: GRADIENT_COLORS,
    style: styles.container,
};

let contenedorArgs = {
    style: styles.contenido,
};

let scrollArgs = {
    style: styles.scroll_container,
    contentContainerStyle: styles.scroll_content,
};

let contenidoArgs = {
    style: styles.contenido_view,
};

export default function ContenedorEstandar({ children, ...rest }) {
    return (
        <LinearGradient {...gradientArgs}>
            <View {...contenedorArgs}>
                <ScrollView {...scrollArgs}>
                    <View {...contenidoArgs}>
                        {ChildrenWithProps(children, rest)}
                    </View>
                </ScrollView>
            </View>
        </LinearGradient>
    );
}
