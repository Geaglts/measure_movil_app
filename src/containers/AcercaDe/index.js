import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { Text, StyleSheet } from "react-native";
import { ContenedorEstandar, Imagen, Cargando } from "../../components";

// Componentes locales
import BotonCerrarSesion from "./Componentes/BtnCerrarSesion";

import * as Graphql from "./graphql";

export default function AcercaDe({ navigation, ...rest }) {
    const MY_DATA = useQuery(Graphql.Query.OBTENER_USUARIO);

    React.useEffect(() => {
        const unsubscribe = navigation.addListener("focus", async () => {
            await MY_DATA.refetch();
        });

        return unsubscribe;
    }, [navigation]);

    if (MY_DATA.loading) return <Cargando />;

    if (MY_DATA.data !== undefined) {
        const usuario = MY_DATA.data.me;

        return (
            <ContenedorEstandar>
                <Imagen source={require("../../../assets/signin.png")} />
                <Text style={{ ...styles.correo }}>{usuario.email}</Text>
                <BotonCerrarSesion navigation={navigation} />
            </ContenedorEstandar>
        );
    }

    return null;
}

const styles = StyleSheet.create({
    correo: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#2ba6ff",
    },
});
