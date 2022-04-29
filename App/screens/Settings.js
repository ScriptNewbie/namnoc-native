import { StyleSheet, View, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import Screen from "../components/basic/SafeBottomScrollableScreen";
import TextInput from "../components/basic/TextInput";
import Text from "../components/basic/Text";
import TimeInput from "../components/basic/TimeInput";
import BooleanInput from "../components/basic/BooleanInput";
import Button from "../components/basic/Button";
import colors from "../config/colors";
import fonts from "../config/fonts";
import useSettings from "../hooks/useSettings";
import useModifySettings from "../hooks/useModifySettings";
import useHubAddress from "../hooks/useHubAddress";
import useModifyHubAddress from "../hooks/useModifyHubAddress";

function Settings() {
  const navigation = useNavigation();
  const { data: options, isSuccess, isFetching, isError } = useSettings();
  const {
    data: hubAddress,
    isFetching: ipDisabled,
    isSuccess: ipSuccess,
  } = useHubAddress();
  const modifyHubAddress = useModifyHubAddress();
  const [hubIp, setHubIp] = useState(hubAddress);
  const [settings, setSettings] = useState(
    isSuccess
      ? options
      : {
          day: "08:00",
          night: "22:00",
          hysteresis: 0.2,
          mqttaddress: "mqtt://127.0.0.1:1883",
          mqtttopic: "NamNoc",
          mqttuser: "",
          mqttpassword: "",
          mqttfurnacetopic: "furnace",
          usedb: false,
          influxdb: {
            url: "",
            organisation: "",
            bucket: "",
            key: "",
          },
        }
  );
  const modifySettings = useModifySettings({
    onSuccess: (response) => {
      setSettings(response);
      Alert.alert("Sukces!", "Czy chcesz pozostać na ekranie ustawień?", [
        {
          text: "Tak",
        },
        {
          text: "Nie",
          onPress: () => {
            navigation.goBack();
          },
        },
      ]);
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setSettings(options);
    }
  }, [options]);

  useEffect(() => {
    if (ipSuccess) {
      setHubIp(hubAddress);
    }
  }, [hubAddress]);

  const changeUseDbBoolean = () => {
    const newSettings = { ...settings };
    newSettings.usedb = !newSettings.usedb;
    setSettings(newSettings);
  };

  const updateField = (target, value) => {
    const newSettings = { ...settings };
    newSettings[target] = value;
    setSettings(newSettings);
  };
  const updateInfluxField = (target, value) => {
    const newSettings = { ...settings };
    newSettings.influxdb[target] = value;
    setSettings(newSettings);
  };

  const disabled = isFetching || isError;
  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.title}>Ustawienia</Text>
        <TextInput
          disabled={ipDisabled}
          value={hubIp}
          onChangeText={setHubIp}
          label={"Adres huba:"}
        ></TextInput>
        {isSuccess && (
          <>
            <TextInput
              onChangeText={(value) => {
                updateField("mqttaddress", value);
              }}
              value={settings.mqttaddress}
              disabled={disabled}
              label={"Adres brokera MQTT:"}
            />
            <TextInput
              onChangeText={(value) => {
                updateField("mqtttopic", value);
              }}
              value={settings.mqtttopic}
              disabled={disabled}
              label={"Temat MQTT huba:"}
            />
            <TextInput
              onChangeText={(value) => {
                updateField("mqttfurnacetopic", value);
              }}
              value={settings.mqttfurnacetopic}
              disabled={disabled}
              label={"Temat MQTT pieca:"}
            />
            <TextInput
              onChangeText={(value) => {
                updateField("mqttuser", value);
              }}
              value={settings.mqttuser}
              disabled={disabled}
              label={"Użytkownik MQTT:"}
            />
            <TextInput
              onChangeText={(value) => {
                updateField("mqttpassword", value);
              }}
              value={settings.mqttpassword}
              disabled={disabled}
              secureTextEntry={true}
              label={"Hasło MQTT:"}
            />
            <TextInput
              value={settings.hysteresis.toString()}
              onChangeText={(value) => {
                updateField("hysteresis", value);
              }}
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
                updateTime={(value) => {
                  updateField("day", value);
                }}
              />
              <TimeInput
                disabled={disabled}
                value={settings.night}
                style={styles.dayEnd}
                label={"Koniec dnia:"}
                updateTime={(value) => {
                  updateField("night", value);
                }}
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
              onChangeText={(value) => {
                updateInfluxField("url", value);
              }}
              value={settings.influxdb.url}
              disabled={!settings.usedb}
              label={"Adres bazy danych:"}
            ></TextInput>
            <TextInput
              onChangeText={(value) => {
                updateInfluxField("organisation", value);
              }}
              value={settings.influxdb.organisation}
              disabled={!settings.usedb}
              label={"Nazwa organizacji:"}
            ></TextInput>
            <TextInput
              onChangeText={(value) => {
                updateInfluxField("bucket", value);
              }}
              value={settings.influxdb.bucket}
              disabled={!settings.usedb}
              label={"Nazwa Koszyka:"}
            ></TextInput>
            <TextInput
              onChangeText={(value) => {
                updateInfluxField("key", value);
              }}
              value={settings.influxdb.key}
              disabled={!settings.usedb}
              label={"Token autoryzacji:"}
            ></TextInput>
          </>
        )}
        <Button
          onPress={() => {
            modifySettings.mutate(settings);
            modifyHubAddress.mutate(hubIp);
          }}
          text="Zapisz ustawienia"
          style={styles.submit}
        />
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
