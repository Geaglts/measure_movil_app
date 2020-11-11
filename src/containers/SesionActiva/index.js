import React, { useEffect } from "react";
import { ContenedorEstandar, Imagen, Cargando } from "../../components";

import verificarToken from "./funciones/verificarToken";

const AuthLoading = ({ navigation }) => {
    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", async () => {
            verificarToken(navigation.navigate);
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <ContenedorEstandar>
            <Imagen source={require("../../../assets/signin.png")} />
            <Cargando />
        </ContenedorEstandar>
    );
};

export default AuthLoading;
