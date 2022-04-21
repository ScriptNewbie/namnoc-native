import { FlatList, StyleSheet, View } from "react-native";
import DeviceCard from "./DeviceCard";

function DeviceList({ devices, deleteDevice }) {
  return (
    <FlatList
      ItemSeparatorComponent={() => {
        return <View style={styles.sperarator} />;
      }}
      data={devices}
      keyExtractor={(device) => device.id.toString()}
      renderItem={({ item }) => (
        <DeviceCard deleteDevice={deleteDevice} device={item} />
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
