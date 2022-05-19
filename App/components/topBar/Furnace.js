import { StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useContext } from "react";

import Button from "../basic/Button";
import useFurnace from "../../hooks/useFurnace";
import ColorMode from "../../contexts/colorMode";
import colors from "../../config/colors";

function Furnace() {
  const colorMode = useContext(ColorMode);
  const { data: furnace, isSuccess } = useFurnace();
  let icon = "";
  if (isSuccess) {
    if (!furnace.alive) icon = "exclamation-triangle";
    else if (furnace.on) icon = "fire";
  }
  return (
    <Button style={styles.button}>
      {!!icon && (
        <FontAwesome
          color={colors[colorMode].primary}
          name={icon}
          size={32}
        ></FontAwesome>
      )}
    </Button>
  );
}

const styles = StyleSheet.create({
  button: { width: 52, backgroundColor: "rgba(0,0,0,0)" },
});

export default Furnace;
