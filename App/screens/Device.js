import { StyleSheet, ScrollView, View } from "react-native";
import React, { useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";

import Screen from "../components/basic/Screen";
import TextInput from "../components/basic/TextInput";
import Text from "../components/basic/Text";
import Button from "../components/basic/Button";
import colors from "../config/colors";
import fonts from "../config/fonts";
import Schedule from "../components/devices/Schedule";

function Device({ device }) {
  const { name, temp, schedule } = device;
  return (
    <Screen>
      <ScrollView style={styles.container}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{name}</Text>
          <View style={styles.temp}>
            <Text style={styles.title}>{temp}</Text>
            <FontAwesome5
              name="thermometer-half"
              size={styles.title.fontSize}
            />
          </View>
        </View>
        <Button text="Usuń z systemu" style={styles.delete} />
        <Text style={styles.header}>Zmiana ustawień</Text>
        <TextInput label={"Nazwa pomieszczenia:"}></TextInput>
        <Text style={styles.harmonogram}>Harmonogram:</Text>
        <Schedule schedule={schedule}></Schedule>
        <Button text="Zapisz ustawienia" style={styles.submit} />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: fonts.sizeTitle,
  },
  titleRow: { flexDirection: "row", justifyContent: "space-between" },
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
  temp: { flexDirection: "row", alignItems: "center" },
});

export default Device;
