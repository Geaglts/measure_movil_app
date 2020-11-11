import { AsyncStorage } from "react-native";

const AUTH_TOKEN = "Token";

export const getToken = async () => await AsyncStorage.getItem(AUTH_TOKEN);
export const setToken = async (token) =>
    await AsyncStorage.setItem(AUTH_TOKEN, token);
export const deleteToken = async () =>
    await AsyncStorage.removeItem(AUTH_TOKEN);
