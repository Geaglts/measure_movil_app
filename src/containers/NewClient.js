import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import Button from "../components/Button";
import RadioButton from "../components/RadioButton";
import Toast from "../utils/Toast";
import * as NameScreens from "../navigations/NameScreens";
import * as ApolloHooks from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const COLOR = "#FE5F55";
const BG_COLOR = "#D6D1B1";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BG_COLOR,
    },
    txtNewClient: {
        color: COLOR,
        fontSize: 32,
        fontWeight: "bold",
        marginTop: 30,
        marginLeft: 10,
    },
    input: {
        margin: 10,
        backgroundColor: COLOR,
        padding: 10,
        borderRadius: 3,
        fontSize: 22,
        fontWeight: "bold",
        color: "#EEF5DB",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    button: {
        marginHorizontal: 100,
        marginTop: 25,
        backgroundColor: "#EEF5DB",
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 4,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    textButton: {
        color: "#FE5F55",
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "center",
    },
    txtPhoneTypes: {
        color: COLOR,
        fontSize: 26,
        fontWeight: "bold",
        marginLeft: 10,
    },
    radioButton: {
        marginHorizontal: 10,
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-around",
    },
});

/**
 * Valores iniciales del formulario
 */
let initialValues = {
    name: "",
    phone: "",
    height: "",
    waist: "",
};

/**
 * Argumentos de los componentes
 */
let Args = {
    InputNameArgs: {
        placeholder: "Nombre",
        placeholderTextColor: "#E6E8E6",
        style: styles.input,
    },
    InputphoneArgs: {
        placeholder: "Numero de telefono",
        placeholderTextColor: "#E6E8E6",
        style: styles.input,
        keyboardType: "number-pad",
    },
    InputHeightArgs: {
        placeholder: "Altura",
        placeholderTextColor: "#E6E8E6",
        style: styles.input,
        keyboardType: "number-pad",
    },
    InputWaistArgs: {
        placeholder: "Cintura",
        placeholderTextColor: "#E6E8E6",
        style: styles.input,
        keyboardType: "number-pad",
    },
};

/**
 * Esta funcion le asigna las propiedades de value y onChangeText a los inputs
 */
function setNewArgs(args, values, key, handleChange) {
    let argsKeys = Object.keys(args);
    let valuesKeys = Object.keys(initialValues);

    let i = 0;
    for (key of valuesKeys) {
        args[argsKeys[i]]["value"] = values[key];
        args[argsKeys[i]]["onChangeText"] = handleChange(key);
        i++;
    }
}

export default function NuevoCliente({ navigation }) {
    const [values, setValues] = useState(initialValues);
    const [phoneType, setPhoneType] = useState(null);
    /**
     * Mutaciones y Consultas de graphql
     */
    const phoneTypes = ApolloHooks.useQuery(Graphql.Query.PHONE_TYPES);
    const [addClient] = ApolloHooks.useMutation(Graphql.Mutation.ADD_CLIENT);

    if (phoneTypes.loading) return null;
    let initialPhoneType = phoneTypes.data.getPhoneTypes[0].id;
    let phoneTypesList = phoneTypes.data.getPhoneTypes;

    /**
     * Ingresa el valor del input a una variable
     */
    const handleChange = (name) => (v) => setValues({ ...values, [name]: v });

    /**
     * Funciones del componente
     */
    const onPressButton = async () => {
        try {
            let variables = {
                ...values,
                height: parseInt(values.height),
                waist: parseInt(values.waist),
                phoneType: phoneType,
            };

            await addClient({ variables });
            navigation.navigate(NameScreens.INICIO_SCREEN);
        } catch (e) {
            Toast("Verifica tus campos");
        }
    };

    /**
     * Modificaciones o nuevos args para los componentes
     */
    setNewArgs(Args, values, "value", handleChange);
    let ButtonProps = {
        style: styles.button,
        onPress: onPressButton,
        text: {
            style: styles.textButton,
        },
        label: "Agregar",
    };
    let RadioButtonArgs = {
        PROP: phoneTypesList,
        style: styles.radioButton,
        selected: setPhoneType,
        initial: initialPhoneType,
        color: COLOR,
    };
    return (
        <View style={{ ...styles.container }}>
            <Text style={styles.txtNewClient}>Nuevo cliente</Text>
            <TextInput {...Args.InputNameArgs} />
            <TextInput {...Args.InputphoneArgs} />
            <Text style={styles.txtPhoneTypes}>Tipo de telefono</Text>
            <RadioButton {...RadioButtonArgs} />
            <TextInput {...Args.InputHeightArgs} />
            <TextInput {...Args.InputWaistArgs} />
            <Button {...ButtonProps} />
        </View>
    );
}

const Graphql = {
    Query: {
        PHONE_TYPES: gql`
            {
                getPhoneTypes {
                    id
                    type
                }
            }
        `,
    },
    Mutation: {
        ADD_CLIENT: gql`
            mutation(
                $name: String!
                $height: Int!
                $waist: Int!
                $phone: String!
                $phoneType: ID!
            ) {
                addClient(
                    input: {
                        name: $name
                        measures: { height: $height, waist: $waist }
                        phone: { phone: $phone, phoneType: $phoneType }
                    }
                )
            }
        `,
    },
};
