import { StyleSheet, ScrollView, View } from "react-native";
import React, { useState } from "react";

import Screen from "../components/basic/Screen";
import TextInput from "../components/basic/TextInput";
import Text from "../components/basic/Text";
import Button from "../components/basic/Button";
import colors from "../config/colors";
import fonts from "../config/fonts";
import Schedule from "../components/devices/Schedule";

function NewDevice({ device }) {
  const [newParams, setNewParams] = useState({
    name: "",
    schedule: {
      monday: {
        times: [],
        lastTemp: 20,
      },
      tuesday: {
        times: [],
        lastTemp: 20,
      },
      wednesday: {
        times: [],
        lastTemp: 20,
      },
      thursday: {
        times: [],
        lastTemp: 20,
      },
      friday: {
        times: [],
        lastTemp: 20,
      },
      saturday: {
        times: [],
        lastTemp: 20,
      },
      sunday: {
        times: [],
        lastTemp: 20,
      },
    },
  });
  const { id } = device;
  const { schedule } = newParams;

  return (
    <Screen>
      <ScrollView style={styles.container}>
        <View>
          <Text style={styles.title}>Nowe urządzenie</Text>
          <Text style={styles.id}>{id}</Text>
        </View>
        <Text style={styles.header}>Konfiguracja urządzenia</Text>
        <TextInput label={"Nazwa pomieszczenia:"}></TextInput>
        <Text style={styles.harmonogram}>Harmonogram:</Text>
        <Schedule schedule={schedule}></Schedule>
        <Button text="Dodaj do systemu" style={styles.submit} />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: fonts.sizeTitle,
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
  id: { fontSize: fonts.sizeVerySmall },
});

export default NewDevice;
