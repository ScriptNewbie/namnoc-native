import { StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Button from "../basic/Button";

function Furnace({ furnace }) {
  if (!furnace.alive) icon = "exclamation-triangle";
  else if (furnace.on) icon = "fire";
  else icon = "";
  return (
    <Button style={styles.button}>
      <FontAwesome name={icon} size={32}></FontAwesome>
    </Button>
  );
}

const styles = StyleSheet.create({
  button: { width: 52, backgroundColor: "rgba(0,0,0,0)" },
});

export default Furnace;
