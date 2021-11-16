import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/LogIn";
import SignIn from "../screens/SignIn";

const Stack = createStackNavigator();

export default function LoggedOutNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTitle: false,
        headerTransparent: true,
        headerTintColor: "white",
      }}
    >
      <Stack.Screen
        name="LogIn"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="SignIn" component={SignIn} />
    </Stack.Navigator>
  );
}
