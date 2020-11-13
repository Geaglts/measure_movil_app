import React from "react";
import { gql } from "apollo-boost";
import { StyleSheet, Text } from "react-native";
import { deleteToken } from "../../token";
import ContenedorEstandar from "../components/ContenedorEstandar";
import Imagen from "../components/Imagen";
import BtnCerrarSesion from "../components/BtnCerrarSesion";
import { useQuery } from "@apollo/react-hooks";
import * as NameScreens from "../navigations/NameScreens";

/**
 * Argumentos de los componentes
 */
let imagen = {
    source: require("../../assets/signin.png"),
};

export default function MisDatos({ navigation }) {
    /**
     * Mutaciones y Queries de Graphql
     */
    const me = useQuery(Graphql.Query.ME);
    if (me.loading) return null;
    me.refetch();
    let { email } = me.data.me;
    /**
     * Funciones del componente
     */
    const dropSession = async () => {
        await deleteToken();
        navigation.navigate(NameScreens.VERIFICAR_SESION_SCREEN);
    };

    /**
     * Argumentos de los componentes
     */
    let usuarioTxtArgs = {
        style: styles.correo,
    };
    let btnCerrarSesionArgs = {
        style: styles.containerBtnCerrarSesion,
        onPress: dropSession,
    };

    return (
        <ContenedorEstandar>
            <Imagen {...imagen} />
            <Text {...usuarioTxtArgs}>{email}</Text>
            <BtnCerrarSesion {...btnCerrarSesionArgs} />
        </ContenedorEstandar>
    );
}

const Graphql = {
    Query: {
        ME: gql`
            {
                me {
                    id
                    email
                }
            }
        `,
    },
};

const styles = StyleSheet.create({
    imagen: {
        width: "80%",
        height: 150,
        resizeMode: "contain",
        marginBottom: 15,
    },
    correo: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#F0B67F",
    },
    containerBtnCerrarSesion: {
        width: "100%",
        height: "55%",
        alignItems: "center",
        justifyContent: "flex-end",
        marginBottom: 25,
    },
});
