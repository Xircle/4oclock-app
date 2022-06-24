import React, { useState } from "react";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import Activity from "../screens/ActivitiesDetail/Activity";
import { LoggedInStackParamList } from "./LoggedInNav";
import { RouteProp } from "@react-navigation/native";
import ReservationInstruction from "../screens/ActivitiesDetail/ReservationInstruction";
import ReservationConfirm from "../screens/ActivitiesDetail/ReservationConfirm";
import { Ionicons } from "@expo/vector-icons";
import { colors, fontFamilies } from "../styles/styles";
import { TouchableOpacity } from "react-native";
import SearchScreen from "../screens/ActivitiesDetail/SearchScreen";
import ReservationQA from "../screens/ActivitiesDetail/ReservationQA";

interface Props {
  route: RouteProp<LoggedInStackParamList, "ActivityStackNav">;
}

export type ActivityStackParamList = {
  Activity: undefined;
  ReservationInstruction: {
    startDateFromNow: string;
    detailAddress: string;
    participationFee: number;
    startTime: number;
    placeId: string;
    placeType: string;
    kakaoLink?: string;
    qAndA?: string[];
  };
  ReservationQA: {
    startDateFromNow: string;
    detailAddress: string;
    participationFee: number;
    startTime: number;
    placeId: string;
    placeType: string;
    kakaoLink?: string;
    qAndA?: string[];
  };
  ReservationConfirm: {
    startDateFromNow: string;
    detailAddress: string;
    participationFee: number;
    startTime: number;
    placeType: string;
    kakaoLink?: string;
  };
  SearchScreen: undefined;
};

export type ReservationQAScreenProp = StackNavigationProp<
  ActivityStackParamList,
  "ReservationQA"
>;

export type ActivityScreenProp = StackNavigationProp<
  ActivityStackParamList,
  "Activity"
>;

export type ReservationInstructionScreenProp = StackNavigationProp<
  ActivityStackParamList,
  "ReservationInstruction"
>;

export type ReservationConfirmScreenProp = StackNavigationProp<
  ActivityStackParamList,
  "ReservationConfirm"
>;

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
          shadowColor: "transparent",
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
            participants={route.params.participants}
            modal={expandable}
            setModal={() => setExpandable(!expandable)}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="ReservationInstruction"
        options={{
          title: route.params.name,
        }}
        component={ReservationInstruction}
      />
      <Stack.Screen
        name="ReservationQA"
        options={{
          title: route.params.name,
        }}
        component={ReservationQA}
      />
      <Stack.Screen
        name="ReservationConfirm"
        options={{ headerShown: false, gestureEnabled: false }}
        component={ReservationConfirm}
      />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
    </Stack.Navigator>
  );
}
