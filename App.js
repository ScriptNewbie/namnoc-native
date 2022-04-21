import { StyleSheet, FlatList, StatusBar } from "react-native";

const device = {
  id: "1",
  name: "Sypialnia",
  ip: "192.168.120.1",
  temp: "22.0",
  alive: 5,
};

import Screen from "./App/screens/Settings";

export default function App() {
  return <Screen device={device} />;
}
