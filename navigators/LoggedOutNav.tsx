import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Welcome from "../screens/Welcome";
import SignIn from "../screens/SignIn";

type LoggedOutStackParamList = {
  Welcome: undefined;
  SignIn: { profileImageUrl: string; gender: string; uid: string };
};

const Stack = createStackNavigator<LoggedOutStackParamList>();

export default function LoggedOutNav() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="SignIn" component={SignIn} />
    </Stack.Navigator>
  );
}
