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
  disabled,
  ...otherProps
}) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const pickedDate = new Date("2000-01-01T" + value);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = (date) => {
    updateTime(date.toTimeString().split(" ")[0].substring(0, 5));
    hideDatePicker();
  };

  let disabledColor = {};
  if (disabled) disabledColor = styles.disabledColor;
  return (
    <View style={[styles.container, disabledColor, style]}>
      {label && <Text>{label}</Text>}
      <TouchableWithoutFeedback onPress={showDatePicker}>
        <Text {...otherProps}>{value}</Text>
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
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    borderColor: colors.light.soft,
    flex: 1,
    alignItems: "center",
  },
  disabledColor: { backgroundColor: colors.light.disabled },
});

export default TimeInput;
