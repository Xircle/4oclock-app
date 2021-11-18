import React, { useState, useRef } from "react";
import { SafeAreaView, Text, View } from "react-native";
import styled from "styled-components/native";
import AvatarUri from "./components/UI/AvatarUri";
import Loader from "./components/UI/Loader";
import { NavigationContainer, ThemeProvider } from "@react-navigation/native";
import "react-native-gesture-handler";
import AppLoading from "expo-app-loading";
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import LoggedOutNav from "./navigators/LoggedOutNav";
import LoggedInNav from "./navigators/LoggedInNav";
import Realm from "realm";
import { DBContext, UserSchema } from "./lib/RealmDB";
import { QueryClient, QueryClientProvider } from "react-query";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

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
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{ headerShown: false, gestureEnabled: false }}
            >
              <Stack.Screen name="LoggedOutNav" component={LoggedOutNav} />
              <Stack.Screen name="LoggedInNav" component={LoggedInNav} />
            </Stack.Navigator>
          </NavigationContainer>
      </DBContext.Provider>
    </QueryClientProvider>
  );
}
