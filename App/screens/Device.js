import { StyleSheet, ScrollView, View } from "react-native";
import React, { useState } from "react";

import Screen from "../components/basic/Screen";
import TextInput from "../components/basic/TextInput";
import Text from "../components/basic/Text";
import Button from "../components/basic/Button";
import colors from "../config/colors";
import fonts from "../config/fonts";
import Schedule from "../components/devices/Schedule";

function Device(props) {
  const [device, setDevice] = useState(props.device);
  const { name, schedule } = device;

  const updateSchedule = (schedule) => {
    const deviceCopy = { ...device };
    deviceCopy.schedule = schedule;
    setDevice(deviceCopy);
  };

  return (
    <Screen>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>{name}</Text>
        <Button text="Usuń z systemu" style={styles.delete} />
        <Text style={styles.header}>Zmiana ustawień</Text>
        <TextInput label={"Nazwa pomieszczenia:"}></TextInput>
        <Text style={styles.harmonogram}>Harmonogram:</Text>
        <Schedule
          schedule={schedule}
          updateSchedule={updateSchedule}
        ></Schedule>
        <Button text="Zapisz ustawienia" style={styles.submit} />
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
