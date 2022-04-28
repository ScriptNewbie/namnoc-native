import { StyleSheet, ScrollView, View } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useQueryClient } from "react-query";

import Screen from "../components/basic/Screen";
import TextInput from "../components/basic/TextInput";
import Text from "../components/basic/Text";
import Button from "../components/basic/Button";
import colors from "../config/colors";
import fonts from "../config/fonts";
import Schedule from "../components/devices/Schedule";
import useAddDevice from "../hooks/useAddDevice";

function NewDevice({ route }) {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const addDevice = useAddDevice({
    onSuccess: () => {
      navigation.goBack();
    },
  });
  const [schedule, setSchedule] = useState({
    monday: {
      times: [],
      lastTemp: 20,
    },
    tuesday: {
      times: [],
      lastTemp: 20,
    },
    wednesday: {
      times: [],
      lastTemp: 20,
    },
    thursday: {
      times: [],
      lastTemp: 20,
    },
    friday: {
      times: [],
      lastTemp: 20,
    },
    saturday: {
      times: [],
      lastTemp: 20,
    },
    sunday: {
      times: [],
      lastTemp: 20,
    },
  });

  const [name, setName] = useState("");

  const { id } = route.params;

  const updateSchedule = (schedule) => {
    setSchedule({ ...schedule });
  };

  const saveSettings = () => {
    const device = { name, schedule, ...route.params };
    addDevice.mutate(device);
  };

  return (
    <Screen>
      <ScrollView style={styles.container}>
        <View>
          <Text style={styles.title}>Nowe urządzenie</Text>
          <Text style={styles.id}>{id}</Text>
        </View>
        <Text style={styles.header}>Konfiguracja urządzenia</Text>
        <TextInput
          label={"Nazwa pomieszczenia:"}
          onChangeText={(value) => setName(value)}
        ></TextInput>
        <Text style={styles.harmonogram}>Harmonogram:</Text>
        <Schedule
          schedule={schedule}
          updateSchedule={updateSchedule}
        ></Schedule>
        <Button
          text="Dodaj do systemu"
          onPress={saveSettings}
          style={styles.submit}
        />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: fonts.sizeTitle,
  },
  header: {
    marginTop: 10,
    fontSize: fonts.sizeHeader,
  },
  harmonogram: {
    fontSize: fonts.sizeBig,
  },
  container: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  submit: {
    backgroundColor: colors.light.apply,
    marginTop: 10,
    marginBottom: 10,
  },
  id: { fontSize: fonts.sizeVerySmall },
});

export default NewDevice;
