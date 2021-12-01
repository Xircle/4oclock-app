import React from "react";
import MainTabsNav from "./MainTabsNav";
import { createStackNavigator } from "@react-navigation/stack";
import MyProfile from "../screens/MyPage/MyProfile";
import MyActivities from "../screens/MyPage/MyActivities";
import ActivityStackNav from "./ActivityStackNav";

export type LoggedInStackParamList = {
  Tabs: undefined;
  MyProfile: undefined;
  MyActivities: undefined;
  ActivityStackNav: {
    coverImage: string;
    id: string;
    name: string;
    startDateAt: string;
    startTime: number;
  };
};

const Stack = createStackNavigator<LoggedInStackParamList>();

export default function LoggedInNav() {
  return (
    <Stack.Navigator screenOptions={{ headerBackTitleVisible: false }}>
      <Stack.Screen
        name="Tabs"
        component={MainTabsNav}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="MyProfile"
        component={MyProfile}
        options={{
          headerTitle: "내가 참여한 이팅",
        }}
      />
      <Stack.Screen
        name="MyActivities"
        component={MyActivities}
        options={{
          headerTitle: "내가 참가한 모임보기",
        }}
      />
      <Stack.Screen
        name="ActivityStackNav"
        options={{ headerShown: false }}
        component={ActivityStackNav}
      />
    </Stack.Navigator>
  );
}
