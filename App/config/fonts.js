import { Platform } from "react-native";

const fonts = {
  default: Platform.OS === "android" ? "Roboto" : "Avenir",
};

export default fonts;
