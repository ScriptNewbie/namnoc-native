import React, { useContext } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import colors from "../../config/colors";
import ColorMode from "../../contexts/colorMode";

function Screen({ style, children }) {
  const { height: windowHeight } = useWindowDimensions();
  const navHeight = useHeaderHeight();
  const colorMode = useContext(ColorMode);
  const styles = generateStyles(colorMode, windowHeight - navHeight);

  return (
    <ScrollView style={[styles.screen, style]}>
      {children}
      <View style={styles.safeBottomSpace} />
    </ScrollView>
  );
}

const generateStyles = (mode, height) => {
  return StyleSheet.create({
    screen: {
      height: height,
      backgroundColor: colors[mode].background,
    },
    safeBottomSpace: { height: 50 },
  });
};

export default Screen;
