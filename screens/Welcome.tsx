import styled from "styled-components/native";
import React, { useState, useEffect } from "react";
import {
  Dimensions,
  Image,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
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
import { colors, fontFamilies, GeneralText } from "../styles/styles";
import { appleAuth } from "@invertase/react-native-apple-authentication";
import MyModal from "../components/UI/MyModal";
import { useAssets } from "expo-asset";

interface Props {}

const { width } = Dimensions.get("window");

export default function Welcome(props: Props) {
  const [assets] = useAssets([
    require("../statics/images/landingPageImage.png"),
  ]);

  const navigation = useNavigation();
  const realm = useDB();
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [loginError, setLoginError] = useState(false);

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
      console.log(token);
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
    // performs login request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    // get current authentication state for user
    // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user
    );
    // use credentialState response to ensure the user is authenticated
    if (credentialState === appleAuth.State.AUTHORIZED) {
      if (appleAuthRequestResponse.email) {
        setEmail(appleAuthRequestResponse.email);
        socialRedirectApple(appleAuthRequestResponse.email);
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
      <MyModal visible={loginError} onClose={() => setLoginError(false)}>
        <ModalHeadiner>로그인 실패</ModalHeadiner>
        <ModalInfo>
          로그인에 실패하였습니다. 운영진에 문의해주시기 바랍니다
        </ModalInfo>
      </MyModal>
      <DesignContainer>
        <Heading>2021년은 연고이팅에서!</Heading>
        {assets?.[0] ? (
          <MainImg source={assets[0]} resizeMode="contain" />
        ) : null}
      </DesignContainer>
      <ButtonContainer>
        <AgreeContainer>
          <AgreeText>가입하시면</AgreeText>
          <TouchableOpacity>
            <CTAAgreeContainer>
              <AgreeText>이용약관</AgreeText>
            </CTAAgreeContainer>
          </TouchableOpacity>
          <AgreeText>및</AgreeText>
          <TouchableOpacity>
            <CTAAgreeContainer>
              <AgreeText>개인정보 처리방침</AgreeText>
            </CTAAgreeContainer>
          </TouchableOpacity>
          <AgreeText>에 동의하게 됩니다.</AgreeText>
        </AgreeContainer>
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
            <LoginText color={colors.bgColor}>
              애플로그인으로 시작하기
            </LoginText>
          </AppleLoginButton>
        )}

        <TouchableOpacity>
          <LoginText>로그인이 안되시나요?</LoginText>
        </TouchableOpacity>
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
  right: 0;
`;

const AgreeContainer = styled.View`
  flex-direction: row;
  margin-bottom: 8px;
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
  margin-bottom: 70px;
`;

const ModalHeadiner = styled(GeneralText)`
  margin-top: 45px;
  font-family: ${fontFamilies.medium};
  font-size: 28px;
`;

const ModalInfo = styled(GeneralText)`
  margin-top: 70px;
`;
