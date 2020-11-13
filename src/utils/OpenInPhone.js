import { Linking } from "react-native";

export default (t) => () => {
    let PHONE_URL = `tel:${t}`;
    return Linking.openURL(PHONE_URL);
};
