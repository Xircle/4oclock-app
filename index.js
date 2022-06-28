import "react-native-gesture-handler";
import { registerRootComponent } from "expo";
import Setup from "./Setup";
import messaging from "@react-native-firebase/messaging";
import storage from "./lib/helpers/myAsyncStorage";

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  const newNotification = {
    type: remoteMessage.data?.type,
    CTA: () => {},
    image: "",
    title: remoteMessage.notification?.title,
    body: remoteMessage.notification?.body,
  };
  let notifications = await storage.getItem("notifications");
  if (notifications) {
    notifications.unreadNotifications.unshift(newNotification);
    await storage.setItem(notifications);
  } else {
    notification = {
      unreadNotifications: [newNotification],
      readNotifications: [],
    };
  }
  await storage.setItem("notifications", notifications);
});

messaging().onMessage(async (remoteMessage) => {
  const newNotification = {
    type: remoteMessage.data?.type,
    CTA: () => {},
    image: "",
    title: remoteMessage.notification?.title,
    body: remoteMessage.notification?.body,
  };
  let notifications = await storage.getItem("notifications");
  if (notifications) {
    notifications.unreadNotifications.unshift(newNotification);
    await storage.setItem(notifications);
  } else {
    notification = {
      unreadNotifications: [newNotification],
      readNotifications: [],
    };
  }
  await storage.setItem("notifications", notifications);
});

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(Setup);
