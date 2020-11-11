import React from "react";
import { KeyboardAvoidingView } from "react-native";
import { Formik } from "formik";
import { HOME_NAVIGATOR } from "../../../navigations/NameScreens";

// Graphql
import { useQuery, useMutation } from "@apollo/react-hooks";
import * as Graphql from "./graphql";
// Componentes Locales
import Formulario from "./Componentes/Formulario";
// Componentes Globales
import { ContenedorEstandar, Imagen } from "../../../components";
// Estilos globales
import { keyboard_avoiding } from "../../../constants/styles";
// Funciones
import FVariables from "./Funciones/FormatearVariables";
import Toast from "../../../features/messageInScreen";
// Validaciones
import schemaClienteValido from "./Validaciones/NuevoCliente";

export default function ({ navigation: { navigate } }) {
    const { data, loading } = useQuery(Graphql.Query.GET_PHONETYPES);
    const [addClient] = useMutation(Graphql.Mutation.ADD_CLIENT);

    if (loading) return null;

    const initialValues = {
        name: "",
        phone: "",
        phoneType: data.getPhoneTypes[0].id,
        height: "",
        waist: "",
    };

    const handleSubmit = async (values) => {
        try {
            let variables = FVariables.variablesUsuario(values);
            const addClientResp = await addClient({ variables });
            Toast(addClientResp.data.addClient.msg);
            navigate(HOME_NAVIGATOR);
        } catch (e) {
            Toast("Ya existe un cliente con ese nombre");
        }
    };

    return (
        <ContenedorEstandar>
            <Imagen source={require("../../../../assets/signin.png")} />
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={schemaClienteValido}
            >
                <KeyboardAvoidingView
                    behavior="padding"
                    style={{ ...keyboard_avoiding }}
                >
                    <Formulario data={data.getPhoneTypes} />
                </KeyboardAvoidingView>
            </Formik>
        </ContenedorEstandar>
    );
}
