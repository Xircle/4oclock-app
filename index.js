import "react-native-gesture-handler";
import { registerRootComponent } from "expo";
import Setup from "./Setup";
import messaging from "@react-native-firebase/messaging";
import storage from "./lib/helpers/myAsyncStorage";

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(Setup);
