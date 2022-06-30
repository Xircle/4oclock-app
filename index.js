import "react-native-gesture-handler";
import { registerRootComponent } from "expo";
import Setup from "./Setup";
import messaging from "@react-native-firebase/messaging";
import { notificationHandler } from "./lib/firebase/messaging";
import { Alert } from "react-native";

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  await notificationHandler(remoteMessage);
  Alert.alert("background");
});

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(Setup);
