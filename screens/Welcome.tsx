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
import { SocialRedirectResponse } from "../lib/kakao";
import { useDB } from "../lib/RealmDB";
import { useNavigation } from "@react-navigation/native";
import { BASE_URL, setTOKEN, TOKEN } from "../lib/utils";

interface Props {}

export default function Welcome(props: Props) {
  const navigation = useNavigation();
  const realm = useDB();
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
        `${BASE_URL}/auth/social/redirect/kakao?email=${emailInput}`
      );
      console.log(res.data);
      setToken(res.data.data.token);
      setTOKEN(res.data.data.token);
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  };

  const setProfile = (token: string, email: string) => {
    realm.write(() => {
      if (realm.objects("UserSchema").length === 0) {
        realm.create("UserSchema", {
          _id: Date.now(),
          email: email,
          token: token,
        });
      } else {
        realm.objects("UserSchema")[0].email = email;
        realm.objects("UserSchema")[0].token = token;
      }
    });
    console.log("done");
  };

  useEffect(() => {
    if (email && token) {
      setProfile(token, email);
      navigation.navigate("LoggedInNav");
    }
  }, [email, token]);
  useEffect(() => {
    if (realm.objects("UserSchema").length) {
      console.log("token + " + realm.objects("UserSchema")[0].token);
      setTOKEN(realm.objects("UserSchema")[0].token);
      navigation.navigate("LoggedInNav");
    }
  }, []);
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
