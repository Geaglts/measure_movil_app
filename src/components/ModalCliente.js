import React from "react";
import { Modal, View, StyleSheet } from "react-native";
import childrenWithProps from "../utils/ChildrenWithProps";

const styles = StyleSheet.create({
    contenido: {
        backgroundColor: "white",
        borderRadius: 20,
        height: "93%",
        width: "90%",
        justifyContent: "center",
        alignItems: "center",
    },
    center_component: {
        justifyContent: "center",
        alignItems: "center",
    },
});

export default function ModalCliente({ children, ...props }) {
    return (
        <Modal {...props}>
            <View style={styles.center_component}>
                <View style={styles.contenido}>
                    {childrenWithProps(children, props)}
                </View>
            </View>
        </Modal>
    );
}
