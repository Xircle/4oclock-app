import styled from "styled-components/native";
import React, { useState, useEffect } from "react";
import { Alert, Dimensions, Platform, TouchableOpacity } from "react-native";
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
import { useNavigation } from "@react-navigation/native";
import { BASE_URL } from "../lib/utils";
import storage from "../lib/helpers/myAsyncStorage";
import { colors, fontFamilies, GeneralText } from "../styles/styles";
import { appleAuth } from "@invertase/react-native-apple-authentication";
import MyModal from "../components/UI/MyModal";
import { useAssets } from "expo-asset";
import { openLink } from "../components/shared/Links";
import MyLogin from "../components/loginForm/MyLogin";
import jwt_decode from "jwt-decode";
import { GetVersionOutput } from "../lib/api/types";
import { useMutation, useQuery } from "react-query";
import { getVersion } from "../lib/api/getVersion";

import messaging from "@react-native-firebase/messaging";
import { updateFirebaseToken } from "../lib/api/updateFirebaseToken";
import FastImage from "react-native-fast-image";

interface Props {}

const { width } = Dimensions.get("window");
const currentVersion = Platform.OS === "ios" ? 13 : 13;

export default function Welcome(props: Props) {
  const { data: versionData } = useQuery<GetVersionOutput | undefined>(
    ["teams"],
    () => getVersion(),
    {
      retry: 1,
    }
  );
  const [assets] = useAssets([
    require("../statics/images/landingPageImage.png"),
  ]);

  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [loginError, setLoginError] = useState(false);

  const [emailInput, setEmailInput] = useState("");
  const [pwdInput, setPwdInput] = useState("");

  const { mutateAsync: mutateUpdateFirebaseToken } =
    useMutation(updateFirebaseToken);

  const redirectWithExistingToken = async () => {
    const minimumVersion =
      Platform.OS === "ios"
        ? versionData.iOSMinimumVersion
        : versionData.androidMinimumVersion;
    if (currentVersion < minimumVersion) {
      Alert.alert("업데이트가 필요합니다", "", [
        {
          text: "업데이트하기",
          //@ts-ignore
          onPress: () => openLink.LOpenLink("http://onelink.to/tqctmc"),
        },
      ]);
      return;
    }
    const tokenFromStorage = await storage.getItem("token");

    /* @ts-ignore */
    if (tokenFromStorage) navigation.navigate("LoggedInNav");
  };

  const redirectWithNewToken = async () => {
    const minimumVersion =
      Platform.OS === "ios"
        ? versionData.iOSMinimumVersion
        : versionData.androidMinimumVersion;
    if (currentVersion < minimumVersion) {
      Alert.alert("업데이트가 필요합니다", "", [
        {
          text: "업데이트하기",
          //@ts-ignore
          onPress: () => openLink.LOpenLink("http://onelink.to/tqctmc"),
        },
      ]);
      return;
    }

    await storage.setItem("token", token);
    const firebaseToken = await messaging().getToken();
    await mutateUpdateFirebaseToken(firebaseToken);
    const tokenFromStorage = await storage.getItem("token");

    if (tokenFromStorage) {
      /* @ts-ignore */
      navigation.navigate("LoggedInNav");
    }
  };

  const getMyKakaoProfile = async (): Promise<void> => {
    // @ts-ignore
    const profile: KakaoProfile = await getKakaoProfile();
    setEmail(profile.email);
    socialRedirectKakao(profile);
  };

  const signInWithKakao = async (): Promise<void> => {
    try {
      const token: KakaoOAuthToken = await login();
      getMyKakaoProfile();
    } catch (e) {
      setLoginError(true);
    }
  };

  const socialRedirectKakao = async (profile: KakaoProfile) => {
    try {
      const axiosclient = await AxiosClient();

      const res = await axiosclient.get<SocialRedirectResponse>(
        `${BASE_URL}/auth/social/redirect/kakao?email=${profile.email}`
      );
      if (res.data.code === 200) {
        await storage.setItem("uid", res.data.data.uid);
        setToken(res.data.data.token);
        await storage.setItem("uid", res.data.data.uid);
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
      setLoginError(true);
      throw new Error(err);
    }
  };

  const socialRedirectApple = async (email: string) => {
    try {
      const axiosclient = await AxiosClient();
      const res = await axiosclient.get<SocialRedirectResponse>(
        `${BASE_URL}/auth/social/redirect/kakao?email=${email}`
      );
      if (res.data.code === 200) {
        await storage.setItem("uid", res.data.data.uid);
        setToken(res.data.data.token);
        await storage.setItem("uid", res.data.data.uid);
      } else if (res.data.code === 401) {
        // @ts-ignore
        navigation.navigate("SignIn", {
          email: email,
        });
      }
    } catch (err) {
      setLoginError(true);
      throw new Error(err);
    }
  };

  const signInWithApple = async () => {
    const appleEmail = await storage.getItem("appleEmail");
    if (appleEmail) {
      setEmail(appleEmail);
      socialRedirectApple(appleEmail);
      return;
    }
    // performs login request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });
    //@ts-ignore
    const { email, email_verified, is_private_email, sub } = jwt_decode(
      appleAuthRequestResponse.identityToken
    );
    // get current authentication state for user
    // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user
    );
    // use credentialState response to ensure the user is authenticated
    if (credentialState === appleAuth.State.AUTHORIZED) {
      if (email) {
        await storage.setItem("appleEmail", email);
        setEmail(email);
        socialRedirectApple(email);
      } else {
        setLoginError(true);
      }
    } else {
      setLoginError(true);
    }
  };

  const appleBtnOnPress = () => {
    signInWithApple();
  };

  useEffect(() => {
    if (email && token) {
      redirectWithNewToken();
    }
  }, [email, token]);
  useEffect(() => {
    if (versionData) redirectWithExistingToken();
  }, [versionData]);

  const LoginFormSubmit = async () => {
    if (emailInput === "dja12356@gmail.com" && pwdInput === "Dja!2356") {
      setEmail("dja12356@gmail.com");
      try {
        const axiosclient = await AxiosClient();

        const res = await axiosclient.get<SocialRedirectResponse>(
          `${BASE_URL}/auth/social/redirect/kakao?email=she_lock@naver.com`
        );
        if (res.data.code === 200) {
          await storage.setItem("uid", res.data.data.uid);
          setToken(res.data.data.token);
        } else {
          Alert.alert("존재하지 않는 이메일입니다");
        }
      } catch (err) {
        setLoginError(true);
        throw new Error(err);
      }
    } else {
      Alert.alert("존재하지 않는 이메일입니다");
    }
  };

  return (
    <Container>
      <MyModal visible={loginError} onClose={() => setLoginError(false)}>
        <ModalHeadiner>로그인 실패</ModalHeadiner>
        <ModalInfo>
          로그인에 실패하였습니다. 운영진에 문의해주시기 바랍니다
        </ModalInfo>
      </MyModal>
      <DesignContainer>
        <Heading>Welcome to{"\n"}KEVIN's CLUB</Heading>
      </DesignContainer>
      <ButtonContainer>
        {/* <LoginContainer>
          <MyLogin
            emailOnchange={setEmailInput}
            pwdOnchange={setPwdInput}
            submit={LoginFormSubmit}
          />
        </LoginContainer> */}
        <AvatarImg source={require("../statics/images/800.png")} />
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
          <LoginText>Kakao로 시작하기</LoginText>
        </KakaoLoginButton>
        {Platform.OS === "ios" && (
          <AppleLoginButton
            onPress={() => appleBtnOnPress()}
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
            <LoginText color={colors.white}> Apple로 시작하기</LoginText>
          </AppleLoginButton>
        )}
        <TouchableOpacity onPress={openLink.LOpenKakaoChat}>
          <NotLoginText>앗! 로그인이 안되시나요?</NotLoginText>
        </TouchableOpacity>
        <AgreeContainer>
          <AgreeText>가입하시면</AgreeText>
          <TouchableOpacity>
            <CTAAgreeContainer>
              <TouchableOpacity onPress={openLink.LServiceAgree}>
                <AgreeText>이용약관</AgreeText>
              </TouchableOpacity>
            </CTAAgreeContainer>
          </TouchableOpacity>
          <AgreeText>및</AgreeText>
          <TouchableOpacity>
            <CTAAgreeContainer>
              <TouchableOpacity onPress={openLink.LPrivacyAgree}>
                <AgreeText>개인정보 처리방침</AgreeText>
              </TouchableOpacity>
            </CTAAgreeContainer>
          </TouchableOpacity>
          <AgreeText>에 동의하게 됩니다.</AgreeText>
        </AgreeContainer>
      </ButtonContainer>
    </Container>
  );
}

const AvatarImg = styled(FastImage)`
  width: ${width * 0.55 + "px"};
  height: ${width * 0.55 + "px"};
`;

const Heading = styled(GeneralText)`
  font-family: ${fontFamilies.bold};
  font-size: 30px;
  color: ${colors.white};
  line-height: 40px;
`;

const AgreeContainer = styled.View`
  flex-direction: row;
  margin-top: 60px;
  margin-bottom: 15px;
`;

const AgreeText = styled(GeneralText)`
  font-family: ${fontFamilies.thin};
  font-size: 12px;
  color: ${colors.black};
`;

const CTAAgreeContainer = styled.View`
  border-bottom-width: 0.5px;
  border-color: ${colors.bareGrey};
`;

const Container = styled.View`
  flex: 1;
  justify-content: space-between;
  align-items: center;
  background-color: ${colors.vividOrange};
`;

const DesignContainer = styled.View`
  width: 100%;
  padding-left: 15px;
  padding-top: 100px;
  position: relative;
  flex: 1;
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

const NotLoginText = styled(LoginText)`
  color: ${colors.white};
`;

const AppleLoginButton = styled(KakaoLoginButton)`
  background-color: ${colors.black};
`;

const ButtonContainer = styled.View`
  width: ${width + "px"};
  justify-content: center;
  align-items: center;
`;

const ModalHeadiner = styled(GeneralText)`
  margin-top: 45px;
  font-family: ${fontFamilies.medium};
  font-size: 28px;
`;

const ModalInfo = styled(GeneralText)`
  margin-top: 70px;
`;

const LoginContainer = styled.View`
  width: 90%;
  margin-bottom: 10px;
  border-radius: 4px;
`;
