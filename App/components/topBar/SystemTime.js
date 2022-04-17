import { StyleSheet, View } from "react-native";
import Text from "../basic/Text";

function SystemTime({ date }) {
  return (
    <View style={styles.systemTime}>
      <Text style={styles.texts}>Poniedziałek</Text>
      <Text style={styles.texts}>{date.time}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  systemTime: {
    alignItems: "center",
    justifyContent: "center",
  },
  texts: { fontSize: 16 },
});

export default SystemTime;
