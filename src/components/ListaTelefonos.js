import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Linking,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useMutation } from "@apollo/react-hooks";
import { BotonIcono } from ".";
import Cargando from "./Cargando";

import { BLUE_COLOR } from "../constants/colors";
import { FORMULARIO_NUEVO_TELEFONO } from "../navigations/NameScreens";
import { gql } from "apollo-boost";

/**
 * Argumentos (props) de los componentes
 */
let TargetaTelefonoArgs = {};
let ActualizarTelefonoArgs = {
    iconName: "edit-3",
};
let EliminarTelefonoArgs = {
    iconName: "trash-2",
};

export default function Lista(props) {
    const { navigate, modalState, telefonos, clienteId, refetch } = props;
    const [loading, setLoading] = useState(false);
    const [dropPhone] = useMutation(Graphql.Mutation.DROP_PHONE);

    const moveToUpdatePhone = (t) => () => {
        let params = {
            phoneId: t.id,
            act: true,
            phoneType: t.phoneType,
            phone: t.phone,
            clientId: clienteId,
        };

        navigate(FORMULARIO_NUEVO_TELEFONO, params);
        modalState[1](!modalState[0]);
    };

    const dropPhoneBtn = (t) => async () => {
        try {
            let variables = {
                phoneId: t.id,
                clientId: clienteId,
            };
            setLoading(true);
            await dropPhone({ variables });
            const updateClients = await refetch.refetch();
            const newClients = updateClients.data.getClients;
            refetch.setClientes(newClients);
            setLoading(false);
        } catch (err) {
            console.log(err.message);
        }
    };

    const openInApp = (t) => () => Linking.openURL(`tel:${t.phone}`);

    TargetaTelefonoArgs["style"] = styles.item;

    return (
        <View style={{ ...styles.contenedor }}>
            <ScrollView>
                {loading ? (
                    <Cargando />
                ) : (
                    telefonos.map((t) => (
                        <View key={t.id} {...TargetaTelefonoArgs}>
                            <TouchableOpacity onPress={openInApp(t)}>
                                <Text style={{ ...styles.cabecera }}>
                                    {t.phone}
                                </Text>
                            </TouchableOpacity>
                            <Text style={{ ...styles.informacion }}>
                                {t.isMain ? "Nuevo" : "Anterior"}
                            </Text>
                            <View style={{ ...styles.botonera }}>
                                <BotonIcono
                                    {...ActualizarTelefonoArgs}
                                    callback={moveToUpdatePhone(t)}
                                />
                                <BotonIcono
                                    {...EliminarTelefonoArgs}
                                    callback={dropPhoneBtn(t)}
                                />
                            </View>
                        </View>
                    ))
                )}
            </ScrollView>
        </View>
    );
}

const Graphql = {
    Mutation: {
        DROP_PHONE: gql`
            mutation($phoneId: ID!, $clientId: ID!) {
                dropPhone(phoneId: $phoneId, clientId: $clientId)
            }
        `,
    },
};

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
        color: BLUE_COLOR,
    },
    botonera: {
        justifyContent: "space-around",
        flexDirection: "row",
        marginBottom: 5,
        borderTopWidth: 1,
        borderTopColor: "#cfcfcf",
    },
});
