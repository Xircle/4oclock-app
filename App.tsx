import React, { useState, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import AppLoading from "expo-app-loading";
import LoggedOutNav from "./navigators/LoggedOutNav";
import LoggedInNav from "./navigators/LoggedInNav";
import { QueryClient, QueryClientProvider } from "react-query";
import { createStackNavigator } from "@react-navigation/stack";
import { Image, LogBox } from "react-native";
import { Asset } from "expo-asset";

LogBox.ignoreLogs(["Setting a timer for a long period of time"]);
const Stack = createStackNavigator();
const queryClient = new QueryClient();

const loadImages = (images) =>
  images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.loadAsync(image);
    }
  });

export default function App() {
  const [ready, setReady] = useState(false);

  const startLoading = async () => {

    const images = loadImages([
      require("./statics/images/anonymous_user.png"),
      require("./statics/images/landingPageImage.png"),
    ]);
    await Promise.all([...images]);
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
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{ headerShown: false, gestureEnabled: false }}
          >
            <Stack.Screen name="LoggedOutNav" component={LoggedOutNav} />
            <Stack.Screen name="LoggedInNav" component={LoggedInNav} />
          </Stack.Navigator>
        </NavigationContainer>
    </QueryClientProvider>
  );
}
