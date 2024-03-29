import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ChatList from "../screens/Chat/ChatList";
import ChatRoom from "../screens/Chat/ChatRoom";
import { Ionicons } from "@expo/vector-icons";
import { colors, fontFamilies } from "../styles/styles";

export type ChatStackParamList = {
  ChatList: undefined;
  ChatRoom: { senderName: string; senderId: string; roomId: string };
};

const Stack = createStackNavigator<ChatStackParamList>();
interface Props {}

export default function ChatStackNav(props: Props) {
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
        name="ChatRoom"
        component={ChatRoom}
        options={({ route }) => ({ title: route.params.senderName })}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}
