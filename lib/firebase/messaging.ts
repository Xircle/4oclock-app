import { openLink } from "./../../components/shared/Links";
import messaging, {
  FirebaseMessagingTypes,
} from "@react-native-firebase/messaging";
import storage from "../helpers/myAsyncStorage";
import { Audio } from "expo-av";

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log("Authorization status:", authStatus);
  }
}

export async function notificationHandler(
  remoteMessage: FirebaseMessagingTypes.RemoteMessage
) {
  if (remoteMessage.data?.type === "message") return;

  const newNotification = {
    type: remoteMessage.data?.type,
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

export async function notificationPlaySound() {
  const { sound } = await Audio.Sound.createAsync(
    require("../../statics/sounds/notification_sound.mp3")
  );
  await sound.playAsync();
}
