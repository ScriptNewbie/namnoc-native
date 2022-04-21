import { Text, StyleSheet } from "react-native";

import fonts from "../../config/fonts";

const AppText = ({ style, ...otherProps }) => {
  return <Text style={[styles.defaultFonts, style]} {...otherProps} />;
};

const styles = StyleSheet.create({
  defaultFonts: {
    fontFamily: fonts.default,
    fontSize: fonts.sizeDefault,
  },
});

export default AppText;
