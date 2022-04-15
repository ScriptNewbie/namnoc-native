import { View, StyleSheet } from "react-native";
import { FontAwesome5, FontAwesome } from "@expo/vector-icons";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import colors from "../../config/colors";
import Text from "../basic/Text";

function DeviceCard({ name, ip, temp, alive, enableRightAction }) {
  let opacity = {};
  let notAliveIpColor = {};
  if (!alive) {
    opacity = { opacity: styles.notAlive.opacity };
    notAliveIpColor = { color: styles.notAlive.color };
  }
  let rightAction = <View />;
  if (enableRightAction) {
    rightAction = (
      <View style={styles.delete}>
        <FontAwesome name="trash" size={30} color={"white"} />
      </View>
    );
  }
  return (
    <GestureHandlerRootView>
      <Swipeable renderRightActions={() => rightAction}>
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
      </Swipeable>
    </GestureHandlerRootView>
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
    backgroundColor: colors.light.background,
  },
  name: {
    fontSize: 20,
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
    fontSize: 27,
  },
  tempIcon: {
    marginBottom: -3,
    marginRight: 5,
  },
  notAlive: {
    opacity: 0.5,
    color: colors.light.soft,
  },
  delete: {
    backgroundColor: "red",
    height: "100%",
    borderRadius: 10,
    padding: 20,
    marginLeft: 10,
    justifyContent: "center",
  },
});

export default DeviceCard;
