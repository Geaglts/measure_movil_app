import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity, TextInput, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import TargetaCliente from "./TargetaCliente";
import * as ApolloActions from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import * as NameScreens from "../navigations/NameScreens";
import isSearched from "../utils/isSearched";

const COLOR_GRADIENTS = ["#c7efcf", "#d6d1b1"];

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        alignItems: "center",
        width: "100%",
        height: "100%",
    },
    newClientButton: {
        position: "absolute",
        bottom: 14,
        right: 14,
        zIndex: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
    },
    newClientButtonGradient: {
        backgroundColor: "#F0B67F",
        justifyContent: "center",
        alignItems: "center",
        height: 60,
        width: 60,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: "#F0B67F",
    },
    newClientButtonText: {
        fontSize: 42,
        fontWeight: "bold",
        color: "#EEF5DB",
    },
    searchBar: {
        width: "100%",
        alignItems: "center",
        marginTop: 46,
        marginBottom: 10,
        zIndex: 1,
        elevation: 9,
    },
    searchBarInput: {
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: 22,
        fontWeight: "bold",
        backgroundColor: "#ffffff",
        borderRadius: 50,
        width: "90%",
        paddingVertical: 8,
        paddingHorizontal: 20,
        color: "#2ba6ff",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
    },
    content: {
        position: "absolute",
        backgroundColor: "#fff",
        width: "90%",
        height: "80%",
        borderRadius: 10,
        paddingVertical: 5,
        bottom: "3.1%",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
    },
    contentScroll: {
        width: "100%",
    },
    contentScrollContent: {
        justifyContent: "center",
        alignItems: "center",
    },
});

export default function Inicio({ navigation, ...rest }) {
    const clients = ApolloActions.useQuery(Graphql.Query.GET_CLIENTS);
    const [clientes, setClientes] = useState([]);
    const [searchValue, setSearchValue] = useState("");

    /**
     * Actualiza la lista de clientes
     */
    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", async () => {
            setTimeout(async () => {
                if (clients) {
                    const { data } = await clients.refetch();
                    setClientes(data.getClients);
                }
            }, 400);
        });

        return unsubscribe;
    }, [navigation]);

    if (clients.loading) return null;

    /**
     * Funciones del componente
     */
    const handleChange = (v) => setSearchValue(v);
    const addnewClient = () => {
        try {
            navigation.navigate(NameScreens.NUEVO_CLIENTE);
        } catch (e) {
            console.log(e.message);
        }
    };

    /**
     * Argumentos de los componentes
     */
    let gradienteArgs = {
        colors: COLOR_GRADIENTS,
        style: styles.container,
    };
    let newClientButtonArgs = {
        style: styles.newClientButton,
        activeOpacity: 0.6,
        onPress: addnewClient,
    };
    let newClientButtonGArgs = {
        colors: ["#FE5F55", "#F0B67F"],
        style: styles.newClientButtonGradient,
    };
    let newClientButtonTArgs = {
        style: styles.newClientButtonText,
    };
    let searchBarArgs = {
        style: styles.searchBar,
    };
    let searchBarIArgs = {
        style: styles.searchBarInput,
        placeholder: "buscar por nombre",
        placeholderTextColor: "#cacaca",
        onChangeText: handleChange,
        value: searchValue,
    };
    let contentArgs = {
        style: styles.content,
    };
    let contentSArgs = {
        style: styles.contentScroll,
    };
    let contentSCArgs = {
        style: styles.contentScrollContent,
    };
    let targetaClienteArgs = {
        navigation: navigation,
        updateList: {
            setClientes,
            refetch: clients.refetch,
        },
    };

    return (
        <LinearGradient {...gradienteArgs}>
            {/* newClientButton */}
            <TouchableOpacity {...newClientButtonArgs}>
                <LinearGradient {...newClientButtonGArgs}>
                    <Text {...newClientButtonTArgs}>+</Text>
                </LinearGradient>
            </TouchableOpacity>
            {/* searchBar */}
            <View {...searchBarArgs}>
                <TextInput {...searchBarIArgs} />
            </View>
            {/* content */}
            <View {...contentArgs}>
                <ScrollView {...contentSArgs}>
                    <View {...contentSCArgs}>
                        {clientes.filter(isSearched(searchValue)).map((c) => {
                            const { id } = c;
                            let args = { ...targetaClienteArgs, client: c };
                            return <TargetaCliente key={id} {...args} />;
                        })}
                    </View>
                </ScrollView>
            </View>
        </LinearGradient>
    );
}

const Graphql = {
    Query: {
        GET_CLIENTS: gql`
            query {
                getClients {
                    id
                    name
                    mainPhone {
                        phone
                    }
                    phones {
                        id
                        phone
                        isMain
                        phoneType {
                            id
                            type
                        }
                    }
                    measures {
                        id
                        height
                        waist
                    }
                }
            }
        `,
    },
};
