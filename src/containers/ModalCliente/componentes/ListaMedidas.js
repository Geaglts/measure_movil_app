import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useMutation } from "@apollo/react-hooks";
import { BotonIcono } from "../../../components";

import { BLUE_COLOR } from "../../../constants/colors";
import { ScrollView } from "react-native-gesture-handler";

import fun from "../funciones";
import { ELIMINAR_MEDIDA } from "../graphql/Mutation";

const Informacion = ({ label, valor }) => {
    return (
        <Text style={{ ...styles.cabecera }}>
            {label}: {<Text style={{ ...styles.informacion }}>{valor}</Text>}
        </Text>
    );
};

export default function Lista(props) {
    const [eliminarMedida] = useMutation(ELIMINAR_MEDIDA);

    return (
        <View style={{ ...styles.contenedor }}>
            <ScrollView>
                {props.medidas.map((item) => (
                    <View key={item.id} style={{ ...styles.item }}>
                        <Informacion label="Altura" valor={item.height} />
                        <Informacion label="Cintura" valor={item.waist} />
                        <View style={{ ...styles.botonera }}>
                            <BotonIcono
                                iconName="edit-3"
                                callback={() =>
                                    fun.actualizarMedida(props, item)
                                }
                            />
                            <BotonIcono
                                iconName="trash-2"
                                callback={() =>
                                    fun.eliminarMedida(
                                        id,
                                        eliminarMedida,
                                        props
                                    )
                                }
                            />
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    contenedor: {
        backgroundColor: "#f9f9f9",
        width: "90%",
        height: 150,
        borderRadius: 10,
    },
    item: {
        marginHorizontal: 20,
        marginTop: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#cfcfcf",
    },
    cabecera: {
        fontSize: 24,
        color: BLUE_COLOR,
        fontWeight: "bold",
    },
    informacion: {
        fontSize: 20,
        color: "#2a2a2a",
    },
    botonera: {
        justifyContent: "space-around",
        flexDirection: "row",
        marginBottom: 5,
        borderTopWidth: 1,
        borderTopColor: "#cfcfcf",
    },
});
