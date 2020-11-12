import { Platform, Alert, ToastAndroid } from "react-native";

export default function (message) {
    if (Platform.OS === "ios") {
        Alert.alert("Error", message);
    } else if (Platform.OS === "android") {
        ToastAndroid.show(message, ToastAndroid.SHORT);
    }
}
