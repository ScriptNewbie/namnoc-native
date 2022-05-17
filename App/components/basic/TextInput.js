import { TextInput, StyleSheet, View } from "react-native";
import fonts from "../../config/fonts";
import colors from "../../config/colors";
import Text from "./Text";
import { useContext } from "react";
import ColorMode from "../../contexts/colorMode";

function AppTextInput({
  label,
  style,
  labelStyle,
  disabled = false,
  ...otherProps
}) {
  const colorMode = useContext(ColorMode);
  const styles = generateStyles(colorMode);

  const disabledColor = disabled ? styles.disabledColor : {};
  return (
    <View style={[styles.container, style]}>
      {label && <Text style={labelStyle}>{label}</Text>}
      <TextInput
        editable={!disabled}
        selectTextOnFocus={!disabled}
        style={[styles.input, disabledColor]}
        {...otherProps}
      ></TextInput>
    </View>
  );
}

const generateStyles = (mode) => {
  return StyleSheet.create({
    input: {
      borderWidth: 1,
      borderRadius: 5,
      padding: 5,
      fontFamily: fonts.default,
      fontSize: fonts.sizeDefault,
      borderColor: colors[mode].soft,
      color: colors[mode].primary,
    },
    container: {
      flex: 1,
    },
    disabledColor: { backgroundColor: colors[mode].disabled },
  });
};

export default AppTextInput;
