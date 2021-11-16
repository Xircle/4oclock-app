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
import { AsyncStorage } from "react-native";
import LoggedOutNav from "./navigators/LoggedOutNav";
import LoggedInNav from "./navigators/LoggedInNav";

export default function App() {
  const [loading, setLoading] = useState(false);
  const preloadAssets = () => {
    const fontsToLoad = [Ionicons.font];
    const fontPromises = fontsToLoad.map((font) => Font.loadAsync(font));
    // const imagesToLoad = [require("./assets/logo.png")];
    // const imagePromises = imagesToLoad.map((image) => Asset.loadAsync(image));
    return Promise.all([...fontPromises]);
  };
  const preload = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      // isLoggedInVar(true);
      // tokenVar(token);
    }

    return preloadAssets();
  };
  if (loading) return <AppLoading />;
  return (
    // @ts-ignore
    <NavigationContainer>
      {true ? <LoggedInNav /> : <LoggedOutNav />}
    </NavigationContainer>
  );
}

// TODO: delete Container after comonentify
const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
