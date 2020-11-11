import * as Yup from "yup";

export default {
    validLoginSchema: Yup.object({
        email: Yup.string()
            .email("El correo no es valido")
            .required("Requerido"),
        password: Yup.string().required("Requerido"),
    }),
    validRegisterSchema: Yup.object({
        email: Yup.string()
            .email("El correo no es valido")
            .required("Requerido"),
        password: Yup.string()
            .min(8, " El correo debe tener 8 caracteres")
            .required("Requerido"),
    }),
};
