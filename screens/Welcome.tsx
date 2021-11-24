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
import AxiosClient from "../lib/apiClient";
import { SocialRedirectResponse } from "../lib/kakao";
import { useDB } from "../lib/RealmDB";
import { useNavigation } from "@react-navigation/native";
import { BASE_URL } from "../lib/utils";
import storage from "../lib/helpers/myAsyncStorage";
import { Text } from "../styles/styles";

interface Props {}

export default function Welcome(props: Props) {
  const navigation = useNavigation();
  const realm = useDB();
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");

  const redirectWithExistingToken = async () => {
    const tt = await storage.getItem("token");

    console.log(tt);
    /* @ts-ignore */
    if (tt) navigation.navigate("LoggedInNav");
  };

  const redirectWithNewToken = async () => {
    await storage.setItem("token", token);
    const tt = await storage.getItem("token");
    console.log("new one");

    if (tt) {
      /* @ts-ignore */
      navigation.navigate("LoggedInNav");
    }
  };

  const getProfile = async (): Promise<void> => {
    // @ts-ignore
    const profile: KakaoProfile = await getKakaoProfile();
    setEmail(profile.email);
    socialRedirect(profile);
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

  const socialRedirect = async (profile: KakaoProfile) => {
    try {
      const axiosclient = await AxiosClient();

      const res = await axiosclient.get<SocialRedirectResponse>(
        `${BASE_URL}/auth/social/redirect/kakao?email=${profile.email}`
      );
      if (res.data.code === 200) {
        setToken(res.data.data.token);
      } else if (res.data.code === 401) {
        console.log(profile);
        // @ts-ignore
        navigation.navigate("SignIn", {
          profileImageUrl: profile.profileImageUrl,
          gender: profile.gender,
          uid: profile.id,
          email: profile.email,
        });
      }
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  };

  useEffect(() => {
    if (email && token) {
      redirectWithNewToken();
    }
  }, [email, token]);
  useEffect(() => {
    redirectWithExistingToken();
  }, []);
  return (
    <Container>
      <Text>{email}</Text>
      <KakaoLoginButton onPress={signInWithKakao}></KakaoLoginButton>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const KakaoLoginButton = styled.TouchableOpacity`
  background-color: gold;
  width: 40%;
  height: 10%;
`;
