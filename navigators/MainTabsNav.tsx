import styled from "styled-components";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text } from "react-native";
import Main from "../screens/Main";
import RandomProfile from "../screens/RandomProfile";
import Chat from "../screens/Chat";
import MyPage from "../screens/MyPage";
import TabIcon from "../components/nav/TabIcon";

interface Props {}

const Tabs = createBottomTabNavigator();

export default function MainTabsNav(props: Props) {
  return (
    <Tabs.Navigator screenOptions={{ tabBarShowLabel: false }}>
      <Tabs.Screen
        name="Main"
        component={Main}
        options={{
          title: "메인",
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={"home"} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen name="RandomProfile" component={RandomProfile} />
      <Tabs.Screen name="Chat" component={Chat} />
      <Tabs.Screen name="MyPage" component={MyPage} />
    </Tabs.Navigator>
  );
}
