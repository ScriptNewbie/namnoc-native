import { TouchableWithoutFeedback, StyleSheet, View } from "react-native";
import colors from "../../config/colors";
import Text from "./Text";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import React, { useState } from "react";

function TimeInput({
  label,
  style,
  updateTime = () => {},
  value,
  disabled = false,
  ...otherProps
}) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const valueIsInt = typeof value === "number";

  if (valueIsInt) {
    value = value.toString();
    const valueLength = value.length;
    value =
      value.substring(0, valueLength - 2) +
      ":" +
      value.substring(valueLength - 2);
    if (valueLength === 3) value = "0" + value;
  }

  const pickedDate = new Date("2000-01-01T" + value);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = (date) => {
    let retVal = date.toTimeString().split(" ")[0].substring(0, 5);
    if (valueIsInt) retVal = parseInt(retVal.replace(":", ""));
    updateTime(retVal);
    hideDatePicker();
  };

  let disabledColor = {};
  if (disabled) disabledColor = styles.disabledColor;
  return (
    <View style={[styles.container, style]}>
      {label && <Text>{label}</Text>}
      <TouchableWithoutFeedback onPress={showDatePicker}>
        <View style={[styles.inputContainer, disabledColor]}>
          <Text style={styles.input} {...otherProps}>
            {value}
          </Text>
        </View>
      </TouchableWithoutFeedback>
      {!disabled && (
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="time"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          date={pickedDate}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    textAlign: "center",
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.light.soft,
    padding: 5,
  },
  disabledColor: { backgroundColor: colors.light.disabled },
});

export default TimeInput;
