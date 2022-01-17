import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
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
          backgroundColor: colors.bgColor,
        },
      }}
    >
      <Stack.Screen
        name="ChatList"
        component={ChatList}
        options={{ headerTitle: "채팅" }}
      ></Stack.Screen>
      <Stack.Screen
        name="ChatRoom"
        component={ChatRoom}
        options={{ headerTitle: "채팅" }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}
