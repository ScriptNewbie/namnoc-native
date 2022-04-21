import { StyleSheet, View } from "react-native";
import TimeInput from "../basic/TimeInput";
import Button from "../basic/Button";
import Text from "../basic/Text";
import TextInput from "../basic/TextInput";

const daysOfWeek = [
  ["monday", "Poniedziałek", "poniedziałku"],
  ["tuesday", "Wtorek", "wtorku"],
  ["wednesday", "Środa", "środy"],
  ["thursday", "Czwartek", "czwartku"],
  ["friday", "Piątek", "piątku"],
  ["saturday", "Sobota", "soboty"],
  ["sunday", "Niedziela", "niedzieli"],
];

function Schedule({ schedule }) {
  return (
    <View>
      {daysOfWeek.map((dayOfWeek) => (
        <View key={dayOfWeek[0]}>
          <Text>{dayOfWeek[1]}</Text>
          <Text>Kopiuj z:</Text>
          <View style={styles.copyFromButtons}>
            {daysOfWeek.map((dayToCopyFrom) => (
              <Button
                onClick={(e) => {
                  this.copySchedule(dayOfWeek[0], dayToCopyFrom[0]);
                }}
                text={dayToCopyFrom[2]}
              />
            ))}
          </View>
          <Text>Przedział 1</Text>
          <TimeInput value="00:00" />
          {schedule[dayOfWeek[0]].times.map((time, index) => (
            <View key={time.end}>
              <TimeInput
                value={time.end}
                change={(e, revert) => {
                  this.changeTime(e, index, dayOfWeek[0], revert);
                }}
              />
              <Button
                name={dayOfWeek[0]}
                onClick={(e) => {
                  this.Viewide(e, index);
                }}
                text={"Podziel"}
              />
              <Button
                name={dayOfWeek[0]}
                onClick={(e) => {
                  this.deleteScheduleEntry(e, index);
                }}
                text={"Usuń"}
              />
              <TextInput label={"Temperatura:"}></TextInput>
              <Text>Przedział {index + 2}</Text>
              <TimeInput
                value={"12:00"}
                change={(e, revert) => {
                  this.changeTime(e, index, dayOfWeek[0], revert);
                }}
              />
            </View>
          ))}
          <TimeInput value="00:00" />
          <Button text={"Podziel"} />
          <TextInput label={"Temperatura:"}></TextInput>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  copyFromButtons: { flexDirection: "row" },
});

export default Schedule;
