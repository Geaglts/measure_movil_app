import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import RadioButton from "../components/RadioButton";
import Button from "../components/Button";
import { gql } from "apollo-boost";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { HOME_NAVIGATOR } from "../navigations/NameScreens";

const COLOR = "#E1F5FE";
const BG_COLOR = "#01579B";

let changeButtonText = (act = false) => (act ? "Actualizar" : "Agregar");

export default function NewPhone({ route, navigation }) {
    const [phoneType, setPhoneType] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState(route.params.phone || null);

    const PhoneTypes = useQuery(Graphql.Query.GET_PHONETYPES);
    const [addPhone] = useMutation(Graphql.Mutation.ADD_PHONE);
    const [updatePhone] = useMutation(Graphql.Mutation.UPDATE_PHONE);

    if (PhoneTypes.loading) return null;

    const phoneTypes = PhoneTypes.data.getPhoneTypes;
    /**
     * Variables enviadas desde la lista de telefonos
     */
    const clientId = route.params.clientId || "";
    // const phoneNumberParam = route.params.phone || null;
    const phoneTypeParam = route.params.phoneType || phoneTypes[0];
    const phoneId = route.params.phoneId || null;
    const act = Boolean(route.params.act);

    /**
     * Ingrese el valor del input a una variable
     */
    const handleChange = (v) => setPhoneNumber(v);

    /**
     * Funcion para agregar o actualizar el telefono
     */
    const onPressButton = async () => {
        try {
            let variables = {
                phone: phoneNumber,
                phoneType: phoneType,
            };

            if (act) {
                variables["client"] = clientId;
                variables["phoneId"] = phoneId;
                await updatePhone({ variables });
            } else {
                variables["client"] = clientId;
                await addPhone({ variables });
            }
            navigation.navigate(HOME_NAVIGATOR);
        } catch (err) {
            console.log(err.message);
        }
    };

    /**
     * Props de los componentes
     */
    let TextInputProps = {
        placeholder: "Numero de telefono",
        placeholderTextColor: COLOR,
        style: styles.textInput,
        value: phoneNumber,
        onChangeText: handleChange,
        keyboardType: "number-pad",
    };

    let RadioButtonProps = {
        PROP: phoneTypes,
        selected: setPhoneType,
        initial: phoneTypeParam.id,
    };

    let TextButtonProps = {
        style: styles.textButton,
    };

    let ButtonProps = {
        style: styles.button,
        onPress: onPressButton,
        text: TextButtonProps,
        label: changeButtonText(act),
    };

    return (
        <View style={{ ...styles.container }}>
            <Text style={styles.txtNewPhone}>Nuevo telefono</Text>
            <TextInput {...TextInputProps} />
            <View style={styles.RBContainer}>
                <Text style={styles.txtPhoneType}>Tipo de telefono</Text>
                <RadioButton {...RadioButtonProps} />
            </View>
            <Button {...ButtonProps} />
        </View>
    );
}

const Graphql = {
    Query: {
        GET_PHONETYPES: gql`
            query {
                getPhoneTypes {
                    id
                    type
                }
            }
        `,
    },
    Mutation: {
        ADD_PHONE: gql`
            mutation($phone: String!, $phoneType: ID!, $client: ID!) {
                addPhone(
                    phoneData: {
                        phone: $phone
                        phoneType: $phoneType
                        client: $client
                    }
                ) {
                    id
                    phone
                }
            }
        `,
        UPDATE_PHONE: gql`
            mutation(
                $phoneId: ID!
                $phone: String!
                $phoneType: ID!
                $client: ID!
            ) {
                updatePhone(
                    phoneData: {
                        phone: $phone
                        phoneType: $phoneType
                        client: $client
                    }
                    phoneId: $phoneId
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
    RBContainer: {
        marginLeft: 10,
        marginTop: 15,
    },
    txtPhoneType: {
        color: COLOR,
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 10,
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
