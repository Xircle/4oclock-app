import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";
import MyActivities from "../screens/MyPage/MyActivitiess";
import MyPage from "../screens/MyPage/MyPage";
import MyProfile from "../screens/MyPage/MyProfile";
import { colors } from "../styles/styles";
import { Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MyBackButton from "../components/UI/MyBackButton";

interface Props {
  screenName: string;
}

const Stack =
  Platform.OS === "ios" ? createNativeStackNavigator() : createStackNavigator();

export default function SharedStackNav({ screenName }: Props) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        headerBackTitleVisible: false,
        presentation: "modal",
        headerStyle: {
          backgroundColor: colors.mainBlue,
        },
        headerTitleStyle: {
          color: colors.bgColor,
          fontSize: 24,
          fontWeight: "bold",
        },
        headerTitleAlign: "center",
        headerBackImage: () => <MyBackButton />,
      }}
    >
      <Stack.Screen name="MyPage" component={MyPage} />
      <Stack.Screen
        name="MyPlaces"
        component={MyActivities}
        options={{ headerShown: true, headerTitle: "내가 참여한 이팅" }}
      />
      <Stack.Screen
        name="MyProfile"
        component={MyProfile}
        options={{
          headerShown: true,
          headerTitle: "프로필 수정하기",
        }}
      />
    </Stack.Navigator>
  );
}
