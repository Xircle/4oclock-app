import messaging, {
  FirebaseMessagingTypes,
} from "@react-native-firebase/messaging";
import storage, { StorageKey } from "../helpers/myAsyncStorage";
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
  if (remoteMessage.data?.type === "message") {
    await storage.setItem(StorageKey.message, true);

    return;
  }
  if (!remoteMessage.data?.mainParam) {
    // Alert.alert("no mainParam");
    return;
  }
  const newNotification = {
    type: remoteMessage.data?.type,
    image: "",
    title: remoteMessage.notification?.title,
    body: remoteMessage.notification?.body,
    mainParam: remoteMessage.data?.mainParam,
  };
  let notifications = await storage.getItem(StorageKey.notifications);
  if (notifications) {
    notifications.unreadNotifications.unshift(newNotification);
    if (notifications.readNotifications.length > 10) {
      notifications.readNotifications.pop();
    }
  } else {
    notifications = {
      unreadNotifications: [newNotification],
      readNotifications: [],
    };
  }
  await storage.setItem(StorageKey.notifications, notifications);
}

export async function notificationPlaySound() {
  const { sound } = await Audio.Sound.createAsync(
    require("../../statics/sounds/notification_sound.mp3")
  );
  await sound.playAsync();
}
