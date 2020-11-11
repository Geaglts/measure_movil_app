import React from "react";
import { useMutation } from "@apollo/react-hooks";
import * as Graphql from "./graphql";
import { HOME_NAVIGATOR } from "../../../navigations/NameScreens";

//mis componentes
import {
    ContenedorEstandar,
    EntradaDeTexto,
    Boton,
    TituloCampo,
} from "../../../components";

//main component
function UpdateClientForm({ route, navigation }) {
    //variable para el nuevo nombre
    const [name, setName] = React.useState(route.params.name);

    //implementacion de la mutacion
    const [updateClient] = useMutation(Graphql.Mutation.UPDATE_CLIENT);

    /*
        obtiene al cliente en los parametros de la 
        navegacion
    */
    const { clientId } = route.params;

    //se ejecuta cuento pulso el boton de cambiar
    const onSubmit = async () => {
        try {
            let variables = { clientId, name };
            await updateClient({ variables });
            navigation.navigate(HOME_NAVIGATOR);
        } catch (err) {
            console.log("UpdateClientForm => f(onSubmit)");
            console.log(err.message);
        }
    };

    /**
     * cambia el valor del name con lo que
     * pongo en el input
     */
    const onChangeNameField = (value) => {
        setName(value);
    };

    return (
        <ContenedorEstandar>
            <TituloCampo label="nuevo nombre" />
            <EntradaDeTexto
                placeholder="escriba el nombre"
                styleInput="gray-input"
                onChangeText={onChangeNameField}
                value={name}
            />
            <Boton
                tcolor={"#fff"}
                onSubmit={onSubmit}
                tzise={18}
                label="cambiar"
                containerStyles={{ marginTop: 20 }}
            />
        </ContenedorEstandar>
    );
}

export default UpdateClientForm;
