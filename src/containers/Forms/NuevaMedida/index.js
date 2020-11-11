import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { Formik } from "formik";

import { ContenedorEstandar, Titulo, Imagen } from "../../../components";
// Componentes locales
import Campos from "./componentes/Campos";

import initialState from "./initialState";
import validSchema from "./validaciones/medidas";
import { AGREGAR_MEDIDA, ACTUALIZAR_MEDIDA } from "./graphql/Mutation";
import onSubmit from "./funciones/onSubmit";

export default function Formulario(props) {
    const { clientId, acualizacion, datos } = props.route.params;
    let variables = initialState(datos);
    const actualizar = React.useState(acualizacion || false);
    const [addMeasure] = useMutation(AGREGAR_MEDIDA);
    const [actualizarMedida] = useMutation(ACTUALIZAR_MEDIDA);

    const _submit = {
        navigate: props.navigation.navigate,
        actualizar: actualizar[0],
        addMeasure,
        actualizarMedida,
        clientId,
        medidasId: datos ? datos.id : "",
    };

    return (
        <ContenedorEstandar>
            <Imagen source={require("../../../../assets/signin.png")} />
            <Titulo color="#2a2a2a">
                {actualizar[0] ? "actualizar" : "nueva"} medida
            </Titulo>
            <Formik
                initialValues={variables}
                onSubmit={(v) => onSubmit(v, _submit)}
                validationSchema={validSchema}
            >
                <Campos actualizar={actualizar[0]} />
            </Formik>
        </ContenedorEstandar>
    );
}
