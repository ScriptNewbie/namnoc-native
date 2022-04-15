import { StyleSheet, FlatList, StatusBar } from "react-native";
import DevicesList from "./App/components/devices/DevicesList";

import Screen from "./App/components/basic/Screen";
import Text from "./App/components/basic/Text";

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
  const items = [
    { id: "1", content: <Text style={styles.texts}>Pokoje:</Text> },
    {
      id: "2",
      content: <DevicesList devices={devices} nameKey="name"></DevicesList>,
    },
    {
      id: "3",
      content: (
        <Text style={styles.texts}>Urządzenia oczekujące na parowanie:</Text>
      ),
    },
    {
      id: "4",
      content: <DevicesList devices={newDevices} nameKey="id"></DevicesList>,
    },
  ];
  return (
    <Screen>
      <StatusBar translucent barStyle="dark-content" />
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
