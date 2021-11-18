import styled from "styled-components/native";
import React, { useState, useEffect } from "react";
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
import AxiosClient from "../lib/apiClient";
import { SocialAuthResponse, SocialRedirectResponse } from "../lib/kakao";
import { setProfile } from "../lib/RealmDB";
import { useNavigation } from "@react-navigation/native";

interface Props {}

export default function Welcome(props: Props) {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");

  const getProfile = async (): Promise<void> => {
    // @ts-ignore
    const profile: KakaoProfile = await getKakaoProfile();
    setEmail(profile.email);
    socialRedirect(profile.email);
  };

  const signInWithKakao = async (): Promise<void> => {
    try {
      const token: KakaoOAuthToken = await login();
      // setToken(token.accessToken);
      getProfile();
    } catch (e) {
      console.log(e);
    }
  };

  const socialRedirect = async (emailInput: string) => {
    try {
      const res = await AxiosClient.get<SocialRedirectResponse>(
        `https://xircle-alpha-server.herokuapp.com/auth/social/redirect/kakao?email=${emailInput}`
      );
      console.log(res.data);
      setToken(res.data.data.token);
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  };

  useEffect(() => {
    if (email && token) {
      console.log("called");
      setProfile(email, token);
      navigation.navigate("LoggedInNav");
    }
  }, [email, token]);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <Text>{email}</Text>
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
