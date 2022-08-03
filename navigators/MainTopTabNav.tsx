import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import { fontFamilies } from "../styles/styles";
import MainLightningTab from "../components/main/MainLightningTab";
import MainRegularTab from "../components/main/MainRegularTab";

const Tab = createMaterialTopTabNavigator();

export default function MainTopTabNav() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          fontFamily: fontFamilies.regular,
        },
        lazy: true,
      }}
    >
      <Tab.Screen name="번개" component={MainLightningTab} />
      <Tab.Screen name="my 클럽" component={MainRegularTab} />
    </Tab.Navigator>
  );
}
