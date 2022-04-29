import { StyleSheet, View } from "react-native";
import React, { useState, useEffect } from "react";

import Screen from "../components/basic/SafeBottomScrollableScreen";
import TextInput from "../components/basic/TextInput";
import Text from "../components/basic/Text";
import TimeInput from "../components/basic/TimeInput";
import BooleanInput from "../components/basic/BooleanInput";
import Button from "../components/basic/Button";
import colors from "../config/colors";
import fonts from "../config/fonts";
import useSettings from "../hooks/useSettings";

function Settings() {
  const { data: options, isSuccess, isFetching, isError } = useSettings();
  const [settings, setSettings] = useState({
    usedb: false,
    day: "8:00",
    night: "22:00",
  });
  useEffect(() => {
    if (isSuccess) {
      setSettings(options);
    }
  }, [options]);

  const changeUseDbBoolean = () => {
    const newSettings = { ...settings };
    newSettings.usedb = !newSettings.usedb;
    setSettings(newSettings);
  };

  const changeDayBegin = (value) => {
    const newSettings = { ...settings };
    newSettings.day = value;
    setSettings(newSettings);
  };

  const changeDayEnd = (value) => {
    const newSettings = { ...settings };
    newSettings.night = value;
    setSettings(newSettings);
  };

  const disabled = isFetching || isError;

  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.title}>Ustawienia</Text>
        <TextInput label={"Adres huba:"}></TextInput>
        <TextInput disabled={disabled} label={"Adres brokera MQTT:"} />
        <TextInput disabled={disabled} label={"Temat MQTT huba:"} />
        <TextInput disabled={disabled} label={"Temat MQTT pieca:"} />
        <TextInput disabled={disabled} label={"Użytkownik MQTT:"} />
        <TextInput
          disabled={disabled}
          secureTextEntry={true}
          label={"Hasło MQTT:"}
        />
        <TextInput
          disabled={disabled}
          keyboardType="numeric"
          label={"Histereza :"}
        />
        <View style={styles.dayBeginEnd}>
          <TimeInput
            disabled={disabled}
            value={settings.day}
            style={styles.dayBegin}
            label={"Początek dnia:"}
            updateTime={changeDayBegin}
          />
          <TimeInput
            disabled={disabled}
            value={settings.night}
            style={styles.dayEnd}
            label={"Koniec dnia:"}
            updateTime={changeDayEnd}
          />
        </View>
        <Text style={styles.databaseHeader}>Ustawienia influxDB:</Text>
        <BooleanInput
          disabled={disabled}
          value={settings.usedb}
          onChange={() => {
            changeUseDbBoolean();
          }}
          label={"Używaj bazy danych"}
        />
        <TextInput
          disabled={!settings.usedb}
          label={"Adres bazy danych:"}
        ></TextInput>
        <TextInput
          disabled={!settings.usedb}
          label={"Nazwa organizacji:"}
        ></TextInput>
        <TextInput
          disabled={!settings.usedb}
          label={"Nazwa Koszyka:"}
        ></TextInput>
        <TextInput
          disabled={!settings.usedb}
          label={"Token autoryzacji:"}
        ></TextInput>
        <Button text="Zapisz ustawienia" style={styles.submit} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: fonts.sizeTitle,
  },
  databaseHeader: {
    marginTop: 20,
    fontSize: fonts.sizeHeader,
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
