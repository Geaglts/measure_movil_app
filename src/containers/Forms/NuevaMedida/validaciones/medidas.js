import * as Yup from "yup";

export default Yup.object({
    waist: Yup.string()
        .min(2, "La medida debe tener al menos 2 caracteres")
        .max(3, "No creo que alguien tenga esas medidas")
        .required("Requerido"),
    height: Yup.string()
        .min(2, "La medida debe tener al menos 2 caracteres")
        .max(3, "No creo que alguien tenga esas medidas")
        .required("Requerido"),
});
