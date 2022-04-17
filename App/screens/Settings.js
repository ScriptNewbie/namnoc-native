import { StyleSheet, ScrollView, View } from "react-native";
import React, { useState } from "react";

import Screen from "../components/basic/Screen";
import TextInput from "../components/basic/TextInput";
import Text from "../components/basic/Text";
import TimeInput from "../components/basic/TimeInput";

function Settings() {
  const [dayBegin, setDayBegin] = useState("08:00");
  const [dayEnd, setDayEnd] = useState("22:00");

  return (
    <Screen>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Ustawienia</Text>
        <TextInput label={"Adres huba:"}></TextInput>
        <TextInput label={"Adres brokera MQTT:"}></TextInput>
        <TextInput label={"Temat MQTT huba:"}></TextInput>
        <TextInput label={"Temat MQTT pieca:"}></TextInput>
        <TextInput label={"Użytkownik MQTT:"}></TextInput>
        <TextInput secureTextEntry={true} label={"Hasło MQTT:"}></TextInput>
        <TextInput keyboardType="numeric" label={"Histereza :"}></TextInput>
        <View style={styles.dayBeginEnd}>
          <TimeInput
            value={dayBegin}
            style={styles.dayBegin}
            label={"Początek dnia:"}
            updateTime={setDayBegin}
          />
          <TimeInput
            value={dayEnd}
            style={styles.dayEnd}
            label={"Koniec dnia:"}
            updateTime={setDayEnd}
          />
        </View>
        <Text style={styles.databaseHeader}>Ustawienia influxDB:</Text>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
  },
  databaseHeader: {
    marginTop: 20,
    fontSize: 24,
  },
  dayBeginEnd: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dayBegin: {
    marginRight: 5,
  },
  dayEnd: {
    marginLeft: 5,
  },
  container: {
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default Settings;
