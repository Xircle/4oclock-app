import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CreatedActivityScreen from "../screens/ActivitiesManagement/CreatedActivityScreen";
import ParticipatingActivityScreen from "../screens/ActivitiesManagement/ParticipatingActivityScreen";
import React from "react";

const Tab = createMaterialTopTabNavigator();

export default function ActivityTopTabNav() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="참가" component={ParticipatingActivityScreen} />
      <Tab.Screen name="생성" component={CreatedActivityScreen} />
    </Tab.Navigator>
  );
}
