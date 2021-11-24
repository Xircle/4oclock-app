import styled from "styled-components/native";
import React, { useState } from "react";
import { AuthAction, AuthState } from "./types";

import { authValidation } from "../../lib/auth/AuthValidation";
import { authDispatcher } from "../../lib/auth/AuthDispatcher";
import {
  BigTextInput,
  colors,
  ErrorMessage,
  MainHeading,
} from "../../styles/styles";
import { authErrorMessage } from "../../lib/errorMessages";

interface Props {
  onNext: () => void;
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}

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

  const CheckAge = (age: number) => {
    if (age >= 19 && age <= 40) return true;
    return false;
  };

  return (
    <Container>
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
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${colors.bgColor};
  padding: 15px;
`;

const SBigTextInput = styled(BigTextInput)`
  margin-top: 20px;
`;
