import styled from "styled-components/native";
import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Activity from "../screens/ActivitiesDetail/Activity";
import { LoggedInStackParamList } from "./LoggedInNav";
import { RouteProp } from "@react-navigation/native";
import { Platform } from "react-native";

interface Props {
  route: RouteProp<LoggedInStackParamList, "ActivityStackNav">;
}

export type ActivityStackParamList = {};

const Stack = createStackNavigator<ActivityStackParamList>();

export default function ActivityStackNav({ route }: Props) {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, presentation: "card" }}
    >
      <Stack.Screen name="Activity">
        {() => (
          <Activity
            coverImage={route.params.coverImage}
            id={route.params.id}
            name={route.params.name}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
