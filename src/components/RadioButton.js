import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

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

let COLOR = "#E1F5FE";

export default function (props) {
    const { PROP, selected, initial, color, ...rest } = props;
    const [value, setValue] = useState(initial);

    /**
     * Argumentos de los componenetes
     */
    let ButtonOptionArgs = {
        style: { ...styles.radioCircle, borderColor: color || COLOR },
    };
    let ValueOptionArgs = {
        style: { ...styles.selectedRb, backgroundColor: color || COLOR },
    };
    let TextOptionArgs = {
        style: { ...styles.radioText, color: color || COLOR },
    };

    return (
        <View {...rest}>
            {PROP.map(({ id, type }) => {
                return (
                    <View key={id} style={styles.container}>
                        <TouchableOpacity
                            onPress={() => setValue(id)}
                            {...ButtonOptionArgs}
                        >
                            {value === id && <View {...ValueOptionArgs} />}
                        </TouchableOpacity>
                        <Text {...TextOptionArgs}>{type}</Text>
                    </View>
                );
            })}
            {selected(value)}
        </View>
    );
}
