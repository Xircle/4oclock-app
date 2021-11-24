import styled from "styled-components/native";
import React, { useState } from "react";
import { AuthAction, AuthState } from "./types";

import { authValidation } from "../../lib/auth/AuthValidation";
import { authDispatcher } from "../../lib/auth/AuthDispatcher";
import {
  BigTextInput,
  colors,
  ErrorMessage,
  GeneralText,
  MainHeading,
} from "../../styles/styles";
import { authErrorMessage } from "../../lib/errorMessages";
import { Universities, UniversityToIndex } from "../../lib/SelectData";
import { Dimensions } from "react-native";
import MySelect from "../UI/MySelect";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  onNext: () => void;
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}

const { width } = Dimensions.get("screen");

export default function AuthProfileMainData({
  onNext,
  state,
  dispatch,
}: Props) {
  const univs: string[] = ["고려대학교", "연세대학교", "이화여자대학교"];
  const [nameError, SetNameError] = useState<boolean>(false);
  const [univError, SetUnivError] = useState<boolean>(false);
  const [ageError, SetAgeError] = useState<boolean>(false);
  const [genderError, SetGenderError] = useState<boolean>(false);
  const [bioError, SetBioError] = useState<boolean>(false);

  return (
    <Container showsVerticalScrollIndicator={false}>
      <MainHeading style={{ marginTop: 20 }}>프로필 만들기</MainHeading>
      <SBigTextInput
        placeholder="USERNAME"
        autoCapitalize="none"
        blurOnSubmit={true}
        onSubmitEdition={onNext}
        returnKeyType="next"
        returnKeyLabel="next"
        autoCorrect={false}
        autoFocus={true}
        defaultValue={state.name ? state.name : ""}
        onChange={(event) => {
          const { eventCount, target, text } = event.nativeEvent;
          authDispatcher.dispatchName(text, dispatch);
          SetNameError(
            authValidation.validateName(
              text,
              univError || ageError || genderError || bioError,
              dispatch
            )
          );
        }}
      />
      {nameError && <ErrorMessage>{authErrorMessage[0]}</ErrorMessage>}
      <MySelect
        data={Universities}
        onSelect={(selectedItem, index) => {
          authDispatcher.dispatchUniversity(
            selectedItem.split(" ")[0],
            dispatch
          );
          authDispatcher.dispatchIsGraduate(
            selectedItem.split(" ")[1] === "졸업",
            dispatch
          );
        }}
        width={width - 120}
        defaultButtonText="학교"
        defaultValueByIndex={
          UniversityToIndex[
            state.university + (state.isGraduate ? "졸업" : "재학")
          ]
        }
      />
      {univError && <ErrorMessage>{authErrorMessage[1]}</ErrorMessage>}
      <SBigTextInput
        style={{ width: width - 120 }}
        placeholder="나이"
        blurOnSubmit={true}
        onSubmitEdition={onNext}
        returnKeyType="next"
        returnKeyLabel="next"
        autoCorrect={false}
        defaultValue={state.age}
        keyboardType="number-pad"
        onChange={(event) => {
          const { eventCount, target, text } = event.nativeEvent;
          authDispatcher.dispatchAge(text, dispatch);
          SetAgeError(
            authValidation.validateAge(
              text,
              univError || nameError || genderError || bioError,
              dispatch
            )
          );
        }}
      />
      {ageError && <ErrorMessage>{authErrorMessage[2]}</ErrorMessage>}
      <RadioContainer>
        <Radio
          onPress={() => authDispatcher.dispatchGender("female", dispatch)}
        >
          <Ionicons
            name={
              state.gender === "female"
                ? "checkmark-circle"
                : "checkmark-circle-outline"
            }
            color={
              state.gender === "female" ? colors.mainBlue : colors.bareGrey
            }
            size={32}
            style={{ marginRight: 10 }}
          />
          <GenderText isSelected={state.gender === "female"}>여자</GenderText>
        </Radio>
        <Radio onPress={() => authDispatcher.dispatchGender("male", dispatch)}>
          <Ionicons
            name={
              state.gender === "male"
                ? "checkmark-circle"
                : "checkmark-circle-outline"
            }
            color={state.gender === "male" ? colors.mainBlue : colors.bareGrey}
            size={32}
            style={{ marginRight: 10 }}
          />
          <GenderText isSelected={state.gender === "male"}>남자</GenderText>
        </Radio>
      </RadioContainer>
      {genderError && <ErrorMessage>{authErrorMessage[3]}</ErrorMessage>}
    </Container>
  );
}

const GenderText = styled(GeneralText)<{ isSelected: boolean }>`
  color: ${(props) => (props.isSelected ? colors.mainBlue : colors.bareGrey)};
`;

const Container = styled.ScrollView`
  background-color: ${colors.bgColor};
  padding: 15px;
`;

const SBigTextInput = styled(BigTextInput)`
  margin-top: 20px;
`;

const RadioContainer = styled.View`
  flex-direction: row;
`;

const Radio = styled.TouchableOpacity`
  margin-top: 20px;
  flex-direction: row;
  align-items: center;
  padding: 8px;
`;
