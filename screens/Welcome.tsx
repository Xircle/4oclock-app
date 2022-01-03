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

interface Props {}

const { width } = Dimensions.get("window");

export default function Welcome(props: Props) {
  const [assets] = useAssets([
    require("../statics/images/landingPageImage.png"),
  ]);

  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [loginError, setLoginError] = useState(false);

  const [emailInput, setEmailInput] = useState("");
  const [pwdInput, setPwdInput] = useState("");

  const redirectWithExistingToken = async () => {
    const tokenFromStorage = await storage.getItem("token");

    /* @ts-ignore */
    if (tokenFromStorage) navigation.navigate("LoggedInNav");
  };

  const redirectWithNewToken = async () => {
    await storage.setItem("token", token);
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
        setToken(res.data.data.token);
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
    redirectWithExistingToken();
  }, []);

  const LoginFormSubmit = async () => {
    if (emailInput === "dja12356@gmail.com" && pwdInput === "Dja!2356") {
      setEmail("dja12356@gmail.com");
      try {
        const axiosclient = await AxiosClient();

        const res = await axiosclient.get<SocialRedirectResponse>(
          `${BASE_URL}/auth/social/redirect/kakao?email=dja12356@gmail.com`
        );
        if (res.data.code === 200) {
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
        <Heading>2021년은 연고이팅에서!</Heading>
      </DesignContainer>
      <ButtonContainer>
        <LoginContainer>
          <MyLogin
            emailOnchange={setEmailInput}
            pwdOnchange={setPwdInput}
            submit={LoginFormSubmit}
          />
        </LoginContainer>

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
            <LoginText color={colors.bgColor}> Apple로 시작하기</LoginText>
          </AppleLoginButton>
        )}
        <TouchableOpacity onPress={openLink.LOpenKakaoChat}>
          <LoginText>로그인이 안되시나요?</LoginText>
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

const Heading = styled(GeneralText)`
  font-family: ${fontFamilies.bold};
  font-size: 25px;
`;

const MainImg = styled.Image`
  width: 220px;
  position: absolute;
  top: 0px;
  left: 0;
`;

const AgreeContainer = styled.View`
  flex-direction: row;
  margin-top: 60px;
  margin-bottom: 15px;
`;

const AgreeText = styled(GeneralText)`
  font-family: ${fontFamilies.thin};
  font-size: 12px;
  color: ${colors.midGrey};
`;

const CTAAgreeContainer = styled.View`
  border-bottom-width: 0.5px;
  border-color: ${colors.bareGrey};
`;

const Container = styled.View`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  background-color: ${colors.bgColor};
`;

const DesignContainer = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
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
