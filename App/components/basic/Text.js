import { Text, StyleSheet } from "react-native";

import fonts from "../../config/fonts";

const AppText = ({ style, ...otherProps }) => {
  return <Text style={[style, styles.defaultFonts]} {...otherProps} />;
};

const styles = StyleSheet.create({
  defaultFonts: {
    fontFamily: fonts.default,
  },
});

export default AppText;
