import React from "react";
import MainTabsNav from "./MainTabsNav";
import { createStackNavigator } from "@react-navigation/stack";
import MyProfile from "../screens/MyPage/MyProfile";
import MyActivities from "../screens/MyPage/MyActivities";
import ActivityStackNav from "./ActivityStackNav";
import { Ionicons } from "@expo/vector-icons";
import { colors, fontFamilies } from "../styles/styles";

export type LoggedInStackParamList = {
  Tabs: undefined;
  MyProfile: undefined;
  MyActivities: undefined;
  ActivityStackNav: {
    id: string;
    name: string;
    startDateAt: string;
    startTime: number;
  };
};

const Stack = createStackNavigator<LoggedInStackParamList>();

export default function LoggedInNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerBackImage: () => {
          return (
            <Ionicons
              name="chevron-back"
              size={36}
              color={colors.lightBlack}
              style={{ marginLeft: 3 }}
            />
          );
        },
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontFamily: fontFamilies.medium,
          color: colors.black,
        },
        headerStyle: {
          backgroundColor: colors.bgColor,
        },
      }}
    >
      <Stack.Screen
        name="Tabs"
        component={MainTabsNav}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="MyProfile"
        component={MyProfile}
        options={{
          headerTitle: "프로필 수정",
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
