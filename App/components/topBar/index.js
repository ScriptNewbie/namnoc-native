import { StyleSheet, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import Furnace from "./Furnace";
import Button from "../basic/Button";
import SystemTime from "./SystemTime";

const furnace = { on: 0, ip: "", alive: 1, timeStamp: 0 };

function TopBar() {
  const navigation = useNavigation();
  return (
    <View style={styles.topBar}>
      <Furnace />
      <SystemTime />
      <Button>
        <Feather
          name="settings"
          onPress={() => {
            navigation.navigate("Settings");
          }}
          size={32}
          color="white"
        />
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: { flexDirection: "row", justifyContent: "space-between" },
});

export default TopBar;
