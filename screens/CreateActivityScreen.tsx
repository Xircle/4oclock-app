import styled from "styled-components/native";
import React, { useState, useReducer, useRef, useEffect } from "react";
import { colors, MainHeading, SubHeading, Text } from "../styles/styles";
import { ScrollView, Animated, Dimensions, View, Modal } from "react-native";
import MainButtonWBg from "../components/UI/MainButtonWBg";
import { activityInitialState, reducer } from "../lib/activity/ActivityReducer";
import CreatePlaceStage1 from "../components/activity/CreatePlaceStage1";
import CreatePlaceStage2 from "../components/activity/CreatePlaceStage2";
import CreatePlaceStage3 from "../components/activity/CreatePlaceStage3";
import { createPlace } from "../lib/api/createPlace";
import { CreateActivityOutput } from "../lib/api/types.d";
import { TouchableOpacity } from "react-native";
import { activityDispatcher } from "../lib/activity/ActivityDispatcher";

interface Props {}

const { width } = Dimensions.get("screen");

export default function CreateActivityScreen(props: Props) {
  const [modal, setModal] = useState(false);
  const [stage, setStage] = useState(0);
  const totalStage = 3;
  const [state, dispatch] = useReducer(reducer, activityInitialState);
  // values
  const position = useRef(new Animated.Value(0)).current;

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
      const data: CreateActivityOutput = await createPlace(state);
    }
    setStage(stage + 1);
    animateByStage(stage + 1, position).start();
  };

  // regular functions
  const isDisable = () => {
    if (stage === 0) {
      return !state.stage1Valid;
    } else if (stage === 1) {
      return !state.coverImage || state.subImages.length < 2;
    }
  };

  const cleanUp = () => {
    activityDispatcher.dispatchInitialState(dispatch);
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
          <CreatePlaceStage1 state={state} dispatch={dispatch} />
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
          <CreatePlaceStage3 cleanUp={cleanUp} />
        </AnimationWrapper>
      </Wrapper>
      {stage < totalStage - 1 && (
        <MainButtonWBg
          onPress={() => nextHandler(stage)}
          // onPress={() => setModal((prev) => !prev)}
          disabled={isDisable()}
          title={"모임열기"}
        ></MainButtonWBg>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        style={{ backgroundColor: "#444444" }}
      >
        <View
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#000000",
            opacity: 0.5,
            position: "absolute",
          }}
        ></View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View style={{ width: 100, height: 100, backgroundColor: "#ffffff" }}>
            <TouchableOpacity
              onPress={() => setModal((prev) => !prev)}
              style={{ padding: 15, backgroundColor: "#252667" }}
            >
              <Text>colose</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
