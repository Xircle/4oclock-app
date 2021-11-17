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
import { DBContext, UserSchema } from "./lib/RealmDB";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function App() {
  const [ready, setReady] = useState(false);
  const [withValidToken, setWithValidToken] = useState(false);
  const [realm, setRealm] = useState(null);

  const startLoading = async () => {
    const connection = await Realm.open({
      path: "clientDB",
      schema: [UserSchema],
      schemaVersion: 3,
    });
    setRealm(connection);
    if (connection?.[0]?.token) {
      // log user in
      setWithValidToken(true);
    }
  };
  const onFinish = () => {
    setReady(true);
  };

  if (!ready)
    return (
      <AppLoading
        startAsync={startLoading}
        onFinish={onFinish}
        onError={console.error}
      />
    );
  return (
    <QueryClientProvider client={queryClient}>
      <DBContext.Provider value={realm}>
        {/* // @ts-ignore */}
        <NavigationContainer>
          {withValidToken ? <LoggedInNav /> : <LoggedOutNav />}
        </NavigationContainer>
      </DBContext.Provider>
    </QueryClientProvider>
  );
}
