import React, { useState } from "react";
import { gql } from "apollo-boost";
import { StyleSheet, Text, View, TextInput } from "react-native";
import Button from "../components/Button";
import { useMutation } from "@apollo/react-hooks";
import * as NameScreens from "../navigations/NameScreens";

const COLOR = "#E1F5FE";
const BG_COLOR = "#01579B";

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
            navigation.navigate(NameScreens.HOME_NAVIGATOR);
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
    let AlturaInputProps = {
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
            <TextInput {...AlturaInputProps} />
            <Button {...ButtonProps} />
        </View>
    );
}

const Graphql = {
    Mutation: {
        UPDATE_CLIENT: gql`
            mutation($clientId: ID!, $name: String!) {
                updateClient(clientData: { clientId: $clientId, name: $name })
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
        fontSize: 28,
        fontWeight: "bold",
        marginTop: 30,
        marginLeft: 10,
    },
    textInput: {
        color: COLOR,
        fontSize: 22,
        marginHorizontal: 10,
        marginTop: 15,
        borderWidth: 2,
        borderColor: COLOR,
        padding: 10,
        borderRadius: 3,
    },
    button: {
        marginTop: 15,
        backgroundColor: COLOR,
        padding: 10,
        marginHorizontal: 30,
        borderRadius: 4,
    },
    textButton: {
        color: BG_COLOR,
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "center",
    },
});
