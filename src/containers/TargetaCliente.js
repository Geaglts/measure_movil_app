import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import ModalCliente from "../components/ModalCliente";
import Button from "../components/Button";
import ListaDeTelefonos from "../components/ListaTelefonos";
import ListaDeMedidas from "../components/ListaMedidas";
import OpenInApp from "../utils/OpenInPhone";
import * as NameScreens from "../navigations/NameScreens";
import * as ApolloAction from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const styles = StyleSheet.create({
    container: {
        width: "90%",
        backgroundColor: "#c7efcf",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 5,
        marginVertical: 10,
        borderRadius: 5,
    },
    nameModal: {
        fontSize: 34,
        color: "#FE5F55",
        fontWeight: "bold",
        textTransform: "capitalize",
        letterSpacing: 1,
        marginBottom: 10,
    },
    button: {
        position: "absolute",
        right: 10,
        top: 10,
        backgroundColor: "#fe5f55",
        textAlignVertical: "center",
        height: 45,
        width: 45,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    textButton: {
        color: "white",
        fontWeight: "bold",
        fontSize: 24,
        marginLeft: 1,
    },
    name: {
        color: "#fe5f55",
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
        textTransform: "capitalize",
    },
    mainPhone: {
        color: "#fe5f55",
        fontSize: 24,
        textAlign: "center",
    },
    divicion: {
        marginVertical: 8,
        height: 3,
        width: "90%",
        backgroundColor: "#eef5db",
    },
    divicion_margen: {
        marginVertical: 15,
    },
    vistaOpciones: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    buttonOpciones: {
        margin: 5,
    },
    textOpciones: {
        fontSize: 22,
        color: "#fe5f55",
        fontWeight: "bold",
    },
});

export default function TargetaCliente({ navigation, ...props }) {
    const { client, updateList } = props;
    const [modalState, setModalState] = useState(false);
    const { id, name, mainPhone, phones } = client;
    /**
     * Mutaciones y Queries de graphql
     */
    const [dropClient] = ApolloAction.useMutation(Graphql.Mutation.DROP_CLIENT);

    /**
     * Funciones del componente
     */
    const switchModal = () => {
        setModalState(!modalState);
    };
    const toUpdateClient = () => {
        let params = {
            name: name,
            clientId: id,
        };
        navigation.navigate(NameScreens.UPDATE_CLIENT_SCREEN, params);
    };
    const delClient = async () => {
        try {
            let variables = {
                clientId: id,
            };
            await dropClient({ variables });
            const { data } = await updateList.refetch();
            const newClients = data.getClients;
            updateList.setClientes(newClients);
        } catch (e) {
            console.log(e.message);
        }
    };

    /**
     * Argumento de los componentes
     */
    const modalArgs = {
        animationType: "fade",
        transparent: true,
        visible: modalState,
        navigation: navigation,
        updateList: updateList,
        client: client,
        setModalState,
    };
    const buttonArgs = {
        style: styles.button,
        text: {
            style: styles.textButton,
        },
        label: "X",
        onPress: switchModal,
    };
    let vistaPreviArgs = {
        onPress: switchModal,
    };
    let eliminarArgs = {
        label: "Eliminar",
        style: styles.buttonOpciones,
        text: { style: styles.textOpciones },
        onPress: delClient,
    };
    let actualizarArgs = {
        label: "Actualizar",
        style: styles.buttonOpciones,
        text: { style: styles.textOpciones },
        onPress: toUpdateClient,
    };

    return (
        <View style={styles.container}>
            <ModalCliente {...modalArgs}>
                <Button {...buttonArgs} />
                <Text style={styles.nameModal}>{name}</Text>
                <ListaDeTelefonos />
                <View style={styles.divicion_margen} />
                <ListaDeMedidas />
            </ModalCliente>
            <TouchableOpacity {...vistaPreviArgs}>
                <Text style={styles.name}>{name}</Text>
            </TouchableOpacity>
            {mainPhone && (
                <TouchableOpacity onPress={OpenInApp(mainPhone.phone)}>
                    <Text style={styles.mainPhone}>{mainPhone.phone}</Text>
                </TouchableOpacity>
            )}
            <View style={styles.divicion} />
            <View style={styles.vistaOpciones}>
                <Button {...eliminarArgs} />
                <Button {...actualizarArgs} />
            </View>
        </View>
    );
}

const Graphql = {
    Mutation: {
        DROP_CLIENT: gql`
            mutation($clientId: ID!) {
                dropClient(clientId: $clientId) {
                    id
                    name
                }
            }
        `,
    },
};
