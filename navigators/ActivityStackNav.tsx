import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Activity from "../screens/ActivitiesDetail/Activity";
import { LoggedInStackParamList } from "./LoggedInNav";
import { RouteProp } from "@react-navigation/native";
import Reservation from "../screens/ActivitiesDetail/Reservation";
import ReservationConfirm from "../screens/ActivitiesDetail/ReservationConfirm";
import { Ionicons } from "@expo/vector-icons";
import { colors, fontFamilies } from "../styles/styles";

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
    placeId: string;
  };
  ReservationConfirm: {
    startDateFromNow: string;
    detailAddress: string;
    participationFee: number;
    startTime: number;
    isVaccinated: boolean;
  };
};

const Stack = createStackNavigator<ActivityStackParamList>();

export default function ActivityStackNav({ route }: Props) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerBackImage: () => {
          return (
            <Ionicons name="chevron-back" size={24} color={colors.black} />
          );
        },
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontFamily: fontFamilies.medium,
          color: colors.black,
        },
      }}
    >
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
        options={{
          title: route.params.name,
        }}
        component={Reservation}
      />
      <Stack.Screen
        name="ReservationConfirm"
        options={{ headerShown: false, gestureEnabled: false }}
        component={ReservationConfirm}
      />
    </Stack.Navigator>
  );
}
