import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const COLOR = "#E1F5FE";

export default function ({ PROP, selected, def }) {
    const [value, setValue] = useState(def);

    return (
        <>
            {PROP.map(({ id, type }) => {
                return (
                    <View key={id} style={styles.container}>
                        <TouchableOpacity
                            style={styles.radioCircle}
                            onPress={() => setValue(id)}
                        >
                            {value === id && <View style={styles.selectedRb} />}
                        </TouchableOpacity>
                        <Text style={styles.radioText}>{type}</Text>
                    </View>
                );
            })}
            {selected(value)}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
        alignItems: "center",
        flexDirection: "row",
    },
    radioText: {
        marginLeft: 8,
        fontSize: 20,
        color: COLOR,
        fontWeight: "700",
        textTransform: "capitalize",
    },
    radioCircle: {
        height: 30,
        width: 30,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: COLOR,
        alignItems: "center",
        justifyContent: "center",
    },
    selectedRb: {
        width: 15,
        height: 15,
        borderRadius: 50,
        backgroundColor: COLOR,
    },
});
