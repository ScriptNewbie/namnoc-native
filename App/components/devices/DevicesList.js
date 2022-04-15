import { FlatList, StyleSheet, View } from "react-native";
import DeviceCard from "./DeviceCard";

function DeviceList({ devices, nameKey }) {
  let rightAction = false;
  if (nameKey === "name") {
    rightAction = true;
  }
  return (
    <FlatList
      ItemSeparatorComponent={() => {
        return <View style={styles.sperarator} />;
      }}
      data={devices}
      keyExtractor={(device) => device.id.toString()}
      renderItem={({ item }) => (
        <DeviceCard
          alive={item.alive}
          name={item[nameKey]}
          temp={item.temp}
          ip={item.ip}
          enableRightAction={rightAction}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  sperarator: {
    height: 5,
  },
});

export default DeviceList;
