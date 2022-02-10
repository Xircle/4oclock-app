import styled from "styled-components/native";
import React, { useState } from "react";
import { AuthAction, AuthState } from "./types";

import { authValidation } from "../../lib/auth/AuthValidation";
import { authDispatcher } from "../../lib/auth/AuthDispatcher";
import {
  BigTextInput,
  colors,
  ErrorMessage,
  fontFamilies,
  GeneralText,
  GreyLabel,
  MainHeading,
  TextArea,
} from "../../styles/styles";
import { authErrorMessage } from "../../lib/errorMessages";
import { Universities } from "../../lib/SelectData";
import { Dimensions, View } from "react-native";
import MySelect from "../UI/MySelect";
import { Ionicons } from "@expo/vector-icons";
import MyKeyboardAvoidingView from "../UI/MyKeyboardAvoidingView";

interface Props {
  onNext: () => void;
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}

const { width } = Dimensions.get("window");

export default function AuthProfileMainData({
  onNext,
  state,
  dispatch,
}: Props) {
  const univs: string[] = [
    "고려대학교",
    "연세대학교",
    "이화여자대학교",
    "성신여자대학교",
    "다른학교입니다",
  ];
  const [nameError, SetNameError] = useState<boolean>(true);
  const [univError, SetUnivError] = useState<boolean>(true);
  const [ageError, SetAgeError] = useState<boolean>(true);
  const [genderError, SetGenderError] = useState<boolean>(true);
  const [titleError, SetTitleError] = useState<boolean>(true);
  const [bioError, SetBioError] = useState<boolean>(true);

  return (
    <Container showsVerticalScrollIndicator={false}>
      <MainHeading style={{ marginTop: 20 }}>
        간단한 프로필 만들기 🕺
      </MainHeading>
      <SBigTextInput
        placeholder="이름을 적어줘!"
        autoCapitalize="none"
        blurOnSubmit={true}
        returnKeyType="next"
        returnKeyLabel="next"
        autoCorrect={false}
        defaultValue={state.name ? state.name : ""}
        onChange={(event) => {
          const { eventCount, target, text } = event.nativeEvent;
          authDispatcher.dispatchName(text, dispatch);
          SetNameError(
            authValidation.validateName(
              text,
              univError || ageError || genderError || bioError || titleError,
              dispatch
            )
          );
        }}
      />
      {nameError && <ErrorMessage>{authErrorMessage[0]}</ErrorMessage>}
      <MySelect
        data={Universities}
        onSelect={(selectedItem, index) => {
          const univ = selectedItem.split(" ")[0];
          const iG = selectedItem.split(" ")[1];
          authDispatcher.dispatchUniversity(univ, dispatch);
          SetUnivError(
            authValidation.validateUniversity(
              selectedItem,
              nameError || ageError || genderError || bioError || titleError,
              dispatch
            )
          );
        }}
        width={width - 120}
        defaultButtonText="학교"
        defaultValue={state.university}
      />
      {!nameError && univError && (
        <ErrorMessage>{authErrorMessage[1]}</ErrorMessage>
      )}
      <SBigTextInput
        style={{ width: width - 120 }}
        placeholder="나이"
        blurOnSubmit={true}
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
              univError || nameError || genderError || bioError || titleError,
              dispatch
            )
          );
        }}
      />
      {!nameError && !univError && ageError && (
        <ErrorMessage>{authErrorMessage[2]}</ErrorMessage>
      )}
      <RadioContainer>
        <Radio
          onPress={() => {
            authDispatcher.dispatchGender("female", dispatch);
            SetGenderError(
              authValidation.validateGender(
                "female",
                univError || nameError || ageError || bioError || titleError,
                dispatch
              )
            );
          }}
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
        <Radio
          onPress={() => {
            authDispatcher.dispatchGender("male", dispatch);
            SetGenderError(
              authValidation.validateGender(
                "male",
                univError || nameError || ageError || bioError || titleError,
                dispatch
              )
            );
          }}
        >
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
      {!nameError && !univError && !ageError && genderError && (
        <ErrorMessage>{authErrorMessage[3]}</ErrorMessage>
      )}
      <SLabel>한줄소개 (스타일/계열/직업...자유롭게)</SLabel>
      <SBigTextInput
        placeholder="ex. 보건 계열 새내기/치믈리에/잉여대학원생"
        autoCapitalize="none"
        blurOnSubmit={true}
        returnKeyType="next"
        returnKeyLabel="next"
        autoCorrect={false}
        defaultValue={state.title ? state.title : ""}
        onChange={(event) => {
          const { eventCount, target, text } = event.nativeEvent;
          authDispatcher.dispatchTitle(text, dispatch);
          SetTitleError(
            authValidation.validateName(
              text,
              univError || ageError || genderError || bioError || nameError,
              dispatch
            )
          );
        }}
      />
      {!nameError && !univError && !ageError && !genderError && titleError && (
        <ErrorMessage>{authErrorMessage[4]}</ErrorMessage>
      )}
      <SLabel>친구들에게 자기소개를 적어주세요!</SLabel>
      <STextArea
        placeholder="ex. 미대에 다니는 다양한 삶을 살고 싶어하는 미개봉화석^^ 요즘 스타트업에 관심이 생겨서 관련하신 분들과 이야기하면 좋을 것 같아용ㅎㅎ"
        autoCapitalize="none"
        autoCorrect={false}
        defaultValue={state.bio ? state.bio : ""}
        multiline={true}
        onChange={(event) => {
          const { eventCount, target, text } = event.nativeEvent;
          authDispatcher.dispatchBio(text, dispatch);
          SetBioError(
            authValidation.validateBio(
              text,
              univError || ageError || genderError || bioError || titleError,
              dispatch
            )
          );
        }}
      />
      {!nameError && !univError && !ageError && !genderError && bioError && (
        <ErrorMessage>{authErrorMessage[5]}</ErrorMessage>
      )}
      <View style={{ height: 150 }}></View>
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

const SLabel = styled(GreyLabel)`
  margin-top: 20px;
  font-size: 20px;
  font-family: ${fontFamilies.regular};
`;

const STextArea = styled(TextArea)`
  margin-top: 20px;
  height: 150px;
`;
