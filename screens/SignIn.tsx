import styled from "styled-components/native";
import React, { useEffect, useReducer, useRef, useState } from "react";
import { colors, Text } from "../styles/styles";
import { RouteProp } from "@react-navigation/native";
import { LoggedOutStackParamList } from "../navigators/LoggedOutNav";
import AvatarUri from "../components/UI/AvatarUri";
import { SafeAreaView } from "react-native-safe-area-context";
import { initialState, reducer } from "../lib/auth/AuthReducer";
import MyBackButton from "../components/UI/MyBackButton";
import MainButtonWBg from "../components/UI/MainButtonWBg";
import AuthPhoneNumber from "../components/auth/AuthPhoneNumber";
import AuthProfileMainData from "../components/auth/AuthProfileMainData";
import { authDispatcher } from "../lib/auth/AuthDispatcher";
import { Animated, Dimensions, TouchableOpacity, View } from "react-native";
import AuthProfileSubData from "../components/auth/AuthProfileSubData";
import AuthProfileImage from "../components/auth/AuthProfileImage";
import AuthAgree from "../components/auth/AuthAgree";
import { CreateAccountOutput } from "../lib/api/types";
import { createAccount } from "../lib/api/createAccount";
import storage from "../lib/helpers/myAsyncStorage";
import { useNavigation } from "@react-navigation/native";

interface Props {
  route: RouteProp<LoggedOutStackParamList, "SignIn">;
}

const { width } = Dimensions.get("screen");

export default function SignIn({ route }: Props) {
  const navigation = useNavigation();
  const [step, setStep] = useState(0);
  const limit = 5;
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    authDispatcher.dispatchInit(
      route.params.uid,
      route.params.profileImageUrl,
      route.params.email,
      route.params.gender,
      dispatch
    );
  }, []);


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
    if (step < limit - 1) {
      setStep(step + 1);
      animateByStage(step + 1, position).start();
    } else {
      try {
        const data: CreateAccountOutput = await createAccount(state);
        if (!data.ok) {
          console.log(data.error);
        } else {
          await storage.setItem("token", data.data.token);
          /* @ts-ignore */
          navigation.navigate("LoggedInNav");
        }
      } catch (err) {
        console.log(err);
        throw new Error();
      }
    }
  };

  const isDisable = () => {
    switch (step) {
      case 0:
        return !state.stage1Valid;
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
    <SafeAreaView style={{ backgroundColor: colors.bgColor, flex: 1 }}>
      <Container>
        <TouchableOpacity onPress={backHandler}>
          <MyBackButton color={colors.black} size={38} />
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
              onNext={nextHandler}
              state={state}
              dispatch={dispatch}
            />
          </AnimationWrapper>
          <AnimationWrapper
            style={{
              transform: [{ translateX: position }],
              left: width * 1,
            }}
          >
            <AuthProfileMainData
              onNext={nextHandler}
              state={state}
              dispatch={dispatch}
            />
          </AnimationWrapper>
          <AnimationWrapper
            style={{
              transform: [{ translateX: position }],
              left: width * 2,
            }}
          >
            <AuthProfileSubData
              onNext={nextHandler}
              state={state}
              dispatch={dispatch}
            />
          </AnimationWrapper>
          <AnimationWrapper
            style={{
              transform: [{ translateX: position }],
              left: width * 3,
            }}
          >
            <AuthProfileImage
              onNext={nextHandler}
              state={state}
              dispatch={dispatch}
            />
          </AnimationWrapper>
          <AnimationWrapper
            style={{
              transform: [{ translateX: position }],
              left: width * 4,
            }}
          >
            <AuthAgree onNext={nextHandler} state={state} dispatch={dispatch} />
          </AnimationWrapper>
        </Wrapper>
        <MainButtonWBg
          onPress={() => {
            nextHandler();
          }}
          title={step === limit - 1 ? "시작하기" : "다음"}
          disabled={isDisable()}
        />
      </Container>
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
  background-color: ${colors.mainBlue};
  height: 2px;
  border-radius: 1px;
`;

const Container = styled.View`
  flex: 1;
  background-color: ${colors.bgColor};
  padding: 15px;
`;

const Wrapper = styled.View`
  flex: 1;
  flex-direction: row;
  position: relative;
`;

const AnimationWrapper = styled(Animated.createAnimatedComponent(View))`
  background-color: ${colors.bgColor};
  width: 100%;
  height: 100%;
  position: absolute;
`;
