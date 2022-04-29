import React from "react";
import { StyleSheet, View } from "react-native";
import Constants from "expo-constants";
import colors from "../../config/colors";

function Screen({ style, children }) {
  return <View style={[styles.screen, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  screen: {
    marginTop: Constants.statusBarHeight,
    borderTopWidth: 1,
    borderColor: colors.light.soft,
    flex: 1,
  },
});

export default Screen;
