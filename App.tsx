import React, { useState, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import AppLoading from "expo-app-loading";
import LoggedOutNav from "./navigators/LoggedOutNav";
import LoggedInNav from "./navigators/LoggedInNav";
import Realm from "realm";
import { DBContext, UserSchema } from "./lib/RealmDB";
import { QueryClient, QueryClientProvider } from "react-query";
import { createStackNavigator } from "@react-navigation/stack";
import { KeyboardAvoidingView, LogBox } from "react-native";

LogBox.ignoreLogs(["Setting a timer for a long period of time"]);
const Stack = createStackNavigator();
const queryClient = new QueryClient();

export default function App() {
  const [ready, setReady] = useState(false);
  const [realm, setRealm] = useState(null);

  const startLoading = async () => {
    const connection = await Realm.open({
      path: "UserDB",
      schema: [UserSchema],
      schemaVersion: 1,
    });
    setRealm(connection);
  };
  const onFinish = () => {
    setReady(true);
  };

  if (!ready)
    return (
      <AppLoading
        startAsync={startLoading}
        onFinish={onFinish}
        onError={console.error}
      />
    );
  return (
    <QueryClientProvider client={queryClient}>
      <DBContext.Provider value={realm}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{ headerShown: false, gestureEnabled: false }}
            >
              <Stack.Screen name="LoggedOutNav" component={LoggedOutNav} />
              <Stack.Screen name="LoggedInNav" component={LoggedInNav} />
            </Stack.Navigator>
          </NavigationContainer>
        </KeyboardAvoidingView>
      </DBContext.Provider>
    </QueryClientProvider>
  );
}
