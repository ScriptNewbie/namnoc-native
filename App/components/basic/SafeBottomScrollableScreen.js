import React, { useContext } from "react";
import { ScrollView, StyleSheet, SafeAreaView } from "react-native";
import colors from "../../config/colors";
import ColorMode from "../../contexts/colorMode";

function Screen({ style, children }) {
  const colorMode = useContext(ColorMode);
  const styles = generateStyles(colorMode);

  return (
    <ScrollView style={[styles.screen, style]}>
      {children}
      <SafeAreaView />
    </ScrollView>
  );
}

const generateStyles = (mode) => {
  return StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors[mode].background,
    },
    safeBottomSpace: { height: 30 },
  });
};

export default Screen;
