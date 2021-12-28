import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Main from "../screens/Main";
import RandomProfile from "../screens/RandomProfile";
import Chat from "../screens/Chat";
import MyPage from "../screens/MyPage/MyPage";
import TabIcon from "../components/nav/TabIcon";
import { colors } from "../styles/styles";
import CreateActivityScreen from "../screens/CreateActivityScreen";
import TabMiddleAdd from "../components/nav/TabMiddleAdd";
import TabSide from "../components/nav/TabSide";
import CreateActivityStackNav from "./CreateActivityStackNav";

interface Props {}

const Tabs = createBottomTabNavigator();
export default function MainTabsNav(props: Props) {
  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarShowLabel: false,

        headerStyle: {
          backgroundColor: colors.bgColor,
          borderColor: colors.bgColor,
          borderBottomWidth: 0,
        },
        headerTitle: "",
        headerShadowVisible: false,
        tabBarActiveTintColor: colors.mainBlue,
      }}
    >
      <Tabs.Screen
        name="MainT"
        component={Main}
        options={{
          title: "메인",
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <TabSide
              focused={focused}
              color={color}
              size={size}
              title={"이팅모임"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="CreatePlaceT"
        component={CreateActivityScreen}
        options={{
          title: "생성하기",
          tabBarIcon: ({ focused, color, size }) => (
            <TabMiddleAdd focused={focused} />
          ),
          // delete below
          // headerShown: false,
          // tabBarStyle: { display: "none" },
        }}
      />
      {/* <Tabs.Screen
        name="RandomProfileT"
        component={RandomProfile}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={"people"} color={color} focused={focused} />
          ),
        }}
      /> */}
      {/* <Tabs.Screen
        name="ChatT"
        component={Chat}
        options={{
          title: "메세지",
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon
              iconName={"chatbubble-ellipses"}
              color={color}
              focused={focused}
            />
          ),
        }}
      /> */}
      <Tabs.Screen
        name="MyPage"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabSide
              focused={focused}
              color={color}
              size={size}
              title={"마이 / 후기"}
            />
          ),
          headerShown: false,
        }}
        component={MyPage}
      />
    </Tabs.Navigator>
  );
}
