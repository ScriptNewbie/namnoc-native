import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import colors from "../../config/colors";

import Text from "./Text";

function Button({
  children,
  style,
  text,
  textStyle,
  onPress = () => {
    console.log();
  },
}) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.button, style]}>
        {children && children}
        {text && <Text style={[styles.text, textStyle]}>{text}</Text>}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.light.primaryButton,
    borderRadius: 10,
    justifyContent: "center",
    padding: 10,
    alignItems: "center",
  },
  text: {
    color: colors.light.white,
  },
});

export default Button;
