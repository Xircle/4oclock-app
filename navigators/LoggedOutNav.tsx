import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/LogIn";
import SignIn from "../screens/SignIn";

const Stack = createStackNavigator();

export default function LoggedOutNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LogIn" component={Login} />
      <Stack.Screen name="SignIn" component={SignIn} />
    </Stack.Navigator>
  );
}
