import { StyleSheet, FlatList, View } from "react-native";
import React, { useState, useContext } from "react";
import { useQueryClient } from "react-query";
import { useNavigation } from "@react-navigation/native";

import DevicesList from "../components/devices/DevicesList";
import Screen from "../components/basic/FullScreen";
import Text from "../components/basic/Text";
import TopBar from "../components/topBar";
import fonts from "../config/fonts";
import useNewDevices from "../hooks/useNewDevices";
import useDevices from "../hooks/useDevices";
import useOtherThings from "../hooks/useOtherThings";
import Button from "../components/basic/Button";
import colors from "../config/colors";
import ColorMode from "../contexts/colorMode";

function Main() {
  const navigation = useNavigation();
  const colorMode = useContext(ColorMode);
  const [pulledTimestamps, setPulledTimestamps] = useState({
    devices: null,
    newDevices: null,
  });
  const queryClient = useQueryClient();
  const {
    data: newDevices,
    isLoading: newDevicesLoading,
    isSuccess: newDevicesSuccess,
    dataUpdatedAt: devicesUpdatedAt,
  } = useNewDevices();
  const {
    data: devices,
    isLoading: devicesLoading,
    isSuccess: devicesSuccess,
    dataUpdatedAt: newDevicesUpdatedAt,
  } = useDevices();

  const { data: otherThings, isError, isSuccess } = useOtherThings();

  const styles = generateStyles(colorMode);

  const items = [
    { id: "1", content: <View style={styles.topMargin} /> },
    { id: "5", content: <TopBar /> },
    {
      id: "6",
      content: (
        <>
          {isError && (
            <Button
              style={[styles.margins, styles.connectionIssue]}
              text="Brak połączenia z HUBem!"
              onPress={() => {
                navigation.navigate("Settings");
              }}
            />
          )}
        </>
      ),
    },
    {
      id: "7",
      content: (
        <>
          {isSuccess && !otherThings.optionsSetByUser && (
            <Button
              style={[styles.margins, styles.configureHub]}
              text="Przeprowadź wstępną konfigurację huba!"
              onPress={() => {
                navigation.navigate("Settings");
              }}
            />
          )}
        </>
      ),
    },
    {
      id: "8",
      content: (
        <>
          {isSuccess && !otherThings.mqttConnected && (
            <Button
              style={[styles.margins, styles.connectionIssue]}
              onPress={() => {
                navigation.navigate("Settings");
              }}
              text="Brak połączenia z broakerem MQTT!"
            />
          )}
        </>
      ),
    },
    { id: "10", content: <Text style={styles.texts}>Pokoje:</Text> },
    {
      id: "20",
      content: devicesLoading ? (
        <Text>Ładowanie urządzeń...</Text>
      ) : devicesSuccess ? (
        devices && devices.length ? (
          <DevicesList devices={devices}></DevicesList>
        ) : (
          <Text>Żadne urządzenie nie zostało skonfigurowane w systemie!</Text>
        )
      ) : (
        <Text>Błąd podczas ładowania urządzeń!</Text>
      ),
    },
    {
      id: "30",
      content: (
        <Text style={styles.texts}>Urządzenia oczekujące na parowanie:</Text>
      ),
    },
    {
      id: "40",
      content: newDevicesLoading ? (
        <Text>Ładowanie urządzeń...</Text>
      ) : newDevicesSuccess ? (
        newDevices && newDevices.length ? (
          <DevicesList devices={newDevices}></DevicesList>
        ) : (
          <Text>Żadne urządzenie nie zostało skonfigurowane w systemie!</Text>
        )
      ) : (
        <Text>Błąd podczas ładowania urządzeń!</Text>
      ),
    },
    { id: "50", content: <View style={styles.safeBottom} /> },
  ];
  return (
    <Screen>
      <FlatList
        refreshing={
          devicesUpdatedAt === pulledTimestamps["devices"] ||
          newDevicesUpdatedAt === pulledTimestamps["newDevices"]
        }
        onRefresh={() => {
          setPulledTimestamps({
            devices: devicesUpdatedAt,
            newDevices: newDevicesUpdatedAt,
          });
          queryClient.invalidateQueries();
        }}
        style={styles.container}
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => item.content}
      />
    </Screen>
  );
}

const generateStyles = (mode) => {
  return StyleSheet.create({
    texts: { fontSize: fonts.sizeHeader, marginBottom: 10, marginTop: 10 },
    container: { paddingLeft: 10, paddingRight: 10 },
    topMargin: { height: 10 },
    margins: { marginTop: 10 },
    configureHub: { backgroundColor: colors[mode].warning },
    connectionIssue: { backgroundColor: colors[mode].discard },
    safeBottom: { height: 50 },
  });
};

export default Main;
