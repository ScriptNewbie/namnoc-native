import { DefaultTheme } from "@react-navigation/native";
import colors from "../config/colors";

const generateAppTheme = (mode) => {
  return {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: colors[mode].background,
    },
  };
};

export default generateAppTheme;
