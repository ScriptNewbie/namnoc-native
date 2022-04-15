import { FlatList, StyleSheet } from "react-native";
import DeviceCard from "./DeviceCard";

function DeviceList({ devices, nameKey }) {
  return (
    <FlatList
      data={devices}
      keyExtractor={(device) => device.id.toString()}
      renderItem={({ item }) => (
        <DeviceCard
          alive={item.alive}
          name={item[nameKey]}
          temp={item.temp}
          ip={item.ip}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({});

export default DeviceList;
