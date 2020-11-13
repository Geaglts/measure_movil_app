import * as NameScreens from "./NameScreens";
import {
    AuthLoading,
    LoginRegistro,
    NuevoCliente,
    NuevoTelefono,
    UpdateClientForm,
    NuevaMedida,
    VistaMensajes,
} from "../containers";
import BottomNavigator from "./BottomNavigator";

export default {
    VerificarSesionScreen: {
        name: NameScreens.VERIFICAR_SESION_SCREEN,
        component: AuthLoading,
    },
    AutenticacionScreen: {
        name: NameScreens.AUTENTICACION_SCREEN,
        component: LoginRegistro,
    },
    InicioScreen: {
        name: NameScreens.INICIO_SCREEN,
        component: BottomNavigator,
    },
    NewClientScreen: {
        name: NameScreens.NEW_CLIENTE_SCREEN,
        component: NuevoCliente,
    },
    NewPhoneScreen: {
        name: NameScreens.NEW_PHONE_SCREEN,
        component: NuevoTelefono,
    },
    UpdateClientScreen: {
        name: NameScreens.UPDATE_CLIENT_SCREEN,
        component: UpdateClientForm,
    },
    NewMeasureScreen: {
        name: NameScreens.NEW_MEASURE_SCREEN,
        component: NuevaMedida,
    },
    MessagesScreen: {
        name: NameScreens.MESSAGES_SCREEN,
        component: VistaMensajes,
    },
};
