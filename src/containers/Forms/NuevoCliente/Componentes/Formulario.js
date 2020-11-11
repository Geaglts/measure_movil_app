import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useFormikContext, useField } from "formik";

// Componentes locales
import Picker from "./Picker";
// Componentes globales
import { InputFormik, Boton } from "../../../../components/";
// Estilos
import { regular_shadow } from "../../../../constants/styles";
import { styles as main_styles } from "../styles";

export default function Formulario({ ...props }) {
    const { submitForm } = useFormikContext();
    const [field] = useField("phoneType");

    return (
        <>
            <Text style={main_styles.titulo}>Nombre</Text>
            <InputFormik
                fieldName="name"
                style={{ ...styles.input, ...regular_shadow }}
                placeholder="nombre"
            />
            <Text style={main_styles.titulo}>Telefono</Text>
            <InputFormik
                fieldName="phone"
                style={{ ...styles.input, ...regular_shadow }}
                placeholder="telefono"
                keyboardType="number-pad"
            />
            <Text style={main_styles.titulo}>Tipo de telefono</Text>
            <Picker
                data={props.data}
                selectedValue={field.value}
                onValueChange={field.onChange(field.name)}
            />
            <Text style={main_styles.titulo}>Medidas</Text>
            <View style={{ ...styles.contenedor_medidas }}>
                <InputFormik
                    fieldName="height"
                    style={{ ...styles.inputMedidas, ...regular_shadow }}
                    placeholder="altura"
                    keyboardType="number-pad"
                />
                <InputFormik
                    fieldName="waist"
                    style={{ ...styles.inputMedidas, ...regular_shadow }}
                    placeholder="cintura"
                    keyboardType="number-pad"
                />
            </View>
            <Boton
                label={"Agregar"}
                tcolor="#ffffff"
                tzise={18}
                onSubmit={submitForm}
                bg="#2ba6ff"
                containerStyles={{ marginTop: 15 }}
            />
        </>
    );
}

const styles = StyleSheet.create({
    input: {
        margin: 10,
        backgroundColor: "#fafafa",
        height: 45,
        width: "90%",
        borderRadius: 30,
        textAlign: "center",
        fontSize: 22,
        fontWeight: "bold",
        color: "#4a4a4a",
    },
    contenedor_medidas: {
        width: "90%",
        flexDirection: "row",
        alignContent: "space-between",
        justifyContent: "center",
    },
    inputMedidas: {
        margin: 10,
        backgroundColor: "#fafafa",
        height: 45,
        width: "40%",
        borderRadius: 30,
        textAlign: "center",
        fontSize: 22,
        fontWeight: "bold",
        color: "#4a4a4a",
    },
});
