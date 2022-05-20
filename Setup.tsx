import firebase from "@react-native-firebase/app";
import App from "./App";
import React, { useEffect } from "react";
import { requestUserPermission } from "./lib/firebase/messaging";

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

function Setup() {
  useEffect(() => {
    requestUserPermission();
  }, []);
  return <App />;
}

export default Setup;
