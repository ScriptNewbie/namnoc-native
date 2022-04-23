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

function Schedule({ schedule, updateSchedule }) {
  const copySchedule = (source, target) => {
    const scheduleCopy = JSON.parse(JSON.stringify(schedule[source]));
    schedule[target] = scheduleCopy;
    updateSchedule(schedule);
  };

  const changeTime = (day, index, value) => {
    let maxValue = 2359;
    let minValue = 0;

    if (schedule[day].times.length !== index + 1) {
      maxValue = schedule[day].times[index + 1].end;
    }

    if (index !== 0) {
      minValue = schedule[day].times[index - 1].end;
    }

    if (maxValue > value && minValue < value) {
      schedule[day].times[index].end = value;
      updateSchedule(schedule);
    } else
      alert(
        "Nieprawidłowe granice przedziału! Upewnij się, czy początek przedziału jest mniejszy od końca przedziału, czy koniec tego przedziału jest mniejszy od końca kolejnego przedziału, oraz czy początek tego przedziału jest większy początku poprzedniego!"
      );
  };

  const changeTemp = (target, index, value) => {
    schedule[target].times[index].temp = value;
    updateSchedule(schedule);
  };

  const changeLastTemp = (target, value) => {
    schedule[target].lastTemp = value;
    updateSchedule(schedule);
  };

  const deleteScheduleEntry = (target, index) => {
    schedule[target].times.splice(index, 1);
    updateSchedule(schedule);
  };

  const divide = (target, index) => {
    let changed = false;
    if (schedule[target].times.length === 0) {
      schedule[target].times = [
        {
          end: 1200,
          temp: schedule[target].lastTemp,
        },
      ];
      changed = true;
    } else {
      let previous = 0;
      let currentElement = {
        end: 2359,
        temp: schedule[target].lastTemp,
      };
      if (index > 0) {
        previous = schedule[target].times[index - 1].end;
      }
      const previousMinutes = previous % 100;
      const previousHours = (previous - previousMinutes) / 100;
      if (index !== schedule[target].times.length)
        currentElement = schedule[target].times[index];
      const currentElementMinutes = currentElement.end % 100;
      const currentElementHours =
        (currentElement.end - currentElementMinutes) / 100;
      const minMiddle = Math.round(
        (previousHours * 60 +
          previousMinutes +
          (currentElementHours * 60 + currentElementMinutes)) /
          2
      );
      const newElementMinutes = minMiddle % 60;
      const newElementHours = ((minMiddle - newElementMinutes) / 60) * 100;

      const newEnd = newElementHours + newElementMinutes;

      if (newEnd < currentElement.end) {
        const times = [
          ...schedule[target].times.slice(0, index),
          {
            end: newEnd,
            temp: currentElement.temp,
          },
          ...schedule[target].times.slice(index),
        ];
        schedule[target].times = times;
        changed = true;
      }
    }
    if (changed) {
      updateSchedule(schedule);
    } else alert("Przedział nie może być krótszy niż minuta!");
  };

  let previous = <TimeInput disabled value={"00:00"} />;
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
                onPress={() => {
                  copySchedule(dayToCopyFrom[0], dayOfWeek[0]);
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
                {
                  (previous = (
                    <TimeInput
                      value={time.end}
                      updateTime={(value) => {
                        changeTime(dayOfWeek[0], index, value);
                      }}
                    />
                  ))
                }
                <Button
                  onPress={() => {
                    divide(dayOfWeek[0], index);
                  }}
                  text={"Podziel"}
                  textStyle={styles.divideDeleteText}
                  style={styles.divideDelete}
                />
                <Button
                  textStyle={styles.divideDeleteText}
                  style={[styles.divideDelete, styles.delete]}
                  name={dayOfWeek[0]}
                  onPress={() => {
                    deleteScheduleEntry(dayOfWeek[0], index);
                  }}
                  text={"Usuń"}
                />
              </View>
              <TextInput
                label={"Temperatura:"}
                labelStyle={styles.verySmallTexts}
                keyboardType="numeric"
                value={time.temp.toString()}
                onChangeText={(value) => {
                  changeTemp(dayOfWeek[0], index, value);
                }}
              ></TextInput>
              <Text style={styles.periodTexts}>Przedział {index + 2}</Text>
            </View>
          ))}
          <View style={styles.timePeriods}>
            {previous}
            <Text> – </Text>
            <TimeInput disabled value={"23:59"} />
            <Button
              name={dayOfWeek[0]}
              onPress={() => {
                divide(dayOfWeek[0], schedule[dayOfWeek[0]].times.length);
              }}
              text={"Podziel"}
              textStyle={styles.divideDeleteText}
              style={styles.divideDelete}
            />
            <Button
              textStyle={styles.divideDeleteText}
              style={[styles.divideDelete, styles.delete, styles.lastDelete]}
              name={dayOfWeek[0]}
              onPress={() => {
                alert("Nie można usuwać ostatniego przedziału!");
              }}
              text={"Usuń"}
            />
          </View>
          <TextInput
            label={"Temperatura:"}
            labelStyle={styles.verySmallTexts}
            keyboardType="numeric"
            value={schedule[dayOfWeek[0]].lastTemp.toString()}
            onChangeText={(value) => changeLastTemp(dayOfWeek[0], value)}
          ></TextInput>
          {(() => {
            previous = <TimeInput disabled value={"00:00"} />;
          })()}
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
  lastDelete: { opacity: 0.5 },
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
