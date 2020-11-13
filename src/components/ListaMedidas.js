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
        fontSize: 26,
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

export default function Lista(props) {
    const { client, navigation, updateList, setModalState, visible } = props;
    const { id: clientId, measures } = client;
    const [loading, setLoading] = useState(false);
    const [dropMeasure] = useMutation(Graphql.Mutation.DROP_MEASURE);

    /**
     * Funciones del componente
     */
    const update = (m) => () => {
        let params = {
            measureId: m.id,
            waist: String(m.waist),
            height: String(m.height),
            act: true,
            clientId,
        };

        navigation.navigate(NameScreens.NUEVA_MEDIDA, params);
        setModalState(!visible);
    };
    const drop = (m) => async () => {
        try {
            let variables = {
                measureId: m.id,
                clientId,
            };
            setLoading(true);
            await dropMeasure({ variables });
            const updateClients = await updateList.refetch();
            const newClients = updateClients.data.getClients;
            updateList.setClientes(newClients);
            setLoading(false);
        } catch (err) {
            console.log(err.message);
        }
    };
    const add = () => {
        let params = {
            clientId,
        };
        navigation.navigate(NameScreens.NUEVA_MEDIDA, params);
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
        onPress: add,
    };

    return (
        <>
            <Text style={styles.titulo}>Medidas</Text>
            <View style={styles.contenedor}>
                <Button {...newPhoneArgs} />
                <ScrollView>
                    {measures.map((m) => (
                        <View key={m.id} {...TargetaTelefonoArgs}>
                            <Text style={styles.cabecera}>
                                altura: {m.height}
                            </Text>
                            <Text style={styles.cabecera}>
                                cintura: {m.waist}
                            </Text>
                            <View style={styles.botonera}>
                                <BotonIcono {...actArgs} action={update(m)} />
                                <BotonIcono {...eliArgs} action={drop(m)} />
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
        DROP_MEASURE: gql`
            mutation($measureId: ID!, $clientId: ID!) {
                dropMeasure(measureId: $measureId, clientId: $clientId)
            }
        `,
    },
};
