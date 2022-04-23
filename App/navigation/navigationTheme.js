import { DefaultTheme } from "@react-navigation/native";
import colors from "../config/colors";

const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.light.background,
  },
};

export default AppTheme;
