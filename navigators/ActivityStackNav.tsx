import styled from "styled-components/native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Activity from "../screens/ActivitiesDetail/Activity";

interface Props {}

export type DetailStackParamList = {
  Activity: {
    coverImage: string;
    id: string;
    name: string;
    startDateAt: string;
    startTime: number;
  };
};

const Stack = createStackNavigator<DetailStackParamList>();

export default function ActivityStackNav(props: Props) {
  return (
    <Stack.Navigator screenOptions={{ headerBackTitleVisible: false }}>
      <Stack.Screen name="Activity" component={Activity} />
    </Stack.Navigator>
  );
}
