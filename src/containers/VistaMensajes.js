import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
} from "react-native";
import { Ionicons, Feather, AntDesign } from "@expo/vector-icons";
import { HOME_NAVIGATOR } from "../navigations/NameScreens";
import * as Colors from "../constants/colors";

export default function VistaMensajes({ route, navigation }) {
    const [values, setValues] = useState({
        mensaje: "",
    });
    const { cliente } = route.params;

    const onChangetext = (field) => (value) => {
        setValues({ ...values, [field]: value });
    };

    const limparInputMensaje = () => {
        setValues({
            ...values,
            mensaje: "",
        });
    };

    const onPressEnviarBtn = () => {
        console.log(values);
    };

    const regresarAContactos = () => {
        navigation.navigate(HOME_NAVIGATOR);
    };

    return (
        <View style={{ ...styles.container }}>
            <>
                <BotonRegresar
                    style={{ ...styles.regresarBtn }}
                    onPress={regresarAContactos}
                />
                <Header label={cliente} style={{ ...styles.headerView }} />
            </>
            <BandejaDeMensajes style={{ ...styles.bandejaDeMensajes }} />
            <Controles
                style={{ ...styles.controles }}
                onChangeText={onChangetext("mensaje")}
                value={values.mensaje}
                onPressEnviarBtn={onPressEnviarBtn}
                limparInputMensaje={limparInputMensaje}
            />
        </View>
    );
}

const Header = ({ label, ...rest }) => {
    return <Text {...rest}>{label}</Text>;
};

const BotonRegresar = ({ ...rest }) => {
    return (
        <TouchableOpacity {...rest}>
            <Ionicons
                name="md-arrow-round-back"
                size={30}
                color={Colors.WHITE}
            />
        </TouchableOpacity>
    );
};

const BandejaDeMensajes = ({ ...rest }) => {
    return (
        <View {...rest}>
            <Text>Mensajes</Text>
        </View>
    );
};

const Controles = ({
    onChangeText,
    value,
    onPressEnviarBtn,
    limparInputMensaje,
    ...rest
}) => {
    return (
        <View {...rest}>
            {value.length > 0 && (
                <BotonCancelarBusqueda
                    style={{ ...styles.cancelarBusqueda }}
                    onPress={limparInputMensaje}
                />
            )}
            <TextInput
                placeholder="Escribe un mensaje"
                autoCapitalize={"none"}
                placeholderTextColor={Colors.WHITE}
                style={{ ...styles.mensajeInput }}
                onChangeText={onChangeText}
                value={value}
            />
            <TouchableOpacity
                style={{ ...styles.enviarBtn }}
                onPress={onPressEnviarBtn}
            >
                <Text style={{ ...styles.enviarTxt }}>
                    <Feather name="send" size={24} color="white" />
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const BotonCancelarBusqueda = ({ ...rest }) => {
    return (
        <TouchableOpacity {...rest}>
            <AntDesign name="closecircleo" size={24} color="#eff6fc" />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#feffea",
    },
    headerView: {
        backgroundColor: Colors.BLUE_COLOR,
        color: Colors.WHITE,
        padding: 10,
        paddingTop: 25,
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        textTransform: "uppercase",
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
    },
    regresarBtn: {
        position: "absolute",
        zIndex: 1,
        top: 27,
        left: 15,
    },
    bandejaDeMensajes: {
        height: "90.1%",
    },
    controles: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        position: "absolute",
        bottom: 10,
        width: "100%",
    },
    enviarBtn: {
        backgroundColor: Colors.BLUE_COLOR,
        height: 40,
        width: 40,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
        marginRight: 15,
    },
    enviarTxt: {
        position: "absolute",
        top: 10,
        left: 6,
    },
    mensajeInput: {
        backgroundColor: Colors.BLUE_COLOR,
        color: Colors.WHITE,
        width: 325,
        marginLeft: 15,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 50,
        fontSize: 16,
        fontWeight: "bold",
    },
    cancelarBusqueda: {
        position: "absolute",
        bottom: 12,
        left: 305,
        zIndex: 1,
    },
    scroll_container: {
        flex: 1,
    },
    scroll_content: {
        flexGrow: 1,
    },
});
