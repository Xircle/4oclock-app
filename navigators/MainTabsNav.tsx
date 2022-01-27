import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Main from "../screens/Main";
import MyPage from "../screens/MyPage/MyPage";
import TabIcon from "../components/nav/TabIcon";
import { colors } from "../styles/styles";
import CreateActivityScreen from "../screens/CreateActivityScreen";
import TabSide from "../components/nav/TabSide";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ChatList from "../screens/Chat/ChatList";

interface Props {}

const Tabs = createBottomTabNavigator();
export default function MainTabsNav(props: Props) {
  const navigation = useNavigation();
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
            <TabSide
              focused={focused}
              color={color}
              size={size}
              title={"메세지"}
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
            <TabIcon
              iconName={"add-circle"}
              color={color}
              focused={focused}
              size={size + 18}
            />
          ),
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
      <Tabs.Screen
        name="RandomProfileT"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabSide
              focused={focused}
              color={color}
              size={size}
              title={"크루원"}
            />
          ),
          headerShown: false,
        }}
        component={MyPage}
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
