import { StyleSheet, View } from "react-native";
import TimeInput from "../basic/TimeInput";
import Button from "../basic/Button";
import Text from "../basic/Text";
import TextInput from "../basic/TextInput";
import fonts from "../../config/fonts";
import colors from "../../config/colors";

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
  let previous = <TimeInput value={"00:00"} />;
  return (
    <View>
      {daysOfWeek.map((dayOfWeek) => (
        <View style={styles.dayOfWeek} key={dayOfWeek[0]}>
          <Text>{dayOfWeek[1]}</Text>
          <Text style={styles.verySmallTexts}>Kopiuj z:</Text>
          <View style={styles.copyFromButtons}>
            {daysOfWeek.map((dayToCopyFrom) => (
              <Button
                key={dayToCopyFrom[0]}
                onPress={(e) => {
                  copySchedule(dayOfWeek[0], dayToCopyFrom[0]);
                }}
                text={dayToCopyFrom[2]}
                style={styles.copyFromButton}
                textStyle={styles.copyFromButtonText}
              />
            ))}
          </View>
          <Text style={styles.periodTexts}>Przedział 1</Text>
          {schedule[dayOfWeek[0]].times.map((time, index) => (
            <View key={time.end}>
              <View style={styles.timePeriods}>
                {previous}
                <Text> – </Text>
                {(previous = <TimeInput value={time.end} />)}
                <Button
                  name={dayOfWeek[0]}
                  onPress={(e) => {
                    this.Viewide(e, index);
                  }}
                  text={"Podziel"}
                  textStyle={styles.divideDeleteText}
                  style={styles.divideDelete}
                />
                <Button
                  textStyle={styles.divideDeleteText}
                  style={[styles.divideDelete, styles.delete]}
                  name={dayOfWeek[0]}
                  onPress={(e) => {
                    this.deleteScheduleEntry(e, index);
                  }}
                  text={"Usuń"}
                />
              </View>
              <TextInput
                label={"Temperatura:"}
                labelStyle={styles.verySmallTexts}
              ></TextInput>
              <Text style={styles.periodTexts}>Przedział {index + 2}</Text>
            </View>
          ))}
          <View style={styles.timePeriods}>
            {previous}
            <Text> – </Text>
            <TimeInput value={"23:59"} />
            <Button
              name={dayOfWeek[0]}
              onPress={(e) => {
                this.Viewide(e, index);
              }}
              text={"Podziel"}
              textStyle={styles.divideDeleteText}
              style={styles.divideDelete}
            />
            <Button
              textStyle={styles.divideDeleteText}
              style={[styles.divideDelete, styles.delete]}
              name={dayOfWeek[0]}
              onPress={(e) => {
                this.deleteScheduleEntry(e, index);
              }}
              text={"Usuń"}
            />
            {(() => {
              previous = <TimeInput value={"00:00"} />;
            })()}
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  copyFromButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  copyFromButton: { margin: 2, backgroundColor: colors.light.secondaryButton },
  copyFromButtonText: { fontSize: fonts.sizeVerySmall },
  timePeriods: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  divideDeleteText: { fontSize: fonts.sizeVerySmall },
  divideDelete: { marginLeft: 5 },
  delete: { backgroundColor: colors.light.discard },
  verySmallTexts: { fontSize: fonts.sizeVerySmall },
  periodTexts: { fontSize: fonts.sizeSmall },
  dayOfWeek: {
    borderColor: colors.light.soft,
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    marginTop: 5,
  },
});

export default Schedule;
