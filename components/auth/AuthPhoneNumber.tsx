import styled from "styled-components/native";
import {
  BigTextInput,
  colors,
  GreyInfoText,
  MainHeading,
} from "../../styles/styles";
import { AuthAction, AuthState } from "./types";
import React from "react";
import { authDispatcher } from "../../lib/auth/AuthDispatcher";
import { authValidation } from "../../lib/auth/AuthValidation";

interface Props {
  onNext: () => void;
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}

export default function AuthPhoneNumber({ onNext, state, dispatch }: Props) {
  return (
    <Container>
      <MainHeading style={{ marginTop: 40 }}>
        친구들과 {"\n"}맛있는 밥 먹으러 갈까요?
      </MainHeading>
      <GreyInfoText style={{ marginTop: 20 }}>
        모임 단통방을 만들어드리는 용도로 사용되기에 꼭! 사용하시는 전화번호를
        적어주셔야 해요.
      </GreyInfoText>
      <PhoneNumberInput
        blurOnSubmit={true}
        onSubmitEdition={onNext}
        returnKeyType="next"
        returnKeyLabel="next"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="number-pad"
        onChange={(event) => {
          const { eventCount, target, text } = event.nativeEvent;
          authDispatcher.dispatchPhoneNumber(text, dispatch);
          authValidation.validatePhoneNumber(text, dispatch);
        }}
      />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${colors.bgColor};
  padding: 15px;
`;

const PhoneNumberInput = styled(BigTextInput)`
  margin-top: 50px;
  height: 50px;
  border-radius: 0px;
  border: none;
  border-bottom-width: 0.5px;
  border-color: ${colors.bareGrey};
`;
