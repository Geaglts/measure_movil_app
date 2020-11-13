import React from "react";
import { ActivityIndicator } from "react-native";

export default function Cargando() {
    return (
        <ActivityIndicator
            color="#FE5F55"
            size="small"
            style={{ margin: 10 }}
        />
    );
}
