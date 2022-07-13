import firebase from "@react-native-firebase/app";
import App from "./App";
import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import { QueryClient, QueryClientProvider } from "react-query";
import { Alert, Image } from "react-native";
import { Asset } from "expo-asset";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./lib/reducers";
import { Provider } from "react-redux";
import messaging from "@react-native-firebase/messaging";
import {
  notificationHandler,
  notificationPlaySound,
} from "./lib/firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCPaFLT9I2OPjvrS-HKvks1nzvFquaeeKw",
  authDomain: "ufo-crew.firebaseapp.com",
  projectId: "ufo-crew",
  storageBucket: "ufo-crew.appspot.com",
  messagingSenderId: "785586764531",
  appId: "1:785586764531:web:e460b5451983a324299586",
  measurementId: "G-G4985180TY",
  databaseURL: "https://api.4oclock.kr",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  await notificationHandler(remoteMessage);
});
messaging().onMessage(async (remoteMessage) => {
  await notificationPlaySound();
  await notificationHandler(remoteMessage);
});

const queryClient = new QueryClient();

const loadImages = (images) =>
  images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.loadAsync(image);
    }
  });

const store = configureStore({ reducer: rootReducer });

function Setup() {
  const [ready, setReady] = useState(false);

  const startLoading = async () => {
    const images = loadImages([
      require("./statics/images/anonymous_user.png"),
      require("./statics/images/landingPageImage.png"),
      require("./statics/images/RegularHeader.jpeg"),
    ]);
    await Promise.all([...images]);
  };
  const onFinish = async () => {
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
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  );
}

export default Setup;
