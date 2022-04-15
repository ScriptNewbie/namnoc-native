import { StyleSheet, Text } from "react-native";
import DevicesList from "./components/devices/DevicesList";

import Screen from "./components/basic/Screen";

const devices = [
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
];

const newDevices = [
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
];

export default function App() {
  return (
    <Screen style={styles.container}>
      <DevicesList devices={devices} nameKey="name"></DevicesList>
      <DevicesList devices={newDevices} nameKey="id"></DevicesList>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
});
