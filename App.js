import { Platform, StatusBar } from "react-native";

const device = {
  id: "1",
  name: "Sypialnia",
  ip: "192.168.120.1",
  temp: "22.0",
  alive: 5,
  schedule: {
    monday: {
      times: [
        { end: "12:00", temp: "22" },
        { end: "16:00", temp: "23" },
      ],
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
  return (
    <>
      {Platform.OS === "ios" && <StatusBar barStyle="dark-content" />}
      <Screen device={device} />
    </>
  );
}
