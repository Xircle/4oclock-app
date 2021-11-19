import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyPlaces from "../screens/MyPage/MyPlaces";
import MyPage from "../screens/MyPage/MyPage";
import MyProfile from "../screens/MyPage/MyProfile";
import { colors } from "../styles/styles";

interface Props {
  screenName: string;
}

const Stack = createNativeStackNavigator();

export default function SharedStackNav({ screenName }: Props) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        headerBackTitleVisible: false,
        presentation: "modal",
        headerStyle: { backgroundColor: colors.mainBlue },
        headerTitleStyle: { color: colors.bgColor },
      }}
    >
      <Stack.Screen name="MyPage" component={MyPage} />
      <Stack.Screen
        name="MyPlaces"
        component={MyPlaces}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="MyProfile"
        component={MyProfile}
        options={{ headerShown: true, headerTitle: "프로필 수정" }}
      />
    </Stack.Navigator>
  );
}
