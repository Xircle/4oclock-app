import styled from "styled-components/native";
import React, { useState } from "react";
import { View } from "react-native";
import { AuthAction, AuthState } from "./types";

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

  const SetErrorAll = (param: boolean) => {
    SetNameError(param);
    SetUnivError(param);
    SetAgeError(param);
    SetGenderError(param);
    SetBioError(param);
  };

  const CheckAge = (age: number) => {
    if (age >= 19 && age <= 40) return true;
    return false;
  };
  function Validate(
    univ: string = state.university,
    gender: string = state.gender
  ): void {
    if (state.name.length <= 0 || state.name.length > 20) {
      SetErrorAll(false);
      dispatch({ type: "setStage2Valid", payload: false });
      SetNameError(true);
    } else if (!univs.includes(univ)) {
      SetErrorAll(false);
      dispatch({ type: "setStage2Valid", payload: false });
      SetUnivError(true);
    } else if (!CheckAge(Number(state.age))) {
      SetErrorAll(false);
      dispatch({ type: "setStage2Valid", payload: false });
      SetAgeError(true);
    } else if (gender !== "male" && gender !== "female") {
      SetErrorAll(false);
      dispatch({ type: "setStage2Valid", payload: false });
      SetGenderError(true);
    } else if (state.bio.length < 1) {
      SetErrorAll(false);
      dispatch({ type: "setStage2Valid", payload: false });
      SetBioError(true);
    } else {
      SetErrorAll(false);
      dispatch({ type: "setStage2Valid", payload: true });
    }
  }

  return <View></View>;
}
