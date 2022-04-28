import { StyleSheet, ScrollView, View } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useQueryClient } from "react-query";

import Screen from "../components/basic/Screen";
import TextInput from "../components/basic/TextInput";
import Text from "../components/basic/Text";
import Button from "../components/basic/Button";
import colors from "../config/colors";
import fonts from "../config/fonts";
import Schedule from "../components/devices/Schedule";
import deleteDevice from "../tools/deleteDevice";

function Device({ route }) {
  const [device, setDevice] = useState(route.params);
  const [oldName] = useState({ ...device }.name);
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  const { name, schedule } = device;

  const updateSchedule = (schedule) => {
    const deviceCopy = { ...device };
    deviceCopy.schedule = schedule;
    setDevice(deviceCopy);
  };

  changeName = (value) => {
    const deviceCopy = { ...device };
    deviceCopy.name = value;
    setDevice(deviceCopy);
  };

  const saveSettings = () => {
    navigation.goBack();
  };

  return (
    <Screen>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>{oldName}</Text>
        <Button
          text="Usuń z systemu"
          onPress={() => {
            deleteDevice(device, queryClient);
            navigation.goBack();
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
      </ScrollView>
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
