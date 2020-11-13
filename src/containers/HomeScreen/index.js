import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import { useQuery, useMutation } from "@apollo/react-hooks";
import Toast from "../../features/messageInScreen";
import {
    Contenedor,
    NuevoClienteBtn,
    SearchBar,
    Contenido,
} from "./componentes";
import { Cargando } from "../../components";
import TargetaCliente from "../TargetaCliente";

import * as Graphql from "./graphql";
import { isSearched } from "./funciones";

export default function index(props) {
    const [clientes, setClientes] = useState([]);
    const [searchValue, setSearchValue] = useState("");

    const { refetch, loading } = useQuery(Graphql.Query.GET_CLIENTS);
    const [removeClient] = useMutation(Graphql.Mutation.REMOVE_CLIENT);

    useEffect(() => {
        const unsubscribe = props.navigation.addListener("focus", async () => {
            const { data } = await refetch();
            setClientes(data.getClients);
        });

        return unsubscribe;
    }, [props.navigation]);

    const navigateTo = (nombre, args) =>
        props.navigation.navigate(nombre, args);

    const onDelete = (clientId) => async () => {
        try {
            Alert.alert("Confirmacion", "Estas seguro?", [
                {
                    text: "Cancelar",
                    style: "cancel",
                },
                {
                    text: "Confirmar",
                    onPress: async () => {
                        const {
                            data: {
                                removeClient: { message: msg },
                            },
                        } = await removeClient({
                            variables: {
                                clientId,
                            },
                        });

                        const noValidas = ["error", "No debes estar aqui"];

                        if (noValidas.includes(msg)) {
                            Toast(msg);
                        } else {
                            Toast(msg);
                            const { data } = await refetch();
                            setClientes(data.getUser.userData.clients);
                        }
                    },
                },
            ]);
        } catch (e) {
            Toast("No se que paso");
        }
    };

    const onUpdate = (c) => () => {
        navigateTo("UpdateClientForm", {
            clientId: c.id,
            name: c.name,
        });
    };

    let TargetaClienteArgs = {
        navigation: props.navigation,
        updateList: {
            setClientes,
            refetch,
        },
    };

    return (
        <Contenedor>
            <NuevoClienteBtn onSubmit={() => navigateTo("NuevoCliente")} />
            <SearchBar
                placeholder="filtrar"
                onChangeText={(value) => setSearchValue(value)}
                value={searchValue}
            />
            <Contenido>
                {loading ? (
                    <Cargando />
                ) : (
                    clientes.filter(isSearched(searchValue)).map((cliente) => {
                        TargetaClienteArgs["client"] = cliente;
                        TargetaClienteArgs["delete"] = onDelete(cliente.id);
                        TargetaClienteArgs["update"] = onUpdate(cliente);

                        return (
                            <TargetaCliente
                                key={cliente.id}
                                {...TargetaClienteArgs}
                            />
                        );
                    })
                )}
            </Contenido>
        </Contenedor>
    );
}
