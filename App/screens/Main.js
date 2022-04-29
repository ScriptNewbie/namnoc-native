import { StyleSheet, FlatList, View } from "react-native";
import React, { useState } from "react";
import { useQueryClient } from "react-query";

import DevicesList from "../components/devices/DevicesList";
import Screen from "../components/basic/FullScreen";
import Text from "../components/basic/Text";
import TopBar from "../components/topBar";
import fonts from "../config/fonts";
import useNewDevices from "../hooks/useNewDevices";
import useDevices from "../hooks/useDevices";

function Main() {
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

  const items = [
    { id: "1", content: <View style={styles.topMargin} /> },
    { id: "5", content: <TopBar /> },
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

const styles = StyleSheet.create({
  texts: { fontSize: fonts.sizeHeader, marginBottom: 10, marginTop: 10 },
  container: { paddingLeft: 10, paddingRight: 10 },
  topMargin: { height: 10 },
});

export default Main;
