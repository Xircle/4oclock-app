import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CreatedActivityScreen from "../screens/ActivitiesManagement/CreatedActivityScreen";
import ParticipatingActivityScreen from "../screens/ActivitiesManagement/ParticipatingActivityScreen";
import React from "react";
import { fontFamilies } from "../styles/styles";

const Tab = createMaterialTopTabNavigator();

export default function ActivityTopTabNav() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          fontFamily: fontFamilies.regular,
        },
      }}
    >
      <Tab.Screen name="참가" component={ParticipatingActivityScreen} />
      <Tab.Screen name="생성" component={CreatedActivityScreen} />
    </Tab.Navigator>
  );
}
