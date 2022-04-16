import { StyleSheet, View } from "react-native";
import { Feather } from "@expo/vector-icons";

import Furnace from "./Furnace";
import Button from "../basic/Button";
import SystemTime from "./SystemTime";

const furnace = { on: 1, ip: "", alive: 1, timeStamp: 0 };

function TopBar() {
  return (
    <View style={styles.topBar}>
      <Furnace furnace={furnace} />
      <SystemTime date={{ time: "10:00" }} />
      <Button>
        <Feather name="settings" size={32} color="white" />
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: { flexDirection: "row", justifyContent: "space-between" },
});

export default TopBar;
