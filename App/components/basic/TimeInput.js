import {
  TouchableWithoutFeedback,
  StyleSheet,
  View,
  Platform,
  Modal,
  Button,
  SafeAreaView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useContext } from "react";

import colors from "../../config/colors";
import Text from "./Text";

import React, { useState } from "react";
import fonts from "../../config/fonts";
import ColorMode from "../../contexts/colorMode";

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
  const colorMode = useContext(ColorMode);
  const styles = generateStyles(colorMode);

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

  const handleWebTempChange = ({ target }) => {
    setTempValue(target.value);
  };

  const disabledColor = disabled ? styles.disabledColor : {};
  return (
    <View style={[styles.container, style]}>
      {label && <Text>{label}</Text>}
      {Platform.OS === "web" ? (
        <input
          style={{
            height: 2 * fonts.sizeDefault,
            width: "95%",
            fontSize: fonts.sizeDefault,
            fontFamily: fonts.default,
            backgroundColor: disabled
              ? colors[colorMode].disabled
              : colors[colorMode].background,
            borderRadius: 5,
            borderWidth: 1,
            textAlign: "center",
            alignSelf: "center",
          }}
          type="time"
          disabled={disabled}
          value={tempValue ? tempValue : value}
          onChange={handleWebTempChange}
          onBlur={() => {
            handleChange({ type: "set" }, new Date("2000-01-01T" + tempValue));
            setTempValue();
          }}
        />
      ) : (
        <>
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
                      themeVariant={colorMode}
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
        </>
      )}
    </View>
  );
}

const generateStyles = (mode) => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    input: {
      textAlign: "center",
    },
    inputContainer: {
      borderWidth: 1,
      borderRadius: 5,
      borderColor: colors[mode].soft,
      padding: 5,
    },
    disabledColor: { backgroundColor: colors[mode].disabled },
    buttonGroup: {
      flexDirection: "row",
      justifyContent: "center",
      borderTopWidth: 1,
      borderColor: colors[mode].soft,
      justifyContent: "space-evenly",
      padding: 10,
    },
    modal: {
      flexDirection: "row",
      flex: 1,
      justifyContent: "center",
    },
    modalContent: {
      backgroundColor: colors[mode].background,
      alignSelf: "flex-end",
      marginBottom: 10,
      flex: 1,
      borderRadius: 30,
      marginLeft: 15,
      marginRight: 15,
      borderWidth: 1,
      borderColor: colors[mode].soft,
    },
  });
};

export default TimeInput;
