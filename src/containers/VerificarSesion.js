import React, { useEffect } from "react";
import { getToken } from "../../token";
import ContenedorEstandar from "../components/ContenedorEstandar";
import Cargando from "../components/Cargando";
import Imagen from "../components/Imagen";
import * as NameScreens from "../navigations/NameScreens";

let ImagenArgs = {
    source: require("../../assets/signin.png"),
};

export default function VerificarSesion({ navigation }) {
    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", async () => {
            try {
                let token = await getToken();
                if (token) {
                    navigation.navigate(NameScreens.HOME_NAVIGATOR);
                } else {
                    navigation.navigate(NameScreens.LOGIN_REGISTRO);
                }
            } catch (err) {
                console.log(err.message);
            }
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <ContenedorEstandar>
            <Imagen {...ImagenArgs} />
            <Cargando />
        </ContenedorEstandar>
    );
}
