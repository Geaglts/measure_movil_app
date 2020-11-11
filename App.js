import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import ApolloClient from "./apolloSetup";
import { ApolloProvider } from "@apollo/react-hooks";
import App from "./src";

export default () => {
    return (
        <ApolloProvider client={ApolloClient}>
            <NavigationContainer>
                <App />
            </NavigationContainer>
        </ApolloProvider>
    );
};
