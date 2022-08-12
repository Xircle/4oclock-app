import React, { useEffect } from "react";
import MainTabsNav from "./MainTabsNav";
import { createStackNavigator } from "@react-navigation/stack";
import MyProfile from "../screens/MyPage/MyProfile";
import MyActivities from "../screens/MyPage/MyActivities";
import ActivityStackNav from "./ActivityStackNav";
import { Ionicons } from "@expo/vector-icons";
import { colors, fontFamilies } from "../styles/styles";
import { Participants } from "../lib/api/types";
import FriendProfile from "../screens/FriendProfile";
import ChatStackNav from "./ChatStackNav";
import CreateActivityStackNav from "./CreateActivityStackNav";
import ParticipantsList from "../screens/ActivitiesDetail/ParticipantsList";
import BannedScreen from "../screens/BannedScreen";
import { useNavigation } from "@react-navigation/native";
import messaging from "@react-native-firebase/messaging";
import { Alert } from "react-native";
import { openLink } from "../components/shared/Links";
import { NotificationScreen } from "../screens/NotificationScreen";

export type LoggedInStackParamList = {
  Tabs: undefined;
  MyProfile: undefined;
  MyActivities: undefined;
  ActivityStackNav: {
    id: string;
    name: string;
    startDateAt: string;
    startTime: number;
    participants: Participants[];
  };
  FriendProfile: { id?: string };
  ChatStackNav: undefined;
  CreateActivityStackNav: undefined;
  ParticipantsList: {
    placeName: string;
    isCreator: boolean;
    placeId: string;
  };
  BannedScreen: undefined;
  NotificationScreen: undefined;
};

const Stack = createStackNavigator<LoggedInStackParamList>();

export default function LoggedInNav() {
  const navigation = useNavigation();
  useEffect(() => {
    messaging().onNotificationOpenedApp(async (remoteMessage) => {
      if (remoteMessage.data?.type === "message") {
        //@ts-ignore
        navigation.navigate("ChatT", {});
      } else if (remoteMessage.data?.type === "okLink") {
        Alert.alert("방장님이 오카방에 초대했습니다", "", [
          {
            text: "오카방 입장하기",
            //@ts-ignore
            onPress: () => openLink.LOpenLink(remoteMessage.data?.okLink),
          },
        ]);
      }
    });
  }, []);

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
          backgroundColor: colors.white,
          shadowColor: "transparent",
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
      <Stack.Screen
        name="FriendProfile"
        options={{
          headerTitle: "참가자 프로필",
        }}
        component={FriendProfile}
      />
      <Stack.Screen
        name="ChatStackNav"
        component={ChatStackNav}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CreateActivityStackNav"
        component={CreateActivityStackNav}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ParticipantsList"
        component={ParticipantsList}
        options={{ title: "참가자 보기" }}
      />
      <Stack.Screen
        name="BannedScreen"
        component={BannedScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{ title: "알람" }}
      />
    </Stack.Navigator>
  );
}
