import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MainTabsNav from "./MainTabsNav";

const Stack = createStackNavigator();

export default function LoggedOutNav() {
  return (
    <Stack.Navigator screenOptions={{ presentaion: "modal" }}>
      <Stack.Screen
        name="Tabs"
        component={MainTabsNav}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
