import styled from "styled-components/native";
import React, { useEffect, useReducer, useState } from "react";
import {
  BigTextInput,
  BlackLabel,
  colors,
  ErrorMessage,
  fontFamilies,
  MainHeading,
  SubHeading,
} from "../../../styles/styles";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MyKeyboardAvoidingView from "../../UI/MyKeyboardAvoidingView";
import {
  ActivityAction,
  activityInitialState,
  ActivityState,
  activityReducer,
} from "../../../lib/activity/ActivityReducer";
import MainButtonWBg from "../../UI/MainButtonWBg";
import storage from "../../../lib/helpers/myAsyncStorage";
import CreatePlaceTypeSelector from "../CreatePlaceTypeSelector";
import { activityDispatcher } from "../../../lib/activity/ActivityDispatcher";
import { activityValidation } from "../../../lib/activity/CreateActivityValidation";
import { createPlaceErrorMessage } from "../../../lib/errorMessages";

interface Props {
  state?: ActivityState;
  dispatch?: React.Dispatch<ActivityAction>;
  role?: string;
  modify?: boolean;
}

export default function CreateActivitiyStack1({
  state,
  dispatch,
  role,
  modify,
}: Props) {
  const navigation = useNavigation();
  const [nameError, setNameError] = useState(undefined);
  const [disabled, setDisabled] = useState(true);
  const [newState, newDispatch] = useReducer(
    activityReducer,
    activityInitialState
  );

  useEffect(() => {
    if (modify) {
    }
  }, []);

  const nextHandler = () => {};

  const activitySelectorEnabled = storage.getItem("accountType");

  const setActivityType = (type: string) => {
    activityDispatcher.dispatchActivityType(type, newDispatch);
  };

  return (
    <MyKeyboardAvoidingView keyboardVerticalOffset={100}>
      <Container>
        <MainHeading>모임을 열어볼까?</MainHeading>
        <SubHeading style={{ marginTop: 20, marginBottom: 20 }}>
          재밌는 모임을 열어볼까? 열고 친구들과 꿀잼모임😊
        </SubHeading>
        {activitySelectorEnabled && (
          <InnerContainer style={{ paddingBottom: 5 }}>
            <CreatePlaceTypeSelector
              onPress={setActivityType}
              selectedType={newState.activityType}
            />
          </InnerContainer>
        )}
        <CAPartWrapper>
          <BlackLabel>만들고 싶은 모임 주제를 적어봐!(제목)</BlackLabel>
          <SBigTextInput
            placeholder="친구들과 함께 놀러갈 곳 이름을 적어줘!"
            autoCapitalize="none"
            blurOnSubmit={true}
            returnKeyType="next"
            returnKeyLabel="next"
            autoCorrect={false}
            defaultValue={newState.name ? newState.name : ""}
            onChange={(event) => {
              const { eventCount, target, text } = event.nativeEvent;
              activityDispatcher.dispatchName(text, newDispatch);
              setNameError(!activityValidation.validateName(text));
            }}
            error={nameError}
          />
          {nameError ? (
            <SErrorMessage>{createPlaceErrorMessage[0]}</SErrorMessage>
          ) : null}
        </CAPartWrapper>
      </Container>

      {/* @ts-ignore */}
      <TouchableOpacity onPress={() => navigation.navigate("CAS2")}>
        <MainButtonWBg
          onPress={nextHandler}
          // onPress={() => setModal((prev) => !prev)}
          disabled={disabled}
          title={"다음"}
        ></MainButtonWBg>
      </TouchableOpacity>
    </MyKeyboardAvoidingView>
  );
}

const CAPartWrapper = styled.View`
  margin-top: 20px;
  margin-bottom: 20px;
`;

const SHeader = styled(MainHeading)`
  font-family: ${fontFamilies.medium};
  font-size: 22px;
`;

const Container = styled.ScrollView`
  flex: 1;
  padding-top: 20px;
  padding-left: 15px;
  padding-right: 15px;
  background-color: ${colors.bgColor};
`;

const InnerContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const SBigTextInput = styled(BigTextInput)<{ error?: Boolean }>`
  border: ${(props) =>
    props.error
      ? `0.5px solid ${colors.warningRed}`
      : `0.5px solid ${colors.midGrey}`};
  margin-top: 11px;
`;

const SErrorMessage = styled(ErrorMessage)`
  color: ${colors.warningRed};
`;
