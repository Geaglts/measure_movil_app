import React, { useState } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { LOGIN, REGISTRO } from "./Graphql/Mutation";
import { useMutation } from "@apollo/react-hooks";
import { HOME_NAVIGATOR } from "../../navigations/NameScreens";
import { Formik } from "formik";

import Toast from "../../features/messageInScreen";

// TOKEN
import { setToken } from "../../../token";

// Componenetes globales
import { ContenedorEstandar, Cargando, Imagen } from "../../components";

// Componentes locales
import { Formulario } from "./Componentes";

// Styles
import { styles } from "./styles";

// Validaciones
import validaciones from "./validaciones";

export default function LoginRegistro({ navigation }) {
    const [isLogin, setLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    let initialValues = {
        email: "",
        password: "",
    };

    const [login] = useMutation(LOGIN);
    const [register] = useMutation(REGISTRO);

    const onSubmitForm = async (values) => {
        try {
            if (isLogin) {
                const { data } = await login({ variables: values });
                setLoading(true);
                await setToken(data.login.token);
                navigation.navigate(HOME_NAVIGATOR);
                setLoading(false);
            } else {
                const { data } = await register({ variables: values });
                setLoading(true);
                Toast(data.register.msg);
                setLogin(true);
                initialValues = {
                    email: "",
                    password: "",
                };
                setLoading(false);
            }
        } catch (err) {
            Toast(err.message.replace("GraphQL error: Error: ", ""));
        }
    };

    if (loading)
        return (
            <ContenedorEstandar>
                <Imagen source={require("../../../assets/signin.png")} />
                <Cargando />
            </ContenedorEstandar>
        );

    return (
        <ContenedorEstandar>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ ...styles.keyboard_avoiding }}
            >
                <Imagen source={require("../../../assets/signin.png")} />
                <Formik
                    onSubmit={onSubmitForm}
                    validationSchema={
                        isLogin
                            ? validaciones.validLoginSchema
                            : validaciones.validRegisterSchema
                    }
                    initialValues={initialValues}
                >
                    <Formulario login={isLogin} setLogin={setLogin} />
                </Formik>
            </KeyboardAvoidingView>
        </ContenedorEstandar>
    );
}
