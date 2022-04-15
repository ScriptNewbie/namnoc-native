import { View, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import colors from "../../config/colors";
import Text from "../basic/Text";

function DeviceCard({ name, ip, temp, alive }) {
  let opacity = {};
  let notAliveIpColor = {};
  if (!alive) {
    opacity = { opacity: styles.notAlive.opacity };
    notAliveIpColor = { color: styles.notAlive.color };
  }
  return (
    <View style={[styles.deviceCard, opacity]}>
      <View style={styles.leftSide}>
        <Text numberOfLines={1} style={styles.name}>
          {name}
        </Text>
        <Text style={[styles.ip, notAliveIpColor]}>
          {alive ? ip : "Nieaktywne"}
        </Text>
      </View>
      <View style={styles.rightSide}>
        <FontAwesome5
          name="thermometer-half"
          style={styles.tempIcon}
          size={styles.temp.fontSize}
        />
        <Text style={styles.temp}>{temp}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  deviceCard: {
    width: "100%",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.light.soft,
    padding: 10,
    flexDirection: "row",
  },
  name: {
    fontSize: 24,
  },
  ip: {
    color: colors.light.success,
  },
  leftSide: {
    flex: 1,
  },
  rightSide: {
    flexDirection: "row",
    alignItems: "center",
  },
  temp: {
    fontSize: 32,
  },
  tempIcon: {
    marginBottom: -5,
    marginRight: 5,
  },
  notAlive: {
    opacity: 0.5,
    color: colors.light.soft,
  },
});

export default DeviceCard;
