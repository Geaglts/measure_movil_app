import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const COLOR = "#E1F5FE";
const BG_COLOR = "#01579B";

import Button from "../components/Button";
import { HOME_NAVIGATOR } from "../navigations/NameScreens";

let changeButtonText = (act = false) => (act ? "Actualizar" : "Agregar");

export default function NewMeasure({ route, navigation, ...rest }) {
    let [values, setValues] = useState({
        waist: route.params.waist || "",
        height: route.params.height || "",
    });
    /**
     * Mutaciones y Queries de Graphql
     */
    const [addMeasure] = useMutation(Graphql.Mutation.ADD_MEASURE);
    const [updateMeasure] = useMutation(Graphql.Mutation.UPDATE_MEASURE);
    /**
     * Variables enviadas desde la lista de medidas
     */
    const clientId = route.params.clientId || "";
    const act = Boolean(route.params.act);

    /**
     * Ingresa el valor del input a una variable
     */
    const handleChange = (name) => (v) => setValues({ ...values, [name]: v });

    /**
     * Funcion que se ejecuta cuando pulso el boton
     */
    const onPressButton = async () => {
        try {
            let variables = {
                waist: parseInt(values.waist),
                height: parseInt(values.height),
                clientId,
            };

            if (act) {
                variables["measureId"] = route.params.measureId;
                await updateMeasure({ variables });
                navigation.navigate(HOME_NAVIGATOR);
            } else {
                await addMeasure({ variables });
                navigation.navigate(HOME_NAVIGATOR);
            }
        } catch (err) {
            console.log(err);
        }
    };

    /**
     * Props de los componentes
     */
    let AlturaInputProps = {
        placeholder: "Altura",
        placeholderTextColor: COLOR,
        style: styles.textInput,
        value: values.height,
        onChangeText: handleChange("height"),
        keyboardType: "number-pad",
    };

    let CinturaInputProps = {
        placeholder: "Cintura",
        placeholderTextColor: COLOR,
        style: styles.textInput,
        value: values.waist,
        onChangeText: handleChange("waist"),
        keyboardType: "number-pad",
    };

    let ButtonProps = {
        style: styles.button,
        onPress: onPressButton,
        text: {
            style: styles.textButton,
        },
        label: changeButtonText(act),
    };

    return (
        <View style={{ ...styles.container }}>
            <Text style={styles.txtNewMeasure}>Nueva medida</Text>
            <TextInput {...AlturaInputProps} />
            <TextInput {...CinturaInputProps} />
            <Button {...ButtonProps} />
        </View>
    );
}

const Graphql = {
    Query: {},
    Mutation: {
        ADD_MEASURE: gql`
            mutation($clientId: ID!, $height: Int!, $waist: Int!) {
                addMeasure(
                    clientId: $clientId
                    measures: { height: $height, waist: $waist }
                )
            }
        `,
        UPDATE_MEASURE: gql`
            mutation(
                $measureId: ID!
                $clientId: ID!
                $height: Int!
                $waist: Int!
            ) {
                updateMeasure(
                    measureData: {
                        measureId: $measureId
                        clientId: $clientId
                        measures: { height: $height, waist: $waist }
                    }
                )
            }
        `,
    },
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BG_COLOR,
    },
    txtNewMeasure: {
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
