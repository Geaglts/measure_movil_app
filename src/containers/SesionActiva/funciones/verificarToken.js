import { getToken } from "../../../../token";

export default async (navigate) => {
    const token = await getToken();
    token ? navigate("HomeNavigator") : navigate("LoginRegistro");
};
