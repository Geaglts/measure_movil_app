import React, { useState } from "react";
import { useFormikContext } from "formik";
import { Boton } from "../../../components";
import { Text } from "react-native";

// Componentes
import Input from "./Input";
import Link from "./Link";

import { styles } from "../styles";
import { regular_shadow } from "../../../constants/styles";

export default function Formulario({ login, setLogin }) {
    const { submitForm } = useFormikContext();

    return (
        <>
            <Text style={styles.titulo}>Correo electronico</Text>
            <Input
                fieldName="email"
                style={{ ...styles.input, ...regular_shadow }}
                placeholder="correo electronico"
            />
            <Text style={styles.titulo}>Contraseña</Text>
            <Input
                fieldName="password"
                style={{ ...styles.input, ...regular_shadow }}
                placeholder="contraseña"
                secureTextEntry={true}
            />
            <Boton
                label={login ? "Iniciar Sesion" : "Crear Cuenta"}
                tcolor="#ffffff"
                tzise={18}
                onSubmit={submitForm}
                bg="#2ba6ff"
                containerStyles={{ marginTop: 15 }}
            />
            <Link
                isLogin={login}
                onPress={() => {
                    setLogin(!login);
                }}
            />
        </>
    );
}
