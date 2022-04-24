import { TextInput, StyleSheet, View } from "react-native";
import fonts from "../../config/fonts";
import colors from "../../config/colors";
import Text from "./Text";

function AppTextInput({
  label,
  style,
  labelStyle,
  disabled = false,
  ...otherProps
}) {
  let disabledColor = {};
  if (disabled) disabledColor = styles.disabledColor;
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

const styles = StyleSheet.create({
  border: {},
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    fontFamily: fonts.default,
    fontSize: fonts.sizeDefault,
    borderColor: colors.light.soft,
  },
  container: {
    flex: 1,
  },
  disabledColor: { backgroundColor: colors.light.disabled },
});

export default AppTextInput;
