import { Platform, StatusBar } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "react-query";
import { LogBox } from "react-native";
LogBox.ignoreLogs(["Setting a timer for a long period of time"]);

import Main from "./App/screens/Main";
import Settings from "./App/screens/Settings";
import Device from "./App/screens/Device";
import NewDevice from "./App/screens/NewDevice";
import AppTheme from "./App/navigation/navigationTheme";

const Stack = createStackNavigator();
const queryClient = new QueryClient();

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
      {Platform.OS === "ios" && (
        <StatusBar barStyle="dark-content" translucent />
      )}
      <NavigationContainer theme={AppTheme}>
        <QueryClientProvider client={queryClient}>
          <StackNavigator />
        </QueryClientProvider>
      </NavigationContainer>
    </>
  );
}
