import Toast from "../../../../features/messageInScreen";

export default async (valores, variables) => {
    try {
        let $variables = {
            height: parseInt(valores.height),
            waist: parseInt(valores.waist),
        };

        if (variables.actualizar) {
            $variables = {
                ...$variables,
                medidasId: variables.medidasId,
                clienteId: variables.clientId,
            };

            const { data } = await variables.actualizarMedida({
                variables: $variables,
            });

            const { success, error, message } = data.updateMeasure;

            if (success) {
                Toast(message);
                variables.navigate("HomeNavigator");
            } else {
                Toast(error);
            }
        } else {
            $variables = {
                ...$variables,
                medidasId: variables.medidasId,
                clientId: variables.clientId,
            };

            const { data } = await variables.addMeasure({
                variables: $variables,
            });

            const { message, error, success } = data.addMeasure;

            if (success) {
                variables.navigate("HomeNavigator");
                Toast(message);
            } else {
                Toast(error);
            }
        }
    } catch (e) {
        Toast("A ocurrido un error");
    }
};
