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
            <Stack.Screen {...StackScreens.VerificarSesionScreen} />
            <Stack.Screen {...StackScreens.AutenticacionScreen} />
            <Stack.Screen {...StackScreens.InicioScreen} />
            <Stack.Screen {...StackScreens.NewClientScreen} />
            <Stack.Screen {...StackScreens.NewPhoneScreen} />
            <Stack.Screen {...StackScreens.UpdateClientScreen} />
            <Stack.Screen {...StackScreens.NewMeasureScreen} />
            <Stack.Screen {...StackScreens.MessagesScreen} />
        </Stack.Navigator>
    );
};
