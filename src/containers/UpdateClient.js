import React, { useState } from "react";
import { gql } from "apollo-boost";
import { StyleSheet, Text, View, TextInput } from "react-native";
import Button from "../components/Button";
import { useMutation } from "@apollo/react-hooks";
import * as NameScreens from "../navigations/NameScreens";

const COLOR = "#C7EFCF";
const BG_COLOR = "#FE5F55";

export default function UpdateClient({ route, navigation, ...rest }) {
    const [name, setName] = useState(route.params.name || null);

    /**
     * Mutaciones y Queries de Graphql
     */
    const [updateClient] = useMutation(Graphql.Mutation.UPDATE_CLIENT);

    /**
     * Variables enviadas desde home
     */
    const clientId = route.params.clientId || "";

    /**
     * Funcion que se ejecuta cuando pulso el boton
     */
    const onPressButton = async () => {
        try {
            let variables = {
                name,
                clientId,
            };
            await updateClient({ variables });
            navigation.navigate(NameScreens.INICIO_SCREEN);
        } catch (err) {
            console.log(err);
        }
    };

    /**
     * Ingresa el valor del input a una variable
     */
    const handleChange = (v) => setName(v);

    /**
     * Props de los componentes
     */
    let NameInputProps = {
        placeholder: "Nuevo nombre",
        placeholderTextColor: COLOR,
        style: styles.textInput,
        value: name,
        onChangeText: handleChange,
    };

    let ButtonProps = {
        style: styles.button,
        onPress: onPressButton,
        text: {
            style: styles.textButton,
        },
        label: "Actualizar",
    };

    return (
        <View style={{ ...styles.container }}>
            <Text style={styles.txtNewPhone}>Nuevo nombre</Text>
            <TextInput {...NameInputProps} />
            <Button {...ButtonProps} />
        </View>
    );
}

const Graphql = {
    Mutation: {
        UPDATE_CLIENT: gql`
            mutation($clientId: ID!, $name: String!) {
                updateClient(input: { clientId: $clientId, name: $name }) {
                    id
                    name
                }
            }
        `,
    },
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BG_COLOR,
    },
    txtNewPhone: {
        color: COLOR,
        fontSize: 34,
        fontWeight: "bold",
        marginTop: 35,
        marginLeft: 30,
    },
    textInput: {
        color: BG_COLOR,
        fontSize: 24,
        marginHorizontal: 30,
        backgroundColor: COLOR,
        marginTop: 15,
        borderWidth: 2,
        borderColor: COLOR,
        padding: 10,
        borderRadius: 3,
        fontWeight: "bold",
    },
    button: {
        marginTop: 30,
        backgroundColor: COLOR,
        padding: 6,
        marginHorizontal: 90,
        borderRadius: 4,
    },
    textButton: {
        color: BG_COLOR,
        fontWeight: "bold",
        fontSize: 24,
        textAlign: "center",
    },
});
