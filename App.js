import { StyleSheet, FlatList, StatusBar } from "react-native";

import Screen from "./App/screens/Main";

export default function App() {
  return <Screen />;
}

const styles = StyleSheet.create({
  texts: { fontSize: 24, marginBottom: 10, marginTop: 10 },
  container: { paddingLeft: 10, paddingRight: 10 },
});
