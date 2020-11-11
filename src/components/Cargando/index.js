import React from "react";
import { ActivityIndicator } from "react-native";

export default function Cargando() {
    return (
        <ActivityIndicator
            color="#2b4eff"
            size="small"
            style={{ margin: 10 }}
        />
    );
}
