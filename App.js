import { Platform, StatusBar, LogBox } from "react-native";

const device = {
  name: "Sypialnia",
  id: "2E:2G:8J:CD:FF",
  ip: "192.168.120.1",
  temp: "22.0",
  alive: 5,
  schedule: {
    monday: {
      times: [
        { end: 800, temp: 20 },
        { end: 2200, temp: 22 },
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

import Screen from "./App/screens/NewDevice";

export default function App() {
  LogBox.ignoreLogs(["..."]);

  return (
    <>
      {Platform.OS === "ios" && <StatusBar barStyle="dark-content" />}
      <Screen device={device} />
    </>
  );
}
