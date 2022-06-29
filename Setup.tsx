import firebase from "@react-native-firebase/app";
import App from "./App";
import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import { QueryClient, QueryClientProvider } from "react-query";
import { Image } from "react-native";
import { Asset } from "expo-asset";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./lib/reducers";
import { Provider } from "react-redux";
import messaging, {
  FirebaseMessagingTypes,
} from "@react-native-firebase/messaging";
import storage from "./lib/helpers/myAsyncStorage";
import { openLink } from "./components/shared/Links";

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

async function notificationHandler(
  remoteMessage: FirebaseMessagingTypes.RemoteMessage
) {
  if (remoteMessage.data?.type === "message") return;
  const CTA = async () => {
    if (remoteMessage.data?.type === "place") {
    } else if (remoteMessage.data?.type === "okLink") {
      await openLink.LOpenLink(remoteMessage.data?.okLink);
    }
  };
  const newNotification = {
    type: remoteMessage.data?.type,
    CTA: CTA,
    image: "",
    title: remoteMessage.notification?.title,
    body: remoteMessage.notification?.body,
  };
  let notifications = await storage.getItem("notifications");
  if (notifications) {
    notifications.unreadNotifications.unshift(newNotification);
  } else {
    notifications = {
      unreadNotifications: [newNotification],
      readNotifications: [],
    };
  }
  await storage.setItem("notifications", notifications);
}

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  notificationHandler(remoteMessage);
});

messaging().onMessage(async (remoteMessage) => {
  notificationHandler(remoteMessage);
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
