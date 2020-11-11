import React from "react";
import { useFormikContext } from "formik";

// Estilos
import campos from "../styles/campos";
import { input } from "../../../../constants/styles";

import { InputFormik, Boton, TituloCampo } from "../../../../components";

export default function Campos(props) {
    const { submitForm } = useFormikContext();

    return (
        <>
            <TituloCampo label="altura" />
            <InputFormik
                fieldName="height"
                style={{ ...input, ...campos.setMargin }}
                placeholder="altura"
                keyboardType="number-pad"
            />
            <TituloCampo label="cintura" />
            <InputFormik
                fieldName="waist"
                style={{ ...input, ...campos.setMargin }}
                placeholder="citura"
                keyboardType="number-pad"
            />
            <Boton
                label={props.actualizar ? "Actualizar" : "Agregar"}
                onSubmit={submitForm}
                tcolor="#ffffff"
                tzise={18}
            />
        </>
    );
}
