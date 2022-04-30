import { StyleSheet, View, ActivityIndicator } from "react-native";
import fonts from "../../config/fonts";
import Text from "../basic/Text";
import useTime from "../../hooks/useTime";
import colors from "../../config/colors";

function SystemTime() {
  const { data: time, isSuccess } = useTime();
  const daysOfWeek = [
    "Niedziela",
    "Poniedziałek",
    "Wtorek",
    "Środa",
    "Czwartek",
    "Piątek",
    "Sobota",
  ];

  return (
    <View style={styles.systemTime}>
      {isSuccess ? (
        <>
          <Text style={styles.texts}>{daysOfWeek[time.dayOfWeek]}</Text>
          <Text style={styles.texts}>{time.time}</Text>
        </>
      ) : (
        <ActivityIndicator color={colors.light.primary} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  systemTime: {
    alignItems: "center",
    justifyContent: "center",
  },
  texts: { fontSize: fonts.sizeSmall },
});

export default SystemTime;
