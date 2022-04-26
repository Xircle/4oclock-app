import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { colors, fontFamilies } from "../styles/styles";
import { Ionicons } from "@expo/vector-icons";
import CreateActivityStack1 from "../components/activity/activitySeperate/CreateActivityStack1";
import CreateActivityStack2 from "../components/activity/activitySeperate/CreateActivityStack2";
import CreateActivityStack3 from "../components/activity/activitySeperate/CreateActivityStack3";
import { useNavigation } from "@react-navigation/native";
import { ButtonProps, TouchableOpacity } from "react-native";
import CreateActivityFinish from "../components/activity/activitySeperate/CreateActivityFinish";
import CreateActivityStack4 from "../components/activity/activitySeperate/CreateActivityStack4";
import CreateActivityStack5 from "../components/activity/activitySeperate/CreateActivityStack5";
import CreateActivityStack6 from "../components/activity/activitySeperate/CreateActivityStack6";
import CreateActivityStack21 from "../components/activity/activitySeperate/CreateActivityStack21";

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
      <Stack.Screen name="CAS1" options={{}} component={CreateActivityStack1} />
      <Stack.Screen name="CAS2" options={{}} component={CreateActivityStack2} />
      <Stack.Screen name="CAS3" options={{}} component={CreateActivityStack3} />
      <Stack.Screen name="CAS4" options={{}} component={CreateActivityStack4} />
      <Stack.Screen name="CAS5" options={{}} component={CreateActivityStack5} />
      <Stack.Screen name="CAS6" options={{}} component={CreateActivityStack6} />
      <Stack.Screen
        name="CreateActivityFinish"
        options={{}}
        component={CreateActivityFinish}
      />
      <Stack.Screen
        name="CAS21"
        options={{}}
        component={CreateActivityStack21}
      />
    </Stack.Navigator>
  );
}
