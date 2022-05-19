import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import { useContext } from "react";

import colors from "../../config/colors";
import Text from "./Text";
import ColorMode from "../../contexts/colorMode";

function Button({ children, style, text, textStyle, onPress = () => {} }) {
  const colorMode = useContext(ColorMode);
  const styles = generateStyles(colorMode);
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.button, style]}>
        {children && children}
        {text && <Text style={[styles.text, textStyle]}>{text}</Text>}
      </View>
    </TouchableWithoutFeedback>
  );
}

const generateStyles = (mode) => {
  return StyleSheet.create({
    button: {
      backgroundColor: colors[mode].primaryButton,
      borderRadius: 10,
      justifyContent: "center",
      padding: 10,
      alignItems: "center",
    },
    text: {
      color: colors[mode].white,
    },
  });
};

export default Button;
