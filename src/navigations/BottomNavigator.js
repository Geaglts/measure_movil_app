import React from "react";
import { About, Home } from "../containers";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

const vistas = ["Home", "ListaDeClientes", "About"];

const tabBarOPtions = {
    activeTintColor: "#FE5F55",
    inactiveTintColor: "gray",
    labelStyle: {
        fontSize: 17,
        fontWeight: "bold",
    },
    tabStyle: {
        paddingTop: 5,
    },
};

const defaultScreenOptions = {
    unmountOnBlur: true,
};

const BottomNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName={vistas[0]}
            screenOptions={screenOptions}
            tabBarOptions={tabBarOPtions}
        >
            <Tab.Screen
                name={vistas[0]}
                component={Home}
                options={{
                    title: "Inicio",
                    ...defaultScreenOptions,
                }}
            />
            <Tab.Screen
                name={vistas[2]}
                component={About}
                options={{
                    title: "Cuenta",
                    ...defaultScreenOptions,
                }}
            />
        </Tab.Navigator>
    );
};

screenOptions = ({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        switch (route.name) {
            case vistas[0]:
                iconName = "md-home";
                break;
            case vistas[1]:
                iconName = "ios-send";
                break;
            case vistas[2]:
                iconName = focused ? "ios-list-box" : "ios-list";
                break;
            default:
                iconName = "ios-cube";
                break;
        }

        return <Ionicons name={iconName} size={size} color={color} />;
    },
});

export default BottomNavigator;
