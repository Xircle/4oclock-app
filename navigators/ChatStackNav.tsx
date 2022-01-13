import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import ChatList from "../screens/Chat/ChatList";
import ChatRoom from "../screens/Chat/ChatRoom";

const Stack = createStackNavigator();
interface Props {}

export default function ChatStackNav(props: Props) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ChatList" component={ChatList}></Stack.Screen>
      <Stack.Screen name="ChatRoom" component={ChatRoom}></Stack.Screen>
    </Stack.Navigator>
  );
}
