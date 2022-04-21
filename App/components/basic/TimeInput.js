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

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableWithoutFeedback onPress={showDatePicker}>
        <Text style={styles.input} {...otherProps}>
          {value}
        </Text>
      </TouchableWithoutFeedback>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        date={pickedDate}
      />
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
    borderColor: colors.light.soft,
  },
  label: {
    fontSize: 18,
  },
  container: {
    flex: 1,
  },
});

export default TimeInput;
