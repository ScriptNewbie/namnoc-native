import { TouchableWithoutFeedback, StyleSheet, View } from "react-native";
import colors from "../../config/colors";
import Text from "./Text";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import React, { useState } from "react";

import fonts from "../../config/fonts";

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
    fontSize: fonts.sizeDefault,
    padding: 5,
    borderColor: colors.light.soft,
  },
  label: {
    fontSize: fonts.sizeDefault,
  },
  container: {
    flex: 1,
  },
});

export default TimeInput;
