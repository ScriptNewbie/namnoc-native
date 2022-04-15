import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import Constants from "expo-constants";

function Screen({ style, children }) {
  return (
    <SafeAreaView style={[styles.screen, style]}>
      <View>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
  },
  inner: {
    flex: 1,
  },
});

export default Screen;
