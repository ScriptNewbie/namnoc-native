import { StyleSheet, Alert, View, Platform } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import Screen from "../components/basic/SafeBottomScrollableScreen";
import TextInput from "../components/basic/TextInput";
import Text from "../components/basic/Text";
import Button from "../components/basic/Button";
import colors from "../config/colors";
import fonts from "../config/fonts";
import Schedule from "../components/devices/Schedule";
import useDeleteDevice from "../hooks/useDeleteDevice";
import useModifyDevice from "../hooks/useModifyDevice";

function Device({ route }) {
  const [device, setDevice] = useState(route.params);
  const [oldName] = useState({ ...device }.name);
  const modifyDevice = useModifyDevice({
    onSuccess: (response) => {
      Platform.OS === "web"
        ? navigation.goBack()
        : Alert.alert(
            "Sukces!",
            "Czy chcesz pozostać na ekranie konfiguracji urządzenia " +
              response.name +
              "?",
            [
              {
                text: "Tak",
                onPress: () => {
                  setDevice(response);
                },
              },
              {
                text: "Nie",
                onPress: () => {
                  navigation.goBack();
                },
              },
            ]
          );
    },
  });

  const navigation = useNavigation();
  const deleteDevice = useDeleteDevice({
    onSuccess: () => {
      navigation.goBack();
    },
  });

  const { name, schedule } = device;

  const updateSchedule = (schedule) => {
    const deviceCopy = { ...device };
    deviceCopy.schedule = schedule;
    setDevice(deviceCopy);
  };

  const changeName = (value) => {
    const deviceCopy = { ...device };
    deviceCopy.name = value;
    setDevice(deviceCopy);
  };

  const saveSettings = () => {
    modifyDevice.mutate(device);
  };

  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.title}>{oldName}</Text>
        <Button
          text="Usuń z systemu"
          onPress={() => {
            deleteDevice.mutate(device);
          }}
          style={styles.delete}
        />
        <Text style={styles.header}>Zmiana ustawień</Text>
        <TextInput
          label={"Nazwa pomieszczenia:"}
          onChangeText={changeName}
          value={name}
        ></TextInput>
        <Text style={styles.harmonogram}>Harmonogram:</Text>
        <Schedule
          schedule={schedule}
          updateSchedule={updateSchedule}
        ></Schedule>
        <Button
          text="Zapisz ustawienia"
          onPress={saveSettings}
          style={styles.submit}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: fonts.sizeTitle,
    textAlign: "justify",
  },
  header: {
    marginTop: 10,
    fontSize: fonts.sizeHeader,
  },
  harmonogram: {
    fontSize: fonts.sizeBig,
  },
  container: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  submit: {
    backgroundColor: colors.light.apply,
    marginTop: 10,
    marginBottom: 10,
  },
  delete: {
    backgroundColor: colors.light.discard,
    marginTop: 10,
    marginBottom: 10,
  },
});

export default Device;
