import { Platform } from "react-native";

const fonts = {
  default: Platform.OS === "android" ? "Roboto" : "Avenir",
  sizeDefault: 18,
  sizeTitle: 28,
  sizeHeader: 24,
  sizeSmall: 16,
  sizeBig: 20,
};

export default fonts;
