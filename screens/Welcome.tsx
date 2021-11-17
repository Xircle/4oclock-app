import styled from "styled-components/native";
import React, { useState } from "react";
import { Alert } from "react-native";
import {
  KakaoOAuthToken,
  KakaoProfile,
  getProfile as getKakaoProfile,
  login,
  logout,
  unlink,
} from "@react-native-seoul/kakao-login";
import { SafeAreaView } from "react-native-safe-area-context";
import { setToken } from "../libs/RealmDB";

interface Props {}

export default function Welcome(props: Props) {
  const [temp, setTemp] = useState("");
  const signInWithKakao = async (): Promise<void> => {
    try {
      const token: KakaoOAuthToken = await login();
      console.log(token);
      console.log("no exception");
      setToken(token.accessToken);
      setTemp(token.accessToken);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <Text>{temp}</Text>
        <KakaoLoginButton onPress={signInWithKakao}></KakaoLoginButton>
      </Container>
    </SafeAreaView>
  );
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text``;

const KakaoLoginButton = styled.TouchableOpacity`
  background-color: gold;
  width: 40%;
  height: 10%;
`;
