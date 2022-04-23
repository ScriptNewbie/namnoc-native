import { Platform, StatusBar } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import Main from "./App/screens/Main";
import Settings from "./App/screens/Settings";
import Device from "./App/screens/Device";
import NewDevice from "./App/screens/NewDevice";

const Stack = createStackNavigator();
const StackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Main" component={Main} />
    <Stack.Screen name="Settings" component={Settings} />
    <Stack.Screen name="Device" component={Device} />
    <Stack.Screen name="NewDevice" component={NewDevice} />
  </Stack.Navigator>
);

export default function App() {
  return (
    <>
      {Platform.OS === "ios" && <StatusBar barStyle="dark-content" />}
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </>
  );
}
