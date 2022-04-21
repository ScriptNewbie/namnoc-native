import { StyleSheet, FlatList, StatusBar } from "react-native";
import React, { useState } from "react";

import DevicesList from "../components/devices/DevicesList";
import Screen from "../components/basic/Screen";
import Text from "../components/basic/Text";
import TopBar from "../components/topBar";

function Main() {
  const [devices, setDevices] = useState([
    {
      id: "1",
      name: "Sypialnia",
      ip: "192.168.120.1",
      temp: "22.0",
      alive: 5,
    },
    {
      id: "2",
      name: "Kuchnia",
      ip: "192.168.120.2",
      temp: "22.1",
      alive: 5,
    },
    {
      id: "3",
      name: "Gościnny",
      ip: "192.168.120.4",
      temp: "21.8",
      alive: 5,
    },
  ]);

  const [newDevices, setNewDevices] = useState([
    {
      id: "E3:98:71:63:7A:71",
      ip: "192.168.120.1",
      temp: "22.0",
      alive: 5,
    },
    {
      id: "51:9C:7F:00:BC:30",
      ip: "192.168.120.2",
      temp: "22.1",
      alive: 5,
    },
    {
      id: "36:23:6B:73:0E:75",
      ip: "192.168.120.4",
      temp: "21.8",
      alive: 5,
    },
  ]);

  const deleteDevice = (device) => {
    const devicesCopy = [...devices];
    const current = devicesCopy.find((c) => c.id === device.id);
    devicesCopy.splice(devicesCopy.indexOf(current), 1);
    setDevices(devicesCopy);
  };

  const items = [
    { id: "1", content: <TopBar /> },
    { id: "10", content: <Text style={styles.texts}>Pokoje:</Text> },
    {
      id: "20",
      content: (
        <DevicesList
          deleteDevice={deleteDevice}
          devices={devices}
        ></DevicesList>
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
      content: <DevicesList devices={newDevices}></DevicesList>,
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
  texts: { fontSize: 24, marginBottom: 10, marginTop: 10 },
  container: { paddingLeft: 10, paddingRight: 10 },
});

export default Main;
