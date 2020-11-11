export default (datos) => {
    return {
        height: datos ? String(datos.height) : "",
        waist: datos ? String(datos.waist) : "",
    };
};
