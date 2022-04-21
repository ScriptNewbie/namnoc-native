import { StyleSheet, ScrollView, View } from "react-native";
import React, { useState } from "react";

import Screen from "../components/basic/Screen";
import TextInput from "../components/basic/TextInput";
import Text from "../components/basic/Text";
import TimeInput from "../components/basic/TimeInput";
import BooleanInput from "../components/basic/BooleanInput";
import Button from "../components/basic/Button";
import colors from "../config/colors";

function Settings() {
  const [dayBegin, setDayBegin] = useState("08:00");
  const [dayEnd, setDayEnd] = useState("22:00");
  const [useDatabase, setUseDatabase] = useState(true);

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
        <BooleanInput
          value={useDatabase}
          onChange={() => {
            setUseDatabase(!useDatabase);
          }}
          label={"Używaj bazy danych"}
        />
        <TextInput label={"Adres bazy danych:"}></TextInput>
        <TextInput label={"Nazwa organizacji:"}></TextInput>
        <TextInput label={"Nazwa Koszyka:"}></TextInput>
        <TextInput label={"Token autoryzacji:"}></TextInput>
        <Button text="Zapisz ustawienia" style={styles.submit} />
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
  submit: {
    backgroundColor: colors.light.apply,
    marginTop: 10,
    marginBottom: 10,
  },
});

export default Settings;
