import styled from "styled-components/native";
import React, { useState, useReducer, useRef } from "react";
import { colors } from "../styles/styles";
import { Alert, Animated, Dimensions, View } from "react-native";
import MainButtonWBg from "../components/UI/MainButtonWBg";
import { activityInitialState, reducer } from "../lib/activity/ActivityReducer";
import CreatePlaceStage1 from "../components/activity/CreatePlaceStage1";
import CreatePlaceStage2 from "../components/activity/CreatePlaceStage2";
import CreatePlaceStage3 from "../components/activity/CreatePlaceStage3";
import { createPlace } from "../lib/api/createPlace";
import { CreateActivityOutput, UserData } from "../lib/api/types.d";
import { activityDispatcher } from "../lib/activity/ActivityDispatcher";
import FullScreenLoader from "../components/UI/FullScreenLoader";
import { useQuery } from "react-query";
import { getUser } from "../lib/api/getUser";

interface Props {}

const { width } = Dimensions.get("window");

export default function CreateActivityScreen(props: Props) {
  const [manualDisable, setManualDisable] = useState(false);
  const [stage, setStage] = useState(0);
  const [loading, setLoading] = useState(false);

  const totalStage = 3;
  const [state, dispatch] = useReducer(reducer, activityInitialState);
  // values
  const position = useRef(new Animated.Value(0)).current;

  const { data: userData } = useQuery<UserData | undefined>(
    ["userProfile"],
    () => getUser(),
    {
      retry: 1,
    }
  );

  // animations
  const animateByStage = (step: number, position: Animated.Value) =>
    Animated.timing(position, {
      toValue: step * width * -1,
      useNativeDriver: true,
    });
  const backHandler = (stage: number) => {
    setStage(stage - 1);
    animateByStage(stage - 1, position).start();
  };
  const nextHandler = async (stage: number) => {
    if (stage === totalStage - 2) {
      setManualDisable(true);
      setLoading(true);
      try {
        const data: CreateActivityOutput = await createPlace(state);
      } catch (e) {
        setLoading(false);
        setManualDisable(false);
        Alert.alert("벌레e");
        console.log(e);
      }
      setLoading(false);
      setManualDisable(false);
      dispatch({ type: "setIsFinished", payload: true });
    }
    setStage(stage + 1);
    animateByStage(stage + 1, position).start();
  };

  // regular functions
  const isDisable = () => {
    if (stage === 0) {
      return !state.stage1Valid || manualDisable;
    } else if (stage === 1) {
      return !state.coverImage || manualDisable;
    }
  };

  const cleanUp = () => {
    activityDispatcher.dispatchInitialState(dispatch);
    activityDispatcher.dispatchStage1Valid(false, dispatch);
    setStage(0);
    position.setValue(0);
  };

  return (
    <Container>
      <Wrapper>
        <AnimationWrapper
          style={{
            transform: [{ translateX: position }],
          }}
        >
          <CreatePlaceStage1
            state={state}
            dispatch={dispatch}
            admin={userData?.accountType === "Admin"}
          />
        </AnimationWrapper>
        <AnimationWrapper
          style={{
            transform: [{ translateX: position }],
            left: width * 1,
          }}
        >
          <CreatePlaceStage2
            onBackPressed={() => backHandler(1)}
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
          <CreatePlaceStage3 cleanUp={cleanUp} state={state} />
        </AnimationWrapper>
      </Wrapper>
      {stage < totalStage - 1 && (
        <MainButtonWBg
          onPress={() => nextHandler(stage)}
          // onPress={() => setModal((prev) => !prev)}
          disabled={isDisable()}
          title={"모임열기 😏"}
        ></MainButtonWBg>
      )}
      {loading && <FullScreenLoader />}
    </Container>
  );
}

const Wrapper = styled.View`
  flex: 1;
`;

const Container = styled.View`
  flex: 1;
  background-color: ${colors.bgColor};
`;

const AnimationWrapper = styled(Animated.createAnimatedComponent(View))`
  background-color: ${colors.bgColor};
  width: 100%;
  height: 100%;
  position: absolute;
`;
