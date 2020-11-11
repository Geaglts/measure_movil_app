import * as Yup from "yup";

export default Yup.object({
    name: Yup.string()
        .required("Requerido")
        .min(3, "Debe tener minimo 3 caractes"),
    phone: Yup.string()
        .length(10, "El telefono debe tener 10 caracteres")
        .required("Requerido"),
    height: Yup.string()
        .required("Requerido")
        .min(2, "No creo que alguien tenga esas medidas")
        .max(300, "No creo que alquien tenga esas medidas"),
    waist: Yup.string()
        .required("Requerido")
        .min(2, "No creo que alguien tenga esas medidas")
        .max(300, "No creo que alquien tenga esas medidas"),
});
