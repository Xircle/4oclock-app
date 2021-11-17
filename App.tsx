import React, { useState } from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";
import AvatarUri from "./components/UI/AvatarUri";
import Loader from "./components/UI/Loader";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import AppLoading from "expo-app-loading";
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import LoggedOutNav from "./navigators/LoggedOutNav";
import LoggedInNav from "./navigators/LoggedInNav";
import Realm from "realm";

export default function App() {
  const [loading, setLoading] = useState(false);

  if (loading) return <AppLoading />;
  return (
    // @ts-ignore
    <NavigationContainer>
      {false ? <LoggedInNav /> : <LoggedOutNav />}
    </NavigationContainer>
  );
}
