import styled from "styled-components/native";
import { colors } from "../../styles/styles";
import { AuthAction, AuthState } from "./types";
import React from "react";

interface Props {
  onNext: () => void;
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}

export default function AuthPhoneNumber({ onNext, state, dispatch }: Props) {
  const Validate = (data: string) => {
    if (data.length < 10 || data.length > 11) {
      dispatch({ type: "setStage1Valid", payload: false });
    } else if (data[0] !== "0" || data[1] !== "1" || data[2] !== "0") {
      dispatch({ type: "setStage1Valid", payload: false });
    } else if (isNaN(Number(data)) || Number(data) < 0) {
      dispatch({ type: "setStage1Valid", payload: false });
    } else {
      dispatch({ type: "setStage1Valid", payload: true });
    }
  };
  return <Container></Container>;
}

const Container = styled.View`
  flex: 1;
  background-color: ${colors.bgColor};
  padding: 15px;
`;
