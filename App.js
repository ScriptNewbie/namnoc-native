import { StyleSheet, FlatList, StatusBar } from "react-native";

const device = {
  id: "1",
  name: "Sypialnia",
  ip: "192.168.120.1",
  temp: "22.0",
  alive: 5,
  schedule: {
    monday: {
      times: [{ end: "22:00", temp: "22" }],
      lastTemp: 20,
    },
    tuesday: {
      times: [],
      lastTemp: 20,
    },
    wednesday: {
      times: [],
      lastTemp: 20,
    },
    thursday: {
      times: [],
      lastTemp: 20,
    },
    friday: {
      times: [],
      lastTemp: 20,
    },
    saturday: {
      times: [],
      lastTemp: 20,
    },
    sunday: {
      times: [],
      lastTemp: 20,
    },
  },
};

import Screen from "./App/screens/Device";

export default function App() {
  return <Screen device={device} />;
}
