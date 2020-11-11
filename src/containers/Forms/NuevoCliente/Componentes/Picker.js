import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Picker } from "@react-native-community/picker";

export default ({ data, ...props }) => {
    return (
        <Picker style={styles.picker} mode="dropdown" {...props}>
            {data.map(({ type, id }) => {
                return (
                    <Picker.Item
                        color="#aaa"
                        label={type}
                        value={id}
                        key={id}
                    />
                );
            })}
        </Picker>
    );
};

const styles = StyleSheet.create({
    picker: {
        width: "90%",
        height: 50,
        color: "#2a2a2a",
    },
});
