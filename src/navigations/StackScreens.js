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
    VistaAuthLoading: {
        name: NameScreens.AUTH_LOADING,
        component: AuthLoading,
    },
    VistaLoginRegistro: {
        name: NameScreens.LOGIN_REGISTRO,
        component: LoginRegistro,
    },
    VistaHomeNavigator: {
        name: NameScreens.HOME_NAVIGATOR,
        component: BottomNavigator,
    },
    VistaNuevoCliente: {
        name: NameScreens.NUEVO_CLIENTE,
        component: NuevoCliente,
    },
    VistaNuevoTelefono: {
        name: NameScreens.FORMULARIO_NUEVO_TELEFONO,
        component: NuevoTelefono,
    },
    VistaActualizarCliente: {
        name: NameScreens.ACTUALIZAR_CLIENTE,
        component: UpdateClientForm,
    },
    VistaNuevaMedida: {
        name: NameScreens.NUEVA_MEDIDA,
        component: NuevaMedida,
    },
    VistaMensajesScreen: {
        name: NameScreens.VISTA_MENSAJES,
        component: VistaMensajes,
    },
};
