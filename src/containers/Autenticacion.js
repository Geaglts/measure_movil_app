import React, { useState } from "react";
import { StyleSheet, KeyboardAvoidingView, TextInput } from "react-native";
import ContenedorEstandar from "../components/ContenedorEstandar";
import Cargando from "../components/Cargando";
import Button from "../components/Button";
import Imagen from "../components/Imagen";
import Link from "../components/Link";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import * as TokenActions from "../../token";
import * as Names from "../navigations/NameScreens";
import Toast from "../utils/Toast";

/**
 * Constantes
 */
const COLOR = "#F0B67F";
const BG_COLOR = "#EEF5DB";
const LOGIN = "login";
const REGISTER = "register";

const styles = StyleSheet.create({
    keyboard_avoiding: {
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    input: {
        margin: 10,
        backgroundColor: COLOR,
        height: 50,
        width: "90%",
        borderRadius: 3,
        textAlign: "center",
        fontSize: 22,
        fontWeight: "bold",
        color: "#FE5F55",
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
        marginTop: 25,
        backgroundColor: "#FE5F55",
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
        color: BG_COLOR,
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "center",
    },
    link: {
        marginTop: 15,
        padding: 5,
    },
});

/**
 * Argumentos de los componentes
 */
let KeyAvoArgs = {
    behavior: Platform.OS === "ios" ? "padding" : "height",
    style: styles.keyboard_avoiding,
};

let ImagenArgs = {
    source: require("../../assets/signin.png"),
};

let EmailArgs = {
    autoCapitalize: "none",
    placeholder: "correo electronico",
    style: styles.input,
    placeholderTextColor: "#EEF5DB",
};

let PasswordArgs = {
    autoCapitalize: "none",
    placeholder: "contraseña",
    style: styles.input,
    placeholderTextColor: "#EEF5DB",
    secureTextEntry: true,
};

/**
 * Estados iniciales dependiendo de si es registro o inicio de sesion
 */
let LoginInputs = {
    email: "",
    password: "",
};

let RegisterInputs = {
    email: "",
    password: "",
};

let currentEntries = (vista) => {
    switch (vista) {
        case "login": {
            return LoginInputs;
        }
        case "register": {
            return RegisterInputs;
        }
    }
};

const changeButtonText = (v) => (v === LOGIN ? "Iniciar sesion" : "Registro");
const changeLinkText = (v) => (v === LOGIN ? "crear cuenta" : "iniciar sesion");

export default function Autenticacion({ navigation }) {
    const [loading, setLoading] = useState(false);
    const [vista, setVista] = useState(LOGIN);
    const [values, setValues] = useState(currentEntries(vista));

    /**
     * Mutaciones y Queries de Graphql
     */
    const [login] = useMutation(Graphql.Mutation.LOGIN);
    const [register] = useMutation(Graphql.Mutation.REGISTER);

    /**
     * Ingresa el valor del input a una variable
     */
    const handleChange = (name) => (v) => setValues({ ...values, [name]: v });

    /**
     * Funciones del componente
     */
    const onPressButton = async () => {
        try {
            setLoading(true);
            switch (vista) {
                case LOGIN:
                    {
                        const variables = values;
                        const response = await login({ variables });
                        const token = response.data.login.token;
                        await TokenActions.setToken(token);
                        navigation.navigate(Names.AUTH_LOADING);
                    }
                    break;
                case REGISTER:
                    {
                        const variables = values;
                        const response = await register({ variables });
                        console.log(response);
                        // setVista(LOGIN);
                        // setValues(currentEntries(LOGIN));
                    }
                    break;
                default:
                    return null;
            }
            setLoading(false);
        } catch (err) {
            Toast(err.message.replace("GraphQL error: Error: ", ""));
        } finally {
            setLoading(false);
        }
    };

    const onPressLink = () => {
        try {
            setLoading(true);
            switch (vista) {
                case LOGIN:
                    {
                        setVista(REGISTER);
                        setValues(currentEntries(REGISTER));
                    }
                    break;
                case REGISTER:
                    {
                        setVista(LOGIN);
                        setValues(currentEntries(LOGIN));
                    }
                    break;
                default:
                    return null;
            }
            setLoading(false);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <ContenedorEstandar>
                <Cargando />
            </ContenedorEstandar>
        );
    }

    /**
     * Argumentos de los componentes
     */
    EmailArgs["value"] = values.email;
    EmailArgs["onChangeText"] = handleChange("email");
    PasswordArgs["value"] = values.password;
    PasswordArgs["onChangeText"] = handleChange("password");
    let ButtonProps = {
        style: styles.button,
        onPress: onPressButton,
        text: {
            style: styles.textButton,
        },
        label: changeButtonText(vista),
    };
    let LinkArgs = {
        style: styles.link,
        onPress: onPressLink,
        label: changeLinkText(vista),
    };

    return (
        <ContenedorEstandar>
            <KeyboardAvoidingView {...KeyAvoArgs}>
                <Imagen {...ImagenArgs} />
                <TextInput {...EmailArgs} />
                <TextInput {...PasswordArgs} />
                <Button {...ButtonProps} />
                <Link {...LinkArgs} />
            </KeyboardAvoidingView>
        </ContenedorEstandar>
    );
}

const Graphql = {
    Mutation: {
        LOGIN: gql`
            mutation($email: String!, $password: String!) {
                login(email: $email, password: $password)
            }
        `,
        REGISTER: gql`
            mutation($email: String!, $password: String!) {
                register(input: { email: $email, password: $password })
            }
        `,
    },
};
