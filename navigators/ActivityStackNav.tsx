import styled from "styled-components/native";
import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Activity from "../screens/ActivitiesDetail/Activity";
import { LoggedInStackParamList } from "./LoggedInNav";
import { RouteProp } from "@react-navigation/native";
import { Platform } from "react-native";
import Reservation from "../screens/ActivitiesDetail/Reservation";
import ReservationConfirm from "../screens/ActivitiesDetail/ReservationConfirm";

interface Props {
  route: RouteProp<LoggedInStackParamList, "ActivityStackNav">;
}

export type ActivityStackParamList = {
  Activity: undefined;
  Reservation: {
    startDateFromNow: string;
    detailAddress: string;
    participationFee: number;
    startTime: number;
  };
  ReservationConfirm: {
    startDateFromNow: string;
    detailAddress: string;
    participationFee: number;
    startTime: number;
  };
};

const Stack = createStackNavigator<ActivityStackParamList>();

export default function ActivityStackNav({ route }: Props) {
  return (
    <Stack.Navigator screenOptions={{ headerBackTitleVisible: false }}>
      <Stack.Screen name="Activity" options={{ title: route.params.name }}>
        {() => (
          <Activity
            coverImage={route.params.coverImage}
            id={route.params.id}
            name={route.params.name}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="Reservation"
        options={{ title: route.params.name }}
        component={Reservation}
      />
      <Stack.Screen
        name="ReservationConfirm"
        options={{ headerShown: false }}
        component={ReservationConfirm}
      />
    </Stack.Navigator>
  );
}
