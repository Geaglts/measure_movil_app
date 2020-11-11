const variablesUsuario = (data) => {
    return {
        name: data.name,
        phone: data.phone,
        phoneType: data.phoneType,
        height: parseInt(data.height),
        waist: parseInt(data.waist),
    };
};

export default {
    variablesUsuario,
};
