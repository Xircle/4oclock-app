import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { colors, fontFamilies } from "../styles/styles";
import { Ionicons } from "@expo/vector-icons";
import CreateActivitiyStack1 from "../components/activity/activitySeperate/CreateActivitiyStack1";
import CreateActivitiyStack2 from "../components/activity/activitySeperate/CreateActivitiyStack2";
import CreateActivitiyStack3 from "../components/activity/activitySeperate/CreateActivitiyStack3";
import { useNavigation } from "@react-navigation/native";
import { ButtonProps, TouchableOpacity } from "react-native";
import CreateActivityFinish from "../components/activity/activitySeperate/CreateActivityFinish";

interface Props {}

export type CreateActivityStackParamList = {
  CAS1: {
    name?: string;
    maxParticipantsNumber?: number;
    startDateAt?: Date;
    description?: string;
    detailAddress?: string;
    coverImageFile?: any;
    subImagesFile?: any[];
    team?: string;
    placeId?: string;
    activityType?: string;
    kakaoLink?: string;
    recommendation?: string;
    participating?: string;
    role?: string;
    modify?: boolean;
    stage1Valid?: boolean;
  };
  CAS2: {
    name?: string;
    maxParticipantsNumber?: number;
    startDateAt?: Date;
    description?: string;
    detailAddress?: string;
    coverImageFile?: any;
    subImagesFile?: any[];
    team?: string;
    placeId?: string;
    activityType?: string;
    kakaoLink?: string;
    recommendation?: string;
    participating?: string;
    role?: string;
    modify?: boolean;
    stage1Valid?: boolean;
  };
};

const Stack = createStackNavigator();

export default function CreateActivityStackNav(props: Props) {
  const navigation = useNavigation();
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTitle: "장소 생성",
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
        headerRight: () => (
          // @ts-ignore
          <TouchableOpacity onPress={() => navigation.navigate("MainT")}>
            <Ionicons
              name="home-outline"
              size={26}
              color={colors.lightBlack}
              style={{ marginRight: 12 }}
            />
          </TouchableOpacity>
        ),
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
        name="CAS1"
        options={{}}
        component={CreateActivitiyStack1}
      />
      <Stack.Screen
        name="CAS2"
        options={{}}
        component={CreateActivitiyStack2}
      />
      <Stack.Screen
        name="CAS3"
        options={{}}
        component={CreateActivitiyStack3}
      />
      <Stack.Screen
        name="CreateActivityFinish"
        options={{}}
        component={CreateActivityFinish}
      />
    </Stack.Navigator>
  );
}
