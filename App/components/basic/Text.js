import { Text, StyleSheet } from "react-native";
import { useContext } from "react";

import fonts from "../../config/fonts";
import ColorMode from "../../contexts/colorMode";
import colors from "../../config/colors";

const AppText = ({ style, ...otherProps }) => {
  const colorMode = useContext(ColorMode);
  const styles = generateStyles(colorMode);

  return <Text style={[styles.defaultFonts, style]} {...otherProps} />;
};

const generateStyles = (mode) => {
  return StyleSheet.create({
    defaultFonts: {
      fontFamily: fonts.default,
      fontSize: fonts.sizeDefault,
      color: colors[mode].primary,
    },
  });
};

export default AppText;
