import React from "react";
import { View } from "react-native";

import { styles } from "./styles";

export const Contenido = ({ children }) => {
    return <View style={{ ...styles.contenido }}>{children}</View>;
};
