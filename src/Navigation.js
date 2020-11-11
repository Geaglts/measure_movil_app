import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import StackScreens from "./navigations/StackScreens";

const Stack = createStackNavigator();

const StackNavigatorProps = {
    initialRouteName: "AuthLoading",
    screenOptions: { headerShown: false },
};

export default () => {
    return (
        <Stack.Navigator {...StackNavigatorProps}>
            <Stack.Screen {...StackScreens.VistaAuthLoading} />
            <Stack.Screen {...StackScreens.VistaLoginRegistro} />
            <Stack.Screen {...StackScreens.VistaHomeNavigator} />
            <Stack.Screen {...StackScreens.VistaNuevoCliente} />
            <Stack.Screen {...StackScreens.VistaNuevoTelefono} />
            <Stack.Screen {...StackScreens.VistaActualizarCliente} />
            <Stack.Screen {...StackScreens.VistaNuevaMedida} />
            <Stack.Screen {...StackScreens.VistaMensajesScreen} />
        </Stack.Navigator>
    );
};
