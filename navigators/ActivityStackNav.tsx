import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Activity from "../screens/ActivitiesDetail/Activity";
import { LoggedInStackParamList } from "./LoggedInNav";
import { RouteProp } from "@react-navigation/native";
import Reservation from "../screens/ActivitiesDetail/Reservation";
import ReservationConfirm from "../screens/ActivitiesDetail/ReservationConfirm";
import { Ionicons } from "@expo/vector-icons";
import { colors, fontFamilies } from "../styles/styles";
import { TouchableOpacity } from "react-native";

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
  const [expandable, setExpandable] = useState(false);
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerBackImage: () => {
          return (
            <Ionicons
              name="chevron-back"
              size={30}
              color={colors.lightBlack}
              style={{ marginLeft: 12 }}
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
        name="Activity"
        options={{
          title: route.params.name,
          headerRight: () => {
            return (
              <TouchableOpacity onPress={() => setExpandable(!expandable)}>
                <Ionicons
                  name="ellipsis-horizontal"
                  size={24}
                  color={colors.lightBlack}
                  style={{ marginRight: 12 }}
                />
              </TouchableOpacity>
            );
          },
        }}
      >
        {() => (
          <Activity
            id={route.params.id}
            name={route.params.name}
            modal={expandable}
            setModal={() => setExpandable(!expandable)}
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
