import React from "react";
import MainTabsNav from "./MainTabsNav";
import { createStackNavigator } from "@react-navigation/stack";
import MyProfile from "../screens/MyPage/MyProfile";
import MyActivities from "../screens/MyPage/MyActivitiess";

const Stack = createStackNavigator();

export default function LoggedInNav() {
  return (
    //@ts-ignore
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={MainTabsNav}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MyProfile"
        component={MyProfile}
        options={{ presentation: "modal" }}
      />
      <Stack.Screen
        name="MyActivities"
        component={MyActivities}
        options={{ presentation: "modal" }}
      />
    </Stack.Navigator>
  );
}
