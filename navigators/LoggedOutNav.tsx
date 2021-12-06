import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Welcome from "../screens/Welcome";
import SignIn from "../screens/SignIn";
import { colors, fontFamilies } from "../styles/styles";

export type LoggedOutStackParamList = {
  Welcome: undefined;
  SignIn: {
    profileImageUrl: string;
    gender: string;
    uid: number;
    email: string;
  };
};

const Stack = createStackNavigator<LoggedOutStackParamList>();

export default function LoggedOutNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{ gestureEnabled: false }}
      />
    </Stack.Navigator>
  );
}
