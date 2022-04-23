import React from "react";
import { View, StyleSheet } from "react-native";

function Screen({ style, children }) {
  return <View style={[styles.screen, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default Screen;
