import { StyleSheet, FlatList, ActivityIndicator } from "react-native";
import React, { useState } from "react";

import DevicesList from "../components/devices/DevicesList";
import Screen from "../components/basic/FullScreen";
import Text from "../components/basic/Text";
import TopBar from "../components/topBar";
import fonts from "../config/fonts";
import useNewDevices from "../hooks/useNewDevices";
import useDevices from "../hooks/useDevices";

function Main() {
  const {
    data: newDevices,
    isLoading: newDevicesLoading,
    isSuccess: newDevicesSuccess,
  } = useNewDevices();
  const {
    data: devices,
    isLoading: devicesLoading,
    isSuccess: devicesSuccess,
  } = useDevices();

  const items = [
    { id: "1", content: <TopBar /> },
    { id: "10", content: <Text style={styles.texts}>Pokoje:</Text> },
    {
      id: "20",
      content: devicesLoading ? (
        <Text>Ładowanie urządzeń...</Text>
      ) : devices && devices.length ? (
        <DevicesList devices={devices}></DevicesList>
      ) : (
        <Text>Żadne urządzenie nie zostało skonfigurowane w systemie!</Text>
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
      content: devicesLoading ? (
        <Text>Ładowanie urządzeń...</Text>
      ) : newDevices && newDevices.length ? (
        <DevicesList devices={newDevices}></DevicesList>
      ) : (
        <Text>Żadne urządzenie nie zostało skonfigurowane w systemie!</Text>
      ),
    },
  ];
  return (
    <Screen>
      <FlatList
        style={styles.container}
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => item.content}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  texts: { fontSize: fonts.sizeHeader, marginBottom: 10, marginTop: 10 },
  container: { paddingLeft: 10, paddingRight: 10 },
});

export default Main;
