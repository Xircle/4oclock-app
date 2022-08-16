import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Main from "../screens/Main";
import MyPage from "../screens/MyPage/MyPage";
import TabIcon from "../components/nav/TabIcon";
import { colors, fontFamilies, GeneralText } from "../styles/styles";
import TabSide from "../components/nav/TabSide";
import { Ionicons } from "@expo/vector-icons";
import { AppState, TouchableOpacity } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import ChatList from "../screens/Chat/ChatList";
import RnadomProfile from "../screens/RandomProfile";
import ActivityTopTabNav from "./ActivityTopTabNav";
import { activityDispatcher } from "../lib/activity/ActivityDispatcher";
import { useDispatch } from "react-redux";
import MessageBottomNavItem from "../components/nav/MessageBottomNavItem";
import styled from "styled-components/native";

interface Props {}

const Tabs = createBottomTabNavigator();
export default function MainTabsNav(props: Props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isNewMsg, setIsNewMsg] = useState(false);

  const cleanUp = () => {
    activityDispatcher.dispatchInitialState(dispatch);
    activityDispatcher.dispatchStage1Valid(false, dispatch);
  };

  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerStyle: {
          backgroundColor: colors.white,
          borderColor: colors.white,
          borderBottomWidth: 0,
        },
        headerTitle: "",
        headerShadowVisible: false,
        tabBarActiveTintColor: colors.vividBlue,
        lazy: true,
      }}
    >
      <Tabs.Screen
        name="MainT"
        component={Main}
        options={{
          title: "메인",
          headerShown: false,
          headerTitle: "",
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 8 }}
              // @ts-ignore
              onPress={() => navigation.navigate("ChatStackNav")}
            >
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={30}
                color={colors.lightBlack}
              />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ focused, color, size }) => (
            <TabSide
              focused={focused}
              color={color}
              size={size}
              title={"이팅"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="ChatT"
        component={ChatList}
        options={{
          title: "메세지",
          tabBarIcon: ({ focused, color, size }) => (
            <MessageBottomNavItem
              focused={focused}
              color={color}
              size={size}
              // isNewMsg={isNewMsg}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="CreatePlaceT"
        component={ActivityTopTabNav}
        options={{
          title: "생성하기",
          headerTitle: "모임 관리",
          headerShown: true,
          headerTitleStyle: {
            fontFamily: fontFamilies.regular,
          },
          headerStyle: {
            shadowColor: "transparent",
          },
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 8 }}
              onPress={() => {
                cleanUp();
                // @ts-ignore
                navigation.navigate("CreateActivityStackNav");
              }}
            >
              <SRow>
                <HeaderRightText>생성하기+</HeaderRightText>
              </SRow>
            </TouchableOpacity>
          ),
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon
              iconName={"add-circle"}
              color={color}
              focused={focused}
              size={size + 18}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="RandomProfileT"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabSide
              focused={focused}
              color={color}
              size={size}
              title={"친구"}
            />
          ),
          headerShown: false,
        }}
        component={RnadomProfile}
      />
      <Tabs.Screen
        name="MyPage"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabSide
              focused={focused}
              color={color}
              size={size}
              title={"마이"}
            />
          ),
          headerShown: false,
        }}
        component={MyPage}
      />
    </Tabs.Navigator>
  );
}

const HeaderRightText = styled(GeneralText)`
  color: ${colors.vividBlue};
`;

const SRow = styled.View`
  flex-direction: row;
  align-items: center;
`;
