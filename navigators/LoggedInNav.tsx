import React from "react";
import MainTabsNav from "./MainTabsNav";
import { createStackNavigator } from "@react-navigation/stack";


const Stack = createStackNavigator();

export default function LoggedInNav() {
  return (
    //@ts-ignore
    <Stack.Navigator screenOptions={{ presentaion: "modal" }}>
      <Stack.Screen
        name="Tabs"
        component={MainTabsNav}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
