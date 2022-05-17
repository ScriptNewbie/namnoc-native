import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import Constants from "expo-constants";
import colors from "../../config/colors";
import ColorMode from "../../contexts/colorMode";

function Screen({ style, children }) {
  const colorMode = useContext(ColorMode);
  const styles = generateStyles(colorMode);
  return <View style={[styles.screen, style]}>{children}</View>;
}

const generateStyles = (mode) => {
  return StyleSheet.create({
    screen: {
      marginTop: Constants.statusBarHeight,
      borderTopWidth: 1,
      borderColor: colors[mode].soft,
      flex: 1,
      backgroundColor: colors[mode].background,
    },
  });
};

export default Screen;
