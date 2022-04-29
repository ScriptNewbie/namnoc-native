import React from "react";
import { ScrollView, StyleSheet, SafeAreaView } from "react-native";

function Screen({ style, children }) {
  return (
    <ScrollView style={[styles.screen, style]}>
      {children}
      <SafeAreaView />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  safeBottomSpace: { height: 30 },
});

export default Screen;
