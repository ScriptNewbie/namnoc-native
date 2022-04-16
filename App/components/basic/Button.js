import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import colors from "../../config/colors";

function Button({
  children,
  style,
  text,
  onPress = () => {
    console.log();
  },
}) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.button, style]}>{children}</View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.light.soft,
    borderRadius: 10,
    justifyContent: "center",
    padding: 10,
    alignItems: "center",
  },
});

export default Button;
