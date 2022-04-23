import { Platform, StatusBar } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import Main from "./App/screens/Main";
import Settings from "./App/screens/Settings";
import Device from "./App/screens/Device";
import NewDevice from "./App/screens/NewDevice";
import AppTheme from "./App/navigation/navigationTheme";

const Stack = createStackNavigator();
const StackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Main"
      options={{ headerShown: false, title: "Ekran główny" }}
      component={Main}
    />
    <Stack.Screen
      name="Settings"
      options={{ title: "" }}
      component={Settings}
    />
    <Stack.Screen name="Device" options={{ title: "" }} component={Device} />
    <Stack.Screen
      name="NewDevice"
      options={{ title: "" }}
      component={NewDevice}
    />
  </Stack.Navigator>
);

export default function App() {
  return (
    <>
      {Platform.OS === "ios" && <StatusBar barStyle="dark-content" />}
      <NavigationContainer theme={AppTheme}>
        <StackNavigator />
      </NavigationContainer>
    </>
  );
}
