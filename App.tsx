import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import LoggedOutNav from "./navigators/LoggedOutNav";
import LoggedInNav from "./navigators/LoggedInNav";
import { createStackNavigator } from "@react-navigation/stack";
import { requestUserPermission } from "./lib/firebase/messaging";
import messaging from "@react-native-firebase/messaging";
import { useMutation } from "react-query";
import { updateFirebaseToken } from "./lib/api/updateFirebaseToken";

//LogBox.ignoreLogs(["Setting a timer for a long period of time"]);

const Stack = createStackNavigator();

export default function App() {
  const { mutateAsync: mutateUpdateFirebaseToken } =
    useMutation(updateFirebaseToken);
  useEffect(() => {
    requestUserPermission();

    messaging()
      .getToken()
      .then((token) => {
        mutateUpdateFirebaseToken(token);
      });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false, gestureEnabled: false }}
      >
        <Stack.Screen name="LoggedOutNav" component={LoggedOutNav} />
        <Stack.Screen name="LoggedInNav" component={LoggedInNav} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
