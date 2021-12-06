import styled from "styled-components/native";
import React, { useState, useEffect } from "react";
import { Dimensions, Platform, TouchableOpacity } from "react-native";
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
import { colors, GeneralText } from "../styles/styles";
import { AppleButton } from "@invertase/react-native-apple-authentication";
import { appleAuth } from "@invertase/react-native-apple-authentication";

async function onAppleButtonPress() {
  console.log(1);
  // performs login request
  const appleAuthRequestResponse = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.LOGIN,
    requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
  });
  console.log(2);
  // get current authentication state for user
  // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
  const credentialState = await appleAuth.getCredentialStateForUser(
    appleAuthRequestResponse.user
  );
  console.log(3);
  // use credentialState response to ensure the user is authenticated
  if (credentialState === appleAuth.State.AUTHORIZED) {
    // user is authenticated
  }
  console.log(4);
}

interface Props {}

const { width } = Dimensions.get("window");

export default function Welcome(props: Props) {
  const navigation = useNavigation();
  const realm = useDB();
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");

  const redirectWithExistingToken = async () => {
    const tt = await storage.getItem("token");

    /* @ts-ignore */
    if (tt) navigation.navigate("LoggedInNav");
  };

  const redirectWithNewToken = async () => {
    await storage.setItem("token", token);
    const tt = await storage.getItem("token");

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
    if (Platform.OS === "ios") {
      // onCredentialRevoked returns a function that will remove the event listener. useEffect will call this function when the component unmounts
      return appleAuth.onCredentialRevoked(async () => {
        console.warn(
          "If this function executes, User Credentials have been Revoked"
        );
      });
    }
  }, []);
  return (
    <Container>
      <DesignContainer>
        {Platform.OS === "ios" && (
          <AppleButton
            buttonStyle={AppleButton.Style.WHITE}
            buttonType={AppleButton.Type.SIGN_IN}
            style={{
              width: 160, // You must specify a width
              height: 45, // You must specify a height
            }}
            onPress={() => onAppleButtonPress()}
          />
        )}
      </DesignContainer>
      <ButtonContainer>
        <KakaoLoginButton
          onPress={signInWithKakao}
          style={{
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,

            elevation: 3,
          }}
        >
          <LoginText>카카오톡으로 시작하기</LoginText>
        </KakaoLoginButton>
        <AppleLoginButton
          style={{
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,

            elevation: 3,
          }}
        >
          <LoginText color={colors.bgColor}>애플로그인으로 시작하기</LoginText>
        </AppleLoginButton>
        <TouchableOpacity>
          <LoginText>로그인이 안되시나요?</LoginText>
        </TouchableOpacity>
      </ButtonContainer>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  justify-content: space-between;
  align-items: center;
`;

const DesignContainer = styled.View`
  margin-top: 300px;
  width: ${width + "px"};
  justify-content: center;
  align-items: center;
  background-color: tomato;
`;

const KakaoLoginButton = styled.TouchableOpacity`
  background-color: #f6e10a;
  width: 90%;
  height: 50px;
  border-radius: 4px;
  margin-bottom: 10px;
  justify-content: center;
  align-items: center;
`;

const LoginText = styled(GeneralText)<{ color?: string }>`
  color: ${(props) => (props.color ? props.color : colors.black)};
`;

const AppleLoginButton = styled(KakaoLoginButton)`
  background-color: ${colors.black};
`;

const ButtonContainer = styled.View`
  width: ${width + "px"};
  justify-content: center;
  align-items: center;
  margin-bottom: 70px;
`;
