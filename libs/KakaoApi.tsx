import {
  KakaoOAuthToken,
  KakaoProfile,
  getProfile as getKakaoProfile,
  login,
  logout,
  unlink,
} from "@react-native-seoul/kakao-login";
import { Alert } from "react-native";
import React from "react";

export const signInWithKakao = async (): Promise<void> => {
  const token: KakaoOAuthToken = await login();

  Alert.alert(JSON.stringify(token));
};
