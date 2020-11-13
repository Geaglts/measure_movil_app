import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { useMutation } from "@apollo/react-hooks";
import BotonIcono from "./BotonIcono";
import Cargando from "./Cargando";
import Button from "./Button";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import OpenInPhone from "../utils/OpenInPhone";

import * as NameScreens from "../navigations/NameScreens";
import { gql } from "apollo-boost";

const styles = StyleSheet.create({
    contenedor: {
        paddingVertical: 10,
        backgroundColor: "#C7EFCF",
        width: "90%",
        height: 150,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
    },
    newPhoneButton: {
        position: "absolute",
        right: -10,
        top: -10,
        backgroundColor: "#EEF5DB",
        borderRadius: 50,
        padding: 5,
        zIndex: 1,
    },
    item: {
        marginVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: "#EEF5DB",
        paddingVertical: 20,
        borderRadius: 5,
    },
    cabecera: {
        fontSize: 28,
        color: "#FE5F55",
        fontWeight: "bold",
        letterSpacing: 1,
    },
    titulo: {
        fontSize: 28,
        color: "#FE5F55",
        fontWeight: "bold",
        width: "90%",
    },
    isMain: {
        fontSize: 24,
        color: "#FE5F55",
    },
    botonera: {
        position: "absolute",
        marginBottom: 5,
        flexDirection: "row",
        bottom: 8,
        right: 13,
    },
    iconButtonContainer: {
        backgroundColor: "#FE5F55",
        marginLeft: 10,
        height: 45,
        width: 45,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50,
    },
});

/**
 * Argumentos (props) de los componentes
 */
let TargetaTelefonoArgs = {
    style: styles.item,
};
let actArgs = {
    iconoArgs: { name: "edit-3", color: "#EEF5DB", size: 25 },
    style: styles.iconButtonContainer,
};
let eliArgs = {
    iconoArgs: { name: "trash-2", color: "#EEF5DB", size: 25 },
    style: styles.iconButtonContainer,
};

/**
 * Funciones varias
 */
const isMain = (activo) => (activo ? "Actual" : "Anterior");

export default function Lista(props) {
    const { client, navigation, updateList, setModalState, visible } = props;
    const { phones, id: clientId } = client;
    const [loading, setLoading] = useState(false);
    const [dropPhone] = useMutation(Graphql.Mutation.DROP_PHONE);

    /**
     * Funciones del componente
     */
    const upPhone = (t) => () => {
        let params = {
            phoneId: t.id,
            act: true,
            phoneType: t.phoneType,
            phone: t.phone,
            clientId,
        };

        navigation.navigate(NameScreens.NEW_PHONE_SCREEN, params);
        setModalState(!visible);
    };
    const delPhone = (t) => async () => {
        try {
            let variables = {
                phoneId: t.id,
                clientId,
            };
            setLoading(true);
            await dropPhone({ variables });
            const updateClients = await updateList.refetch();
            const newClients = updateClients.data.getClients;
            updateList.setClientes(newClients);
            setLoading(false);
        } catch (err) {
            console.log(err.message);
        }
    };
    const moveToNewPhone = () => {
        let params = {
            clientId,
        };
        navigation.navigate(NameScreens.NEW_PHONE_SCREEN, params);
        setModalState(!visible);
    };

    if (loading) return <Cargando />;

    /**
     * Argumentos de los componentes
     */
    let newPhoneArgs = {
        label: (
            <MaterialCommunityIcons name="new-box" size={40} color="#FE5F55" />
        ),
        style: styles.newPhoneButton,
        onPress: moveToNewPhone,
    };
    let scrollArgs = {
        showsVerticalScrollIndicator: false,
    };

    return (
        <>
            <Text style={styles.titulo}>Telefonos</Text>
            <View style={styles.contenedor}>
                <Button {...newPhoneArgs} />
                <ScrollView {...scrollArgs}>
                    {phones.map(({ isMain: main, ...t }) => (
                        <View key={t.id} {...TargetaTelefonoArgs}>
                            <TouchableOpacity onPress={OpenInPhone(t.phone)}>
                                <Text style={styles.cabecera}>{t.phone}</Text>
                            </TouchableOpacity>
                            <Text style={styles.isMain}>{isMain(main)}</Text>
                            <View style={styles.botonera}>
                                <BotonIcono {...actArgs} action={upPhone(t)} />
                                <BotonIcono {...eliArgs} action={delPhone(t)} />
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </>
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
