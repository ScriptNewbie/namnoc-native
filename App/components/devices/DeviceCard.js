import { View, StyleSheet } from "react-native";
import { FontAwesome5, FontAwesome } from "@expo/vector-icons";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import colors from "../../config/colors";
import Text from "../basic/Text";
import Button from "../basic/Button";

function DeviceCard({ device }) {
  const { ip, temp, alive, id } = device;
  let { name } = device;
  let opacity = {};
  let notAliveIpColor = {};
  //Device grayed out if not alieve
  if (!alive) {
    opacity = StyleSheet.create({ opacity: styles.notAlive.opacity });
    notAliveIpColor = StyleSheet.create({ color: styles.notAlive.color });
  }
  //Delete option available if device paired
  let rightAction = <View />;
  if (name) {
    rightAction = (
      <Button
        style={styles.delete}
        onPress={() => {
          console.log(device);
        }}
      >
        <FontAwesome name="trash" size={30} color={"white"} />
      </Button>
    );
  } else name = id;
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
    color: colors.light.apply,
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
    backgroundColor: colors.light.discard,
    height: "100%",
    padding: 20,
    marginLeft: 10,
  },
});

export default DeviceCard;