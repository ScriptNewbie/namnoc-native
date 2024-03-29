import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import { FontAwesome5, FontAwesome } from "@expo/vector-icons";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect, useContext } from "react";

import colors from "../../config/colors";
import fonts from "../../config/fonts";
import Text from "../basic/Text";
import Button from "../basic/Button";
import useDeleteDevice from "../../hooks/useDeleteDevice";
import ColorMode from "../../contexts/colorMode";

function DeviceCard({ device }) {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (loading) {
      navigation.navigate(navigationPath, device);
      setLoading(false);
    }
  }, [loading]);
  const deviceDelete = useDeleteDevice();
  const colorMode = useContext(ColorMode);
  const styles = generateStyles(colorMode);

  const { ip, temp, alive, id, opened } = device;
  let { name } = device;
  let opacity = {};
  let notAliveIpColor = {};
  //Device grayed out if not alive
  if (!alive) {
    opacity = { opacity: styles.notAlive.opacity };
    notAliveIpColor = { color: styles.notAlive.color };
  }
  //Delete option available if device paired, different navigation paths
  let rightAction = <View />;
  let navigationPath = "NewDevice";
  if (name) {
    navigationPath = "Device";
    rightAction = (
      <Button
        style={styles.delete}
        onPress={() => {
          deviceDelete.mutate(device);
        }}
      >
        <FontAwesome name="trash" size={30} color={"white"} />
      </Button>
    );
  } else name = id;
  return (
    <GestureHandlerRootView>
      <Swipeable renderRightActions={() => rightAction}>
        <TouchableWithoutFeedback
          onPress={() => {
            setLoading(true);
          }}
        >
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
              <ActivityIndicator
                color={colors[colorMode].primary}
                style={[
                  styles.loadingNotVisible,
                  loading && styles.loadingVisible,
                ]}
              />
              <FontAwesome5
                color={
                  opened ? colors[colorMode].discard : colors[colorMode].primary
                }
                size={fonts.sizeTitle}
                name="thermometer-half"
                style={styles.tempIcon}
              />
              <Text style={styles.temp}>{temp}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Swipeable>
    </GestureHandlerRootView>
  );
}

const generateStyles = (mode) => {
  return StyleSheet.create({
    deviceCard: {
      width: "100%",
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors[mode].soft,
      padding: 10,
      flexDirection: "row",
      backgroundColor: colors[mode].background,
    },
    name: {
      fontSize: fonts.sizeBig,
    },
    ip: {
      color: colors[mode].apply,
      fontSize: fonts.sizeSmall,
    },
    leftSide: {
      flex: 1,
    },
    rightSide: {
      flexDirection: "row",
      alignItems: "center",
    },
    temp: {
      fontSize: fonts.sizeTitle,
    },
    tempIcon: {
      marginBottom: -1,
      marginRight: 5,
    },
    notAlive: {
      opacity: 0.5,
      color: colors[mode].soft,
    },
    delete: {
      backgroundColor: colors[mode].discard,
      height: "100%",
      padding: 20,
      marginLeft: 10,
    },
    loadingVisible: { opacity: 1 },
    loadingNotVisible: { opacity: 0 },
  });
};

export default DeviceCard;
