import { TextInput, StyleSheet, View } from "react-native";
import fonts from "../../config/fonts";
import colors from "../../config/colors";
import Text from "./Text";

function AppTextInput({ label, style, ...otherProps }) {
  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput style={styles.input} {...otherProps}></TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  border: {},
  input: {
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 18,
    padding: 5,
    fontFamily: fonts.default,
    borderColor: colors.light.soft,
  },
  label: {
    fontSize: 18,
  },
  container: {
    flex: 1,
  },
});

export default AppTextInput;
