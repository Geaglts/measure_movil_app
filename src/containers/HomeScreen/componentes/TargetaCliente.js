import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
// import ModalDeUsuario from "../../ModalUserData";
import ModalDeUsuario from "../../ModalCliente";

import { shadow } from "../../../constants/styles";

const BotonDeTarjeta = (props) => {
    return (
        <TouchableOpacity
            onPress={props.onSubmit}
            style={{ ...styles.boton_targeta, ...styles.posicion_icono }}
            activeOpacity={0.5}
        >
            {props.label ? (
                <Text style={{ ...styles.boton_targeta_text }}>
                    {props.label}
                </Text>
            ) : null}
            {props.children}
        </TouchableOpacity>
    );
};

export default function TargetaCliente(props) {
    return (
        <View style={{ ...styles.container }}>
            <View style={{ ...shadow, ...styles.content }}>
                <View style={{ ...styles.datos_principales }}>
                    <ModalDeUsuario
                        refetch={props.utilsToRefetch}
                        cliente={props.data}
                        navigation={props.navigation}
                    />
                </View>
                <View style={{ ...styles.contenedor_botonera }}>
                    <View
                        style={{
                            ...styles.botonera,
                        }}
                    >
                        <BotonDeTarjeta
                            label="Eliminar"
                            onSubmit={props.delete}
                        >
                            <AntDesign
                                name="delete"
                                size={32}
                                color="#2ba6ff"
                            />
                        </BotonDeTarjeta>
                        <BotonDeTarjeta
                            label="Actualizar"
                            onSubmit={props.update}
                        >
                            <MaterialIcons
                                name="update"
                                size={33}
                                color="#2ba6ff"
                            />
                        </BotonDeTarjeta>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 5,
        marginVertical: 10,
    },
    content: {
        backgroundColor: "#fff",
        width: "90%",
        height: 230,
        borderRadius: 7,
    },
    datos_principales: {
        justifyContent: "center",
        alignItems: "center",
        height: 170,
    },
    contenedor_botonera: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: 60,
        alignItems: "center",
    },
    botonera: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "90%",
        borderTopColor: "#cfcfcf",
        borderTopWidth: 2,
    },
    boton_targeta: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 2,
    },
    boton_targeta_text: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#2ba6ff",
    },
    posicion_icono: {
        position: "relative",
        left: 0,
        top: 10,
    },
});
