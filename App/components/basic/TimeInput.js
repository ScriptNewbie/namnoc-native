import {
  TouchableWithoutFeedback,
  StyleSheet,
  View,
  Platform,
  Modal,
  Button,
  SafeAreaView,
} from "react-native";
import colors from "../../config/colors";
import Text from "./Text";
import DateTimePicker from "@react-native-community/datetimepicker";

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
  const [tempValue, setTempValue] = useState();

  const valueIsInt = typeof value === "number";

  if (valueIsInt) {
    value = value.toString();
    if (value.length === 1) value = "000" + value;
    const valueLength = value.length;
    value =
      value.substring(0, valueLength - 2) +
      ":" +
      value.substring(valueLength - 2);
    if (valueLength === 2) value = "00" + value;
    if (valueLength === 3) value = "0" + value;
  }

  const pickedDate = new Date("2000-01-01T" + value);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
    if (Platform.OS === "ios") setTempValue(pickedDate);
  };
  const handleChange = (e, date) => {
    setDatePickerVisibility(false);
    if (e.type === "set") {
      let retVal = date.toTimeString().split(" ")[0].substring(0, 5);
      if (valueIsInt) retVal = parseInt(retVal.replace(":", ""));
      updateTime(retVal);
    }
  };
  const handleTempChange = (e, date) => {
    setTempValue(date);
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
      {!disabled &&
        (Platform.OS === "android" ? (
          isDatePickerVisible && (
            <DateTimePicker
              onChange={handleChange}
              mode="time"
              value={pickedDate}
            ></DateTimePicker>
          )
        ) : (
          <Modal
            transparent={true}
            visible={isDatePickerVisible}
            animationType="slide"
          >
            <SafeAreaView style={styles.modal}>
              <View style={styles.modalContent}>
                <DateTimePicker
                  onChange={handleTempChange}
                  mode="time"
                  value={tempValue}
                  display="spinner"
                  themeVariant="light"
                ></DateTimePicker>
                <View style={styles.buttonGroup}>
                  <Button
                    title="Zamknij"
                    onPress={() => {
                      setDatePickerVisibility(false);
                    }}
                  />
                  <Button
                    title="Zatwierdź"
                    onPress={() => {
                      const input = {
                        type: "set",
                      };
                      handleChange(input, tempValue);
                    }}
                  />
                </View>
              </View>
            </SafeAreaView>
          </Modal>
        ))}
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
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "center",
    borderTopWidth: 1,
    borderColor: colors.light.soft,
    justifyContent: "space-evenly",
    padding: 10,
  },
  modal: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
  },
  modalContent: {
    backgroundColor: colors.light.background,
    alignSelf: "flex-end",
    marginBottom: 10,
    flex: 1,
    borderRadius: 30,
    marginLeft: 15,
    marginRight: 15,
    borderWidth: 1,
    borderColor: colors.light.soft,
  },
});

export default TimeInput;
