import React from "react";
import { Text } from "react-native";

import styles from "./styles";

export default (props) => (
    <Text style={{ ...styles.title }}>{props.label}</Text>
);
