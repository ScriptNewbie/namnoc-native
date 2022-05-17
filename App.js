import { Platform, StatusBar } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "react-query";
import { LogBox, Appearance } from "react-native";
LogBox.ignoreLogs(["Setting a timer for a long period of time"]);

import Main from "./App/screens/Main";
import Settings from "./App/screens/Settings";
import Device from "./App/screens/Device";
import NewDevice from "./App/screens/NewDevice";
import generateAppTheme from "./App/navigation/navigationTheme";
import ColorMode from "./App/contexts/colorMode";
import colors from "./App/config/colors";

const Stack = createStackNavigator();
const queryClient = new QueryClient();
const colorMode = "dark";

const StackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Main"
      options={{ headerShown: false, title: "Ekran główny" }}
      component={Main}
    />
    <Stack.Screen
      name="Settings"
      options={{
        title: "",
        headerStyle: { backgroundColor: colors[colorMode].background },
      }}
      component={Settings}
    />
    <Stack.Screen
      name="Device"
      options={{
        title: "",
        headerStyle: { backgroundColor: colors[colorMode].background },
      }}
      component={Device}
    />
    <Stack.Screen
      name="NewDevice"
      options={{
        title: "",
        headerStyle: { backgroundColor: colors[colorMode].background },
      }}
      component={NewDevice}
    />
  </Stack.Navigator>
);

export default function App() {
  return (
    <>
      {Platform.OS === "ios" && colorMode === "light" && (
        <StatusBar barStyle="dark-content" translucent />
      )}
      <NavigationContainer theme={generateAppTheme(colorMode)}>
        <QueryClientProvider client={queryClient}>
          <ColorMode.Provider value={colorMode}>
            <StackNavigator />
          </ColorMode.Provider>
        </QueryClientProvider>
      </NavigationContainer>
    </>
  );
}
