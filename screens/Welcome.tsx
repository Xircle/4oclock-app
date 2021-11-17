import styled from "styled-components/native";
import React from "react";
import { Alert } from "react-native";
import {
  KakaoOAuthToken,
  KakaoProfile,
  getProfile as getKakaoProfile,
  login,
  logout,
  unlink,
} from "@react-native-seoul/kakao-login";

interface Props {}

export default function Welcome(props: Props) {
  const signInWithKakao = async (): Promise<void> => {
    try {
      const token: KakaoOAuthToken = await login();
      Alert.alert("login Start");
      console.log("no exception");
    } catch (e) {
      console.log(e);
      console.log("hi");
    }
  };

  return (
    <Container>
      <Text>Welcome</Text>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text``;
