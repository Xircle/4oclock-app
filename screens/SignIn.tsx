import styled from "styled-components/native";
import React, { useEffect, useReducer, useRef, useState } from "react";
import { colors } from "../styles/styles";
import { RouteProp } from "@react-navigation/native";
import { LoggedOutStackParamList } from "../navigators/LoggedOutNav";
import { initialState, reducer } from "../lib/auth/AuthReducer";
import MyBackButton from "../components/UI/MyBackButton";
import AbsoluteMainButtonWBg from "../components/UI/AbsoluteMainButtonWBg";
import AuthPhoneNumber from "../components/auth/AuthPhoneNumber";
import AuthProfileMainData from "../components/auth/AuthProfileMainData";
import { authDispatcher } from "../lib/auth/AuthDispatcher";
import {
  Alert,
  Animated,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  View,
} from "react-native";
import AuthProfileSubData from "../components/auth/AuthProfileSubData";
import AuthProfileImage from "../components/auth/AuthProfileImage";
import AuthAgree from "../components/auth/AuthAgree";
import { CreateAccountOutput } from "../lib/api/types";
import { createAccount } from "../lib/api/createAccount";
import storage from "../lib/helpers/myAsyncStorage";
import { useNavigation } from "@react-navigation/native";
import MyKeyboardAvoidingView from "../components/UI/MyKeyboardAvoidingView";
import FullScreenLoader from "../components/UI/FullScreenLoader";
import { useMutation } from "react-query";
import { sendVerification } from "../lib/api/sendVerification";
import { confirmVerification } from "../lib/api/confirmVerification";
import { updateFirebaseToken } from "../lib/api/updateFirebaseToken";
import messaging from "@react-native-firebase/messaging";
interface Props {
  route: RouteProp<LoggedOutStackParamList, "SignIn">;
}

const { width } = Dimensions.get("window");

export default function SignIn({ route }: Props) {
  const navigation = useNavigation();
  const [isVerifSent, setIsVerifSent] = useState(false);
  const [verifCode, setVerifCode] = useState("");
  const [step, setStep] = useState(0);
  const limit = 5;
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (route.params.gender) {
      authDispatcher.dispatchKakao(
        route.params.uid,
        route.params.profileImageUrl,
        route.params.email,
        route.params.gender,
        dispatch
      );
    } else {
      authDispatcher.dispatchApple(route.params.email, dispatch);
    }
  }, []);

  const { mutateAsync: mutateSendVerif } = useMutation(sendVerification);

  const { mutateAsync: mutateConfirmVerif } = useMutation(confirmVerification);
  const { mutateAsync: mutateUpdateFirebaseToken } =
    useMutation(updateFirebaseToken);

  const verificationHandler = async (command: string) => {
    try {
      if (command === "send") {
        console.log(state.phoneNumber.replace("0", "+82"));
        const { data } = await mutateSendVerif({
          phoneNumber: state.phoneNumber.replace("0", "+82"),
        });

        if (data.ok) {
          Alert.alert("문자 메세지로 인증번호를 보냈습니다");
          setIsVerifSent(true);
        } else {
          Alert.alert("다시 시도해주세요");
        }
      } else if (command === "confirm") {
        const { data } = await mutateConfirmVerif({
          phoneNumber: state.phoneNumber.replace("0", "+82"),
          code: verifCode,
        });
        if (data.ok) {
          Alert.alert("인증완료되었습니다");

          dispatch({ type: "setStage1Valid", payload: true });
        } else {
          setIsVerifSent(false);
          Alert.alert("다시 시도해주세요");
        }
      }
    } catch (err) {
      console.log(err);
      Alert.alert(err);
      return;
    }
  };

  // values
  const position = useRef(new Animated.Value(0)).current;
  const scalBarPosition = position.interpolate({
    inputRange: [width * -4, width * -3, width * -2, width * -1, 0],
    outputRange: [0, -0.25 * width, -0.5 * width, -0.75 * width, -1 * width],
  });
  // animations
  const animateByStage = (step: number, position: Animated.Value) =>
    Animated.timing(position, {
      toValue: step * width * -1,
      useNativeDriver: true,
    });

  const backHandler = () => {
    if (step > 0) {
      setStep(step - 1);
      animateByStage(step - 1, position).start();
    }
  };

  const nextHandler = async () => {
    if (step === 0 && !isVerifSent) {
      // 인증 보내기
      console.log("verif send");
      verificationHandler("send");
    } else if (step === 0 && !state.stage1Valid) {
      // 인증 확인
      verificationHandler("confirm");
    } else if (step < limit - 1) {
      setStep(step + 1);
      animateByStage(step + 1, position).start();
    } else {
      try {
        setLoading(true);
        const data: CreateAccountOutput = await createAccount(state);
        if (!data.ok) {
          console.log(data.error);
        } else {
          await storage.setItem("token", data.data.token);

          /* @ts-ignore */
          navigation.navigate("LoggedInNav");
        }
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
        throw new Error();
      }
    }
  };

  const isDisable = () => {
    switch (step) {
      case 0:
        return !state.stage1Valid && !state.phoneNumberValid;
      case 1:
        return !state.stage2Valid;
      case 2:
        return !state.stage3Valid;
      case 3:
        return !state.profileImgFile && !state.profileImgUrl;
      case 4:
        return !(state.agree1 && state.agree2 && state.agree3);
    }
  };

  // pan responders
  return (
    <SafeAreaView style={{ backgroundColor: colors.white, flex: 1 }}>
      <MyKeyboardAvoidingView>
        <Container>
          <TouchableOpacity onPress={backHandler}>
            {step > 0 && step < limit ? (
              <MyBackButton color={colors.black} size={38} />
            ) : null}
          </TouchableOpacity>
          <ScaleBarContainer>
            <ScaleBar />
            <AnimationScaleBar
              style={{ transform: [{ translateX: scalBarPosition }] }}
            />
          </ScaleBarContainer>
          <Wrapper>
            <AnimationWrapper
              style={{
                transform: [{ translateX: position }],
              }}
            >
              <AuthPhoneNumber
                state={state}
                dispatch={dispatch}
                setCode={setVerifCode}
                setIsSent={setIsVerifSent}
              />
            </AnimationWrapper>
            <AnimationWrapper
              style={{
                transform: [{ translateX: position }],
                left: width * 1,
              }}
            >
              <AuthProfileMainData state={state} dispatch={dispatch} />
            </AnimationWrapper>
            <AnimationWrapper
              style={{
                transform: [{ translateX: position }],
                left: width * 2,
              }}
            >
              <AuthProfileSubData state={state} dispatch={dispatch} />
            </AnimationWrapper>
            <AnimationWrapper
              style={{
                transform: [{ translateX: position }],
                left: width * 3,
              }}
            >
              <AuthProfileImage state={state} dispatch={dispatch} />
            </AnimationWrapper>
            <AnimationWrapper
              style={{
                transform: [{ translateX: position }],
                left: width * 4,
              }}
            >
              <AuthAgree />
            </AnimationWrapper>
          </Wrapper>
          <AbsoluteMainButtonWBg
            onPress={() => {
              nextHandler();
            }}
            title={
              step !== limit - 1
                ? !state.stage1Valid && !isVerifSent
                  ? "인증받기"
                  : !state.stage1Valid && isVerifSent
                  ? "인증확인"
                  : "계속하기"
                : "ok 고"
            }
            disabled={isDisable()}
          />
        </Container>
      </MyKeyboardAvoidingView>
      {loading && <FullScreenLoader />}
    </SafeAreaView>
  );
}

const ScaleBarContainer = styled.View`
  width: 100%;
  height: 3px;
  position: relative;
`;

const ScaleBar = styled.View`
  width: ${width + "px"};
  height: 0.2px;
  background-color: ${colors.bareGrey};
  position: absolute;
  left: -15px;
`;

const AnimationScaleBar = styled(Animated.createAnimatedComponent(ScaleBar))`
  background-color: ${colors.vividBlue};
  height: 2px;
  border-radius: 1px;
`;

const Container = styled.View`
  flex: 1;
  background-color: ${colors.white};
  padding: 15px;
`;

const Wrapper = styled.View`
  flex: 1;
  flex-direction: row;
  position: relative;
`;

const AnimationWrapper = styled(Animated.createAnimatedComponent(View))`
  background-color: ${colors.white};
  width: 100%;
  height: 100%;
  position: absolute;
`;
